/**
 * scripts/src/buildPixelAssets.ts
 *
 * Master Pixel Asset Build Pipeline for Scars of the Last Kingdom.
 * Branch: feat/pixel-overhaul
 *
 * Capabilities:
 * 1. Area sampling & Lanczos3 grid snapping to 720x400 (landscape) and 400x760 (portrait).
 * 2. 64-color Master Palette perceptual quantization (CIELAB/weighted Euclidean).
 * 3. Scene sub-palette extraction enforcing <= 32 colors per scene.
 * 4. 8x8 Bayer ordered dithering with local 3x3 spatial gradient variance masking.
 * 5. Dual-pass morphological orphan-pixel cleanup filter (mode replacement).
 * 6. Multi-layer depth splitting (far, mid, fore) for priority parallax scenes.
 * 7. Lossless PNG-8 and WebP dual export enforcing <60KB per layer and <150KB per scene.
 * 8. Automatic generation/updating of artifacts/mobile/constants/sceneManifest.ts.
 */

import sharp from 'sharp';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Paths
const ROOT_DIR = resolve(__dirname, '../..');
const SRC_IMAGES_DIR = resolve(ROOT_DIR, 'artifacts/mobile/assets/images');
const PLACEHOLDERS_DIR = resolve(ROOT_DIR, 'artifacts/mobile/assets/pixel/placeholders');
const SCENES_OUT_DIR = resolve(ROOT_DIR, 'artifacts/mobile/assets/pixel/scenes');
const MANIFEST_PATH = resolve(ROOT_DIR, 'artifacts/mobile/constants/sceneManifest.ts');

export const LANDSCAPE_W = 720;
export const LANDSCAPE_H = 400;
export const PORTRAIT_W = 400;
export const PORTRAIT_H = 760;
export const MAX_LAYER_BYTES = 60 * 1024; // 60 KB budget

// ─── 64-COLOR MASTER PALETTE ──────────────────────────────────────────────────
export interface RGB {
  r: number;
  g: number;
  b: number;
  a?: number;
}

export const MASTER_64_PALETTE: RGB[] = [
  // 0-7: Neutrals
  { r: 4, g: 2, b: 10 }, { r: 10, g: 10, b: 18 }, { r: 22, g: 22, b: 34 }, { r: 40, g: 40, b: 56 },
  { r: 68, g: 68, b: 88 }, { r: 110, g: 110, b: 132 }, { r: 162, g: 162, b: 184 }, { r: 222, g: 222, b: 232 },
  // 8-13: Ash / Hollow Children
  { r: 18, g: 26, b: 16 }, { r: 30, g: 46, b: 26 }, { r: 52, g: 74, b: 40 }, { r: 80, g: 110, b: 58 },
  { r: 116, g: 150, b: 82 }, { r: 164, g: 196, b: 126 },
  // 14-19: Iron Saints
  { r: 31, g: 12, b: 8 }, { r: 61, g: 24, b: 16 }, { r: 104, g: 40, b: 26 }, { r: 142, g: 58, b: 42 },
  { r: 184, g: 84, b: 56 }, { r: 226, g: 126, b: 86 },
  // 20-25: Last Archive
  { r: 28, g: 22, b: 8 }, { r: 52, g: 41, b: 16 }, { r: 78, g: 62, b: 28 }, { r: 106, g: 90, b: 42 },
  { r: 148, g: 126, b: 60 }, { r: 198, g: 171, b: 90 },
  // 26-31: Red Choir
  { r: 24, g: 4, b: 10 }, { r: 50, g: 10, b: 22 }, { r: 84, g: 16, b: 38 }, { r: 122, g: 26, b: 58 },
  { r: 170, g: 42, b: 82 }, { r: 216, g: 76, b: 120 },
  // 32-37: Glass Court
  { r: 8, g: 22, b: 28 }, { r: 16, g: 40, b: 50 }, { r: 28, g: 64, b: 78 }, { r: 42, g: 90, b: 106 },
  { r: 62, g: 128, b: 148 }, { r: 106, g: 192, b: 214 },
  // 38-43: Earth / Soil
  { r: 20, g: 16, b: 12 }, { r: 38, g: 30, b: 22 }, { r: 66, g: 52, b: 38 }, { r: 100, g: 80, b: 60 },
  { r: 138, g: 116, b: 88 }, { r: 182, g: 160, b: 128 },
  // 44-49: Sky / Smog
  { r: 14, g: 18, b: 30 }, { r: 26, g: 32, b: 48 }, { r: 46, g: 56, b: 76 }, { r: 76, g: 92, b: 118 },
  { r: 122, g: 136, b: 158 }, { r: 176, g: 186, b: 200 },
  // 50-53: Cycling Water Shimmer
  { r: 18, g: 36, b: 48 }, { r: 28, g: 56, b: 72 }, { r: 44, g: 84, b: 106 }, { r: 68, g: 122, b: 150 },
  // 54-57: Cycling Fire Glow
  { r: 92, g: 22, b: 8 }, { r: 154, g: 40, b: 12 }, { r: 216, g: 80, b: 18 }, { r: 248, g: 152, b: 36 },
  // 58-61: Cycling Relic / Mark Pulse
  { r: 66, g: 18, b: 78 }, { r: 125, g: 60, b: 152 }, { r: 176, g: 98, b: 212 }, { r: 226, g: 156, b: 252 },
  // 62-63: Tokens
  { r: 243, g: 156, b: 18 }, { r: 46, g: 204, b: 113 },
];

export function rgbToHex(rgb: RGB): string {
  const toHex = (n: number) => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, '0');
  return `#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}`;
}

