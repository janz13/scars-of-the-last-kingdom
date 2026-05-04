import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import type {
  Character,
  CompanionPair,
  DiceCheck,
  FactionRep,
  GameScreen,
  GameState,
  Inventory,
  RouteEntry,
  Stats,
} from '../data/types';
import type { DiceResult } from '../logic/diceEngine';
import { buildStartingStats, DEFAULT_INVENTORY, DEFAULT_STATS } from '../data/characterOptions';
import { getNodeById, getStartNodeId } from '../data/storyNodes';
import { ENDINGS } from '../data/endings';
import {
  applyEffects,
  checkSurvivalEndings,
  getAutoRedirect,
  getChoicesWithStatus,
  getHallucinationRedirect,
  runSurvivalTick,
  shouldTriggerEnding,
} from '../logic/gameEngine';
import { deleteSave as deleteSaveStorage, hasSave, hasSeenContentWarning, loadGame, resetAllData as resetAllDataStorage, saveGame } from '../logic/saveSystem';
import { getCompanionEventTrigger } from '../logic/companionSystem';

const DEFAULT_COMPANIONS: CompanionPair = {
  mira: { present: false, trust: 0, alive: true },
  cain: { present: false, trust: 0, alive: true },
};

const DEFAULT_FACTION_REP: FactionRep = {
  ironSaints: 0,
  glassCourt: 0,
  hollowChildren: 0,
  redChoir: 0,
  lastArchive: 0,
};

export const INITIAL_STATE: GameState = {
  screen: 'mainMenu',
  character: null,
  stats: { ...DEFAULT_STATS },
  inventory: { ...DEFAULT_INVENTORY },
  currentNodeId: getStartNodeId(),
  flags: {},
  companions: DEFAULT_COMPANIONS,
  factionRep: DEFAULT_FACTION_REP,
  routeHistory: [],
  endingsDiscovered: [],
  settings: { textSpeed: 'normal', soundEnabled: false, autoSave: true, skipDiceAnimation: false },
  activeEnding: null,
  pendingReturnNodeId: undefined,
};

export interface PendingDiceRoll {
  choiceId: string;
  choiceText: string;
  diceCheck: DiceCheck;
}

interface GameContextValue {
  state: GameState;
  isLoading: boolean;
  hasSaveGame: boolean;
  hasActiveGame: boolean;
  currentNode: ReturnType<typeof getNodeById>;
  availableChoices: ReturnType<typeof getChoicesWithStatus>;
  // Core gameplay
  startNewGame: (character: Character) => void;
  makeChoice: (choiceId: string) => void;
  setScreen: (screen: GameScreen) => void;
  continueGame: () => Promise<void>;
  deleteAndReset: () => Promise<void>;
  resetAllData: () => Promise<void>;
  updateSettings: (settings: Partial<GameState['settings']>) => void;
  // Dice system
  pendingDiceRoll: PendingDiceRoll | null;
  initiateDiceRoll: (choiceId: string) => void;
  commitDiceRoll: (choiceId: string, result: DiceResult) => void;
  // Developer tools
  devJumpToNode: (nodeId: string) => void;
  devSetStat: (key: keyof Stats, value: number) => void;
  devSetInventory: (key: keyof Inventory, value: number) => void;
  devSetFlag: (flag: string, value: boolean) => void;
  devRemoveFlag: (flag: string) => void;
  devUnlockAllEndings: () => void;
  devSetFactionRep: (faction: keyof FactionRep, value: number) => void;
  devSetCompanionTrust: (companion: 'mira' | 'cain', trust: number) => void;
  devToggleCompanionPresent: (companion: 'mira' | 'cain') => void;
  devResetToMenu: () => Promise<void>;
}

const GameContext = createContext<GameContextValue | null>(null);

// ─── Helper: resolve ending from state + node ─────────────────────────────────

