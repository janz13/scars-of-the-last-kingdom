import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Feather } from '@expo/vector-icons';

interface SaveNotificationProps {
  visible: boolean;
  message?: string;
}

export default function SaveNotification({ visible, message = 'Saved' }: SaveNotificationProps) {
  const [show, setShow] = useState(false);
  const fadeAnim = useSharedValue(0);
  const slideAnim = useSharedValue(-20);

  useEffect(() => {
    if (visible) {
      setShow(true);
      fadeAnim.value = withTiming(1, { duration: 200 });
      slideAnim.value = withTiming(0, { duration: 200 });

      const timer = setTimeout(() => {
        fadeAnim.value = withTiming(0, { duration: 400 });
        slideAnim.value = withTiming(-20, { duration: 400 });
        setTimeout(() => setShow(false), 410);
      }, 1800);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  const animStyle = useAnimatedStyle(() => ({
    opacity: fadeAnim.value,
    transform: [{ translateY: slideAnim.value }],
  }));

  if (!show) return null;

  return (
    <Animated.View style={[styles.container, animStyle]}>
      <Feather name="check-circle" size={12} color="#27ae60" />
      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 80,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(10,6,20,0.92)',
    borderWidth: 1,
    borderColor: 'rgba(39,174,96,0.3)',
    borderRadius: 4,
    paddingHorizontal: 14,
    paddingVertical: 8,
    zIndex: 200,
  },
  text: {
    fontSize: 11,
    color: '#27ae60',
    fontFamily: 'Inter_600SemiBold',
    letterSpacing: 1,
  },
});
