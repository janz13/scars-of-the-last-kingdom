import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Animated, {
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { Feather } from '@expo/vector-icons';
import { useGame } from '../context/GameContext';
import SaveNotification from './SaveNotification';
import { getSurvivalWarnings } from '../logic/gameEngine';
import type { SurvivalWarning, SurvivalWarningSeverity, SurvivalWarningType } from '../logic/gameEngine';
import PixelStage from './scene/PixelStage';
import ChoiceButton from './ChoiceButton';
import DiceRollOverlay from './DiceRollOverlay';
import DesktopSidebarHUD from './DesktopSidebarHUD';
import StoryLayout from './scene/StoryLayout';
import StoryText from './scene/StoryText';
import { useWebKeyboardControls } from '../hooks/useWebKeyboardControls';
import { useChoiceImagePreloader } from '../hooks/useChoiceImagePreloader';
import { preloadNextChapter, subscribeChapterLoaded } from '../data/story/chapterLoader';
import { useTypewriter } from '../hooks/useTypewriter';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { getSceneManifestEntry } from '../constants/sceneManifest';
import { sound } from '../logic/audioEngine';

// ─── Mini stat bar ────────────────────────────────────────────────────────────

function MiniStatBar({ value, max, color }: { value: number; max: number; color: string }) {
  const pct = Math.max(0, Math.min(1, value / max));
  const lowPulse = useSharedValue(1);
  const isLow = pct < 0.25;

  useEffect(() => {
    if (isLow) {
      lowPulse.value = withRepeat(
        withSequence(
          withTiming(0.45, { duration: 800 }),
          withTiming(1, { duration: 800 })
        ),
        -1,
        true
      );
    } else {
      cancelAnimation(lowPulse);
      lowPulse.value = 1;
    }
  }, [isLow, lowPulse]);

  const fillAnimStyle = useAnimatedStyle(() => ({
    opacity: isLow ? lowPulse.value : 1,
  }));

  return (
    <View style={barStyles.miniTrack}>
      <Animated.View
        style={[
          barStyles.miniFill,
          { width: `${pct * 100}%` as any, backgroundColor: color },
          fillAnimStyle,
        ]}
      />
    </View>
  );
}

// ─── HUD bar ──────────────────────────────────────────────────────────────────

interface StatBarProps {
  health: number;
  maxHealth: number;
  hunger: number;
  thirst: number;
  morale: number;
  corruption: number;
  onStats: () => void;
  onInventory: () => void;
  onCompanions: () => void;
  onFactions: () => void;
  onHistory: () => void;
}

function StatBar({
  health,
  maxHealth,
  hunger,
  thirst,
  morale,
  corruption,
  onStats,
  onInventory,
  onCompanions,
  onFactions,
  onHistory,
}: StatBarProps) {
  return (
    <View style={barStyles.container}>
      <View style={barStyles.inner}>
        <Pressable
          onPress={onStats}
          style={barStyles.barsGroup}
          hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
        >
          <View style={barStyles.barRow}>
            <View style={[barStyles.dot, { backgroundColor: '#e74c3c' }]} />
            <MiniStatBar value={health} max={maxHealth} color="#e74c3c" />
          </View>
          <View style={barStyles.barRow}>
            <View style={[barStyles.dot, { backgroundColor: '#e67e22' }]} />
            <MiniStatBar value={hunger} max={100} color="#e67e22" />
          </View>
          <View style={barStyles.barRow}>
            <View style={[barStyles.dot, { backgroundColor: '#3d9ad1' }]} />
            <MiniStatBar value={thirst} max={100} color="#3d9ad1" />
          </View>
          <View style={barStyles.barRow}>
            <View style={[barStyles.dot, { backgroundColor: '#9b59b6' }]} />
            <MiniStatBar value={morale} max={100} color="#9b59b6" />
          </View>
        </Pressable>

        <View style={{ flex: 1 }} />

        {corruption > 0 && (
          <View style={barStyles.corruptionBadge}>
            <Feather name="zap" size={9} color="#9b59b6" />
            <Text style={barStyles.corruptionVal}>{corruption}</Text>
          </View>
        )}

        <View style={barStyles.navRow}>
          <Pressable onPress={onInventory} style={barStyles.navIcon} hitSlop={{ top: 8, bottom: 8, left: 6, right: 6 }}>
            <Feather name="package" size={14} color="#6a5e70" />
          </Pressable>
          <Pressable onPress={onCompanions} style={barStyles.navIcon} hitSlop={{ top: 8, bottom: 8, left: 6, right: 6 }}>
            <Feather name="users" size={14} color="#6a5e70" />
          </Pressable>
          <Pressable onPress={onFactions} style={barStyles.navIcon} hitSlop={{ top: 8, bottom: 8, left: 6, right: 6 }}>
            <Feather name="shield" size={14} color="#6a5e70" />
          </Pressable>
          <Pressable onPress={onHistory} style={barStyles.navIcon} hitSlop={{ top: 8, bottom: 8, left: 6, right: 6 }}>
            <Feather name="book-open" size={14} color="#6a5e70" />
          </Pressable>
        </View>
      </View>
      <View style={barStyles.bottomBorder} />
    </View>
  );
}

// ─── Survival warning strip ───────────────────────────────────────────────────

const WARNING_TYPE_ICONS: Record<SurvivalWarningType, string> = {
  hunger: 'alert-triangle',
  thirst: 'droplet',
  health: 'heart',
  morale: 'wind',
  corruption: 'zap',
  companion: 'eye',
  supplies: 'package',
};

const WARNING_TYPE_COLORS: Record<SurvivalWarningType, string> = {
  hunger: '#e67e22',
  thirst: '#3d9ad1',
  health: '#e74c3c',
  morale: '#9b59b6',
  corruption: '#c39bd3',
  companion: '#a09060',
  supplies: '#7f8c8d',
};

function WarningRow({ warning }: { warning: SurvivalWarning }) {
  const pulseAnim = useSharedValue(1);
  const isCritical = warning.severity === 'critical';

  useEffect(() => {
    if (isCritical) {
      pulseAnim.value = withRepeat(
        withSequence(
          withTiming(0.5, { duration: 900 }),
          withTiming(1, { duration: 900 })
        ),
        -1,
        true
      );
    } else {
      cancelAnimation(pulseAnim);
      pulseAnim.value = 1;
    }
  }, [isCritical, pulseAnim]);

  const rowAnimStyle = useAnimatedStyle(() => ({
    opacity: isCritical ? pulseAnim.value : 1,
  }));

  const color = WARNING_TYPE_COLORS[warning.type];
  const iconName = WARNING_TYPE_ICONS[warning.type] as any;

  return (
    <Animated.View
      style={[
        warnStyles.row,
        { borderLeftColor: color },
        rowAnimStyle,
      ]}
    >
      <Feather name={iconName} size={10} color={color} />
      <Text style={[warnStyles.text, { color }]}>{warning.message}</Text>
    </Animated.View>
  );
}

function SurvivalWarningStrip({ warnings }: { warnings: SurvivalWarning[] }) {
  if (warnings.length === 0) return null;

  const sorted = [...warnings].sort((a, b) => {
    const order: Record<SurvivalWarningSeverity, number> = { critical: 0, warning: 1, info: 2 };
    return order[a.severity] - order[b.severity];
  });
  const visible = sorted.slice(0, 3);

  return (
    <View style={warnStyles.container}>
      {visible.map((w, i) => (
        <WarningRow key={`${w.type}-${i}`} warning={w} />
      ))}
    </View>
  );
}

// ─── Chapter transition banner ────────────────────────────────────────────────

function ChapterBanner({ chapter }: { chapter: string }) {
  const fadeAnim = useSharedValue(0);
  const scaleAnim = useSharedValue(1.04);

  useEffect(() => {
    fadeAnim.value = withSequence(
      withTiming(1, { duration: 420 }),
      withDelay(1100, withTiming(0, { duration: 500 }))
    );
    scaleAnim.value = withTiming(1, { duration: 400 });
  }, [fadeAnim, scaleAnim]);

  const bannerAnimStyle = useAnimatedStyle(() => ({
    opacity: fadeAnim.value,
    transform: [{ scale: scaleAnim.value }],
  }));

  return (
    <Animated.View
      pointerEvents="none"
      style={[bannerStyles.container, bannerAnimStyle]}
    >
      <View style={bannerStyles.card}>
        <View style={bannerStyles.accentLine} />
        <Text style={bannerStyles.chapterLabel}>{chapter.toUpperCase()}</Text>
        <View style={bannerStyles.accentLine} />
      </View>
    </Animated.View>
  );
}

// ─── Main StoryPanel Coordinator ──────────────────────────────────────────────

export default function StoryPanel({ onOpenHotkeys }: { onOpenHotkeys?: () => void } = {}) {
  const {
    state,
    currentNode,
    availableChoices,
    makeChoice,
    setScreen,
    pendingDiceRoll,
    initiateDiceRoll,
    commitDiceRoll,
    saveNotification,
  } = useGame();
  const reducedMotion = useReducedMotion();

  // Typewriter streaming for narration and dialogue
  const {
    displayedNarration,
    displayedDialogue,
    isTyping,
    skip: skipTypewriter,
  } = useTypewriter({
    text: currentNode?.text ?? '',
    dialogue: currentNode?.dialogue,
    textSpeed: state.settings.textSpeed,
    reducedMotion,
  });

  // Listen to keyboard skip event from useWebKeyboardControls (Space / Enter)
  useEffect(() => {
    if (Platform.OS !== 'web' || typeof window === 'undefined') return;
    const handleSkip = () => {
      skipTypewriter();
    };
    window.addEventListener('story-typewriter-skip', handleSkip);
    return () => window.removeEventListener('story-typewriter-skip', handleSkip);
  }, [skipTypewriter]);

  // Mount web keyboard hotkeys
  useWebKeyboardControls();

  // Preload next scene image assets for available choices
  useChoiceImagePreloader(availableChoices, state, currentNode?.imageKey);

  // Automatically preload next sequential chapter
  useEffect(() => {
    if (currentNode?.chapter) {
      preloadNextChapter(currentNode.chapter);
    }
  }, [currentNode?.chapter]);

  // Re-render when an unloaded chapter completes loading
  const [, setChapterTick] = useState(0);
  useEffect(() => {
    return subscribeChapterLoaded(() => {
      setChapterTick((t) => t + 1);
    });
  }, []);

  const titleFade = useSharedValue(1);
  const titleSlide = useSharedValue(0);
  const prevNodeId = useRef<string | undefined>(undefined);
  const prevChapter = useRef<string | undefined>(undefined);
  const [showBanner, setShowBanner] = useState(false);
  const bannerTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!currentNode) return;

    if (prevChapter.current !== undefined && prevChapter.current !== currentNode.chapter) {
      if (bannerTimeoutRef.current) clearTimeout(bannerTimeoutRef.current);
      setShowBanner(true);
      sound.playStinger('chapter_card');
      bannerTimeoutRef.current = setTimeout(() => setShowBanner(false), 2200);
    }
    prevChapter.current = currentNode.chapter;

    if (prevNodeId.current === currentNode.id) return;
    prevNodeId.current = currentNode.id;

    // Trigger adaptive procedural scene music cue
    const manifestEntry = getSceneManifestEntry(currentNode.imageKey);
    if (manifestEntry?.music) {
      sound.playTheme(manifestEntry.music.theme, manifestEntry.music.intensity);
    }

    if (reducedMotion) {
      titleFade.value = 1;
      titleSlide.value = 0;
    } else {
      titleFade.value = 0;
      titleSlide.value = 14;
      titleFade.value = withDelay(140, withTiming(1, { duration: 500 }));
      titleSlide.value = withDelay(140, withTiming(0, { duration: 400 }));
    }

    return () => {
      if (bannerTimeoutRef.current) clearTimeout(bannerTimeoutRef.current);
    };
  }, [currentNode?.id, currentNode?.chapter, currentNode?.imageKey, reducedMotion, titleFade, titleSlide]);

  // Keep procedural music engine updated with corruption & low-HP heartbeat state
  useEffect(() => {
    const isLowHp = state.stats.health / Math.max(1, state.stats.maxHealth) <= 0.3;
    sound.setAdaptiveState(state.stats.corruption, isLowHp);
  }, [state.stats.corruption, state.stats.health, state.stats.maxHealth]);

  if (!currentNode) {
    return (
      <PixelStage imageKey="default" sceneKey="loading">
        <View style={styles.loading}>
          <ActivityIndicator color="#9b59b6" size="large" />
        </View>
      </PixelStage>
    );
  }

  const isTerminalNode = currentNode.choices.length === 0 && !currentNode.isEnding;
  const isEndingNode = currentNode.isEnding;
  const isHallucination = state.flags['halluc_active'] ?? false;
  const isCompanionEvent = state.flags['companion_event_active'] ?? false;
  const survivalWarnings = getSurvivalWarnings(state);

  const storyContent = (
    <>
      <StoryText
        chapter={currentNode.chapter}
        location={currentNode.location}
        title={currentNode.title}
        speaker={currentNode.speaker}
        displayedNarration={displayedNarration}
        displayedDialogue={displayedDialogue}
        hasDialogue={Boolean(currentNode.dialogue)}
        isTyping={isTyping}
        onSkipTypewriter={skipTypewriter}
        companions={state.companions}
        isHallucination={isHallucination}
        isCompanionEvent={isCompanionEvent}
        fontSize={state.settings.fontSize}
        proseFont={state.settings.proseFont ?? 'inter'}
        titleFade={titleFade}
        titleSlide={titleSlide}
      />

      {!isEndingNode && !isHallucination && !isCompanionEvent && (
        <SurvivalWarningStrip warnings={survivalWarnings} />
      )}

      {/* Choices panel */}
      <View
        style={[
          styles.choicesPanel,
          isHallucination && styles.hallucinationChoicesPanel,
          isCompanionEvent && {
            backgroundColor:
              currentNode.speaker === 'Cain'
                ? 'rgba(40,20,0,0.92)'
                : 'rgba(25,10,35,0.92)',
          },
        ]}
      >
        <View
          style={[
            styles.choicesTopAccent,
            isHallucination && styles.hallucinationTopAccent,
            isCompanionEvent && {
              backgroundColor:
                currentNode.speaker === 'Cain'
                  ? 'rgba(230,126,34,0.45)'
                  : 'rgba(155,89,182,0.35)',
            },
          ]}
        />

        {isTerminalNode && (
          <View style={styles.terminalNode}>
            <View style={styles.terminalDivider}>
              <View style={styles.terminalLine} />
              <Feather name="bookmark" size={12} color="#6a5e70" />
              <View style={styles.terminalLine} />
            </View>
            <Text style={styles.terminalText}>The story continues…</Text>
            <Pressable style={styles.returnBtn} onPress={() => setScreen('mainMenu')}>
              <Text style={styles.returnBtnText}>RETURN TO MAIN MENU</Text>
              <Feather name="arrow-right" size={12} color="#9b59b6" />
            </Pressable>
          </View>
        )}

        {!isTerminalNode && !isEndingNode && (
          <>
            {availableChoices.map(({ choice, met, reasons }, index) => (
              <ChoiceButton
                key={choice.id}
                choiceId={choice.id}
                text={choice.text}
                met={met}
                reasons={reasons}
                flavorText={choice.flavorText}
                diceCheck={choice.diceCheck}
                hotkeyIndex={index + 1}
                isTyping={isTyping}
                onSkip={skipTypewriter}
                onPress={() => {
                  if (choice.diceCheck) {
                    initiateDiceRoll(choice.id);
                  } else {
                    makeChoice(choice.id);
                  }
                }}
              />
            ))}
            {availableChoices.length === 0 && (
              <Text style={styles.noChoices}>
                No available choices. Check your stats and inventory.
              </Text>
            )}
          </>
        )}

        {!isHallucination && (
          <Pressable style={styles.menuBtn} onPress={() => setScreen('settings')}>
            <Feather name="menu" size={11} color="#3a3048" />
            <Text style={styles.menuBtnText}>MENU</Text>
          </Pressable>
        )}
      </View>
    </>
  );

  return (
    <StoryLayout
      layoutOverride={state.settings.textLayout ?? 'auto'}
      artStage={
        <PixelStage
          imageKey={currentNode.imageKey}
          sceneKey={currentNode.id}
          overlayOpacity={isHallucination ? 0.88 : isCompanionEvent ? 0.84 : 0.78}
          fadeDuration={isHallucination ? 600 : isCompanionEvent ? 500 : 420}
          corruption={state.stats.corruption}
          health={state.stats.health}
          maxHealth={state.stats.maxHealth}
          hunger={state.stats.hunger}
          thirst={state.stats.thirst}
          isHallucination={isHallucination}
          tiltParallaxEnabled={state.settings.tiltParallax ?? false}
          reducedMotion={reducedMotion}
        />
      }
      sidebarHUD={<DesktopSidebarHUD onOpenHotkeys={onOpenHotkeys} />}
      topHUD={
        <StatBar
          health={state.stats.health}
          maxHealth={state.stats.maxHealth}
          hunger={state.stats.hunger}
          thirst={state.stats.thirst}
          morale={state.stats.morale}
          corruption={state.stats.corruption}
          onStats={() => setScreen('stats')}
          onInventory={() => setScreen('inventory')}
          onCompanions={() => setScreen('companions')}
          onFactions={() => setScreen('factions')}
          onHistory={() => setScreen('history')}
        />
      }
      storyContent={storyContent}
      overlays={
        <>
          {showBanner && <ChapterBanner key={currentNode.chapter} chapter={currentNode.chapter} />}
          {pendingDiceRoll && (
            <DiceRollOverlay
              diceCheck={pendingDiceRoll.diceCheck}
              choiceText={pendingDiceRoll.choiceText}
              state={state}
              onCommit={(result) => commitDiceRoll(pendingDiceRoll.choiceId, result)}
            />
          )}
          <SaveNotification visible={saveNotification} />
        </>
      }
    />
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const barStyles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(4,2,12,0.88)',
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingTop: 8,
    paddingBottom: 7,
    gap: 10,
  },
  bottomBorder: {
    height: 1,
    backgroundColor: 'rgba(155,89,182,0.1)',
  },
  barsGroup: {
    gap: 4,
    width: 130,
  },
  barRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
  },
  miniTrack: {
    flex: 1,
    height: 3,
    backgroundColor: 'rgba(40,35,55,0.9)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  miniFill: {
    height: '100%',
    borderRadius: 2,
  },
  corruptionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: 'rgba(155,89,182,0.12)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(155,89,182,0.25)',
  },
  corruptionVal: {
    fontSize: 9,
    color: '#9b59b6',
    fontFamily: 'Inter_600SemiBold',
  },
  navRow: {
    flexDirection: 'row',
    gap: 12,
  },
  navIcon: {
    padding: 3,
  },
});

const warnStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingBottom: 16,
    gap: 6,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(10, 6, 18, 0.7)',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 3,
    borderLeftWidth: 3,
  },
  text: {
    fontSize: 12,
    fontFamily: 'Inter_500Medium',
    letterSpacing: 0.1,
  },
});

const bannerStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '38%',
    left: 20,
    right: 20,
    alignItems: 'center',
    zIndex: 100,
  },
  card: {
    backgroundColor: 'rgba(8, 4, 16, 0.94)',
    borderWidth: 1,
    borderColor: 'rgba(155, 89, 182, 0.4)',
    borderRadius: 6,
    paddingVertical: 18,
    paddingHorizontal: 32,
    alignItems: 'center',
    shadowColor: '#9b59b6',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
  },
  accentLine: {
    width: 48,
    height: 1,
    backgroundColor: 'rgba(155, 89, 182, 0.4)',
    marginVertical: 4,
  },
  chapterLabel: {
    fontSize: 16,
    color: '#ede0c4',
    fontFamily: 'Inter_700Bold',
    letterSpacing: 3,
    marginVertical: 6,
  },
});

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  choicesPanel: {
    backgroundColor: 'rgba(8, 6, 16, 0.92)',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(155, 89, 182, 0.18)',
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 24,
    gap: 10,
  },
  hallucinationChoicesPanel: {
    backgroundColor: 'rgba(20, 0, 35, 0.94)',
    borderColor: 'rgba(155, 89, 182, 0.35)',
  },
  choicesTopAccent: {
    height: 2,
    backgroundColor: 'rgba(155, 89, 182, 0.25)',
    borderRadius: 1,
    marginBottom: 4,
  },
  hallucinationTopAccent: {
    backgroundColor: 'rgba(195, 155, 211, 0.5)',
  },
  terminalNode: {
    alignItems: 'center',
    paddingVertical: 16,
    gap: 12,
  },
  terminalDivider: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    width: '100%',
  },
  terminalLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(155, 89, 182, 0.15)',
  },
  terminalText: {
    fontSize: 13,
    color: '#8c829e',
    fontFamily: 'Inter_500Medium',
    fontStyle: 'italic',
  },
  returnBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(155, 89, 182, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(155, 89, 182, 0.35)',
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  returnBtnText: {
    fontSize: 11,
    color: '#ede0c4',
    fontFamily: 'Inter_600SemiBold',
    letterSpacing: 1.5,
  },
  noChoices: {
    fontSize: 13,
    color: '#8c829e',
    fontStyle: 'italic',
    textAlign: 'center',
    paddingVertical: 14,
  },
  menuBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 8,
    marginTop: 4,
  },
  menuBtnText: {
    fontSize: 10,
    color: '#6a5e70',
    fontFamily: 'Inter_600SemiBold',
    letterSpacing: 2,
  },
});
