import React from "react";
import { createRoot } from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
import "./index.css";
import { queryClient } from "@/lib/queryClient";
import { ErrorHandler } from "@/lib/errorHandler";
import { ErrorBoundary as ComprehensiveErrorBoundary, NetworkStatus } from "@/components/ErrorBoundary";

// PWA Type Declarations
declare global {
  interface Navigator {
    standalone?: boolean;
  }
  
  interface Window {
    deferredPrompt?: any;
  }
}

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

// Initialize global error handling
ErrorHandler.setupGlobalErrorHandlers();

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

// PWA Service Worker Registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('✓ PWA Service Worker registered successfully:', registration.scope);
      
      // Handle updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              console.log('✓ New PWA content is available');
              // Optionally show update notification to user
            }
          });
        }
      });
    } catch (error) {
      console.error('PWA Service Worker registration failed:', error);
    }
  });
}

// Enhanced PWA Installation Experience
class PWAInstaller {
  private deferredPrompt: any = null;
  private installButton: HTMLElement | null = null;
  private isInstalled: boolean = false;

  constructor() {
    this.init();
  }
  
  init() {
    // Check if already installed
    this.checkInstallStatus();
    
    // Listen for install prompt
    window.addEventListener('beforeinstallprompt', (e) => this.handleInstallPrompt(e));
    
    // Listen for successful installation
    window.addEventListener('appinstalled', () => this.handleInstallSuccess());
    
    // Check for iOS Safari install capability
    this.handleIOSInstall();
  }
  
  checkInstallStatus() {
    // Check if running as installed PWA
    if (window.matchMedia('(display-mode: standalone)').matches ||
        window.navigator.standalone === true ||
        document.referrer.includes('android-app://')) {
      this.isInstalled = true;
      console.log('✓ OPPB running as installed PWA');
      return;
    }
    
    // Check for previous installation
    if (localStorage.getItem('pwa-install-dismissed') === 'true') {
      return;
    }
  }
  
  handleInstallPrompt(e: any) {
    console.log('✓ PWA install prompt available');
    e.preventDefault();
    this.deferredPrompt = e;
    
    // Wait a bit before showing install prompt to avoid immediate popup
    setTimeout(() => {
      this.showInstallUI();
    }, 3000);
  }
  
