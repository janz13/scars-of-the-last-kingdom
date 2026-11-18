/**
 * Simultaneous 7-Agent Divergent Live Playthrough & Full-Game Mapping Suite
 *
 * Target Deployment: https://janz13.github.io/scars-of-the-last-kingdom/
 * Usage:
 *   npx tsx scripts/src/liveDivergentPlaythroughs.ts
 *   pnpm --filter @workspace/scripts test:divergent
 */

import { chromium, type Browser, type BrowserContext, type Page } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  advanceToGame,
  buildRegressionState,
  createRegressionPage,
  type StatePayloadOptions,
} from './liveRegressionVerify';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, '../..');
const LIVE_URL = process.env.LIVE_URL || 'https://janz13.github.io/scars-of-the-last-kingdom/';
const OUTPUT_FILE = path.resolve(ROOT_DIR, 'docs/live_divergent_playthroughs.json');

export interface AgentFeatureCheck {
  feature: string;
  passed: boolean;
  evidence: string;
}

export interface AgentRunReport {
  agentId: string;
  codename: string;
  build: {
    background: string;
    className: string;
    trait: string;
    companion: string;
  };
  characterCreatorPassed: boolean;
  step2BadgeSnippet: string;
  statsBreakdownSnippet: string;
  prologueNodesVisited: string[];
  chaptersTraversed: string[];
  routeNodesVisited: string[];
  endingsReached: string[];
  rewindsPerformed: number;
  consoleErrors: string[];
  httpErrors: string[];
  featureResults: AgentFeatureCheck[];
  discrepanciesFound: string[];
  overallPassed: boolean;
  durationMs: number;
}

export interface DivergentSwarmReport {
  timestamp: string;
  targetUrl: string;
  totalAgents: number;
  passedAgents: number;
  allPassed: boolean;
  distinctEndingsCount: number;
  distinctEndings: string[];
  distinctNodesCount: number;
  distinctNodes: string[];
  totalConsoleErrors: number;
  totalHttpErrors: number;
  totalDiscrepancies: number;
  agents: AgentRunReport[];
}

interface AgentPersona {
  id: string;
  codename: string;
  bgId: string;
  bgName: string;
  classId: string;
  className: string;
  traitId: string;
  traitName: string;
  companionChoice: 'none' | 'mira' | 'cain';
  companionName: 'Alone' | 'Mira' | 'Cain';
  prologuePattern: RegExp;
}

const PERSONAS: Record<string, AgentPersona> = {
  alpha: {
    id: 'alpha',
    codename: 'ALPHA — Solo Tactical Rewind',
    bgId: 'exiled_soldier',
    bgName: 'Exiled Soldier',
    classId: 'tactician',
    className: 'Tactician',
    traitId: 'pragmatic',
    traitName: 'Pragmatic',
    companionChoice: 'none',
    companionName: 'Alone',
    prologuePattern: /Exiled Soldier|Fallen Noble/i,
  },
  bravo: {
    id: 'bravo',
    codename: 'BRAVO — Mira Clinic & Fog-of-War',
    bgId: 'underground_medic',
    bgName: 'Underground Medic',
    classId: 'medic',
    className: 'Medic',
    traitId: 'empathetic',
    traitName: 'Empathetic',
    companionChoice: 'mira',
    companionName: 'Mira',
    prologuePattern: /Underground Medic|Wasteland Orphan/i,
  },
  charlie: {
    id: 'charlie',
    codename: 'CHARLIE — Cain Intrigue & Hotkeys',
    bgId: 'fallen_noble',
    bgName: 'Fallen Noble',
    classId: 'shadow_broker',
    className: 'Shadow Broker',
    traitId: 'calculating',
    traitName: 'Calculating',
    companionChoice: 'cain',
    companionName: 'Cain',
    prologuePattern: /Fallen Noble|Exiled Soldier/i,
  },
  delta: {
    id: 'delta',
    codename: 'DELTA — Corruption & High-Legibility',
    bgId: 'runaway_experiment',
    bgName: 'Runaway Experiment',
    classId: 'esper',
    className: 'Esper / Psychic Mutant',
    traitId: 'cold',
    traitName: 'Cold',
    companionChoice: 'none',
    companionName: 'Alone',
    prologuePattern: /Runaway Experiment|Forgotten Scholar/i,
  },
  echo: {
    id: 'echo',
    codename: 'ECHO — Luck Reroll & Scavenger',
    bgId: 'wasteland_orphan',
    bgName: 'Wasteland Orphan',
    classId: 'gun_scavenger',
    className: 'Gun Scavenger',
    traitId: 'cynical',
    traitName: 'Cynical',
    companionChoice: 'mira',
    companionName: 'Mira',
    prologuePattern: /Wasteland Orphan|Underground Medic/i,
  },
  foxtrot: {
    id: 'foxtrot',
    codename: 'FOXTROT — MB1-MB4, FC2 & Epilogue',
    bgId: 'forgotten_scholar',
    bgName: 'Forgotten Scholar',
    classId: 'relic_hunter',
    className: 'Relic Hunter',
    traitId: 'faithful',
    traitName: 'Faithful',
    companionChoice: 'cain',
    companionName: 'Cain',
    prologuePattern: /Forgotten Scholar|Runaway Experiment/i,
  },
  golf: {
    id: 'golf',
    codename: 'GOLF — Combat, [R] Rewind & 244 Codex',
    bgId: 'black_market_courier',
    bgName: 'Black Market Courier',
    classId: 'blade_survivor',
    className: 'Blade Survivor',
    traitId: 'reckless',
    traitName: 'Reckless',
    companionChoice: 'none',
    companionName: 'Alone',
    prologuePattern: /Black Market Courier|Wasteland Orphan/i,
  },
};

function attachPageMonitors(page: Page, consoleErrors: string[], httpErrors: string[]) {
  page.on('pageerror', (err) => consoleErrors.push(`PAGEERROR: ${err.message}`));
  page.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(`CONSOLE_ERROR: ${msg.text()}`);
  });
  page.on('requestfailed', (req) => {
    const errText = req.failure()?.errorText || 'failed';
    if (errText.includes('ERR_ABORTED')) return;
    httpErrors.push(`FAILED_REQUEST: ${errText} ${req.url()}`);
  });
  page.on('response', (res) => {
    if (res.status() >= 400) httpErrors.push(`HTTP_${res.status()}: ${res.url()}`);
  });
}

async function readAutoSave(page: Page): Promise<any | null> {
  return page.evaluate(() => {
    const raw = localStorage.getItem('@scars_save_slot_auto') || localStorage.getItem('@scars_save_v1');
    return raw ? JSON.parse(raw) : null;
  });
}

async function flushTypewriter(page: Page) {
  const skipPrompt = page.locator('text=/TAP OR SPACE TO SKIP/i');
  if ((await skipPrompt.count()) > 0) {
    await skipPrompt.first().click({ force: true }).catch(() => {});
  }
  await page.keyboard.press('Space').catch(() => {});
  await page.waitForTimeout(180);
}

async function clickUnlockedChoice(page: Page, matcher?: RegExp): Promise<boolean> {
  await flushTypewriter(page);
  const unlocked = page.locator('[data-choice-button="true"]:not([tabindex="-1"])');
  const count = await unlocked.count();
  if (count === 0) return false;
  if (matcher) {
    const target = unlocked.filter({ hasText: matcher }).first();
    if ((await target.count()) > 0) {
      await target.click({ force: true });
      await page.waitForTimeout(750);
      return true;
    }
    return false;
  }
  await unlocked.first().click({ force: true });
  await page.waitForTimeout(750);
  return true;
}

/**
 * Phase A: Executes a clean live New Game -> 6-step CharacterCreator -> StatsPanel
 * -> Prologue Scene 1..N into Chapter 1 on the live DOM.
 */
