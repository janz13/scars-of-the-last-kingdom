/**
 * Pixel Stage Compositor — Lighting, Corruption Veins & Stat Feedback Overlays
 *
 * Implements:
 * - C6: Lighting — flickering tunnel light, dithered dark ring vignette, surface storm lightning flashes.
 * - C7: Corruption visuals — dithered vein overlays creeping from edges (`corruption > 0`),
 *   palette hue drift (`corruption >= 50`), rare 1-frame glitch tears & pixel-sorting streaks (`corruption >= 70`).
 * - C8: Stat feedback — red dithered edge pulse on damage, desaturation ramp at low hunger/thirst,
 *   and low-HP heartbeat vignette synced to audioEngine.
 */

import { BAYER_8X8 } from './transitions';
import type { ParallaxOffsets } from './camera';

export interface CompositorState {
  width: number;
  height: number;
  corruption: number;
  health: number;
  maxHealth: number;
  hunger: number;
  thirst: number;
  damagePulseAlpha: number;
  isTunnelScene: boolean;
  isStormScene: boolean;
  isHallucination: boolean;
  nowMs: number;
}

export interface LayerBuffers {
  base: HTMLCanvasElement;
  far?: HTMLCanvasElement | null;
  mid?: HTMLCanvasElement | null;
  fore?: HTMLCanvasElement | null;
}

/**
 * Composites parallax layers (`far`, `mid`, `fore`) or flat `base` buffer onto `targetCtx`.
 */
export function compositeParallaxLayers(
  targetCtx: CanvasRenderingContext2D,
  layers: LayerBuffers,
  offsets: ParallaxOffsets,
  width: number,
  height: number
): void {
  targetCtx.imageSmoothingEnabled = false;
  targetCtx.clearRect(0, 0, width, height);

  if (layers.far && layers.mid && layers.fore) {
    // Draw base underneath to prevent any edge gaps when shifting layers by up to ±9px
    targetCtx.drawImage(layers.base, 0, 0, width, height);
    targetCtx.drawImage(layers.far, offsets.farX, offsets.farY, width, height);
    targetCtx.drawImage(layers.mid, offsets.midX, offsets.midY, width, height);
    targetCtx.drawImage(layers.fore, offsets.foreX, offsets.foreY, width, height);
  } else if (layers.far && layers.mid) {
    targetCtx.drawImage(layers.base, 0, 0, width, height);
    targetCtx.drawImage(layers.far, offsets.farX, offsets.farY, width, height);
    targetCtx.drawImage(layers.mid, offsets.midX, offsets.midY, width, height);
  } else {
    targetCtx.drawImage(layers.base, offsets.midX, offsets.midY, width, height);
  }
}

/**
 * Renders C6 lighting, C7 corruption veins/glitch tears, and C8 stat feedback onto the stage canvas.
 */
