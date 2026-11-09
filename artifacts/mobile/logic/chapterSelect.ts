import type { GameState, Character, RouteEntry } from '../data/types';
import { ENABLE_EXPANSION } from '../constants/featureFlags';

export const ALL_CHAPTERS = [
  'Prologue',
  'Chapter 1',
  'Chapter 2',
  'Chapter 3',
  'Chapter 4',
  'Chapter 5',
  'Chapter 6',
  'Chapter 7',
  'Chapter 8',
  'Chapter 9',
  'Chapter 10',
  'Chapter 11',
  'Chapter 12',
  'Interlude',
  'Final Chapter 1',
  'Final Chapter 2',
  ...(ENABLE_EXPANSION ? (['Epilogue'] as const) : ([] as const)),
] as const;

export type ChapterName = (typeof ALL_CHAPTERS)[number];

export const CHAPTER_START_NODES: Record<string, string> = {
  'Prologue': 'prologue_start',
  'Chapter 1': 'chapter1_start',
  'Chapter 2': 'chapter2_start',
  'Chapter 3': 'chapter3_start',
  'Chapter 4': 'chapter4_start',
  'Chapter 5': 'chapter5_start',
  'Chapter 6': 'chapter6_start',
  'Chapter 7': 'chapter7_start',
  'Chapter 8': 'chapter8_start',
  'Chapter 9': 'chapter9_start',
  'Chapter 10': 'chapter10_start',
  'Chapter 11': 'chapter11_start',
  'Chapter 12': 'chapter12_start',
  'Interlude': 'mira_event_1',
  'Final Chapter 1': 'final_chapter1_start',
  'Final Chapter 2': 'final_chapter2_start',
  'Epilogue': 'epi_01',
};

const CHAPTER_SEQUENCE: string[] = [
  'Prologue',
  'Chapter 1',
  'Chapter 2',
  'Chapter 3',
  'Chapter 4',
  'Chapter 5',
  'Chapter 6',
  'Chapter 7',
  'Chapter 8',
  'Chapter 9',
  'Chapter 10',
  'Chapter 11',
  'Chapter 12',
  'Final Chapter 1',
  'Final Chapter 2',
  'Epilogue',
];

/**
 * Returns the list of unlocked chapters for the current game state or progress history.
 * Fresh game always unlocks 'Prologue' and 'Chapter 1'.
 */
