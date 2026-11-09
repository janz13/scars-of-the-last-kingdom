import React, { useEffect } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { markContentWarningSeen } from '../logic/saveSystem';
import { useGame } from '../context/GameContext';

const WARNINGS = [
  { icon: 'alert-triangle', text: 'Violence and death, including player-character death' },
  { icon: 'wind',           text: 'Mental health themes: despair, trauma, and dissociation' },
  { icon: 'zap',            text: 'Moral ambiguity — there are no clean hands in this world' },
  { icon: 'heart',          text: 'Loss of companions and relationships' },
  { icon: 'eye',            text: 'Disturbing imagery described through text' },
  { icon: 'moon',            text: 'Body horror and transformation themes' },
];

export default function ContentWarningScreen() {
  const { setScreen } = useGame();

  const fade = useSharedValue(0);
  const slide = useSharedValue(18);
  const btnFade = useSharedValue(0);

  useEffect(() => {
    fade.value = withTiming(1, { duration: 600 });
    slide.value = withTiming(0, { duration: 500 });
    btnFade.value = withDelay(1000, withTiming(1, { duration: 400 }));
  }, []);

  const contentAnimStyle = useAnimatedStyle(() => ({
    opacity: fade.value,
    transform: [{ translateY: slide.value }],
  }));

  const footerAnimStyle = useAnimatedStyle(() => ({
    opacity: btnFade.value,
  }));

  const handleContinue = async () => {
    await markContentWarningSeen();
    setScreen('mainMenu');
  };

  return (
    <LinearGradient colors={['#020106', '#060310', '#020106']} style={styles.container}>
      <Animated.View style={[styles.content, contentAnimStyle]}>
        <View style={styles.iconRow}>
          <View style={styles.iconRing}>
            <Feather name="alert-triangle" size={26} color="#c9a84c" />
          </View>
        </View>

        <Text style={styles.heading}>CONTENT WARNING</Text>
        <Text style={styles.subheading}>Scars of the Last Kingdom</Text>

        <View style={styles.divider} />

        <Text style={styles.intro}>
          This is a dark fantasy narrative. It contains themes and content that some players
          may find distressing. Reader discretion is advised.
        </Text>

        <View style={styles.warningList}>
          {WARNINGS.map(({ icon, text }) => (
            <View key={text} style={styles.warningRow}>
              <Feather name={icon as any} size={13} color="#6a5060" style={styles.warningIcon} />
              <Text style={styles.warningText}>{text}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.note}>
          If any of these themes are difficult for you, please take care of yourself first.
          You can always come back when you are ready.
        </Text>
      </Animated.View>

      <Animated.View style={[styles.footer, footerAnimStyle]}>
        <Pressable style={styles.btn} onPress={handleContinue}>
          <Text style={styles.btnText}>I UNDERSTAND — ENTER THE WORLD</Text>
          <Feather name="arrow-right" size={13} color="#c9a84c" />
        </Pressable>
        <Text style={styles.footerNote}>This warning will not appear again on this device.</Text>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    width: '100%',
    maxWidth: 620,
    alignSelf: 'center',
    justifyContent: 'center',
    paddingTop: 32,
  },
  iconRow: {
    alignItems: 'center',
    marginBottom: 28,
  },
  iconRing: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 1,
    borderColor: 'rgba(201,168,76,0.25)',
    backgroundColor: 'rgba(201,168,76,0.06)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 13,
    letterSpacing: 5,
    color: '#c9a84c',
    fontFamily: 'Inter_700Bold',
    textAlign: 'center',
    marginBottom: 6,
  },
  subheading: {
    fontSize: 11,
    letterSpacing: 2,
    color: '#3a3050',
    fontFamily: 'Inter_400Regular',
    textAlign: 'center',
    marginBottom: 24,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(201,168,76,0.12)',
    marginBottom: 22,
  },
  intro: {
    fontSize: 14,
    color: '#7a6e60',
    fontFamily: 'Inter_400Regular',
    lineHeight: 22,
    textAlign: 'center',
    marginBottom: 24,
  },
  warningList: {
    gap: 12,
    marginBottom: 24,
  },
  warningRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  warningIcon: {
    marginTop: 2,
    flexShrink: 0,
  },
  warningText: {
    flex: 1,
    fontSize: 13.5,
    color: '#6a5a68',
    fontFamily: 'Inter_400Regular',
    lineHeight: 21,
  },
  note: {
    fontSize: 12.5,
    color: '#4a3a50',
    fontFamily: 'Inter_400Regular',
    fontStyle: 'italic',
    textAlign: 'center',
    lineHeight: 20,
  },
  footer: {
    paddingBottom: 50,
    gap: 12,
    alignItems: 'center',
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderColor: 'rgba(201,168,76,0.35)',
    borderRadius: 3,
    paddingHorizontal: 22,
    paddingVertical: 15,
    backgroundColor: 'rgba(201,168,76,0.05)',
  },
  btnText: {
    fontSize: 11,
    letterSpacing: 2.5,
    color: '#c9a84c',
    fontFamily: 'Inter_600SemiBold',
  },
  footerNote: {
    fontSize: 10,
    color: '#3a2a40',
    fontFamily: 'Inter_400Regular',
    letterSpacing: 0.5,
  },
});
