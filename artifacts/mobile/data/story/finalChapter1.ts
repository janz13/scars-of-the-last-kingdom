import type { StoryNode } from '../types';

// ══════════════════════════════════════════════════════════════════════════════
//  FINAL CHAPTER 1 — THE LAST GATE
//  84 nodes · 10 locations · 4 dice checks · 23 endings
//  Major theme: Judgment before the end. Every prior choice is weighed.
//  The Gate beneath the city responds to who the mark-bearer has become.
//
//  Entry flags from Chapter 12 (any chapter12_complete ending):
//    chapter12_both_companions   → Mira and Cain descend with you
//    chapter12_mira_companion    → Mira only
//    chapter12_cain_companion    → Cain only
//    chapter12_lone_wanderer     → alone
//    crown_of_ash_savior         → savior route carried forward
//    tyrant_throne_claimed       → tyrant route carried forward
//    unity_almost_active         → secret unity gate available
//    iron_crown_held / glass_crown_held / hollow_crown_held /
//    red_crown_held / archive_crown_held → faction gates available
//    true_ending_route_active    → from Chapter 11, true gate opening
//    faction_truth_released      → from Chapter 11
//    mira_mercy_complete         → Mira's mercy arc complete
//    cain_stays_city             → Cain remained; message arrives here
//    corruption stat             → ≥70 consumed path; ≤30 clean path
//
//  Locations (10):
//    The Descent Stair · The Final Metro Line · The Bone Platform
//    The Memory Wall · The Companion Threshold · The Faction Hall
//    The Gate Antechamber · The Corruption Mirror
//    The Last Gate · The Door of No Return
// ══════════════════════════════════════════════════════════════════════════════