  showInstallUI() {
    if (this.isInstalled || this.installButton) return;
    
    // Create enhanced install banner
    const banner = document.createElement('div');
    banner.className = 'pwa-install-banner';
    banner.innerHTML = `
      <div class="pwa-banner-content">
        <div class="pwa-banner-icon">📱</div>
        <div class="pwa-banner-text">
          <h3>Install OPPB App</h3>
          <p>Get native app experience with offline payments</p>
        </div>
        <div class="pwa-banner-actions">
          <button class="pwa-install-btn">Install</button>
          <button class="pwa-dismiss-btn">×</button>
        </div>
      </div>
    `;
    
    // Add enhanced styling
    const style = document.createElement('style');
    style.textContent = `
      .pwa-install-banner {
        position: fixed;
        bottom: 20px;
        left: 20px;
        right: 20px;
        max-width: 400px;
        margin: 0 auto;
        background: rgba(0, 0, 0, 0.95);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(99, 102, 241, 0.3);
        border-radius: 16px;
        padding: 16px;
        z-index: 10000;
        animation: slideUp 0.4s ease-out;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
      }
      
      .pwa-banner-content {
        display: flex;
        align-items: center;
        gap: 12px;
      }
      
      .pwa-banner-icon {
        font-size: 32px;
        flex-shrink: 0;
      }
      
      .pwa-banner-text {
        flex: 1;
        color: white;
      }
      
      .pwa-banner-text h3 {
        margin: 0 0 4px 0;
        font-size: 16px;
        font-weight: 600;
      }
      
      .pwa-banner-text p {
        margin: 0;
        font-size: 14px;
        opacity: 0.8;
      }
      
      .pwa-banner-actions {
        display: flex;
        gap: 8px;
        align-items: center;
      }
      
      .pwa-install-btn {
        background: linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%);
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 8px;
        font-weight: 600;
        font-size: 14px;
        cursor: pointer;
        transition: all 0.3s ease;
      }
      
      .pwa-install-btn:hover {
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
      }
      
      .pwa-dismiss-btn {
        background: rgba(255, 255, 255, 0.1);
        color: white;
        border: none;
        width: 32px;
        height: 32px;
        border-radius: 8px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        transition: all 0.3s ease;
      }
      
      .pwa-dismiss-btn:hover {
        background: rgba(255, 255, 255, 0.2);
      }
      
      @keyframes slideUp {
        from {
          transform: translateY(100px);
          opacity: 0;
        }
        to {
          transform: translateY(0);
          opacity: 1;
        }
      }
      
      @media (max-width: 480px) {
        .pwa-install-banner {
          left: 10px;
          right: 10px;
          bottom: 10px;
        }
      }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(banner);
    this.installButton = banner;
    
    // Add event listeners
    banner.querySelector('.pwa-install-btn')?.addEventListener('click', () => this.installApp());
    banner.querySelector('.pwa-dismiss-btn')?.addEventListener('click', () => this.dismissInstall());
  }
  
  async installApp() {
    if (!this.deferredPrompt) return;
    
    try {
      // Show the install prompt
      this.deferredPrompt.prompt();
      
      // Wait for user choice
      const result = await this.deferredPrompt.userChoice;
      console.log(`PWA install result: ${result.outcome}`);
      
      if (result.outcome === 'accepted') {
        console.log('✓ User accepted PWA installation');
      } else {
        console.log('User dismissed PWA installation');
      }
      
      // Clean up
      this.deferredPrompt = null;
      this.removeInstallUI();
      
    } catch (error) {
      console.error('PWA installation failed:', error);
    }
  }
  
  dismissInstall() {
    localStorage.setItem('pwa-install-dismissed', 'true');
    this.removeInstallUI();
  }
  
  removeInstallUI() {
    if (this.installButton) {
      this.installButton.style.animation = 'slideDown 0.3s ease-out forwards';
      setTimeout(() => {
        this.installButton?.remove();
        this.installButton = null;
      }, 300);
    }
  }
  
  handleInstallSuccess() {
    console.log('✓ OPPB PWA installed successfully');
    this.isInstalled = true;
    this.removeInstallUI();
    
    // Show success message
    this.showInstallSuccessMessage();
  }
  
  showInstallSuccessMessage() {
    const message = document.createElement('div');
    message.innerHTML = `
      <div style="
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(34, 197, 94, 0.95);
        color: white;
        padding: 12px 24px;
        border-radius: 12px;
        font-weight: 600;
        z-index: 10001;
        animation: fadeInOut 3s ease-out forwards;
      ">
        ✓ OPPB installed successfully!
      </div>
    `;
    
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeInOut {
        0% { opacity: 0; transform: translateX(-50%) translateY(-20px); }
        20%, 80% { opacity: 1; transform: translateX(-50%) translateY(0); }
        100% { opacity: 0; transform: translateX(-50%) translateY(-20px); }
      }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(message);
    
    setTimeout(() => {
      message.remove();
      style.remove();
    }, 3000);
  }
  
  handleIOSInstall() {
    // iOS Safari specific install guidance
    if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !this.isInstalled) {
      const isInStandaloneMode = window.navigator.standalone;
      
      if (!isInStandaloneMode && !localStorage.getItem('ios-install-shown')) {
        setTimeout(() => {
          this.showIOSInstallGuide();
        }, 5000);
      }
    }
  }
  
  showIOSInstallGuide() {
    const guide = document.createElement('div');
    guide.innerHTML = `
      <div style="
        position: fixed;
        bottom: 20px;
        left: 20px;
        right: 20px;
        max-width: 400px;
        margin: 0 auto;
        background: rgba(0, 0, 0, 0.95);
        color: white;
        padding: 20px;
        border-radius: 16px;
        z-index: 10000;
        text-align: center;
      ">
        <h3 style="margin: 0 0 12px 0; font-size: 18px;">Install OPPB on iOS</h3>
        <p style="margin: 0 0 16px 0; font-size: 14px; opacity: 0.9;">
          Tap the Share button <span style="font-size: 18px;">⬆️</span> then "Add to Home Screen"
        </p>
        <button onclick="this.parentElement.remove(); localStorage.setItem('ios-install-shown', 'true');" style="
          background: #007AFF;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
        ">Got it</button>
      </div>
    `;
    
    document.body.appendChild(guide);
  }
}

// Initialize PWA installer
new PWAInstaller();

// Note: PWA installation handled by PWAInstaller class above

// Render the app
renderApp();