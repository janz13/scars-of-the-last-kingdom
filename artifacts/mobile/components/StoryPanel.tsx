import React, { useEffect, useRef } from 'react';
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

function StatBar({
  health, maxHealth, hunger, thirst, morale, corruption,
  onStats, onInventory, onCompanions, onFactions, onHistory,
}: {
  health: number; maxHealth: number; hunger: number; thirst: number;
  morale: number; corruption: number;
  onStats: () => void; onInventory: () => void; onCompanions: () => void;
  onFactions: () => void; onHistory: () => void;
}) {
  const healthPct = Math.max(0, health / maxHealth);
  const hungerPct = Math.max(0, hunger / 100);
  const thirstPct = Math.max(0, thirst / 100);
  const moralePct = Math.max(0, morale / 100);

  return (
    <View style={barStyles.container}>
      <View style={barStyles.statsRow}>
        <Pressable onPress={onStats} style={barStyles.statItem}>
          <Feather name="heart" size={11} color="#e74c3c" />
          <View style={barStyles.miniBar}>
            <View style={[barStyles.miniFill, { width: `${healthPct * 100}%` as any, backgroundColor: '#e74c3c' }]} />
          </View>
        </Pressable>
        <Pressable onPress={onStats} style={barStyles.statItem}>
          <Feather name="coffee" size={11} color="#e67e22" />
          <View style={barStyles.miniBar}>
            <View style={[barStyles.miniFill, { width: `${hungerPct * 100}%` as any, backgroundColor: '#e67e22' }]} />
          </View>
        </Pressable>
        <Pressable onPress={onStats} style={barStyles.statItem}>
          <Feather name="droplet" size={11} color="#3498db" />
          <View style={barStyles.miniBar}>
            <View style={[barStyles.miniFill, { width: `${thirstPct * 100}%` as any, backgroundColor: '#3498db' }]} />
          </View>
        </Pressable>
        <Pressable onPress={onStats} style={barStyles.statItem}>
          <Feather name="sun" size={11} color="#9b59b6" />
          <View style={barStyles.miniBar}>
            <View style={[barStyles.miniFill, { width: `${moralePct * 100}%` as any, backgroundColor: '#9b59b6' }]} />
          </View>
        </Pressable>
        {corruption > 0 && (
          <View style={barStyles.corruptionBadge}>
            <Feather name="zap" size={10} color="#7d3c98" />
            <Text style={barStyles.corruptionText}>{corruption}</Text>
          </View>
        )}
      </View>

      <View style={barStyles.navRow}>
        <Pressable onPress={onInventory} style={barStyles.navBtn}>
          <Feather name="package" size={14} color="#8a7d6e" />
        </Pressable>
        <Pressable onPress={onCompanions} style={barStyles.navBtn}>
          <Feather name="users" size={14} color="#8a7d6e" />
        </Pressable>
        <Pressable onPress={onFactions} style={barStyles.navBtn}>
          <Feather name="flag" size={14} color="#8a7d6e" />
        </Pressable>
        <Pressable onPress={onHistory} style={barStyles.navBtn}>
          <Feather name="book-open" size={14} color="#8a7d6e" />
        </Pressable>
      </View>
    </View>
  );
}

export default function StoryPanel() {
  const { state, currentNode, availableChoices, makeChoice, setScreen } = useGame();
  const insets = useSafeAreaInsets();

  const topPad = Platform.OS === 'web' ? 67 : insets.top;
  const botPad = Platform.OS === 'web' ? 34 : insets.bottom;

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
    <BackgroundPanel
      imageKey={currentNode.imageKey}
      sceneKey={currentNode.id}
      overlayOpacity={0.72}
      fadeDuration={380}
    >
      <View style={styles.innerContent}>
        {/* Stats Bar */}
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

        {/* Story Content */}
        <ScrollView
          style={styles.storyScroll}
          contentContainerStyle={styles.storyContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Chapter & Location */}
          <View style={styles.meta}>
            <Text style={styles.chapterText}>{currentNode.chapter}  ·  {currentNode.location}</Text>
          </View>

          {/* Node Title */}
          <Text style={styles.nodeTitle}>{currentNode.title}</Text>

          {/* Speaker */}
          {currentNode.speaker && (
            <View style={styles.speakerBadge}>
              <View style={styles.speakerDot} />
              <Text style={styles.speakerText}>{currentNode.speaker}</Text>
            </View>
          )}

          {/* Narration */}
          <Text style={styles.narration}>{currentNode.text}</Text>

          {/* Dialogue */}
          {currentNode.dialogue && (
            <View style={styles.dialogueBox}>
              <Text style={styles.dialogue}>"{currentNode.dialogue}"</Text>
            </View>
          )}

          {/* Companion status strip */}
          <View style={styles.companionStrip}>
            {state.companions.mira.present && state.companions.mira.alive && (
              <View style={styles.companionTag}>
                <View style={[styles.companionDot, { backgroundColor: '#9b59b6' }]} />
                <Text style={styles.companionName}>Mira</Text>
              </View>
            )}
            {state.companions.cain.present && state.companions.cain.alive && (
              <View style={styles.companionTag}>
                <View style={[styles.companionDot, { backgroundColor: '#e67e22' }]} />
                <Text style={styles.companionName}>Cain</Text>
              </View>
            )}
          </View>
        </ScrollView>

        {/* Choices */}
        <View style={[styles.choicesContainer, { paddingBottom: botPad + 8 }]}>
          <View style={styles.choicesDivider} />

          {isTerminalNode && (
            <View style={styles.terminalNode}>
              <Text style={styles.terminalText}>~ To be continued — Chapter 2: The Descent ~</Text>
              <Pressable style={styles.returnBtn} onPress={() => setScreen('mainMenu')}>
                <Text style={styles.returnBtnText}>RETURN TO MAIN MENU</Text>
              </Pressable>
            </View>
          )}

          {!isTerminalNode && !isEndingNode && (
            <View>
              {availableChoices.map(({ choice, met, reasons }) => (
                <ChoiceButton
                  key={choice.id}
                  choiceId={choice.id}
                  text={choice.text}
                  met={met}
                  reasons={reasons}
                  flavorText={choice.flavorText}
                  onPress={() => makeChoice(choice.id)}
                />
              ))}
              {availableChoices.length === 0 && (
                <Text style={styles.noChoices}>No available choices. Check your stats and inventory.</Text>
              )}
            </View>
          )}

          {/* Settings / menu button */}
          <Pressable style={styles.settingsBtn} onPress={() => setScreen('settings')}>
            <Feather name="menu" size={14} color="#4a4050" />
          </Pressable>
        </View>
      </View>
    </BackgroundPanel>
  );
}

const barStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(42,42,58,0.5)',
    backgroundColor: 'rgba(4,2,10,0.8)',
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 6,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    flex: 1,
  },
  miniBar: {
    flex: 1,
    height: 3,
    backgroundColor: 'rgba(42,42,58,0.8)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  miniFill: { height: '100%', borderRadius: 2 },
  corruptionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: 'rgba(125,60,152,0.2)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  corruptionText: {
    fontSize: 10,
    color: '#7d3c98',
    fontFamily: 'Inter_600SemiBold',
  },
  navRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 16,
  },
  navBtn: { padding: 2 },
});

const styles = StyleSheet.create({
  container: { flex: 1 },
  innerContent: { flex: 1 },
  errorState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  errorText: { color: '#8e1c1c', fontSize: 14, fontFamily: 'Inter_400Regular' },
  errorLink: { color: '#9b59b6', fontSize: 14, fontFamily: 'Inter_500Medium' },
  storyScroll: { flex: 1 },
  storyContent: {
    padding: 20,
    paddingBottom: 30,
  },
  meta: { marginBottom: 6 },
  chapterText: {
    fontSize: 10,
    letterSpacing: 2,
    color: '#4a4050',
    fontFamily: 'Inter_600SemiBold',
  },
  nodeTitle: {
    fontSize: 22,
    color: '#d4c5a9',
    fontFamily: 'Inter_700Bold',
    marginBottom: 10,
    lineHeight: 28,
  },
  speakerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 10,
  },
  speakerDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#9b59b6',
  },
  speakerText: {
    fontSize: 11,
    color: '#9b59b6',
    fontFamily: 'Inter_600SemiBold',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  narration: {
    fontSize: 15,
    color: '#c0b090',
    lineHeight: 24,
    fontFamily: 'Inter_400Regular',
    marginBottom: 14,
  },
  dialogueBox: {
    borderLeftWidth: 2,
    borderLeftColor: '#9b59b644',
    paddingLeft: 14,
    marginBottom: 14,
    backgroundColor: 'rgba(155,89,182,0.05)',
    paddingVertical: 8,
    borderRadius: 2,
  },
  dialogue: {
    fontSize: 15,
    color: '#d4c5a9',
    lineHeight: 23,
    fontFamily: 'Inter_400Regular',
    fontStyle: 'italic',
  },
  companionStrip: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 4,
  },
  companionTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(20,16,30,0.7)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  companionDot: { width: 5, height: 5, borderRadius: 3 },
  companionName: { fontSize: 11, color: '#8a7d6e', fontFamily: 'Inter_400Regular' },
  choicesContainer: {
    backgroundColor: 'rgba(4,2,10,0.9)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(42,42,58,0.6)',
    paddingHorizontal: 14,
    paddingTop: 8,
    // No maxHeight — choices render flat so all are always tappable on Android.
    // The story ScrollView above shrinks to fit whatever space is left.
  },
  choicesDivider: {
    height: 1,
    backgroundColor: 'rgba(155,89,182,0.15)',
    marginBottom: 8,
  },
  noChoices: {
    color: '#4a4050',
    fontSize: 13,
    fontFamily: 'Inter_400Regular',
    fontStyle: 'italic',
    textAlign: 'center',
    paddingVertical: 10,
  },
  terminalNode: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  terminalText: {
    fontSize: 13,
    color: '#6a5e50',
    fontFamily: 'Inter_400Regular',
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 12,
  },
  returnBtn: {
    borderWidth: 1,
    borderColor: '#9b59b655',
    borderRadius: 4,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  returnBtnText: {
    fontSize: 11,
    letterSpacing: 2,
    color: '#9b59b6',
    fontFamily: 'Inter_600SemiBold',
  },
  settingsBtn: {
    alignSelf: 'center',
    padding: 6,
    marginTop: 4,
  },
});
