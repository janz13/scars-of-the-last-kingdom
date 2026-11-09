import React from 'react';
import {
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

export type FactionTint =
  | 'ironSaints'
  | 'glassCourt'
  | 'hollowChildren'
  | 'redChoir'
  | 'lastArchive'
  | 'neutral';

export interface PixelFrameProps {
  children?: React.ReactNode;
  variant?: FactionTint;
  style?: StyleProp<ViewStyle>;
  cornerSize?: number; // default 4 px
  borderWidth?: number; // default 2 px
  fillColor?: string;
  glow?: boolean;
}

export interface FactionPalette {
  border: string;
  highlight: string;
  shadow: string;
  fill: string;
  glow: string;
}

export const FACTION_FRAME_PALETTES: Record<FactionTint, FactionPalette> = {
  ironSaints: {
    border: '#c9982f',
    highlight: '#f39c12',
    shadow: '#5a3d10',
    fill: 'rgba(24, 18, 10, 0.94)',
    glow: 'rgba(201, 152, 47, 0.25)',
  },
  glassCourt: {
    border: '#4fc3f7',
    highlight: '#81d4fa',
    shadow: '#1b4f72',
    fill: 'rgba(10, 20, 32, 0.94)',
    glow: 'rgba(79, 195, 247, 0.22)',
  },
  redChoir: {
    border: '#ef5350',
    highlight: '#ff7675',
    shadow: '#641e16',
    fill: 'rgba(28, 10, 12, 0.94)',
    glow: 'rgba(239, 83, 80, 0.25)',
  },
  lastArchive: {
    border: '#9b59b6',
    highlight: '#c39bd3',
    shadow: '#4a235a',
    fill: 'rgba(20, 14, 30, 0.94)',
    glow: 'rgba(155, 89, 182, 0.24)',
  },
  hollowChildren: {
    border: '#66bb6a',
    highlight: '#a9dfbf',
    shadow: '#196f3d',
    fill: 'rgba(10, 24, 14, 0.94)',
    glow: 'rgba(102, 187, 106, 0.22)',
  },
  neutral: {
    border: '#5a5468',
    highlight: '#888099',
    shadow: '#252030',
    fill: 'rgba(14, 12, 22, 0.94)',
    glow: 'rgba(90, 84, 104, 0.18)',
  },
};

/**
 * PixelFrame — 9-Slice Stepped Pixel-Notched Panel Frame
 *
 * Implements retro stepped pixel notches at the 4 corners, crisp orthogonal border
 * edges, inner metallic highlight / shadow bevels, and faction-tinted background fills.
 */
export default function PixelFrame({
  children,
  variant = 'neutral',
  style,
  cornerSize = 4,
  borderWidth = 2,
  fillColor,
  glow = false,
}: PixelFrameProps) {
  const palette = FACTION_FRAME_PALETTES[variant] || FACTION_FRAME_PALETTES.neutral;
  const bg = fillColor || palette.fill;
  const cSize = Math.max(borderWidth * 2, cornerSize);
  const step = Math.floor(cSize / 2);

  return (
    <View style={[styles.root, style]}>
      {/* Background Fill */}
      <View
        pointerEvents="none"
        style={[
          StyleSheet.absoluteFillObject,
          {
            backgroundColor: bg,
            margin: borderWidth,
            ...(glow
              ? {
                  shadowColor: palette.border,
                  shadowOffset: { width: 0, height: 0 },
                  shadowOpacity: 0.35,
                  shadowRadius: 8,
                }
              : {}),
          },
        ]}
      />

      {/* ── Connecting Border Edges ── */}
      {/* Top Edge */}
      <View
        pointerEvents="none"
        style={{
          position: 'absolute',
          top: 0,
          left: cSize,
          right: cSize,
          height: borderWidth,
          backgroundColor: palette.border,
        }}
      />
      {/* Top Inner Highlight */}
      <View
        pointerEvents="none"
        style={{
          position: 'absolute',
          top: borderWidth,
          left: cSize,
          right: cSize,
          height: 1,
          backgroundColor: palette.highlight,
          opacity: 0.65,
        }}
      />

      {/* Bottom Edge */}
      <View
        pointerEvents="none"
        style={{
          position: 'absolute',
          bottom: 0,
          left: cSize,
          right: cSize,
          height: borderWidth,
          backgroundColor: palette.border,
        }}
      />
      {/* Bottom Inner Shadow */}
      <View
        pointerEvents="none"
        style={{
          position: 'absolute',
          bottom: borderWidth,
          left: cSize,
          right: cSize,
          height: 1,
          backgroundColor: palette.shadow,
          opacity: 0.8,
        }}
      />

      {/* Left Edge */}
      <View
        pointerEvents="none"
        style={{
          position: 'absolute',
          left: 0,
          top: cSize,
          bottom: cSize,
          width: borderWidth,
          backgroundColor: palette.border,
        }}
      />
      {/* Left Inner Highlight */}
      <View
        pointerEvents="none"
        style={{
          position: 'absolute',
          left: borderWidth,
          top: cSize,
          bottom: cSize,
          width: 1,
          backgroundColor: palette.highlight,
          opacity: 0.65,
        }}
      />

      {/* Right Edge */}
      <View
        pointerEvents="none"
        style={{
          position: 'absolute',
          right: 0,
          top: cSize,
          bottom: cSize,
          width: borderWidth,
          backgroundColor: palette.border,
        }}
      />
      {/* Right Inner Shadow */}
      <View
        pointerEvents="none"
        style={{
          position: 'absolute',
          right: borderWidth,
          top: cSize,
          bottom: cSize,
          width: 1,
          backgroundColor: palette.shadow,
          opacity: 0.8,
        }}
      />

      {/* ── Stepped Pixel Notches at Corners ── */}
      {/* Top-Left Corner */}
      <View
        pointerEvents="none"
        style={{
          position: 'absolute',
          top: 0,
          left: step,
          width: cSize - step,
          height: borderWidth,
          backgroundColor: palette.border,
        }}
      />
      <View
        pointerEvents="none"
        style={{
          position: 'absolute',
          top: step,
          left: 0,
          width: borderWidth,
          height: cSize - step,
          backgroundColor: palette.border,
        }}
      />
      <View
        pointerEvents="none"
        style={{
          position: 'absolute',
          top: borderWidth,
          left: borderWidth,
          width: step - borderWidth,
          height: step - borderWidth,
          backgroundColor: palette.highlight,
          opacity: 0.75,
        }}
      />

      {/* Top-Right Corner */}
      <View
        pointerEvents="none"
        style={{
          position: 'absolute',
          top: 0,
          right: step,
          width: cSize - step,
          height: borderWidth,
          backgroundColor: palette.border,
        }}
      />
      <View
        pointerEvents="none"
        style={{
          position: 'absolute',
          top: step,
          right: 0,
          width: borderWidth,
          height: cSize - step,
          backgroundColor: palette.border,
        }}
      />
      <View
        pointerEvents="none"
        style={{
          position: 'absolute',
          top: borderWidth,
          right: borderWidth,
          width: step - borderWidth,
          height: step - borderWidth,
          backgroundColor: palette.highlight,
          opacity: 0.75,
        }}
      />

      {/* Bottom-Left Corner */}
      <View
        pointerEvents="none"
        style={{
          position: 'absolute',
          bottom: 0,
          left: step,
          width: cSize - step,
          height: borderWidth,
          backgroundColor: palette.border,
        }}
      />
      <View
        pointerEvents="none"
        style={{
          position: 'absolute',
          bottom: step,
          left: 0,
          width: borderWidth,
          height: cSize - step,
          backgroundColor: palette.border,
        }}
      />
      <View
        pointerEvents="none"
        style={{
          position: 'absolute',
          bottom: borderWidth,
          left: borderWidth,
          width: step - borderWidth,
          height: step - borderWidth,
          backgroundColor: palette.shadow,
          opacity: 0.8,
        }}
      />

      {/* Bottom-Right Corner */}
      <View
        pointerEvents="none"
        style={{
          position: 'absolute',
          bottom: 0,
          right: step,
          width: cSize - step,
          height: borderWidth,
          backgroundColor: palette.border,
        }}
      />
      <View
        pointerEvents="none"
        style={{
          position: 'absolute',
          bottom: step,
          right: 0,
          width: borderWidth,
          height: cSize - step,
          backgroundColor: palette.border,
        }}
      />
      <View
        pointerEvents="none"
        style={{
          position: 'absolute',
          bottom: borderWidth,
          right: borderWidth,
          width: step - borderWidth,
          height: step - borderWidth,
          backgroundColor: palette.shadow,
          opacity: 0.8,
        }}
      />

      {/* Content */}
      <View style={styles.contentContainer} pointerEvents="box-none">
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    position: 'relative',
    overflow: 'hidden',
  },
  contentContainer: {
    position: 'relative',
    zIndex: 1,
  },
});
