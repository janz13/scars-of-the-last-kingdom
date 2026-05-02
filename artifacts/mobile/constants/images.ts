export interface GradientConfig {
  colors: string[];
  start: { x: number; y: number };
  end: { x: number; y: number };
}

export const BACKGROUND_IMAGES: Record<string, any> = {
  ruined_metro_station: require('../assets/images/ruined_metro_station.png'),
  dark_metro_hallway: require('../assets/images/dark_metro_hallway.png'),
  broken_vending_area: require('../assets/images/broken_vending_area.png'),
  collapsed_tunnel: require('../assets/images/collapsed_tunnel.png'),
  tunnel_camp: require('../assets/images/tunnel_camp.png'),
  surface_ruins: require('../assets/images/surface_ruins.png'),
  iron_saints_checkpoint: require('../assets/images/iron_saints_checkpoint.png'),
  glass_tower_gate: require('../assets/images/glass_tower_gate.png'),
  red_choir_chamber: require('../assets/images/red_choir_chamber.png'),
};

export const BACKGROUND_GRADIENTS: Record<string, GradientConfig> = {
  last_archive_door: {
    colors: ['#0a0814', '#120f1f', '#1a1030', '#0a0814'],
    start: { x: 0, y: 0 },
    end: { x: 0, y: 1 },
  },
  examine_mark: {
    colors: ['#0e0820', '#1a0f2e', '#0e0820', '#080615'],
    start: { x: 0, y: 0 },
    end: { x: 0, y: 1 },
  },
  default: {
    colors: ['#0a0a14', '#12121f', '#0a0a14', '#080810'],
    start: { x: 0, y: 0 },
    end: { x: 0, y: 1 },
  },
};

export function getBackgroundImage(key: string): any | null {
  return BACKGROUND_IMAGES[key] || null;
}

export function getBackgroundGradient(key: string): GradientConfig {
  return BACKGROUND_GRADIENTS[key] ?? BACKGROUND_GRADIENTS['default'];
}
