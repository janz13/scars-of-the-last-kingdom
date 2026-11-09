/**
 * PixelStage — Native-Resolution Double-Buffered Pixel-Art Stage
 *
 * Provides:
 * 1. Double-buffered canvas compositing at 720×400 / 400×760 native art resolution.
 * 2. Zero-black-flash transitions (`dither-dissolve`, `mosaic`, `scanline-wipe`, `flash-white`, `glitch-tear`, `fade`).
 * 3. CSS integer upscaling via `image-rendering: pixelated`.
 * 4. Multi-layer parallax (`far` ±2px, `mid` ±5px, `fore` ±9px) + 30s Ken Burns focal drift.
 * 5. Atmospheric particle system (`dust`, `ash`, `embers`, `rain`, `drip`, `fog`, `sparks`, `snow-ash`).
 * 6. Corruption vein overlays, hue drift (>= 50), and glitch tears (>= 70).
 * 7. Stat feedback: damage red border pulse, low hunger/thirst desaturation, and low-HP heartbeat vignette.
 * 8. Ultrawide decorative pillarbox frame rendering (aspect > 1.9).
 * 9. Native iOS/Android fallback using dual-layer cross-fading Image components.
 * 10. Persistent child rendering (no unmounting on scene change).
 */

import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  ImageBackground,
  Platform,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useIntegerScale } from '../../hooks/useIntegerScale';
import { PIXEL_GRID } from '../../constants/pixelGrid';
import {
  getBackgroundGradient,
  getBackgroundImage,
} from '../../constants/images';
import { resolveImageUri } from '../../hooks/useChoiceImagePreloader';
import {
  getSceneManifestEntry,
  resolveSceneAsset,
  SCENE_ASSET_REGISTRY,
  SCENE_MANIFEST,
} from '../../constants/sceneManifest';
import { useQualityTier } from '../../constants/pixelTiers';
import { PaletteCycler } from '../../engine/pixel/palette';
import { PixelCamera } from '../../engine/pixel/camera';
import { PixelParticleSystem } from '../../engine/pixel/particles';
import { renderPixelTransition, type PixelTransitionMode } from '../../engine/pixel/transitions';
import { compositeParallaxLayers, renderStageOverlays } from '../../engine/pixel/compositor';

export interface PixelStageProps {
  /** imageKey from current StoryNode */
  imageKey: string;
  /** Unique key for the scene (usually currentNode.id) */
  sceneKey: string;
  /** Overlay darkness opacity (0–1, default: 0.72) */
  overlayOpacity?: number;
  /** Transition duration in ms (default: 350) */
  fadeDuration?: number;
  /** Optional focus coordinates in art-pixels */
  focus?: { x: number; y: number };
  /** Transition mode */
  transition?: PixelTransitionMode;
  /** Player corruption level (0–100) for C7 corruption visuals */
  corruption?: number;
  /** Player current health for C8 stat feedback */
  health?: number;
  /** Player max health for C8 stat feedback */
  maxHealth?: number;
  /** Player hunger (0–100) for C8 stat feedback */
  hunger?: number;
  /** Player thirst (0–100) for C8 stat feedback */
  thirst?: number;
  /** Whether hallucination mode is active */
  isHallucination?: boolean;
  /** Opt-in mobile tilt parallax setting (default: false) */
  tiltParallaxEnabled?: boolean;
  /** Whether reduced motion is active */
  reducedMotion?: boolean;
  /** Optional container style */
  style?: StyleProp<ViewStyle>;
  /** Persistent children (story prose, choices, HUD) */
  children?: React.ReactNode;
}

export default function PixelStage(props: PixelStageProps) {
  if (Platform.OS === 'web') {
    return <WebPixelStage {...props} />;
  }
  return <NativePixelStage {...props} />;
}

/**
 * Resolves the image source for the current scene and orientation.
 */
