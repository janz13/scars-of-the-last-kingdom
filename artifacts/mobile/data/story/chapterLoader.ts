import type { StoryNode } from '../types';
import { PROLOGUE_NODES } from './prologue';
import { CHAPTER_1_NODES } from './chapter1';
import { DICE_OUTCOME_NODES } from './diceOutcomes';
import { HALLUCINATION_NODES } from './hallucinations';
import { COMPANION_EVENT_NODES } from './companionEvents';

// ── Dynamic Import Table ──────────────────────────────────────────────────────
// Metro web bundler automatically creates split chunks for each dynamic import()
const CHAPTER_LOADERS: Record<string, () => Promise<{ [key: string]: any }>> = {
  'Chapter 2': () => import('./chapter2'),
  'Chapter 3': () => import('./chapter3'),
  'Chapter 4': () => import('./chapter4'),
  'Chapter 5': () => import('./chapter5'),
  'Chapter 6': () => import('./chapter6'),
  'Chapter 7': () => import('./chapter7'),
  'Chapter 8': () => import('./chapter8'),
  'Chapter 9': () => import('./chapter9'),
  'Chapter 10': () => import('./chapter10'),
  'Chapter 11': () => import('./chapter11'),
  'Chapter 12': () => import('./chapter12'),
  'Final Chapter 1': () => import('./finalChapter1'),
  'Final Chapter 2': () => import('./finalChapter2'),
  Epilogue: () => import('./epilogue'),
};

const CHAPTER_KEY_ALIASES: Record<string, string> = {
  'chapter 2': 'Chapter 2',
  chapter2: 'Chapter 2',
  'chapter 3': 'Chapter 3',
  chapter3: 'Chapter 3',
  'chapter 4': 'Chapter 4',
  chapter4: 'Chapter 4',
  'chapter 5': 'Chapter 5',
  chapter5: 'Chapter 5',
  'chapter 6': 'Chapter 6',
  chapter6: 'Chapter 6',
  'chapter 7': 'Chapter 7',
  chapter7: 'Chapter 7',
  'chapter 8': 'Chapter 8',
  chapter8: 'Chapter 8',
  'chapter 9': 'Chapter 9',
  chapter9: 'Chapter 9',
  'chapter 10': 'Chapter 10',
  chapter10: 'Chapter 10',
  'chapter 11': 'Chapter 11',
  chapter11: 'Chapter 11',
  'chapter 12': 'Chapter 12',
  chapter12: 'Chapter 12',
  'final chapter 1': 'Final Chapter 1',
  finalchapter1: 'Final Chapter 1',
  final_chapter1: 'Final Chapter 1',
  'final chapter 2': 'Final Chapter 2',
  finalchapter2: 'Final Chapter 2',
  final_chapter2: 'Final Chapter 2',
  epilogue: 'Epilogue',
  'epilogue: the response': 'Epilogue',
  epilogue_the_response: 'Epilogue',
  prologue: 'Prologue',
  'chapter 1': 'Chapter 1',
  chapter1: 'Chapter 1',
};

export function normalizeChapterName(name: string): string {
  const lower = name.trim().toLowerCase();
  return CHAPTER_KEY_ALIASES[lower] ?? name;
}

// ── In-Memory Cache ──────────────────────────────────────────────────────────
const NODE_MAP = new Map<string, StoryNode>();
const loadedChapters = new Set<string>();
const loadingPromises = new Map<string, Promise<StoryNode[]>>();
const listeners = new Set<(chapter: string, nodes: StoryNode[]) => void>();

function registerNodes(nodes: StoryNode[], chapterName?: string): void {
  for (const node of nodes) {
    NODE_MAP.set(node.id, node);
  }
  if (chapterName) {
    loadedChapters.add(chapterName);
  }
}

// Statically register initial bundle nodes for instantaneous launch
registerNodes(PROLOGUE_NODES, 'Prologue');
registerNodes(CHAPTER_1_NODES, 'Chapter 1');
registerNodes(DICE_OUTCOME_NODES, 'DiceOutcomes');
registerNodes(HALLUCINATION_NODES, 'Corruption');
registerNodes(COMPANION_EVENT_NODES, 'Interlude');

export interface ChapterLoader {
  loadChapter(chapterName: string): Promise<StoryNode[]>;
  preloadNextChapter(currentChapter: string): void;
  isChapterLoaded(chapterName: string): boolean;
  getNodeSync(id: string): StoryNode | undefined;
}

export function isChapterLoaded(chapterName: string): boolean {
  const norm = normalizeChapterName(chapterName);
  return loadedChapters.has(norm);
}

export function getNodeSync(id: string): StoryNode | undefined {
  return NODE_MAP.get(id);
}

export function getLoadedNodes(): StoryNode[] {
  return Array.from(NODE_MAP.values());
}

const EMPTY_NODES_PROMISE = Promise.resolve<StoryNode[]>([]);

