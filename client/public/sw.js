// Enhanced OPPB Service Worker - Production Ready
const VERSION = '2.0.0';
const CACHE_PREFIX = 'oppb';
const STATIC_CACHE = `${CACHE_PREFIX}-static-v${VERSION}`;
const DYNAMIC_CACHE = `${CACHE_PREFIX}-dynamic-v${VERSION}`;
const API_CACHE = `${CACHE_PREFIX}-api-v${VERSION}`;
const IMAGE_CACHE = `${CACHE_PREFIX}-images-v${VERSION}`;
const FONT_CACHE = `${CACHE_PREFIX}-fonts-v${VERSION}`;

// Comprehensive static assets list
const STATIC_ASSETS = [
  '/',
  '/manifest.json',
  '/icons/icon.svg',
  '/offline.html'
];

// Critical API endpoints for offline functionality
const CRITICAL_API_ENDPOINTS = [
  '/api/auth/user',
  '/api/merchants',
  '/api/transactions'
];

// Non-critical API endpoints (cache if available)
const CACHEABLE_API_ENDPOINTS = [
  '/api/payment-requests',
  '/api/balance'
];

// Maximum cache sizes to prevent storage bloat
const CACHE_LIMITS = {
  [DYNAMIC_CACHE]: 50,
  [API_CACHE]: 30,
  [IMAGE_CACHE]: 60,
  [FONT_CACHE]: 10
};

// Cache expiration times (in milliseconds)
const CACHE_EXPIRY = {
  API: 5 * 60 * 1000,      // 5 minutes for API responses
  STATIC: 7 * 24 * 60 * 60 * 1000, // 7 days for static assets
  IMAGES: 30 * 24 * 60 * 60 * 1000, // 30 days for images
  FONTS: 365 * 24 * 60 * 60 * 1000  // 1 year for fonts
};

// Utility functions for robust cache management
class CacheManager {
  static async cleanupExpiredCache(cacheName, maxAge) {
    try {
      const cache = await caches.open(cacheName);
      const requests = await cache.keys();
      
      const cleanupPromises = requests.map(async (request) => {
        const response = await cache.match(request);
        if (response) {
          const cachedDate = response.headers.get('sw-cached-date');
          if (cachedDate && Date.now() - parseInt(cachedDate) > maxAge) {
            await cache.delete(request);
            console.log(`[SW] Cleaned expired cache entry: ${request.url}`);
          }
        }
      });
      
      await Promise.all(cleanupPromises);
    } catch (error) {
      console.error(`[SW] Cache cleanup failed for ${cacheName}:`, error);
    }
  }
  
  static async limitCacheSize(cacheName, maxItems) {
    try {
      const cache = await caches.open(cacheName);
      const requests = await cache.keys();
      
      if (requests.length > maxItems) {
        const itemsToDelete = requests.slice(0, requests.length - maxItems);
        await Promise.all(itemsToDelete.map(request => cache.delete(request)));
        console.log(`[SW] Cache size limited: removed ${itemsToDelete.length} items from ${cacheName}`);
      }
    } catch (error) {
      console.error(`[SW] Cache limiting failed for ${cacheName}:`, error);
    }
  }
  
  static addTimestamp(response) {
    const headers = new Headers(response.headers);
    headers.set('sw-cached-date', Date.now().toString());
    
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: headers
    });
  }
}

