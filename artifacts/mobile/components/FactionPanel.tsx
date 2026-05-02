import React from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useGame } from '../context/GameContext';
import { FACTIONS, getRepLabel } from '../data/factions';
import type { FactionRep } from '../data/types';

export default function FactionPanel() {
  const { state, setScreen } = useGame();
  const insets = useSafeAreaInsets();
  const { factionRep } = state;

  const topPad = Platform.OS === 'web' ? 67 : insets.top;
  const botPad = Platform.OS === 'web' ? 34 : insets.bottom;

  return (
    <LinearGradient colors={['#0a0a0f', '#12101a', '#0a0a0f']} style={styles.container}>
      <View style={[styles.header, { paddingTop: topPad + 10 }]}>
        <Text style={styles.title}>FACTION REPUTATION</Text>
        <Text style={styles.subtitle}>Every faction remembers. Nothing is forgotten.</Text>
        <Pressable style={styles.backBtn} onPress={() => setScreen('game')}>
          <Feather name="x" size={22} color="#8a7d6e" />
        </Pressable>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={[styles.content, { paddingBottom: botPad + 20 }]}>
        {FACTIONS.map((faction) => {
          const rep = factionRep[faction.key as keyof FactionRep];
          const label = getRepLabel(faction, rep);
          const pct = (rep + 100) / 200;
          const barColor = rep < 0 ? '#8e1c1c' : rep === 0 ? '#6a5e50' : faction.color;

          return (
            <View key={faction.id} style={[styles.card, { borderLeftColor: faction.color }]}>
              <View style={styles.cardTop}>
                <View style={styles.cardTitleGroup}>
                  <Text style={[styles.factionName, { color: faction.color }]}>{faction.name}</Text>
                  <Text style={styles.factionSub}>{faction.subtitle}</Text>
                </View>
                <View style={[styles.repBadge, { borderColor: faction.color + '44' }]}>
                  <Text style={[styles.repLabel, { color: faction.color }]}>{label}</Text>
                  <Text style={styles.repNum}>{rep > 0 ? '+' : ''}{rep}</Text>
                </View>
              </View>

              <Text style={styles.factionDesc}>{faction.description}</Text>

              <View style={styles.barTrack}>
                <View style={[styles.barFill, { width: `${pct * 100}%` as any, backgroundColor: barColor }]} />
                <View style={styles.barCenter} />
              </View>
              <View style={styles.barLabels}>
                <Text style={styles.barLabel}>Hostile</Text>
                <Text style={styles.barLabel}>Neutral</Text>
                <Text style={styles.barLabel}>Allied</Text>
              </View>
            </View>
          );
        })}
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
    color: '#e67e22',
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
  scroll: { flex: 1 },
  content: { padding: 16, gap: 12 },
  card: {
    backgroundColor: '#1a1a28',
    borderRadius: 4,
    borderLeftWidth: 3,
    padding: 14,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  cardTitleGroup: { flex: 1, marginRight: 10 },
  factionName: {
    fontSize: 15,
    fontFamily: 'Inter_700Bold',
  },
  factionSub: {
    fontSize: 11,
    color: '#6a5e50',
    marginTop: 2,
    fontFamily: 'Inter_400Regular',
    letterSpacing: 0.5,
  },
  repBadge: {
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: 'center',
  },
  repLabel: {
    fontSize: 11,
    fontFamily: 'Inter_600SemiBold',
  },
  repNum: {
    fontSize: 11,
    color: '#6a5e50',
    fontFamily: 'Inter_400Regular',
    marginTop: 1,
  },
  factionDesc: {
    fontSize: 12,
    color: '#6a5e50',
    lineHeight: 17,
    fontFamily: 'Inter_400Regular',
    marginBottom: 12,
  },
  barTrack: {
    height: 4,
    backgroundColor: '#0a0a14',
    borderRadius: 2,
    overflow: 'hidden',
    position: 'relative',
  },
  barFill: { height: '100%', borderRadius: 2 },
  barCenter: {
    position: 'absolute',
    left: '50%' as any,
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: '#2a2a3a',
  },
  barLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  barLabel: { fontSize: 9, color: '#4a4050', fontFamily: 'Inter_400Regular' },
});
