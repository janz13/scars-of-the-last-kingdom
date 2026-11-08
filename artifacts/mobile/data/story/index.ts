import type { StoryNode } from '../types';
import {
  getNodeSync,
  getLoadedNodes,
  getChapterForNode,
  loadChapter,
  isChapterLoaded,
  preloadNextChapter,
  ensureNodeLoaded,
  subscribeChapterLoaded,
} from './chapterLoader';
import { DICE_OUTCOME_NODES } from './diceOutcomes';

// Initially loaded story nodes (Prologue, Chapter 1, Dice Outcomes, Hallucinations, Companion Events)
export const STORY_NODES: StoryNode[] = getLoadedNodes();

export function getNodeById(id: string): StoryNode | undefined {
  const node = getNodeSync(id);
  if (!node) {
    const chapter = getChapterForNode(id);
    if (chapter && !isChapterLoaded(chapter)) {
      void loadChapter(chapter);
    }
  }
  return node;
}

export function getStartNodeId(): string {
  return 'prologue_start';
}

export {
  DICE_OUTCOME_NODES,
  loadChapter,
  preloadNextChapter,
  isChapterLoaded,
  ensureNodeLoaded,
  getChapterForNode,
  subscribeChapterLoaded,
};
