/**
 * Engine Test Suite — Scars of the Last Kingdom
 * Run with: npx tsx scripts/src/engine.test.ts
 */

import { createRequire } from 'node:module';
import { resolve } from 'node:path';

const require = createRequire(import.meta.url);

const {
  checkRequirements,
  applyEffects,
  runSurvivalTick,
  checkSurvivalEndings,
  getSurvivalWarnings,
} = require('../../artifacts/mobile/logic/gameEngine.ts');

const {
  getStatModifier,
  resolveDiceCheck,
} = require('../../artifacts/mobile/logic/diceEngine.ts');

const {
  parseAndValidateSave,
  SAVE_DEFAULTS,
} = require('../../artifacts/mobile/logic/saveValidation.ts');

const {
  extractDestinationNodeIds,
  extractDestinationImageKeys,
} = require('../../artifacts/mobile/logic/imagePreloader.ts');

const {
  listSaveSlots,
  saveGameToSlot,
  loadGameFromSlot,
  deleteSlot,
} = require('../../artifacts/mobile/logic/saveSystem.ts');

const {
  getUnlockedChapters,
  generateRouteRecap,
  getChapterInitialState,
  buildChapterJumpState,
} = require('../../artifacts/mobile/logic/chapterSelect.ts');

const {
  CONDITIONAL_ENDINGS,
  evaluateConditionalEnding,
} = require('../../artifacts/mobile/data/conditionalEndings.ts');

const {
  PROLOGUE_NODES,
} = require('../../artifacts/mobile/data/story/prologue.ts');

const {
  ENDINGS: STORY_ENDINGS,
  ENDING_CATEGORIES: STORY_ENDING_CATEGORIES,
} = require('../../artifacts/mobile/data/story/endings.ts');

const {
  getStartNodeId,
} = require('../../artifacts/mobile/data/story/index.ts');

let passedTests = 0;
let failedTests = 0;

function assert(condition: boolean, message: string) {
  if (!condition) {
    failedTests++;
    console.error(`  ❌ FAIL: ${message}`);
    throw new Error(`Assertion failed: ${message}`);
  } else {
    passedTests++;
    console.log(`  ✅ PASS: ${message}`);
  }
}

function createBaseState(): any {
  return {
    screen: 'game',
    character: {
      name: 'Alden',
      characterClass: 'relic_hunter',
      background: 'forgotten_scholar',
      startingCompanion: 'none',
      personalityTrait: 'pragmatic',
    },
    stats: {
      health: 80,
      maxHealth: 100,
      hunger: 70,
      thirst: 70,
      morale: 50,
      trust: 0,
      strength: 10,
      intelligence: 12,
      agility: 8,
      charisma: 7,
      luck: 6,
      corruption: 10,
    },
    inventory: {
      food: 2,
      water: 2,
      medicine: 1,
      scrap: 5,
      ammo: 3,
      relics: 1,
      reputation: 0,
    },
    currentNodeId: 'metro_station_hub',
    flags: {},
    companions: {
      mira: { present: false, trust: 2, alive: true },
      cain: { present: false, trust: 0, alive: true },
    },
    factionRep: {
      ironSaints: 0,
      glassCourt: 5,
      hollowChildren: 0,
      redChoir: -5,
      lastArchive: 15,
    },
    routeHistory: [],
    endingsDiscovered: [],
    settings: {
      textSpeed: 'normal',
      fontSize: 'normal',
      soundEnabled: false,
      autoSave: true,
      skipDiceAnimation: false,
    },
    activeEnding: null,
  };
}

// ─── 1. CHECK REQUIREMENTS TESTS ─────────────────────────────────────────────
console.log('\n--- 1. Testing checkRequirements ---');

