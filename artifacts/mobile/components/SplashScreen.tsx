import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { markContentWarningSeen, hasSeenContentWarning } from '../logic/saveSystem';
import { useGame } from '../context/GameContext';

const SPLASH_DURATION = 2200;

export default function SplashScreen() {
  const { setScreen } = useGame();

  const logoFade = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.92)).current;
  const subtitleFade = useRef(new Animated.Value(0)).current;
  const taglineFade = useRef(new Animated.Value(0)).current;
  const exitFade = useRef(new Animated.Value(1)).current;
  const glowPulse = useRef(new Animated.Value(0.03)).current;

  useEffect(() => {
    // Phase 1: Logo entrance
    Animated.parallel([
      Animated.timing(logoFade, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.spring(logoScale, { toValue: 1, tension: 50, friction: 8, useNativeDriver: true }),
    ]).start();

    // Phase 2: Subtitle
    Animated.timing(subtitleFade, { toValue: 1, duration: 500, delay: 500, useNativeDriver: true }).start();

    // Phase 3: Tagline
    Animated.timing(taglineFade, { toValue: 1, duration: 400, delay: 900, useNativeDriver: true }).start();

    // Ambient glow
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowPulse, { toValue: 0.06, duration: 3000, useNativeDriver: true }),
        Animated.timing(glowPulse, { toValue: 0.02, duration: 3000, useNativeDriver: true }),
      ])
    ).start();

    // Phase 4: Exit and transition
    const timer = setTimeout(async () => {
      Animated.timing(exitFade, { toValue: 0, duration: 400, useNativeDriver: true }).start(async () => {
        const seen = await hasSeenContentWarning();
        if (seen) {
          setScreen('mainMenu');
        } else {
          setScreen('contentWarning');
        }
      });
    }, SPLASH_DURATION);

    return () => clearTimeout(timer);
  }, []);

  return (
    <LinearGradient colors={['#020106', '#060310', '#020106']} style={styles.container}>
      <Animated.View style={[styles.topGlow, { opacity: glowPulse }]} />
      <Animated.View style={[styles.bottomGlow, { opacity: glowPulse }]} />

      <Animated.View style={[styles.content, { opacity: exitFade }]}>
        <Animated.View style={{ opacity: logoFade, transform: [{ scale: logoScale }] }}>
          <View style={styles.runeRow}>
            <View style={styles.runeLine} />
            <View style={styles.runeDiamond} />
            <View style={styles.runeLine} />
          </View>

          <Text style={styles.title}>{'SCARS OF THE\nLAST KINGDOM'}</Text>
        </Animated.View>

        <Animated.View style={{ opacity: subtitleFade }}>
          <View style={styles.subtitleRow}>
            <View style={styles.subtitleTick} />
            <Text style={styles.subtitle}>The Ruined Station</Text>
            <View style={styles.subtitleTick} />
          </View>
        </Animated.View>

        <Animated.View style={{ opacity: taglineFade }}>
          <Text style={styles.tagline}>
            The city is dead. The mark on your wrist is not.
          </Text>
        </Animated.View>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topGlow: {
    position: 'absolute',
    top: -60,
    left: -80,
    right: -80,
    height: 300,
    backgroundColor: '#9b59b6',
    borderRadius: 200,
  },
  bottomGlow: {
    position: 'absolute',
    bottom: -80,
    left: '15%',
    right: '15%',
    height: 180,
    backgroundColor: '#4a2060',
    borderRadius: 100,
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  runeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 24,
    justifyContent: 'center',
  },
  runeLine: {
    width: 52,
    height: 1,
    backgroundColor: 'rgba(155,89,182,0.35)',
  },
  runeDiamond: {
    width: 8,
    height: 8,
    backgroundColor: '#9b59b6',
    transform: [{ rotate: '45deg' }],
    opacity: 0.9,
  },
  title: {
    fontSize: 38,
    color: '#ede0c4',
    fontFamily: 'Inter_700Bold',
    textAlign: 'center',
    letterSpacing: 4,
    lineHeight: 50,
    marginBottom: 0,
  },
  subtitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 22,
    marginBottom: 18,
  },
  subtitleTick: {
    width: 24,
    height: 1,
    backgroundColor: 'rgba(106,94,80,0.5)',
  },
  subtitle: {
    fontSize: 13,
    color: '#6a5e50',
    fontFamily: 'Inter_400Regular',
    letterSpacing: 2.5,
  },
  tagline: {
    fontSize: 14,
    color: '#4a4058',
    fontFamily: 'Inter_400Regular',
    fontStyle: 'italic',
    textAlign: 'center',
    lineHeight: 22,
    letterSpacing: 0.3,
  },
});
