/**
 * Empirical Challenger Independent Live Playwright Probe
 * Target: https://janz13.github.io/scars-of-the-last-kingdom/
 *
 * Verifies:
 * 1. Choice clicking mutates `@scars_save_slot_auto` in live localStorage.
 * 2. `nodesVisited` sequence accurately reflects live transitions.
 * 3. Zero unhandled console errors, page errors, or unhandled promise rejections.
 * 4. Investigates why specific chapters (final_chapter1_start, epi_01) did or did not take choices in live swarm.
 */

import { chromium, type Browser, type BrowserContext, type Page } from '@playwright/test';

const LIVE_URL = 'https://janz13.github.io/scars-of-the-last-kingdom/';

interface ProbeResult {
  chapter: string;
  startNodeId: string;
  initialSaveNode: string;
  choicesAttempted: number;
  choicesSuccessful: number;
  steps: Array<{
    step: number;
    fromNode: string;
    choiceText: string;
    toNode: string;
    saveMutated: boolean;
    routeHistoryLength: number;
  }>;
  nodesVisitedSequence: string[];
  consoleErrors: string[];
  pageErrors: string[];
  unhandledRejections: string[];
  terminalScreenDetected: string | null;
  status: 'PASS' | 'FAIL';
  notes: string[];
}

function buildSeedSave(currentNodeId: string, overrides: Record<string, any> = {}) {
  const flags: Record<string, boolean> = {
    prologue_complete: true,
    met_mira: true,
    met_cain: true,
    mira_joins_party: true,
    cain_joins_party: true,
    small_names_memorized: true,
    mira_event_sacrifice_offer_seen: true, // Mark seen to test normal narrative progression without interrupt
    fc1_complete: true,
    final_chapter1_complete: true,
    unlocked_finalChapter2: true,
    epilogue_unlocked: true,
  };
  for (let c = 1; c <= 12; c++) flags[`chapter${c}_complete`] = true;

  return {
    screen: 'story',
    character: {
      name: 'Auditor',
      characterClass: 'blade_survivor',
      background: 'wasteland_orphan',
      startingCompanion: 'mira',
      personalityTrait: 'pragmatic',
    },
    stats: {
      health: 85,
      maxHealth: 100,
      hunger: 80,
      thirst: 80,
      morale: 80,
      trust: 6,
      strength: 10,
      intelligence: 10,
      agility: 10,
      charisma: 10,
      luck: 10,
      corruption: 10,
    },
    inventory: {
      food: 5,
      water: 5,
      medicine: 3,
      scrap: 20,
      ammo: 10,
      relics: 4,
      reputation: 10,
    },
    currentNodeId,
    flags,
    companions: {
      mira: { present: true, trust: 6, alive: true },
      cain: { present: true, trust: 6, alive: true },
    },
    factionRep: {
      ironSaints: 35,
      glassCourt: 35,
      hollowChildren: 35,
      redChoir: 35,
      lastArchive: 35,
    },
    routeHistory: [],
    endingsDiscovered: [],
    settings: {
      textSpeed: 'instant',
      fontSize: 'normal',
      soundEnabled: true,
      autoSave: true,
      skipDiceAnimation: true,
      textLayout: 'auto',
      proseFont: 'inter',
      qualityTier: 'high',
    },
    activeEnding: null,
    ...overrides,
  };
}

