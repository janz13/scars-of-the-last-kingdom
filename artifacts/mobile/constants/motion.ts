/**
 * Shared motion tokens, stepped pixel easings, and spring presets.
 * Designed for Scars of the Last Kingdom's 16-bit retro aesthetic.
 */

export const MOTION_DURATIONS = {
  /** 0ms for reduced motion or instantaneous feedback */
  instant: 0,
  /** 60ms: Rapid micro-interactions, button active states, mark glyph flickers */
  micro: 60,
  /** 140ms: Tooltip pop-ins, small badge reveals, hover highlights */
  fast: 140,
  /** 260ms: Panel slide transitions, staggered choice entry, sheet snaps */
  normal: 260,
  /** 450ms: Scene cross-fades, chapter title card reveal */
  slow: 450,
  /** 900ms: Major cutscene wipes, blackout sequence */
  cinematic: 900,
} as const;

export type MotionDurationPreset = keyof typeof MOTION_DURATIONS;

/**
 * Creates a worklet-safe stepped easing function that quantizes animation progress into N discrete steps.
 * Simulates low-frame-rate retro animations (e.g. 4fps or 8fps sprite loops).
 */
export function steppedEasing(steps: number) {
  'worklet';
  return (t: number): number => {
    'worklet';
    if (t <= 0) return 0;
    if (t >= 1) return 1;
    return Math.floor(t * steps) / steps;
  };
}

export const MOTION_EASINGS = {
  linear: (t: number) => { 'worklet'; return t; },
  /** 4-frame retro jump */
  step4: steppedEasing(4),
  /** 6-frame action step */
  step6: steppedEasing(6),
  /** 8-frame smooth pixel step */
  step8: steppedEasing(8),
  /** 12-frame fluid step */
  step12: steppedEasing(12),
  /** 24-frame cinematic step */
  step24: steppedEasing(24),
} as const;

/**
 * Standard CSS easing equivalents for Web canvas and DOM overlays.
 */
export const CSS_STEP_EASINGS = {
  step4: 'steps(4, jump-end)',
  step6: 'steps(6, jump-end)',
  step8: 'steps(8, jump-end)',
  step12: 'steps(12, jump-end)',
  step24: 'steps(24, jump-end)',
} as const;

/**
 * Spring configurations for react-native-reanimated withSpring().
 */
export const MOTION_SPRINGS = {
  /** Snappy retro feel for button presses and choice hover indicators */
  snappy: {
    damping: 15,
    stiffness: 220,
    mass: 0.7,
    overshootClamping: false,
  },
  /** Gentle, fluid physics for modal cards and bottom sheets */
  gentle: {
    damping: 22,
    stiffness: 130,
    mass: 1.0,
    overshootClamping: false,
  },
  /** High-impact, heavy physical feel for dice landing and damage feedback */
  stiff: {
    damping: 28,
    stiffness: 380,
    mass: 0.5,
    overshootClamping: true,
  },
  /** Rapid jitter for locked choices or error feedback */
  rattle: {
    damping: 8,
    stiffness: 280,
    mass: 0.5,
    overshootClamping: false,
  },
} as const;

export type MotionSpringPreset = keyof typeof MOTION_SPRINGS;

/**
 * Snaps any floating-point translation or coordinate to an integer art-pixel value.
 */
export function snapToPixel(value: number): number {
  'worklet';
  return Math.round(value);
}
