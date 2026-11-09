/**
 * Camera, Parallax & Ken Burns Drift Controller
 *
 * Implements:
 * - C3: Camera drift — slow pan of 8–16 art-pixels over 30s toward scene focal point,
 *   with integer steps by default (`Math.round` to pixel grid). Paused under reduced motion.
 * - C4: Parallax — layers move by `far: ±2px`, `mid: ±5px`, `fore: ±9px`.
 *   Driven by mouse pointer on desktop and opt-in `DeviceOrientationEvent` tilt on mobile.
 */

import { snapToPixel } from '../../constants/motion';

export interface ParallaxOffsets {
  farX: number;
  farY: number;
  midX: number;
  midY: number;
  foreX: number;
  foreY: number;
  driftX: number;
  driftY: number;
}

export interface CameraConfig {
  masterW: number;
  masterH: number;
  focus?: { x: number; y: number };
  allowParallax: boolean;
  allowCameraDrift: boolean;
  allowSubpixelCamera: boolean;
  parallaxLayers: 1 | 2 | 3;
}

export const PARALLAX_AMPLITUDES = {
  far: 2,
  mid: 5,
  fore: 9,
} as const;

export const DRIFT_CYCLE_MS = 30000; // 30s Ken Burns drift cycle
export const MAX_DRIFT_PIXELS = 12;  // 8–16 art-pixels range

export class PixelCamera {
  private pointerNormX = 0; // -1 to +1
  private pointerNormY = 0; // -1 to +1
  private tiltNormX = 0;    // -1 to +1
  private tiltNormY = 0;    // -1 to +1
  private smoothX = 0;
  private smoothY = 0;
  private startTimeMs = 0;
  private shakeOffsetX = 0;
  private shakeOffsetY = 0;
  private shakeUntilMs = 0;

  constructor(nowMs: number = 0) {
    this.startTimeMs = nowMs;
  }

  /**
   * Reset drift timer on scene change.
   */
  public resetScene(nowMs: number): void {
    this.startTimeMs = nowMs;
  }

  /**
   * Update normalized pointer coordinates (-1..1) from desktop mouse move.
   */
  public setPointerNormalized(nx: number, ny: number): void {
    this.pointerNormX = Math.max(-1, Math.min(1, nx));
    this.pointerNormY = Math.max(-1, Math.min(1, ny));
  }

  /**
   * Update normalized tilt coordinates (-1..1) from DeviceOrientationEvent (gamma/beta).
   */
  public setTiltAngles(gammaDeg: number | null, betaDeg: number | null): void {
    if (gammaDeg === null || betaDeg === null) {
      this.tiltNormX = 0;
      this.tiltNormY = 0;
      return;
    }
    // Map ±25 degrees of tilt to -1..1
    this.tiltNormX = Math.max(-1, Math.min(1, gammaDeg / 25));
    // Neutral holding angle ~45 deg beta
    this.tiltNormY = Math.max(-1, Math.min(1, (betaDeg - 45) / 25));
  }

  /**
   * Trigger a brief pixel-snapped screen shake (e.g. on dice landing or damage).
   */
  public triggerShake(durationMs: number = 180, amplitudePx: number = 3, nowMs: number = Date.now()): void {
    this.shakeUntilMs = nowMs + durationMs;
    this.shakeOffsetX = amplitudePx;
    this.shakeOffsetY = amplitudePx;
  }

