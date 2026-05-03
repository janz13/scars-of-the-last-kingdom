import React, { useRef } from 'react';
import { Animated, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import type { DiceCheck } from '../data/types';
import { DICE_STAT_LABELS } from '../logic/diceEngine';

interface Props {
  choiceId: string;
  text: string;
  met: boolean;
  reasons: string[];
  flavorText?: string;
  diceCheck?: DiceCheck;
  onPress: () => void;
}

const RIPPLE = Platform.OS === 'android'
  ? { color: 'rgba(155,89,182,0.15)', borderless: false }
  : undefined;

const HIT_SLOP = { top: 3, bottom: 3, left: 6, right: 6 };

export default function ChoiceButton({
  text, met, reasons, flavorText, diceCheck, onPress,
}: Props) {
  const reasonText = reasons.length > 0 ? reasons[0] : (flavorText ?? '');
  const hasDice = Boolean(diceCheck);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const onPressIn = () => {
    if (!met) return;
    Animated.spring(scaleAnim, { toValue: 0.975, useNativeDriver: true, speed: 60, bounciness: 0 }).start();
  };
  const onPressOut = () => {
    Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true, speed: 40, bounciness: 4 }).start();
  };

  return (
    <Animated.View style={[styles.wrapper, { transform: [{ scale: scaleAnim }] }]}>
      <Pressable
        onPress={met ? onPress : undefined}
        android_ripple={met ? RIPPLE : undefined}
        hitSlop={HIT_SLOP}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        style={[
          styles.button,
          met ? styles.buttonActive : styles.buttonLocked,
          hasDice && met && styles.buttonDice,
        ]}
      >
        {/* Left accent bar */}
        {met && (
          <View
            style={[
              styles.accentBar,
              { backgroundColor: hasDice ? '#7b3fa8' : '#e67e22' },
            ]}
          />
        )}

        <View style={styles.inner}>
          <View style={styles.row}>
            {!met && (
              <Feather name="lock" size={12} color="#3a3045" style={styles.lockIcon} />
            )}
            {met && !hasDice && (
              <View style={styles.diamond} />
            )}
            {met && hasDice && (
              <View style={styles.diceBadge}>
                <Text style={styles.diceBadgeText}>{diceCheck!.diceType.toUpperCase()}</Text>
              </View>
            )}
            <Text
              style={[styles.text, met ? styles.textActive : styles.textLocked]}
              numberOfLines={5}
            >
              {text}
            </Text>
            {met && !hasDice && (
              <Feather name="chevron-right" size={13} color="rgba(230,126,34,0.4)" />
            )}
          </View>

          {hasDice && met && (
            <View style={styles.diceInfo}>
              <Feather name="zap" size={10} color="#7b3fa8" />
              <Text style={styles.diceInfoText}>
                {DICE_STAT_LABELS[diceCheck!.stat]} check · DC {diceCheck!.difficulty}
              </Text>
            </View>
          )}

          {!met && reasonText !== '' && (
            <Text style={styles.reason}>{reasonText}</Text>
          )}
        </View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 8,
  },
  button: {
    borderWidth: 1,
    borderRadius: 3,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  buttonActive: {
    backgroundColor: 'rgba(18,12,32,0.92)',
    borderColor: 'rgba(80,55,110,0.6)',
  },
  buttonDice: {
    backgroundColor: 'rgba(20,10,38,0.95)',
    borderColor: 'rgba(100,50,140,0.65)',
  },
  buttonLocked: {
    backgroundColor: 'rgba(8,6,14,0.7)',
    borderColor: 'rgba(40,35,50,0.5)',
  },
  accentBar: {
    width: 3,
    alignSelf: 'stretch',
    opacity: 0.75,
  },
  inner: {
    flex: 1,
    paddingHorizontal: 13,
    paddingVertical: 13,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  diamond: {
    width: 5,
    height: 5,
    backgroundColor: '#e67e22',
    transform: [{ rotate: '45deg' }],
    flexShrink: 0,
    opacity: 0.85,
  },
  diceBadge: {
    backgroundColor: 'rgba(123,63,168,0.18)',
    borderWidth: 1,
    borderColor: 'rgba(123,63,168,0.45)',
    borderRadius: 3,
    paddingHorizontal: 5,
    paddingVertical: 2,
    flexShrink: 0,
  },
  diceBadgeText: {
    fontSize: 9,
    color: '#a060d0',
    fontFamily: 'Inter_700Bold',
    letterSpacing: 0.5,
  },
  lockIcon: {
    marginRight: 2,
    flexShrink: 0,
  },
  text: {
    fontSize: 14,
    lineHeight: 21,
    flex: 1,
    letterSpacing: 0.2,
  },
  textActive: {
    color: '#d4c5a9',
    fontFamily: 'Inter_400Regular',
  },
  textLocked: {
    color: '#3a3045',
    fontFamily: 'Inter_400Regular',
  },
  reason: {
    fontSize: 11,
    color: '#4a3860',
    marginTop: 6,
    marginLeft: 15,
    fontFamily: 'Inter_400Regular',
    fontStyle: 'italic',
  },
  diceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 7,
    marginLeft: 1,
  },
  diceInfoText: {
    fontSize: 10,
    color: '#7b3fa8',
    fontFamily: 'Inter_600SemiBold',
    letterSpacing: 0.8,
  },
});
