/**
 * artifacts/mobile/engine/pixel/palette.ts
 *
 * Scars of the Last Kingdom — Mark Ferrari Palette Cycler
 * Native-resolution Canvas 2D color lookup table cycling.
 * Executes within <1ms frame budget at 60fps for 720x400 / 400x760 buffers.
 */

export interface RGB {
  r: number;
  g: number;
  b: number;
}

export interface PaletteCycleConfig {
  id: string;
  startIndex: number;
  length: number;
  rateHz: number;
  reverse?: boolean;
  blend?: boolean;
  mode?: 'cycle' | 'flicker' | 'ping-pong';
}

export const MASTER_64_PALETTE_HEX: string[] = [
  // 0-7: Neutrals
  '#04020a', '#0a0a12', '#161622', '#282838', '#444458', '#6e6e84', '#a2a2b8', '#dedee8',
  // 8-13: Ash / Hollow Children
  '#121a10', '#1e2e1a', '#344a28', '#506e3a', '#749652', '#a4c47e',
  // 14-19: Iron Saints
  '#1f0c08', '#3d1810', '#68281a', '#8e3a2a', '#b85438', '#e27e56',
  // 20-25: Last Archive
  '#1c1608', '#342910', '#4e3e1c', '#6a5a2a', '#947e3c', '#c6ab5a',
  // 26-31: Red Choir
  '#18040a', '#320a16', '#541026', '#7a1a3a', '#aa2a52', '#d84c78',
  // 32-37: Glass Court
  '#08161c', '#102832', '#1c404e', '#2a5a6a', '#3e8094', '#6ac0d6',
  // 38-43: Earth / Soil
  '#14100c', '#261e16', '#423426', '#64503c', '#8a7458', '#b6a080',
  // 44-49: Sky / Smog
  '#0e121e', '#1a2030', '#2e384c', '#4c5c76', '#7a889e', '#b0bac8',
  // 50-53: Cycling Water Shimmer
  '#122430', '#1c3848', '#2c546a', '#447a96',
  // 54-57: Cycling Fire Glow
  '#5c1608', '#9a280c', '#d85012', '#f89824',
  // 58-61: Cycling Relic / Wrist Mark Pulse
  '#42124e', '#7d3c98', '#b062d4', '#e29cfc',
  // 62-63: Tokens
  '#f39c12', '#2ecc71',
];

export const DEFAULT_PALETTE_CYCLES: PaletteCycleConfig[] = [
  {
    id: 'water_shimmer',
    startIndex: 50,
    length: 4,
    rateHz: 1.8,
    mode: 'cycle',
    blend: true,
  },
  {
    id: 'fire_glow',
    startIndex: 54,
    length: 4,
    rateHz: 3.2,
    mode: 'flicker',
  },
  {
    id: 'relic_pulse',
    startIndex: 58,
    length: 4,
    rateHz: 0.42, // Period ~2.4s
    mode: 'ping-pong',
    blend: true,
  },
];

export function hexToRgb(hex: string): RGB {
  const clean = hex.replace('#', '');
  const num = parseInt(clean, 16);
  return {
    r: (num >> 16) & 0xff,
    g: (num >> 8) & 0xff,
    b: num & 0xff,
  };
}

export function rgbToHex(rgb: RGB): string {
  const toHex = (n: number) =>
    Math.max(0, Math.min(255, Math.round(n)))
      .toString(16)
      .padStart(2, '0');
  return `#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}`;
}

export function lerpRgb(a: RGB, b: RGB, t: number): RGB {
  const clampT = Math.max(0, Math.min(1, t));
  return {
    r: a.r + (b.r - a.r) * clampT,
    g: a.g + (b.g - a.g) * clampT,
    b: a.b + (b.b - a.b) * clampT,
  };
}

export function packColorU32(r: number, g: number, b: number, a: number = 255): number {
  return ((a & 0xff) << 24) | ((b & 0xff) << 16) | ((g & 0xff) << 8) | (r & 0xff);
}

export class PaletteCycler {
  private baseColors: RGB[];
  private activeColors: RGB[];
  private paletteU32: Uint32Array;
  private cycles: PaletteCycleConfig[];

  private width: number = 0;
  private height: number = 0;
  private indexedPixels: Uint8Array | null = null;
  private imageData: ImageData | null = null;
  private uint32View: Uint32Array | null = null;
  private isAttached: boolean = false;

  constructor(
    masterPaletteHex: string[] = MASTER_64_PALETTE_HEX,
    cycles: PaletteCycleConfig[] = DEFAULT_PALETTE_CYCLES
  ) {
    this.baseColors = masterPaletteHex.map(hexToRgb);
    this.activeColors = this.baseColors.map((c) => ({ ...c }));
    this.paletteU32 = new Uint32Array(64);
    this.cycles = cycles;
    this.rebuildU32Lut();
  }

  public rebuildU32Lut(): void {
    const len = Math.min(64, this.activeColors.length);
    for (let i = 0; i < len; i++) {
      const c = this.activeColors[i];
      this.paletteU32[i] = packColorU32(c.r, c.g, c.b, 255);
    }
  }

  public setCycles(cycles: PaletteCycleConfig[]): void {
    this.cycles = cycles;
  }

