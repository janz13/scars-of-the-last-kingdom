/**
 * Scars of the Last Kingdom — Service Worker
 *
 * Strategy:
 *  - Cache-first for static assets (images, fonts, JS bundles, game art)
 *  - Network-first for navigation requests (HTML shell)
 *
 * Dynamically resolves scope to work seamlessly under root domains
 * or subpaths (e.g. GitHub Pages: /scars-of-the-last-kingdom/).
 */

const CACHE_VERSION = 'sotlk-v7';

function getBasePath() {
  const scopePath = new URL(self.registration.scope).pathname;
  return scopePath.endsWith('/') ? scopePath.slice(0, -1) : scopePath;
}

self.addEventListener('install', (event) => {
  const basePath = getBasePath();
  const shellAssets = [
    basePath + '/',
    basePath + '/manifest.json',
    basePath + '/icon.png',
    basePath + '/icon-192.png',
    basePath + '/icon-512.png',
    basePath + '/apple-touch-icon.png',
    basePath + '/favicon.ico',
  ];

  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_VERSION);
      try {
        await cache.addAll(shellAssets);
        console.log('[SW] App shell cached with base path:', basePath);
      } catch (err) {
        console.warn('[SW] App shell precache warning (non-fatal):', err);
      }
    })()
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_VERSION)
          .map((name) => {
            console.log('[SW] Deleting old cache:', name);
            return caches.delete(name);
          })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Only handle same-origin requests
  if (url.origin !== self.location.origin) return;

  const basePath = getBasePath();

  // ── Navigation (page loads) — network first, fall back to cached shell
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_VERSION).then((cache) => cache.put(request, clone));
          }
          return response;
        })
        .catch(async () => {
          const cached = await caches.match(basePath + '/');
          if (cached) return cached;
          return caches.match('/');
        })
    );
    return;
  }

  // ── Static assets (JS, CSS, fonts, images, _expo, assets) — cache first with runtime caching
  const isStaticAsset =
    request.destination === 'image' ||
    request.destination === 'script' ||
    request.destination === 'style' ||
    request.destination === 'font' ||
    url.pathname.includes('/_expo/') ||
    url.pathname.includes('/assets/') ||
    url.pathname.endsWith('.png') ||
    url.pathname.endsWith('.jpg') ||
    url.pathname.endsWith('.ico') ||
    url.pathname.endsWith('.js') ||
    url.pathname.endsWith('.json');

  if (isStaticAsset) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached;

        return fetch(request).then((response) => {
          if (!response || response.status !== 200) return response;
          const clone = response.clone();
          caches.open(CACHE_VERSION).then((cache) => cache.put(request, clone));
          return response;
        });
      })
    );
    return;
  }
});
