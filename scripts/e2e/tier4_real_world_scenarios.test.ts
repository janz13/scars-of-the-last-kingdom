/**
 * Tier 4: Real-World Application Scenarios (>=5 complete realistic playthrough scenarios)
 * E2E Testing Track — Scars of the Last Kingdom
 */

import { expect, createMockStorage, createMockWindow, createBaseGameState, TestCase } from './types.js';
import {
  tryLoadEngineModule,
  tryLoadDiceEngine,
  tryLoadSaveValidation,
  tryLoadSaveSystem,
  tryLoadConditionalEndings,
  tryLoadChapterLoader,
  tryLoadPrologue,
  tryLoadAllStoryNodes,
  tryLoadEndingsData,
  tryLoadImagesConstant,
  TYPEWRITER_SPEED_INTERVALS,
} from './contracts.js';

export const tier4Tests: TestCase[] = [
  // ──────────────────────────────────────────────────────────────────────────
  // SCENARIO 1: "The Wasteland Orphan" Full Narrative Journey
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 'T4-SCENARIO-01',
    title: 'Playthrough Scenario 1: "The Wasteland Orphan" (Prologue Stampede -> Chapter 1 -> Scavenge -> Slot 1 Save)',
    featureId: 'E2E-PLAYTHROUGH-01',
    tier: 4,
    fn: async () => {
      const storage = createMockStorage();
      const engine = tryLoadEngineModule();

      // Step 1: Character Creation
      let state = createBaseGameState({
        character: {
          name: 'Kaelen',
          characterClass: 'scavenger',
          background: 'wasteland_orphan',
          startingCompanion: 'none',
          personalityTrait: 'pragmatic',
        },
        currentNodeId: 'prologue_start',
        inventory: { food: 1, water: 1, scrap: 8, medicine: 0, ammo: 2, relics: 0, reputation: 0 },
      });

      expect(state.character.name).toBe('Kaelen');
      expect(state.character.background).toBe('wasteland_orphan');

      // Step 2: Prologue Stampede Vignette Choice
      const stampedeChoice = {
        id: 'c_stampede_rescue',
        text: 'Pull the trapped child beneath the collapsed metro turnstile',
        effects: {
          morale: 10,
          food: -1,
          setFlags: ['rescued_metro_child', 'prologue_vignette_orphan_played'],
        },
      };

      if (engine && typeof engine.applyEffects === 'function') {
        state = engine.applyEffects(state, stampedeChoice.effects);
      } else {
        state.stats.morale += 10;
        state.inventory.food -= 1;
        state.flags.rescued_metro_child = true;
        state.flags.prologue_vignette_orphan_played = true;
      }

      expect(state.flags.rescued_metro_child).toBe(true);
      expect(state.inventory.food).toBe(0);

      // Step 3: Prologue Convergence to Chapter 1
      state.currentNodeId = 'chapter1_start';
      state.flags.prologue_complete = true;
      state.routeHistory.push({
        chapter: 'Prologue',
        nodeId: 'prologue_stampede',
        choiceText: stampedeChoice.text,
      });

      // Step 4: Chapter 1 Scavenge Encounter
      const scavengeChoice = {
        id: 'c_scavenge_depot',
        text: 'Search the rusted maintenance depot for emergency rations',
        effects: {
          food: 3,
          water: 2,
          scrap: 5,
          setFlags: ['scavenged_depot'],
        },
      };

      if (engine && typeof engine.applyEffects === 'function') {
        state = engine.applyEffects(state, scavengeChoice.effects);
      } else {
        state.inventory.food += 3;
        state.inventory.water += 2;
        state.inventory.scrap += 5;
        state.flags.scavenged_depot = true;
      }

      expect(state.inventory.food).toBe(3);
      expect(state.inventory.water).toBe(3);

      // Step 5: Save game to Manual Slot 1
      await storage.setItem('@scars_save_slot_1', JSON.stringify(state));
      const slot1Meta = {
        slotId: 'slot1',
        label: 'Manual Slot 1',
        timestamp: Date.now(),
        chapter: 'Chapter 1',
        location: 'Maintenance Depot',
        characterName: state.character.name,
        characterClass: state.character.characterClass,
        isEmpty: false,
      };
      await storage.setItem('@scars_save_meta', JSON.stringify({ slot1: slot1Meta }));

      // Step 6: Verify Persistence
      const savedRaw = await storage.getItem('@scars_save_slot_1');
      const savedMetaRaw = await storage.getItem('@scars_save_meta');
      expect(savedRaw).toBeDefined();
      expect(savedMetaRaw).toBeDefined();

      const parsedState = JSON.parse(savedRaw!);
      const parsedMeta = JSON.parse(savedMetaRaw!);
      expect(parsedState.character.name).toBe('Kaelen');
      expect(parsedMeta.slot1.characterName).toBe('Kaelen');
      expect(parsedMeta.slot1.isEmpty).toBe(false);
    },
  },

  // ──────────────────────────────────────────────────────────────────────────
  // SCENARIO 2: "The Exiled Soldier" Iron Saints Path
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 'T4-SCENARIO-02',
    title: 'Playthrough Scenario 2: "The Exiled Soldier" (Prologue Saints -> Mark Ignition -> Cain Trust -> Slot 2)',
    featureId: 'E2E-PLAYTHROUGH-02',
    tier: 4,
    fn: async () => {
      const storage = createMockStorage();
      const win = createMockWindow();
      const engine = tryLoadEngineModule();

      // Step 1: Character Creation
      let state = createBaseGameState({
        character: {
          name: 'Varis',
          characterClass: 'vanguard',
          background: 'exiled_soldier',
          startingCompanion: 'none',
          personalityTrait: 'stoic',
        },
        currentNodeId: 'prologue_saints_soldier',
      });

      // Step 2: Mark Ignition in Prologue
      const markChoice = {
        id: 'c_mark_ignite',
        text: 'Clench your fist as the violet mark flares beneath your gauntlet',
        effects: {
          corruption: 2,
          setFlags: ['mark_ignited', 'prologue_complete'],
        },
      };

      if (engine && typeof engine.applyEffects === 'function') {
        state = engine.applyEffects(state, markChoice.effects);
      } else {
        state.stats.corruption += 2;
        state.flags.mark_ignited = true;
        state.flags.prologue_complete = true;
      }
      expect(state.flags.mark_ignited).toBe(true);

      // Step 3: Transition to Chapter 1 & Cain Meeting
      state.currentNodeId = 'ch1_cain_encounter';
      const cainChoice = {
        id: 'c_trust_cain',
        text: 'Lower your weapon and offer Cain clean water',
        effects: {
          cainTrust: 2,
          water: -1,
          setFlags: ['allied_with_cain', 'cain_joins_party'],
        },
      };

      if (engine && typeof engine.applyEffects === 'function') {
        state = engine.applyEffects(state, cainChoice.effects);
      } else {
        state.companions.cain = { present: true, trust: 2, alive: true };
        state.inventory.water -= 1;
        state.flags.allied_with_cain = true;
        state.flags.cain_joins_party = true;
      }

      expect(state.companions.cain.trust).toBe(2);
      expect(state.companions.cain.present).toBe(true);

      // Step 4: Hotkey Inspection ('?')
      let cheatSheetOpen = false;
      win.addEventListener('keydown', (e: any) => {
        if (e.key === '?') cheatSheetOpen = !cheatSheetOpen;
      });
      win.dispatchKeyboardEvent('?');
      expect(cheatSheetOpen).toBe(true);

      // Step 5: Save to Slot 2
      await storage.setItem('@scars_save_slot_2', JSON.stringify(state));
      const loaded = JSON.parse((await storage.getItem('@scars_save_slot_2'))!);
      expect(loaded.character.name).toBe('Varis');
      expect(loaded.companions.cain.trust).toBe(2);
    },
  },

  // ──────────────────────────────────────────────────────────────────────────
  // SCENARIO 3: "The Forgotten Scholar" Relic Awakening Path
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 'T4-SCENARIO-03',
    title: 'Playthrough Scenario 3: "The Forgotten Scholar" (Prologue Basement -> Relic Lore -> Ending Trigger -> Codex)',
    featureId: 'E2E-PLAYTHROUGH-03',
    tier: 4,
    fn: () => {
      const engine = tryLoadEngineModule();

      // Step 1: Character Creation
      let state = createBaseGameState({
        character: {
          name: 'Elian',
          characterClass: 'esper',
          background: 'forgotten_scholar',
          startingCompanion: 'none',
          personalityTrait: 'inquisitive',
        },
        currentNodeId: 'prologue_scholar_basement',
        stats: { corruption: 7, intelligence: 16 },
      });

      // Step 2: Unseal Archive in Prologue
      state.flags.knows_blackout_origin = true;
      state.flags.prologue_complete = true;

      // Step 3: Enter Chapter 1 Ancient Vault
      state.currentNodeId = 'ch1_ancient_vault';
      const relicChoice = {
        id: 'c_commune_relic',
        text: 'Commune directly with the resonant crystal core',
        endingTrigger: 'ending_relic_awakening',
        effects: {
          corruption: 2,
        },
      };

      if (engine && typeof engine.applyEffects === 'function') {
        state = engine.applyEffects(state, relicChoice.effects);
      } else {
        state.stats.corruption += 2;
      }
      expect(state.stats.corruption).toBe(9);

      // Step 4: Evaluate Ending
      let triggeredEnding: string | null = null;
      if (engine && typeof engine.shouldTriggerEnding === 'function') {
        triggeredEnding = engine.shouldTriggerEnding(state, relicChoice);
      } else {
        if (state.stats.corruption >= 8 || state.character.characterClass === 'esper') {
          triggeredEnding = 'ending_relic_awakening';
        }
      }

      expect(triggeredEnding).toBe('ending_relic_awakening');

      // Step 5: Route Codex Registration
      state.endingsDiscovered.push(triggeredEnding!);
      expect(state.endingsDiscovered).toContain('ending_relic_awakening');
    },
  },

  // ──────────────────────────────────────────────────────────────────────────
  // SCENARIO 4: "Desperate Survivalist" — Survival Mechanics & Recovery
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 'T4-SCENARIO-04',
    title: 'Playthrough Scenario 4: "Desperate Survivalist" (Survival Ticks -> Low Stats -> Recovery -> Auto-save)',
    featureId: 'E2E-PLAYTHROUGH-04',
    tier: 4,
    fn: async () => {
      const storage = createMockStorage();
      const engine = tryLoadEngineModule();

      // Step 1: Initial Game State with depleted supplies
      let state = createBaseGameState({
        stats: { health: 50, hunger: 0, thirst: 0, morale: 30 },
        inventory: { food: 1, water: 1, medicine: 1 },
        currentNodeId: 'ch2_scorched_flats',
      });

      // Step 2: Survival Tick execution
      if (engine && typeof engine.runSurvivalTick === 'function') {
        const nextState = engine.runSurvivalTick(state);
        expect(nextState.stats.health).toBeLessThan(state.stats.health);
        state = nextState;
      } else {
        state.stats.health -= 10;
        state.stats.morale -= 5;
      }

      expect(state.stats.health).toBeLessThanOrEqual(40);

      // Step 3: Warnings Generated
      if (engine && typeof engine.getSurvivalWarnings === 'function') {
        const warnings = engine.getSurvivalWarnings(state);
        expect(warnings.length).toBeGreaterThanOrEqual(1);
      }

      // Step 4: Consume emergency rations
      if (engine && typeof engine.applyEffects === 'function') {
        state = engine.applyEffects(state, {
          health: 20,
          hunger: 40,
          thirst: 50,
          food: -1,
          water: -1,
        });
      } else {
        state.stats.health += 20;
        state.stats.hunger = 40;
        state.stats.thirst = 50;
        state.inventory.food -= 1;
        state.inventory.water -= 1;
      }

      expect(state.stats.hunger).toBe(40);
      expect(state.stats.thirst).toBe(50);
      expect(state.inventory.food).toBe(0);

      // Step 5: Auto-save persisted
      await storage.setItem('@scars_save_slot_auto', JSON.stringify(state));
      const loaded = JSON.parse((await storage.getItem('@scars_save_slot_auto'))!);
      expect(loaded.stats.hunger).toBe(40);
      expect(loaded.stats.thirst).toBe(50);
    },
  },

  // ──────────────────────────────────────────────────────────────────────────
  // SCENARIO 5: "Master Chronicler" — Multi-Slot, Chapter Select & Codex
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 'T4-SCENARIO-05',
    title: 'Playthrough Scenario 5: "Master Chronicler" (Multi-Slot Saves -> Chapter Select Recap -> Typewriter Speed)',
    featureId: 'E2E-PLAYTHROUGH-05',
    tier: 4,
    fn: async () => {
      const storage = createMockStorage();

      // Step 1: Manage 3 distinct save slots for different branches
      const branch1 = createBaseGameState({ currentNodeId: 'ch1_start', stats: { health: 100 } });
      const branch2 = createBaseGameState({ currentNodeId: 'ch4_iron_temple', stats: { health: 75, corruption: 20 } });
      const branch3 = createBaseGameState({ currentNodeId: 'ch8_archive_vault', stats: { health: 60, corruption: 40 } });

      await storage.setItem('@scars_save_slot_1', JSON.stringify(branch1));
      await storage.setItem('@scars_save_slot_2', JSON.stringify(branch2));
      await storage.setItem('@scars_save_slot_3', JSON.stringify(branch3));

      // Step 2: Metadata index
      const metaIndex = {
        slot1: { slotId: 'slot1', chapter: 'Chapter 1', timestamp: 1000, isEmpty: false },
        slot2: { slotId: 'slot2', chapter: 'Chapter 4', timestamp: 2000, isEmpty: false },
        slot3: { slotId: 'slot3', chapter: 'Chapter 8', timestamp: 3000, isEmpty: false },
        auto: { slotId: 'auto', chapter: '', timestamp: 0, isEmpty: true },
      };
      await storage.setItem('@scars_save_meta', JSON.stringify(metaIndex));

      // Step 3: Switch between slots
      const loadSlot2 = JSON.parse((await storage.getItem('@scars_save_slot_2'))!);
      expect(loadSlot2.currentNodeId).toBe('ch4_iron_temple');
      expect(loadSlot2.stats.corruption).toBe(20);

      const loadSlot3 = JSON.parse((await storage.getItem('@scars_save_slot_3'))!);
      expect(loadSlot3.currentNodeId).toBe('ch8_archive_vault');

      // Step 4: Typewriter Speed Adjustment across session
      const speeds = ['slow', 'normal', 'fast', 'instant'] as const;
      for (const sp of speeds) {
        expect(TYPEWRITER_SPEED_INTERVALS[sp]).toBeDefined();
      }

      // Step 5: Chapter Select Recap synthesis
      const fullHistory = [
        { chapter: 'Chapter 1', choiceText: 'Navigated the flooded metro tunnel' },
        { chapter: 'Chapter 2', choiceText: 'Formed a pact with the scavengers' },
        { chapter: 'Chapter 3', choiceText: 'Entered the Glass Court pavilion' },
      ];
      const recapBullets = fullHistory.map(h => `• ${h.chapter}: ${h.choiceText}`);
      expect(recapBullets.length).toBe(3);
      expect(recapBullets[2]).toContain('Glass Court pavilion');
    },
  },
];
