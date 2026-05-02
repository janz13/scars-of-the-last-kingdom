import React from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useGame } from '../context/GameContext';
import { useColors } from '../hooks/useColors';

interface StatRowProps {
  label: string;
  value: number;
  max?: number;
  color?: string;
  showBar?: boolean;
}

function StatRow({ label, value, max = 100, color = '#9b59b6', showBar = false }: StatRowProps) {
  const pct = Math.max(0, Math.min(1, value / max));
  return (
    <View style={styles.statRow}>
      <Text style={styles.statLabel}>{label}</Text>
      <View style={styles.statRight}>
        {showBar && (
          <View style={styles.barTrack}>
            <View style={[styles.barFill, { width: `${pct * 100}%` as any, backgroundColor: color }]} />
          </View>
        )}
        <Text style={[styles.statValue, { color }]}>{value}</Text>
      </View>
    </View>
  );
}

export default function StatsPanel() {
  const { state, setScreen } = useGame();
  const insets = useSafeAreaInsets();
  const { stats, character } = state;

  const topPad = Platform.OS === 'web' ? 67 : insets.top;
  const botPad = Platform.OS === 'web' ? 34 : insets.bottom;

  return (
    <LinearGradient colors={['#0a0a0f', '#12101a', '#0a0a0f']} style={styles.container}>
      <View style={[styles.header, { paddingTop: topPad + 10 }]}>
        <Text style={styles.title}>CHARACTER STATS</Text>
        {character && (
          <Text style={styles.subtitle}>{character.name} — {character.characterClass.replace('_', ' ').toUpperCase()}</Text>
        )}
        <Pressable style={styles.backBtn} onPress={() => setScreen('game')}>
          <Feather name="x" size={22} color="#8a7d6e" />
        </Pressable>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={[styles.content, { paddingBottom: botPad + 20 }]}>
        <Text style={styles.sectionHeader}>SURVIVAL</Text>
        <StatRow label="Health" value={stats.health} max={stats.maxHealth} color="#e74c3c" showBar />
        <StatRow label="Hunger" value={stats.hunger} max={100} color="#e67e22" showBar />
        <StatRow label="Thirst" value={stats.thirst} max={100} color="#3498db" showBar />
        <StatRow label="Morale" value={stats.morale} max={100} color="#9b59b6" showBar />

        <View style={styles.divider} />

        <Text style={styles.sectionHeader}>ATTRIBUTES</Text>
        <StatRow label="Strength" value={stats.strength} max={10} color="#e74c3c" />
        <StatRow label="Intelligence" value={stats.intelligence} max={10} color="#3498db" />
        <StatRow label="Agility" value={stats.agility} max={10} color="#2ecc71" />
        <StatRow label="Charisma" value={stats.charisma} max={10} color="#f1c40f" />
        <StatRow label="Luck" value={stats.luck} max={10} color="#e67e22" />

        <View style={styles.divider} />

        <Text style={styles.sectionHeader}>CORRUPTION</Text>
        <StatRow label="Corruption" value={stats.corruption} max={100} color="#7d3c98" showBar />
        {stats.corruption >= 5 && (
          <Text style={styles.warning}>The mark listens more closely now.</Text>
        )}
        {stats.corruption >= 8 && (
          <Text style={[styles.warning, { color: '#c0392b' }]}>The boundary is thinning.</Text>
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
    color: '#9b59b6',
    fontFamily: 'Inter_600SemiBold',
  },
  subtitle: {
    fontSize: 14,
    color: '#d4c5a9',
    marginTop: 4,
    fontFamily: 'Inter_500Medium',
  },
  backBtn: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    padding: 6,
  },
  scroll: { flex: 1 },
  content: { padding: 20 },
  sectionHeader: {
    fontSize: 10,
    letterSpacing: 3,
    color: '#8a7d6e',
    marginBottom: 12,
    marginTop: 4,
    fontFamily: 'Inter_600SemiBold',
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  statLabel: {
    fontSize: 13,
    color: '#b8a99a',
    fontFamily: 'Inter_400Regular',
    width: 110,
  },
  statRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
    justifyContent: 'flex-end',
  },
  barTrack: {
    height: 4,
    backgroundColor: '#1a1a28',
    borderRadius: 2,
    flex: 1,
    maxWidth: 120,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 2,
  },
  statValue: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    width: 30,
    textAlign: 'right',
  },
  divider: { height: 1, backgroundColor: '#2a2a3a', marginVertical: 16 },
  warning: {
    fontSize: 12,
    color: '#7d3c98',
    fontFamily: 'Inter_400Regular',
    fontStyle: 'italic',
    marginTop: 4,
  },
});
