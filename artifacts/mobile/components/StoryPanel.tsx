import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { useGame } from '../context/GameContext';
import SaveNotification from './SaveNotification';
import { getSurvivalWarnings } from '../logic/gameEngine';
import type { SurvivalWarning, SurvivalWarningSeverity, SurvivalWarningType } from '../logic/gameEngine';
import BackgroundPanel from './BackgroundPanel';
import ChoiceButton from './ChoiceButton';
import DiceRollOverlay from './DiceRollOverlay';
import DesktopSidebarHUD from './DesktopSidebarHUD';
import { useWebKeyboardControls } from '../hooks/useWebKeyboardControls';

// ─── Mini stat bar ────────────────────────────────────────────────────────────

function MiniStatBar({ value, max, color }: { value: number; max: number; color: string }) {
  const pct = Math.max(0, Math.min(1, value / max));
  const lowPulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (pct < 0.25) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(lowPulse, { toValue: 0.45, duration: 800, useNativeDriver: true }),
          Animated.timing(lowPulse, { toValue: 1, duration: 800, useNativeDriver: true }),
        ])
      ).start();
    } else {
      lowPulse.stopAnimation();
      lowPulse.setValue(1);
    }
  }, [pct < 0.25]);

  return (
    <View style={barStyles.miniTrack}>
      <Animated.View
        style={[
          barStyles.miniFill,
          { width: `${pct * 100}%` as any, backgroundColor: color, opacity: pct < 0.25 ? lowPulse : 1 },
        ]}
      />
    </View>
  );
}

// ─── HUD bar ──────────────────────────────────────────────────────────────────

interface StatBarProps {
  health: number; maxHealth: number; hunger: number; thirst: number;
  morale: number; corruption: number;
  onStats: () => void; onInventory: () => void; onCompanions: () => void;
  onFactions: () => void; onHistory: () => void;
}

function StatBar({
  health, maxHealth, hunger, thirst, morale, corruption,
  onStats, onInventory, onCompanions, onFactions, onHistory,
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

const WARNING_COLORS: Record<SurvivalWarningSeverity, string> = {
  critical: '#e74c3c',
  warning:  '#e67e22',
  info:     '#6a5e70',
};

const WARNING_TYPE_ICONS: Record<SurvivalWarningType, string> = {
  hunger:    'alert-triangle',
  thirst:    'droplet',
  health:    'heart',
  morale:    'wind',
  corruption:'zap',
  companion: 'eye',
  supplies:  'package',
};

const WARNING_TYPE_COLORS: Record<SurvivalWarningType, string> = {
  hunger:    '#e67e22',
  thirst:    '#3d9ad1',
  health:    '#e74c3c',
  morale:    '#9b59b6',
  corruption:'#c39bd3',
  companion: '#a09060',
  supplies:  '#7f8c8d',
};

function WarningRow({ warning }: { warning: SurvivalWarning }) {
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const isCritical = warning.severity === 'critical';

  useEffect(() => {
    if (isCritical) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, { toValue: 0.5, duration: 900, useNativeDriver: true }),
          Animated.timing(pulseAnim, { toValue: 1, duration: 900, useNativeDriver: true }),
        ])
      ).start();
    } else {
      pulseAnim.stopAnimation();
      pulseAnim.setValue(1);
    }
  }, [isCritical]);

  const color = WARNING_TYPE_COLORS[warning.type];
  const iconName = WARNING_TYPE_ICONS[warning.type] as any;

  return (
    <Animated.View
      style={[
        warnStyles.row,
        { borderLeftColor: color, opacity: isCritical ? pulseAnim : 1 },
      ]}
    >
      <Feather name={iconName} size={10} color={color} />
      <Text style={[warnStyles.text, { color }]}>{warning.message}</Text>
    </Animated.View>
  );
}

