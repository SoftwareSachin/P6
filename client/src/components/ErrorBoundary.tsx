import React from 'react';
import { ErrorHandler, ErrorCode, AppError } from '@/lib/errorHandler';
import { Button } from '@/components/ui/button';
import { AlertCircle, RotateCcw, Home, Wifi, WifiOff } from 'lucide-react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: AppError;
  errorInfo?: React.ErrorInfo;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error: AppError; retry: () => void }>;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    const appError = ErrorHandler.createError(
      ErrorCode.UNKNOWN_ERROR,
      error.message || 'An unexpected error occurred',
      error,
      { boundary: true }
    );

    return {
      hasError: true,
      error: appError
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({ errorInfo });
    
    ErrorHandler.createError(
      ErrorCode.UNKNOWN_ERROR,
      'React component error boundary triggered',
      { error, errorInfo },
      { component: 'ErrorBoundary' }
    );
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  render() {
    if (this.state.hasError && this.state.error) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback;
      return <FallbackComponent error={this.state.error} retry={this.handleRetry} />;
    }

    return this.props.children;
  }
}

// Default error fallback component
const DefaultErrorFallback: React.FC<{ error: AppError; retry: () => void }> = ({ error, retry }) => {
  const isOffline = !navigator.onLine;
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-black flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 text-center">
        <div className="mb-6">
          {isOffline ? (
            <WifiOff className="w-16 h-16 text-red-400 mx-auto mb-4" />
          ) : (
            <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          )}
          
          <h2 className="text-2xl font-bold text-white mb-2">
            {isOffline ? 'You\'re Offline' : 'Something Went Wrong'}
          </h2>
          
          <p className="text-white/70 text-sm leading-relaxed">
            {ErrorHandler.getUserFriendlyMessage(error)}
          </p>
        </div>

        <div className="space-y-3">
          <Button 
            onClick={retry} 
            className="w-full bg-blue-500 hover:bg-blue-600 text-white"
            size="lg"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
          
          <Button 
            onClick={() => window.location.href = '/'} 
            variant="outline" 
            className="w-full border-white/30 text-white hover:bg-white/10"
            size="lg"
          >
            <Home className="w-4 h-4 mr-2" />
            Go Home
          </Button>
        </div>

        {process.env.NODE_ENV === 'development' && (
          <details className="mt-6 text-left">
            <summary className="text-white/50 text-xs cursor-pointer">Technical Details</summary>
            <pre className="text-xs text-white/40 mt-2 bg-black/20 p-2 rounded overflow-auto">
              {JSON.stringify(error, null, 2)}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
};

// Network status indicator
export const NetworkStatus: React.FC = () => {
  const [isOnline, setIsOnline] = React.useState(navigator.onLine);

  React.useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline) return null;

  return (
    <div className="fixed top-0 left-0 right-0 bg-red-500 text-white px-4 py-2 text-sm text-center z-50">
      <WifiOff className="w-4 h-4 inline mr-2" />
      You're offline. Some features may be limited.
    </div>
  );
};

// Inline error display component
export const InlineError: React.FC<{ 
  error?: AppError | null; 
  onRetry?: () => void;
  onDismiss?: () => void;
  className?: string;
}> = ({ error, onRetry, onDismiss, className = "" }) => {
  if (!error) return null;

  const strategy = ErrorHandler.getRetryStrategy(error);

  return (
    <div className={`bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 ${className}`}>
      <div className="flex items-start">
        <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
        <div className="flex-1">
          <p className="text-sm text-red-800 dark:text-red-200">
            {ErrorHandler.getUserFriendlyMessage(error)}
          </p>
          
          <div className="mt-3 flex gap-2">
            {strategy.canRetry && onRetry && (
              <Button
                onClick={onRetry}
                size="sm"
                variant="outline"
                className="text-red-700 border-red-300 hover:bg-red-50"
              >
                <RotateCcw className="w-3 h-3 mr-1" />
                Retry
              </Button>
            )}
            
            {onDismiss && (
              <Button
                onClick={onDismiss}
                size="sm"
                variant="ghost"
                className="text-red-600"
              >
                Dismiss
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Loading state with error handling
export const LoadingWithError: React.FC<{
  isLoading: boolean;
  error?: AppError | null;
  onRetry?: () => void;
  children: React.ReactNode;
  loadingText?: string;
}> = ({ isLoading, error, onRetry, children, loadingText = "Loading..." }) => {
  if (error) {
    return <InlineError error={error} onRetry={onRetry} className="m-4" />;
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mr-3"></div>
        <span className="text-gray-600 dark:text-gray-400">{loadingText}</span>
      </div>
    );
  }

  return <>{children}</>;
};

// Toast notification for errors
export const ErrorToast: React.FC<{ 
  error: AppError; 
  onDismiss: () => void;
  duration?: number;
}> = ({ error, onDismiss, duration = 5000 }) => {
  React.useEffect(() => {
    const timer = setTimeout(onDismiss, duration);
    return () => clearTimeout(timer);
  }, [onDismiss, duration]);

  return (
    <div className="fixed bottom-4 right-4 bg-red-500 text-white rounded-lg shadow-lg p-4 max-w-sm z-50 animate-in slide-in-from-bottom-2">
      <div className="flex items-start">
        <AlertCircle className="w-5 h-5 mt-0.5 mr-3 flex-shrink-0" />
        <div className="flex-1">
          <p className="text-sm font-medium">Error</p>
          <p className="text-xs opacity-90 mt-1">
            {ErrorHandler.getUserFriendlyMessage(error)}
          </p>
        </div>
        <button
          onClick={onDismiss}
          className="ml-2 text-white/80 hover:text-white"
        >
          ×
        </button>
      </div>
    </div>
  );
};