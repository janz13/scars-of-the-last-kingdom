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

export const DEFAULT_SNAP_RATIOS = {
  peek: 0.18,
  half: 0.52,
  full: 0.85,
};

/**
 * Computes strictly monotonic snap heights clamped within the viewport [1, H].
 * Guarantees: 1 <= peek <= half <= full <= H for any viewport height H.
 * On standard viewports (H >= 640), effectiveMinPeek equals minPeekHeight (130px).
 * On small viewports (H <= 250), peek scales down to <= 75% of half to maintain distinct snap points.
 */
export function computeSnapHeights(
  viewportHeight: number,
  minPeekHeight = 130,
  snapRatios = DEFAULT_SNAP_RATIOS
): Record<SheetSnapPoint, number> {
  const safeH = Math.max(1, viewportHeight);
  const full = Math.min(safeH, Math.max(1, Math.round(safeH * snapRatios.full)));
  const half = Math.min(full, Math.max(1, Math.round(safeH * snapRatios.half)));
  const effectiveMinPeek = Math.min(minPeekHeight, Math.max(1, Math.round(half * 0.75)));
  const peek = Math.min(half, Math.max(effectiveMinPeek, Math.round(safeH * snapRatios.peek)));

  return { peek, half, full };
}

/**
 * Returns the next snap point in the cycle:
 * peek -> half -> full -> half
 */
export function getNextSnapPoint(currentSnap: SheetSnapPoint): SheetSnapPoint {
  if (currentSnap === 'peek') return 'half';
  if (currentSnap === 'half') return 'full';
  return 'half';
}

/**
 * Calculates linear clamped height during continuous drag.
 * Dragging upward decreases Y (negative dy), increasing sheet height.
 */
export function calculateDragHeight(
  startHeight: number,
  dy: number,
  snapHeights: { peek: number; full: number }
): number {
  const target = startHeight - dy;
  return Math.max(snapHeights.peek, Math.min(snapHeights.full, target));
}

/**
 * Resolves the target snap point on release based on velocity (flick) or proximity.
 */
export function resolveReleaseSnap(
  releasedHeight: number,
  vy: number,
  snapHeights: Record<SheetSnapPoint, number>
): SheetSnapPoint {
  // Fast swipe up
  if (vy < -0.5) {
    return releasedHeight < snapHeights.half ? 'half' : 'full';
  }
  // Fast swipe down
  if (vy > 0.5) {
    return releasedHeight > snapHeights.half ? 'half' : 'peek';
  }

  // Distance-based nearest snap point
  const distPeek = Math.abs(releasedHeight - snapHeights.peek);
  const distHalf = Math.abs(releasedHeight - snapHeights.half);
  const distFull = Math.abs(releasedHeight - snapHeights.full);

  if (distPeek <= distHalf && distPeek <= distFull) {
    return 'peek';
  }
  if (distHalf <= distPeek && distHalf <= distFull) {
    return 'half';
  }
  return 'full';
}

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

  // Compute snap heights in pixels with monotonic clamping
  const snapHeights = computeSnapHeights(H, minPeekHeight, snapRatios);

  const [currentSnap, setCurrentSnap] = useState<SheetSnapPoint>(snapPoint);
  const sheetHeightAnim = useRef(new Animated.Value(snapHeights[snapPoint])).current;
  const currentHeightRef = useRef(snapHeights[snapPoint]);
  const dragStartHeightRef = useRef(snapHeights[snapPoint]);
  const hasDraggedRef = useRef(false);

  // Keep currentHeightRef updated with the animated value
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

  // Adjust sheet height if viewport height H changes (e.g. window resize or rotation)
  const prevHRef = useRef(H);
  useEffect(() => {
    if (prevHRef.current !== H) {
      prevHRef.current = H;
      animateToSnap(currentSnap);
    }
  }, [H, currentSnap]);

  // Cycle snap on handle tap: peek -> half -> full -> half
  const handleTap = () => {
    const next = getNextSnapPoint(currentSnap);
    animateToSnap(next);
  };

  // PanResponder for drag handle
  const panResponder = useRef(
    PanResponder.create({
      // Do NOT capture at start phase: allows child <Pressable> to receive taps without touch starvation
      onStartShouldSetPanResponder: () => false,
      onStartShouldSetPanResponderCapture: () => false,
      // Claim responder once movement exceeds 5px threshold (drag gesture initiated)
      onMoveShouldSetPanResponder: (_, gesture) => Math.abs(gesture.dy) > 5,
      onMoveShouldSetPanResponderCapture: (_, gesture) => Math.abs(gesture.dy) > 5,
      onPanResponderGrant: () => {
        // Record starting height at the exact moment drag begins
        dragStartHeightRef.current = currentHeightRef.current;
        hasDraggedRef.current = false;
      },
      onPanResponderMove: (_, gesture) => {
        if (Math.abs(gesture.dy) > 5) {
          hasDraggedRef.current = true;
        }
        // Linear finger tracking from fixed start height: avoids quadratic runaway
        const clamped = calculateDragHeight(dragStartHeightRef.current, gesture.dy, snapHeights);
        sheetHeightAnim.setValue(clamped);
      },
      onPanResponderRelease: (_, gesture) => {
        // If movement was below drag threshold, treat as tap cycle fallback
        if (!hasDraggedRef.current && Math.abs(gesture.dy) < 5 && Math.abs(gesture.dx) < 5) {
          handleTap();
          return;
        }

        const releasedHeight = dragStartHeightRef.current - gesture.dy;
        const targetSnap = resolveReleaseSnap(releasedHeight, gesture.vy, snapHeights);
        animateToSnap(targetSnap);
      },
      onPanResponderTerminate: () => {
        // Gesture interrupted by parent or system: snap back to current state
        animateToSnap(currentSnap);
      },
      onPanResponderTerminationRequest: () => false,
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
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
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
