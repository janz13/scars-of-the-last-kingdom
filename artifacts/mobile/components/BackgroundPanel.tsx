/**
 * BackgroundPanel — Backwards-compatible wrapper delegating to PixelStage.
 *
 * Ensures all existing scenes and legacy imports automatically use the
 * double-buffered, zero-black-flash, integer-scaled pixel stage.
 */

import PixelStage, { type PixelStageProps } from './scene/PixelStage';

export default PixelStage;
export type { PixelStageProps as BackgroundPanelProps };
