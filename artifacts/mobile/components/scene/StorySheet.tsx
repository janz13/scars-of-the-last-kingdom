import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  PanResponder,
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
  useWindowDimensions,
} from 'react-native';

export type SheetSnapPoint = 'peek' | 'half' | 'full';

export interface StorySheetProps {
  /** Sheet content (StoryText, warnings, choices) */
  children: React.ReactNode;
  /** Current active snap point (default: 'half') */
  snapPoint?: SheetSnapPoint;
  /** Callback when snap point changes via drag or tap */
  onSnapChange?: (snap: SheetSnapPoint) => void;
  /** Viewport height override (defaults to useWindowDimensions().height) */
  viewportHeight?: number;
  /** Custom height ratios: peek (default 0.18), half (default 0.52), full (default 0.85) */
  snapRatios?: {
    peek: number;
    half: number;
    full: number;
  };
  /** Minimum pixel height for peek state */
  minPeekHeight?: number;
  /** Reduced motion flag to bypass spring physics */
  reducedMotion?: boolean;
  /** Outer container style */
  style?: StyleProp<ViewStyle>;
  /** Inner content container style */
  contentContainerStyle?: StyleProp<ViewStyle>;
}

const DEFAULT_SNAP_RATIOS = {
  peek: 0.18,
  half: 0.52,
  full: 0.85,
};

export default function StorySheet({
  children,
  snapPoint = 'half',
  onSnapChange,
  viewportHeight: customHeight,
  snapRatios = DEFAULT_SNAP_RATIOS,
  minPeekHeight = 130,
  reducedMotion = false,
  style,
  contentContainerStyle,
}: StorySheetProps) {
  const { height: windowHeight } = useWindowDimensions();
  const H = customHeight ?? windowHeight;

  // Compute snap heights in pixels
  const snapHeights: Record<SheetSnapPoint, number> = {
    peek: Math.max(minPeekHeight, Math.round(H * snapRatios.peek)),
    half: Math.round(H * snapRatios.half),
    full: Math.round(H * snapRatios.full),
  };

  const [currentSnap, setCurrentSnap] = useState<SheetSnapPoint>(snapPoint);
  const sheetHeightAnim = useRef(new Animated.Value(snapHeights[snapPoint])).current;
  const currentHeightRef = useRef(snapHeights[snapPoint]);

  // Keep ref updated
  useEffect(() => {
    const id = sheetHeightAnim.addListener(({ value }) => {
      currentHeightRef.current = value;
    });
    return () => sheetHeightAnim.removeListener(id);
  }, [sheetHeightAnim]);

  // Animate to snap point
  const animateToSnap = (target: SheetSnapPoint) => {
    const targetHeight = snapHeights[target];
    setCurrentSnap(target);
    onSnapChange?.(target);

    if (reducedMotion) {
      sheetHeightAnim.setValue(targetHeight);
    } else {
      Animated.spring(sheetHeightAnim, {
        toValue: targetHeight,
        friction: 8,
        tension: 45,
        useNativeDriver: false,
      }).start();
    }
  };

  // Sync external snap changes
  useEffect(() => {
    if (snapPoint !== currentSnap) {
      animateToSnap(snapPoint);
    }
  }, [snapPoint]);

  // Cycle snap on handle tap: peek -> half -> full -> half
  const handleTap = () => {
    if (currentSnap === 'peek') animateToSnap('half');
    else if (currentSnap === 'half') animateToSnap('full');
    else animateToSnap('half');
  };

  // PanResponder for drag handle
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gesture) => Math.abs(gesture.dy) > 5,
      onPanResponderMove: (_, gesture) => {
        // Dragging upwards decreases Y, so height increases
        const newHeight = currentHeightRef.current - gesture.dy;
        const clamped = Math.max(snapHeights.peek, Math.min(snapHeights.full, newHeight));
        sheetHeightAnim.setValue(clamped);
      },
      onPanResponderRelease: (_, gesture) => {
        const releasedHeight = currentHeightRef.current - gesture.dy;
        const vy = gesture.vy;

        // Velocity-based snapping
        if (vy < -0.5) {
          // Fast swipe up
          if (releasedHeight < snapHeights.half) animateToSnap('half');
          else animateToSnap('full');
          return;
        }
        if (vy > 0.5) {
          // Fast swipe down
          if (releasedHeight > snapHeights.half) animateToSnap('half');
          else animateToSnap('peek');
          return;
        }

        // Distance-based nearest snap point
        const distPeek = Math.abs(releasedHeight - snapHeights.peek);
        const distHalf = Math.abs(releasedHeight - snapHeights.half);
        const distFull = Math.abs(releasedHeight - snapHeights.full);

        if (distPeek <= distHalf && distPeek <= distFull) {
          animateToSnap('peek');
        } else if (distHalf <= distPeek && distHalf <= distFull) {
          animateToSnap('half');
        } else {
          animateToSnap('full');
        }
      },
    })
  ).current;

  return (
    <Animated.View
      style={[
        styles.sheetContainer,
        { height: sheetHeightAnim },
        style,
      ]}
    >
      {/* Draggable Top Handle Bar */}
      <View {...panResponder.panHandlers} style={styles.dragArea}>
        <Pressable
          onPress={handleTap}
          hitSlop={12}
          accessibilityRole="button"
          accessibilityLabel="Adjust story panel height"
          style={styles.handleHitZone}
        >
          <View style={styles.dragBar} />
        </Pressable>
      </View>

      {/* Sheet Content Container */}
      <View style={[styles.contentArea, contentContainerStyle]}>
        {children}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  sheetContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(8, 6, 16, 0.95)',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderTopWidth: 2,
    borderTopColor: 'rgba(155, 89, 182, 0.35)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.6,
    shadowRadius: 16,
    zIndex: 20,
    overflow: 'hidden',
  },
  dragArea: {
    width: '100%',
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(14, 10, 24, 0.8)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(155, 89, 182, 0.1)',
  },
  handleHitZone: {
    paddingVertical: 6,
    paddingHorizontal: 20,
  },
  dragBar: {
    width: 42,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(155, 89, 182, 0.5)',
  },
  contentArea: {
    flex: 1,
  },
});
