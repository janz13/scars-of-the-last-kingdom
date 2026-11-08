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
 * Maps both landscape (720×400) and portrait (400×760) pixel placeholder assets,
 * with bare-key fallbacks.
 */
export const SCENE_ASSET_REGISTRY: Record<string, any> = {
  // ─── 720×400 Landscape Placeholders ──────────────────────────────────────
  ruined_metro_station_landscape: require('../assets/pixel/placeholders/ruined_metro_station_landscape.png'),
  dark_metro_hallway_landscape: require('../assets/pixel/placeholders/dark_metro_hallway_landscape.png'),
  broken_vending_area_landscape: require('../assets/pixel/placeholders/broken_vending_area_landscape.png'),
  collapsed_tunnel_landscape: require('../assets/pixel/placeholders/collapsed_tunnel_landscape.png'),
  tunnel_camp_landscape: require('../assets/pixel/placeholders/tunnel_camp_landscape.png'),
  surface_ruins_landscape: require('../assets/pixel/placeholders/surface_ruins_landscape.png'),
  iron_saints_checkpoint_landscape: require('../assets/pixel/placeholders/iron_saints_checkpoint_landscape.png'),
  glass_tower_gate_landscape: require('../assets/pixel/placeholders/glass_tower_gate_landscape.png'),
  red_choir_chamber_landscape: require('../assets/pixel/placeholders/red_choir_chamber_landscape.png'),
  surface_dawn_landscape: require('../assets/pixel/placeholders/surface_dawn_landscape.png'),
  ruined_street_landscape: require('../assets/pixel/placeholders/ruined_street_landscape.png'),
  saints_patrol_landscape: require('../assets/pixel/placeholders/saints_patrol_landscape.png'),
  black_market_alley_landscape: require('../assets/pixel/placeholders/black_market_alley_landscape.png'),
  glass_tower_lobby_landscape: require('../assets/pixel/placeholders/glass_tower_lobby_landscape.png'),
  choir_broadcast_point_landscape: require('../assets/pixel/placeholders/choir_broadcast_point_landscape.png'),
  archive_ruin_wall_landscape: require('../assets/pixel/placeholders/archive_ruin_wall_landscape.png'),
  surface_night_landscape: require('../assets/pixel/placeholders/surface_night_landscape.png'),
  last_archive_door_landscape: require('../assets/pixel/placeholders/last_archive_door_landscape.png'),
  candle_market_landscape: require('../assets/pixel/placeholders/candle_market_landscape.png'),
  bone_turnstile_landscape: require('../assets/pixel/placeholders/bone_turnstile_landscape.png'),
  flooded_platform_landscape: require('../assets/pixel/placeholders/flooded_platform_landscape.png'),
  nursery_of_knives_landscape: require('../assets/pixel/placeholders/nursery_of_knives_landscape.png'),
  chalk_map_wall_landscape: require('../assets/pixel/placeholders/chalk_map_wall_landscape.png'),
  rat_king_gate_landscape: require('../assets/pixel/placeholders/rat_king_gate_landscape.png'),
  hidden_clinic_landscape: require('../assets/pixel/placeholders/hidden_clinic_landscape.png'),
  relic_engine_room_landscape: require('../assets/pixel/placeholders/relic_engine_room_landscape.png'),

  // ─── 400×760 Portrait Placeholders ───────────────────────────────────────
  ruined_metro_station_portrait: require('../assets/pixel/placeholders/ruined_metro_station_portrait.png'),
  dark_metro_hallway_portrait: require('../assets/pixel/placeholders/dark_metro_hallway_portrait.png'),
  broken_vending_area_portrait: require('../assets/pixel/placeholders/broken_vending_area_portrait.png'),
  collapsed_tunnel_portrait: require('../assets/pixel/placeholders/collapsed_tunnel_portrait.png'),
  tunnel_camp_portrait: require('../assets/pixel/placeholders/tunnel_camp_portrait.png'),
  surface_ruins_portrait: require('../assets/pixel/placeholders/surface_ruins_portrait.png'),
  iron_saints_checkpoint_portrait: require('../assets/pixel/placeholders/iron_saints_checkpoint_portrait.png'),
  glass_tower_gate_portrait: require('../assets/pixel/placeholders/glass_tower_gate_portrait.png'),
  red_choir_chamber_portrait: require('../assets/pixel/placeholders/red_choir_chamber_portrait.png'),
  surface_dawn_portrait: require('../assets/pixel/placeholders/surface_dawn_portrait.png'),
  ruined_street_portrait: require('../assets/pixel/placeholders/ruined_street_portrait.png'),
  saints_patrol_portrait: require('../assets/pixel/placeholders/saints_patrol_portrait.png'),
  black_market_alley_portrait: require('../assets/pixel/placeholders/black_market_alley_portrait.png'),
  glass_tower_lobby_portrait: require('../assets/pixel/placeholders/glass_tower_lobby_portrait.png'),
  choir_broadcast_point_portrait: require('../assets/pixel/placeholders/choir_broadcast_point_portrait.png'),
  archive_ruin_wall_portrait: require('../assets/pixel/placeholders/archive_ruin_wall_portrait.png'),
  surface_night_portrait: require('../assets/pixel/placeholders/surface_night_portrait.png'),
  last_archive_door_portrait: require('../assets/pixel/placeholders/last_archive_door_portrait.png'),
  candle_market_portrait: require('../assets/pixel/placeholders/candle_market_portrait.png'),
  bone_turnstile_portrait: require('../assets/pixel/placeholders/bone_turnstile_portrait.png'),
  flooded_platform_portrait: require('../assets/pixel/placeholders/flooded_platform_portrait.png'),
  nursery_of_knives_portrait: require('../assets/pixel/placeholders/nursery_of_knives_portrait.png'),
  chalk_map_wall_portrait: require('../assets/pixel/placeholders/chalk_map_wall_portrait.png'),
  rat_king_gate_portrait: require('../assets/pixel/placeholders/rat_king_gate_portrait.png'),
  hidden_clinic_portrait: require('../assets/pixel/placeholders/hidden_clinic_portrait.png'),
  relic_engine_room_portrait: require('../assets/pixel/placeholders/relic_engine_room_portrait.png'),

  // ─── Bare Key Fallbacks (defaults to landscape variant) ───────────────────
  ruined_metro_station: require('../assets/pixel/placeholders/ruined_metro_station_landscape.png'),
  dark_metro_hallway: require('../assets/pixel/placeholders/dark_metro_hallway_landscape.png'),
  broken_vending_area: require('../assets/pixel/placeholders/broken_vending_area_landscape.png'),
  collapsed_tunnel: require('../assets/pixel/placeholders/collapsed_tunnel_landscape.png'),
  tunnel_camp: require('../assets/pixel/placeholders/tunnel_camp_landscape.png'),
  surface_ruins: require('../assets/pixel/placeholders/surface_ruins_landscape.png'),
  iron_saints_checkpoint: require('../assets/pixel/placeholders/iron_saints_checkpoint_landscape.png'),
  glass_tower_gate: require('../assets/pixel/placeholders/glass_tower_gate_landscape.png'),
  red_choir_chamber: require('../assets/pixel/placeholders/red_choir_chamber_landscape.png'),
  surface_dawn: require('../assets/pixel/placeholders/surface_dawn_landscape.png'),
  ruined_street: require('../assets/pixel/placeholders/ruined_street_landscape.png'),
  saints_patrol: require('../assets/pixel/placeholders/saints_patrol_landscape.png'),
  black_market_alley: require('../assets/pixel/placeholders/black_market_alley_landscape.png'),
  glass_tower_lobby: require('../assets/pixel/placeholders/glass_tower_lobby_landscape.png'),
  choir_broadcast_point: require('../assets/pixel/placeholders/choir_broadcast_point_landscape.png'),
  archive_ruin_wall: require('../assets/pixel/placeholders/archive_ruin_wall_landscape.png'),
  surface_night: require('../assets/pixel/placeholders/surface_night_landscape.png'),
  last_archive_door: require('../assets/pixel/placeholders/last_archive_door_landscape.png'),
  candle_market: require('../assets/pixel/placeholders/candle_market_landscape.png'),
  bone_turnstile: require('../assets/pixel/placeholders/bone_turnstile_landscape.png'),
  flooded_platform: require('../assets/pixel/placeholders/flooded_platform_landscape.png'),
  nursery_of_knives: require('../assets/pixel/placeholders/nursery_of_knives_landscape.png'),
  chalk_map_wall: require('../assets/pixel/placeholders/chalk_map_wall_landscape.png'),
  rat_king_gate: require('../assets/pixel/placeholders/rat_king_gate_landscape.png'),
  hidden_clinic: require('../assets/pixel/placeholders/hidden_clinic_landscape.png'),
  relic_engine_room: require('../assets/pixel/placeholders/relic_engine_room_landscape.png'),
};

