import AsyncStorage from '@react-native-async-storage/async-storage';
import type { GameState } from '../data/types';

// ─── HOW TO SAVE ADDITIONAL DATA ──────────────────────────────────────────
// The entire GameState is serialized. Add new fields to GameState in
// data/types.ts and they will automatically be saved and loaded.
//
// IMPORTANT: When you add a new field to GameState, also add a fallback
// in SAVE_DEFAULTS below so old saves without that field load cleanly.
// ──────────────────────────────────────────────────────────────────────────

const SAVE_KEY = '@scars_save_v1';
const CONTENT_WARNING_KEY = '@scars_content_warning_v1';

// ─── Migration defaults ───────────────────────────────────────────────────────
//
// When a saved GameState is missing a field (because it was added in a newer
// version of the game), these fallbacks ensure the loaded state is always
// a complete, valid GameState without crashing.
//
// Rules:
//   - Keep this in sync with INITIAL_STATE in GameContext.tsx.
//   - Never import from GameContext here — that would create a circular dep.
//   - When you add a new field to GameState, add its default here too.

const SAVE_DEFAULTS = {
  screen: 'mainMenu' as const,
  character: null,
  stats: {
    health: 80, maxHealth: 100, hunger: 70, thirst: 70,
    morale: 50, trust: 0, strength: 5, intelligence: 5,
    agility: 5, charisma: 5, luck: 5, corruption: 0,
  },
  inventory: {
    food: 2, water: 2, medicine: 0, scrap: 0,
    ammo: 0, relics: 0, reputation: 0,
  },
  currentNodeId: 'chapter1_start',
  flags: {} as Record<string, boolean>,
  companions: {
    mira: { present: false, trust: 0, alive: true },
    cain: { present: false, trust: 0, alive: true },
  },
  factionRep: {
    ironSaints: 0, glassCourt: 0, hollowChildren: 0, redChoir: 0, lastArchive: 0,
  },
  routeHistory: [] as GameState['routeHistory'],
  endingsDiscovered: [] as string[],
  settings: {
    textSpeed: 'normal' as const,
    soundEnabled: false,
    autoSave: true,
    skipDiceAnimation: false,
  },
  activeEnding: null,
};

// ─── Route history cap ────────────────────────────────────────────────────────
// Prevents AsyncStorage from growing unbounded over a long playthrough.
const MAX_ROUTE_HISTORY = 500;

// ─── Schema migration ─────────────────────────────────────────────────────────
//
// Called every time a save is loaded. Merges the stored data with current
// defaults so saves from older game versions always have every field the
// current code expects.
function migrateSave(raw: Partial<GameState>): GameState {
  const migrated = {
    ...SAVE_DEFAULTS,
    ...raw,
    // Always deep-merge nested objects so missing sub-keys are filled
    settings: {
      ...SAVE_DEFAULTS.settings,
      ...(raw.settings ?? {}),
    },
    companions: {
      mira: { ...SAVE_DEFAULTS.companions.mira, ...(raw.companions?.mira ?? {}) },
      cain: { ...SAVE_DEFAULTS.companions.cain, ...(raw.companions?.cain ?? {}) },
    },
    factionRep: {
      ...SAVE_DEFAULTS.factionRep,
      ...(raw.factionRep ?? {}),
    },
    stats: {
      ...SAVE_DEFAULTS.stats,
      ...(raw.stats ?? {}),
    },
    inventory: {
      ...SAVE_DEFAULTS.inventory,
      ...(raw.inventory ?? {}),
    },
    // Guard: flags must always be a plain object
    flags: (raw.flags && typeof raw.flags === 'object' && !Array.isArray(raw.flags))
      ? raw.flags
      : {},
    // Guard: arrays must be arrays
    routeHistory: Array.isArray(raw.routeHistory) ? raw.routeHistory : [],
    endingsDiscovered: Array.isArray(raw.endingsDiscovered) ? raw.endingsDiscovered : [],
  } as GameState;

  // Cap route history to prevent unbounded growth (keep the most recent entries)
  if (migrated.routeHistory.length > MAX_ROUTE_HISTORY) {
    migrated.routeHistory = migrated.routeHistory.slice(-MAX_ROUTE_HISTORY);
  }

  return migrated;
}

// ─── Public API ───────────────────────────────────────────────────────────────

export async function saveGame(state: GameState): Promise<void> {
  try {
    // Cap route history before serialising so the stored payload stays bounded
    const toSave: GameState = state.routeHistory.length > MAX_ROUTE_HISTORY
      ? { ...state, routeHistory: state.routeHistory.slice(-MAX_ROUTE_HISTORY) }
      : state;
    const serialized = JSON.stringify(toSave);
    await AsyncStorage.setItem(SAVE_KEY, serialized);
  } catch (error) {
    console.warn('Save failed:', error);
  }
}

export async function loadGame(): Promise<GameState | null> {
  try {
    const data = await AsyncStorage.getItem(SAVE_KEY);
    if (!data) return null;
    const raw = JSON.parse(data) as Partial<GameState>;
    return migrateSave(raw);
  } catch (error) {
    console.warn('Load failed:', error);
    return null;
  }
}

export async function hasSave(): Promise<boolean> {
  try {
    const data = await AsyncStorage.getItem(SAVE_KEY);
    return data !== null;
  } catch {
    return false;
  }
}

export async function deleteSave(): Promise<void> {
  try {
    await AsyncStorage.removeItem(SAVE_KEY);
  } catch (error) {
    console.warn('Delete save failed:', error);
  }
}

export async function hasSeenContentWarning(): Promise<boolean> {
  try {
    const val = await AsyncStorage.getItem(CONTENT_WARNING_KEY);
    return val === 'true';
  } catch {
    return false;
  }
}

export async function markContentWarningSeen(): Promise<void> {
  try {
    await AsyncStorage.setItem(CONTENT_WARNING_KEY, 'true');
  } catch (error) {
    console.warn('markContentWarningSeen failed:', error);
  }
}

export async function resetAllData(): Promise<void> {
  try {
    await AsyncStorage.multiRemove([SAVE_KEY, CONTENT_WARNING_KEY]);
  } catch (error) {
    console.warn('resetAllData failed:', error);
  }
}
