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
import { LinearGradient } from 'expo-linear-gradient';
import { useGame } from '../context/GameContext';

interface StatBarRowProps {
  label: string;
  value: number;
  max?: number;
  color: string;
  showBar?: boolean;
  delay?: number;
}

function StatBarRow({ label, value, max = 100, color, showBar = false, delay = 0 }: StatBarRowProps) {
  const pct = Math.max(0, Math.min(1, value / max));
  const widthAnim = useRef(new Animated.Value(0)).current;
  const mountAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(mountAnim, { toValue: 1, duration: 300, delay, useNativeDriver: true }),
      Animated.timing(widthAnim, { toValue: pct, duration: 700, delay: delay + 100, useNativeDriver: false }),
    ]).start();
  }, []);

  return (
    <Animated.View style={[styles.statRow, { opacity: mountAnim }]}>
      <Text style={styles.statLabel}>{label}</Text>
      <View style={styles.statRight}>
        {showBar && (
          <View style={styles.barTrack}>
            <Animated.View
              style={[
                styles.barFill,
                {
                  backgroundColor: color,
                  width: widthAnim.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] }),
                },
              ]}
            />
            {pct > 0.02 && (
              <Animated.View
                style={[
                  styles.barGlow,
                  { backgroundColor: color, width: widthAnim.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] }) },
                ]}
              />
            )}
          </View>
        )}
        <Text style={[styles.statValue, { color }]}>
          {showBar ? value : `${value}`}
        </Text>
      </View>
    </Animated.View>
  );
}

function SectionCard({ title, icon, children }: { title: string; icon: string; children: React.ReactNode }) {
  return (
    <View style={styles.sectionCard}>
      <View style={styles.sectionHeader}>
        <Feather name={icon as any} size={12} color="#6a5e70" />
        <Text style={styles.sectionTitle}>{title}</Text>
        <View style={styles.sectionLine} />
      </View>
      {children}
    </View>
  );
}

export default function StatsPanel() {
  const { state, setScreen } = useGame();
  const insets = useSafeAreaInsets();
  const { stats, character } = state;

  const topPad = Platform.OS === 'web' ? 67 : insets.top;
  const botPad = Platform.OS === 'web' ? 34 : insets.bottom;

  const headerFade = useRef(new Animated.Value(0)).current;
  const headerSlide = useRef(new Animated.Value(-16)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(headerFade, { toValue: 1, duration: 400, useNativeDriver: true }),
      Animated.timing(headerSlide, { toValue: 0, duration: 350, useNativeDriver: true }),
    ]).start();
  }, []);

  const className = character?.characterClass.replace(/_/g, ' ').toUpperCase() ?? '';

  return (
    <LinearGradient colors={['#04020a', '#08050f', '#04020a']} style={styles.container}>

      {/* Header */}
      <Animated.View
        style={[
          styles.header,
          { paddingTop: topPad + 14 },
          { opacity: headerFade, transform: [{ translateY: headerSlide }] },
        ]}
      >
        <View>
          <Text style={styles.headerLabel}>CHARACTER STATS</Text>
          {character && (
            <Text style={styles.headerName}>{character.name}</Text>
          )}
          {character && (
            <Text style={styles.headerClass}>{className}</Text>
          )}
        </View>
        <Pressable style={styles.closeBtn} onPress={() => setScreen('game')}>
          <Feather name="x" size={20} color="#5a5068" />
        </Pressable>
      </Animated.View>

      <View style={styles.headerRule} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: botPad + 24 }]}
        showsVerticalScrollIndicator={false}
      >

        {/* Survival */}
        <SectionCard title="SURVIVAL" icon="activity">
          <StatBarRow label="Health" value={stats.health} max={stats.maxHealth} color="#e74c3c" showBar delay={80} />
          <StatBarRow label="Hunger" value={stats.hunger} max={100} color="#e67e22" showBar delay={140} />
          <StatBarRow label="Thirst" value={stats.thirst} max={100} color="#3d9ad1" showBar delay={200} />
          <StatBarRow label="Morale" value={stats.morale} max={100} color="#9b59b6" showBar delay={260} />
        </SectionCard>

        {/* Attributes */}
        <SectionCard title="ATTRIBUTES" icon="zap">
          <View style={styles.attrGrid}>
            <AttrBadge label="STR" value={stats.strength} color="#e74c3c" delay={320} />
            <AttrBadge label="INT" value={stats.intelligence} color="#3d9ad1" delay={360} />
            <AttrBadge label="AGI" value={stats.agility} color="#2ecc71" delay={400} />
            <AttrBadge label="CHA" value={stats.charisma} color="#c9a84c" delay={440} />
            <AttrBadge label="LCK" value={stats.luck} color="#e67e22" delay={480} />
          </View>
        </SectionCard>

        {/* Corruption */}
        <SectionCard title="CORRUPTION" icon="eye">
          <StatBarRow label="Corruption" value={stats.corruption} max={100} color="#9b59b6" showBar delay={540} />
          {stats.corruption >= 5 && (
            <View style={styles.warningBadge}>
              <Feather name="alert-triangle" size={11} color="#7d3c98" />
              <Text style={styles.warningText}>The mark listens more closely now.</Text>
            </View>
          )}
          {stats.corruption >= 8 && (
            <View style={[styles.warningBadge, { borderColor: 'rgba(192,57,43,0.25)' }]}>
              <Feather name="alert-triangle" size={11} color="#c0392b" />
              <Text style={[styles.warningText, { color: '#c0392b' }]}>The boundary is thinning.</Text>
            </View>
          )}
        </SectionCard>

      </ScrollView>
    </LinearGradient>
  );
}