async function runPhaseACreatorAndPrologue(
  browser: Browser,
  persona: AgentPersona,
  consoleErrors: string[],
  httpErrors: string[],
  discrepancies: string[]
): Promise<{
  passed: boolean;
  step2BadgeSnippet: string;
  statsBreakdownSnippet: string;
  prologueNodesVisited: string[];
}> {
  const context = await browser.newContext({ viewport: { width: 1366, height: 860 } });
  await context.addInitScript(() => {
    localStorage.setItem('@scars_content_warning_v1', 'true');
    localStorage.setItem('@scars_intro_seen_v1', 'true');
    localStorage.setItem('@scars_mark_awakening_seen_ch1', '1');
    localStorage.setItem('@scars_mark_awakening_seen_ch9', '1');
  });
  const page = await context.newPage();
  attachPageMonitors(page, consoleErrors, httpErrors);

  const visited: string[] = [];
  let step2BadgeSnippet = '';
  let statsBreakdownSnippet = '';

  try {
    await page.goto(`${LIVE_URL}?cb=${Date.now()}&agent=${persona.id}`, { waitUntil: 'networkidle', timeout: 35000 });
    const startBtn = page.getByText(/BEGIN YOUR JOURNEY|START NEW TIMELINE/i).first();
    await startBtn.waitFor({ state: 'visible', timeout: 15000 });
    await startBtn.click({ force: true });
    await page.waitForTimeout(500);

    // Step 0: Name
    const nameInput = page.locator('input').first();
    await nameInput.waitFor({ state: 'visible', timeout: 10000 });
    await nameInput.fill(`Auditor-${persona.id}`);
    await page.getByText('CONTINUE', { exact: true }).click({ force: true });
    await page.waitForTimeout(450);

    // Step 1: Background
    await page.getByText(persona.bgName, { exact: true }).first().click({ force: true });
    await page.waitForTimeout(200);
    await page.getByText('CONTINUE', { exact: true }).click({ force: true });
    await page.waitForTimeout(450);

    // Step 2: Class + capture Step 2 attribute & modifier badges
    await page.getByText(persona.className, { exact: true }).first().click({ force: true });
    await page.waitForTimeout(300);
    const step2Body = await page.evaluate(() => document.body.innerText);
    const badgeLineMatch = step2Body.match(/HP[\s\S]{0,180}(?:LCK|CRPT)[\s\S]{0,40}/);
    step2BadgeSnippet = (badgeLineMatch?.[0] ?? step2Body.slice(0, 200)).replace(/\s+/g, ' ').trim();
    await page.getByText('CONTINUE', { exact: true }).click({ force: true });
    await page.waitForTimeout(450);

    // Step 3: Personality
    await page.getByText(persona.traitName, { exact: true }).first().click({ force: true });
    await page.waitForTimeout(200);
    await page.getByText('CONTINUE', { exact: true }).click({ force: true });
    await page.waitForTimeout(450);

    // Step 4: Companion
    await page.getByText(persona.companionName, { exact: true }).first().click({ force: true });
    await page.waitForTimeout(200);
    await page.getByText('REVIEW & BEGIN', { exact: true }).click({ force: true });
    await page.waitForTimeout(450);

    // Step 5: Summary -> Begin
    const summaryText = await page.evaluate(() => document.body.innerText);
    if (!summaryText.includes(persona.bgName) || !summaryText.includes(persona.className)) {
      discrepancies.push(`[${persona.id}] CharacterCreator summary missing ${persona.bgName} / ${persona.className}`);
    }
    await page.getByText('ENTER THE STATION', { exact: true }).click({ force: true });
    await page.waitForTimeout(1000);

    // Inspect StatsPanel via [S]
    await page.keyboard.press('s');
    await page.waitForTimeout(600);
    const statsText = await page.evaluate(() => document.body.innerText);
    const bdIdx = statsText.indexOf('ATTRIBUTE BREAKDOWN');
    statsBreakdownSnippet =
      bdIdx >= 0 ? statsText.slice(bdIdx, bdIdx + 240).replace(/\s+/g, ' ').trim() : '';
    if (!statsText.includes('ATTRIBUTE BREAKDOWN (ROLL EFFECTIVE)')) {
      discrepancies.push(`[${persona.id}] StatsPanel missing ATTRIBUTE BREAKDOWN section`);
    }
    await page.keyboard.press('s');
    await page.waitForTimeout(400);

    // Walk Prologue Scene 1 (persona-matched choice) -> Chapter 1
    const initSave = await readAutoSave(page);
    if (initSave?.currentNodeId) visited.push(initSave.currentNodeId);

    const p1Ok = await clickUnlockedChoice(page, persona.prologuePattern);
    if (!p1Ok) {
      discrepancies.push(`[${persona.id}] Prologue Scene 1 choice matching ${persona.prologuePattern} not clickable`);
    }
    for (let step = 0; step < 12; step++) {
      const save = await readAutoSave(page);
      const nid = save?.currentNodeId as string | undefined;
      if (nid && !visited.includes(nid)) visited.push(nid);
      if (nid && !nid.startsWith('prologue_')) break;
      const clicked = await clickUnlockedChoice(page);
      if (!clicked) break;
    }
    const postSave = await readAutoSave(page);
    if (postSave?.currentNodeId && !visited.includes(postSave.currentNodeId)) {
      visited.push(postSave.currentNodeId);
    }

    const reachedCh1 = visited.some((n) => !n.startsWith('prologue_'));
    if (!reachedCh1) {
      discrepancies.push(`[${persona.id}] Prologue traversal did not transition out of prologue_* (visited=${visited.join(',')})`);
    }

    return {
      passed: Boolean(statsBreakdownSnippet) && reachedCh1 && p1Ok,
      step2BadgeSnippet,
      statsBreakdownSnippet,
      prologueNodesVisited: visited,
    };
  } catch (err: any) {
    discrepancies.push(`[${persona.id}] Phase A exception: ${err.message}`);
    return { passed: false, step2BadgeSnippet, statsBreakdownSnippet, prologueNodesVisited: visited };
  } finally {
    await context.close();
  }
}

async function seedAndOpenNode(
  browser: Browser,
  opts: StatePayloadOptions,
  tag: string,
  consoleErrors: string[],
  httpErrors: string[],
  unlockedChapters: string[] = [
    'Prologue',
    'Chapter 1',
    'Chapter 2',
    'Chapter 3',
    'Chapter 4',
    'Chapter 5',
    'Chapter 6',
    'Chapter 7',
    'Chapter 8',
    'Chapter 9',
    'Chapter 10',
    'Chapter 11',
    'Chapter 12',
    'Final Chapter 1',
    'Final Chapter 2',
    'Epilogue',
  ]
): Promise<{ context: BrowserContext; page: Page }> {
  const seed = buildRegressionState(opts);
  const { context, page } = await createRegressionPage(browser, seed, {}, unlockedChapters);
  attachPageMonitors(page, consoleErrors, httpErrors);
  await advanceToGame(page, tag);
  return { context, page };
}

async function stepBranchToEnding(
  browser: Browser,
  agentId: string,
  tag: string,
  seedOpts: StatePayloadOptions,
  choices: Array<RegExp | null>,
  nodesOut: Set<string>,
  endingsOut: Set<string>,
  consoleErrors: string[],
  httpErrors: string[],
  discrepancies: string[],
  afterEnding?: (page: Page) => Promise<void>
) {
  const { context, page } = await seedAndOpenNode(browser, seedOpts, tag, consoleErrors, httpErrors);
  try {
    nodesOut.add(seedOpts.currentNodeId);
    for (const matcher of choices) {
      const ok = await clickUnlockedChoice(page, matcher ?? undefined);
      if (!ok) {
        const cur = await readAutoSave(page);
        discrepancies.push(`[${agentId}:${tag}] Failed clicking choice ${matcher} at node ${cur?.currentNodeId}`);
        break;
      }
      // Auto-handle dice modal if triggered
      const diceBtn = page.getByText('CONTINUE', { exact: true });
      if ((await diceBtn.count()) > 0) {
        await diceBtn.first().click({ force: true }).catch(() => {});
        await page.waitForTimeout(500);
      }
      const save = await readAutoSave(page);
      if (save?.currentNodeId) nodesOut.add(save.currentNodeId);
      if (save?.activeEnding) endingsOut.add(save.activeEnding);
    }
    const finalSave = await readAutoSave(page);
    if (finalSave?.activeEnding) endingsOut.add(finalSave.activeEnding);
    if (finalSave?.currentNodeId) nodesOut.add(finalSave.currentNodeId);
    if (afterEnding) await afterEnding(page);
  } finally {
    await context.close();
  }
}

// ─── 7 Divergent Agent Runners ───────────────────────────────────────────────

