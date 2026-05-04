/**
 * Scars of the Last Kingdom — Service Worker
 *
 * Strategy:
 *  - Cache-first for static assets (images, fonts, JS bundles, game art)
 *  - Network-first for navigation requests (HTML shell)
 *
 * This keeps the game fully playable offline once the player has visited
 * at least once. All story data is bundled into the JS — no network calls
 * are needed mid-game. Background images are pre-cached on first visit
 * so the game art loads instantly even without a connection.
 *
 * To force clients onto the new cache, bump CACHE_VERSION.
 * The old cache is deleted automatically on the next activate event.
 */

const CACHE_VERSION = 'sotlk-v2';

/**
 * App shell — cached on install so the game boots offline.
 */
const SHELL_ASSETS = [
  '/',
  '/manifest.json',
  '/icon.png',
  '/favicon.ico',
  '/privacy-policy.html',
];

/**
 * Game background images — cached on install so every scene loads
 * instantly. These are large (~1 MB each) but the full set is only
 * ~30 MB which is well within typical device storage budgets.
 */
const GAME_ART_ASSETS = [
  '/assets/images/ruined_metro_station.png',
  '/assets/images/dark_metro_hallway.png',
  '/assets/images/collapsed_tunnel.png',
  '/assets/images/surface_ruins.png',
  '/assets/images/surface_night.png',
  '/assets/images/surface_dawn.png',
  '/assets/images/tunnel_camp.png',
  '/assets/images/broken_vending_area.png',
  '/assets/images/iron_saints_checkpoint.png',
  '/assets/images/glass_tower_gate.png',
  '/assets/images/glass_tower_lobby.png',
  '/assets/images/ruined_street.png',
  '/assets/images/black_market_alley.png',
  '/assets/images/last_archive_door.png',
  '/assets/images/red_choir_chamber.png',
  '/assets/images/saints_patrol.png',
  '/assets/images/archive_ruin_wall.png',
  '/assets/images/choir_broadcast_point.png',
  '/assets/images/hidden_clinic.png',
  '/assets/images/candle_market.png',
  '/assets/images/bone_turnstile.png',
  '/assets/images/chalk_map_wall.png',
  '/assets/images/flooded_platform.png',
  '/assets/images/nursery_of_knives.png',
  '/assets/images/rat_king_gate.png',
  '/assets/images/relic_engine_room.png',
];

// ── Install: pre-cache app shell + game art ──────────────────────────────────

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_VERSION);

      // Shell assets — must succeed
      try {
        await cache.addAll(SHELL_ASSETS);
        console.log('[SW] App shell cached');
      } catch (err) {
        console.warn('[SW] App shell cache failed (non-fatal):', err);
      }

      // Game art — best-effort (large files, silently skip individual failures)
      for (const url of GAME_ART_ASSETS) {
        try {
          await cache.add(url);
        } catch {
          // Individual image failure doesn't break the SW install
        }
      }
      console.log('[SW] Game art cache attempt complete');
    })()
  );
  self.skipWaiting();
});

// ── Activate: delete old caches ──────────────────────────────────────────────

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

// ── Fetch: serve from cache with network fallback ────────────────────────────

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Only handle same-origin requests
  if (url.origin !== self.location.origin) return;

  // ── Navigation (page loads) — network first, fall back to cached shell
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

  // ── Images & game art — cache first, then network, then cache fallback
  if (
    request.destination === 'image' ||
    url.pathname.startsWith('/assets/images/')
  ) {
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

  // ── JS bundles, fonts, stylesheets — cache first, then network
  if (
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
