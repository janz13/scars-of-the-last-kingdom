import React, { useEffect, useRef, useState } from 'react';
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { sound } from '../../logic/audioEngine';

export interface MarkAwakeningOverlayProps {
  chapter: 'ch1' | 'ch9';
  onDismiss: () => void;
  reducedMotion?: boolean;
}

// 24×24 Pixel Art Sigil Coordinate Map
// Center at (11.5, 11.5)
interface GlyphPixel {
  x: number;
  y: number;
  dist: number;
}

function generateSigilPixels(): GlyphPixel[] {
  const pixels: GlyphPixel[] = [];
  const size = 24;
  const cx = 11.5;
  const cy = 11.5;

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const dx = Math.abs(x - cx);
      const dy = Math.abs(y - cy);
      const d = Math.sqrt(dx * dx + dy * dy);

      // Core diamond
      const inCore = dx + dy <= 3;
      // Inner ring diamond
      const inInnerRing = Math.abs(dx + dy - 6) <= 0.6;
      // Cross axes
      const inCross = (dx <= 0.6 && dy <= 9) || (dy <= 0.6 && dx <= 9);
      // Outer rune brackets
      const inBrackets = (dx >= 7 && dx <= 9 && dy >= 7 && dy <= 9);
      // Diagonal spurs
      const inDiagonals = Math.abs(dx - dy) <= 0.5 && d >= 4 && d <= 9;

      if (inCore || inInnerRing || inCross || inBrackets || inDiagonals) {
        pixels.push({ x, y, dist: d });
      }
    }
  }

  // Sort pixels from center outward with small pseudo-random flame jitter
  return pixels.sort((a, b) => a.dist - b.dist + ((a.x * 7 + a.y * 13) % 5) * 0.25);
}

const GLYPH_PIXELS = generateSigilPixels();
const TOTAL_PIXELS = GLYPH_PIXELS.length;

