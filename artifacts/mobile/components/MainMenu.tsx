import React, { useEffect, useState } from 'react';
import { Modal, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
  type SharedValue,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { useGame } from '../context/GameContext';
import { ENDINGS } from '../data/endings';
import { CLASSES } from '../data/characterOptions';
import { getStorySummary } from '../logic/storyValidator';
import { APP_VERSION } from '../constants/version';
import { MOTION_SPRINGS } from '../constants/motion';
import { CinematicView } from './scene/CinematicView';
import { INTRO_BLACKOUT_TIMELINE } from '../data/cinematics/introBlackout';
import PixelStage from './scene/PixelStage';
import { hasSeenIntro, markIntroSeen } from '../logic/saveSystem';

const _summary = getStorySummary();
const FOOTER_STATS = `${_summary.totalNodes} NODES  ·  ${ENDINGS.length} ENDINGS  ·  ${CLASSES.length} CLASSES`;

export default function MainMenu() {
  const { hasSaveGame, continueGame, setScreen, state } = useGame();
  const [showIntroModal, setShowIntroModal] = useState(false);
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === 'web' ? 67 : insets.top;
  const botPad = Platform.OS === 'web' ? 34 : insets.bottom;

  const headerFade = useSharedValue(0);
  const headerSlide = useSharedValue(-20);
  const btn0 = useSharedValue(0);
  const btn1 = useSharedValue(0);
  const btn2 = useSharedValue(0);
  const btn3 = useSharedValue(0);
  const btn4 = useSharedValue(0);
  const btn5 = useSharedValue(0);
  const btn6 = useSharedValue(0);
  const btn7 = useSharedValue(0);
  const footerFade = useSharedValue(0);
  const glowPulse = useSharedValue(0.03);

  // Mark-glyph logo ignition shared values
  const ignitionScale = useSharedValue(0.2);
  const ignitionGlow = useSharedValue(0.1);
  const ignitionFlare = useSharedValue(0);
  const haloScale = useSharedValue(0.6);
  const haloOpacity = useSharedValue(0);

  const btnAnims = [btn0, btn1, btn2, btn3, btn4, btn5, btn6, btn7];

  const discovered = state.endingsDiscovered.filter(id => id !== 'chapter1_end').length;
  const total = ENDINGS.length;
  const discoveredPct = total > 0 ? Math.round((discovered / total) * 100) : 0;
  const endingsBarColor = discoveredPct >= 80 ? '#c9a84c' : discoveredPct >= 40 ? '#27ae60' : '#9b59b6';

  useEffect(() => {
    // Check first-launch auto-play for "The Blackout" intro
    let isMounted = true;
    hasSeenIntro().then((seen) => {
      if (!seen && isMounted) {
        setShowIntroModal(true);
        markIntroSeen();
      }
    }).catch((err) => {
      console.warn('hasSeenIntro check failed:', err);
    });

    headerFade.value = withTiming(1, { duration: 700 });
    headerSlide.value = withTiming(0, { duration: 550 });

    // Mark-glyph logo ignition animation sequence
    ignitionScale.value = withDelay(
      300,
      withSequence(
        withTiming(1.65, { duration: 420 }),
        withSpring(1.0, MOTION_SPRINGS.snappy)
      )
    );
    ignitionFlare.value = withDelay(
      300,
      withSequence(
        withTiming(1, { duration: 380 }),
        withTiming(0, { duration: 700 })
      )
    );
    ignitionGlow.value = withDelay(
      300,
      withSequence(
        withTiming(1, { duration: 450 }),
        withRepeat(
          withSequence(
            withTiming(0.65, { duration: 1800 }),
            withTiming(1, { duration: 1800 })
          ),
          -1,
          true
        )
      )
    );
    haloScale.value = withDelay(
      420,
      withRepeat(
        withSequence(
          withTiming(2.3, { duration: 2200 }),
          withTiming(1.0, { duration: 0 })
        ),
        -1,
        false
      )
    );
    haloOpacity.value = withDelay(
      420,
      withRepeat(
        withSequence(
          withTiming(0.7, { duration: 250 }),
          withTiming(0, { duration: 1950 })
        ),
        -1,
        false
      )
    );

    const delays = [200, 300, 400, 500, 600, 700, 800, 900];
    btnAnims.forEach((anim, i) => {
      anim.value = withDelay(delays[i] ?? 900, withTiming(1, { duration: 380 }));
    });

    footerFade.value = withDelay(1000, withTiming(1, { duration: 500 }));

    glowPulse.value = withRepeat(
      withSequence(
        withTiming(0.055, { duration: 3500 }),
        withTiming(0.02, { duration: 3500 })
      ),
      -1,
      false
    );

    return () => {
      isMounted = false;
    };
  }, []);

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glowPulse.value,
  }));

  const headerStyle = useAnimatedStyle(() => ({
    opacity: headerFade.value,
    transform: [{ translateY: headerSlide.value }],
  }));

  const markGlyphStyle = useAnimatedStyle(() => ({
    transform: [{ scale: ignitionScale.value }],
    opacity: Math.max(0.7, ignitionGlow.value),
  }));

  const markGlowHaloStyle = useAnimatedStyle(() => ({
    transform: [{ scale: haloScale.value }, { rotate: '45deg' }],
    opacity: haloOpacity.value,
  }));

  const markFlareStyle = useAnimatedStyle(() => ({
    opacity: ignitionFlare.value,
    transform: [{ scale: interpolate(ignitionFlare.value, [0, 1], [0.8, 1.8]) }],
  }));

  const footerStyle = useAnimatedStyle(() => ({
    opacity: footerFade.value,
  }));

  // Build ordered button list
  let idx = 0;
  const nextAnim = () => btnAnims[idx++]!;

  const endingsAnim = hasSaveGame ? btn2 : btn1;
  const endingsCardStyle = useAnimatedStyle(() => ({
    opacity: endingsAnim.value,
  }));

  return (
    <PixelStage
      imageKey="surface_night"
      sceneKey="main_menu_skyline"
      overlayOpacity={0.62}
      style={styles.container}
    >
      <Animated.View style={[styles.topGlow, glowStyle]} />
      <Animated.View style={[styles.midGlow, glowStyle]} />

      <View style={[styles.content, { paddingTop: topPad + 36, paddingBottom: botPad + 20 }]}>
        {/* Title section */}
        <Animated.View style={[styles.titleGroup, headerStyle]}>
          <View style={styles.runeRow}>
            <View style={styles.runeLine} />
            <View style={styles.markIgnitionWrapper}>
              <Animated.View style={[styles.markHalo, markGlowHaloStyle]} />
              <Animated.View style={[styles.markFlare, markFlareStyle]} />
              <Animated.View style={[styles.markGlyphOuter, markGlyphStyle]}>
                <View style={styles.markGlyphInner} />
                <View style={styles.markGlyphCore} />
              </Animated.View>
            </View>
            <View style={styles.runeLine} />
          </View>

          <Text style={styles.chapterLabel}>CHAPTER I</Text>
          <Text style={styles.title}>{'SCARS OF THE\nLAST KINGDOM'}</Text>

          <View style={styles.subtitleRow}>
            <View style={styles.subtitleTick} />
            <Text style={styles.subtitle}>The Ruined Station</Text>
            <View style={styles.subtitleTick} />
          </View>

          <Text style={styles.tagline}>
            The city is dead. The mark on your wrist is not.
          </Text>
        </Animated.View>

        {/* Buttons */}
        <View style={styles.buttons}>
          {hasSaveGame && (
            <AnimatedMenuButton
              anim={nextAnim()}
              label="CONTINUE JOURNEY"
              icon="rotate-cw"
              color="#e67e22"
              onPress={() => continueGame()}
              primary
            />
          )}

          <AnimatedMenuButton
            anim={nextAnim()}
            label={hasSaveGame ? 'START NEW TIMELINE' : 'BEGIN YOUR JOURNEY'}
            icon="play"
            color="#9b59b6"
            onPress={() => setScreen('characterCreator')}
            primary={!hasSaveGame}
          />

          {/* Endings discovery card */}
          {(() => {
            nextAnim();
            return (
              <Animated.View style={endingsCardStyle}>
                <Pressable style={styles.endingsCard} onPress={() => setScreen('ending')}>
                  <View style={styles.endingsCardLeft}>
                    <Feather name="book-open" size={16} color={endingsBarColor} />
                    <View style={{ flex: 1 }}>
                      <Text style={[styles.endingsCardLabel, { color: endingsBarColor }]}>
                        ENDINGS DISCOVERED
                      </Text>
                      <Text style={styles.endingsCardNum}>
                        {discovered}<Text style={styles.endingsCardDenom}>/{total}</Text>
                        <Text style={[styles.endingsCardPct, { color: endingsBarColor }]}>  {discoveredPct}%</Text>
                      </Text>
                    </View>
                  </View>
                  <View style={styles.endingsBarTrack}>
                    <View style={[styles.endingsBarFill, { width: `${discoveredPct}%` as any, backgroundColor: endingsBarColor }]} />
                  </View>
                  <Feather name="chevron-right" size={14} color={`${endingsBarColor}55`} />
                </Pressable>
              </Animated.View>
            );
          })()}

          <AnimatedMenuButton
            anim={nextAnim()}
            label="VIEW ROUTE CODEX"
            icon="compass"
            color="#1abc9c"
            onPress={() => setScreen('routeCodex')}
          />

          <AnimatedMenuButton
            anim={nextAnim()}
            label="CHAPTER SELECT"
            icon="map"
            color="#9b59b6"
            onPress={() => setScreen('chapterRoadmap')}
          />

          <AnimatedMenuButton
            anim={nextAnim()}
            label="REPLAY INTRO: THE BLACKOUT"
            icon="film"
            color="#c9a84c"
            onPress={() => setShowIntroModal(true)}
          />

          <AnimatedMenuButton
            anim={nextAnim()}
            label="CREDITS"
            icon="star"
            color="#8a7a60"
            onPress={() => setScreen('credits')}
          />

          <AnimatedMenuButton
            anim={nextAnim()}
            label="SETTINGS"
            icon="settings"
            color="#3a3848"
            onPress={() => setScreen('settings')}
          />
        </View>

        {/* Footer */}
        <Animated.View style={[styles.footer, footerStyle]}>
          <View style={styles.footerLine} />
          <View style={styles.footerInner}>
            <Text style={styles.footerText}>{FOOTER_STATS}</Text>
            <Text style={styles.footerVersion}>{APP_VERSION}</Text>
          </View>
          <View style={styles.footerLine} />
        </Animated.View>
      </View>

      {showIntroModal && (
        <Modal
          visible={true}
          animationType="fade"
          transparent={false}
          onRequestClose={() => setShowIntroModal(false)}
        >
          <View style={{ flex: 1, backgroundColor: '#05040a' }}>
            <CinematicView
              timeline={INTRO_BLACKOUT_TIMELINE}
              showSkipButton={true}
              skipLabel="SKIP INTRO"
              onComplete={() => setShowIntroModal(false)}
            />
          </View>
        </Modal>
      )}
    </PixelStage>
  );
}