  public attachCanvas(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    indexedPixels: Uint8Array
  ): void {
    this.width = width;
    this.height = height;
    this.indexedPixels = indexedPixels;
    this.imageData = ctx.createImageData(width, height);
    this.uint32View = new Uint32Array(this.imageData.data.buffer);
    this.isAttached = true;
  }

  public attachBuffer(
    imageData: ImageData,
    width: number,
    height: number,
    indexedPixels: Uint8Array
  ): void {
    this.width = width;
    this.height = height;
    this.indexedPixels = indexedPixels;
    this.imageData = imageData;
    this.uint32View = new Uint32Array(this.imageData.data.buffer);
    this.isAttached = true;
  }

  public detach(): void {
    this.isAttached = false;
    this.indexedPixels = null;
    this.imageData = null;
    this.uint32View = null;
  }

  public update(elapsedMs: number): void {
    const timeSec = elapsedMs / 1000.0;

    for (let c = 0; c < this.cycles.length; c++) {
      const cycle = this.cycles[c];
      const { startIndex, length, rateHz, reverse = false, blend = false, mode = 'cycle' } = cycle;

      if (startIndex < 0 || startIndex + length > this.baseColors.length) continue;

      if (mode === 'flicker') {
        const noise =
          0.52 * Math.sin(timeSec * 19.5 + c) +
          0.31 * Math.sin(timeSec * 48.2 + c * 2) +
          0.17 * Math.sin(timeSec * 87.1);
        const shift = Math.floor(Math.abs(noise) * length) % length;

        for (let i = 0; i < length; i++) {
          const srcIdx = startIndex + ((i + shift) % length);
          this.activeColors[startIndex + i] = this.baseColors[srcIdx];
        }
      } else if (mode === 'ping-pong') {
        const period = 1.0 / Math.max(0.001, rateHz);
        const phase = (timeSec / period) % 1.0;
        const triangle = phase < 0.5 ? phase * 2.0 : (1.0 - phase) * 2.0;

        for (let i = 0; i < length; i++) {
          const c1 = this.baseColors[startIndex + i];
          const nextIdx = startIndex + Math.min(length - 1, i + 1);
          const c2 = this.baseColors[nextIdx];
          this.activeColors[startIndex + i] = blend ? lerpRgb(c1, c2, triangle) : triangle > 0.5 ? c2 : c1;
        }
      } else {
        const period = 1.0 / Math.max(0.001, rateHz);
        const totalSteps = (timeSec / period) * length;
        const step = Math.floor(totalSteps) % length;
        const subStep = totalSteps - Math.floor(totalSteps);
        const dir = reverse ? -1 : 1;

        for (let i = 0; i < length; i++) {
          const offset = dir === 1 ? (i + step) % length : (i - step + length * 1000) % length;
          const nextOffset = dir === 1 ? (offset + 1) % length : (offset - 1 + length) % length;

          const c1 = this.baseColors[startIndex + offset];
          const c2 = this.baseColors[startIndex + nextOffset];
          const dstIdx = startIndex + i;

          this.activeColors[dstIdx] = blend ? lerpRgb(c1, c2, subStep) : c1;
        }
      }
    }

    this.rebuildU32Lut();
  }

  public render(ctx: CanvasRenderingContext2D): void {
    if (!this.isAttached || !this.indexedPixels || !this.uint32View || !this.imageData) return;

    const pixels = this.indexedPixels;
    const out = this.uint32View;
    const lut = this.paletteU32;
    const len = pixels.length;

    // Hot inner loop: <0.25ms for 288,000 pixels in V8
    for (let i = 0; i < len; i++) {
      out[i] = lut[pixels[i]];
    }

    ctx.putImageData(this.imageData, 0, 0);
  }

  public getActiveColors(): string[] {
    return this.activeColors.map(rgbToHex);
  }

  public getPaletteU32(): Uint32Array {
    return this.paletteU32;
  }

  /**
   * Builds a 1:1 Uint8Array indexed pixel buffer from raw 32-bit RGBA ImageData.
   * Maps each pixel color to the closest entry in the 64-color master palette.
   */
  public extractIndexMapFromImageData(imageData: ImageData): Uint8Array {
    const rawData = imageData.data;
    const pixelCount = imageData.width * imageData.height;
    const indices = new Uint8Array(pixelCount);

    // Fast cache for 12-bit RGB lookup (4 bits per channel)
    const lutCache = new Int16Array(4096);
    lutCache.fill(-1);

    for (let i = 0; i < pixelCount; i++) {
      const offset = i * 4;
      const r = rawData[offset];
      const g = rawData[offset + 1];
      const b = rawData[offset + 2];
      const a = rawData[offset + 3];

      if (a < 128) {
        indices[i] = 0;
        continue;
      }

      const key = ((r >> 4) << 8) | ((g >> 4) << 4) | (b >> 4);
      const cached = lutCache[key];
      if (cached >= 0) {
        indices[i] = cached;
        continue;
      }

      let minDist = Infinity;
      let bestIdx = 0;
      for (let p = 0; p < this.baseColors.length; p++) {
        const pal = this.baseColors[p];
        const dr = r - pal.r;
        const dg = g - pal.g;
        const db = b - pal.b;
        const dist = dr * dr + dg * dg + db * db;
        if (dist < minDist) {
          minDist = dist;
          bestIdx = p;
        }
      }

      lutCache[key] = bestIdx;
      indices[i] = bestIdx;
    }

    return indices;
  }
}
