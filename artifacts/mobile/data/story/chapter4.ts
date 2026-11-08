import type { StoryNode } from '../types';

// ══════════════════════════════════════════════════════════════════════════════
//  CHAPTER 4 — SAINTS IN IRON
//
//  Theme: Faith, punishment, order, and cruelty disguised as salvation.
//         The Iron Saints do not see themselves as cruel. That is the problem.
//
//  Locations:
//    Iron Checkpoint · Chapel of Chains · Purification Yard · Barracks of Ash
//    Confession Hall · Saint Furnace · Prison Carts · War Shrine
//
//  Key NPCs:
//    Saint Veyra        — commander. A true believer.
//    Brother Malrec     — priest-soldier. Cruelty as doctrine.
//    Ashen Toma         — prisoner. Knows what the mark is, not just what it opens.
//    Sister Orin        — Iron Saints medic. Kind. Conflicted. Complicit.
//    The Bellkeeper     — relic-touched executioner. Speaks in bell-tones.
//
//  Routes (10):
//    1. Join the Iron Saints (Barracks brand route)
//    2. Infiltrate the Iron Saints (Shadow Broker / Tactician)
//    3. Rescue prisoners (Prison Carts + Purification Yard)
//    4. Betray Mira to gain Iron Saints favor
//    5. Cain reconnects with military past (loyalty fork)
//    6. Challenge Saint Veyra (War Shrine / dice)
//    7. Accept purification — reduce corruption at terrible cost
//    8. Use the wrist mark to break the Saint Furnace
//    9. Secretly help Hollow Children escape
//   10. Forgotten Scholar doctrine route
//
//  Starting node:  chapter4_start  (follows chapter3_complete flag)
//  Chapter end:    c4_chapter4_end
//
//  New image keys:
//    iron_checkpoint, chapel_of_chains, purification_yard, barracks_of_ash,
//    confession_hall, saint_furnace, prison_carts, war_shrine
// ══════════════════════════════════════════════════════════════════════════════