const DEFAULT_METRO_PALETTE = [
  '#0a0a0f', '#14141f', '#222233', '#33334d', '#4d4d6e', '#6e6e94',
  '#8f8fb8', '#b5b5d6', '#8a7d6e', '#b8a99a', '#d4c5a9', '#f2e8dc',
  '#8e1c1c', '#9b59b6', '#e67e22', '#2ecc71',
];

export const SCENE_MANIFEST: Record<string, SceneManifestEntry> = {
  ruined_metro_station: {
    key: 'ruined_metro_station',
    landscape: 'ruined_metro_station_landscape',
    portrait: 'ruined_metro_station_portrait',
    focus: { x: 320, y: 180 },
    textSafe: 'left',
    palette: DEFAULT_METRO_PALETTE,
    atmosphere: 'dust',
    music: { theme: 'tunnel_bed', intensity: 1 },
  },
  dark_metro_hallway: {
    key: 'dark_metro_hallway',
    landscape: 'dark_metro_hallway_landscape',
    portrait: 'dark_metro_hallway_portrait',
    focus: { x: 320, y: 180 },
    textSafe: 'right',
    palette: DEFAULT_METRO_PALETTE,
    atmosphere: 'dust',
    music: { theme: 'tunnel_bed', intensity: 1 },
  },
  broken_vending_area: {
    key: 'broken_vending_area',
    landscape: 'broken_vending_area_landscape',
    portrait: 'broken_vending_area_portrait',
    focus: { x: 280, y: 180 },
    textSafe: 'right',
    palette: DEFAULT_METRO_PALETTE,
    atmosphere: 'drip',
    music: { theme: 'tunnel_bed', intensity: 1 },
  },
  collapsed_tunnel: {
    key: 'collapsed_tunnel',
    landscape: 'collapsed_tunnel_landscape',
    portrait: 'collapsed_tunnel_portrait',
    focus: { x: 340, y: 180 },
    textSafe: 'left',
    palette: DEFAULT_METRO_PALETTE,
    atmosphere: 'dust',
    music: { theme: 'tunnel_bed', intensity: 2 },
  },
  tunnel_camp: {
    key: 'tunnel_camp',
    landscape: 'tunnel_camp_landscape',
    portrait: 'tunnel_camp_portrait',
    focus: { x: 360, y: 180 },
    textSafe: 'left',
    palette: DEFAULT_METRO_PALETTE,
    atmosphere: 'embers',
    music: { theme: 'tunnel_bed', intensity: 1 },
  },
  surface_ruins: {
    key: 'surface_ruins',
    landscape: 'surface_ruins_landscape',
    portrait: 'surface_ruins_portrait',
    focus: { x: 320, y: 160 },
    textSafe: 'bottom',
    palette: DEFAULT_METRO_PALETTE,
    atmosphere: 'ash',
    music: { theme: 'surface_bed', intensity: 1 },
  },
  iron_saints_checkpoint: {
    key: 'iron_saints_checkpoint',
    landscape: 'iron_saints_checkpoint_landscape',
    portrait: 'iron_saints_checkpoint_portrait',
    focus: { x: 320, y: 180 },
    textSafe: 'right',
    palette: DEFAULT_METRO_PALETTE,
    atmosphere: 'sparks',
    music: { theme: 'iron_saints', intensity: 2 },
  },
  glass_tower_gate: {
    key: 'glass_tower_gate',
    landscape: 'glass_tower_gate_landscape',
    portrait: 'glass_tower_gate_portrait',
    focus: { x: 320, y: 160 },
    textSafe: 'left',
    palette: DEFAULT_METRO_PALETTE,
    atmosphere: 'fog',
    music: { theme: 'glass_court', intensity: 1 },
  },
  red_choir_chamber: {
    key: 'red_choir_chamber',
    landscape: 'red_choir_chamber_landscape',
    portrait: 'red_choir_chamber_portrait',
    focus: { x: 320, y: 180 },
    textSafe: 'bottom',
    palette: DEFAULT_METRO_PALETTE,
    atmosphere: 'embers',
    music: { theme: 'red_choir', intensity: 2 },
  },
  surface_dawn: {
    key: 'surface_dawn',
    landscape: 'surface_dawn_landscape',
    portrait: 'surface_dawn_portrait',
    focus: { x: 320, y: 160 },
    textSafe: 'bottom',
    palette: DEFAULT_METRO_PALETTE,
    atmosphere: 'ash',
    music: { theme: 'surface_bed', intensity: 1 },
  },
  ruined_street: {
    key: 'ruined_street',
    landscape: 'ruined_street_landscape',
    portrait: 'ruined_street_portrait',
    focus: { x: 320, y: 180 },
    textSafe: 'left',
    palette: DEFAULT_METRO_PALETTE,
    atmosphere: 'ash',
    music: { theme: 'surface_bed', intensity: 1 },
  },
  saints_patrol: {
    key: 'saints_patrol',
    landscape: 'saints_patrol_landscape',
    portrait: 'saints_patrol_portrait',
    focus: { x: 300, y: 180 },
    textSafe: 'right',
    palette: DEFAULT_METRO_PALETTE,
    atmosphere: 'snow-ash',
    music: { theme: 'iron_saints', intensity: 2 },
  },
  black_market_alley: {
    key: 'black_market_alley',
    landscape: 'black_market_alley_landscape',
    portrait: 'black_market_alley_portrait',
    focus: { x: 280, y: 180 },
    textSafe: 'right',
    palette: DEFAULT_METRO_PALETTE,
    atmosphere: 'drip',
    music: { theme: 'hollow_children', intensity: 1 },
  },
  glass_tower_lobby: {
    key: 'glass_tower_lobby',
    landscape: 'glass_tower_lobby_landscape',
    portrait: 'glass_tower_lobby_portrait',
    focus: { x: 320, y: 180 },
    textSafe: 'left',
    palette: DEFAULT_METRO_PALETTE,
    atmosphere: 'fog',
    music: { theme: 'glass_court', intensity: 1 },
  },
  choir_broadcast_point: {
    key: 'choir_broadcast_point',
    landscape: 'choir_broadcast_point_landscape',
    portrait: 'choir_broadcast_point_portrait',
    focus: { x: 320, y: 160 },
    textSafe: 'bottom',
    palette: DEFAULT_METRO_PALETTE,
    atmosphere: 'embers',
    music: { theme: 'red_choir', intensity: 2 },
  },
  archive_ruin_wall: {
    key: 'archive_ruin_wall',
    landscape: 'archive_ruin_wall_landscape',
    portrait: 'archive_ruin_wall_portrait',
    focus: { x: 320, y: 180 },
    textSafe: 'left',
    palette: DEFAULT_METRO_PALETTE,
    atmosphere: 'dust',
    music: { theme: 'last_archive', intensity: 1 },
  },
  surface_night: {
    key: 'surface_night',
    landscape: 'surface_night_landscape',
    portrait: 'surface_night_portrait',
    focus: { x: 320, y: 160 },
    textSafe: 'bottom',
    palette: DEFAULT_METRO_PALETTE,
    atmosphere: 'snow-ash',
    music: { theme: 'surface_bed', intensity: 1 },
  },
  last_archive_door: {
    key: 'last_archive_door',
    landscape: 'last_archive_door_landscape',
    portrait: 'last_archive_door_portrait',
    focus: { x: 320, y: 180 },
    textSafe: 'right',
    palette: DEFAULT_METRO_PALETTE,
    atmosphere: 'dust',
    music: { theme: 'last_archive', intensity: 1 },
  },
  candle_market: {
    key: 'candle_market',
    landscape: 'candle_market_landscape',
    portrait: 'candle_market_portrait',
    focus: { x: 320, y: 180 },
    textSafe: 'left',
    palette: DEFAULT_METRO_PALETTE,
    atmosphere: 'embers',
    music: { theme: 'hollow_children', intensity: 1 },
  },
  bone_turnstile: {
    key: 'bone_turnstile',
    landscape: 'bone_turnstile_landscape',
    portrait: 'bone_turnstile_portrait',
    focus: { x: 320, y: 180 },
    textSafe: 'right',
    palette: DEFAULT_METRO_PALETTE,
    atmosphere: 'drip',
    music: { theme: 'hollow_children', intensity: 1 },
  },
  flooded_platform: {
    key: 'flooded_platform',
    landscape: 'flooded_platform_landscape',
    portrait: 'flooded_platform_portrait',
    focus: { x: 320, y: 180 },
    textSafe: 'left',
    palette: DEFAULT_METRO_PALETTE,
    atmosphere: 'drip',
    music: { theme: 'tunnel_bed', intensity: 1 },
  },
  nursery_of_knives: {
    key: 'nursery_of_knives',
    landscape: 'nursery_of_knives_landscape',
    portrait: 'nursery_of_knives_portrait',
    focus: { x: 300, y: 180 },
    textSafe: 'right',
    palette: DEFAULT_METRO_PALETTE,
    atmosphere: 'embers',
    music: { theme: 'hollow_children', intensity: 2 },
  },
  chalk_map_wall: {
    key: 'chalk_map_wall',
    landscape: 'chalk_map_wall_landscape',
    portrait: 'chalk_map_wall_portrait',
    focus: { x: 320, y: 180 },
    textSafe: 'right',
    palette: DEFAULT_METRO_PALETTE,
    atmosphere: 'dust',
    music: { theme: 'hollow_children', intensity: 1 },
  },
  rat_king_gate: {
    key: 'rat_king_gate',
    landscape: 'rat_king_gate_landscape',
    portrait: 'rat_king_gate_portrait',
    focus: { x: 320, y: 180 },
    textSafe: 'left',
    palette: DEFAULT_METRO_PALETTE,
    atmosphere: 'dust',
    music: { theme: 'hollow_children', intensity: 2 },
  },
  hidden_clinic: {
    key: 'hidden_clinic',
    landscape: 'hidden_clinic_landscape',
    portrait: 'hidden_clinic_portrait',
    focus: { x: 320, y: 180 },
    textSafe: 'right',
    palette: DEFAULT_METRO_PALETTE,
    atmosphere: 'drip',
    music: { theme: 'tunnel_bed', intensity: 1 },
  },
  relic_engine_room: {
    key: 'relic_engine_room',
    landscape: 'relic_engine_room_landscape',
    portrait: 'relic_engine_room_portrait',
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
 * Selects the orientation-specific variant with multiple fallback levels.
 */
export function resolveSceneAsset(
  entry: SceneManifestEntry,
  orientation: 'landscape' | 'portrait'
): any {
  const primaryKey = orientation === 'landscape' ? entry.landscape : entry.portrait;
  return (
    SCENE_ASSET_REGISTRY[primaryKey] ||
    SCENE_ASSET_REGISTRY[`${entry.key}_${orientation}`] ||
    SCENE_ASSET_REGISTRY[entry.key] ||
    (orientation === 'landscape'
      ? SCENE_ASSET_REGISTRY.ruined_metro_station_landscape
      : SCENE_ASSET_REGISTRY.ruined_metro_station_portrait) ||
    SCENE_ASSET_REGISTRY.ruined_metro_station
  );
}
