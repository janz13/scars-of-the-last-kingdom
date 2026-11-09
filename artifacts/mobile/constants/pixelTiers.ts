import { useEffect, useState } from 'react';

function isWebPlatform(): boolean {
  try {
    const { Platform } = require('react-native');
    if (Platform && Platform.OS) return Platform.OS === 'web';
  } catch {
    // Non-fatal
  }
  return typeof window !== 'undefined';
}

export type QualityTier = 'high' | 'medium' | 'low';

export interface TierCapabilities {
  tier: QualityTier;
  maxParticles: number;
  parallaxLayers: 1 | 2 | 3;
  paletteCycling: boolean;
  glitchEffects: boolean;
  subpixelCamera: boolean;
  ditherTransitions: 'full' | 'simple' | 'none';
  atmosphericEffects: boolean;
  dynamicVignette: boolean;
  statPulses: boolean;
}

export const TIER_CONFIGS: Record<QualityTier, TierCapabilities> = {
  high: {
    tier: 'high',
    maxParticles: 150,
    parallaxLayers: 3,
    paletteCycling: true,
    glitchEffects: true,
    subpixelCamera: true,
    ditherTransitions: 'full',
    atmosphericEffects: true,
    dynamicVignette: true,
    statPulses: true,
  },
  medium: {
    tier: 'medium',
    maxParticles: 60,
    parallaxLayers: 2,
    paletteCycling: true,
    glitchEffects: true,
    subpixelCamera: false,
    ditherTransitions: 'full',
    atmosphericEffects: true,
    dynamicVignette: true,
    statPulses: true,
  },
  low: {
    tier: 'low',
    maxParticles: 0,
    parallaxLayers: 1,
    paletteCycling: false,
    glitchEffects: false,
    subpixelCamera: false,
    ditherTransitions: 'simple',
    atmosphericEffects: false,
    dynamicVignette: false,
    statPulses: false,
  },
};

/**
 * Checks for client-indicated Save-Data header or constrained connection.
 */
export function isSaveDataEnabled(): boolean {
  if (!isWebPlatform() || typeof navigator === 'undefined') return false;
  const conn = (navigator as any).connection;
  if (!conn) return false;
  return Boolean(conn.saveData || conn.effectiveType === '2g' || conn.effectiveType === 'slow-2g');
}

/**
 * Evaluates hardware concurrency and memory (Chrome/Edge deviceMemory API).
 */
export function detectHardwareTier(): QualityTier {
  if (!isWebPlatform() || typeof navigator === 'undefined') {
    // Native mobile devices default to Medium tier
    return 'medium';
  }

  if (isSaveDataEnabled()) {
    return 'low';
  }

  const cores = navigator.hardwareConcurrency || 4;
  const memory = (navigator as any).deviceMemory || 4; // in GB

  if (cores <= 2 || memory <= 1.5) {
    return 'low';
  }

  if (cores >= 8 && memory >= 4) {
    return 'high';
  }

  return 'medium';
}

/**
 * Lightweight, non-blocking 30-frame requestAnimationFrame FPS probe.
 * Returns measured FPS.
 */
export function probeFps(sampleFrames: number = 30): Promise<number> {
  if (!isWebPlatform() || typeof window === 'undefined' || !window.requestAnimationFrame) {
    return Promise.resolve(60);
  }

  if (typeof document !== 'undefined' && document.hidden) {
    return Promise.resolve(60);
  }

  return new Promise((resolve) => {
    let frameCount = 0;
    let startTime = performance.now();

    const loop = (now: number) => {
      if (typeof document !== 'undefined' && document.hidden) {
        resolve(60);
        return;
      }
      frameCount++;
      if (frameCount >= sampleFrames) {
        const elapsed = now - startTime;
        const fps = Math.round((frameCount * 1000) / Math.max(1, elapsed));
        resolve(fps);
      } else {
        window.requestAnimationFrame(loop);
      }
    };

    window.requestAnimationFrame((now) => {
      startTime = now;
      window.requestAnimationFrame(loop);
    });
  });
}

let cachedResolvedTier: QualityTier | null = null;

export function resolveActiveTier(
  override?: 'auto' | QualityTier,
  measuredFps?: number
): TierCapabilities {
  if (override && override !== 'auto') {
    return TIER_CONFIGS[override];
  }

  if (cachedResolvedTier && measuredFps === undefined) {
    return TIER_CONFIGS[cachedResolvedTier];
  }

  let baseTier = detectHardwareTier();

  if (measuredFps !== undefined) {
    if (measuredFps < 40) {
      baseTier = 'low';
    } else if (measuredFps >= 55 && baseTier === 'medium' && typeof navigator !== 'undefined' && (navigator.hardwareConcurrency || 4) >= 6) {
      baseTier = 'high';
    }
  }

  cachedResolvedTier = baseTier;
  return TIER_CONFIGS[baseTier];
}

/**
 * React hook that exposes the active tier capabilities and updates if an FPS probe detects low performance.
 */
export function useQualityTier(override?: 'auto' | QualityTier): TierCapabilities {
  const [capabilities, setCapabilities] = useState<TierCapabilities>(() =>
    resolveActiveTier(override)
  );

  useEffect(() => {
    if (override && override !== 'auto') {
      setCapabilities(TIER_CONFIGS[override]);
      return;
    }

    let active = true;
    probeFps(30).then((fps) => {
      if (active) {
        setCapabilities(resolveActiveTier(override, fps));
      }
    });

    return () => {
      active = false;
    };
  }, [override]);

  return capabilities;
}
