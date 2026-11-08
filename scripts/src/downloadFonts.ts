import { writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const FONTS_DIR = resolve(__dirname, '../../artifacts/mobile/assets/fonts');

const FONT_DOWNLOADS = [
  // TTF files (universal Expo Web & Native runtime compatibility)
  {
    name: 'PressStart2P-Regular.ttf',
    url: 'https://fonts.gstatic.com/s/pressstart2p/v16/e3t4euO8T-267oIAQAu6jDQyK0nS.ttf',
  },
  {
    name: 'PixelifySans-Regular.ttf',
    url: 'https://fonts.gstatic.com/s/pixelifysans/v3/CHy2V-3HFUT7aC4iv1TxGDR9DHEserHN25py2TTp0H1Y.ttf',
  },
  {
    name: 'PixelifySans-Medium.ttf',
    url: 'https://fonts.gstatic.com/s/pixelifysans/v3/CHy2V-3HFUT7aC4iv1TxGDR9DHEserHN25py2TTb0H1Y.ttf',
  },
  {
    name: 'PixelifySans-SemiBold.ttf',
    url: 'https://fonts.gstatic.com/s/pixelifysans/v3/CHy2V-3HFUT7aC4iv1TxGDR9DHEserHN25py2TQ3131Y.ttf',
  },
  {
    name: 'PixelifySans-Bold.ttf',
    url: 'https://fonts.gstatic.com/s/pixelifysans/v3/CHy2V-3HFUT7aC4iv1TxGDR9DHEserHN25py2TQO131Y.ttf',
  },
  // WOFF2 Latin subset files (for self-hosted web asset specification)
  {
    name: 'PressStart2P-Regular.woff2',
    url: 'https://fonts.gstatic.com/s/pressstart2p/v16/e3t4euO8T-267oIAQAu6jDQyK3nVivM.woff2',
  },
  {
    name: 'PixelifySans-Regular.woff2',
    url: 'https://fonts.gstatic.com/s/pixelifysans/v3/CHylV-3HFUT7aC4iv1TxGDR9Jn0Eiw.woff2',
  },
  {
    name: 'PixelifySans-Medium.woff2',
    url: 'https://fonts.gstatic.com/s/pixelifysans/v3/CHylV-3HFUT7aC4iv1TxGDR9Jn0Eiw.woff2',
  },
  {
    name: 'PixelifySans-SemiBold.woff2',
    url: 'https://fonts.gstatic.com/s/pixelifysans/v3/CHylV-3HFUT7aC4iv1TxGDR9Jn0Eiw.woff2',
  },
  {
    name: 'PixelifySans-Bold.woff2',
    url: 'https://fonts.gstatic.com/s/pixelifysans/v3/CHylV-3HFUT7aC4iv1TxGDR9Jn0Eiw.woff2',
  },
];

async function downloadFonts() {
  if (!existsSync(FONTS_DIR)) {
    mkdirSync(FONTS_DIR, { recursive: true });
  }

  console.log(`📥 Downloading OFL fonts to ${FONTS_DIR}...`);

  for (const item of FONT_DOWNLOADS) {
    const dest = resolve(FONTS_DIR, item.name);
    if (existsSync(dest)) {
      console.log(`  ✓ ${item.name} already exists`);
      continue;
    }
    console.log(`  ⬇ Fetching ${item.name}...`);
    const resp = await fetch(item.url);
    if (!resp.ok) {
      throw new Error(`Failed to download ${item.name}: ${resp.status} ${resp.statusText}`);
    }
    const buf = Buffer.from(await resp.arrayBuffer());
    writeFileSync(dest, buf);
    console.log(`  ✓ Saved ${item.name} (${Math.round(buf.length / 1024)} KB)`);
  }

  // Write license documentation
  const licensePath = resolve(FONTS_DIR, 'OFL.txt');
  if (!existsSync(licensePath)) {
    writeFileSync(
      licensePath,
      'Pixelify Sans is licensed under the SIL Open Font License 1.1 (c) Stefie Justprince.\n' +
      'Press Start 2P is licensed under the SIL Open Font License 1.1 (c) CodeMan38.\n' +
      'Inter is licensed under the SIL Open Font License 1.1 (c) Rasmus Andersson.\n',
      'utf-8'
    );
  }

  console.log('✅ Font acquisition complete.');
}

downloadFonts().catch((err) => {
  console.error('❌ Font download failed:', err);
  process.exit(1);
});
