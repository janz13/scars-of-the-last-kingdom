import React, { useEffect, useMemo } from 'react';
import {
  ScrollView,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
  useWindowDimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import StorySheet, { SheetSnapPoint } from './StorySheet';
import {
  resolveLayoutMode,
  type ActiveLayoutMode,
  type LayoutSettingOverride,
} from '../../constants/pixelGrid';

export { resolveLayoutMode };
export type { ActiveLayoutMode, LayoutSettingOverride };

export interface StoryLayoutProps {
  /** User layout override from settings */
  layoutOverride?: LayoutSettingOverride;
  /** Canvas or image stage filling the background (PixelStage / BackgroundPanel) */
  artStage: React.ReactNode;
  /** Left desktop sidebar HUD (DesktopSidebarHUD) */
  sidebarHUD?: React.ReactNode;
  /** Top mobile/narrow HUD (StatBar) */
  topHUD?: React.ReactNode;
  /** Story body content (StoryText, warnings, choices) */
  storyContent: React.ReactNode;
  /** Modal overlays (DiceRollOverlay, ChapterBanner, SaveNotification) */
  overlays?: React.ReactNode;
  /** Active snap point for mobile portrait sheet (default 'half') */
  portraitSnapPoint?: SheetSnapPoint;
  /** Callback fired whenever the resolved layout mode transitions */
  onLayoutModeChange?: (mode: ActiveLayoutMode) => void;
  /** Custom root style */
  style?: StyleProp<ViewStyle>;
}

export default function StoryLayout({
  layoutOverride = 'auto',
  artStage,
  sidebarHUD,
  topHUD,
  storyContent,
  overlays,
  portraitSnapPoint = 'half',
  onLayoutModeChange,
  style,
}: StoryLayoutProps) {
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const activeMode = useMemo(
    () => resolveLayoutMode(width, height, layoutOverride),
    [width, height, layoutOverride]
  );

  useEffect(() => {
    onLayoutModeChange?.(activeMode);
  }, [activeMode, onLayoutModeChange]);

  // Wide Landscape Column Mode (aspect >= 1.5)
  if (activeMode === 'column') {
    return (
      <View style={[styles.root, style]}>
        {/* Fullscreen Art Stage */}
        <View style={StyleSheet.absoluteFill}>
          {artStage}
        </View>

        {/* Left Floating Desktop Sidebar HUD */}
        {sidebarHUD ? (
          <View style={[styles.desktopSidebarWrapper, { top: insets.top + 16, bottom: insets.bottom + 16 }]}>
            {sidebarHUD}
          </View>
        ) : null}

        {/* Right Translucent Pixel-Framed Column */}
        <View
          style={[
            styles.desktopStoryColumnWrapper,
            { top: insets.top + 16, bottom: insets.bottom + 16 },
          ]}
        >
          <ScrollView
            style={styles.scroll}
            contentContainerStyle={styles.desktopScrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {storyContent}
          </ScrollView>
        </View>

        {overlays}
      </View>
    );
  }

  // Narrow Landscape Letterbox Mode (1.0 <= aspect < 1.5)
  if (activeMode === 'letterbox') {
    return (
      <View style={[styles.root, style]}>
        {/* Art Stage */}
        <View style={StyleSheet.absoluteFill}>
          {artStage}
        </View>

        {/* Compact Top HUD */}
        {topHUD ? (
          <View style={[styles.topHUDWrapper, { paddingTop: insets.top }]}>
            {topHUD}
          </View>
        ) : null}

        {/* Bottom Translucent Letterbox Panel (~38% height) */}
        <View
          style={[
            styles.letterboxPanel,
            { paddingBottom: insets.bottom + 12 },
          ]}
        >
          <ScrollView
            style={styles.scroll}
            contentContainerStyle={styles.letterboxScrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {storyContent}
          </ScrollView>
        </View>

        {overlays}
      </View>
    );
  }

  // Portrait Mode (aspect < 1.0, Mobile phones)
  return (
    <View style={[styles.root, style]}>
      {/* Full Background Portrait Art Stage */}
      <View style={StyleSheet.absoluteFill}>
        {artStage}
      </View>

      {/* Top Mobile StatBar */}
      {topHUD ? (
        <View style={[styles.topHUDWrapper, { paddingTop: insets.top }]}>
          {topHUD}
        </View>
      ) : null}

      {/* Mobile Draggable Bottom Sheet */}
      <StorySheet
        snapPoint={portraitSnapPoint}
        contentContainerStyle={{ paddingBottom: insets.bottom + 16 }}
      >
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.mobileScrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {storyContent}
        </ScrollView>
      </StorySheet>

      {overlays}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#04020a',
    overflow: 'hidden',
  },
  scroll: {
    flex: 1,
  },
  // Wide Desktop Column
  desktopSidebarWrapper: {
    position: 'absolute',
    left: 24,
    width: 320,
    zIndex: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(155, 89, 182, 0.25)',
    backgroundColor: 'rgba(12, 10, 20, 0.9)',
    overflow: 'hidden',
  },
  desktopStoryColumnWrapper: {
    position: 'absolute',
    right: 24,
    width: '34%',
    minWidth: 380,
    maxWidth: 520,
    zIndex: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(155, 89, 182, 0.25)',
    backgroundColor: 'rgba(12, 10, 20, 0.92)',
    overflow: 'hidden',
  },
  desktopScrollContent: {
    paddingVertical: 18,
    paddingHorizontal: 12,
  },
  // Narrow Landscape Letterbox
  topHUDWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 15,
  },
  letterboxPanel: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '38%',
    minHeight: 220,
    maxHeight: 360,
    zIndex: 10,
    backgroundColor: 'rgba(10, 8, 18, 0.94)',
    borderTopWidth: 2,
    borderTopColor: 'rgba(155, 89, 182, 0.3)',
  },
  letterboxScrollContent: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    maxWidth: 960,
    alignSelf: 'center',
    width: '100%',
  },
  // Mobile Portrait
  mobileScrollContent: {
    paddingBottom: 24,
  },
});
