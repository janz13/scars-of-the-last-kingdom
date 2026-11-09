import React, { useEffect, useRef, useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { CinematicPlayer, CinematicTimeline, CinematicFrameState } from '../../engine/pixel/cinematicPlayer';
import PixelStage from './PixelStage';
import { sound } from '../../logic/audioEngine';

export interface CinematicViewProps {
  timeline: CinematicTimeline;
  onComplete?: () => void;
  showSkipButton?: boolean;
  skipLabel?: string;
  compact?: boolean;
  height?: number;
  corruption?: number;
  style?: any;
}

export function CinematicView({
  timeline,
  onComplete,
  showSkipButton = false,
  skipLabel = 'SKIP INTRO',
  compact = false,
  height,
  corruption = 0,
  style,
}: CinematicViewProps) {
  const playerRef = useRef<CinematicPlayer>(new CinematicPlayer(timeline));
  const lastShotIdxRef = useRef<number>(-1);
  const completedRef = useRef<boolean>(false);

  const [frameState, setFrameState] = useState<CinematicFrameState>(() =>
    playerRef.current.evaluateAt(0)
  );

  useEffect(() => {
    const player = new CinematicPlayer(timeline);
    playerRef.current = player;
    lastShotIdxRef.current = -1;
    completedRef.current = false;
    player.play();

    let lastTime = Date.now();
    const interval = setInterval(() => {
      const now = Date.now();
      const dt = Math.min(0.25, (now - lastTime) / 1000);
      lastTime = now;

      const state = player.step(dt);
      setFrameState(state);

      if (state.shotIndex !== lastShotIdxRef.current) {
        lastShotIdxRef.current = state.shotIndex;
        if (state.activeShot.stinger) {
          sound.playStinger(state.activeShot.stinger);
        }
      }

      if (state.isComplete && !completedRef.current) {
        completedRef.current = true;
        onComplete?.();
      }
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, [timeline]);

  useEffect(() => {
    if (Platform.OS !== 'web' || !showSkipButton) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
        if (!completedRef.current) {
          completedRef.current = true;
          onComplete?.();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showSkipButton, onComplete]);

  const { activeShot, activeSubtitle, activeTitleCard, progress } = frameState;

  return (
    <View style={[styles.container, height ? { height } : { flex: 1 }, style]}>
      <View style={styles.stageWrap}>
        <PixelStage
          imageKey={activeShot.sceneKey}
          sceneKey={activeShot.id}
          overlayOpacity={0.35}
          corruption={corruption}
        />
      </View>

      {/* Title Card Overlay */}
      {activeTitleCard && (
        <View style={styles.titleCardOverlay} pointerEvents="none">
          {activeTitleCard.eyebrow && (
            <Text style={[styles.titleEyebrow, compact && { fontSize: 8 }]}>
              {activeTitleCard.eyebrow}
            </Text>
          )}
          <Text style={[styles.titleMain, compact && { fontSize: 16, lineHeight: 22 }]}>
            {activeTitleCard.title}
          </Text>
          {activeTitleCard.subtitle && (
            <Text style={[styles.titleSubtitle, compact && { fontSize: 9 }]}>
              {activeTitleCard.subtitle}
            </Text>
          )}
        </View>
      )}

      {/* Subtitle Overlay */}
      {activeSubtitle && (
        <View style={[styles.subtitleBar, compact && { bottom: 10, paddingHorizontal: 12 }]} pointerEvents="none">
          <View style={styles.subtitleBox}>
            {activeSubtitle.speaker && (
              <Text style={styles.subtitleSpeaker}>{activeSubtitle.speaker.toUpperCase()}</Text>
            )}
            <Text style={[styles.subtitleText, compact && { fontSize: 11 }]}>
              {activeSubtitle.text}
            </Text>
          </View>
        </View>
      )}

      {/* Progress Bar & Skip Button for non-looping cinematics */}
      {showSkipButton && (
        <>
          <View style={styles.progressTrack} pointerEvents="none">
            <View style={[styles.progressFill, { width: `${Math.round(progress * 100)}%` as any }]} />
          </View>
          <Pressable
            style={styles.skipButton}
            onPress={() => {
              if (!completedRef.current) {
                completedRef.current = true;
                onComplete?.();
              }
            }}
            accessibilityRole="button"
            accessibilityLabel={skipLabel}
            testID="cinematic-skip-btn"
          >
            <Text style={styles.skipButtonText}>{skipLabel}</Text>
            <Feather name="skip-forward" size={12} color="#ede0c4" />
          </Pressable>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    backgroundColor: '#05040a',
    overflow: 'hidden',
  },
  stageWrap: {
    ...StyleSheet.absoluteFillObject,
  },
  titleCardOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(5, 4, 10, 0.52)',
    paddingHorizontal: 24,
  },
  titleEyebrow: {
    fontSize: 10,
    color: '#c9a84c',
    letterSpacing: 3,
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 8,
    textAlign: 'center',
  },
  titleMain: {
    fontSize: 26,
    color: '#ede0c4',
    letterSpacing: 3.5,
    fontFamily: 'Inter_700Bold',
    textAlign: 'center',
    lineHeight: 34,
  },
  titleSubtitle: {
    fontSize: 11,
    color: '#9b59b6',
    letterSpacing: 2,
    fontFamily: 'Inter_600SemiBold',
    marginTop: 10,
    textAlign: 'center',
  },
  subtitleBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 36,
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  subtitleBox: {
    maxWidth: 680,
    backgroundColor: 'rgba(8, 6, 16, 0.86)',
    borderWidth: 1,
    borderColor: 'rgba(155, 89, 182, 0.35)',
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  subtitleSpeaker: {
    fontSize: 9,
    letterSpacing: 2,
    color: '#c9a84c',
    fontFamily: 'Inter_700Bold',
    marginBottom: 3,
  },
  subtitleText: {
    fontSize: 13,
    lineHeight: 20,
    color: '#ede0c4',
    fontFamily: 'Inter_400Regular',
    textAlign: 'center',
  },
  progressTrack: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 3,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  progressFill: {
    height: 3,
    backgroundColor: '#9b59b6',
  },
  skipButton: {
    position: 'absolute',
    top: Platform.OS === 'web' ? 24 : 48,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(10, 8, 18, 0.85)',
    borderWidth: 1,
    borderColor: 'rgba(237, 224, 196, 0.35)',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 4,
  },
  skipButtonText: {
    fontSize: 10,
    letterSpacing: 2,
    color: '#ede0c4',
    fontFamily: 'Inter_700Bold',
  },
});
