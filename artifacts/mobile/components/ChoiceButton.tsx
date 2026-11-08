import React, { useEffect, useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { Feather } from '@expo/vector-icons';
import type { DiceCheck } from '../data/types';
import { DICE_STAT_LABELS } from '../logic/diceEngine';
import { MOTION_EASINGS, MOTION_SPRINGS } from '../constants/motion';

interface Props {
  choiceId: string;
  text: string;
  met: boolean;
  reasons: string[];
  flavorText?: string;
  diceCheck?: DiceCheck;
  onPress: () => void;
  hotkeyIndex?: number;
  isTyping?: boolean;
  onSkip?: () => void;
}

const RIPPLE = Platform.OS === 'android'
  ? { color: 'rgba(155,89,182,0.15)', borderless: false }
  : undefined;

const HIT_SLOP = { top: 3, bottom: 3, left: 6, right: 6 };

export default function ChoiceButton({
  choiceId,
  text,
  met,
  reasons,
  flavorText,
  diceCheck,
  onPress,
  hotkeyIndex,
  isTyping,
  onSkip,
}: Props) {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 900;
  const showHotkey = isDesktop && hotkeyIndex !== undefined;

  const reasonText = reasons.length > 0 ? reasons.join(' · ') : (flavorText ?? '');
  const hasDice = Boolean(diceCheck);
  const [isHovered, setIsHovered] = useState(false);

  const scaleAnim = useSharedValue(1);
  const pressY = useSharedValue(0);
  const shakeX = useSharedValue(0);
  const entryOpacity = useSharedValue(0);
  const entrySlideX = useSharedValue(-8);

  useEffect(() => {
    const staggerMs = ((hotkeyIndex ?? 1) - 1) * 45;
    entryOpacity.value = 0;
    entrySlideX.value = -8;
    entryOpacity.value = withDelay(
      staggerMs,
      withTiming(1, { duration: 180, easing: MOTION_EASINGS.step6 })
    );
    entrySlideX.value = withDelay(
      staggerMs,
      withTiming(0, { duration: 180, easing: MOTION_EASINGS.step6 })
    );
  }, [choiceId, hotkeyIndex]);

  const onPressIn = () => {
    if (!met && !isTyping) {
      // Chain-rattle horizontal shake on locked choice press
      shakeX.value = withSequence(
        withTiming(-4, { duration: 40 }),
        withTiming(4, { duration: 40 }),
        withTiming(-3, { duration: 40 }),
        withTiming(3, { duration: 40 }),
        withTiming(0, { duration: 40 })
      );
      return;
    }
    scaleAnim.value = withSpring(0.985, MOTION_SPRINGS.snappy);
    pressY.value = withTiming(2, { duration: 60 });
  };

  const onPressOut = () => {
    scaleAnim.value = withSpring(1, MOTION_SPRINGS.snappy);
    pressY.value = withTiming(0, { duration: 80 });
  };

  const handlePress = () => {
    if (isTyping) {
      onSkip?.();
      return;
    }
    if (met) {
      onPress();
    }
  };

  const wrapperAnimStyle = useAnimatedStyle(() => ({
    opacity: entryOpacity.value,
    transform: [
      { translateX: Math.round(entrySlideX.value + shakeX.value) },
      { translateY: Math.round(pressY.value) },
      { scale: scaleAnim.value },
    ],
  }));

  const diceInfoDesc = hasDice
    ? `${DICE_STAT_LABELS[diceCheck!.stat]} check, DC ${diceCheck!.difficulty}`
    : '';
  const choiceAriaLabel = [
    showHotkey ? `Choice ${hotkeyIndex}: ` : '',
    text,
    hasDice ? `. ${diceInfoDesc}` : '',
    !met && reasonText ? `. Locked: ${reasonText}` : '',
  ].filter(Boolean).join('');

  return (
    <Animated.View style={[styles.wrapper, wrapperAnimStyle]}>
      <Pressable
        onPress={met || isTyping ? handlePress : undefined}
        android_ripple={met ? RIPPLE : undefined}
        hitSlop={HIT_SLOP}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        onHoverIn={() => setIsHovered(true)}
        onHoverOut={() => setIsHovered(false)}
        role="button"
        accessibilityRole="button"
        aria-label={choiceAriaLabel}
        accessibilityLabel={choiceAriaLabel}
        aria-disabled={!met}
        accessibilityState={{ disabled: !met }}
        tabIndex={met ? 0 : -1}
        focusable={met}
        {...({ dataSet: { choiceButton: 'true' } } as any)}
        style={({ focused }: any) => [
          styles.button,
          met ? styles.buttonActive : styles.buttonLocked,
          hasDice && met && styles.buttonDice,
          isHovered && met && styles.buttonHovered,
          focused && styles.buttonFocused,
        ]}
      >
        {/* Left accent bar */}
        {met && (
          <View
            style={[
              styles.accentBar,
              { backgroundColor: hasDice ? '#b87de0' : isHovered ? '#f39c12' : '#e67e22' },
            ]}
          />
        )}

        <View style={styles.inner}>
          <View style={styles.row}>
            {showHotkey && (
              <View style={[styles.hotkeyBadge, !met && styles.hotkeyBadgeLocked]}>
                <Text style={[styles.hotkeyText, !met && styles.hotkeyTextLocked]}>
                  [{hotkeyIndex}]
                </Text>
              </View>
            )}
            {!met && (
              <Feather name="lock" size={12} color="#4a4058" style={styles.lockIcon} />
            )}
            {met && !hasDice && (
              <View style={[styles.diamond, isHovered && { backgroundColor: '#f39c12' }]} />
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
              <Feather
                name="chevron-right"
                size={13}
                color={isHovered ? '#f39c12' : 'rgba(230,126,34,0.4)'}
              />
            )}
          </View>

          {hasDice && met && (
            <View style={styles.diceInfo}>
              <Feather name="zap" size={10} color="#b87de0" />
              <Text style={styles.diceInfoText}>
                {DICE_STAT_LABELS[diceCheck!.stat]} check · DC {diceCheck!.difficulty}
              </Text>
            </View>
          )}

          {!met && reasonText !== '' && (
            <View style={styles.reasonRow}>
              <Feather name="info" size={9} color="#8c829e" style={styles.reasonIcon} />
              <Text style={styles.reason}>{reasonText}</Text>
            </View>
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
  buttonHovered: {
    borderColor: 'rgba(243,156,18,0.75)',
    backgroundColor: 'rgba(28,18,46,0.96)',
  },
  buttonLocked: {
    backgroundColor: 'rgba(8,6,14,0.7)',
    borderColor: 'rgba(40,35,50,0.5)',
  },
  buttonFocused: {
    borderColor: '#c9a84c',
    borderWidth: 2,
    ...(Platform.OS === 'web'
      ? {
          outlineColor: '#c9a84c',
          outlineStyle: 'solid',
          outlineWidth: 2,
          outlineOffset: 2,
          boxShadow: '0 0 12px rgba(201, 168, 76, 0.65)',
        }
      : {}),
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
  hotkeyBadge: {
    backgroundColor: 'rgba(201,168,76,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(201,168,76,0.4)',
    borderRadius: 3,
    paddingHorizontal: 4,
    paddingVertical: 1,
    marginRight: 2,
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hotkeyBadgeLocked: {
    backgroundColor: 'rgba(30,25,40,0.5)',
    borderColor: 'rgba(70,55,90,0.35)',
  },
  hotkeyText: {
    fontSize: 10,
    fontFamily: 'Inter_700Bold',
    color: '#c9a84c',
    letterSpacing: 0.5,
  },
  hotkeyTextLocked: {
    color: '#a696bc',
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
    color: '#cca0f0',
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
    color: '#5a4870',
    fontFamily: 'Inter_400Regular',
  },
  reason: {
    fontSize: 11,
    color: '#a696bc',
    fontFamily: 'Inter_400Regular',
    fontStyle: 'italic',
    flex: 1,
  },
  reasonRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 5,
    marginTop: 6,
    marginLeft: 15,
  },
  reasonIcon: {
    marginTop: 1,
    flexShrink: 0,
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
    color: '#c695ec',
    fontFamily: 'Inter_600SemiBold',
    letterSpacing: 0.3,
  },
});
