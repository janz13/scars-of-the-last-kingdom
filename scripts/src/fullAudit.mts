/**
 * Full Game Audit Script — Scars of the Last Kingdom
 * Run with: pnpm exec tsx scripts/src/fullAudit.mts
 *
 * Uses createRequire to work around ESM/CJS interop issues with
 * packages that don't declare "type": "module".
 */

import { createRequire } from 'node:module';
import { writeFileSync, readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const require = createRequire(import.meta.url);

if (typeof require !== 'undefined' && (require as any).extensions) {
  (require as any).extensions['.png'] = () => ({});
  (require as any).extensions['.webp'] = () => ({});
  (require as any).extensions['.jpg'] = () => ({});
}

// Use require() to load TS modules — tsx registers the loader automatically
const { STORY_NODES, getNodeById, getStartNodeId } = require('../../artifacts/mobile/data/story/allNodesSync.ts');
const { ENDINGS } = require('../../artifacts/mobile/data/endings.ts');
const { SCENE_MANIFEST } = require('../../artifacts/mobile/constants/sceneManifest.ts');

const PIXEL_ASSET_DIR = resolve(import.meta.dirname, '../../artifacts/mobile/assets/pixel');
const LEGACY_IMAGE_DIR = resolve(import.meta.dirname, '../../artifacts/mobile/assets/images');

const STORY: any[] = STORY_NODES;
const DICE_OUTCOME_NODES = STORY.filter((n: any) => n.chapter === 'DiceOutcomes');

// Extract image keys from images.ts source (avoiding React Native require calls)
const imagesSrc = readFileSync(resolve(import.meta.dirname, '../../artifacts/mobile/constants/images.ts'), 'utf-8');
const IMAGE_KEYS = new Set<string>();
const imgRegex = /^\s+(\w+):\s*require/gm;
let imgMatch;
while ((imgMatch = imgRegex.exec(imagesSrc)) !== null) IMAGE_KEYS.add(imgMatch[1]);

interface AuditIssue {
  severity: 'error' | 'warning' | 'info';
  category: string;
  location: string;
  message: string;
}

const issues: AuditIssue[] = [];
const nodeIds = new Set<string>();
const allFlags = new Set<string>();
const endingIds = new Set<string>();
const chapterSet = new Set<string>();
const chapterCounts: Record<string, number> = {};
const endingTypes: Record<string, number> = {};
let totalChoices = 0;
let diceCheckNodes = 0;

// ─── 1. DUPLICATE NODE IDs ───────────────────────────────────────────────────
console.log('\n🔍 [1/17] Duplicate node IDs...');
const idCounts = new Map<string, number>();
for (const node of STORY) idCounts.set(node.id, (idCounts.get(node.id) ?? 0) + 1);
for (const [id, count] of idCounts) {
  if (count > 1) issues.push({ severity: 'error', category: 'story-duplicate-ids', location: id, message: `Duplicate node ID "${id}" appears ${count} times` });
  nodeIds.add(id);
}

// ─── 2. BROKEN CHOICE TARGETS ────────────────────────────────────────────────
console.log('🔍 [2/17] Choice targets...');
for (const node of STORY) {
  for (const choice of node.choices) {
    totalChoices++;
    if (choice.nextNode !== '__return__' && !nodeIds.has(choice.nextNode))
      issues.push({ severity: 'error', category: 'story-broken-link', location: `${node.id}/${choice.id}`, message: `nextNode "${choice.nextNode}" does not exist` });
    if (choice.endingTrigger && !nodeIds.has(choice.endingTrigger))
      issues.push({ severity: 'error', category: 'story-broken-link', location: `${node.id}/${choice.id}`, message: `endingTrigger "${choice.endingTrigger}" does not exist` });
    if (choice.diceCheck) {
      const dc = choice.diceCheck;
      for (const [label, nid] of [['successNode', dc.successNode], ['failureNode', dc.failureNode], ['criticalSuccessNode', dc.criticalSuccessNode], ['criticalFailureNode', dc.criticalFailureNode]] as [string, string | undefined][])
        if (nid && !nodeIds.has(nid))
          issues.push({ severity: 'error', category: 'story-broken-link', location: `${node.id}/${choice.id}`, message: `diceCheck.${label} "${nid}" does not exist` });
    }
    if (choice.requirements?.flags) for (const f of choice.requirements.flags) allFlags.add(f);
    if (choice.requirements?.blockedFlags) for (const f of choice.requirements.blockedFlags) allFlags.add(f);
    if (choice.effects?.setFlags) for (const f of choice.effects.setFlags) allFlags.add(f);
    if (choice.effects?.removeFlags) for (const f of choice.effects.removeFlags) allFlags.add(f);
  }
}

// ─── 3. UNREACHABLE NODES ─────────────────────────────────────────────────────
console.log('🔍 [3/17] Unreachable nodes...');
const visited = new Set<string>();
const q = [getStartNodeId()];
visited.add(getStartNodeId());
while (q.length > 0) {
  const currentId = q.shift()!;
  const node = getNodeById(currentId);
  if (!node) continue;
  for (const choice of node.choices) {
    const targets = [choice.nextNode];
    if (choice.diceCheck) {
      targets.push(choice.diceCheck.successNode, choice.diceCheck.failureNode);
      if (choice.diceCheck.criticalSuccessNode) targets.push(choice.diceCheck.criticalSuccessNode);
      if (choice.diceCheck.criticalFailureNode) targets.push(choice.diceCheck.criticalFailureNode);
    }
    for (const t of targets) if (t && t !== '__return__' && !visited.has(t)) { visited.add(t); q.push(t); }
  }
}
for (const dn of DICE_OUTCOME_NODES) visited.add(dn.id);
for (const id of nodeIds) {
  if (!visited.has(id)) {
    const node = getNodeById(id);
    if (node && (id.startsWith('halluc_') || id.startsWith('mira_event_') || id.startsWith('cain_event_'))) continue;
    issues.push({ severity: 'warning', category: 'story-unreachable', location: id, message: `Node "${id}" is not reachable from start via any choice path` });
  }
}

// ─── 4. DEAD ENDS ────────────────────────────────────────────────────────────
console.log('🔍 [4/17] Dead ends...');
for (const node of STORY) {
  if (!node.isEnding && node.choices.length === 0) {
    if (node.id.startsWith('halluc_') || node.id.startsWith('mira_event_') || node.id.startsWith('cain_event_')) continue;
    issues.push({ severity: 'error', category: 'story-dead-end', location: node.id, message: `Non-ending node "${node.id}" has zero choices — player is stuck` });
  }
}

// ─── 5. ENDINGS AUDIT ────────────────────────────────────────────────────────
console.log('🔍 [5/17] Endings...');
const endingNodeIds = new Set<string>();
const duplicateEndingIds = new Map<string, number>();
for (const node of STORY) {
  if (node.isEnding) {
    const eid = node.endingId ?? node.id;
    endingNodeIds.add(eid);
    duplicateEndingIds.set(eid, (duplicateEndingIds.get(eid) ?? 0) + 1);
    endingIds.add(eid);
    if (node.endingType) endingTypes[node.endingType] = (endingTypes[node.endingType] ?? 0) + 1;
  }
}
for (const [eid, count] of duplicateEndingIds) {
  if (count > 1) issues.push({ severity: 'warning', category: 'story-duplicate-endings', location: eid, message: `Ending ID "${eid}" is used by ${count} different ending nodes` });
}
const endingsDataIds = new Set<string>(ENDINGS.map((e: any) => String(e.id)));
for (const eid of endingNodeIds) {
  if (!endingsDataIds.has(eid) && eid !== 'chapter1_end')
    issues.push({ severity: 'warning', category: 'story-missing-ending-data', location: eid, message: `Ending ID "${eid}" has no entry in ENDINGS data` });
}
const survivalEndings = new Set(['ending_morale_collapse', 'ending_dehydration', 'ending_starvation', 'ending_metro_death']);
for (const eid of endingsDataIds) {
  if (!endingNodeIds.has(eid) && !survivalEndings.has(eid))
    issues.push({ severity: 'info', category: 'story-orphan-ending-data', location: eid, message: `ENDINGS entry "${eid}" is never triggered by any story node` });
}

// ─── 6. CHAPTER CONNECTIVITY ─────────────────────────────────────────────────
console.log('🔍 [6/17] Chapter connectivity...');
for (const node of STORY) {
  chapterSet.add(node.chapter);
  chapterCounts[node.chapter] = (chapterCounts[node.chapter] ?? 0) + 1;
  if (node.choices.some((c: any) => c.diceCheck)) diceCheckNodes++;
}
const expectedChapters = ['Prologue', 'Chapter 1', 'Chapter 2', 'Chapter 3', 'Chapter 4', 'Chapter 5', 'Chapter 6', 'Chapter 7', 'Chapter 8', 'Chapter 9', 'Chapter 10', 'Chapter 11', 'Chapter 12', 'Final Chapter 1', 'Final Chapter 2'];
for (const ch of expectedChapters) {
  if (!chapterSet.has(ch)) issues.push({ severity: 'warning', category: 'story-missing-chapter', location: ch, message: `Chapter "${ch}" has no story nodes` });
}

// ─── 7. IMAGE KEY VALIDATION ─────────────────────────────────────────────────
console.log('🔍 [7/17] Image keys...');
const usedImageKeys = new Set<string>();
for (const node of STORY) {
  if (node.imageKey) {
    usedImageKeys.add(node.imageKey);
    if (!IMAGE_KEYS.has(node.imageKey))
      issues.push({ severity: 'warning', category: 'story-missing-image', location: node.id, message: `imageKey "${node.imageKey}" is not registered in BACKGROUND_IMAGES` });
  }
}

// ─── 8. FLAG CONSISTENCY ─────────────────────────────────────────────────────
console.log('🔍 [8/17] Flag consistency...');
for (const node of STORY) {
  if (node.effectsOnEnter?.setFlags) for (const f of node.effectsOnEnter.setFlags) allFlags.add(f);
  if (node.effectsOnEnter?.removeFlags) for (const f of node.effectsOnEnter.removeFlags) allFlags.add(f);
  for (const choice of node.choices) {
    if (choice.effects?.setFlags) for (const f of choice.effects.setFlags) allFlags.add(f);
    if (choice.diceCheck?.successEffects?.setFlags) for (const f of choice.diceCheck.successEffects.setFlags) allFlags.add(f);
    if (choice.diceCheck?.failureEffects?.setFlags) for (const f of choice.diceCheck.failureEffects.setFlags) allFlags.add(f);
    if (choice.diceCheck?.criticalSuccessEffects?.setFlags) for (const f of choice.diceCheck.criticalSuccessEffects.setFlags) allFlags.add(f);
    if (choice.diceCheck?.criticalFailureEffects?.setFlags) for (const f of choice.diceCheck.criticalFailureEffects.setFlags) allFlags.add(f);
  }
}
const setFlags = new Set<string>();
const requiredFlags = new Set<string>();
for (const node of STORY) {
  if (node.effectsOnEnter?.setFlags) for (const f of node.effectsOnEnter.setFlags) setFlags.add(f);
  for (const choice of node.choices) {
    if (choice.effects?.setFlags) for (const f of choice.effects.setFlags) setFlags.add(f);
    if (choice.diceCheck?.successEffects?.setFlags) for (const f of choice.diceCheck.successEffects.setFlags) setFlags.add(f);
    if (choice.diceCheck?.failureEffects?.setFlags) for (const f of choice.diceCheck.failureEffects.setFlags) setFlags.add(f);
    if (choice.diceCheck?.criticalSuccessEffects?.setFlags) for (const f of choice.diceCheck.criticalSuccessEffects.setFlags) setFlags.add(f);
    if (choice.diceCheck?.criticalFailureEffects?.setFlags) for (const f of choice.diceCheck.criticalFailureEffects.setFlags) setFlags.add(f);
    if (choice.requirements?.flags) for (const f of choice.requirements.flags) requiredFlags.add(f);
  }
}
for (const f of requiredFlags) {
  if (!setFlags.has(f)) issues.push({ severity: 'warning', category: 'story-unset-flag', location: f, message: `Flag "${f}" is required by a choice but never set — choice will always be hidden` });
}

// ─── 9. COMPANION ROUTE VALIDATION ──────────────────────────────────────────
console.log('🔍 [9/17] Companion routes...');
for (const f of ['mira_joins_party', 'mira_betrayed', 'mira_trust_broken', 'mira_sacrifice_willing', 'cain_joins_party', 'cain_betrayed', 'cain_rival', 'cain_ruthless_mode', 'cain_last_stand_willing', 'cain_knows_mark', 'met_mira', 'met_cain']) {
  if (!allFlags.has(f)) issues.push({ severity: 'warning', category: 'companion-route', location: f, message: `Companion flag "${f}" not found in story data — companion route may be broken` });
}

// ─── 10. FACTION ROUTE VALIDATION ────────────────────────────────────────────
console.log('🔍 [10/17] Faction routes...');
for (const f of ['iron_saints_registered', 'glass_court_invited', 'hollow_children_trust', 'red_choir_initiated', 'last_archive_found']) {
  if (!allFlags.has(f)) issues.push({ severity: 'info', category: 'faction-route', location: f, message: `Expected faction flag "${f}" not found in story data` });
}

// ─── 11. TRUE ENDING REQUIREMENTS ────────────────────────────────────────────
console.log('🔍 [11/17] True ending requirements...');
for (const f of ['chapter3_complete', 'chapter4_complete', 'chapter5_complete', 'chapter6_complete', 'chapter7_complete', 'chapter8_complete']) {
  if (!setFlags.has(f)) issues.push({ severity: 'info', category: 'true-ending', location: f, message: `Chapter completion flag "${f}" is never set — true ending may be unreachable` });
}

// ─── 12. DUPLICATE CHOICE IDs ────────────────────────────────────────────────
console.log('🔍 [12/17] Duplicate choice IDs...');
const globalChoiceIds = new Map<string, string>();
for (const node of STORY) {
  const localChoiceIds = new Set<string>();
  for (const choice of node.choices) {
    if (localChoiceIds.has(choice.id)) issues.push({ severity: 'error', category: 'story-duplicate-choice-id', location: `${node.id}/${choice.id}`, message: `Duplicate choice id "${choice.id}" within node "${node.id}"` });
    localChoiceIds.add(choice.id);
    if (globalChoiceIds.has(choice.id)) {
      const firstSeen = globalChoiceIds.get(choice.id)!;
      if (firstSeen !== node.id) issues.push({ severity: 'warning', category: 'story-duplicate-choice-id', location: `${node.id}/${choice.id}`, message: `Choice id "${choice.id}" also used in node "${firstSeen}"` });
    } else globalChoiceIds.set(choice.id, node.id);
  }
}

// ─── 13. STAT/INVENTORY KEY VALIDATION ───────────────────────────────────────
console.log('🔍 [13/17] Stat/inventory keys...');
const VALID_EFFECT_KEYS = new Set(['health','maxHealth','hunger','thirst','morale','trust','strength','intelligence','agility','charisma','luck','corruption','food','water','medicine','scrap','ammo','relics','reputation','ironSaints','glassCourt','hollowChildren','redChoir','lastArchive','miraTrust','cainTrust','setFlags','removeFlags']);
const VALID_REQ_KEYS = new Set(['health','maxHealth','hunger','thirst','morale','trust','strength','intelligence','agility','charisma','luck','corruption','food','water','medicine','scrap','ammo','relics','reputation','flags','blockedFlags','classes','backgrounds','factionRep','maxCorruption','maxMorale','miraTrust','cainTrust','miraPresent','cainPresent']);
for (const node of STORY) {
  if (node.effectsOnEnter) for (const key of Object.keys(node.effectsOnEnter)) {
    if (!VALID_EFFECT_KEYS.has(key)) issues.push({ severity: 'warning', category: 'invalid-key', location: `${node.id}/effectsOnEnter`, message: `Unknown effectsOnEnter key "${key}"` });
  }
  for (const choice of node.choices) {
    if (choice.effects) for (const key of Object.keys(choice.effects)) {
      if (!VALID_EFFECT_KEYS.has(key)) issues.push({ severity: 'warning', category: 'invalid-key', location: `${node.id}/${choice.id}/effects`, message: `Unknown effects key "${key}"` });
    }
    if (choice.requirements) for (const key of Object.keys(choice.requirements)) {
      if (!VALID_REQ_KEYS.has(key)) issues.push({ severity: 'warning', category: 'invalid-key', location: `${node.id}/${choice.id}/requirements`, message: `Unknown requirements key "${key}"` });
    }
  }
}

// ─── 14. HALLUCINATION NODE VALIDATION ───────────────────────────────────────
console.log('🔍 [14/17] Hallucination nodes...');
const hallucNodeIds = new Set(STORY.filter((n: any) => n.id.startsWith('halluc_')).map((n: any) => n.id));
for (const hid of ['halluc_mark_speaks', 'halluc_the_dead_speak', 'halluc_throne_vision']) {
  if (!hallucNodeIds.has(hid)) issues.push({ severity: 'error', category: 'hallucination', location: hid, message: `Hallucination node "${hid}" referenced in gameEngine.ts but not found in story data` });
}
for (const node of STORY) {
  if (node.id.startsWith('halluc_') && !node.isEnding && !node.choices.some((c: any) => c.nextNode === '__return__'))
    issues.push({ severity: 'warning', category: 'hallucination', location: node.id, message: `Hallucination node has no __return__ choice — player may get stuck` });
}

// ─── 15. COMPANION EVENT NODE VALIDATION ─────────────────────────────────────
console.log('🔍 [15/17] Companion event nodes...');
const companionEventIds = new Set(STORY.filter((n: any) => n.id.startsWith('mira_event_') || n.id.startsWith('cain_event_')).map((n: any) => n.id));
for (const eid of ['mira_event_opens_up', 'mira_event_corruption_warning', 'mira_event_sacrifice_offer', 'mira_event_pulls_away', 'cain_event_respect_earned', 'cain_event_resource_warning', 'cain_event_hesitation', 'cain_event_betrayal_warning']) {
  if (!companionEventIds.has(eid)) issues.push({ severity: 'error', category: 'companion-events', location: eid, message: `Companion event "${eid}" referenced in companionSystem.ts but not found in story data` });
}
for (const node of STORY) {
  if ((node.id.startsWith('mira_event_') || node.id.startsWith('cain_event_')) && !node.isEnding && !node.choices.some((c: any) => c.nextNode === '__return__'))
    issues.push({ severity: 'warning', category: 'companion-events', location: node.id, message: `Companion event node has no __return__ choice — player may get stuck` });
}

// ─── 16. DICE OUTCOME NODE VALIDATION ────────────────────────────────────────
console.log('🔍 [16/17] Dice outcome nodes...');
for (const node of DICE_OUTCOME_NODES) {
  if (node.choices.length === 0 && !node.isEnding)
    issues.push({ severity: 'warning', category: 'dice-outcomes', location: node.id, message: `Dice outcome node has no choices — may be a dead end` });
}

// ─── 17. SAVE/LOAD CONSISTENCY ────────────────────────────────────────────────
console.log('🔍 [17/19] Save/load consistency...');
if (!nodeIds.has(getStartNodeId()))
  issues.push({ severity: 'error', category: 'save-load', location: getStartNodeId(), message: `Start node ID "${getStartNodeId()}" does not exist in story data` });

// ─── 18. ART MISSING AUDIT (Pixel Overhaul Wave 2: Warning / Wave 5: Error) ───
console.log('🔍 [18/19] Scene art coverage (art-missing)...');
const manifestKeys = new Set(Object.keys(SCENE_MANIFEST));
const missingSceneKeys = new Set<string>();
const missingSceneNodes: Record<string, string[]> = {};

for (const node of STORY) {
  const key = node.imageKey;
  if (!key) {
    issues.push({
      severity: 'warning',
      category: 'art-missing',
      location: node.id,
      message: `Story node "${node.id}" has no imageKey defined`,
    });
    continue;
  }
  if (!manifestKeys.has(key)) {
    missingSceneKeys.add(key);
    if (!missingSceneNodes[key]) missingSceneNodes[key] = [];
    missingSceneNodes[key].push(node.id);
    issues.push({
      severity: 'warning', // In Wave 5: escalate to 'error'
      category: 'art-missing',
      location: node.id,
      message: `Story node "${node.id}" references unmapped scene key "${key}" (falls back to default ruined_metro_station)`,
    });
  }
}

// ─── 19. ART ORIENTATION AUDIT (Pixel Overhaul Wave 2: Warning / Wave 5: Error) ───
console.log('🔍 [19/19] Dual orientation assets (art-orientation)...');
const checkedManifestEntries = Object.keys(SCENE_MANIFEST).length;

const resolvePixelAsset = (assetKey: string): boolean => {
  const candidates = [
    resolve(PIXEL_ASSET_DIR, 'scenes', `${assetKey}.png`),
    resolve(PIXEL_ASSET_DIR, 'placeholders', `${assetKey}.png`),
    resolve(PIXEL_ASSET_DIR, 'scenes', `${assetKey}.webp`),
    resolve(PIXEL_ASSET_DIR, 'placeholders', `${assetKey}.webp`),
    resolve(LEGACY_IMAGE_DIR, `${assetKey}.png`),
  ];
  return candidates.some((p) => existsSync(p));
};

for (const [key, entry] of Object.entries(SCENE_MANIFEST) as [string, any][]) {
  const missingFiles: string[] = [];

  // Check Landscape master
  if (!entry.landscape) {
    missingFiles.push('landscape property missing in manifest entry');
  } else if (!resolvePixelAsset(entry.landscape)) {
    missingFiles.push(`landscape asset file not found on disk (${entry.landscape})`);
  }

  // Check Portrait master
  if (!entry.portrait) {
    missingFiles.push('portrait property missing in manifest entry');
  } else if (!resolvePixelAsset(entry.portrait)) {
    missingFiles.push(`portrait asset file not found on disk (${entry.portrait})`);
  }

  // Check Parallax Depth Layers (far, mid, fore)
  if (entry.layers) {
    for (const [layerName, layerKey] of Object.entries(entry.layers)) {
      if (layerKey && !resolvePixelAsset(layerKey as string)) {
        missingFiles.push(`${layerName} layer asset file not found on disk (${layerKey})`);
      }
    }
  }

  if (missingFiles.length > 0) {
    issues.push({
      severity: 'warning', // In Wave 5: escalate to 'error'
      category: 'art-orientation',
      location: key,
      message: `Scene "${key}" failed orientation asset validation: ${missingFiles.join('; ')}`,
    });
  }
}

// ─── RESULTS ─────────────────────────────────────────────────────────────────
const errors = issues.filter(i => i.severity === 'error');
const warnings = issues.filter(i => i.severity === 'warning');
const infos = issues.filter(i => i.severity === 'info');

console.log('\n═══════════════════════════════════════════════════════════');
console.log('  FULL GAME AUDIT RESULTS');
console.log('═══════════════════════════════════════════════════════════');
console.log(`  Errors:   ${errors.length}`);
console.log(`  Warnings: ${warnings.length}`);
console.log(`  Info:     ${infos.length}`);
console.log('═══════════════════════════════════════════════════════════\n');

if (errors.length > 0) { console.log('❌ ERRORS:'); for (const e of errors) console.log(`  [${e.category}] ${e.location}: ${e.message}`); console.log(); }
if (warnings.length > 0) { console.log('⚠️  WARNINGS:'); for (const w of warnings.slice(0, 80)) console.log(`  [${w.category}] ${w.location}: ${w.message}`); if (warnings.length > 80) console.log(`  ... and ${warnings.length - 80} more`); console.log(); }
if (infos.length > 0) { console.log('ℹ️  INFO:'); for (const i of infos) console.log(`  [${i.category}] ${i.location}: ${i.message}`); console.log(); }

console.log('📊 STATS:');
console.log(`  Total chapters: ${chapterSet.size}`);
console.log(`  Total story nodes: ${STORY.length}`);
console.log(`  Total endings: ${endingNodeIds.size}`);
console.log(`  Total flags: ${allFlags.size}`);
console.log(`  Total choices: ${totalChoices}`);
console.log(`  Dice check nodes: ${diceCheckNodes}`);
console.log(`  Ending types: ${JSON.stringify(endingTypes)}`);
console.log('  Chapter counts:');
for (const [ch, count] of Object.entries(chapterCounts).sort()) console.log(`    ${ch}: ${count} nodes`);

writeFileSync('audit-result.json', JSON.stringify({
  stats: {
    totalChapters: chapterSet.size,
    totalStoryNodes: STORY.length,
    totalEndings: endingNodeIds.size,
    totalFlags: allFlags.size,
    totalChoices,
    diceCheckNodes,
    chapterCounts,
    endingTypes,
    majorRoutes: ['Iron Saints', 'Glass Court', 'Hollow Children', 'Red Choir', 'Last Archive', 'Solo/Wanderer', 'Companion (Mira)', 'Companion (Cain)'],
    imageKeys: [...usedImageKeys].sort(),
    artMetrics: {
      totalManifestScenes: checkedManifestEntries,
      missingManifestKeys: missingSceneKeys.size,
    },
  },
  errors: errors.map(e => ({ ...e })),
  warnings: warnings.map(w => ({ ...w })),
  infos: infos.map(i => ({ ...i })),
  timestamp: new Date().toISOString(),
}, null, 2), 'utf-8');
console.log('\n✅ Audit complete. Results written to audit-result.json');
