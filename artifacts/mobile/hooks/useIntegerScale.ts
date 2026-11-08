import { useMemo } from 'react';
import { PixelRatio, Platform, useWindowDimensions } from 'react-native';
import {
  computeViewportScale,
  type ViewportScale,
} from '../constants/pixelGrid';

export interface UseIntegerScaleResult extends ViewportScale {
  /** Ready-to-use style object for positioning the canvas or container */
  stageStyle: {
    position: 'absolute';
    width: number;
    height: number;
    left: number;
    top: number;
  };
  /** Converts art-pixels to scaled CSS pixels */
  artToCssPx: (artPx: number) => number;
  /** Converts CSS pixels back to art-pixels */
  cssToArtPx: (cssPx: number) => number;
}

/**
 * Hook providing integer scale, centering offsets, and orientation status.
 * Automatically updates on resize or device rotation.
 */
export function useIntegerScale(): UseIntegerScaleResult {
  const { width, height } = useWindowDimensions();

  // Obtain DPR safely across Web and Native
  const dpr = useMemo(() => {
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      return window.devicePixelRatio || 1;
    }
    return PixelRatio.get();
  }, []);

  // Compute viewport scale configuration
  const viewportScale = useMemo(() => {
    // If dimensions are uninitialized (e.g. initial SSR), provide standard 1080p baseline
    const vw = width > 0 ? width : 1920;
    const vh = height > 0 ? height : 1080;
    return computeViewportScale(vw, vh, dpr);
  }, [width, height, dpr]);

  const stageStyle = useMemo(
    () => ({
      position: 'absolute' as const,
      width: viewportScale.displayWidth,
      height: viewportScale.displayHeight,
      left: viewportScale.offsetX,
      top: viewportScale.offsetY,
    }),
    [viewportScale.displayWidth, viewportScale.displayHeight, viewportScale.offsetX, viewportScale.offsetY]
  );

  const artToCssPx = (artPx: number) => artPx * viewportScale.scale;
  const cssToArtPx = (cssPx: number) => Math.floor(cssPx / viewportScale.scale);

  return {
    ...viewportScale,
    stageStyle,
    artToCssPx,
    cssToArtPx,
  };
}