{
  const state = createBaseState();

  // Test: No requirements
  const noReq = checkRequirements(state, undefined);
  assert(noReq.met === true && noReq.reasons.length === 0, 'No requirements always passes');

  // Test: Stat requirement met
  const statPass = checkRequirements(state, { intelligence: 10 });
  assert(statPass.met === true, 'Stat requirement passes when stat >= required');

  // Test: Stat requirement failed
  const statFail = checkRequirements(state, { strength: 15 });
  assert(statFail.met === false && statFail.reasons.length > 0, 'Stat requirement fails when stat < required');

  // Test: Max corruption limit (blocked when corruption too high)
  const corruptBlocked = checkRequirements(state, { maxCorruption: 5 });
  assert(corruptBlocked.met === false, 'Blocked when corruption >= maxCorruption threshold');
  const corruptAllowed = checkRequirements(state, { maxCorruption: 20 });
  assert(corruptAllowed.met === true, 'Passes when corruption < maxCorruption threshold');

  // Test: Max morale limit
  const moraleBlocked = checkRequirements(state, { maxMorale: 30 });
  assert(moraleBlocked.met === false, 'Blocked when morale >= maxMorale threshold');

  // Test: Inventory requirement
  const invPass = checkRequirements(state, { food: 2, scrap: 5 });
  assert(invPass.met === true, 'Passes when player has required inventory items');
  const invFail = checkRequirements(state, { food: 5 });
  assert(invFail.met === false, 'Fails when player lacks required inventory items');

  // Test: Required flags
  state.flags['has_lantern'] = true;
  const flagPass = checkRequirements(state, { flags: ['has_lantern'] });
  assert(flagPass.met === true, 'Passes when all required flags are set');
  const flagFail = checkRequirements(state, { flags: ['has_lantern', 'found_relic_key'] });
  assert(flagFail.met === false, 'Fails when a required flag is missing');

  // Test: Blocked flags
  const blockedPass = checkRequirements(state, { blockedFlags: ['door_sealed'] });
  assert(blockedPass.met === true, 'Passes when blocked flag is false');
  state.flags['door_sealed'] = true;
  const blockedFail = checkRequirements(state, { blockedFlags: ['door_sealed'] });
  assert(blockedFail.met === false, 'Fails when blocked flag is set');

  // Test: Companion presence and trust
  const companionFail = checkRequirements(state, { miraPresent: true });
  assert(companionFail.met === false, 'Fails when required companion is not present');
  state.companions.mira.present = true;
  const companionPass = checkRequirements(state, { miraPresent: true, miraTrust: 2 });
  assert(companionPass.met === true, 'Passes when companion is present with sufficient trust');
  const trustFail = checkRequirements(state, { miraTrust: 5 });
  assert(trustFail.met === false, 'Fails when companion trust is below threshold');
}

// ─── 2. APPLY EFFECTS TESTS ──────────────────────────────────────────────────
console.log('\n--- 2. Testing applyEffects ---');

{
  const state = createBaseState();

  // Test: Stat modifications and clamping
  const next1 = applyEffects(state, {
    health: -20,
    hunger: -30,
    thirst: 20,
    morale: -10,
    corruption: 5,
  });

  assert(next1.stats.health === 60, 'Health reduced by 20');
  assert(next1.stats.hunger === 40, 'Hunger reduced by 30');
  assert(next1.stats.thirst === 90, 'Thirst increased by 20');
  assert(next1.stats.morale === 40, 'Morale reduced by 10');
  assert(next1.stats.corruption === 15, 'Corruption increased by 5');

  // Test: Overheal clamped to maxHealth
  const overHeal = applyEffects(state, { health: 50 });
  assert(overHeal.stats.health === overHeal.stats.maxHealth, 'Health clamped to maxHealth');

  // Test: Inventory cannot drop below zero
  const invDrop = applyEffects(state, { food: -10, medicine: -5 });
  assert(invDrop.inventory.food === 0, 'Food floored at 0');
  assert(invDrop.inventory.medicine === 0, 'Medicine floored at 0');

  // Test: Flags set and removed
  state.flags['old_clue'] = true;
  const flagEffects = applyEffects(state, {
    setFlags: ['gate_unlocked', 'secret_found'],
    removeFlags: ['old_clue'],
  });
  assert(flagEffects.flags['gate_unlocked'] === true, 'setFlags adds new flag');
  assert(flagEffects.flags['secret_found'] === true, 'setFlags adds second flag');
  assert(flagEffects.flags['old_clue'] === undefined, 'removeFlags deletes specified flag');

  // Test: Faction rep clamped between -100 and 100
  const repMax = applyEffects(state, { lastArchive: 200, ironSaints: -200 });
  assert(repMax.factionRep.lastArchive === 100, 'Faction rep capped at 100');
  assert(repMax.factionRep.ironSaints === -100, 'Faction rep floored at -100');

  // Test: Companion trust clamped between 0 and 10
  const trustClamped = applyEffects(state, { miraTrust: 15, cainTrust: -5 });
  assert(trustClamped.companions.mira.trust === 10, 'Companion trust capped at 10');
  assert(trustClamped.companions.cain.trust === 0, 'Companion trust floored at 0');
}

