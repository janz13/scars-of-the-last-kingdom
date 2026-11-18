/**
 * CharacterPortrait — 128×128 Pixel-Art Portrait Component (16×16 Grid × 8× Integer Scale)
 *
 * Implements Phase B5 & D4:
 * - Renders any of the 13 characters × 3 expressions (`neutral`, `strained`, `resolved`).
 * - Slide-in entrance animation using Reanimated 4 stepped pixel easing.
 * - Automatic idle blink every 3–6 seconds.
 * - Mouth-flap synchronization while dialogue typewriter is streaming (`isTalking`).
 */

import React, { useEffect, useState } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import Animated, {
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {
  buildPortraitPixelGrid,
  CHARACTER_PORTRAIT_CATALOG,
  type CharacterId,
  type PortraitExpression,
} from '../../constants/portraits';
import { MOTION_EASINGS, MOTION_SPRINGS } from '../../constants/motion';

export interface CharacterPortraitProps {
  characterId: CharacterId;
  expression?: PortraitExpression;
  isTalking?: boolean;
  size?: number;
  reducedMotion?: boolean;
}

export default function CharacterPortrait({
  characterId,
  expression = 'neutral',
  isTalking = false,
  size = 64,
  reducedMotion = false,
}: CharacterPortraitProps) {
  const [isBlinking, setIsBlinking] = useState(false);
  const [isMouthOpen, setIsMouthOpen] = useState(false);

  const slideX = useSharedValue(reducedMotion ? 0 : -16);
  const idleY = useSharedValue(0);
  const opacity = useSharedValue(reducedMotion ? 1 : 0);

  // Stepped retro 1-pixel idle breathing cycle (2400ms period)
  useEffect(() => {
    if (reducedMotion) {
      idleY.value = 0;
      return;
    }
    idleY.value = withRepeat(
      withSequence(
        withTiming(-1, { duration: 1100, easing: MOTION_EASINGS.step4 }),
        withTiming(0, { duration: 1300, easing: MOTION_EASINGS.step4 })
      ),
      -1,
      true
    );
    return () => {
      cancelAnimation(idleY);
    };
  }, [reducedMotion]);

  // Slide-in entrance when speaker changes
  useEffect(() => {
    if (reducedMotion) {
      slideX.value = 0;
      opacity.value = 1;
      return;
    }
    slideX.value = -16;
    opacity.value = 0;
    slideX.value = withSpring(0, MOTION_SPRINGS.snappy);
    opacity.value = withTiming(1, { duration: 220, easing: MOTION_EASINGS.step6 });
  }, [characterId, expression, reducedMotion]);

  // Idle blink every 3–6 seconds
  useEffect(() => {
    if (reducedMotion) {
      setIsBlinking(false);
      return;
    }
    let blinkTimeout: ReturnType<typeof setTimeout> | null = null;
    let openTimeout: ReturnType<typeof setTimeout> | null = null;
    let active = true;

    const scheduleNextBlink = () => {
      const delay = 3000 + Math.floor(Math.random() * 3000);
      blinkTimeout = setTimeout(() => {
        if (!active) return;
        setIsBlinking(true);
        openTimeout = setTimeout(() => {
          if (!active) return;
          setIsBlinking(false);
          scheduleNextBlink();
        }, 140);
      }, delay);
    };

    scheduleNextBlink();
    return () => {
      active = false;
      if (blinkTimeout) clearTimeout(blinkTimeout);
      if (openTimeout) clearTimeout(openTimeout);
    };
  }, [characterId, reducedMotion]);

  // Mouth flap sync while typewriter is streaming dialogue
  useEffect(() => {
    if (!isTalking || reducedMotion) {
      setIsMouthOpen(false);
      return;
    }
    const interval = setInterval(() => {
      setIsMouthOpen((prev) => !prev);
    }, 135);
    return () => clearInterval(interval);
  }, [isTalking, reducedMotion]);

  const animStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      { translateX: Math.round(slideX.value) },
      { translateY: Math.round(idleY.value) },
    ],
  }));

  const meta = CHARACTER_PORTRAIT_CATALOG[characterId] ?? CHARACTER_PORTRAIT_CATALOG.mira;
  const grid = buildPortraitPixelGrid(characterId, expression, isBlinking, isMouthOpen);
  const cellSize = Math.max(2, Math.floor(size / 16));
  const actualSize = cellSize * 16;

  return (
    <Animated.View
      style={[
        styles.container,
        { width: actualSize, height: actualSize, borderColor: meta.factionColor },
        animStyle,
      ]}
      accessibilityLabel={`${meta.displayName} portrait (${expression})`}
    >
      {/* Speaking Active Audio Pulse Dot */}
      {isTalking && !reducedMotion && (
        <View
          style={[
            styles.speakingBadge,
            {
              backgroundColor: meta.accentColor,
              width: cellSize * 2,
              height: cellSize * 2,
              top: cellSize,
              right: cellSize,
            },
          ]}
        />
      )}
      {grid.map((row, rIdx) => (
        <View key={rIdx} style={[styles.row, { height: cellSize }]}>
          {row.map((color, cIdx) => (
            <View
              key={cIdx}
              style={{
                width: cellSize,
                height: cellSize,
                backgroundColor: color,
              }}
            />
          ))}
        </View>
      ))}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 2,
    overflow: 'hidden',
    backgroundColor: '#080612',
    flexShrink: 0,
    position: 'relative',
  },
  speakingBadge: {
    position: 'absolute',
    borderRadius: 1,
    zIndex: 10,
    opacity: 0.9,
  },
  row: {
    flexDirection: 'row',
  },
});