export const CHAPTER_4_NODES: StoryNode[] = [

  // ════════════════════════════════════════════════════════════════════════════
  //  CHAPTER ENTRY
  // ════════════════════════════════════════════════════════════════════════════

  {
    id: 'chapter4_start',
    chapter: 'Chapter 4',
    title: 'Saints in Iron',
    location: 'Surface Access Shaft — Sub-Level 3 Exit',
    imageKey: 'iron_checkpoint',
    text: `You come up through the access shaft at 0300, or near enough. The air above is different — colder, carrying the chemical smell that has replaced weather since the Blackout. You had a thirty-second window between patrol rotations according to Lio's chalk map. You use twenty-two of them. The Iron Saints are not subtle. Their checkpoint is lit by arc-powered floodlights — actual power, drawn from somewhere the metro hasn't sourced — and the wall they built across what used to be a market square is uniform in a way that announces construction rather than improvisation. They planned to be here. They expected to stay. On the arch above the checkpoint gate: a chain and a flame, pressed in iron relief. The chain is holding the flame up, not down. You note this. The mark on your wrist pulses once and holds. Whatever the Saints built here, it is old enough to have its own resonance.`,
    effectsOnEnter: { hunger: -1, thirst: -2, setFlags: ['chapter4_begun'] },
    choices: [
      {
        id: 'c4_start_approach',
        text: 'Move toward the checkpoint. Identify yourself before they identify you.',
        nextNode: 'c4_approach_checkpoint',
        effects: { morale: 1 },
      },
      {
        id: 'c4_start_observe',
        text: 'Observe the checkpoint from cover before deciding how to approach.',
        nextNode: 'c4_approach_checkpoint',
        effects: { intelligence: 1 },
      },
      {
        id: 'c4_start_cain_advice',
        text: '[Cain present] Ask Cain what he knows about this checkpoint.',
        nextNode: 'c4_approach_checkpoint',
        requirements: { cainPresent: true },
        effects: { cainTrust: 1, setFlags: ['cain_knows_checkpoint'] },
        isHidden: true,
      },
    ],
  },

  // ── IRON CHECKPOINT ─────────────────────────────────────────────────────────

  {
    id: 'c4_approach_checkpoint',
    chapter: 'Chapter 4',
    title: 'The Teeth of the Order',
    location: 'Iron Checkpoint — Outer Approach',
    imageKey: 'iron_checkpoint',
    text: `Three guards at the gate. Six more on the wall above. Brother Malrec is the one in the middle — you will learn his name later but you can identify his rank now from the additional chain links worn across the chest, over the grey-and-iron uniform that is too well maintained for a city that stopped laundering things three years ago. He has a ledger. He is writing in it before you reach the gate, which means he noted you before you noticed him. That kind of attentiveness is either reassuring or terrifying. He looks up. His face is the face of a man who has decided what you are already, and is filling in the form to confirm it.\n\n"Name. Class. Last known location. Purpose of transit." He says it the way someone says a prayer — rote, precise, and absolutely certain of the answer he will receive.`,
    effectsOnEnter: { setFlags: ['checkpoint_reached'] },
    choices: [
      {
        id: 'c4_ch_submit',
        text: 'Answer honestly. Submit to processing. You need to get inside.',
        nextNode: 'c4_checkpoint_submit',
        effects: { ironSaints: 5, morale: -1 },
      },
      {
        id: 'c4_ch_sneak',
        text: '[Roll dice — Agility] There\'s a gap in the wall section east of the gate. Slip through.',
        nextNode: 'c4_checkpoint_sneak_attempt',
        diceCheck: {
          stat: 'agility',
          difficulty: 13,
          diceType: 'd20',
          successNode: 'c4_checkpoint_cleared',
          failureNode: 'c4_checkpoint_captured',
        },
      },
      {
        id: 'c4_ch_shadow',
        text: '[Shadow Broker] You have walked through harder checkpoints in worse conditions. Read the rotation. Move on their blind spot.',
        nextNode: 'c4_checkpoint_cleared',
        requirements: { classes: ['shadow_broker'] },
        effects: { setFlags: ['shadow_slipped_checkpoint'] },
        isHidden: true,
      },
      {
        id: 'c4_ch_cain_bridge',
        text: '[Exiled Soldier + Cain] Cain steps forward. He uses a different name. The guards straighten slightly.',
        nextNode: 'c4_checkpoint_cain_bridge',
        requirements: { cainPresent: true, backgrounds: ['exiled_soldier'] },
        effects: { cainTrust: 1, ironSaints: 8 },
        isHidden: true,
      },
      {
        id: 'c4_ch_fight',
        text: '[Roll dice — Strength] Three guards. Six on the wall. You have been in worse odds.',
        nextNode: 'c4_checkpoint_fight_attempt',
        diceCheck: {
          stat: 'strength',
          difficulty: 13,
          diceType: 'd20',
          successNode: 'c4_checkpoint_cleared',
          failureNode: 'c4_checkpoint_captured',
        },
      },
    ],
  },

  {
    id: 'c4_checkpoint_submit',
    chapter: 'Chapter 4',
    title: 'Processing',
    location: 'Iron Checkpoint — Registration Desk',
    imageKey: 'iron_checkpoint',
    text: `Malrec writes for longer than the information warrants. The mark is not visible under your sleeve — you made sure of that — but his eyes track the wrist anyway, as if he can sense it through the fabric. You wonder if all Iron Saints develop this or if it is specific to those who handle the mark records. He closes the ledger. "You will be escorted to the Chapel for orientation. Transit through the settlement requires chain certification. Chain certification requires attendance at the evening sermon." He says this the way people say things they know you will not refuse. Behind you, the gate closes. Ahead: the Chapel of Chains. The arc-lights make the street look like a surgery.`,
    effectsOnEnter: { setFlags: ['submitted_to_saints'] },
    choices: [
      {
        id: 'c4_cs_chapel',
        text: 'Follow the escort to the Chapel. Observe everything.',
        nextNode: 'c4_chapel_arrive',
        effects: { intelligence: 1 },
      },
      {
        id: 'c4_cs_slip',
        text: 'Comply on the surface. Find a reason to divert before you reach the Chapel.',
        nextNode: 'c4_checkpoint_cleared',
        effects: { agility: 1, ironSaints: -5 },
      },
    ],
  },

  {
    id: 'c4_checkpoint_sneak_attempt',
    chapter: 'Chapter 4',
    title: 'The Gap in the Wall',
    location: 'Iron Checkpoint — Eastern Wall Section',
    imageKey: 'iron_checkpoint',
    text: `The gap is where you estimated: a section of wall where the original construction abutted a pre-collapse concrete pillar, leaving a vertical space three hand-widths wide and taller than you need. The guards on the wall rotate every four minutes based on what you observed. You have ninety seconds. You begin moving.`,
    effectsOnEnter: {},
    choices: [
      { id: 'c4_sneak_commit', text: 'Commit to the gap. Move now.', nextNode: 'c4_checkpoint_cleared' },
    ],
  },

  {
    id: 'c4_checkpoint_fight_attempt',
    chapter: 'Chapter 4',
    title: 'This Will Cost Something',
    location: 'Iron Checkpoint — Gate',
    imageKey: 'iron_checkpoint',
    text: `Malrec reaches for his signal bell before your hand moves. He has done this before. The guards on the wall are already repositioning as you commit. The first two go down — the weight of your choice and the mark's warmth pushing through your arm — but the third catches you in the back with the weighted end of a baton, and the six on the wall have arc-rifles aimed at your skull before the second guard finishes hitting the ground. You made your point. You did not make enough of it.`,
    effectsOnEnter: { health: -15, morale: -3 },
    choices: [
      {
        id: 'c4_fight_surrender',
        text: 'Stop. You are outnumbered. Stop.',
        nextNode: 'c4_checkpoint_captured',
        effects: { health: -5 },
      },
    ],
  },

  {
    id: 'c4_checkpoint_cain_bridge',
    chapter: 'Chapter 4',
    title: 'Iron Memory',
    location: 'Iron Checkpoint — Gate',
    imageKey: 'iron_checkpoint',
    text: `Cain steps to the front. He uses a designation — not a name, a designation — and something in the way he says it makes two of the guards' shoulders change. Malrec's pen stops. He looks at Cain the way you look at something you had filed away under "accounted for." "Unit Six," he says. Not a question. Cain does not confirm or deny. "The person behind you," Malrec continues. "Are they your responsibility?" Cain turns to look at you for exactly long enough to make the answer ambiguous. Then: "Yes." The gate opens. Inside: the sound of the settlement and the smell of iron and the weight of whatever Cain just agreed to.`,
    effectsOnEnter: { ironSaints: 10, setFlags: ['cain_vouched_for_player', 'cain_military_past_active'] },
    choices: [
      {
        id: 'c4_cb_ask_cain',
        text: 'Inside, quietly: "Unit Six. Tell me what that means."',
        nextNode: 'c4_barracks_arrive',
        effects: { cainTrust: -1 },
      },
      {
        id: 'c4_cb_say_nothing',
        text: 'Say nothing. File it. He\'ll tell you when he\'s ready.',
        nextNode: 'c4_barracks_arrive',
        effects: { cainTrust: 2 },
      },
    ],
  },

  {
    id: 'c4_checkpoint_cleared',
    chapter: 'Chapter 4',
    title: 'Inside the Wall',
    location: 'Iron Saints Settlement — Inner Threshold',
    imageKey: 'iron_checkpoint',
    text: `You are inside. The settlement is larger than it looked from the approach. The Iron Saints have built something here — not improvised, not salvaged, but constructed. Uniform structures. Patrol routes that do not cross each other. A chain-and-flame emblem on every wall at eye level, consistent in size and placement. Someone with a methodology has been here long enough to apply it thoroughly. To your left: the Chapel of Chains, its iron doors standing open, light spilling amber through chain-hung glass. To your right: the Barracks, low and functional. Ahead and deeper: a yard, and beyond it, a hall. The mark is warm and steady. It is orienting toward something in this settlement, and it is patient enough to wait for you to move toward it.`,
    effectsOnEnter: { setFlags: ['inside_settlement'] },
    choices: [
      {
        id: 'c4_cl_chapel',
        text: 'The Chapel first. Know what they believe before you decide what to do.',
        nextNode: 'c4_chapel_arrive',
      },
      {
        id: 'c4_cl_barracks',
        text: 'The Barracks. Soldiers talk more than priests.',
        nextNode: 'c4_barracks_arrive',
      },
      {
        id: 'c4_cl_yard',
        text: 'The Purification Yard. You heard movement — people being moved against their will.',
        nextNode: 'c4_yard_arrive',
      },
    ],
  },

  {
    id: 'c4_checkpoint_captured',
    chapter: 'Chapter 4',
    title: 'Property of the Order',
    location: 'Iron Checkpoint — Processing Hold',
    imageKey: 'iron_checkpoint',
    text: `They are efficient. The restraints are not punitive — they are measured, designed to hold without bruising, which is a kind of cruelty that takes more practice than the other kind. Malrec does not gloat. He completes the paperwork. Your mark is discovered when they process your sleeve — there is a protocol for this, a specific form, which suggests they have done this before. "Category One," says Malrec. He does not look up from the form. "Chapel, then Confession Hall, then Purification." He says it the way you say a schedule. You are a schedule item. Mira, if she was with you, is registered separately and placed in the Prison Carts. Cain is not found — which is either skill or luck and may be both.`,
    effectsOnEnter: { setFlags: ['player_captured_checkpoint', 'mark_discovered'], ironSaints: -10 },
    choices: [
      {
        id: 'c4_cap_comply',
        text: 'Comply. You learn more from inside than fighting every step.',
        nextNode: 'c4_chapel_arrive',
        effects: { morale: -2 },
      },
      {
        id: 'c4_cap_ask_mira',
        text: 'Ask where Mira was taken.',
        nextNode: 'c4_carts_arrive',
        requirements: { miraPresent: true },
        effects: { miraTrust: 1, ironSaints: -5 },
      },
    ],
  },

  // ── CHAPEL OF CHAINS ────────────────────────────────────────────────────────

  {
    id: 'c4_chapel_arrive',
    chapter: 'Chapter 4',
    title: 'The Chapel of Chains',
    location: 'Chapel of Chains — Entrance',
    imageKey: 'chapel_of_chains',
    text: `The Chapel was a metro station once — you can see the bones of it under everything they have added. The old timetable boards now hold the Iron Saints doctrine in pressed iron lettering. The platform has been raised into a nave. And the chains: hanging from every surface in varying lengths and weights, some decorative, some functional, all deliberate. They catch the amber light from the bio-fuel lanterns and turn it into a lattice of shadows on the walls. A congregation of thirty people — settlers, residents, involuntary pilgrims — sit on benches fashioned from train carriage doors. Brother Malrec stands at the pulpit. He is mid-sermon. He does not pause when you enter. The words arrive in full voice: "The chain does not diminish. The chain defines. An unchained thing is an unfinished thing, and the world is full of the consequences of leaving things unfinished."`,
    effectsOnEnter: { setFlags: ['chapel_visited'] },
    choices: [
      {
        id: 'c4_chap_listen',
        text: 'Find a seat and listen. Understand the ideology before you decide.',
        nextNode: 'c4_chapel_malrec_sermon',
        effects: { intelligence: 1 },
      },
      {
        id: 'c4_chap_scan_toma',
        text: 'Stay at the back. Scan the congregation — look for Ashen Toma, the prisoner who knows about marks.',
        nextNode: 'c4_chapel_ashen_toma_meet',
        requirements: { flags: ['chapter3_complete'] },
      },
      {
        id: 'c4_chap_sister',
        text: 'The woman in medic-grey at the side door looks uncomfortable with what she is hearing.',
        nextNode: 'c4_chapel_sister_orin_intro',
      },
    ],
  },

  {
    id: 'c4_chapel_malrec_sermon',
    chapter: 'Chapter 4',
    title: 'The Iron Doctrine',
    location: 'Chapel of Chains — Nave',
    imageKey: 'chapel_of_chains',
    speaker: 'Brother Malrec',
    text: `Malrec's sermon has the structure of a machine. Each statement follows the last with mechanical certainty, no gap between them for air or doubt. "We did not survive the Blackout because we were strong. We survived because we were bound. To each other. To the order. To the chain that is the only honest description of what we owe the world and what the world owes us." He turns to the congregation. His eyes find you with specific precision. "The unbound thing wanders. The unbound thing hungers. The unbound thing becomes — in time — exactly what it always was underneath: animal, appetite, and the memory of something it could have been if it had accepted the chain before the chain became necessary." He descends from the pulpit. The congregation does not move. They have learned not to move until dismissed.`,
    dialogue: 'The chain does not diminish. The chain defines.',
    effectsOnEnter: { setFlags: ['malrec_sermon_heard'] },
    choices: [
      {
        id: 'c4_sermon_submit',
        text: '"What does the chain require of me?"',
        nextNode: 'c4_chapel_respond_pray',
        effects: { ironSaints: 8, corruption: -2 },
      },
      {
        id: 'c4_sermon_resist',
        text: '"A chain held by one person at each end is not order. It\'s a leash."',
        nextNode: 'c4_chapel_respond_resist',
        effects: { ironSaints: -10, morale: 3, miraTrust: 1 },
      },
      {
        id: 'c4_sermon_scholar',
        text: '[Forgotten Scholar] You recognise this doctrine. It was proscribed by the Last Archive. You wonder if Malrec knows that.',
        nextNode: 'c4_chapel_doctrine_whisper',
        requirements: { backgrounds: ['forgotten_scholar'] },
        effects: { setFlags: ['scholar_recognises_doctrine'], intelligence: 2 },
        isHidden: true,
      },
      {
        id: 'c4_sermon_esper',
        text: '[Esper] The chains are not decorative. Each one is hung at a specific resonance interval. This chapel is a dampener.',
        nextNode: 'c4_chapel_doctrine_whisper',
        requirements: { classes: ['esper'] },
        effects: { setFlags: ['esper_detects_dampener'], corruption: -3 },
        isHidden: true,
      },
    ],
  },

  {
    id: 'c4_chapel_respond_pray',
    chapter: 'Chapter 4',
    title: 'The Required Genuflection',
    location: 'Chapel of Chains — Before the Pulpit',
    imageKey: 'chapel_of_chains',
    text: `Malrec regards you for a moment with an expression that might be approval and might be the neutral face he wears when evaluating livestock. He places his hand on your shoulder — it weighs more than it should, anchored with the deliberateness of someone who learned touch as a mechanism for establishing hierarchy. "The chain asks three things. Attendance. Accountability. Acceptance of verdict." He removes his hand. "You will attend tomorrow's morning rite. You will be accountable to the ledger for your movements. When the Confession Hall renders its evaluation, you will accept the outcome." He turns back to the pulpit. From this side you can see that the back of his robe is stamped with a registration number. The Order catalogues its own people too.`,
    effectsOnEnter: { ironSaints: 5, setFlags: ['submitted_to_doctrine'] },
    choices: [
      {
        id: 'c4_pray_agree',
        text: '"Understood." You mean it the way you mean things when you need to mean them.',
        nextNode: 'c4_chapel_leave_options',
        effects: { morale: -1 },
      },
      {
        id: 'c4_pray_find_toma',
        text: 'Agree, then look for the prisoner chained to the wall at the back.',
        nextNode: 'c4_chapel_ashen_toma_meet',
        effects: { intelligence: 1 },
      },
    ],
  },

  {
    id: 'c4_chapel_respond_resist',
    chapter: 'Chapter 4',
    title: 'The Cost of Honesty',
    location: 'Chapel of Chains — Confrontation',
    imageKey: 'chapel_of_chains',
    speaker: 'Brother Malrec',
    text: `Malrec turns to look at you fully for the first time. His expression does not change, which is itself a kind of reaction — the deliberate absence of emotion from a face that has been trained to hold nothing the speaker hasn't decided to give. The congregation is very still. "The unbound thing speaks," he says. His voice is conversational. "It always does. That is the nature of unbound things — they confuse speech with thought, and thought with consequence." He makes a small motion with his hand. The two guards who were at the back of the Chapel are now at the front. "Accountability," he says, "is the first chain. You will find it is more comfortable than the alternative."`,
    effectsOnEnter: { corruption: -3, setFlags: ['malrec_marked_you'] },
    choices: [
      {
        id: 'c4_resist_back_down',
        text: 'Calculate the room. Back down. This is not the fight you came here for.',
        nextNode: 'c4_chapel_leave_options',
        effects: { ironSaints: 5, morale: -2 },
      },
      {
        id: 'c4_resist_escalate',
        text: 'Hold your ground. "I\'ve seen what your chain looks like when it\'s tight enough."',
        nextNode: 'c4_yard_arrive',
        effects: { ironSaints: -15, morale: 5, health: -8, setFlags: ['malrec_enemy'] },
      },
    ],
  },

  {
    id: 'c4_chapel_doctrine_whisper',
    chapter: 'Chapter 4',
    title: 'Proscribed Text',
    location: 'Chapel of Chains — East Alcove',
    imageKey: 'chapel_of_chains',
    speaker: 'Sister Orin',
    text: `You find her during the post-sermon dispersal — she is moving along the east wall, touching each chain where it meets the anchor point, running her fingers across something engraved in the base of each hook. She doesn't look up. "You heard it too," she says. Not a question. "The intervals. The harmonic dampening." She pauses at a chain where the engraving is longer than the others. "This is the Doctrine of Remaining. It was written four hundred years before the Blackout by a scholar whose name the Last Archive removed from the index. It suppresses the mark's resonance by inducing a specific frequency response in the surrounding metal structures." She finally looks up. She is younger than her hands suggested. "I'm Orin. And I'm not supposed to know any of this."`,
    effectsOnEnter: { setFlags: ['doctrine_of_remaining_found', 'sister_orin_met'] },
    choices: [
      {
        id: 'c4_doc_ask_origin',
        text: '"What does the Doctrine say about the mark\'s origin?"',
        nextNode: 'c4_chapel_scholar_doctrine',
      },
      {
        id: 'c4_doc_find_toma',
        text: '"I\'m looking for a prisoner called Ashen Toma. Can you help me find him?"',
        nextNode: 'c4_chapel_ashen_toma_meet',
        effects: { setFlags: ['orin_will_help'] },
      },
    ],
  },

  {
    id: 'c4_chapel_scholar_doctrine',
    chapter: 'Chapter 4',
    title: 'The Forbidden Index',
    location: 'Chapel of Chains — East Alcove',
    imageKey: 'chapel_of_chains',
    speaker: 'Sister Orin',
    text: `She speaks low and quickly, her fingers still moving on the chain-hooks. "The marks predate the Blackout by two generations. The scholar who documented them — Archivist Sela, name removed — called them 'anchor points.' Not for power. Not for access. For memory." She reaches the final hook and stops. "The marks were designed to record and preserve specific human experience. The Iron Saints' doctrine calls them the 'Mark of the Unchained' — a sign of spiritual incompletion. But the original text says something different. It says the marks are how someone intended to remember what happened, after everything was reset." She looks at your wrist. "Sela's last entry, which the Archive also removed: 'The anchor must find the shore.'"`,
    dialogue: 'The marks are how someone intended to remember what happened, after everything was reset.',
    effectsOnEnter: { setFlags: ['mark_origin_theory_scholar', 'orin_trusts_player'], lastArchive: 8 },
    choices: [
      {
        id: 'c4_sch_file_it',
        text: 'File this. Keep moving. You will think about what it means when you can afford to.',
        nextNode: 'c4_chapel_leave_options',
        effects: { intelligence: 2 },
      },
      {
        id: 'c4_sch_find_toma',
        text: '"Ashen Toma. A prisoner here. Do you know why they\'re holding him?"',
        nextNode: 'c4_chapel_ashen_toma_meet',
        effects: { setFlags: ['orin_points_to_toma'] },
      },
    ],
  },

  {
    id: 'c4_chapel_ashen_toma_meet',
    chapter: 'Chapter 4',
    title: 'The Chain-Keeper\'s Prisoner',
    location: 'Chapel of Chains — Northern Alcove',
    imageKey: 'chapel_of_chains',
    speaker: 'Ashen Toma',
    text: `He is chained to a ring in the wall at the northern alcove — not painfully, but definitively. He is the kind of thin that takes months to achieve, and his eyes are the eyes of someone who has been very careful not to lose something important. He looks at your wrist before he looks at your face. Whatever he sees there, it changes how he sits — something unclenches. "I have been waiting for about three months to meet someone who carries one of those," he says. His voice is even. He had time to prepare this sentence. "Not because I was expecting you specifically. Because I knew it would have to happen eventually. The marks always find the places where the information about them is kept. It's in their nature." He studies you. "You don't know that yet. That's fine. I have been waiting. I have things to tell you and I have thought carefully about the order in which to tell them."`,
    effectsOnEnter: { setFlags: ['toma_met'] },
    choices: [
      {
        id: 'c4_toma_ask_what',
        text: '"Tell me what the mark is. Not what it does. What it is."',
        nextNode: 'c4_chapel_toma_mark_secret',
        effects: { intelligence: 1 },
      },
      {
        id: 'c4_toma_ask_saints',
        text: '"Why are the Iron Saints holding you? What do they think you know?"',
        nextNode: 'c4_chapel_toma_mark_secret',
        effects: { ironSaints: -2 },
      },
      {
        id: 'c4_toma_free_him',
        text: 'Check the chain mechanism. Can you free him now?',
        nextNode: 'c4_chapel_toma_mark_secret',
        effects: { setFlags: ['tried_to_free_toma'] },
      },
    ],
  },

  {
    id: 'c4_chapel_toma_mark_secret',
    chapter: 'Chapter 4',
    title: 'The Anchor Point',
    location: 'Chapel of Chains — Northern Alcove',
    imageKey: 'chapel_of_chains',
    speaker: 'Ashen Toma',
    text: `He speaks for seven minutes without stopping. He has clearly been rationing — he decided what to tell you and in what order and he does not deviate. The mark, he says, is not a brand or a curse or a tool for opening Archive doors. It is a recording device. Specifically: a mnemonic anchor, built before the Blackout to survive the Blackout. Someone — not the Iron Saints, not the Last Archive, someone operating before either existed — designed the marks to carry a specific memory forward through a reset event. The kind of reset event that ends a civilization and leaves only confusion about why. "The Iron Saints call it the 'Sign of the Unchained' and they want to suppress it because an unsuppressed mark, at sufficient saturation, transmits," Toma says. "They don't want it to transmit. They don't want whatever it's carrying to arrive." He pauses. "I don't know where it transmits to. That's the part they haven't let me access." He looks at the chain on his wrist. "The part they were afraid I would access."`,
    dialogue: 'Someone designed the marks to carry a specific memory forward through a reset event.',
    effectsOnEnter: { setFlags: ['toma_mark_secret_heard', 'mark_purpose_known'], lastArchive: 10 },
    choices: [
      {
        id: 'c4_toma_promise_out',
        text: '"I\'m going to get you out of here. Not today. But before I leave this settlement."',
        nextNode: 'c4_chapel_leave_options',
        effects: { setFlags: ['toma_rescue_promised'], morale: 2 },
      },
      {
        id: 'c4_toma_ask_furnace',
        text: '"They mentioned the Saint Furnace. What happens there?"',
        nextNode: 'c4_chapel_leave_options',
        effects: { setFlags: ['toma_warned_about_furnace'], morale: -2 },
      },
    ],
  },

  {
    id: 'c4_chapel_sister_orin_intro',
    chapter: 'Chapter 4',
    title: 'The Medic at the Door',
    location: 'Chapel of Chains — Side Entrance',
    imageKey: 'chapel_of_chains',
    speaker: 'Sister Orin',
    text: `She is maintaining something: a specific expression, held in place like a piece of structural work. She has the tools of a medic on her belt — the Iron Saints version of them, iron-stamped and regulation-clean — and the bruises on her forearm suggest she has been doing something with them that required force recently. She looks at you with the kind of caution that is specifically different from fear. "You don't have the registration band," she says, looking at your wrist and looking quickly away. Not at the mark. Away from it. "That means you either slipped the checkpoint or you're Category One and they haven't processed you yet." She pauses. "Either way, you need to decide what you want from this settlement before Malrec decides for you. He's good at deciding things on behalf of people who hesitate."`,
    effectsOnEnter: { setFlags: ['sister_orin_met'] },
    choices: [
      {
        id: 'c4_orin_ask_prisoners',
        text: '"I\'m looking for information about the prisoners they\'re holding."',
        nextNode: 'c4_chapel_doctrine_whisper',
        effects: { setFlags: ['orin_helping_player'] },
      },
      {
        id: 'c4_orin_show_mark',
        text: 'Pull your sleeve back. Let her see the mark. She looked away deliberately — she knows what it is.',
        nextNode: 'c4_chapel_doctrine_whisper',
        effects: { setFlags: ['orin_sees_mark', 'mark_visible_to_saints'] },
      },
      {
        id: 'c4_orin_ask_yard',
        text: '"What happens in the Purification Yard?"',
        nextNode: 'c4_yard_arrive',
        effects: { morale: -2 },
      },
    ],
  },

  {
    id: 'c4_chapel_leave_options',
    chapter: 'Chapter 4',
    title: 'Crossroads Inside the Wall',
    location: 'Chapel of Chains — Exit Corridor',
    imageKey: 'chapel_of_chains',
    text: `The sermon has ended. The congregation disperses in an orderly fashion — they have practised this, or they have been taught to practise it, which amounts to the same outcome. The settlement opens before you in three directions: the Purification Yard to the north, where you can hear the sound of people being processed and the occasional silence that follows a specific kind of command; the Barracks to the east, where the smell of ash and iron is stronger; and beyond both, deeper in the settlement, the Confession Hall where the light is the colour of old fire.`,
    effectsOnEnter: {},
    choices: [
      {
        id: 'c4_leave_to_yard',
        text: 'The Yard. Find out what purification means before it\'s offered to you.',
        nextNode: 'c4_yard_arrive',
      },
      {
        id: 'c4_leave_to_barracks',
        text: 'The Barracks. Soldiers. Information. Maybe a way out.',
        nextNode: 'c4_barracks_arrive',
      },
      {
        id: 'c4_leave_to_confession',
        text: 'Go directly to the Confession Hall. Find Saint Veyra before she sends for you.',
        nextNode: 'c4_confession_arrive',
      },
      {
        id: 'c4_leave_find_mira',
        text: 'Find the Prison Carts first. Mira is somewhere in this settlement.',
        nextNode: 'c4_carts_arrive',
        requirements: { miraPresent: true },
        effects: { miraTrust: 1 },
      },
      {
        id: 'c4_leave_to_shrine',
        text: 'The War Shrine. The oldest part of the settlement. Something is there.',
        nextNode: 'c4_shrine_arrive',
      },
    ],
  },

  // ── PURIFICATION YARD ───────────────────────────────────────────────────────

  {
    id: 'c4_yard_arrive',
    chapter: 'Chapter 4',
    title: 'The Purification Yard',
    location: 'Purification Yard — Northern Square',
    imageKey: 'purification_yard',
    text: `The Yard was designed for volume. Thirty-by-forty metres of cleared space between the Chapel's north wall and the residential blocks, surfaced in grey aggregate. There are stations arranged in a grid: processing desks, examination tables, a medical bay — staffed by Sister Orin who has arrived ahead of you and is moving with the practised speed of someone who has learned efficiency from necessity. There are twenty-three people in the Yard being processed. Fourteen of them are from the Hollow Children by their chalk-dust markings. They are not restrained, but they stand in a way that indicates the cost of moving without permission. Three of them are children aged nine or under. Malrec is not present. A different soldier runs the desk — younger, uncomfortable in the authority — which tells you Malrec's presence is not always required because the system runs without him.`,
    effectsOnEnter: { setFlags: ['yard_visited'] },
    choices: [
      {
        id: 'c4_yard_hollow_observe',
        text: 'Observe the Hollow Children. Look for a contact, a familiar face, something useful.',
        nextNode: 'c4_yard_hollow_prisoners',
        effects: { hollowChildren: 3 },
      },
      {
        id: 'c4_yard_orin_approach',
        text: 'Approach Sister Orin at the medical bay.',
        nextNode: 'c4_yard_sister_orin_yard',
      },
      {
        id: 'c4_yard_ask_purification',
        text: 'Ask the desk soldier about the purification process. You need to know if it actually reduces corruption.',
        nextNode: 'c4_yard_purification_offer',
        effects: { setFlags: ['asked_about_purification'] },
      },
      {
        id: 'c4_yard_veyra_summons',
        text: 'The desk soldier receives a signal. "Confession Hall. Saint Veyra requests the marked individual."',
        nextNode: 'c4_yard_veyra_arrives',
        requirements: { flags: ['mark_discovered'] },
      },
    ],
  },

  {
    id: 'c4_yard_hollow_prisoners',
    chapter: 'Chapter 4',
    title: 'The Chalk Children in Grey',
    location: 'Purification Yard — Processing Grid',
    imageKey: 'purification_yard',
    text: `You move through the processing grid slowly enough to seem compliant and quickly enough to see what you need to see. The Hollow Children are organised — even under Saints authority, even stripped of their chalk markers — in the particular way that Mother Chalk's people organise: oldest at the perimeter, youngest at the centre, information passing sideways in small gestures rather than words. One of the older ones — a girl, fifteen, wearing the chalk dust in her hair the way they wear it as a marker of status — meets your eyes. She holds them. She makes a very small motion with three fingers: the Hollow Children acknowledgement signal that Lio showed you. She is waiting to see if you respond correctly.`,
    effectsOnEnter: {},
    choices: [
      {
        id: 'c4_hc_respond_correct',
        text: 'Return the signal. Make it small. Make it right.',
        nextNode: 'c4_yard_hollow_escape_plan',
        requirements: { flags: ['chapter3_complete'] },
        effects: { hollowChildren: 10, setFlags: ['hollow_contact_made'] },
      },
      {
        id: 'c4_hc_no_signal',
        text: 'You don\'t know the signal. Look away before you make it worse.',
        nextNode: 'c4_yard_sister_orin_yard',
        effects: { hollowChildren: -3 },
      },
      {
        id: 'c4_hc_medic_cover',
        text: '[Medic + Underground Medic] You have a reason to be near the medical bay. Maneuver close to the girl.',
        nextNode: 'c4_yard_hollow_escape_plan',
        requirements: { classes: ['medic'], backgrounds: ['underground_medic'] },
        effects: { hollowChildren: 8, setFlags: ['hollow_contact_made'] },
        isHidden: true,
      },
    ],
  },

  {
    id: 'c4_yard_hollow_escape_plan',
    chapter: 'Chapter 4',
    title: 'Chalk on Pavement',
    location: 'Purification Yard — Eastern Edge',
    imageKey: 'purification_yard',
    text: `She passes you a piece of chalk small enough to be a tooth. You don't use it yet — you hold it, and you listen to her voice which is barely above the level of ambient processing noise. "There is a drain cover on the northeast wall. Forty centimetres. The bolt-pattern is Iron Saints standard but the bolt that matters is the third from the west, which Mother Chalk's people turned before we were taken. It opens from the inside if you know which direction." She pauses. A guard passes within five metres. She continues. "There are thirty-one of us. We cannot all go through a forty-centimetre drain. We need you to make a situation in the yard that requires the guards at the northeast wall to move. Something that isn't violent enough to trigger an escalation response but requires physical presence at the checkpoint gate." She looks at you carefully. "Can you do that?"`,
    effectsOnEnter: { setFlags: ['hollow_escape_plan_known'] },
    choices: [
      {
        id: 'c4_hep_agree',
        text: '"Yes." You don\'t say you have a plan yet. Plans are for when you\'ve seen the whole board.',
        nextNode: 'c4_yard_sister_orin_yard',
        effects: { hollowChildren: 5, setFlags: ['hollow_distraction_agreed'] },
      },
      {
        id: 'c4_hep_ask_time',
        text: '"Give me time to find the layout. Where is Sister Orin in relation to the drain?"',
        nextNode: 'c4_yard_sister_orin_yard',
        effects: { hollowChildren: 3, setFlags: ['orin_as_distraction_option'] },
      },
    ],
  },

  {
    id: 'c4_yard_sister_orin_yard',
    chapter: 'Chapter 4',
    title: 'The Medic\'s Accounting',
    location: 'Purification Yard — Medical Bay',
    imageKey: 'purification_yard',
    speaker: 'Sister Orin',
    text: `Orin is processing a child's arm — a fracture from before the capture, two weeks old, improperly set. She is resetting it correctly and the child is not making a sound because the child has been in the tunnel system long enough to know when to be quiet. Orin works quickly and with a gentleness that is not required by the Iron Saints' medical protocols. When she finishes she says to the child in a voice the child can barely hear: "You will be all right." Then she turns to you. "They're going to Purify the adults tonight. The children they'll use for labor allocation — tunnel-clearing detail. Two of the adults in the eastern group have enough corruption that the Purification Rite will not be gentle." She doesn't look at you when she says the next part: "If someone were going to do something about the situation in this Yard, they would need to do it before the evening bell."`,
    effectsOnEnter: { setFlags: ['orin_trusts_player'] },
    choices: [
      {
        id: 'c4_orin_slow_processing',
        text: '"What would you need from me to slow the processing down?"',
        nextNode: 'c4_yard_help_prisoners',
        effects: { setFlags: ['orin_ally'], miraTrust: 1 },
      },
      {
        id: 'c4_orin_ask_purification_detail',
        text: '"Tell me about the Purification Rite. Specifically about what it does to the corruption."',
        nextNode: 'c4_yard_purification_offer',
      },
      {
        id: 'c4_orin_get_clearance',
        text: '"I need to get to the Confession Hall before the evening bell. Can you give me a reason to move freely?"',
        nextNode: 'c4_confession_arrive',
        effects: { setFlags: ['orin_clearance_given'] },
      },
    ],
  },

  {
    id: 'c4_yard_help_prisoners',
    chapter: 'Chapter 4',
    title: 'Small Acts',
    location: 'Purification Yard — Eastern Processing',
    imageKey: 'purification_yard',
    text: `She tells you: the processing desk uses a form that requires three signatures for allocation decisions. If the third signature is missing, the allocation is postponed forty-eight hours. She can ensure the first two signatures are slow. You need to ensure the third — Malrec's — is unavailable. She hands you a medical form with careful handwriting. "If anyone asks," she says, "you are assisting with triage documentation." She pauses. "I will deny having said any of this." She says it matter-of-factly, without apology, which is the most honest thing anyone has said to you since you entered this settlement.`,
    effectsOnEnter: { setFlags: ['orin_plan_active', 'chapter4_rescue_route'] },
    choices: [
      {
        id: 'c4_help_distract_malrec',
        text: 'Find Malrec and give him a reason to spend time away from his desk.',
        nextNode: 'c4_chapel_arrive',
        effects: { setFlags: ['malrec_distraction_planned'] },
      },
      {
        id: 'c4_help_go_to_drain',
        text: 'Go to the northeast wall. The drain is the better path for the children.',
        nextNode: 'c4_hollow_escape_secret',
        requirements: { flags: ['hollow_escape_plan_known'] },
      },
    ],
  },

  {
    id: 'c4_yard_purification_offer',
    chapter: 'Chapter 4',
    title: 'The Price of Cleansing',
    location: 'Purification Yard — Purification Station',
    imageKey: 'purification_yard',
    text: `The station is at the northern end of the Yard — a stone basin filled with a solution that smells of iron and something older, something that makes the mark pulse in a slow specific rhythm. The priest who runs it is quieter than Malrec, more surgical in his attention. He explains: the Purification Rite applies the Doctrine of Remaining in concentrated form, using the harmonic frequencies encoded in the chapel chains, transferred to the body through immersion. It is not comfortable. It reduces what the Saints call "mark saturation" — what you have been calling corruption. It does this by burning the resonance out of the damaged tissue. The priest shows you his own forearms: the burn scarring is precise and total, covering every surface. "Corruption at forty percent requires one immersion," he says. "At sixty percent, three. At eighty, the rite may remove the mark entirely, along with several things adjacent to it." He says this without expression.`,
    effectsOnEnter: { setFlags: ['purification_explained'] },
    choices: [
      {
        id: 'c4_purify_accept',
        text: '"Do it. Whatever the cost." You need the corruption gone more than you need what it\'s been buying.',
        nextNode: 'c4_yard_purification_ritual',
        effects: { ironSaints: 10 },
      },
      {
        id: 'c4_purify_refuse',
        text: '"No. Not today." You need the mark. Whatever it\'s carrying, you need it intact.',
        nextNode: 'c4_yard_arrive',
        effects: { morale: 2 },
      },
    ],
  },

  {
    id: 'c4_yard_purification_ritual',
    chapter: 'Chapter 4',
    title: 'What the Chain Burns Away',
    location: 'Purification Yard — Purification Station',
    imageKey: 'purification_yard',
    text: `The immersion lasts ninety seconds. The priest counts aloud. You count separately. Your counts diverge at forty-five because at forty-five the harmonic frequency reaches your mark and the mark's response is not suppression — it is argument. The chain-frequencies and the mark's resonance dispute each other in the material of your wrist and the argument is conducted in the medium of pain. At seventy seconds, the corruption recedes. You can feel it recede the way you feel a tooth pulled: the absence is correct but the space it leaves is terrible. At ninety seconds, the priest says "Complete." You lift your wrist. The mark is dimmer. Smaller. Something was burned away with the corruption. Something adjacent. Toma was right about that.`,
    effectsOnEnter: { corruption: -25, health: -15, setFlags: ['purification_survived'] },
    choices: [
      {
        id: 'c4_purify_survived',
        text: 'You survived. Account for what was lost and move.',
        nextNode: 'c4_yard_purification_aftermath',
        effects: { morale: -5 },
      },
      {
        id: 'c4_purify_overburn',
        text: 'The corruption resists. The harmonic frequency climbs past the threshold. The chain takes too much.',
        nextNode: 'c4_purification_overburn_end',
        requirements: { corruption: 60 },
        isHidden: true,
      },
    ],
  },

  {
    id: 'c4_yard_purification_aftermath',
    chapter: 'Chapter 4',
    title: 'The Smaller Self',
    location: 'Purification Yard — Recovery Alcove',
    imageKey: 'purification_yard',
    speaker: 'Sister Orin',
    text: `Orin finds you in the recovery alcove. She has a flask of something that tastes of metal and warmth, and she gives it to you without being asked. She checks the mark — now smaller, dimmer, its edges precise in a way they weren't before. "You'll feel the loss for a week," she says. "Most people describe it as losing a memory you didn't know you had until it was gone." She pauses. "Saint Veyra does this voluntarily every three months. She says it keeps her ordered." She says this without editorial. You decide that is editorial enough. The mark is quieter now. The settlement feels less resonant. The cost of this is clear and the clarity has its own weight. But you are cleaner than you were, and that is a fact you can use.`,
    effectsOnEnter: { morale: 3, health: 10 },
    choices: [
      {
        id: 'c4_aftermath_go_veyra',
        text: 'Go to the Confession Hall. Find Veyra before the purification\'s effect changes her calculations.',
        nextNode: 'c4_confession_arrive',
      },
      {
        id: 'c4_aftermath_go_toma',
        text: 'Go back to the Chapel. Toma needs to know what the rite felt like from the inside.',
        nextNode: 'c4_chapel_arrive',
        effects: { lastArchive: 5, setFlags: ['toma_informed_of_purification'] },
      },
    ],
  },

  {
    id: 'c4_yard_veyra_arrives',
    chapter: 'Chapter 4',
    title: 'The Commander\'s Efficiency',
    location: 'Purification Yard — Command Platform',
    imageKey: 'purification_yard',
    speaker: 'Saint Veyra',
    text: `She arrives at the Yard in the time it would take someone to walk from the Confession Hall at a deliberate pace, which suggests she was already on her way before the message was sent, which suggests she has been monitoring the situation for some time. She is not what the title implies — she does not wear iron decoratively, she wears it functionally, and the function is visible in how the Yard reorganises around her presence without anyone giving an order. She looks at you across the processing grid with the careful alertness of someone who has been briefed. "The marked individual," she says. Her voice carries without effort. "Come with me to the Confession Hall. I have three questions for you, and the answers will determine the shape of the next several days." She turns and walks before you respond. She expects compliance the way a wall expects gravity.`,
    effectsOnEnter: { setFlags: ['veyra_summons_player'] },
    choices: [
      {
        id: 'c4_veyra_sum_follow',
        text: 'Follow her. Three questions is a negotiation, not a trial.',
        nextNode: 'c4_confession_arrive',
        effects: { ironSaints: 5 },
      },
      {
        id: 'c4_veyra_sum_message',
        text: 'Follow, but stop to pass a word to the Hollow Children girl on the way.',
        nextNode: 'c4_confession_arrive',
        requirements: { flags: ['hollow_contact_made'] },
        effects: { hollowChildren: 5, ironSaints: -3 },
      },
    ],
  },

  // ── BARRACKS OF ASH ─────────────────────────────────────────────────────────

  {
    id: 'c4_barracks_arrive',
    chapter: 'Chapter 4',
    title: 'Barracks of Ash',
    location: 'Barracks of Ash — Main Hall',
    imageKey: 'barracks_of_ash',
    text: `The Barracks are functional in the way that things are functional when function is the only remaining criterion. Fold-down bunks. Iron racks for equipment. A long table where a dozen soldiers eat in silence or talk in the specific low register of people who have learned that speech is a resource. The ash in the name comes from the char marks on every surface — not from a fire but from the purification process, which uses controlled burns as part of the chain-registration ceremony. Every soldier here bears the iron brand on their right forearm: a chain-link, pressed in at their induction. The smell of the brand is old in most cases. In one soldier at the table's end, it is new enough to be pink and raised. Cain is very still beside you. He is reading something in the room that you cannot read yet.`,
    effectsOnEnter: { setFlags: ['barracks_visited'] },
    choices: [
      {
        id: 'c4_bar_watch_cain',
        text: 'Watch Cain\'s face, then ask him quietly what he sees.',
        nextNode: 'c4_barracks_cain_past_trigger',
        requirements: { cainPresent: true },
        effects: { cainTrust: 1 },
      },
      {
        id: 'c4_bar_sit_down',
        text: 'Sit at the table. You are harmless until they know otherwise.',
        nextNode: 'c4_barracks_soldiers_eating',
        effects: { ironSaints: 3 },
      },
      {
        id: 'c4_bar_tactician_read',
        text: '[Tactician] Read the room: patrol patterns, communication channels, blind spots. This is intelligence work.',
        nextNode: 'c4_barracks_intel_gathered',
        requirements: { classes: ['tactician'] },
        effects: { intelligence: 2, setFlags: ['barracks_intel_collected'] },
        isHidden: true,
      },
      {
        id: 'c4_bar_shadow_uniform',
        text: '[Shadow Broker] You need a Saint uniform and forty-five minutes. You have done harder things.',
        nextNode: 'c4_barracks_infiltrate',
        requirements: { classes: ['shadow_broker'] },
        effects: { setFlags: ['infiltrate_route'] },
        isHidden: true,
      },
    ],
  },

  {
    id: 'c4_barracks_soldiers_eating',
    chapter: 'Chapter 4',
    title: 'What Soldiers Talk About',
    location: 'Barracks of Ash — Long Table',
    imageKey: 'barracks_of_ash',
    text: `The soldiers are talking about routes. Specifically: which surface routes are passable, which have been taken by the Glass Court, and which are still in the contested zone between the two factions. One of them — weathered, older, with a brand several years old by the colour of the scar — is describing a route near the Eastern Archive with the precision of someone who has walked it recently. Another is asking about the prison carts' next transit. A third is very deliberately not talking about a subject the other two are circling without naming. You file all of this. The food is iron-ration standard: adequate, measured, completely without pleasure. You eat your portion. You are here. You are fed. You note that the Saints' soldiers are not cruel to each other, which is its own kind of information about how the cruelty is allocated.`,
    effectsOnEnter: { hunger: 5, setFlags: ['saints_intel_routes'] },
    choices: [
      {
        id: 'c4_bar_talk_archive',
        text: 'Talk to the older soldier about the Eastern Archive route.',
        nextNode: 'c4_barracks_cain_past_trigger',
        effects: { lastArchive: 5, intelligence: 1 },
      },
      {
        id: 'c4_bar_ask_join',
        text: 'Ask directly about the process for joining the Iron Saints.',
        nextNode: 'c4_barracks_join_option',
        effects: { ironSaints: 5 },
      },
    ],
  },

  {
    id: 'c4_barracks_cain_past_trigger',
    chapter: 'Chapter 4',
    title: 'Unit Six',
    location: 'Barracks of Ash — Equipment Rack',
    imageKey: 'barracks_of_ash',
    text: `The equipment rack holds seventeen weapons, each stored in a specific position based on a numbering system pressed into the rack itself. Cain is standing in front of position six. He is not moving. The numbering system is the same one the Iron Saints used before they were the Iron Saints, when they were the Reconstruction Corps — three years ago. When they were the organisation Cain left. Position six was his. You don't know that yet — you know it from how he is standing. He stands the way people stand in front of the thing they walked away from: with the particular weight of that decision still in his posture.`,
    effectsOnEnter: { setFlags: ['cain_military_past_active'] },
    choices: [
      {
        id: 'c4_cain_trig_ask_directly',
        text: '"Was this your unit?"',
        nextNode: 'c4_barracks_cain_confrontation',
        effects: { cainTrust: -1 },
      },
      {
        id: 'c4_cain_trig_wait',
        text: 'Wait. Give him the time.',
        nextNode: 'c4_barracks_cain_confrontation',
        effects: { cainTrust: 2 },
      },
      {
        id: 'c4_cain_trig_exiled',
        text: '[Exiled Soldier] You recognise this. You left something behind once too. Stand next to him.',
        nextNode: 'c4_barracks_cain_confrontation',
        requirements: { backgrounds: ['exiled_soldier'] },
        effects: { cainTrust: 3, morale: 2 },
        isHidden: true,
      },
    ],
  },

  {
    id: 'c4_barracks_cain_confrontation',
    chapter: 'Chapter 4',
    title: 'What He Left',
    location: 'Barracks of Ash — Equipment Rack',
    imageKey: 'barracks_of_ash',
    speaker: 'Cain',
    text: `He speaks without turning. "Unit Six, Northern Reconstruction Corps, 14th Engagement. We were building water infrastructure in Sub-Sector 9 when the doctrine changed." His voice is flat in the way that flat voices mean something was removed from them deliberately. "The chain and flame. They introduced the iconography eighteen months after I left. Before that it was just the corps designation. Just the work. Then the work became — something else." He finally turns. He looks at your wrist — the mark, visible or not — and then at your face. "What they do to people with marks is not medical. It is not purification. I know because I was there when they wrote the purification protocol. I was on the commission that was told to call it something the commission could live with." He pauses. "I have not lived with it. Not entirely. But I am still here, and that is also something I have not entirely reconciled."`,
    dialogue: 'They told us to call it something the commission could live with.',
    effectsOnEnter: { setFlags: ['cain_past_revealed'] },
    choices: [
      {
        id: 'c4_cain_conf_still_here',
        text: '"You\'re still here. That means you can still choose what you do next."',
        nextNode: 'c4_barracks_join_option',
        effects: { cainTrust: 2, morale: 2 },
      },
      {
        id: 'c4_cain_conf_leave_together',
        text: '"Then let\'s finish this and leave. Together."',
        nextNode: 'c4_barracks_join_option',
        effects: { cainTrust: 3, setFlags: ['cain_leaves_with_player'] },
      },
      {
        id: 'c4_cain_conf_use_it',
        text: '"They\'d take you back. You could use that. We could use that."',
        nextNode: 'c4_barracks_cain_joins_saints',
        effects: { cainTrust: -2, setFlags: ['player_pushed_cain_to_saints'] },
      },
    ],
  },

  {
    id: 'c4_barracks_cain_joins_saints',
    chapter: 'Chapter 4',
    title: 'The Calculation He Made',
    location: 'Barracks of Ash — Main Hall',
    imageKey: 'barracks_of_ash',
    speaker: 'Cain',
    text: `He is quiet for a long time. Long enough that you think he has filed the conversation. Then: "The offer they made me — before I left — was specific. Return, resume rank, resume pay. The person I was responsible for at the time would be registered as civilian accompaniment." He does not look at you when he says the next part. "The person I am responsible for now has a mark the Saints have classified as Category One Priority. Category One is not civilian accompaniment. Category One is — processed." He places his hand on the equipment rack. "If I re-enlist, you gain access and cover. If I don't, we are both exposed in a settlement with nine armed soldiers who have your documentation." He turns. His face is the face of the calculation. "Tell me which outcome you can live with."`,
    dialogue: 'Tell me which outcome you can live with.',
    effectsOnEnter: { setFlags: ['cain_saint_offer_on_table'] },
    choices: [
      {
        id: 'c4_cain_saints_refuse',
        text: '"Don\'t. We find another way out. I won\'t build my survival on your compromise."',
        nextNode: 'c4_barracks_intel_gathered',
        effects: { cainTrust: 3, setFlags: ['refused_cain_reenlist'] },
      },
      {
        id: 'c4_cain_saints_accept',
        text: '"Do it. But know what you\'re doing and know that I\'m going to get us both out."',
        nextNode: 'c4_barracks_brand_ritual',
        effects: { cainTrust: -1, ironSaints: 15, setFlags: ['cain_reenlist_accepted'] },
      },
      {
        id: 'c4_cain_saints_betray',
        text: '"Then re-enlist. And while you\'re establishing cover — let them process me. I\'ll find a way out from inside."',
        nextNode: 'c4_cain_defect_end',
        effects: { cainTrust: -5, setFlags: ['player_accepted_cain_betrayal'] },
      },
    ],
  },

  {
    id: 'c4_barracks_join_option',
    chapter: 'Chapter 4',
    title: 'The Open Door',
    location: 'Barracks of Ash — Enrollment Desk',
    imageKey: 'barracks_of_ash',
    text: `The desk is staffed by a soldier with a ledger and the particular expression of someone who processes a large volume of decisions without making any of them himself. The enrollment process, he explains, has three stages: registration, evaluation, and the brand. The brand is mandatory. The brand is the chain. The chain is the Order's physical covenant. You cannot be a Saint without the brand, and you cannot undo the brand. He says this matter-of-factly, as if it is no more remarkable than a residency requirement. You note that he is not pressuring you. The Iron Saints are not currently desperate for members — they are in a position to be selective, which means they have grown, which means someone with organisational talent has been building this for longer than the Blackout.`,
    effectsOnEnter: { setFlags: ['join_option_available'] },
    choices: [
      {
        id: 'c4_join_want_to',
        text: '"Explain the registration process. I\'m listening."',
        nextNode: 'c4_barracks_brand_ritual',
        effects: { ironSaints: 10, setFlags: ['joining_iron_saints'] },
      },
      {
        id: 'c4_join_not_yet',
        text: '"Not today. I have other business first."',
        nextNode: 'c4_confession_arrive',
        effects: { ironSaints: -3 },
      },
    ],
  },

  {
    id: 'c4_barracks_brand_ritual',
    chapter: 'Chapter 4',
    title: 'The Iron Covenant',
    location: 'Barracks of Ash — Branding Station',
    imageKey: 'barracks_of_ash',
    text: `The branding station is at the back of the Barracks, separated from the main hall by a curtain of chain links. A hearth. A brand. A priest who is not Malrec — younger, more careful, less invested in the spiritual weight of what he is doing and more invested in the technical correctness of the application. The brand is specific: chain-link, two centimetres, applied to the inner right forearm. The mark on your wrist reacts to the brand's proximity with a low warmth that is not pain and not comfort but something between them — recognition, maybe. The priest gives you two minutes to consider. He does not seem to personally care about the answer.`,
    effectsOnEnter: {},
    choices: [
      {
        id: 'c4_brand_accept',
        text: 'Hold out your arm. Accept the brand. The chain goes both ways — you can use this.',
        nextNode: 'c4_barracks_brand_accepted',
        effects: { health: -5, ironSaints: 20, setFlags: ['iron_brand_accepted', 'chapter4_saint_route'] },
      },
      {
        id: 'c4_brand_refuse_last',
        text: 'Lower your arm. "I can\'t. Not this." Walk out of the station.',
        nextNode: 'c4_confession_arrive',
        effects: { ironSaints: -15, morale: 2 },
      },
    ],
  },

  {
    id: 'c4_barracks_brand_accepted',
    chapter: 'Chapter 4',
    title: 'Saint of the Iron Order',
    location: 'Barracks of Ash — After the Brand',
    imageKey: 'barracks_of_ash',
    text: `The brand lasts eight seconds. You count them. The mark on your wrist responds to the brand on your forearm in a way that is not harmonious — it is a conversation, and the conversation is not friendly. Two statements of authority, adjacent, each claiming precedence. The priest wraps the brand in Iron Saints medical protocol: clean, efficient, exactly according to procedure. He writes the registration in the ledger. He hands you a copy. You are now documented. You are now, technically, a Saint. The Barracks soldiers do not congratulate you — they nod, which is the equivalent, and they make space at the long table, which is the equivalent of welcome. The mark on your wrist has not quieted. It is less bright, or differently bright, as if adjusting to a new arrangement. You have given the chain something to compete with.`,
    effectsOnEnter: { ironSaints: 15, corruption: 3, setFlags: ['iron_saint_registered'] },
    choices: [
      {
        id: 'c4_brand_go_veyra',
        text: 'Go to the Confession Hall. You want Veyra to see the brand before she runs her evaluation.',
        nextNode: 'c4_confession_arrive',
      },
      {
        id: 'c4_brand_use_access',
        text: 'The uniform is available now. The Yard. The Furnace. The Carts. You have access.',
        nextNode: 'c4_barracks_intel_gathered',
        effects: { setFlags: ['saint_access_level'] },
      },
    ],
  },

  {
    id: 'c4_barracks_infiltrate',
    chapter: 'Chapter 4',
    title: 'The Performance',
    location: 'Barracks of Ash — Supply Locker',
    imageKey: 'barracks_of_ash',
    text: `The uniform is in the supply locker at the end of the western wall — a spare set, clean, one size too large, which will be explained as recent assignment. You know how to walk in a uniform that isn't yours. You learned this from a different time in a different kind of collapse, and the skill transfers. The Iron Saints' patrol patterns are standardised to the point of predictability, which is the mark of an organisation that has mistaken consistency for security. You memorise three patrol schedules from the chalkboard near the main desk. The Yard. The Furnace. The Carts. The Confession Hall. You have approximately ninety minutes before the shift change creates a census-level discrepancy in the headcount.`,
    effectsOnEnter: { setFlags: ['infiltrate_route', 'saint_access_level'], agility: 2 },
    choices: [
      {
        id: 'c4_inf_go_furnace',
        text: 'The Furnace first. Toma said whatever the Saints fear most happens there.',
        nextNode: 'c4_furnace_arrive',
      },
      {
        id: 'c4_inf_go_carts',
        text: 'The Prison Carts. Find Mira. Find out who else is being held.',
        nextNode: 'c4_carts_arrive',
      },
      {
        id: 'c4_inf_gather_intel',
        text: 'Gather intelligence from each station before committing to an action.',
        nextNode: 'c4_barracks_intel_gathered',
      },
    ],
  },

  {
    id: 'c4_barracks_intel_gathered',
    chapter: 'Chapter 4',
    title: 'The Complete Picture',
    location: 'Barracks of Ash — Tactical Wall',
    imageKey: 'barracks_of_ash',
    text: `The tactical wall is the kind of thing that gives you everything you need if you know how to read it. Map of the settlement, patrol schedules, resource allocation, prisoner manifests. You read it in the two minutes a Saint is expected to be at the board between assignments. What you learn: the Saint Furnace is operational three times per week. Tonight is the third night. The Bellkeeper performs the Furnace ceremony. There are six Category One prisoners on the furnace manifest for this evening. Ashen Toma is on the list. Mira's registration number — if she was captured — appears on the Prison Carts manifest for morning transit. And in the bottom corner of the map, in Veyra's handwriting, a note: "The marked traveller — Confession Hall before 1800 or carts by 1900."`,
    effectsOnEnter: { setFlags: ['barracks_intel_complete', 'toma_on_furnace_list'], intelligence: 2 },
    choices: [
      {
        id: 'c4_intel_go_furnace',
        text: 'The Furnace. Tonight. Six prisoners. Toma is on that list.',
        nextNode: 'c4_furnace_arrive',
        effects: { morale: -2 },
      },
      {
        id: 'c4_intel_go_confession',
        text: 'The Confession Hall. Veyra wants you there by 1800 — negotiate before the schedule runs out.',
        nextNode: 'c4_confession_arrive',
      },
      {
        id: 'c4_intel_go_carts',
        text: 'The Prison Carts. Mira first.',
        nextNode: 'c4_carts_arrive',
        requirements: { miraPresent: true },
        effects: { miraTrust: 1 },
      },
      {
        id: 'c4_intel_escape_now',
        text: 'You have enough. Leave the settlement now — before the shift change catches you.',
        nextNode: 'c4_infiltrate_success',
        requirements: { flags: ['infiltrate_route'] },
        effects: { ironSaints: -10 },
      },
    ],
  },

  // ── CONFESSION HALL ─────────────────────────────────────────────────────────

  {
    id: 'c4_confession_arrive',
    chapter: 'Chapter 4',
    title: 'The Confession Hall',
    location: 'Confession Hall — Entrance',
    imageKey: 'confession_hall',
    text: `The Confession Hall uses what was the station master's office: three rooms knocked into one, the original furniture replaced with iron seats arranged in the configuration of evaluation rather than conversation. Light comes from arc-lamps behind frosted panels that make the illumination sourceless and total — there are no shadows in this room, which is either a design choice or a feature. Veyra is already there. She arrived first. This is a pattern, you understand now: she is always already in the room you enter. She is reading from a ledger — your ledger, the one Malrec started — and she does not look up when you enter. She finishes the page first. Then she closes it. Then she looks at you with the full alertness of someone who has been preparing this attention for longer than you have been in the room.`,
    effectsOnEnter: { setFlags: ['confession_hall_reached'] },
    choices: [
      {
        id: 'c4_conf_sit',
        text: 'Sit in the iron chair across from her. Wait for her to start.',
        nextNode: 'c4_veyra_first_sight',
        effects: { ironSaints: 3 },
      },
      {
        id: 'c4_conf_stand',
        text: 'Remain standing. The chair is a statement about the power arrangement in this room.',
        nextNode: 'c4_veyra_first_sight',
        effects: { morale: 2 },
      },
    ],
  },

  {
    id: 'c4_veyra_first_sight',
    chapter: 'Chapter 4',
    title: 'Saint Veyra',
    location: 'Confession Hall — Main Room',
    imageKey: 'confession_hall',
    speaker: 'Saint Veyra',
    text: `She is forty-something and she carries herself like the weight of forty-something has been worked into something useful. The chain she wears is functional, not decorative: one link through the left cuff, connected to a small iron ring she uses as a writing anchor. Her brand is visible — three years old, the scar fully integrated into her forearm. She speaks without preamble. "Three questions. You will answer or you will not. I will evaluate accordingly." She does not consult the ledger again. "First: Why are you carrying a mark at saturation level three when the Last Archive standard for voluntary registration is saturation level one? Second: What do you know about what the mark is transmitting, and to whom? Third: What will you give the Iron Saints in exchange for the particular kind of survival you require from this settlement?" She waits. She does not add anything. The questions are complete.`,
    dialogue: 'What will you give the Iron Saints in exchange for the survival you require?',
    effectsOnEnter: { setFlags: ['veyra_met'] },
    choices: [
      {
        id: 'c4_veyra_answer_honest',
        text: 'Answer honestly. All three. You have been carrying these answers alone for long enough.',
        nextNode: 'c4_veyra_interrogates',
        effects: { ironSaints: 5, morale: 2, miraTrust: 1 },
      },
      {
        id: 'c4_veyra_answer_partial',
        text: 'Answer one and two honestly. Tell her you\'re still deciding on three.',
        nextNode: 'c4_veyra_interrogates',
        effects: { ironSaints: -3 },
      },
      {
        id: 'c4_veyra_counter',
        text: '"I have three questions back. For the answers, we trade equal weight."',
        nextNode: 'c4_veyra_interrogates',
        effects: { morale: 3, ironSaints: -5 },
      },
    ],
  },

  {
    id: 'c4_veyra_interrogates',
    chapter: 'Chapter 4',
    title: 'The Evaluation',
    location: 'Confession Hall — Main Room',
    imageKey: 'confession_hall',
    speaker: 'Saint Veyra',
    text: `She listens the way a doctor listens to a heartbeat — without reaction during, with full evaluation at the end. When you finish, she writes three words in the ledger. She turns it to show you. The words are: "Useful. Dangerous. Unresolved." She turns it back. "The mark's transmission capacity interests the Order. We have been suppressing marks for four years because we could not determine whether the transmission was hostile or incidental. Your mark is past the threshold where suppression is medically advisable. We have two options for a person in your position and with your demonstrated choice history." She pauses. "The first is integration: you join the Order, the mark is partially suppressed through voluntary purification, and you work for us in the specific capacity your mark enables. The second is the Saint Furnace, which I do not recommend, but which Brother Malrec will pursue if I do not counter-sign your evaluation by 1800."`,
    effectsOnEnter: { setFlags: ['veyra_evaluation_given'] },
    choices: [
      {
        id: 'c4_inter_join',
        text: '"Integration. Tell me what that requires."',
        nextNode: 'c4_veyra_offer_join',
        effects: { ironSaints: 10 },
      },
      {
        id: 'c4_inter_refuse',
        text: '"Neither of those. There is a third option."',
        nextNode: 'c4_veyra_offer_refused',
        effects: { morale: 3 },
      },
      {
        id: 'c4_inter_show_mark',
        text: '"I can show you what the mark does. In full. That changes your calculation."',
        nextNode: 'c4_veyra_negotiate_mark',
        effects: { setFlags: ['mark_shown_to_veyra'] },
      },
      {
        id: 'c4_inter_betray_mira',
        text: '[Mira present] "I\'ll give you something better than integration. The Last Archive agent who has been travelling with me."',
        nextNode: 'c4_confession_mira_betrayal',
        requirements: { miraPresent: true },
        effects: { miraTrust: -5, setFlags: ['mira_betrayal_considered'] },
        isHidden: true,
      },
    ],
  },

  {
    id: 'c4_veyra_offer_join',
    chapter: 'Chapter 4',
    title: 'The Integration Terms',
    location: 'Confession Hall — Main Room',
    imageKey: 'confession_hall',
    speaker: 'Saint Veyra',
    text: `She explains with the same precision she applies to everything else. The brand, the doctrine, three months of standard assignment — which in your case means mark-suppression support for Iron Saints sensitive operations, of which there are more than you would have expected. Then: full chain-certification, freedom of movement within the Order's territory, and access to the resources the Order has built over four years of systematic city-control. She places the integration form on the table. It is three pages and looks like every form Malrec has produced. At the bottom: her signature line, and yours. "The mark," she says, "will be recorded as an asset rather than a liability. That is a classification that does not exist anywhere else in the metro system." She slides it across. "Take time to read it. I'll be here."`,
    effectsOnEnter: { setFlags: ['integration_offer_received'] },
    choices: [
      {
        id: 'c4_join_sign_form',
        text: 'Sign it. The chain is useful when you are holding the other end.',
        nextNode: 'c4_saints_join_complete',
        effects: { ironSaints: 20, setFlags: ['formally_joined_saints', 'chapter4_saint_route'] },
      },
      {
        id: 'c4_join_ask_delay',
        text: '"I need to resolve something first. I\'ll sign when I return."',
        nextNode: 'c4_furnace_arrive',
        effects: { setFlags: ['integration_deferred'] },
      },
      {
        id: 'c4_join_counter_pact',
        text: '"Counter-offer. I work with the Order, not for it. Different terms."',
        nextNode: 'c4_veyra_pact',
        effects: { ironSaints: 5, morale: 3 },
      },
    ],
  },

  {
    id: 'c4_veyra_offer_refused',
    chapter: 'Chapter 4',
    title: 'The Third Option',
    location: 'Confession Hall — Main Room',
    imageKey: 'confession_hall',
    speaker: 'Saint Veyra',
    text: `She regards you with something that is not respect and not disdain — a middle state that is purely evaluative. "A third option," she repeats. "In my experience, when a person in your position proposes a third option, they mean one of three things: escape, a deal they intend to break, or something genuinely novel that they haven't fully articulated yet." She closes the ledger. "You have approximately two minutes before I make my own determination about which one this is, and schedule accordingly." The room is completely silent. Somewhere outside: the sound of the Purification Yard and the distant low resonance of the Saint Furnace warming up for the evening's work.`,
    effectsOnEnter: {},
    choices: [
      {
        id: 'c4_third_furnace_deal',
        text: '"The Furnace. I can deactivate it permanently. Using the mark."',
        nextNode: 'c4_veyra_negotiate_mark',
        effects: { setFlags: ['furnace_deactivation_offered'] },
      },
      {
        id: 'c4_third_leave_deal',
        text: '"I leave. With my companions. With the prisoner Ashen Toma. Tonight."',
        nextNode: 'c4_veyra_negotiate_mark',
        effects: { setFlags: ['negotiating_exit'] },
      },
      {
        id: 'c4_third_shrine',
        text: '"The third option is you come with me to the War Shrine and we settle this according to chain law."',
        nextNode: 'c4_shrine_challenge_veyra_setup',
        requirements: { flags: ['malrec_sermon_heard'] },
        effects: { setFlags: ['challenge_veyra_issued'], ironSaints: -15 },
      },
    ],
  },

  {
    id: 'c4_veyra_negotiate_mark',
    chapter: 'Chapter 4',
    title: 'The Mark\'s Demonstration',
    location: 'Confession Hall — Main Room',
    imageKey: 'confession_hall',
    text: `You pull back your sleeve. The mark at its current saturation is visible in a room this well-lit — not glowing, but distinct, the corruption having deepened its colour to something that looks carved rather than painted. Veyra does not move. She watches it with the particular stillness of someone who has read about this and is now seeing the document in person. "The transmission range," you say, "at current saturation, is at least two hundred metres. I've been suppressing it through deliberate focus. At the Furnace, in close proximity to the harmonic structure, it would transmit in full. Whatever the mark is carrying — whatever the Order has been trying to prevent — would transmit at maximum amplitude." You meet her eyes. "That's your negotiating position, and mine."`,
    effectsOnEnter: { setFlags: ['mark_negotiation_active'] },
    choices: [
      {
        id: 'c4_neg_pact_offer',
        text: '"We make a pact. I leave peacefully with Toma and my companions. The Order gets documentation of what I transmitted and a promise that it goes to no hostile party."',
        nextNode: 'c4_veyra_pact',
        effects: { ironSaints: 5, setFlags: ['pact_proposed'] },
      },
      {
        id: 'c4_neg_go_furnace',
        text: '"Or I go to the Furnace. Not in chains. As a demonstration of what happens when the mark and the furnace interact."',
        nextNode: 'c4_furnace_arrive',
        effects: { morale: 3, setFlags: ['furnace_mark_threat'] },
      },
      {
        id: 'c4_neg_charisma',
        text: '[Roll dice — Charisma] Negotiate. You have leverage. Use it precisely.',
        nextNode: 'c4_veyra_pact',
        diceCheck: {
          stat: 'charisma',
          difficulty: 13,
          diceType: 'd20',
          successNode: 'c4_veyra_pact',
          failureNode: 'c4_furnace_arrive',
        },
      },
    ],
  },

  {
    id: 'c4_veyra_pact',
    chapter: 'Chapter 4',
    title: 'Pact With the Saint',
    location: 'Confession Hall — Main Room',
    imageKey: 'confession_hall',
    speaker: 'Saint Veyra',
    text: `She considers for what feels like a long time but is probably forty seconds. "The pact is conditional," she says. "You transmit at the Archive's designated frequency, with an Iron Saints witness present. You take Toma — he is more trouble to process than he is worth at this point. You leave the settlement in six hours with your companions. The Order retains the documentation and the right to contact you through established channels if the transmitted data has operational relevance." She extends her hand. Not for a form. For a handshake — an older kind of agreement. "The chain," she says, "goes both ways. That is the part Malrec forgets."`,
    dialogue: 'The chain goes both ways. That is the part Malrec forgets.',
    effectsOnEnter: { ironSaints: 15, setFlags: ['veyra_pact_made', 'toma_released', 'chapter4_pact_route'] },
    choices: [
      {
        id: 'c4_pact_seal',
        text: 'Take her hand. "Six hours."',
        nextNode: 'c4_chapter4_end',
        effects: { morale: 3, ironSaints: 5 },
      },
    ],
  },

  {
    id: 'c4_confession_mira_betrayal',
    chapter: 'Chapter 4',
    title: 'The Price of Safety',
    location: 'Confession Hall — Main Room',
    imageKey: 'confession_hall',
    speaker: 'Saint Veyra',
    text: `Veyra's expression does not change. She writes something in the ledger. "The Last Archive agent. Name and location." You tell her. She writes. She stamps the form with a chain-and-flame seal. "The integration evaluation for the marked individual is amended: provisional integration, asset status, pending Archive contact retrieval." She slides your evaluation copy across. It has a new designation at the top. Your name, and below it: PROVISIONAL ASSET. The word PROVISIONAL does a lot of work in that sentence. Outside the Confession Hall, within the hour, you will hear the sound of the Prison Carts moving. You will not go to the window. You already know what you will see.`,
    effectsOnEnter: {
      ironSaints: 20,
      miraTrust: -5,
      setFlags: ['mira_betrayed', 'mira_delivered_to_saints', 'mira_trust_broken'],
    },
    choices: [
      {
        id: 'c4_mira_betray_live',
        text: 'Take the provisional asset status. Don\'t go to the window. Move forward.',
        nextNode: 'c4_confession_mira_betrayal_done',
      },
      {
        id: 'c4_mira_betray_watch',
        text: 'Go to the window. At least look. At least know what you chose.',
        nextNode: 'c4_confession_mira_betrayal_done',
        effects: { morale: -5 },
      },
    ],
  },

  {
    id: 'c4_confession_mira_betrayal_done',
    chapter: 'Chapter 4',
    title: 'After',
    location: 'Confession Hall — Exit',
    imageKey: 'confession_hall',
    text: `The settlement continues around you in exactly the way it continued before. The Iron Saints' efficiency is its own kind of comfort — nothing stops, nothing changes, everything proceeds according to the schedule that was already in place before you arrived and will continue after you leave. The provisional asset designation gives you a registration band on your left wrist: white, to distinguish it from the chain-link brand. You have access. You have safety of the particular kind that comes from being useful. Mira is in the system now. In the chain. You chose that. The mark on your wrist is very quiet. You are not sure what that means. You are not sure you want to find out.`,
    effectsOnEnter: { setFlags: ['mira_betrayal_complete'] },
    choices: [
      {
        id: 'c4_betray_continue_on',
        text: 'Use the access. Find Toma. Find a way to make this mean something.',
        nextNode: 'c4_furnace_arrive',
        effects: { morale: -3 },
      },
      {
        id: 'c4_betray_mira_sold_end',
        text: 'There is nothing more to do here. Accept what you became.',
        nextNode: 'c4_mira_sold_end',
      },
    ],
  },

  // ── SAINT FURNACE ───────────────────────────────────────────────────────────

  {
    id: 'c4_furnace_arrive',
    chapter: 'Chapter 4',
    title: 'The Saint Furnace',
    location: 'Saint Furnace — Approach',
    imageKey: 'saint_furnace',
    text: `The Furnace was built in what used to be a train maintenance pit — the largest enclosed space in the settlement, deep enough that you descend a flight of iron stairs to reach the floor level. The structure itself is not a furnace in the traditional sense: it is a harmonic array, built from salvaged metro infrastructure and something older, arranged in a configuration that makes the air vibrate at a frequency just below audible. The chains here are not decorative. Each one is taut, tensioned, part of the array's acoustic structure. At the centre: an iron platform. On the platform tonight: six people, their hands bound with chain-link cuffs. Ashen Toma is third from the left. He sees you and does not change his expression — he has been waiting for this specific thing to happen, you understand, and he is rationing his reaction for when he knows which way it goes.`,
    effectsOnEnter: { setFlags: ['furnace_arrived'], morale: -3 },
    choices: [
      {
        id: 'c4_furn_find_bellkeeper',
        text: 'Look for the Bellkeeper. Nothing happens at the Furnace without the Bellkeeper.',
        nextNode: 'c4_furnace_bellkeeper_intro',
      },
      {
        id: 'c4_furn_reach_prisoners',
        text: 'Move toward the prisoners. Get as close as the guards allow.',
        nextNode: 'c4_furnace_prisoners_line',
      },
      {
        id: 'c4_furn_listen_mark',
        text: 'The mark is very warm. The array is resonating with it. Hold still and listen.',
        nextNode: 'c4_furnace_mark_pulse',
        effects: { corruption: 2 },
      },
      {
        id: 'c4_furn_watch_from_ledge',
        text: 'Find the observation ledge. Watch what happens before acting.',
        nextNode: 'c4_furnace_execution_witness',
        effects: { morale: -2 },
      },
    ],
  },

  {
    id: 'c4_furnace_prisoners_line',
    chapter: 'Chapter 4',
    title: 'The Platform',
    location: 'Saint Furnace — Central Platform',
    imageKey: 'saint_furnace',
    text: `You reach the first guard position at the platform edge. Six people standing in a line that has been arranged with the particular neatness of people who have been stood in lines before. Toma is third. His eyes track you without turning his head — a practised stillness. Beside him: a woman whose corruption mark is visible even from here, spread across her neck and jaw like a flood map. A man who cannot be more than twenty, whose fear is the specific fear of someone who did not know what they were being charged with when they were charged. Two Hollow Children adults — older, calm with the calm of people who have made their peace. And at the far end, a figure sitting cross-legged on the platform in some state of meditative acceptance that belongs to a different situation entirely.`,
    effectsOnEnter: { setFlags: ['furnace_platform_reached'] },
    choices: [
      {
        id: 'c4_plat_reach_toma',
        text: 'Get close enough to Toma to pass a word.',
        nextNode: 'c4_furnace_save_toma',
      },
      {
        id: 'c4_plat_intervene_all',
        text: 'Intervene. All six. Now, before the Bellkeeper arrives.',
        nextNode: 'c4_furnace_intervene',
        effects: { ironSaints: -20 },
      },
      {
        id: 'c4_plat_watch_bell',
        text: 'Wait for the Bellkeeper. See what this ritual actually is before committing.',
        nextNode: 'c4_furnace_bellkeeper_intro',
      },
    ],
  },

  {
    id: 'c4_furnace_bellkeeper_intro',
    chapter: 'Chapter 4',
    title: 'The Bellkeeper',
    location: 'Saint Furnace — South Entrance',
    imageKey: 'saint_furnace',
    speaker: 'The Bellkeeper',
    text: `She enters from the south, which puts the arc-lamp light directly behind her. She is tall and moves in the particular way that relic-touched people sometimes move: too carefully, as if each step is a decision, as if she is navigating something the rest of the room cannot see. She carries a bell on a chain — old, iron, with a crack in the casting that has been repaired with a different metal. When she rings it, the harmonic array responds — every chain in the room shivers, and the mark on your wrist flares with sudden heat. She does not ring it for ceremony. She rings it to take inventory. Her eyes cross the room and find your wrist with the precision of a compass finding north. She says, in a voice lower than her frame suggests: "One who carries. I have been listening for the tone of that mark for two years." She comes toward you. The guards do not stop her because the guards are afraid of her.`,
    effectsOnEnter: { setFlags: ['bellkeeper_met'] },
    choices: [
      {
        id: 'c4_bell_hold_ground',
        text: 'Hold your ground. Let her approach. Whatever she hears in the mark, you need to hear it too.',
        nextNode: 'c4_shrine_relic_touched',
      },
      {
        id: 'c4_bell_step_back',
        text: 'Step back. Keep distance. Relic-touched are unpredictable near other resonance sources.',
        nextNode: 'c4_furnace_mark_pulse',
        effects: { intelligence: 1 },
      },
      {
        id: 'c4_bell_ask_why',
        text: '"Two years. What were you listening for?"',
        nextNode: 'c4_shrine_relic_touched',
        effects: { intelligence: 2, setFlags: ['bellkeeper_speaking'] },
      },
      {
        id: 'c4_bell_relic_hunter',
        text: '[Relic Hunter] You know how to speak to the relic-touched. Greet her correctly.',
        nextNode: 'c4_shrine_relic_touched',
        requirements: { classes: ['relic_hunter'] },
        effects: { setFlags: ['bellkeeper_alliance'], intelligence: 2 },
        isHidden: true,
      },
    ],
  },

  {
    id: 'c4_furnace_intervene',
    chapter: 'Chapter 4',
    title: 'The Platform Move',
    location: 'Saint Furnace — Central Platform',
    imageKey: 'saint_furnace',
    text: `You move before the Bellkeeper completes her entry. The first guard is not expecting a move from someone who appeared to have standing — whatever your status in the settlement, it bought you close enough. You are on the platform before the second guard reaches a defensive position. Toma sees what you are doing and immediately begins working the cuff mechanism from the inside — he has had months to learn the mechanism and the learning paid off, because his cuffs open in four seconds. The other prisoners need help. You have them. The question is what happens in the next sixty seconds, because the Furnace guards are now raising an alert that will bring more soldiers from the Barracks in ninety seconds, and the Bellkeeper is standing at the south entrance watching without moving, which might mean she is on your side or might mean she is evaluating outcomes.`,
    effectsOnEnter: { setFlags: ['furnace_intervention'] },
    choices: [
      {
        id: 'c4_int_use_mark',
        text: '[Roll dice — Corruption] Use the mark. Trigger the array. Buy time.',
        nextNode: 'c4_furnace_mark_pulse',
        diceCheck: {
          stat: 'intelligence',
          difficulty: 12,
          diceType: 'd20',
          successNode: 'c4_furnace_mark_breaks_furnace',
          failureNode: 'c4_furnace_mark_fails',
        },
      },
      {
        id: 'c4_int_escape_shaft',
        text: '[Roll dice — Agility] Get everyone out through the maintenance shaft before soldiers arrive.',
        nextNode: 'c4_furnace_toma_saved',
        diceCheck: {
          stat: 'agility',
          difficulty: 13,
          diceType: 'd20',
          successNode: 'c4_furnace_toma_saved',
          failureNode: 'c4_furnace_mark_fails',
        },
      },
    ],
  },

  {
    id: 'c4_furnace_mark_pulse',
    chapter: 'Chapter 4',
    title: 'The Array Response',
    location: 'Saint Furnace — Central Array',
    imageKey: 'saint_furnace',
    text: `You open the mark. Not the way you have been opening it carefully, the way someone handles a weight they know might fall — you open it the way you would if you had decided the weight doesn't matter as much as what it hits when it falls. The harmonic array responds instantly: every chain in the Furnace goes rigid, the vibration frequency shifts three registers upward, and for four seconds the air between the chains is visible as a standing wave — like heat but colder. The mark burns. The corruption shifts — both upward and outward, transferring something into the array's structure, writing something into the metal and the resonance of the space. The Bellkeeper rings her bell once. It is the only sound in the room.`,
    effectsOnEnter: { corruption: 8, setFlags: ['mark_used_on_array'] },
    choices: [
      {
        id: 'c4_pulse_push_further',
        text: 'Push further. Break the array. Make it impossible for the Saints to use again.',
        nextNode: 'c4_furnace_mark_breaks_furnace',
        effects: { corruption: 5, health: -10 },
      },
      {
        id: 'c4_pulse_hold_here',
        text: 'Hold at this level. Enough to disrupt. Not enough to destroy yourself.',
        nextNode: 'c4_furnace_toma_saved',
        effects: { corruption: 2 },
      },
      {
        id: 'c4_pulse_full_send',
        text: 'Everything. Let it go. Let the mark transmit everything it has been carrying.',
        nextNode: 'c4_mark_overload_end',
        effects: { corruption: 20 },
      },
    ],
  },

  {
    id: 'c4_furnace_mark_breaks_furnace',
    chapter: 'Chapter 4',
    title: 'What the Mark Remembered',
    location: 'Saint Furnace — Aftermath',
    imageKey: 'saint_furnace',
    text: `The break happens at the ninth chain from the north — you know this because the sound it makes is specific, a harmonic collapse that propagates through the entire array in the same way a fracture propagates through glass: total, immediate, irreversible. Every chain goes slack. Every arc-lamp in the Furnace flickers and three go dark. The vibration frequency drops to zero and the absence of it is louder than the sound was. The six prisoners on the platform are unrestrained now — the cuffs used a linked mechanism. Toma is already moving. He reaches you and takes your arm and says, in a voice that has been waiting two years to be used: "I know what the mark transmitted. I know where it went. We need to leave this building before I tell you, because they will know it transmitted and they will come for the source."`,
    dialogue: 'I know what it transmitted. We need to leave this building.',
    effectsOnEnter: {
      ironSaints: -20,
      corruption: 5,
      setFlags: ['furnace_broken', 'toma_knows_transmission', 'chapter4_furnace_route'],
    },
    choices: [
      {
        id: 'c4_break_move_out',
        text: 'Move. Now. Take Toma and anyone who can walk.',
        nextNode: 'c4_mira_escape_route',
        effects: { morale: 5 },
      },
    ],
  },

  {
    id: 'c4_furnace_mark_fails',
    chapter: 'Chapter 4',
    title: 'Not Enough',
    location: 'Saint Furnace — Central Platform',
    imageKey: 'saint_furnace',
    text: `The mark pushes but the array holds. You can feel it — the resistance of something built specifically to resist exactly this. The Doctrine of Remaining, encoded in iron and chain across thirty metres of ceiling and wall, is suppressing the mark's output at the frequency band the transmission requires. The mark is trying. You are trying. It is not enough, and the reinforcement from the Barracks arrives in the silence of the trying: nine soldiers, Malrec at the front, the particular expression on his face of someone whose procedural scenario has just confirmed itself.`,
    effectsOnEnter: { corruption: 3, health: -8, setFlags: ['furnace_intervention_failed'] },
    choices: [
      {
        id: 'c4_fail_surrender',
        text: 'Stop. Surrender. You are nine-to-one and the mark is depleted.',
        nextNode: 'c4_malrec_verdict_node',
        effects: { health: -5, ironSaints: -20 },
      },
      {
        id: 'c4_fail_ask_bellkeeper',
        text: 'Look to the Bellkeeper. She has not moved. She is watching. Ask her.',
        nextNode: 'c4_shrine_relic_touched',
        effects: { setFlags: ['bellkeeper_asked_for_help'] },
      },
    ],
  },

  {
    id: 'c4_furnace_execution_witness',
    chapter: 'Chapter 4',
    title: 'What the Furnace Requires',
    location: 'Saint Furnace — Observation Ledge',
    imageKey: 'saint_furnace',
    text: `You watch from the observation ledge. The Bellkeeper's ritual is not what you expected from the name: there is no fire, no physical destruction. The harmonic array, at full operation, produces a resonance field that extracts the corruption from the marked individuals on the platform. The process is visible — the corruption leaves the body as a phenomenon of light and heat and something the bell amplifies into audible frequency. It is not comfortable. Two of the six make sounds. When it is complete, the marks on their bodies are gone — not faded, gone, as if they were never there. The individuals are themselves, but smaller. Something was taken with the corruption. The woman with the mark on her neck looks at her hands for a long time after. She does not look relieved. She looks reduced.`,
    effectsOnEnter: { setFlags: ['furnace_witnessed'], morale: -3 },
    choices: [
      {
        id: 'c4_witness_move_toma',
        text: 'When they reach Toma: move. You promised you\'d get him out.',
        nextNode: 'c4_furnace_save_toma',
        requirements: { flags: ['toma_rescue_promised'] },
      },
      {
        id: 'c4_witness_all_of_it',
        text: 'Watch all of it. Let yourself understand what this Order does before deciding your next move.',
        nextNode: 'c4_furnace_save_toma',
        effects: { morale: -2, intelligence: 2 },
      },
    ],
  },

  {
    id: 'c4_furnace_save_toma',
    chapter: 'Chapter 4',
    title: 'Before the Bell',
    location: 'Saint Furnace — Platform Edge',
    imageKey: 'saint_furnace',
    speaker: 'Ashen Toma',
    text: `Toma sees you approaching. He says, very quietly: "Third from the left. When the Bellkeeper's attention moves to the sixth person on the line, there will be approximately forty-five seconds where the platform is in the acoustic shadow of the array's primary ring. During those forty-five seconds, the physical restraint is all that holds the mechanism. The mechanism is the same cuff model used in the metro holding cells." He pauses. "I have been here long enough to know the mechanism." He holds your gaze. "I need you to want to do this as much as I need you to be able to."`,
    effectsOnEnter: {},
    choices: [
      {
        id: 'c4_toma_agility_save',
        text: '[Roll dice — Agility] Use the shadow interval. Free Toma before the bell rings for him.',
        nextNode: 'c4_furnace_toma_saved',
        diceCheck: {
          stat: 'agility',
          difficulty: 12,
          diceType: 'd20',
          successNode: 'c4_furnace_toma_saved',
          failureNode: 'c4_malrec_verdict_node',
        },
      },
      {
        id: 'c4_toma_mark_disrupt',
        text: 'Use the mark. Disrupt the array\'s attention for the interval you need.',
        nextNode: 'c4_furnace_mark_pulse',
        effects: { corruption: 3 },
      },
    ],
  },

  {
    id: 'c4_furnace_toma_saved',
    chapter: 'Chapter 4',
    title: 'Out of the Array',
    location: 'Saint Furnace — Maintenance Exit',
    imageKey: 'saint_furnace',
    speaker: 'Ashen Toma',
    text: `The maintenance exit is exactly where the tactical wall said it would be. Toma moves quickly for someone who has been chained to a wall for three months — he moves with the efficiency of someone who has been running the escape in his mind long enough to have refined it. You are out of the Furnace and into the maintenance corridor before the Bellkeeper's bell rings for the third position on the platform. Toma stops at the first junction. He is breathing hard but his voice is controlled. "The mark transmitted when you used it in there. I could see it — the archive encoding that comes off the mark during transmission. I know where it was going. I know what it was saying." He looks at you. "You need to decide if you want to hear this now, in a corridor with limited exits, or later when we're somewhere with more options."`,
    effectsOnEnter: { setFlags: ['toma_saved', 'toma_has_intel'] },
    choices: [
      {
        id: 'c4_toma_tell_now',
        text: '"Now. Tell me now."',
        nextNode: 'c4_mira_escape_route',
        effects: { intelligence: 2, setFlags: ['toma_intel_received'] },
      },
      {
        id: 'c4_toma_mira_first',
        text: '"Mira first. She\'s in the Prison Carts. Then you tell us together."',
        nextNode: 'c4_carts_arrive',
        requirements: { miraPresent: true },
        effects: { miraTrust: 2, setFlags: ['toma_with_player'] },
      },
    ],
  },

  // ── PRISON CARTS ────────────────────────────────────────────────────────────

  {
    id: 'c4_carts_arrive',
    chapter: 'Chapter 4',
    title: 'The Prison Carts',
    location: 'Prison Carts — Western Station',
    imageKey: 'prison_carts',
    text: `The Prison Carts are not a metaphor: they are actual carts — modified metro maintenance vehicles, the rolling kind that run on the old track — converted to holding cells. Four of them, parked at the western station platform. Their sides have been plated with iron mesh, and within each mesh panel: people, standing or sitting in the specific compression of people who have been in transit too long. The manifest on the wall outside the station gives registration numbers and processing destinations. You scan it quickly. The woman in the second cart, standing at the near corner: the posture is Mira's. The way she is distributing her weight across both feet, the specific angle of her head — that is Mira calculating something. She has been calculating since they put her here.`,
    effectsOnEnter: { setFlags: ['prison_carts_reached'] },
    choices: [
      {
        id: 'c4_carts_find_mira',
        text: 'Move to the second cart. Let her see you.',
        nextNode: 'c4_carts_mira_found',
        requirements: { miraPresent: true },
      },
      {
        id: 'c4_carts_check_hollow',
        text: 'Check the fourth cart. That\'s where the Hollow Children adults would be processed.',
        nextNode: 'c4_carts_hollow_children',
      },
      {
        id: 'c4_carts_read_manifest',
        text: 'Read the full manifest. Know who is here and what their schedules are.',
        nextNode: 'c4_carts_mira_found',
        effects: { intelligence: 1 },
      },
      {
        id: 'c4_carts_surrender',
        text: 'Step into the processing line. Let them register you. You are too tired to keep fighting.',
        nextNode: 'c4_chains_forever_end',
        effects: { morale: -10 },
      },
    ],
  },

  {
    id: 'c4_carts_mira_found',
    chapter: 'Chapter 4',
    title: 'Second Cart',
    location: 'Prison Carts — Second Cart',
    imageKey: 'prison_carts',
    speaker: 'Mira',
    text: `She sees you before you reach the cart. She has already assessed the guard positions, the mesh tensioning, and the lock mechanism before you say anything. She speaks quietly through the mesh. "The lock is a three-point iron-bar system. Standard Saints detention model. It can be manipulated from the outside with a flat instrument at the second bar junction — I've been watching the guard who does the processing rounds and he uses a bolt plate. Three seconds per junction." She pauses. "I also have the access code for the platform junction. I memorised it when they processed me." She looks at you with the particular expression of someone monitoring their own trust. "I need to know: did you choose to be here, or did they bring you?"`,
    dialogue: 'I need to know: did you choose to be here, or did they bring you?',
    effectsOnEnter: { setFlags: ['mira_found'] },
    choices: [
      {
        id: 'c4_mira_answer_honest',
        text: '"I came for you. That\'s the whole answer."',
        nextNode: 'c4_mira_rescue_plan',
        effects: { miraTrust: 3 },
      },
      {
        id: 'c4_mira_answer_partial',
        text: '"It\'s complicated. I\'ll tell you everything when we\'re out."',
        nextNode: 'c4_mira_rescue_plan',
        effects: { miraTrust: 1 },
      },
      {
        id: 'c4_mira_answer_betrayal',
        text: '... You cannot answer her question the way she means it.',
        nextNode: 'c4_mira_rescue_plan',
        requirements: { flags: ['mira_betrayal_considered'] },
        effects: { miraTrust: -3, morale: -5, setFlags: ['mira_knows_something_wrong'] },
      },
    ],
  },

  {
    id: 'c4_mira_rescue_plan',
    chapter: 'Chapter 4',
    title: 'The Extraction',
    location: 'Prison Carts — Second Cart',
    imageKey: 'prison_carts',
    speaker: 'Mira',
    text: `She gives you the plan without pause — she has been refining it since they locked her in. "The processing guard does rounds every seven minutes. The junction at the north end of the platform is unlit — the arc-lamp went out during their last maintenance shift and hasn't been replaced. During the window between the guard's second and third round, that junction has zero visibility. That's the window." She passes something through the mesh — a flat piece of scrap metal, sharpened along one edge, the kind of tool a medic always carries in pieces that can be assembled. "For the second bar junction," she says. "Three seconds per junction. Go."`,
    effectsOnEnter: { setFlags: ['mira_rescue_plan_known'] },
    choices: [
      {
        id: 'c4_mira_rescue_roll',
        text: '[Roll dice — Agility] Three junctions. Seven-minute window. Move on the opening.',
        nextNode: 'c4_mira_rescue_dice',
        diceCheck: {
          stat: 'agility',
          difficulty: 12,
          diceType: 'd20',
          successNode: 'c4_mira_rescued',
          failureNode: 'c4_rescue_caught',
        },
      },
      {
        id: 'c4_mira_rescue_orin',
        text: 'Get Sister Orin to create a distraction. The processing window is longer with the guard diverted.',
        nextNode: 'c4_mira_rescued',
        requirements: { flags: ['orin_ally'] },
        effects: { setFlags: ['orin_distraction_used'] },
      },
      {
        id: 'c4_mira_rescue_hollow',
        text: 'Use the Hollow Children distraction plan. Two situations can share one disruption.',
        nextNode: 'c4_mira_rescued',
        requirements: { flags: ['hollow_distraction_agreed'] },
        effects: { hollowChildren: 5 },
      },
    ],
  },

  {
    id: 'c4_mira_rescue_dice',
    chapter: 'Chapter 4',
    title: 'Three Junctions',
    location: 'Prison Carts — North Junction',
    imageKey: 'prison_carts',
    text: `The north junction is dark in the way that dark is a fact rather than an obstacle. You use the flat of Mira's tool. First junction: two seconds — faster than she estimated. Second junction: three. Third junction: the tool slips at the bar-end and you spend four seconds recovering. The window has used six of its seven minutes. The bar swings free.`,
    effectsOnEnter: {},
    choices: [
      { id: 'c4_rescue_go_now', text: 'Go.', nextNode: 'c4_mira_rescued' },
    ],
  },

  {
    id: 'c4_rescue_caught',
    chapter: 'Chapter 4',
    title: 'Third Bar',
    location: 'Prison Carts — North Junction',
    imageKey: 'prison_carts',
    text: `The third junction. The tool slips. The bar makes a sound — not loud, but specific, the kind of sound that has no innocent explanation in a processing yard at night. The guard's rotation intersects yours in the nine seconds it takes you to assess the situation. His lantern finds you first.`,
    effectsOnEnter: { setFlags: ['rescue_compromised'], health: -10 },
    choices: [
      {
        id: 'c4_caught_run_anyway',
        text: 'Run. Get Mira and run.',
        nextNode: 'c4_mira_rescued',
        effects: { health: -5, morale: -3 },
      },
      {
        id: 'c4_caught_surrender_here',
        text: 'Stop. Surrender. There\'s another way out of this settlement.',
        nextNode: 'c4_malrec_verdict_node',
        effects: { ironSaints: -20 },
      },
    ],
  },

  {
    id: 'c4_mira_rescued',
    chapter: 'Chapter 4',
    title: 'Out',
    location: 'Prison Carts — Maintenance Passage',
    imageKey: 'prison_carts',
    speaker: 'Mira',
    text: `She is moving before the bar is fully open — she had her feet positioned. In the maintenance passage she takes a breath and then she starts moving again. "Tell me the settlement layout." You tell her. She processes it in real time, making small adjustments to direction without breaking pace. She does not ask what happened to her in the carts. She will ask later, when there is time for it to cost her something, which means she is filing it for when she can afford to pay. She looks at you once. "I'm going to ask you something when we're out and I need you to answer truthfully." She does not say what the question is. You already know she will find out what happened in the Confession Hall.`,
    effectsOnEnter: { miraTrust: 2, setFlags: ['mira_rescued', 'mira_rescue_complete', 'chapter4_mira_route'] },
    choices: [
      {
        id: 'c4_mira_resc_find_toma',
        text: 'Toma is in the Furnace — or was. Find him if he\'s free.',
        nextNode: 'c4_mira_escape_route',
        requirements: { flags: ['toma_saved'] },
      },
      {
        id: 'c4_mira_resc_go_hollow',
        text: 'The Hollow Children. The drain in the northeast wall. There\'s still time.',
        nextNode: 'c4_hollow_escape_secret',
        requirements: { flags: ['hollow_escape_plan_known'] },
      },
      {
        id: 'c4_mira_resc_leave',
        text: 'Leave. Now. While the window is open.',
        nextNode: 'c4_mira_escape_route',
      },
    ],
  },

  {
    id: 'c4_carts_hollow_children',
    chapter: 'Chapter 4',
    title: 'The Fourth Cart',
    location: 'Prison Carts — Fourth Cart',
    imageKey: 'prison_carts',
    text: `The Hollow Children adults in the fourth cart have the specific containment of people who have been processing their situation for longer than the containment. Two of them — the older ones, those who carry the chalk marks of leadership rank — are managing the others' state with small gestures and quiet words. They see you approach and their assessment is immediate. One speaks through the mesh: "The girl in the Yard. She reached you." Not a question. They have a communication system that functions even when separated by thirty metres of iron settlement.`,
    effectsOnEnter: { setFlags: ['hollow_adults_found'] },
    choices: [
      {
        id: 'c4_hollow_cart_plan',
        text: '"The drain. Northeast wall. Is the plan still workable from here?"',
        nextNode: 'c4_hollow_escape_secret',
        requirements: { flags: ['hollow_escape_plan_known'] },
        effects: { hollowChildren: 8 },
      },
      {
        id: 'c4_hollow_cart_help',
        text: '"I need to get you out. Tell me how."',
        nextNode: 'c4_hollow_escape_secret',
        effects: { hollowChildren: 5 },
      },
    ],
  },

  {
    id: 'c4_hollow_escape_secret',
    chapter: 'Chapter 4',
    title: 'The Northeast Drain',
    location: 'Purification Yard — Northeast Wall',
    imageKey: 'purification_yard',
    text: `The drain cover is exactly where the girl said it would be, and the bolt-pattern exactly as described. You create the distraction — not elegant, functional: a minor incident at the checkpoint gate that requires the northeast wall guards to move in response to the signal bell, which you trigger by dropping a support chain onto the alert mechanism near the western processing station. The guards move. The drain opens. The process takes fourteen minutes. Thirty-one people, in sequence, through a forty-centimetre drain into the sub-level access shaft below the settlement's footprint. The last person through is the girl with chalk in her hair. She passes you a piece of chalk with the Hollow Children's pattern on it — a specific pattern that is not a goodbye. It is a registration. You are now in their system. You are findable by them, now and afterward.`,
    effectsOnEnter: {
      hollowChildren: 20,
      setFlags: ['hollow_escape_complete', 'hollow_children_register_player', 'chapter4_hollow_route'],
    },
    choices: [
      {
        id: 'c4_hollow_esc_follow',
        text: 'Follow them into the sub-level. The drain is your exit too.',
        nextNode: 'c4_mira_escape_route',
        effects: { morale: 5 },
      },
      {
        id: 'c4_hollow_esc_stay',
        text: 'You\'re not done here. Toma. The Furnace. Then you leave.',
        nextNode: 'c4_furnace_arrive',
      },
    ],
  },

  {
    id: 'c4_mira_escape_route',
    chapter: 'Chapter 4',
    title: 'Exit Strategy',
    location: 'Settlement Perimeter — South Access',
    imageKey: 'iron_checkpoint',
    text: `The south access is less guarded than the gate — it serves the maintenance vehicles and the guards have a different rotation schedule than Malrec's checkpoint team. The combined information from the tactical wall, Mira's observation, and Sister Orin's clearance document (quietly left with you earlier, or passed by the Bellkeeper without explanation, depending on which version of events is true) gives you enough to clear the perimeter in the twenty-minute window between the 1800 shift change. You go. Toma, if you saved him, moves with the efficiency of someone motivated by very recent experience. Mira moves with the efficiency of someone who has been waiting to move. Outside the arc-lights: darkness, and cold, and the familiar smell of the metro tunnels in the distance.`,
    effectsOnEnter: { setFlags: ['settlement_exited'] },
    choices: [
      {
        id: 'c4_escape_final',
        text: 'Move. Don\'t stop until you\'re below ground.',
        nextNode: 'c4_chapter4_end',
        effects: { morale: 3 },
      },
    ],
  },

  // ── WAR SHRINE ──────────────────────────────────────────────────────────────

  {
    id: 'c4_shrine_arrive',
    chapter: 'Chapter 4',
    title: 'The War Shrine',
    location: 'War Shrine — Entry Hall',
    imageKey: 'war_shrine',
    text: `The War Shrine is the oldest part of the settlement — older than the Iron Saints, older than the Blackout, a metro hall that was already being used as a memorial before the collapse made memorials more prevalent. The Saints added their iconography but did not replace what was here: a wall of names, the names of people who died in the Reconstruction, each one stamped in iron at the moment of registration. The chain-and-flame is here, but so is the older symbol — a circle and a line, the metro's engineering emblem, from when the metro was still something people built together. The Bellkeeper is here. This is her domain. It smells of iron and old wax and something that is neither.`,
    effectsOnEnter: { setFlags: ['shrine_visited'] },
    choices: [
      {
        id: 'c4_shrine_go_bellkeeper',
        text: 'Approach the Bellkeeper directly.',
        nextNode: 'c4_bellkeeper_meet',
      },
      {
        id: 'c4_shrine_read_names',
        text: 'Read the names on the wall first. Know who the Saints call lost.',
        nextNode: 'c4_shrine_bellkeeper_domain',
        effects: { morale: -2, intelligence: 1 },
      },
    ],
  },

  {
    id: 'c4_shrine_bellkeeper_domain',
    chapter: 'Chapter 4',
    title: 'Among the Names',
    location: 'War Shrine — Names Wall',
    imageKey: 'war_shrine',
    text: `Six hundred and forty-three names. You count the rows. Each one registered on the day of death, the date stamped below. The dates cluster: most fall within the eighteen months after the Blackout, when the city's infrastructure failed and the Reconstruction Corps couldn't hold it together. Then a gap — two years of lower frequency. Then a second cluster, recent, beginning approximately fourteen months ago. The second cluster's dates carry a different annotation: a chain-link symbol, and a classification code you have not seen before. It is the same code on your evaluation form. Category One. These are people who died in the purification process.`,
    effectsOnEnter: { setFlags: ['shrine_names_read'] },
    choices: [
      {
        id: 'c4_names_seek_bellkeeper',
        text: 'Find the Bellkeeper. Ask her about the second cluster.',
        nextNode: 'c4_bellkeeper_meet',
        effects: { intelligence: 2 },
      },
    ],
  },

  {
    id: 'c4_bellkeeper_meet',
    chapter: 'Chapter 4',
    title: 'What the Bell Hears',
    location: 'War Shrine — Central Altar',
    imageKey: 'war_shrine',
    speaker: 'The Bellkeeper',
    text: `She is seated at the central altar — a shelf of relics, none of them Iron Saints iconography, all older and stranger than anything else in the settlement. She rings the bell once when you approach, softly, as a greeting. Its resonance interacts with the mark in a way that is not uncomfortable — it is clarifying, like tuning a stringed instrument. "The tone of your mark has two registers," she says. "The lower register is what the Order has been suppressing — the transmission frequency. The upper register is what the mark is listening for." She opens her hand. In it: a small iron disc, unadorned except for the circle-and-line symbol of the metro's old emblem. "This was in my hand when I woke after the Blackout. I do not know who put it there. The upper register of your mark matches its resonance exactly." She holds it out. "I think this belongs to your story, not mine."`,
    dialogue: 'The upper register of your mark is listening. I think this belongs to your story.',
    effectsOnEnter: { setFlags: ['bellkeeper_full_meeting', 'bellkeeper_gives_relic'] },
    choices: [
      {
        id: 'c4_bell_take_disc',
        text: 'Take it.',
        nextNode: 'c4_shrine_relic_touched',
        effects: { relics: 1, lastArchive: 10, setFlags: ['metro_disc_acquired'] },
      },
      {
        id: 'c4_bell_ask_what_it_hears',
        text: '"What does the upper register hear? What is it waiting for?"',
        nextNode: 'c4_shrine_relic_touched',
        effects: { intelligence: 2 },
      },
    ],
  },

  {
    id: 'c4_shrine_relic_touched',
    chapter: 'Chapter 4',
    title: 'The Shore',
    location: 'War Shrine — Relic Alcove',
    imageKey: 'war_shrine',
    speaker: 'The Bellkeeper',
    text: `She speaks slowly, with long pauses, the way relic-touched people often speak — as if receiving information at a pace she cannot control. "The mark is an anchor. Toma told you it carries a memory forward. That is correct but incomplete. The memory it carries is not an event. It is a direction. The mark knows where it is trying to transmit to. The shore." She rings the bell again. The relic in your hand — the metro disc — vibrates in response. "The Last Kingdom did not fall. It was moved. Moved to a specific location in the metro network, wrapped in the same harmonic structure as the chains in this building but inverted — designed to receive rather than suppress." She pauses. "The Iron Saints are suppressing something they found by accident. They are very afraid of what would happen if it received its signal." She looks at you. "I am not afraid. I have been waiting two years to meet someone who could send it."`,
    dialogue: 'The Last Kingdom was moved. The chain here suppresses the signal meant to reach it.',
    effectsOnEnter: { setFlags: ['mark_destination_known', 'last_kingdom_theory'], lastArchive: 10 },
    choices: [
      {
        id: 'c4_relic_challenge_veyra',
        text: 'Take this to Veyra. Show her what her Order has been suppressing and what it means.',
        nextNode: 'c4_shrine_challenge_veyra_setup',
        effects: { setFlags: ['challenge_veyra_with_knowledge'] },
      },
      {
        id: 'c4_relic_leave_shrine',
        text: 'Leave. You have what you came for. The argument with the Iron Saints can wait.',
        nextNode: 'c4_mira_escape_route',
        effects: { morale: 3 },
      },
      {
        id: 'c4_relic_scholar_end',
        text: '[Forgotten Scholar] This connects everything. The proscribed doctrine. The shore. You know what this means.',
        nextNode: 'c4_scholar_route_end',
        requirements: { backgrounds: ['forgotten_scholar'] },
        effects: { setFlags: ['scholar_full_picture'], lastArchive: 15 },
        isHidden: true,
      },
      {
        id: 'c4_relic_absorb_disc',
        text: 'Hold the disc and the mark together. Let them resonate. See what the Bellkeeper was waiting for.',
        nextNode: 'c4_bellkeeper_claimed_end',
        requirements: { flags: ['metro_disc_acquired'], corruption: 40 },
        effects: { corruption: 15 },
        isHidden: true,
      },
    ],
  },

  {
    id: 'c4_shrine_challenge_veyra_setup',
    chapter: 'Chapter 4',
    title: 'Chain Law',
    location: 'War Shrine — Challenge Platform',
    imageKey: 'war_shrine',
    text: `The chain law — you found it in Malrec's sermon, in the doctrine Orin showed you, in the Bellkeeper's half-spoken references — is older than Saint Veyra's command structure. The Iron Saints' original covenant included a formal challenge process: a person who believed the Order had violated its own principles could invoke the chain law in the War Shrine, which required the challenged party to respond in person. It is still technically in the doctrine. Veyra arrives within four minutes of the invocation bell. She is not surprised. You get the sense she has been waiting for this in the way she waits for all things: already in the room before you know you're arriving.`,
    effectsOnEnter: { setFlags: ['chain_law_invoked'] },
    choices: [
      {
        id: 'c4_chall_make_argument',
        text: '[Roll dice — Charisma] Make the argument. The Saints have been suppressing the mark\'s signal by accident — and what they\'ve suppressed is not a weapon. Show her the proof.',
        nextNode: 'c4_challenge_veyra_dice',
        diceCheck: {
          stat: 'charisma',
          difficulty: 14,
          diceType: 'd20',
          successNode: 'c4_challenge_veyra_win',
          failureNode: 'c4_challenge_veyra_lose',
        },
      },
    ],
  },

  {
    id: 'c4_challenge_veyra_dice',
    chapter: 'Chapter 4',
    title: 'The Argument',
    location: 'War Shrine — Challenge Platform',
    imageKey: 'war_shrine',
    text: `You lay out what you know. Toma's explanation. The Bellkeeper's account. The Doctrine of Remaining's actual text and its actual purpose — suppression, not purification. The Category One deaths on the wall behind you, the second cluster, the ones who died in a process Veyra believes is medicine. You say what you have to say clearly and without performance. The War Shrine's acoustics carry it. The Bellkeeper's bell is silent throughout. Veyra listens.`,
    effectsOnEnter: {},
    choices: [
      { id: 'c4_challenge_commit', text: 'Commit to every word. Let it land.', nextNode: 'c4_challenge_veyra_win' },
    ],
  },

  {
    id: 'c4_challenge_veyra_win',
    chapter: 'Chapter 4',
    title: 'The Saint\'s Silence',
    location: 'War Shrine — Challenge Platform',
    imageKey: 'war_shrine',
    speaker: 'Saint Veyra',
    text: `She is silent for thirty-seven seconds. You count because there is nothing else to do while she processes what you've said. When she speaks, her voice is the same as always — controlled, precise — but there is something underneath it now that was not there before. "I will not say you are right," she says. "I will say that the evidence you've presented requires a review of the purification protocol that should have happened before I signed it into operation." She pauses. "The chain law acknowledges the challenge as valid. As commander, I am required to act on a valid chain-law challenge within forty-eight hours." She turns to the names on the wall. She looks at the second cluster for a long time. "Give me forty-eight hours. Take the prisoner Toma. Take your companions. Come back and I will have an answer worth the argument you just made."`,
    dialogue: 'Give me forty-eight hours. Come back with your answer ready.',
    effectsOnEnter: { ironSaints: 20, setFlags: ['veyra_challenged_successfully', 'chapter4_challenge_route'] },
    choices: [
      {
        id: 'c4_win_seal',
        text: '"Forty-eight hours."',
        nextNode: 'c4_chapter4_end',
        effects: { morale: 5 },
      },
    ],
  },

  {
    id: 'c4_challenge_veyra_lose',
    chapter: 'Chapter 4',
    title: 'The Verdict',
    location: 'War Shrine — Challenge Platform',
    imageKey: 'war_shrine',
    speaker: 'Saint Veyra',
    text: `She listens. She considers. She says: "The chain law challenge is insufficient. The evidence is partial and the interpretation is speculative." She does not say it unkindly. "The marked individual is to be remanded to the purification protocol under standard Category One processing. The argument you made will be noted in the record. If the review committee agrees with your interpretation, your documentation will be updated posthumously." She signals the guards. Her expression does not change. She is not cruel. She is orderly. The distinction has never felt less meaningful.`,
    effectsOnEnter: { setFlags: ['veyra_challenge_failed'], ironSaints: -20, morale: -5 },
    choices: [
      {
        id: 'c4_lose_last_bell',
        text: 'Look to the Bellkeeper.',
        nextNode: 'c4_bellkeeper_meet',
        effects: { setFlags: ['bellkeeper_last_resort'] },
      },
      {
        id: 'c4_lose_full_mark',
        text: 'Use the mark. Everything. Now. Let it transmit.',
        nextNode: 'c4_mark_overload_end',
        effects: { corruption: 10, health: -15 },
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════════════════
  //  RESOLUTION / FACTION ENDING NODES
  // ════════════════════════════════════════════════════════════════════════════

  {
    id: 'c4_saints_join_complete',
    chapter: 'Chapter 4',
    title: 'The Iron Saint',
    location: 'Confession Hall — After Registration',
    imageKey: 'confession_hall',
    text: `The Iron Saints process your full integration in forty minutes. The paperwork, the brand confirmation, the chain-certification, the operational briefing that describes your first assignment as "mark-suppression support on Eastern Archive approach." You are given a room in the Barracks, an equipment allocation, and a name in the ledger. The name the ledger uses is not your name. It is your registration number. This is the same for every Saint. Veyra shakes your hand when the processing is complete. "The chain holds those who hold each other," she says. It is the Order's greeting. You say it back. The mark on your wrist has not quieted. The mark is patient. You are an Iron Saint now, and the mark is patient.`,
    effectsOnEnter: { ironSaints: 20, setFlags: ['game_complete', 'iron_saint_full', 'chapter4_saint_route'] },
    choices: [],
    isEnding: true,
    endingType: 'faction',
    endingId: 'ending_ch4_iron_saint',
  },

  {
    id: 'c4_infiltrate_success',
    chapter: 'Chapter 4',
    title: 'Deep Cover',
    location: 'Settlement Perimeter — South Exit',
    imageKey: 'iron_checkpoint',
    text: `You leave with the shift change at 1800, in a Saint uniform, carrying documentation that Sister Orin signed and the Bellkeeper countersigned and Veyra will spend three days looking for discrepancies in. You have the settlement layout, the patrol schedules, the purification protocol documentation, the Category One register, and Toma. The Iron Saints will know what happened eventually — they are too methodical not to find the inconsistencies. But eventually is not tonight, and tonight is what you have. The sub-level entrance is sixty metres south of the gate, exactly where the tactical wall said it would be. You go down. The dark is familiar. The mark is warm and very quiet, carrying something it collected in the harmonic array. You are out. You have time.`,
    effectsOnEnter: { ironSaints: -10, setFlags: ['chapter4_infiltrate_route', 'saints_intel_extracted'] },
    choices: [],
    isEnding: true,
    endingType: 'faction',
    endingId: 'ending_ch4_infiltrated',
  },

  {
    id: 'c4_scholar_route_end',
    chapter: 'Chapter 4',
    title: 'The Forbidden Index, Continued',
    location: 'War Shrine — Relic Alcove',
    imageKey: 'war_shrine',
    text: `The doctrine Orin showed you and the Bellkeeper confirmed and Toma contextualised resolves into a single picture that the Last Archive has apparently been managing in pieces, carefully, because the complete picture is the kind of thing that requires the same category of response as the Blackout itself. The marks, the shore, the Last Kingdom relocated — these are not metaphors. They are coordinates. You have three of the four required to triangulate the location. The fourth is in the Archive that Mira's former colleagues are guarding, which means the next step of this road requires going back to a door that did not open for you yet but will. The Bellkeeper sees you leave. She rings the bell once: the Hollow Children's three-tone acknowledgement, translated into iron. You are registered. You are findable. The road ahead has more of these moments, and each one matters.`,
    effectsOnEnter: { lastArchive: 10, setFlags: ['chapter4_scholar_route', 'last_kingdom_coords_partial'] },
    choices: [],
    isEnding: true,
    endingType: 'secret',
    endingId: 'ending_ch4_forgotten_scholar',
  },

  // ════════════════════════════════════════════════════════════════════════════
  //  BAD ENDING NODES
  // ════════════════════════════════════════════════════════════════════════════

  {
    id: 'c4_malrec_verdict_node',
    chapter: 'Chapter 4',
    title: 'Brother Malrec\'s Verdict',
    location: 'Saint Furnace — Processing Hold',
    imageKey: 'saint_furnace',
    speaker: 'Brother Malrec',
    text: `He reads from the ledger, which he has completed before entering the room. He does everything before entering rooms. "The marked individual, Category One, is assigned to the Saint Furnace for full purification under the standard protocol. The purification will proceed at maximum resonance to ensure complete mark removal." He closes the ledger. He looks at you without cruelty — cruelty would require him to be thinking about you personally, and he is thinking about the category. "The chain does not negotiate with what it contains," he says. He says it the way you say things you have said enough times that they no longer require feeling. The Furnace is already warm. The Bellkeeper has not arrived. There is no one in this room who will make a different decision.`,
    effectsOnEnter: { setFlags: ['malrec_verdict_given'] },
    choices: [],
    isEnding: true,
    endingType: 'death',
    endingId: 'ending_ch4_malrec_verdict',
  },

  {
    id: 'c4_purification_overburn_end',
    chapter: 'Chapter 4',
    title: 'What the Chain Takes',
    location: 'Purification Yard — Purification Station',
    imageKey: 'purification_yard',
    text: `The priest miscalculates the saturation level. You know this at seventy seconds when the process should be complete and is not — the harmonic frequency continues to climb past the treatment threshold, past the architectural limit, into the frequency band the Doctrine of Remaining classifies as "total mark integration removal." The mark resists. The corruption resists. You resist. None of these are the same thing as the priest having made a different entry in the protocol form. At ninety-eight seconds, the chain has taken everything it came for, and several things it was not supposed to take. The Furnace bell rings once. The priest writes the outcome in the ledger. He does not look up.`,
    effectsOnEnter: { setFlags: ['game_complete', 'purification_overburn'] },
    choices: [],
    isEnding: true,
    endingType: 'death',
    endingId: 'ending_ch4_purification_overburn',
  },

  {
    id: 'c4_mira_sold_end',
    chapter: 'Chapter 4',
    title: 'The Delivered Archive Agent',
    location: 'Confession Hall — Exit',
    imageKey: 'confession_hall',
    text: `The Iron Saints process Mira's registration in the same forty-minute window they process everything. She is assigned to the Eastern Archive suppression detail — her Last Archive knowledge is more valuable than her freedom, and Veyra has made the appropriate calculation. Your provisional asset status is confirmed. You have a room in the Barracks and access to the settlement's resources and a specific understanding of what the word "provisional" means when a Saint uses it. You do not go to the Cart station. You already know she is there and you already know you chose that. The mark on your wrist is quiet for three days after. Then it pulses once, in a direction you recognise as east. Toward whatever archive door Mira is now being used to locate. The mark has not forgiven you. You are not sure you have either.`,
    effectsOnEnter: { setFlags: ['mira_sold_complete'] },
    choices: [],
    isEnding: true,
    endingType: 'betrayal',
    endingId: 'ending_ch4_mira_sold',
  },

  {
    id: 'c4_cain_defect_end',
    chapter: 'Chapter 4',
    title: 'Unit Six Returns',
    location: 'Barracks of Ash — Enrollment Desk',
    imageKey: 'barracks_of_ash',
    text: `Cain signs the re-enlistment form with the same deliberateness he applies to everything. The desk soldier processes him in silence — they were clearly expecting this, or expecting someone who had left and returned, which amounts to the same protocol. His Unit Six position is reinstated. His operational status is updated. He places his hand on your shoulder and says, in the voice of someone who has made every part of this decision: "I told them where to find you. I'm sorry about that. I'm not sorry about what I got for it." The Iron Saints' retrieval team is efficient. They have had practice.`,
    effectsOnEnter: { setFlags: ['cain_defect_complete'], cainTrust: -5 },
    choices: [],
    isEnding: true,
    endingType: 'betrayal',
    endingId: 'ending_ch4_cain_defect',
  },

  {
    id: 'c4_mark_overload_end',
    chapter: 'Chapter 4',
    title: 'Maximum Amplitude',
    location: 'Saint Furnace — Array Centre',
    imageKey: 'saint_furnace',
    text: `The mark transmits at maximum amplitude. The array receives the transmission and the array was not built to receive at maximum amplitude — it was built to suppress, and what happens when a suppression field receives the thing it was suppressing at full power is neither purification nor medicine. The chains break in sequence from the south. The arc-lamps fail from the north. In the silence that follows, the mark on your wrist is gone — not suppressed, not reduced, but transmitted, sent, arrived wherever it was addressed to. You are still here. The mark is not. You are lighter than you have ever been and emptier than you have ever been and the difference between those two states is the whole of what has happened to you. The settlement is very quiet. The Bellkeeper's bell does not ring. It is listening.`,
    effectsOnEnter: { corruption: -100, setFlags: ['mark_fully_transmitted'] },
    choices: [],
    isEnding: true,
    endingType: 'corruption',
    endingId: 'ending_ch4_mark_overload',
  },

  {
    id: 'c4_bellkeeper_claimed_end',
    chapter: 'Chapter 4',
    title: 'Relic-Touched',
    location: 'War Shrine — Relic Alcove',
    imageKey: 'war_shrine',
    text: `The metro disc and the mark interact when they occupy the same hand for too long. The Bellkeeper saw this and did not stop you from taking it, which may mean she did not know or may mean she knew exactly what she was giving you. The interaction is not violent — it is absorptive. The disc and the mark enter a resonance loop the body is not designed to maintain at ambient temperature, and the resonance loop completes itself over the next four hours in the relic alcove, while the Bellkeeper sits beside you and rings the bell at intervals that match your breathing. When it is complete, you are still here. The disc is embedded in the mark. The mark has expanded to match something neither of you can name. The Bellkeeper bows her head. "The shore," she says. She rings the bell once more. It is the most beautiful sound you have ever heard. It will be the last sound you understand as a person who had a simple wrist.`,
    effectsOnEnter: { setFlags: ['bellkeeper_claimed'] },
    choices: [],
    isEnding: true,
    endingType: 'corruption',
    endingId: 'ending_ch4_bellkeeper_claimed',
  },

  {
    id: 'c4_chains_forever_end',
    chapter: 'Chapter 4',
    title: 'Registered',
    location: 'Prison Carts — Processing Hold',
    imageKey: 'prison_carts',
    text: `The Iron Saints' registration system is comprehensive. You are in it now — not as a provisional asset, not as an integrated Saint, but as a Category One Processing item, assigned to long-term containment pending the review committee's determination of the mark's operational status. The review committee meets quarterly. You have three months. The carts are cold in the way that long-term cold is cold: not a shock, just a fact, the same fact every morning. Ashen Toma is two carts over. He does not know you are here. You decide not to tell him. There is nothing he can do about it that he hasn't already been unable to do about his own situation, and knowing will cost him something he cannot afford. You are in the system. The system is very patient. So are you. You do not know yet if you are patient enough.`,
    effectsOnEnter: { setFlags: ['game_complete', 'player_imprisoned_ch4'] },
    choices: [],
    isEnding: true,
    endingType: 'wanderer',
    endingId: 'ending_ch4_chains_forever',
  },

  // ════════════════════════════════════════════════════════════════════════════
  //  CHAPTER CONCLUSION
  // ════════════════════════════════════════════════════════════════════════════

  {
    id: 'c4_chapter4_end',
    chapter: 'Chapter 4',
    title: 'Saints in Iron — After',
    location: 'Sub-Level Access — Below the Settlement',
    imageKey: 'collapsed_tunnel',
    text: `The access shaft takes you down six metres below the settlement's footprint. Down here the Iron Saints' arc-lights do not reach and the Doctrine of Remaining's frequency dampening is thin enough that the mark can breathe. You stop and let it breathe. What you carry out of the Saints' settlement: Toma, if you found him. Mira, if you freed her. The Hollow Children's coordinates, if they gave them. A relic that belongs to your story. A doctrine that has been proscribed for a reason. And an understanding of what the Iron Saints are — not monsters, not villains, not even wrong in every particular. An order that found a genuine power it could not understand and built a theology around suppressing it, because suppression was the only tool they had. Saint Veyra runs a clean administration. Brother Malrec writes careful ledgers. The Bellkeeper's bell is still ringing, somewhere above you. The Last Kingdom is waiting, somewhere below. The mark holds its direction. You follow it back toward the surface.`,
    effectsOnEnter: {
      setFlags: ['chapter4_complete'],
      ironSaints: 5,
      lastArchive: 5,
      morale: 3,
    },
    choices: [
      {
        id: 'c4_continue_to_ch5',
        text: 'Ascend. The Glass Court waits above.',
        nextNode: 'chapter5_start',
      },
    ],
  },
];