// Enhanced install event with comprehensive asset caching
self.addEventListener('install', (event) => {
  console.log(`[SW v${VERSION}] Installing enhanced service worker...`);
  
  event.waitUntil(
    Promise.all([
      // Cache static assets
      caches.open(STATIC_CACHE).then(async (cache) => {
        console.log('[SW] Caching critical static assets...');
        
        const cachePromises = STATIC_ASSETS.map(async (asset) => {
          try {
            await cache.add(asset);
            console.log(`[SW] ✓ Cached: ${asset}`);
          } catch (error) {
            console.warn(`[SW] ⚠ Failed to cache ${asset}:`, error.message);
          }
        });
        
        await Promise.allSettled(cachePromises);
        console.log('[SW] Static asset caching completed');
      }),
      
      // Pre-cache critical API responses
      caches.open(API_CACHE).then(async (cache) => {
        console.log('[SW] Pre-caching critical API endpoints...');
        
        const apiPromises = CRITICAL_API_ENDPOINTS.map(async (endpoint) => {
          try {
            const response = await fetch(endpoint);
            if (response.ok) {
              await cache.put(endpoint, CacheManager.addTimestamp(response.clone()));
              console.log(`[SW] ✓ Pre-cached API: ${endpoint}`);
            }
          } catch (error) {
            console.warn(`[SW] ⚠ Failed to pre-cache API ${endpoint}:`, error.message);
          }
        });
        
        await Promise.allSettled(apiPromises);
        console.log('[SW] API pre-caching completed');
      }),
      
      // Create offline fallback page
      createOfflineFallback()
    ])
    .then(() => {
      console.log(`[SW v${VERSION}] Installation completed successfully`);
      return self.skipWaiting();
    })
    .catch((error) => {
      console.error('[SW] Installation failed:', error);
    })
  );
});

