import type { GameState, NarrativeBlock, NarrativeVariantCondition, StoryNode } from '../data/types';

/**
 * Determines whether a companion is actively in the player's party and alive.
 * Requires live presence plus at least one recruitment/starting proof so
 * met-only encounters do not trigger party prose.
 */
export function isCompanionInParty(state: GameState, companion: 'mira' | 'cain'): boolean {
  const comp = state.companions?.[companion];
  if (!comp?.present || !comp?.alive) return false;
  return Boolean(
    state.flags?.[`${companion}_joins_party`] ||
      state.flags?.[`${companion}_recruited`] ||
      state.character?.startingCompanion === companion
  );
}

/**
 * Evaluates a declarative narrative condition against the current GameState.
 */
export function matchesNarrativeCondition(
  state: GameState,
  cond?: NarrativeVariantCondition
): boolean {
  if (!cond) return true;

  if (cond.miraPresent !== undefined) {
    if (isCompanionInParty(state, 'mira') !== cond.miraPresent) return false;
  }
  if (cond.cainPresent !== undefined) {
    if (isCompanionInParty(state, 'cain') !== cond.cainPresent) return false;
  }
  if (cond.flags?.length) {
    for (const f of cond.flags) {
      if (!state.flags?.[f]) return false;
    }
  }
  if (cond.blockedFlags?.length) {
    for (const f of cond.blockedFlags) {
      if (state.flags?.[f]) return false;
    }
  }
  if (cond.minCorruption !== undefined && (state.stats?.corruption ?? 0) < cond.minCorruption) {
    return false;
  }
  if (cond.maxCorruption !== undefined && (state.stats?.corruption ?? 0) >= cond.maxCorruption) {
    return false;
  }
  if (cond.classes?.length) {
    if (!state.character || !cond.classes.includes(state.character.characterClass)) return false;
  }
  if (cond.backgrounds?.length) {
    if (!state.character || !cond.backgrounds.includes(state.character.background)) return false;
  }

  return true;
}

function selectFirstMatchingBlock(blocks: NarrativeBlock[] | undefined, state: GameState): string | undefined {
  if (!blocks || blocks.length === 0) return undefined;
  let defaultBlock: NarrativeBlock | undefined;
  for (const block of blocks) {
    if (!block.when) {
      if (!defaultBlock) defaultBlock = block;
      continue;
    }
    if (matchesNarrativeCondition(state, block.when)) {
      return block.text;
    }
  }
  return defaultBlock?.text;
}

/**
 * Strips phantom companion references from legacy static prose when Mira or Cain
 * are not actively in the player's party.
 */
