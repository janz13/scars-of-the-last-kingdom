import React, { useEffect, useRef } from 'react';
import { Animated, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { useGame } from '../context/GameContext';
import { ENDINGS } from '../data/endings';

export default function MainMenu() {
  const { hasSaveGame, continueGame, setScreen, state } = useGame();
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === 'web' ? 67 : insets.top;
  const botPad = Platform.OS === 'web' ? 34 : insets.bottom;

  const headerFade = useRef(new Animated.Value(0)).current;
  const headerSlide = useRef(new Animated.Value(-20)).current;
  const button1 = useRef(new Animated.Value(0)).current;
  const button2 = useRef(new Animated.Value(0)).current;
  const button3 = useRef(new Animated.Value(0)).current;
  const button4 = useRef(new Animated.Value(0)).current;
  const button5 = useRef(new Animated.Value(0)).current;
  const footerFade = useRef(new Animated.Value(0)).current;
  const glowPulse = useRef(new Animated.Value(0.03)).current;

  const discovered = state.endingsDiscovered.length;
  const total = ENDINGS.length + 1;

  useEffect(() => {
    // Header entrance
    Animated.parallel([
      Animated.timing(headerFade, { toValue: 1, duration: 700, useNativeDriver: true }),
      Animated.timing(headerSlide, { toValue: 0, duration: 550, useNativeDriver: true }),
    ]).start();

    // Staggered button entrances — faster
    const delays = [200, 300, 400, 500, 600];
    const anims = [button1, button2, button3, button4, button5];
    anims.forEach((anim, i) => {
      Animated.timing(anim, {
        toValue: 1,
        duration: 380,
        delay: delays[i],
        useNativeDriver: true,
      }).start();
    });

    // Footer fade
    Animated.timing(footerFade, { toValue: 1, duration: 500, delay: 800, useNativeDriver: true }).start();

    // Subtle atmospheric glow pulse
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowPulse, { toValue: 0.055, duration: 3500, useNativeDriver: true }),
        Animated.timing(glowPulse, { toValue: 0.02, duration: 3500, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const btnAnims = [button1, button2, button3, button4, button5];

  return (
    <LinearGradient
      colors={['#030108', '#06030f', '#0a0516', '#04020a']}
      style={styles.container}
    >
      {/* Atmospheric top glow */}
      <Animated.View style={[styles.topGlow, { opacity: glowPulse }]} />
      <Animated.View style={[styles.midGlow, { opacity: glowPulse }]} />

      <View style={[styles.content, { paddingTop: topPad + 36, paddingBottom: botPad + 20 }]}>
        {/* Title section */}
        <Animated.View
          style={[
            styles.titleGroup,
            { opacity: headerFade, transform: [{ translateY: headerSlide }] },
          ]}
        >
          <View style={styles.runeRow}>
            <View style={styles.runeLine} />
            <View style={styles.runeDiamond} />
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
          <AnimatedMenuButton anim={button1} label="NEW GAME" icon="play" color="#9b59b6" onPress={() => setScreen('characterCreator')} />

          {hasSaveGame && (
            <AnimatedMenuButton anim={button2} label="CONTINUE" icon="rotate-cw" color="#e67e22" onPress={() => continueGame()} />
          )}

          <AnimatedMenuButton
            anim={btnAnims[hasSaveGame ? 2 : 1]}
            label={`ENDINGS  ${discovered} / ${total}`}
            icon="book"
            color={discovered > 0 ? '#c9a84c' : '#3a3040'}
            onPress={() => setScreen('ending')}
            dimmed={discovered === 0}
          />

          <AnimatedMenuButton
            anim={btnAnims[hasSaveGame ? 3 : 2]}
            label="CHAPTER ROADMAP"
            icon="map"
            color="#4a8eaa"
            onPress={() => setScreen('chapterRoadmap')}
          />

          <AnimatedMenuButton
            anim={btnAnims[hasSaveGame ? 4 : 3]}
            label="SETTINGS"
            icon="settings"
            color="#3a3848"
            onPress={() => setScreen('settings')}
          />
        </View>

        {/* Footer */}
        <Animated.View style={[styles.footer, { opacity: footerFade }]}>
          <View style={styles.footerLine} />
          <Text style={styles.footerText}>175 NODES  ·  21 ENDINGS  ·  7 CLASSES</Text>
          <View style={styles.footerLine} />
        </Animated.View>
      </View>
    </LinearGradient>
  );
}

// ─── Animated menu button ─────────────────────────────────────────────────────

interface MenuButtonProps {
  anim: Animated.Value;
  label: string;
  icon: string;
  color: string;
  onPress: () => void;
  dimmed?: boolean;
}

function AnimatedMenuButton({ anim, label, icon, color, onPress, dimmed }: MenuButtonProps) {
  const pressScale = useRef(new Animated.Value(1)).current;

  const onPressIn = () => {
    if (dimmed) return;
    Animated.spring(pressScale, { toValue: 0.975, useNativeDriver: true, speed: 60, bounciness: 0 }).start();
  };
  const onPressOut = () => {
    Animated.spring(pressScale, { toValue: 1, useNativeDriver: true, speed: 40, bounciness: 5 }).start();
  };

  return (
    <Animated.View
      style={{
        opacity: anim,
        transform: [
          { translateX: anim.interpolate({ inputRange: [0, 1], outputRange: [-20, 0] }) },
          { scale: pressScale },
        ],
      }}
    >
      <Pressable
        style={[
          styles.menuBtn,
          { borderColor: dimmed ? 'rgba(30,28,40,0.6)' : `${color}33` },
          dimmed && styles.menuBtnDimmed,
        ]}
        onPress={dimmed ? undefined : onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
      >
        <View style={[styles.menuBtnAccent, { backgroundColor: dimmed ? '#2a2838' : color }]} />
        <Feather name={icon as any} size={15} color={dimmed ? '#2a2838' : color} />
        <Text style={[styles.menuBtnLabel, dimmed && styles.menuBtnLabelDimmed]}>
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
  footerText: {
    fontSize: 9,
    color: '#2e2840',
    fontFamily: 'Inter_400Regular',
    letterSpacing: 1.5,
    textAlign: 'center',
  },
});
