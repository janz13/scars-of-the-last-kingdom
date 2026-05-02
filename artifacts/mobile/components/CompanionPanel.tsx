import React from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useGame } from '../context/GameContext';
import { COMPANIONS, getTrustLabel } from '../data/companions';

export default function CompanionPanel() {
  const { state, setScreen } = useGame();
  const insets = useSafeAreaInsets();
  const { companions } = state;

  const topPad = Platform.OS === 'web' ? 67 : insets.top;
  const botPad = Platform.OS === 'web' ? 34 : insets.bottom;

  return (
    <LinearGradient colors={['#0a0a0f', '#12101a', '#0a0a0f']} style={styles.container}>
      <View style={[styles.header, { paddingTop: topPad + 10 }]}>
        <Text style={styles.title}>COMPANIONS</Text>
        <Text style={styles.subtitle}>Trust takes time. Betrayal takes a moment.</Text>
        <Pressable style={styles.backBtn} onPress={() => setScreen('game')}>
          <Feather name="x" size={22} color="#8a7d6e" />
        </Pressable>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={[styles.content, { paddingBottom: botPad + 20 }]}>
        {Object.entries(COMPANIONS).map(([key, def]) => {
          const compState = companions[key as keyof typeof companions];
          const trustLabel = getTrustLabel(key, compState.trust);
          const trustPct = compState.trust / 10;

          return (
            <View key={key} style={[styles.card, { borderTopColor: def.color }]}>
              <View style={styles.cardTop}>
                <View>
                  <Text style={[styles.compName, { color: def.color }]}>{def.name}</Text>
                  <Text style={styles.compTitle}>{def.title}</Text>
                </View>
                <View style={styles.statusBadge}>
                  <View style={[styles.statusDot, {
                    backgroundColor: !compState.alive ? '#8e1c1c' : compState.present ? '#2ecc71' : '#6a5e50'
                  }]} />
                  <Text style={styles.statusText}>
                    {!compState.alive ? 'Gone' : compState.present ? 'Present' : 'Not found'}
                  </Text>
                </View>
              </View>

              <Text style={styles.compDesc}>{def.description}</Text>

              <View style={styles.trustSection}>
                <View style={styles.trustLabelRow}>
                  <Text style={styles.trustKey}>TRUST</Text>
                  <Text style={[styles.trustLabel, { color: def.color }]}>{trustLabel}</Text>
                  <Text style={styles.trustNum}>{compState.trust}/10</Text>
                </View>
                <View style={styles.trustTrack}>
                  <View style={[styles.trustFill, { width: `${trustPct * 100}%` as any, backgroundColor: def.color }]} />
                </View>
              </View>

              {!compState.alive && (
                <Text style={styles.goneText}>Their story ended here. Their choices remain.</Text>
              )}
              {!compState.present && compState.alive && (
                <Text style={styles.notFoundText}>Not yet encountered. Find them in the tunnels.</Text>
              )}
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
    color: '#9b59b6',
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
  content: { padding: 16, gap: 16 },
  card: {
    backgroundColor: '#1a1a28',
    borderRadius: 4,
    borderTopWidth: 3,
    padding: 16,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  compName: {
    fontSize: 18,
    fontFamily: 'Inter_700Bold',
  },
  compTitle: {
    fontSize: 11,
    color: '#8a7d6e',
    marginTop: 2,
    fontFamily: 'Inter_400Regular',
    letterSpacing: 1,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#12121a',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusDot: { width: 6, height: 6, borderRadius: 3 },
  statusText: { fontSize: 11, color: '#8a7d6e', fontFamily: 'Inter_400Regular' },
  compDesc: {
    fontSize: 13,
    color: '#8a7d6e',
    lineHeight: 19,
    fontFamily: 'Inter_400Regular',
    marginBottom: 14,
  },
  trustSection: {},
  trustLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  trustKey: {
    fontSize: 10,
    letterSpacing: 2,
    color: '#6a5e50',
    fontFamily: 'Inter_600SemiBold',
    flex: 1,
  },
  trustLabel: {
    fontSize: 12,
    fontFamily: 'Inter_500Medium',
    marginRight: 8,
  },
  trustNum: { fontSize: 11, color: '#6a5e50', fontFamily: 'Inter_400Regular' },
  trustTrack: {
    height: 4,
    backgroundColor: '#0a0a14',
    borderRadius: 2,
    overflow: 'hidden',
  },
  trustFill: { height: '100%', borderRadius: 2 },
  goneText: {
    fontSize: 12,
    color: '#8e1c1c',
    fontFamily: 'Inter_400Regular',
    fontStyle: 'italic',
    marginTop: 10,
  },
  notFoundText: {
    fontSize: 12,
    color: '#4a4050',
    fontFamily: 'Inter_400Regular',
    fontStyle: 'italic',
    marginTop: 10,
  },
});
