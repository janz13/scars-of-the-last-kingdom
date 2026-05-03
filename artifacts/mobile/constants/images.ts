/**
 * Background image registry for Scars of the Last Kingdom.
 *
 * HOW TO ADD A NEW BACKGROUND IMAGE:
 *   1. Place the PNG at:  artifacts/mobile/assets/images/<key>.png
 *   2. Add a require() entry to BACKGROUND_IMAGES below using that key.
 *   3. Set `imageKey: '<key>'` on the StoryNode in data/storyNodes.ts.
 *   4. Optionally add a matching gradient to BACKGROUND_GRADIENTS — it is
 *      used as the transition "flash" color while the image loads and as the
 *      sole background if the image file is ever missing.
 *
 * HOW IMAGE LOADING WORKS:
 *   - React Native's Metro bundler resolves require() at build time.
 *   - getBackgroundImage(key) returns the require() result or null.
 *   - BackgroundPanel uses ImageBackground when a result exists, falling
 *     back to the gradient + FallbackDecoration otherwise.
 *   - On web, CSS `image-rendering: pixelated` is injected by BackgroundPanel
 *     to keep pixel art sharp at any display resolution.
 *
 * VALIDATED IMAGE KEYS (must match files in assets/images/):
 *   ruined_metro_station   ✓ assets/images/ruined_metro_station.png
 *   dark_metro_hallway     ✓ assets/images/dark_metro_hallway.png
 *   broken_vending_area    ✓ assets/images/broken_vending_area.png
 *   collapsed_tunnel       ✓ assets/images/collapsed_tunnel.png
 *   tunnel_camp            ✓ assets/images/tunnel_camp.png
 *   surface_ruins          ✓ assets/images/surface_ruins.png
 *   iron_saints_checkpoint ✓ assets/images/iron_saints_checkpoint.png
 *   glass_tower_gate       ✓ assets/images/glass_tower_gate.png
 *   red_choir_chamber      ✓ assets/images/red_choir_chamber.png
 *   last_archive_door      ✓ assets/images/last_archive_door.png
 *
 * NOTE ON public/images/backgrounds/:
 *   Expo bundles static assets via require() from the assets/ directory for
 *   both native (iOS/Android) and web builds. The public/ folder pattern is
 *   for plain web apps only and cannot be used with React Native's Image
 *   component. All images live in assets/images/ for cross-platform support.
 */

export interface GradientConfig {
  colors: string[];
  start: { x: number; y: number };
  end: { x: number; y: number };
}

// ─── Pixel-art background images ─────────────────────────────────────────────
// Each key MUST correspond to a file at assets/images/<key>.png
// and MUST match the `imageKey` field on a StoryNode.

export const BACKGROUND_IMAGES: Record<string, any> = {
  // Opening act — underground metro
  ruined_metro_station:   require('../assets/images/ruined_metro_station.png'),
  dark_metro_hallway:     require('../assets/images/dark_metro_hallway.png'),
  broken_vending_area:    require('../assets/images/broken_vending_area.png'),
  collapsed_tunnel:       require('../assets/images/collapsed_tunnel.png'),
  tunnel_camp:            require('../assets/images/tunnel_camp.png'),

  // Act 2 — surface & faction zones (Chapter 1)
  surface_ruins:          require('../assets/images/surface_ruins.png'),
  iron_saints_checkpoint: require('../assets/images/iron_saints_checkpoint.png'),
  glass_tower_gate:       require('../assets/images/glass_tower_gate.png'),
  red_choir_chamber:      require('../assets/images/red_choir_chamber.png'),

  // Chapter 2 — The Surface Does Not Forgive
  surface_dawn:           require('../assets/images/surface_dawn.png'),
  ruined_street:          require('../assets/images/ruined_street.png'),
  saints_patrol:          require('../assets/images/saints_patrol.png'),
  black_market_alley:     require('../assets/images/black_market_alley.png'),
  glass_tower_lobby:      require('../assets/images/glass_tower_lobby.png'),
  choir_broadcast_point:  require('../assets/images/choir_broadcast_point.png'),
  archive_ruin_wall:      require('../assets/images/archive_ruin_wall.png'),
  surface_night:          require('../assets/images/surface_night.png'),

  // Act 3 — the Archive
  last_archive_door:      require('../assets/images/last_archive_door.png'),
};

// ─── Gradient fallbacks & transition colors ───────────────────────────────────
// Used when a key is NOT in BACKGROUND_IMAGES, or as the ambient color during
// cross-fade transitions. Each gradient should roughly match its image's mood.

export const BACKGROUND_GRADIENTS: Record<string, GradientConfig> = {
  ruined_metro_station: {
    colors: ['#0d0408', '#1a0608', '#0d0408', '#080306'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  dark_metro_hallway: {
    colors: ['#050508', '#0a0a10', '#050508', '#030305'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  broken_vending_area: {
    colors: ['#0a0808', '#140e08', '#0a0808', '#070505'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  collapsed_tunnel: {
    colors: ['#080608', '#100810', '#080608', '#050405'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  tunnel_camp: {
    colors: ['#0d0a06', '#1a1208', '#0d0a06', '#08070404'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  surface_ruins: {
    colors: ['#0a0814', '#160e20', '#0a0814', '#07060e'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  iron_saints_checkpoint: {
    colors: ['#080a08', '#0e140a', '#080a08', '#050705'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  glass_tower_gate: {
    colors: ['#08081a', '#0e0e2a', '#08081a', '#050510'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  red_choir_chamber: {
    colors: ['#140404', '#200808', '#140404', '#0a0202'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  last_archive_door: {
    colors: ['#0a0814', '#120f1f', '#1a1030', '#0a0814'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  // Chapter 2 gradients
  surface_dawn: {
    colors: ['#1a0e08', '#2a1a0a', '#1a1208', '#0e0a06'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  ruined_street: {
    colors: ['#0e0c10', '#18141e', '#0e0c10', '#08080e'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  saints_patrol: {
    colors: ['#080c08', '#0e1810', '#080c08', '#050805'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  black_market_alley: {
    colors: ['#0c0808', '#1a1008', '#0c0808', '#080606'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  glass_tower_lobby: {
    colors: ['#08081e', '#0c0c2e', '#08081e', '#050510'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  choir_broadcast_point: {
    colors: ['#180404', '#280606', '#180404', '#0c0202'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  archive_ruin_wall: {
    colors: ['#0c0a18', '#14102a', '#1c1438', '#0c0a18'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  surface_night: {
    colors: ['#060608', '#0c0c14', '#060608', '#040406'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  // Generic fallback for any key not listed above
  default: {
    colors: ['#0a0a14', '#12121f', '#0a0a14', '#080810'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Returns the require() bundle for a background image key, or null if the key
 * is not registered. BackgroundPanel uses null to trigger the gradient fallback.
 */
export function getBackgroundImage(key: string): any | null {
  return BACKGROUND_IMAGES[key] ?? null;
}

/**
 * Returns a GradientConfig for a given key. Falls back to 'default' if the key
 * has no specific gradient defined.
 */
export function getBackgroundGradient(key: string): GradientConfig {
  return BACKGROUND_GRADIENTS[key] ?? BACKGROUND_GRADIENTS['default'];
}
