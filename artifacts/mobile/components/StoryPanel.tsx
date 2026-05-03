import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { useGame } from '../context/GameContext';
import BackgroundPanel from './BackgroundPanel';
import ChoiceButton from './ChoiceButton';
import DiceRollOverlay from './DiceRollOverlay';

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
    pendingDiceRoll, initiateDiceRoll, commitDiceRoll,
  } = useGame();
  const insets = useSafeAreaInsets();

  const topPad = Platform.OS === 'web' ? 67 : insets.top;
  const botPad = Platform.OS === 'web' ? 34 : insets.bottom;

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

  return (
    <>
      <BackgroundPanel
        imageKey={currentNode.imageKey}
        sceneKey={currentNode.id}
        overlayOpacity={0.78}
        fadeDuration={420}
      >
        <View style={styles.container}>
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
            {/* ── Story section ─────────────────────────────────────── */}
            <View style={styles.storySection}>
              <Text style={styles.breadcrumb}>
                {currentNode.chapter.toUpperCase()}
                {'  ›  '}
                {currentNode.location.toUpperCase()}
              </Text>

              <Animated.View style={{ opacity: titleFade, transform: [{ translateY: titleSlide }] }}>
                <Text style={styles.nodeTitle}>{currentNode.title}</Text>
              </Animated.View>

              {currentNode.speaker && (
                <View style={styles.speakerBadge}>
                  <View style={styles.speakerLine} />
                  <Text style={styles.speakerText}>{currentNode.speaker}</Text>
                  <View style={styles.speakerLine} />
                </View>
              )}

              <Text style={styles.narration}>{currentNode.text}</Text>

              {currentNode.dialogue && (
                <View style={styles.dialogueBox}>
                  <Text style={styles.dialogueOpenQuote}>{'\u201C'}</Text>
                  <Text style={styles.dialogue}>{currentNode.dialogue}</Text>
                </View>
              )}

              {(state.companions.mira.present && state.companions.mira.alive ||
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

            {/* ── Choices glass panel ────────────────────────────────── */}
            <View style={styles.choicesPanel}>
              <View style={styles.choicesTopAccent} />

              {isTerminalNode && (
                <View style={styles.terminalNode}>
                  <View style={styles.terminalDivider}>
                    <View style={styles.terminalLine} />
                    <Feather name="bookmark" size={12} color="#6a5e70" />
                    <View style={styles.terminalLine} />
                  </View>
                  <Text style={styles.terminalText}>
                    To be continued — Chapter 2: The Descent
                  </Text>
                  <Pressable style={styles.returnBtn} onPress={() => setScreen('mainMenu')}>
                    <Text style={styles.returnBtnText}>RETURN TO MAIN MENU</Text>
                    <Feather name="arrow-right" size={12} color="#9b59b6" />
                  </Pressable>
                </View>
              )}

              {!isTerminalNode && !isEndingNode && (
                <>
                  {availableChoices.map(({ choice, met, reasons }) => (
                    <ChoiceButton
                      key={choice.id}
                      choiceId={choice.id}
                      text={choice.text}
                      met={met}
                      reasons={reasons}
                      flavorText={choice.flavorText}
                      diceCheck={choice.diceCheck}
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

              <Pressable style={styles.menuBtn} onPress={() => setScreen('settings')}>
                <Feather name="menu" size={11} color="#3a3048" />
                <Text style={styles.menuBtnText}>MENU</Text>
              </Pressable>
            </View>
          </ScrollView>
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
    paddingHorizontal: 22,
    paddingTop: 26,
    paddingBottom: 20,
  },
  breadcrumb: {
    fontSize: 9,
    letterSpacing: 2.5,
    color: '#4a4058',
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 14,
    textTransform: 'uppercase',
  },
  nodeTitle: {
    fontSize: 26,
    color: '#ede0c4',
    fontFamily: 'Inter_700Bold',
    lineHeight: 34,
    letterSpacing: 0.3,
    marginBottom: 20,
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
    fontSize: 16,
    color: '#c4a880',
    lineHeight: 27,
    fontFamily: 'Inter_400Regular',
    marginBottom: 16,
  },
  dialogueBox: {
    backgroundColor: 'rgba(155,89,182,0.06)',
    borderLeftWidth: 2,
    borderLeftColor: 'rgba(155,89,182,0.32)',
    paddingLeft: 16,
    paddingRight: 12,
    paddingTop: 14,
    paddingBottom: 12,
    marginBottom: 16,
    borderRadius: 2,
    position: 'relative',
  },
  dialogueOpenQuote: {
    fontSize: 40,
    color: 'rgba(155,89,182,0.22)',
    fontFamily: 'Inter_700Bold',
    lineHeight: 32,
    marginBottom: 4,
  },
  dialogue: {
    fontSize: 15,
    color: '#e8d5b0',
    lineHeight: 24,
    fontFamily: 'Inter_400Regular',
    fontStyle: 'italic',
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
    backgroundColor: 'rgba(5,3,14,0.95)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(155,89,182,0.1)',
    paddingHorizontal: 14,
    paddingBottom: 4,
  },
  choicesTopAccent: {
    height: 1.5,
    backgroundColor: 'rgba(155,89,182,0.2)',
    marginBottom: 12,
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
