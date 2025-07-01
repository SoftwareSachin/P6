import React from 'react';
import { useErrorHandler, ErrorHandler, AppError, ErrorCode } from '@/lib/errorHandler';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, CheckCircle, XCircle, Clock, Wifi, WifiOff, RefreshCw } from 'lucide-react';

export const ErrorMonitorDashboard: React.FC = () => {
  const { errors, clearErrors, dismissError } = useErrorHandler();
  const [isOnline, setIsOnline] = React.useState(navigator.onLine);
  const [systemHealth, setSystemHealth] = React.useState<'healthy' | 'warning' | 'critical'>('healthy');

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

  React.useEffect(() => {
    // Determine system health based on recent errors
    const recentErrors = errors.filter(err => Date.now() - err.timestamp < 60000); // Last minute
    const criticalErrors = recentErrors.filter(err => 
      err.code === ErrorCode.AUTH_ERROR || 
      err.code === ErrorCode.PAYMENT_ERROR ||
      err.code === ErrorCode.SERVER_ERROR
    );

    if (criticalErrors.length > 0) {
      setSystemHealth('critical');
    } else if (recentErrors.length > 3) {
      setSystemHealth('warning');
    } else {
      setSystemHealth('healthy');
    }
  }, [errors]);

  const errorCounts = React.useMemo(() => {
    const counts: Record<ErrorCode, number> = {} as Record<ErrorCode, number>;
    errors.forEach(error => {
      counts[error.code] = (counts[error.code] || 0) + 1;
    });
    return counts;
  }, [errors]);

  const getErrorTypeColor = (code: ErrorCode): string => {
    switch (code) {
      case ErrorCode.AUTH_ERROR:
      case ErrorCode.PAYMENT_ERROR:
        return 'bg-red-500';
      case ErrorCode.NETWORK_ERROR:
      case ErrorCode.TIMEOUT_ERROR:
        return 'bg-yellow-500';
      case ErrorCode.VALIDATION_ERROR:
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  const testErrorHandling = () => {
    // Test different error types
    ErrorHandler.createError(ErrorCode.NETWORK_ERROR, 'Test network error', null, { test: true });
    ErrorHandler.createError(ErrorCode.VALIDATION_ERROR, 'Test validation error', null, { test: true });
    ErrorHandler.createError(ErrorCode.PAYMENT_ERROR, 'Test payment error', null, { test: true });
  };

  if (process.env.NODE_ENV !== 'development') {
    return null; // Only show in development
  }

  return (
    <div className="fixed bottom-4 left-4 w-80 z-50">
      <Card className="bg-white/90 backdrop-blur-sm border shadow-lg">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center justify-between text-sm">
            <span>System Monitor</span>
            <div className="flex items-center gap-2">
              {isOnline ? (
                <Wifi className="w-4 h-4 text-green-500" />
              ) : (
                <WifiOff className="w-4 h-4 text-red-500" />
              )}
              {systemHealth === 'healthy' && <CheckCircle className="w-4 h-4 text-green-500" />}
              {systemHealth === 'warning' && <AlertTriangle className="w-4 h-4 text-yellow-500" />}
              {systemHealth === 'critical' && <XCircle className="w-4 h-4 text-red-500" />}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {/* System Status */}
          <div className="flex items-center justify-between text-xs">
            <span>Status:</span>
            <Badge variant={systemHealth === 'healthy' ? 'default' : 'destructive'}>
              {systemHealth.toUpperCase()}
            </Badge>
          </div>

          {/* Error Counts */}
          {Object.entries(errorCounts).length > 0 && (
            <div className="space-y-1">
              <div className="text-xs font-medium">Error Types:</div>
              {Object.entries(errorCounts).map(([code, count]) => (
                <div key={code} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${getErrorTypeColor(code as ErrorCode)}`} />
                    <span>{code.replace('_', ' ')}</span>
                  </div>
                  <span className="font-medium">{count}</span>
                </div>
              ))}
            </div>
          )}

          {/* Recent Errors */}
          {errors.length > 0 && (
            <div className="space-y-1 max-h-32 overflow-y-auto">
              <div className="text-xs font-medium">Recent Errors:</div>
              {errors.slice(0, 3).map((error, index) => (
                <div key={index} className="bg-gray-50 rounded p-2 text-xs">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">
                      {error.code}
                    </Badge>
                    <div className="flex items-center gap-1 text-gray-400">
                      <Clock className="w-3 h-3" />
                      <span>{new Date(error.timestamp).toLocaleTimeString()}</span>
                    </div>
                  </div>
                  <div className="mt-1 text-gray-600 truncate">
                    {error.message}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2">
            <Button
              onClick={clearErrors}
              size="sm"
              variant="outline"
              className="flex-1 text-xs"
              disabled={errors.length === 0}
            >
              Clear All
            </Button>
            <Button
              onClick={testErrorHandling}
              size="sm"
              variant="outline"
              className="flex-1 text-xs"
            >
              Test Errors
            </Button>
          </div>

          {/* Service Worker Status */}
          <div className="text-xs text-gray-500 border-t pt-2">
            PWA: {navigator.serviceWorker ? 'Active' : 'Inactive'}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Real-time error toast notifications
export const ErrorToastManager: React.FC = () => {
  const { errors } = useErrorHandler();
  const [visibleErrors, setVisibleErrors] = React.useState<AppError[]>([]);

  React.useEffect(() => {
    // Show only new critical errors as toasts
    const newCriticalErrors = errors.filter(error => 
      Date.now() - error.timestamp < 1000 && // Very recent
      (error.code === ErrorCode.PAYMENT_ERROR || 
       error.code === ErrorCode.AUTH_ERROR ||
       error.code === ErrorCode.INSUFFICIENT_FUNDS)
    );

    if (newCriticalErrors.length > 0) {
      setVisibleErrors(prev => [...newCriticalErrors, ...prev].slice(0, 3)); // Max 3 toasts
    }
  }, [errors]);

  const dismissToast = (errorToRemove: AppError) => {
    setVisibleErrors(prev => prev.filter(error => error !== errorToRemove));
  };

  return (
    <div className="fixed top-4 right-4 space-y-2 z-50">
      {visibleErrors.map((error, index) => (
        <div
          key={`${error.timestamp}-${index}`}
          className="bg-red-500 text-white rounded-lg shadow-lg p-4 max-w-sm animate-in slide-in-from-right-2"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-5 h-5 mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-medium text-sm">Error</div>
                <div className="text-xs opacity-90 mt-1">
                  {ErrorHandler.getUserFriendlyMessage(error)}
                </div>
              </div>
            </div>
            <button
              onClick={() => dismissToast(error)}
              className="text-white/80 hover:text-white ml-2"
            >
              ×
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};