function resolveEndingState(
  next: GameState,
  nextNodeId: string,
): GameState | null {
  // 1. Survival check (after tick)
  const survivalEnding = checkSurvivalEndings(next);
  if (survivalEnding) {
    return {
      ...next,
      screen: 'ending',
      activeEnding: survivalEnding,
      endingsDiscovered: next.endingsDiscovered.includes(survivalEnding)
        ? next.endingsDiscovered
        : [...next.endingsDiscovered, survivalEnding],
    };
  }

  // 2. isEnding node
  const nextNode = getNodeById(nextNodeId);
  if (nextNode?.isEnding) {
    const endingId = nextNode.endingId ?? nextNode.id;
    return {
      ...next,
      screen: 'ending',
      activeEnding: endingId,
      endingsDiscovered: next.endingsDiscovered.includes(endingId)
        ? next.endingsDiscovered
        : [...next.endingsDiscovered, endingId],
    };
  }

  // 3. Legacy chapter1_end
  if (nextNodeId === 'chapter1_end') {
    return { ...next, screen: 'ending', activeEnding: 'chapter1_end' };
  }

  return null;
}

// ─── Helper: apply survival tick + optional hallucination redirect ────────────
//
// Called after every real node transition (not on __return__ from events/hallucinations).
// Returns the final state — which may have currentNodeId changed to an event or hallucination.
// Priority: survival tick → hallucination → companion event