  /**
   * Compute integer-snapped (or subpixel on High tier) layer offsets for the current frame.
   */
  public computeOffsets(nowMs: number, config: CameraConfig): ParallaxOffsets {
    const snap = config.allowSubpixelCamera ? (v: number) => v : snapToPixel;

    // 1. Smoothly interpolate combined pointer + tilt input
    const targetInputX = config.allowParallax
      ? Math.max(-1, Math.min(1, this.pointerNormX + this.tiltNormX))
      : 0;
    const targetInputY = config.allowParallax
      ? Math.max(-1, Math.min(1, this.pointerNormY + this.tiltNormY))
      : 0;

    this.smoothX += (targetInputX - this.smoothX) * 0.14;
    this.smoothY += (targetInputY - this.smoothY) * 0.14;

    // 2. Ken Burns slow drift toward scene focal point over 30s
    let driftX = 0;
    let driftY = 0;
    if (config.allowCameraDrift) {
      const elapsed = Math.max(0, nowMs - this.startTimeMs);
      // Smooth sine ping-pong over 30s cycle (0 -> 1 -> 0)
      const phase = (elapsed % (DRIFT_CYCLE_MS * 2)) / DRIFT_CYCLE_MS;
      const progress = phase <= 1 ? phase : 2 - phase;
      const eased = 0.5 - 0.5 * Math.cos(progress * Math.PI);

      const centerX = config.masterW / 2;
      const centerY = config.masterH / 2;
      const focusX = config.focus?.x ?? centerX;
      const focusY = config.focus?.y ?? centerY;

      // Direction vector from center toward focal point (or gentle default horizontal drift)
      const dx = focusX - centerX;
      const dy = focusY - centerY;
      const dist = Math.hypot(dx, dy);

      if (dist > 4) {
        const dirX = dx / dist;
        const dirY = dy / dist;
        driftX = snap(dirX * MAX_DRIFT_PIXELS * eased);
        driftY = snap(dirY * (MAX_DRIFT_PIXELS * 0.65) * eased);
      } else {
        driftX = snap(8 * Math.sin((elapsed / DRIFT_CYCLE_MS) * Math.PI * 2));
        driftY = snap(4 * Math.cos((elapsed / DRIFT_CYCLE_MS) * Math.PI * 2));
      }
    }

    // 3. Screen shake offset if active
    let shakeX = 0;
    let shakeY = 0;
    if (nowMs < this.shakeUntilMs) {
      const dir = Math.floor(nowMs / 32) % 2 === 0 ? 1 : -1;
      shakeX = snapToPixel(this.shakeOffsetX * dir);
      shakeY = snapToPixel(this.shakeOffsetY * -dir);
    }

    if (!config.allowParallax || config.parallaxLayers <= 1) {
      return {
        farX: driftX + shakeX,
        farY: driftY + shakeY,
        midX: driftX + shakeX,
        midY: driftY + shakeY,
        foreX: driftX + shakeX,
        foreY: driftY + shakeY,
        driftX,
        driftY,
      };
    }

    const farX = snap(this.smoothX * PARALLAX_AMPLITUDES.far + driftX * 0.5) + shakeX;
    const farY = snap(this.smoothY * PARALLAX_AMPLITUDES.far + driftY * 0.5) + shakeY;

    const midX = snap(this.smoothX * PARALLAX_AMPLITUDES.mid + driftX) + shakeX;
    const midY = snap(this.smoothY * PARALLAX_AMPLITUDES.mid + driftY) + shakeY;

    const foreAmp = config.parallaxLayers === 3 ? PARALLAX_AMPLITUDES.fore : PARALLAX_AMPLITUDES.mid;
    const foreX = snap(this.smoothX * foreAmp + driftX * 1.25) + shakeX;
    const foreY = snap(this.smoothY * foreAmp + driftY * 1.25) + shakeY;

    return {
      farX,
      farY,
      midX,
      midY,
      foreX,
      foreY,
      driftX,
      driftY,
    };
  }
}

/**
 * Helper to request DeviceOrientationEvent permission on iOS 13+ when the user enables tilt parallax.
 */
export async function requestDeviceTiltPermission(): Promise<boolean> {
  if (typeof window === 'undefined') return false;
  const DeviceOrientationEvt = (window as any).DeviceOrientationEvent;
  if (!DeviceOrientationEvt) return false;

  if (typeof DeviceOrientationEvt.requestPermission === 'function') {
    try {
      const response = await DeviceOrientationEvt.requestPermission();
      return response === 'granted';
    } catch {
      return false;
    }
  }
  return true;
}