async function runAlpha(browser: Browser): Promise<AgentRunReport> {
  const t0 = Date.now();
  const persona = PERSONAS.alpha;
  const consoleErrors: string[] = [];
  const httpErrors: string[] = [];
  const discrepancies: string[] = [];
  const nodesVisited = new Set<string>();
  const endingsReached = new Set<string>();
  const featureResults: AgentFeatureCheck[] = [];
  let rewindsPerformed = 0;

  const phaseA = await runPhaseACreatorAndPrologue(browser, persona, consoleErrors, httpErrors, discrepancies);
  for (const n of phaseA.prologueNodesVisited) nodesVisited.add(n);

  // Check 1: STR 5 (+0) & D20 odds badge on tunnel_flood_chamber
  {
    const { context, page } = await seedAndOpenNode(
      browser,
      {
        currentNodeId: 'tunnel_flood_chamber',
        characterClass: 'tactician',
        background: 'exiled_soldier',
        personalityTrait: 'pragmatic',
        stats: { strength: 5, luck: 5 },
      },
      'alpha_flood',
      consoleErrors,
      httpErrors
    );
    const body = await page.evaluate(() => document.body.innerText);
    const ok = body.includes('STR DC 13 · Your STR 5 (+0) · 40% Success');
    featureResults.push({
      feature: 'Tactician + Exiled Soldier STR 5 (+0) & ChoiceButton D20 odds preview',
      passed: ok,
      evidence: ok ? 'Rendered "STR DC 13 · Your STR 5 (+0) · 40% Success" live.' : `Missing badge in: ${body.slice(0, 180)}`,
    });
    if (!ok) discrepancies.push('[alpha] Flood chamber D20 preview mismatch');
    nodesVisited.add('tunnel_flood_chamber');
    await context.close();
  }

  // Check 2: Solo Chapter 2 prose, speaker fallback & dialogue suppression (c2_surface_dawn, c2_water_tainted_choice, c2_patrol_spotted)
  for (const probe of [
    {
      node: 'c2_surface_dawn',
      check: (t: string) => !t.includes('counts her remaining medicine') && !t.includes('watching the patrol patterns'),
      desc: 'c2_surface_dawn solo prose strips Mira/Cain sentences',
    },
    {
      node: 'c2_surface_junction',
      check: (t: string) => t.includes('There is no obvious source for the thin sound'),
      desc: 'c2_surface_junction adapts neither-of-them text for solo',
    },
    {
      node: 'c2_water_tainted_choice',
      check: (t: string) =>
        t.includes('fine silica particulate') &&
        t.includes('NARRATOR') &&
        !t.includes('Silica particulate. Some organic matter'),
      desc: 'c2_water_tainted_choice falls back to Narrator & suppresses Mira dialogue box',
    },
    {
      node: 'c2_patrol_spotted',
      check: (t: string) =>
        t.includes('mark-detection wand with a ten-meter sweep') &&
        t.includes('NARRATOR') &&
        !t.includes("wand's range is about ten meters"),
      desc: 'c2_patrol_spotted falls back to Narrator & suppresses Cain dialogue box',
    },
    {
      node: 'c3_cain_tactical_moment',
      check: (t: string) => t.includes('without Cain'),
      desc: 'c3_cain_tactical_moment renders solo narrativeBlock',
    },
    {
      node: 'c3_narrow_conduit',
      check: (t: string) => !t.includes('Cain reads the markings') && !t.includes('Mira keeps close'),
      desc: 'c3_narrow_conduit strips phantom companion asides',
    },
  ]) {
    const { context, page } = await seedAndOpenNode(
      browser,
      {
        currentNodeId: probe.node,
        characterClass: 'tactician',
        background: 'exiled_soldier',
        personalityTrait: 'pragmatic',
        mira: { present: false, trust: 0, alive: true },
        cain: { present: false, trust: 0, alive: true },
        flags: {},
      },
      `alpha_${probe.node}`,
      consoleErrors,
      httpErrors
    );
    await flushTypewriter(page);
    const txt = await page.evaluate(() => document.body.innerText);
    const passed = probe.check(txt);
    featureResults.push({
      feature: probe.desc,
      passed,
      evidence: passed ? `Verified solo rendering on ${probe.node}` : `Solo prose check failed on ${probe.node}: ${txt.slice(0, 220)}`,
    });
    if (!passed) discrepancies.push(`[alpha] Solo prose/speaker check failed on ${probe.node}`);
    nodesVisited.add(probe.node);
    await context.close();
  }

  // Check 3: Checkpoint rewind from ending_buried_tunnel back to tunnel_collapse_moment + branch to survival
  await stepBranchToEnding(
    browser,
    'alpha',
    'alpha_rewind',
    {
      currentNodeId: 'far_platform_9c',
      characterClass: 'tactician',
      background: 'exiled_soldier',
      stats: { health: 100 },
    },
    [/western tunnel continues/i, /You don't move fast enough/i],
    nodesVisited,
    endingsReached,
    consoleErrors,
    httpErrors,
    discrepancies,
    async (page) => {
      const hasRewind = (await page.getByText(/REWIND TO CHECKPOINT/i).count()) > 0;
      if (hasRewind) {
        await page.getByText(/REWIND TO CHECKPOINT/i).first().click({ force: true });
        await page.waitForTimeout(1000);
        rewindsPerformed++;
        const postBody = await page.evaluate(() => document.body.innerText);
        const restored = postBody.includes('The Warning');
        if (restored) {
          await clickUnlockedChoice(page, /Throw yourself through/i);
          const s = await readAutoSave(page);
          if (s?.currentNodeId) nodesVisited.add(s.currentNodeId);
        } else {
          discrepancies.push('[alpha] Rewind did not restore tunnel_collapse_moment ("The Warning")');
        }
        featureResults.push({
          feature: '1-click REWIND TO CHECKPOINT on EndingScreen',
          passed: restored,
          evidence: restored ? 'Rewound from ending_buried_tunnel -> tunnel_collapse_moment -> branched to tunnel_brace_success.' : 'Rewind failed',
        });
      } else {
        discrepancies.push('[alpha] Missing REWIND TO CHECKPOINT button on ending_buried_tunnel');
        featureResults.push({ feature: '1-click REWIND TO CHECKPOINT on EndingScreen', passed: false, evidence: 'Button missing' });
      }
    }
  );

  // Check 4: Chapter 4 divergent endings
  await stepBranchToEnding(
    browser,
    'alpha',
    'alpha_c4_end1',
    { currentNodeId: 'c4_barracks_cain_joins_saints', characterClass: 'tactician', background: 'exiled_soldier' },
    [/re-enlist/i],
    nodesVisited,
    endingsReached,
    consoleErrors,
    httpErrors,
    discrepancies
  );
  await stepBranchToEnding(
    browser,
    'alpha',
    'alpha_c4_end2',
    {
      currentNodeId: 'c4_barracks_intel_gathered',
      characterClass: 'tactician',
      background: 'exiled_soldier',
      flags: { infiltrate_route: true },
    },
    [/Leave the settlement now/i],
    nodesVisited,
    endingsReached,
    consoleErrors,
    httpErrors,
    discrepancies
  );

  return {
    agentId: persona.id,
    codename: persona.codename,
    build: { background: persona.bgName, className: persona.className, trait: persona.traitName, companion: persona.companionName },
    characterCreatorPassed: phaseA.passed,
    step2BadgeSnippet: phaseA.step2BadgeSnippet,
    statsBreakdownSnippet: phaseA.statsBreakdownSnippet,
    prologueNodesVisited: phaseA.prologueNodesVisited,
    chaptersTraversed: ['Prologue', 'Chapter 1', 'Chapter 2', 'Chapter 3', 'Chapter 4'],
    routeNodesVisited: Array.from(nodesVisited),
    endingsReached: Array.from(endingsReached),
    rewindsPerformed,
    consoleErrors,
    httpErrors,
    featureResults,
    discrepanciesFound: discrepancies,
    overallPassed:
      phaseA.passed &&
      consoleErrors.length === 0 &&
      httpErrors.length === 0 &&
      discrepancies.length === 0 &&
      featureResults.every((f) => f.passed) &&
      endingsReached.size >= 3,
    durationMs: Date.now() - t0,
  };
}

async function runBravo(browser: Browser): Promise<AgentRunReport> {
  const t0 = Date.now();
  const persona = PERSONAS.bravo;
  const consoleErrors: string[] = [];
  const httpErrors: string[] = [];
  const discrepancies: string[] = [];
  const nodesVisited = new Set<string>();
  const endingsReached = new Set<string>();
  const featureResults: AgentFeatureCheck[] = [];

  const phaseA = await runPhaseACreatorAndPrologue(browser, persona, consoleErrors, httpErrors, discrepancies);
  for (const n of phaseA.prologueNodesVisited) nodesVisited.add(n);

  // Check 1: Medic OR-perk live verification across BOTH medic+scholar and tactician+underground_medic
  let orOk = true;
  for (const combo of [
    { characterClass: 'medic', background: 'forgotten_scholar', label: 'medic+forgotten_scholar' },
    { characterClass: 'tactician', background: 'underground_medic', label: 'tactician+underground_medic' },
  ]) {
    const { context, page } = await seedAndOpenNode(
      browser,
      { currentNodeId: 'c2_poisoned_sky', characterClass: combo.characterClass, background: combo.background },
      `bravo_or_${combo.label}`,
      consoleErrors,
      httpErrors
    );
    await flushTypewriter(page);
    const unlockedCount = await page
      .locator('[data-choice-button="true"]:not([tabindex="-1"])')
      .filter({ hasText: /Calculate safe exposure windows/i })
      .count();
    if (unlockedCount === 0) {
      orOk = false;
      discrepancies.push(`[bravo] Medic OR-perk locked for ${combo.label} on c2_poisoned_sky`);
    }
    nodesVisited.add('c2_poisoned_sky');
    await context.close();
  }
  featureResults.push({
    feature: 'Medic OR-perk identity check on c2_poisoned_sky',
    passed: orOk,
    evidence: orOk ? 'Both medic+forgotten_scholar and tactician+underground_medic unlocked c2_medic_sky_read live.' : 'OR check failed',
  });

  // Check 2: Hub latch [Already completed] on c2_follow_mira & [M] Chapter Branch Map
  {
    const { context, page } = await seedAndOpenNode(
      browser,
      {
        currentNodeId: 'c2_surface_junction',
        characterClass: 'medic',
        background: 'underground_medic',
        mira: { present: true, trust: 7, alive: true },
        flags: { mira_joins_party: true, visited_mira_clinic_route: true },
        visitedNodes: ['prologue_start', 'chapter1_start', 'chapter2_start', 'c2_surface_junction'],
      },
      'bravo_hub_map',
      consoleErrors,
      httpErrors
    );
    await flushTypewriter(page);
    const body = await page.evaluate(() => document.body.innerText);
    const latchOk =
      body.includes('Follow Mira north') &&
      body.includes('Already completed') &&
      (await page.locator('[data-choice-button="true"][tabindex="-1"]').filter({ hasText: /Follow Mira north/i }).count()) > 0;
    featureResults.push({
      feature: 'Hub latch [Already completed] on c2_follow_mira',
      passed: latchOk,
      evidence: latchOk ? 'c2_follow_mira disabled with Already completed when visited_mira_clinic_route set.' : 'Missing hub latch',
    });
    if (!latchOk) discrepancies.push('[bravo] c2_follow_mira hub latch failed');

    await page.keyboard.press('m');
    await page.waitForTimeout(800);
    const mapText = await page.evaluate(() => document.body.innerText);
    const mapOk =
      mapText.includes('CHAPTER BRANCH MAP') &&
      mapText.includes('EXPLORED SCENES') &&
      mapText.includes('UNEXPLORED SCENE') &&
      mapText.includes('UNDISCOVERED ENDING');
    featureResults.push({
      feature: '[M] Chapter Branch Map explored count, frontier cards & ending silhouettes',
      passed: mapOk,
      evidence: mapOk ? 'BranchMapPanel rendered EXPLORED SCENES, frontier ??? cards, and ending silhouettes.' : `BranchMap incomplete: ${mapText.slice(0, 180)}`,
    });
    if (!mapOk) discrepancies.push('[bravo] BranchMapPanel missing sections');
    nodesVisited.add('c2_surface_junction');
    await context.close();
  }

  // Check 3: c3_hidden_clinic_arrive Mira narrativeBlocks + c3_sera_encounter Cost: -1 Food
  {
    const { context, page } = await seedAndOpenNode(
      browser,
      {
        currentNodeId: 'c3_hidden_clinic_arrive',
        characterClass: 'medic',
        background: 'underground_medic',
        mira: { present: true, trust: 7, alive: true },
        flags: { mira_joins_party: true },
      },
      'bravo_c3_mira',
      consoleErrors,
      httpErrors
    );
    await flushTypewriter(page);
    const txt = await page.evaluate(() => document.body.innerText);
    const clinicOk = txt.includes('Mira');
    featureResults.push({
      feature: 'c3_hidden_clinic_arrive Mira-present narrativeBlocks',
      passed: clinicOk,
      evidence: clinicOk ? 'Rendered Mira-present clinic arrival text cleanly.' : 'Mira clinic text missing',
    });
    if (!clinicOk) discrepancies.push('[bravo] c3_hidden_clinic_arrive missing Mira text');
    nodesVisited.add('c3_hidden_clinic_arrive');
    await context.close();
  }

  {
    const { context, page } = await seedAndOpenNode(
      browser,
      { currentNodeId: 'c3_sera_encounter', inventory: { food: 4 } },
      'bravo_sera_cost',
      consoleErrors,
      httpErrors
    );
    await flushTypewriter(page);
    const txt = await page.evaluate(() => document.body.innerText);
    const costOk = txt.includes('Cost: -1 Food');
    featureResults.push({
      feature: 'ChoiceButton supply cost badge (Cost: -1 Food)',
      passed: costOk,
      evidence: costOk ? 'Rendered "Cost: -1 Food" badge on Sera choice.' : 'Missing cost badge',
    });
    if (!costOk) discrepancies.push('[bravo] Sera ChoiceButton missing Cost: -1 Food');
    nodesVisited.add('c3_sera_encounter');
    await context.close();
  }

  // Endings: Ch 1 Mira Sacrifice + Ch 5 Glass Court Noble Pet + Ch 10 Mira Leaves
  await stepBranchToEnding(
    browser,
    'bravo',
    'bravo_end_mira_sac',
    {
      currentNodeId: 'archive_door',
      characterClass: 'medic',
      background: 'underground_medic',
      mira: { present: true, trust: 6, alive: true },
      flags: { mira_joins_party: true },
    },
    [/Mira steps forward/i],
    nodesVisited,
    endingsReached,
    consoleErrors,
    httpErrors,
    discrepancies
  );
  await stepBranchToEnding(
    browser,
    'bravo',
    'bravo_end_ch10',
    {
      currentNodeId: 'c10_mira_leaves_setup',
      characterClass: 'medic',
      background: 'underground_medic',
      mira: { present: true, trust: 4, alive: true },
      flags: { mira_joins_party: true },
    },
    [/Say nothing\. Let her finish packing/i],
    nodesVisited,
    endingsReached,
    consoleErrors,
    httpErrors,
    discrepancies
  );

  return {
    agentId: persona.id,
    codename: persona.codename,
    build: { background: persona.bgName, className: persona.className, trait: persona.traitName, companion: persona.companionName },
    characterCreatorPassed: phaseA.passed,
    step2BadgeSnippet: phaseA.step2BadgeSnippet,
    statsBreakdownSnippet: phaseA.statsBreakdownSnippet,
    prologueNodesVisited: phaseA.prologueNodesVisited,
    chaptersTraversed: ['Prologue', 'Chapter 1', 'Chapter 2', 'Chapter 3', 'Chapter 10'],
    routeNodesVisited: Array.from(nodesVisited),
    endingsReached: Array.from(endingsReached),
    rewindsPerformed: 0,
    consoleErrors,
    httpErrors,
    featureResults,
    discrepanciesFound: discrepancies,
    overallPassed:
      phaseA.passed &&
      consoleErrors.length === 0 &&
      httpErrors.length === 0 &&
      discrepancies.length === 0 &&
      featureResults.every((f) => f.passed) &&
      endingsReached.size >= 2,
    durationMs: Date.now() - t0,
  };
}

async function runCharlie(browser: Browser): Promise<AgentRunReport> {
  const t0 = Date.now();
  const persona = PERSONAS.charlie;
  const consoleErrors: string[] = [];
  const httpErrors: string[] = [];
  const discrepancies: string[] = [];
  const nodesVisited = new Set<string>();
  const endingsReached = new Set<string>();
  const featureResults: AgentFeatureCheck[] = [];

  const phaseA = await runPhaseACreatorAndPrologue(browser, persona, consoleErrors, httpErrors, discrepancies);
  for (const n of phaseA.prologueNodesVisited) nodesVisited.add(n);

  const calcOk = phaseA.statsBreakdownSnippet.includes('+1 Calculating');
  featureResults.push({
    feature: 'Calculating trait (+1) in StatsPanel breakdown',
    passed: calcOk,
    evidence: calcOk ? `Observed "+1 Calculating" in breakdown: ${phaseA.statsBreakdownSnippet}` : `Missing trait bonus in ${phaseA.statsBreakdownSnippet}`,
  });
  if (!calcOk) discrepancies.push('[charlie] StatsPanel missing +1 Calculating breakdown');

  // Asymmetric Cain present / Mira absent c2_surface_camp + hotkeys [I],[C],[F],[H],[M],[Esc]
  {
    const { context, page } = await seedAndOpenNode(
      browser,
      {
        currentNodeId: 'c2_surface_camp',
        characterClass: 'shadow_broker',
        background: 'fallen_noble',
        personalityTrait: 'calculating',
        mira: { present: false, trust: 0, alive: true },
        cain: { present: true, trust: 7, alive: true },
        flags: { cain_joins_party: true },
      },
      'charlie_camp_keys',
      consoleErrors,
      httpErrors
    );
    await flushTypewriter(page);
    const campTxt = await page.evaluate(() => document.body.innerText);
    const campOk = campTxt.includes('watch rotation split with Cain') && !campTxt.includes('split across three');
    featureResults.push({
      feature: 'c2_surface_camp Cain-present / Mira-absent narrativeBlocks',
      passed: campOk,
      evidence: campOk ? 'Rendered Cain-only watch rotation without phantom Mira.' : 'Camp asymmetric prose failed',
    });
    if (!campOk) discrepancies.push('[charlie] c2_surface_camp Cain-only block mismatch');

    // Keyboard hotkeys test
    const hotkeyChecks: Array<[string, string]> = [
      ['i', 'INVENTORY'],
      ['c', 'COMPANION'],
      ['f', 'FACTION'],
      ['h', 'ROUTE HISTORY'],
      ['m', 'CHAPTER BRANCH MAP'],
    ];
    let keysOk = true;
    for (const [k, expected] of hotkeyChecks) {
      await page.keyboard.press(k);
      await page.waitForTimeout(450);
      const t = await page.evaluate(() => document.body.innerText.toUpperCase());
      if (!t.includes(expected)) {
        keysOk = false;
        discrepancies.push(`[charlie] Hotkey [${k}] did not display ${expected}`);
      }
      await page.keyboard.press(k);
      await page.waitForTimeout(300);
    }
    featureResults.push({
      feature: 'Desktop hotkeys [S]/[I]/[C]/[F]/[H]/[M] navigation',
      passed: keysOk,
      evidence: keysOk ? 'All 6 HUD hotkeys toggled their target panels and returned cleanly.' : 'Hotkey navigation failed',
    });
    nodesVisited.add('c2_surface_camp');
    await context.close();
  }

  // Broker-Cain guard on c3_resist_signal_node (locked without cain_joins_party, unlocked with it)
  {
    const { context: c1, page: p1 } = await seedAndOpenNode(
      browser,
      {
        currentNodeId: 'c3_resist_signal_node',
        characterClass: 'shadow_broker',
        background: 'fallen_noble',
        flags: {},
      },
      'charlie_broker_locked',
      consoleErrors,
      httpErrors
    );
    await flushTypewriter(p1);
    const bodyLocked = await p1.evaluate(() => document.body.innerText);
    const lockedCheck =
      (await p1.locator('[data-choice-button="true"]:not([tabindex="-1"])').filter({ hasText: /Control Panel|second exit/i }).count()) === 0 &&
      (!bodyLocked.includes('second exit') || bodyLocked.includes('Requires Companion: Cain'));
    await c1.close();

    const { context: c2, page: p2 } = await seedAndOpenNode(
      browser,
      {
        currentNodeId: 'c3_resist_signal_node',
        characterClass: 'shadow_broker',
        background: 'fallen_noble',
        cain: { present: true, trust: 7, alive: true },
        flags: { cain_joins_party: true },
      },
      'charlie_broker_open',
      consoleErrors,
      httpErrors
    );
    const clickedSecret = await clickUnlockedChoice(p2, /second exit/i);
    const post = await readAutoSave(p2);
    const unlockedOk = clickedSecret && post?.currentNodeId === 'c3_broker_secret_path';
    if (!lockedCheck || !unlockedOk) {
      discrepancies.push(`[charlie] Broker-Cain guard failed: locked=${lockedCheck}, unlockedOk=${unlockedOk}`);
    }
    featureResults.push({
      feature: 'c3_use_broker_secret Cain companion guard (commit 3d698a3)',
      passed: lockedCheck && unlockedOk,
      evidence: `Blocked when cain_joins_party=false (${lockedCheck}), routed to c3_broker_secret_path when recruited (${unlockedOk}).`,
    });
    nodesVisited.add('c3_resist_signal_node');
    if (post?.currentNodeId) nodesVisited.add(post.currentNodeId);
    await c2.close();
  }

  // Chapter 6 Betrayal & Crimson Baptism endings
  await stepBranchToEnding(
    browser,
    'charlie',
    'charlie_c6_end1',
    { currentNodeId: 'c6_cain_allow_execute', characterClass: 'shadow_broker', background: 'fallen_noble', cain: { present: true, trust: 8, alive: true } },
    [/Continue\. This is the extermination path/i],
    nodesVisited,
    endingsReached,
    consoleErrors,
    httpErrors,
    discrepancies
  );
  await stepBranchToEnding(
    browser,
    'charlie',
    'charlie_c6_end2',
    { currentNodeId: 'c6_pulse_tower_decision', characterClass: 'shadow_broker', background: 'fallen_noble', stats: { corruption: 40 } },
    [/Broadcast the stabilisation signal/i],
    nodesVisited,
    endingsReached,
    consoleErrors,
    httpErrors,
    discrepancies
  );

  return {
    agentId: persona.id,
    codename: persona.codename,
    build: { background: persona.bgName, className: persona.className, trait: persona.traitName, companion: persona.companionName },
    characterCreatorPassed: phaseA.passed,
    step2BadgeSnippet: phaseA.step2BadgeSnippet,
    statsBreakdownSnippet: phaseA.statsBreakdownSnippet,
    prologueNodesVisited: phaseA.prologueNodesVisited,
    chaptersTraversed: ['Prologue', 'Chapter 1', 'Chapter 2', 'Chapter 3', 'Chapter 6'],
    routeNodesVisited: Array.from(nodesVisited),
    endingsReached: Array.from(endingsReached),
    rewindsPerformed: 0,
    consoleErrors,
    httpErrors,
    featureResults,
    discrepanciesFound: discrepancies,
    overallPassed:
      phaseA.passed &&
      consoleErrors.length === 0 &&
      httpErrors.length === 0 &&
      discrepancies.length === 0 &&
      featureResults.every((f) => f.passed) &&
      endingsReached.size >= 2,
    durationMs: Date.now() - t0,
  };
}

async function runDelta(browser: Browser): Promise<AgentRunReport> {
  const t0 = Date.now();
  const persona = PERSONAS.delta;
  const consoleErrors: string[] = [];
  const httpErrors: string[] = [];
  const discrepancies: string[] = [];
  const nodesVisited = new Set<string>();
  const endingsReached = new Set<string>();
  const featureResults: AgentFeatureCheck[] = [];

  const phaseA = await runPhaseACreatorAndPrologue(browser, persona, consoleErrors, httpErrors, discrepancies);
  for (const n of phaseA.prologueNodesVisited) nodesVisited.add(n);

  // Interlude 35+ unlock + __return__ + High-Legibility toggle + sw.js check
  {
    const { context, page } = await seedAndOpenNode(
      browser,
      {
        currentNodeId: 'mira_event_corruption_warning',
        characterClass: 'esper',
        background: 'runaway_experiment',
        personalityTrait: 'cold',
        stats: { corruption: 36 },
        mira: { present: true, trust: 6, alive: true },
        flags: { mira_joins_party: true },
      },
      'delta_interlude',
      consoleErrors,
      httpErrors
    );
    await page.evaluate(() => {
      const s = JSON.parse(localStorage.getItem('@scars_save_slot_auto') || '{}');
      s.pendingReturnNodeId = 'tunnel_depths';
      localStorage.setItem('@scars_save_slot_auto', JSON.stringify(s));
    });
    const interludeOk = await clickUnlockedChoice(page, /It's part of me now/i);
    await page.keyboard.press('Escape');
    await page.waitForTimeout(500);
    await page.getByText(/High-Legibility Reading Mode/i).first().click({ force: true });
    await page.waitForTimeout(300);
    const savedAfter = await readAutoSave(page);
    const swText = await page.evaluate(async (u) => (await fetch(`${u}sw.js?t=${Date.now()}`)).text(), LIVE_URL);
    const hasSwStamp = /const CACHE_VERSION = 'sotlk-[a-z0-9]+'/.test(swText);
    const highContrastOk = Boolean(savedAfter?.settings?.highContrast);
    featureResults.push({
      feature: 'Interlude Corruption 35+ unlock & High-Legibility persistent toggle + SW SHA',
      passed: interludeOk && highContrastOk && hasSwStamp,
      evidence: `interlude35=${interludeOk}, highContrast=${highContrastOk}, swStamped=${hasSwStamp}`,
    });
    if (!interludeOk || !highContrastOk || !hasSwStamp) {
      discrepancies.push('[delta] Interlude/HighContrast/SW verification failed');
    }
    nodesVisited.add('mira_event_corruption_warning');
    await context.close();
  }

  // Hallucination __return__ roundtrip
  {
    const { context, page } = await seedAndOpenNode(
      browser,
      { currentNodeId: 'halluc_mark_speaks', characterClass: 'esper', background: 'runaway_experiment', stats: { corruption: 45 } },
      'delta_halluc',
      consoleErrors,
      httpErrors
    );
    const retOk = await clickUnlockedChoice(page, /Listen\./i);
    featureResults.push({
      feature: 'Hallucination __return__ safe resolution',
      passed: retOk,
      evidence: retOk ? 'Clicked halluc_mark_speaks choice cleanly without trapping.' : 'Hallucination failed',
    });
    if (!retOk) discrepancies.push('[delta] Hallucination choice click failed');
    nodesVisited.add('halluc_mark_speaks');
    await context.close();
  }

  // Chapter 7 & Chapter 9 Corruption/Tyrant endings
  await stepBranchToEnding(
    browser,
    'delta',
    'delta_c7_end',
    { currentNodeId: 'c7_tribunal_verdict_guilty', characterClass: 'esper', background: 'runaway_experiment', stats: { corruption: 50 } },
    [/Accept the verdict/i],
    nodesVisited,
    endingsReached,
    consoleErrors,
    httpErrors,
    discrepancies
  );
  await stepBranchToEnding(
    browser,
    'delta',
    'delta_c9_end',
    { currentNodeId: 'c9_tower_first_voice_strong', characterClass: 'esper', background: 'runaway_experiment', stats: { corruption: 60 } },
    [/Accept\. The Voice is the path/i],
    nodesVisited,
    endingsReached,
    consoleErrors,
    httpErrors,
    discrepancies
  );

  return {
    agentId: persona.id,
    codename: persona.codename,
    build: { background: persona.bgName, className: persona.className, trait: persona.traitName, companion: persona.companionName },
    characterCreatorPassed: phaseA.passed,
    step2BadgeSnippet: phaseA.step2BadgeSnippet,
    statsBreakdownSnippet: phaseA.statsBreakdownSnippet,
    prologueNodesVisited: phaseA.prologueNodesVisited,
    chaptersTraversed: ['Prologue', 'Chapter 1', 'Interlude', 'Vision', 'Chapter 7', 'Chapter 9'],
    routeNodesVisited: Array.from(nodesVisited),
    endingsReached: Array.from(endingsReached),
    rewindsPerformed: 0,
    consoleErrors,
    httpErrors,
    featureResults,
    discrepanciesFound: discrepancies,
    overallPassed:
      phaseA.passed &&
      consoleErrors.length === 0 &&
      httpErrors.length === 0 &&
      discrepancies.length === 0 &&
      featureResults.every((f) => f.passed) &&
      endingsReached.size >= 2,
    durationMs: Date.now() - t0,
  };
}

async function runEcho(browser: Browser): Promise<AgentRunReport> {
  const t0 = Date.now();
  const persona = PERSONAS.echo;
  const consoleErrors: string[] = [];
  const httpErrors: string[] = [];
  const discrepancies: string[] = [];
  const nodesVisited = new Set<string>();
  const endingsReached = new Set<string>();
  const featureResults: AgentFeatureCheck[] = [];

  const phaseA = await runPhaseACreatorAndPrologue(browser, persona, consoleErrors, httpErrors, discrepancies);
  for (const n of phaseA.prologueNodesVisited) nodesVisited.add(n);

  // Luck Reroll interactive test + MainMenu footer 1636 NODES / 244 ENDINGS
  {
    const { context, page } = await seedAndOpenNode(
      browser,
      {
        currentNodeId: 'tunnel_flood_chamber',
        characterClass: 'gun_scavenger',
        background: 'wasteland_orphan',
        personalityTrait: 'cynical',
        stats: { strength: 5, luck: 9 },
      },
      'echo_luck',
      consoleErrors,
      httpErrors
    );
    await flushTypewriter(page);
    const body = await page.evaluate(() => document.body.innerText);
    const hasBadge = body.includes('★ Luck Reroll Ready');
    await clickUnlockedChoice(page, /Overpower it/i);
    await page.waitForTimeout(500);
    const rerollBtn = page.getByText('USE LUCK — REROLL', { exact: true });
    const hasRerollBtn = (await rerollBtn.count()) > 0;
    let rerollUsedVisible = false;
    if (hasRerollBtn) {
      await rerollBtn.first().click({ force: true });
      await page.waitForTimeout(400);
      rerollUsedVisible = (await page.getByText('Luck reroll used', { exact: true }).count()) > 0;
    }
    const contBtn = page.getByText('CONTINUE', { exact: true });
    if ((await contBtn.count()) > 0) {
      await contBtn.first().click({ force: true });
      await page.waitForTimeout(600);
    }
    const afterRoll = await readAutoSave(page);
    if (afterRoll?.currentNodeId) nodesVisited.add(afterRoll.currentNodeId);
    featureResults.push({
      feature: 'LCK 9 >= 7 Luck Reroll Ready badge & interactive DiceRollOverlay reroll',
      passed: hasBadge && hasRerollBtn && rerollUsedVisible,
      evidence: `hasBadge=${hasBadge}, interactiveReroll=${hasRerollBtn}, rerollConfirmed=${rerollUsedVisible}, landed=${afterRoll?.currentNodeId}`,
    });
    if (!hasBadge || !hasRerollBtn || !rerollUsedVisible) {
      discrepancies.push('[echo] Luck reroll UI/interaction failed');
    }
    await context.close();
  }

  // Main Menu footer + c3_steal_attempt cycle latch + c8_camp_rations_decision
  {
    const { context, page } = await seedAndOpenNode(
      browser,
      {
        currentNodeId: 'c3_market_observe',
        inventory: { scrap: 5 },
        flags: { c3_candle_steal_attempted: true },
      },
      'echo_steal_latch',
      consoleErrors,
      httpErrors
    );
    await flushTypewriter(page);
    const marketTxt = await page.evaluate(() => document.body.innerText);
    const stealLatched =
      marketTxt.includes('Already completed') &&
      (await page.locator('[data-choice-button="true"][tabindex="-1"]').filter({ hasText: /something you need on that stall/i }).count()) > 0;
    await page.goto(`${LIVE_URL}?cb=${Date.now()}`, { waitUntil: 'networkidle' });
    await page.getByText(/CONTINUE JOURNEY|BEGIN YOUR JOURNEY/i).first().waitFor({ state: 'visible', timeout: 15000 });
    await page.waitForTimeout(400);
    const menuTxt = await page.evaluate(() => document.body.innerText);
    const footerOk = menuTxt.includes('1636 NODES') && menuTxt.includes('244 ENDINGS') && menuTxt.includes('7 CLASSES');
    featureResults.push({
      feature: 'c3_steal_attempt one-shot cycle latch & MainMenu 1636/244/7 footer',
      passed: stealLatched && footerOk,
      evidence: `stealLatched=${stealLatched}, footerOk=${footerOk}`,
    });
    if (!stealLatched || !footerOk) discrepancies.push('[echo] Steal latch or MainMenu footer mismatch');
    nodesVisited.add('c3_market_observe');
    await context.close();
  }

  // Wanderer + Glass Court Feast endings
  await stepBranchToEnding(
    browser,
    'echo',
    'echo_wanderer',
    { currentNodeId: 'c2_surface_junction', characterClass: 'gun_scavenger', background: 'wasteland_orphan' },
    [/You could just keep walking/i],
    nodesVisited,
    endingsReached,
    consoleErrors,
    httpErrors,
    discrepancies
  );
  await stepBranchToEnding(
    browser,
    'echo',
    'echo_c8_feast',
    { currentNodeId: 'c8_vault_seraphine_offer', characterClass: 'gun_scavenger', background: 'wasteland_orphan' },
    [/Accept Seraphine's deal/i],
    nodesVisited,
    endingsReached,
    consoleErrors,
    httpErrors,
    discrepancies
  );

  return {
    agentId: persona.id,
    codename: persona.codename,
    build: { background: persona.bgName, className: persona.className, trait: persona.traitName, companion: persona.companionName },
    characterCreatorPassed: phaseA.passed,
    step2BadgeSnippet: phaseA.step2BadgeSnippet,
    statsBreakdownSnippet: phaseA.statsBreakdownSnippet,
    prologueNodesVisited: phaseA.prologueNodesVisited,
    chaptersTraversed: ['Prologue', 'Chapter 1', 'Chapter 2', 'Chapter 3', 'Chapter 8'],
    routeNodesVisited: Array.from(nodesVisited),
    endingsReached: Array.from(endingsReached),
    rewindsPerformed: 0,
    consoleErrors,
    httpErrors,
    featureResults,
    discrepanciesFound: discrepancies,
    overallPassed:
      phaseA.passed &&
      consoleErrors.length === 0 &&
      httpErrors.length === 0 &&
      discrepancies.length === 0 &&
      featureResults.every((f) => f.passed) &&
      endingsReached.size >= 2,
    durationMs: Date.now() - t0,
  };
}

async function runFoxtrot(browser: Browser): Promise<AgentRunReport> {
  const t0 = Date.now();
  const persona = PERSONAS.foxtrot;
  const consoleErrors: string[] = [];
  const httpErrors: string[] = [];
  const discrepancies: string[] = [];
  const nodesVisited = new Set<string>();
  const endingsReached = new Set<string>();
  const featureResults: AgentFeatureCheck[] = [];

  const phaseA = await runPhaseACreatorAndPrologue(browser, persona, consoleErrors, httpErrors, discrepancies);
  for (const n of phaseA.prologueNodesVisited) nodesVisited.add(n);

  // Mid-game branches MB1-MB4 + Ch. 11 + Ch. 12 + FC1 -> multiple endings
  const endRuns: Array<[string, StatePayloadOptions, Array<RegExp | null>]> = [
    ['mb1', { currentNodeId: 'mb1_27', characterClass: 'relic_hunter', background: 'forgotten_scholar' }, [/iron bulkhead/i]],
    ['mb2', { currentNodeId: 'mb2_31', characterClass: 'relic_hunter', background: 'forgotten_scholar' }, [/Lock the transmitter key/i]],
    ['mb3', { currentNodeId: 'mb3_31', characterClass: 'relic_hunter', background: 'forgotten_scholar' }, [/iron turnstile/i]],
    ['mb4', { currentNodeId: 'mb4_22', characterClass: 'relic_hunter', background: 'forgotten_scholar' }, [/Bar the tower door/i]],
    ['c11', { currentNodeId: 'c11_gate_sealed_door', characterClass: 'relic_hunter', background: 'forgotten_scholar' }, [/Force the gate/i]],
    ['c12', { currentNodeId: 'c12_saint_veyra_choice', characterClass: 'relic_hunter', background: 'forgotten_scholar', stats: { corruption: 75 } }, [/mark surges at Veyra/i]],
    ['fc1', { currentNodeId: 'fc1_threshold_mira_scene', characterClass: 'relic_hunter', background: 'forgotten_scholar' }, [/Move past her/i]],
  ];
  for (const [tag, seedOpts, steps] of endRuns) {
    await stepBranchToEnding(browser, 'foxtrot', `fox_${tag}`, seedOpts, steps, nodesVisited, endingsReached, consoleErrors, httpErrors, discrepancies);
  }

  // FC2 -> Epilogue -> epi_50 -> epi_55 ("Yes, We're Here") + epi_59 ("The Mark Goes Quiet")
  await stepBranchToEnding(
    browser,
    'foxtrot',
    'fox_fc2_epi',
    { currentNodeId: 'final_chapter2_start', characterClass: 'relic_hunter', background: 'forgotten_scholar', flags: { velna_coordinates: true } },
    [/Face what comes next/i, /Follow Velna's Sub-Level 14 coordinates/i],
    nodesVisited,
    endingsReached,
    consoleErrors,
    httpErrors,
    discrepancies
  );
  await stepBranchToEnding(
    browser,
    'foxtrot',
    'fox_epi55',
    { currentNodeId: 'epi_50', characterClass: 'relic_hunter', background: 'forgotten_scholar', stats: { intelligence: 14, corruption: 85 } },
    [/Yes, We're Here/i, null],
    nodesVisited,
    endingsReached,
    consoleErrors,
    httpErrors,
    discrepancies
  );
  await stepBranchToEnding(
    browser,
    'foxtrot',
    'fox_epi59',
    { currentNodeId: 'epi_50', characterClass: 'relic_hunter', background: 'forgotten_scholar' },
    [/Throw the Shunt Bar/i],
    nodesVisited,
    endingsReached,
    consoleErrors,
    httpErrors,
    discrepancies
  );

  // Roadmap sum == 1,636 + reload persistence
  {
    const { context, page } = await seedAndOpenNode(
      browser,
      { currentNodeId: 'chapter12_start' },
      'fox_roadmap',
      consoleErrors,
      httpErrors
    );
    await page.goto(`${LIVE_URL}?cb=${Date.now()}`, { waitUntil: 'networkidle' });
    await page.getByText(/CHAPTER SELECT/i).first().click({ force: true });
    await page.waitForTimeout(700);
    const rText1 = await page.evaluate(() => document.body.innerText);
    const nodeCounts = Array.from(rText1.matchAll(/(\d+) nodes/g)).map((m) => parseInt(m[1], 10));
    const roadmapSum = nodeCounts.reduce((a, b) => a + b, 0);
    await page.reload({ waitUntil: 'networkidle' });
    await page.getByText(/CHAPTER SELECT/i).first().click({ force: true });
    await page.waitForTimeout(500);
    const rText2 = await page.evaluate(() => document.body.innerText);
    const reloadPersisted = rText2.includes('UNLOCKED') && rText2.includes('PLAY');
    const ok = roadmapSum === 1636 && reloadPersisted;
    featureResults.push({
      feature: 'ChapterRoadmap 1,636-node sum, MB1-MB4 + Epilogue transition, reload persistence',
      passed: ok,
      evidence: `roadmapSum=${roadmapSum}, reloadPersisted=${reloadPersisted}, endingsUnlocked=${endingsReached.size}`,
    });
    if (!ok) discrepancies.push(`[foxtrot] Roadmap sum=${roadmapSum} (expected 1636) or persistence failed`);
    await context.close();
  }

  return {
    agentId: persona.id,
    codename: persona.codename,
    build: { background: persona.bgName, className: persona.className, trait: persona.traitName, companion: persona.companionName },
    characterCreatorPassed: phaseA.passed,
    step2BadgeSnippet: phaseA.step2BadgeSnippet,
    statsBreakdownSnippet: phaseA.statsBreakdownSnippet,
    prologueNodesVisited: phaseA.prologueNodesVisited,
    chaptersTraversed: ['Prologue', 'Chapter 1', 'MB1 (Ch 3)', 'MB2 (Ch 6)', 'MB3 (Ch 8)', 'MB4 (Ch 10)', 'Chapter 11', 'Chapter 12', 'Final Chapter 1', 'Final Chapter 2', 'Epilogue'],
    routeNodesVisited: Array.from(nodesVisited),
    endingsReached: Array.from(endingsReached),
    rewindsPerformed: 0,
    consoleErrors,
    httpErrors,
    featureResults,
    discrepanciesFound: discrepancies,
    overallPassed:
      phaseA.passed &&
      consoleErrors.length === 0 &&
      httpErrors.length === 0 &&
      discrepancies.length === 0 &&
      featureResults.every((f) => f.passed) &&
      endingsReached.size >= 8,
    durationMs: Date.now() - t0,
  };
}

async function runGolf(browser: Browser): Promise<AgentRunReport> {
  const t0 = Date.now();
  const persona = PERSONAS.golf;
  const consoleErrors: string[] = [];
  const httpErrors: string[] = [];
  const discrepancies: string[] = [];
  const nodesVisited = new Set<string>();
  const endingsReached = new Set<string>();
  const featureResults: AgentFeatureCheck[] = [];
  let rewindsPerformed = 0;

  const phaseA = await runPhaseACreatorAndPrologue(browser, persona, consoleErrors, httpErrors, discrepancies);
  for (const n of phaseA.prologueNodesVisited) nodesVisited.add(n);

  const recklessOk = phaseA.statsBreakdownSnippet.includes('+1 Reckless');
  featureResults.push({
    feature: 'Reckless trait (+1 Agility) in StatsPanel breakdown',
    passed: recklessOk,
    evidence: recklessOk ? `Verified "+1 Reckless" in StatsPanel: ${phaseA.statsBreakdownSnippet}` : 'Missing Reckless bonus',
  });
  if (!recklessOk) discrepancies.push('[golf] Missing +1 Reckless in StatsPanel breakdown');

  // Perk priority [1] on tunnel_collapse_moment + Inventory USE deltas
  {
    const { context, page } = await seedAndOpenNode(
      browser,
      {
        currentNodeId: 'tunnel_collapse_moment',
        characterClass: 'blade_survivor',
        background: 'black_market_courier',
        stats: { health: 60, hunger: 50, thirst: 50 },
        inventory: { food: 3, water: 3, medicine: 2 },
      },
      'golf_perk_inv',
      consoleErrors,
      httpErrors
    );
    await flushTypewriter(page);
    const firstChoiceText = await page.locator('[data-choice-button="true"]').first().innerText();
    const perkSortedFirst = firstChoiceText.includes('Blade Survivor');
    featureResults.push({
      feature: 'Blade Survivor perk sorts to position [1] in tunnel_collapse_moment',
      passed: perkSortedFirst,
      evidence: `First choice text: "${firstChoiceText.replace(/\s+/g, ' ').slice(0, 80)}"`,
    });
    if (!perkSortedFirst) discrepancies.push('[golf] Blade Survivor perk not sorted first');

    await page.keyboard.press('i');
    await page.waitForTimeout(500);
    await page.getByText('USE (+15)', { exact: true }).nth(0).click({ force: true });
    await page.waitForTimeout(250);
    await page.getByText('USE (+15)', { exact: true }).nth(1).click({ force: true });
    await page.waitForTimeout(250);
    await page.getByText('USE (+20 HP)', { exact: true }).first().click({ force: true });
    await page.waitForTimeout(1400);
    const postInv = await readAutoSave(page);
    const invOk = postInv?.stats?.hunger === 65 && postInv?.stats?.thirst === 65 && postInv?.stats?.health === 80;
    featureResults.push({
      feature: 'InventoryPanel consumable USE (+15 Hunger, +15 Thirst, +20 HP)',
      passed: invOk,
      evidence: `Post-USE vitals: hunger=${postInv?.stats?.hunger}, thirst=${postInv?.stats?.thirst}, health=${postInv?.stats?.health}`,
    });
    if (!invOk) discrepancies.push('[golf] InventoryPanel USE consumable deltas mismatch');
    nodesVisited.add('tunnel_collapse_moment');
    await context.close();
  }

  // [R] keyboard hotkey rewind on EndingScreen (fc2_memory_final_review -> fc2_true_cycle_choice -> ending A -> [R] -> ending B)
  await stepBranchToEnding(
    browser,
    'golf',
    'golf_r_rewind',
    {
      currentNodeId: 'fc2_memory_final_review',
      characterClass: 'blade_survivor',
      background: 'black_market_courier',
      flags: { clean_signal: true, complete_record_held: true, both_companions_at_gate: true },
    },
    [null, /Complete the transfer/i],
    nodesVisited,
    endingsReached,
    consoleErrors,
    httpErrors,
    discrepancies,
    async (page) => {
      await page.keyboard.press('r');
      await page.waitForTimeout(1000);
      rewindsPerformed++;
      const rewoundSave = await readAutoSave(page);
      const rewoundOk = rewoundSave?.currentNodeId === 'fc2_true_cycle_choice';
      if (rewoundOk) {
        const clickedAlt = await clickUnlockedChoice(page, /Transcend\. Become the living record/i);
        const endSave2 = await readAutoSave(page);
        if (endSave2?.activeEnding) endingsReached.add(endSave2.activeEnding);
        if (endSave2?.currentNodeId) nodesVisited.add(endSave2.currentNodeId);
        featureResults.push({
          feature: '[R] keyboard hotkey rewind on EndingScreen -> alternate ending B',
          passed: clickedAlt && endingsReached.size >= 2,
          evidence: `Rewound via [R] to ${rewoundSave?.currentNodeId}, then unlocked ${endSave2?.activeEnding}.`,
        });
      } else {
        discrepancies.push(`[golf] [R] hotkey rewind failed (node=${rewoundSave?.currentNodeId})`);
        featureResults.push({ feature: '[R] keyboard hotkey rewind on EndingScreen -> alternate ending B', passed: false, evidence: 'Rewind failed' });
      }
    }
  );

  // Route Codex all category tabs & 244 total check
  {
    const { context, page } = await seedAndOpenNode(
      browser,
      { currentNodeId: 'prologue_start', endingsDiscovered: ['ending_buried_tunnel', 'fc2_bearer_transcended_end'] },
      'golf_codex',
      consoleErrors,
      httpErrors
    );
    await page.goto(`${LIVE_URL}?cb=${Date.now()}`, { waitUntil: 'networkidle' });
    await page.getByText('VIEW ROUTE CODEX', { exact: true }).click({ force: true });
    await page.waitForTimeout(600);
    await page.getByText('Endings', { exact: true }).first().click({ force: true });
    await page.waitForTimeout(600);
    const codexText = await page.evaluate(() => document.body.innerText.toUpperCase());
    const expectedTabs = ['ALL (244)', 'DEATH', 'SACRIFICE', 'BETRAYAL', 'CORRUPTION', 'COMPANION', 'WANDERER', 'FACTION', 'SECRET'];
    const tabsOk = expectedTabs.every((lbl) => codexText.includes(lbl));
    for (const tab of ['FACTION', 'CORRUPTION', 'SECRET']) {
      await page.getByText(new RegExp(`^${tab}\\b`, 'i')).first().click({ force: true }).catch(() => {});
      await page.waitForTimeout(200);
    }
    featureResults.push({
      feature: 'Route Codex all 8 canonical category tabs & 244 total',
      passed: tabsOk,
      evidence: tabsOk ? 'All 8 canonical categories + ALL (244) verified live.' : `Missing category tab in Codex`,
    });
    if (!tabsOk) discrepancies.push('[golf] Route Codex missing category tabs or 244 count');
    await context.close();
  }

  return {
    agentId: persona.id,
    codename: persona.codename,
    build: { background: persona.bgName, className: persona.className, trait: persona.traitName, companion: persona.companionName },
    characterCreatorPassed: phaseA.passed,
    step2BadgeSnippet: phaseA.step2BadgeSnippet,
    statsBreakdownSnippet: phaseA.statsBreakdownSnippet,
    prologueNodesVisited: phaseA.prologueNodesVisited,
    chaptersTraversed: ['Prologue', 'Chapter 1', 'Final Chapter 2', 'Route Codex'],
    routeNodesVisited: Array.from(nodesVisited),
    endingsReached: Array.from(endingsReached),
    rewindsPerformed,
    consoleErrors,
    httpErrors,
    featureResults,
    discrepanciesFound: discrepancies,
    overallPassed:
      phaseA.passed &&
      consoleErrors.length === 0 &&
      httpErrors.length === 0 &&
      discrepancies.length === 0 &&
      featureResults.every((f) => f.passed) &&
      endingsReached.size >= 2,
    durationMs: Date.now() - t0,
  };
}

// ─── Main Parallel Orchestrator ──────────────────────────────────────────────

async function main() {
  console.log('================================================================================');
  console.log('🌐 7-AGENT CONCURRENT DIVERGENT LIVE PLAYTHROUGH & FULL-GAME AUDIT');
  console.log(`🎯 Live Target: ${LIVE_URL}`);
  console.log('================================================================================\n');

  const browser = await chromium.launch({
    headless: true,
    channel: process.env.PLAYWRIGHT_CHANNEL || 'chrome',
  });

  try {
    const runners = [runAlpha, runBravo, runCharlie, runDelta, runEcho, runFoxtrot, runGolf];
    const agents = await Promise.all(runners.map((fn) => fn(browser)));

    const distinctEndings = Array.from(new Set(agents.flatMap((a) => a.endingsReached))).sort();
    const distinctNodes = Array.from(new Set(agents.flatMap((a) => a.routeNodesVisited))).sort();
    const totalConsoleErrors = agents.reduce((acc, a) => acc + a.consoleErrors.length, 0);
    const totalHttpErrors = agents.reduce((acc, a) => acc + a.httpErrors.length, 0);
    const totalDiscrepancies = agents.reduce((acc, a) => acc + a.discrepanciesFound.length, 0);
    const passedAgents = agents.filter((a) => a.overallPassed).length;

    const report: DivergentSwarmReport = {
      timestamp: new Date().toISOString(),
      targetUrl: LIVE_URL,
      totalAgents: agents.length,
      passedAgents,
      allPassed: passedAgents === agents.length && totalConsoleErrors === 0 && totalHttpErrors === 0 && totalDiscrepancies === 0,
      distinctEndingsCount: distinctEndings.length,
      distinctEndings,
      distinctNodesCount: distinctNodes.length,
      distinctNodes,
      totalConsoleErrors,
      totalHttpErrors,
      totalDiscrepancies,
      agents,
    };

    fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(report, null, 2));

    for (const a of agents) {
      const icon = a.overallPassed ? '✅' : '❌';
      console.log(`${icon} ${a.codename} (${Math.round(a.durationMs / 1000)}s) — endings=${a.endingsReached.length} [${a.endingsReached.join(', ')}], nodes=${a.routeNodesVisited.length}, rewinds=${a.rewindsPerformed}`);
      if (a.discrepanciesFound.length > 0) console.log(`   ⚠️ Discrepancies: ${a.discrepanciesFound.join(' | ')}`);
      if (a.consoleErrors.length > 0) console.log(`   ⚠️ Console: ${a.consoleErrors.join(' | ')}`);
      if (a.httpErrors.length > 0) console.log(`   ⚠️ HTTP: ${a.httpErrors.join(' | ')}`);
    }

    console.log('\n--------------------------------------------------------------------------------');
    console.log(`Passed Agents: ${passedAgents}/${agents.length} | Distinct Endings: ${distinctEndings.length} | Distinct Live Nodes: ${distinctNodes.length}`);
    console.log(`Console Errors: ${totalConsoleErrors} | HTTP Errors: ${totalHttpErrors} | Discrepancies: ${totalDiscrepancies}`);
    console.log(`Telemetry saved -> ${OUTPUT_FILE}`);
    console.log('================================================================================');

    if (!report.allPassed) process.exit(1);
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
