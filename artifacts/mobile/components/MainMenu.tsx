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
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  const topPad = Platform.OS === 'web' ? 67 : insets.top;
  const botPad = Platform.OS === 'web' ? 34 : insets.bottom;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 1200, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 900, useNativeDriver: true }),
    ]).start();
  }, []);

  const discovered = state.endingsDiscovered.length;
  const total = ENDINGS.length + 1;

  return (
    <LinearGradient
      colors={['#04020a', '#0a0614', '#08041a', '#04020a']}
      style={styles.container}
    >
      {/* Atmospheric top glow */}
      <View style={styles.topGlow} />

      <Animated.View
        style={[
          styles.content,
          { paddingTop: topPad + 40, paddingBottom: botPad + 20 },
          { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
        ]}
      >
        {/* Game Title */}
        <View style={styles.titleGroup}>
          <View style={styles.markDecoration}>
            <View style={styles.markLine} />
            <View style={styles.markDiamond} />
            <View style={styles.markLine} />
          </View>

          <Text style={styles.chapterLabel}>CHAPTER I</Text>
          <Text style={styles.title}>SCARS OF THE{'\n'}LAST KINGDOM</Text>
          <Text style={styles.subtitle}>The Ruined Station</Text>

          <Text style={styles.tagline}>
            The city is dead. The mark on your wrist is not.
          </Text>
        </View>

        {/* Menu Buttons */}
        <View style={styles.buttons}>
          <MenuButton
            label="NEW GAME"
            icon="play"
            color="#9b59b6"
            onPress={() => setScreen('characterCreator')}
          />

          {hasSaveGame && (
            <MenuButton
              label="CONTINUE"
              icon="rotate-cw"
              color="#e67e22"
              onPress={() => continueGame()}
            />
          )}

          <MenuButton
            label={`ENDINGS  ${discovered}/${total}`}
            icon="book"
            color="#6a5e50"
            onPress={() => setScreen('ending')}
            dimmed={discovered === 0}
          />

          <MenuButton
            label="CHAPTER ROADMAP"
            icon="map"
            color="#5dade2"
            onPress={() => setScreen('chapterRoadmap')}
          />

          <MenuButton
            label="SETTINGS"
            icon="settings"
            color="#4a4050"
            onPress={() => setScreen('settings')}
          />
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.footerLine} />
          <Text style={styles.footerText}>98 STORY NODES  ·  11 ENDINGS  ·  7 CHARACTER CLASSES</Text>
          <View style={styles.footerLine} />
        </View>
      </Animated.View>
    </LinearGradient>
  );
}

interface MenuButtonProps {
  label: string;
  icon: string;
  color: string;
  onPress: () => void;
  dimmed?: boolean;
}

function MenuButton({ label, icon, color, onPress, dimmed }: MenuButtonProps) {
  const pressAnim = useRef(new Animated.Value(1)).current;

  return (
    <Animated.View style={{ transform: [{ scale: pressAnim }] }}>
      <Pressable
        style={[styles.menuBtn, { borderColor: dimmed ? '#1a1a28' : color + '55', opacity: dimmed ? 0.4 : 1 }]}
        onPress={dimmed ? undefined : onPress}
        onPressIn={() => Animated.spring(pressAnim, { toValue: 0.97, useNativeDriver: true, speed: 50 }).start()}
        onPressOut={() => Animated.spring(pressAnim, { toValue: 1, useNativeDriver: true, speed: 50 }).start()}
      >
        <View style={[styles.menuBtnAccent, { backgroundColor: color }]} />
        <Feather name={icon as any} size={16} color={color} />
        <Text style={[styles.menuBtnText, { color: dimmed ? '#4a4050' : '#d4c5a9' }]}>{label}</Text>
        <Feather name="chevron-right" size={14} color={color + '88'} style={styles.menuChevron} />
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  topGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 200,
    backgroundColor: 'transparent',
    borderBottomWidth: 0,
    shadowColor: '#9b59b6',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 60,
  },
  content: {
    flex: 1,
    paddingHorizontal: 28,
    justifyContent: 'space-between',
  },
  titleGroup: {
    alignItems: 'center',
    paddingTop: 20,
  },
  markDecoration: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 20,
  },
  markLine: {
    width: 40,
    height: 1,
    backgroundColor: '#9b59b644',
  },
  markDiamond: {
    width: 8,
    height: 8,
    backgroundColor: '#9b59b6',
    transform: [{ rotate: '45deg' }],
  },
  chapterLabel: {
    fontSize: 10,
    letterSpacing: 5,
    color: '#9b59b6',
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 12,
  },
  title: {
    fontSize: 32,
    color: '#d4c5a9',
    fontFamily: 'Inter_700Bold',
    textAlign: 'center',
    letterSpacing: 3,
    lineHeight: 40,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 13,
    color: '#6a5e50',
    fontFamily: 'Inter_400Regular',
    letterSpacing: 2,
    marginBottom: 20,
  },
  tagline: {
    fontSize: 14,
    color: '#5a4e60',
    fontFamily: 'Inter_400Regular',
    fontStyle: 'italic',
    textAlign: 'center',
    lineHeight: 20,
  },
  buttons: {
    gap: 10,
    flex: 1,
    justifyContent: 'center',
    marginVertical: 20,
  },
  menuBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 15,
    backgroundColor: 'rgba(10,8,20,0.7)',
    gap: 12,
    overflow: 'hidden',
  },
  menuBtnAccent: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 3,
    opacity: 0.8,
  },
  menuBtnText: {
    flex: 1,
    fontSize: 12,
    letterSpacing: 3,
    fontFamily: 'Inter_600SemiBold',
  },
  menuChevron: { marginLeft: 'auto' },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingBottom: 10,
  },
  footerLine: { flex: 1, height: 1, backgroundColor: '#1a1a28' },
  footerText: {
    fontSize: 9,
    color: '#3a3040',
    fontFamily: 'Inter_400Regular',
    letterSpacing: 1,
    textAlign: 'center',
  },
});