export function getUnlockedChapters(
  arg1?: any[] | GameState,
  arg2?: any[],
  arg3?: Record<string, any>
): string[] {
  let routeHistory: RouteEntry[] = [];
  let endingsDiscovered: string[] = [];
  let flags: Record<string, any> = {};
  let lastArchiveRep = 0;

  if (arg1 && typeof arg1 === 'object' && !Array.isArray(arg1) && 'currentNodeId' in arg1) {
    const state = arg1 as GameState;
    routeHistory = state.routeHistory || [];
    endingsDiscovered = state.endingsDiscovered || [];
    flags = state.flags || {};
    lastArchiveRep = state.factionRep?.lastArchive ?? 0;
  } else {
    routeHistory = Array.isArray(arg1) ? arg1 : [];
    endingsDiscovered = Array.isArray(arg2) ? arg2 : [];
    flags = arg3 || {};
  }

  const unlocked = new Set<string>(['Prologue', 'Chapter 1']);

  // Unlocks based on completion flags
  if (flags['chapter1_complete'] || flags['prologue_complete']) unlocked.add('Chapter 2');
  if (flags['chapter2_complete']) unlocked.add('Chapter 3');
  if (flags['chapter3_complete']) unlocked.add('Chapter 4');
  if (flags['chapter4_complete']) unlocked.add('Chapter 5');
  if (flags['chapter5_complete']) unlocked.add('Chapter 6');
  if (flags['chapter6_complete']) {
    unlocked.add('Chapter 7');
    unlocked.add('Interlude');
  }
  if (flags['chapter7_complete']) unlocked.add('Chapter 8');
  if (flags['chapter8_complete']) unlocked.add('Chapter 9');
  if (flags['chapter9_complete']) unlocked.add('Chapter 10');
  if (flags['chapter10_complete']) unlocked.add('Chapter 11');
  if (flags['chapter11_complete']) unlocked.add('Chapter 12');
  if (flags['chapter12_complete']) unlocked.add('Final Chapter 1');
  if (flags['fc1_complete'] || flags['final_chapter1_complete'] || flags['unlocked_finalChapter2']) {
    unlocked.add('Final Chapter 2');
  }

  // Also unlock any chapter previously visited in route history
  for (const entry of routeHistory) {
    if ((entry as any).chapter && ALL_CHAPTERS.includes((entry as any).chapter)) {
      unlocked.add((entry as any).chapter);
    }
    const nodeId = entry.nodeId || '';
    for (let c = 1; c <= 12; c++) {
      if (nodeId.startsWith(`c${c}_`) || nodeId.startsWith(`chapter${c}_`)) {
        unlocked.add(`Chapter ${c}`);
      }
    }
    if (nodeId.startsWith('fc1_') || nodeId.startsWith('final_chapter1_')) {
      unlocked.add('Final Chapter 1');
    }
    if (nodeId.startsWith('fc2_') || nodeId.startsWith('final_chapter2_')) {
      unlocked.add('Final Chapter 2');
    }
    if (nodeId.startsWith('mira_event_') || nodeId.startsWith('cain_event_')) {
      unlocked.add('Interlude');
    }
  }

  // Endings discovered can also reveal their chapter origin
  const FC2_DEATH_ENDINGS = new Set([
    'ending_fc2_gate_madness',
    'ending_fc2_consumed_by_gate',
    'ending_fc2_tyrant_overthrown',
  ]);
  let hasNonDeathFc2Ending = Boolean(flags['fc2_non_death_completed']);

  if (endingsDiscovered.length > 0) {
    for (const ending of endingsDiscovered) {
      if (ending.startsWith('c2_ending_') || ending === 'ending_glass_court_prisoner') {
        unlocked.add('Chapter 2');
        unlocked.add('Chapter 3');
      }
      if (
        ending.startsWith('ending_ch3_') ||
        ending.endsWith('_ch3') ||
        ending === 'ending_market_lynching' ||
        ending === 'ending_platform_drowned' ||
        ending === 'ending_nursery_trap_death' ||
        ending === 'ending_saints_overwhelmed' ||
        ending === 'ending_rat_king_enslaved' ||
        ending === 'ending_hollow_children_massacred'
      ) {
        unlocked.add('Chapter 2');
        unlocked.add('Chapter 3');
        unlocked.add('Chapter 4');
      }
      for (let c = 4; c <= 12; c++) {
        if (ending.startsWith(`ending_ch${c}_`)) {
          for (let prev = 2; prev <= Math.min(12, c + 1); prev++) {
            unlocked.add(`Chapter ${prev}`);
          }
        }
      }
      if (ending.includes('fc2') || ending.includes('true_ending') || ending === 'ending_last_kingdom_remembers') {
        unlocked.add('Final Chapter 2');
        if (!FC2_DEATH_ENDINGS.has(ending)) {
          hasNonDeathFc2Ending = true;
        }
      }
      if (ending.includes('fc1')) {
        unlocked.add('Final Chapter 1');
      }
      if (ending.includes('epilogue')) {
        unlocked.add('Epilogue');
      }
    }
  }

  // Epilogue unlock rule: Any non-death FC2 ending completed AND (velna_coordinates OR lastArchive >= 70)
  if (
    ENABLE_EXPANSION &&
    (flags['epilogue_unlocked'] ||
      (hasNonDeathFc2Ending && (Boolean(flags['velna_coordinates']) || lastArchiveRep >= 70)))
  ) {
    unlocked.add('Epilogue');
  }

  for (const entry of routeHistory) {
    const nodeId = entry.nodeId || '';
    if (nodeId.startsWith('epi_') || nodeId.startsWith('epilogue_')) {
      unlocked.add('Epilogue');
    }
  }

  // Preserve canonical display order
  if (arg1 && typeof arg1 === 'object' && !Array.isArray(arg1) && 'currentNodeId' in arg1) {
    const currentNodeId = (arg1 as GameState).currentNodeId || '';
    for (let c = 1; c <= 12; c++) {
      if (currentNodeId.startsWith(`c${c}_`) || currentNodeId.startsWith(`chapter${c}_`)) {
        unlocked.add(`Chapter ${c}`);
      }
    }
    try {
      if (typeof localStorage !== 'undefined') {
        const raw = localStorage.getItem('scars_meta_progress');
        if (raw) {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed?.unlockedChapters)) {
            for (const ch of parsed.unlockedChapters) {
              if (typeof ch === 'string') unlocked.add(ch);
            }
          }
        }
        if (unlocked.size > 2) {
          localStorage.setItem(
            'scars_meta_progress',
            JSON.stringify({ unlockedChapters: ALL_CHAPTERS.filter((ch) => unlocked.has(ch)) })
          );
        }
      }
    } catch {
      // Ignore storage access errors
    }
  }
  return ALL_CHAPTERS.filter((ch) => unlocked.has(ch));
}

