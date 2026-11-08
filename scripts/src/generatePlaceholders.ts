import sharp from 'sharp';
import { readdirSync, existsSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SRC_DIR = resolve(__dirname, '../../artifacts/mobile/assets/images');
const OUT_DIR = resolve(__dirname, '../../artifacts/mobile/assets/pixel/placeholders');

const LANDSCAPE_W = 720;
const LANDSCAPE_H = 400;
const PORTRAIT_W = 400;
const PORTRAIT_H = 760;

async function generatePlaceholders() {
  if (!existsSync(OUT_DIR)) {
    mkdirSync(OUT_DIR, { recursive: true });
  }

  const files = readdirSync(SRC_DIR).filter(
    (f) => f.endsWith('.png') && f !== 'icon.png' && !f.startsWith('.')
  );

  console.log(`🖼️  Processing ${files.length} images into grid-snapped placeholders...`);

  for (const file of files) {
    const key = file.replace('.png', '');
    const srcPath = resolve(SRC_DIR, file);

    const landPath = resolve(OUT_DIR, `${key}_landscape.png`);
    const portPath = resolve(OUT_DIR, `${key}_portrait.png`);

    // Landscape 720x400 center crop with nearest-neighbor resampling
    await sharp(srcPath)
      .resize(LANDSCAPE_W, LANDSCAPE_H, {
        fit: 'cover',
        position: 'center',
        kernel: 'nearest',
      })
      .png({ palette: true, colors: 32 })
      .toFile(landPath);

    // Portrait 400x760 center crop with nearest-neighbor resampling
    await sharp(srcPath)
      .resize(PORTRAIT_W, PORTRAIT_H, {
        fit: 'cover',
        position: 'center',
        kernel: 'nearest',
      })
      .png({ palette: true, colors: 32 })
      .toFile(portPath);

    console.log(`  ✓ Generated pair for ${key}`);
  }

  console.log('✅ Grid-snapped placeholders successfully generated.');
}

generatePlaceholders().catch((err) => {
  console.error('❌ Placeholder generation failed:', err);
  process.exit(1);
});
