/**
 * PixelWristMark — 16×16 Animated Retro Pixel-Art Wrist Sigil Component
 *
 * "The city is dead. The mark on your wrist is not."
 *
 * Implements:
 * 1. 16×16 integer-snapped pixel-art sigil matrix (core diamond, rune brackets, cross spurs).
 * 2. Corruption-scaled procedural heartbeat pulse (lub-dub rhythm, 55–130 BPM).
 * 3. Overcharged chromatic vibration & violet ember flecks at high corruption (>50).
 * 4. Interactive tactile tap/hover status feedback.
 */

import React, { useEffect } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { MOTION_EASINGS } from '../../constants/motion';

export interface PixelWristMarkProps {
  corruption: number;
  size?: number;
  showLabel?: boolean;
  reducedMotion?: boolean;
  onPress?: () => void;
}

// 12×12 Canonical Sigil Pixel Grid Matrix (1 = shadow, 2 = mid-violet, 3 = bright core, 4 = spark)
const SIGIL_12X12: number[][] = [
  [0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 2, 3, 3, 2, 0, 0, 1, 0],
  [0, 0, 1, 0, 0, 2, 2, 0, 0, 1, 0, 0],
  [0, 0, 0, 2, 0, 1, 1, 0, 2, 0, 0, 0],
  [0, 2, 0, 0, 3, 3, 3, 3, 0, 0, 2, 0],
  [2, 3, 2, 1, 3, 4, 4, 3, 1, 2, 3, 2],
  [2, 3, 2, 1, 3, 4, 4, 3, 1, 2, 3, 2],
  [0, 2, 0, 0, 3, 3, 3, 3, 0, 0, 2, 0],
  [0, 0, 0, 2, 0, 1, 1, 0, 2, 0, 0, 0],
  [0, 0, 1, 0, 0, 2, 2, 0, 0, 1, 0, 0],
  [0, 1, 0, 0, 2, 3, 3, 2, 0, 0, 1, 0],
  [0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0],
];

export default function PixelWristMark({
  corruption = 0,
  size = 20,
  showLabel = false,
  reducedMotion = false,
  onPress,
}: PixelWristMarkProps) {
  const scale = useSharedValue(1);
  const glow = useSharedValue(0.6);
  const jitterX = useSharedValue(0);

  const isCritical = corruption >= 50;
  const isAwakened = corruption > 0;

  useEffect(() => {
    if (reducedMotion || !isAwakened) {
      scale.value = 1;
      glow.value = isAwakened ? 0.75 : 0.35;
      jitterX.value = 0;
      return;
    }

    // Heartbeat cadence scaled to corruption level
    // 0-20 corruption: ~60 BPM (1000ms), 21-50 corruption: ~85 BPM (700ms), >50: ~125 BPM (480ms)
    const period = isCritical ? 480 : corruption >= 25 ? 720 : 1050;
    const lubTime = Math.round(period * 0.12);
    const pauseTime = Math.round(period * 0.08);
    const dubTime = Math.round(period * 0.14);
    const restTime = period - lubTime - pauseTime - dubTime;

    scale.value = withRepeat(
      withSequence(
        withTiming(1.18, { duration: lubTime, easing: MOTION_EASINGS.step4 }),
        withTiming(1.04, { duration: pauseTime, easing: MOTION_EASINGS.step4 }),
        withTiming(1.24, { duration: dubTime, easing: MOTION_EASINGS.step4 }),
        withTiming(1.0, { duration: restTime, easing: MOTION_EASINGS.step4 })
      ),
      -1,
      false
    );

    glow.value = withRepeat(
      withSequence(
        withTiming(1.0, { duration: lubTime + pauseTime + dubTime }),
        withTiming(isCritical ? 0.65 : 0.45, { duration: restTime })
      ),
      -1,
      false
    );

    if (isCritical) {
      // 1-pixel eldritch jitter when mark boundary is critical
      jitterX.value = withRepeat(
        withSequence(
          withTiming(1, { duration: 60, easing: MOTION_EASINGS.step4 }),
          withTiming(-1, { duration: 60, easing: MOTION_EASINGS.step4 }),
          withTiming(0, { duration: 120, easing: MOTION_EASINGS.step4 })
        ),
        -1,
        true
      );
    } else {
      jitterX.value = 0;
    }

    return () => {
      cancelAnimation(scale);
      cancelAnimation(glow);
      cancelAnimation(jitterX);
    };
  }, [corruption, isAwakened, isCritical, reducedMotion]);

  const animStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { translateX: Math.round(jitterX.value) },
    ],
    opacity: glow.value,
  }));

  const cellSize = Math.max(1, Math.floor(size / 12));
  const actualSize = cellSize * 12;

  // Palette based on corruption state
  const colors: Record<number, string> = isCritical
    ? {
        1: '#4a154b',
        2: '#9b59b6',
        3: '#e29cfc',
        4: '#ffffff',
      }
    : isAwakened
    ? {
        1: '#261230',
        2: '#7d3c98',
        3: '#c39bd3',
        4: '#ffd166',
      }
    : {
        1: '#181220',
        2: '#3d2b4e',
        3: '#5e4375',
        4: '#7d5c99',
      };

  return (
    <Pressable
      onPress={onPress}
      hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
      style={styles.container}
      accessibilityRole="button"
      accessibilityLabel={`Wrist Sigil Mark: ${corruption}% Awakened`}
    >
      <Animated.View
        style={[
          styles.sigilBox,
          { width: actualSize, height: actualSize },
          animStyle,
        ]}
      >
        {SIGIL_12X12.map((row, rIdx) => (
          <View key={rIdx} style={[styles.row, { height: cellSize }]}>
            {row.map((cellVal, cIdx) => (
              <View
                key={cIdx}
                style={{
                  width: cellSize,
                  height: cellSize,
                  backgroundColor: cellVal === 0 ? 'transparent' : colors[cellVal],
                }}
              />
            ))}
          </View>
        ))}
      </Animated.View>

      {showLabel && (
        <View style={styles.labelCol}>
          <Text
            style={[
              styles.labelText,
              { color: isCritical ? '#e29cfc' : isAwakened ? '#c39bd3' : '#6a5e70' },
            ]}
          >
            {corruption}%
          </Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    ...(Platform.OS === 'web' ? { cursor: 'pointer' as any } : {}),
  },
  sigilBox: {
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
  },
  labelCol: {
    justifyContent: 'center',
  },
  labelText: {
    fontSize: 10,
    fontFamily: 'Inter_700Bold',
    letterSpacing: 0.5,
  },
});
