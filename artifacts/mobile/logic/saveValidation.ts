import type { GameState } from '../data/types';

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

export const SAVE_DEFAULTS = {
  screen: 'mainMenu' as const,
  character: null,
  stats: {
    health: 80,
    maxHealth: 100,
    hunger: 70,
    thirst: 70,
    morale: 50,
    trust: 0,
    strength: 5,
    intelligence: 5,
    agility: 5,
    charisma: 5,
    luck: 5,
    corruption: 0,
  },
  inventory: {
    food: 2,
    water: 2,
    medicine: 0,
    scrap: 0,
    ammo: 0,
    relics: 0,
    reputation: 0,
  },
  currentNodeId: 'chapter1_start',
  flags: {} as Record<string, boolean>,
  companions: {
    mira: { present: false, trust: 0, alive: true },
    cain: { present: false, trust: 0, alive: true },
  },
  factionRep: {
    ironSaints: 0,
    glassCourt: 0,
    hollowChildren: 0,
    redChoir: 0,
    lastArchive: 0,
  },
  routeHistory: [] as GameState['routeHistory'],
  endingsDiscovered: [] as string[],
  settings: {
    textSpeed: 'normal' as const,
    fontSize: 'normal' as const,
    soundEnabled: false,
    autoSave: true,
    skipDiceAnimation: false,
  },
  activeEnding: null,
};

// ─── Route history cap ────────────────────────────────────────────────────────
// Prevents AsyncStorage from growing unbounded over a long playthrough.
export const MAX_ROUTE_HISTORY = 500;

// ─── Schema migration ─────────────────────────────────────────────────────────
//
// Called every time a save is loaded. Merges the stored data with current
// defaults so saves from older game versions always have every field the
// current code expects.
export function migrateSave(raw: Partial<GameState>): GameState {
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
    flags:
      raw.flags && typeof raw.flags === 'object' && !Array.isArray(raw.flags)
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

export function parseAndValidateSave(jsonStr: string): {
  valid: boolean;
  gameState?: GameState;
  endingsDiscovered?: string[];
  error?: string;
} {
  if (!jsonStr || typeof jsonStr !== 'string' || !jsonStr.trim()) {
    return { valid: false, error: 'Empty save data.' };
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(jsonStr);
  } catch {
    return { valid: false, error: 'Invalid JSON format. Please ensure the file contains valid JSON.' };
  }

  if (typeof parsed !== 'object' || parsed === null) {
    return { valid: false, error: 'Invalid save data structure. Expected a JSON object.' };
  }

  const record = parsed as Record<string, unknown>;

  // Check if this is an export payload with { gameState: ... } or a direct GameState object
  const rawState =
    record.gameState && typeof record.gameState === 'object' && record.gameState !== null
      ? (record.gameState as Record<string, unknown>)
      : record;

  // Validate currentNodeId
  if (!rawState.currentNodeId || typeof rawState.currentNodeId !== 'string') {
    return { valid: false, error: 'Invalid save data: missing or invalid "currentNodeId".' };
  }

  // Validate stats
  if (!rawState.stats || typeof rawState.stats !== 'object' || Array.isArray(rawState.stats)) {
    return { valid: false, error: 'Invalid save data: missing or invalid "stats" object.' };
  }
  const rawStats = rawState.stats as Record<string, unknown>;
  if (typeof rawStats.health !== 'number' || typeof rawStats.maxHealth !== 'number') {
    return { valid: false, error: 'Invalid save data: "stats" must contain numerical health values.' };
  }

  // Validate inventory
  if (!rawState.inventory || typeof rawState.inventory !== 'object' || Array.isArray(rawState.inventory)) {
    return { valid: false, error: 'Invalid save data: missing or invalid "inventory" object.' };
  }

  // Validate flags
  if (!rawState.flags || typeof rawState.flags !== 'object' || Array.isArray(rawState.flags)) {
    return { valid: false, error: 'Invalid save data: missing or invalid "flags" object.' };
  }

  // Extract endings discovered from either top-level export payload or inside gameState
  let endingsDiscovered: string[] = [];
  if (Array.isArray(record.endingsDiscovered)) {
    endingsDiscovered = record.endingsDiscovered.filter((e): e is string => typeof e === 'string');
  } else if (Array.isArray(rawState.endingsDiscovered)) {
    endingsDiscovered = (rawState.endingsDiscovered as unknown[]).filter((e): e is string => typeof e === 'string');
  }

  // Migrate state with fallbacks for full schema safety
  const migrated = migrateSave(rawState as Partial<GameState>);

  // Merge discovered endings
  const mergedEndings = Array.from(new Set([...migrated.endingsDiscovered, ...endingsDiscovered]));
  migrated.endingsDiscovered = mergedEndings;

  return {
    valid: true,
    gameState: migrated,
    endingsDiscovered: mergedEndings,
  };
}
