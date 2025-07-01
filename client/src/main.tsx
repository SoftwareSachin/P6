import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Error boundary component
function ErrorFallback({ error }: { error: Error }) {
  return (
    <div style={{
      padding: '20px',
      margin: '20px',
      border: '1px solid #ff6b6b',
      borderRadius: '8px',
      backgroundColor: '#ffe0e0',
      color: '#d63031'
    }}>
      <h2 style={{ margin: '0 0 10px 0', fontSize: '18px' }}>Something went wrong</h2>
      <details style={{ fontSize: '14px' }}>
        <summary style={{ cursor: 'pointer', marginBottom: '10px' }}>View error details</summary>
        <pre style={{ 
          backgroundColor: '#f8f9fa', 
          padding: '10px', 
          borderRadius: '4px', 
          overflow: 'auto',
          fontSize: '12px'
        }}>
          {error.message}
          {error.stack && '\n\nStack trace:\n' + error.stack}
        </pre>
      </details>
      <button 
        onClick={() => window.location.reload()} 
        style={{
          marginTop: '10px',
          padding: '8px 16px',
          backgroundColor: '#6c5ce7',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Reload App
      </button>
    </div>
  );
}

// Error Boundary implementation
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('React Error Boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError && this.state.error) {
      return <ErrorFallback error={this.state.error} />;
    }

    return this.props.children;
  }
}

// Global error handlers
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
  event.preventDefault();
});

window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
});

// Safe app rendering
function renderApp() {
  try {
    const rootElement = document.getElementById("root");
    if (!rootElement) {
      throw new Error("Root element not found in DOM");
    }

    const root = createRoot(rootElement);
    
    root.render(
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    );
    
    console.log("✓ OPPB app rendered successfully");
  } catch (error) {
    console.error("Failed to render app:", error);
    
    const rootElement = document.getElementById("root");
    if (rootElement) {
      rootElement.innerHTML = `
        <div style="padding: 20px; color: #d63031; font-family: system-ui;">
          <h2>App Failed to Load</h2>
          <p>There was an error starting the OPPB application.</p>
          <button onclick="window.location.reload()" style="padding: 8px 16px; background: #6c5ce7; color: white; border: none; border-radius: 4px; cursor: pointer;">
            Reload Page
          </button>
        </div>
      `;
    }
  }
}

// Render the app
renderApp();