// ─── 3. RUN SURVIVAL TICK & WARNINGS TESTS ───────────────────────────────────
console.log('\n--- 3. Testing runSurvivalTick and checkSurvivalEndings ---');

{
  const state = createBaseState();

  // Test: Safe state has no survival penalties
  const safeTick = runSurvivalTick(state);
  assert(safeTick.stats.health === state.stats.health, 'Safe hunger/thirst incurs 0 damage');

  // Test: Starvation penalty when hunger = 0
  const starvedState = {
    ...state,
    stats: { ...state.stats, hunger: 0 },
  };
  const starvedTick = runSurvivalTick(starvedState);
  assert(starvedTick.stats.health === starvedState.stats.health - 5, 'Hunger 0 inflicts -5 health penalty');
  assert(starvedTick.stats.morale === starvedState.stats.morale - 3, 'Hunger 0 inflicts -3 morale penalty');

  // Test: Dehydration penalty when thirst = 0
  const thirstyState = {
    ...state,
    stats: { ...state.stats, thirst: 0 },
  };
  const thirstyTick = runSurvivalTick(thirstyState);
  assert(thirstyTick.stats.health === thirstyState.stats.health - 7, 'Thirst 0 inflicts -7 health penalty');

  // Test: Combined hunger=0 and thirst=0 caps health loss at -10 per tick
  const dyingState = {
    ...state,
    stats: { ...state.stats, hunger: 0, thirst: 0 },
  };
  const dyingTick = runSurvivalTick(dyingState);
  assert(dyingTick.stats.health === dyingState.stats.health - 10, 'Health damage capped at -10 per tick');

  // Test: Survival endings priority
  const aliveCheck = checkSurvivalEndings(state);
  assert(aliveCheck === null, 'Healthy state triggers no ending');

  const moraleZero = { ...state, stats: { ...state.stats, morale: 0 } };
  assert(checkSurvivalEndings(moraleZero) === 'ending_morale_collapse', 'Morale 0 triggers ending_morale_collapse');

  const thirstZeroDead = { ...state, stats: { ...state.stats, health: 0, thirst: 0 } };
  assert(checkSurvivalEndings(thirstZeroDead) === 'ending_dehydration', 'Health 0 with thirst 0 triggers ending_dehydration');

  const hungerZeroDead = { ...state, stats: { ...state.stats, health: 0, thirst: 50, hunger: 0 } };
  assert(checkSurvivalEndings(hungerZeroDead) === 'ending_starvation', 'Health 0 with hunger 0 triggers ending_starvation');

  const combatDead = { ...state, stats: { ...state.stats, health: 0, thirst: 50, hunger: 50 } };
  assert(checkSurvivalEndings(combatDead) === 'ending_metro_death', 'Health 0 with supplies triggers ending_metro_death');

  // Test: Survival warnings
  const warnings = getSurvivalWarnings({
    ...state,
    stats: { ...state.stats, hunger: 0, thirst: 10, corruption: 85, health: 15 },
  });
  assert(warnings.length >= 3, 'Multiple critical survival warnings generated when stats are low');
  assert(warnings.some((w: any) => w.type === 'hunger' && w.severity === 'critical'), 'Critical hunger warning detected');
  assert(warnings.some((w: any) => w.type === 'corruption'), 'Corruption warning detected');
}

// ─── 4. DICE ENGINE TESTS ───────────────────────────────────────────────────
console.log('\n--- 4. Testing diceEngine ---');

