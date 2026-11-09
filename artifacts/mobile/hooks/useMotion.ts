import { useMemo } from 'react';
import { useReducedMotion } from './useReducedMotion';
import { useGame } from '../context/GameContext';
import { useQualityTier } from '../constants/pixelTiers';
import {
  MOTION_DURATIONS,
  MOTION_SPRINGS,
  MotionDurationPreset,
  MotionSpringPreset,
} from '../constants/motion';

export interface MotionContext {
  /** Whether reduced motion is active (via OS accessibility or settings) */
  reducedMotion: boolean;
  /** Active hardware quality tier ('high' | 'medium' | 'low') */
  qualityTier: 'high' | 'medium' | 'low';
  /** Whether multi-layer parallax scrolling is permitted */
  allowParallax: boolean;
  /** Whether ambient camera drift is permitted */
  allowCameraDrift: boolean;
  /** Whether screen-shake effects are permitted */
  allowScreenShake: boolean;
  /** Whether atmospheric particle systems are permitted */
  allowParticles: boolean;
  /** Maximum active particle count based on tier */
  particleCap: number;
  /** Number of active parallax depth layers (1 to 3) */
  parallaxLayers: 1 | 2 | 3;
  /** Whether palette cycling (water shimmer, fire glow) is permitted */
  allowPaletteCycling: boolean;
  /** Whether subpixel smooth camera interpolation is permitted (High tier only) */
  allowSubpixelCamera: boolean;
  /** Resolves a duration preset to milliseconds, returning 0 if reduced motion is active */
  getDuration: (preset: MotionDurationPreset | number) => number;
  /** Resolves a spring preset, clamping overshoot when reduced motion is active */
  getSpringConfig: (preset: MotionSpringPreset) => {
    damping: number;
    stiffness: number;
    mass: number;
    overshootClamping: boolean;
  };
}

export function useMotion(): MotionContext {
  const osReducedMotion = useReducedMotion();
  const { state } = useGame();
  const settings = state?.settings;

  // Settings override takes precedence over OS accessibility
  const reducedMotion = settings?.reducedMotion !== undefined
    ? settings.reducedMotion
    : osReducedMotion;

  const tierCaps = useQualityTier(settings?.qualityTier);

  return useMemo<MotionContext>(() => {
    const isLowTier = tierCaps.tier === 'low';

    const allowParallax = !reducedMotion && !isLowTier && tierCaps.parallaxLayers > 1;
    const allowCameraDrift = !reducedMotion && !isLowTier;
    const allowScreenShake = !reducedMotion;
    const allowParticles = !reducedMotion && tierCaps.maxParticles > 0;

    return {
      reducedMotion,
      qualityTier: tierCaps.tier,
      allowParallax,
      allowCameraDrift,
      allowScreenShake,
      allowParticles,
      particleCap: reducedMotion ? 0 : tierCaps.maxParticles,
      parallaxLayers: reducedMotion ? 1 : tierCaps.parallaxLayers,
      allowPaletteCycling: tierCaps.paletteCycling,
      allowSubpixelCamera: !reducedMotion && tierCaps.subpixelCamera,

      getDuration: (preset: MotionDurationPreset | number) => {
        if (reducedMotion) return 0;
        if (typeof preset === 'number') return preset;
        return MOTION_DURATIONS[preset] ?? MOTION_DURATIONS.normal;
      },

      getSpringConfig: (preset: MotionSpringPreset) => {
        const base = MOTION_SPRINGS[preset] ?? MOTION_SPRINGS.gentle;
        if (reducedMotion) {
          return { ...base, damping: 50, stiffness: 400, overshootClamping: true };
        }
        return base;
      },
    };
  }, [reducedMotion, tierCaps]);
}
