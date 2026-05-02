import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import type {
  Character,
  CompanionPair,
  FactionRep,
  GameScreen,
  GameState,
  Inventory,
  RouteEntry,
  Stats,
} from '../data/types';
import { buildStartingStats, DEFAULT_INVENTORY, DEFAULT_STATS } from '../data/characterOptions';
import { getNodeById, getStartNodeId } from '../data/storyNodes';
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
  settings: { textSpeed: 'normal', soundEnabled: false, autoSave: true },
  activeEnding: null,
};

interface ChoiceWithStatus {
  choice: ReturnType<typeof getChoicesWithStatus>[number]['choice'];
  met: boolean;
  reasons: string[];
}

interface GameContextValue {
  state: GameState;
  isLoading: boolean;
  hasSaveGame: boolean;
  currentNode: ReturnType<typeof getNodeById>;
  availableChoices: ReturnType<typeof getChoicesWithStatus>;
  startNewGame: (character: Character) => void;
  makeChoice: (choiceId: string) => void;
  setScreen: (screen: GameScreen) => void;
  continueGame: () => Promise<void>;
  deleteAndReset: () => Promise<void>;
  updateSettings: (settings: Partial<GameState['settings']>) => void;
}

const GameContext = createContext<GameContextValue | null>(null);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<GameState>(INITIAL_STATE);
  const [isLoading, setIsLoading] = useState(true);
  const [hasSaveGame, setHasSaveGame] = useState(false);
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

    // Apply starting node effects
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

      // Apply choice effects
      let next = applyEffects(prev, choice.effects);

      // Add to route history
      const entry: RouteEntry = {
        nodeId: node.id,
        nodeTitle: node.title,
        choiceText: choice.text,
        timestamp: Date.now(),
      };
      next = { ...next, routeHistory: [...next.routeHistory, entry] };

      // Determine next node
      let nextNodeId = choice.nextNode;

      // Check for ending trigger (e.g., relic awakening when corruption >= 8)
      const endingTrigger = shouldTriggerEnding(next, choice);
      if (endingTrigger) nextNodeId = endingTrigger;

      // Check for automatic redirects (e.g., Cain betrayal)
      const autoRedirect = getAutoRedirect(next, nextNodeId);
      if (autoRedirect) nextNodeId = autoRedirect;

      next = { ...next, currentNodeId: nextNodeId };

      // Apply effects on entering new node
      const nextNode = getNodeById(nextNodeId);
      if (nextNode?.effectsOnEnter) {
        next = applyEffects(next, nextNode.effectsOnEnter);
      }

      // Check survival endings
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

      // Check if the target node is an ending
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

      // Check if we reached the end of chapter 1
      if (nextNodeId === 'chapter1_end') {
        return { ...next, screen: 'ending', activeEnding: 'chapter1_end' };
      }

      return next;
    });
  }, []);

  const setScreen = useCallback((screen: GameScreen) => {
    setState((prev) => ({ ...prev, screen }));
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
