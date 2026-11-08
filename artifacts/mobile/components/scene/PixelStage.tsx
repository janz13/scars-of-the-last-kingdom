/**
 * PixelStage — Native-Resolution Double-Buffered Pixel-Art Stage
 *
 * Provides:
 * 1. Double-buffered canvas compositing at 720×400 / 400×760 native art resolution.
 * 2. Zero-black-flash cross-fading (front buffer stays visible until back buffer is ready).
 * 3. CSS integer upscaling via `image-rendering: pixelated`.
 * 4. Ultrawide decorative pillarbox frame rendering (aspect > 1.9).
 * 5. Native iOS/Android fallback using dual-layer cross-fading Image components.
 * 6. Persistent child rendering (no unmounting on scene change).
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
  type GradientConfig,
} from '../../constants/images';
import { resolveImageUri } from '../../hooks/useChoiceImagePreloader';
import {
  getSceneManifestEntry,
  resolveSceneAsset,
  SCENE_MANIFEST,
} from '../../constants/sceneManifest';

export interface PixelStageProps {
  /** imageKey from current StoryNode */
  imageKey: string;
  /** Unique key for the scene (usually currentNode.id) */
  sceneKey: string;
  /** Overlay darkness opacity (0–1, default: 0.72) */
  overlayOpacity?: number;
  /** Cross-fade duration in ms (default: 350) */
  fadeDuration?: number;
  /** Optional focus coordinates in art-pixels */
  focus?: { x: number; y: number };
  /** Transition mode */
  transition?: 'fade' | 'dither-dissolve' | 'instant';
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
 * 1. Checks SCENE_MANIFEST and resolves orientation variant via resolveSceneAsset.
 * 2. If not found in manifest, falls back to legacy getBackgroundImage(key).
 * 3. If still not found, falls back to ruined_metro_station orientation variant.
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
// Web HTML5 Canvas Implementation (Double-Buffered)
// ─────────────────────────────────────────────────────────────────────────────

function WebPixelStage({
  imageKey,
  sceneKey,
  overlayOpacity = 0.72,
  fadeDuration = 350,
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

  const currentRenderKeyRef = useRef<string | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const activeTransitionIdRef = useRef<number>(0);
  const lastDimensionsRef = useRef<{ w: number; h: number } | null>(null);

  // Helper to lazily instantiate and dimension-sync offscreen canvases
  const getBuffers = () => {
    if (typeof document === 'undefined') {
      return { front: null, back: null };
    }
    if (!frontBufferRef.current) {
      const f = document.createElement('canvas');
      f.width = masterW;
      f.height = masterH;
      frontBufferRef.current = f;
    } else if (
      frontBufferRef.current.width !== masterW ||
      frontBufferRef.current.height !== masterH
    ) {
      frontBufferRef.current.width = masterW;
      frontBufferRef.current.height = masterH;
    }

    if (!backBufferRef.current) {
      const b = document.createElement('canvas');
      b.width = masterW;
      b.height = masterH;
      backBufferRef.current = b;
    } else if (
      backBufferRef.current.width !== masterW ||
      backBufferRef.current.height !== masterH
    ) {
      backBufferRef.current.width = masterW;
      backBufferRef.current.height = masterH;
    }

    return { front: frontBufferRef.current, back: backBufferRef.current };
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

  // Scene transition orchestration
  useEffect(() => {
    const transitionId = ++activeTransitionIdRef.current;

    const { front, back } = getBuffers();
    if (!front || !back || !canvasRef.current) return;

    const displayCanvas = canvasRef.current;
    const displayCtx = displayCanvas.getContext('2d');
    if (!displayCtx) return;

    displayCtx.imageSmoothingEnabled = false;

    const renderKey = `${imageKey}:${orientation}`;

    // Detect buffer dimension changes (e.g. orientation changes between landscape and portrait)
    const dimensionsChanged =
      !lastDimensionsRef.current ||
      lastDimensionsRef.current.w !== masterW ||
      lastDimensionsRef.current.h !== masterH;

    lastDimensionsRef.current = { w: masterW, h: masterH };

    // On orientation or dimension change, cancel any active animation, immediately draw
    // the current scene to the resized front buffer, and blit to the display canvas.
    if (dimensionsChanged) {
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
      });
      return;
    }

    // First mount initialization
    if (currentRenderKeyRef.current === null) {
      currentRenderKeyRef.current = renderKey;
      drawSceneToBuffer(front, imageKey, orientation, transitionId, () => {
        if (transitionId !== activeTransitionIdRef.current) return;
        displayCtx.imageSmoothingEnabled = false;
        displayCtx.clearRect(0, 0, masterW, masterH);
        displayCtx.drawImage(front, 0, 0);
      });
      return;
    }

    // If image hasn't changed and dimensions haven't changed, retain current display
    if (currentRenderKeyRef.current === renderKey) {
      return;
    }

    currentRenderKeyRef.current = renderKey;

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

        displayCtx.imageSmoothingEnabled = false;
        displayCtx.clearRect(0, 0, masterW, masterH);
        displayCtx.globalAlpha = 1.0;
        displayCtx.drawImage(front, 0, 0);
        displayCtx.globalAlpha = t;
        displayCtx.drawImage(back, 0, 0);
        displayCtx.globalAlpha = 1.0;

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
    };
  }, [imageKey, sceneKey, orientation, fadeDuration, masterW, masterH]);

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

      {/* Persistent Children (Prose, Choices, HUD) */}
      <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
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
