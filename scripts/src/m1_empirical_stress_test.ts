/**
 * Milestone 1 Empirical Stress Test & Challenger Verification Suite
 *
 * Verifies all 6 defect resolution areas:
 * 1. Effective stat calculation (Tactician base 3 + Exiled Soldier +2 = 5, all 49 class/background combos, traits)
 * 2. Companion event corruption threshold (mira_corruption_c3 allowed at 35, blocked at 34)
 * 3. Relay door loop guard (relic_machine_room & archive_door visited flag and loop prevention)
 * 4. Relic Engine Room branching (Option 2 -> c3_sever_connection_node, clean severance narrative)
 * 5. Route Codex FACTION tab (41 faction endings mapped and filterable)
 * 6. Story graph integrity and additional R1/R2 fixes
 */

import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);

const { CLASSES, BACKGROUNDS, PERSONALITY_TRAITS, buildStartingStats } = require('../../artifacts/mobile/data/characterOptions.ts');
const { getEffectiveStat, resolveDiceCheck } = require('../../artifacts/mobile/logic/diceEngine.ts');
const { COMPANION_EVENT_NODES } = require('../../artifacts/mobile/data/story/companionEvents.ts');
const { CHAPTER_1_NODES } = require('../../artifacts/mobile/data/story/chapter1.ts');
const { CHAPTER_2_NODES } = require('../../artifacts/mobile/data/story/chapter2.ts');
const { CHAPTER_3_NODES } = require('../../artifacts/mobile/data/story/chapter3.ts');
const { ENDINGS, CANONICAL_CATEGORIES } = require('../../artifacts/mobile/data/story/endings.ts');
const { checkRequirements, applyEffects } = require('../../artifacts/mobile/logic/gameEngine.ts');
const { getUnlockedChapters } = require('../../artifacts/mobile/logic/chapterSelect.ts');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function assert(condition: boolean, message: string) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  ✅ PASS: ${message}`);
  } else {
    failedTests++;
    console.error(`  ❌ FAIL: ${message}`);
  }
}

console.log('======================================================================');
console.log('       MILESTONE 1 EMPIRICAL STRESS TEST SUITE                        ');
console.log('======================================================================\n');

// ─── SUITE 1: EFFECTIVE STAT CALCULATION ─────────────────────────────────────
console.log('--- SUITE 1: Effective Stat Calculation & Double-Count Prevention ---');

// 1.1 Tactician base STR 3 + Exiled Soldier +2 STR evaluates to 5 in getEffectiveStat, NOT 7
{
  const mockState = {
    character: {
      characterClass: 'tactician',
      background: 'exiled_soldier',
      personalityTrait: 'pragmatic', // neutral trait
    },
    stats: {
      strength: 5, // Base 3 + Background 2 already baked into state.stats
      intelligence: 7,
      agility: 5,
      charisma: 8,
      luck: 4,
      corruption: 0,
    },
  };

  const effectiveStr = getEffectiveStat(mockState as any, 'strength');
  assert(effectiveStr === 5, `Tactician STR 5 with Exiled Soldier evaluates to 5 in getEffectiveStat (got ${effectiveStr}, expected 5, NOT 7)`);

  // Verify buildStartingStats('tactician', 'exiled_soldier') produces strength: 5 (base 3 + 2)
  const { stats: builtTacticianExiled } = buildStartingStats('tactician', 'exiled_soldier', 'none');
  assert(builtTacticianExiled.strength === 5, `buildStartingStats('tactician', 'exiled_soldier') produces strength === 5 (got ${builtTacticianExiled.strength})`);

  // Verify D20 roll modifier for Tactician + Exiled Soldier (Strength 5) is +0
  const rollRes = resolveDiceCheck(
    { ...mockState, stats: builtTacticianExiled } as any,
    { diceType: 'd20', stat: 'strength', difficulty: 13, successNode: 'ok', failureNode: 'fail' },
    13
  );
  assert(rollRes.modifier === 0, `Tactician + Exiled Soldier (Strength 5) D20 roll modifier is +0 (got ${rollRes.modifier})`);
}

// 1.2 Exhaustive test of all 7 Classes x 7 Backgrounds = 49 Combinations
{
  let all49Pass = true;
  let doubleCountDetected = false;

  for (const cls of CLASSES) {
    for (const bg of BACKGROUNDS) {
      const { stats: startingStats } = buildStartingStats(cls.id, bg.id, 'mira');
      const testState = {
        character: {
          characterClass: cls.id,
          background: bg.id,
          personalityTrait: 'pragmatic',
        },
        stats: startingStats,
      };

      for (const statKey of ['strength', 'intelligence', 'agility', 'charisma', 'luck', 'corruption'] as const) {
        const eff = getEffectiveStat(testState as any, statKey);
        const expected = startingStats[statKey];
        if (eff !== expected) {
          all49Pass = false;
          console.error(`Mismatch for Class=${cls.id}, Bg=${bg.id}, Stat=${statKey}: got ${eff}, expected ${expected}`);
        }

        // Specifically check if bg modifier was added twice
        const bgMod = (bg.statModifiers as any)?.[statKey] ?? 0;
        if (bgMod > 0 && eff === expected + bgMod) {
          doubleCountDetected = true;
          console.error(`Double count detected for Class=${cls.id}, Bg=${bg.id}, Stat=${statKey}: eff=${eff}`);
        }
      }
    }
  }

  assert(all49Pass, 'All 49 Class x Background combinations evaluate stats matching state.stats exactly');
  assert(!doubleCountDetected, 'Zero double-counting of background modifiers across all 49 combinations');
}

// 1.3 Personality Trait Modifiers
{
  const baseState = {
    character: { characterClass: 'tactician', background: 'wasteland_orphan', personalityTrait: 'calculating' },
    stats: { strength: 5, intelligence: 5, agility: 5, charisma: 5, luck: 5 },
  };

  // 'calculating' adds +1 to all stats
  assert(getEffectiveStat(baseState as any, 'strength') === 6, 'Calculating trait adds +1 to strength (5 -> 6)');
  assert(getEffectiveStat(baseState as any, 'intelligence') === 6, 'Calculating trait adds +1 to intelligence (5 -> 6)');
  assert(getEffectiveStat(baseState as any, 'agility') === 6, 'Calculating trait adds +1 to agility (5 -> 6)');
  assert(getEffectiveStat(baseState as any, 'charisma') === 6, 'Calculating trait adds +1 to charisma (5 -> 6)');
  assert(getEffectiveStat(baseState as any, 'luck') === 6, 'Calculating trait adds +1 to luck (5 -> 6)');

  // 'reckless' adds +1 to agility ONLY
  const recklessState = { ...baseState, character: { ...baseState.character, personalityTrait: 'reckless' } };
  assert(getEffectiveStat(recklessState as any, 'agility') === 6, 'Reckless trait adds +1 to agility (5 -> 6)');
  assert(getEffectiveStat(recklessState as any, 'strength') === 5, 'Reckless trait leaves strength unchanged at 5');
  assert(getEffectiveStat(recklessState as any, 'intelligence') === 5, 'Reckless trait leaves intelligence unchanged at 5');

  // 'cynical' adds +1 to luck ONLY
  const cynicalState = { ...baseState, character: { ...baseState.character, personalityTrait: 'cynical' } };
  assert(getEffectiveStat(cynicalState as any, 'luck') === 6, 'Cynical trait adds +1 to luck (5 -> 6)');
  assert(getEffectiveStat(cynicalState as any, 'agility') === 5, 'Cynical trait leaves agility unchanged at 5');
}

// 1.4 Graceful Fallback on Missing Stats
{
  const emptyState = { character: {}, stats: {} };
  assert(getEffectiveStat(emptyState as any, 'strength') === 5, 'Empty state defaults strength to 5');
  assert(getEffectiveStat({} as any, 'agility') === 5, 'Undefined state defaults agility to 5');
}

// ─── SUITE 2: COMPANION EVENT CORRUPTION THRESHOLD ────────────────────────────
console.log('\n--- SUITE 2: Companion Event Corruption Threshold (mira_corruption_c3) ---');
{
  const warningNode = COMPANION_EVENT_NODES.find((n: any) => n.id === 'mira_event_corruption_warning');
  assert(!!warningNode, 'mira_event_corruption_warning node exists');

  const c3Choice = warningNode?.choices?.find((c: any) => c.id === 'mira_corruption_c3');
  assert(!!c3Choice, 'Choice mira_corruption_c3 exists on mira_event_corruption_warning');
  assert(c3Choice?.requirements?.corruption === 35, `mira_corruption_c3 requires corruption: 35 (got ${c3Choice?.requirements?.corruption})`);

  // Test requirement evaluation across boundaries
  const testReqAt = (corr: number) => {
    const s = {
      stats: { corruption: corr, health: 100, hunger: 100, thirst: 100, morale: 70, trust: 50 },
      flags: {},
      inventory: {},
      companions: { mira: { present: true, alive: true, trust: 5 } },
    };
    return checkRequirements(s as any, c3Choice?.requirements);
  };

  assert(testReqAt(0).met === false, 'Corruption 0 fails requirement');
  assert(testReqAt(34).met === false, 'Corruption 34 fails requirement (below threshold)');
  assert(testReqAt(35).met === true, 'Corruption 35 passes requirement (exact threshold met)');
  assert(testReqAt(36).met === true, 'Corruption 36 passes requirement (above threshold)');
  assert(testReqAt(50).met === true, 'Corruption 50 passes requirement');

  // Test choice effects application
  const stateBeforeChoice = {
    stats: { corruption: 35, health: 80, maxHealth: 100, morale: 70 },
    flags: { companion_event_active: true },
    inventory: {},
    companions: { mira: { present: true, alive: true, trust: 5 }, cain: { present: false, alive: true, trust: 0 } },
    factionRep: {},
  };
  const stateAfterChoice = applyEffects(stateBeforeChoice as any, c3Choice?.effects);
  assert(stateAfterChoice.stats.corruption === 37, `Choice adds +2 corruption (35 -> 37, got ${stateAfterChoice.stats.corruption})`);
  assert(stateAfterChoice.companions.mira.trust === 4, `Choice reduces Mira trust by 1 (5 -> 4, got ${stateAfterChoice.companions.mira.trust})`);
  assert(stateAfterChoice.flags.mira_event_corruption_warning_seen === true, 'Sets mira_event_corruption_warning_seen flag');
  assert(stateAfterChoice.flags.mira_worried_about_player === true, 'Sets mira_worried_about_player flag');
  assert(stateAfterChoice.flags.companion_event_active === undefined, 'Removes companion_event_active flag');
}

// ─── SUITE 3: RELAY DOOR LOOP GUARD ──────────────────────────────────────────
console.log('\n--- SUITE 3: Chapter 1 Relay Door Loop Guard & Walk-Away Prevention ---');
{
  const forkNode = CHAPTER_1_NODES.find((n: any) => n.id === 'tunnel_junction_inner');
  const relicRoom = CHAPTER_1_NODES.find((n: any) => n.id === 'relic_machine_room');
  const archiveDoor = CHAPTER_1_NODES.find((n: any) => n.id === 'archive_door');

  assert(!!forkNode, 'tunnel_junction_inner exists');
  assert(!!relicRoom, 'relic_machine_room exists');
  assert(!!archiveDoor, 'archive_door exists');

  // Verify effectsOnEnter sets visited_sealed_relay_door
  assert(relicRoom?.effectsOnEnter?.setFlags?.includes('visited_sealed_relay_door'), 'relic_machine_room effectsOnEnter sets visited_sealed_relay_door');
  assert(archiveDoor?.effectsOnEnter?.setFlags?.includes('visited_sealed_relay_door'), 'archive_door effectsOnEnter sets visited_sealed_relay_door');
  assert(!archiveDoor?.effectsOnEnter?.corruption, 'archive_door effectsOnEnter grants 0 corruption (no free corruption on entry)');

  // Verify choices at the fork
  const followHum = forkNode?.choices?.find((c: any) => c.id === 'follow_hum');
  const followArchiveSense = forkNode?.choices?.find((c: any) => c.id === 'follow_archive_sense');
  const returnArchiveDoor = forkNode?.choices?.find((c: any) => c.id === 'return_archive_door');

  assert(followHum?.requirements?.blockedFlags?.includes('visited_sealed_relay_door'), 'follow_hum is blocked by visited_sealed_relay_door');
  assert(followArchiveSense?.requirements?.blockedFlags?.includes('visited_sealed_relay_door'), 'follow_archive_sense is blocked by visited_sealed_relay_door');
  assert(returnArchiveDoor?.requirements?.flags?.includes('visited_sealed_relay_door'), 'return_archive_door requires visited_sealed_relay_door');
  assert(!returnArchiveDoor?.effects?.corruption, 'return_archive_door has 0 corruption effect');

  // Simulate walkthrough and stress-test infinite farming loop prevention
  let playerState: any = {
    stats: { corruption: 0, health: 100, maxHealth: 100, hunger: 100, thirst: 100, morale: 70 },
    flags: { knows_archive_exists: true },
    inventory: {},
    companions: { mira: { present: false, alive: true, trust: 0 }, cain: { present: false, alive: true, trust: 0 } },
    factionRep: {},
  };

  // Step 1: At fork, follow_hum is available
  assert(checkRequirements(playerState, followHum.requirements).met === true, 'Initial visit: follow_hum is available');

  // Step 2: Player visits relic_machine_room
  playerState = applyEffects(playerState, relicRoom.effectsOnEnter);
  assert(playerState.stats.corruption === 1, 'Entering relic_machine_room awards 1 corruption');
  assert(playerState.flags.visited_sealed_relay_door === true, 'visited_sealed_relay_door flag is set');

  // Step 3: Player chooses back_from_relic to return to tunnel_junction_inner
  const backChoice = relicRoom.choices.find((c: any) => c.id === 'back_from_relic');
  playerState = applyEffects(playerState, backChoice.effects);

  // Step 4: Now at fork, follow_hum and follow_archive_sense MUST be blocked
  assert(checkRequirements(playerState, followHum.requirements).met === false, 'Subsequent visit: follow_hum is BLOCKED by visited flag');
  assert(checkRequirements(playerState, followArchiveSense.requirements).met === false, 'Subsequent visit: follow_archive_sense is BLOCKED by visited flag');
  assert(checkRequirements(playerState, returnArchiveDoor.requirements).met === true, 'Subsequent visit: safe return_archive_door is available');

  // Step 5: Player visits archive_door via return_archive_door
  const corrBefore = playerState.stats.corruption;
  playerState = applyEffects(playerState, returnArchiveDoor.effects);
  playerState = applyEffects(playerState, archiveDoor.effectsOnEnter);
  assert(playerState.stats.corruption === corrBefore, `Entering archive_door via return does NOT increment corruption (remains ${playerState.stats.corruption})`);

  // Step 6: Player walks away from archive_door (leave_archive) back to fork
  const leaveArchive = archiveDoor.choices.find((c: any) => c.id === 'leave_archive');
  playerState = applyEffects(playerState, leaveArchive.effects);

  // Step 7: Stress test: Try to cycle 50 times between fork and archive_door
  const initialCorr = playerState.stats.corruption;
  for (let cycle = 0; cycle < 50; cycle++) {
    // Cannot take follow_hum
    if (checkRequirements(playerState, followHum.requirements).met) {
      playerState = applyEffects(playerState, relicRoom.effectsOnEnter);
    }
    // Take return_archive_door
    if (checkRequirements(playerState, returnArchiveDoor.requirements).met) {
      playerState = applyEffects(playerState, returnArchiveDoor.effects);
      playerState = applyEffects(playerState, archiveDoor.effectsOnEnter);
      playerState = applyEffects(playerState, leaveArchive.effects);
    }
  }

  assert(playerState.stats.corruption === initialCorr, `After 50 loop cycles, corruption is completely unchanged (${playerState.stats.corruption} == ${initialCorr}). Loop farming is 100% prevented!`);
}

// ─── SUITE 4: RELIC ENGINE ROOM NODE BRANCHING ───────────────────────────────
console.log('\n--- SUITE 4: Chapter 3 Relic Engine Room Node Branching ---');
{
  const pulseChoiceNode = CHAPTER_3_NODES.find((n: any) => n.id === 'c3_relic_pulse_choice');
  assert(!!pulseChoiceNode, 'c3_relic_pulse_choice exists');

  const opt1 = pulseChoiceNode?.choices?.find((c: any) => c.id === 'c3_embrace_signal');
  const opt2 = pulseChoiceNode?.choices?.find((c: any) => c.id === 'c3_resist_signal');
  const opt3 = pulseChoiceNode?.choices?.find((c: any) => c.id === 'c3_controlled_bridge');

  assert(opt1?.nextNode === 'c3_end_corruption_engine', 'Option 1 (Embrace signal) routes to c3_end_corruption_engine');
  assert(opt2?.nextNode === 'c3_sever_connection_node', 'Option 2 (Resist signal / Close connection) routes to c3_sever_connection_node');
  assert(opt3?.nextNode === 'c3_resist_signal_node', 'Option 3 (Partial bridge) routes to c3_resist_signal_node');

  // Verify dedicated c3_sever_connection_node content
  const severNode = CHAPTER_3_NODES.find((n: any) => n.id === 'c3_sever_connection_node');
  assert(!!severNode, 'c3_sever_connection_node exists in Chapter 3');

  const severText = severNode?.text ?? '';
  assert(severText.includes('severed'), 'c3_sever_connection_node narrates that link is violently severed');
  assert(severText.includes('You took nothing from it — no coordinates'), 'c3_sever_connection_node explicitly confirms taking no coordinates');
  assert(severText.includes('whatever coordinates the engine offered stay buried in the dark'), 'c3_sever_connection_node confirms coordinates stay buried');

  // Negative checks: must NOT claim partial bridge or coordinates were received
  assert(!severText.includes('What passed through in the partial bridge is useful'), 'c3_sever_connection_node DOES NOT mention partial bridge being useful');
  assert(!severText.includes('The engine is pointing you toward the Door Without a Handle. You were going there anyway. Now you know why.'), 'c3_sever_connection_node DOES NOT claim engine pointed to door');

  // Verify choice exits from severNode exist in Chapter 3
  const validNextNodes = new Set(CHAPTER_3_NODES.map((n: any) => n.id));
  for (const choice of severNode?.choices ?? []) {
    assert(validNextNodes.has(choice.nextNode), `Choice ${choice.id} target ${choice.nextNode} exists in Chapter 3`);
  }

  // Verify c3_resist_signal_node still contains coordinates narrative for Option 3
  const partialBridgeNode = CHAPTER_3_NODES.find((n: any) => n.id === 'c3_resist_signal_node');
  assert(partialBridgeNode?.text?.includes('coordinates, encoded in a format'), 'c3_resist_signal_node retains coordinate data for Option 3 partial bridge');
}

// ─── SUITE 5: ROUTE CODEX FACTION TAB & ENDINGS ──────────────────────────────
console.log('\n--- SUITE 5: Route Codex FACTION Tab & 41 Faction Endings ---');
{
  assert(ENDINGS.length === 244, `Total ENDINGS in catalog is exactly 244 (got ${ENDINGS.length})`);

  const factionEndings = ENDINGS.filter((e: any) => e.category === 'faction');
  assert(factionEndings.length === 41, `Total endings with category === 'faction' is exactly 41 (got ${factionEndings.length})`);

  // Verify uniqueness of faction ending IDs
  const factionIds = factionEndings.map((e: any) => e.id);
  const uniqueFactionIds = new Set(factionIds);
  assert(uniqueFactionIds.size === 41, 'All 41 faction ending IDs are distinct and unique');

  // Verify FC1 and FC2 faction endings are present
  assert(factionIds.includes('ending_fc1_faction_betrayal'), 'Includes ending_fc1_faction_betrayal');
  assert(factionIds.includes('ending_fc1_faction_betrayal_killed'), 'Includes ending_fc1_faction_betrayal_killed');
  assert(factionIds.includes('ending_fc2_faction_collapse'), 'Includes ending_fc2_faction_collapse');

  // Verify category sums reconcile to 244
  const categoryCounts: Record<string, number> = {};
  for (const ending of ENDINGS) {
    categoryCounts[ending.category] = (categoryCounts[ending.category] || 0) + 1;
  }
  const totalMapped = Object.values(categoryCounts).reduce((a, b) => a + b, 0);
  assert(totalMapped === 244, `Sum of all canonical ending categories equals 244 (got ${totalMapped})`);
  console.log('  Category Breakdown:', JSON.stringify(categoryCounts));

  // Simulate RouteCodexScreen filter behavior
  const simulateFilter = (category: string) => {
    if (category === 'all') return ENDINGS;
    if (category === 'branches') return ENDINGS.filter((e: any) => e.id.startsWith('ending_mb'));
    if (category === 'epilogue') return ENDINGS.filter((e: any) => e.id.startsWith('ending_epilogue_'));
    return ENDINGS.filter((e: any) => e.category === category);
  };

  assert(simulateFilter('faction').length === 41, 'RouteCodexScreen filter for "faction" returns all 41 endings');
  assert(simulateFilter('all').length === 244, 'RouteCodexScreen filter for "all" returns all 244 endings');
  assert(simulateFilter('branches').length === 10, 'RouteCodexScreen filter for "branches" returns 10 MB endings');
  assert(simulateFilter('epilogue').length === 6, 'RouteCodexScreen filter for "epilogue" returns 6 epilogue endings');
}

// ─── SUITE 6: ADDITIONAL R1 & R2 DEFECT REPAIRS ──────────────────────────────
console.log('\n--- SUITE 6: Additional R1 & R2 Audit Defect Verifications ---');
{
  // BUG-02: Cain solo intelligence in c3_cain_tactical_moment
  const cainMoment = CHAPTER_3_NODES.find((n: any) => n.id === 'c3_cain_tactical_moment');
  const cainChoice1 = cainMoment?.choices?.find((c: any) => c.id === 'c3_take_cain_intel');
  const cainChoice2 = cainMoment?.choices?.find((c: any) => c.id === 'c3_question_cain_intel');
  const cainChoice3 = cainMoment?.choices?.find((c: any) => c.id === 'c3_ignore_cain_intel');
  const soloChoice = cainMoment?.choices?.find((c: any) => c.id === 'c3_solo_rat_king_approach');

  assert(cainChoice1?.requirements?.cainPresent === true, 'c3_take_cain_intel requires cainPresent === true');
  assert(cainChoice2?.requirements?.cainPresent === true, 'c3_question_cain_intel requires cainPresent === true');
  assert(cainChoice3?.requirements?.cainPresent === true, 'c3_ignore_cain_intel requires cainPresent === true');
  assert(soloChoice?.requirements?.blockedFlags?.includes('cain_joins_party'), 'c3_solo_rat_king_approach is available when Cain is not recruited');

  // BUG-03: Mira unrecruited prose sanitization in endings.ts
  const corruptionEngineEnding = ENDINGS.find((e: any) => e.id === 'ending_ch3_corruption_engine');
  assert(!corruptionEngineEnding?.description?.includes('Mira calls your name three times'), 'ending_ch3_corruption_engine description does not mention Mira');

  // BUG-08: Chapter 3 unlock without MB1
  const ch3UnlockedState = getUnlockedChapters({ currentNodeId: 'node_test', flags: { chapter2_complete: true } } as any);
  assert(ch3UnlockedState.includes('Chapter 3'), 'Chapter 3 unlocks with chapter2_complete as GameState without requiring MB1');

  const ch3UnlockedArgs = getUnlockedChapters([], [], { chapter2_complete: true });
  assert(ch3UnlockedArgs.includes('Chapter 3'), 'Chapter 3 unlocks with chapter2_complete as flags arg without requiring MB1');

  // BUG-09: Junction 4-C option [1] lock
  const junction = CHAPTER_2_NODES.find((n: any) => n.id === 'c2_surface_junction');
  const followMiraChoice = junction?.choices?.find((c: any) => c.id === 'c2_follow_mira');
  assert(followMiraChoice?.requirements?.blockedFlags?.includes('visited_mira_clinic_route'), 'c2_follow_mira blocked when visited_mira_clinic_route is set');

  // R2-PROSE: Dialogue completions
  const cainLoyalty = CHAPTER_2_NODES.find((n: any) => n.id === 'c2_cain_loyalty_choice');
  assert(cainLoyalty?.dialogue?.includes('choosing you is the harder thing to live with. Keep up.'), 'Cain dialogue in c2_cain_loyalty_choice has complete trailing sentence');

  const ch3Start = CHAPTER_3_NODES.find((n: any) => n.id === 'chapter3_start');
  assert(ch3Start?.text?.includes('The surface lies already behind you'), 'chapter3_start has active predicate verb ("lies already behind you")');
}

// ─── FINAL SUMMARY ───────────────────────────────────────────────────────────
console.log('\n======================================================================');
console.log(`TOTAL TESTS:  ${totalTests}`);
console.log(`PASSED:       ${passedTests}`);
console.log(`FAILED:       ${failedTests}`);
console.log('======================================================================');

if (failedTests > 0) {
  process.exit(1);
} else {
  console.log('\n🎉 ALL EMPIRICAL STRESS TESTS PASSED WITH 0 FAILURES!\n');
}
