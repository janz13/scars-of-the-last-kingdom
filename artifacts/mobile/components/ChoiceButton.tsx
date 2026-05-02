import React, { useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface Props {
  choiceId: string;
  text: string;
  met: boolean;
  reasons: string[];
  flavorText?: string;
  onPress: () => void;
}

export default function ChoiceButton({ choiceId, text, met, reasons, flavorText, onPress }: Props) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    if (!met) return;
    Animated.spring(scaleAnim, { toValue: 0.97, useNativeDriver: true, speed: 50 }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true, speed: 50 }).start();
  };

  const reasonText = reasons.length > 0 ? reasons[0] : flavorText ?? '';

  return (
    <Animated.View style={[{ transform: [{ scale: scaleAnim }] }, styles.wrapper]}>
      <Pressable
        onPress={met ? onPress : undefined}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[styles.button, met ? styles.buttonActive : styles.buttonLocked]}
      >
        <View style={styles.row}>
          {!met && (
            <Feather name="lock" size={13} color="#5a5060" style={styles.lockIcon} />
          )}
          {met && (
            <View style={styles.diamond} />
          )}
          <Text style={[styles.text, met ? styles.textActive : styles.textLocked]} numberOfLines={4}>
            {text}
          </Text>
        </View>

        {!met && reasonText !== '' && (
          <Text style={styles.reason}>{reasonText}</Text>
        )}
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
    borderRadius: 4,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  buttonActive: {
    backgroundColor: 'rgba(20,16,30,0.88)',
    borderColor: '#4a3060',
  },
  buttonLocked: {
    backgroundColor: 'rgba(10,8,15,0.75)',
    borderColor: '#2a2030',
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
});
