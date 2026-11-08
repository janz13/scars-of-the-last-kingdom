import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { hasSeenContentWarning } from '../logic/saveSystem';
import { useGame } from '../context/GameContext';
import { MOTION_SPRINGS } from '../constants/motion';

const SPLASH_DURATION = 2200;

export default function SplashScreen() {
  const { setScreen } = useGame();

  const logoFade = useSharedValue(0);
  const logoScale = useSharedValue(0.92);
  const subtitleFade = useSharedValue(0);
  const taglineFade = useSharedValue(0);
  const exitFade = useSharedValue(1);
  const glowPulse = useSharedValue(0.03);

  useEffect(() => {
    logoFade.value = withTiming(1, { duration: 600 });
    logoScale.value = withSpring(1, MOTION_SPRINGS.gentle);
    subtitleFade.value = withDelay(500, withTiming(1, { duration: 500 }));
    taglineFade.value = withDelay(900, withTiming(1, { duration: 400 }));

    glowPulse.value = withRepeat(
      withSequence(
        withTiming(0.06, { duration: 3000 }),
        withTiming(0.02, { duration: 3000 })
      ),
      -1,
      false
    );

    const timer = setTimeout(() => {
      exitFade.value = withTiming(0, { duration: 400 });
      setTimeout(async () => {
        const seen = await hasSeenContentWarning();
        if (seen) {
          setScreen('mainMenu');
        } else {
          setScreen('contentWarning');
        }
      }, 410);
    }, SPLASH_DURATION);

    return () => clearTimeout(timer);
  }, []);

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glowPulse.value,
  }));

  const exitStyle = useAnimatedStyle(() => ({
    opacity: exitFade.value,
  }));

  const logoStyle = useAnimatedStyle(() => ({
    opacity: logoFade.value,
    transform: [{ scale: logoScale.value }],
  }));

  const subtitleStyle = useAnimatedStyle(() => ({
    opacity: subtitleFade.value,
  }));

  const taglineStyle = useAnimatedStyle(() => ({
    opacity: taglineFade.value,
  }));

  return (
    <LinearGradient colors={['#020106', '#060310', '#020106']} style={styles.container}>
      <Animated.View style={[styles.topGlow, glowStyle]} />
      <Animated.View style={[styles.bottomGlow, glowStyle]} />

      <Animated.View style={[styles.content, exitStyle]}>
        <Animated.View style={logoStyle}>
          <View style={styles.runeRow}>
            <View style={styles.runeLine} />
            <View style={styles.runeDiamond} />
            <View style={styles.runeLine} />
          </View>

          <Text style={styles.title}>{'SCARS OF THE\nLAST KINGDOM'}</Text>
        </Animated.View>

        <Animated.View style={subtitleStyle}>
          <View style={styles.subtitleRow}>
            <View style={styles.subtitleTick} />
            <Text style={styles.subtitle}>The Ruined Station</Text>
            <View style={styles.subtitleTick} />
          </View>
        </Animated.View>

        <Animated.View style={taglineStyle}>
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