{
  // Test: Stat modifiers
  assert(getStatModifier(2) === -3, 'Stat 2 gives -3 modifier');
  assert(getStatModifier(5) === -2, 'Stat 5 gives -2 modifier');
  assert(getStatModifier(7) === -1, 'Stat 7 gives -1 modifier');
  assert(getStatModifier(9) === 0, 'Stat 9 gives 0 modifier');
  assert(getStatModifier(11) === 1, 'Stat 11 gives +1 modifier');
  assert(getStatModifier(15) === 2, 'Stat 15 gives +2 modifier');
  assert(getStatModifier(20) === 3, 'Stat 20 gives +3 modifier');
  assert(getStatModifier(25) === 4, 'Stat 25 gives +4 modifier');

  const state = createBaseState(); // INT = 12 -> modifier +1
  const check = {
    stat: 'intelligence',
    diceType: 'd20',
    difficulty: 12,
    successNode: 'node_int_success',
    failureNode: 'node_int_fail',
    criticalSuccessNode: 'node_int_crit_success',
    criticalFailureNode: 'node_int_crit_fail',
  };

  // Natural 20
  const critSuccess = resolveDiceCheck(state, check, 20);
  assert(critSuccess.outcome === 'criticalSuccess', 'Roll of 20 yields criticalSuccess');
  assert(critSuccess.nextNodeId === 'node_int_crit_success', 'criticalSuccess routes to criticalSuccessNode');

  // Natural 1
  const critFail = resolveDiceCheck(state, check, 1);
  assert(critFail.outcome === 'criticalFailure', 'Roll of 1 yields criticalFailure');
  assert(critFail.nextNodeId === 'node_int_crit_fail', 'criticalFailure routes to criticalFailureNode');

  // Normal success: roll 11 + modifier 1 = 12 >= 12
  const successRoll = resolveDiceCheck(state, check, 11);
  assert(successRoll.outcome === 'success', 'Roll 11 + mod 1 = 12 meets DC 12');
  assert(successRoll.nextNodeId === 'node_int_success', 'success routes to successNode');

  // Normal failure: roll 10 + modifier 1 = 11 < 12
  const failRoll = resolveDiceCheck(state, check, 10);
  assert(failRoll.outcome === 'failure', 'Roll 10 + mod 1 = 11 fails DC 12');
  assert(failRoll.nextNodeId === 'node_int_fail', 'failure routes to failureNode');
}

// ─── 5. SAVE VALIDATION TESTS ───────────────────────────────────────────────
console.log('\n--- 5. Testing parseAndValidateSave ---');

{
  // Test: Empty strings
  assert(parseAndValidateSave('').valid === false, 'Empty string rejected');
  assert(parseAndValidateSave('   ').valid === false, 'Whitespace rejected');

  // Test: Corrupted JSON
  assert(parseAndValidateSave('{ bad json').valid === false, 'Malformed JSON rejected');
  assert(parseAndValidateSave('12345').valid === false, 'Non-object JSON rejected');

  // Test: Missing currentNodeId
  const missingNode = JSON.stringify({ stats: { health: 100, maxHealth: 100 }, inventory: {}, flags: {} });
  assert(parseAndValidateSave(missingNode).valid === false, 'Missing currentNodeId rejected');

  // Test: Non-numeric health
  const badHealth = JSON.stringify({ currentNodeId: 'node_1', stats: { health: 'full', maxHealth: 100 }, inventory: {}, flags: {} });
  assert(parseAndValidateSave(badHealth).valid === false, 'Non-numeric health rejected');

  // Test: Valid direct GameState
  const baseState = createBaseState();
  const directValid = parseAndValidateSave(JSON.stringify(baseState));
  assert(directValid.valid === true, 'Valid direct GameState accepted');
  assert(directValid.gameState?.currentNodeId === 'metro_station_hub', 'Preserves currentNodeId');

  // Test: Valid export payload with wrapping
  const exportPayload = {
    version: '1.0.0',
    exportedAt: new Date().toISOString(),
    gameState: baseState,
    endingsDiscovered: ['ending_metro_death', 'ending_throne_ascension'],
  };
  const exportValid = parseAndValidateSave(JSON.stringify(exportPayload));
  assert(exportValid.valid === true, 'Valid wrapped export payload accepted');
  assert(exportValid.endingsDiscovered?.includes('ending_metro_death') === true, 'Preserves endingsDiscovered');

  // Test: Schema migration fills missing keys from SAVE_DEFAULTS
  const legacySave = JSON.stringify({
    currentNodeId: 'chapter2_gate',
    stats: { health: 75, maxHealth: 100 },
    inventory: { food: 1 },
    flags: { met_cain: true },
  });
  const migrated = parseAndValidateSave(legacySave);
  assert(migrated.valid === true, 'Legacy sparse save passes validation and migrates');
  assert(migrated.gameState?.stats.hunger === SAVE_DEFAULTS.stats.hunger, 'Fills missing hunger default');
  assert(migrated.gameState?.companions.mira.alive === true, 'Fills missing companion defaults');
}

