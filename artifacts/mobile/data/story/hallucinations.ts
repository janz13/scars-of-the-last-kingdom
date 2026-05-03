import type { StoryNode } from '../types';

// ══════════════════════════════════════════════════════════════════════════════
//  HALLUCINATION NODES
//
//  These nodes are injected mid-play when corruption is high (≥ 70).
//  They are NOT reachable through normal story navigation.
//
//  IMPORTANT: All choices use nextNode: '__return__' — a sentinel that
//  GameContext resolves to state.pendingReturnNodeId (the real node the
//  player was at before the hallucination fired).
//
//  Effects must include removeFlags: ['halluc_active'] so GameContext
//  knows the hallucination is over.
// ══════════════════════════════════════════════════════════════════════════════

export const HALLUCINATION_NODES: StoryNode[] = [
  // ── Hallucination 1: The Mark Speaks ──────────────────────────────────────
  {
    id: 'halluc_mark_speaks',
    chapter: 'Vision',
    title: 'The Mark Speaks',
    location: 'Somewhere That Is Not Here',
    imageKey: 'relic_engine_room',
    text:
      'The corridor is wrong. The walls are too far apart, then too close, then breathing. The mark on your wrist is lit from inside — amber, then violet, then a colour you have no name for.\n\nA voice arrives without a mouth. It does not speak words so much as drop them directly into the part of your mind that processes shame.\n\n"You are not the first to carry this. The others lasted longer."\n\nYou look at your hand. For a moment — three seconds, maybe five — you cannot remember your name. Then the corridor snaps back into shape and the voice is gone and the mark is just scar tissue again.',
    dialogue: 'The others lasted longer.',
    choices: [
      {
        id: 'halluc_mark_speaks_c1',
        text: 'Force yourself back. This is not real.',
        nextNode: '__return__',
        effects: {
          morale: -3,
          corruption: 1,
          removeFlags: ['halluc_active'],
        },
        flavorText: 'It felt real.',
      },
      {
        id: 'halluc_mark_speaks_c2',
        text: 'Listen. Try to understand what it wants.',
        nextNode: '__return__',
        effects: {
          corruption: 3,
          morale: 2,
          removeFlags: ['halluc_active'],
        },
        flavorText: '+3 Corruption. The mark rewards attention.',
      },
    ],
  },

  // ── Hallucination 2: The Dead Speak ───────────────────────────────────────
  {
    id: 'halluc_the_dead_speak',
    chapter: 'Vision',
    title: 'The Dead Speak',
    location: 'A Place You Cannot Leave',
    imageKey: 'chalk_map_wall',
    text:
      'They are standing in the tunnel. Not all at once — they arrive in sequence, each one stepping out of the dark exactly as you remember them. Some you recognise. Some you recognise but cannot name. Some are strangers whose faces you must have seen once in a crowd.\n\nNone of them are angry. That is the worst part.\n\nOne of them — a child, face chalk-grey, eyes that are simply absent — raises a hand and points not at you but at the mark on your wrist. The others follow the gesture.\n\n"You kept going," the child says. "That is the part we cannot forgive."',
    dialogue: 'You kept going. That is the part we cannot forgive.',
    choices: [
      {
        id: 'halluc_dead_c1',
        text: '"I did what I had to."',
        nextNode: '__return__',
        effects: {
          morale: -5,
          removeFlags: ['halluc_active'],
        },
        flavorText: 'You almost believe it.',
      },
      {
        id: 'halluc_dead_c2',
        text: '"I am sorry."',
        nextNode: '__return__',
        effects: {
          morale: 2,
          corruption: 2,
          removeFlags: ['halluc_active'],
        },
        flavorText: 'The mark seems to approve of guilt.',
      },
      {
        id: 'halluc_dead_c3',
        text: 'Close your eyes and wait for them to leave.',
        nextNode: '__return__',
        effects: {
          morale: -2,
          removeFlags: ['halluc_active'],
        },
        flavorText: 'They wait longer than you do.',
      },
    ],
  },

  // ── Hallucination 3: The Throne ───────────────────────────────────────────
  {
    id: 'halluc_throne_vision',
    chapter: 'Vision',
    title: 'The Throne',
    location: 'The City as It Could Be',
    imageKey: 'relic_engine_room',
    text:
      'You are sitting somewhere high.\n\nThe city is below. Not ruined — rebuilt, but in ways that feel wrong: the towers too straight, the streets too clean, the people moving in patterns that are orderly enough to be rehearsed. You can see the mark\'s light reflected in every window, every puddle, every upturned face.\n\nThe throne is made of something that used to be architecture. You cannot tell what you are holding in your left hand. You do not want to look.\n\nA version of yourself that is taller and colder stands behind you. It bends down and whispers something. When you return to the tunnel, you will not be able to remember the words — only the sensation of agreement.',
    dialogue: null as unknown as string,
    choices: [
      {
        id: 'halluc_throne_c1',
        text: 'Stand up. Push it away.',
        nextNode: '__return__',
        effects: {
          morale: 3,
          corruption: -1,
          removeFlags: ['halluc_active'],
        },
        flavorText: 'The vision recoils. It was not expecting refusal.',
      },
      {
        id: 'halluc_throne_c2',
        text: 'Stay in the vision a moment longer.',
        nextNode: '__return__',
        effects: {
          corruption: 4,
          morale: -1,
          removeFlags: ['halluc_active'],
        },
        flavorText: '+4 Corruption. The city below you seems grateful.',
      },
    ],
  },
];
