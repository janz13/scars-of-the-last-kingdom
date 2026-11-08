import React, { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface SaveNotificationProps {
  visible: boolean;
  message?: string;
}

export default function SaveNotification({ visible, message = 'Saved' }: SaveNotificationProps) {
  const [show, setShow] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-20)).current;

  useEffect(() => {
    if (visible) {
      setShow(true);
      Animated.parallel([
        Animated.timing(fadeAnim, { toValue: 1, duration: 200, useNativeDriver: true }),
        Animated.timing(slideAnim, { toValue: 0, duration: 200, useNativeDriver: true }),
      ]).start();

      const timer = setTimeout(() => {
        Animated.parallel([
          Animated.timing(fadeAnim, { toValue: 0, duration: 400, useNativeDriver: true }),
          Animated.timing(slideAnim, { toValue: -20, duration: 400, useNativeDriver: true }),
        ]).start(() => setShow(false));
      }, 1800);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  if (!show) return null;

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
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