export default function MarkAwakeningOverlay({
  chapter,
  onDismiss,
  reducedMotion = false,
}: MarkAwakeningOverlayProps) {
  const [litCount, setLitCount] = useState(reducedMotion ? TOTAL_PIXELS : 0);
  const flashAnim = useSharedValue(0);
  const pulseAnim = useSharedValue(1);
  const containerOpacity = useSharedValue(1);
  const dismissedRef = useRef(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function handleDismiss() {
    if (dismissedRef.current) return;
    dismissedRef.current = true;
    if (intervalRef.current) clearInterval(intervalRef.current);
    containerOpacity.value = withTiming(0, { duration: 250 }, () => {
      onDismiss();
    });
  }

  useEffect(() => {
    // 1. Play mark_awakening stinger and initial heartbeat SFX
    sound.playStinger('mark_awakening');
    sound.playSFX('heartbeat');

    if (reducedMotion) {
      setLitCount(TOTAL_PIXELS);
      const timer = setTimeout(handleDismiss, 2500);
      return () => clearTimeout(timer);
    }

    // 2. Pixel burn-in over 1600ms (igniting pixels from center outward)
    const startTime = Date.now();
    const burnDuration = 1600;
    let heartbeatPlayed = false;
    let pulsePlayed = false;

    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(1, elapsed / burnDuration);
      setLitCount(Math.floor(progress * TOTAL_PIXELS));

      // Dual heartbeat: second thud at 850ms
      if (elapsed >= 850 && !heartbeatPlayed) {
        heartbeatPlayed = true;
        sound.playSFX('heartbeat');
        pulseAnim.value = withSequence(
          withTiming(1.15, { duration: 90 }),
          withTiming(1, { duration: 160 })
        );
      }

      // 3. White flash at full burn-in (1600ms)
      if (elapsed >= burnDuration && !pulsePlayed) {
        pulsePlayed = true;
        sound.playSFX('markPulse');
        flashAnim.value = withSequence(
          withTiming(1, { duration: 120 }),
          withTiming(0, { duration: 600 })
        );
      }

      // 4. Reveal & auto dismiss after 3200ms
      if (elapsed >= 3200) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        handleDismiss();
      }
    }, 30);

    // Keyboard advance listener for Space / Enter
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault();
        handleDismiss();
      }
    };

    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (Platform.OS === 'web' && typeof window !== 'undefined') {
        window.removeEventListener('keydown', handleKeyDown);
      }
    };
  }, [reducedMotion]);

  const containerAnimStyle = useAnimatedStyle(() => ({
    opacity: containerOpacity.value,
  }));

  const pulseAnimStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseAnim.value }],
  }));

  const flashAnimStyle = useAnimatedStyle(() => ({
    opacity: flashAnim.value,
  }));

  const isCh9 = chapter === 'ch9';
  const headerText = isCh9 ? 'THE FIRST PULSE' : 'THE MARK AWAKENS';
  const subText = isCh9
    ? 'A full transmission on a frequency with no name. The sigil is complete.'
    : 'A luminescent violet sigil burns into your left wrist, pulsing like a second heart.';

  // Draw pixel grid: 24x24 pixels, integer scaled 6px each = 144x144px
  const pixelSize = 6;
  const stageSize = 24 * pixelSize; // 144px

  return (
    <Pressable
      style={styles.backdrop}
      onPress={handleDismiss}
      testID="mark-awakening-overlay"
    >
      <Animated.View style={[styles.innerContainer, containerAnimStyle]}>
        {/* Glow ambient background behind the glyph */}
        <View style={styles.ambientGlow} />

        {/* Header title */}
        <Text style={styles.headerTitle}>{headerText}</Text>

        {/* ── Pixel Glyph Burning Stage ── */}
        <Animated.View style={[styles.glyphStage, { width: stageSize, height: stageSize }, pulseAnimStyle]}>
          {GLYPH_PIXELS.slice(0, litCount).map((p, idx) => {
            const isFresh = idx >= litCount - 6;
            const color = isFresh
              ? '#ffffff'
              : p.dist < 4
              ? '#f5e6ff'
              : p.dist < 8
              ? '#c38bfa'
              : '#9b59b6';

            return (
              <View
                key={`${p.x}-${p.y}`}
                style={{
                  position: 'absolute',
                  left: p.x * pixelSize,
                  top: p.y * pixelSize,
                  width: pixelSize,
                  height: pixelSize,
                  backgroundColor: color,
                  boxShadow: isFresh ? '0 0 4px #ffffff' : undefined,
                } as any}
              />
            );
          })}
        </Animated.View>

        {/* Subtitle / Lore description */}
        <Text style={styles.subText}>{subText}</Text>

        {/* Skip prompt */}
        <Text style={styles.skipPrompt}>[ TAP OR SPACE TO CONTINUE ]</Text>
      </Animated.View>

      {/* ── Searing White Flash Surge Overlay ── */}
      <Animated.View
        style={[StyleSheet.absoluteFill, styles.whiteFlash, flashAnimStyle]}
        pointerEvents="none"
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(3, 1, 8, 0.96)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 110,
    ...(Platform.OS === 'web' ? { position: 'fixed' as any } : {}),
  },
  innerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    maxWidth: 420,
    width: '90%',
  },
  ambientGlow: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: 'rgba(155, 89, 182, 0.16)',
    zIndex: -1,
  },
  headerTitle: {
    fontSize: 12,
    color: '#d6b4fc',
    fontFamily: Platform.select({
      web: "'Press Start 2P', 'PressStart2P-Regular', monospace",
      default: 'PressStart2P-Regular',
    }),
    letterSpacing: 2.5,
    textAlign: 'center',
    marginBottom: 28,
  },
  glyphStage: {
    position: 'relative',
    marginVertical: 18,
    borderWidth: 1,
    borderColor: 'rgba(155, 89, 182, 0.35)',
    backgroundColor: 'rgba(12, 6, 24, 0.8)',
    borderRadius: 4,
  },
  subText: {
    fontSize: 13,
    color: '#d4c5a9',
    fontFamily: 'PixelifySans-Medium',
    fontStyle: 'italic',
    textAlign: 'center',
    lineHeight: 20,
    marginTop: 22,
    marginBottom: 12,
  },
  skipPrompt: {
    fontSize: 9,
    color: '#6a5e50',
    fontFamily: Platform.select({
      web: "'Press Start 2P', 'PressStart2P-Regular', monospace",
      default: 'PressStart2P-Regular',
    }),
    letterSpacing: 1.5,
    marginTop: 14,
    opacity: 0.75,
  },
  whiteFlash: {
    backgroundColor: '#ffffff',
    zIndex: 120,
  },
});