console.log('\n--- 6. Testing imagePreloader (F-PERF-02) ---');

// Test 6.1: Direct nextNode extraction
{
  const testChoices = [
    { id: 'c1', text: 'Go 1', nextNode: 'node_alpha' },
    { id: 'c2', text: 'Go 2', nextNode: 'node_beta' },
  ];
  const nodeIds = extractDestinationNodeIds(testChoices);
  assert(
    nodeIds.includes('node_alpha') && nodeIds.includes('node_beta') && nodeIds.length === 2,
    'Extracts direct nextNode from choices'
  );
}

// Test 6.2: nextNodeId fallback
{
  const testChoices = [
    { id: 'c1', text: 'Go 1', nextNodeId: 'node_gamma' } as any,
  ];
  const nodeIds = extractDestinationNodeIds(testChoices);
  assert(nodeIds.includes('node_gamma'), 'Extracts nextNodeId defensively');
}

// Test 6.3: Dice check outcome branch extraction
{
  const testChoices = [
    {
      id: 'c_dice',
      text: 'Roll',
      nextNode: 'fallback_node',
      diceCheck: {
        stat: 'strength',
        difficulty: 10,
        diceType: 'd20',
        successNode: 'node_success',
        failureNode: 'node_failure',
        criticalSuccessNode: 'node_crit_success',
        criticalFailureNode: 'node_crit_fail',
      },
    },
  ];
  const nodeIds = extractDestinationNodeIds(testChoices);
  assert(
    nodeIds.includes('node_success') &&
    nodeIds.includes('node_failure') &&
    nodeIds.includes('node_crit_success') &&
    nodeIds.includes('node_crit_fail') &&
    nodeIds.includes('fallback_node'),
    'Extracts all 4 diceCheck outcome nodes and base nextNode'
  );
}

// Test 6.4: Ending trigger extraction
{
  const testChoices = [
    { id: 'c_end', text: 'End', nextNode: 'node_x', endingTrigger: 'ending_death_trap' },
  ];
  const nodeIds = extractDestinationNodeIds(testChoices);
  assert(nodeIds.includes('ending_death_trap'), 'Extracts endingTrigger destination');
}

// Test 6.5: Hallucination __return__ sentinel
{
  const testChoices = [
    { id: 'c_ret', text: 'Return', nextNode: '__return__' },
  ];
  const fakeState: any = { pendingReturnNodeId: 'safe_haven_hub', currentNodeId: 'halluc_node' };
  const nodeIds = extractDestinationNodeIds(testChoices, fakeState);
  assert(nodeIds.includes('safe_haven_hub'), 'Resolves __return__ to pendingReturnNodeId');
}

// Test 6.6: Image key extraction, deduplication, and current key exclusion
{
  const testChoices = [
    { id: 'c1', text: 'Go A', nextNode: 'dest_a' },
    { id: 'c2', text: 'Go B', nextNode: 'dest_b' },
    { id: 'c3', text: 'Go C', nextNode: 'dest_c' },
  ];
  const mockNodeMap: Record<string, any> = {
    dest_a: { id: 'dest_a', imageKey: 'ruined_metro_station' },
    dest_b: { id: 'dest_b', imageKey: 'broken_vending_area' },
    dest_c: { id: 'dest_c', imageKey: 'ruined_metro_station' }, // duplicate imageKey
  };
  const keys = extractDestinationImageKeys(
    testChoices,
    (id: string) => mockNodeMap[id],
    'ruined_metro_station' // currentImageKey to exclude
  );
  assert(keys.length === 1 && keys[0] === 'broken_vending_area', 'Deduplicates keys and excludes current scene imageKey');
}

