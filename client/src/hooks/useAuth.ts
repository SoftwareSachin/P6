import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { ErrorHandler, ErrorCode, useErrorHandler } from "@/lib/errorHandler";
import { useState, useCallback, useEffect } from "react";

export function useAuth() {
  const queryClient = useQueryClient();
  const { createError } = useErrorHandler();
  const [authState, setAuthState] = useState<'idle' | 'checking' | 'authenticated' | 'error'>('idle');
  
  const { data: user, isLoading, error } = useQuery({
    queryKey: ["/api/auth/user"],
    retry: (failureCount, error: any) => {
      // Don't retry auth errors or if offline
      if (error?.code === ErrorCode.AUTH_ERROR || !navigator.onLine) return false;
      return failureCount < 2;
    },
    throwOnError: false,
    retryOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });

  // Handle query state changes with useEffect
  useEffect(() => {
    if (error) {
      setAuthState('error');
      console.warn('Authentication check failed:', {
        error,
        online: navigator.onLine,
        timestamp: new Date().toISOString()
      });
      
      if (!error?.code) {
        createError(
          ErrorCode.AUTH_ERROR,
          'Authentication verification failed',
          error,
          { context: 'user_verification' }
        );
      }
    } else if (user) {
      setAuthState('authenticated');
    } else if (!isLoading) {
      setAuthState('idle');
    }
  }, [user, error, isLoading, createError]);

  const logoutMutation = useMutation({
    mutationFn: async () => {
      try {
        // Use enhanced API request with error handling
        const response = await apiRequest("POST", "/api/auth/logout", undefined, {
          timeout: 8000,
          retries: false, // Don't retry logout
          context: { action: 'logout' }
        });
        return response.json();
      } catch (error: any) {
        // Log error but don't fail logout - we want to clear local state regardless
        console.warn('Logout API request failed, proceeding with local cleanup:', error);
        return { success: true, warning: 'Server logout failed' };
      }
    },
    onMutate: () => {
      // Immediately update UI state
      setAuthState('idle');
    },
    onSuccess: (data) => {
      try {
        // Clear all cached data on logout
        queryClient.clear();
        
        // Clear localStorage including onboarding completion
        localStorage.removeItem('oppb-onboarding-completed');
        
        // Clear other OPPB-specific data while preserving non-app data
        const keysToRemove = ['oppb-', 'payment-', 'auth-', 'user-'];
        Object.keys(localStorage).forEach(key => {
          if (keysToRemove.some(prefix => key.startsWith(prefix))) {
            localStorage.removeItem(key);
          }
        });
        
        // Log successful logout
        if (data?.warning) {
          createError(
            ErrorCode.AUTH_ERROR,
            'Logged out successfully with warnings',
            data,
            { context: 'logout_warning' }
          );
        }
        
        // Small delay to ensure state updates, then redirect
        setTimeout(() => {
          window.location.href = '/';
          window.location.reload();
        }, 100);
      } catch (error) {
        createError(
          ErrorCode.UNKNOWN_ERROR,
          'Error during logout cleanup',
          error,
          { context: 'logout_cleanup' }
        );
        // Force redirect anyway
        setTimeout(() => {
          window.location.href = '/';
          window.location.reload();
        }, 100);
      }
    },
    onError: (error) => {
      try {
        createError(
          ErrorCode.AUTH_ERROR,
          'Logout encountered issues but completed locally',
          error,
          { context: 'logout_error' }
        );
        
        // Even if logout API fails, clear local state
        queryClient.clear();
        localStorage.removeItem('oppb-onboarding-completed');
        
        // Clear OPPB-specific localStorage items
        const keysToRemove = ['oppb-', 'payment-', 'auth-', 'user-'];
        Object.keys(localStorage).forEach(key => {
          if (keysToRemove.some(prefix => key.startsWith(prefix))) {
            localStorage.removeItem(key);
          }
        });
        
        // Redirect anyway to ensure user is logged out on frontend
        setTimeout(() => {
          window.location.href = '/';
          window.location.reload();
        }, 100);
      } catch (cleanupError) {
        console.error("Critical error during logout cleanup:", cleanupError);
        // Last resort - force redirect
        window.location.href = '/';
        window.location.reload();
      }
    }
  });

  const safeLogout = useCallback(() => {
    try {
      // Immediately clear the query cache to trigger re-render
      queryClient.setQueryData(["/api/auth/user"], null);
      setAuthState('idle');
      
      // Execute the logout mutation
      logoutMutation.mutate();
    } catch (error) {
      createError(
        ErrorCode.UNKNOWN_ERROR,
        'Failed to initiate logout',
        error,
        { context: 'safe_logout' }
      );
      
      // Force logout even on error
      queryClient.clear();
      localStorage.removeItem('oppb-onboarding-completed');
      setTimeout(() => {
        window.location.href = '/';
        window.location.reload();
      }, 100);
    }
  }, [queryClient, logoutMutation, createError, setAuthState]);

  return {
    user,
    isLoading,
    isAuthenticated: !!user && !error,
    authState,
    logout: safeLogout,
    isLoggingOut: logoutMutation.isPending,
    error,
    hasAuthError: !!error,
    // Additional utilities for error handling
    canRetry: error && navigator.onLine,
    retryAuth: () => queryClient.invalidateQueries({ queryKey: ["/api/auth/user"] })
  };
}