function resolveSceneSource(key: string, activeOrientation: 'landscape' | 'portrait'): any {
  if (SCENE_MANIFEST[key]) {
    const entry = getSceneManifestEntry(key);
    const asset = resolveSceneAsset(entry, activeOrientation);
    if (asset) return asset;
  }
  const fallback = getBackgroundImage(key);
  if (fallback) return fallback;

  return resolveSceneAsset(getSceneManifestEntry('ruined_metro_station'), activeOrientation);
}

// ─────────────────────────────────────────────────────────────────────────────
// Web HTML5 Canvas Implementation (Double-Buffered + Parallax + Particles)
// ─────────────────────────────────────────────────────────────────────────────

function WebPixelStage({
  imageKey,
  sceneKey,
  overlayOpacity = 0.72,
  fadeDuration = 350,
  focus,
  transition = 'dither-dissolve',
  corruption = 0,
  health = 100,
  maxHealth = 100,
  hunger = 100,
  thirst = 100,
  isHallucination = false,
  tiltParallaxEnabled = false,
  reducedMotion = false,
  style,
  children,
}: PixelStageProps) {
  const {
    displayWidth,
    displayHeight,
    offsetX,
    offsetY,
    orientation,
    isUltrawide,
    pillarboxWidth,
  } = useIntegerScale();

  const grid = PIXEL_GRID[orientation];
  const masterW = grid.masterW;
  const masterH = grid.masterH;

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Dual offscreen buffers
  const frontBufferRef = useRef<HTMLCanvasElement | null>(null);
  const backBufferRef = useRef<HTMLCanvasElement | null>(null);
  const cycBufferRef = useRef<HTMLCanvasElement | null>(null);

  // Optional parallax layer buffers for active scene
  const layerBuffersRef = useRef<{
    far: HTMLCanvasElement | null;
    mid: HTMLCanvasElement | null;
    fore: HTMLCanvasElement | null;
  }>({ far: null, mid: null, fore: null });

  const currentRenderKeyRef = useRef<string | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const cycleFrameRef = useRef<number | null>(null);
  const paletteCyclerRef = useRef<PaletteCycler | null>(null);
  const cameraRef = useRef<PixelCamera>(new PixelCamera(0));
  const particleSysRef = useRef<PixelParticleSystem>(new PixelParticleSystem(1337));
  const activeTransitionIdRef = useRef<number>(0);
  const lastDimensionsRef = useRef<{ w: number; h: number } | null>(null);
  const prevHealthRef = useRef<number>(health);
  const damagePulseRef = useRef<number>(0);

  // Live reactive state refs for the 60fps animation loop
  const liveStatsRef = useRef({
    corruption,
    health,
    maxHealth,
    hunger,
    thirst,
    isHallucination,
    reducedMotion,
    tiltParallaxEnabled,
  });
  liveStatsRef.current = {
    corruption,
    health,
    maxHealth,
    hunger,
    thirst,
    isHallucination,
    reducedMotion,
    tiltParallaxEnabled,
  };

  // Trigger red edge pulse and subtle shake when health drops
  useEffect(() => {
    if (health < prevHealthRef.current) {
      damagePulseRef.current = 0.85;
      if (!reducedMotion) {
        cameraRef.current.triggerShake(200, 3, typeof performance !== 'undefined' ? performance.now() : Date.now());
      }
    }
    prevHealthRef.current = health;
  }, [health, reducedMotion]);

  const tierCaps = useQualityTier();

  // Desktop mouse pointer listener for parallax
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleMouseMove = (e: MouseEvent) => {
      if (liveStatsRef.current.reducedMotion) return;
      const nx = (e.clientX / Math.max(1, window.innerWidth)) * 2 - 1;
      const ny = (e.clientY / Math.max(1, window.innerHeight)) * 2 - 1;
      cameraRef.current.setPointerNormalized(nx, ny);
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Opt-in mobile DeviceOrientationEvent tilt listener
  useEffect(() => {
    if (typeof window === 'undefined' || !tiltParallaxEnabled || reducedMotion) {
      cameraRef.current.setTiltAngles(null, null);
      return;
    }
    const handleOrientation = (e: DeviceOrientationEvent) => {
      cameraRef.current.setTiltAngles(e.gamma, e.beta);
    };
    window.addEventListener('deviceorientation', handleOrientation, { passive: true });
    return () => window.removeEventListener('deviceorientation', handleOrientation);
  }, [tiltParallaxEnabled, reducedMotion]);

  // Helper to lazily instantiate and dimension-sync offscreen canvases
  const getBuffers = () => {
    if (typeof document === 'undefined') {
      return { front: null, back: null, cyc: null };
    }
    const ensureCanvas = (ref: React.MutableRefObject<HTMLCanvasElement | null>) => {
      if (!ref.current) {
        const c = document.createElement('canvas');
        c.width = masterW;
        c.height = masterH;
        ref.current = c;
      } else if (ref.current.width !== masterW || ref.current.height !== masterH) {
        ref.current.width = masterW;
        ref.current.height = masterH;
      }
      return ref.current;
    };

    return {
      front: ensureCanvas(frontBufferRef),
      back: ensureCanvas(backBufferRef),
      cyc: ensureCanvas(cycBufferRef),
    };
  };

  // Helper to draw procedural fallback gradient
  const drawGradientFallback = (
    ctx: CanvasRenderingContext2D,
    key: string,
    w: number,
    h: number
  ) => {
    const gradConfig = getBackgroundGradient(key);
    const grad = ctx.createLinearGradient(
      gradConfig.start.x * w,
      gradConfig.start.y * h,
      gradConfig.end.x * w,
      gradConfig.end.y * h
    );
    gradConfig.colors.forEach((col, idx) => {
      grad.addColorStop(idx / (gradConfig.colors.length - 1), col);
    });

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Scanline retro pattern
    ctx.fillStyle = 'rgba(0,0,0,0.08)';
    for (let y = 0; y < h; y += 4) {
      ctx.fillRect(0, y, w, 1);
    }
  };

  // Helper to load optional parallax depth layers (`far`, `mid`, `fore`) in background
  const loadParallaxLayers = (
    targetKey: string,
    activeOrientation: 'landscape' | 'portrait',
    transitionId: number
  ) => {
    layerBuffersRef.current = { far: null, mid: null, fore: null };
    if (typeof document === 'undefined' || typeof window === 'undefined') return;
    if (tierCaps.parallaxLayers <= 1) return;

    const basePrefix = `${targetKey}_${activeOrientation}`;
    const farAsset = SCENE_ASSET_REGISTRY[`${basePrefix}_far`];
    const midAsset = SCENE_ASSET_REGISTRY[`${basePrefix}_mid`];
    const foreAsset = SCENE_ASSET_REGISTRY[`${basePrefix}_fore`];

    if (!farAsset || !midAsset) return;

    const loadSingleLayer = (asset: any, slot: 'far' | 'mid' | 'fore') => {
      const uri = resolveImageUri(asset);
      if (!uri) return;
      const img = new window.Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        if (transitionId !== activeTransitionIdRef.current) return;
        const c = document.createElement('canvas');
        c.width = masterW;
        c.height = masterH;
        const lCtx = c.getContext('2d');
        if (lCtx) {
          lCtx.imageSmoothingEnabled = false;
          lCtx.drawImage(img, 0, 0, masterW, masterH);
          layerBuffersRef.current[slot] = c;
        }
      };
      img.src = uri;
    };

    loadSingleLayer(farAsset, 'far');
    loadSingleLayer(midAsset, 'mid');
    if (foreAsset && tierCaps.parallaxLayers >= 3) {
      loadSingleLayer(foreAsset, 'fore');
    }
  };

  // Helper to render image or fallback gradient onto a target canvas buffer
  const drawSceneToBuffer = (
    targetCanvas: HTMLCanvasElement,
    targetKey: string,
    activeOrientation: 'landscape' | 'portrait',
    transitionId: number,
    callback: () => void
  ) => {
    const ctx = targetCanvas.getContext('2d');
    if (!ctx) return callback();

    ctx.imageSmoothingEnabled = false;

    const bgSource = resolveSceneSource(targetKey, activeOrientation);
    const uri = bgSource ? resolveImageUri(bgSource) : null;

    if (uri && typeof window !== 'undefined') {
      const img = new window.Image();
      img.crossOrigin = 'anonymous';
      let fired = false;

      const handleSuccess = () => {
        if (fired) return;
        fired = true;
        img.onload = null;
        img.onerror = null;

        if (transitionId !== activeTransitionIdRef.current) return;

        // Aspect-ratio cover fit
        const s = Math.max(
          masterW / (img.naturalWidth || 1),
          masterH / (img.naturalHeight || 1)
        );
        const dw = (img.naturalWidth || masterW) * s;
        const dh = (img.naturalHeight || masterH) * s;
        const dx = Math.round((masterW - dw) / 2);
        const dy = Math.round((masterH - dh) / 2);

        ctx.imageSmoothingEnabled = false;
        ctx.clearRect(0, 0, masterW, masterH);
        ctx.drawImage(img, dx, dy, dw, dh);
        callback();
      };

      const handleError = () => {
        if (fired) return;
        fired = true;
        img.onload = null;
        img.onerror = null;

        if (transitionId !== activeTransitionIdRef.current) return;

        ctx.imageSmoothingEnabled = false;
        drawGradientFallback(ctx, targetKey, masterW, masterH);
        callback();
      };

      img.onload = handleSuccess;
      img.onerror = handleError;
      img.src = uri;

      if (img.complete) {
        if (img.naturalWidth > 0) {
          handleSuccess();
        } else {
          handleError();
        }
      }
    } else {
      ctx.imageSmoothingEnabled = false;
      drawGradientFallback(ctx, targetKey, masterW, masterH);
      callback();
    }
  };

  // Scene transition & active stage loop orchestration
  useEffect(() => {
    const transitionId = ++activeTransitionIdRef.current;

    if (cycleFrameRef.current) {
      cancelAnimationFrame(cycleFrameRef.current);
      cycleFrameRef.current = null;
    }

    const { front, back, cyc } = getBuffers();
    if (!front || !back || !cyc || !canvasRef.current) return;

    const displayCanvas = canvasRef.current;
    const displayCtx = displayCanvas.getContext('2d');
    if (!displayCtx) return;

    displayCtx.imageSmoothingEnabled = false;

    const renderKey = `${imageKey}:${orientation}`;
    const manifestEntry = getSceneManifestEntry(imageKey);
    const sceneFocus = focus ?? manifestEntry?.focus ?? { x: masterW / 2, y: masterH / 2 };
    const isTunnelScene =
      imageKey.includes('metro') ||
      imageKey.includes('tunnel') ||
      imageKey.includes('underpass') ||
      imageKey.includes('archive') ||
      manifestEntry?.atmosphere === 'drip';
    const isStormScene =
      manifestEntry?.atmosphere === 'rain' ||
      imageKey.includes('storm') ||
      imageKey.includes('night');

    const startActiveSceneLoop = () => {
      if (cycleFrameRef.current) {
        cancelAnimationFrame(cycleFrameRef.current);
        cycleFrameRef.current = null;
      }

      loadParallaxLayers(imageKey, orientation, transitionId);

      // Configure atmospheric particles for this scene
      const effectiveParticleCap = liveStatsRef.current.reducedMotion ? 0 : tierCaps.maxParticles;
      particleSysRef.current.configure(
        manifestEntry?.atmosphere,
        effectiveParticleCap,
        masterW,
        masterH
      );

      const nowInit = typeof performance !== 'undefined' ? performance.now() : Date.now();
      cameraRef.current.resetScene(nowInit);

      const fCtx = front.getContext('2d');
      const cycCtx = cyc.getContext('2d');
      let cycler: PaletteCycler | null = null;

      if (tierCaps.paletteCycling && fCtx && cycCtx) {
        try {
          const imgData = fCtx.getImageData(0, 0, masterW, masterH);
          cycler = new PaletteCycler();
          if (manifestEntry?.cycles && manifestEntry.cycles.length > 0) {
            cycler.setCycles(
              manifestEntry.cycles.map((c, i) => ({
                id: `cycle_${i}`,
                startIndex: c.indices[0] ?? 50,
                length: c.indices.length,
                rateHz: 1000 / Math.max(16, c.speedMs),
                mode: 'cycle',
                blend: true,
              }))
            );
          }
          const indexed = cycler.extractIndexMapFromImageData(imgData);
          cycler.attachCanvas(cycCtx, masterW, masterH, indexed);
          paletteCyclerRef.current = cycler;
        } catch {
          cycler = null;
        }
      }

      let lastFrameMs = nowInit;

      const stageLoop = (now: number) => {
        if (transitionId !== activeTransitionIdRef.current) return;
        const dt = Math.max(0.001, (now - lastFrameMs) / 1000);
        lastFrameMs = now;

        // 1. Update palette cycler into `cyc` offscreen buffer (or use `front`)
        let activeBase: HTMLCanvasElement = front;
        if (cycler && cycCtx) {
          cycler.update(now);
          cycler.render(cycCtx);
          activeBase = cyc;
        }

        // 2. Compute camera parallax & Ken Burns focal drift offsets
        const isReduced = liveStatsRef.current.reducedMotion;
        const offsets = cameraRef.current.computeOffsets(now, {
          masterW,
          masterH,
          focus: sceneFocus,
          allowParallax: !isReduced && tierCaps.parallaxLayers > 1,
          allowCameraDrift: !isReduced && tierCaps.tier !== 'low',
          allowSubpixelCamera: !isReduced && tierCaps.subpixelCamera,
          parallaxLayers: isReduced ? 1 : tierCaps.parallaxLayers,
        });

        // 3. Composite parallax depth layers (or shifted base buffer) onto display canvas
        compositeParallaxLayers(
          displayCtx,
          {
            base: activeBase,
            far: layerBuffersRef.current.far,
            mid: layerBuffersRef.current.mid,
            fore: layerBuffersRef.current.fore,
          },
          offsets,
          masterW,
          masterH
        );

        // 4. Update and render grid-snapped atmospheric particles
        if (!isReduced && tierCaps.maxParticles > 0) {
          particleSysRef.current.update(dt);
          particleSysRef.current.render(displayCtx, offsets.foreX * 0.5, offsets.foreY * 0.5);
        }

        // 5. Decay damage pulse & render lighting, corruption veins, and stat feedback overlays
        if (damagePulseRef.current > 0) {
          damagePulseRef.current = Math.max(0, damagePulseRef.current - dt * 1.8);
        }

        renderStageOverlays(displayCtx, {
          width: masterW,
          height: masterH,
          corruption: liveStatsRef.current.corruption,
          health: liveStatsRef.current.health,
          maxHealth: liveStatsRef.current.maxHealth,
          hunger: liveStatsRef.current.hunger,
          thirst: liveStatsRef.current.thirst,
          damagePulseAlpha: damagePulseRef.current,
          isTunnelScene,
          isStormScene,
          isHallucination: liveStatsRef.current.isHallucination,
          nowMs: now,
        });

        cycleFrameRef.current = requestAnimationFrame(stageLoop);
      };

      cycleFrameRef.current = requestAnimationFrame(stageLoop);
    };

    // Detect buffer dimension changes (e.g. orientation changes between landscape and portrait)
    const dimensionsChanged =
      !lastDimensionsRef.current ||
      lastDimensionsRef.current.w !== masterW ||
      lastDimensionsRef.current.h !== masterH;

    lastDimensionsRef.current = { w: masterW, h: masterH };

    if (dimensionsChanged || currentRenderKeyRef.current === null) {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = null;
      }
      currentRenderKeyRef.current = renderKey;
      drawSceneToBuffer(front, imageKey, orientation, transitionId, () => {
        if (transitionId !== activeTransitionIdRef.current) return;
        displayCtx.imageSmoothingEnabled = false;
        displayCtx.clearRect(0, 0, masterW, masterH);
        displayCtx.drawImage(front, 0, 0);
        startActiveSceneLoop();
      });
      return;
    }

    if (currentRenderKeyRef.current === renderKey) {
      startActiveSceneLoop();
      return;
    }

    currentRenderKeyRef.current = renderKey;

    // Choose effective transition mode (auto-escalate to glitch-tear at high corruption)
    const effectiveTransition: PixelTransitionMode = liveStatsRef.current.reducedMotion
      ? 'fade'
      : liveStatsRef.current.corruption >= 70 && transition === 'dither-dissolve'
      ? 'glitch-tear'
      : transition;

    // Load next scene into back buffer while front buffer remains displayed
    drawSceneToBuffer(back, imageKey, orientation, transitionId, () => {
      if (transitionId !== activeTransitionIdRef.current) return;

      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);

      const startTime = performance.now();
      const duration = Math.max(16, fadeDuration);

      const step = (now: number) => {
        if (transitionId !== activeTransitionIdRef.current) return;

        const elapsed = now - startTime;
        const t = Math.min(1, elapsed / duration);

        renderPixelTransition(
          displayCtx,
          front,
          back,
          masterW,
          masterH,
          t,
          effectiveTransition
        );

        if (t < 1) {
          animFrameRef.current = requestAnimationFrame(step);
        } else {
          // Transition complete: blit back to front buffer
          const fCtx = front.getContext('2d');
          if (fCtx) {
            fCtx.imageSmoothingEnabled = false;
            fCtx.clearRect(0, 0, masterW, masterH);
            fCtx.drawImage(back, 0, 0);
          }
          animFrameRef.current = null;
          startActiveSceneLoop();
        }
      };

      animFrameRef.current = requestAnimationFrame(step);
    });

    return () => {
      activeTransitionIdRef.current++;
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = null;
      }
      if (cycleFrameRef.current) {
        cancelAnimationFrame(cycleFrameRef.current);
        cycleFrameRef.current = null;
      }
    };
  }, [
    imageKey,
    sceneKey,
    orientation,
    fadeDuration,
    masterW,
    masterH,
    tierCaps.paletteCycling,
    tierCaps.maxParticles,
    tierCaps.parallaxLayers,
    tierCaps.subpixelCamera,
    tierCaps.tier,
    transition,
  ]);

  const overlayColors = [
    `rgba(4,2,10,0.15)`,
    `rgba(4,2,10,0.45)`,
    `rgba(4,2,10,${overlayOpacity})`,
    `rgba(4,2,10,0.96)`,
  ];

  return (
    <View style={[styles.container, style]}>
      {/* Centered Pixel-Art Canvas */}
      <View
        style={[
          styles.canvasWrapper,
          {
            width: displayWidth,
            height: displayHeight,
            left: offsetX,
            top: offsetY,
          },
        ]}
      >
        {React.createElement('canvas', {
          ref: canvasRef,
          width: masterW,
          height: masterH,
          style: {
            width: '100%',
            height: '100%',
            imageRendering: 'pixelated',
          },
        })}

        {/* Readability Overlay Gradient */}
        <LinearGradient
          colors={overlayColors as [string, string, ...string[]]}
          style={StyleSheet.absoluteFill}
          pointerEvents="none"
        />
      </View>

      {/* Ultrawide Decorative Pillarboxes */}
      {isUltrawide && (
        <>
          <PillarboxFrame side="left" width={pillarboxWidth} />
          <PillarboxFrame side="right" width={pillarboxWidth} />
        </>
      )}

      {/* Persistent Children (Prose, Choices, HUD) — always above pillarboxes and bounded to active stage */}
      <View
        style={[
          StyleSheet.absoluteFill,
          { zIndex: 5 },
          isUltrawide && pillarboxWidth > 0
            ? { left: pillarboxWidth, right: pillarboxWidth }
            : null,
        ]}
        pointerEvents="box-none"
      >
        {children}
      </View>
    </View>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Ultrawide Decorative Frame Component
// ─────────────────────────────────────────────────────────────────────────────

function PillarboxFrame({ side, width }: { side: 'left' | 'right'; width: number }) {
  if (width <= 0) return null;
  return (
    <View
      style={[
        styles.pillarbox,
        side === 'left' ? { left: 0 } : { right: 0 },
        { width },
      ]}
      pointerEvents="none"
    >
      <LinearGradient
        colors={['#0a0814', '#04020a', '#020106']}
        start={{ x: side === 'left' ? 1 : 0, y: 0 }}
        end={{ x: side === 'left' ? 0 : 1, y: 0 }}
        style={StyleSheet.absoluteFill}
      />
      <View
        style={[
          styles.pillarboxBorder,
          side === 'left' ? { right: 0, borderRightWidth: 2 } : { left: 0, borderLeftWidth: 2 },
        ]}
      />
    </View>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Native Mobile Fallback (Dual Cross-Fading Layers)
// ─────────────────────────────────────────────────────────────────────────────

function NativePixelStage({
  imageKey,
  overlayOpacity = 0.72,
  fadeDuration = 350,
  style,
  children,
}: PixelStageProps) {
  const { orientation } = useIntegerScale();
  const [currentKey, setCurrentKey] = useState(imageKey);
  const [prevKey, setPrevKey] = useState<string | null>(null);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (imageKey === currentKey) return;

    setPrevKey(currentKey);
    setCurrentKey(imageKey);
    fadeAnim.setValue(0);

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: fadeDuration,
      useNativeDriver: true,
    }).start(() => {
      setPrevKey(null);
    });
  }, [imageKey, fadeDuration, currentKey]);

  const overlayColors = [
    `rgba(4,2,10,0.15)`,
    `rgba(4,2,10,0.45)`,
    `rgba(4,2,10,${overlayOpacity})`,
    `rgba(4,2,10,0.96)`,
  ];

  const renderLayer = (key: string, opacity: any) => {
    const bgImage = resolveSceneSource(key, orientation);
    const gradient = getBackgroundGradient(key);

    return (
      <Animated.View style={[StyleSheet.absoluteFill, { opacity }]}>
        {bgImage ? (
          <ImageBackground source={bgImage} style={styles.fill} resizeMode="cover">
            <LinearGradient colors={overlayColors as [string, string, ...string[]]} style={StyleSheet.absoluteFill} />
          </ImageBackground>
        ) : (
          <LinearGradient
            colors={gradient.colors as [string, string, ...string[]]}
            start={gradient.start}
            end={gradient.end}
            style={styles.fill}
          >
            <LinearGradient colors={overlayColors as [string, string, ...string[]]} style={StyleSheet.absoluteFill} />
          </LinearGradient>
        )}
      </Animated.View>
    );
  };

  return (
    <View style={[styles.container, style]}>
      {prevKey && renderLayer(prevKey, fadeAnim.interpolate({ inputRange: [0, 1], outputRange: [1, 0] }))}
      {renderLayer(currentKey, fadeAnim)}
      <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
        {children}
      </View>
    </View>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Styles
// ─────────────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
    backgroundColor: '#04020a',
  },
  fill: {
    flex: 1,
  },
  canvasWrapper: {
    position: 'absolute',
    overflow: 'hidden',
  },
  pillarbox: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    zIndex: 2,
  },
  pillarboxBorder: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 2,
    borderColor: 'rgba(155,89,182,0.25)',
  },
});
