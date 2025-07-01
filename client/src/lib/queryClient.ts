import { QueryClient, QueryFunction } from "@tanstack/react-query";
import { ErrorHandler, ErrorCode, withRetry } from "./errorHandler";

// Enhanced API request with comprehensive error handling
export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
  options: {
    timeout?: number;
    retries?: boolean;
    context?: Record<string, any>;
  } = {}
): Promise<Response> {
  const { timeout = 10000, retries = true, context = {} } = options;
  
  const requestContext = {
    method,
    url,
    hasData: !!data,
    ...context
  };

  const makeRequest = async (): Promise<Response> => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      };

      // Add CSRF token if available
      const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
      if (csrfToken) {
        headers['X-CSRF-Token'] = csrfToken;
      }

      const response = await fetch(url, {
        method,
        headers: data ? headers : { 'X-Requested-With': 'XMLHttpRequest' },
        body: data ? JSON.stringify(data) : undefined,
        credentials: "include",
        signal: controller.signal,
        // Add request ID for tracking
        cache: method === 'GET' ? 'default' : 'no-cache'
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const error = ErrorHandler.handleAPIError(response, requestContext);
        
        // Try to get error details from response body
        try {
          const errorData = await response.json();
          if (errorData.message) {
            error.message = errorData.message;
          }
          if (errorData.details) {
            error.details = { ...error.details, ...errorData.details };
          }
        } catch {
          // Response body is not JSON, keep original error
        }
        
        throw error;
      }

      return response;

    } catch (error: any) {
      clearTimeout(timeoutId);
      
      if (error?.name === 'AbortError') {
        throw ErrorHandler.createError(
          ErrorCode.TIMEOUT_ERROR,
          `Request to ${url} timed out after ${timeout}ms`,
          error,
          requestContext
        );
      }

      if (error?.code) {
        // Already an AppError
        throw error;
      }

      // Handle network errors
      if (error instanceof TypeError && error.message?.includes('fetch')) {
        throw ErrorHandler.handleNetworkError(error as Error, requestContext);
      }

      // Handle other errors
      throw ErrorHandler.createError(
        ErrorCode.UNKNOWN_ERROR,
        error?.message || 'Request failed',
        error,
        requestContext
      );
    }
  };

  if (retries) {
    return withRetry(makeRequest, requestContext);
  } else {
    return makeRequest();
  }
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    try {
      const res = await fetch(queryKey[0] as string, {
        credentials: "include",
      });

      if (unauthorizedBehavior === "returnNull" && res.status === 401) {
        return null;
      }

      if (!res.ok) {
        const error = ErrorHandler.handleAPIError(res, { queryKey: queryKey[0] });
        throw error;
      }

      return await res.json();
    } catch (error: any) {
      if (error?.code) {
        // Already an AppError
        throw error;
      }
      
      // Handle network errors
      throw ErrorHandler.handleNetworkError(error as Error, { queryKey: queryKey[0] });
    }
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "returnNull" }),
      retry: (failureCount, error: any) => {
        // Don't retry on certain error types
        if (error?.code === ErrorCode.AUTH_ERROR || 
            error?.code === ErrorCode.VALIDATION_ERROR ||
            error?.code === ErrorCode.INSUFFICIENT_FUNDS) {
          return false;
        }
        
        // Retry up to 3 times for other errors
        return failureCount < 3;
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: (failureCount, error: any) => {
        // Don't retry mutations on validation or auth errors
        if (error?.code === ErrorCode.AUTH_ERROR || 
            error?.code === ErrorCode.VALIDATION_ERROR) {
          return false;
        }
        
        // Retry once for network errors
        if (error?.code === ErrorCode.NETWORK_ERROR || 
            error?.code === ErrorCode.TIMEOUT_ERROR) {
          return failureCount < 1;
        }
        
        return false;
      },
      retryDelay: 1000,
    }
  },
});
