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
