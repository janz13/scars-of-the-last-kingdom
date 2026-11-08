import { useEffect, useState } from 'react';
import { AccessibilityInfo, Platform } from 'react-native';

export function useReducedMotion(): boolean {
  const [reducedMotion, setReducedMotion] = useState<boolean>(() => {
    if (Platform.OS === 'web' && typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (Platform.OS === 'web') {
      if (typeof window === 'undefined' || !window.matchMedia) return;
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setReducedMotion(mediaQuery.matches);

      const handleChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);

      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
      } else if ((mediaQuery as any).addListener) {
        (mediaQuery as any).addListener(handleChange);
        return () => (mediaQuery as any).removeListener(handleChange);
      }
    } else {
      let isMounted = true;
      if (AccessibilityInfo?.isReduceMotionEnabled) {
        AccessibilityInfo.isReduceMotionEnabled().then((enabled) => {
          if (isMounted) setReducedMotion(enabled);
        });
      }
      const subscription = AccessibilityInfo?.addEventListener?.(
        'reduceMotionChanged',
        (enabled: boolean) => {
          if (isMounted) setReducedMotion(enabled);
        }
      );
      return () => {
        isMounted = false;
        subscription?.remove?.();
      };
    }
  }, []);

  return reducedMotion;
}