async function probeChapter(browser: Browser, chapterName: string, startNodeId: string, maxSteps = 4): Promise<ProbeResult> {
  console.log(`\n============================================================`);
  console.log(`🔍 PROBING CHAPTER: ${chapterName} (Start: ${startNodeId})`);
  console.log(`============================================================`);

  const consoleErrors: string[] = [];
  const pageErrors: string[] = [];
  const unhandledRejections: string[] = [];
  const notes: string[] = [];
  const steps: ProbeResult['steps'] = [];
  const nodesVisitedSequence: string[] = [];

  const context = await browser.newContext({ viewport: { width: 1920, height: 919 } });
  const seedState = buildSeedSave(startNodeId);
  const seedStateJson = JSON.stringify(seedState);
  const metaPayload = {
    auto: {
      slotId: 'auto',
      label: 'Autosave',
      timestamp: Date.now(),
      chapter: chapterName,
      location: 'Audit Sector',
      characterName: seedState.character.name,
      characterClass: seedState.character.characterClass,
      isEmpty: false,
    },
    slot1: { slotId: 'slot1', label: 'Manual Slot 1', timestamp: 0, chapter: '', location: '', characterName: '', characterClass: '', isEmpty: true },
    slot2: { slotId: 'slot2', label: 'Manual Slot 2', timestamp: 0, chapter: '', location: '', characterName: '', characterClass: '', isEmpty: true },
    slot3: { slotId: 'slot3', label: 'Manual Slot 3', timestamp: 0, chapter: '', location: '', characterName: '', characterClass: '', isEmpty: true },
  };

  await context.addInitScript((payload) => {
    localStorage.setItem('@scars_content_warning_v1', 'true');
    localStorage.setItem('@scars_intro_seen_v1', 'true');
    localStorage.setItem('@scars_mark_awakening_seen_ch1', '1');
    localStorage.setItem('@scars_mark_awakening_seen_ch9', '1');
    localStorage.setItem('@scars_save_v1', payload.seedStateJson);
    localStorage.setItem('@scars_save_slot_auto', payload.seedStateJson);
    localStorage.setItem('@scars_save_meta', JSON.stringify(payload.metaPayload));

    window.addEventListener('unhandledrejection', (event: any) => {
      const reason = event.reason?.stack || event.reason?.message || String(event.reason);
      console.error('UNHANDLED_REJECTION: ' + reason);
    });
  }, { seedStateJson, metaPayload });

  const page = await context.newPage();
  page.on('pageerror', (err) => pageErrors.push(`PAGEERROR: ${err.message}`));
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      const text = msg.text();
      if (text.includes('UNHANDLED_REJECTION:')) {
        unhandledRejections.push(text);
      } else {
        consoleErrors.push(`CONSOLE_ERROR: ${text}`);
      }
    }
  });

  let initialSaveNode = '';
  let terminalScreen: string | null = null;

  try {
    const url = `${LIVE_URL}?probe=${startNodeId}_${Date.now()}`;
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });

    const continueBtn = page.getByText('CONTINUE JOURNEY', { exact: true });
    await continueBtn.waitFor({ state: 'visible', timeout: 15000 });
    await continueBtn.click();
    await page.waitForTimeout(1500);

    const getAutoSlot = async () => {
      const raw = await page.evaluate(() => localStorage.getItem('@scars_save_slot_auto'));
      return raw ? JSON.parse(raw) : null;
    };

    let curSave = await getAutoSlot();
    initialSaveNode = curSave?.currentNodeId || startNodeId;
    nodesVisitedSequence.push(initialSaveNode);
    console.log(`  📍 Initial loaded node: ${initialSaveNode}`);

    for (let s = 1; s <= maxSteps; s++) {
      console.log(`  --- Step ${s} ---`);
      const saveBefore = await getAutoSlot();
      const nodeBefore = saveBefore?.currentNodeId || 'unknown';

      // Check if we reached ending screen
      const endingReturnBtn = page.getByText('RETURN TO MAIN MENU', { exact: true });
      if ((await endingReturnBtn.count()) > 0) {
        terminalScreen = 'ENDING_SCREEN';
        notes.push(`Step ${s}: Reached terminal EndingScreen with RETURN TO MAIN MENU button.`);
        console.log(`  🏁 Reached EndingScreen!`);
        break;
      }

      // Check if chapter title card overlay is showing and dismiss with Space
      await page.keyboard.press('Space').catch(() => {});
      await page.waitForTimeout(300);

      // Skip typewriter prompt if displayed
      const skipPrompt = page.getByText('[ TAP OR SPACE TO SKIP ]');
      if ((await skipPrompt.count()) > 0) {
        await skipPrompt.first().click().catch(() => {});
        await page.waitForTimeout(200);
      }

      // Check for dice roll prompt
      const dicePrompt = page.getByText(/ROLL D20|TAP TO ROLL|D20 CHECK/i);
      if ((await dicePrompt.count()) > 0) {
        console.log(`  🎲 D20 roll prompt detected, pressing Space/Click...`);
        await dicePrompt.first().click().catch(() => {});
        await page.keyboard.press('Space').catch(() => {});
        await page.waitForTimeout(600);
      }

      // Find available choice buttons
      const choiceButtons = page.locator('text=/\\[[1-9]\\]/');
      let choiceCount = await choiceButtons.count();
      if (choiceCount === 0) {
        // Try pressing space to skip narration/dialogue delay
        await page.keyboard.press('Space').catch(() => {});
        await page.waitForTimeout(500);
        choiceCount = await choiceButtons.count();
      }

      if (choiceCount === 0) {
        // Check what is on screen
        const bodySnippet = await page.evaluate(() => document.body.innerText.slice(0, 300));
        notes.push(`Step ${s}: No [1-9] choice buttons found on screen. Body preview: "${bodySnippet.replace(/\n+/g, ' ')}"`);
        console.log(`  ⚠️ No choice buttons found. Body preview: ${bodySnippet.slice(0, 150)}...`);
        break;
      }

      const choiceToClick = choiceButtons.first();
      const choiceText = (await choiceToClick.innerText()).trim();
      console.log(`  👉 Clicking Choice 1: "${choiceText.replace(/\n/g, ' ')}"`);

      const timeBeforeClick = Date.now();
      await choiceToClick.click({ timeout: 5000 });
      await page.waitForTimeout(800);

      // Handle post-choice dice roll if triggered
      const postDice = page.getByText(/ROLL D20|TAP TO ROLL|D20 CHECK/i);
      if ((await postDice.count()) > 0) {
        console.log(`  🎲 Post-choice D20 roll detected, resolving...`);
        await page.keyboard.press('Space').catch(() => {});
        await page.waitForTimeout(600);
      }

      // Wait a moment for debounced auto-save or transition save to settle
      await page.waitForTimeout(600);

      const saveAfter = await getAutoSlot();
      const nodeAfter = saveAfter?.currentNodeId || nodeBefore;
      const routeHistLen = saveAfter?.routeHistory?.length || 0;

      const saveMutated = Boolean(
        saveAfter && (
          saveAfter.currentNodeId !== nodeBefore ||
          routeHistLen > (saveBefore?.routeHistory?.length || 0) ||
          JSON.stringify(saveAfter) !== JSON.stringify(saveBefore)
        )
      );

      console.log(`  Transition: ${nodeBefore} -> ${nodeAfter} | Save mutated: ${saveMutated} | Route history length: ${routeHistLen}`);

      steps.push({
        step: s,
        fromNode: nodeBefore,
        choiceText,
        toNode: nodeAfter,
        saveMutated,
        routeHistoryLength: routeHistLen,
      });

      if (!nodesVisitedSequence.includes(nodeAfter)) {
        nodesVisitedSequence.push(nodeAfter);
      }

      if (nodeAfter === nodeBefore && !saveMutated) {
        notes.push(`Step ${s}: Choice click did not change node or mutate save.`);
        break;
      }
    }
  } catch (err: any) {
    pageErrors.push(`PROBE_EXCEPTION: ${err.message}`);
    console.error(`  ❌ Exception during probe:`, err.message);
  } finally {
    await context.close();
  }

  const choicesSuccessful = steps.filter(st => st.saveMutated).length;
  const isPass = choicesSuccessful > 0 && consoleErrors.length === 0 && pageErrors.length === 0 && unhandledRejections.length === 0;

  return {
    chapter: chapterName,
    startNodeId,
    initialSaveNode,
    choicesAttempted: steps.length,
    choicesSuccessful,
    steps,
    nodesVisitedSequence,
    consoleErrors,
    pageErrors,
    unhandledRejections,
    terminalScreenDetected: terminalScreen,
    status: isPass ? 'PASS' : 'FAIL',
    notes,
  };
}