function SurvivalWarningStrip({ warnings }: { warnings: SurvivalWarning[] }) {
  if (warnings.length === 0) return null;

  // Show at most 3 warnings, prioritising by severity
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
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1.04)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeAnim, { toValue: 1, duration: 420, useNativeDriver: true }),
        Animated.timing(scaleAnim, { toValue: 1, duration: 400, useNativeDriver: true }),
      ]),
      Animated.delay(1100),
      Animated.timing(fadeAnim, { toValue: 0, duration: 500, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <Animated.View
      pointerEvents="none"
      style={[bannerStyles.container, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}
    >
      <View style={bannerStyles.card}>
        <View style={bannerStyles.accentLine} />
        <Text style={bannerStyles.chapterLabel}>{chapter.toUpperCase()}</Text>
        <View style={bannerStyles.accentLine} />
      </View>
    </Animated.View>
  );
}

// ─── Main story panel ─────────────────────────────────────────────────────────

export default function StoryPanel() {
  const {
    state, currentNode, availableChoices, makeChoice, setScreen,
    pendingDiceRoll, initiateDiceRoll, commitDiceRoll, saveNotification,
  } = useGame();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const isDesktop = width >= 900;

  // Mount web keyboard hotkeys
  useWebKeyboardControls();

  const topPad = Platform.OS === 'web' ? 67 : insets.top;
  const botPad = Platform.OS === 'web' ? 34 : insets.bottom;

  // Font size scaling based on user setting
  const fontScale = state.settings.fontSize;
  const narrationFontSize = fontScale === 'small' ? 14 : fontScale === 'large' ? 19 : 16.5;
  const narrationLineHeight = fontScale === 'small' ? 23 : fontScale === 'large' ? 31 : 28;
  const dialogueFontSize = fontScale === 'small' ? 13 : fontScale === 'large' ? 17 : 15.5;
  const dialogueLineHeight = fontScale === 'small' ? 21 : fontScale === 'large' ? 27 : 25;

  const titleFade = useRef(new Animated.Value(1)).current;
  const titleSlide = useRef(new Animated.Value(0)).current;
  const prevNodeId = useRef<string | undefined>(undefined);
  const prevChapter = useRef<string | undefined>(undefined);
  const [showBanner, setShowBanner] = useState(false);
  const bannerTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!currentNode) return;

    if (prevChapter.current !== undefined && prevChapter.current !== currentNode.chapter) {
      if (bannerTimeoutRef.current) clearTimeout(bannerTimeoutRef.current);
      setShowBanner(true);
      bannerTimeoutRef.current = setTimeout(() => setShowBanner(false), 2200);
    }
    prevChapter.current = currentNode.chapter;

    if (prevNodeId.current === currentNode.id) return;
    prevNodeId.current = currentNode.id;

    titleFade.setValue(0);
    titleSlide.setValue(14);
    Animated.parallel([
      Animated.timing(titleFade, { toValue: 1, duration: 500, delay: 140, useNativeDriver: true }),
      Animated.timing(titleSlide, { toValue: 0, duration: 400, delay: 140, useNativeDriver: true }),
    ]).start();

    return () => {
      if (bannerTimeoutRef.current) clearTimeout(bannerTimeoutRef.current);
    };
  }, [currentNode?.id, currentNode?.chapter]);

  if (!currentNode) {
    return (
      <BackgroundPanel imageKey="default" sceneKey="error">
        <View style={styles.errorState}>
          <Text style={styles.errorText}>Story node not found.</Text>
          <Pressable onPress={() => setScreen('mainMenu')}>
            <Text style={styles.errorLink}>Return to menu</Text>
          </Pressable>
        </View>
      </BackgroundPanel>
    );
  }

  const isTerminalNode = currentNode.choices.length === 0 && !currentNode.isEnding;
  const isEndingNode = currentNode.isEnding;
  const isHallucination = state.flags['halluc_active'] ?? false;
  const isCompanionEvent = state.flags['companion_event_active'] ?? false;
  // Speaker-driven accent: Mira = purple, Cain = amber, default = neutral
  const companionAccent = isCompanionEvent
    ? currentNode.speaker === 'Cain'
      ? '#e67e22'
      : '#9b59b6'
    : '#9b59b6';

  // Compute survival warnings from the current game state
  const survivalWarnings = getSurvivalWarnings(state);

  const renderStoryColumn = (isDesktopView: boolean) => (
    <>
      {/* ── Story section ─────────────────────────────────────── */}
      <View style={[
        styles.storySection,
        isDesktopView && styles.desktopStorySection,
        isHallucination && styles.hallucinationSection,
        isCompanionEvent && { backgroundColor: currentNode.speaker === 'Cain' ? 'rgba(40,20,0,0.28)' : 'rgba(30,0,40,0.22)' },
      ]}>
        <Text style={[
          styles.breadcrumb,
          isHallucination && styles.hallucinationBreadcrumb,
          isCompanionEvent && { color: currentNode.speaker === 'Cain' ? 'rgba(230,126,34,0.55)' : 'rgba(155,89,182,0.55)', letterSpacing: 3 },
        ]}>
          {currentNode.chapter.toUpperCase()}
          {'  ›  '}
          {currentNode.location.toUpperCase()}
        </Text>

        <Animated.View style={{ opacity: titleFade, transform: [{ translateY: titleSlide }] }}>
          <Text style={[
            styles.nodeTitle,
            isDesktopView && styles.desktopNodeTitle,
            isHallucination && styles.hallucinationTitle,
            isCompanionEvent && { color: currentNode.speaker === 'Cain' ? '#f0a050' : '#c39bd3', letterSpacing: 0.5 },
          ]}>
            {currentNode.title}
          </Text>
        </Animated.View>

        {currentNode.speaker && (
          <View style={styles.speakerBadge}>
            <View style={styles.speakerLine} />
            <Text style={styles.speakerText}>{currentNode.speaker}</Text>
            <View style={styles.speakerLine} />
          </View>
        )}

        <Text style={[styles.narration, isHallucination && styles.hallucinationNarration, { fontSize: narrationFontSize, lineHeight: narrationLineHeight }]}>
          {currentNode.text}
        </Text>

        {currentNode.dialogue && (
          <View style={[styles.dialogueBox, isHallucination && styles.hallucinationDialogueBox]}>
            <Text style={styles.dialogueOpenQuote}>{'\u201C'}</Text>
            <Text style={[styles.dialogue, isHallucination && styles.hallucinationDialogue, { fontSize: dialogueFontSize, lineHeight: dialogueLineHeight }]}>
              {currentNode.dialogue}
            </Text>
          </View>
        )}

        {!isHallucination && !isCompanionEvent && (state.companions.mira.present && state.companions.mira.alive ||
          state.companions.cain.present && state.companions.cain.alive) && (
          <View style={styles.companionStrip}>
            {state.companions.mira.present && state.companions.mira.alive && (
              <View style={[styles.companionTag, { borderColor: 'rgba(155,89,182,0.25)' }]}>
                <View style={[styles.companionDot, { backgroundColor: '#9b59b6' }]} />
                <Text style={styles.companionName}>MIRA</Text>
              </View>
            )}
            {state.companions.cain.present && state.companions.cain.alive && (
              <View style={[styles.companionTag, { borderColor: 'rgba(230,126,34,0.25)' }]}>
                <View style={[styles.companionDot, { backgroundColor: '#e67e22' }]} />
                <Text style={styles.companionName}>CAIN</Text>
              </View>
            )}
          </View>
        )}
      </View>

      {/* ── Survival warning strip ─────────────────────────────── */}
      {!isEndingNode && !isHallucination && !isCompanionEvent && (
        <SurvivalWarningStrip warnings={survivalWarnings} />
      )}

      {/* ── Choices glass panel ────────────────────────────────── */}
      <View style={[
        styles.choicesPanel,
        isDesktopView && styles.desktopChoicesPanel,
        isHallucination && styles.hallucinationChoicesPanel,
        isCompanionEvent && { backgroundColor: currentNode.speaker === 'Cain' ? 'rgba(40,20,0,0.92)' : 'rgba(25,10,35,0.92)' },
      ]}>
        <View style={[
          styles.choicesTopAccent,
          isHallucination && styles.hallucinationTopAccent,
          isCompanionEvent && { backgroundColor: currentNode.speaker === 'Cain' ? 'rgba(230,126,34,0.45)' : 'rgba(155,89,182,0.35)' },
        ]} />

        {isTerminalNode && (
          <View style={styles.terminalNode}>
            <View style={styles.terminalDivider}>
              <View style={styles.terminalLine} />
              <Feather name="bookmark" size={12} color="#6a5e70" />
              <View style={styles.terminalLine} />
            </View>
            <Text style={styles.terminalText}>
              The story continues…
            </Text>
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
                hotkeyIndex={isDesktopView ? index + 1 : undefined}
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
    <>
      <BackgroundPanel
        imageKey={currentNode.imageKey}
        sceneKey={currentNode.id}
        overlayOpacity={isHallucination ? 0.88 : isCompanionEvent ? 0.84 : 0.78}
        fadeDuration={isHallucination ? 600 : isCompanionEvent ? 500 : 420}
      >
        <View style={[styles.container, isDesktop && styles.desktopContainer]}>
          {isDesktop ? (
            <View style={styles.desktopLayout}>
              {/* Left persistent desktop sidebar HUD */}
              <View style={styles.desktopSidebar}>
                <DesktopSidebarHUD />
              </View>

              {/* Centered story / choices column */}
              <View style={styles.desktopStoryColumn}>
                <ScrollView
                  style={styles.scroll}
                  contentContainerStyle={[
                    styles.scrollContent,
                    styles.desktopScrollContent,
                    { paddingBottom: botPad + 30 },
                  ]}
                  showsVerticalScrollIndicator={false}
                  keyboardShouldPersistTaps="handled"
                  overScrollMode="auto"
                >
                  {renderStoryColumn(true)}
                </ScrollView>
              </View>
            </View>
          ) : (
            <>
              <View style={{ paddingTop: topPad }}>
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
              </View>

              <ScrollView
                style={styles.scroll}
                contentContainerStyle={[styles.scrollContent, { paddingBottom: botPad + 20 }]}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                overScrollMode="auto"
              >
                {renderStoryColumn(false)}
              </ScrollView>
            </>
          )}
        </View>

        {showBanner && <ChapterBanner key={currentNode.chapter} chapter={currentNode.chapter} />}
      </BackgroundPanel>

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
    borderWidth: 1,
    borderColor: 'rgba(155,89,182,0.2)',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 10,
  },
  corruptionVal: {
    fontSize: 10,
    color: '#9b59b6',
    fontFamily: 'Inter_600SemiBold',
  },
  navRow: {
    flexDirection: 'row',
    gap: 2,
  },
  navIcon: {
    padding: 5,
  },
});

const warnStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 18,
    paddingVertical: 6,
    gap: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    paddingLeft: 9,
    paddingVertical: 4,
    borderLeftWidth: 2,
    borderLeftColor: '#e74c3c',
    backgroundColor: 'rgba(10,5,20,0.55)',
    borderRadius: 2,
  },
  text: {
    fontSize: 11,
    fontFamily: 'Inter_500Medium',
    letterSpacing: 0.3,
    flexShrink: 1,
  },
});

const bannerStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(4,2,12,0.65)',
    zIndex: 50,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingHorizontal: 32,
  },
  accentLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(155,89,182,0.4)',
  },
  chapterLabel: {
    fontSize: 11,
    letterSpacing: 6,
    color: '#9b59b6',
    fontFamily: 'Inter_600SemiBold',
  },
});

const styles = StyleSheet.create({
  container: { flex: 1 },
  desktopContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  desktopLayout: {
    flexDirection: 'row',
    width: '100%',
    maxWidth: 1240,
    height: '100%',
    paddingHorizontal: 24,
    paddingVertical: 18,
    gap: 24,
    alignSelf: 'center',
  },
  desktopSidebar: {
    width: 320,
    height: '100%',
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(155, 89, 182, 0.25)',
    backgroundColor: 'rgba(12, 10, 20, 0.9)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
  },
  desktopStoryColumn: {
    flex: 1,
    height: '100%',
    maxWidth: 860,
  },
  desktopScrollContent: {
    gap: 16,
    paddingTop: 8,
  },
  desktopStorySection: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(155, 89, 182, 0.22)',
    backgroundColor: 'rgba(14, 12, 24, 0.92)',
    paddingHorizontal: 36,
    paddingTop: 32,
    paddingBottom: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
  },
  desktopNodeTitle: {
    fontSize: 23,
    lineHeight: 30,
  },
  desktopChoicesPanel: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(155, 89, 182, 0.22)',
    backgroundColor: 'rgba(14, 12, 24, 0.94)',
    paddingHorizontal: 28,
    paddingVertical: 22,
    marginTop: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
  },

  errorState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  errorText: { color: '#8e1c1c', fontSize: 14, fontFamily: 'Inter_400Regular' },
  errorLink: { color: '#9b59b6', fontSize: 14, fontFamily: 'Inter_500Medium' },

  scroll: { flex: 1 },
  scrollContent: { flexGrow: 1 },

  // ── Story ────────────────────────────────────────────────────────────────

  storySection: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 22,
  },
  hallucinationSection: {
    backgroundColor: 'rgba(30,0,50,0.25)',
  },
  breadcrumb: {
    fontSize: 9,
    letterSpacing: 2.5,
    color: '#4a4058',
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 14,
    textTransform: 'uppercase',
  },
  hallucinationBreadcrumb: {
    color: 'rgba(195,155,211,0.5)',
    letterSpacing: 3,
  },
  nodeTitle: {
    fontSize: 26,
    color: '#ede0c4',
    fontFamily: 'Inter_700Bold',
    lineHeight: 34,
    letterSpacing: 0.3,
    marginBottom: 20,
  },
  hallucinationTitle: {
    color: '#c39bd3',
    letterSpacing: 0.8,
  },
  speakerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
  },
  speakerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(155,89,182,0.14)',
  },
  speakerText: {
    fontSize: 10,
    color: '#9b59b6',
    fontFamily: 'Inter_600SemiBold',
    letterSpacing: 2.5,
    textTransform: 'uppercase',
  },
  narration: {
    fontSize: 16.5,
    color: '#c4a880',
    lineHeight: 28,
    fontFamily: 'Inter_400Regular',
    marginBottom: 16,
    letterSpacing: 0.15,
  },
  hallucinationNarration: {
    color: '#d4b8e0',
    fontStyle: 'italic',
    lineHeight: 29,
    letterSpacing: 0.2,
  },
  dialogueBox: {
    backgroundColor: 'rgba(155,89,182,0.06)',
    borderLeftWidth: 2.5,
    borderLeftColor: 'rgba(155,89,182,0.35)',
    paddingLeft: 18,
    paddingRight: 14,
    paddingTop: 16,
    paddingBottom: 14,
    marginBottom: 16,
    borderRadius: 2,
    position: 'relative',
  },
  hallucinationDialogueBox: {
    backgroundColor: 'rgba(155,89,182,0.12)',
    borderLeftColor: 'rgba(195,155,211,0.5)',
  },
  dialogueOpenQuote: {
    fontSize: 40,
    color: 'rgba(155,89,182,0.22)',
    fontFamily: 'Inter_700Bold',
    lineHeight: 32,
    marginBottom: 4,
  },
  dialogue: {
    fontSize: 15.5,
    color: '#e8d5b0',
    lineHeight: 25,
    fontFamily: 'Inter_400Regular',
    fontStyle: 'italic',
    letterSpacing: 0.1,
  },
  hallucinationDialogue: {
    color: '#e0c8f0',
    letterSpacing: 0.3,
  },
  companionStrip: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 10,
  },
  companionTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(10,6,20,0.8)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
  },
  companionDot: { width: 5, height: 5, borderRadius: 3 },
  companionName: {
    fontSize: 10,
    color: '#7a6e80',
    fontFamily: 'Inter_600SemiBold',
    letterSpacing: 1.5,
  },

  // ── Choices panel ────────────────────────────────────────────────────────

  choicesPanel: {
    backgroundColor: 'rgba(5,3,14,0.96)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(155,89,182,0.12)',
    paddingHorizontal: 16,
    paddingBottom: 4,
  },
  hallucinationChoicesPanel: {
    backgroundColor: 'rgba(15,5,30,0.97)',
    borderTopColor: 'rgba(195,155,211,0.2)',
  },
  choicesTopAccent: {
    height: 1.5,
    backgroundColor: 'rgba(155,89,182,0.2)',
    marginBottom: 12,
  },
  hallucinationTopAccent: {
    backgroundColor: 'rgba(195,155,211,0.35)',
  },
  noChoices: {
    color: '#4a4058',
    fontSize: 13,
    fontFamily: 'Inter_400Regular',
    fontStyle: 'italic',
    textAlign: 'center',
    paddingVertical: 12,
  },
  terminalNode: {
    alignItems: 'center',
    paddingVertical: 16,
    gap: 14,
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
    backgroundColor: 'rgba(42,42,58,0.6)',
  },
  terminalText: {
    fontSize: 12,
    color: '#5a5068',
    fontFamily: 'Inter_400Regular',
    fontStyle: 'italic',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  returnBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: 'rgba(155,89,182,0.35)',
    borderRadius: 3,
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: 'rgba(155,89,182,0.06)',
  },
  returnBtnText: {
    fontSize: 11,
    letterSpacing: 2.5,
    color: '#9b59b6',
    fontFamily: 'Inter_600SemiBold',
  },
  menuBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    gap: 5,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginTop: 4,
    marginBottom: 2,
  },
  menuBtnText: {
    fontSize: 9,
    letterSpacing: 2,
    color: '#3a3048',
    fontFamily: 'Inter_600SemiBold',
  },
});
