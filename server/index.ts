import "dotenv/config";
import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  // Enhanced error handling middleware
  app.use((err: any, req: Request, res: Response, _next: NextFunction) => {
    // Log error with detailed context
    const errorContext = {
      method: req.method,
      url: req.url,
      userAgent: req.get('User-Agent'),
      ip: req.ip || req.connection.remoteAddress,
      timestamp: new Date().toISOString(),
      userId: (req.session as any)?.userId || 'anonymous'
    };
    
    console.error("OPPB Server Error:", {
      message: err.message,
      name: err.name,
      stack: err.stack,
      context: errorContext
    });

    // Determine error type and status code
    let statusCode = err.status || err.statusCode || 500;
    let errorCode = 'SERVER_ERROR';
    let message = err.message || 'Internal server error';

    // Map specific error types
    switch (err.name) {
      case 'ValidationError':
        statusCode = 400;
        errorCode = 'VALIDATION_ERROR';
        break;
      case 'UnauthorizedError':
        statusCode = 401;
        errorCode = 'AUTH_ERROR';
        message = 'Authentication required';
        break;
      case 'ForbiddenError':
        statusCode = 403;
        errorCode = 'AUTH_ERROR';
        message = 'Access denied';
        break;
      case 'NotFoundError':
        statusCode = 404;
        errorCode = 'SERVER_ERROR';
        message = 'Resource not found';
        break;
      case 'PaymentError':
        statusCode = 400;
        errorCode = 'PAYMENT_ERROR';
        break;
      case 'InsufficientFundsError':
        statusCode = 400;
        errorCode = 'INSUFFICIENT_FUNDS';
        message = 'Insufficient balance for this transaction';
        break;
    }

    // Send structured error response
    const errorResponse = {
      error: {
        code: errorCode,
        message: message,
        timestamp: Date.now()
      }
    };

    // Include debug info in development
    if (process.env.NODE_ENV === 'development') {
      (errorResponse.error as any).details = err.message;
      (errorResponse.error as any).stack = err.stack;
    }

    res.status(statusCode).json(errorResponse);
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on port 5000
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = 5000;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`serving on port ${port}`);
  });
})();