async function runAllProbes() {
  console.log('================================================================================');
  console.log('🚀 RUNNING ADVERSARIAL INDEPENDENT PLAYWRIGHT PROBES AGAINST LIVE DEPLOYMENT');
  console.log(`🌐 Target: ${LIVE_URL}`);
  console.log('================================================================================');

  const browser = await chromium.launch({
    headless: true,
    channel: process.env.PLAYWRIGHT_CHANNEL || 'chrome',
  });

  const chaptersToTest = [
    { chapter: 'Chapter 2', startNodeId: 'chapter2_start' },
    { chapter: 'Final Chapter 1', startNodeId: 'final_chapter1_start' },
    { chapter: 'Epilogue', startNodeId: 'epi_01' },
    { chapter: 'Epilogue Terminal Ending', startNodeId: 'epi_55' },
  ];

  const results: ProbeResult[] = [];
  for (const t of chaptersToTest) {
    const res = await probeChapter(browser, t.chapter, t.startNodeId, 3);
    results.push(res);
  }

  await browser.close();

  console.log('\n================================================================================');
  console.log('📊 ADVERSARIAL PROBE RESULTS SUMMARY');
  console.log('================================================================================');

  let allPass = true;
  for (const r of results) {
    console.log(`\nChapter: ${r.chapter} (Start: ${r.startNodeId})`);
    console.log(`  Status:               ${r.status === 'PASS' ? '✅ PASS' : '❌ FAIL'}`);
    console.log(`  Initial Loaded Node:  ${r.initialSaveNode}`);
    console.log(`  Choices Attempted:    ${r.choicesAttempted}`);
    console.log(`  Choices Mutating Save:${r.choicesSuccessful}`);
    console.log(`  Visited Sequence:     ${r.nodesVisitedSequence.join(' -> ')}`);
    console.log(`  Console Errors:       ${r.consoleErrors.length}`);
    console.log(`  Page Errors:          ${r.pageErrors.length}`);
    console.log(`  Unhandled Rejections: ${r.unhandledRejections.length}`);
    if (r.terminalScreenDetected) {
      console.log(`  Terminal Screen:      ${r.terminalScreenDetected}`);
    }
    if (r.notes.length > 0) {
      console.log(`  Notes:                ${r.notes.join('; ')}`);
    }
    if (r.status !== 'PASS') allPass = false;
  }

  console.log(`\nOverall Verdict: ${allPass ? 'ALL PROBES PASSED' : 'PROBE IDENTIFIED ISSUES'}`);
}

runAllProbes().catch((err) => {
  console.error('Fatal probe failure:', err);
  process.exit(1);
});
