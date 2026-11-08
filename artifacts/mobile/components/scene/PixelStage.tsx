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

  const currentImageKeyRef = useRef<string | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // Helper to lazily instantiate offscreen canvases
  const getBuffers = () => {
    if (!frontBufferRef.current && typeof document !== 'undefined') {
      const f = document.createElement('canvas');
      f.width = masterW;
      f.height = masterH;
      frontBufferRef.current = f;
    }
    if (!backBufferRef.current && typeof document !== 'undefined') {
      const b = document.createElement('canvas');
      b.width = masterW;
      b.height = masterH;
      backBufferRef.current = b;
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
    callback: () => void
  ) => {
    const ctx = targetCanvas.getContext('2d');
    if (!ctx) return callback();

    ctx.imageSmoothingEnabled = false;

    const bgSource = getBackgroundImage(targetKey);
    const uri = bgSource ? resolveImageUri(bgSource) : null;

    if (uri && typeof window !== 'undefined') {
      const img = new window.Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        // Aspect-ratio cover fit
        const s = Math.max(masterW / img.naturalWidth, masterH / img.naturalHeight);
        const dw = img.naturalWidth * s;
        const dh = img.naturalHeight * s;
        const dx = Math.round((masterW - dw) / 2);
        const dy = Math.round((masterH - dh) / 2);

        ctx.clearRect(0, 0, masterW, masterH);
        ctx.drawImage(img, dx, dy, dw, dh);
        callback();
      };
      img.onerror = () => {
        // Fallback to gradient if image fails to load
        drawGradientFallback(ctx, targetKey, masterW, masterH);
        callback();
      };
      img.src = uri;
      if (img.complete) {
        img.onload?.(new Event('load'));
      }
    } else {
      drawGradientFallback(ctx, targetKey, masterW, masterH);
      callback();
    }
  };

  // Scene transition orchestration
  useEffect(() => {
    const { front, back } = getBuffers();
    if (!front || !back || !canvasRef.current) return;

    const displayCanvas = canvasRef.current;
    const displayCtx = displayCanvas.getContext('2d');
    if (!displayCtx) return;

    displayCtx.imageSmoothingEnabled = false;

    // First mount initialization
    if (currentImageKeyRef.current === null) {
      currentImageKeyRef.current = imageKey;
      drawSceneToBuffer(front, imageKey, () => {
        displayCtx.clearRect(0, 0, masterW, masterH);
        displayCtx.drawImage(front, 0, 0);
      });
      return;
    }

    // If image hasn't changed, retain current display
    if (currentImageKeyRef.current === imageKey) {
      return;
    }

    currentImageKeyRef.current = imageKey;

    // Load next scene into back buffer while front buffer remains displayed
    drawSceneToBuffer(back, imageKey, () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);

      const startTime = performance.now();
      const duration = Math.max(16, fadeDuration);

      const step = (now: number) => {
        const elapsed = now - startTime;
        const t = Math.min(1, elapsed / duration);

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
            fCtx.clearRect(0, 0, masterW, masterH);
            fCtx.drawImage(back, 0, 0);
          }
        }
      };

      animFrameRef.current = requestAnimationFrame(step);
    });

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [imageKey, sceneKey, fadeDuration, masterW, masterH]);

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
    const bgImage = getBackgroundImage(key);
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
