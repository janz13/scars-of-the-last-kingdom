import { Platform, TextStyle } from 'react-native';

export const FONT_FAMILIES = {
  title: 'PressStart2P-Regular',
  ui: 'PixelifySans-Regular',
  uiMedium: 'PixelifySans-Medium',
  uiSemiBold: 'PixelifySans-SemiBold',
  uiBold: 'PixelifySans-Bold',
  proseInter: 'Inter_400Regular',
  proseInterMedium: 'Inter_500Medium',
  proseInterSemiBold: 'Inter_600SemiBold',
  proseInterBold: 'Inter_700Bold',
  prosePixel: 'PixelifySans-Regular',
} as const;

export type ProseFontPreference = 'inter' | 'pixel';

export function getProseFontFamily(
  preference: ProseFontPreference = 'inter',
  weight: 'regular' | 'medium' | 'semibold' | 'bold' = 'regular'
): string {
  if (preference === 'pixel') {
    switch (weight) {
      case 'bold': return FONT_FAMILIES.uiBold;
      case 'semibold': return FONT_FAMILIES.uiSemiBold;
      case 'medium': return FONT_FAMILIES.uiMedium;
      default: return FONT_FAMILIES.ui;
    }
  }

  switch (weight) {
    case 'bold': return FONT_FAMILIES.proseInterBold;
    case 'semibold': return FONT_FAMILIES.proseInterSemiBold;
    case 'medium': return FONT_FAMILIES.proseInterMedium;
    default: return FONT_FAMILIES.proseInter;
  }
}

function isWeb(): boolean {
  try {
    const { Platform } = require('react-native');
    if (Platform && Platform.OS) return Platform.OS === 'web';
  } catch {
    // Non-fatal
  }
  return typeof window !== 'undefined';
}

/**
 * Disables font smoothing on desktop browsers to ensure pixel-font glyphs remain crisp bitmaps.
 */
export const pixelFontSmoothingStyle: TextStyle = isWeb()
  ? ({
      WebkitFontSmoothing: 'none',
      MozOsxFontSmoothing: 'unset',
      fontSmooth: 'never',
    } as any)
  : {};
