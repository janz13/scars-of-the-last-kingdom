/**
 * BackgroundPanel — reusable full-screen scene background for story nodes.
 *
 * IMAGE PATH REGISTRY:
 *   All background images are declared in constants/images.ts via BACKGROUND_IMAGES.
 *   Each key must match the `imageKey` field on a StoryNode.
 *   Images live at:  artifacts/mobile/assets/images/<key>.png
 *   They are loaded via require() at build time — Metro bundles them for both
 *   native (iOS/Android) and web. If a key is absent from BACKGROUND_IMAGES,
 *   getBackgroundImage() returns null and the gradient fallback is used instead.
 *
 * ADDING A NEW BACKGROUND:
 *   1. Drop the PNG into artifacts/mobile/assets/images/
 *   2. Add the require() entry to BACKGROUND_IMAGES in constants/images.ts
 *   3. Set imageKey on the StoryNode to the matching key string
 *   4. (Optional) Add a matching gradient to BACKGROUND_GRADIENTS for the flash
 *      frame before the image loads.
 *
 * PIXEL-ART RENDERING:
 *   On web, CSS `image-rendering: pixelated` is applied so pixel art stays crisp
 *   when the image is scaled up. React Native (native) already renders bitmaps at
 *   device pixel ratio — no extra work needed.
 *
 * FADE TRANSITION:
 *   The component fades to black between node changes, then fades back in with the
 *   new background. Pass the current nodeId as `sceneKey` to trigger the transition.
 */

import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  ImageBackground,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { getBackgroundGradient, getBackgroundImage } from '../constants/images';
import type { GradientConfig } from '../constants/images';

// ─── Types ────────────────────────────────────────────────────────────────────

interface BackgroundPanelProps {
  /** imageKey value from the current StoryNode — drives image lookup & transitions */
  imageKey: string;
  /** Unique key for the current scene (usually nodeId). Changing this triggers a fade. */
  sceneKey: string;
  /** Opacity of the dark overlay placed over the background (0–1, default 0.72) */
  overlayOpacity?: number;
  /** Duration in ms for the fade-in after a scene change (default 350) */
  fadeDuration?: number;
  /** Children rendered above the background and overlay */
  children?: React.ReactNode;
}

// ─── Pixel-art style for web ──────────────────────────────────────────────────
// React Native's StyleSheet doesn't know about `imageRendering`, but on web
// Expo renders style props directly as CSS. We cast through `any` to avoid the
// TS error while keeping the effect only on web.
const pixelArtStyle: any =
  Platform.OS === 'web'
    ? { imageRendering: 'pixelated' }
    : {};

// ─── Component ────────────────────────────────────────────────────────────────

export default function BackgroundPanel({
  imageKey,
  sceneKey,
  overlayOpacity = 0.72,
  fadeDuration = 350,
  children,
}: BackgroundPanelProps) {
  const bgImage = getBackgroundImage(imageKey);
  const gradient: GradientConfig = getBackgroundGradient(imageKey);

  // Track the *previous* scene so we can keep it visible during the fade-out
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const prevSceneKey = useRef(sceneKey);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (sceneKey === prevSceneKey.current) return;
    prevSceneKey.current = sceneKey;

    // Fade out → swap background → fade in
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: fadeDuration * 0.4,
      useNativeDriver: true,
    }).start(() => {
      setVisible(false); // force re-mount of children so new image loads
      requestAnimationFrame(() => {
        setVisible(true);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: fadeDuration,
          useNativeDriver: true,
        }).start();
      });
    });
  }, [sceneKey, fadeDuration]);

  const overlayColors = [
    `rgba(4,2,10,0.15)`,
    `rgba(4,2,10,0.45)`,
    `rgba(4,2,10,${overlayOpacity})`,
    `rgba(4,2,10,0.96)`,
  ];

  const inner = visible ? (
    <Animated.View style={[styles.fill, { opacity: fadeAnim }]}>
      {bgImage ? (
        // ── Real pixel-art image ────────────────────────────────────────────
        <ImageBackground
          source={bgImage}
          style={[styles.fill, pixelArtStyle]}
          resizeMode="cover"
          // Keeps pixel art sharp on web by disabling browser smoothing
          // @ts-ignore — web-only prop, safe to ignore on native
          imageStyle={pixelArtStyle}
        >
          {/* Dark gradient overlay so text stays readable at any brightness */}
          <LinearGradient colors={overlayColors as [string, string, ...string[]]} style={StyleSheet.absoluteFill} />
          {children}
        </ImageBackground>
      ) : (
        // ── Fallback: styled gradient placeholder ──────────────────────────
        <FallbackBackground gradient={gradient} overlayColors={overlayColors}>
          {children}
        </FallbackBackground>
      )}
    </Animated.View>
  ) : (
    // Transition gap — solid black flash between scenes (very brief)
    <View style={[styles.fill, styles.transitionBlack]} />
  );

  return <View style={styles.fill}>{inner}</View>;
}