function applyTickAndHallucination(next: GameState, realNodeId: string): GameState {
  // Run passive survival tick
  next = runSurvivalTick(next);

  // Hallucination redirect — checked first (higher priority)
  const hallucinationNode = getHallucinationRedirect(next);
  if (hallucinationNode) {
    const withFlag = applyEffects(next, { setFlags: ['halluc_active'] });
    return {
      ...withFlag,
      currentNodeId: hallucinationNode,
      pendingReturnNodeId: realNodeId,
    };
  }

  // Companion event redirect — fires when relationship conditions are met
  const companionEventNode = getCompanionEventTrigger(next);
  if (companionEventNode) {
    const withFlag = applyEffects(next, { setFlags: ['companion_event_active'] });
    return {
      ...withFlag,
      currentNodeId: companionEventNode,
      pendingReturnNodeId: realNodeId,
    };
  }

  return next;
}

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<GameState>(INITIAL_STATE);
  const [isLoading, setIsLoading] = useState(true);
  const [hasSaveGame, setHasSaveGame] = useState(false);
  const [hasActiveGame, setHasActiveGame] = useState(false);
  const [pendingDiceRoll, setPendingDiceRoll] = useState<PendingDiceRoll | null>(null);
  const autoSaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // On mount, check for existing save + content warning
  useEffect(() => {
    (async () => {
      const [saveExists, warningSeen] = await Promise.all([hasSave(), hasSeenContentWarning()]);
      setHasSaveGame(saveExists);
      setHasActiveGame(false);
      if (!warningSeen) {
        setState((prev) => ({ ...prev, screen: 'contentWarning' }));
      }
      setIsLoading(false);
    })();
  }, []);

  // Auto-save when state changes (debounced)
  useEffect(() => {
    if (state.screen === 'mainMenu' || state.screen === 'characterCreator') return;
    if (!state.settings.autoSave) return;

    if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current);
    autoSaveTimer.current = setTimeout(() => {
      saveGame(state);
      setHasSaveGame(true);
      setHasActiveGame(true);
    }, 1000);

    return () => {
      if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current);
    };
  }, [state]);

  // ─── Core gameplay ──────────────────────────────────────────────────────────

  const startNewGame = useCallback((character: Character) => {
    const { stats, inventory } = buildStartingStats(
      character.characterClass,
      character.background,
      character.startingCompanion
    );

    const factionRep: FactionRep = { ...DEFAULT_FACTION_REP };
    if (character.background === 'exiled_soldier') factionRep.ironSaints = -10;
    if (character.background === 'fallen_noble') factionRep.glassCourt = 10;
    if (character.background === 'black_market_courier') factionRep.hollowChildren = 10;
    if (character.background === 'forgotten_scholar') factionRep.lastArchive = 10;
    if (character.background === 'runaway_experiment') { factionRep.ironSaints = -5; factionRep.lastArchive = 5; }

    const companions: CompanionPair = {
      mira: {
        present: character.startingCompanion === 'mira',
        trust: character.startingCompanion === 'mira' ? 3 : 0,
        alive: true,
      },
      cain: {
        present: character.startingCompanion === 'cain',
        trust: character.startingCompanion === 'cain' ? 3 : 0,
        alive: true,
      },
    };

    const flags: Record<string, boolean> = {};
    if (character.startingCompanion === 'mira') { flags['met_mira'] = true; flags['mira_joins_party'] = true; }
    if (character.startingCompanion === 'cain') { flags['met_cain'] = true; flags['cain_joins_party'] = true; }

    const startNodeId = getStartNodeId();
    const startNode = getNodeById(startNodeId);

    let newState: GameState = {
      ...INITIAL_STATE,
      screen: 'game',
      character,
      stats,
      inventory,
      currentNodeId: startNodeId,
      flags,
      companions,
      factionRep,
      routeHistory: [],
      endingsDiscovered: [],
      activeEnding: null,
      pendingReturnNodeId: undefined,
    };

    if (startNode?.effectsOnEnter) {
      newState = applyEffects(newState, startNode.effectsOnEnter);
    }

    setState(newState);
    setHasSaveGame(true);
    setHasActiveGame(true);
  }, []);

  const makeChoice = useCallback((choiceId: string) => {
    setState((prev) => {
      const node = getNodeById(prev.currentNodeId);
      if (!node) return prev;

      const choice = node.choices.find((c) => c.id === choiceId);
      if (!choice) return prev;

      // Apply choice effects
      let next = applyEffects(prev, choice.effects);

      // Record route history
      const entry: RouteEntry = {
        nodeId: node.id,
        nodeTitle: node.title,
        choiceText: choice.text,
        timestamp: Date.now(),
      };
      next = { ...next, routeHistory: [...next.routeHistory, entry] };

      // ── Resolve next node ID ─────────────────────────────────────────────
      // __return__ is the sentinel used by hallucination nodes to return
      // the player back to the real story node they were at before the vision.
      const isHallucinationReturn = choice.nextNode === '__return__';
      let nextNodeId: string;

      if (isHallucinationReturn) {
        nextNodeId = prev.pendingReturnNodeId ?? prev.currentNodeId;
        next = { ...next, pendingReturnNodeId: undefined };
      } else {
        nextNodeId = choice.nextNode;

        const endingTrigger = shouldTriggerEnding(next, choice);
        if (endingTrigger) nextNodeId = endingTrigger;

        const autoRedirect = getAutoRedirect(next, nextNodeId);
        if (autoRedirect) nextNodeId = autoRedirect;
      }

      // Navigate to the node
      next = { ...next, currentNodeId: nextNodeId };

      // Apply the new node's entry effects
      const nextNode = getNodeById(nextNodeId);
      if (nextNode?.effectsOnEnter) {
        next = applyEffects(next, nextNode.effectsOnEnter);
      }

      // ── Survival tick + hallucination (only on real transitions) ──────────
      if (!isHallucinationReturn) {
        const afterTick = applyTickAndHallucination(next, nextNodeId);
        // If hallucination was triggered, currentNodeId changed — skip ending check
        if (afterTick.currentNodeId !== nextNodeId) {
          return afterTick;
        }
        next = afterTick;
      }

      // ── Check for endings ─────────────────────────────────────────────────
      const endingState = resolveEndingState(next, nextNodeId);
      if (endingState) return endingState;

      return next;
    });
  }, []);

  const setScreen = useCallback((screen: GameScreen) => {
    setState((prev) => ({ ...prev, screen }));
    if (screen === 'mainMenu' || screen === 'characterCreator' || screen === 'credits' || screen === 'routeCodex') {
      setHasActiveGame(false);
    }
  }, []);

  // ─── Dice system ─────────────────────────────────────────────────────────────

  // Keep a ref in sync with the current state so initiateDiceRoll can read
  // currentNodeId without needing to call setState just to access prev.
  const stateRef = useRef(state);
  useEffect(() => { stateRef.current = state; }, [state]);

  const initiateDiceRoll = useCallback((choiceId: string) => {
    const currentState = stateRef.current;
    const node = getNodeById(currentState.currentNodeId);
    if (!node) return;
    const choice = node.choices.find((c) => c.id === choiceId);
    if (!choice?.diceCheck) return;
    setPendingDiceRoll({ choiceId, choiceText: choice.text, diceCheck: choice.diceCheck });
  }, []);

  const commitDiceRoll = useCallback((choiceId: string, result: DiceResult) => {
    setState((prev) => {
      const node = getNodeById(prev.currentNodeId);
      if (!node) return prev;
      const choice = node.choices.find((c) => c.id === choiceId);
      if (!choice) return prev;

      // Apply base choice effects, then dice result effects
      let next = applyEffects(prev, choice.effects);
      next = applyEffects(next, result.effects);

      // Track luck reroll in flags
      if (result.luckRerollUsed) {
        next = { ...next, flags: { ...next.flags, dice_reroll_used: true } };
      }

      // Record route entry with dice outcome
      const outcomeTag = result.outcome === 'criticalSuccess' ? 'CRIT ✦' :
        result.outcome === 'criticalFailure' ? 'CRIT ✗' :
        result.outcome === 'success' ? '✦' : '✗';
      const entry: RouteEntry = {
        nodeId: node.id,
        nodeTitle: node.title,
        choiceText: `${choice.text} [${outcomeTag} ${result.total} vs DC ${result.difficulty}]`,
        timestamp: Date.now(),
      };
      next = { ...next, routeHistory: [...next.routeHistory, entry] };

      let nextNodeId = result.nextNodeId;

      const endingTrigger = shouldTriggerEnding(next, choice);
      if (endingTrigger) nextNodeId = endingTrigger;

      const autoRedirect = getAutoRedirect(next, nextNodeId);
      if (autoRedirect) nextNodeId = autoRedirect;

      next = { ...next, currentNodeId: nextNodeId };

      const nextNode = getNodeById(nextNodeId);
      if (nextNode?.effectsOnEnter) {
        next = applyEffects(next, nextNode.effectsOnEnter);
      }

      // Survival tick + hallucination check
      const afterTick = applyTickAndHallucination(next, nextNodeId);
      if (afterTick.currentNodeId !== nextNodeId) {
        return afterTick;
      }
      next = afterTick;

      // Check for endings
      const endingState = resolveEndingState(next, nextNodeId);
      if (endingState) return endingState;

      return next;
    });
    setPendingDiceRoll(null);
  }, []);

  const continueGame = useCallback(async () => {
    const saved = await loadGame();
    if (saved) {
      setState({ ...saved, screen: 'game' });
      setHasSaveGame(true);
      setHasActiveGame(true);
    }
  }, []);

  const deleteAndReset = useCallback(async () => {
    await deleteSaveStorage();
    setHasSaveGame(false);
    setHasActiveGame(false);
    setState(INITIAL_STATE);
  }, []);

  const resetAllData = useCallback(async () => {
    await resetAllDataStorage();
    setHasSaveGame(false);
    setHasActiveGame(false);
    setState(INITIAL_STATE);
  }, []);

  const updateSettings = useCallback((settings: Partial<GameState['settings']>) => {
    setState((prev) => ({
      ...prev,
      settings: { ...prev.settings, ...settings },
    }));
  }, []);

  // ─── Developer tools ────────────────────────────────────────────────────────

  const devJumpToNode = useCallback((nodeId: string) => {
    setState((prev) => {
      const node = getNodeById(nodeId);
      if (!node) return prev;

      // Create a minimal character for testing if none exists
      const character: Character = prev.character ?? {
        name: 'Dev Tester',
        background: 'forgotten_scholar',
        characterClass: 'relic_hunter',
        personalityTrait: 'pragmatic',
        startingCompanion: 'none',
      };

      let next: GameState = { ...prev, character, currentNodeId: nodeId, screen: 'game' };

      if (node.effectsOnEnter) {
        next = applyEffects(next, node.effectsOnEnter);
      }

      if (node.isEnding) {
        const endingId = node.endingId ?? node.id;
        return {
          ...next,
          screen: 'ending',
          activeEnding: endingId,
          endingsDiscovered: next.endingsDiscovered.includes(endingId)
            ? next.endingsDiscovered
            : [...next.endingsDiscovered, endingId],
        };
      }

      return next;
    });
  }, []);

  const devSetStat = useCallback((key: keyof Stats, value: number) => {
    setState((prev) => ({
      ...prev,
      stats: { ...prev.stats, [key]: Math.max(0, value) },
    }));
  }, []);

  const devSetInventory = useCallback((key: keyof Inventory, value: number) => {
    setState((prev) => ({
      ...prev,
      inventory: { ...prev.inventory, [key]: Math.max(0, value) },
    }));
  }, []);

  const devSetFlag = useCallback((flag: string, value: boolean) => {
    if (!flag.trim()) return;
    setState((prev) => ({
      ...prev,
      flags: { ...prev.flags, [flag.trim()]: value },
    }));
  }, []);

  const devRemoveFlag = useCallback((flag: string) => {
    setState((prev) => {
      const next = { ...prev.flags };
      delete next[flag];
      return { ...prev, flags: next };
    });
  }, []);

  const devUnlockAllEndings = useCallback(() => {
    const allIds = [...ENDINGS.map((e) => e.id), 'chapter1_end'];
    setState((prev) => ({
      ...prev,
      endingsDiscovered: [...new Set([...prev.endingsDiscovered, ...allIds])],
    }));
  }, []);

  const devSetFactionRep = useCallback((faction: keyof FactionRep, value: number) => {
    setState((prev) => ({
      ...prev,
      factionRep: {
        ...prev.factionRep,
        [faction]: Math.max(-100, Math.min(100, value)),
      },
    }));
  }, []);

  const devSetCompanionTrust = useCallback((companion: 'mira' | 'cain', trust: number) => {
    setState((prev) => ({
      ...prev,
      companions: {
        ...prev.companions,
        [companion]: {
          ...prev.companions[companion],
          trust: Math.max(0, Math.min(10, trust)),
        },
      },
    }));
  }, []);

  const devToggleCompanionPresent = useCallback((companion: 'mira' | 'cain') => {
    setState((prev) => ({
      ...prev,
      companions: {
        ...prev.companions,
        [companion]: {
          ...prev.companions[companion],
          present: !prev.companions[companion].present,
        },
      },
    }));
  }, []);

  const devResetToMenu = useCallback(async () => {
    await deleteSaveStorage();
    setHasSaveGame(false);
    setHasActiveGame(false);
    setState(INITIAL_STATE);
  }, []);

  // ─── Derived values ─────────────────────────────────────────────────────────

  const currentNode = getNodeById(state.currentNodeId);
  const availableChoices = getChoicesWithStatus(state);

  return (
    <GameContext.Provider
      value={{
        state,
        isLoading,
        hasSaveGame,
        hasActiveGame,
        currentNode,
        availableChoices,
        startNewGame,
        makeChoice,
        setScreen,
        continueGame,
        deleteAndReset,
        resetAllData,
        updateSettings,
        pendingDiceRoll,
        initiateDiceRoll,
        commitDiceRoll,
        devJumpToNode,
        devSetStat,
        devSetInventory,
        devSetFlag,
        devRemoveFlag,
        devUnlockAllEndings,
        devSetFactionRep,
        devSetCompanionTrust,
        devToggleCompanionPresent,
        devResetToMenu,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame(): GameContextValue {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within GameProvider');
  return ctx;
}
