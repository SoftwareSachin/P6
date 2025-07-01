// Comprehensive Error Handling System for OPPB
import React from 'react';
export enum ErrorCode {
  NETWORK_ERROR = 'NETWORK_ERROR',
  AUTH_ERROR = 'AUTH_ERROR',
  PAYMENT_ERROR = 'PAYMENT_ERROR',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  SERVER_ERROR = 'SERVER_ERROR',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
  OFFLINE_ERROR = 'OFFLINE_ERROR',
  TIMEOUT_ERROR = 'TIMEOUT_ERROR',
  RATE_LIMIT_ERROR = 'RATE_LIMIT_ERROR',
  INSUFFICIENT_FUNDS = 'INSUFFICIENT_FUNDS',
  MERCHANT_ERROR = 'MERCHANT_ERROR'
}

export interface AppError {
  code: ErrorCode;
  message: string;
  details?: any;
  timestamp: number;
  stack?: string;
  context?: Record<string, any>;
}

export class ErrorHandler {
  private static errors: AppError[] = [];
  private static maxErrors = 100;
  private static listeners: ((error: AppError) => void)[] = [];

  static createError(
    code: ErrorCode,
    message: string,
    details?: any,
    context?: Record<string, any>
  ): AppError {
    const error: AppError = {
      code,
      message,
      details,
      timestamp: Date.now(),
      stack: new Error().stack,
      context
    };

    this.logError(error);
    this.notifyListeners(error);
    return error;
  }

  static logError(error: AppError): void {
    // Add to error history
    this.errors.unshift(error);
    if (this.errors.length > this.maxErrors) {
      this.errors = this.errors.slice(0, this.maxErrors);
    }

    // Console logging with appropriate level
    const logLevel = this.getLogLevel(error.code);
    const logMessage = `[OPPB ${error.code}] ${error.message}`;
    
    switch (logLevel) {
      case 'error':
        console.error(logMessage, error);
        break;
      case 'warn':
        console.warn(logMessage, error);
        break;
      default:
        console.log(logMessage, error);
    }

    // Send to monitoring service in production
    if (process.env.NODE_ENV === 'production') {
      this.sendToMonitoring(error);
    }
  }

  static getLogLevel(code: ErrorCode): 'error' | 'warn' | 'info' {
    switch (code) {
      case ErrorCode.AUTH_ERROR:
      case ErrorCode.PAYMENT_ERROR:
      case ErrorCode.SERVER_ERROR:
        return 'error';
      case ErrorCode.NETWORK_ERROR:
      case ErrorCode.TIMEOUT_ERROR:
      case ErrorCode.RATE_LIMIT_ERROR:
        return 'warn';
      default:
        return 'info';
    }
  }

  static handleAPIError(response: Response, context?: Record<string, any>): AppError {
    const { status, statusText } = response;
    
    let code: ErrorCode;
    let message: string;

    switch (status) {
      case 400:
        code = ErrorCode.VALIDATION_ERROR;
        message = 'Invalid request data';
        break;
      case 401:
        code = ErrorCode.AUTH_ERROR;
        message = 'Authentication required';
        break;
      case 403:
        code = ErrorCode.AUTH_ERROR;
        message = 'Access denied';
        break;
      case 404:
        code = ErrorCode.SERVER_ERROR;
        message = 'Resource not found';
        break;
      case 408:
        code = ErrorCode.TIMEOUT_ERROR;
        message = 'Request timeout';
        break;
      case 429:
        code = ErrorCode.RATE_LIMIT_ERROR;
        message = 'Too many requests';
        break;
      case 500:
      case 502:
      case 503:
      case 504:
        code = ErrorCode.SERVER_ERROR;
        message = 'Server error occurred';
        break;
      default:
        code = ErrorCode.UNKNOWN_ERROR;
        message = `HTTP ${status}: ${statusText}`;
    }

    return this.createError(code, message, { status, statusText }, context);
  }

  static handleNetworkError(error: Error, context?: Record<string, any>): AppError {
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      return this.createError(
        ErrorCode.NETWORK_ERROR,
        'Network connection failed',
        error,
        context
      );
    }

    if (error.name === 'AbortError') {
      return this.createError(
        ErrorCode.TIMEOUT_ERROR,
        'Request was cancelled',
        error,
        context
      );
    }