// ─── Fallback background ─────────────────────────────────────────────────────

interface FallbackProps {
  gradient: GradientConfig;
  overlayColors: string[];
  children?: React.ReactNode;
}

function FallbackBackground({ gradient, overlayColors, children }: FallbackProps) {
  return (
    <LinearGradient
      colors={gradient.colors as [string, string, ...string[]]}
      start={gradient.start}
      end={gradient.end}
      style={styles.fill}
    >
      {/* Decorative pixel-art grid lines to give fallback a retro feel */}
      <FallbackDecoration />
      {/* Darken the gradient so it matches the image overlay look */}
      <LinearGradient colors={overlayColors as [string, string, ...string[]]} style={StyleSheet.absoluteFill} />
      {children}
    </LinearGradient>
  );
}

// Draws faint scanlines / grid for a retro pixel-art feel on fallback screens
function FallbackDecoration() {
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {/* Horizontal scanlines */}
      {Array.from({ length: 20 }).map((_, i) => (
        <View
          key={i}
          style={[
            styles.scanline,
            { top: `${(i / 20) * 100}%` as any },
          ]}
        />
      ))}
      {/* Corner pixel-art frame brackets */}
      <View style={[styles.corner, styles.cornerTL]} />
      <View style={[styles.corner, styles.cornerTR]} />
      <View style={[styles.corner, styles.cornerBL]} />
      <View style={[styles.corner, styles.cornerBR]} />
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const CORNER = 24;
const CORNER_THICKNESS = 2;
const CORNER_COLOR = 'rgba(155,89,182,0.18)';

const styles = StyleSheet.create({
  fill: { flex: 1 },
  transitionBlack: { backgroundColor: '#04020a' },

  // Scanlines for fallback decoration
  scanline: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.08)',
  },

  // Pixel-art frame corner brackets
  corner: {
    position: 'absolute',
    width: CORNER,
    height: CORNER,
  },
  cornerTL: {
    top: 12,
    left: 12,
    borderTopWidth: CORNER_THICKNESS,
    borderLeftWidth: CORNER_THICKNESS,
    borderColor: CORNER_COLOR,
  },
  cornerTR: {
    top: 12,
    right: 12,
    borderTopWidth: CORNER_THICKNESS,
    borderRightWidth: CORNER_THICKNESS,
    borderColor: CORNER_COLOR,
  },
  cornerBL: {
    bottom: 12,
    left: 12,
    borderBottomWidth: CORNER_THICKNESS,
    borderLeftWidth: CORNER_THICKNESS,
    borderColor: CORNER_COLOR,
  },
  cornerBR: {
    bottom: 12,
    right: 12,
    borderBottomWidth: CORNER_THICKNESS,
    borderRightWidth: CORNER_THICKNESS,
    borderColor: CORNER_COLOR,
  },
});