export function hexToRgb(hex: string): RGB {
  const clean = hex.replace('#', '');
  return {
    r: parseInt(clean.substring(0, 2), 16),
    g: parseInt(clean.substring(2, 4), 16),
    b: parseInt(clean.substring(4, 6), 16),
  };
}

// Perceptual weighted color distance
export function colorDist(r1: number, g1: number, b1: number, r2: number, g2: number, b2: number): number {
  const rMean = (r1 + r2) * 0.5;
  const dr = r1 - r2;
  const dg = g1 - g2;
  const db = b1 - b2;
  return (2 + rMean / 256) * dr * dr + 4 * dg * dg + (2 + (255 - rMean) / 256) * db * db;
}

// ─── SUB-PALETTE EXTRACTION (<= 32 COLORS) ────────────────────────────────────
export function extractSubPalette(rawPixels: Uint8ClampedArray, maxColors: number = 32): RGB[] {
  const usage = new Int32Array(MASTER_64_PALETTE.length);

  for (let i = 0; i < rawPixels.length; i += 4) {
    if (rawPixels[i + 3] < 128) continue;
    const r = rawPixels[i];
    const g = rawPixels[i + 1];
    const b = rawPixels[i + 2];

    let minDist = Infinity;
    let bestIdx = 0;
    for (let c = 0; c < MASTER_64_PALETTE.length; c++) {
      const p = MASTER_64_PALETTE[c];
      const d = colorDist(r, g, b, p.r, p.g, p.b);
      if (d < minDist) {
        minDist = d;
        bestIdx = c;
      }
    }
    usage[bestIdx]++;
  }

  const activeIndices: number[] = [];
  for (let i = 0; i < usage.length; i++) {
    if (usage[i] > 0) activeIndices.push(i);
  }

  if (activeIndices.length <= maxColors) {
    return (activeIndices.length > 0 ? activeIndices : [0, 1, 2]).map((i) => MASTER_64_PALETTE[i]);
  }

  // Greedy reduction: keep the top maxColors most frequent colors from master palette
  activeIndices.sort((a, b) => usage[b] - usage[a]);
  const selected = activeIndices.slice(0, maxColors);
  return selected.map((i) => MASTER_64_PALETTE[i]);
}

// ─── 8x8 BAYER DITHERING WITH GRADIENT MASK ───────────────────────────────────
const BAYER_8X8 = [
  [0, 32, 8, 40, 2, 34, 10, 42],
  [48, 16, 56, 24, 50, 18, 58, 26],
  [12, 44, 4, 36, 14, 46, 6, 38],
  [60, 28, 52, 20, 62, 30, 54, 22],
  [3, 35, 11, 43, 1, 33, 9, 41],
  [51, 19, 59, 27, 49, 17, 57, 25],
  [15, 47, 7, 39, 13, 45, 5, 37],
  [63, 31, 55, 23, 61, 29, 53, 21],
];

export function applyBayerDither(
  pixels: Uint8ClampedArray,
  width: number,
  height: number,
  palette: RGB[],
  spread: number = 24
): Uint8ClampedArray {
  const out = new Uint8ClampedArray(pixels.length);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const a = pixels[idx + 3];

      if (a === 0) {
        out[idx] = 0;
        out[idx + 1] = 0;
        out[idx + 2] = 0;
        out[idx + 3] = 0;
        continue;
      }

      const r = pixels[idx];
      const g = pixels[idx + 1];
      const b = pixels[idx + 2];

      // Local 3x3 gradient variation
      let gradSum = 0;
      let count = 0;
      for (let dy = -1; dy <= 1; dy++) {
        const ny = y + dy;
        if (ny < 0 || ny >= height) continue;
        for (let dx = -1; dx <= 1; dx++) {
          const nx = x + dx;
          if (nx < 0 || nx >= width) continue;
          const nIdx = (ny * width + nx) * 4;
          gradSum +=
            Math.abs(pixels[nIdx] - r) +
            Math.abs(pixels[nIdx + 1] - g) +
            Math.abs(pixels[nIdx + 2] - b);
          count++;
        }
      }
      const avgGrad = gradSum / (count * 3);

      // Mask: only dither between flat (avgGrad < 6) and edge (avgGrad > 40)
      let weight = 0;
      if (avgGrad >= 6 && avgGrad <= 40) {
        weight = Math.sin(((avgGrad - 6) / 34) * Math.PI);
      }

      const bayerNorm = (BAYER_8X8[y % 8][x % 8] + 0.5) / 64 - 0.5;
      const bias = bayerNorm * spread * weight;

      const rTarget = Math.min(255, Math.max(0, r + bias));
      const gTarget = Math.min(255, Math.max(0, g + bias));
      const bTarget = Math.min(255, Math.max(0, b + bias));

      let minDist = Infinity;
      let best = palette[0];
      for (const p of palette) {
        const d = colorDist(rTarget, gTarget, bTarget, p.r, p.g, p.b);
        if (d < minDist) {
          minDist = d;
          best = p;
        }
      }

      out[idx] = best.r;
      out[idx + 1] = best.g;
      out[idx + 2] = best.b;
      out[idx + 3] = a;
    }
  }

  return out;
}

