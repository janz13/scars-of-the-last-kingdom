/**
 * Scars of the Last Kingdom — Service Worker
 *
 * Strategy: Cache-first for static assets (images, fonts, JS bundles),
 * network-first for navigation requests (HTML shell).
 *
 * This keeps the game playable offline once the player has visited at least once.
 * Story data is bundled into the JS, so no network calls are needed mid-game.
 *
 * To update cached assets, bump CACHE_VERSION below.
 * The old cache is deleted automatically on the next activate event.
 */

const CACHE_VERSION = 'sotlk-v1';

const STATIC_ASSETS = [
  '/',
  '/manifest.json',
  '/icon.png',
  '/favicon.ico',
];

// ── Install: pre-cache the app shell ─────────────────────────────────────────

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) => {
      console.log('[SW] Pre-caching app shell');
      return cache.addAll(STATIC_ASSETS).catch((err) => {
        console.warn('[SW] Pre-cache failed for some assets (non-fatal):', err);
      });
    })
  );
  self.skipWaiting();
});

// ── Activate: delete old caches ───────────────────────────────────────────────

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

// ── Fetch: serve from cache, fall back to network ─────────────────────────────

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Only handle same-origin requests
  if (url.origin !== self.location.origin) return;

  // Navigation requests (page loads) — network first, fall back to cached shell
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const clone = response.clone();
          caches.open(CACHE_VERSION).then((cache) => cache.put(request, clone));
          return response;
        })
        .catch(() => caches.match('/'))
    );
    return;
  }

  // Static assets (images, JS, fonts) — cache first, fall back to network
  if (
    request.destination === 'image' ||
    request.destination === 'script' ||
    request.destination === 'style' ||
    request.destination === 'font' ||
    url.pathname.startsWith('/assets/')
  ) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached;

        return fetch(request).then((response) => {
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          const clone = response.clone();
          caches.open(CACHE_VERSION).then((cache) => cache.put(request, clone));
          return response;
        });
      })
    );
    return;
  }
});
