import React, { useEffect, useRef } from 'react';
import {
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { CHAPTER_ROADMAP, ChapterEntry } from '../../data/chapterRoadmap';
import {
  getSceneManifestEntry,
  resolveSceneAsset,
} from '../../constants/sceneManifest';
import { sound } from '../../logic/audioEngine';

export interface ChapterTitleCardProps {
  chapter: string;
  imageKey?: string;
  onDismiss: () => void;
  reducedMotion?: boolean;
}

export interface ChapterMeta {
  partLabel: string;
  title: string;
  epigraph: string;
}

export function resolveChapterMeta(chapter: string): ChapterMeta {
  if (!chapter || typeof chapter !== 'string') {
    return {
      partLabel: '',
      title: '',
      epigraph: 'The shadows stretch across the stones.',
    };
  }

  const norm = chapter.trim().toLowerCase();

  // 1. Exact match by partNumber or id
  let match = CHAPTER_ROADMAP.find((c: ChapterEntry) => {
    const part = c.partNumber.toLowerCase();
    const id = c.id.toLowerCase();
    return part === norm || id === norm;
  });

  // 2. Exact match normalized without whitespace, underscores, hyphens
  if (!match) {
    const unspaced = norm.replace(/[\s_-]+/g, '');
    match = CHAPTER_ROADMAP.find((c: ChapterEntry) => {
      const unspacedPart = c.partNumber.toLowerCase().replace(/[\s_-]+/g, '');
      const unspacedId = c.id.toLowerCase().replace(/[\s_-]+/g, '');
      return unspacedPart === unspaced || unspacedId === unspaced;
    });
  }

  // 3. Explicit canonical aliases
  if (!match) {
    if (norm === 'prologue' || norm === 'pro') {
      match = CHAPTER_ROADMAP.find((c: ChapterEntry) => c.id === 'prologue');
    } else if (norm === 'epilogue' || norm === 'epi') {
      match = CHAPTER_ROADMAP.find((c: ChapterEntry) => c.id === 'epilogue');
    } else if (
      norm === 'final chapter 1' ||
      norm === 'final_chapter_1' ||
      norm === 'chapter_final_1' ||
      norm === 'fc1' ||
      norm === 'final1'
    ) {
      match = CHAPTER_ROADMAP.find((c: ChapterEntry) => c.id === 'final_chapter_1');
    } else if (
      norm === 'final chapter 2' ||
      norm === 'final_chapter_2' ||
      norm === 'chapter_final_2' ||
      norm === 'fc2' ||
      norm === 'final2'
    ) {
      match = CHAPTER_ROADMAP.find((c: ChapterEntry) => c.id === 'final_chapter_2');
    } else {
      // 4. Regular numbered chapters: extract number (\d+) and map to chapter_${num}
      const numMatch = norm.match(/(?:chapter|ch)?\s*(\d+)/i);
      if (numMatch && numMatch[1]) {
        const targetId = `chapter_${numMatch[1]}`;
        const targetPart = `chapter ${numMatch[1]}`;
        match = CHAPTER_ROADMAP.find(
          (c: ChapterEntry) =>
            c.id.toLowerCase() === targetId ||
            c.partNumber.toLowerCase() === targetPart
        );
      }
    }
  }

  if (match) {
    return {
      partLabel: match.partNumber.toUpperCase(),
      title: match.title,
      epigraph: match.subtitle,
    };
  }

  return {
    partLabel: chapter.toUpperCase(),
    title: chapter,
    epigraph: 'The shadows stretch across the stones.',
  };
}

export default function ChapterTitleCard({
  chapter,
  imageKey,
  onDismiss,
  reducedMotion = false,
}: ChapterTitleCardProps) {
  const { width, height } = useWindowDimensions();
  const isPortrait = height > width;
  const meta = resolveChapterMeta(chapter);

  // Reanimated values for wipe, drift, and fade
  const wipeProgress = useSharedValue(reducedMotion ? 1 : 0);
  const driftX = useSharedValue(0);
  const driftY = useSharedValue(0);
  const cardScale = useSharedValue(reducedMotion ? 1 : 1.05);
  const cardOpacity = useSharedValue(0);
  const dismissedRef = useRef(false);

  function handleDismiss() {
    if (dismissedRef.current) return;
    dismissedRef.current = true;
    cardOpacity.value = withTiming(0, { duration: 250 }, () => {
      onDismiss();
    });
  }

  useEffect(() => {
    // Play chapter_card stinger
    sound.playStinger('chapter_card');

    if (reducedMotion) {
      wipeProgress.value = 1;
      cardOpacity.value = 1;
      cardScale.value = 1;
    } else {
      // Scanline wipe in: 0 to 1 over 650ms
      wipeProgress.value = withTiming(1, { duration: 650 });
      cardOpacity.value = withSequence(
        withTiming(1, { duration: 400 }),
        // Hold for ~3.2s, then fade out before dismiss at 4s
        withTiming(1, { duration: 3200 }),
        withTiming(0, { duration: 400 })
      );
      // Slow camera drift over key scene: 14 art-pixels drift over 4.2s
      driftX.value = withTiming(14, { duration: 4200 });
      driftY.value = withTiming(-8, { duration: 4200 });
      cardScale.value = withTiming(1, { duration: 4200 });
    }

    const timer = setTimeout(() => {
      handleDismiss();
    }, 4000);

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
      clearTimeout(timer);
      if (Platform.OS === 'web' && typeof window !== 'undefined') {
        window.removeEventListener('keydown', handleKeyDown);
      }
    };
  }, [reducedMotion]);

  // Resolve background scene image
  const manifestEntry = getSceneManifestEntry(imageKey || 'ruined_metro_station');
  const sceneAsset = manifestEntry
    ? resolveSceneAsset(manifestEntry, isPortrait ? 'portrait' : 'landscape')
    : undefined;

  const bgAnimStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: Math.round(driftX.value) },
      { translateY: Math.round(driftY.value) },
      { scale: 1.1 },
    ],
  }));

  const cardAnimStyle = useAnimatedStyle(() => ({
    opacity: cardOpacity.value,
    transform: [{ scale: cardScale.value }],
  }));

  const wipeAnimStyle = useAnimatedStyle(() => ({
    opacity: 1 - wipeProgress.value,
  }));

  return (
    <Pressable
      style={styles.backdrop}
      onPress={handleDismiss}
      testID="chapter-title-card"
    >
      {/* ── Background scene with slow drift ── */}
      {sceneAsset && (
        <Animated.View style={[StyleSheet.absoluteFill, styles.sceneContainer, bgAnimStyle]}>
          <Image
            source={sceneAsset}
            style={styles.sceneImage}
            resizeMode="cover"
          />
        </Animated.View>
      )}

      {/* ── Dark cinematic vignette ── */}
      <LinearGradient
        colors={[
          'rgba(4,2,10,0.85)',
          'rgba(6,3,15,0.70)',
          'rgba(4,2,10,0.92)',
        ]}
        style={StyleSheet.absoluteFill}
        pointerEvents="none"
      />

      {/* ── Scanline Wipe Transition Overlay ── */}
      {!reducedMotion && (
        <Animated.View
          style={[StyleSheet.absoluteFill, styles.scanlineWipeOverlay, wipeAnimStyle]}
          pointerEvents="none"
        >
          {Array.from({ length: 28 }).map((_, i) => (
            <View
              key={i}
              style={[
                styles.scanlineBand,
                {
                  opacity: i % 2 === 0 ? 0.95 : 0.85,
                  backgroundColor: i % 4 === 0 ? '#0a0614' : '#05030a',
                },
              ]}
            />
          ))}
        </Animated.View>
      )}

      {/* ── Center Title Card Content ── */}
      <Animated.View style={[styles.card, cardAnimStyle]}>
        {/* Top pixel accent line */}
        <View style={styles.accentContainer}>
          <View style={styles.accentLine} />
          <View style={styles.accentDiamond} />
          <View style={styles.accentLine} />
        </View>

        {/* Chapter label / Roman numeral in Press Start 2P */}
        <Text style={styles.chapterNumber}>{meta.partLabel}</Text>

        {/* Chapter Title */}
        <Text style={styles.chapterTitle}>{meta.title}</Text>

        {/* Subtitle / Epigraph */}
        {meta.epigraph ? (
          <Text style={styles.epigraph}>"{meta.epigraph}"</Text>
        ) : null}

        {/* Bottom pixel accent line */}
        <View style={styles.accentContainer}>
          <View style={styles.accentLine} />
          <View style={styles.accentDiamond} />
          <View style={styles.accentLine} />
        </View>

        {/* Skippable prompt */}
        <Text style={styles.skipPrompt}>[ TAP OR SPACE TO SKIP ]</Text>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#04020a',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 90,
    ...(Platform.OS === 'web' ? { position: 'fixed' as any } : {}),
  },
  sceneContainer: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
  sceneImage: {
    width: '100%',
    height: '100%',
    ...(Platform.OS === 'web' ? { imageRendering: 'pixelated' as any } : {}),
  },
  scanlineWipeOverlay: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    zIndex: 92,
  },
  scanlineBand: {
    flex: 1,
    width: '100%',
  },
  card: {
    zIndex: 95,
    maxWidth: 540,
    width: '88%',
    paddingVertical: 32,
    paddingHorizontal: 24,
    backgroundColor: 'rgba(8, 5, 18, 0.88)',
    borderWidth: 2,
    borderColor: 'rgba(201, 168, 76, 0.45)',
    borderRadius: 6,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.6,
    shadowRadius: 16,
  },
  accentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginVertical: 10,
    width: '80%',
  },
  accentLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(201, 168, 76, 0.5)',
  },
  accentDiamond: {
    width: 6,
    height: 6,
    backgroundColor: '#c9a84c',
    transform: [{ rotate: '45deg' }],
  },
  chapterNumber: {
    fontSize: 12,
    color: '#c9a84c',
    fontFamily: Platform.select({
      web: "'Press Start 2P', 'PressStart2P-Regular', monospace",
      default: 'PressStart2P-Regular',
    }),
    letterSpacing: 3,
    textAlign: 'center',
    marginBottom: 8,
  },
  chapterTitle: {
    fontSize: 22,
    color: '#f5ecd7',
    fontFamily: 'PixelifySans-Bold',
    letterSpacing: 2,
    textAlign: 'center',
    textTransform: 'uppercase',
    marginVertical: 6,
  },
  epigraph: {
    fontSize: 13,
    color: '#a0988c',
    fontFamily: 'PixelifySans-Medium',
    fontStyle: 'italic',
    textAlign: 'center',
    lineHeight: 20,
    marginTop: 6,
    marginBottom: 10,
    paddingHorizontal: 12,
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
});
