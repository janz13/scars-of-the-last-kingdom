import React, { useEffect } from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { useGame } from '../context/GameContext';
import { APP_VERSION, BUILD_DATE } from '../constants/version';
import { ENDINGS } from '../data/endings';
import { CLASSES, BACKGROUNDS } from '../data/characterOptions';
import { getStorySummary } from '../logic/storyValidator';

const _summary = getStorySummary();

const CREDIT_SECTIONS = [
  {
    label: 'STORY & GAME DESIGN',
    entries: ['Scars of the Last Kingdom Development Team'],
  },
  {
    label: 'WRITING',
    entries: ['Original narrative and world-building by the development team'],
  },
  {
    label: 'BUILT WITH',
    entries: ['Expo · React Native · TypeScript', 'expo-linear-gradient · @expo/vector-icons'],
  },
  {
    label: 'SPECIAL THANKS',
    entries: [
      'Everyone who survives the Blackout on their first run',
      'Every player who chose Mira',
      'And especially those who chose to walk alone',
    ],
  },
];

const LORE_QUOTE =
  '"The city does not mourn. Cities never do. ' +
  'Mourning requires memory, and memory requires someone left to hold it."';

export default function CreditsScreen() {
  const { setScreen } = useGame();
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === 'web' ? 67 : insets.top;
  const botPad = Platform.OS === 'web' ? 34 : insets.bottom;

  const fade = useSharedValue(0);
  const slide = useSharedValue(20);
  const glowPulse = useSharedValue(0.03);

  useEffect(() => {
    fade.value = withTiming(1, { duration: 600 });
    slide.value = withTiming(0, { duration: 500 });
    glowPulse.value = withRepeat(
      withSequence(
        withTiming(0.055, { duration: 3500 }),
        withTiming(0.02, { duration: 3500 })
      ),
      -1,
      false
    );
  }, []);

  const glowAnimStyle = useAnimatedStyle(() => ({
    opacity: glowPulse.value,
  }));

  const bodyAnimStyle = useAnimatedStyle(() => ({
    opacity: fade.value,
    transform: [{ translateY: slide.value }],
  }));

  return (
    <LinearGradient colors={['#030108', '#060310', '#030108']} style={styles.container}>
      <Animated.View style={[styles.topGlow, glowAnimStyle]} />

      {/* Header */}
      <View style={[styles.header, { paddingTop: topPad + 10 }]}>
        <Pressable style={styles.backBtn} onPress={() => setScreen('mainMenu')}>
          <Feather name="arrow-left" size={16} color="#6a5e70" />
        </Pressable>
        <Text style={styles.headerTitle}>CREDITS</Text>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView
        contentContainerStyle={[styles.content, { paddingBottom: botPad + 32 }]}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View style={bodyAnimStyle}>
          {/* Title block */}
          <View style={styles.titleBlock}>
            <View style={styles.runeRow}>
              <View style={styles.runeLine} />
              <View style={styles.runeDiamond} />
              <View style={styles.runeLine} />
            </View>
            <Text style={styles.gameTitle}>{'SCARS OF THE\nLAST KINGDOM'}</Text>
            <Text style={styles.version}>{APP_VERSION}</Text>
            <Text style={styles.buildDate}>{BUILD_DATE}</Text>
          </View>

          {/* Story stats */}
          <View style={styles.statsRow}>
            <StatItem label="STORY NODES" value={String(_summary.totalNodes)} />
            <View style={styles.statDivider} />
            <StatItem label="ENDINGS" value={String(ENDINGS.length)} />
            <View style={styles.statDivider} />
            <StatItem label="CLASSES" value={String(CLASSES.length)} />
            <View style={styles.statDivider} />
            <StatItem label="BACKGROUNDS" value={String(BACKGROUNDS.length)} />
          </View>

          {/* Credit sections */}
          {CREDIT_SECTIONS.map(({ label, entries }) => (
            <View key={label} style={styles.creditSection}>
              <Text style={styles.creditLabel}>{label}</Text>
              {entries.map((entry) => (
                <Text key={entry} style={styles.creditEntry}>{entry}</Text>
              ))}
            </View>
          ))}

          {/* Divider */}
          <View style={styles.separatorRow}>
            <View style={styles.separatorLine} />
            <View style={styles.separatorDiamond} />
            <View style={styles.separatorLine} />
          </View>

          {/* Lore quote */}
          <Text style={styles.loreQuote}>{LORE_QUOTE}</Text>

          {/* Prototype notice */}
          <View style={styles.prototypeCard}>
            <Feather name="info" size={12} color="#4a3860" style={{ marginBottom: 8 }} />
            <Text style={styles.prototypeText}>
              This is a public prototype. The story continues. Your feedback shapes what comes next.
            </Text>
          </View>
        </Animated.View>
      </ScrollView>
    </LinearGradient>
  );
}