export function loadChapter(chapterName: string): Promise<StoryNode[]> {
  const norm = normalizeChapterName(chapterName);

  if (loadingPromises.has(norm)) {
    return loadingPromises.get(norm)!;
  }

  const loader = CHAPTER_LOADERS[norm];
  if (!loader) {
    if (loadedChapters.has(norm)) {
      const existing = Array.from(NODE_MAP.values()).filter((n) => n.chapter === norm);
      const p = Promise.resolve(existing);
      loadingPromises.set(norm, p);
      return p;
    }
    console.warn(`[ChapterLoader] No loader found for chapter: "${chapterName}"`);
    return EMPTY_NODES_PROMISE;
  }

  const loadPromise = (async () => {
    try {
      const module = await loader();
      let nodes: StoryNode[] = [];
      for (const val of Object.values(module)) {
        if (Array.isArray(val) && val.length > 0 && typeof (val[0] as any)?.id === 'string') {
          nodes = val as StoryNode[];
          break;
        }
      }
      registerNodes(nodes, norm);
      listeners.forEach((listener) => {
        try {
          listener(norm, nodes);
        } catch (e) {
          console.error(e);
        }
      });
      return nodes;
    } catch (err) {
      loadingPromises.delete(norm);
      throw err;
    }
  })();

  loadingPromises.set(norm, loadPromise);
  return loadPromise;
}

// ── Next Chapter Preloader ───────────────────────────────────────────────────
const CHAPTER_SEQUENCE = [
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

export function preloadNextChapter(currentChapter: string): void {
  const norm = normalizeChapterName(currentChapter);
  const idx = CHAPTER_SEQUENCE.indexOf(norm);
  if (idx >= 0 && idx < CHAPTER_SEQUENCE.length - 1) {
    const nextChapter = CHAPTER_SEQUENCE[idx + 1];
    if (!isChapterLoaded(nextChapter)) {
      void loadChapter(nextChapter);
    }
  }
}

// ── Cross-Chapter Special Node Registry ──────────────────────────────────────
const CROSS_CHAPTER_NODE_MAP: Record<string, string> = {
  ending_glass_court_prisoner: 'Chapter 2',
};

// ── O(1) Prefix-Based Chapter Resolver ───────────────────────────────────────
export function getChapterForNode(nodeId: string): string | undefined {
  if (CROSS_CHAPTER_NODE_MAP[nodeId]) {
    return CROSS_CHAPTER_NODE_MAP[nodeId];
  }

  const cached = NODE_MAP.get(nodeId);
  if (cached) return cached.chapter;

  if (nodeId.startsWith('c2_') || nodeId.startsWith('chapter2_')) return 'Chapter 2';
  if (nodeId.startsWith('c3_') || nodeId.startsWith('chapter3_') || nodeId.startsWith('mb1_')) return 'Chapter 3';
  if (nodeId.startsWith('c4_') || nodeId.startsWith('chapter4_')) return 'Chapter 4';
  if (nodeId.startsWith('c5_') || nodeId.startsWith('chapter5_')) return 'Chapter 5';
  if (nodeId.startsWith('c6_') || nodeId.startsWith('chapter6_') || nodeId.startsWith('mb2_')) return 'Chapter 6';
  if (nodeId.startsWith('c7_') || nodeId.startsWith('chapter7_')) return 'Chapter 7';
  if (nodeId.startsWith('c8_') || nodeId.startsWith('chapter8_') || nodeId.startsWith('mb3_')) return 'Chapter 8';
  if (nodeId.startsWith('c9_') || nodeId.startsWith('chapter9_')) return 'Chapter 9';
  if (nodeId.startsWith('c10_') || nodeId.startsWith('chapter10_') || nodeId.startsWith('mb4_')) return 'Chapter 10';
  if (nodeId.startsWith('c11_') || nodeId.startsWith('chapter11_')) return 'Chapter 11';
  if (nodeId.startsWith('c12_') || nodeId.startsWith('chapter12_')) return 'Chapter 12';
  if (nodeId.startsWith('fc1_') || nodeId.startsWith('final_chapter1_')) return 'Final Chapter 1';
  if (nodeId.startsWith('fc2_') || nodeId.startsWith('final_chapter2_')) return 'Final Chapter 2';
  if (nodeId.startsWith('epi_') || nodeId.startsWith('epilogue_')) return 'Epilogue';
  if (nodeId.startsWith('prologue_')) return 'Prologue';
  if (nodeId.startsWith('chapter1_')) return 'Chapter 1';

  if (
    nodeId.startsWith('dice_') ||
    nodeId.startsWith('halluc_') ||
    nodeId.startsWith('mira_event_') ||
    nodeId.startsWith('cain_event_') ||
    nodeId.startsWith('ending_')
  ) {
    return undefined;
  }

  return 'Chapter 1';
}

export async function ensureNodeLoaded(nodeId: string): Promise<StoryNode | undefined> {
  const existing = getNodeSync(nodeId);
  if (existing) return existing;

  const chapter = getChapterForNode(nodeId);
  if (chapter && !isChapterLoaded(chapter)) {
    await loadChapter(chapter);
  }
  return getNodeSync(nodeId);
}

export function subscribeChapterLoaded(
  listener: (chapter: string, nodes: StoryNode[]) => void
): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export const chapterLoader: ChapterLoader = {
  loadChapter,
  preloadNextChapter,
  isChapterLoaded,
  getNodeSync,
};