export function renderStageOverlays(
  ctx: CanvasRenderingContext2D,
  state: CompositorState
): void {
  const {
    width,
    height,
    corruption,
    health,
    maxHealth,
    hunger,
    thirst,
    damagePulseAlpha,
    isTunnelScene,
    isStormScene,
    isHallucination,
    nowMs,
  } = state;

  ctx.save();
  ctx.imageSmoothingEnabled = false;

  // ── C6: Tunnel torch/fluorescent flicker & surface storm lightning ─────────
  if (isTunnelScene) {
    const flicker = Math.sin(nowMs * 0.013) * Math.sin(nowMs * 0.029);
    if (flicker < -0.55) {
      ctx.fillStyle = 'rgba(4, 2, 10, 0.14)';
      ctx.fillRect(0, 0, width, height);
    }
  }

  if (isStormScene) {
    // Rare deterministic lightning flash every ~9 seconds
    const stormPhase = nowMs % 9000;
    if (stormPhase > 8820 && stormPhase < 8910) {
      ctx.fillStyle = 'rgba(210, 225, 255, 0.22)';
      ctx.fillRect(0, 0, width, height);
    }
  }

  // ── C7: Corruption edge veins, hue drift (>= 50), glitch tears (>= 70) ─────
  if (corruption > 0 || isHallucination) {
    const effectiveCorruption = isHallucination ? Math.max(75, corruption) : corruption;
    const normCorr = Math.min(1, effectiveCorruption / 100);
    const veinDepth = Math.round(14 + normCorr * 54);

    // Dithered purple/crimson vein bands along the 4 borders
    ctx.fillStyle = effectiveCorruption >= 50 ? 'rgba(155, 38, 182, 0.42)' : 'rgba(125, 60, 152, 0.28)';
    const pulse = 0.8 + 0.2 * Math.sin(nowMs * 0.004);
    const step = 4;

    for (let y = 0; y < height; y += step) {
      for (let x = 0; x < width; x += step) {
        const distEdge = Math.min(x, y, width - 1 - x, height - 1 - y);
        if (distEdge > veinDepth) continue;

        const edgeFactor = 1 - distEdge / veinDepth;
        const bayer = BAYER_8X8[((y >> 2) & 7) * 8 + ((x >> 2) & 7)]! / 64;
        if (edgeFactor * pulse > bayer) {
          ctx.fillRect(x, y, step, step);
        }
      }
    }

    // Corruption >= 50: Subtle violet/magenta hue shift wash
    if (effectiveCorruption >= 50) {
      const hueAlpha = Math.min(0.22, ((effectiveCorruption - 50) / 50) * 0.18);
      ctx.fillStyle = `rgba(142, 45, 168, ${hueAlpha.toFixed(3)})`;
      ctx.fillRect(0, 0, width, height);
    }

    // Corruption >= 70: Rare 1-frame glitch tears and pixel-sorting streaks
    if (effectiveCorruption >= 70) {
      const glitchWindow = Math.floor(nowMs / 60) % 37;
      if (glitchWindow === 0 || isHallucination && glitchWindow % 9 === 0) {
        const tearY = Math.floor(((nowMs * 17) % Math.max(1, height - 16)));
        const tearH = 6 + (Math.floor(nowMs) % 10);
        const shiftX = ((Math.floor(nowMs / 16) % 2 === 0) ? 1 : -1) * (6 + Math.floor(normCorr * 10));
        try {
          ctx.drawImage(ctx.canvas, 0, tearY, width, tearH, shiftX, tearY, width, tearH);
          ctx.fillStyle = 'rgba(195, 155, 211, 0.28)';
          ctx.fillRect(0, tearY, width, 2);
        } catch {
          // Ignore self-draw errors in restricted environments
        }
      }
    }
  }

  // ── C8: Stat feedback — low hunger/thirst desaturation, low HP heartbeat, damage pulse ──
  if (hunger < 25 || thirst < 25) {
    const severity = Math.max(
      hunger < 25 ? (25 - hunger) / 25 : 0,
      thirst < 25 ? (25 - thirst) / 25 : 0
    );
    ctx.fillStyle = `rgba(18, 16, 24, ${(severity * 0.26).toFixed(3)})`;
    ctx.fillRect(0, 0, width, height);
  }

  const hpRatio = maxHealth > 0 ? health / maxHealth : 1;
  if (hpRatio > 0 && hpRatio <= 0.3) {
    // Heartbeat double-peak pulse at ~72 BPM (833ms period)
    const beatPhase = (nowMs % 850) / 850;
    const beatIntensity =
      beatPhase < 0.12
        ? Math.sin((beatPhase / 0.12) * Math.PI)
        : beatPhase > 0.2 && beatPhase < 0.32
        ? Math.sin(((beatPhase - 0.2) / 0.12) * Math.PI) * 0.7
        : 0;

    const baseVignette = (0.3 - hpRatio) / 0.3;
    const redAlpha = Math.min(0.48, 0.12 * baseVignette + 0.28 * beatIntensity);
    drawPixelBorderPulse(ctx, width, height, `rgba(192, 57, 43, ${redAlpha.toFixed(3)})`, 24);
  }

  if (damagePulseAlpha > 0.01) {
    drawPixelBorderPulse(
      ctx,
      width,
      height,
      `rgba(231, 76, 60, ${Math.min(0.75, damagePulseAlpha).toFixed(3)})`,
      36
    );
  }

  ctx.restore();
}

function drawPixelBorderPulse(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  color: string,
  thickness: number
): void {
  ctx.fillStyle = color;
  const t = Math.round(thickness);
  ctx.fillRect(0, 0, width, t);
  ctx.fillRect(0, height - t, width, t);
  ctx.fillRect(0, t, t, height - t * 2);
  ctx.fillRect(width - t, t, t, height - t * 2);
}
