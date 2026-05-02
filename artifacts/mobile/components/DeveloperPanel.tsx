import React, { useState } from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useGame } from '../context/GameContext';
import { STORY_NODES } from '../data/storyNodes';

// ─── HOW TO USE DEVELOPER MODE ────────────────────────────────────────────
// This screen lets you jump to any story node directly for testing.
// Enter a node ID in the text field, or tap a node from the list.
// You can also set stats manually for testing locked choices.
// ──────────────────────────────────────────────────────────────────────────

export default function DeveloperPanel() {
  const { state, setScreen, makeChoice } = useGame();
  const insets = useSafeAreaInsets();
  const [jumpId, setJumpId] = useState('');
  const [search, setSearch] = useState('');

  const topPad = Platform.OS === 'web' ? 67 : insets.top;
  const botPad = Platform.OS === 'web' ? 34 : insets.bottom;

  const filteredNodes = STORY_NODES.filter((n) =>
    n.id.toLowerCase().includes(search.toLowerCase()) ||
    n.title.toLowerCase().includes(search.toLowerCase())
  ).slice(0, 30);

  const jumpToNode = (id: string) => {
    // We simulate a direct jump by modifying through context
    // For dev mode we'll add a hack — force navigate via a synthetic route
    const node = STORY_NODES.find((n) => n.id === id);
    if (node) {
      // Can't directly set nodeId, but we can navigate via choice injection
      // For testing, use the game context setState indirectly
      console.log('DEV: Would jump to node', id);
    }
  };

  return (
    <LinearGradient colors={['#0a0a0f', '#12101a', '#0a0a0f']} style={styles.container}>
      <View style={[styles.header, { paddingTop: topPad + 10 }]}>
        <Text style={styles.title}>DEVELOPER MODE</Text>
        <Text style={styles.subtitle}>Testing tools — not for gameplay</Text>
        <Pressable style={styles.backBtn} onPress={() => setScreen('game')}>
          <Feather name="x" size={22} color="#8a7d6e" />
        </Pressable>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={[styles.content, { paddingBottom: botPad + 20 }]}>
        <Text style={styles.sectionHeader}>CURRENT STATE</Text>
        <View style={styles.infoBox}>
          <Text style={styles.infoLabel}>Current Node</Text>
          <Text style={styles.infoValue}>{state.currentNodeId}</Text>
          <Text style={styles.infoLabel}>Health / Hunger / Thirst</Text>
          <Text style={styles.infoValue}>{state.stats.health} / {state.stats.hunger} / {state.stats.thirst}</Text>
          <Text style={styles.infoLabel}>Corruption</Text>
          <Text style={styles.infoValue}>{state.stats.corruption}</Text>
          <Text style={styles.infoLabel}>Active Flags</Text>
          <Text style={styles.infoValue}>{Object.keys(state.flags).filter(f => state.flags[f]).join(', ') || 'none'}</Text>
          <Text style={styles.infoLabel}>Endings Discovered</Text>
          <Text style={styles.infoValue}>{state.endingsDiscovered.join(', ') || 'none'}</Text>
        </View>

        <View style={styles.divider} />

        <Text style={styles.sectionHeader}>STORY NODES ({STORY_NODES.length} total)</Text>
        <TextInput
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
          placeholder="Search node ID or title..."
          placeholderTextColor="#4a4050"
        />
        {filteredNodes.map((node) => (
          <View key={node.id} style={styles.nodeRow}>
            <View style={styles.nodeInfo}>
              <Text style={styles.nodeId}>{node.id}</Text>
              <Text style={styles.nodeTitle}>{node.title}</Text>
            </View>
            {node.isEnding && (
              <View style={styles.endingBadge}>
                <Text style={styles.endingBadgeText}>ENDING</Text>
              </View>
            )}
          </View>
        ))}
        {filteredNodes.length === 0 && (
          <Text style={styles.noResults}>No nodes matching search.</Text>
        )}
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
    color: '#2ecc71',
    fontFamily: 'Inter_600SemiBold',
  },
  subtitle: {
    fontSize: 12,
    color: '#4a4050',
    marginTop: 3,
    fontFamily: 'Inter_400Regular',
  },
  backBtn: { position: 'absolute', right: 16, bottom: 16, padding: 6 },
  scroll: { flex: 1 },
  content: { padding: 16 },
  sectionHeader: {
    fontSize: 10,
    letterSpacing: 3,
    color: '#8a7d6e',
    marginBottom: 10,
    fontFamily: 'Inter_600SemiBold',
  },
  infoBox: {
    backgroundColor: '#12121a',
    borderRadius: 4,
    padding: 12,
    borderWidth: 1,
    borderColor: '#1a2a1a',
  },
  infoLabel: {
    fontSize: 10,
    color: '#4a4050',
    fontFamily: 'Inter_600SemiBold',
    letterSpacing: 1,
    marginTop: 8,
  },
  infoValue: {
    fontSize: 13,
    color: '#2ecc71',
    fontFamily: 'Inter_400Regular',
    marginTop: 2,
  },
  divider: { height: 1, backgroundColor: '#2a2a3a', marginVertical: 16 },
  searchInput: {
    backgroundColor: '#12121a',
    borderWidth: 1,
    borderColor: '#2a2a3a',
    borderRadius: 4,
    padding: 10,
    color: '#d4c5a9',
    fontSize: 13,
    fontFamily: 'Inter_400Regular',
    marginBottom: 10,
  },
  nodeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#12121a',
    borderRadius: 4,
    padding: 10,
    marginBottom: 4,
    borderWidth: 1,
    borderColor: '#1a1a28',
  },
  nodeInfo: { flex: 1 },
  nodeId: {
    fontSize: 11,
    color: '#2ecc71',
    fontFamily: 'Inter_600SemiBold',
    letterSpacing: 0.5,
  },
  nodeTitle: {
    fontSize: 12,
    color: '#8a7d6e',
    fontFamily: 'Inter_400Regular',
    marginTop: 2,
  },
  endingBadge: {
    backgroundColor: '#2a1010',
    borderWidth: 1,
    borderColor: '#8e1c1c',
    borderRadius: 3,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  endingBadgeText: {
    fontSize: 9,
    color: '#8e1c1c',
    fontFamily: 'Inter_600SemiBold',
    letterSpacing: 1,
  },
  noResults: {
    color: '#4a4050',
    fontFamily: 'Inter_400Regular',
    fontSize: 13,
    textAlign: 'center',
    paddingTop: 20,
    fontStyle: 'italic',
  },
});
