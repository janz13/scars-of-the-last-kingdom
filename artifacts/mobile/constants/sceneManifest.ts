/**
 * Master Scene Manifest for Scars of the Last Kingdom.
 * Tracks landscape (720x400) and portrait (400x760) master assets,
 * parallax depth layers, focal points, text-safe regions, sub-palettes,
 * atmospheric particles, palette cycling indices, and music cues.
 */

export interface SceneLayerConfig {
  far?: string;
  mid?: string;
  fore?: string;
}

export interface PaletteCycleConfig {
  indices: number[];
  speedMs: number;
}

export interface SpriteAnimConfig {
  src: string;
  x: number;
  y: number;
  frames: number;
  fps: number;
}

export interface SceneManifestEntry {
  key: string;
  landscape: string;
  portrait: string;
  layers?: SceneLayerConfig;
  focus: { x: number; y: number };
  textSafe: 'left' | 'right' | 'bottom';
  palette: string[];
  atmosphere?: 'dust' | 'ash' | 'embers' | 'rain' | 'drip' | 'fog' | 'sparks' | 'snow-ash';
  cycles?: PaletteCycleConfig[];
  sprites?: SpriteAnimConfig[];
  music?: { theme: string; intensity: number };
}

/**
 * Static asset require mapping for Metro bundler compatibility.
 */
export const SCENE_ASSET_REGISTRY: Record<string, any> = {
  ruined_metro_station: require('../assets/images/ruined_metro_station.png'),
  dark_metro_hallway: require('../assets/images/dark_metro_hallway.png'),
  broken_vending_area: require('../assets/images/broken_vending_area.png'),
  collapsed_tunnel: require('../assets/images/collapsed_tunnel.png'),
  tunnel_camp: require('../assets/images/tunnel_camp.png'),
  surface_ruins: require('../assets/images/surface_ruins.png'),
  iron_saints_checkpoint: require('../assets/images/iron_saints_checkpoint.png'),
  glass_tower_gate: require('../assets/images/glass_tower_gate.png'),
  red_choir_chamber: require('../assets/images/red_choir_chamber.png'),
  surface_dawn: require('../assets/images/surface_dawn.png'),
  ruined_street: require('../assets/images/ruined_street.png'),
  saints_patrol: require('../assets/images/saints_patrol.png'),
  black_market_alley: require('../assets/images/black_market_alley.png'),
  glass_tower_lobby: require('../assets/images/glass_tower_lobby.png'),
  choir_broadcast_point: require('../assets/images/choir_broadcast_point.png'),
  archive_ruin_wall: require('../assets/images/archive_ruin_wall.png'),
  surface_night: require('../assets/images/surface_night.png'),
  last_archive_door: require('../assets/images/last_archive_door.png'),
  candle_market: require('../assets/images/candle_market.png'),
  bone_turnstile: require('../assets/images/bone_turnstile.png'),
  flooded_platform: require('../assets/images/flooded_platform.png'),
  nursery_of_knives: require('../assets/images/nursery_of_knives.png'),
  chalk_map_wall: require('../assets/images/chalk_map_wall.png'),
  rat_king_gate: require('../assets/images/rat_king_gate.png'),
  hidden_clinic: require('../assets/images/hidden_clinic.png'),
  relic_engine_room: require('../assets/images/relic_engine_room.png'),
};

const DEFAULT_METRO_PALETTE = [
  '#0a0a0f', '#14141f', '#222233', '#33334d', '#4d4d6e', '#6e6e94',
  '#8f8fb8', '#b5b5d6', '#8a7d6e', '#b8a99a', '#d4c5a9', '#f2e8dc',
  '#8e1c1c', '#9b59b6', '#e67e22', '#2ecc71',
];