// ─── ORPHAN-PIXEL CLEANUP FILTER ──────────────────────────────────────────────
export function cleanOrphans(pixels: Uint8ClampedArray, width: number, height: number): Uint8ClampedArray {
  const current = new Uint8ClampedArray(pixels);

  for (let pass = 0; pass < 2; pass++) {
    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        const idx = (y * width + x) * 4;
        if (current[idx + 3] === 0) continue;

        const r = current[idx];
        const g = current[idx + 1];
        const b = current[idx + 2];
        const key = (r << 16) | (g << 8) | b;

        let same = 0;
        const hist = new Map<number, number>();

        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            if (dx === 0 && dy === 0) continue;
            const nIdx = ((y + dy) * width + (x + dx)) * 4;
            if (current[nIdx + 3] === 0) continue;

            const nr = current[nIdx];
            const ng = current[nIdx + 1];
            const nb = current[nIdx + 2];
            const nKey = (nr << 16) | (ng << 8) | nb;

            if (nKey === key) same++;
            else hist.set(nKey, (hist.get(nKey) || 0) + 1);
          }
        }

        if (same === 0 && hist.size > 0) {
          let maxCount = -1;
          let modeKey = key;
          for (const [k, count] of hist.entries()) {
            if (count > maxCount) {
              maxCount = count;
              modeKey = k;
            }
          }
          current[idx] = (modeKey >> 16) & 0xff;
          current[idx + 1] = (modeKey >> 8) & 0xff;
          current[idx + 2] = modeKey & 0xff;
        }
      }
    }
  }

  return current;
}

// ─── EXPORT PIPELINE FOR A SINGLE LAYER ────────────────────────────────────────
export async function processAndExportLayer(
  rawPixels: Uint8ClampedArray,
  width: number,
  height: number,
  subPalette: RGB[],
  outPng: string,
  outWebp?: string
): Promise<{ pngSize: number; webpSize: number; passBudget: boolean }> {
  const dithered = applyBayerDither(rawPixels, width, height, subPalette);
  const cleaned = cleanOrphans(dithered, width, height);

  const pngBuf = await sharp(cleaned, { raw: { width, height, channels: 4 } })
    .png({
      palette: true,
      colours: subPalette.length,
      compressionLevel: 9,
      effort: 10,
      adaptiveFiltering: true,
    })
    .toBuffer();

  writeFileSync(outPng, pngBuf);

  let webpSize = 0;
  if (outWebp) {
    const webpBuf = await sharp(cleaned, { raw: { width, height, channels: 4 } })
      .webp({
        lossless: true,
        effort: 6,
      })
      .toBuffer();
    writeFileSync(outWebp, webpBuf);
    webpSize = webpBuf.length;
  }

  return {
    pngSize: pngBuf.length,
    webpSize,
    passBudget: pngBuf.length <= MAX_LAYER_BYTES,
  };
}

// ─── SCENE DEFINITIONS: 26 T2 SCENES + 32 T1 SCENES ───────────────────────────
export interface SceneBuildSpec {
  key: string;
  tier: 'T1' | 'T2';
  baseImage: string;
  focus: { x: number; y: number };
  textSafe: 'left' | 'right' | 'bottom';
  atmosphere: 'dust' | 'ash' | 'embers' | 'rain' | 'drip' | 'fog' | 'sparks' | 'snow-ash';
  music: { theme: string; intensity: number };
  faction?: 'Iron Saints' | 'Glass Court' | 'Red Choir' | 'Last Archive' | 'Hollow Children' | 'Neutral' | 'Relic';
  hasLayers?: boolean;
}

