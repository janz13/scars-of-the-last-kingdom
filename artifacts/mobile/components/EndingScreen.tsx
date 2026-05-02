import React from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { useGame } from '../context/GameContext';
import { getEndingById, ENDINGS } from '../data/endings';

const CHAPTER_END_DATA = {
  id: 'chapter1_end',
  title: 'End of Chapter 1',
  type: 'savior' as const,
  subtitle: 'The Descent Awaits',
  description: 'The Archive door has opened. What lies beyond will change everything. The mark on your wrist is silent for the first time since the blackout — not because it stopped listening. Because it got what it wanted.\n\nChapter 2: The Descent — coming soon.',
  color: '#9b59b6',
};

export default function EndingScreen() {
  const { state, setScreen, deleteAndReset } = useGame();
  const insets = useSafeAreaInsets();
  const { activeEnding, endingsDiscovered, routeHistory } = state;

  const topPad = Platform.OS === 'web' ? 67 : insets.top;
  const botPad = Platform.OS === 'web' ? 34 : insets.bottom;

  const ending = activeEnding === 'chapter1_end'
    ? CHAPTER_END_DATA
    : activeEnding
      ? getEndingById(activeEnding)
      : null;

  const isDeath = ending?.type === 'death';
  const isChapterEnd = activeEnding === 'chapter1_end';

  const bgColors = isDeath
    ? ['#0a0404', '#140808', '#0a0404']
    : isChapterEnd
      ? ['#0a0814', '#14102a', '#0a0814']
      : ['#0a0a0f', '#14101e', '#0a0a0f'];

  return (
    <LinearGradient colors={bgColors} style={styles.container}>
      <ScrollView contentContainerStyle={[styles.content, { paddingTop: topPad + 30, paddingBottom: botPad + 30 }]}>
        <View style={styles.topDecoration}>
          <View style={[styles.decorLine, { backgroundColor: ending?.color ?? '#9b59b6' }]} />
          <Feather
            name={isDeath ? 'x-circle' : isChapterEnd ? 'book-open' : 'alert-circle'}
            size={32}
            color={ending?.color ?? '#9b59b6'}
          />
          <View style={[styles.decorLine, { backgroundColor: ending?.color ?? '#9b59b6' }]} />
        </View>

        <Text style={[styles.endingType, { color: ending?.color ?? '#9b59b6' }]}>
          {ending?.subtitle?.toUpperCase() ?? 'ENDING'}
        </Text>

        <Text style={styles.endingTitle}>{ending?.title ?? 'Unknown Ending'}</Text>

        <View style={[styles.separator, { backgroundColor: (ending?.color ?? '#9b59b6') + '44' }]} />

        <Text style={styles.endingText}>{ending?.description ?? ''}</Text>

        <View style={styles.stats}>
          <Text style={styles.statsLabel}>CHOICES MADE</Text>
          <Text style={[styles.statsValue, { color: ending?.color ?? '#9b59b6' }]}>{routeHistory.length}</Text>
          <Text style={styles.statsLabel}>ENDINGS DISCOVERED</Text>
          <Text style={[styles.statsValue, { color: ending?.color ?? '#9b59b6' }]}>{endingsDiscovered.length} / {ENDINGS.length + 1}</Text>
        </View>

        <View style={styles.buttons}>
          {isDeath && (
            <Pressable
              style={[styles.btn, { borderColor: ending?.color ?? '#8e1c1c' }]}
              onPress={() => deleteAndReset()}
            >
              <Text style={[styles.btnText, { color: ending?.color ?? '#8e1c1c' }]}>NEW GAME</Text>
            </Pressable>
          )}

          {!isDeath && (
            <Pressable
              style={[styles.btn, { borderColor: ending?.color ?? '#9b59b6' }]}
              onPress={() => deleteAndReset()}
            >
              <Text style={[styles.btnText, { color: ending?.color ?? '#9b59b6' }]}>PLAY AGAIN</Text>
            </Pressable>
          )}

          <Pressable
            style={[styles.btn, { borderColor: '#2a2a3a', marginTop: 8 }]}
            onPress={() => setScreen('mainMenu')}
          >
            <Text style={[styles.btnText, { color: '#8a7d6e' }]}>MAIN MENU</Text>
          </Pressable>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  topDecoration: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 24,
  },
  decorLine: {
    height: 1,
    flex: 1,
    opacity: 0.5,
  },
  endingType: {
    fontSize: 10,
    letterSpacing: 4,
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 10,
  },
  endingTitle: {
    fontSize: 28,
    color: '#d4c5a9',
    fontFamily: 'Inter_700Bold',
    textAlign: 'center',
    marginBottom: 20,
    letterSpacing: 1,
  },
  separator: {
    height: 1,
    width: 80,
    marginBottom: 24,
  },
  endingText: {
    fontSize: 15,
    color: '#a09080',
    lineHeight: 24,
    textAlign: 'center',
    fontFamily: 'Inter_400Regular',
    fontStyle: 'italic',
    marginBottom: 32,
  },
  stats: {
    backgroundColor: '#12121a',
    borderRadius: 4,
    padding: 16,
    width: '100%',
    marginBottom: 32,
    gap: 4,
    alignItems: 'center',
  },
  statsLabel: {
    fontSize: 9,
    letterSpacing: 2,
    color: '#4a4050',
    fontFamily: 'Inter_600SemiBold',
    marginTop: 8,
  },
  statsValue: {
    fontSize: 24,
    fontFamily: 'Inter_700Bold',
  },
  buttons: { width: '100%' },
  btn: {
    borderWidth: 1,
    borderRadius: 4,
    padding: 16,
    alignItems: 'center',
  },
  btnText: {
    fontSize: 12,
    letterSpacing: 3,
    fontFamily: 'Inter_600SemiBold',
  },
});