export const SCENE_MANIFEST: Record<string, SceneManifestEntry> = {
  ruined_metro_station: {
    key: 'ruined_metro_station',
    landscape: 'ruined_metro_station',
    portrait: 'ruined_metro_station',
    focus: { x: 320, y: 180 },
    textSafe: 'left',
    palette: DEFAULT_METRO_PALETTE,
    atmosphere: 'dust',
    music: { theme: 'tunnel_bed', intensity: 1 },
  },
  dark_metro_hallway: {
    key: 'dark_metro_hallway',
    landscape: 'dark_metro_hallway',
    portrait: 'dark_metro_hallway',
    focus: { x: 320, y: 180 },
    textSafe: 'right',
    palette: DEFAULT_METRO_PALETTE,
    atmosphere: 'dust',
    music: { theme: 'tunnel_bed', intensity: 1 },
  },
  broken_vending_area: {
    key: 'broken_vending_area',
    landscape: 'broken_vending_area',
    portrait: 'broken_vending_area',
    focus: { x: 280, y: 180 },
    textSafe: 'right',
    palette: DEFAULT_METRO_PALETTE,
    atmosphere: 'drip',
    music: { theme: 'tunnel_bed', intensity: 1 },
  },
  collapsed_tunnel: {
    key: 'collapsed_tunnel',
    landscape: 'collapsed_tunnel',
    portrait: 'collapsed_tunnel',
    focus: { x: 340, y: 180 },
    textSafe: 'left',
    palette: DEFAULT_METRO_PALETTE,
    atmosphere: 'dust',
    music: { theme: 'tunnel_bed', intensity: 2 },
  },
  tunnel_camp: {
    key: 'tunnel_camp',
    landscape: 'tunnel_camp',
    portrait: 'tunnel_camp',
    focus: { x: 360, y: 180 },
    textSafe: 'left',
    palette: DEFAULT_METRO_PALETTE,
    atmosphere: 'embers',
    music: { theme: 'tunnel_bed', intensity: 1 },
  },
  surface_ruins: {
    key: 'surface_ruins',
    landscape: 'surface_ruins',
    portrait: 'surface_ruins',
    focus: { x: 320, y: 160 },
    textSafe: 'bottom',
    palette: DEFAULT_METRO_PALETTE,
    atmosphere: 'ash',
    music: { theme: 'surface_bed', intensity: 1 },
  },
  iron_saints_checkpoint: {
    key: 'iron_saints_checkpoint',
    landscape: 'iron_saints_checkpoint',
    portrait: 'iron_saints_checkpoint',
    focus: { x: 320, y: 180 },
    textSafe: 'right',
    palette: DEFAULT_METRO_PALETTE,
    atmosphere: 'sparks',
    music: { theme: 'iron_saints', intensity: 2 },
  },
  glass_tower_gate: {
    key: 'glass_tower_gate',
    landscape: 'glass_tower_gate',
    portrait: 'glass_tower_gate',
    focus: { x: 320, y: 160 },
    textSafe: 'left',
    palette: DEFAULT_METRO_PALETTE,
    atmosphere: 'fog',
    music: { theme: 'glass_court', intensity: 1 },
  },
  red_choir_chamber: {
    key: 'red_choir_chamber',
    landscape: 'red_choir_chamber',
    portrait: 'red_choir_chamber',
    focus: { x: 320, y: 180 },
    textSafe: 'bottom',
    palette: DEFAULT_METRO_PALETTE,
    atmosphere: 'embers',
    music: { theme: 'red_choir', intensity: 2 },
  },
  surface_dawn: {
    key: 'surface_dawn',
    landscape: 'surface_dawn',
    portrait: 'surface_dawn',
    focus: { x: 320, y: 160 },
    textSafe: 'bottom',
    palette: DEFAULT_METRO_PALETTE,
    atmosphere: 'ash',
    music: { theme: 'surface_bed', intensity: 1 },
  },
  ruined_street: {
    key: 'ruined_street',
    landscape: 'ruined_street',
    portrait: 'ruined_street',
    focus: { x: 320, y: 180 },
    textSafe: 'left',
    palette: DEFAULT_METRO_PALETTE,
    atmosphere: 'ash',
    music: { theme: 'surface_bed', intensity: 1 },
  },
  saints_patrol: {
    key: 'saints_patrol',
    landscape: 'saints_patrol',
    portrait: 'saints_patrol',
    focus: { x: 300, y: 180 },
    textSafe: 'right',
    palette: DEFAULT_METRO_PALETTE,
    atmosphere: 'snow-ash',
    music: { theme: 'iron_saints', intensity: 2 },
  },
  black_market_alley: {
    key: 'black_market_alley',
    landscape: 'black_market_alley',
    portrait: 'black_market_alley',
    focus: { x: 280, y: 180 },
    textSafe: 'right',
    palette: DEFAULT_METRO_PALETTE,
    atmosphere: 'drip',
    music: { theme: 'hollow_children', intensity: 1 },
  },
  glass_tower_lobby: {
    key: 'glass_tower_lobby',
    landscape: 'glass_tower_lobby',
    portrait: 'glass_tower_lobby',
    focus: { x: 320, y: 180 },
    textSafe: 'left',
    palette: DEFAULT_METRO_PALETTE,
    atmosphere: 'fog',
    music: { theme: 'glass_court', intensity: 1 },
  },
  choir_broadcast_point: {
    key: 'choir_broadcast_point',
    landscape: 'choir_broadcast_point',
    portrait: 'choir_broadcast_point',
    focus: { x: 320, y: 160 },
    textSafe: 'bottom',
    palette: DEFAULT_METRO_PALETTE,
    atmosphere: 'embers',
    music: { theme: 'red_choir', intensity: 2 },
  },
  archive_ruin_wall: {
    key: 'archive_ruin_wall',
    landscape: 'archive_ruin_wall',
    portrait: 'archive_ruin_wall',
    focus: { x: 320, y: 180 },
    textSafe: 'left',
    palette: DEFAULT_METRO_PALETTE,
    atmosphere: 'dust',
    music: { theme: 'last_archive', intensity: 1 },
  },
  surface_night: {
    key: 'surface_night',
    landscape: 'surface_night',
    portrait: 'surface_night',
    focus: { x: 320, y: 160 },
    textSafe: 'bottom',
    palette: DEFAULT_METRO_PALETTE,
    atmosphere: 'snow-ash',
    music: { theme: 'surface_bed', intensity: 1 },
  },
  last_archive_door: {
    key: 'last_archive_door',
    landscape: 'last_archive_door',
    portrait: 'last_archive_door',
    focus: { x: 320, y: 180 },
    textSafe: 'right',
    palette: DEFAULT_METRO_PALETTE,
    atmosphere: 'dust',
    music: { theme: 'last_archive', intensity: 1 },
  },
  candle_market: {
    key: 'candle_market',
    landscape: 'candle_market',
    portrait: 'candle_market',
    focus: { x: 320, y: 180 },
    textSafe: 'left',
    palette: DEFAULT_METRO_PALETTE,
    atmosphere: 'embers',
    music: { theme: 'hollow_children', intensity: 1 },
  },
  bone_turnstile: {
    key: 'bone_turnstile',
    landscape: 'bone_turnstile',
    portrait: 'bone_turnstile',
    focus: { x: 320, y: 180 },
    textSafe: 'right',
    palette: DEFAULT_METRO_PALETTE,
    atmosphere: 'drip',
    music: { theme: 'hollow_children', intensity: 1 },
  },
  flooded_platform: {
    key: 'flooded_platform',
    landscape: 'flooded_platform',
    portrait: 'flooded_platform',
    focus: { x: 320, y: 180 },
    textSafe: 'left',
    palette: DEFAULT_METRO_PALETTE,
    atmosphere: 'drip',
    music: { theme: 'tunnel_bed', intensity: 1 },
  },
  nursery_of_knives: {
    key: 'nursery_of_knives',
    landscape: 'nursery_of_knives',
    portrait: 'nursery_of_knives',
    focus: { x: 300, y: 180 },
    textSafe: 'right',
    palette: DEFAULT_METRO_PALETTE,
    atmosphere: 'embers',
    music: { theme: 'hollow_children', intensity: 2 },
  },
  chalk_map_wall: {
    key: 'chalk_map_wall',
    landscape: 'chalk_map_wall',
    portrait: 'chalk_map_wall',
    focus: { x: 320, y: 180 },
    textSafe: 'right',
    palette: DEFAULT_METRO_PALETTE,
    atmosphere: 'dust',
    music: { theme: 'hollow_children', intensity: 1 },
  },
  rat_king_gate: {
    key: 'rat_king_gate',
    landscape: 'rat_king_gate',
    portrait: 'rat_king_gate',
    focus: { x: 320, y: 180 },
    textSafe: 'left',
    palette: DEFAULT_METRO_PALETTE,
    atmosphere: 'dust',
    music: { theme: 'hollow_children', intensity: 2 },
  },
  hidden_clinic: {
    key: 'hidden_clinic',
    landscape: 'hidden_clinic',
    portrait: 'hidden_clinic',
    focus: { x: 320, y: 180 },
    textSafe: 'right',
    palette: DEFAULT_METRO_PALETTE,
    atmosphere: 'drip',
    music: { theme: 'tunnel_bed', intensity: 1 },
  },
  relic_engine_room: {
    key: 'relic_engine_room',
    landscape: 'relic_engine_room',
    portrait: 'relic_engine_room',
    focus: { x: 320, y: 180 },
    textSafe: 'bottom',
    palette: DEFAULT_METRO_PALETTE,
    atmosphere: 'sparks',
    music: { theme: 'main_theme', intensity: 2 },
  },
};

/**
 * Resolves a manifest entry, falling back to ruined_metro_station if the key is unknown.
 */
export function getSceneManifestEntry(key?: string): SceneManifestEntry {
  if (key && SCENE_MANIFEST[key]) {
    return SCENE_MANIFEST[key];
  }
  return SCENE_MANIFEST.ruined_metro_station;
}

/**
 * Resolves the underlying image asset resource for Expo Image or Canvas rendering.
 */
export function resolveSceneAsset(
  entry: SceneManifestEntry,
  orientation: 'landscape' | 'portrait'
): any {
  const assetKey = orientation === 'landscape' ? entry.landscape : entry.portrait;
  return SCENE_ASSET_REGISTRY[assetKey] || SCENE_ASSET_REGISTRY.ruined_metro_station;
}