export function sanitizeLegacyCompanionProse(rawText: string, state: GameState): string {
  if (!rawText) return rawText;
  let txt = rawText;
  const miraInParty = isCompanionInParty(state, 'mira');
  const cainInParty = isCompanionInParty(state, 'cain');

  if (!miraInParty && !cainInParty) {
    txt = txt
      .replace(
        'Mira and Cain are not registered and therefore do not exist as far as the Saints are concerned, which is the safest kind of existence in this city. ',
        ''
      )
      .replace('Neither of them says anything about the thin sound', 'There is no obvious source for the thin sound')
      .replace(
        "Mira or Cain or both, depending on who came with you, settling the logistics of rest with the practiced efficiency of people who've done this before.",
        'you settle the logistics of rest alone with practiced, quiet efficiency.'
      );
  } else if (!miraInParty && cainInParty) {
    txt = txt
      .replace('Mira and Cain are not registered', 'Cain is not registered')
      .replace('Neither of them says anything about the thin sound', 'Cain says nothing about the thin sound')
      .replace(
        "Mira or Cain or both, depending on who came with you, settling the logistics of rest with the practiced efficiency of people who've done this before.",
        'Cain settles the perimeter and logistics of rest with practiced efficiency.'
      );
  } else if (miraInParty && !cainInParty) {
    txt = txt
      .replace('Mira and Cain are not registered', 'Mira is not registered')
      .replace('Neither of them says anything about the thin sound', 'Mira says nothing about the thin sound')
      .replace(
        "Mira or Cain or both, depending on who came with you, settling the logistics of rest with the practiced efficiency of people who've done this before.",
        'Mira settles the logistics of rest beside you with practiced efficiency.'
      );
  }

  if (!miraInParty) {
    txt = txt
      .replace('Mira points north, toward a clinic she knows. ', '')
      .replace('Mira tends to whatever needs tending. ', '')
      .replace(
        'Mira walks beside you with her hands empty and her face composed into the expression she uses when there is no good option and she is choosing not to make it worse by naming it. ',
        ''
      )
      .replace('Mira, beside you, counts her remaining medicine with her lips moving silently. ', '')
      .replace(', what Mira said by firelight', '')
      .replace('Mira is at your side in two seconds with the antiseptic. ', '')
      .replace('Mira calls your name three times. The engine answers.', 'The engine answers.')
      .replace("Mira's hand, which had been gripping your arm hard enough to leave marks, loosens.", '')
      .replace('Mira keeps close. ', '')
      .replace('Mira puts a hand on your arm and says nothing. You understand what she means. You proceed anyway. ', '')
      .replace("Mira doesn't look at you for the next ten minutes. ", '')
      .replace("Mira tries to stop it. She can't. ", '')
      .replace('Mira watches. Her expression is something that hasn\'t happened in a while: relief.', '')
      .replace('Mira, if she is still with you, has taken two steps back and is watching your face. ', '')
      .replace(
        'Mira lets out a breath she seems to have held for minutes, and Cain gives a single, approving nod. ',
        cainInParty ? 'Cain gives a single, approving nod. ' : ''
      );
  }

  if (!cainInParty) {
    txt = txt
      .replace('Cain points east. ', '')
      .replace("Cain sharpens things he doesn't have. ", '')
      .replace(
        'Cain has already moved to the right-side alcove. He is watching the timing.',
        'You move to the right-side alcove and watch the patrol timing.'
      )
      .replace('Cain is already ten paces ahead. ', '')
      .replace('Cain is watching the patrol patterns.', '')
      .replace(
        "You know this because Cain told you, quietly, before Mira started walking toward the papers queue.",
        "You spot the gap by timing the soldiers' rotation from the corner."
      )
      .replace('Cain reads the markings without touching them. ', '')
      .replace('Cain meets your eye and nods, once — a professional acknowledgment, nothing more. ', '')
      .replace("Cain doesn't try. ", '')
      .replace('Cain has not moved.', '')
      .replace(
        'Mira lets out a breath she seems to have held for minutes, and Cain gives a single, approving nod. ',
        miraInParty ? 'Mira lets out a breath she seems to have held for minutes. ' : ''
      );
  }

  return txt.replace(/ {2,}/g, ' ').trim();
}

/**
 * Resolves the final narration, dialogue, and speaker strings for a StoryNode, preferring
 * structured `narrativeBlocks` / `dialogueBlocks` when present and falling back to
 * sanitized `node.text` / `node.dialogue`, with solo speaker fallback after Chapter 1.
 */
export function resolveNodeNarrative(
  node: StoryNode | undefined,
  state: GameState
): { text: string; dialogue?: string; speaker?: string } {
  if (!node) return { text: '', dialogue: undefined, speaker: undefined };

  let speaker = node.speaker;
  let suppressedMissingCompanionSpeaker = false;
  if (node.chapter !== 'Prologue' && node.chapter !== 'Chapter 1') {
    if (speaker === 'Mira' && !isCompanionInParty(state, 'mira')) {
      speaker = 'Narrator';
      suppressedMissingCompanionSpeaker = true;
    } else if (speaker === 'Cain' && !isCompanionInParty(state, 'cain')) {
      speaker = 'Narrator';
      suppressedMissingCompanionSpeaker = true;
    }
  }

  const blockText = selectFirstMatchingBlock(node.narrativeBlocks, state);
  const text =
    blockText !== undefined ? blockText : sanitizeLegacyCompanionProse(node.text ?? '', state);

  const blockDialogue = selectFirstMatchingBlock(node.dialogueBlocks, state);
  const rawDialogue =
    blockDialogue !== undefined
      ? blockDialogue
      : node.dialogue && !suppressedMissingCompanionSpeaker
        ? sanitizeLegacyCompanionProse(node.dialogue, state)
        : undefined;
  const dialogue = rawDialogue && rawDialogue.trim().length > 0 ? rawDialogue : undefined;

  return { text, dialogue, speaker };
}

/**
 * Sanitizes ending descriptions when an unrecruited companion is mentioned in legacy flavor text.
 */
export function sanitizeEndingDescription(description: string | undefined, state: GameState): string {
  if (!description) return '';
  let desc = description;
  if (!isCompanionInParty(state, 'mira')) {
    desc = desc
      .replace('Mira walks with her hands empty. ', '')
      .replace('Mira calls your name three times. The engine answers.', 'The engine answers.');
  }
  if (!isCompanionInParty(state, 'cain')) {
    desc = desc.replace('Cain is already ten paces ahead. ', '');
  }
  return desc;
}
