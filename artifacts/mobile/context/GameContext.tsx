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
  shouldTriggerEnding,
} from '../logic/gameEngine';
import { deleteSave as deleteSaveStorage, hasSave, loadGame, saveGame } from '../logic/saveSystem';

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
  currentNode: ReturnType<typeof getNodeById>;
  availableChoices: ReturnType<typeof getChoicesWithStatus>;
  // Core gameplay
  startNewGame: (character: Character) => void;
  makeChoice: (choiceId: string) => void;
  setScreen: (screen: GameScreen) => void;
  continueGame: () => Promise<void>;
  deleteAndReset: () => Promise<void>;
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

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<GameState>(INITIAL_STATE);
  const [isLoading, setIsLoading] = useState(true);
  const [hasSaveGame, setHasSaveGame] = useState(false);
  const [pendingDiceRoll, setPendingDiceRoll] = useState<PendingDiceRoll | null>(null);
  const autoSaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // On mount, check for existing save
  useEffect(() => {
    (async () => {
      const saveExists = await hasSave();
      setHasSaveGame(saveExists);
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
    };

    if (startNode?.effectsOnEnter) {
      newState = applyEffects(newState, startNode.effectsOnEnter);
    }

    setState(newState);
  }, []);

  const makeChoice = useCallback((choiceId: string) => {
    setState((prev) => {
      const node = getNodeById(prev.currentNodeId);
      if (!node) return prev;

      const choice = node.choices.find((c) => c.id === choiceId);
      if (!choice) return prev;

      let next = applyEffects(prev, choice.effects);

      const entry: RouteEntry = {
        nodeId: node.id,
        nodeTitle: node.title,
        choiceText: choice.text,
        timestamp: Date.now(),
      };
      next = { ...next, routeHistory: [...next.routeHistory, entry] };

      let nextNodeId = choice.nextNode;

      const endingTrigger = shouldTriggerEnding(next, choice);
      if (endingTrigger) nextNodeId = endingTrigger;

      const autoRedirect = getAutoRedirect(next, nextNodeId);
      if (autoRedirect) nextNodeId = autoRedirect;

      next = { ...next, currentNodeId: nextNodeId };

      const nextNode = getNodeById(nextNodeId);
      if (nextNode?.effectsOnEnter) {
        next = applyEffects(next, nextNode.effectsOnEnter);
      }

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

      if (nextNodeId === 'chapter1_end') {
        return { ...next, screen: 'ending', activeEnding: 'chapter1_end' };
      }

      return next;
    });
  }, []);

  const setScreen = useCallback((screen: GameScreen) => {
    setState((prev) => ({ ...prev, screen }));
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

      return next;
    });
    setPendingDiceRoll(null);
  }, []);

  const continueGame = useCallback(async () => {
    const saved = await loadGame();
    if (saved) {
      setState(saved);
      setHasSaveGame(true);
    }
  }, []);

  const deleteAndReset = useCallback(async () => {
    await deleteSaveStorage();
    setHasSaveGame(false);
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
        currentNode,
        availableChoices,
        startNewGame,
        makeChoice,
        setScreen,
        continueGame,
        deleteAndReset,
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