    return this.createError(
      ErrorCode.UNKNOWN_ERROR,
      error.message || 'Unknown error occurred',
      error,
      context
    );
  }

  static handlePaymentError(error: any, context?: Record<string, any>): AppError {
    if (error.code === 'insufficient_funds') {
      return this.createError(
        ErrorCode.INSUFFICIENT_FUNDS,
        'Insufficient balance for this transaction',
        error,
        context
      );
    }

    if (error.code === 'merchant_unavailable') {
      return this.createError(
        ErrorCode.MERCHANT_ERROR,
        'Merchant is currently unavailable',
        error,
        context
      );
    }

    return this.createError(
      ErrorCode.PAYMENT_ERROR,
      error.message || 'Payment processing failed',
      error,
      context
    );
  }

  static getUserFriendlyMessage(error: AppError): string {
    switch (error.code) {
      case ErrorCode.NETWORK_ERROR:
        return 'Please check your internet connection and try again';
      case ErrorCode.AUTH_ERROR:
        return 'Please log in again to continue';
      case ErrorCode.PAYMENT_ERROR:
        return 'Payment could not be processed. Please try again';
      case ErrorCode.INSUFFICIENT_FUNDS:
        return 'Insufficient balance. Please add money to your account';
      case ErrorCode.MERCHANT_ERROR:
        return 'This merchant is temporarily unavailable';
      case ErrorCode.VALIDATION_ERROR:
        return 'Please check your input and try again';
      case ErrorCode.TIMEOUT_ERROR:
        return 'Request timed out. Please try again';
      case ErrorCode.RATE_LIMIT_ERROR:
        return 'Too many attempts. Please wait before trying again';
      case ErrorCode.OFFLINE_ERROR:
        return 'You are offline. Some features may be limited';
      default:
        return 'Something went wrong. Please try again';
    }
  }

  static getRetryStrategy(error: AppError): { canRetry: boolean; delay?: number; maxRetries?: number } {
    switch (error.code) {
      case ErrorCode.NETWORK_ERROR:
      case ErrorCode.TIMEOUT_ERROR:
        return { canRetry: true, delay: 1000, maxRetries: 3 };
      case ErrorCode.RATE_LIMIT_ERROR:
        return { canRetry: true, delay: 5000, maxRetries: 2 };
      case ErrorCode.SERVER_ERROR:
        return { canRetry: true, delay: 2000, maxRetries: 2 };
      case ErrorCode.AUTH_ERROR:
      case ErrorCode.VALIDATION_ERROR:
      case ErrorCode.INSUFFICIENT_FUNDS:
        return { canRetry: false };
      default:
        return { canRetry: true, delay: 1000, maxRetries: 1 };
    }
  }

  static addErrorListener(listener: (error: AppError) => void): void {
    this.listeners.push(listener);
  }

  static removeErrorListener(listener: (error: AppError) => void): void {
    this.listeners = this.listeners.filter(l => l !== listener);
  }

  private static notifyListeners(error: AppError): void {
    this.listeners.forEach(listener => {
      try {
        listener(error);
      } catch (err) {
        console.error('Error in error listener:', err);
      }
    });
  }

  private static sendToMonitoring(error: AppError): void {
    // In production, send to monitoring service like Sentry
    try {
      fetch('/api/errors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(error)
      }).catch(() => {
        // Silently fail if monitoring is not available
      });
    } catch (err) {
      // Silently fail
    }
  }

  static getErrorHistory(): AppError[] {
    return [...this.errors];
  }

  static clearErrorHistory(): void {
    this.errors = [];
  }

  static isOffline(): boolean {
    return !navigator.onLine;
  }

  static setupGlobalErrorHandlers(): void {
    // Catch unhandled errors
    window.addEventListener('error', (event) => {
      this.createError(
        ErrorCode.UNKNOWN_ERROR,
        event.message || 'Unhandled error',
        {
          filename: event.filename,
          lineno: event.lineno,
          colno: event.colno,
          error: event.error
        }
      );
    });

    // Catch unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      this.createError(
        ErrorCode.UNKNOWN_ERROR,
        'Unhandled promise rejection',
        event.reason
      );
    });

    // Monitor online/offline status
    window.addEventListener('online', () => {
      console.log('[OPPB] Connection restored');
    });

    window.addEventListener('offline', () => {
      this.createError(
        ErrorCode.OFFLINE_ERROR,
        'Device is offline',
        null,
        { online: false }
      );
    });
  }
}

// React Hook for Error Handling
export function useErrorHandler() {
  const [errors, setErrors] = React.useState<AppError[]>([]);

  React.useEffect(() => {
    const handleError = (error: AppError) => {
      setErrors(prev => [error, ...prev.slice(0, 9)]); // Keep last 10 errors
    };

    ErrorHandler.addErrorListener(handleError);
    return () => ErrorHandler.removeErrorListener(handleError);
  }, []);

  const clearErrors = () => setErrors([]);
  
  const dismissError = (index: number) => {
    setErrors(prev => prev.filter((_, i) => i !== index));
  };

  return {
    errors,
    clearErrors,
    dismissError,
    createError: ErrorHandler.createError,
    getUserFriendlyMessage: ErrorHandler.getUserFriendlyMessage,
    getRetryStrategy: ErrorHandler.getRetryStrategy
  };
}

// Auto-retry utility
export async function withRetry<T>(
  fn: () => Promise<T>,
  context?: Record<string, any>
): Promise<T> {
  let lastError: AppError | null = null;
  let retryCount = 0;

  while (true) {
    try {
      return await fn();
    } catch (error) {
      const appError = error instanceof Error 
        ? ErrorHandler.handleNetworkError(error, context)
        : ErrorHandler.createError(ErrorCode.UNKNOWN_ERROR, 'Unknown error', error, context);
      
      lastError = appError;
      const strategy = ErrorHandler.getRetryStrategy(appError);
      
      if (!strategy.canRetry || retryCount >= (strategy.maxRetries || 1)) {
        throw appError;
      }
      
      retryCount++;
      
      if (strategy.delay) {
        await new Promise(resolve => setTimeout(resolve, strategy.delay));
      }
    }
  }
}