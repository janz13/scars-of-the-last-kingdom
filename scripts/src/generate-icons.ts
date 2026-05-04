/**
 * generate-icons.ts
 *
 * Generates all icon sizes required for Google Play and Expo from the
 * master 1024×1024 icon at artifacts/mobile/assets/images/icon.png.
 *
 * Run from the workspace root:
 *   pnpm --filter @workspace/scripts run generate-icons
 *
 * Output directory: artifacts/mobile/assets/icons/
 *
 * Generated files:
 *
 *   Play Store / General
 *     icon-1024.png          1024×1024  Master (same as source, copied)
 *     icon-512.png            512×512   Play Store listing icon
 *     icon-192.png            192×192   PWA / launcher
 *
 *   Android launcher icons (mipmap densities)
 *     launcher-xxxhdpi.png    192×192   ~640 dpi
 *     launcher-xxhdpi.png     144×144   ~480 dpi
 *     launcher-xhdpi.png       96×96    ~320 dpi
 *     launcher-hdpi.png        72×72    ~240 dpi
 *     launcher-mdpi.png        48×48    ~160 dpi
 *
 *   Adaptive icon (Android 8.0+)
 *     adaptive-foreground.png 1024×1024 Full icon on transparent bg
 *     adaptive-background.png 1024×1024 Solid #04020a background layer
 *
 *   Notification icons (monochrome, white on transparent)
 *     notification-24.png      24×24    Status bar
 *     notification-36.png      36×36    High density status bar
 *
 *   Apple icons (for web PWA)
 *     apple-touch-icon.png    180×180   iOS home screen
 *
 * After running this script, update app.json to point to the new paths:
 *   "adaptiveIcon": {
 *     "foregroundImage": "./assets/icons/adaptive-foreground.png",
 *     "backgroundImage": "./assets/icons/adaptive-background.png"
 *   }
 */

import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const WORKSPACE_ROOT = path.resolve(__dirname, '..', '..');
const SOURCE_ICON = path.join(WORKSPACE_ROOT, 'artifacts/mobile/assets/images/icon.png');
const OUTPUT_DIR = path.join(WORKSPACE_ROOT, 'artifacts/mobile/assets/icons');

const BRAND_BG = '#04020a';

interface IconSpec {
  filename: string;
  width: number;
  height: number;
  description: string;
  transform?: (s: sharp.Sharp) => sharp.Sharp;
}