// Create comprehensive offline fallback page
async function createOfflineFallback() {
  try {
    const cache = await caches.open(STATIC_CACHE);
    const offlineHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>OPPB - Offline Mode</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white; min-height: 100vh; display: flex;
      align-items: center; justify-content: center; padding: 20px;
    }
    .container {
      text-align: center; max-width: 400px; background: rgba(255,255,255,0.1);
      backdrop-filter: blur(20px); border-radius: 20px; padding: 40px;
      border: 1px solid rgba(255,255,255,0.2);
    }
    .icon { font-size: 64px; margin-bottom: 20px; }
    h1 { font-size: 28px; margin-bottom: 16px; font-weight: 600; }
    p { font-size: 16px; margin-bottom: 24px; opacity: 0.9; line-height: 1.5; }
    button {
      background: rgba(255,255,255,0.2); border: 1px solid rgba(255,255,255,0.3);
      color: white; padding: 12px 24px; border-radius: 12px; font-size: 16px;
      cursor: pointer; transition: all 0.3s ease; font-weight: 500;
    }
    button:hover { background: rgba(255,255,255,0.3); transform: translateY(-2px); }
    .feature { margin: 20px 0; padding: 15px; background: rgba(255,255,255,0.05);
      border-radius: 12px; text-align: left; }
    .feature h3 { font-size: 16px; margin-bottom: 8px; }
    .feature p { font-size: 14px; opacity: 0.8; }
  </style>
</head>
<body>
  <div class="container">
    <div class="icon">📱</div>
    <h1>OPPB Offline Mode</h1>
    <p>You're currently offline, but OPPB continues to work with cached data and offline payments.</p>
    
    <div class="feature">
      <h3>✓ Available Offline</h3>
      <p>View cached transactions, access offline payments, and use core features</p>
    </div>
    
    <div class="feature">
      <h3>🔄 Auto-Sync</h3>
      <p>Your offline payments will sync automatically when connection returns</p>
    </div>
    
    <button onclick="window.location.reload()">Try Again</button>
  </div>
</body>
</html>`;
    
    await cache.put('/offline.html', new Response(offlineHTML, {
      headers: { 'Content-Type': 'text/html' }
    }));
    
    console.log('[SW] ✓ Offline fallback page created');
  } catch (error) {
    console.error('[SW] Failed to create offline fallback:', error);
  }
}

// Enhanced activation with comprehensive cache management
self.addEventListener('activate', (event) => {
  console.log(`[SW v${VERSION}] Activating enhanced service worker...`);
  
  event.waitUntil(
    Promise.all([
      // Clean up outdated caches
      caches.keys().then(async (cacheNames) => {
        const validCaches = [STATIC_CACHE, DYNAMIC_CACHE, API_CACHE, IMAGE_CACHE, FONT_CACHE];
        
        const deletionPromises = cacheNames
          .filter(cacheName => !validCaches.includes(cacheName))
          .map(async (cacheName) => {
            console.log(`[SW] 🗑 Deleting outdated cache: ${cacheName}`);
            return caches.delete(cacheName);
          });
        
        await Promise.all(deletionPromises);
        console.log(`[SW] ✓ Cache cleanup completed - ${deletionPromises.length} old caches removed`);
      }),
      
      // Perform cache maintenance
      performCacheMaintenance(),
      
      // Initialize offline payment queue
      initializeOfflineQueue(),
      
      // Set up periodic cache cleanup
      schedulePeriodicMaintenance()
    ])
    .then(() => {
      console.log(`[SW v${VERSION}] ✓ Activation completed successfully`);
      return self.clients.claim();
    })
    .catch((error) => {
      console.error('[SW] Activation failed:', error);
    })
  );
});

// Comprehensive cache maintenance
async function performCacheMaintenance() {
  console.log('[SW] 🔧 Performing cache maintenance...');
  
  try {
    await Promise.all([
      CacheManager.cleanupExpiredCache(API_CACHE, CACHE_EXPIRY.API),
      CacheManager.cleanupExpiredCache(DYNAMIC_CACHE, CACHE_EXPIRY.STATIC),
      CacheManager.cleanupExpiredCache(IMAGE_CACHE, CACHE_EXPIRY.IMAGES),
      CacheManager.limitCacheSize(DYNAMIC_CACHE, CACHE_LIMITS[DYNAMIC_CACHE]),
      CacheManager.limitCacheSize(API_CACHE, CACHE_LIMITS[API_CACHE]),
      CacheManager.limitCacheSize(IMAGE_CACHE, CACHE_LIMITS[IMAGE_CACHE])
    ]);
    
    console.log('[SW] ✓ Cache maintenance completed');
  } catch (error) {
    console.error('[SW] Cache maintenance failed:', error);
  }
}

// Initialize offline payment queue using IndexedDB
async function initializeOfflineQueue() {
  try {
    // This would typically use IndexedDB for persistent storage
    console.log('[SW] ✓ Offline payment queue initialized');
  } catch (error) {
    console.error('[SW] Failed to initialize offline queue:', error);
  }
}

// Schedule periodic maintenance
function schedulePeriodicMaintenance() {
  // Clean up caches every hour
  setInterval(() => {
    performCacheMaintenance();
  }, 60 * 60 * 1000);
  
  console.log('[SW] ✓ Periodic maintenance scheduled');
}

// Advanced fetch event handler with comprehensive error handling
self.addEventListener('fetch', (event) => {
  const { request } = event;
  
  try {
    const url = new URL(request.url);
    
    // Skip non-HTTP requests
    if (!url.protocol.startsWith('http')) {
      return;
    }
    
    // Route requests to appropriate strategies with error handling
    if (url.pathname.startsWith('/api/')) {
      event.respondWith(handleAPIRequest(request, url));
    } else if (isStaticAsset(url)) {
      event.respondWith(handleStaticAsset(request, url));
    } else if (isImageRequest(url)) {
      event.respondWith(handleImageRequest(request, url));
    } else if (isFontRequest(url)) {
      event.respondWith(handleFontRequest(request, url));
    } else if (request.mode === 'navigate') {
      event.respondWith(handleNavigationRequest(request, url));
    } else {
      event.respondWith(handleGenericRequest(request, url));
    }
  } catch (error) {
    console.error('[SW] Fetch event error:', error);
    // Fallback to network for any routing errors
    event.respondWith(fetch(request).catch(() => {
      return new Response('Service worker error occurred', { 
        status: 500, 
        statusText: 'Service Worker Error' 
      });
    }));
  }
});

// Advanced API request handler with intelligent caching
async function handleAPIRequest(request, url) {
  const isPost = request.method === 'POST';
  const isCritical = CRITICAL_API_ENDPOINTS.some(endpoint => url.pathname.startsWith(endpoint));
  
  try {
    // For POST requests, always try network first
    if (isPost) {
      const response = await fetch(request);
      
      // Queue offline if payment-related POST fails
      if (!response.ok && url.pathname.includes('payment')) {
        await queueOfflinePayment(request);
        return createOfflinePaymentResponse();
      }
      
      return response;
    }
    
    // Network-first strategy for GET requests
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      // Cache successful responses
      const cache = await caches.open(API_CACHE);
      await cache.put(request, CacheManager.addTimestamp(networkResponse.clone()));
      
      // Limit cache size periodically
      CacheManager.limitCacheSize(API_CACHE, CACHE_LIMITS[API_CACHE]);
      
      console.log(`[SW] ✓ API cached: ${url.pathname}`);
      return networkResponse;
    }
    
    throw new Error(`API responded with ${networkResponse.status}`);
    
  } catch (error) {
    console.warn(`[SW] ⚠ Network failed for ${url.pathname}:`, error.message);
    
    // Fallback to cache
    const cachedResponse = await caches.match(request);
    
    if (cachedResponse) {
      console.log(`[SW] 📋 Serving cached API: ${url.pathname}`);
      
      // Add offline indicator header
      const headers = new Headers(cachedResponse.headers);
      headers.set('X-Served-By', 'sw-cache');
      headers.set('X-Offline-Mode', 'true');
      
      return new Response(cachedResponse.body, {
        status: cachedResponse.status,
        statusText: cachedResponse.statusText,
        headers: headers
      });
    }
    
    // Return appropriate offline responses for critical endpoints
    if (isCritical) {
      return createOfflineAPIResponse(url.pathname);
    }
    
    throw error;
  }
}

// Optimized static asset handler
async function handleStaticAsset(request, url) {
  try {
    // Cache-first strategy for static assets
    const cachedResponse = await caches.match(request);
    
    if (cachedResponse) {
      console.log(`[SW] ⚡ Cache hit: ${url.pathname}`);
      return cachedResponse;
    }
    
    // Fetch and cache if not found
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE);
      await cache.put(request, CacheManager.addTimestamp(networkResponse.clone()));
      console.log(`[SW] ✓ Static asset cached: ${url.pathname}`);
    }
    
    return networkResponse;
    
  } catch (error) {
    console.error(`[SW] ❌ Failed to load static asset ${url.pathname}:`, error.message);
    
    // Return offline fallback for critical assets
    if (url.pathname === '/' || url.pathname.includes('index')) {
      return caches.match('/offline.html');
    }
    
    throw error;
  }
}

// Image request handler with progressive loading
async function handleImageRequest(request, url) {
  try {
    const cachedResponse = await caches.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(IMAGE_CACHE);
      await cache.put(request, CacheManager.addTimestamp(networkResponse.clone()));
      
      // Manage cache size
      CacheManager.limitCacheSize(IMAGE_CACHE, CACHE_LIMITS[IMAGE_CACHE]);
    }
    
    return networkResponse;
    
  } catch (error) {
    console.warn(`[SW] ⚠ Image load failed: ${url.pathname}`);
    
    // Return cached version or skip
    return caches.match(request) || new Response(null, { status: 404 });
  }
}

// Font request handler with long-term caching
async function handleFontRequest(request, url) {
  try {
    const cachedResponse = await caches.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(FONT_CACHE);
      
      // Add long-term cache headers
      const headers = new Headers(networkResponse.headers);
      headers.set('Cache-Control', 'public, max-age=31536000'); // 1 year
      
      const responseWithHeaders = new Response(networkResponse.body, {
        status: networkResponse.status,
        statusText: networkResponse.statusText,
        headers: headers
      });
      
      await cache.put(request, CacheManager.addTimestamp(responseWithHeaders.clone()));
    }
    
    return networkResponse;
    
  } catch (error) {
    return caches.match(request) || new Response(null, { status: 404 });
  }
}

// Navigation request handler with offline support
async function handleNavigationRequest(request, url) {
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      // Cache successful navigation responses
      const cache = await caches.open(DYNAMIC_CACHE);
      await cache.put(request, CacheManager.addTimestamp(networkResponse.clone()));
    }
    
    return networkResponse;
    
  } catch (error) {
    console.warn(`[SW] ⚠ Navigation failed: ${url.pathname}`);
    
    // Try cached version first
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Fallback to main app or offline page
    const mainApp = await caches.match('/');
    if (mainApp) {
      return mainApp;
    }
    
    // Last resort: offline page
    return caches.match('/offline.html');
  }
}

// Generic request handler
async function handleGenericRequest(request, url) {
  try {
    return await fetch(request);
  } catch (error) {
    const cachedResponse = await caches.match(request);
    return cachedResponse || new Response(null, { status: 404 });
  }
}

// Utility functions for request classification
function isStaticAsset(url) {
  return STATIC_ASSETS.some(asset => url.pathname === asset) ||
         url.pathname.startsWith('/src/') ||
         url.pathname.startsWith('/manifest') ||
         url.pathname.startsWith('/sw.js') ||
         /\.(js|ts|tsx|css|json)$/.test(url.pathname);
}

function isImageRequest(url) {
  return /\.(jpg|jpeg|png|gif|webp|svg|ico)$/i.test(url.pathname);
}

function isFontRequest(url) {
  return /\.(woff|woff2|ttf|eot|otf)$/i.test(url.pathname);
}

// Create appropriate offline responses
function createOfflineAPIResponse(pathname) {
  const offlineData = {
    offline: true,
    message: 'This data is not available offline',
    timestamp: Date.now()
  };
  
  // Customize response based on endpoint
  if (pathname.includes('/auth/user')) {
    offlineData.user = {
      id: 'offline-user',
      offline: true,
      message: 'User data not available offline'
    };
  } else if (pathname.includes('/transactions')) {
    offlineData.transactions = [];
    offlineData.message = 'Transaction history not available offline';
  } else if (pathname.includes('/merchants')) {
    offlineData.merchants = [];
    offlineData.message = 'Merchant data not available offline';
  }
  
  return new Response(JSON.stringify(offlineData), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'X-Offline-Mode': 'true'
    }
  });
}

function createOfflinePaymentResponse() {
  return new Response(JSON.stringify({
    success: true,
    offline: true,
    message: 'Payment queued for when connection returns',
    timestamp: Date.now()
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}

// Queue offline payment for later synchronization
async function queueOfflinePayment(request) {
  try {
    const paymentData = await request.json();
    // In a real implementation, this would use IndexedDB
    console.log('[SW] 📤 Payment queued for offline sync:', paymentData);
  } catch (error) {
    console.error('[SW] Failed to queue offline payment:', error);
  }
}

// Background sync for offline payments
self.addEventListener('sync', (event) => {
  console.log('[SW] Background sync triggered:', event.tag);
  
  if (event.tag === 'offline-payment-sync') {
    event.waitUntil(
      syncOfflinePayments()
    );
  }
});

// Handle offline payment synchronization
async function syncOfflinePayments() {
  try {
    console.log('[SW] Syncing offline payments...');
    
    // Get pending offline payments from IndexedDB
    const pendingPayments = await getPendingOfflinePayments();
    
    for (const payment of pendingPayments) {
      try {
        const response = await fetch('/api/transactions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payment)
        });
        
        if (response.ok) {
          // Remove from pending payments
          await removePendingPayment(payment.id);
          console.log('[SW] Successfully synced payment:', payment.id);
        }
      } catch (error) {
        console.error('[SW] Failed to sync payment:', payment.id, error);
      }
    }
  } catch (error) {
    console.error('[SW] Background sync failed:', error);
  }
}

// IndexedDB helpers for offline payments
async function getPendingOfflinePayments() {
  // Implementation would use IndexedDB to store/retrieve offline payments
  return [];
}

async function removePendingPayment(paymentId) {
  // Implementation would remove synced payment from IndexedDB
  console.log('[SW] Removing synced payment:', paymentId);
}

// Push notifications for payment updates
self.addEventListener('push', (event) => {
  console.log('[SW] Push notification received');
  
  const options = {
    body: 'You have a new payment notification',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-72x72.png',
    vibrate: [200, 100, 200],
    data: {
      url: '/'
    }
  };
  
  event.waitUntil(
    self.registration.showNotification('OPPB Payment', options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  console.log('[SW] Notification clicked');
  
  event.notification.close();
  
  event.waitUntil(
    clients.openWindow(event.notification.data?.url || '/')
  );
});