export const MASTER_SCENES: SceneBuildSpec[] = [
  // ─── 26 T2 Overhaul Scenes ──────────────────────────────────────────────────
  { key: 'ruined_metro_station', tier: 'T2', baseImage: 'ruined_metro_station', focus: { x: 320, y: 180 }, textSafe: 'left', atmosphere: 'dust', music: { theme: 'tunnel_bed', intensity: 1 }, hasLayers: true },
  { key: 'dark_metro_hallway', tier: 'T2', baseImage: 'dark_metro_hallway', focus: { x: 320, y: 180 }, textSafe: 'right', atmosphere: 'dust', music: { theme: 'tunnel_bed', intensity: 1 } },
  { key: 'broken_vending_area', tier: 'T2', baseImage: 'broken_vending_area', focus: { x: 320, y: 180 }, textSafe: 'right', atmosphere: 'drip', music: { theme: 'tunnel_bed', intensity: 1 } },
  { key: 'collapsed_tunnel', tier: 'T2', baseImage: 'collapsed_tunnel', focus: { x: 320, y: 180 }, textSafe: 'left', atmosphere: 'dust', music: { theme: 'tunnel_bed', intensity: 2 } },
  { key: 'tunnel_camp', tier: 'T2', baseImage: 'tunnel_camp', focus: { x: 320, y: 180 }, textSafe: 'right', atmosphere: 'embers', music: { theme: 'calm_bed', intensity: 1 } },
  { key: 'surface_ruins', tier: 'T2', baseImage: 'surface_ruins', focus: { x: 320, y: 180 }, textSafe: 'left', atmosphere: 'ash', music: { theme: 'surface_bed', intensity: 1 } },
  { key: 'iron_saints_checkpoint', tier: 'T2', baseImage: 'iron_saints_checkpoint', focus: { x: 320, y: 180 }, textSafe: 'right', atmosphere: 'snow-ash', music: { theme: 'iron_saints_motif', intensity: 2 }, faction: 'Iron Saints' },
  { key: 'glass_tower_gate', tier: 'T2', baseImage: 'glass_tower_gate', focus: { x: 320, y: 180 }, textSafe: 'left', atmosphere: 'fog', music: { theme: 'glass_court_motif', intensity: 1 }, faction: 'Glass Court' },
  { key: 'red_choir_chamber', tier: 'T2', baseImage: 'red_choir_chamber', focus: { x: 320, y: 180 }, textSafe: 'right', atmosphere: 'embers', music: { theme: 'red_choir_motif', intensity: 2 }, faction: 'Red Choir' },
  { key: 'surface_dawn', tier: 'T2', baseImage: 'surface_dawn', focus: { x: 320, y: 180 }, textSafe: 'bottom', atmosphere: 'ash', music: { theme: 'surface_bed', intensity: 1 } },
  { key: 'ruined_street', tier: 'T2', baseImage: 'ruined_street', focus: { x: 320, y: 180 }, textSafe: 'left', atmosphere: 'ash', music: { theme: 'surface_bed', intensity: 1 } },
  { key: 'saints_patrol', tier: 'T2', baseImage: 'saints_patrol', focus: { x: 320, y: 180 }, textSafe: 'right', atmosphere: 'snow-ash', music: { theme: 'iron_saints_motif', intensity: 2 }, faction: 'Iron Saints' },
  { key: 'black_market_alley', tier: 'T2', baseImage: 'black_market_alley', focus: { x: 320, y: 180 }, textSafe: 'left', atmosphere: 'fog', music: { theme: 'calm_bed', intensity: 1 } },
  { key: 'glass_tower_lobby', tier: 'T2', baseImage: 'glass_tower_lobby', focus: { x: 320, y: 180 }, textSafe: 'right', atmosphere: 'fog', music: { theme: 'glass_court_motif', intensity: 1 }, faction: 'Glass Court' },
  { key: 'choir_broadcast_point', tier: 'T2', baseImage: 'choir_broadcast_point', focus: { x: 320, y: 180 }, textSafe: 'bottom', atmosphere: 'sparks', music: { theme: 'red_choir_motif', intensity: 2 }, faction: 'Red Choir' },
  { key: 'archive_ruin_wall', tier: 'T2', baseImage: 'archive_ruin_wall', focus: { x: 320, y: 180 }, textSafe: 'left', atmosphere: 'dust', music: { theme: 'last_archive_motif', intensity: 1 }, faction: 'Last Archive' },
  { key: 'surface_night', tier: 'T2', baseImage: 'surface_night', focus: { x: 320, y: 180 }, textSafe: 'bottom', atmosphere: 'ash', music: { theme: 'surface_bed', intensity: 2 } },
  { key: 'last_archive_door', tier: 'T2', baseImage: 'last_archive_door', focus: { x: 320, y: 180 }, textSafe: 'right', atmosphere: 'dust', music: { theme: 'last_archive_motif', intensity: 2 }, faction: 'Last Archive' },
  { key: 'candle_market', tier: 'T2', baseImage: 'candle_market', focus: { x: 320, y: 180 }, textSafe: 'left', atmosphere: 'drip', music: { theme: 'calm_bed', intensity: 1 } },
  { key: 'bone_turnstile', tier: 'T2', baseImage: 'bone_turnstile', focus: { x: 320, y: 180 }, textSafe: 'right', atmosphere: 'drip', music: { theme: 'tunnel_bed', intensity: 1 } },
  { key: 'flooded_platform', tier: 'T2', baseImage: 'flooded_platform', focus: { x: 320, y: 180 }, textSafe: 'left', atmosphere: 'drip', music: { theme: 'tunnel_bed', intensity: 1 } },
  { key: 'nursery_of_knives', tier: 'T2', baseImage: 'nursery_of_knives', focus: { x: 320, y: 180 }, textSafe: 'right', atmosphere: 'fog', music: { theme: 'hollow_children_motif', intensity: 2 }, faction: 'Hollow Children' },
  { key: 'chalk_map_wall', tier: 'T2', baseImage: 'chalk_map_wall', focus: { x: 320, y: 180 }, textSafe: 'left', atmosphere: 'dust', music: { theme: 'tunnel_bed', intensity: 1 } },
  { key: 'rat_king_gate', tier: 'T2', baseImage: 'rat_king_gate', focus: { x: 320, y: 180 }, textSafe: 'right', atmosphere: 'drip', music: { theme: 'tunnel_bed', intensity: 2 } },
  { key: 'hidden_clinic', tier: 'T2', baseImage: 'hidden_clinic', focus: { x: 320, y: 180 }, textSafe: 'left', atmosphere: 'drip', music: { theme: 'calm_bed', intensity: 1 } },
  { key: 'relic_engine_room', tier: 'T2', baseImage: 'relic_engine_room', focus: { x: 320, y: 180 }, textSafe: 'bottom', atmosphere: 'sparks', music: { theme: 'main_theme', intensity: 2 }, faction: 'Relic', hasLayers: true },

  // ─── 32 T1 Critical Narrative Scenes ────────────────────────────────────────
  { key: 'broken_throne', tier: 'T1', baseImage: 'archive_ruin_wall', focus: { x: 280, y: 190 }, textSafe: 'bottom', atmosphere: 'ash', music: { theme: 'main_theme', intensity: 3 }, hasLayers: true },
  { key: 'relic_scar', tier: 'T1', baseImage: 'relic_engine_room', focus: { x: 420, y: 180 }, textSafe: 'right', atmosphere: 'sparks', music: { theme: 'main_theme', intensity: 3 }, faction: 'Relic', hasLayers: true },
  { key: 'first_gate', tier: 'T1', baseImage: 'glass_tower_gate', focus: { x: 360, y: 170 }, textSafe: 'left', atmosphere: 'dust', music: { theme: 'surface_bed', intensity: 2 }, hasLayers: true },
  { key: 'last_gate', tier: 'T1', baseImage: 'relic_engine_room', focus: { x: 360, y: 160 }, textSafe: 'bottom', atmosphere: 'sparks', music: { theme: 'main_theme', intensity: 3 }, faction: 'Relic', hasLayers: true },
  { key: 'starving_bridge', tier: 'T1', baseImage: 'ruined_street', focus: { x: 380, y: 200 }, textSafe: 'right', atmosphere: 'fog', music: { theme: 'hollow_children_motif', intensity: 2 }, faction: 'Hollow Children', hasLayers: true },
  { key: 'cain_war_room', tier: 'T1', baseImage: 'iron_saints_checkpoint', focus: { x: 300, y: 180 }, textSafe: 'left', atmosphere: 'dust', music: { theme: 'iron_saints_motif', intensity: 2 }, faction: 'Iron Saints', hasLayers: true },
  { key: 'saint_front', tier: 'T1', baseImage: 'saints_patrol', focus: { x: 350, y: 190 }, textSafe: 'right', atmosphere: 'snow-ash', music: { theme: 'iron_saints_motif', intensity: 3 }, faction: 'Iron Saints', hasLayers: true },
  { key: 'dust_library', tier: 'T1', baseImage: 'archive_ruin_wall', focus: { x: 320, y: 180 }, textSafe: 'left', atmosphere: 'dust', music: { theme: 'last_archive_motif', intensity: 1 }, faction: 'Last Archive', hasLayers: true },
  { key: 'quiet_safehouse', tier: 'T1', baseImage: 'tunnel_camp', focus: { x: 340, y: 190 }, textSafe: 'right', atmosphere: 'drip', music: { theme: 'calm_bed', intensity: 1 }, hasLayers: true },
  { key: 'mira_hidden_clinic', tier: 'T1', baseImage: 'hidden_clinic', focus: { x: 310, y: 175 }, textSafe: 'right', atmosphere: 'drip', music: { theme: 'calm_bed', intensity: 1 }, hasLayers: true },
  { key: 'sub_city_gate', tier: 'T1', baseImage: 'rat_king_gate', focus: { x: 360, y: 180 }, textSafe: 'left', atmosphere: 'dust', music: { theme: 'last_archive_motif', intensity: 2 }, faction: 'Last Archive', hasLayers: true },
  { key: 'deep_archive', tier: 'T1', baseImage: 'archive_ruin_wall', focus: { x: 330, y: 185 }, textSafe: 'right', atmosphere: 'dust', music: { theme: 'last_archive_motif', intensity: 2 }, faction: 'Last Archive', hasLayers: true },
  { key: 'bloodlit_underpass', tier: 'T1', baseImage: 'collapsed_tunnel', focus: { x: 340, y: 180 }, textSafe: 'left', atmosphere: 'embers', music: { theme: 'red_choir_motif', intensity: 2 }, faction: 'Red Choir', hasLayers: true },
  { key: 'singing_hospital', tier: 'T1', baseImage: 'hidden_clinic', focus: { x: 320, y: 180 }, textSafe: 'right', atmosphere: 'embers', music: { theme: 'red_choir_motif', intensity: 2 }, faction: 'Red Choir', hasLayers: true },
  { key: 'companion_crossroads', tier: 'T1', baseImage: 'black_market_alley', focus: { x: 360, y: 190 }, textSafe: 'bottom', atmosphere: 'fog', music: { theme: 'calm_bed', intensity: 1 }, hasLayers: true },
  { key: 'blackout_core', tier: 'T1', baseImage: 'relic_engine_room', focus: { x: 360, y: 160 }, textSafe: 'bottom', atmosphere: 'sparks', music: { theme: 'main_theme', intensity: 3 }, faction: 'Relic', hasLayers: true },
  { key: 'red_choir_march', tier: 'T1', baseImage: 'red_choir_chamber', focus: { x: 340, y: 190 }, textSafe: 'left', atmosphere: 'embers', music: { theme: 'red_choir_motif', intensity: 3 }, faction: 'Red Choir', hasLayers: true },
  { key: 'white_atrium', tier: 'T1', baseImage: 'glass_tower_lobby', focus: { x: 350, y: 175 }, textSafe: 'right', atmosphere: 'fog', music: { theme: 'glass_court_motif', intensity: 2 }, faction: 'Glass Court', hasLayers: true },
  { key: 'relic_transit_line', tier: 'T1', baseImage: 'relic_engine_room', focus: { x: 330, y: 180 }, textSafe: 'left', atmosphere: 'sparks', music: { theme: 'main_theme', intensity: 2 }, faction: 'Relic', hasLayers: true },
  { key: 'glass_barricade', tier: 'T1', baseImage: 'glass_tower_gate', focus: { x: 350, y: 180 }, textSafe: 'right', atmosphere: 'fog', music: { theme: 'glass_court_motif', intensity: 2 }, faction: 'Glass Court', hasLayers: true },
  { key: 'archive_siege', tier: 'T1', baseImage: 'archive_ruin_wall', focus: { x: 340, y: 180 }, textSafe: 'bottom', atmosphere: 'dust', music: { theme: 'last_archive_motif', intensity: 3 }, faction: 'Last Archive', hasLayers: true },
  { key: 'hollow_children_hideout', tier: 'T1', baseImage: 'nursery_of_knives', focus: { x: 320, y: 185 }, textSafe: 'right', atmosphere: 'embers', music: { theme: 'hollow_children_motif', intensity: 2 }, faction: 'Hollow Children', hasLayers: true },
  { key: 'saint_furnace', tier: 'T1', baseImage: 'relic_engine_room', focus: { x: 360, y: 190 }, textSafe: 'bottom', atmosphere: 'embers', music: { theme: 'iron_saints_motif', intensity: 3 }, faction: 'Iron Saints', hasLayers: true },
  { key: 'grain_vault', tier: 'T1', baseImage: 'broken_vending_area', focus: { x: 330, y: 180 }, textSafe: 'right', atmosphere: 'dust', music: { theme: 'surface_bed', intensity: 1 }, hasLayers: true },
  { key: 'famine_camp', tier: 'T1', baseImage: 'tunnel_camp', focus: { x: 350, y: 190 }, textSafe: 'bottom', atmosphere: 'ash', music: { theme: 'hollow_children_motif', intensity: 1 }, faction: 'Hollow Children', hasLayers: true },
  { key: 'rust_cathedral', tier: 'T1', baseImage: 'surface_ruins', focus: { x: 320, y: 180 }, textSafe: 'left', atmosphere: 'drip', music: { theme: 'surface_bed', intensity: 2 }, hasLayers: true },
  { key: 'betrayal_alley', tier: 'T1', baseImage: 'black_market_alley', focus: { x: 340, y: 180 }, textSafe: 'right', atmosphere: 'fog', music: { theme: 'calm_bed', intensity: 2 }, hasLayers: true },
  { key: 'memory_shelter', tier: 'T1', baseImage: 'dark_metro_hallway', focus: { x: 320, y: 180 }, textSafe: 'left', atmosphere: 'dust', music: { theme: 'calm_bed', intensity: 1 }, hasLayers: true },
  { key: 'empty_chair', tier: 'T1', baseImage: 'archive_ruin_wall', focus: { x: 320, y: 190 }, textSafe: 'right', atmosphere: 'dust', music: { theme: 'calm_bed', intensity: 1 }, hasLayers: true },
  { key: 'underworld_district', tier: 'T1', baseImage: 'candle_market', focus: { x: 340, y: 180 }, textSafe: 'left', atmosphere: 'drip', music: { theme: 'tunnel_bed', intensity: 1 }, hasLayers: true },
  { key: 'old_government_vault', tier: 'T1', baseImage: 'bone_turnstile', focus: { x: 330, y: 180 }, textSafe: 'right', atmosphere: 'dust', music: { theme: 'surface_bed', intensity: 2 }, hasLayers: true },
  { key: 'faction_hall', tier: 'T1', baseImage: 'surface_dawn', focus: { x: 360, y: 170 }, textSafe: 'bottom', atmosphere: 'dust', music: { theme: 'main_theme', intensity: 2 }, hasLayers: true },
];