function AttrBadge({ label, value, color, delay = 0 }: { label: string; value: number; color: string; delay?: number }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.85)).current;
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 300, delay, useNativeDriver: true }),
      Animated.spring(scaleAnim, { toValue: 1, delay, useNativeDriver: true, tension: 100, friction: 8 }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.attrBadge,
        { borderColor: `${color}25`, opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
      ]}
    >
      <Text style={[styles.attrLabel, { color: `${color}88` }]}>{label}</Text>
      <Text style={[styles.attrValue, { color }]}>{value}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  header: {
    paddingHorizontal: 22,
    paddingBottom: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  headerLabel: {
    fontSize: 9,
    letterSpacing: 3,
    color: '#6a5e70',
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 6,
  },
  headerName: {
    fontSize: 22,
    color: '#ede0c4',
    fontFamily: 'Inter_700Bold',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  headerClass: {
    fontSize: 11,
    color: '#9b59b6',
    fontFamily: 'Inter_600SemiBold',
    letterSpacing: 2,
  },
  closeBtn: {
    padding: 6,
    marginTop: 4,
  },
  headerRule: {
    height: 1,
    backgroundColor: 'rgba(155,89,182,0.1)',
    marginHorizontal: 22,
    marginBottom: 6,
  },

  scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    gap: 12,
  },

  sectionCard: {
    backgroundColor: 'rgba(12,8,22,0.85)',
    borderWidth: 1,
    borderColor: 'rgba(42,38,58,0.7)',
    borderRadius: 4,
    padding: 16,
    overflow: 'hidden',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 9,
    letterSpacing: 3,
    color: '#5a5068',
    fontFamily: 'Inter_600SemiBold',
  },
  sectionLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(42,38,58,0.5)',
  },

  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  statLabel: {
    fontSize: 13,
    color: '#9a8898',
    fontFamily: 'Inter_400Regular',
    width: 90,
  },
  statRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
    justifyContent: 'flex-end',
  },
  barTrack: {
    height: 5,
    backgroundColor: 'rgba(30,24,44,0.9)',
    borderRadius: 3,
    flex: 1,
    maxWidth: 130,
    overflow: 'hidden',
    position: 'relative',
  },
  barFill: {
    height: '100%',
    borderRadius: 3,
  },
  barGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    borderRadius: 3,
    opacity: 0.25,
  },
  statValue: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    width: 32,
    textAlign: 'right',
  },

  attrGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  attrBadge: {
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 14,
    paddingVertical: 10,
    alignItems: 'center',
    minWidth: 58,
    backgroundColor: 'rgba(8,5,18,0.6)',
  },
  attrLabel: {
    fontSize: 9,
    fontFamily: 'Inter_600SemiBold',
    letterSpacing: 1,
    marginBottom: 4,
  },
  attrValue: {
    fontSize: 20,
    fontFamily: 'Inter_700Bold',
  },

  warningBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    marginTop: 8,
    backgroundColor: 'rgba(125,60,152,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(125,60,152,0.2)',
    borderRadius: 3,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  warningText: {
    fontSize: 12,
    color: '#7d3c98',
    fontFamily: 'Inter_400Regular',
    fontStyle: 'italic',
    flex: 1,
  },
});
