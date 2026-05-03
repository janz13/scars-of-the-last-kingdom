import React, { useEffect, useRef } from 'react';
import { Animated, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
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

const ENDING_ICONS: Record<string, string> = {
  death: 'x-circle',
  betrayal: 'alert-triangle',
  corruption: 'zap',
  savior: 'sun',
  exile: 'wind',
  discovery: 'search',
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
  const accentColor = ending?.color ?? '#9b59b6';

  // ── Animations ─────────────────────────────────────────────────────────────
  const mountFade = useRef(new Animated.Value(0)).current;
  const mountSlide = useRef(new Animated.Value(40)).current;
  const iconScale = useRef(new Animated.Value(0.4)).current;
  const iconRotate = useRef(new Animated.Value(0)).current;
  const glowPulse = useRef(new Animated.Value(0.6)).current;
  const newBadgeAnim = useRef(new Animated.Value(0)).current;
  const discoveredBefore = endingsDiscovered.slice(0, -1).includes(activeEnding ?? '');
  const isNewDiscovery = activeEnding !== null && !discoveredBefore && activeEnding !== 'chapter1_end';

  useEffect(() => {
    Animated.parallel([
      Animated.timing(mountFade, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.spring(mountSlide, { toValue: 0, useNativeDriver: true, tension: 60, friction: 12 }),
    ]).start();

    Animated.sequence([
      Animated.delay(400),
      Animated.parallel([
        Animated.spring(iconScale, { toValue: 1, useNativeDriver: true, tension: 80, friction: 7 }),
        Animated.timing(iconRotate, { toValue: 1, duration: 500, useNativeDriver: true }),
      ]),
    ]).start();

    if (isNewDiscovery) {
      Animated.sequence([
        Animated.delay(900),
        Animated.spring(newBadgeAnim, { toValue: 1, useNativeDriver: true, tension: 120, friction: 6 }),
      ]).start();
    }

    Animated.loop(
      Animated.sequence([
        Animated.timing(glowPulse, { toValue: 1, duration: 2200, useNativeDriver: true }),
        Animated.timing(glowPulse, { toValue: 0.5, duration: 2200, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const iconRotateDeg = iconRotate.interpolate({ inputRange: [0, 1], outputRange: ['-15deg', '0deg'] });
  const iconName = ending ? (ENDING_ICONS[ending.type] ?? 'alert-circle') : 'alert-circle';

  const bgColors: [string, string, string] = isDeath
    ? ['#080202', '#100606', '#080202']
    : isChapterEnd
      ? ['#060412', '#0e0820', '#060412']
      : ['#06040e', '#0e0818', '#06040e'];

  const lastChoices = routeHistory.slice(-5);

  return (
    <LinearGradient colors={bgColors} style={styles.container}>
      {/* Atmospheric glow */}
      <Animated.View
        style={[
          styles.atmosphericGlow,
          { backgroundColor: accentColor, opacity: glowPulse.interpolate({ inputRange: [0, 1], outputRange: [0, 0.06] }) },
        ]}
        pointerEvents="none"
      />

      <ScrollView
        contentContainerStyle={[styles.content, { paddingTop: topPad + 24, paddingBottom: botPad + 32 }]}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          style={{ opacity: mountFade, transform: [{ translateY: mountSlide }] }}
        >
          {/* Icon + decoration */}
          <View style={styles.iconRow}>
            <View style={[styles.decorLine, { backgroundColor: accentColor }]} />
            <Animated.View
              style={{
                transform: [{ scale: iconScale }, { rotate: iconRotateDeg }],
              }}
            >
              <View style={[styles.iconRing, { borderColor: `${accentColor}30` }]}>
                <View style={[styles.iconInner, { backgroundColor: `${accentColor}12` }]}>
                  <Feather name={iconName as any} size={28} color={accentColor} />
                </View>
              </View>
            </Animated.View>
            <View style={[styles.decorLine, { backgroundColor: accentColor }]} />
          </View>

          {/* New discovery badge */}
          {isNewDiscovery && (
            <Animated.View
              style={[
                styles.newBadge,
                {
                  opacity: newBadgeAnim,
                  transform: [{ scale: newBadgeAnim.interpolate({ inputRange: [0, 1], outputRange: [0.7, 1] }) }],
                  borderColor: `${accentColor}60`,
                },
              ]}
            >
              <Feather name="star" size={10} color={accentColor} />
              <Text style={[styles.newBadgeText, { color: accentColor }]}>NEW ENDING DISCOVERED</Text>
            </Animated.View>
          )}

          {/* Ending label */}
          <Text style={[styles.endingSubtitle, { color: accentColor }]}>
            {ending?.subtitle?.toUpperCase() ?? 'ENDING'}
          </Text>

          {/* Ending title */}
          <Text style={styles.endingTitle}>{ending?.title ?? 'Unknown Ending'}</Text>

          {/* Separator */}
          <View style={styles.separatorRow}>
            <View style={[styles.separatorLine, { backgroundColor: `${accentColor}30` }]} />
            <View style={[styles.separatorDiamond, { backgroundColor: `${accentColor}60` }]} />
            <View style={[styles.separatorLine, { backgroundColor: `${accentColor}30` }]} />
          </View>

          {/* Description */}
          <Text style={styles.endingText}>{ending?.description ?? ''}</Text>

          {/* Run summary card */}
          <View style={[styles.summaryCard, { borderColor: `${accentColor}18` }]}>
            <View style={styles.summaryRow}>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>CHOICES MADE</Text>
                <Text style={[styles.summaryValue, { color: accentColor }]}>{routeHistory.length}</Text>
              </View>
              <View style={styles.summaryDivider} />
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>ENDINGS</Text>
                <Text style={[styles.summaryValue, { color: accentColor }]}>
                  {endingsDiscovered.length}<Text style={styles.summaryValueOf}>/{ENDINGS.length + 1}</Text>
                </Text>
              </View>
            </View>

            {lastChoices.length > 0 && (
              <>
                <View style={[styles.summaryCardDivider, { backgroundColor: `${accentColor}18` }]} />
                <Text style={styles.summaryPathLabel}>FINAL PATH</Text>
                {lastChoices.map((entry, i) => (
                  <View key={i} style={styles.pathRow}>
                    <View style={[styles.pathDot, { backgroundColor: i === lastChoices.length - 1 ? accentColor : '#3a3048' }]} />
                    <Text style={[styles.pathText, i === lastChoices.length - 1 && { color: '#8a7a9a' }]} numberOfLines={1}>
                      {entry.choiceText}
                    </Text>
                  </View>
                ))}
              </>
            )}
          </View>

          {/* Action buttons */}
          <View style={styles.buttons}>
            {isDeath ? (
              <EndingButton
                label="NEW GAME"
                icon="refresh-cw"
                color={accentColor}
                onPress={() => deleteAndReset()}
                primary
              />
            ) : (
              <EndingButton
                label="PLAY AGAIN"
                icon="refresh-cw"
                color={accentColor}
                onPress={() => deleteAndReset()}
                primary
              />
            )}

            <EndingButton
              label="MAIN MENU"
              icon="home"
              color="#3a3450"
              onPress={() => setScreen('mainMenu')}
            />
          </View>
        </Animated.View>
      </ScrollView>
    </LinearGradient>
  );
}

function EndingButton({
  label, icon, color, onPress, primary,
}: { label: string; icon: string; color: string; onPress: () => void; primary?: boolean }) {
  return (
    <Pressable
      style={[
        styles.btn,
        { borderColor: `${color}${primary ? '80' : '40'}` },
        primary && { backgroundColor: `${color}10` },
      ]}
      onPress={onPress}
    >
      <Feather name={icon as any} size={14} color={primary ? color : '#5a5068'} />
      <Text style={[styles.btnText, { color: primary ? color : '#5a5068' }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  atmosphericGlow: {
    position: 'absolute',
    top: -100,
    left: -100,
    right: -100,
    height: 400,
    borderRadius: 300,
  },
  content: {
    paddingHorizontal: 26,
    alignItems: 'center',
  },

  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 18,
    width: '100%',
  },
  decorLine: {
    flex: 1,
    height: 1,
    opacity: 0.4,
  },
  iconRing: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconInner: {
    width: 58,
    height: 58,
    borderRadius: 29,
    justifyContent: 'center',
    alignItems: 'center',
  },

  newBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 5,
    marginBottom: 16,
    backgroundColor: 'rgba(155,89,182,0.08)',
    alignSelf: 'center',
  },
  newBadgeText: {
    fontSize: 9,
    fontFamily: 'Inter_700Bold',
    letterSpacing: 1.5,
  },

  endingSubtitle: {
    fontSize: 10,
    letterSpacing: 4,
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 10,
    textAlign: 'center',
  },
  endingTitle: {
    fontSize: 30,
    color: '#ede0c4',
    fontFamily: 'Inter_700Bold',
    textAlign: 'center',
    marginBottom: 20,
    letterSpacing: 0.5,
    lineHeight: 38,
  },

  separatorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    width: '60%',
    marginBottom: 22,
  },
  separatorLine: { flex: 1, height: 1 },
  separatorDiamond: {
    width: 6,
    height: 6,
    transform: [{ rotate: '45deg' }],
  },

  endingText: {
    fontSize: 15,
    color: '#9a8878',
    lineHeight: 25,
    textAlign: 'center',
    fontFamily: 'Inter_400Regular',
    fontStyle: 'italic',
    marginBottom: 28,
    letterSpacing: 0.2,
  },

  summaryCard: {
    width: '100%',
    backgroundColor: 'rgba(12,8,22,0.9)',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 28,
    overflow: 'hidden',
  },
  summaryRow: {
    flexDirection: 'row',
    padding: 18,
    gap: 0,
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  summaryDivider: {
    width: 1,
    backgroundColor: 'rgba(42,40,58,0.6)',
    marginVertical: 4,
  },
  summaryLabel: {
    fontSize: 9,
    letterSpacing: 2,
    color: '#3a3450',
    fontFamily: 'Inter_600SemiBold',
  },
  summaryValue: {
    fontSize: 28,
    fontFamily: 'Inter_700Bold',
  },
  summaryValueOf: {
    fontSize: 16,
    color: '#3a3450',
    fontFamily: 'Inter_400Regular',
  },
  summaryCardDivider: {
    height: 1,
    marginHorizontal: 18,
  },
  summaryPathLabel: {
    fontSize: 9,
    letterSpacing: 2,
    color: '#3a3450',
    fontFamily: 'Inter_600SemiBold',
    paddingHorizontal: 18,
    paddingTop: 14,
    paddingBottom: 8,
  },
  pathRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 18,
    paddingBottom: 8,
  },
  pathDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#3a3048',
    flexShrink: 0,
  },
  pathText: {
    fontSize: 11,
    color: '#4a4058',
    fontFamily: 'Inter_400Regular',
    flex: 1,
    letterSpacing: 0.3,
  },

  buttons: {
    width: '100%',
    gap: 10,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    borderWidth: 1,
    borderRadius: 3,
    padding: 16,
  },
  btnText: {
    fontSize: 11,
    letterSpacing: 3,
    fontFamily: 'Inter_600SemiBold',
  },
});