// ─── Animated menu button ─────────────────────────────────────────────────────

interface MenuButtonProps {
  anim: SharedValue<number>;
  label: string;
  icon: string;
  color: string;
  onPress: () => void;
  dimmed?: boolean;
  primary?: boolean;
}

function AnimatedMenuButton({ anim, label, icon, color, onPress, dimmed, primary }: MenuButtonProps) {
  const pressScale = useSharedValue(1);

  const onPressIn = () => {
    if (dimmed) return;
    pressScale.value = withSpring(0.975, MOTION_SPRINGS.snappy);
  };
  const onPressOut = () => {
    pressScale.value = withSpring(1, MOTION_SPRINGS.snappy);
  };

  const animStyle = useAnimatedStyle(() => ({
    opacity: anim.value,
    transform: [
      { translateX: interpolate(anim.value, [0, 1], [-20, 0]) },
      { scale: pressScale.value },
    ],
  }));

  return (
    <Animated.View style={animStyle}>
      <Pressable
        style={[
          styles.menuBtn,
          { borderColor: dimmed ? 'rgba(30,28,40,0.6)' : primary ? `${color}55` : `${color}33` },
          dimmed && styles.menuBtnDimmed,
          primary && styles.menuBtnPrimary,
        ]}
        onPress={dimmed ? undefined : onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
      >
        <View style={[styles.menuBtnAccent, { backgroundColor: dimmed ? '#2a2838' : color }]} />
        <Feather name={icon as any} size={15} color={dimmed ? '#2a2838' : color} />
        <Text style={[styles.menuBtnLabel, dimmed && styles.menuBtnLabelDimmed, primary && styles.menuBtnLabelPrimary]}>
          {label}
        </Text>
        <Feather name="chevron-right" size={13} color={dimmed ? '#2a2838' : `${color}55`} />
      </Pressable>
    </Animated.View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: { flex: 1 },

  topGlow: {
    position: 'absolute',
    top: -40,
    left: -60,
    right: -60,
    height: 280,
    backgroundColor: '#9b59b6',
    borderRadius: 200,
  },
  midGlow: {
    position: 'absolute',
    top: 120,
    left: '20%',
    right: '20%',
    height: 200,
    backgroundColor: '#9b59b6',
    borderRadius: 100,
  },

  content: {
    flex: 1,
    paddingHorizontal: 26,
    justifyContent: 'space-between',
  },

  titleGroup: {
    alignItems: 'center',
  },
  runeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 22,
  },
  runeLine: {
    width: 48,
    height: 1,
    backgroundColor: 'rgba(155,89,182,0.3)',
  },
  markIgnitionWrapper: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  markHalo: {
    position: 'absolute',
    width: 18,
    height: 18,
    borderWidth: 1,
    borderColor: '#f39c12',
    borderRadius: 2,
  },
  markFlare: {
    position: 'absolute',
    width: 24,
    height: 24,
    backgroundColor: 'rgba(243, 156, 18, 0.45)',
    borderRadius: 12,
  },
  markGlyphOuter: {
    width: 14,
    height: 14,
    backgroundColor: '#9b59b6',
    transform: [{ rotate: '45deg' }],
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#c39bd3',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 10,
  },
  markGlyphInner: {
    width: 8,
    height: 8,
    backgroundColor: '#f39c12',
    alignItems: 'center',
    justifyContent: 'center',
  },
  markGlyphCore: {
    position: 'absolute',
    width: 3,
    height: 3,
    backgroundColor: '#ffffff',
  },
  runeDiamond: {
    width: 7,
    height: 7,
    backgroundColor: '#9b59b6',
    transform: [{ rotate: '45deg' }],
    opacity: 0.85,
  },
  chapterLabel: {
    fontSize: 10,
    letterSpacing: 6,
    color: '#9b59b6',
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 14,
    opacity: 0.9,
  },
  title: {
    fontSize: 34,
    color: '#ede0c4',
    fontFamily: 'Inter_700Bold',
    textAlign: 'center',
    letterSpacing: 3,
    lineHeight: 44,
    marginBottom: 14,
  },
  subtitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 18,
  },
  subtitleTick: {
    width: 20,
    height: 1,
    backgroundColor: 'rgba(106,94,80,0.5)',
  },
  subtitle: {
    fontSize: 12,
    color: '#6a5e50',
    fontFamily: 'Inter_400Regular',
    letterSpacing: 2,
  },
  tagline: {
    fontSize: 13,
    color: '#4a4058',
    fontFamily: 'Inter_400Regular',
    fontStyle: 'italic',
    textAlign: 'center',
    lineHeight: 20,
    letterSpacing: 0.3,
  },

  buttons: {
    gap: 9,
    flex: 1,
    justifyContent: 'center',
    marginVertical: 24,
  },
  menuBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 3,
    paddingHorizontal: 16,
    paddingVertical: 15,
    backgroundColor: 'rgba(8,5,18,0.85)',
    gap: 13,
    overflow: 'hidden',
  },
  menuBtnDimmed: {
    backgroundColor: 'rgba(6,4,12,0.6)',
  },
  menuBtnPrimary: {
    backgroundColor: 'rgba(8,5,18,0.95)',
    borderWidth: 1.5,
  },
  menuBtnAccent: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 2.5,
    opacity: 0.7,
  },
  menuBtnLabel: {
    flex: 1,
    fontSize: 11,
    letterSpacing: 3,
    color: '#c8b898',
    fontFamily: 'Inter_600SemiBold',
  },
  menuBtnLabelDimmed: {
    color: '#2a2838',
  },
  menuBtnLabelPrimary: {
    fontSize: 12,
    letterSpacing: 3.5,
  },

  // Endings discovery card
  endingsCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(42,40,58,0.5)',
    borderRadius: 3,
    paddingHorizontal: 14,
    paddingVertical: 13,
    backgroundColor: 'rgba(8,5,18,0.85)',
    gap: 12,
  },
  endingsCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  endingsCardLabel: {
    fontSize: 9,
    letterSpacing: 2,
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 2,
  },
  endingsCardNum: {
    fontSize: 18,
    color: '#d4c5a9',
    fontFamily: 'Inter_700Bold',
  },
  endingsCardDenom: {
    fontSize: 12,
    color: '#4a4058',
    fontFamily: 'Inter_400Regular',
  },
  endingsCardPct: {
    fontSize: 12,
    fontFamily: 'Inter_600SemiBold',
  },
  endingsBarTrack: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 2.5,
    backgroundColor: 'rgba(40,35,55,0.6)',
  },
  endingsBarFill: {
    height: '100%',
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
  },

  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingBottom: 4,
  },
  footerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(26,24,38,0.8)',
  },
  footerInner: {
    alignItems: 'center',
    gap: 3,
  },
  footerText: {
    fontSize: 9,
    color: '#2e2840',
    fontFamily: 'Inter_400Regular',
    letterSpacing: 1.5,
    textAlign: 'center',
  },
  footerVersion: {
    fontSize: 8,
    color: '#1e1a2a',
    fontFamily: 'Inter_400Regular',
    letterSpacing: 1,
    textAlign: 'center',
  },
});