export const FINAL_CHAPTER_1_NODES: StoryNode[] = [

  // ── THE DESCENT STAIR ─────────────────────────────────────────────────────

  {
    id: 'final_chapter1_start',
    chapter: 'Final Chapter 1',
    title: 'The Last Gate',
    location: 'The Descent Stair',
    imageKey: 'descent_stair',
    text: `The stair descends below the Archive's lowest documented level. Below the sub-city. Below the transit line. Below everything the Blackout left named. The mark has been reading this direction since the first chapter — not as a destination, but as a gradient. The deeper the descent, the cleaner the signal. The stair is not on any faction's map. The stair is not on the Archive's official record. The stair exists because something was placed below the city that needed a way down, and the way down became, eventually, the only route that matters. This is where everything converges.`,
    effectsOnEnter: { setFlags: ['final_chapter1_begun', 'descent_stair_reached'] },
    choices: [
      {
        id: 'fc1_start_descend',
        text: 'Take stock of who made it here.',
        nextNode: 'fc1_descent_companion_check',
      },
    ],
  },

  {
    id: 'fc1_descent_companion_check',
    chapter: 'Final Chapter 1',
    title: 'Who Descended',
    location: 'The Descent Stair',
    imageKey: 'descent_stair',
    text: `The stair is wide enough for two. The mark reads the configuration it's been carrying since Chapter 12's resolution: who remained, who departed to their own war, who was never here to begin with. The signal below does not distinguish. The gate below responds to the mark, not to the company kept. But the company kept changes what the descent means, and what choices are available when the Gate finally asks.`,
    effectsOnEnter: {},
    choices: [
      {
        id: 'fc1_check_both',
        text: 'Both Mira and Cain descended.',
        nextNode: 'fc1_descent_both',
        requirements: { flags: ['chapter12_both_companions'] },
      },
      {
        id: 'fc1_check_mira',
        text: 'Mira descended with you.',
        nextNode: 'fc1_descent_mira_only',
        requirements: { flags: ['chapter12_mira_companion'] },
      },
      {
        id: 'fc1_check_cain',
        text: 'Cain descended with you.',
        nextNode: 'fc1_descent_cain_only',
        requirements: { flags: ['chapter12_cain_companion'] },
      },
      {
        id: 'fc1_check_alone',
        text: 'You descended alone.',
        nextNode: 'fc1_descent_alone',
        requirements: { flags: ['chapter12_lone_wanderer'] },
      },
      {
        id: 'fc1_check_default',
        text: 'Proceed.',
        nextNode: 'fc1_descent_alone',
      },
    ],
  },

  {
    id: 'fc1_descent_both',
    chapter: 'Final Chapter 1',
    title: 'Three at the Stair',
    location: 'The Descent Stair',
    imageKey: 'descent_stair',
    text: `Mira checks the air quality at the first landing. Cain counts the stair's structural load-bearing points without being asked. The specific competence of two people who have been doing this for thirteen chapters has reduced itself to something quieter than habit — closer to a language with no unnecessary words. The mark reads them both as it has read them since Chapter 1: familiar, stable, and worth the weight they add to every descent. The Gate below doesn't know what they are to you. It will, when you arrive.`,
    effectsOnEnter: { miraTrust: 3, cainTrust: 3, morale: 8, setFlags: ['fc1_both_companions'] },
    choices: [
      {
        id: 'fc1_both_descend',
        text: 'Descend together.',
        nextNode: 'fc1_metro_arrive',
      },
    ],
  },

  {
    id: 'fc1_descent_mira_only',
    chapter: 'Final Chapter 1',
    title: 'Mira at the Stair',
    location: 'The Descent Stair',
    imageKey: 'descent_stair',
    text: `Mira catalogs the stair's structural integrity the way she catalogs everything — not because she is afraid of it, but because she respects it enough to understand it before committing to it. "The load-bearing profile is pre-Blackout construction," she says. "Older. Not Archive-built. This was here before the Archive." The mark confirms it. This was always here. Whatever built it built it knowing someone would descend eventually. Mira looks at the bottom of the visible stair and then at you. "Then we go."`,
    effectsOnEnter: { miraTrust: 5, morale: 5, setFlags: ['fc1_mira_companion'] },
    choices: [
      {
        id: 'fc1_mira_descend',
        text: 'Descend with Mira.',
        nextNode: 'fc1_metro_arrive',
      },
    ],
  },

  {
    id: 'fc1_descent_cain_only',
    chapter: 'Final Chapter 1',
    title: 'Cain at the Stair',
    location: 'The Descent Stair',
    imageKey: 'descent_stair',
    text: `Cain reads the stair in seconds. "No observable threats. Pre-Blackout construction — older than the Saints' founding. The descent takes approximately forty minutes at a sustainable pace. We have light for three hours." He pauses at the first landing, looking at the mark on your wrist in the way he's been looking at it since Chapter 1 — not with suspicion anymore, but with the specific attentiveness of someone who has spent thirteen chapters learning what it means. "Whatever is at the bottom," he says, "we reach it."`,
    effectsOnEnter: { cainTrust: 5, morale: 5, setFlags: ['fc1_cain_companion'] },
    choices: [
      {
        id: 'fc1_cain_descend',
        text: 'Descend with Cain.',
        nextNode: 'fc1_metro_arrive',
      },
    ],
  },

  {
    id: 'fc1_descent_alone',
    chapter: 'Final Chapter 1',
    title: 'The Stair Alone',
    location: 'The Descent Stair',
    imageKey: 'descent_stair',
    text: `The stair reads differently alone. Everything reads differently alone — this is a truth the lone-wanderer configuration has been accumulating since the first node. The mark has no one to read as secondary resonance. It reads the stair itself, which is older than anything above it, which was built with specific intent, which has been waiting for this configuration with the patience of architecture designed to wait. You can leave. The stair will not pursue you. The choice to descend alone is the choice to arrive alone, and the Gate will receive what the mark has become without the context of who it was kept with. That changes what the Gate can offer.`,
    effectsOnEnter: { morale: -5, setFlags: ['fc1_lone_wanderer'] },
    choices: [
      {
        id: 'fc1_alone_descend',
        text: 'Descend. The Gate is what matters, not the company.',
        nextNode: 'fc1_metro_arrive',
      },
      {
        id: 'fc1_alone_depart',
        text: 'Walk away from the stair. This was never yours to finish.',
        nextNode: 'fc1_lone_wanderer_gate_end',
        requirements: { flags: ['chapter12_lone_wanderer'] },
      },
    ],
  },

  // ── THE FINAL METRO LINE ──────────────────────────────────────────────────

  {
    id: 'fc1_metro_arrive',
    chapter: 'Final Chapter 1',
    title: 'The Final Metro Line',
    location: 'The Final Metro Line',
    imageKey: 'final_metro_line',
    text: `Below the stair: a metro platform that no transit map ever recorded. The rails are intact. The signal lights still pulse — not with electricity, but with the same frequency the mark has been reading since the sub-city. The Final Metro Line was the original transit system, built before the Blackout, before the factions, before the Archive's formal founding. The train is still here. Parked at the platform. Powered by something that does not require fuel. The mark reads the platform as the original infrastructure of something that was designed to carry people to the Gate and back, before anyone decided the Gate was too dangerous to approach.`,
    effectsOnEnter: { setFlags: ['final_metro_reached'] },
    choices: [
      {
        id: 'fc1_metro_examine',
        text: 'Examine the metro platform before boarding.',
        nextNode: 'fc1_metro_blackout_memory',
      },
    ],
  },

  {
    id: 'fc1_metro_blackout_memory',
    chapter: 'Final Chapter 1',
    title: 'The Night It Started',
    location: 'The Final Metro Line',
    imageKey: 'final_metro_line',
    text: `The metro platform holds a memory the mark has been building toward since the prologue: the Blackout, from beneath. From here, the Blackout was not a catastrophe. It was a signal. The Gate's resonance, amplified through the metro infrastructure, propagating upward through the city in a configuration that was misread as a power failure because no one below-grade knew what the Gate was sending. Three hundred years of misreading a signal. The mark reads the original transmission now, in the place it originated: the Gate was not failing. It was calling. The city heard it as disaster. The city was wrong.`,
    effectsOnEnter: { intelligence: 3, morale: 5, setFlags: ['blackout_true_memory', 'blackout_understood'] },
    choices: [
      {
        id: 'fc1_memory_proceed',
        text: 'The memory is clear. Board the metro.',
        nextNode: 'fc1_metro_fragment_check',
      },
    ],
  },

  {
    id: 'fc1_metro_fragment_check',
    chapter: 'Final Chapter 1',
    title: 'What the Mark Carries',
    location: 'The Final Metro Line',
    imageKey: 'final_metro_line',
    text: `The train moves before anyone boards it. The mark is the ignition. The memory fragments accumulated across thirteen chapters — the sub-city truth, the entity's departure record, the Foundation Period's complete history — are reading the transit infrastructure as a request: present what you've found. The gate is running a preliminary evaluation on the ride down. Whatever the mark carries will determine what it finds when the train stops. The class and calibration of thirteen chapters of choice is being read right now, through the train's original interface, as the platform recedes.`,
    effectsOnEnter: { intelligence: 2, setFlags: ['gate_preliminary_evaluation'] },
    choices: [
      {
        id: 'fc1_metro_esper_read',
        text: 'The esper sense reaches through the train\'s architecture. Something responds.',
        nextNode: 'fc1_metro_esper_pulse',
        requirements: { classes: ['esper'] },
      },
      {
        id: 'fc1_metro_relic_scan',
        text: 'Run a full relic architecture scan. The transit system is a readable record.',
        nextNode: 'fc1_metro_relic_scan',
        requirements: { classes: ['relic_hunter'] },
      },
      {
        id: 'fc1_metro_just_ride',
        text: 'Let the mark carry what it carries. Don\'t try to manage the evaluation.',
        nextNode: 'fc1_metro_forward',
      },
    ],
  },

  {
    id: 'fc1_metro_esper_pulse',
    chapter: 'Final Chapter 1',
    title: 'The Gate\'s First Voice',
    location: 'The Final Metro Line',
    imageKey: 'final_metro_line',
    text: `The esper sense reaches through the train's relic architecture and finds the Gate's preliminary resonance — not a thought, not language, but the specific weight of something very old that has been waiting for something it recognizes. It recognizes the mark. Not the bearer — the mark. The thirteen chapters of calibration. The specific history of choices that produced this configuration. The impression it leaves is not approval, exactly. It is acknowledgment. The Gate knows the mark is coming. It has always known. The acknowledgment is: it is ready.`,
    effectsOnEnter: { intelligence: 4, morale: 8, setFlags: ['gate_acknowledged_mark', 'esper_gate_contact'] },
    choices: [
      {
        id: 'fc1_esper_continue',
        text: 'The Gate knows. Continue the descent.',
        nextNode: 'fc1_metro_forward',
      },
    ],
  },

  {
    id: 'fc1_metro_relic_scan',
    chapter: 'Final Chapter 1',
    title: 'The Transit Record',
    location: 'The Final Metro Line',
    imageKey: 'final_metro_line',
    text: `The relic scan reveals the Final Metro Line's full operational history: twelve thousand eight hundred and forty-three recorded trips from the surface to the Gate and back. The first four hundred years: routine. Then the Blackout. Then: no trips for three hundred years. Then: one trip, initiated by the mark's activation, occurring right now. The transit log shows that the return trip has always been scheduled. Whoever built this system expected the mark to make it down and expected it to need a way back. The scan shows three hundred years of unscheduled waiting.`,
    effectsOnEnter: { intelligence: 5, setFlags: ['transit_record_read', 'return_trip_known'] },
    choices: [
      {
        id: 'fc1_relic_continue',
        text: 'The record is complete. The Gate is expecting you.',
        nextNode: 'fc1_metro_forward',
      },
    ],
  },

  {
    id: 'fc1_metro_forward',
    chapter: 'Final Chapter 1',
    title: 'Arrival',
    location: 'The Final Metro Line',
    imageKey: 'final_metro_line',
    text: `The train stops at the Bone Platform. The mark knows this stop by the resonance — the same frequency the First Gate carried in the sub-city, amplified by the transit system's three-hundred-year storage of a signal that was building this whole time. The doors open. The platform is lit by something that is not electricity and is not fire and is not the relic infrastructure's standard luminescence. It is older than any of those. The platform is waiting. The choice to board was made many chapters ago. The choice to proceed is made here.`,
    effectsOnEnter: { setFlags: ['bone_platform_approach'] },
    choices: [
      {
        id: 'fc1_metro_exit',
        text: 'Exit onto the Bone Platform.',
        nextNode: 'fc1_bone_platform',
      },
    ],
  },

  // ── THE BONE PLATFORM ────────────────────────────────────────────────────

  {
    id: 'fc1_bone_platform',
    chapter: 'Final Chapter 1',
    title: 'The Bone Platform',
    location: 'The Bone Platform',
    imageKey: 'bone_platform',
    text: `The Bone Platform is named for its material: the walls are carved from compressed calcium deposits that are pre-human in origin, shaped by something that understood load-bearing architecture before the city above was founded. The mark reads the platform's construction the way it has read every space in thirteen chapters — as accumulated decision. The decision accumulated here is: this was built to be a waiting room. A place where whoever carried the mark would arrive, assess what they were carrying, and choose a direction before approaching the Gate. Three routes branch from the platform. The Gate is ahead. The Memory Wall, the Companion Threshold, and the Faction Hall are the three assessments the Gate runs before it opens.`,
    effectsOnEnter: { setFlags: ['bone_platform_reached'] },
    choices: [
      {
        id: 'fc1_bone_proceed',
        text: 'Read the three assessment chambers. The Gate is watching.',
        nextNode: 'fc1_bone_faction_representatives',
      },
    ],
  },

  {
    id: 'fc1_bone_faction_representatives',
    chapter: 'Final Chapter 1',
    title: 'The Assessors',
    location: 'The Bone Platform',
    imageKey: 'bone_platform',
    text: `At the platform's three branches, figures wait. They are not faction representatives — they are something the mark recognizes as the Gate's own assessment interface, wearing the faces of every decision made across thirteen chapters. The Memory Wall to the left holds the complete record. The Companion Threshold ahead holds the relational record. The Faction Hall to the right holds the institutional record. All three must be traversed before the Gate Antechamber opens. This is not a test. It is an accounting. The gate is not asking whether you are worthy. It is asking whether you know what you are carrying.`,
    effectsOnEnter: { intelligence: 2, setFlags: ['gate_assessment_begun'] },
    choices: [
      {
        id: 'fc1_bone_to_memory',
        text: 'The Memory Wall first. The record is the foundation of everything else.',
        nextNode: 'fc1_memory_wall',
      },
    ],
  },

  // ── THE MEMORY WALL ──────────────────────────────────────────────────────

  {
    id: 'fc1_memory_wall',
    chapter: 'Final Chapter 1',
    title: 'The Memory Wall',
    location: 'The Memory Wall',
    imageKey: 'memory_wall',
    text: `The Memory Wall is not a wall. It is a surface that plays back. Every major choice made across thirteen chapters exists in the wall's record — not as summary, but as the mark's own stored resonance. The specific frequency of each decision: which companions were kept, which factions were addressed, which truths were released, which corruptions were accepted. The wall does not judge the record. It displays it. The Gate is reading through the wall what the bearer is carrying. The bearer can read it too, from this side. The question the Memory Wall asks is not what you chose. It is: do you recognize what you chose, and do you carry it consciously?`,
    effectsOnEnter: { setFlags: ['memory_wall_reached'] },
    choices: [
      {
        id: 'fc1_wall_blackout',
        text: 'Begin with the Blackout memory. The first truth.',
        nextNode: 'fc1_memory_blackout',
      },
    ],
  },

  {
    id: 'fc1_memory_blackout',
    chapter: 'Final Chapter 1',
    title: 'The Night of the Signal',
    location: 'The Memory Wall',
    imageKey: 'memory_wall',
    text: `The Blackout memory plays in the wall: the moment the mark first activated, three years before the story's first node. The city's infrastructure cascade. The metro stampede. The mark reading every built space simultaneously for the first time — overwhelming, disorienting, the specific experience of a system that had been calibrating for the bearer's entire life suddenly going active. From the wall's vantage, the Blackout was not a disaster. It was the mark coming online. The city's infrastructure was not destroyed by the signal — it was not designed to receive the mark at full activation. The city was always underprepared for what the mark was. The Blackout was the evidence.`,
    effectsOnEnter: { intelligence: 2, setFlags: ['blackout_memory_reviewed'] },
    choices: [
      {
        id: 'fc1_blackout_companions',
        text: 'The companion memories next.',
        nextNode: 'fc1_memory_companions',
      },
    ],
  },

  {
    id: 'fc1_memory_companions',
    chapter: 'Final Chapter 1',
    title: 'Who Walked With You',
    location: 'The Memory Wall',
    imageKey: 'memory_wall',
    text: `The companion memory plays: every interaction with Mira and Cain across thirteen chapters, in the mark's resonance record. Not in words but in the specific thermal signature of trust accumulated or broken. Mira's trust record shows as a slow warmth — clinical at the start, something warmer by Chapter 4, something the mark reads as genuine by Chapter 7. Cain's shows as a colder architecture: respect, then something the mark reads as the functional equivalent of loyalty without its vocabulary. The wall is not recording what you feel about them. It is recording what the mark felt, through thirteen chapters of calibration, as the most legible reading of what was between you. What the mark felt is accurate.`,
    effectsOnEnter: { morale: 5, setFlags: ['companion_memory_reviewed'] },
    choices: [
      {
        id: 'fc1_companions_factions',
        text: 'The faction memories.',
        nextNode: 'fc1_memory_factions',
      },
    ],
  },

  {
    id: 'fc1_memory_factions',
    chapter: 'Final Chapter 1',
    title: 'Five Institutions',
    location: 'The Memory Wall',
    imageKey: 'memory_wall',
    text: `The faction memory plays: every reputation point, every alliance offered and refused, every negotiation and every failure of negotiation across thirteen chapters. The Iron Saints show as a weight. The Glass Court shows as a texture. The Red Choir shows as a frequency. The Last Archive shows as a depth. The Hollow Children show as something the mark reads as the oldest signal — older than any of the named factions, older than the city's formal organization, the resonance of people who adapted to a truth that everyone above them chose not to acknowledge. The five factions were not the city. They were the city's institutions. The city underneath them was always something else. The memory wall shows the difference.`,
    effectsOnEnter: { intelligence: 3, setFlags: ['faction_memory_reviewed'] },
    choices: [
      {
        id: 'fc1_factions_mark',
        text: 'The mark\'s origin memory.',
        nextNode: 'fc1_memory_mark_origin',
      },
    ],
  },

  {
    id: 'fc1_memory_mark_origin',
    chapter: 'Final Chapter 1',
    title: 'What the Mark Was Made For',
    location: 'The Memory Wall',
    imageKey: 'memory_wall',
    text: `The mark's origin memory plays last: not the bearer's activation at the Blackout, but the mark's design. Pre-Blackout. Pre-Foundation Period. The entity that departed through the First Gate was not the mark's creator — the entity was the mark's previous bearer. The mark is a tool for Gate navigation, passed through bearers across a span the wall shows as longer than any recorded history. The previous bearer opened the First Gate. The present bearer is here to decide what the Gate does next. The wall's final image: the Gate, seen from inside. It is asking. The specific question the Gate asks is calibrated to what the mark has accumulated. Thirteen chapters of calibration. The question is ready.`,
    effectsOnEnter: { intelligence: 5, morale: 5, setFlags: ['mark_origin_known', 'gate_question_approaching'] },
    choices: [
      {
        id: 'fc1_mark_weight_face',
        text: 'Face the weight of the complete record.',
        nextNode: 'fc1_memory_weight_dice',
      },
    ],
  },

  {
    id: 'fc1_memory_weight_dice',
    chapter: 'Final Chapter 1',
    title: 'The Weight of It',
    location: 'The Memory Wall',
    imageKey: 'memory_wall',
    text: `The complete record plays simultaneously — all of it, at once. Every choice, every companion interaction, every faction decision, every fragment of the entity's departure record, every moment of the sub-city's three-hundred-year truth. The mark processes what thirteen chapters of a city's accumulated history feels like when it is held consciously. Whether the bearer can hold it determines what they carry to the Gate. Whether they can hold it determines what the Gate receives.`,
    effectsOnEnter: {},
    choices: [
      {
        id: 'fc1_weight_roll',
        text: 'Hold the complete record. Carry it to the Gate.',
        nextNode: 'fc1_companion_threshold',
        diceCheck: {
          stat: 'intelligence',
          difficulty: 6,
          diceType: 'd8',
          successNode: 'fc1_companion_threshold',
          failureNode: 'fc1_companion_threshold',
          criticalFailureNode: 'fc1_memory_wall_collapse_end',
          successEffects: { intelligence: 3, morale: 5, setFlags: ['complete_record_held'] },
          failureEffects: { morale: -8, intelligence: -1 },
          criticalFailureEffects: { health: -50, morale: -20 },
        },
      },
    ],
  },

  // ── THE COMPANION THRESHOLD ──────────────────────────────────────────────

  {
    id: 'fc1_companion_threshold',
    chapter: 'Final Chapter 1',
    title: 'The Companion Threshold',
    location: 'The Companion Threshold',
    imageKey: 'companion_threshold',
    text: `The Companion Threshold is the second assessment chamber. It takes the form of a space that the Gate's architecture has configured to reflect the specific relational weight the mark carries: whoever descended with the bearer is here, in the threshold's record, as the clearest version of what they were across thirteen chapters. The threshold does not manufacture a confrontation. It presents what was already there. Whatever remains between the bearer and the companions who descended — trust, fracture, sacrifice, distance — the threshold makes it legible. The Gate is not interested in sentiment. It is interested in what the companion presence means for what the mark does at the Gate.`,
    effectsOnEnter: { setFlags: ['companion_threshold_reached'] },
    choices: [
      {
        id: 'fc1_threshold_assess',
        text: 'Face the companion record.',
        nextNode: 'fc1_threshold_companion_state',
      },
    ],
  },

  {
    id: 'fc1_threshold_companion_state',
    chapter: 'Final Chapter 1',
    title: 'The Relational Record',
    location: 'The Companion Threshold',
    imageKey: 'companion_threshold',
    text: `The threshold reads the companion configuration and presents it. The mark has been carrying this configuration since Chapter 12's exit. What it means at the Gate is: who is standing at the threshold alongside the bearer determines what Gate options are available, and what the Gate's assessment of the mark's relational record produces. The threshold is specific: it wants to know whether the companion relationship was real, or whether it was functional. The mark's thirteen-chapter record is unambiguous about the difference.`,
    effectsOnEnter: {},
    choices: [
      {
        id: 'fc1_state_both',
        text: 'Both companions are here. Face them both.',
        nextNode: 'fc1_threshold_both_scene',
        requirements: { flags: ['chapter12_both_companions'] },
      },
      {
        id: 'fc1_state_mira',
        text: 'Mira is here. Face her.',
        nextNode: 'fc1_threshold_mira_scene',
        requirements: { flags: ['chapter12_mira_companion'] },
      },
      {
        id: 'fc1_state_cain',
        text: 'Cain is here. Face him.',
        nextNode: 'fc1_threshold_cain_scene',
        requirements: { flags: ['chapter12_cain_companion'] },
      },
      {
        id: 'fc1_state_alone_through',
        text: 'No companions. Face the threshold alone.',
        nextNode: 'fc1_threshold_alone_proceed',
      },
    ],
  },

  {
    id: 'fc1_threshold_mira_scene',
    chapter: 'Final Chapter 1',
    title: 'Mira at the Threshold',
    location: 'The Companion Threshold',
    imageKey: 'companion_threshold',
    text: `Mira at the threshold is Mira at her clearest: the thirteen-chapter accumulation of a person who arrived as a medic with a clinical relationship to truth and developed something that the threshold's record reads as devotion — not to the bearer, specifically, but to what the bearer was trying to do. "I know what the Gate is," she says. "I've known since Chapter 7, when I found the Archive's secondary documentation." She did not say. She stayed. "I can go through with you. Or I can stay here — at the threshold — and keep it open. Those are different things for what you find on the other side." She is giving you the choice. The threshold is recording whether you understand what she's offering.`,
    effectsOnEnter: { miraTrust: 5, setFlags: ['mira_threshold_scene'] },
    choices: [
      {
        id: 'fc1_mira_bring_her',
        text: 'Bring Mira through. Her presence at the Gate changes what the Gate can offer.',
        nextNode: 'fc1_threshold_mira_choice',
        effects: { setFlags: ['mira_proceeds_to_gate'] },
      },
      {
        id: 'fc1_mira_let_sacrifice',
        text: 'Mira stays at the threshold. She holds it open. That is its own completion.',
        nextNode: 'fc1_mira_sacrifice_end',
        requirements: { flags: ['mira_mercy_complete'] },
      },
      {
        id: 'fc1_mira_abandon',
        text: 'Move past her without responding. The Gate is what matters.',
        nextNode: 'fc1_companion_abandonment_end',
      },
    ],
  },

  {
    id: 'fc1_threshold_mira_choice',
    chapter: 'Final Chapter 1',
    title: 'What Mira Carries',
    location: 'The Companion Threshold',
    imageKey: 'companion_threshold',
    text: `Mira walks through the threshold with the mark. The threshold's record updates: the companion relationship was real. The Gate receives this. On the other side of the threshold, Mira is holding something she picked up in Chapter 7 and has been carrying without naming — the Archive's assessment of what the mark was designed to find. "Whatever you decide at the Gate," she says, "you have the complete picture. You know that now." She is not asking you to decide anything. She is confirming that the decision, when it comes, is made with full information. That was always what she was for.`,
    effectsOnEnter: { miraTrust: 3, morale: 10, setFlags: ['mira_at_gate', 'companion_threshold_passed'] },
    choices: [
      {
        id: 'fc1_mira_choice_forward',
        text: 'Move toward the Faction Hall with Mira.',
        nextNode: 'fc1_faction_hall',
      },
    ],
  },

  {
    id: 'fc1_threshold_cain_scene',
    chapter: 'Final Chapter 1',
    title: 'Cain at the Threshold',
    location: 'The Companion Threshold',
    imageKey: 'companion_threshold',
    text: `Cain at the threshold is not a different Cain than the one who read the Ashen Square's perimeter in Chapter 12. He is the same Cain — the one who chose to descend rather than stay for his war, which was not a small choice. The threshold records it. He reads the threshold the way he reads everything — as a problem with variables and solutions. "The Gate's architecture suggests that whoever passes through it does not return the same way," he says. "I've seen this pattern in Old Government documentation. Foundation-period gate mechanics." He knows. "I'll go through with you. Or I'll hold the perimeter here. Either is a defensible position." He means it literally. The threshold is recording whether the bearer sees the weight in both options.`,
    effectsOnEnter: { cainTrust: 5, setFlags: ['cain_threshold_scene'] },
    choices: [
      {
        id: 'fc1_cain_bring_him',
        text: 'Cain comes through. His tactical read of the Gate changes what\'s available.',
        nextNode: 'fc1_threshold_cain_choice',
        effects: { setFlags: ['cain_proceeds_to_gate'] },
      },
      {
        id: 'fc1_cain_last_stand',
        text: 'Cain holds the perimeter. His last stand is here, at the threshold.',
        nextNode: 'fc1_cain_last_stand_end',
        requirements: { flags: ['cain_stays_city'] },
      },
      {
        id: 'fc1_cain_abandon',
        text: 'Walk past him without a word. The Gate is what matters.',
        nextNode: 'fc1_companion_abandonment_end',
      },
    ],
  },

  {
    id: 'fc1_threshold_cain_choice',
    chapter: 'Final Chapter 1',
    title: 'What Cain Carries',
    location: 'The Companion Threshold',
    imageKey: 'companion_threshold',
    text: `Cain passes through the threshold with the precision of someone who has been mentally modeling this space since the transit line. On the other side, he reads the Gate Antechamber the way he has read every tactically significant space across thirteen chapters — as a field. "The Antechamber is a pre-entry buffer," he says. "Standard gate architecture: the Gate reads the bearer before opening, and the buffer space is where the final assessment occurs." He looks at the mark. "The mark is what it is. The thirteen chapters built it. The Gate is going to receive exactly what was built." He does not say whether that's enough. He doesn't say it isn't.`,
    effectsOnEnter: { cainTrust: 3, morale: 8, setFlags: ['cain_at_gate', 'companion_threshold_passed'] },
    choices: [
      {
        id: 'fc1_cain_choice_forward',
        text: 'Move toward the Faction Hall with Cain.',
        nextNode: 'fc1_faction_hall',
      },
    ],
  },

  {
    id: 'fc1_threshold_both_scene',
    chapter: 'Final Chapter 1',
    title: 'Both at the Threshold',
    location: 'The Companion Threshold',
    imageKey: 'companion_threshold',
    text: `Mira and Cain at the threshold together produce a specific configuration: two people who have been working in close proximity for thirteen chapters and have developed the specific trust of people who never chose each other but never chose not to. Mira catalogs the threshold's architectural intent. Cain reads the structural load. They don't coordinate — they don't need to. The threshold's record reads both configurations simultaneously: the warmth of the medical relationship and the colder architecture of tactical trust. Together, they form something that the threshold records as the most complete companion configuration the Gate can receive. The bearer is not alone in any sense the Gate can measure.`,
    effectsOnEnter: { miraTrust: 3, cainTrust: 3, morale: 15, setFlags: ['both_companions_at_gate', 'companion_threshold_passed', 'mira_at_gate', 'cain_at_gate'] },
    choices: [
      {
        id: 'fc1_both_forward',
        text: 'Proceed together toward the Faction Hall.',
        nextNode: 'fc1_faction_hall',
      },
    ],
  },

  {
    id: 'fc1_threshold_alone_proceed',
    chapter: 'Final Chapter 1',
    title: 'No Companion Record',
    location: 'The Companion Threshold',
    imageKey: 'companion_threshold',
    text: `The threshold reads the companion configuration as: none. This is a legitimate configuration. The Gate's assessment does not weight lone-wanderer routes as lesser — it weights them as different. Without a companion record, the threshold presents the absence directly: this bearer chose to carry the mark without the weight of maintained relationships. The Gate receives that configuration as a specific kind of claim: I was accountable only to the mark's record and to myself. The claim is real. The threshold accepts it. The Gate will ask a different question than it asks bearers who arrived with companions. The lone-wanderer configuration opens certain routes that companioned routes do not, and closes others. Both are real.`,
    effectsOnEnter: { morale: 3, setFlags: ['lone_wanderer_threshold', 'companion_threshold_passed'] },
    choices: [
      {
        id: 'fc1_alone_proceed_faction',
        text: 'Proceed to the Faction Hall.',
        nextNode: 'fc1_faction_hall',
      },
    ],
  },

  // ── THE FACTION HALL ─────────────────────────────────────────────────────

  {
    id: 'fc1_faction_hall',
    chapter: 'Final Chapter 1',
    title: 'The Faction Hall',
    location: 'The Faction Hall',
    imageKey: 'faction_hall',
    text: `The Faction Hall is the third assessment chamber, and the one the Gate's architecture dedicates the most structural space to: because faction relationships, across the thirteen chapters, were the primary way the city organized its response to the mark's existence. The Hall is lined with five alcoves. Each alcove holds the resonance record of one faction's relationship with the mark-bearer across the game. They are not representations of the faction leaders — they are the mark's record of how each institution was engaged. The Gate is reading what the bearer did with the city's five most powerful institutions. Whether they were used, allied, ignored, or harmed determines what support, if any, arrives at the Gate.`,
    effectsOnEnter: { setFlags: ['faction_hall_reached'] },
    choices: [
      {
        id: 'fc1_faction_check',
        text: 'Read the faction alignment record.',
        nextNode: 'fc1_faction_hall_check',
      },
    ],
  },

  {
    id: 'fc1_faction_hall_check',
    chapter: 'Final Chapter 1',
    title: 'The Five Alcoves',
    location: 'The Faction Hall',
    imageKey: 'faction_hall',
    text: `Five alcoves. The mark reads each one: the Iron Saints' alcove glows with the specific warmth of their institutional authority — or is cold, depending on what Chapter 12 built. The Glass Court's alcove has a texture of layered intelligence — or is fractured, depending. The Red Choir's alcove resonates at the seventeen-fold frequency — or is silent. The Last Archive's alcove holds the depth of three centuries of documentation — or is sealed. The Hollow Children's alcove runs at the oldest frequency of all — or is empty. What the bearer built with each faction is visible here as resonance, readable by the mark as clearly as geography. The Gate is watching which alcoves are lit.`,
    effectsOnEnter: { intelligence: 2 },
    choices: [
      {
        id: 'fc1_hall_saints',
        text: 'The Iron Saints alcove is lit. Approach it.',
        nextNode: 'fc1_faction_hall_saints',
        requirements: { flags: ['iron_crown_held'] },
      },
      {
        id: 'fc1_hall_glass',
        text: 'The Glass Court alcove is lit. Approach it.',
        nextNode: 'fc1_faction_hall_glass',
        requirements: { flags: ['glass_crown_held'] },
      },
      {
        id: 'fc1_hall_choir',
        text: 'The Red Choir alcove is lit. Approach it.',
        nextNode: 'fc1_faction_hall_choir',
        requirements: { flags: ['red_crown_held'] },
      },
      {
        id: 'fc1_hall_archive',
        text: 'The Last Archive alcove is lit. Approach it.',
        nextNode: 'fc1_faction_hall_archive',
        requirements: { flags: ['archive_crown_held'] },
      },
      {
        id: 'fc1_hall_hollow',
        text: 'The Hollow Children alcove is lit. Approach it.',
        nextNode: 'fc1_faction_hall_hollow',
        requirements: { flags: ['hollow_crown_held'] },
      },
      {
        id: 'fc1_hall_none',
        text: 'No alcove is fully lit. The factions were not fully aligned.',
        nextNode: 'fc1_faction_hall_no_ally',
      },
    ],
  },

  {
    id: 'fc1_faction_hall_saints',
    chapter: 'Final Chapter 1',
    title: 'Iron Saints — The Gate Witness',
    location: 'The Faction Hall',
    imageKey: 'faction_hall',
    text: `The Saints alcove activates: Saint Veyra's revised crusade mandate, Inquisitor Sera's converted authority, and the twelve-chapter record of the Iron Saints' engagement with the mark-bearer — from the first checkpoint encounter to the Crown of Ash's final alliance. The Saints don't follow the mark to the Gate. They hold the city above it. What the alcove delivers is a structural commitment: the northern perimeter is held, the crusade mandate has been revised to exclude the mark-bearer as a target, and Veyra's formal recognition of the bearer's Archive authority is recorded here. The Gate reads the Saints' institutional weight as support. The alcove is light.`,
    effectsOnEnter: { ironSaints: 5, morale: 8, setFlags: ['saints_gate_support', 'faction_support_active'] },
    choices: [
      {
        id: 'fc1_saints_unified',
        text: 'The Saints are behind you. Move to the Hall\'s convergence.',
        nextNode: 'fc1_faction_unified',
      },
    ],
  },

  {
    id: 'fc1_faction_hall_glass',
    chapter: 'Final Chapter 1',
    title: 'Glass Court — The Intelligence Network',
    location: 'The Faction Hall',
    imageKey: 'faction_hall',
    text: `The Glass Court alcove activates: Seraphine's intelligence network, the disabled extraction device, and Juno's servant infrastructure all converted to the mark-bearer's route. The Glass Crown wasn't a political victory — it was an information victory. Every piece of classified Glass Court data on the Gate's location, the mark's architecture, and the Foundation Period's suppressed records is now accessible through the alcove's interface. Lady Seraphine's formal note, glass paper and glass stylus: "The Gate exists. The mark opens it. What you do with it is yours to decide. The Glass Court will not interfere with this decision. We do not have the authority, and we know it." The alcove is knowledge. The alcove is light.`,
    effectsOnEnter: { glassCourt: 5, intelligence: 3, setFlags: ['glass_gate_support', 'faction_support_active'] },
    choices: [
      {
        id: 'fc1_glass_unified',
        text: 'The Glass Court\'s network is committed. Move to the Hall\'s convergence.',
        nextNode: 'fc1_faction_unified',
      },
    ],
  },

  {
    id: 'fc1_faction_hall_choir',
    chapter: 'Final Chapter 1',
    title: 'Red Choir — The Broadcast',
    location: 'The Faction Hall',
    imageKey: 'faction_hall',
    text: `The Red Choir alcove activates: Mother Veyl's redirected broadcast, the seventeen-fold network carrying the sub-city truth through the city's infrastructure. The Red Crown was a frequency victory — the city heard what the sub-city had been trying to say for three hundred years, through the Choir's transmission architecture. At the Gate, the alcove carries the specific warmth of a broadcast that reached everyone it needed to reach. The city above is different because of it. Veyl's message through the alcove: "The city heard it. The mark carried it to us. The Gate will hear what the city became because of what you did. We are not here to follow you. We are the evidence that the following was unnecessary. The city leads itself now." The alcove hums.`,
    effectsOnEnter: { redChoir: 5, morale: 10, setFlags: ['choir_gate_support', 'faction_support_active'] },
    choices: [
      {
        id: 'fc1_choir_unified',
        text: 'The Choir broadcast is committed. Move to the Hall\'s convergence.',
        nextNode: 'fc1_faction_unified',
      },
    ],
  },

  {
    id: 'fc1_faction_hall_archive',
    chapter: 'Final Chapter 1',
    title: 'Last Archive — The Record',
    location: 'The Faction Hall',
    imageKey: 'faction_hall',
    text: `The Last Archive alcove activates: Archivist Mael's failsafe broadcast, the complete Containment Protocol history distributed to every registered receiving station in the city. The Archive Crown was a truth victory. The alcove holds Mael's full documentation — not summary, but the original record. Every faction received the truth. Every faction is now operating with information it was designed to suppress. Mael's presence in the alcove reads as the specific gravitas of someone who spent decades maintaining records that no one was supposed to see and finally released them. "The record is complete," the alcove says in Mael's voice. "Whoever bears the mark now carries the most documented approach to the Gate in three hundred years. Use it." The alcove is depth.`,
    effectsOnEnter: { lastArchive: 5, intelligence: 4, setFlags: ['archive_gate_support', 'faction_support_active'] },
    choices: [
      {
        id: 'fc1_archive_unified',
        text: 'The Archive\'s record is committed. Move to the Hall\'s convergence.',
        nextNode: 'fc1_faction_unified',
      },
    ],
  },

  {
    id: 'fc1_faction_hall_hollow',
    chapter: 'Final Chapter 1',
    title: 'Hollow Children — The Underground',
    location: 'The Faction Hall',
    imageKey: 'faction_hall',
    text: `The Hollow Children alcove activates — and it is the oldest resonance in the Hall, running at the frequency the mark has been reading since the sub-city as the most ancient signal in the city's infrastructure. The Hollow Children were below the city's decision for three hundred years. They are above it now, committed to the surface, carrying the specific knowledge of people who have been maintaining a space nobody thought mattered for exactly this moment. Mother Chalk's voice, from the alcove: "The Gate knows us. We maintained the approach for three hundred years. We are the reason the stair still stands. We are the reason the Metro still runs. We are the reason you found the platform. The Hollow Crown was always going to be here when you arrived."`,
    effectsOnEnter: { hollowChildren: 5, morale: 8, setFlags: ['hollow_gate_support', 'faction_support_active'] },
    choices: [
      {
        id: 'fc1_hollow_unified',
        text: 'The Children\'s commitment is received. Move to the Hall\'s convergence.',
        nextNode: 'fc1_faction_unified',
      },
    ],
  },

  {
    id: 'fc1_faction_hall_no_ally',
    chapter: 'Final Chapter 1',
    title: 'Cold Alcoves',
    location: 'The Faction Hall',
    imageKey: 'faction_hall',
    text: `The five alcoves are not fully lit. The faction relationships across thirteen chapters did not produce a Crown alignment — or the alignments that were built did not reach the Gate's recognition threshold. The Hall is not empty: the mark's resonance is present, and the Gate can read it. But the institutional weight of five aligned factions is not here. What is here: the bearer's individual record, the mark's thirteen chapters of solo calibration, and the specific quality of someone who reached the Gate without the city's institutions behind them. The Gate can receive this. It is a harder argument to make without institutional weight. Whether the argument can be made depends on what the mark carries without support.`,
    effectsOnEnter: { morale: -5, setFlags: ['faction_hall_no_support'] },
    choices: [
      {
        id: 'fc1_no_ally_continue',
        text: 'Proceed without faction support. The mark\'s record will have to be sufficient.',
        nextNode: 'fc1_faction_betrayal_dice',
      },
    ],
  },

  {
    id: 'fc1_faction_unified',
    chapter: 'Final Chapter 1',
    title: 'The Hall Unified',
    location: 'The Faction Hall',
    imageKey: 'faction_hall',
    text: `The active alcoves converge their resonance toward the Hall's center: a single point of institutional weight committed to the mark-bearer's approach to the Gate. This is what the faction relationships across thirteen chapters built. Not a throne — not authority over the factions — but a commitment from the city's institutions that the bearer's decision at the Gate is recognized as legitimate. The Gate receives this. The faction hall's assessment is complete. The Gate Antechamber is open.`,
    effectsOnEnter: { morale: 15, setFlags: ['faction_hall_unified', 'gate_antechamber_unlocked'] },
    choices: [
      {
        id: 'fc1_unified_proceed',
        text: 'The Hall is unified. Proceed to the Gate Antechamber.',
        nextNode: 'fc1_gate_antechamber',
      },
    ],
  },

  {
    id: 'fc1_faction_betrayal_dice',
    chapter: 'Final Chapter 1',
    title: 'The Hall Resists',
    location: 'The Faction Hall',
    imageKey: 'faction_hall',
    text: `Without a Crown alignment, the Faction Hall's assessment runs against the mark's record rather than with it. The five alcoves are not lit, but they are not empty — they hold the resonance of every faction interaction across thirteen chapters, and the Gate is reading what those interactions produced. The question the Hall asks, in the absence of institutional alignment, is: why should the Gate respond to this bearer? The mark has thirteen chapters of answer. Whether the answer is sufficient depends on whether the reasoning holds under the Hall's evaluation — which is, in practical terms, the Gate's own evaluation, conducted through institutional memory.`,
    effectsOnEnter: {},
    choices: [
      {
        id: 'fc1_betrayal_roll',
        text: 'Make the case through the mark\'s record alone. Thirteen chapters is the argument.',
        nextNode: 'fc1_gate_antechamber',
        diceCheck: {
          stat: 'charisma',
          difficulty: 8,
          diceType: 'd10',
          successNode: 'fc1_gate_antechamber',
          failureNode: 'fc1_faction_betrayal_end',
          criticalFailureNode: 'fc1_faction_betrayal_killed_end',
          successEffects: { morale: 10, setFlags: ['faction_hall_solo_passed', 'gate_antechamber_unlocked'] },
          failureEffects: { morale: -10, setFlags: ['faction_hall_failed'] },
        },
      },
    ],
  },

  // ── THE GATE ANTECHAMBER ─────────────────────────────────────────────────

  {
    id: 'fc1_gate_antechamber',
    chapter: 'Final Chapter 1',
    title: 'The Gate Antechamber',
    location: 'The Gate Antechamber',
    imageKey: 'gate_antechamber',
    text: `The Gate Antechamber is a buffer space — built between the assessment chambers and the Gate itself so that whatever arrived at the Gate had time to settle into full awareness of what it was carrying. The antechamber is warm in a way that is not temperature. It is the mark's resonance interacting with the Gate's preliminary field: a recognition event. The mark has been calibrating for this interaction since the first node. The Gate has been waiting for this configuration since the Blackout. The Masked Heir is here. Unmasked since Chapter 12's surface emergence, the Heir carries the final piece of information the Gate needs before it can open — or before it can choose not to.`,
    effectsOnEnter: { setFlags: ['gate_antechamber_reached'] },
    choices: [
      {
        id: 'fc1_antechamber_heir',
        text: 'Face the Masked Heir — unmasked now. The final truth.',
        nextNode: 'fc1_antechamber_heir_final',
      },
    ],
  },

  {
    id: 'fc1_antechamber_heir_final',
    chapter: 'Final Chapter 1',
    title: 'The Heir\'s Truth',
    location: 'The Gate Antechamber',
    imageKey: 'gate_antechamber',
    text: `The Heir, unmasked and carrying what they have been carrying since before Chapter 1's first node: the knowledge of what the mark is, where it comes from, and what it is designed to do. Glass Court bone structure and Foundation Period knowledge — they are not a Glass Court operative. They are the last recorded descendant of the Foundation Period's Gate Wardens: the family that was given the mark's maintenance documentation before the Blackout and has been waiting for the right bearer ever since. Three hundred years of waiting in a family that reduced itself to one person, who is standing in the antechamber now, holding the final documentation. They are deciding whether to give it to you.`,
    effectsOnEnter: { intelligence: 3, setFlags: ['heir_final_reveal', 'heir_antechamber'] },
    choices: [
      {
        id: 'fc1_heir_accept',
        text: 'Accept the Heir\'s documentation. Whatever they carry has been earned over three hundred years.',
        nextNode: 'fc1_antechamber_heir_accept',
      },
      {
        id: 'fc1_heir_reject',
        text: 'Reject the Heir\'s framing. The mark is what it is. No documentation changes what\'s been built.',
        nextNode: 'fc1_antechamber_heir_reject',
      },
      {
        id: 'fc1_heir_knife_retribution',
        text: 'The Heir moves first. The sub-city rejection has been carried here.',
        nextNode: 'fc1_heir_strikes_end',
        requirements: { flags: ['heir_knife_complete'] },
        isHidden: true,
      },
    ],
  },

  {
    id: 'fc1_antechamber_heir_accept',
    chapter: 'Final Chapter 1',
    title: 'The Warden\'s Record',
    location: 'The Gate Antechamber',
    imageKey: 'gate_antechamber',
    text: `The Heir hands over the documentation: six pages, Foundation Period handwriting, the Gate Warden family's maintenance record for the mark across twelve previous bearers. The mark has been through twelve other people before this one. Twelve openings or closings or sealings or transformations of the Gate, each one recorded in the Warden's family ledger. The current configuration — the one the mark built through thirteen chapters of this bearer's choices — is documented as: unresolved. Every previous bearer resolved the Gate question one way or another. The current bearer has not yet. "The Gate," the Heir says, "is asking what you will do that none of the twelve before you did." They don't say what that is. The documentation does not say. The antechamber is warm and waiting.`,
    effectsOnEnter: { intelligence: 6, morale: 8, setFlags: ['warden_record_received', 'twelve_bearers_known'] },
    choices: [
      {
        id: 'fc1_heir_accept_proceed',
        text: 'The Warden\'s record is carried. Proceed to the Corruption Mirror.',
        nextNode: 'fc1_antechamber_mark_resonance',
      },
    ],
  },

  {
    id: 'fc1_antechamber_heir_reject',
    chapter: 'Final Chapter 1',
    title: 'The Mark\'s Own Record',
    location: 'The Gate Antechamber',
    imageKey: 'gate_antechamber',
    text: `The Heir holds the documentation. The mark's thirteen-chapter record is the only documentation that matters here — not the Warden family's three-hundred-year ledger, but what was built specifically by this bearer's specific choices. The Heir does not argue. "The Gate will read what you built," they say. "If it's sufficient, the documentation doesn't matter." They step aside. The antechamber holds both possibilities: the Warden's record waiting at the Heir's side, the mark's own record present in the bearer's accumulated choices. The Gate will evaluate both, even if only one was consciously offered.`,
    effectsOnEnter: { intelligence: 2, setFlags: ['heir_documentation_declined'] },
    choices: [
      {
        id: 'fc1_heir_reject_proceed',
        text: 'Proceed on the mark\'s own record.',
        nextNode: 'fc1_antechamber_mark_resonance',
      },
    ],
  },

  {
    id: 'fc1_antechamber_mark_resonance',
    chapter: 'Final Chapter 1',
    title: 'The Preliminary Reading',
    location: 'The Gate Antechamber',
    imageKey: 'gate_antechamber',
    text: `The antechamber runs its final assessment: the mark's complete resonance record, the companion configuration, the faction alignment, the memory wall review, the corruption level. The Gate is reading everything simultaneously through the antechamber's interface. The result of the reading is not a verdict — it is a routing: based on what the mark carries, certain Gate options become available. Certain options are locked. The Corruption Mirror is available if the corruption level requires evaluation. The Last Gate is ahead in all configurations. The antechamber is the last moment before the Gate asks its question.`,
    effectsOnEnter: { setFlags: ['antechamber_assessment_complete'] },
    choices: [
      {
        id: 'fc1_resonance_mirror',
        text: 'The corruption level requires the Mirror\'s evaluation first.',
        nextNode: 'fc1_corruption_mirror',
        requirements: { corruption: 40 },
      },
      {
        id: 'fc1_resonance_direct',
        text: 'Proceed directly to the Last Gate. The record speaks for itself.',
        nextNode: 'fc1_last_gate',
      },
      {
        id: 'fc1_resonance_companion_surge',
        text: 'The antechamber field surges. The companion absorbs the release.',
        nextNode: 'fc1_companion_killed_end',
        requirements: { corruption: 85 },
        isHidden: true,
      },
    ],
  },

  // ── THE CORRUPTION MIRROR ────────────────────────────────────────────────

  {
    id: 'fc1_corruption_mirror',
    chapter: 'Final Chapter 1',
    title: 'The Corruption Mirror',
    location: 'The Corruption Mirror',
    imageKey: 'corruption_mirror',
    text: `The Corruption Mirror is the Gate's evaluation mechanism for mark configurations that carry significant relic contamination. Not a punishment — an assessment. The mirror shows what the corruption has done to the mark's architecture: how much of the bearer's original signal has been displaced by the accumulated weight of the relic field's destabilizing effects. The mirror is not interested in whether the corruption was chosen or unavoidable. It is measuring whether what is left is still capable of bearing the Gate's question. Whether the mark, as currently configured, can carry an answer without the corruption answering for it.`,
    effectsOnEnter: { setFlags: ['corruption_mirror_reached'] },
    choices: [
      {
        id: 'fc1_mirror_face',
        text: 'Face the mirror\'s evaluation.',
        nextNode: 'fc1_mirror_reflection',
      },
    ],
  },

  {
    id: 'fc1_mirror_reflection',
    chapter: 'Final Chapter 1',
    title: 'The Reflection',
    location: 'The Corruption Mirror',
    imageKey: 'corruption_mirror',
    text: `The mirror shows the mark's current architecture: the bearer's original signal, and over it, the corruption's accumulated weight. The mirror reads the levels. The result routes the bearer to the appropriate evaluation path. This is not a value judgment — the mirror has no opinion. It is the Gate's diagnostic tool, processing the specific interaction between relic contamination and the mark's function. The diagnostic result determines which Gate options the bearer can access and which are closed by the corruption's presence.`,
    effectsOnEnter: { intelligence: 2 },
    choices: [
      {
        id: 'fc1_mirror_high',
        text: 'The mirror shows severe corruption — ≥ 70. The architecture is unstable.',
        nextNode: 'fc1_mirror_high_corruption',
        requirements: { corruption: 70 },
      },
      {
        id: 'fc1_mirror_medium',
        text: 'The mirror shows moderate corruption. The architecture holds.',
        nextNode: 'fc1_mirror_medium_corruption',
        requirements: { corruption: 40 },
      },
      {
        id: 'fc1_mirror_low',
        text: 'The mirror shows minimal corruption. The mark is clean.',
        nextNode: 'fc1_mirror_low_corruption',
      },
    ],
  },

  {
    id: 'fc1_mirror_high_corruption',
    chapter: 'Final Chapter 1',
    title: 'Unstable Architecture',
    location: 'The Corruption Mirror',
    imageKey: 'corruption_mirror',
    text: `The mirror shows a corruption level that has restructured the mark's architecture around itself: the bearer's original signal is still present, but the corruption has become load-bearing. Removing it would destabilize the entire structure. The Gate can receive this configuration — it has received corrupted marks before; the Warden's record shows three. What the Gate cannot offer corrupted configurations is the clean resolution paths. The options available are tyrant-controlled, corruption-integrated, or the specific resolution that occurs when the mark collapses under its own weight at the gate threshold. The mirror is showing all three. The choice is whether to attempt a resistance — or to proceed with what is actually present.`,
    effectsOnEnter: { corruption: 10, setFlags: ['high_corruption_mirror'] },
    choices: [
      {
        id: 'fc1_high_resist',
        text: 'Attempt to resist the corruption\'s dominance before approaching the Gate.',
        nextNode: 'fc1_corruption_threshold_end',
        requirements: { corruption: 80 },
      },
      {
        id: 'fc1_high_accept',
        text: 'Proceed with the corrupted architecture. The Gate receives what is actually here.',
        nextNode: 'fc1_last_gate',
        effects: { setFlags: ['corruption_accepted_at_mirror'] },
      },
      {
        id: 'fc1_high_collapse',
        text: 'The corruption surges in the mirror\'s field. The architecture cannot hold.',
        nextNode: 'fc1_corruption_consumed_end',
        requirements: { corruption: 90 },
        isHidden: true,
      },
    ],
  },

  {
    id: 'fc1_mirror_medium_corruption',
    chapter: 'Final Chapter 1',
    title: 'The Architecture Holds',
    location: 'The Corruption Mirror',
    imageKey: 'corruption_mirror',
    text: `The mirror shows moderate corruption: present, weighted, but not structural. The mark's original signal is still the load-bearing element. The corruption adds a specific texture — decisions made at cost, relic interactions that left residue — but the mark's core architecture is intact. The Gate can receive this configuration across multiple resolution paths, with some modification to what's available. The tyrant path is open because the corruption is sufficient for it. The savior path is still open because the corruption is not dominant. The decision at the Gate is still genuinely the bearer's.`,
    effectsOnEnter: { morale: 3, setFlags: ['medium_corruption_mirror', 'corruption_mirror_passed'] },
    choices: [
      {
        id: 'fc1_medium_proceed',
        text: 'The mirror\'s evaluation is complete. Proceed to the Last Gate.',
        nextNode: 'fc1_last_gate',
      },
    ],
  },

  {
    id: 'fc1_mirror_low_corruption',
    chapter: 'Final Chapter 1',
    title: 'The Clean Signal',
    location: 'The Corruption Mirror',
    imageKey: 'corruption_mirror',
    text: `The mirror shows a mark with minimal corruption: the bearer's original signal runs clear, the relic interactions across thirteen chapters have been metabolized rather than accumulated, and the architecture is stable. The Gate reads this configuration as the most functional available: all resolution paths are open, the true-ending requirements are satisfied at the corruption level, and the bearing capacity for whatever the Gate's answer requires is at maximum. The mirror dims — evaluation complete — and the warmth of the clean signal fills the room. The mark feels different from this side of the mirror. Not stronger. More itself.`,
    effectsOnEnter: { morale: 12, intelligence: 3, setFlags: ['low_corruption_mirror', 'corruption_mirror_passed', 'clean_signal'] },
    choices: [
      {
        id: 'fc1_low_proceed',
        text: 'The mark is clean. Proceed to the Last Gate.',
        nextNode: 'fc1_last_gate',
      },
    ],
  },

  // ── THE LAST GATE ─────────────────────────────────────────────────────────

  {
    id: 'fc1_last_gate',
    chapter: 'Final Chapter 1',
    title: 'The Last Gate',
    location: 'The Last Gate',
    imageKey: 'last_gate',
    text: `The Last Gate is the reason the city exists. Not metaphorically — literally: the city above was founded around the infrastructure that the Gate required for its operation, and three hundred years of faction conflict were the superstructure built over a single architectural fact: something beneath the city needed to be either managed or opened, and nobody above agreed on which, and the disagreement built walls and institutions and wars until it built the city the bearer has been navigating for thirteen chapters. The Gate is: a surface approximately four meters tall and three meters wide, composed of the same compressed calcium material as the Bone Platform but older, older than anything that has been dated in the city's archaeological record. And it is warm. And it is asking.`,
    effectsOnEnter: { setFlags: ['last_gate_reached'] },
    choices: [
      {
        id: 'fc1_gate_approach',
        text: 'Approach the Gate. Let it read what the mark has become.',
        nextNode: 'fc1_gate_judgment',
      },
    ],
  },

  {
    id: 'fc1_gate_judgment',
    chapter: 'Final Chapter 1',
    title: 'The Question',
    location: 'The Last Gate',
    imageKey: 'last_gate',
    text: `The Gate reads the mark — all of it, in the specific way that architecture designed for this purpose reads: not the bearer's intentions, but the mark's record of what the bearer actually did across thirteen chapters. The reading takes approximately two minutes. At the end of the reading, the Gate asks its question. Not in language — in the mark. In the specific resonance that corresponds to the decision the Gate needs from this bearer. Translated into the closest available language: the Gate is not asking what you want. It is asking what you understand. And what you will do with that understanding. The Gate's five available responses are presented simultaneously, as options that the mark's configuration makes accessible. Some are closed. Some are open. All are irreversible.`,
    effectsOnEnter: { intelligence: 5, setFlags: ['gate_question_received'] },
    choices: [
      {
        id: 'fc1_judge_open',
        text: 'Open the Gate. Release what is below into the city above.',
        nextNode: 'fc1_gate_open_choice',
      },
      {
        id: 'fc1_judge_seal',
        text: 'Seal the Gate. The city does not need to know what is below.',
        nextNode: 'fc1_gate_seal_dice',
      },
      {
        id: 'fc1_judge_control',
        text: 'Control the Gate. Use the mark\'s authority to regulate what passes through.',
        nextNode: 'fc1_gate_control_choice',
      },
      {
        id: 'fc1_judge_destroy',
        text: 'Destroy the Gate. Remove the choice from the world entirely.',
        nextNode: 'fc1_gate_destroy_choice',
      },
      {
        id: 'fc1_judge_merge',
        text: 'Merge with the Gate. Become the permanent bridge.',
        nextNode: 'fc1_gate_merge_choice',
      },
    ],
  },

  {
    id: 'fc1_gate_open_choice',
    chapter: 'Final Chapter 1',
    title: 'The Opening',
    location: 'The Last Gate',
    imageKey: 'last_gate',
    text: `Opening the Gate releases what has been below the city into the city above. The Gate's architecture has been building toward this event for three hundred years. The mark can execute it. The question is what the opening is for: whether it is the true opening — the original agreement's completion, the entity's sanctioned release protocol, the Foundation Period's intended resolution — or whether it is a forced opening, releasing something that was not designed to be released in this configuration, without the complete record, without the correct interface. The mark knows the difference. The Gate is asking which opening this is.`,
    effectsOnEnter: { setFlags: ['gate_open_chosen'] },
    choices: [
      {
        id: 'fc1_open_true',
        text: 'Execute the true opening. The complete record, the original agreement, the correct interface.',
        nextNode: 'fc1_gate_true_ending_check',
        requirements: { flags: ['true_ending_route_active'] },
      },
      {
        id: 'fc1_open_unity',
        text: 'Open through the unity framework. What the city almost unified around.',
        nextNode: 'fc1_gate_true_ending_check',
        requirements: { flags: ['unity_almost_active'] },
      },
      {
        id: 'fc1_open_force',
        text: 'Force the Gate open. The thirteen-chapter record is enough.',
        nextNode: 'fc1_false_gate_opening_end',
      },
      {
        id: 'fc1_open_force_inside',
        text: 'Force the Gate open from inside the threshold. The pressure differential takes everything.',
        nextNode: 'fc1_false_gate_end',
        requirements: { corruption: 60 },
        isHidden: true,
      },
    ],
  },

  {
    id: 'fc1_gate_true_ending_check',
    chapter: 'Final Chapter 1',
    title: 'The Original Agreement',
    location: 'The Last Gate',
    imageKey: 'last_gate',
    text: `The true opening requires the complete set of conditions the Foundation Period's Gate Wardens specified: the complete record held consciously, the correct interface executed by the mark, the original agreement's terms understood and confirmed. The mark runs the validation — checking every flag set across thirteen chapters against the Warden's documented requirements. The validation result is immediate and specific: either the configuration is complete, or it identifies exactly what is missing. The Gate is holding its breath — architecturally. It has been holding it for three hundred years.`,
    effectsOnEnter: { intelligence: 3, setFlags: ['true_ending_validation'] },
    choices: [
      {
        id: 'fc1_true_validate_full',
        text: 'All conditions met. Execute the original agreement.',
        nextNode: 'fc1_true_ending_path_end',
        requirements: { flags: ['true_ending_route_active', 'complete_record_held', 'faction_truth_released'] },
      },
      {
        id: 'fc1_true_validate_unity',
        text: 'The unity path provides an alternate valid configuration.',
        nextNode: 'fc1_unity_gate_end',
        requirements: { flags: ['unity_almost_active', 'gate_acknowledged_mark'] },
      },
      {
        id: 'fc1_true_validate_incomplete',
        text: 'The validation is incomplete. Proceed through the Door of No Return.',
        nextNode: 'fc1_door_of_no_return',
      },
    ],
  },

  {
    id: 'fc1_gate_seal_dice',
    chapter: 'Final Chapter 1',
    title: 'The Sealing',
    location: 'The Last Gate',
    imageKey: 'last_gate',
    text: `Sealing the Gate requires the mark to execute a specific function it has never used: not navigation, not communication, not resonance translation — closure. The Gate's sealing mechanism requires the bearer to understand what they are closing and why, and to commit the closing as a permanent record in the mark's architecture. The sealing is not reversible. The Gate will not open again after this bearer seals it — not for the current generation, not for any future generation that does not carry a mark. Whether sealing is the right decision is the question the mark cannot answer. The bearer has to answer it.`,
    effectsOnEnter: { setFlags: ['gate_seal_chosen'] },
    choices: [
      {
        id: 'fc1_seal_roll',
        text: 'Execute the sealing. The city does not need what is below it.',
        nextNode: 'fc1_gate_seal_success',
        diceCheck: {
          stat: 'charisma',
          difficulty: 7,
          diceType: 'd10',
          successNode: 'fc1_gate_seal_success',
          failureNode: 'fc1_last_gate_lockin_end',
          criticalFailureNode: 'fc1_last_gate_lockin_end',
          successEffects: { morale: 10, setFlags: ['gate_sealing_in_progress'] },
          failureEffects: { morale: -15, health: -20 },
        },
      },
    ],
  },

  {
    id: 'fc1_gate_seal_success',
    chapter: 'Final Chapter 1',
    title: 'The Gate Closes',
    location: 'The Last Gate',
    imageKey: 'last_gate',
    text: `The sealing executes. The mark's architecture shifts to accommodate the function — it is not painful, but it is permanent: the mark changes in a way that can be felt, the specific change of a system that has completed its primary function and has transitioned to a secondary state. The Gate closes. Not loudly — the Gate has been patient for three hundred years; it closes with the same patience. The warmth of the antechamber diminishes. The city above will never know exactly what the Gate was. What the city will know is that it stopped responding. Whether that is the right outcome — whether a closed city is a safer city — is a question the sealing does not answer. The answer was already given in thirteen chapters of choices.`,
    effectsOnEnter: { morale: 15, setFlags: ['gate_sealed'] },
    choices: [
      {
        id: 'fc1_seal_savior',
        text: 'The Gate is sealed. The city is protected. Ascend.',
        nextNode: 'fc1_gate_sealed_savior_end',
        requirements: { flags: ['crown_of_ash_savior'] },
      },
      {
        id: 'fc1_seal_wanderer',
        text: 'The Gate is sealed. What you are now is what the sealing made you.',
        nextNode: 'fc1_gate_sealed_wanderer_end',
      },
    ],
  },

  {
    id: 'fc1_gate_control_choice',
    chapter: 'Final Chapter 1',
    title: 'The Controlled Gate',
    location: 'The Last Gate',
    imageKey: 'last_gate',
    text: `Controlling the Gate means using the mark's authority to regulate what passes through in both directions — not sealing it, not opening it fully, but becoming the gate's permanent interface. The mark can do this. The thirteen-chapter calibration produced exactly the configuration that Gate control requires. The question is whether control is the right use of what the mark built: whether thirteen chapters of documented truth about the city's relationship to the Gate is meant to produce a controller, or something else. The Gate is not expressing a preference. It is presenting the option and waiting.`,
    effectsOnEnter: { setFlags: ['gate_control_chosen'] },
    choices: [
      {
        id: 'fc1_control_tyrant',
        text: 'Take control. The mark has the authority. Use it.',
        nextNode: 'fc1_tyrant_gate_control_end',
        requirements: { flags: ['tyrant_throne_claimed'] },
      },
      {
        id: 'fc1_control_attempt',
        text: 'Attempt to establish regulatory control without the tyrant framework.',
        nextNode: 'fc1_gate_rejection_dice',
      },
    ],
  },

  {
    id: 'fc1_gate_destroy_choice',
    chapter: 'Final Chapter 1',
    title: 'The Destruction',
    location: 'The Last Gate',
    imageKey: 'last_gate',
    text: `Destroying the Gate removes the choice from the world — not the Gate's question, but the mechanism through which the question is asked. Without the Gate, no bearer will face this decision again. What is below the Gate will remain below it permanently, without access, without the option of being released or sealed or controlled. The city will continue. The truth of what is below the city will persist, but without the Gate's interface, it will remain inaccessible. The Hollow Children's three-hundred-year maintenance becomes retroactively unnecessary. The transit system becomes an unusable relic. The mark becomes vestigial. All of these outcomes are clear. The Gate is still asking whether this is the chosen answer.`,
    effectsOnEnter: { setFlags: ['gate_destroy_entered'] },
    choices: [
      {
        id: 'fc1_destroy_attempt',
        text: 'Destroy the Gate. Remove the question from the world.',
        nextNode: 'fc1_gate_rejection_dice',
        effects: { setFlags: ['gate_destroy_chosen'] },
      },
    ],
  },

  {
    id: 'fc1_gate_merge_choice',
    chapter: 'Final Chapter 1',
    title: 'The Merger',
    location: 'The Last Gate',
    imageKey: 'last_gate',
    text: `Merging with the Gate means becoming the permanent bridge between what is above and what is below — not a controller, not a sealed barrier, but a living interface. The mark's architecture would integrate fully with the Gate's structure, and the bearer would become the Gate: able to communicate across the threshold in both directions, able to moderate what passes, unable to leave. The Warden's record documents one previous bearer who chose this option. The record entry is the longest in the ledger. It ends: "The bridge remained." No other documentation. The mark reads the weight of it. The Gate is still asking.`,
    effectsOnEnter: { setFlags: ['gate_merge_chosen'] },
    choices: [
      {
        id: 'fc1_merge_unity',
        text: 'Merge. Become what the city needed but could not build.',
        nextNode: 'fc1_gate_unity_check',
      },
    ],
  },

  {
    id: 'fc1_gate_unity_check',
    chapter: 'Final Chapter 1',
    title: 'The Unity Threshold',
    location: 'The Last Gate',
    imageKey: 'last_gate',
    text: `The merger requires the unity configuration: the specific resonance of a bearer who reached the Gate having built something that approached but did not fully achieve unity — a city that almost decided together, the specific warmth of forty seconds of simultaneous understanding, carried forward through thirteen chapters as a record of what the city could have been. Whether the mark carries that record determines whether the merger produces a bridge or a collapse. The unity_almost_active flag is the Gate's recognition criterion: not the achievement, but the attempt, and what the attempt proved was possible.`,
    effectsOnEnter: { setFlags: ['gate_unity_evaluated'] },
    choices: [
      {
        id: 'fc1_unity_check_pass',
        text: 'The unity record is present. The merger is valid.',
        nextNode: 'fc1_unity_gate_end',
        requirements: { flags: ['unity_almost_active'] },
      },
      {
        id: 'fc1_unity_check_fail',
        text: 'The unity record is insufficient. The merger fails.',
        nextNode: 'fc1_last_gate_lockin_end',
      },
    ],
  },

  {
    id: 'fc1_gate_rejection_dice',
    chapter: 'Final Chapter 1',
    title: 'The Gate Resists',
    location: 'The Last Gate',
    imageKey: 'last_gate',
    text: `The Gate is not passive about certain decisions. Destruction. Control without institutional authority. Certain forced configurations. The Gate has been patient for three hundred years, but it was built with specific response protocols for approaches it was not designed to accommodate. The resistance is not violence — it is the mark's own architecture, used against itself: the Gate is asking the mark to validate the decision through the mark's own accumulated record, and certain decisions cannot be validated by what the thirteen chapters built. Whether the mark can push through the resistance is the question.`,
    effectsOnEnter: { setFlags: ['gate_resistance_active'] },
    choices: [
      {
        id: 'fc1_rejection_roll',
        text: 'Push through the Gate\'s resistance. The decision stands.',
        nextNode: 'fc1_door_of_no_return',
        diceCheck: {
          stat: 'strength',
          difficulty: 8,
          diceType: 'd8',
          successNode: 'fc1_door_of_no_return',
          failureNode: 'fc1_gate_rejection_end',
          criticalFailureNode: 'fc1_gate_rejection_end',
          successEffects: { morale: 5, health: -20, setFlags: ['gate_resistance_overcome'] },
          failureEffects: { health: -40, morale: -20 },
        },
      },
    ],
  },

  // ── THE DOOR OF NO RETURN ────────────────────────────────────────────────

  {
    id: 'fc1_door_of_no_return',
    chapter: 'Final Chapter 1',
    title: 'The Door of No Return',
    location: 'The Door of No Return',
    imageKey: 'door_of_no_return',
    text: `The Door of No Return is not the Gate. It is the exit that the Gate's architecture provides for bearers who passed its assessments but could not resolve its question — or who chose a path that the Gate accommodated without endorsing. The Door leads out from the Gate level, past the assessment chambers, to a part of the city that exists below the sub-city and above the Gate: the liminal space where the city's deepest infrastructure meets the Gate's outermost field. The Door has a name because of what is true of it: there is no path back through the Gate from this side. Whatever is decided here is decided in a space that the Gate's assessment record includes. The Door itself is not the decision. The step through it is.`,
    effectsOnEnter: { setFlags: ['door_no_return_reached'] },
    choices: [
      {
        id: 'fc1_door_assess',
        text: 'Assess what is available from this side of the Gate.',
        nextNode: 'fc1_door_final_step',
      },
    ],
  },

  {
    id: 'fc1_door_final_step',
    chapter: 'Final Chapter 1',
    title: 'The Final Step',
    location: 'The Door of No Return',
    imageKey: 'door_of_no_return',
    text: `The final step. From this side of the Door, the options are: proceed through the Gate's exit into the liminal space, which will route based on what faction support arrived and what the companion configuration carried; stay at the Door and wait for the Gate to re-ask its question; or accept the Door's name literally and walk through it without a Gate decision, as a bearer who reached the last threshold and chose to exit rather than resolve. All three are in the mark's record. All three are real decisions. The Door of No Return is accurately named for one of them.`,
    effectsOnEnter: { setFlags: ['final_step_reached'] },
    choices: [
      {
        id: 'fc1_step_faction_exit',
        text: 'A faction crown holds the exit. The Gate\'s question becomes a faction decision.',
        nextNode: 'fc1_faction_gate_end',
        requirements: { flags: ['faction_support_active'] },
      },
      {
        id: 'fc1_step_wander',
        text: 'Walk through the Door without answering the Gate\'s question. The Door earns its name.',
        nextNode: 'fc1_door_no_return_end',
      },
      {
        id: 'fc1_step_overwhelm',
        text: 'The mark cannot sustain itself in the liminal space. The thirteen chapters are too heavy.',
        nextNode: 'fc1_mark_overwhelm_end',
        requirements: { corruption: 85 },
        isHidden: true,
      },
    ],
  },

  // ── ENDINGS — DEATH (8) ───────────────────────────────────────────────────

  {
    id: 'fc1_memory_wall_collapse_end',
    chapter: 'Final Chapter 1',
    title: 'The Wall Collapses',
    location: 'The Memory Wall',
    imageKey: 'memory_wall',
    isEnding: true,
    endingType: 'death',
    endingId: 'ending_fc1_memory_wall_collapse',
    text: `The complete record plays simultaneously and the mark cannot hold it. Not because the mark is insufficient — it has been building toward exactly this capacity for thirteen chapters. Because the accumulated weight of thirteen chapters of simultaneous decisions, compressed into the Memory Wall's instant-complete format, exceeds the bearer's capacity to hold without fracture. The mark's architecture collapses under the weight of its own record. The Wall continues playing. The record is intact. The bearer, who built the record across thirteen chapters, is not. The Wall holds the complete history of what they chose. The Gate records the attempt as: reached the Memory Wall. Carried the record. Could not carry it all at once. The distinction matters. The Wall knows.`,
    effectsOnEnter: { setFlags: ['game_complete', 'memory_wall_collapse_death'] },
    choices: [],
  },

  {
    id: 'fc1_gate_rejection_end',
    chapter: 'Final Chapter 1',
    title: 'The Gate Rejects',
    location: 'The Last Gate',
    imageKey: 'last_gate',
    isEnding: true,
    endingType: 'death',
    endingId: 'ending_fc1_gate_rejection',
    text: `The Gate's resistance protocols activate fully when the push-through fails. Not a weapon — a seal. The Gate's architecture turns the mark's own resonance against itself: the thirteen-chapter calibration becomes the pressure, and the pressure is applied by the Gate's field to the mark's architecture in a way that the mark was not designed to withstand from inside. The Gate is not cruel about it. It is thorough. The Gate records the attempt as: reached the Last Gate, chose a path not supported by the mark's accumulated record, attempted to push through the resistance, failed. The record is complete. The city above continues. The Gate remains closed, for now.`,
    effectsOnEnter: { setFlags: ['gate_rejection_death'] },
    choices: [],
  },

  {
    id: 'fc1_faction_betrayal_killed_end',
    chapter: 'Final Chapter 1',
    title: 'The Hall\'s Judgment',
    location: 'The Faction Hall',
    imageKey: 'faction_hall',
    isEnding: true,
    endingType: 'death',
    endingId: 'ending_fc1_faction_betrayal_killed',
    text: `The Faction Hall's evaluation produces the specific outcome that occurs when the mark's institutional record and the Hall's assessment criteria are irreconcilable: the Hall's field — which is the Gate's own institutional memory, implemented through the faction resonances — determines that this bearer's approach represents a threat to the Gate's integrity. The assessment is not an emotion. The outcome is not a punishment. It is the Gate's pre-entry security protocol, implemented by the Hall for exactly this configuration: a bearer who reached the Gate without sufficient institutional grounding, attempted the Hall assessment alone, and the assessment concluded with a risk calculation that recommended against entry. The Gate's security protocol is old. It is thorough. It is very, very accurate.`,
    effectsOnEnter: { setFlags: ['faction_hall_security_death'] },
    choices: [],
  },

  {
    id: 'fc1_corruption_consumed_end',
    chapter: 'Final Chapter 1',
    title: 'Consumed',
    location: 'The Corruption Mirror',
    imageKey: 'corruption_mirror',
    isEnding: true,
    endingType: 'death',
    endingId: 'ending_fc1_corruption_consumed',
    text: `The Corruption Mirror's field interacts with extreme corruption in a specific way: the mirror's diagnostic function amplifies the resonance it is examining, and at ninety-plus corruption, the amplification exceeds the mark's containment architecture. The corruption, amplified by the mirror, consumes the remaining original signal. The mark does not die — the corruption is still active, still resonant, still interacting with the Gate's preliminary field. But the bearer, as a distinct consciousness operating within the mark's architecture, is no longer distinguishable from the corruption itself. The mirror shows: what remains is not a bearer with a corrupted mark. It is a corruption with a mark-shaped vessel. The Gate's assessment notes the difference. The Gate closes.`,
    effectsOnEnter: { setFlags: ['corruption_consumed_death'] },
    choices: [],
  },

  {
    id: 'fc1_false_gate_end',
    chapter: 'Final Chapter 1',
    title: 'The Wrong Opening',
    location: 'The Last Gate',
    imageKey: 'last_gate',
    isEnding: true,
    endingType: 'death',
    endingId: 'ending_fc1_false_gate',
    text: `The Gate opens — but not the way the original agreement specified. The forced opening without the complete record executes a partial opening: the Gate's threshold activates, but the interface protocol is wrong, and what passes through the threshold is not the sanctioned release but the raw pressure of three hundred years of contained resonance, without curation, without the specific filtering the Warden's documentation required. The Gate does not close again immediately. What comes through the raw opening is not hostile — it has no orientation. It simply passes through everything that is in the threshold space, which includes the bearer. The city above receives a signal it cannot process. The mark records the outcome as: reached the Gate, opened it, and was inside when it opened the wrong way.`,
    effectsOnEnter: { setFlags: ['game_complete', 'false_gate_death'] },
    choices: [],
  },

  {
    id: 'fc1_heir_strikes_end',
    chapter: 'Final Chapter 1',
    title: 'The Warden\'s Justice',
    location: 'The Gate Antechamber',
    imageKey: 'gate_antechamber',
    isEnding: true,
    endingType: 'death',
    endingId: 'ending_fc1_heir_strikes',
    text: `The Masked Heir strikes in the antechamber with the precision of someone who has been carrying this decision since before Chapter 1. The sub-city rejection was not forgotten. The Heir, as the last Gate Warden, holds a specific function that the Warden's documentation records plainly: the right to prevent a bearer whose record the Warden determines is incompatible with the Gate's integrity from reaching the Gate. It is not a personal decision. The three-hundred-year ledger records two previous Warden interventions. Both are documented without judgment. The current Heir's action is documented the same way: bearer reached the Gate Antechamber. Warden assessment: not compatible. Access denied. The antechamber closes. The Gate waits for the next mark.`,
    effectsOnEnter: { setFlags: ['heir_warden_intervention'] },
    choices: [],
  },

  {
    id: 'fc1_companion_killed_end',
    chapter: 'Final Chapter 1',
    title: 'The Cost of the Companion',
    location: 'The Gate Antechamber',
    imageKey: 'gate_antechamber',
    isEnding: true,
    endingType: 'death',
    endingId: 'ending_fc1_companion_killed',
    text: `The antechamber's preliminary field, interacting with the mark's high-corruption architecture, surges. The companion is in the field. The mark's surge is not directed at the companion — the mark has no orientation in that state — but the field's interaction with the antechamber's interface produces a release that the companion absorbs. The companion does not die immediately. They have time to say what they would say, which is, in the end, what they have been saying across thirteen chapters: it was worth it. The mark dims with the weight of what just happened. The corruption falls. The antechamber is quiet. The bearer proceeds to the Gate carrying something that the mark architecture will record as: the cost of the companion. The Gate receives the record. The Gate does not judge it. The Gate asks its question.`,
    effectsOnEnter: { setFlags: ['companion_killed_at_antechamber'] },
    choices: [],
  },

  {
    id: 'fc1_mark_overwhelm_end',
    chapter: 'Final Chapter 1',
    title: 'The Weight Wins',
    location: 'The Door of No Return',
    imageKey: 'door_of_no_return',
    isEnding: true,
    endingType: 'death',
    endingId: 'ending_fc1_mark_overwhelm',
    text: `The liminal space between the Door and the Gate's exit field is not empty. It is the specific environment where the Gate's resonance and the city's deepest infrastructure intersect without mediation — and in this environment, a mark carrying extreme corruption and thirteen chapters of accumulated weight cannot sustain coherent operation. The weight wins. Not a collapse — a dissolution. The mark's architecture, at the intersection of the Gate's field and its own extreme configuration, distributes itself through the liminal space. What remains: the mark's resonance, present in the liminal space as a permanent signal. The bearer is the signal. The liminal space receives them. The Door of No Return earns its name in a way that was not originally intended by whoever named it, but is accurate in a way that the Gate's designers would recognize.`,
    effectsOnEnter: { setFlags: ['liminal_dissolution_death'] },
    choices: [],
  },

  // ── ENDINGS — BETRAYAL (3) ────────────────────────────────────────────────

  {
    id: 'fc1_companion_abandonment_end',
    chapter: 'Final Chapter 1',
    title: 'Companion Abandonment',
    location: 'The Companion Threshold',
    imageKey: 'companion_threshold',
    isEnding: true,
    endingType: 'betrayal',
    endingId: 'ending_fc1_companion_abandonment',
    text: `The Companion Threshold presents the companion's final position and the bearer does not take it. Not a rejection, exactly — something closer to the specific failure of thirteen chapters of shared experience to produce the moment where the companion's offer can be accepted as what it is. The companion stays at the threshold. Not to hold it open — because there is no configuration left for them to hold. The threshold records the outcome: the companion relationship, which the mark carried for thirteen chapters as genuine, ends at the threshold when the bearer proceeds without responding to it. The Gate's assessment notes the companion threshold status. The Gate updates what it will offer at the Last Gate accordingly: certain paths close. The companion is at the threshold. The bearer is not.`,
    effectsOnEnter: { setFlags: ['game_complete', 'companion_abandoned'] },
    choices: [],
  },

  {
    id: 'fc1_faction_betrayal_end',
    chapter: 'Final Chapter 1',
    title: 'The Hall Closes',
    location: 'The Faction Hall',
    imageKey: 'faction_hall',
    isEnding: true,
    endingType: 'betrayal',
    endingId: 'ending_fc1_faction_betrayal',
    text: `The Faction Hall's assessment ends without resolution: the solo argument, without institutional alignment, did not satisfy the Hall's evaluation threshold. The Hall does not close violently — it closes structurally, the way a building closes when it has received what it was built to receive and the reception produced a result of: insufficient. The bearer is outside the faction hall. The Gate Antechamber is not accessible from this side. The assessment is complete: the bearer reached the Gate's approach without sufficient institutional grounding, and the Gate's entry system determined, accurately, that the mark's record in isolation is insufficient for the Gate's purposes. The bearer is alive. The bearer is outside. The Gate is ahead and unreachable. The city above is behind and the only remaining direction.`,
    effectsOnEnter: { setFlags: ['faction_hall_closed'] },
    choices: [],
  },

  {
    id: 'fc1_false_gate_opening_end',
    chapter: 'Final Chapter 1',
    title: 'The False Opening',
    location: 'The Last Gate',
    imageKey: 'last_gate',
    isEnding: true,
    endingType: 'betrayal',
    endingId: 'ending_fc1_false_gate_opening',
    text: `The Gate opens, forced, without the true configuration. What passes through is not a sanctioned release — it is a pressure differential, the three-hundred-year buildup of contained resonance escaping through an improperly configured interface. The bearing survives. The city above receives a signal that no faction, no Archive, no Hollow Children's three-hundred-year maintenance was prepared for: the raw resonance of the Gate, transmitted upward through the metro infrastructure, broadcasting through every relic-connected surface in the city simultaneously. The factions experience it as a second Blackout. The Hollow Children recognize it for what it is. Mother Chalk's assessment, delivered through the network three hours later: "The Gate opened wrong. It will take three hundred more years to build the correct interface again. Or someone else carries the mark and tries again sooner." The false opening is complete.`,
    effectsOnEnter: { setFlags: ['false_gate_opened'] },
    choices: [],
  },

  // ── ENDINGS — WANDERER / NEUTRAL (4) ────────────────────────────────────

  {
    id: 'fc1_last_gate_lockin_end',
    chapter: 'Final Chapter 1',
    title: 'Last Gate Lock-In',
    location: 'The Last Gate',
    imageKey: 'last_gate',
    isEnding: true,
    endingType: 'wanderer',
    endingId: 'ending_fc1_last_gate_lockin',
    text: `The Gate's sealing fails — not because the bearer is insufficient, but because the Gate's question has not been answered and the Gate will not permit sealing until it has been. The bearer is locked in: inside the assessment chambers, the Gate's field present, the Gate's question still active. The lock-in is not imprisonment — the Door of No Return is accessible, the antechamber is accessible, the assessment chambers are accessible. What is not accessible: the return stair, the transit system, the city. The Gate's lock-in protocol will hold until either the Gate's question is answered or the mark's architecture fails. The bearer has time. Whether time produces an answer is the question the Gate asked in the first place. The lock-in is the Gate giving the bearer more of it.`,
    effectsOnEnter: { setFlags: ['gate_lockin'] },
    choices: [],
  },

  {
    id: 'fc1_door_no_return_end',
    chapter: 'Final Chapter 1',
    title: 'Door of No Return',
    location: 'The Door of No Return',
    imageKey: 'door_of_no_return',
    isEnding: true,
    endingType: 'wanderer',
    endingId: 'ending_fc1_door_no_return',
    text: `The bearer walks through the Door without answering the Gate's question. The Door of No Return is accurately named: from the other side, the Gate's field is present but the Gate itself is not accessible. The bearer is in the liminal space — between the Gate level and the sub-city level, in the infrastructure the Hollow Children maintained for three hundred years, in the space where the Gate's resonance is present without the Gate's question. The mark continues. The city is above. The Gate is below. The bearer is between them, in the liminal space, which is — the mark reads — inhabitable. People have lived in less structured circumstances than the Gate's liminal field. The Door of No Return is not death. It is a very specific kind of not-going-back.`,
    effectsOnEnter: { setFlags: ['game_complete', 'door_walked_through'] },
    choices: [],
  },

  {
    id: 'fc1_gate_sealed_wanderer_end',
    chapter: 'Final Chapter 1',
    title: 'Sealed and Alone',
    location: 'The Last Gate',
    imageKey: 'last_gate',
    isEnding: true,
    endingType: 'wanderer',
    endingId: 'ending_fc1_gate_sealed_wanderer',
    text: `The Gate is sealed. The bearer sealed it. The city above is protected from whatever the Gate was containing and whatever the Gate was asking and whatever the Gate was waiting to deliver. The seal is permanent. The mark's sealing function has completed and the mark's architecture has transitioned to its secondary state: a vessel that completed one function and does not have a second. The bearer ascends the stair alone — the companion configuration, whatever it was, has dispersed or departed or is holding the threshold. The city above will not know what was sealed below it. The bearer will know. The knowing is carried upward, alone, through the stair that is now sealed at the bottom, into a city that is still deciding what it is, with one fewer question below it. The city is not grateful. It does not know to be. The sealing was real regardless.`,
    effectsOnEnter: { setFlags: ['gate_sealed_wanderer'] },
    choices: [],
  },

  {
    id: 'fc1_lone_wanderer_gate_end',
    chapter: 'Final Chapter 1',
    title: 'The Wanderer Walks Past',
    location: 'The Descent Stair',
    imageKey: 'descent_stair',
    isEnding: true,
    endingType: 'wanderer',
    endingId: 'ending_fc1_lone_wanderer_gate',
    text: `The lone wanderer reaches the stair and walks past it. Not because the Gate is unimportant — the mark reads the Gate's direction clearly, has read it since Chapter 1. Because the choice to walk past the Gate is the specific freedom of a configuration that was never obligated to anyone's resolution. The Gate will still be there. The city will still have what it has. The mark will still be active. The wanderer will still be walking. Whatever the Gate was holding below the city will remain held. The wanderer's record, carried in the mark across thirteen chapters, is: I was here. I saw what was being asked. I chose not to answer. The Gate's assessment, recording the wanderer's record with the same accuracy it applies to every configuration: acknowledged. The stair recedes. The city is ahead.`,
    effectsOnEnter: { setFlags: ['lone_wanderer_past_gate'] },
    choices: [],
  },

  // ── ENDINGS — COMPANION (2) ───────────────────────────────────────────────

  {
    id: 'fc1_mira_sacrifice_end',
    chapter: 'Final Chapter 1',
    title: 'Mira\'s Threshold',
    location: 'The Companion Threshold',
    imageKey: 'companion_threshold',
    isEnding: true,
    endingType: 'companion',
    endingId: 'ending_fc1_mira_sacrifice',
    text: `Mira stays at the threshold. She holds it open — which is the specific function the threshold's architecture provides for a companion with her configuration: the medical training, the systematic relationship to truth, the thirteen chapters of quiet devotion to what the mark was trying to do. The threshold, with Mira as its interface, becomes something the Gate's assessment record notes as significant: a companion who chose the threshold over the gate as a deliberate act of holding space for whoever comes after. The bearer descends to the Gate without Mira, carrying her presence as a record rather than a companion. The Gate receives it. The threshold remains open. Mira is not the end of anything. She is the door that the next bearer will find already held.`,
    effectsOnEnter: { setFlags: ['mira_threshold_sacrifice', 'threshold_held_open'] },
    choices: [],
  },

  {
    id: 'fc1_cain_last_stand_end',
    chapter: 'Final Chapter 1',
    title: 'Cain\'s Threshold',
    location: 'The Companion Threshold',
    imageKey: 'companion_threshold',
    isEnding: true,
    endingType: 'companion',
    endingId: 'ending_fc1_cain_last_stand',
    text: `Cain holds the perimeter at the threshold. His assessment of the strategic situation is, as it has been across thirteen chapters, accurate: someone needs to hold the threshold's perimeter, and the bearer needs to reach the Gate without managing a rear position. Cain is the rear position. He positions himself at the threshold's entry point with the precision of someone who has been modeling exactly this defensive requirement for several chapters and is satisfied that the position is correct. The bearer descends. Cain does not watch the descent — he is already reading the threshold's structural load, identifying the defensible angles, settling into what will be, if the transit log is accurate, a very long wait. Cain has waited before. He is good at it. The threshold is held.`,
    effectsOnEnter: { setFlags: ['game_complete', 'cain_threshold_last_stand', 'threshold_perimeter_held'] },
    choices: [],
  },

  // ── ENDINGS — CORRUPTION (2) ──────────────────────────────────────────────

  {
    id: 'fc1_corruption_threshold_end',
    chapter: 'Final Chapter 1',
    title: 'Corruption Threshold',
    location: 'The Corruption Mirror',
    imageKey: 'corruption_mirror',
    isEnding: true,
    endingType: 'corruption',
    endingId: 'ending_fc1_corruption_threshold',
    text: `The resistance attempt at the Corruption Mirror fails at the moment of maximum corruption — not because the bearer is not trying, but because the resistance, to succeed, requires the bearer's original signal to outweigh the corruption's structural integration, and at this level, the original signal does not. What the mirror shows instead: the corruption stabilizing into its own coherent architecture. Not a collapse. A completion. The corruption has become the primary signal, and the primary signal is stable, and the mark continues — but what the mark carries now is not the bearer's thirteen-chapter record. It is the corruption's version of it: the choices weighted by the corruption's own logic, the decisions read through the contamination's frame. The Gate receives this configuration and routes it to the entry the corruption's logic demands.`,
    effectsOnEnter: { corruption: 20, setFlags: ['corruption_threshold_complete'] },
    choices: [],
  },

  {
    id: 'fc1_tyrant_gate_control_end',
    chapter: 'Final Chapter 1',
    title: 'Tyrant\'s Gate',
    location: 'The Last Gate',
    imageKey: 'last_gate',
    isEnding: true,
    endingType: 'corruption',
    endingId: 'ending_fc1_tyrant_gate_control',
    text: `The tyrant's claim extends to the Gate. The mark's corruption-loaded architecture, configured for institutional authority through the Broken Throne's claim, applies the same authority claim to the Gate's control interface. The Gate responds — not as an endorsement, but as a mechanism: the control interface activates for a bearer whose mark carries sufficient institutional architecture, even if that architecture is built on corruption rather than alignment. The Gate becomes a controlled passage: what the tyrant allows through passes; what the tyrant refuses does not. The city above is managed. The Gate below is managed. The mark-bearer manages both. This is a form of resolution. The Gate's assessment of this resolution: accurate. The Warden's ledger records: Gate controlled. Not opened, not sealed, not merged. Controlled. The entry is written in the same handwriting as every other entry in the three-hundred-year ledger.`,
    effectsOnEnter: { setFlags: ['tyrant_gate_control'] },
    choices: [],
  },

  // ── ENDINGS — SAVIOR (1) ──────────────────────────────────────────────────

  {
    id: 'fc1_gate_sealed_savior_end',
    chapter: 'Final Chapter 1',
    title: 'The Savior\'s Seal',
    location: 'The Last Gate',
    imageKey: 'last_gate',
    isEnding: true,
    endingType: 'savior',
    endingId: 'ending_fc1_gate_sealed_savior',
    text: `The Gate is sealed. The savior route, built across thirteen chapters of choosing the city over personal authority, arrives at the Gate with exactly the configuration the sealing requires: the complete record, consciously held; the companion relationship, genuine and completed; the institutional alignment, documented and committed; and the specific clarity of someone who has spent thirteen chapters learning what the city needs and has concluded that what it needs is for this Gate to stop asking its question. The sealing executes cleanly — the mark's architecture shifting in the way the Warden's documentation describes as correct. The warmth dims. The Gate's question stops. The city above will not know what was sealed. The sub-city will. The Hollow Children will carry the record for whatever comes next, in whatever three-hundred-year span the sealed Gate creates. The savior ascends. The city breathes.`,
    effectsOnEnter: { morale: 25, setFlags: ['gate_sealed_savior', 'savior_gate_complete', 'chapter_fc1_complete'] },
    choices: [],
  },

  // ── ENDINGS — FACTION (1) ─────────────────────────────────────────────────

  {
    id: 'fc1_faction_gate_end',
    chapter: 'Final Chapter 1',
    title: 'The Faction Gate',
    location: 'The Door of No Return',
    imageKey: 'door_of_no_return',
    isEnding: true,
    endingType: 'faction',
    endingId: 'ending_fc1_faction_gate',
    text: `The faction support that arrived at the Faction Hall extends to the Door of No Return, and through the Door, to the Gate question itself. The faction crown's institutional weight is sufficient for a specific resolution: the Gate's question is answered not by the individual mark-bearer but by the institutional alignment the bearer built. The Gate receives the faction configuration as a collective answer: the city's institutions, aligned, committed to the Gate's management in the interest of the city above rather than any individual's authority. The Gate responds to institutional weight the way it was designed to respond to it — with institutional answers. The Gate becomes a shared resource: managed by the faction alignment the bearer built, moderated by the mark's infrastructure, accessible through the transit system the Hollow Children maintained. The city above inherits a Gate. It is not a small inheritance.`,
    effectsOnEnter: { morale: 20, setFlags: ['game_complete', 'faction_gate_resolution', 'chapter_fc1_complete'] },
    choices: [],
  },

  // ── ENDINGS — SECRET (2) ──────────────────────────────────────────────────

  {
    id: 'fc1_unity_gate_end',
    chapter: 'Final Chapter 1',
    title: 'The Unity Gate',
    location: 'The Last Gate',
    imageKey: 'last_gate',
    isEnding: true,
    endingType: 'secret',
    endingId: 'ending_fc1_unity_gate',
    text: `The unity configuration — the forty seconds of simultaneous understanding in the War Council, carried through thirteen chapters as the specific warmth of what the city could have been — is sufficient for the merger. The mark integrates with the Gate's architecture. Not a death. Not a transformation in the way the Warden's ledger describes transformation. Something specific to this configuration: the bearer becomes the bridge, as the merger option specified, but the bridge carries the unity record. The city above and whatever exists below the Gate communicate through the bearer's mark, mediated by thirteen chapters of documented proof that the city can understand its own history if given the right interface. The Gate remains open. The bearer remains. The bridge is warm, and patient, and very old, and very new. The city above does not know what the bridge is. The bridge knows the city.`,
    effectsOnEnter: { morale: 30, setFlags: ['unity_gate_merged', 'chapter_fc1_complete'] },
    choices: [],
  },

  {
    id: 'fc1_true_ending_path_end',
    chapter: 'Final Chapter 1',
    title: 'The Original Agreement',
    location: 'The Last Gate',
    imageKey: 'last_gate',
    isEnding: true,
    endingType: 'secret',
    endingId: 'ending_fc1_true_ending_path',
    text: `The original agreement. All conditions met. The true opening executes as the Foundation Period's Gate Wardens specified: the complete record held consciously; the correct interface, executed by the mark's thirteen-chapter calibration; the original agreement's terms confirmed — the entity departed, the gate opened as a sanctioned release, the city above received the signal it was designed to receive rather than the garbled distress call it mistook the Blackout for. What passes through the Gate in the true opening is not a threat. It is information. The specific information that the city has been misreading for three hundred years, delivered correctly. The Gate opens. The information reaches the city. The city receives what it was designed to receive. What it does with it is the question that Final Chapter 2 will ask. The answer to Final Chapter 1's question is: yes. The original agreement is kept.`,
    effectsOnEnter: { morale: 40, intelligence: 10, setFlags: ['true_ending_gate_opened', 'original_agreement_kept', 'chapter_fc1_complete', 'final_chapter2_true_path'] },
    choices: [],
  },

];
