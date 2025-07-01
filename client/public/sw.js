const CACHE_NAME = 'oppb-v1.0.0';
const STATIC_CACHE = 'oppb-static-v1.0.0';
const DYNAMIC_CACHE = 'oppb-dynamic-v1.0.0';

// Files to cache for offline functionality
const STATIC_ASSETS = [
  '/',
  '/manifest.json',
  '/src/main.tsx',
  '/src/index.css'
];

// API endpoints to cache
const API_CACHE_PATTERNS = [
  '/api/auth/user',
  '/api/merchants',
  '/api/transactions'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('[SW] Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('[SW] Static assets cached successfully');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('[SW] Failed to cache static assets:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('[SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('[SW] Service worker activated');
        return self.clients.claim();
      })
  );
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Handle API requests with network-first strategy
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Cache successful API responses
          if (response.ok) {
            const responseClone = response.clone();
            caches.open(DYNAMIC_CACHE)
              .then((cache) => {
                cache.put(request, responseClone);
              });
          }
          return response;
        })
        .catch(() => {
          // Return cached version if network fails
          return caches.match(request)
            .then((cachedResponse) => {
              if (cachedResponse) {
                console.log('[SW] Serving cached API response for:', url.pathname);
                return cachedResponse;
              }
              // Return offline fallback for critical API endpoints
              if (url.pathname === '/api/auth/user') {
                return new Response(JSON.stringify({
                  offline: true,
                  message: 'Currently offline'
                }), {
                  status: 200,
                  headers: { 'Content-Type': 'application/json' }
                });
              }
              throw new Error('No cached response available');
            });
        })
    );
    return;
  }
  
  // Handle static assets with cache-first strategy
  if (STATIC_ASSETS.some(asset => url.pathname === asset) || 
      url.pathname.startsWith('/src/') ||
      url.pathname.endsWith('.css') ||
      url.pathname.endsWith('.js') ||
      url.pathname.endsWith('.tsx')) {
    
    event.respondWith(
      caches.match(request)
        .then((cachedResponse) => {
          if (cachedResponse) {
            console.log('[SW] Serving cached asset:', url.pathname);
            return cachedResponse;
          }
          
          return fetch(request)
            .then((response) => {
              if (response.ok) {
                const responseClone = response.clone();
                caches.open(STATIC_CACHE)
                  .then((cache) => {
                    cache.put(request, responseClone);
                  });
              }
              return response;
            });
        })
    );
    return;
  }
  
  // Handle navigation requests (HTML pages)
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .catch(() => {
          // Return cached main page for offline navigation
          return caches.match('/');
        })
    );
    return;
  }
  
  // Default: network-first for everything else
  event.respondWith(
    fetch(request)
      .catch(() => {
        return caches.match(request);
      })
  );
});

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