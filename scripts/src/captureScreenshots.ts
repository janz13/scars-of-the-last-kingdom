import { chromium } from '@playwright/test';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, '../..');
const DIST_ROOT = path.resolve(ROOT_DIR, 'artifacts/mobile/dist');
const SCREENSHOTS_DIR = path.resolve(ROOT_DIR, 'docs/screenshots');
const PORT = 3058;

const MIME_TYPES: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.webp': 'image/webp',
};

const VIEWPORTS = [
  { name: '390x844_mobile_portrait', width: 390, height: 844 },
  { name: '430x932_mobile_max', width: 430, height: 932 },
  { name: '768x1024_tablet_portrait', width: 768, height: 1024 },
  { name: '1280x720_desktop_hd', width: 1280, height: 720 },
  { name: '1920x1080_desktop_fhd', width: 1920, height: 1080 },
  { name: '2560x1440_desktop_qhd', width: 2560, height: 1440 },
  { name: '3440x1440_ultrawide_21x9', width: 3440, height: 1440 },
] as const;

const QUALITY_TIERS = ['low', 'medium', 'high'] as const;

function buildSavePayload(overrides: Record<string, unknown> = {}) {
  return {
    character: {
      name: 'Kaelen',
      characterClass: 'blade_survivor',
      background: 'wasteland_orphan',
      startingCompanion: 'mira',
      personalityTrait: 'pragmatic',
    },
    stats: {
      health: 86,
      maxHealth: 100,
      hunger: 74,
      thirst: 78,
      morale: 82,
      trust: 4,
      strength: 8,
      intelligence: 6,
      agility: 7,
      charisma: 6,
      luck: 6,
      corruption: 18,
    },
    inventory: {
      food: 3,
      water: 3,
      scrap: 14,
      medicine: 2,
      ammo: 5,
      relics: 2,
      reputation: 6,
    },
    flags: { mira_met: true, met_cain: true },
    currentNodeId: 'find_mira_clinic',
    screen: 'story',
    companions: {
      mira: { present: true, trust: 6, alive: true },
      cain: { present: true, trust: 3, alive: true },
    },
    factionRep: {
      ironSaints: 25,
      glassCourt: 15,
      hollowChildren: -10,
      redChoir: 5,
      lastArchive: 40,
    },
    routeHistory: [],
    endingsDiscovered: [
      'ending_epilogue_yes_were_here',
      'ending_last_kingdom_remembers',
      'masked_heir_ending',
    ],
    settings: {
      textSpeed: 'instant',
      fontSize: 'normal',
      soundEnabled: false,
      autoSave: true,
      skipDiceAnimation: false,
      textLayout: 'auto',
      proseFont: 'inter',
      qualityTier: 'high',
    },
    activeEnding: null,
    ...overrides,
  };
}