/**
 * Generates a concise narrative recap ("Previously on...") from route history.
 * Performance optimized: executes in < 50ms even for 1,000+ entries.
 * Deduplicates repeated loops.
 */
export function generateRouteRecap(routeHistory?: any[]): string {
  if (!routeHistory || routeHistory.length === 0) {
    return 'You awakened in the dark undercroft of the ruined metro with the mark glowing on your skin.';
  }

  const uniqueChoices: string[] = [];
  const seen = new Set<string>();

  // Process history from end to beginning to capture recent narrative beats quickly
  for (let i = routeHistory.length - 1; i >= 0 && uniqueChoices.length < 8; i--) {
    const entry = routeHistory[i];
    const text = (entry?.choiceText || '').trim();
    if (text && !seen.has(text)) {
      seen.add(text);
      uniqueChoices.unshift(text);
    }
  }

  if (uniqueChoices.length === 0) {
    return 'You awakened in the dark undercroft of the ruined metro with the mark glowing on your skin.';
  }

  return uniqueChoices.map((c) => `• ${c}`).join('\n');
}

/**
 * Creates a valid, survivable starting state for mid-story chapter jumping.
 */
export function getChapterInitialState(chapterId: string, character?: Character): GameState {
  if (!ALL_CHAPTERS.includes(chapterId as any)) {
    throw new Error(`Invalid chapter: ${chapterId}`);
  }

  const startNodeId = CHAPTER_START_NODES[chapterId] || 'prologue_start';

  const defaultCharacter: Character = character || {
    name: 'Alden',
    characterClass: 'relic_hunter',
    background: 'forgotten_scholar',
    startingCompanion: 'none',
    personalityTrait: 'pragmatic',
  };

  // Build flags representing historical progression
  const flags: Record<string, any> = {
    prologue_complete: true,
  };

  const chIndex = CHAPTER_SEQUENCE.indexOf(chapterId);
  if (chIndex > 0) {
    for (let i = 1; i < chIndex; i++) {
      const prevCh = CHAPTER_SEQUENCE[i];
      if (prevCh.startsWith('Chapter ')) {
        const num = prevCh.replace('Chapter ', '');
        flags[`chapter${num}_complete`] = true;
      }
    }
  }

  if (chapterId === 'Final Chapter 1') {
    for (let c = 1; c <= 12; c++) flags[`chapter${c}_complete`] = true;
  }
  if (chapterId === 'Final Chapter 2') {
    for (let c = 1; c <= 12; c++) flags[`chapter${c}_complete`] = true;
    flags['fc1_complete'] = true;
    flags['final_chapter1_complete'] = true;
    flags['unlocked_finalChapter2'] = true;
  }
  if (chapterId === 'Epilogue') {
    for (let c = 1; c <= 12; c++) flags[`chapter${c}_complete`] = true;
    flags['fc1_complete'] = true;
    flags['final_chapter1_complete'] = true;
    flags['unlocked_finalChapter2'] = true;
    flags['velna_coordinates'] = true;
    flags['velna_journal_read'] = true;
    flags['epilogue_unlocked'] = true;
  }

  return {
    screen: 'game',
    character: defaultCharacter,
    stats: {
      health: 80,
      maxHealth: 100,
      hunger: 70,
      thirst: 70,
      morale: 60,
      trust: 10,
      strength: 10,
      intelligence: 10,
      agility: 10,
      charisma: 10,
      luck: 10,
      corruption: 10,
    },
    inventory: {
      food: 3,
      water: 3,
      medicine: 2,
      scrap: 10,
      ammo: 5,
      relics: 1,
      reputation: 10,
    },
    currentNodeId: startNodeId,
    flags,
    companions: {
      mira: { present: chIndex >= 3, trust: 3, alive: true },
      cain: { present: chIndex >= 3, trust: 3, alive: true },
    },
    factionRep: {
      ironSaints: 10,
      glassCourt: 5,
      hollowChildren: 0,
      redChoir: 0,
      lastArchive: 10,
    },
    routeHistory: [
      {
        nodeId: startNodeId,
        nodeTitle: `Jumped to ${chapterId}`,
        choiceText: `Embarked from ${chapterId}`,
        timestamp: Date.now(),
      },
    ],
    endingsDiscovered: [],
    activeEnding: null,
    settings: {
      textSpeed: 'normal',
      fontSize: 'normal',
      soundEnabled: true,
      autoSave: true,
      skipDiceAnimation: false,
    },
  };
}