// Test 6.7: Malformed and missing input handling
{
  assert(extractDestinationNodeIds(null).length === 0, 'Handles null choices gracefully');
  assert(extractDestinationNodeIds([]).length === 0, 'Handles empty choices gracefully');
  assert(extractDestinationImageKeys(null).length === 0, 'Handles null choices in image keys gracefully');
}

// ─── 7. Testing multiSlotSaveSystem (F-UX-01) ─────────────────────────────
console.log('\n--- 7. Testing multiSlotSaveSystem (F-UX-01) ---');

function createTestStorage() {
  const store = new Map<string, string>();
  return {
    getItem: async (key: string) => store.get(key) ?? null,
    setItem: async (key: string, value: string) => { store.set(key, value); },
    removeItem: async (key: string) => { store.delete(key); },
    multiRemove: async (keys: string[]) => { keys.forEach((k) => store.delete(k)); },
  };
}

// Test 7.1: Empty storage returns exactly 4 empty slots
{
  const storage = createTestStorage();
  const slots = await listSaveSlots(storage);
  assert(slots.length === 4, 'listSaveSlots returns exactly 4 slots');
  assert(slots[0].slotId === 'auto' && slots[0].isEmpty === true, 'Auto slot starts empty');
  assert(slots[1].slotId === 'slot1' && slots[1].isEmpty === true, 'Slot 1 starts empty');
  assert(slots[2].slotId === 'slot2' && slots[2].isEmpty === true, 'Slot 2 starts empty');
  assert(slots[3].slotId === 'slot3' && slots[3].isEmpty === true, 'Slot 3 starts empty');
}

// Test 7.2: saveGameToSlot persists state and updates metadata
{
  const storage = createTestStorage();
  const state = {
    ...SAVE_DEFAULTS,
    character: { name: 'Kaelen', characterClass: 'blade_survivor' },
    currentNodeId: 'chapter1_start',
  };
  const ok = await saveGameToSlot(state, 'slot1', storage);
  assert(ok === true, 'saveGameToSlot returns true on success');
  const slots = await listSaveSlots(storage);
  const s1 = slots.find((s: any) => s.slotId === 'slot1');
  assert(s1?.isEmpty === false, 'Slot 1 marked non-empty after save');
  assert(s1?.characterName === 'Kaelen', 'Slot 1 metadata preserves character name');
}

// Test 7.3: loadGameFromSlot restores state accurately
{
  const storage = createTestStorage();
  const state = {
    ...SAVE_DEFAULTS,
    character: { name: 'Alden', characterClass: 'relic_hunter' },
    stats: { ...SAVE_DEFAULTS.stats, health: 77 },
    currentNodeId: 'chapter2_relic_vault',
  };
  await saveGameToSlot(state, 'slot2', storage);
  const loaded = await loadGameFromSlot('slot2', storage);
  assert(loaded !== null, 'loadGameFromSlot returns non-null state');
  assert(loaded?.stats?.health === 77, 'loadGameFromSlot restores saved health stat');
  assert(loaded?.currentNodeId === 'chapter2_relic_vault', 'loadGameFromSlot restores currentNodeId');
}

// Test 7.4: deleteSlot removes save data and marks slot empty
{
  const storage = createTestStorage();
  const state = {
    ...SAVE_DEFAULTS,
    character: { name: 'Mira', characterClass: 'shadow_broker' },
  };
  await saveGameToSlot(state, 'slot3', storage);
  const delOk = await deleteSlot('slot3', storage);
  assert(delOk === true, 'deleteSlot returns true');
  const loadedAfterDelete = await loadGameFromSlot('slot3', storage);
  assert(loadedAfterDelete === null, 'loadGameFromSlot returns null for deleted slot');
  const slots = await listSaveSlots(storage);
  const s3 = slots.find((s: any) => s.slotId === 'slot3');
  assert(s3?.isEmpty === true, 'Slot 3 metadata reset to empty after delete');
}