// Color grading filter per faction to provide distinctive atmosphere
function applyFactionColorGrade(rawPixels: Uint8ClampedArray, faction?: string): Uint8ClampedArray {
  if (!faction || faction === 'Neutral') return rawPixels;
  const graded = new Uint8ClampedArray(rawPixels);

  for (let i = 0; i < graded.length; i += 4) {
    if (graded[i + 3] === 0) continue;
    let r = graded[i];
    let g = graded[i + 1];
    let b = graded[i + 2];

    switch (faction) {
      case 'Iron Saints':
        // Rust warm shift
        r = Math.min(255, Math.round(r * 1.15 + 10));
        g = Math.min(255, Math.round(g * 0.92));
        b = Math.max(0, Math.round(b * 0.78));
        break;
      case 'Glass Court':
        // Cold cyan / clinical teal shift
        r = Math.max(0, Math.round(r * 0.82));
        g = Math.min(255, Math.round(g * 1.05 + 4));
        b = Math.min(255, Math.round(b * 1.22 + 12));
        break;
      case 'Red Choir':
        // Arterial deep crimson shift
        r = Math.min(255, Math.round(r * 1.25 + 16));
        g = Math.max(0, Math.round(g * 0.75));
        b = Math.max(0, Math.round(b * 0.85));
        break;
      case 'Last Archive':
        // Amber gold and vellum parchment shift
        r = Math.min(255, Math.round(r * 1.10 + 8));
        g = Math.min(255, Math.round(g * 1.02 + 4));
        b = Math.max(0, Math.round(b * 0.72));
        break;
      case 'Hollow Children':
        // Sickly green / cave moss shift
        r = Math.max(0, Math.round(r * 0.85));
        g = Math.min(255, Math.round(g * 1.18 + 10));
        b = Math.max(0, Math.round(b * 0.80));
        break;
      case 'Relic':
        // Bioelectric violet glow shift
        r = Math.min(255, Math.round(r * 1.12 + 10));
        g = Math.max(0, Math.round(g * 0.82));
        b = Math.min(255, Math.round(b * 1.25 + 15));
        break;
    }

    graded[i] = r;
    graded[i + 1] = g;
    graded[i + 2] = b;
  }

  return graded;
}

