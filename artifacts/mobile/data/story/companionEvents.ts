import type { StoryNode } from '../types';

// ══════════════════════════════════════════════════════════════════════════════
//  COMPANION EVENT NODES
//
//  These are interstitial story nodes that fire between normal story beats
//  when specific companion relationship conditions are met.
//
//  Rules:
//  - All choices use nextNode: '__return__' to resume the real story.
//  - Effects must include removeFlags: ['companion_event_active'].
//  - Each event sets a '<id>_seen' flag to prevent it firing again.
//  - The 'companion_event_active' flag is set by GameContext before redirect.
//  - Events use chapter: 'Interlude' and location matching the current mood.
//
//  HOW TO ADD A NEW EVENT:
//  1. Write the node below — use nextNode: '__return__' on all choices.
//  2. Add the trigger condition in logic/companionSystem.ts.
//  3. The node is automatically registered via companionEvents spread in index.ts.
// ══════════════════════════════════════════════════════════════════════════════

export const COMPANION_EVENT_NODES: StoryNode[] = [

  // ════════════════════════════════════════════════════════════════════════════
  //  MIRA EVENTS
  // ════════════════════════════════════════════════════════════════════════════

  // ── Mira Event 1: Opens Up ─────────────────────────────────────────────────
  {
    id: 'mira_event_opens_up',
    chapter: 'Interlude',
    title: 'What She Carried Out',
    location: 'A tunnel junction — somewhere between where you were and where you\'re going',
    imageKey: 'hidden_clinic',
    speaker: 'Mira',
    text:
      'She stops walking. Not dramatically — just stops, and turns, and looks at you in a way that has clearly been building for a while.\n\nYou wait.\n\n"I was Last Archive," she says. "Before the collapse. Not a researcher — an extraction specialist. My job was to get texts out of places that were about to stop existing. I got good at moving fast and not asking what I was carrying."\n\nShe pauses. The tunnel breathes around both of you.\n\n"I knew about the marks three years before the Blackout. I knew what they were being designed for. And I didn\'t tell anyone who wasn\'t already in the room." She holds your gaze. "I am telling you now."',
    dialogue: 'I knew what they were being designed for. I am telling you now.',
    choices: [
      {
        id: 'mira_opens_up_c1',
        text: '"Tell me the rest. All of it."',
        nextNode: '__return__',
        effects: {
          miraTrust: 1,
          morale: 2,
          setFlags: ['mira_event_opens_up_seen', 'mira_shared_archive_secret', 'mira_knows_mark_origin'],
          removeFlags: ['companion_event_active'],
        },
        flavorText: '+1 Mira Trust. She unlocks what she knows about the mark.',
      },
      {
        id: 'mira_opens_up_c2',
        text: '"You don\'t have to explain yourself to me."',
        nextNode: '__return__',
        effects: {
          miraTrust: 2,
          morale: 3,
          setFlags: ['mira_event_opens_up_seen', 'mira_shared_archive_secret', 'mira_feels_accepted'],
          removeFlags: ['companion_event_active'],
        },
        flavorText: '+2 Mira Trust. She needed to hear this more than she knew.',
      },
      {
        id: 'mira_opens_up_c3',
        text: '"Why are you telling me now?"',
        nextNode: '__return__',
        effects: {
          miraTrust: 1,
          setFlags: ['mira_event_opens_up_seen', 'mira_shared_archive_secret'],
          removeFlags: ['companion_event_active'],
        },
        flavorText: 'She says: "Because you saved them. That matters."',
      },
    ],
  },

  // ── Mira Event 2: Corruption Warning ──────────────────────────────────────
  {
    id: 'mira_event_corruption_warning',
    chapter: 'Interlude',
    title: 'The Mark is Changing You',
    location: 'A rest stop — a platform alcove with a functioning emergency light',
    imageKey: 'chalk_map_wall',
    speaker: 'Mira',
    text:
      'She is already watching the mark when you notice she\'s watching it. She doesn\'t look away.\n\n"I\'ve seen three people carry marks like yours," she says. "The Archive had case files. Two of them stopped being recognisable as themselves by the time it reached forty percent saturation. One of them I knew personally."\n\nShe\'s looking at yours. You can see her calculating.\n\n"You\'re not there yet. But I can see the direction."',
    dialogue: 'You\'re not there yet. But I can see the direction.',
    choices: [
      {
        id: 'mira_corruption_c1',
        text: '"I know. I\'m trying to hold the line."',
        nextNode: '__return__',
        effects: {
          miraTrust: 1,
          morale: 1,
          setFlags: ['mira_event_corruption_warning_seen', 'mira_knows_corruption_status'],
          removeFlags: ['companion_event_active'],
        },
        flavorText: 'She nods. She keeps watching.',
      },
      {
        id: 'mira_corruption_c2',
        text: '"What happened to the one you knew personally?"',
        nextNode: '__return__',
        effects: {
          miraTrust: 1,
          morale: -1,
          setFlags: ['mira_event_corruption_warning_seen', 'mira_knows_corruption_status', 'mira_shared_grief'],
          removeFlags: ['companion_event_active'],
        },
        flavorText: 'A long pause. Then: "He stopped answering to his name."',
      },
      {
        id: 'mira_corruption_c3',
        text: '"It\'s part of me now. That\'s not something I can undo."',
        nextNode: '__return__',
        effects: {
          miraTrust: -1,
          corruption: 2,
          setFlags: ['mira_event_corruption_warning_seen', 'mira_worried_about_player'],
          removeFlags: ['companion_event_active'],
        },
        flavorText: 'She goes quiet. She doesn\'t agree, but she doesn\'t push.',
        requirements: { corruption: 35 },
      },
    ],
  },

  // ── Mira Event 3: Pulls Away ───────────────────────────────────────────────
  {
    id: 'mira_event_pulls_away',
    chapter: 'Interlude',
    title: 'The Space Between Us',
    location: 'A collapsed access tunnel — the long way around',
    imageKey: 'flooded_platform',
    speaker: 'Mira',
    text:
      'She has been three steps behind you for the last hour. Not dragging — measured. When you stop, she stops far enough back that the gap has a name.\n\n"I need you to tell me something," she says. No preamble. "The things you\'ve been choosing — I need to know if that\'s who you\'re becoming or if it\'s who you\'ve always been and I wasn\'t paying attention."\n\nShe is not asking to hurt you. She\'s asking because she needs to decide something.',
    dialogue: 'I need to know if that\'s who you\'re becoming or if it\'s who you\'ve always been.',
    choices: [
      {
        id: 'mira_pulls_away_c1',
        text: '"The choices I\'ve made kept us alive. That\'s all they were."',
        nextNode: '__return__',
        effects: {
          miraTrust: 1,
          setFlags: ['mira_event_pulls_away_seen'],
          removeFlags: ['companion_event_active'],
        },
        flavorText: 'She accepts this — provisionally.',
      },
      {
        id: 'mira_pulls_away_c2',
        text: '"I don\'t know. I think something is shifting and I can\'t stop it."',
        nextNode: '__return__',
        effects: {
          miraTrust: 2,
          morale: -2,
          setFlags: ['mira_event_pulls_away_seen', 'mira_player_honest_about_corruption'],
          removeFlags: ['companion_event_active'],
        },
        flavorText: '+2 Mira Trust. Honesty costs something. She knows it cost you.',
      },
      {
        id: 'mira_pulls_away_c3',
        text: '"Maybe you shouldn\'t follow me if that\'s how you feel."',
        nextNode: '__return__',
        effects: {
          miraTrust: -2,
          morale: -3,
          setFlags: ['mira_event_pulls_away_seen', 'mira_pull_away_critical'],
          removeFlags: ['companion_event_active'],
        },
        flavorText: 'She stands still for a long moment. Then follows anyway. That\'s worse.',
      },
    ],
  },

  // ── Mira Event 4: Sacrifice Offer ─────────────────────────────────────────
  {
    id: 'mira_event_sacrifice_offer',
    chapter: 'Interlude',
    title: 'If It Comes to It',
    location: 'An empty platform — the kind that was once a shelter',
    imageKey: 'hidden_clinic',
    speaker: 'Mira',
    text:
      'She sits across from you in the dark and says it the way people say things they\'ve rehearsed until the words stopped feeling dangerous.\n\n"I\'ve been thinking about the Archive door. What it might take to open it. What you might need that isn\'t — resources, or access codes, or faction alignment."\n\nShe looks at the mark on your wrist. Then at you.\n\n"If it comes to it. If the door asks for something I can give. I want you to know that I have already made the decision. I made it a while ago. I am telling you so it is not a surprise."\n\nShe uses the word \'if\' very carefully.',
    dialogue: 'I want you to know that I have already made the decision.',
    choices: [
      {
        id: 'mira_sacrifice_c1',
        text: '"I won\'t let it come to that."',
        nextNode: '__return__',
        effects: {
          miraTrust: 1,
          morale: 3,
          setFlags: ['mira_event_sacrifice_offer_seen'],
          removeFlags: ['companion_event_active'],
        },
        flavorText: 'She nods. She doesn\'t believe you. But she wanted to hear it.',
      },
      {
        id: 'mira_sacrifice_c2',
        text: '"I know. I\'ll carry that."',
        nextNode: '__return__',
        effects: {
          miraTrust: 2,
          morale: -1,
          setFlags: ['mira_event_sacrifice_offer_seen', 'mira_sacrifice_willing', 'mira_sacrifice_acknowledged'],
          removeFlags: ['companion_event_active'],
        },
        flavorText: '+2 Mira Trust. She exhales. This is what she needed to hear.',
      },
      {
        id: 'mira_sacrifice_c3',
        text: '"You don\'t have to be the one who pays for this."',
        nextNode: '__return__',
        effects: {
          miraTrust: 1,
          morale: 2,
          setFlags: ['mira_event_sacrifice_offer_seen', 'mira_sacrifice_willing'],
          removeFlags: ['companion_event_active'],
        },
        flavorText: 'She smiles — a small one. "I know. That\'s why I\'m choosing it."',
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════════════════
  //  CAIN EVENTS
  // ════════════════════════════════════════════════════════════════════════════

  // ── Cain Event 1: Respect Earned ──────────────────────────────────────────
  {
    id: 'cain_event_respect_earned',
    chapter: 'Interlude',
    title: 'The Ledger',
    location: 'A maintenance corridor — Cain is cleaning his weapon',
    imageKey: 'bone_turnstile',
    speaker: 'Cain',
    text:
      'He doesn\'t announce it. You come back from wherever you were and he is sitting with his weapon on his knees and he says one word while he reassembles the mechanism.\n\n"Capable."\n\nThat\'s all. He goes back to the mechanism. The word sits in the space between you.\n\nWith Cain, this is a speech.',
    dialogue: 'Capable.',
    choices: [
      {
        id: 'cain_respect_c1',
        text: '"From you, that means something."',
        nextNode: '__return__',
        effects: {
          cainTrust: 1,
          morale: 2,
          setFlags: ['cain_event_respect_earned_seen', 'cain_acknowledged_player_skill'],
          removeFlags: ['companion_event_active'],
        },
        flavorText: 'He doesn\'t respond. But his posture changes slightly.',
      },
      {
        id: 'cain_respect_c2',
        text: '"I\'m still alive. So are you."',
        nextNode: '__return__',
        effects: {
          cainTrust: 1,
          morale: 1,
          setFlags: ['cain_event_respect_earned_seen'],
          removeFlags: ['companion_event_active'],
        },
        flavorText: 'He almost smiles. "That\'s the only metric that matters."',
      },
      {
        id: 'cain_respect_c3',
        text: '"What changed your assessment?"',
        nextNode: '__return__',
        effects: {
          cainTrust: 1,
          setFlags: ['cain_event_respect_earned_seen', 'cain_opened_about_assessment'],
          removeFlags: ['companion_event_active'],
        },
        flavorText: 'He lists three specific decisions. Exactly three. He\'d been counting.',
      },
    ],
  },

  // ── Cain Event 2: Resource Warning ────────────────────────────────────────
  {
    id: 'cain_event_resource_warning',
    chapter: 'Interlude',
    title: 'The Inventory',
    location: 'A supply alcove — Cain has already counted everything',
    imageKey: 'candle_market',
    speaker: 'Cain',
    text:
      'He has already done the inventory by the time you arrive. Numbers. On a piece of chalk-rubbed tunnel wall. He points at them.\n\n"Food: two units. Water: one. Medicine: zero. Scrap: where it goes you tell me."\n\nHe lets the numbers speak for a moment.\n\n"I need to know if you understand what those numbers mean in terms of options available to us in the next twelve hours. Because I have been assuming you do, and the choices you\'ve been making suggest I may have been wrong."',
    dialogue: 'I have been assuming you understand. The choices suggest I may have been wrong.',
    choices: [
      {
        id: 'cain_resource_c1',
        text: '"I know. I\'ll be more careful with what we have."',
        nextNode: '__return__',
        effects: {
          cainTrust: 1,
          setFlags: ['cain_event_resource_warning_seen', 'cain_resource_acknowledged'],
          removeFlags: ['companion_event_active'],
        },
        flavorText: 'He nods. He erases the numbers.',
      },
      {
        id: 'cain_resource_c2',
        text: '"You\'re keeping track of my supplies?"',
        nextNode: '__return__',
        effects: {
          cainTrust: -1,
          setFlags: ['cain_event_resource_warning_seen', 'cain_rival'],
          removeFlags: ['companion_event_active'],
        },
        flavorText: '"Our supplies," he says. "If you die because you ran out, I have to carry you."',
      },
      {
        id: 'cain_resource_c3',
        text: '[Give scrap] "Here. Take what you think we need."',
        nextNode: '__return__',
        effects: {
          scrap: -2,
          cainTrust: 2,
          setFlags: ['cain_event_resource_warning_seen', 'cain_resource_respect_earned'],
          removeFlags: ['companion_event_active'],
        },
        flavorText: '+2 Cain Trust. He counts it before accepting it.',
        requirements: { scrap: 2 },
      },
    ],
  },

  // ── Cain Event 3: Hesitation Callout ──────────────────────────────────────
  {
    id: 'cain_event_hesitation',
    chapter: 'Interlude',
    title: 'The Cost of Waiting',
    location: 'A dead-end junction — Cain is standing with his back to you',
    imageKey: 'iron_saints_checkpoint',
    speaker: 'Cain',
    text:
      'He doesn\'t turn around.\n\n"The decision in the market. The one at the checkpoint. The one on the platform." He turns. "I counted three. Three times you had a clear path and you waited for a better option that didn\'t exist."\n\nHe is not angry. He is calculating.\n\n"I am still here. But I need you to understand that waiting has a price I cannot keep paying without knowing why."',
    dialogue: 'Three times you had a clear path and you waited.',
    choices: [
      {
        id: 'cain_hesitation_c1',
        text: '"I choose carefully. That\'s not the same as hesitating."',
        nextNode: '__return__',
        effects: {
          cainTrust: -1,
          setFlags: ['cain_event_hesitation_seen'],
          removeFlags: ['companion_event_active'],
        },
        flavorText: 'He doesn\'t agree. But he accepts the answer and moves on.',
      },
      {
        id: 'cain_hesitation_c2',
        text: '"You\'re right. I\'ll commit faster."',
        nextNode: '__return__',
        effects: {
          cainTrust: 1,
          setFlags: ['cain_event_hesitation_seen', 'cain_hesitation_acknowledged', 'player_hesitated_twice'],
          removeFlags: ['companion_event_active'],
        },
        flavorText: '+1 Cain Trust. He accepts this and says nothing more.',
      },
      {
        id: 'cain_hesitation_c3',
        text: '"Your job is to follow, not evaluate."',
        nextNode: '__return__',
        effects: {
          cainTrust: -2,
          setFlags: ['cain_event_hesitation_seen', 'cain_rival'],
          removeFlags: ['companion_event_active'],
        },
        flavorText: 'A very long silence. "That is not how I understood our arrangement," he says.',
      },
    ],
  },

  // ── Cain Event 4: Betrayal Warning ────────────────────────────────────────
  {
    id: 'cain_event_betrayal_warning',
    chapter: 'Interlude',
    title: 'The Other Offer',
    location: 'A communications junction — wires that stopped carrying signals years ago',
    imageKey: 'bone_turnstile',
    speaker: 'Cain',
    text:
      'He does not ease into it.\n\n"I have another offer on the table. The Iron Saints sent a message three days ago. They want the mark. They want you — for what they described as processing. I am telling you because you are still making decisions, and I think you should know the landscape."\n\nHe watches you process this.\n\n"The offer expires in approximately forty-eight hours. I have not responded. I am telling you that too."',
    dialogue: 'The offer expires in approximately forty-eight hours. I have not responded.',
    choices: [
      {
        id: 'cain_betrayal_c1',
        text: '"What will it take for you to stay with me?"',
        nextNode: '__return__',
        effects: {
          cainTrust: 2,
          setFlags: ['cain_event_betrayal_warning_seen', 'cain_given_chance_to_stay'],
          removeFlags: ['companion_event_active'],
        },
        flavorText: 'He considers. "Show me your choices matter. I\'ll stay."',
      },
      {
        id: 'cain_betrayal_c2',
        text: '[Pay him] "Whatever they\'re paying — I\'ll match it."',
        nextNode: '__return__',
        effects: {
          scrap: -3,
          cainTrust: 3,
          setFlags: ['cain_event_betrayal_warning_seen', 'cain_paid_to_stay'],
          removeFlags: ['companion_event_active'],
        },
        flavorText: '+3 Cain Trust. He accepts the scrap without ceremony.',
        requirements: { scrap: 3 },
      },
      {
        id: 'cain_betrayal_c3',
        text: '"I knew you\'d do this eventually."',
        nextNode: '__return__',
        effects: {
          cainTrust: -1,
          setFlags: ['cain_event_betrayal_warning_seen', 'cain_rival'],
          removeFlags: ['companion_event_active'],
        },
        flavorText: '"Everyone does," he says. "That is not an answer to the question."',
      },
      {
        id: 'cain_betrayal_c4',
        text: '"I have nothing to offer you."',
        nextNode: '__return__',
        effects: {
          cainTrust: -2,
          morale: -3,
          setFlags: ['cain_event_betrayal_warning_seen', 'cain_betrayal_likely'],
          removeFlags: ['companion_event_active'],
        },
        flavorText: 'He goes quiet for a long time. "Then I will make a decision soon."',
        requirements: { maxMorale: 25 },
      },
    ],
  },
];