// Test 7.5: Legacy migration migrates @scars_save_v1 into auto slot
{
  const storage = createTestStorage();
  const legacyState = {
    ...SAVE_DEFAULTS,
    character: { name: 'Wanderer', characterClass: 'gun_scavenger' },
    currentNodeId: 'legacy_metro_exit',
  };
  await storage.setItem('@scars_save_v1', JSON.stringify(legacyState));
  const slots = await listSaveSlots(storage);
  assert(slots[0].slotId === 'auto' && slots[0].isEmpty === false, 'Legacy save migrates into auto slot');
  assert(slots[0].characterName === 'Wanderer', 'Migrated auto slot metadata has correct character');
  const loadedAuto = await loadGameFromSlot('auto', storage);
  assert(loadedAuto !== null && loadedAuto.currentNodeId === 'legacy_metro_exit', 'Loaded migrated auto save node');
}

// ─── 8. Testing prologue and survival isolation (F-CONT-01) ─────────────────
console.log('\n--- 8. Testing prologue and survival isolation (F-CONT-01) ---');
{
  assert(getStartNodeId() === 'prologue_start', 'getStartNodeId returns prologue_start');
  assert(Array.isArray(PROLOGUE_NODES) && PROLOGUE_NODES.length >= 11, 'PROLOGUE_NODES contains full 11+ node story graph');
  const startNode = PROLOGUE_NODES.find((n: any) => n.id === 'prologue_start');
  assert(startNode !== undefined && startNode.choices.length >= 3, 'prologue_start exists with at least 3 vignette choices');

  // Survival tick isolation
  const baseState = createBaseState();
  const prologueState = {
    ...baseState,
    currentNodeId: 'prologue_start',
    stats: { ...baseState.stats, hunger: 0, thirst: 0, health: 100 },
  };
  const ticked = runSurvivalTick(prologueState);
  assert(ticked.stats.health === 100, 'Prologue node incurs 0 survival tick damage');
  const endingInPrologue = checkSurvivalEndings({ ...prologueState, stats: { ...prologueState.stats, health: 0 } });
  assert(endingInPrologue === null, 'Prologue node suppresses survival death endings');
}

// ─── 9. Testing chapterSelect and route recap (F-CONT-02) ───────────────────
console.log('\n--- 9. Testing chapterSelect and route recap (F-CONT-02) ---');
{
  const freshUnlocked = getUnlockedChapters();
  assert(freshUnlocked.includes('Prologue') && freshUnlocked.includes('Chapter 1'), 'Fresh game unlocks Prologue and Chapter 1');
  const ch1Unlocked = getUnlockedChapters([], [], { chapter1_complete: true });
  assert(ch1Unlocked.includes('Chapter 2'), 'Completing Chapter 1 unlocks Chapter 2');

  const emptyRecap = generateRouteRecap([]);
  assert(emptyRecap.includes('mark glowing on your skin'), 'Empty history generates canonical prologue recap');

  const sampleHistory = [
    { choiceText: 'Helped the trapped child' },
    { choiceText: 'Helped the trapped child' }, // duplicate
    { choiceText: 'Entered the ruined depot' },
  ];
  const recap = generateRouteRecap(sampleHistory);
  assert(recap.includes('• Helped the trapped child') && recap.includes('• Entered the ruined depot'), 'Recap formats unique choices with bullets');

  const jumpState = getChapterInitialState('Chapter 2');
  assert(jumpState.currentNodeId === 'chapter2_start', 'Chapter 2 jump state starts at chapter2_start');
  assert(jumpState.stats.health >= 80 && jumpState.inventory.food >= 2, 'Chapter 2 jump state grants survivable baseline supplies');

  let threwInvalid = false;
  try {
    getChapterInitialState('Chapter 99');
  } catch (err: any) {
    threwInvalid = err.message.includes('Invalid chapter');
  }
  assert(threwInvalid, 'Invalid chapter throws descriptive error');
}