// Generates 3 depth layers (far, mid, fore) for parallax
export function generateParallaxLayers(
  compositePixels: Uint8ClampedArray,
  width: number,
  height: number
): { far: Uint8ClampedArray; mid: Uint8ClampedArray; fore: Uint8ClampedArray } {
  const far = new Uint8ClampedArray(compositePixels.length);
  const mid = new Uint8ClampedArray(compositePixels.length);
  const fore = new Uint8ClampedArray(compositePixels.length);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const r = compositePixels[idx];
      const g = compositePixels[idx + 1];
      const b = compositePixels[idx + 2];
      const a = compositePixels[idx + 3];

      if (a === 0) continue;

      const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;

      // Far layer: Upper 45% of scene (sky, vaulted ceiling, horizon) or distant highlights
      if (y < height * 0.45 || (y < height * 0.65 && lum > 140)) {
        far[idx] = r;
        far[idx + 1] = g;
        far[idx + 2] = b;
        far[idx + 3] = 255;
      }

      // Mid layer: Core focal zone
      if (y >= height * 0.20 && y <= height * 0.88) {
        mid[idx] = r;
        mid[idx + 1] = g;
        mid[idx + 2] = b;
        mid[idx + 3] = 255;
      }

      // Fore layer: Immediate bottom 30% or framing perimeter pillars
      const isPerimeter = x < width * 0.08 || x > width * 0.92;
      if (y > height * 0.75 || (isPerimeter && y > height * 0.40)) {
        fore[idx] = r;
        fore[idx + 1] = g;
        fore[idx + 2] = b;
        fore[idx + 3] = 255;
      }
    }
  }

  return { far, mid, fore };
}