/**
 * Builds updated jump state preserving existing character progression when available.
 */
export function buildChapterJumpState(targetChapter: string, currentState: GameState): GameState {
  if (!ALL_CHAPTERS.includes(targetChapter as any)) {
    throw new Error(`Invalid chapter: ${targetChapter}`);
  }

  const startNodeId = CHAPTER_START_NODES[targetChapter] || 'prologue_start';
  const baseline = getChapterInitialState(targetChapter, currentState.character || undefined);

  return {
    ...currentState,
    screen: 'game',
    currentNodeId: startNodeId,
    stats: {
      ...baseline.stats,
      ...(currentState.stats || {}),
      // Floor mid-story survival stats to prevent instant death
      health: Math.max(currentState.stats?.health ?? 80, 80),
      hunger: Math.max(currentState.stats?.hunger ?? 70, 70),
      thirst: Math.max(currentState.stats?.thirst ?? 70, 70),
      morale: Math.max(currentState.stats?.morale ?? 60, 60),
    },
    inventory: {
      ...baseline.inventory,
      ...(currentState.inventory || {}),
      food: Math.max(currentState.inventory?.food ?? 2, 2),
      water: Math.max(currentState.inventory?.water ?? 2, 2),
      medicine: Math.max(currentState.inventory?.medicine ?? 1, 1),
      scrap: Math.max(currentState.inventory?.scrap ?? 5, 5),
    },
    flags: {
      ...currentState.flags,
      ...baseline.flags,
    },
    routeHistory: [
      ...(currentState.routeHistory || []),
      {
        nodeId: startNodeId,
        nodeTitle: `Chapter Jump: ${targetChapter}`,
        choiceText: `Began journey at ${targetChapter}`,
        timestamp: Date.now(),
      },
    ],
  };
}
