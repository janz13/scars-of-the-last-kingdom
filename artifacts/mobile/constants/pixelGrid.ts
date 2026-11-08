/**
 * Pixel Grid Specification — Scars of the Last Kingdom
 * Foundation geometry, safe areas, master resolutions, and scaling math.
 */

export type ScreenOrientation = 'landscape' | 'portrait';

export interface GridDimensions {
  readonly safeW: number;
  readonly safeH: number;
  readonly masterW: number;
  readonly masterH: number;
  readonly bleedX: number;
  readonly bleedY: number;
  readonly aspect: number;
  readonly masterAspect: number;
  readonly ultrawideThreshold: number;
}

export const PIXEL_GRID: Record<ScreenOrientation, GridDimensions> = {
  landscape: {
    safeW: 640,
    safeH: 360,
    masterW: 720,
    masterH: 400,
    bleedX: 40,
    bleedY: 20,
    aspect: 16 / 9,
    masterAspect: 720 / 400, // 1.8
    ultrawideThreshold: 1.9, // 720 / 400 + 0.1
  },
  portrait: {
    safeW: 360,
    safeH: 640,
    masterW: 400,
    masterH: 760,
    bleedX: 20,
    bleedY: 60,
    aspect: 9 / 16,
    masterAspect: 400 / 760, // 0.5263
    ultrawideThreshold: 1.0, // Not applicable to portrait
  },
} as const;

export interface ViewportScale {
  /** Integer scale multiplier: max(1, floor(min(vw / safeW, vh / safeH))) */
  scale: number;
  /** Scaled master width in CSS pixels: masterW * scale */
  displayWidth: number;
  /** Scaled master height in CSS pixels: masterH * scale */
  displayHeight: number;
  /** Centering horizontal offset: floor((vw - displayWidth) / 2) */
  offsetX: number;
  /** Centering vertical offset: floor((vh - displayHeight) / 2) */
  offsetY: number;
  /** True when aspect ratio exceeds 1.9 in landscape mode */
  isUltrawide: boolean;
  /** Viewport orientation based on aspect ratio */
  orientation: ScreenOrientation;
  /** Viewport width in CSS pixels */
  viewportWidth: number;
  /** Viewport height in CSS pixels */
  viewportHeight: number;
  /** Safe area width in CSS pixels: safeW * scale */
  safeWidth: number;
  /** Safe area height in CSS pixels: safeH * scale */
  safeHeight: number;
  /** Device pixel ratio (e.g. 1, 2, 3) */
  dpr: number;
  /** Width of left/right pillarbox bars on ultrawide displays */
  pillarboxWidth: number;
}

/**
 * Returns 'landscape' if width >= height, otherwise 'portrait'.
 */
export function getOrientation(width: number, height: number): ScreenOrientation {
  return width >= height ? 'landscape' : 'portrait';
}

/**
 * Computes integer scale, display dimensions, centering offsets, and ultrawide status.
 * Pure function with no DOM dependencies for universal usage in Node/SSR/Web/Native.
 */
export function computeViewportScale(vw: number, vh: number, dpr = 1): ViewportScale {
  const safeVw = Math.max(1, vw);
  const safeVh = Math.max(1, vh);
  const orientation = getOrientation(safeVw, safeVh);
  const grid = PIXEL_GRID[orientation];

  const rawScale = Math.min(safeVw / grid.safeW, safeVh / grid.safeH);
  const scale = Math.max(1, Math.floor(rawScale));

  const displayWidth = grid.masterW * scale;
  const displayHeight = grid.masterH * scale;

  const offsetX = Math.floor((safeVw - displayWidth) / 2);
  const offsetY = Math.floor((safeVh - displayHeight) / 2);

  const aspect = safeVw / safeVh;
  const isUltrawide = orientation === 'landscape' && aspect > grid.ultrawideThreshold;
  const pillarboxWidth = isUltrawide ? Math.max(0, offsetX) : 0;

  return {
    scale,
    displayWidth,
    displayHeight,
    offsetX,
    offsetY,
    isUltrawide,
    orientation,
    viewportWidth: safeVw,
    viewportHeight: safeVh,
    safeWidth: grid.safeW * scale,
    safeHeight: grid.safeH * scale,
    dpr: Math.max(1, dpr),
    pillarboxWidth,
  };
}

/**
 * Computes integer focal shift in art-pixels to adjust scene framing when text panels occupy screen space.
 */
export function computeFocalShift(
  focus: { x: number; y: number },
  orientation: ScreenOrientation,
  textSafe: 'left' | 'right' | 'bottom',
  maxShift = 16
): { shiftX: number; shiftY: number } {
  let shiftX = 0;
  let shiftY = 0;

  if (orientation === 'landscape') {
    if (textSafe === 'right') {
      // Panel occupies right side; shift scene leftward
      shiftX = -Math.min(maxShift, Math.max(0, Math.round((focus.x - 360) * 0.1)));
    } else if (textSafe === 'left') {
      // Panel occupies left side; shift scene rightward
      shiftX = Math.min(maxShift, Math.max(0, Math.round((360 - focus.x) * 0.1)));
    }
  } else {
    if (textSafe === 'bottom') {
      // Bottom sheet covers lower part; shift scene upward
      shiftY = -Math.min(maxShift, Math.max(0, Math.round((focus.y - 380) * 0.1)));
    }
  }

  return { shiftX, shiftY };
}

export type ActiveLayoutMode = 'column' | 'letterbox' | 'sheet';
export type LayoutSettingOverride = 'auto' | 'column' | 'letterbox';

/**
 * Pure layout mode dispatcher based on viewport aspect ratio and user override.
 */
export function resolveLayoutMode(
  width: number,
  height: number,
  setting: LayoutSettingOverride = 'auto'
): ActiveLayoutMode {
  const safeH = Math.max(1, height);
  const aspect = width / safeH;

  if (setting === 'column' && width >= 600) return 'column';
  if (setting === 'letterbox') return 'letterbox';

  if (aspect >= 1.5 && width >= 768) return 'column';
  if (aspect >= 1.0) return 'letterbox';
  return 'sheet';
}