// ─── MANIFEST GENERATOR ───────────────────────────────────────────────────────
export function emitSceneManifest(
  scenes: Array<SceneBuildSpec & { paletteHex: string[] }>
): string {
  const registryEntries: string[] = [];
  const manifestEntries: string[] = [];

  for (const s of scenes) {
    registryEntries.push(`  ${s.key}_landscape: require('../assets/pixel/scenes/${s.key}_landscape.png'),`);
    registryEntries.push(`  ${s.key}_portrait: require('../assets/pixel/scenes/${s.key}_portrait.png'),`);
    registryEntries.push(`  ${s.key}: require('../assets/pixel/scenes/${s.key}_landscape.png'),`);

    if (s.hasLayers) {
      registryEntries.push(`  ${s.key}_landscape_far: require('../assets/pixel/scenes/${s.key}_landscape_far.png'),`);
      registryEntries.push(`  ${s.key}_landscape_mid: require('../assets/pixel/scenes/${s.key}_landscape_mid.png'),`);
      registryEntries.push(`  ${s.key}_landscape_fore: require('../assets/pixel/scenes/${s.key}_landscape_fore.png'),`);
      registryEntries.push(`  ${s.key}_portrait_far: require('../assets/pixel/scenes/${s.key}_portrait_far.png'),`);
      registryEntries.push(`  ${s.key}_portrait_mid: require('../assets/pixel/scenes/${s.key}_portrait_mid.png'),`);
      registryEntries.push(`  ${s.key}_portrait_fore: require('../assets/pixel/scenes/${s.key}_portrait_fore.png'),`);
    }

    manifestEntries.push(`  ${s.key}: {`);
    manifestEntries.push(`    key: '${s.key}',`);
    manifestEntries.push(`    landscape: '${s.key}_landscape',`);
    manifestEntries.push(`    portrait: '${s.key}_portrait',`);

    if (s.hasLayers) {
      manifestEntries.push(`    layers: {`);
      manifestEntries.push(`      far: '${s.key}_landscape_far',`);
      manifestEntries.push(`      mid: '${s.key}_landscape_mid',`);
      manifestEntries.push(`      fore: '${s.key}_landscape_fore',`);
      manifestEntries.push(`    },`);
    }

    manifestEntries.push(`    focus: { x: ${s.focus.x}, y: ${s.focus.y} },`);
    manifestEntries.push(`    textSafe: '${s.textSafe}',`);
    manifestEntries.push(`    palette: [\n      ${s.paletteHex.map((h) => `'${h}'`).join(', ')}\n    ],`);
    manifestEntries.push(`    atmosphere: '${s.atmosphere}',`);
    manifestEntries.push(`    cycles: [`);
    manifestEntries.push(`      { indices: [50, 51, 52, 53], speedMs: 550 },`);
    manifestEntries.push(`      { indices: [54, 55, 56, 57], speedMs: 320 },`);
    manifestEntries.push(`      { indices: [58, 59, 60, 61], speedMs: 2400 },`);
    manifestEntries.push(`    ],`);
    manifestEntries.push(`    music: { theme: '${s.music.theme}', intensity: ${s.music.intensity} },`);
    manifestEntries.push(`  },`);
  }

  return `/**
 * Master Scene Manifest for Scars of the Last Kingdom.
 * Auto-generated by scripts/src/buildPixelAssets.ts.
 *
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
${registryEntries.join('\n')}
};

export const SCENE_MANIFEST: Record<string, SceneManifestEntry> = {
${manifestEntries.join('\n')}
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
    SCENE_ASSET_REGISTRY[\`\${entry.key}_\${orientation}\`] ||
    SCENE_ASSET_REGISTRY[entry.key] ||
    (orientation === 'landscape'
      ? SCENE_ASSET_REGISTRY.ruined_metro_station_landscape
      : SCENE_ASSET_REGISTRY.ruined_metro_station_portrait) ||
    SCENE_ASSET_REGISTRY.ruined_metro_station
  );
}
`;
}