const SPECS: IconSpec[] = [
  // ── Play Store / General ──────────────────────────────────────────────────
  {
    filename: 'icon-1024.png',
    width: 1024,
    height: 1024,
    description: 'Master icon (Play Store, Expo)',
  },
  {
    filename: 'icon-512.png',
    width: 512,
    height: 512,
    description: 'Play Store listing icon',
  },
  {
    filename: 'icon-192.png',
    width: 192,
    height: 192,
    description: 'PWA icon / launcher (any)',
  },

  // ── Android launcher (mipmap densities) ───────────────────────────────────
  {
    filename: 'launcher-xxxhdpi.png',
    width: 192,
    height: 192,
    description: 'Launcher xxxhdpi (192px)',
  },
  {
    filename: 'launcher-xxhdpi.png',
    width: 144,
    height: 144,
    description: 'Launcher xxhdpi (144px)',
  },
  {
    filename: 'launcher-xhdpi.png',
    width: 96,
    height: 96,
    description: 'Launcher xhdpi (96px)',
  },
  {
    filename: 'launcher-hdpi.png',
    width: 72,
    height: 72,
    description: 'Launcher hdpi (72px)',
  },
  {
    filename: 'launcher-mdpi.png',
    width: 48,
    height: 48,
    description: 'Launcher mdpi (48px)',
  },

  // ── Adaptive icon layers ──────────────────────────────────────────────────
  {
    filename: 'adaptive-foreground.png',
    width: 1024,
    height: 1024,
    description: 'Adaptive icon — foreground (transparent bg)',
    // Resize to fill the inner 66% safe zone (672px) and centre on 1024 canvas.
    // Android crops the outer 18% on each side, so art within the central 672px
    // is always visible.
    transform: (s) =>
      s
        .resize(672, 672, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .extend({
          top: 176,
          bottom: 176,
          left: 176,
          right: 176,
          background: { r: 0, g: 0, b: 0, alpha: 0 },
        }),
  },
  {
    filename: 'adaptive-background.png',
    width: 1024,
    height: 1024,
    description: 'Adaptive icon — background (solid brand colour)',
    transform: (s) =>
      s
        .resize(1024, 1024)
        .flatten({ background: BRAND_BG })
        // Paint the entire canvas with the brand colour
        .composite([
          {
            input: {
              create: {
                width: 1024,
                height: 1024,
                channels: 4 as const,
                background: { r: 4, g: 2, b: 10, alpha: 255 },
              },
            },
            blend: 'over',
          },
        ]),
  },

  // ── Notification icons ────────────────────────────────────────────────────
  {
    filename: 'notification-24.png',
    width: 24,
    height: 24,
    description: 'Notification icon (status bar)',
    transform: (s) =>
      s
        .resize(24, 24, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .grayscale()
        .threshold(128),
  },
  {
    filename: 'notification-36.png',
    width: 36,
    height: 36,
    description: 'Notification icon hdpi (status bar)',
    transform: (s) =>
      s
        .resize(36, 36, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .grayscale()
        .threshold(128),
  },

  // ── Apple PWA ─────────────────────────────────────────────────────────────
  {
    filename: 'apple-touch-icon.png',
    width: 180,
    height: 180,
    description: 'Apple touch icon (iOS home screen)',
    // Apple adds its own rounding and gloss — export as a flat square
    transform: (s) => s.flatten({ background: BRAND_BG }),
  },
];

async function generateIcon(spec: IconSpec): Promise<void> {
  const output = path.join(OUTPUT_DIR, spec.filename);

  let pipeline = sharp(SOURCE_ICON).resize(spec.width, spec.height, {
    fit: 'contain',
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  });

  if (spec.transform) {
    // Re-load source at original resolution for transforms that do custom sizing
    pipeline = spec.transform(sharp(SOURCE_ICON));
  }

  await pipeline.png({ compressionLevel: 9 }).toFile(output);

  const stat = await fs.stat(output);
  const kb = (stat.size / 1024).toFixed(1);
  console.log(`  ✓  ${spec.filename.padEnd(32)} ${spec.width}×${spec.height}  (${kb} KB)  — ${spec.description}`);
}

async function main(): Promise<void> {
  console.log('');
  console.log('Scars of the Last Kingdom — Icon Generator');
  console.log('===========================================');
  console.log(`Source : ${SOURCE_ICON}`);
  console.log(`Output : ${OUTPUT_DIR}`);
  console.log('');

  // Verify source exists
  try {
    await fs.access(SOURCE_ICON);
  } catch {
    console.error(`ERROR: Source icon not found at ${SOURCE_ICON}`);
    process.exit(1);
  }

  // Check source dimensions
  const meta = await sharp(SOURCE_ICON).metadata();
  if (!meta.width || !meta.height) {
    console.error('ERROR: Could not read source image dimensions.');
    process.exit(1);
  }

  if (meta.width < 1024 || meta.height < 1024) {
    console.warn(
      `WARNING: Source icon is ${meta.width}×${meta.height}. Recommended minimum is 1024×1024.`
    );
    console.warn('         Output icons may appear blurry or pixelated.');
  } else {
    console.log(`Source dimensions: ${meta.width}×${meta.height} ✓`);
  }

  console.log('');

  // Create output directory
  await fs.mkdir(OUTPUT_DIR, { recursive: true });

  // Generate all icons
  console.log('Generating icons...');
  for (const spec of SPECS) {
    try {
      await generateIcon(spec);
    } catch (err) {
      console.error(`  ✗  ${spec.filename}: ${(err as Error).message}`);
    }
  }

  console.log('');
  console.log(`Done. ${SPECS.length} icons written to ${OUTPUT_DIR}`);
  console.log('');
  console.log('Next steps:');
  console.log('  1. Review generated icons in artifacts/mobile/assets/icons/');
  console.log('  2. Update app.json adaptive icon paths:');
  console.log('       "foregroundImage": "./assets/icons/adaptive-foreground.png"');
  console.log('       "backgroundImage": "./assets/icons/adaptive-background.png"');
  console.log('  3. Upload icon-512.png to Google Play Console → Store listing → Icon');
  console.log('  4. Use icon-1024.png as the EAS build icon source');
  console.log('');
}

main().catch((err) => {
  console.error('Fatal:', err);
  process.exit(1);
});