async function captureAll() {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });

  const server = http.createServer((req, res) => {
    const url = new URL(req.url || '/', `http://127.0.0.1:${PORT}`);
    const pathname = decodeURIComponent(url.pathname);
    const safePath = path.normalize(pathname).replace(/^(\.\.(\/|\\|$))+/, '');
    let filePath = path.join(DIST_ROOT, safePath === '/' ? 'index.html' : safePath);

    if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
      filePath = path.join(DIST_ROOT, 'index.html');
    }

    if (!fs.existsSync(filePath)) {
      res.writeHead(404);
      res.end('Not Found');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    res.writeHead(200, { 'content-type': contentType });
    res.end(fs.readFileSync(filePath));
  });

  await new Promise<void>((resolve) => server.listen(PORT, '127.0.0.1', () => resolve()));
  const browser = await chromium.launch({ headless: true, channel: 'chrome' });

  try {
    // 1. Capture all 7 viewports in StoryPanel gameplay (and MainMenu on key viewports)
    for (const vp of VIEWPORTS) {
      const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
      const savePayload = buildSavePayload();
      await context.addInitScript((payload) => {
        localStorage.setItem('@scars_content_warning_v1', 'true');
        localStorage.setItem('@scars_intro_seen_v1', 'true');
        localStorage.setItem('@scars_mark_awakening_seen_ch1', '1');
        localStorage.setItem('@scars_mark_awakening_seen_ch9', '1');
        localStorage.setItem('@scars_save_v1', JSON.stringify(payload));
      }, savePayload);

      const page = await context.newPage();
      await page.goto(`http://127.0.0.1:${PORT}/`, { waitUntil: 'networkidle' });
      // Wait for SplashScreen (2.6s) to transition to MainMenu
      const continueBtn = page.getByText('CONTINUE JOURNEY', { exact: true });
      await continueBtn.waitFor({ state: 'visible', timeout: 8000 });
      await page.waitForTimeout(600);

      if (vp.name === '1920x1080_desktop_fhd' || vp.name === '390x844_mobile_portrait') {
        const menuPath = path.join(SCREENSHOTS_DIR, `main_menu_${vp.width}x${vp.height}.png`);
        await page.screenshot({ path: menuPath });
        console.log(`Captured ${path.basename(menuPath)}`);
      }

      // Click CONTINUE to enter StoryPanel and wait for sheet/title transitions
      await continueBtn.click();
      await page.waitForTimeout(1600);

      const outPath = path.join(SCREENSHOTS_DIR, `viewport_${vp.name}.png`);
      await page.screenshot({ path: outPath });
      console.log(`Captured ${path.basename(outPath)}`);
      await context.close();
    }

    // 2. Capture Low / Medium / High quality tiers at 1280x720
    for (const tier of QUALITY_TIERS) {
      const context = await browser.newContext({ viewport: { width: 1280, height: 720 } });
      const savePayload = buildSavePayload({
        currentNodeId: 'chapter1_start',
        settings: {
          textSpeed: 'instant',
          fontSize: 'normal',
          soundEnabled: false,
          autoSave: true,
          skipDiceAnimation: false,
          textLayout: 'auto',
          proseFont: 'inter',
          qualityTier: tier,
        },
      });
      await context.addInitScript((payload) => {
        localStorage.setItem('@scars_content_warning_v1', 'true');
        localStorage.setItem('@scars_intro_seen_v1', 'true');
        localStorage.setItem('@scars_mark_awakening_seen_ch1', '1');
        localStorage.setItem('@scars_mark_awakening_seen_ch9', '1');
        localStorage.setItem('@scars_save_v1', JSON.stringify(payload));
      }, savePayload);

      const page = await context.newPage();
      await page.goto(`http://127.0.0.1:${PORT}/`, { waitUntil: 'networkidle' });
      const continueBtn = page.getByText('CONTINUE JOURNEY', { exact: true });
      await continueBtn.waitFor({ state: 'visible', timeout: 8000 });
      await continueBtn.click();
      await page.waitForTimeout(900);

      const outPath = path.join(SCREENSHOTS_DIR, `quality_tier_${tier}_1280x720.png`);
      await page.screenshot({ path: outPath });
      console.log(`Captured ${path.basename(outPath)}`);
      await context.close();
    }

    // 3. Capture Set Pieces: Mark Awakening (Ch1) + Dice Roll Overlay
    {
      const context = await browser.newContext({ viewport: { width: 1280, height: 720 } });
      const savePayload = buildSavePayload({
        currentNodeId: 'find_cain_security',
      });
      await context.addInitScript((payload) => {
        localStorage.setItem('@scars_content_warning_v1', 'true');
        localStorage.setItem('@scars_intro_seen_v1', 'true');
        localStorage.setItem('@scars_mark_awakening_seen_ch1', '1');
        localStorage.setItem('@scars_save_v1', JSON.stringify(payload));
      }, savePayload);

      const page = await context.newPage();
      await page.goto(`http://127.0.0.1:${PORT}/`, { waitUntil: 'networkidle' });
      const continueBtn = page.getByText('CONTINUE JOURNEY', { exact: true });
      await continueBtn.waitFor({ state: 'visible', timeout: 8000 });
      await continueBtn.click();
      await page.waitForTimeout(700);

      const forceChoice = page.locator('text=/Force the door open/i');
      if ((await forceChoice.count()) > 0) {
        await forceChoice.first().click();
        await page.waitForTimeout(450);
      }
      const dicePath = path.join(SCREENSHOTS_DIR, 'setpiece_dice_roll_1280x720.png');
      await page.screenshot({ path: dicePath });
      console.log(`Captured ${path.basename(dicePath)}`);
      await context.close();
    }
  } finally {
    await browser.close();
    server.close();
  }
}

captureAll().catch((err) => {
  console.error(err);
  process.exit(1);
});