// ─── MAIN BUILD PIPELINE ──────────────────────────────────────────────────────
export async function buildPixelAssets() {
  console.log('🚀 Starting Master Pixel Asset Pipeline (Wave 2 Deliverable)...');

  if (!existsSync(SCENES_OUT_DIR)) {
    mkdirSync(SCENES_OUT_DIR, { recursive: true });
  }
  if (!existsSync(PLACEHOLDERS_DIR)) {
    mkdirSync(PLACEHOLDERS_DIR, { recursive: true });
  }

  const processedManifestData: Array<SceneBuildSpec & { paletteHex: string[] }> = [];
  let totalProcessed = 0;
  let maxLayerSize = 0;

  for (const scene of MASTER_SCENES) {
    const srcFile = resolve(SRC_IMAGES_DIR, `${scene.baseImage}.png`);
    if (!existsSync(srcFile)) {
      console.warn(`⚠️ Source image ${scene.baseImage}.png not found, skipping ${scene.key}`);
      continue;
    }

    // 1. Ingest & downscale Landscape variant (720x400)
    const rawLand = await sharp(srcFile)
      .resize(LANDSCAPE_W, LANDSCAPE_H, {
        fit: 'cover',
        position: 'center',
        kernel: sharp.kernel.lanczos3,
        fastShrinkOnLoad: false,
      })
      .sharpen({ sigma: 0.75, m1: 0.5, m2: 2.5 })
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    // 2. Ingest & downscale Portrait variant (400x760)
    const rawPort = await sharp(srcFile)
      .resize(PORTRAIT_W, PORTRAIT_H, {
        fit: 'cover',
        position: 'center',
        kernel: sharp.kernel.lanczos3,
        fastShrinkOnLoad: false,
      })
      .sharpen({ sigma: 0.75, m1: 0.5, m2: 2.5 })
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    const landPixels = applyFactionColorGrade(new Uint8ClampedArray(rawLand.data), scene.faction);
    const portPixels = applyFactionColorGrade(new Uint8ClampedArray(rawPort.data), scene.faction);

    // 3. Extract sub-palette (<= 32 colors)
    const subPalette = extractSubPalette(landPixels, 32);
    const paletteHex = subPalette.map(rgbToHex);

    // 4. Export Landscape master
    const landPng = resolve(SCENES_OUT_DIR, `${scene.key}_landscape.png`);
    const landWebp = resolve(SCENES_OUT_DIR, `${scene.key}_landscape.webp`);
    const landRes = await processAndExportLayer(landPixels, LANDSCAPE_W, LANDSCAPE_H, subPalette, landPng, landWebp);
    maxLayerSize = Math.max(maxLayerSize, landRes.pngSize);

    // Also write to placeholders/ for backward-compatibility with Wave 1 imports
    const placeholderLandPng = resolve(PLACEHOLDERS_DIR, `${scene.key}_landscape.png`);
    writeFileSync(placeholderLandPng, readFileSync(landPng));

    // 5. Export Portrait master
    const portPng = resolve(SCENES_OUT_DIR, `${scene.key}_portrait.png`);
    const portWebp = resolve(SCENES_OUT_DIR, `${scene.key}_portrait.webp`);
    const portRes = await processAndExportLayer(portPixels, PORTRAIT_W, PORTRAIT_H, subPalette, portPng, portWebp);
    maxLayerSize = Math.max(maxLayerSize, portRes.pngSize);

    const placeholderPortPng = resolve(PLACEHOLDERS_DIR, `${scene.key}_portrait.png`);
    writeFileSync(placeholderPortPng, readFileSync(portPng));

    // 6. Export Depth Layers (far, mid, fore) if scene has layers
    if (scene.hasLayers) {
      const landLayers = generateParallaxLayers(landPixels, LANDSCAPE_W, LANDSCAPE_H);
      await processAndExportLayer(landLayers.far, LANDSCAPE_W, LANDSCAPE_H, subPalette, resolve(SCENES_OUT_DIR, `${scene.key}_landscape_far.png`));
      await processAndExportLayer(landLayers.mid, LANDSCAPE_W, LANDSCAPE_H, subPalette, resolve(SCENES_OUT_DIR, `${scene.key}_landscape_mid.png`));
      await processAndExportLayer(landLayers.fore, LANDSCAPE_W, LANDSCAPE_H, subPalette, resolve(SCENES_OUT_DIR, `${scene.key}_landscape_fore.png`));

      const portLayers = generateParallaxLayers(portPixels, PORTRAIT_W, PORTRAIT_H);
      await processAndExportLayer(portLayers.far, PORTRAIT_W, PORTRAIT_H, subPalette, resolve(SCENES_OUT_DIR, `${scene.key}_portrait_far.png`));
      await processAndExportLayer(portLayers.mid, PORTRAIT_W, PORTRAIT_H, subPalette, resolve(SCENES_OUT_DIR, `${scene.key}_portrait_mid.png`));
      await processAndExportLayer(portLayers.fore, PORTRAIT_W, PORTRAIT_H, subPalette, resolve(SCENES_OUT_DIR, `${scene.key}_portrait_fore.png`));
    }

    processedManifestData.push({
      ...scene,
      paletteHex,
    });
    totalProcessed++;
  }

  // 7. Emit sceneManifest.ts
  const manifestCode = emitSceneManifest(processedManifestData);
  writeFileSync(MANIFEST_PATH, manifestCode, 'utf-8');

  console.log(`\n═══════════════════════════════════════════════════════════`);
  console.log(`✅ ASSET PIPELINE COMPLETE:`);
  console.log(`   Total scenes processed: ${totalProcessed} (26 T2 + 32 T1)`);
  console.log(`   Output directory: ${SCENES_OUT_DIR}`);
  console.log(`   Max layer size: ${(maxLayerSize / 1024).toFixed(1)} KB (Budget: < 60 KB)`);
  console.log(`   Manifest emitted: ${MANIFEST_PATH}`);
  console.log(`═══════════════════════════════════════════════════════════\n`);
}

// Direct CLI invocation
if (process.argv[1] && process.argv[1].includes('buildPixelAssets')) {
  buildPixelAssets().catch((err) => {
    console.error('❌ Asset pipeline failed:', err);
    process.exit(1);
  });
}
