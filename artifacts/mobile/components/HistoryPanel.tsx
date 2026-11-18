import React from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useGame } from '../context/GameContext';

export default function HistoryPanel() {
  const { state, setScreen, checkpointMeta, rewindToCheckpoint } = useGame();
  const insets = useSafeAreaInsets();
  const { routeHistory } = state;

  const topPad = Platform.OS === 'web' ? 67 : insets.top;
  const botPad = Platform.OS === 'web' ? 34 : insets.bottom;

  return (
    <LinearGradient colors={['#0a0a0f', '#12101a', '#0a0a0f']} style={styles.container}>
      <View style={[styles.header, { paddingTop: topPad + 10 }]}>
        <Text style={styles.title}>ROUTE HISTORY</Text>
        <Text style={styles.subtitle}>Every choice becomes a scar.</Text>
        <Pressable style={styles.backBtn} onPress={() => setScreen('game')}>
          <Feather name="x" size={22} color="#8a7d6e" />
        </Pressable>
      </View>

      <View style={styles.actionBar}>
        <Pressable style={styles.mapActionBtn} onPress={() => setScreen('map')}>
          <Feather name="git-branch" size={13} color="#1abc9c" />
          <Text style={styles.mapActionText}>OPEN CHAPTER BRANCH MAP [M]</Text>
        </Pressable>
        {checkpointMeta && (
          <Pressable
            style={styles.rewindActionBtn}
            onPress={() => {
              void rewindToCheckpoint();
            }}
          >
            <Feather name="rotate-ccw" size={13} color="#e67e22" />
            <Text style={styles.rewindActionText}>REWIND TO CHECKPOINT ({checkpointMeta.label})</Text>
          </Pressable>
        )}
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={[styles.content, { paddingBottom: botPad + 20 }]}>
        {routeHistory.length === 0 && (
          <View style={styles.empty}>
            <Feather name="map" size={32} color="#2a2a3a" />
            <Text style={styles.emptyText}>No choices made yet.</Text>
          </View>
        )}
        {[...routeHistory].reverse().map((entry, i) => (
          <View key={i} style={styles.entry}>
            <View style={styles.entryLine} />
            <View style={styles.entryContent}>
              <Text style={styles.entryNode}>{entry.nodeTitle}</Text>
              <Text style={styles.entryChoice}>{entry.choiceText}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a3a',
    position: 'relative',
  },
  title: {
    fontSize: 12,
    letterSpacing: 3,
    color: '#8a7d6e',
    fontFamily: 'Inter_600SemiBold',
  },
  subtitle: {
    fontSize: 13,
    color: '#8a7d6e',
    marginTop: 4,
    fontFamily: 'Inter_400Regular',
    fontStyle: 'italic',
  },
  backBtn: { position: 'absolute', right: 16, bottom: 16, padding: 6 },
  actionBar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 4,
  },
  mapActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(26,188,156,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(26,188,156,0.4)',
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  mapActionText: {
    fontSize: 10,
    letterSpacing: 1.4,
    color: '#1abc9c',
    fontFamily: 'Inter_600SemiBold',
  },
  rewindActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(230,126,34,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(230,126,34,0.45)',
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  rewindActionText: {
    fontSize: 10,
    letterSpacing: 1.1,
    color: '#e67e22',
    fontFamily: 'Inter_600SemiBold',
  },
  scroll: { flex: 1 },
  content: { padding: 16 },
  empty: {
    alignItems: 'center',
    paddingTop: 60,
    gap: 12,
  },
  emptyText: {
    color: '#4a4050',
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    fontStyle: 'italic',
  },
  entry: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  entryLine: {
    width: 2,
    backgroundColor: '#2a2a3a',
    marginRight: 14,
    marginLeft: 8,
    borderRadius: 1,
    marginVertical: 2,
  },
  entryContent: {
    flex: 1,
    backgroundColor: '#1a1a28',
    borderRadius: 4,
    padding: 12,
    marginBottom: 4,
  },
  entryNode: {
    fontSize: 11,
    color: '#9b59b6',
    fontFamily: 'Inter_600SemiBold',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  entryChoice: {
    fontSize: 13,
    color: '#b8a99a',
    fontFamily: 'Inter_400Regular',
    lineHeight: 18,
  },
});
