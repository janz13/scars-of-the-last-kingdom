import React, { useEffect, useRef } from 'react';
import { Animated, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { useGame } from '../context/GameContext';
import { getEndingById, ENDINGS } from '../data/endings';

const CHAPTER_END_DATA = {
  id: 'chapter1_end',
  title: 'End of Chapter I',
  type: 'savior' as const,
  subtitle: 'The Descent Awaits',
  description: 'The Archive door has opened. What lies beyond will change everything. The mark on your wrist is silent for the first time since the blackout — not because it stopped listening. Because it got what it wanted.\n\nChapter II: The Descent — coming soon.',
  color: '#9b59b6',
};

const ENDING_ICONS: Record<string, string> = {
  death:          'x-circle',
  betrayal:       'alert-triangle',
  corruption:     'zap',
  savior:         'sun',
  sacrifice:      'heart',
  tyrant:         'shield',
  companion:      'users',
  faction:        'flag',
  secret:         'eye',
  wanderer:       'wind',
};

export default function EndingScreen() {
  const { state, setScreen, deleteAndReset } = useGame();
  const insets = useSafeAreaInsets();
  const { activeEnding, endingsDiscovered, routeHistory } = state;

  const topPad = Platform.OS === 'web' ? 67 : insets.top;
  const botPad = Platform.OS === 'web' ? 34 : insets.bottom;

  // ── Are we in "endings gallery" mode (no activeEnding)? ─────────────────────
  const isGallery = activeEnding === null;

  const ending = activeEnding === 'chapter1_end'
    ? CHAPTER_END_DATA
    : activeEnding
      ? getEndingById(activeEnding)
      : null;

  const isDeath = ending?.type === 'death';
  const isChapterEnd = activeEnding === 'chapter1_end';
  const accentColor = ending?.color ?? '#9b59b6';

  const discoveredCount = endingsDiscovered.filter((id) => id !== 'chapter1_end').length;
  const totalEndings = ENDINGS.length;
  const discoveredPct = totalEndings > 0 ? Math.round((discoveredCount / totalEndings) * 100) : 0;

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
  const iconName = ending ? (ENDING_ICONS[ending.type] ?? 'alert-circle') : 'book-open';

  const bgColors: [string, string, string] = isDeath
    ? ['#080202', '#100606', '#080202']
    : isChapterEnd
      ? ['#060412', '#0e0820', '#060412']
      : isGallery
        ? ['#060412', '#0c0820', '#060412']
        : ['#06040e', '#0e0818', '#06040e'];

  const lastChoices = routeHistory.slice(-5);

  // ── Gallery mode: endings discovered list ───────────────────────────────────
  if (isGallery) {
    return (
      <LinearGradient colors={bgColors} style={styles.container}>
        <View style={[styles.galleryHeader, { paddingTop: topPad + 10 }]}>
          <Pressable style={styles.backBtn} onPress={() => setScreen('mainMenu')}>
            <Feather name="arrow-left" size={16} color="#6a5e70" />
          </Pressable>
          <Text style={styles.galleryTitle}>ENDINGS DISCOVERED</Text>
          <View style={{ width: 32 }} />
        </View>

        <ScrollView
          contentContainerStyle={[styles.galleryContent, { paddingBottom: botPad + 32 }]}
          showsVerticalScrollIndicator={false}
        >
          {/* Progress */}
          <View style={styles.galleryProgress}>
            <Text style={styles.galleryProgressNum}>
              {discoveredCount}
              <Text style={styles.galleryProgressDenom}>/{totalEndings}</Text>
            </Text>
            <Text style={[styles.galleryProgressPct, {
              color: discoveredPct >= 80 ? '#c9a84c' : discoveredPct >= 40 ? '#27ae60' : '#6a5e50',
            }]}>
              {discoveredPct}% DISCOVERED
            </Text>
            <View style={styles.galleryBarTrack}>
              <View style={[styles.galleryBarFill, {
                width: `${discoveredPct}%` as any,
                backgroundColor: discoveredPct >= 80 ? '#c9a84c' : discoveredPct >= 40 ? '#27ae60' : '#9b59b6',
              }]} />
            </View>
          </View>

          {discoveredCount === 0 ? (
            <View style={styles.galleryEmpty}>
              <Feather name="book-open" size={28} color="#2a2038" style={{ marginBottom: 14 }} />
              <Text style={styles.galleryEmptyText}>
                No endings discovered yet.{'\n'}Play the story to begin uncovering them.
              </Text>
            </View>
          ) : (
            ENDINGS.filter((e) => endingsDiscovered.includes(e.id)).map((e) => (
              <View key={e.id} style={[styles.galleryCard, { borderColor: `${e.color}22` }]}>
                <View style={[styles.galleryCardAccent, { backgroundColor: e.color }]} />
                <Feather name={(ENDING_ICONS[e.type] ?? 'circle') as any} size={14} color={e.color} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.galleryCardTitle}>{e.title}</Text>
                  <Text style={[styles.galleryCardSubtitle, { color: e.color }]}>
                    {e.subtitle?.toUpperCase()}
                  </Text>
                </View>
              </View>
            ))
          )}

          <Pressable style={styles.galleryRouteBtn} onPress={() => setScreen('routeCodex')}>
            <Feather name="compass" size={13} color="#1abc9c" />
            <Text style={styles.galleryRouteBtnText}>VIEW ROUTE CODEX</Text>
            <Feather name="chevron-right" size={13} color="rgba(26,188,156,0.4)" />
          </Pressable>
        </ScrollView>
      </LinearGradient>
    );
  }

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
                <Text style={styles.summaryLabel}>ENDINGS FOUND</Text>
                <Text style={[styles.summaryValue, { color: accentColor }]}>
                  {discoveredCount}<Text style={styles.summaryValueOf}>/{totalEndings}</Text>
                </Text>
              </View>
              <View style={styles.summaryDivider} />
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>DISCOVERED</Text>
                <Text style={[styles.summaryValue, { color: accentColor, fontSize: 20 }]}>
                  {discoveredPct}<Text style={styles.summaryValueOf}>%</Text>
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
            {isChapterEnd ? (
              <>
                <EndingButton
                  label="START NEW TIMELINE"
                  icon="refresh-cw"
                  color={accentColor}
                  onPress={() => deleteAndReset()}
                  primary
                />
                <EndingButton
                  label="VIEW ROUTE CODEX"
                  icon="compass"
                  color="#1abc9c"
                  onPress={() => setScreen('routeCodex')}
                />
              </>
            ) : isDeath ? (
              <EndingButton
                label="START NEW TIMELINE"
                icon="refresh-cw"
                color={accentColor}
                onPress={() => deleteAndReset()}
                primary
              />
            ) : (
              <EndingButton
                label="START NEW TIMELINE"
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

  // ── Gallery styles ─────────────────────────────────────────────────────────
  galleryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(42,40,58,0.5)',
  },
  backBtn: {
    padding: 6,
    width: 32,
  },
  galleryTitle: {
    fontSize: 10,
    letterSpacing: 4,
    color: '#6a5e70',
    fontFamily: 'Inter_600SemiBold',
  },
  galleryContent: {
    paddingHorizontal: 22,
    paddingTop: 24,
    gap: 10,
  },
  galleryProgress: {
    backgroundColor: 'rgba(12,8,22,0.9)',
    borderWidth: 1,
    borderColor: 'rgba(42,40,58,0.5)',
    borderRadius: 4,
    padding: 20,
    alignItems: 'center',
    marginBottom: 8,
    gap: 6,
  },
  galleryProgressNum: {
    fontSize: 42,
    color: '#9b59b6',
    fontFamily: 'Inter_700Bold',
  },
  galleryProgressDenom: {
    fontSize: 22,
    color: '#3a3050',
    fontFamily: 'Inter_400Regular',
  },
  galleryProgressPct: {
    fontSize: 10,
    letterSpacing: 2,
    fontFamily: 'Inter_600SemiBold',
  },
  galleryBarTrack: {
    width: '70%',
    height: 4,
    backgroundColor: 'rgba(42,40,58,0.6)',
    borderRadius: 2,
    overflow: 'hidden',
    marginTop: 4,
  },
  galleryBarFill: {
    height: '100%',
    borderRadius: 2,
  },
  galleryEmpty: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  galleryEmptyText: {
    fontSize: 14,
    color: '#3a3050',
    fontFamily: 'Inter_400Regular',
    textAlign: 'center',
    lineHeight: 22,
  },
  galleryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: 'rgba(12,8,22,0.85)',
    borderWidth: 1,
    borderRadius: 3,
    paddingHorizontal: 14,
    paddingVertical: 13,
    overflow: 'hidden',
  },
  galleryCardAccent: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 2.5,
    opacity: 0.6,
  },
  galleryCardTitle: {
    fontSize: 13,
    color: '#c8b898',
    fontFamily: 'Inter_500Medium',
    marginBottom: 2,
  },
  galleryCardSubtitle: {
    fontSize: 9,
    letterSpacing: 2,
    fontFamily: 'Inter_600SemiBold',
  },
  galleryRouteBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderColor: 'rgba(26,188,156,0.25)',
    borderRadius: 3,
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: 'rgba(26,188,156,0.04)',
    marginTop: 8,
  },
  galleryRouteBtnText: {
    flex: 1,
    fontSize: 11,
    letterSpacing: 3,
    color: '#1abc9c',
    fontFamily: 'Inter_600SemiBold',
  },

  // ── Ending reveal styles ───────────────────────────────────────────────────
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
    fontSize: 8,
    letterSpacing: 1.5,
    color: '#3a3450',
    fontFamily: 'Inter_600SemiBold',
    textAlign: 'center',
  },
  summaryValue: {
    fontSize: 26,
    fontFamily: 'Inter_700Bold',
  },
  summaryValueOf: {
    fontSize: 15,
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
