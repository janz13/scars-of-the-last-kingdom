import React from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
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
  ? { color: 'rgba(155,89,182,0.18)', borderless: false }
  : undefined;

const HIT_SLOP = { top: 4, bottom: 4, left: 8, right: 8 };

export default function ChoiceButton({
  choiceId,
  text,
  met,
  reasons,
  flavorText,
  diceCheck,
  onPress,
}: Props) {
  const reasonText = reasons.length > 0 ? reasons[0] : (flavorText ?? '');
  const hasDice = Boolean(diceCheck);

  return (
    <View style={styles.wrapper}>
      <Pressable
        onPress={met ? onPress : undefined}
        android_ripple={met ? RIPPLE : undefined}
        hitSlop={HIT_SLOP}
        style={({ pressed }) => [
          styles.button,
          met ? styles.buttonActive : styles.buttonLocked,
          hasDice && met && styles.buttonDice,
          met && pressed && Platform.OS !== 'android' && styles.buttonPressed,
        ]}
      >
        <View style={styles.row}>
          {!met && (
            <Feather name="lock" size={13} color="#5a5060" style={styles.lockIcon} />
          )}
          {met && !hasDice && <View style={styles.diamond} />}
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
        </View>

        {/* Dice info row — stat + DC */}
        {hasDice && met && (
          <View style={styles.diceInfo}>
            <Feather name="zap" size={10} color="#9b59b6" />
            <Text style={styles.diceInfoText}>
              {DICE_STAT_LABELS[diceCheck!.stat]} check · DC {diceCheck!.difficulty}
            </Text>
          </View>
        )}

        {!met && reasonText !== '' && (
          <Text style={styles.reason}>{reasonText}</Text>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 8,
  },
  button: {
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 14,
    paddingVertical: 13,
    overflow: 'hidden',
  },
  buttonActive: {
    backgroundColor: 'rgba(20,16,30,0.88)',
    borderColor: '#4a3060',
  },
  buttonDice: {
    borderColor: '#6a3090',
    backgroundColor: 'rgba(22,14,38,0.92)',
  },
  buttonLocked: {
    backgroundColor: 'rgba(10,8,15,0.75)',
    borderColor: '#2a2030',
  },
  buttonPressed: {
    backgroundColor: 'rgba(30,20,48,0.95)',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  diamond: {
    width: 6,
    height: 6,
    backgroundColor: '#e67e22',
    transform: [{ rotate: '45deg' }],
    marginRight: 2,
    flexShrink: 0,
  },
  diceBadge: {
    backgroundColor: 'rgba(155,89,182,0.18)',
    borderWidth: 1,
    borderColor: '#5a3070',
    borderRadius: 3,
    paddingHorizontal: 5,
    paddingVertical: 1,
    flexShrink: 0,
  },
  diceBadgeText: {
    fontSize: 9,
    color: '#9b59b6',
    fontFamily: 'Inter_700Bold',
    letterSpacing: 0.5,
  },
  lockIcon: {
    marginRight: 2,
    flexShrink: 0,
  },
  text: {
    fontSize: 14,
    lineHeight: 20,
    flex: 1,
    letterSpacing: 0.3,
  },
  textActive: {
    color: '#d4c5a9',
    fontFamily: 'Inter_400Regular',
  },
  textLocked: {
    color: '#4a4050',
    fontFamily: 'Inter_400Regular',
  },
  reason: {
    fontSize: 11,
    color: '#5a4a70',
    marginTop: 5,
    marginLeft: 16,
    fontFamily: 'Inter_400Regular',
    fontStyle: 'italic',
  },
  diceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 6,
    marginLeft: 2,
  },
  diceInfoText: {
    fontSize: 10,
    color: '#6a4a80',
    fontFamily: 'Inter_600SemiBold',
    letterSpacing: 0.8,
  },
});
