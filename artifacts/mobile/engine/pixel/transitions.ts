/**
 * Pixel Scene Transitions (Phase C2)
 *
 * Implements:
 * - `dither-dissolve` (default): 8×8 Bayer ordered threshold dissolve between front and back buffers
 * - `mosaic`: Stepped pixelation out and back in (for memory / flashback)
 * - `scanline-wipe`: Interlaced horizontal scanline sweep (for chapter breaks)
 * - `flash-white`: High-contrast relic/mark pulse flash
 * - `glitch-tear`: Horizontal scanline slice displacement (for corruption >= 70)
 * - `fade` / `instant`: Standard cross-fade or zero-latency swap
 */

export type PixelTransitionMode =
  | 'fade'
  | 'dither-dissolve'
  | 'mosaic'
  | 'scanline-wipe'
  | 'flash-white'
  | 'glitch-tear'
  | 'instant';

/**
 * 8×8 Bayer ordered threshold matrix (values 0..63).
 */
export const BAYER_8X8: readonly number[] = [
   0, 32,  8, 40,  2, 34, 10, 42,
  48, 16, 56, 24, 50, 18, 58, 26,
  12, 44,  4, 36, 14, 46,  6, 38,
  60, 28, 52, 20, 62, 30, 54, 22,
   3, 35, 11, 43,  1, 33,  9, 41,
  51, 19, 59, 27, 49, 17, 57, 25,
  15, 47,  7, 39, 13, 45,  5, 37,
  63, 31, 55, 23, 61, 29, 53, 21,
];

/**
 * Renders a frame of a pixel transition at normalized progress `t` (0..1)
 * from `front` buffer to `back` buffer onto `displayCtx`.
 */
export function renderPixelTransition(
  displayCtx: CanvasRenderingContext2D,
  front: HTMLCanvasElement,
  back: HTMLCanvasElement,
  width: number,
  height: number,
  t: number,
  mode: PixelTransitionMode = 'dither-dissolve'
): void {
  const clampedT = Math.max(0, Math.min(1, t));
  displayCtx.imageSmoothingEnabled = false;

  if (mode === 'instant' || clampedT >= 1) {
    displayCtx.clearRect(0, 0, width, height);
    displayCtx.drawImage(back, 0, 0, width, height);
    return;
  }

  if (clampedT <= 0) {
    displayCtx.clearRect(0, 0, width, height);
    displayCtx.drawImage(front, 0, 0, width, height);
    return;
  }

  switch (mode) {
    case 'dither-dissolve': {
      // Quantize progress to 16 discrete retro steps
      const stepT = Math.floor(clampedT * 16) / 16;
      const fCtx = front.getContext('2d');
      const bCtx = back.getContext('2d');
      if (fCtx && bCtx) {
        try {
          const fData = fCtx.getImageData(0, 0, width, height);
          const bData = bCtx.getImageData(0, 0, width, height);
          const out = displayCtx.createImageData(width, height);
          const f32 = new Uint32Array(fData.data.buffer);
          const b32 = new Uint32Array(bData.data.buffer);
          const o32 = new Uint32Array(out.data.buffer);
          const threshold = Math.floor(stepT * 64);

          let idx = 0;
          for (let y = 0; y < height; y++) {
            const by = (y & 7) << 3;
            for (let x = 0; x < width; x++) {
              const bayerVal = BAYER_8X8[by | (x & 7)]!;
              o32[idx] = bayerVal < threshold ? b32[idx]! : f32[idx]!;
              idx++;
            }
          }
          displayCtx.putImageData(out, 0, 0);
          return;
        } catch {
          // Fall through to standard crossfade if ImageData is unavailable
        }
      }
      displayCtx.clearRect(0, 0, width, height);
      displayCtx.globalAlpha = 1;
      displayCtx.drawImage(front, 0, 0, width, height);
      displayCtx.globalAlpha = stepT;
      displayCtx.drawImage(back, 0, 0, width, height);
      displayCtx.globalAlpha = 1;
      return;
    }

    case 'scanline-wipe': {
      displayCtx.clearRect(0, 0, width, height);
      displayCtx.drawImage(front, 0, 0, width, height);

      const bandHeight = 8;
      const numBands = Math.ceil(height / bandHeight);
      const revealPerBand = Math.ceil(clampedT * bandHeight);

      for (let b = 0; b < numBands; b++) {
        const sy = b * bandHeight;
        const sh = Math.min(revealPerBand, height - sy);
        if (sh > 0) {
          displayCtx.drawImage(back, 0, sy, width, sh, 0, sy, width, sh);
        }
      }
      return;
    }

    case 'mosaic': {
      const source = clampedT < 0.5 ? front : back;
      const intensity = clampedT < 0.5 ? clampedT * 2 : (1 - clampedT) * 2;
      const blockSize = Math.max(1, Math.pow(2, Math.round(intensity * 4))); // 1, 2, 4, 8, 16
      const sw = Math.max(1, Math.floor(width / blockSize));
      const sh = Math.max(1, Math.floor(height / blockSize));

      displayCtx.clearRect(0, 0, width, height);
      // Draw downscaled to top-left corner then upscale in-place without smoothing
      displayCtx.drawImage(source, 0, 0, width, height, 0, 0, sw, sh);
      displayCtx.drawImage(displayCtx.canvas, 0, 0, sw, sh, 0, 0, width, height);
      return;
    }

    case 'flash-white': {
      const source = clampedT < 0.45 ? front : back;
      const flashAlpha = clampedT < 0.45
        ? clampedT / 0.45
        : (1 - clampedT) / 0.55;

      displayCtx.clearRect(0, 0, width, height);
      displayCtx.drawImage(source, 0, 0, width, height);
      displayCtx.fillStyle = `rgba(245, 236, 215, ${Math.min(0.95, flashAlpha * 0.92).toFixed(3)})`;
      displayCtx.fillRect(0, 0, width, height);
      return;
    }

    case 'glitch-tear': {
      displayCtx.clearRect(0, 0, width, height);
      const base = clampedT < 0.5 ? front : back;
      const alt = clampedT < 0.5 ? back : front;
      displayCtx.drawImage(base, 0, 0, width, height);

      const slices = 10;
      const sliceH = Math.ceil(height / slices);
      for (let i = 0; i < slices; i++) {
        const sy = i * sliceH;
        const hash = Math.sin((i + 1) * 97.13 + clampedT * 31.7);
        const shiftX = Math.round(hash * 24 * Math.sin(clampedT * Math.PI));
        const useAlt = Math.abs(hash) > 0.45;
        displayCtx.drawImage(
          useAlt ? alt : base,
          0,
          sy,
          width,
          Math.min(sliceH, height - sy),
          shiftX,
          sy,
          width,
          Math.min(sliceH, height - sy)
        );
      }
      return;
    }

    case 'fade':
    default: {
      displayCtx.clearRect(0, 0, width, height);
      displayCtx.globalAlpha = 1;
      displayCtx.drawImage(front, 0, 0, width, height);
      displayCtx.globalAlpha = clampedT;
      displayCtx.drawImage(back, 0, 0, width, height);
      displayCtx.globalAlpha = 1;
      return;
    }
  }
}