function StatItem({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.statItem}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  topGlow: {
    position: 'absolute',
    top: -40,
    left: -60,
    right: -60,
    height: 260,
    backgroundColor: '#9b59b6',
    borderRadius: 200,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(42,40,58,0.6)',
  },
  backBtn: {
    padding: 6,
    width: 32,
  },
  headerTitle: {
    fontSize: 10,
    letterSpacing: 4,
    color: '#6a5e70',
    fontFamily: 'Inter_600SemiBold',
  },
  content: {
    paddingHorizontal: 26,
    paddingTop: 32,
    alignItems: 'center',
  },
  titleBlock: {
    alignItems: 'center',
    marginBottom: 28,
  },
  runeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 18,
  },
  runeLine: {
    width: 36,
    height: 1,
    backgroundColor: 'rgba(155,89,182,0.25)',
  },
  runeDiamond: {
    width: 6,
    height: 6,
    backgroundColor: '#9b59b6',
    transform: [{ rotate: '45deg' }],
    opacity: 0.7,
  },
  gameTitle: {
    fontSize: 28,
    color: '#ede0c4',
    fontFamily: 'Inter_700Bold',
    textAlign: 'center',
    letterSpacing: 3,
    lineHeight: 38,
    marginBottom: 12,
  },
  version: {
    fontSize: 11,
    color: '#9b59b6',
    fontFamily: 'Inter_600SemiBold',
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  buildDate: {
    fontSize: 10,
    color: '#3a3050',
    fontFamily: 'Inter_400Regular',
    letterSpacing: 1,
  },
  statsRow: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: 'rgba(12,8,22,0.9)',
    borderWidth: 1,
    borderColor: 'rgba(42,40,58,0.5)',
    borderRadius: 4,
    marginBottom: 32,
    paddingVertical: 18,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  statValue: {
    fontSize: 22,
    color: '#9b59b6',
    fontFamily: 'Inter_700Bold',
  },
  statLabel: {
    fontSize: 8,
    color: '#3a3050',
    fontFamily: 'Inter_600SemiBold',
    letterSpacing: 1.5,
  },
  statDivider: {
    width: 1,
    backgroundColor: 'rgba(42,40,58,0.5)',
    marginVertical: 4,
  },
  creditSection: {
    width: '100%',
    marginBottom: 24,
    alignItems: 'center',
    gap: 8,
  },
  creditLabel: {
    fontSize: 9,
    letterSpacing: 3,
    color: '#6a5e70',
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 2,
  },
  creditEntry: {
    fontSize: 13,
    color: '#8a7a90',
    fontFamily: 'Inter_400Regular',
    textAlign: 'center',
    lineHeight: 20,
  },
  separatorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    width: '50%',
    marginBottom: 28,
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(155,89,182,0.12)',
  },
  separatorDiamond: {
    width: 5,
    height: 5,
    backgroundColor: 'rgba(155,89,182,0.3)',
    transform: [{ rotate: '45deg' }],
  },
  loreQuote: {
    fontSize: 13,
    color: '#4a4058',
    fontFamily: 'Inter_400Regular',
    fontStyle: 'italic',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 28,
    paddingHorizontal: 10,
  },
  prototypeCard: {
    width: '100%',
    backgroundColor: 'rgba(12,8,22,0.7)',
    borderWidth: 1,
    borderColor: 'rgba(74,56,96,0.3)',
    borderRadius: 4,
    padding: 16,
    alignItems: 'center',
  },
  prototypeText: {
    fontSize: 12,
    color: '#4a3860',
    fontFamily: 'Inter_400Regular',
    textAlign: 'center',
    lineHeight: 19,
  },
});