// ─── 10. Testing declarative conditional endings (F-CONT-04 & F-CONT-03) ───
console.log('\n--- 10. Testing declarative conditional endings (F-CONT-04 & F-CONT-03) ---');
{
  assert(Array.isArray(CONDITIONAL_ENDINGS) && CONDITIONAL_ENDINGS.length > 0, 'CONDITIONAL_ENDINGS table is exported as non-empty array');
  const priorities = CONDITIONAL_ENDINGS.map((e: any) => e.priority);
  let sorted = true;
  for (let i = 0; i < priorities.length - 1; i++) {
    if (priorities[i] < priorities[i + 1]) sorted = false;
  }
  assert(sorted, 'CONDITIONAL_ENDINGS priorities are sorted descending');

  // Relic awakening trigger evaluation
  const baseState = createBaseState();
  const highCorruptionState = { ...baseState, stats: { ...baseState.stats, corruption: 9 } };
  const relicChoice = { endingTrigger: 'ending_relic_awakening' };
  const relicEnding = evaluateConditionalEnding(highCorruptionState, relicChoice);
  assert(relicEnding === 'ending_relic_awakening', 'evaluateConditionalEnding triggers ending_relic_awakening on high corruption');

  const esperState = { ...baseState, character: { characterClass: 'esper' }, stats: { ...baseState.stats, corruption: 2 } };
  const esperEnding = evaluateConditionalEnding(esperState, relicChoice);
  assert(esperEnding === 'ending_relic_awakening', 'evaluateConditionalEnding bypasses corruption threshold for Esper class');

  const normalChoice = { id: 'c_normal', text: 'Walk ahead' };
  const noEnding = evaluateConditionalEnding(highCorruptionState, normalChoice);
  assert(noEnding === null, 'Non-ending choice returns null');
}

// ─── 11. Testing story endings and canonical categories (F-CONT-05) ─────────
console.log('\n--- 11. Testing story endings and canonical categories (F-CONT-05) ---');
{
  assert(Array.isArray(STORY_ENDINGS) && STORY_ENDINGS.length === 228, 'STORY_ENDINGS length is exactly 228');
  assert(Array.isArray(STORY_ENDING_CATEGORIES) && STORY_ENDING_CATEGORIES.length === 8, 'STORY_ENDING_CATEGORIES array has 8 canonical categories');
  assert(STORY_ENDING_CATEGORIES['death'] !== undefined && STORY_ENDING_CATEGORIES['secret'] !== undefined, 'STORY_ENDING_CATEGORIES supports dictionary lookup');

  for (const ending of STORY_ENDINGS) {
    assert(ending.category !== undefined, `Ending ${ending.id} has category defined`);
    assert(ending.imageKey !== undefined, `Ending ${ending.id} has imageKey defined`);
  }

  const orphanIds = [
    'ending_corruption_death',
    'ending_iron_tyrant',
    'ending_wanderer',
    'ending_together',
    'ending_last_archive',
    'ending_thirteenth_signal',
    'ending_ch3_trust_complete',
    'ending_ch4_saints_survived',
    'ending_ch4_veyra_pact',
    'ending_ch4_mira_route',
    'ending_ch5_survived',
    'ending_ch6_survived',
    'ending_ch7_survived',
    'ending_ch8_survived',
    'ending_ch9_savior_path',
    'ending_ch9_tyrant_path',
    'ending_ch9_survived',
    'ending_ch9_true_ending_req',
    'ending_fc1_gate_sealed_savior',
    'ending_fc1_faction_gate',
    'ending_fc1_unity_gate',
    'ending_fc1_true_ending_path',
  ];
  const registeredSet = new Set(STORY_ENDINGS.map((e: any) => e.id));
  for (const id of orphanIds) {
    assert(registeredSet.has(id), `Orphan ending ${id} is present in STORY_ENDINGS`);
  }
}

console.log(`\n========================================`);
console.log(`TOTAL TESTS: ${passedTests + failedTests}`);
console.log(`PASSED:      ${passedTests}`);
console.log(`FAILED:      ${failedTests}`);
console.log(`========================================\n`);

if (failedTests > 0) {
  process.exit(1);
} else {
  console.log('🎉 All engine unit tests passed successfully!\n');
  process.exit(0);
}
