import type { StoryNode } from '../types';

// ══════════════════════════════════════════════════════════════════════════════
//  CHAPTER 10 — BROKEN COMPANIONS
//  130 nodes · 11 locations · 8 dice checks · 18 endings
//  Trust thresholds:
//    miraTrust ≥ 8  → devotion / sacrifice route
//    miraTrust ≥ 6  → stays / full truth shared
//    miraTrust ≤ 2  → leaves warning
//    cainTrust ≥ 8  → last stand route
//    cainTrust ≥ 6  → loyalty / stays
//    cainTrust ≤ 2  → rival path
// ══════════════════════════════════════════════════════════════════════════════

export const CHAPTER_10_NODES: StoryNode[] = [

  // ── THE QUIET SAFEHOUSE ──────────────────────────────────────────────────

  {
    id: 'chapter10_start',
    chapter: 'Chapter 10',
    title: 'Broken Companions',
    location: 'The Quiet Safehouse',
    imageKey: 'quiet_safehouse',
    text: `Three days after the awakening. The mark is operational, legible, and demanding. The safehouse Mira sourced in the Level 3 maintenance district is quieter than anything the last nine chapters produced — no factions, no entities, no First Voice. Just the sound of the tunnel network doing what it does and two people somewhere in these corridors who have been carrying things they have not said. Chapter 10 is about those things. It is the chapter that costs the most and produces the least that is measurable. The mark registers the emotional gradient the way it registers structural pressure: as data with consequences.`,
    effectsOnEnter: { setFlags: ['chapter10_begun'] },
    choices: [
      {
        id: 'c10_start_survey',
        text: 'Assess the safehouse. Who is here.',
        nextNode: 'c10_safehouse_survey',
      },
    ],
  },

  {
    id: 'c10_safehouse_survey',
    chapter: 'Chapter 10',
    title: 'Who Is Here',
    location: 'The Quiet Safehouse',
    imageKey: 'quiet_safehouse',
    text: `Mira's kit is in the east room, spread across a maintenance bench: vials racked with the specific order of someone who reorganises when worried. Cain's jacket is on a wall hook near the entrance, the Iron Saints insignia removed — the stitching outline of its absence is still there. The safehouse has one table with three chairs. The third chair is for no one in particular. Both of them are here. Neither of them is in the same room as the other. The chapter opens on a house divided by nothing specific and everything accumulated.`,
    effectsOnEnter: {},
    choices: [
      {
        id: 'c10_survey_find_mira',
        text: 'Find Mira first.',
        nextNode: 'c10_safehouse_mira_arrives',
      },
      {
        id: 'c10_survey_find_cain',
        text: 'Find Cain first.',
        nextNode: 'c10_safehouse_cain_arrives',
      },
    ],
  },

  {
    id: 'c10_safehouse_mira_arrives',
    chapter: 'Chapter 10',
    title: 'Something Weighing',
    location: 'The Quiet Safehouse',
    imageKey: 'quiet_safehouse',
    speaker: 'Mira',
    text: `She is at the bench, not working. The vials are already organised. She has been organising them again. "There is something I have been intending to tell you since Chapter 1," she says. No preamble. No clinical framing. "I did not tell you because the moment was always wrong, or I was afraid of what it would do to what we were building, or I told myself it was not relevant yet." She sets down the last vial. "It is relevant now. It has been relevant since the blackout." She turns. Her expression is the one she uses before delivering a prognosis she would rather not deliver. "The Archive placed me in this metro. Before the blackout. I was not a survivor who found a purpose. I was already here to find you."`,
    effectsOnEnter: { setFlags: ['mira_truth_begins', 'chapter10_mira_opening'] },
    choices: [
      {
        id: 'c10_mira_let_speak',
        text: '"Tell me everything."',
        nextNode: 'c10_mira_truth_begins',
      },
      {
        id: 'c10_mira_interrupt',
        text: '"Stop." Process the first sentence.',
        nextNode: 'c10_mira_pre_truth_choice',
      },
    ],
  },

  {
    id: 'c10_mira_pre_truth_choice',
    chapter: 'Chapter 10',
    title: 'The First Sentence',
    location: 'The Quiet Safehouse',
    imageKey: 'quiet_safehouse',
    text: `The Archive placed her here. Before the blackout. She was already here to find you. That sentence has a specific weight — not as a betrayal, not yet, but as an architecture that has been present beneath every chapter. Every medical assessment. Every trust-building moment. Every time she stayed when staying was dangerous. Either it was all performance and selection, or the placement did not prevent the person from becoming real. Both possibilities are simultaneously true. Neither cancels the other. The question is whether you can hold both.`,
    effectsOnEnter: {},
    choices: [
      {
        id: 'c10_pre_truth_continue',
        text: 'Let her continue. You need the full picture.',
        nextNode: 'c10_mira_truth_begins',
      },
      {
        id: 'c10_pre_truth_walk_away',
        text: 'Walk away for a moment. You need to breathe first.',
        nextNode: 'c10_mira_truth_begins',
        effects: { miraTrust: -1 },
      },
    ],
  },

  {
    id: 'c10_mira_truth_begins',
    chapter: 'Chapter 10',
    title: 'The Archive Mission',
    location: 'The Quiet Safehouse',
    imageKey: 'quiet_safehouse',
    speaker: 'Mira',
    text: `"The Archive's medical division ran a parallel program to the mark selection process. They identified nineteen potential interfaces based on pre-blackout biological markers — genetic predispositions to relic-resonance. I was assigned to one of them. You." She is very careful with the word choices. "My training was medical. My original role was monitoring — track the mark's activation, document the corruption gradient, ensure the bearer survived long enough for the Archive's evaluation. I was not a handler. I was not a weapon." A pause. "What I became is more complicated than what I was assigned to be."`,
    effectsOnEnter: { setFlags: ['mira_archive_mission_revealed'] },
    choices: [
      {
        id: 'c10_truth_what_became',
        text: '"What did you become?"',
        nextNode: 'c10_mira_full_reveal',
      },
      {
        id: 'c10_truth_mission_only',
        text: '"Were you ever anything other than an assignment?"',
        nextNode: 'c10_mira_full_reveal',
        effects: { miraTrust: -2 },
      },
    ],
  },

  {
    id: 'c10_mira_full_reveal',
    chapter: 'Chapter 10',
    title: 'What She Became',
    location: 'The Quiet Safehouse',
    imageKey: 'quiet_safehouse',
    speaker: 'Mira',
    text: `"Someone who wanted you to survive for reasons that had nothing to do with the Archive's evaluation criteria." She says it the same way she delivers bad news: cleanly, without softening. "The experiments I was connected to — the Archive ran pre-blackout trials on relic-adjacent individuals to study mark-compatibility. I was not only observing. I was a subject in Phase One. They modified my neurological architecture to improve my ability to read mark-bearers. That is why my medical assessments have always been more accurate than they should be. I was built to read you. And then I stopped being willing to report to the people who built me." She holds your gaze. "That is everything."`,
    effectsOnEnter: { setFlags: ['mira_full_truth_known', 'mira_experiment_subject_revealed'] },
    choices: [
      {
        id: 'c10_full_reveal_trust',
        text: '"You stayed when you could have reported. That matters."',
        nextNode: 'c10_mira_response_trust',
        effects: { miraTrust: 4 },
        requirements: { miraTrust: 4 },
      },
      {
        id: 'c10_full_reveal_anger',
        text: '"You should have told me at Chapter 1."',
        nextNode: 'c10_mira_response_anger',
        effects: { miraTrust: -2 },
      },
      {
        id: 'c10_full_reveal_cold',
        text: '"I do not know if any of this was real."',
        nextNode: 'c10_mira_response_cold',
        effects: { miraTrust: -4 },
      },
    ],
  },

  {
    id: 'c10_mira_response_trust',
    chapter: 'Chapter 10',
    title: 'What Stayed Real',
    location: 'The Quiet Safehouse',
    imageKey: 'quiet_safehouse',
    speaker: 'Mira',
    text: `Something shifts in her expression — not relief, which would be too simple, but a reduction in the tension she has been carrying since before this conversation started. "You asked me once, in Level 5, whether I thought you were going to make it. I told you the medical assessment was unclear. The actual answer was: I did not care about the medical assessment. I cared about you specifically making it." She sits. "That is not an assigned position. The Archive did not put that in my training file." A long pause. "I needed you to know the full picture. Now you have it. What happens next is yours to decide."`,
    effectsOnEnter: { setFlags: ['mira_trust_response_given'], miraTrust: 2 },
    choices: [
      {
        id: 'c10_trust_response_clinic',
        text: 'Go to Mira\'s clinic. See what the records say.',
        nextNode: 'c10_mira_clinic_arrive',
        effects: { miraTrust: 1 },
      },
      {
        id: 'c10_trust_response_cain',
        text: 'Find Cain. His version of events matters too.',
        nextNode: 'c10_safehouse_cain_arrives',
      },
    ],
  },

  {
    id: 'c10_mira_response_anger',
    chapter: 'Chapter 10',
    title: 'Nine Chapters Too Late',
    location: 'The Quiet Safehouse',
    imageKey: 'quiet_safehouse',
    speaker: 'Mira',
    text: `"Yes." She does not argue the point. "I should have told you in Chapter 1. The reasons I did not are not good enough, and I know that. Fear of your reaction. Fear of losing what we were building. Fear that the Archive would learn I had disclosed and act on it before you had enough strength to resist them." She stands. "I am not asking you to accept the timing. I am asking you to decide what to do with the information now that you have it. The Archive's agenda has not stopped because I told you. Director Varr's dossier on my assignment still exists. Whatever your decision, you should see my clinic records before you finalise it."`,
    effectsOnEnter: { setFlags: ['mira_anger_response_given'] },
    choices: [
      {
        id: 'c10_anger_go_clinic',
        text: 'Go to the clinic. Read the records yourself.',
        nextNode: 'c10_mira_clinic_arrive',
      },
      {
        id: 'c10_anger_need_space',
        text: 'You need distance. Find Cain.',
        nextNode: 'c10_safehouse_cain_arrives',
        effects: { miraTrust: -1 },
      },
    ],
  },

  {
    id: 'c10_mira_response_cold',
    chapter: 'Chapter 10',
    title: 'If Any of It Was Real',
    location: 'The Quiet Safehouse',
    imageKey: 'quiet_safehouse',
    speaker: 'Mira',
    text: `She is quiet for a long time. When she answers, the clinical framing is gone — what is left is something quieter and less defended. "I understand why you would question it. Everything I told you about my background was accurate. The origin of why I was there was not disclosed. Those are two different things, and I know they do not feel different right now." She does not move toward you. "If you decide none of it was real, I will not argue. I will leave tonight and you will not see me again. If you decide to check the records before deciding, the clinic is two corridors east." She pauses. "I would rather you look at the evidence than make a decision that costs both of us something in error."`,
    effectsOnEnter: { setFlags: ['mira_cold_response_given'] },
    choices: [
      {
        id: 'c10_cold_check_clinic',
        text: 'Go to the clinic. Look at the evidence.',
        nextNode: 'c10_mira_clinic_arrive',
      },
      {
        id: 'c10_cold_let_her_leave',
        text: 'Say nothing. Let her draw her own conclusion.',
        nextNode: 'c10_mira_leaves_end',
        effects: { miraTrust: -5 },
      },
    ],
  },

  {
    id: 'c10_safehouse_cain_arrives',
    chapter: 'Chapter 10',
    title: 'The Weight He Carries',
    location: 'The Quiet Safehouse',
    imageKey: 'quiet_safehouse',
    speaker: 'Cain',
    text: `He is in the main corridor, running a maintenance check on the safehouse's ventilation grid — the kind of task that gives hands something to do while a mind works through something harder. "I need to tell you something about the blackout," he says without looking up. "Not what I told you. What I didn't." He sets the tool down. His movements have the economy of someone who has rehearsed a difficult thing and is now doing it anyway. "The evacuation orders I enforced in the lower levels — I knew they were wrong. Not illegal. Not technically wrong. But wrong in the way that things can be legal and still wrong. Seventeen people died in that corridor because I cleared it before the structural assessment was complete." He finally looks at you. "I have been next to you for ten chapters waiting for the right moment. There is no right moment."`,
    effectsOnEnter: { setFlags: ['cain_truth_begins', 'chapter10_cain_opening'] },
    choices: [
      {
        id: 'c10_cain_hear_all',
        text: '"Tell me all of it."',
        nextNode: 'c10_safehouse_junction',
        effects: { cainTrust: 1 },
      },
      {
        id: 'c10_cain_war_room_first',
        text: '"Your war room. We should read the orders before we talk."',
        nextNode: 'c10_safehouse_junction',
      },
    ],
  },

  {
    id: 'c10_safehouse_junction',
    chapter: 'Chapter 10',
    title: 'First Movement',
    location: 'The Quiet Safehouse',
    imageKey: 'quiet_safehouse',
    text: `The safehouse holds three truths today: Mira's pre-blackout assignment, Cain's blackout-era orders, and the mark's operational state under the pressure of both. The bridge camp is reporting activity from both the Glass Court's forward scouts and the Iron Saints remnants. The Masked Heir has been seen in the Betrayal Alley district. Director Varr's access credentials were logged at the Level 3 maintenance terminal yesterday. The chapter's geography is clear: the clinics and war rooms first, then the places that the companions chose for reasons — the Memory Shelter, the Soldier's Grave, the Place We Promised. The Empty Chair last.`,
    effectsOnEnter: {},
    choices: [
      {
        id: 'c10_junction_clinic',
        text: 'Go to Mira\'s hidden clinic.',
        nextNode: 'c10_mira_clinic_arrive',
      },
      {
        id: 'c10_junction_war_room',
        text: 'Go to Cain\'s war room.',
        nextNode: 'c10_cain_war_room_arrive',
      },
      {
        id: 'c10_junction_bridge_camp',
        text: 'Check the bridge camp first. The external situation first.',
        nextNode: 'c10_bridge_camp_arrive',
      },
    ],
  },

  // ── MIRA'S HIDDEN CLINIC ───────────────────────────────────────────────────

  {
    id: 'c10_mira_clinic_arrive',
    chapter: 'Chapter 10',
    title: 'The Clinic',
    location: "Mira's Hidden Clinic",
    imageKey: 'mira_hidden_clinic',
    text: `The clinic occupies a former transit medical response station — Level 3, junction 11, approximately forty metres from the nearest Archive monitor point. Mira set it up seven months ago. The equipment is salvaged but functional: three cots, a centrifuge made from tram parts, a refrigeration unit running on a split power tap. The shelves are labelled in a handwriting that predates the metro — neat, institutional, Archive-standard. Not the improvised script of a survivor. Pre-blackout script. The records are in a sealed case under the primary work bench.`,
    effectsOnEnter: { setFlags: ['mira_clinic_arrived'] },
    choices: [
      {
        id: 'c10_clinic_open_records',
        text: 'Open the sealed records case.',
        nextNode: 'c10_clinic_records_found',
      },
      {
        id: 'c10_clinic_observe_first',
        text: 'Observe the clinic layout before touching anything.',
        nextNode: 'c10_clinic_records_found',
        requirements: { classes: ['relic_hunter'] },
        effects: { intelligence: 2, setFlags: ['relic_hunter_clinic_read'] },
      },
    ],
  },

  {
    id: 'c10_clinic_records_found',
    chapter: 'Chapter 10',
    title: 'The Archive Files',
    location: "Mira's Hidden Clinic",
    imageKey: 'mira_hidden_clinic',
    text: `The sealed case contains three types of documents. A standard Archive medical monitoring template — populated with your data from Chapter 1 onward. A pre-blackout research brief, Archive Medical Division header, subject designation "Interface Candidate 7 — Primary Monitoring Assignment." And a personal file that does not use Archive formatting: handwritten, dated, beginning six months before the blackout and running through to last week. The Archive brief is a fourteen-page document. The intelligence required to read it correctly — to distinguish what it mandated from what Mira actually did — is not trivial. The personal file is legible without training. The question is which one you need more.`,
    effectsOnEnter: { setFlags: ['clinic_records_opened'] },
    choices: [
      {
        id: 'c10_records_read_brief',
        text: 'Read the Archive brief. What was she actually assigned to do.',
        nextNode: 'c10_clinic_intelligence_dice',
      },
      {
        id: 'c10_records_read_personal',
        text: 'Read the personal file. What she chose to do.',
        nextNode: 'c10_clinic_memo_success',
        effects: { miraTrust: 1 },
      },
      {
        id: 'c10_records_scholar_read',
        text: 'Cross-reference both. You know Archive document structure.',
        nextNode: 'c10_clinic_memo_success',
        requirements: { backgrounds: ['forgotten_scholar'] },
        effects: { intelligence: 3, setFlags: ['scholar_archive_cross_ref'], miraTrust: 2 },
      },
    ],
  },

  {
    id: 'c10_clinic_intelligence_dice',
    chapter: 'Chapter 10',
    title: 'Reading the Brief',
    location: "Mira's Hidden Clinic",
    imageKey: 'mira_hidden_clinic',
    text: `The Archive brief is dense. Fourteen pages of medical monitoring protocol, corruption threshold parameters, and reporting structure. Two sections are the ones that matter: "Primary Directive — Subject Survival" and "Secondary Directive — Data Integrity." The question is which directive was the original primary. Reading document hierarchy under pressure requires both the vocabulary and the patience for clinical bureaucratic language.`,
    effectsOnEnter: {},
    choices: [
      {
        id: 'c10_clinic_dice_roll',
        text: '[Roll dice — Intelligence] Read carefully. Take time with the document hierarchy.',
        nextNode: 'c10_clinic_intelligence_dice',
        diceCheck: {
          stat: 'intelligence',
          difficulty: 13,
          diceType: 'd20',
          successNode: 'c10_clinic_memo_success',
          failureNode: 'c10_clinic_memo_fail',
        },
      },
    ],
  },

  {
    id: 'c10_clinic_memo_success',
    chapter: 'Chapter 10',
    title: 'What It Actually Said',
    location: "Mira's Hidden Clinic",
    imageKey: 'mira_hidden_clinic',
    text: `The Archive brief's original primary directive was subject survival. Secondary directive was data reporting. Mira did not invert them — she followed exactly what she was assigned. What she did not disclose was the origin of the assignment, not the assignment itself. The personal file covers the same period as the brief but from a different angle: month four, "subject demonstrated sufficient independence to require non-disclosure of assignment origin to maintain monitoring reliability." Month twelve, "subject has exceeded expected mark-compatibility parameters. Personal interest in outcome now complicates objective assessment." Month twenty-two, "I am no longer able to assess this person as a subject. This log is personal record, not Archive report." The Archive file stops at month twenty-two. The personal file continues.`,
    effectsOnEnter: { setFlags: ['clinic_memo_read_correctly'], miraTrust: 3 },
    choices: [
      {
        id: 'c10_memo_success_varr',
        text: 'Director Varr\'s access log was here yesterday. Check if he found this.',
        nextNode: 'c10_varr_at_clinic',
      },
      {
        id: 'c10_memo_success_forward',
        text: 'You have what you need. Return to Mira.',
        nextNode: 'c10_clinic_forgive_choice',
        effects: { miraTrust: 1 },
      },
    ],
  },

  {
    id: 'c10_clinic_memo_fail',
    chapter: 'Chapter 10',
    title: 'What You Thought It Said',
    location: "Mira's Hidden Clinic",
    imageKey: 'mira_hidden_clinic',
    text: `The document hierarchy reads as: primary directive, data integrity. Secondary, subject survival. You read it as a handler protocol — subject kept alive to produce data, not the other way around. The conclusion feels confirmed by the evidence. It is not the correct conclusion — you have read the revision history annotation incorrectly, inverting the final directive order — but the evidence feels conclusive in the way that misread evidence often does. The wrong conclusion is the one that costs the most when it becomes the basis for a decision.`,
    effectsOnEnter: { setFlags: ['clinic_memo_misread'], miraTrust: -2 },
    choices: [
      {
        id: 'c10_memo_fail_accuse',
        text: 'Confront Mira with what you found.',
        nextNode: 'c10_mira_cornered_truth',
        effects: { miraTrust: -2 },
      },
      {
        id: 'c10_memo_fail_varr',
        text: 'Find Varr. He may have already accessed this.',
        nextNode: 'c10_varr_at_clinic',
      },
    ],
  },

  {
    id: 'c10_varr_at_clinic',
    chapter: 'Chapter 10',
    title: 'The Director',
    location: "Mira's Hidden Clinic",
    imageKey: 'mira_hidden_clinic',
    speaker: 'Director Varr',
    text: `He is in the corridor outside the clinic, not inside. Waiting, not searching. "I found the clinic six weeks ago," he says before you can ask. "I have not reported its location to the Archive. That is not an act of generosity — it is a professional decision. Mira's data is more useful to me if she remains operational than if the Archive retrieves her." He examines you with the same clinical detachment he applies to everything. "I have also not reported your corruption gradient this chapter, which has been within actionable range twice. You should know that someone is tracking what I am not reporting. My silence has a cost I have not yet named."`,
    effectsOnEnter: { setFlags: ['varr_ch10_met'] },
    choices: [
      {
        id: 'c10_varr_what_cost',
        text: '"What is the cost."',
        nextNode: 'c10_varr_expose_mira',
      },
      {
        id: 'c10_varr_dismiss',
        text: '"Leave. Now."',
        nextNode: 'c10_clinic_forgive_choice',
        effects: { miraTrust: 1 },
      },
    ],
  },

  {
    id: 'c10_varr_expose_mira',
    chapter: 'Chapter 10',
    title: 'The Cost',
    location: "Mira's Hidden Clinic",
    imageKey: 'mira_hidden_clinic',
    speaker: 'Director Varr',
    text: `"The cost is this: Mira was not simply assigned to monitor you. She was modified for it. Phase One trials, Archive Medical Division, pre-blackout. Neurological architecture adjusted for mark-bearer resonance reading." He produces a document copy — the same brief you may have already found. "Her accuracy with your corruption assessments is not skill. It is engineered capacity. She is, in the Archive's technical classification, a secondary interface — not a bearer, but a designed reader of bearers." He pauses. "The cost of my continued silence is your cooperation with my Chapter 11 research access request. That is all. I am not asking you to harm her."`,
    effectsOnEnter: { setFlags: ['varr_expose_complete'] },
    choices: [
      {
        id: 'c10_varr_refuse_cost',
        text: 'Refuse. Leave immediately with this information.',
        nextNode: 'c10_mira_experiment_truth',
        effects: { miraTrust: 2 },
      },
      {
        id: 'c10_varr_accept_cost',
        text: 'Accept the terms. Research access in exchange for silence.',
        nextNode: 'c10_varr_expose_end',
        effects: { lastArchive: -10, miraTrust: -5, setFlags: ['varr_deal_accepted'] },
      },
    ],
  },

  {
    id: 'c10_mira_experiment_truth',
    chapter: 'Chapter 10',
    title: 'The Architecture',
    location: "Mira's Hidden Clinic",
    imageKey: 'mira_hidden_clinic',
    speaker: 'Mira',
    text: `You bring the information to her. She does not look surprised. "I was waiting for this to surface. Varr has had that file for months." She sits on the medical cot — the only time you have seen her use her own equipment. "The modification was done when I was nineteen. I did not consent to it in the way that word has meaning. I consented in the way subjects consent to institutional procedures when they are told it is for the program and the program is everything they know." A long pause. "The Archive built me to read you. I have spent three years using that capacity to help you survive instead. Those two facts coexist. I cannot remove one of them."`,
    effectsOnEnter: { setFlags: ['mira_experiment_acknowledged'] },
    choices: [
      {
        id: 'c10_experiment_runaway',
        text: '"I know what it is to be built by something you didn\'t choose."',
        nextNode: 'c10_clinic_forgive_choice',
        requirements: { backgrounds: ['runaway_experiment'] },
        effects: { miraTrust: 5, setFlags: ['runaway_experiment_mira_bond'] },
      },
      {
        id: 'c10_experiment_understand',
        text: '"You used it for me, not for them. That is the distinction that matters."',
        nextNode: 'c10_clinic_forgive_choice',
        effects: { miraTrust: 3 },
      },
      {
        id: 'c10_experiment_unsure',
        text: '"I need time to process this."',
        nextNode: 'c10_clinic_forgive_choice',
      },
    ],
  },

  {
    id: 'c10_mira_cornered_truth',
    chapter: 'Chapter 10',
    title: 'Forced to the Surface',
    location: "Mira's Hidden Clinic",
    imageKey: 'mira_hidden_clinic',
    speaker: 'Mira',
    text: `She listens to the accusation — that her primary directive was data over survival, that everything was always about the report — without interrupting. When you finish, she is quiet for a long time. "You misread the document hierarchy. The final directive order inverts on the revision annotation, page twelve." She says it without satisfaction. "I know it looks like what you said. I know the Archive's institutional language reads cold enough to be read that way. The truth is the opposite of what you found." She does not ask you to believe her. She points to page twelve. "Read it again. I will wait."`,
    effectsOnEnter: { setFlags: ['mira_cornered_truth'] },
    choices: [
      {
        id: 'c10_cornered_reread',
        text: 'Reread page twelve.',
        nextNode: 'c10_clinic_memo_success',
        effects: { miraTrust: 1 },
      },
      {
        id: 'c10_cornered_refuse',
        text: 'Refuse. Leave the clinic.',
        nextNode: 'c10_clinic_forgive_choice',
        effects: { miraTrust: -3 },
      },
    ],
  },

  {
    id: 'c10_clinic_forgive_choice',
    chapter: 'Chapter 10',
    title: 'The Decision',
    location: "Mira's Hidden Clinic",
    imageKey: 'mira_hidden_clinic',
    text: `The evidence is on the bench. The personal file. The Archive brief. Mira's admission. Varr's exposure. The modification she carries in her neurological architecture and has been using to help you survive for three years. The question is not whether the Archive assigned her — it did. The question is whether the person who stayed through nine chapters, after the assignment no longer required it, is a different question from the assignment itself.`,
    effectsOnEnter: {},
    choices: [
      {
        id: 'c10_forgive_stay',
        text: '"I do not forgive the Archive for what they did to you. I forgive you for the delay."',
        nextNode: 'c10_mira_stays_path',
        requirements: { miraTrust: 4 },
        effects: { miraTrust: 4, setFlags: ['mira_forgiven'] },
      },
      {
        id: 'c10_forgive_process',
        text: '"I need more time. Nothing has been decided."',
        nextNode: 'c10_mira_stays_path',
        effects: { miraTrust: 1 },
      },
      {
        id: 'c10_forgive_leave_setup',
        text: '"I cannot carry this right now. The assignment changes everything."',
        nextNode: 'c10_mira_leaves_setup',
        effects: { miraTrust: -3 },
      },
    ],
  },

  {
    id: 'c10_mira_stays_path',
    chapter: 'Chapter 10',
    title: 'She Stays',
    location: "Mira's Hidden Clinic",
    imageKey: 'mira_hidden_clinic',
    speaker: 'Mira',
    text: `"I will stay for as long as you want me here." Nothing more. She reorganises the last three vials on the bench — the small physical ritual of someone who has set down something very heavy and is now taking up familiar weight. "The next chapter will be worse, in specific ways, than the last nine. The entity's pressure escalates. The Last Gate approach requires a decision architecture the Archive designed for a bearer under optimal psychological conditions. You will not be under optimal conditions." She hands you an updated medical assessment. "But optimal was never the baseline we were working from."`,
    effectsOnEnter: { setFlags: ['mira_stays_ch10'], miraTrust: 2 },
    choices: [
      {
        id: 'c10_mira_stays_cain',
        text: 'Find Cain. His chapter is still unresolved.',
        nextNode: 'c10_clinic_complete',
      },
      {
        id: 'c10_mira_stays_bridge',
        text: 'Go to the bridge camp. External situation first.',
        nextNode: 'c10_bridge_camp_arrive',
      },
    ],
  },

  {
    id: 'c10_mira_leaves_setup',
    chapter: 'Chapter 10',
    title: 'She Begins to Leave',
    location: "Mira's Hidden Clinic",
    imageKey: 'mira_hidden_clinic',
    speaker: 'Mira',
    text: `She nods once, a small movement that is not agreement — it is recognition. She turns to the bench and begins the specific process of packing a medical kit that is meant to travel: vials removed from their rack, cases sealed, the centrifuge left because it cannot be carried. She does not say she understands. She does not argue. "The bridge camp has Sera," she says, her back to you. "She can help with whatever the mark needs medically. She is not modified for it, but she is good." A pause. "I hope Chapter 11 is what you need it to be." She does not look up.`,
    effectsOnEnter: { setFlags: ['mira_leaving_process'], miraTrust: -2 },
    choices: [
      {
        id: 'c10_leaves_last_chance',
        text: '"Wait. I am not finished with this conversation."',
        nextNode: 'c10_clinic_forgive_choice',
        effects: { miraTrust: 1 },
      },
      {
        id: 'c10_leaves_let_go',
        text: 'Say nothing. Let her finish packing.',
        nextNode: 'c10_mira_leaves_end',
      },
    ],
  },

  {
    id: 'c10_clinic_complete',
    chapter: 'Chapter 10',
    title: 'After the Clinic',
    location: "Mira's Hidden Clinic",
    imageKey: 'mira_hidden_clinic',
    text: `The clinic has given you what it had to give. The mark reads Mira's modified neurological architecture differently now — the slight resonance that has always been present in her assessments has a name and a history. The personal file is yours to keep, if you took it. The Archive brief is in the case. Director Varr is somewhere in the maintenance corridor. The next location is the war room, where Cain has been waiting.`,
    effectsOnEnter: {},
    choices: [
      {
        id: 'c10_clinic_to_war_room',
        text: 'Go to Cain\'s war room.',
        nextNode: 'c10_cain_war_room_arrive',
      },
    ],
  },

  // ── CAIN'S WAR ROOM ───────────────────────────────────────────────────────

  {
    id: 'c10_cain_war_room_arrive',
    chapter: 'Chapter 10',
    title: 'The War Room',
    location: "Cain's War Room",
    imageKey: 'cain_war_room',
    text: `The war room is three maintenance rooms repurposed: a tactical table built from a signal console, wall maps with pins and wire, a single bunk that has not been used recently. Cain has been running the external security assessment from here since Chapter 7. The room smells like metal, cigarette substitute, and the specific chemical residue that means someone has been cleaning weapons. On the tactical table, alongside the district maps, is a sealed folder marked with an Iron Saints watermark that has been partially redacted. The folder is open. He did not hide it.`,
    effectsOnEnter: { setFlags: ['cain_war_room_arrived'] },
    choices: [
      {
        id: 'c10_war_room_read_folder',
        text: 'Read the Iron Saints folder.',
        nextNode: 'c10_war_room_orders_found',
      },
      {
        id: 'c10_war_room_tactician',
        text: 'Assess the tactical situation from the maps first.',
        nextNode: 'c10_war_room_orders_found',
        requirements: { classes: ['tactician'] },
        effects: { intelligence: 2, setFlags: ['tactician_war_room_read'] },
      },
    ],
  },

  {
    id: 'c10_war_room_orders_found',
    chapter: 'Chapter 10',
    title: 'The Evacuation Orders',
    location: "Cain's War Room",
    imageKey: 'cain_war_room',
    text: `The folder contains blackout-era military documentation: Level 3 South evacuation orders, Iron Saints unit command structure, timeline of events from three days before the blackout to six days after. The orders are signed by an Iron Saints commander. Cain's name appears on the enforcement chain — not commanding, but implementing. The timeline shows the Level 3 South evacuation was initiated forty minutes before the structural assessment was complete. A footnote, added in different ink: "Seventeen casualties in junction corridor. Structural failure occurred during evacuation. Cause: premature corridor clearance." The footnote is in Cain's handwriting. He added it himself. He has been carrying this document.`,
    effectsOnEnter: { setFlags: ['cain_orders_found'] },
    choices: [
      {
        id: 'c10_orders_confront_now',
        text: 'Confront Cain directly. Now.',
        nextNode: 'c10_cain_confrontation',
      },
      {
        id: 'c10_orders_soldier_read',
        text: 'You know how military orders work. Read the command chain carefully.',
        nextNode: 'c10_orders_examination',
        requirements: { backgrounds: ['exiled_soldier'] },
        effects: { intelligence: 2, cainTrust: 1, setFlags: ['soldier_background_orders_read'] },
      },
      {
        id: 'c10_orders_examine_first',
        text: 'Examine the full order chain before approaching Cain.',
        nextNode: 'c10_orders_examination',
      },
    ],
  },

  {
    id: 'c10_orders_examination',
    chapter: 'Chapter 10',
    title: 'The Command Chain',
    location: "Cain's War Room",
    imageKey: 'cain_war_room',
    text: `The command chain is clear. The evacuation order came from Iron Saints Central Command — Cain was three levels below the decision. His name appears on the implementation log as the officer who cleared the corridor. What is not in the formal documentation but visible in the timeline: a four-minute gap between the structural assessment request and the evacuation order. Someone above Cain's rank issued the order before the assessment returned. Cain implemented an order that was already moving when the error in it became apparent. He did not stop it. That is the specific weight he carries: not that he ordered it, but that he did not countermand it when he saw the assessment return incomplete.`,
    effectsOnEnter: { setFlags: ['cain_orders_understood'] },
    choices: [
      {
        id: 'c10_examination_confront',
        text: 'Bring this to Cain. You understand the chain; you want his account.',
        nextNode: 'c10_cain_confrontation_choice',
        effects: { cainTrust: 1 },
      },
    ],
  },

  {
    id: 'c10_cain_confrontation_choice',
    chapter: 'Chapter 10',
    title: 'The Confrontation',
    location: "Cain's War Room",
    imageKey: 'cain_war_room',
    text: `He is at the tactical table when you find him with the folder. He sees that you have read it. The expression that crosses his face is not guilt, exactly — it is the face of someone who has been waiting for a specific conversation and is now in it. He does not reach for the folder or offer an explanation. He waits for you to begin.`,
    effectsOnEnter: {},
    choices: [
      {
        id: 'c10_confront_direct',
        text: '"Tell me about the four-minute gap."',
        nextNode: 'c10_cain_confrontation',
        requirements: { cainTrust: 4 },
      },
      {
        id: 'c10_confront_accusation',
        text: '"Seventeen people died because you didn\'t stop it."',
        nextNode: 'c10_cain_defense',
        effects: { cainTrust: -2 },
      },
    ],
  },

  {
    id: 'c10_cain_confrontation',
    chapter: 'Chapter 10',
    title: 'The Four-Minute Gap',
    location: "Cain's War Room",
    imageKey: 'cain_war_room',
    speaker: 'Cain',
    text: `"I received the order. The assessment request was already logged. I knew the gap was there." He does not look away. "I implemented it because I believed the assessment would clear, and the evacuation timetable was already running, and stopping it mid-execution in a corridor under structural pressure was its own risk." A long pause. "It was the wrong calculation. The assessment returned incomplete forty seconds after I cleared the junction. The structural failure happened four minutes later. Seventeen people." He sits. "I have been keeping the document as the cost of not having stopped it. I do not carry it to punish myself. I carry it because forgetting it would be worse."`,
    effectsOnEnter: { setFlags: ['cain_blackout_confronted'] },
    choices: [
      {
        id: 'c10_confront_hear_more',
        text: '"Did the Iron Saints know the assessment was incomplete?"',
        nextNode: 'c10_cain_blackout_truth',
      },
      {
        id: 'c10_confront_enough',
        text: '"I have heard enough. What matters is what you do now."',
        nextNode: 'c10_cain_accept_past',
        effects: { cainTrust: 2 },
      },
    ],
  },

  {
    id: 'c10_cain_blackout_truth',
    chapter: 'Chapter 10',
    title: 'The Command Knew',
    location: "Cain's War Room",
    imageKey: 'cain_war_room',
    speaker: 'Cain',
    text: `"Central Command had the assessment gap flagged. The decision to proceed was made at three levels above my rank." He does not use this as exculpation — the tone is explicit about what he is doing. "I am telling you because you asked. Not because it makes what I did acceptable. Acceptable would mean the seventeen people are less dead, and they are not." He looks at the wall map. "Juno knows this. She was in the Iron Saints legal division and has been building a case on Central Command's decision chain. If she is at the bridge camp, she will tell you the rest of the command structure. She is not wrong to have kept records. I am not going to ask you not to look."`,
    effectsOnEnter: { setFlags: ['cain_command_truth_given'] },
    choices: [
      {
        id: 'c10_blackout_accept',
        text: '"You did not stop it. You have been carrying it since. That is the account."',
        nextNode: 'c10_cain_accept_past',
        effects: { cainTrust: 3 },
      },
      {
        id: 'c10_blackout_reject',
        text: '"Knowing the command knew does not answer for the four minutes."',
        nextNode: 'c10_cain_reject_past',
        effects: { cainTrust: -3 },
      },
    ],
  },

  {
    id: 'c10_cain_defense',
    chapter: 'Chapter 10',
    title: 'No Defense',
    location: "Cain's War Room",
    imageKey: 'cain_war_room',
    speaker: 'Cain',
    text: `"I am not going to defend it." He says this before you offer a defense or deny him one. "The Iron Saints framework gave me a structure that made the calculation feel rational in the moment. I know what that structure was and what it cost when it was applied to people who were not in it." He stands. "What I am asking is not forgiveness. I am asking whether you believe someone who made that calculation once can make different calculations now. That is the question I have. Not whether I deserve a different verdict on seventeen years ago."`,
    effectsOnEnter: { setFlags: ['cain_defense_given'] },
    choices: [
      {
        id: 'c10_defense_believe',
        text: '"I have watched you make different calculations for nine chapters. Yes."',
        nextNode: 'c10_cain_accept_past',
        effects: { cainTrust: 4 },
      },
      {
        id: 'c10_defense_unsure',
        text: '"I do not know yet."',
        nextNode: 'c10_cain_reject_past',
        effects: { cainTrust: -1 },
      },
    ],
  },

  {
    id: 'c10_cain_accept_past',
    chapter: 'Chapter 10',
    title: 'What He Does Now',
    location: "Cain's War Room",
    imageKey: 'cain_war_room',
    speaker: 'Cain',
    text: `He is quiet for a moment after you say it. Not visibly moved — Cain's emotional register is narrow and the signals are physical rather than facial. But something in the posture changes: the specific tension of a man who has been waiting for a conversation to go a particular way and is now in the version where it went the right way. "I will stay," he says. "Not because you gave me permission. Because I choose to." He closes the folder, returns it to the table. "Saint Veyra is in this district. She has been trying to reach me for four days. I have not responded. She will not leave without a direct answer." He looks at you. "She is going to come here."`,
    effectsOnEnter: { setFlags: ['cain_accepted', 'cain_stays_ch10'], cainTrust: 3 },
    choices: [
      {
        id: 'c10_accept_veyra_ready',
        text: '"Let her come. We will deal with it together."',
        nextNode: 'c10_veyra_arrives',
        effects: { cainTrust: 1 },
      },
      {
        id: 'c10_accept_bridge_first',
        text: 'Go to the bridge camp first. Veyra will wait.',
        nextNode: 'c10_bridge_camp_arrive',
      },
    ],
  },

  {
    id: 'c10_cain_reject_past',
    chapter: 'Chapter 10',
    title: 'The Distance',
    location: "Cain's War Room",
    imageKey: 'cain_war_room',
    speaker: 'Cain',
    text: `He accepts this without arguing. "I understand." He does not move. "I will remain operationally useful for this chapter. Whatever you need in terms of tactics, security, the bridge camp situation — I will provide that." A pause that has something in it. "What I will not provide is the pretense that this is the same as what it was. If the answer is that the four minutes is the permanent account, then the account is what it is. I can work from that." He pauses. "The Iron Saints version of me operated from a worse account for longer. I am familiar with the format."`,
    effectsOnEnter: { setFlags: ['cain_rejected', 'cain_rival_path_set'], cainTrust: -2 },
    choices: [
      {
        id: 'c10_reject_rival_accept',
        text: '"Operational. Understood."',
        nextNode: 'c10_veyra_arrives',
      },
      {
        id: 'c10_reject_reconsider',
        text: '"That is not the final answer. I need more time."',
        nextNode: 'c10_cain_accept_past',
        effects: { cainTrust: 1 },
      },
    ],
  },

  {
    id: 'c10_veyra_arrives',
    chapter: 'Chapter 10',
    title: 'Saint Veyra',
    location: "Cain's War Room",
    imageKey: 'cain_war_room',
    speaker: 'Saint Veyra',
    text: `She arrives without announcement — the Saints have been in this district long enough to know the access routes. She is smaller than the reputation suggests, with the Iron Saints' grey-and-bronze jacket and the kind of stillness that comes from having been violent enough times that violence no longer requires preparation. "Cain." She does not address you. "The Saints need the mark-bearer contained, and they need someone they trust managing that containment. You know what I am asking." She finally looks at you — a professional, measuring look. "If you are what I have been told you are, you are too significant to leave unmanaged in the hands of Archive archivists and whatever this is." She means the companions.`,
    effectsOnEnter: { setFlags: ['veyra_arrived_ch10'] },
    choices: [
      {
        id: 'c10_veyra_talk_down',
        text: 'Talk her down. Cain is not available for this.',
        nextNode: 'c10_veyra_charisma_dice',
      },
      {
        id: 'c10_veyra_blade_challenge',
        text: 'Challenge her directly. Make the boundary clear physically.',
        nextNode: 'c10_veyra_charisma_dice',
        requirements: { classes: ['blade_survivor'] },
        effects: { setFlags: ['blade_veyra_challenge'] },
      },
      {
        id: 'c10_veyra_scavenger_angle',
        text: 'Offer her a tactical trade. Her soldiers have supply needs you can meet.',
        nextNode: 'c10_veyra_charisma_dice',
        requirements: { classes: ['gun_scavenger'] },
        effects: { setFlags: ['scavenger_veyra_trade'] },
      },
    ],
  },

  {
    id: 'c10_veyra_charisma_dice',
    chapter: 'Chapter 10',
    title: 'The Saints Negotiation',
    location: "Cain's War Room",
    imageKey: 'cain_war_room',
    text: `Veyra has been a Saint commander for eleven years. She does not move by sentiment. She moves by assessment: threat level, operational utility, alliance cost. The argument that works is not an emotional one — it is a structural one: what the Saints gain by leaving Cain where he is versus what they lose by forcing a confrontation with a mark-bearer in an active chapter.`,
    effectsOnEnter: {},
    choices: [
      {
        id: 'c10_veyra_dice_roll',
        text: '[Roll dice — Charisma] Make the structural case.',
        nextNode: 'c10_veyra_charisma_dice',
        diceCheck: {
          stat: 'charisma',
          difficulty: 14,
          diceType: 'd20',
          successNode: 'c10_veyra_success',
          failureNode: 'c10_veyra_fail',
        },
      },
    ],
  },

  {
    id: 'c10_veyra_success',
    chapter: 'Chapter 10',
    title: 'The Saints Stand Down',
    location: "Cain's War Room",
    imageKey: 'cain_war_room',
    speaker: 'Saint Veyra',
    text: `She listens. Her expression does not change during the argument, but at the end she makes a small sound that is not agreement — it is professional acknowledgment. "The utility analysis holds. The Saints do not benefit from a confrontation at this stage." She looks at Cain. "The offer remains open. The standing invitation does not expire." She leaves the way she came — without announcement, without final words, with the efficiency of someone who has not conceded but has deferred. Cain watches her go. "She will be back," he says. "But not today."`,
    effectsOnEnter: { setFlags: ['veyra_turned_away'], cainTrust: 2 },
    choices: [
      {
        id: 'c10_veyra_success_forward',
        text: 'Leave the war room. The bridge camp next.',
        nextNode: 'c10_war_room_complete',
      },
    ],
  },

  {
    id: 'c10_veyra_fail',
    chapter: 'Chapter 10',
    title: 'The Saints Take Him',
    location: "Cain's War Room",
    imageKey: 'cain_war_room',
    speaker: 'Saint Veyra',
    text: `The argument does not land. Veyra's assessment of the utility analysis produces a different conclusion. "The Saints' operational cost of Cain's continued absence exceeds the benefit of non-confrontation at this stage." She moves to Cain. He does not resist immediately — there is a moment where the choice is present for him, visible on his face, and then he looks at you. If the trust is already low, he goes with her. If the trust is high enough, he makes a different call. His eyes are the whole conversation.`,
    effectsOnEnter: { setFlags: ['veyra_wins_negotiation'] },
    choices: [
      {
        id: 'c10_veyra_fail_cain_stays',
        text: '"Cain. Your choice."',
        nextNode: 'c10_cain_accept_past',
        requirements: { cainTrust: 6 },
        effects: { cainTrust: 3, setFlags: ['cain_chose_player_over_saints'] },
      },
      {
        id: 'c10_veyra_fail_cain_goes',
        text: 'Watch. Say nothing.',
        nextNode: 'c10_cain_saints_return_end',
      },
    ],
  },

  {
    id: 'c10_war_room_complete',
    chapter: 'Chapter 10',
    title: 'After the War Room',
    location: "Cain's War Room",
    imageKey: 'cain_war_room',
    text: `The war room's account is settled. Cain's presence — loyal, rival, or something in between — has been determined by what was said and what was not. The tactical maps are still on the table. The Iron Saints folder is where he left it. The bridge camp is reporting movement from the Glass Court forward scouts. It is time to move.`,
    effectsOnEnter: { setFlags: ['cain_war_room_complete'] },
    choices: [
      {
        id: 'c10_war_room_to_bridge',
        text: 'Go to the broken bridge camp.',
        nextNode: 'c10_bridge_camp_arrive',
      },
      {
        id: 'c10_war_room_to_alley',
        text: 'The Masked Heir has been seen in Betrayal Alley. Go directly.',
        nextNode: 'c10_betrayal_alley_arrive',
      },
    ],
  },

  // ── THE BROKEN BRIDGE CAMP ─────────────────────────────────────────────────

  {
    id: 'c10_bridge_camp_arrive',
    chapter: 'Chapter 10',
    title: 'The Bridge Camp',
    location: 'The Broken Bridge Camp',
    imageKey: 'broken_bridge_camp',
    text: `The Broken Bridge Camp occupies the Level 3 transit junction where the main tram line collapsed during the blackout — the bridge half-standing, the camp built across the stable section and into both tunnel approaches. Three hundred and twelve people have been here since Chapter 8. The camp coordinator from the Hunger War period, Dever, is at the main table. Near the east entrance, two familiar faces: Sera, if she survived, reading medical notes. Juno, if she survived, at a portable legal documentation station. The camp has processed the end of the Hunger War and is now managing what comes after it — the specific human cost of survival at reduced intensity.`,
    effectsOnEnter: { setFlags: ['bridge_camp_ch10_arrived'] },
    choices: [
      {
        id: 'c10_camp_sera',
        text: 'Find Sera. Mira\'s situation may be known to her.',
        nextNode: 'c10_sera_at_camp',
        requirements: { flags: ['sera_alive'] },
      },
      {
        id: 'c10_camp_juno',
        text: 'Find Juno. Cain\'s situation may be documented.',
        nextNode: 'c10_juno_at_camp',
        requirements: { flags: ['juno_alive'] },
      },
      {
        id: 'c10_camp_wasteland_connect',
        text: 'Help with immediate camp needs first. You know how this works.',
        nextNode: 'c10_bridge_camp_survey',
        requirements: { backgrounds: ['wasteland_orphan'] },
        effects: { morale: 5, hollowChildren: 3, setFlags: ['wasteland_camp_help'] },
      },
      {
        id: 'c10_camp_survey_general',
        text: 'Survey the camp generally.',
        nextNode: 'c10_bridge_camp_survey',
      },
    ],
  },

  {
    id: 'c10_bridge_camp_survey',
    chapter: 'Chapter 10',
    title: 'The Camp State',
    location: 'The Broken Bridge Camp',
    imageKey: 'broken_bridge_camp',
    text: `The camp is stable in the way that things are stable after crises: functional, weary, attending to the longer-term costs of the emergency. The Bone Soup Kitchen is still running. The irrigation system Dever finished is in its second week of operation. The bacterial culture from the Dead Orchard seed has taken. People are rebuilding what they can. The camp's specific pressure now is external: the Glass Court has scouts in the Level 3 northern approach, watching the camp without moving on it. The Iron Saints remnants are in the southern corridors. The camp is managing two external threats by not appearing to notice either.`,
    effectsOnEnter: {},
    choices: [
      {
        id: 'c10_survey_sera_juno',
        text: 'Check in with Sera and Juno if present.',
        nextNode: 'c10_sera_at_camp',
        requirements: { flags: ['sera_alive'] },
      },
      {
        id: 'c10_survey_forward',
        text: 'Move forward. The camp is stable enough.',
        nextNode: 'c10_bridge_camp_forward',
      },
    ],
  },

  {
    id: 'c10_sera_at_camp',
    chapter: 'Chapter 10',
    title: 'Sera',
    location: 'The Broken Bridge Camp',
    imageKey: 'broken_bridge_camp',
    speaker: 'Sera',
    text: `She is reviewing intake notes when you approach — the camp's medical log, tracking the specific health impacts of the Hunger War's lower equilibrium on the survivors. "I know about Mira," she says before you ask. "Not from her. I found the Archive brief in the pre-blackout medical distribution list — she was on it. I recognised the format." She puts down the notes. "I want you to know what the full context is, because Mira will not tell you this part: Phase One trials had six subjects. Five of them did not survive the modification intact. Mira did. The Archive considered that a success. She considered it a reason to never go back to them." Sera pauses. "She stayed because she chose to. The modification was done without full consent. What she did with it after was entirely hers."`,
    effectsOnEnter: { setFlags: ['sera_vouches_mira'], miraTrust: 3 },
    choices: [
      {
        id: 'c10_sera_thanks',
        text: '"Thank you. This matters."',
        nextNode: 'c10_juno_at_camp',
        requirements: { flags: ['juno_alive'] },
      },
      {
        id: 'c10_sera_to_juno',
        text: 'Find Juno. Cain\'s account next.',
        nextNode: 'c10_juno_at_camp',
        requirements: { flags: ['juno_alive'] },
      },
      {
        id: 'c10_sera_forward',
        text: 'Move forward from the camp.',
        nextNode: 'c10_bridge_camp_forward',
      },
    ],
  },

  {
    id: 'c10_juno_at_camp',
    chapter: 'Chapter 10',
    title: 'Juno',
    location: 'The Broken Bridge Camp',
    imageKey: 'broken_bridge_camp',
    speaker: 'Juno',
    text: `She is at the documentation station, and the documentation is not general camp business — it is an Iron Saints legal case file, assembled from fragments over three years. "The command chain for the Level 3 South evacuation goes to Iron Saints Central Command director Helan Vor," she says immediately. "Cain was six positions below the decision. The order was issued before the structural assessment returned. Vor knew the gap. He issued the order anyway." She organises the pages. "I have not filed this case because I have not been certain of the jurisdiction. But the documentation exists. What Cain carried was real, and the decision above him was worse." A pause. "He should know I am building this. I think he already suspects."`,
    effectsOnEnter: { setFlags: ['juno_cain_expose_given'], cainTrust: 2 },
    choices: [
      {
        id: 'c10_juno_tell_cain',
        text: 'Tell Cain about Juno\'s case file.',
        nextNode: 'c10_bridge_camp_forward',
        effects: { cainTrust: 2, setFlags: ['juno_case_shared_with_cain'] },
      },
      {
        id: 'c10_juno_keep_for_now',
        text: 'Keep this for the right moment.',
        nextNode: 'c10_bridge_camp_forward',
      },
    ],
  },

  {
    id: 'c10_bridge_camp_forward',
    chapter: 'Chapter 10',
    title: 'Leaving the Camp',
    location: 'The Broken Bridge Camp',
    imageKey: 'broken_bridge_camp',
    text: `The camp has given what it has. Sera's account and Juno's case file add specific context to what the clinic and war room produced. The Masked Heir has been active in the Betrayal Alley district — their pattern of appearing when companion relationships are under pressure is noted. The Memory Shelter is further along, for when the structural crises are resolved. The chapter is moving toward its companion-resolution phase.`,
    effectsOnEnter: { setFlags: ['bridge_camp_complete'] },
    choices: [
      {
        id: 'c10_camp_to_alley',
        text: 'Go to Betrayal Alley. Deal with the Heir.',
        nextNode: 'c10_betrayal_alley_arrive',
      },
      {
        id: 'c10_camp_to_shelter',
        text: 'Go to the Memory Shelter. The companion conversations need space.',
        nextNode: 'c10_memory_shelter_arrive',
      },
    ],
  },

  // ── THE BETRAYAL ALLEY ────────────────────────────────────────────────────

  {
    id: 'c10_betrayal_alley_arrive',
    chapter: 'Chapter 10',
    title: 'Betrayal Alley',
    location: 'The Betrayal Alley',
    imageKey: 'betrayal_alley',
    text: `Betrayal Alley is not the tunnel network's name for this place — it is the camp's name, earned from the three separate faction betrayals that have played out in this junction district. Narrow, well-lit by a string of salvage lamps, running between the Level 3 north maintenance corridor and the Archive's secondary access gate. The Masked Heir is at the far end, leaning against the gate pillar with the specific stillness of someone who was expecting you and has been waiting for an appropriate interval.`,
    effectsOnEnter: { setFlags: ['betrayal_alley_arrived'] },
    choices: [
      {
        id: 'c10_alley_approach_heir',
        text: 'Approach the Heir directly.',
        nextNode: 'c10_heir_in_alley',
      },
    ],
  },

  {
    id: 'c10_heir_in_alley',
    chapter: 'Chapter 10',
    title: 'The Heir in the Alley',
    location: 'The Betrayal Alley',
    imageKey: 'betrayal_alley',
    speaker: 'The Masked Heir',
    text: `"I am not here to harm either of them," they say immediately. "I am here because both of them are at decision points that will affect the Last Gate approach, and I have information that changes the calculus of those decisions." They glance past you, checking for Mira and Cain's positions. "Mira has been recalled by the Archive's Medical Division. The recall order was sent four days ago. She has not disclosed this to you." A pause. "Cain has been offered a formal immunity arrangement by Saint Veyra in exchange for returning to the Saints and reporting on your progress. He has not accepted or refused." They look at you directly. "I am telling you this because I need you to make informed decisions. Not because I want you to trust me."`,
    effectsOnEnter: { setFlags: ['heir_ch10_met'] },
    choices: [
      {
        id: 'c10_heir_ask_agenda',
        text: '"What do you get from this."',
        nextNode: 'c10_heir_manipulation_pitch',
      },
      {
        id: 'c10_heir_dismiss',
        text: '"You are working an angle. I am not interested."',
        nextNode: 'c10_heir_manipulation_pitch',
        effects: { intelligence: 1 },
      },
    ],
  },

  {
    id: 'c10_heir_manipulation_pitch',
    chapter: 'Chapter 10',
    title: 'The Offer',
    location: 'The Betrayal Alley',
    imageKey: 'betrayal_alley',
    speaker: 'The Masked Heir',
    text: `"What I get is a Last Gate negotiation that has a capable mark-bearer who has not been destabilised by avoidable companion crises." They step away from the wall. "I am offering both of your companions an alternative. Mira: Archive Medical Division drops the recall order in exchange for her relocating to the Archive's Level 1 research wing. She keeps her work. She leaves your company. It is a better arrangement for her than Chapter 11 will be." They pause. "Cain: the Iron Saints immunity arrangement includes a formal exoneration of the Level 3 South operation. The case Juno is building goes away. He returns to the Saints with his record clean." They spread their hands. "These are not bad offers. I need you to be honest about whether you are keeping them with you for their benefit or yours."`,
    effectsOnEnter: { setFlags: ['heir_offers_made'] },
    choices: [
      {
        id: 'c10_heir_pitch_see_through',
        text: 'See through it. The Heir needs you isolated for the Last Gate.',
        nextNode: 'c10_heir_intelligence_dice',
        effects: { intelligence: 1 },
      },
      {
        id: 'c10_heir_pitch_consider',
        text: 'The offers sound legitimate. Consider them seriously.',
        nextNode: 'c10_heir_mira_offer',
      },
      {
        id: 'c10_heir_underground_read',
        text: 'You know this kind of offer structure. Read what\'s underneath it.',
        nextNode: 'c10_heir_expose_success',
        requirements: { backgrounds: ['underground_medic'] },
        effects: { intelligence: 3, setFlags: ['underground_reads_heir'] },
      },
    ],
  },

  {
    id: 'c10_heir_mira_offer',
    chapter: 'Chapter 10',
    title: "The Heir's Mira Offer",
    location: 'The Betrayal Alley',
    imageKey: 'betrayal_alley',
    speaker: 'The Masked Heir',
    text: `"The Archive recall order is real. I have the document number." They produce a small data card. "The research wing arrangement is a negotiated alternative — I have been in communication with Archive Research Director Vance for two weeks. Mira gets full access to the Phase One trial documentation, which means she can understand what was done to her and potentially reverse the neurological modification." They pause. "She gets closure. She gets her own history. She does not get Chapter 11 with a mark-bearer who cannot protect her from the Archive's enforcement division." A long pause. "Is the reason you would refuse this offer about her, or about you?"`,
    effectsOnEnter: { setFlags: ['heir_mira_offer_detailed'] },
    choices: [
      {
        id: 'c10_mira_offer_reject',
        text: 'Reject. This is her choice to make, not yours to facilitate.',
        nextNode: 'c10_heir_cain_offer',
        effects: { miraTrust: 1 },
      },
      {
        id: 'c10_mira_offer_accept_present',
        text: 'Accept. Let Mira hear the offer herself.',
        nextNode: 'c10_mira_wavering',
      },
    ],
  },

  {
    id: 'c10_heir_cain_offer',
    chapter: 'Chapter 10',
    title: "The Heir's Cain Offer",
    location: 'The Betrayal Alley',
    imageKey: 'betrayal_alley',
    speaker: 'The Masked Heir',
    text: `"Veyra's immunity arrangement covers the Level 3 South operation entirely. Juno's case file goes into the Iron Saints internal review process, where it will be handled as an institutional matter rather than a personal accusation against Cain specifically." They pause. "The exoneration is not justice for the seventeen people — nothing is. But it removes the specific weight Cain has been carrying from an institutional context that was already wrong before he implemented the order." A pause. "He has been your security asset for ten chapters because he could not go home. If home is no longer a court-martial, you should ask yourself whether you want him to stay because it is good for him or because you need him."`,
    effectsOnEnter: { setFlags: ['heir_cain_offer_detailed'] },
    choices: [
      {
        id: 'c10_cain_offer_reject',
        text: 'Reject. Cain makes his own choices.',
        nextNode: 'c10_heir_intelligence_dice',
        effects: { cainTrust: 1 },
      },
      {
        id: 'c10_cain_offer_consider',
        text: 'Let Cain hear the offer.',
        nextNode: 'c10_cain_wavering',
      },
    ],
  },

  {
    id: 'c10_heir_intelligence_dice',
    chapter: 'Chapter 10',
    title: 'Reading the Manipulation',
    location: 'The Betrayal Alley',
    imageKey: 'betrayal_alley',
    text: `The Heir's information is specific and verifiable — the recall order document number, the immunity arrangement details. But the Heir's strategic interest is also specific: a mark-bearer approaching the Last Gate without companions is a mark-bearer the Heir can negotiate with directly, without the variables that companions introduce. The question is whether the information and the agenda are separable — whether the Heir can be right about the external facts and wrong about the conclusion they want you to draw from them.`,
    effectsOnEnter: {},
    choices: [
      {
        id: 'c10_heir_dice_roll',
        text: '[Roll dice — Intelligence] Separate the information from the agenda.',
        nextNode: 'c10_heir_intelligence_dice',
        diceCheck: {
          stat: 'intelligence',
          difficulty: 14,
          diceType: 'd20',
          successNode: 'c10_heir_expose_success',
          failureNode: 'c10_heir_expose_fail',
        },
      },
    ],
  },

  {
    id: 'c10_heir_expose_success',
    chapter: 'Chapter 10',
    title: 'The Separation',
    location: 'The Betrayal Alley',
    imageKey: 'betrayal_alley',
    text: `The information is real. The recall order exists. The immunity arrangement is a genuine Iron Saints offer. The Heir did not fabricate the external pressures — they surfaced real pressures that were already present. What they fabricated was the conclusion: that the pressures require your companions to leave. The separation is clear: the pressures can be managed with the companions present, and the Heir's interest in presenting them as incompatible is the manipulation. You say this aloud, clearly, in front of the Heir. Their expression does not change. "You are right," they say. "The conclusion was mine, not the evidence. I note that you arrived at the correct analysis. That is a meaningful data point for the Last Gate."`,
    effectsOnEnter: { setFlags: ['heir_manipulation_exposed'], intelligence: 3, miraTrust: 2, cainTrust: 2 },
    choices: [
      {
        id: 'c10_expose_success_forward',
        text: 'Leave the alley. Find your companions.',
        nextNode: 'c10_alley_resolution',
      },
    ],
  },

  {
    id: 'c10_heir_expose_fail',
    chapter: 'Chapter 10',
    title: 'The Separation Fails',
    location: 'The Betrayal Alley',
    imageKey: 'betrayal_alley',
    text: `The information and the agenda blur together. The Heir's conclusion feels supported by the evidence because the evidence is real: the recall order exists, the immunity arrangement exists, the pressures are not fabricated. The conclusion — that these pressures require the companions to leave — arrives with the weight of the real evidence behind it. One companion, the one whose trust has been more strained through the chapter, begins to consider the Heir's offer as a reasonable option. The manipulation succeeds not through deception but through the specific exploitation of real problems.`,
    effectsOnEnter: { setFlags: ['heir_manipulation_partially_succeeds'] },
    choices: [
      {
        id: 'c10_fail_mira_wavers',
        text: 'Mira is the one who considers leaving.',
        nextNode: 'c10_mira_wavering',
      },
      {
        id: 'c10_fail_cain_wavers',
        text: 'Cain is the one who considers leaving.',
        nextNode: 'c10_cain_wavering',
      },
      {
        id: 'c10_fail_both_wavers',
        text: 'Both of them are considering it. The manipulation worked on both.',
        nextNode: 'c10_heir_manipulation_end',
      },
    ],
  },

  {
    id: 'c10_mira_wavering',
    chapter: 'Chapter 10',
    title: 'Mira at the Edge',
    location: 'The Betrayal Alley',
    imageKey: 'betrayal_alley',
    speaker: 'Mira',
    text: `"The Archive recall order and the research wing arrangement are both real. I verified the document number." She is not in the Alley — she is in the corridor adjacent, where the conversation reached her. "The Phase One documentation is something I have needed for three years. The modification the Archive made is in my neurological architecture and I do not know its full extent." She is not performing distress — she is stating medical facts. "I am not going to leave without saying what I am considering. But I am considering whether staying through Chapter 11 is something I can survive, given that the Archive's enforcement division has an active recall." She looks at you. "What I need from you is honesty about whether you want me here for my benefit or yours."`,
    effectsOnEnter: { setFlags: ['mira_wavering_ch10'] },
    choices: [
      {
        id: 'c10_mira_waver_honest',
        text: '"Both. I need you, and I want you to survive. I believe those are compatible."',
        nextNode: 'c10_alley_resolution',
        effects: { miraTrust: 3 },
      },
      {
        id: 'c10_mira_waver_selfless',
        text: '"If the research wing is genuinely safer for you, I will not stop you going."',
        nextNode: 'c10_alley_resolution',
        effects: { miraTrust: 4, setFlags: ['mira_offered_freedom'] },
      },
      {
        id: 'c10_mira_waver_selfish',
        text: '"I need you to stay. We are not finished."',
        nextNode: 'c10_alley_resolution',
        effects: { miraTrust: -2 },
      },
    ],
  },

  {
    id: 'c10_cain_wavering',
    chapter: 'Chapter 10',
    title: 'Cain at the Edge',
    location: 'The Betrayal Alley',
    imageKey: 'betrayal_alley',
    speaker: 'Cain',
    text: `"The immunity arrangement includes a formal review of the Level 3 South case. Juno's file would go to Iron Saints internal — not dismissed, reviewed." He is at the Alley's end, where the Saints corridor access runs. Not approaching the corridor — positioned near it. "I have not decided. I want to be clear about that. But the offer means the seventeen people get a documented review rather than a file Juno is holding in the hope that a jurisdiction materialises." He looks at you. "I stayed for ten chapters because you needed someone who understood the tactical situation and had no stake in using the mark for power. I still think that. I am asking whether the offer changes what I can do from inside versus outside."`,
    effectsOnEnter: { setFlags: ['cain_wavering_ch10'] },
    choices: [
      {
        id: 'c10_cain_waver_tactical',
        text: '"Inside is better. The tactical value of having you present outweighs the review timeline."',
        nextNode: 'c10_alley_resolution',
        effects: { cainTrust: 2 },
      },
      {
        id: 'c10_cain_waver_personal',
        text: '"Stay because you want to. Not because I need you to."',
        nextNode: 'c10_alley_resolution',
        effects: { cainTrust: 4 },
      },
      {
        id: 'c10_cain_waver_release',
        text: '"If the review matters to you more, the review takes priority."',
        nextNode: 'c10_alley_resolution',
        effects: { cainTrust: 3, setFlags: ['cain_offered_freedom'] },
      },
    ],
  },

  {
    id: 'c10_alley_resolution',
    chapter: 'Chapter 10',
    title: 'After the Alley',
    location: 'The Betrayal Alley',
    imageKey: 'betrayal_alley',
    text: `The alley is behind you. The Heir's offers have been processed — accepted, refused, or navigated — and the companion situations have been either stabilised or clarified. The specific choices made here will echo in the Memory Shelter and the Crossroads. The chapter is approaching its emotional centre: the places the companions chose for specific reasons.`,
    effectsOnEnter: { setFlags: ['betrayal_alley_complete'] },
    choices: [
      {
        id: 'c10_alley_to_shelter',
        text: 'Go to the Memory Shelter.',
        nextNode: 'c10_memory_shelter_arrive',
      },
      {
        id: 'c10_alley_to_grave',
        text: 'Go to the Soldier\'s Grave. Cain\'s full confession first.',
        nextNode: 'c10_soldiers_grave_arrive',
      },
    ],
  },

  // ── THE MEMORY SHELTER ────────────────────────────────────────────────────

  {
    id: 'c10_memory_shelter_arrive',
    chapter: 'Chapter 10',
    title: 'The Memory Shelter',
    location: 'The Memory Shelter',
    imageKey: 'memory_shelter',
    text: `The Memory Shelter is what the tunnel network's early survivors called the archive room attached to the Level 4 transit junction — a climate-controlled storage space that predates the blackout, filled with pre-collapse personal effects: photographs, written documents, items that survived because they were already underground. The camp uses it as a community space for grief work. Today it is empty except for your companions, if they are present. This is the place both of them chose for the conversations that matter. The mark is quiet here — the resonance that has been active since Chapter 9 registers the shelter as emotionally dense, not structurally significant.`,
    effectsOnEnter: { setFlags: ['memory_shelter_arrived'] },
    choices: [
      {
        id: 'c10_shelter_mira_first',
        text: 'Sit with Mira first.',
        nextNode: 'c10_shelter_mira_memory',
        requirements: { flags: ['mira_stays_ch10'] },
      },
      {
        id: 'c10_shelter_cain_first',
        text: 'Sit with Cain first.',
        nextNode: 'c10_shelter_cain_memory',
        requirements: { flags: ['cain_stays_ch10'] },
      },
      {
        id: 'c10_shelter_corruption_check',
        text: 'The mark is reacting to something in the shelter. Assess it first.',
        nextNode: 'c10_shelter_corruption_disrupt',
        requirements: { corruption: 40 },
      },
    ],
  },

  {
    id: 'c10_shelter_mira_memory',
    chapter: 'Chapter 10',
    title: "Mira's Before",
    location: 'The Memory Shelter',
    imageKey: 'memory_shelter',
    speaker: 'Mira',
    text: `She has a small book — not a log, a personal journal, pre-blackout. The handwriting inside is the same Archive-standard script she used in the clinic labels, but the content is not institutional. "I kept this from the beginning," she says. "From before I knew what the assignment meant. When I was nineteen and the Archive told me I had been selected for a research program and I thought that was something to be proud of." She opens it to a page near the beginning. "I wrote about what I hoped the program would produce. I thought it was going to be a discovery about how marks work." She turns to the end. "The last entry is from last week. The program produced you surviving Chapter 9. That is what it produced. I did not write it with any irony."`,
    effectsOnEnter: { setFlags: ['mira_memory_shared'], miraTrust: 2 },
    choices: [
      {
        id: 'c10_mira_memory_devotion',
        text: '"You have been writing about this for the entire time."',
        nextNode: 'c10_shelter_mira_devotion_deep',
        requirements: { miraTrust: 8 },
        effects: { miraTrust: 2 },
      },
      {
        id: 'c10_mira_memory_receive',
        text: '"Thank you for showing me this."',
        nextNode: 'c10_shelter_cain_memory',
        effects: { miraTrust: 2 },
      },
      {
        id: 'c10_mira_memory_courier',
        text: 'You have carried things that were not yours to keep. You understand why she kept this.',
        nextNode: 'c10_shelter_cain_memory',
        requirements: { backgrounds: ['black_market_courier'] },
        effects: { miraTrust: 3, setFlags: ['courier_mira_bond'] },
      },
    ],
  },

  {
    id: 'c10_shelter_mira_devotion_deep',
    chapter: 'Chapter 10',
    title: 'Everything She Kept',
    location: 'The Memory Shelter',
    imageKey: 'memory_shelter',
    speaker: 'Mira',
    text: `"The last nineteen entries are all about you surviving the next thing." She says it clinically, but the clinical framing is doing more work than usual. "I have a documented prediction accuracy of eighty-seven percent on mark-bearer corruption risk assessments. My personal prediction on whether you were going to make it through Chapter 9 was significantly more pessimistic than the medical assessment warranted." She is quiet for a moment. "The personal log and the medical log diverge at exactly the point the Archive would call 'over-investment.' I have been over-invested since Chapter 3. I am aware of this. It has not changed my assessment capacity." She finally looks at you directly. "It has changed everything else."`,
    effectsOnEnter: { setFlags: ['mira_devotion_deep_scene', 'mira_devotion_route_unlocked'], miraTrust: 3 },
    choices: [
      {
        id: 'c10_devotion_deep_respond',
        text: '"I know. I have known for a while. I am glad you are here."',
        nextNode: 'c10_shelter_cain_memory',
        effects: { miraTrust: 2, morale: 5, setFlags: ['mira_devotion_acknowledged'] },
      },
    ],
  },

  {
    id: 'c10_shelter_cain_memory',
    chapter: 'Chapter 10',
    title: "Cain's List",
    location: 'The Memory Shelter',
    imageKey: 'memory_shelter',
    speaker: 'Cain',
    text: `He has a piece of paper — not salvaged, specifically sourced, the kind of paper that requires effort to find underground. Seventeen names, written carefully. "I add the date each year," he says. "It is not a memorial practice. It is a record-keeping practice. The distinction matters to me." He folds it precisely. "I came to this shelter because the survivors from the Hunger War have been using it for their own record-keeping. Twelve names from the Hunger War period. They have been adding dates." He looks at the wall of personal effects. "I wanted to see if this was a place that understood the difference between a memorial and a record." He seems satisfied that it is. "I am going to add the Juno case file date when it resolves. One way or another."`,
    effectsOnEnter: { setFlags: ['cain_memory_shared'], cainTrust: 2 },
    choices: [
      {
        id: 'c10_cain_memory_last_stand',
        text: '"You have been carrying this for a very long time. You are not going to have to alone."',
        nextNode: 'c10_shelter_cain_last_stand_deep',
        requirements: { cainTrust: 8 },
        effects: { cainTrust: 2 },
      },
      {
        id: 'c10_cain_memory_receive',
        text: '"I am glad you brought me here."',
        nextNode: 'c10_shelter_forgiveness_choice',
        effects: { cainTrust: 2 },
      },
    ],
  },

  {
    id: 'c10_shelter_cain_last_stand_deep',
    chapter: 'Chapter 10',
    title: 'The Commitment',
    location: 'The Memory Shelter',
    imageKey: 'memory_shelter',
    speaker: 'Cain',
    text: `"The Iron Saints taught me that loyalty was a tactical function. You stay with your unit because it is strategically correct to stay with your unit." He is quiet for a moment. "I have been trying to figure out, for ten chapters, what I am doing here. The tactical case stopped being the full answer around Chapter 5." He folds the paper one more time and puts it in his pocket. "If Chapter 11 produces a situation where a choice has to be made between your survival and something else — I want you to know my position before we are in it. Not as a transaction. As a stated position." He looks at you directly. "You are not going to die in front of me if I can prevent it."`,
    effectsOnEnter: { setFlags: ['cain_last_stand_route_unlocked', 'cain_last_stand_willing'], cainTrust: 3 },
    choices: [
      {
        id: 'c10_last_stand_deep_respond',
        text: '"I hear you. That is not a weight I am asking you to carry alone."',
        nextNode: 'c10_shelter_forgiveness_choice',
        effects: { cainTrust: 2, morale: 5, setFlags: ['cain_last_stand_acknowledged'] },
      },
    ],
  },

  {
    id: 'c10_shelter_corruption_disrupt',
    chapter: 'Chapter 10',
    title: 'The Mark in the Shelter',
    location: 'The Memory Shelter',
    imageKey: 'memory_shelter',
    text: `The corruption gradient above 40 creates a specific resonance problem in the Memory Shelter — the personal effects stored here have relic-adjacent trace signatures from extended human emotional contact, and the mark reads them as interference. The companion conversations that should happen here are affected: the emotional register that makes these conversations legible is partially obscured by the mark's corruption reading. High corruption does not prevent the conversations from occurring. It makes them harder to hear, and harder to be heard in.`,
    effectsOnEnter: { setFlags: ['corruption_shelter_disruption'] },
    choices: [
      {
        id: 'c10_corruption_esper_manage',
        text: 'Use your esper sensitivity to filter the mark\'s interference.',
        nextNode: 'c10_shelter_mira_memory',
        requirements: { classes: ['esper'] },
        effects: { corruption: -3, setFlags: ['esper_shelter_filter'] },
      },
      {
        id: 'c10_corruption_proceed_anyway',
        text: 'Proceed despite the interference.',
        nextNode: 'c10_shelter_mira_memory',
        effects: { miraTrust: -1, cainTrust: -1 },
      },
      {
        id: 'c10_corruption_break_all',
        text: 'The corruption is too high. The conversations cannot happen here.',
        nextNode: 'c10_corruption_breaks_end',
        requirements: { corruption: 55 },
      },
    ],
  },

  {
    id: 'c10_shelter_forgiveness_choice',
    chapter: 'Chapter 10',
    title: 'What Can Be Forgiven',
    location: 'The Memory Shelter',
    imageKey: 'memory_shelter',
    text: `The Memory Shelter holds two accounts: Mira's Archive assignment and Cain's evacuation orders. Both have been heard. Both have been given the context they needed. The mark registers the emotional weight of the shelter the same way it registered the archive overflow in Chapter 9 — as structural data with consequences. The chapter's forgiveness question is not binary. It is: what specific things can be forgiven, and what specific things need to be carried differently.`,
    effectsOnEnter: {},
    choices: [
      {
        id: 'c10_forgive_both',
        text: 'Forgive both. Not the institutions — the people.',
        nextNode: 'c10_shelter_both_forgiven',
        effects: { miraTrust: 3, cainTrust: 3, morale: 8, setFlags: ['both_companions_forgiven'] },
      },
      {
        id: 'c10_forgive_mira_only',
        text: 'Forgive Mira. Cain\'s account needs more time.',
        nextNode: 'c10_shelter_forward',
        effects: { miraTrust: 3, setFlags: ['mira_forgiven_shelter'] },
      },
      {
        id: 'c10_forgive_cain_only',
        text: 'Forgive Cain. Mira\'s account needs more time.',
        nextNode: 'c10_shelter_forward',
        effects: { cainTrust: 3, setFlags: ['cain_forgiven_shelter'] },
      },
      {
        id: 'c10_forgive_neither',
        text: 'Neither. Process without forgiving.',
        nextNode: 'c10_shelter_forward',
        effects: { miraTrust: -1, cainTrust: -1 },
      },
    ],
  },

  {
    id: 'c10_shelter_both_forgiven',
    chapter: 'Chapter 10',
    title: 'Both Given',
    location: 'The Memory Shelter',
    imageKey: 'memory_shelter',
    text: `The shelter receives this with the particular quietness of a place that has been used for this kind of weight before. Mira's expression is the one she reserves for outcomes she did not expect and cannot immediately process. Cain's is the soldier's version of the same thing — something that is not quite relief, which would be too simple, but is structurally related to it. The mark's corruption gradient registers the emotional state as a measurable reduction in the interference pattern that has been building since Chapter 7. The bond route activates if both are at sufficient trust. The chapter continues toward its resolution.`,
    effectsOnEnter: { corruption: -5, setFlags: ['shelter_forgiveness_complete'] },
    choices: [
      {
        id: 'c10_both_forgiven_bond',
        text: 'The bond that has been building through ten chapters has a name now.',
        nextNode: 'c10_shelter_bond_scene',
        requirements: { miraTrust: 8, cainTrust: 8 },
      },
      {
        id: 'c10_both_forgiven_forward',
        text: 'Move forward. The chapter is not finished.',
        nextNode: 'c10_shelter_forward',
      },
    ],
  },

  {
    id: 'c10_shelter_bond_scene',
    chapter: 'Chapter 10',
    title: 'The Bond',
    location: 'The Memory Shelter',
    imageKey: 'memory_shelter',
    text: `This is not a romantic scene, exactly — the tunnel network is not the setting for the kind of love that requires privacy and peace. It is a structural acknowledgment: three people in a climate-controlled archive room, all carrying things they built together over ten chapters, all choosing to continue carrying them in proximity rather than apart. The mark registers the combined emotional architecture of Mira's modified neurological resonance and Cain's twelve-year soldier pattern as a specific interference-cancellation: two modified humans on either side of the mark-bearer, both calibrated to survival, both choosing to remain. The entity below the city notes this configuration as the first time a bearer has approached the Last Gate with intact companion architecture at this trust level. The Heir's log entry: "The separation attempt failed. The bearer chose correctly."`,
    effectsOnEnter: { setFlags: ['secret_bond_achieved', 'secret_bond_route_active'], miraTrust: 3, cainTrust: 3, corruption: -8, morale: 15 },
    choices: [
      {
        id: 'c10_bond_scene_forward',
        text: 'Carry this forward. The chapter continues.',
        nextNode: 'c10_shelter_forward',
      },
    ],
  },

  {
    id: 'c10_shelter_forward',
    chapter: 'Chapter 10',
    title: 'After the Shelter',
    location: 'The Memory Shelter',
    imageKey: 'memory_shelter',
    text: `The Memory Shelter has done what it does: held the weight long enough for it to be processed. The companion architecture of the chapter has been determined by what was said here. The remaining locations — the Companion Crossroads, the Last Medicine Room, the Soldier's Grave, the Place We Promised, the Empty Chair — each have their specific function in the chapter's resolution. The mark is settled. The chapter moves into its final phase.`,
    effectsOnEnter: { setFlags: ['memory_shelter_complete'] },
    choices: [
      {
        id: 'c10_shelter_to_crossroads',
        text: 'Go to the Companion Crossroads.',
        nextNode: 'c10_companion_crossroads_arrive',
      },
      {
        id: 'c10_shelter_to_grave',
        text: 'Go to the Soldier\'s Grave. Cain\'s full account needs the right place.',
        nextNode: 'c10_soldiers_grave_arrive',
      },
    ],
  },

  // ── THE COMPANION CROSSROADS ──────────────────────────────────────────────

  {
    id: 'c10_companion_crossroads_arrive',
    chapter: 'Chapter 10',
    title: 'The Crossroads',
    location: 'The Companion Crossroads',
    imageKey: 'companion_crossroads',
    text: `The Companion Crossroads is a four-way junction in the Level 3-4 transition zone where the maintenance tunnels feed into the Archive's lower access grid. It has been a decision point for the tunnel network's internal migration routes for three years — the specific kind of place where people choose which section of the network to commit to. Today it is the chapter's central choice architecture: who stays, who goes, and whether what remains is enough to carry into Chapter 11.`,
    effectsOnEnter: { setFlags: ['companion_crossroads_arrived'] },
    choices: [
      {
        id: 'c10_crossroads_assess',
        text: 'Assess the current companion situation clearly.',
        nextNode: 'c10_crossroads_status',
      },
    ],
  },

  {
    id: 'c10_crossroads_status',
    chapter: 'Chapter 10',
    title: 'The Current State',
    location: 'The Companion Crossroads',
    imageKey: 'companion_crossroads',
    text: `The crossroads holds the accumulated state of the chapter. Mira: the Archive recall order, the research wing offer, the Phase One modification, and the personal log that ends last week. Present or absent, loyal or leaving, depending on the trust that has been built and the choices made in the clinic and the shelter. Cain: the Level 3 South orders, the immunity arrangement, the Iron Saints folder he kept himself, and the list of seventeen names. Present or absent, loyal or rival, depending on the war room and the shelter. The mark reads both positions simultaneously. The chapter's remaining locations respond to this state.`,
    effectsOnEnter: {},
    choices: [
      {
        id: 'c10_status_mira_final',
        text: 'Confirm Mira\'s position.',
        nextNode: 'c10_crossroads_mira_final',
        requirements: { flags: ['mira_stays_ch10'] },
      },
      {
        id: 'c10_status_cain_final',
        text: 'Confirm Cain\'s position.',
        nextNode: 'c10_crossroads_cain_final',
        requirements: { flags: ['cain_stays_ch10'] },
      },
      {
        id: 'c10_status_both_gone',
        text: 'Both companions have left.',
        nextNode: 'c10_empty_chair_arrive',
        requirements: { flags: ['mira_leaving_process', 'cain_rival_path_set'] },
      },
      {
        id: 'c10_status_bond_route',
        text: 'The bond achieved in the shelter carries through this crossroads.',
        nextNode: 'c10_secret_bond_path',
        requirements: { flags: ['secret_bond_route_active'] },
      },
      {
        id: 'c10_status_forward',
        text: 'Move forward. The crossroads has been navigated.',
        nextNode: 'c10_crossroads_resolution',
      },
    ],
  },

  {
    id: 'c10_crossroads_mira_final',
    chapter: 'Chapter 10',
    title: "Mira's Decision",
    location: 'The Companion Crossroads',
    imageKey: 'companion_crossroads',
    speaker: 'Mira',
    text: `"The Archive recall order is still active. The research wing offer is still available." She says this as context, not as reconsideration. "I am not going to the research wing. Not because the offer is not legitimate — it is — but because the phase one documentation will still be there after Chapter 11, and you will not be in Chapter 11 if something goes wrong with the Last Gate approach, and I am the person best positioned to manage the corruption gradient under final-approach pressure." She picks up her kit. "That is the medical assessment. The personal assessment is that I am not going to leave you in the most dangerous chapter because a research opportunity opened up. Both assessments reach the same conclusion."`,
    effectsOnEnter: { setFlags: ['mira_final_commitment'], miraTrust: 2 },
    choices: [
      {
        id: 'c10_mira_final_accept',
        text: '"I am glad you are here."',
        nextNode: 'c10_crossroads_cain_final',
        effects: { miraTrust: 2 },
      },
    ],
  },

  {
    id: 'c10_crossroads_cain_final',
    chapter: 'Chapter 10',
    title: "Cain's Decision",
    location: 'The Companion Crossroads',
    imageKey: 'companion_crossroads',
    speaker: 'Cain',
    text: `"The immunity arrangement is still on the table." He says this the same way he says everything — directly, without emotional framing. "I am not taking it. The seventeen names are in my pocket and the case review can happen with me here as well as with me in the Saints compound. The tactical situation at the Last Gate approach requires someone who has no stake in using the mark for institutional power." He looks at the junction. "I have been that person for ten chapters. I will be that person for Chapter 11." A pause. "For what it is worth: I would stay regardless of the tactical argument. I am aware that is a change in my stated position from Chapter 1."`,
    effectsOnEnter: { setFlags: ['cain_final_commitment'], cainTrust: 2 },
    choices: [
      {
        id: 'c10_cain_final_accept',
        text: '"Noted. I am glad you are here."',
        nextNode: 'c10_crossroads_luck_dice',
        effects: { cainTrust: 2 },
      },
    ],
  },

  {
    id: 'c10_crossroads_luck_dice',
    chapter: 'Chapter 10',
    title: 'The Last Chance',
    location: 'The Companion Crossroads',
    imageKey: 'companion_crossroads',
    text: `If one companion is still undecided — still at the edge of the choice that sends them forward with you or away — the crossroads produces a specific pressure moment. A Glass Court advance scout appears at the northern junction. A piece of information that could change the undecided companion's calculus arrives at exactly the wrong moment. Whether the moment resolves toward them staying or going depends partly on fortune — the specific variable that is not about trust levels or corruption gradients but about the irreducible element of luck in human decisions.`,
    effectsOnEnter: {},
    choices: [
      {
        id: 'c10_luck_dice_roll',
        text: '[Roll dice — Luck] Let the moment resolve as it resolves.',
        nextNode: 'c10_crossroads_luck_dice',
        diceCheck: {
          stat: 'luck',
          difficulty: 11,
          diceType: 'd20',
          successNode: 'c10_crossroads_resolution',
          failureNode: 'c10_crossroads_sacrifice_choice',
        },
      },
    ],
  },

  {
    id: 'c10_crossroads_sacrifice_choice',
    chapter: 'Chapter 10',
    title: 'The Cost of Keeping Them',
    location: 'The Companion Crossroads',
    imageKey: 'companion_crossroads',
    text: `The luck did not fall the way it needed to. The Glass Court scout's information — or Veyra's counter-offer, or the Archive's recall enforcement — has pushed the undecided companion to the moment of actual departure. The only remaining option is personal cost: give up something that matters to hold the companion in place. Not manipulation. Not tactical argument. The specific thing that says: you matter enough to me that this is what I will spend.`,
    effectsOnEnter: {},
    choices: [
      {
        id: 'c10_sacrifice_health',
        text: 'Give the last medicine in the kit. Your health for their staying.',
        nextNode: 'c10_crossroads_resolution',
        effects: { health: -15, miraTrust: 4, cainTrust: 4, setFlags: ['sacrifice_health_for_companion'] },
      },
      {
        id: 'c10_sacrifice_corruption',
        text: 'Use the mark deliberately. Accept the corruption cost.',
        nextNode: 'c10_crossroads_resolution',
        effects: { corruption: 10, miraTrust: 3, cainTrust: 3 },
      },
      {
        id: 'c10_sacrifice_release',
        text: 'Do not spend anything. Let them make the choice freely.',
        nextNode: 'c10_crossroads_corruption_forces',
      },
    ],
  },

  {
    id: 'c10_crossroads_corruption_forces',
    chapter: 'Chapter 10',
    title: 'The Mark Decides',
    location: 'The Companion Crossroads',
    imageKey: 'companion_crossroads',
    text: `At high corruption, the mark's interference with the companion relationship is not metaphorical — it is measurable. Both Mira's modified neurological architecture and Cain's proximity to the mark read the corruption gradient as a structural threat to their continued cooperation. The crossroads produces a binary: companions who chose to stay did so at a lower corruption level. At the current level, the choice is not theirs alone. The mark has opinions about who it will tolerate nearby at this stage of the awakening.`,
    effectsOnEnter: { setFlags: ['corruption_crossroads_active'] },
    choices: [
      {
        id: 'c10_corruption_reduce',
        text: 'Actively suppress the corruption gradient. It costs effort.',
        nextNode: 'c10_crossroads_resolution',
        effects: { corruption: -8, health: -10 },
      },
      {
        id: 'c10_corruption_accept_cost',
        text: 'Accept the mark\'s interference. Some companions may not survive it.',
        nextNode: 'c10_empty_chair_arrive',
        effects: { setFlags: ['corruption_drove_companions_away'] },
      },
    ],
  },

  {
    id: 'c10_crossroads_resolution',
    chapter: 'Chapter 10',
    title: 'Who Comes With You',
    location: 'The Companion Crossroads',
    imageKey: 'companion_crossroads',
    text: `The crossroads has been navigated. The companion architecture that exits this junction — both present, one present, neither present — is the architecture that carries into the remaining locations and into Chapter 11. The Last Medicine Room requires attention if Mira is present and her medical situation is critical. The Soldier's Grave requires attention if Cain's account is not yet complete. The Place We Promised requires both companions' presence for its full resolution. The Empty Chair is where the chapter goes if neither remains.`,
    effectsOnEnter: { setFlags: ['crossroads_complete'] },
    choices: [
      {
        id: 'c10_resolution_to_medicine',
        text: 'Go to the Last Medicine Room. Medical situation first.',
        nextNode: 'c10_last_medicine_room_arrive',
        requirements: { flags: ['mira_stays_ch10'] },
      },
      {
        id: 'c10_resolution_to_grave',
        text: 'Go to the Soldier\'s Grave.',
        nextNode: 'c10_soldiers_grave_arrive',
        requirements: { flags: ['cain_stays_ch10'] },
      },
      {
        id: 'c10_resolution_to_promise',
        text: 'Go to the Place We Promised.',
        nextNode: 'c10_place_promised_arrive',
      },
    ],
  },

  {
    id: 'c10_secret_bond_path',
    chapter: 'Chapter 10',
    title: 'The Bond Route',
    location: 'The Companion Crossroads',
    imageKey: 'companion_crossroads',
    text: `The bond achieved in the Memory Shelter carries a specific quality through the crossroads: both companions' decisions at this junction are made from a position that includes the acknowledgment of what was said there. The trust at this level produces a different kind of companion commitment — not tactical, not functional, but the specific type that comes from having been seen completely and choosing to remain. The crossroads, for them, is not a decision point in the same way. The decision was made in the shelter. This is the carrying of it.`,
    effectsOnEnter: { setFlags: ['secret_bond_crossroads_reached'] },
    choices: [
      {
        id: 'c10_bond_path_forward',
        text: 'Continue together.',
        nextNode: 'c10_place_promised_arrive',
      },
    ],
  },

  // ── THE LAST MEDICINE ROOM ─────────────────────────────────────────────────

  {
    id: 'c10_last_medicine_room_arrive',
    chapter: 'Chapter 10',
    title: 'The Medicine Room',
    location: 'The Last Medicine Room',
    imageKey: 'last_medicine_room',
    text: `The Last Medicine Room is the level 3 emergency medical storage — not Mira's clinic but the tunnel network's communal supply, last inventoried in Chapter 7 and running at a level that the Hunger War period depleted significantly. Mira is here because the Chapter 10 pressure — the Archive recall enforcement attempt, the Betrayal Alley confrontation, the Heir's manipulation — has produced a specific physiological consequence. The modification in her neurological architecture has a stress response. Under sustained pressure, it amplifies. At a certain point, the amplification requires intervention.`,
    effectsOnEnter: { setFlags: ['last_medicine_room_arrived'] },
    choices: [
      {
        id: 'c10_medicine_assess',
        text: 'Assess Mira\'s condition.',
        nextNode: 'c10_mira_critical_scene',
      },
    ],
  },

  {
    id: 'c10_mira_critical_scene',
    chapter: 'Chapter 10',
    title: 'The Amplification',
    location: 'The Last Medicine Room',
    imageKey: 'last_medicine_room',
    speaker: 'Mira',
    text: `"I am going to tell you what is happening and I need you to not make it about what I disclosed in Chapter 1." She is at the supply cabinet, already making the assessment herself. "The modification's stress response produces a feedback loop with the mark's proximity when the bearer is in an elevated emotional state. The last four hours have been an elevated emotional state." She is clinically matter-of-fact about this. "The intervention requires a specific stabilisation compound. The supply room has it, or it does not." She looks at you with the one expression she doesn't try to manage. "If it does not, there are complications."`,
    effectsOnEnter: { setFlags: ['mira_critical_state'] },
    choices: [
      {
        id: 'c10_medicine_check_supply',
        text: 'Check the supply cabinet immediately.',
        nextNode: 'c10_medicine_check',
      },
    ],
  },

  {
    id: 'c10_medicine_check',
    chapter: 'Chapter 10',
    title: 'The Supply',
    location: 'The Last Medicine Room',
    imageKey: 'last_medicine_room',
    text: `The cabinet has one unit of the stabilisation compound. One. The Hunger War period depleted the supply at the same rate it depleted everything else. One unit is the margin: sufficient for one administration, with nothing left after. There is also a general-use analgesic complex in a separate compartment — not the specific compound Mira needs, but something that could be used as a partial substitute under careful administration.`,
    effectsOnEnter: {},
    choices: [
      {
        id: 'c10_medicine_use_compound',
        text: 'Administer the compound. This is what it is for.',
        nextNode: 'c10_medicine_agility_dice',
      },
      {
        id: 'c10_medicine_scarce_moment',
        text: 'You have the compound. The question is whether the administration is correct.',
        nextNode: 'c10_medicine_scarce_choice',
      },
    ],
  },

  {
    id: 'c10_medicine_agility_dice',
    chapter: 'Chapter 10',
    title: 'The Administration',
    location: 'The Last Medicine Room',
    imageKey: 'last_medicine_room',
    text: `Administering the stabilisation compound for the specific modification in Mira's neurological architecture is not standard medical procedure — it requires precision timing and correct application sequence. Mira is talking you through it but the feedback loop is affecting her coherence slightly. The administration requires steady hands and accurate timing under the specific pressure of someone telling you how to save them while that process is happening.`,
    effectsOnEnter: {},
    choices: [
      {
        id: 'c10_medicine_dice_roll',
        text: '[Roll dice — Agility] Administer carefully. Follow the sequence exactly.',
        nextNode: 'c10_medicine_agility_dice',
        diceCheck: {
          stat: 'agility',
          difficulty: 13,
          diceType: 'd20',
          successNode: 'c10_medicine_success',
          failureNode: 'c10_medicine_fail',
        },
      },
    ],
  },

  {
    id: 'c10_medicine_success',
    chapter: 'Chapter 10',
    title: 'Stabilised',
    location: 'The Last Medicine Room',
    imageKey: 'last_medicine_room',
    speaker: 'Mira',
    text: `The administration is correct. The feedback loop resolves over ninety seconds — measurable, documented by the mark's proximity readings as a specific reduction in the resonance interference. Mira's clinical expression returns, the managed precision she usually applies to everything. "Correctly administered. The compound supply is at zero." She recaps the empty container. "We have a window. The Archive's enforcement division will attempt a second recall approach before Chapter 11. The stabilisation gives me a functional period to work within." She looks at you. "Thank you." Simply stated, without the clinical framing she usually applies to everything. Not a prognosis. Something more direct.`,
    effectsOnEnter: { setFlags: ['mira_stabilised', 'mira_medicine_administered'], miraTrust: 3, health: 10 },
    choices: [
      {
        id: 'c10_medicine_sacrifice_path',
        text: 'The Archive enforcement arrives while she recovers. She absorbs it.',
        nextNode: 'c10_mira_sacrifice_end',
        requirements: { miraTrust: 8 },
      },
      {
        id: 'c10_medicine_success_forward',
        text: 'Continue. The chapter has remaining locations.',
        nextNode: 'c10_soldiers_grave_arrive',
      },
    ],
  },

  {
    id: 'c10_medicine_fail',
    chapter: 'Chapter 10',
    title: 'Complications',
    location: 'The Last Medicine Room',
    imageKey: 'last_medicine_room',
    speaker: 'Mira',
    text: `The administration timing is off by a second in the third step. The compound partially resolves the feedback loop — not completely. "The partial administration will hold for six to eight hours." She is already recalculating, the clinical mind working the problem even while the problem is her own physiology. "It is not ideal. It is sufficient for the chapter's remaining locations. I will manage the interference." She pauses. "There is a secondary complication: the partial resolution leaves the modification's stress response in a sensitised state. The Memory Shelter's emotional register will have more effect on my coherence than usual." A clinical fact, stated as one. "I will manage."`,
    effectsOnEnter: { setFlags: ['mira_partially_stabilised'], miraTrust: 1 },
    choices: [
      {
        id: 'c10_medicine_fail_forward',
        text: 'Continue carefully. The chapter has remaining locations.',
        nextNode: 'c10_soldiers_grave_arrive',
      },
    ],
  },

  {
    id: 'c10_medicine_scarce_choice',
    chapter: 'Chapter 10',
    title: 'One Compound',
    location: 'The Last Medicine Room',
    imageKey: 'last_medicine_room',
    text: `One unit of stabilisation compound. The chapter still has locations that will produce significant pressure. The compound can be administered now, or saved for a later point in the chapter when the pressure is higher and the need may be more acute. The question is whether the current critical state requires immediate intervention, or whether the partial-substitute analgesic complex can hold Mira through the remaining locations until a worse moment arrives.`,
    effectsOnEnter: {},
    choices: [
      {
        id: 'c10_scarce_now',
        text: 'Administer now. The current state is the crisis.',
        nextNode: 'c10_medicine_agility_dice',
      },
      {
        id: 'c10_scarce_wait',
        text: 'Use the analgesic for now. Save the compound.',
        nextNode: 'c10_medicine_fail',
        effects: { setFlags: ['compound_saved_for_later'] },
      },
    ],
  },

  // ── THE SOLDIER'S GRAVE ───────────────────────────────────────────────────

  {
    id: 'c10_soldiers_grave_arrive',
    chapter: 'Chapter 10',
    title: "The Soldier's Grave",
    location: "The Soldier's Grave",
    imageKey: 'soldiers_grave',
    text: `The Soldier's Grave is not a formal burial site — it is a Level 2 maintenance access wall where the metro's early community began marking deaths. Seventeen markers are in the Level 3 South section, added after the structural failure. Cain's handwriting is on all seventeen. He knows where this is, has been here before, and comes here for the same reason the Memory Shelter exists: not to feel worse, but to maintain the record correctly. He is here now, standing at the last of the seventeen markers.`,
    effectsOnEnter: { setFlags: ['soldiers_grave_arrived'] },
    choices: [
      {
        id: 'c10_grave_approach',
        text: 'Approach. Stand with him at the markers.',
        nextNode: 'c10_grave_cain_names',
      },
      {
        id: 'c10_grave_stand_witness',
        text: 'Acknowledge the record. You understand what this wall is.',
        nextNode: 'c10_grave_forgiveness_choice',
      },
    ],
  },

  {
    id: 'c10_grave_cain_names',
    chapter: 'Chapter 10',
    title: 'Seventeen',
    location: "The Soldier's Grave",
    imageKey: 'soldiers_grave',
    speaker: 'Cain',
    text: `"Kira Marsh. Tomaz Ven. Sera Lin — not the Sera at the bridge camp, a different Sera." He reads the names aloud, not dramatically, but with the care of someone reading a record that requires accuracy. All seventeen. When he finishes, he is quiet for a moment. "I learned them after. Not before. Before, they were a junction to be cleared on a timeline. After, they were people with names that the Iron Saints documentation did not include." He touches the last marker. "I added the names from the post-incident report. Someone had written them. They were just not in the enforcement file."`,
    effectsOnEnter: { setFlags: ['grave_names_read'], cainTrust: 2 },
    choices: [
      {
        id: 'c10_grave_names_full',
        text: '"You learned them after because that was when you could."',
        nextNode: 'c10_grave_cain_confession',
        effects: { cainTrust: 2 },
      },
      {
        id: 'c10_grave_noble_witness',
        text: 'Stand as a witness. You understand the weight of a name on a record.',
        nextNode: 'c10_grave_cain_confession',
        requirements: { backgrounds: ['fallen_noble'] },
        effects: { cainTrust: 3, setFlags: ['noble_grave_witness'] },
      },
    ],
  },

  {
    id: 'c10_grave_cain_confession',
    chapter: 'Chapter 10',
    title: 'The Full Account',
    location: "The Soldier's Grave",
    imageKey: 'soldiers_grave',
    speaker: 'Cain',
    text: `"The full account is this: I received an order I knew was premature. I had a four-minute window where I could have held the clearance. I did not hold it because the Iron Saints framework taught me that holding clearances mid-operation under structural pressure was more dangerous than completing them." He turns from the wall. "The framework was designed by people who had never been in a structural failure situation. They were correct about everything except the specific scenario that produced seventeen deaths." He looks at you directly. "I have known this for three years. I have been carrying it because carrying it correctly — not as guilt, but as a record — is the only thing I know how to do with it. The Juno case file is the institutional version of this wall."`,
    effectsOnEnter: { setFlags: ['cain_full_confession_given'] },
    choices: [
      {
        id: 'c10_confession_forgive',
        text: '"You have carried it correctly. That is not nothing."',
        nextNode: 'c10_grave_cain_forgiven',
        effects: { cainTrust: 4, setFlags: ['cain_forgiven_grave'] },
      },
      {
        id: 'c10_confession_process',
        text: '"I hear you. I am still processing what it means."',
        nextNode: 'c10_grave_veyra_ambush',
        effects: { cainTrust: 1 },
      },
    ],
  },

  {
    id: 'c10_grave_cain_forgiven',
    chapter: 'Chapter 10',
    title: 'Set Down',
    location: "The Soldier's Grave",
    imageKey: 'soldiers_grave',
    speaker: 'Cain',
    text: `He does not respond immediately. Something in the posture changes — not relaxation, because Cain does not relax, but a specific reduction in the readiness state he maintains even in neutral situations. "I am going to add today's date to the margin of the list," he says. Not as sentimentality. As record-keeping. He produces the piece of paper. He adds the date beside the last entry. He folds it carefully. "The record is complete to today. Whatever comes next in Chapter 11, the record is complete to today." He puts it away. "I am ready."`,
    effectsOnEnter: { setFlags: ['cain_forgiven_complete'], cainTrust: 3, morale: 5 },
    choices: [
      {
        id: 'c10_forgiven_veyra_check',
        text: 'Saint Veyra may appear. Stay alert.',
        nextNode: 'c10_grave_veyra_ambush',
      },
      {
        id: 'c10_forgiven_promise',
        text: 'Go to the Place We Promised.',
        nextNode: 'c10_place_promised_arrive',
      },
    ],
  },

  {
    id: 'c10_grave_forgiveness_choice',
    chapter: 'Chapter 10',
    title: 'At the Wall',
    location: "The Soldier's Grave",
    imageKey: 'soldiers_grave',
    text: `The seventeen markers are specific, named, carefully added. The choice at the Soldier's Grave is not whether to feel what the grave contains — it is what to do with that weight in relation to the person standing next to it. Cain did not ask for forgiveness here. He came to maintain the record. The response to that is not primarily about forgiveness — it is about whether the record is seen correctly.`,
    effectsOnEnter: {},
    choices: [
      {
        id: 'c10_grave_choice_see',
        text: '"The record is real and you have been keeping it correctly."',
        nextNode: 'c10_grave_cain_forgiven',
        effects: { cainTrust: 3 },
      },
      {
        id: 'c10_grave_choice_process',
        text: '"I need more time with this."',
        nextNode: 'c10_grave_veyra_ambush',
      },
    ],
  },

  {
    id: 'c10_grave_veyra_ambush',
    chapter: 'Chapter 10',
    title: 'Veyra at the Grave',
    location: "The Soldier's Grave",
    imageKey: 'soldiers_grave',
    speaker: 'Saint Veyra',
    text: `She arrives from the Level 2 access. "I knew you would come here eventually." She is addressing Cain, but her assessment of the situation includes you. "The offer has been restated three times. The answer has not been given three times. In the Saints' operational framework, an unanswered offer is an acceptance in progress." She looks at the seventeen markers. "I know what this wall is. I know you have been coming here since the structural failure." A pause that is not quite softness. "The review process can include a formal memorial. The Saints have been trying to reach Commander Vor for the institutional account. The exoneration includes an institutional acknowledgment of the seventeen."`,
    effectsOnEnter: { setFlags: ['veyra_grave_ambush'] },
    choices: [
      {
        id: 'c10_grave_fight_veyra',
        text: 'Stand between Veyra and Cain. This is not her decision to make.',
        nextNode: 'c10_grave_strength_dice',
        effects: { setFlags: ['player_protects_cain_veyra'] },
      },
      {
        id: 'c10_grave_let_cain_speak',
        text: 'Let Cain answer for himself.',
        nextNode: 'c10_grave_cain_chooses_player',
        requirements: { cainTrust: 6 },
      },
    ],
  },

  {
    id: 'c10_grave_strength_dice',
    chapter: 'Chapter 10',
    title: 'The Physical Boundary',
    location: "The Soldier's Grave",
    imageKey: 'soldiers_grave',
    text: `The Saints operatives Veyra brought — three, at the junction access points — are not aggressive yet, but they are present. The physical boundary between Veyra's authority over Cain and the fact that Cain is standing next to a mark-bearer in an active chapter requires a clear statement. The mark amplifies the physical presence in a way that the Saints' operatives will register. The strength to hold the boundary is not only physical — it is the kind of presence that says the cost of pressing past it is higher than the benefit.`,
    effectsOnEnter: {},
    choices: [
      {
        id: 'c10_grave_strength_roll',
        text: '[Roll dice — Strength] Hold the boundary.',
        nextNode: 'c10_grave_strength_dice',
        diceCheck: {
          stat: 'strength',
          difficulty: 14,
          diceType: 'd20',
          successNode: 'c10_grave_veyra_success',
          failureNode: 'c10_grave_cain_chooses_player',
        },
      },
    ],
  },

  {
    id: 'c10_grave_veyra_success',
    chapter: 'Chapter 10',
    title: 'Veyra Withdraws',
    location: "The Soldier's Grave",
    imageKey: 'soldiers_grave',
    speaker: 'Saint Veyra',
    text: `The Saints operatives look to her. She calculates for three seconds — a long calculation, for Veyra — and makes a small gesture. The operatives withdraw to the junction access. "The offer remains open," she says. Not defeat. Tactical reassessment. She leaves without further engagement. Cain watches her go. "The formal review can still happen," he says. "She will not block it. She only blocks it if I return to the Saints." He turns from the wall. "I am not returning to the Saints."`,
    effectsOnEnter: { setFlags: ['veyra_grave_turned_away', 'cain_chose_player_grave'], cainTrust: 3 },
    choices: [
      {
        id: 'c10_grave_success_promise',
        text: 'Go to the Place We Promised.',
        nextNode: 'c10_place_promised_arrive',
      },
    ],
  },

  {
    id: 'c10_grave_cain_chooses_player',
    chapter: 'Chapter 10',
    title: "Cain's Choice",
    location: "The Soldier's Grave",
    imageKey: 'soldiers_grave',
    speaker: 'Cain',
    text: `He answers Veyra himself. The three seconds of silence before he speaks contain something that is recognisably a decision being made in real time — not rehearsed, not the result of a prior commitment, but the specific moment where a person who has been weighing two things settles the weight. "No." He says it the same way he says most things: cleanly, without inflection. "The review can be filed through Juno's case channel. The Saints do not need me to be inside the compound for the institutional acknowledgment to proceed." He looks at Veyra. "I know what I am choosing. I am choosing it." He does not look at you until Veyra has left. Then he does.`,
    effectsOnEnter: { setFlags: ['cain_final_choose_player'], cainTrust: 4 },
    choices: [
      {
        id: 'c10_cain_last_stand_moment',
        text: 'More Saints arrive. He stands his ground completely.',
        nextNode: 'c10_cain_last_stand_end',
        requirements: { cainTrust: 8 },
      },
      {
        id: 'c10_cain_chooses_promise',
        text: 'Go to the Place We Promised.',
        nextNode: 'c10_place_promised_arrive',
      },
    ],
  },

  // ── THE PLACE WE PROMISED ─────────────────────────────────────────────────

  {
    id: 'c10_place_promised_arrive',
    chapter: 'Chapter 10',
    title: 'The Place We Promised',
    location: 'The Place We Promised',
    imageKey: 'place_we_promised',
    text: `The Place We Promised is not a formally named location — it is the platform at the Level 2-3 junction where the transit lines converge, the one where the metro's survivors gathered in the first week after the blackout because it was the highest point in the accessible network and you could see three corridors from it. Someone, in the first month, wrote "we will fix this" on the wall in chalk. The chalk is still there, faded but legible. Both companions know this place. Both have been here before, separately. It is where things promised in crisis get carried.`,
    effectsOnEnter: { setFlags: ['place_promised_arrived'] },
    choices: [
      {
        id: 'c10_promise_mira',
        text: 'Stand with Mira here.',
        nextNode: 'c10_promise_mira_moment',
        requirements: { flags: ['mira_stays_ch10'] },
      },
      {
        id: 'c10_promise_cain',
        text: 'Stand with Cain here.',
        nextNode: 'c10_promise_cain_moment',
        requirements: { flags: ['cain_stays_ch10'] },
      },
      {
        id: 'c10_betrayal_reckoning',
        text: 'The companion here has been working against you. A reckoning.',
        nextNode: 'c10_promise_betrayal_reveal',
      },
      {
        id: 'c10_promise_forward',
        text: 'Move to the chapter\'s last location.',
        nextNode: 'c10_empty_chair_arrive',
      },
    ],
  },

  {
    id: 'c10_promise_mira_moment',
    chapter: 'Chapter 10',
    title: "Mira's Promise",
    location: 'The Place We Promised',
    imageKey: 'place_we_promised',
    speaker: 'Mira',
    text: `"I wrote that," she says, pointing at the chalk. "Week two. The Archive's monitoring assignment was already active. I was writing a report on your progress and I came here to think and I wrote it because I was nineteen and I had just seen what the first week of survival looked like and I needed it to be true." She looks at the wall for a long moment. "I do not know if we are going to fix this. I do not know what Chapter 11 holds, or whether the Last Gate produces an outcome that the tunnel network considers fixed." She looks at you. "I promised anyway. I have been keeping the promise in the only way I know how." She does not say what the promise is. She does not need to.`,
    effectsOnEnter: { setFlags: ['mira_promise_revealed'], miraTrust: 3 },
    choices: [
      {
        id: 'c10_mira_promise_sacrifice',
        text: '"You have been keeping it since before I knew you were keeping it."',
        nextNode: 'c10_promise_sacrifice_setup',
        requirements: { miraTrust: 8 },
        effects: { miraTrust: 2 },
      },
      {
        id: 'c10_mira_promise_receive',
        text: '"I am glad you were here to write it."',
        nextNode: 'c10_promise_cain_moment',
        effects: { miraTrust: 2 },
      },
    ],
  },

  {
    id: 'c10_promise_cain_moment',
    chapter: 'Chapter 10',
    title: "Cain's Promise",
    location: 'The Place We Promised',
    imageKey: 'place_we_promised',
    speaker: 'Cain',
    text: `He looks at the chalk writing without touching it. "The Iron Saints had a version of this. Written in permanent marker on the unit barracks wall. 'We hold what we were given.' It meant the jurisdiction, the assigned district, the operational parameters." He is quiet. "What I hold now is not a jurisdiction. I am aware of the difference." He turns from the wall. "The promise I am carrying is not written anywhere. It is the list in my pocket and the person standing next to me and the specific commitment that whatever I do with the mark-bearer's situation, it will not be the calculation that produced the seventeen." A pause. "That is not a vow. It is a stated operating principle. I find those more reliable than vows."`,
    effectsOnEnter: { setFlags: ['cain_promise_revealed'], cainTrust: 2 },
    choices: [
      {
        id: 'c10_cain_promise_last_stand',
        text: '"I hear the operating principle. I will try to make it unnecessary."',
        nextNode: 'c10_promise_sacrifice_setup',
        requirements: { cainTrust: 8 },
        effects: { cainTrust: 2 },
      },
      {
        id: 'c10_cain_promise_receive',
        text: '"I trust your operating principle."',
        nextNode: 'c10_promise_forward',
        effects: { cainTrust: 2 },
      },
    ],
  },

  {
    id: 'c10_promise_sacrifice_setup',
    chapter: 'Chapter 10',
    title: 'What They Would Give',
    location: 'The Place We Promised',
    imageKey: 'place_we_promised',
    text: `At high trust, the Place We Promised holds something more than the chalk writing. Both companions, in their different registers, have made the same acknowledgment: the cost they are willing to pay is not tactical. It is not the result of the assignment, or the operating principle, or the trust level. It is the specific thing that arrives when a person has been through ten chapters with someone and knows, without analysis, what they would spend to prevent a specific outcome. The mark registers this as a structural configuration: two companions at maximum trust, both aware of the sacrifice routes that open from here. Chapter 11 will test whether the routes are needed.`,
    effectsOnEnter: { setFlags: ['sacrifice_routes_active', 'mira_sacrifice_willing', 'cain_last_stand_willing'] },
    choices: [
      {
        id: 'c10_sacrifice_setup_forward',
        text: 'Continue. The chapter is nearly complete.',
        nextNode: 'c10_promise_forward',
      },
    ],
  },

  {
    id: 'c10_promise_betrayal_reveal',
    chapter: 'Chapter 10',
    title: 'The Betrayal Here',
    location: 'The Place We Promised',
    imageKey: 'place_we_promised',
    text: `The Place We Promised is also the location where betrayals arrive with their full weight — the chalk "we will fix this" is the backdrop against which the specific failure of trust becomes most legible. If a companion has been working against the player — genuinely, structurally, in ways that go beyond the Archive assignment or the evacuation orders — this is where it surfaces. Low trust through the chapter produces a specific outcome: the companion's presence at the Place We Promised is not companionship. It is a final accounting.`,
    effectsOnEnter: { setFlags: ['betrayal_promise_location'] },
    choices: [
      {
        id: 'c10_betrayal_mira',
        text: 'Mira is here. What she did was a betrayal in the full sense.',
        nextNode: 'c10_mira_betrayal_end',
      },
      {
        id: 'c10_betrayal_cain',
        text: 'Cain is here. The Saints bargain was already accepted.',
        nextNode: 'c10_cain_betrayal_end',
      },
    ],
  },

  {
    id: 'c10_promise_forward',
    chapter: 'Chapter 10',
    title: 'Carrying the Promise',
    location: 'The Place We Promised',
    imageKey: 'place_we_promised',
    text: `The chalk writing is still there. The promise — institutional, personal, tactical, or simply human — has been acknowledged in whatever form this chapter produced. The Empty Chair is the last location: the place the chapter arrives at regardless of companion architecture, where the specific cost of the chapter is registered in a single image. What the chair holds depends entirely on who is still present.`,
    effectsOnEnter: { setFlags: ['place_promised_complete'] },
    choices: [
      {
        id: 'c10_promise_to_chair',
        text: 'Go to the Empty Chair.',
        nextNode: 'c10_empty_chair_arrive',
      },
    ],
  },

  // ── THE EMPTY CHAIR ───────────────────────────────────────────────────────

  {
    id: 'c10_empty_chair_arrive',
    chapter: 'Chapter 10',
    title: 'The Empty Chair',
    location: 'The Empty Chair',
    imageKey: 'empty_chair',
    text: `The safehouse table has three chairs. The Empty Chair is the chapter's final image: what is missing from those three chairs at the end of this chapter registers the specific cost of everything that came before it. If both companions are present, the empty chair is the chapter's acknowledgment of the companion who could have been here and is not. If one companion is absent, the empty chair is theirs. If both are absent, the table's three chairs are two too many, and the chapter's final image is the specific kind of alone that knows exactly how it got here.`,
    effectsOnEnter: { setFlags: ['empty_chair_arrived'] },
    choices: [
      {
        id: 'c10_chair_mira_gone_check',
        text: "Mira's chair is empty.",
        nextNode: 'c10_chair_mira_gone_scene',
        requirements: { flags: ['mira_leaving_process'] },
      },
      {
        id: 'c10_chair_cain_gone_check',
        text: "Cain's chair is empty.",
        nextNode: 'c10_chair_cain_gone_scene',
        requirements: { flags: ['cain_rival_path_set'] },
      },
      {
        id: 'c10_chair_both_present',
        text: 'Both companions are here.',
        nextNode: 'c10_chair_both_survived_scene',
        requirements: { flags: ['mira_stays_ch10', 'cain_stays_ch10'] },
      },
      {
        id: 'c10_chair_everyone_gone',
        text: 'The table has two empty chairs.',
        nextNode: 'c10_chair_both_gone_scene',
      },
    ],
  },

  {
    id: 'c10_chair_mira_gone_scene',
    chapter: 'Chapter 10',
    title: "Mira's Chair",
    location: 'The Empty Chair',
    imageKey: 'empty_chair',
    text: `The east side of the table. She reorganised the vials before she left — the specific habit that persists even in departure. The bench is clean. The Archive brief is missing: she took her own documentation. The personal file is still there, if she left it, on the bench beside the cot. The empty chair does not have her in it and the absence has weight. The mark reads the modification that was present in the room as a residual signature — she was here, the modified neurological architecture left a detectable trace, and the trace is already fading.`,
    effectsOnEnter: { setFlags: ['mira_chair_empty'] },
    choices: [
      {
        id: 'c10_mira_gone_cain_present',
        text: 'Find Cain. One chair is still occupied.',
        nextNode: 'c10_chair_single_survivor',
        requirements: { flags: ['cain_stays_ch10'] },
      },
      {
        id: 'c10_mira_gone_both_gone',
        text: "Cain's chair is also empty.",
        nextNode: 'c10_chair_both_gone_scene',
      },
    ],
  },

  {
    id: 'c10_chair_cain_gone_scene',
    chapter: 'Chapter 10',
    title: "Cain's Chair",
    location: 'The Empty Chair',
    imageKey: 'empty_chair',
    text: `The west side of the table, near the entrance. The Iron Saints jacket hook still has the outline where the insignia was removed. The wall map is still up: his tactical work, his district assessment, his security architecture. He left the work. He took the jacket, the list of seventeen names, and nothing that was functionally his. The empty chair is the specific product of ten chapters of a person who decided, at the moment of decision, that the calculation ran differently than it had been running. The work on the wall is still useful. The person who did it has gone somewhere the work cannot follow.`,
    effectsOnEnter: { setFlags: ['cain_chair_empty'] },
    choices: [
      {
        id: 'c10_cain_gone_mira_present',
        text: 'Find Mira. One chair is still occupied.',
        nextNode: 'c10_chair_single_survivor',
        requirements: { flags: ['mira_stays_ch10'] },
      },
      {
        id: 'c10_cain_gone_both_gone',
        text: "Mira's chair is also empty.",
        nextNode: 'c10_chair_both_gone_scene',
      },
    ],
  },

  {
    id: 'c10_chair_both_gone_scene',
    chapter: 'Chapter 10',
    title: 'Two Empty Chairs',
    location: 'The Empty Chair',
    imageKey: 'empty_chair',
    text: `Both chairs. The table for three has no one at it. The specific weight of this is not the same as grief — grief has a direction, toward something that was taken. This is the weight of something that accumulated and resolved and left an absence that has the exact shape of everything that was present before it. The mark reads the room as quiet, which is accurate. The mark is fully awake and functional and has no companions in the room to register the noise of their presence. This is what full awakening in isolation looks like. Chapter 11 will begin from this position. The lone wanderer route is the chapter's hardest path and the one that requires the most of whoever is walking it.`,
    effectsOnEnter: { setFlags: ['both_companions_gone', 'lone_wanderer_active'] },
    choices: [
      {
        id: 'c10_both_gone_wander',
        text: 'Process this. Then prepare for Chapter 11 alone.',
        nextNode: 'c10_lone_wanderer_moment',
      },
    ],
  },

  {
    id: 'c10_chair_single_survivor',
    chapter: 'Chapter 10',
    title: 'One Chair Occupied',
    location: 'The Empty Chair',
    imageKey: 'empty_chair',
    text: `One companion remains. The empty chair is a presence in itself — specific, shaped, weighted with whoever is not in it. The remaining companion has their own relationship with the absence: Mira, if she is here, reads the empty chair with the clinical precision she applies to every loss; Cain, if he is here, looks at it with the same attention he gives the Soldier's Grave. The mark reads the reduced architecture — one present companion instead of two — as a structural change with specific implications for the Last Gate approach. Chapter 11 will calibrate to this state.`,
    effectsOnEnter: { setFlags: ['single_companion_survives'] },
    choices: [
      {
        id: 'c10_single_survivor_resolution',
        text: 'Move to the chapter resolution. Who is here is who is here.',
        nextNode: 'c10_chair_forward',
      },
    ],
  },

  {
    id: 'c10_chair_both_survived_scene',
    chapter: 'Chapter 10',
    title: 'All Three',
    location: 'The Empty Chair',
    imageKey: 'empty_chair',
    text: `Three chairs, three people. The empty chair in the chapter title refers to this: the chapter expected to produce absences and did not, or produced them and recovered them, or produced them and the recovery was more costly than simply having held the relationships through the chapter. Whatever the path — clinic, war room, shelter, crossroads, medicine room, grave, promise — the architecture arrived at the table with all three chairs occupied. The mark reads this as the configuration it was designed to produce: a bearer with intact companion structure approaching the Last Gate's final phase. The Heir's note, written from their own record: "The bearing has been sufficient. The Broken Companions chapter produced intact companions. That is the less likely outcome. I note it."`,
    effectsOnEnter: { setFlags: ['all_companions_survived_ch10'], miraTrust: 2, cainTrust: 2, morale: 10 },
    choices: [
      {
        id: 'c10_both_survived_resolution',
        text: 'Move to the chapter resolution.',
        nextNode: 'c10_chapter_resolution',
      },
    ],
  },

  {
    id: 'c10_lone_wanderer_moment',
    chapter: 'Chapter 10',
    title: 'The Weight of Alone',
    location: 'The Empty Chair',
    imageKey: 'empty_chair',
    text: `The specific weight of the lone wanderer position is this: the mark was designed to be managed by a bearer with companion support. Nineteen previous bearers navigated toward the Last Gate with varying companion configurations. The ones who arrived alone tended to apply the mark's power in ways the Archive's evaluation criteria scored differently — not worse, but differently. More direct. Less filtered by the presence of people who could say "wait." The Archive notes this in the bearer evaluation criteria without comment. The entity below the city notes it with what may be interest. The First Voice notes it as an opportunity. The lone wanderer has the most freedom and the least protection from their own decisions.`,
    effectsOnEnter: { setFlags: ['lone_wanderer_moment'] },
    choices: [
      {
        id: 'c10_lone_wander_continue',
        text: 'Accept the position. Chapter 11 begins alone.',
        nextNode: 'c10_lone_wanderer_choice',
      },
      {
        id: 'c10_both_lost_accept',
        text: 'Register the full cost. Both companions gone.',
        nextNode: 'c10_both_companions_lost_end',
      },
      {
        id: 'c10_empty_chair_contemplate',
        text: 'Sit at the table. Understand what this chapter cost completely.',
        nextNode: 'c10_empty_chair_end',
      },
      {
        id: 'c10_lone_wander_reconsider',
        text: 'Reconsider. Is there anyone who can still be reached?',
        nextNode: 'c10_chapter_resolution',
        effects: { morale: -5 },
      },
    ],
  },

  {
    id: 'c10_lone_wanderer_choice',
    chapter: 'Chapter 10',
    title: 'The Choice Before Chapter 11',
    location: 'The Empty Chair',
    imageKey: 'empty_chair',
    text: `The chapter gives one last decision point: how the lone wanderer approaches Chapter 11. Not with whom — that is settled — but with what stated position. The mark without companions is different from the mark with companions. The difference is not power — the awakening produced the same operational capacity regardless of companion status. The difference is intention: what the mark is used for when there is no one present to witness the using. The chapter ends on this question, which Chapter 11 will answer.`,
    effectsOnEnter: {},
    choices: [
      {
        id: 'c10_lone_truth_seeker',
        text: 'The truth. Alone, but still toward the truth.',
        nextNode: 'c10_chapter_resolution',
        effects: { intelligence: 3, setFlags: ['lone_wanderer_truth_path'] },
      },
      {
        id: 'c10_lone_protector',
        text: 'Protection. Alone, but still for the tunnel network.',
        nextNode: 'c10_chapter_resolution',
        effects: { morale: 5, setFlags: ['lone_wanderer_protector_path'] },
      },
      {
        id: 'c10_lone_power',
        text: 'Power. There is no one left to disagree.',
        nextNode: 'c10_lone_wanderer_end',
        effects: { corruption: 8, setFlags: ['lone_wanderer_power_path'] },
      },
    ],
  },

  {
    id: 'c10_chair_forward',
    chapter: 'Chapter 10',
    title: 'From the Chair',
    location: 'The Empty Chair',
    imageKey: 'empty_chair',
    text: `Whatever the Empty Chair held — both companions, one, or none — the chapter's accounting is now complete. The mark reads the present configuration with the same precision it has applied since Chapter 9. The companion architecture that exits this room is the one that carries into Chapter 11, the Last Gate's final approach, and the decisions the mark will need to make there. The safehouse behind. The city ahead. Whatever is remaining of both.`,
    effectsOnEnter: {},
    choices: [
      {
        id: 'c10_chair_to_resolution',
        text: 'Move to the chapter resolution.',
        nextNode: 'c10_chapter_resolution',
      },
    ],
  },

  // ── CHAPTER RESOLUTION ────────────────────────────────────────────────────

  {
    id: 'c10_chapter_resolution',
    chapter: 'Chapter 10',
    title: 'After Broken Companions',
    location: 'The Companion Crossroads',
    imageKey: 'companion_crossroads',
    text: `The chapter has produced its companion architecture. Mira: present or absent, devoted or departed, carrying the Archive's modification and her own choices with whatever weight the clinic, the shelter, the medicine room, and the chalk writing gave them. Cain: loyal or rival or gone, carrying the seventeen names and the operating principle and whatever the Soldier's Grave and the Place We Promised added to it. The mark reads the configuration and registers its specific implications for the Last Gate. Chapter 11: The City Beneath the City. The things below the Archive that the Archive was built to monitor. The chapter that resolves what the city was built on top of. Begin.`,
    effectsOnEnter: { setFlags: ['chapter10_resolution_reached'] },
    choices: [
      {
        id: 'c10_resolution_both_check',
        text: 'Both companions present. The full configuration.',
        nextNode: 'c10_resolution_both',
        requirements: { flags: ['all_companions_survived_ch10'] },
      },
      {
        id: 'c10_resolution_mira_only',
        text: 'Only Mira.',
        nextNode: 'c10_resolution_mira_only',
        requirements: { flags: ['mira_stays_ch10', 'cain_chair_empty'] },
      },
      {
        id: 'c10_resolution_cain_only',
        text: 'Only Cain.',
        nextNode: 'c10_resolution_cain_only',
        requirements: { flags: ['cain_stays_ch10', 'mira_chair_empty'] },
      },
      {
        id: 'c10_resolution_alone',
        text: 'Alone. The lone wanderer route continues.',
        nextNode: 'c10_resolution_alone',
        requirements: { flags: ['lone_wanderer_active'] },
      },
    ],
  },

  {
    id: 'c10_resolution_both',
    chapter: 'Chapter 10',
    title: 'The Full Configuration',
    location: 'The Companion Crossroads',
    imageKey: 'companion_crossroads',
    text: `Both companions. The Broken Companions chapter produced the outcome that the Archive's evaluation criteria describe as "full companion integrity at chapter close" — which is the clinical version of what it actually is: two people who chose to stay through the hardest chapter, past their own revelations, past the Heir's offers, past Veyra's ambush, past the Empty Chair, and arrived at the resolution with the relationship architecture intact. The mark's corruption gradient is lower in this configuration than in any other. The Last Gate approach with both companions present is the route the Heir's chapter notes describe as "the intended approach." Proceed to Chapter 11.`,
    effectsOnEnter: { setFlags: ['chapter10_complete', 'both_companions_ch11'], corruption: -5, morale: 10 },
    choices: [
      {
        id: 'c10_resolution_both_bond',
        text: 'The bond complete. The best outcome the chapter could produce.',
        nextNode: 'c10_secret_bond_end',
        requirements: { flags: ['secret_bond_achieved'] },
      },
      {
        id: 'c10_resolution_both_broken',
        text: 'Chapter 10 complete. Both here, but marked by what it cost.',
        nextNode: 'c10_broken_companions_end',
        requirements: { blockedFlags: ['secret_bond_achieved'] },
      },
      {
        id: 'c10_resolution_both_end',
        text: 'Chapter 10 complete. Chapter 11 begins.',
        nextNode: 'c10_chapter10_end',
      },
    ],
  },

  {
    id: 'c10_resolution_mira_only',
    chapter: 'Chapter 10',
    title: 'Mira Only',
    location: 'The Companion Crossroads',
    imageKey: 'companion_crossroads',
    text: `Mira stays. Cain is gone by one path or another — rival, departed, recalled by the Saints, or something the chapter built toward a different resolution on. The mark reads the single-companion configuration as stable but asymmetric: Mira's modified neurological architecture provides the corruption-monitoring function, which is significant; the tactical security function Cain provided requires a substitute. The Last Gate approach with Mira only is the route the Archive's evaluation criteria describe as "medically supported but tactically exposed." Mira's note in her log, added this evening: "One. That is the configuration for Chapter 11. I have made worse numbers work."`,
    effectsOnEnter: { setFlags: ['chapter10_complete', 'mira_only_ch11'] },
    choices: [
      {
        id: 'c10_resolution_mira_devoted',
        text: 'Chapter 10 complete. She writes her final entry.',
        nextNode: 'c10_mira_devotion_end',
        requirements: { miraTrust: 8 },
      },
      {
        id: 'c10_resolution_mira_end',
        text: 'Chapter 10 complete. Chapter 11 begins.',
        nextNode: 'c10_chapter10_end',
      },
    ],
  },

  {
    id: 'c10_resolution_cain_only',
    chapter: 'Chapter 10',
    title: 'Cain Only',
    location: 'The Companion Crossroads',
    imageKey: 'companion_crossroads',
    text: `Cain stays. Mira is gone — to the Archive recall, to the research wing, to the leaves route, or to wherever a person goes when a chapter reaches its limit. The mark reads the single-companion configuration with a specific note: the corruption monitoring function that Mira's modification provided is absent. The tactical security function Cain provides is present and functional. The Last Gate approach with Cain only is the route the Archive's evaluation criteria describe as "tactically sound but medically unsupported." Cain's note to himself, added tonight beside the seventeen names: "One companion position. Mark-bearer configuration requires corruption monitoring adjustment. Identify substitute protocol before Chapter 11 or manage the gradient operationally." He will manage it operationally.`,
    effectsOnEnter: { setFlags: ['chapter10_complete', 'cain_only_ch11'] },
    choices: [
      {
        id: 'c10_resolution_cain_loyal',
        text: 'Chapter 10 complete. He writes his tactical note.',
        nextNode: 'c10_cain_loyalty_end',
        requirements: { cainTrust: 8 },
      },
      {
        id: 'c10_resolution_cain_rival_path',
        text: 'Chapter 10 complete. Operational but not what it was.',
        nextNode: 'c10_cain_rival_end',
        requirements: { flags: ['cain_rival_path_set'] },
      },
      {
        id: 'c10_resolution_cain_end',
        text: 'Chapter 10 complete. Chapter 11 begins.',
        nextNode: 'c10_chapter10_end',
      },
    ],
  },

  {
    id: 'c10_resolution_alone',
    chapter: 'Chapter 10',
    title: 'The Lone Wanderer Resolution',
    location: 'The Companion Crossroads',
    imageKey: 'companion_crossroads',
    text: `No companions. The Broken Companions chapter produced the configuration that the Archive evaluation criteria do not describe — the criteria assume companion presence as a baseline. The mark reads its own state: fully awake, fully operational, no companion architecture to filter the decisions the Last Gate will require. The First Voice registers this configuration with interest. The entity below the city notes it as the first time a bearer has approached its final phase in full isolation. The Heir's note, written from their observation position: "Alone. The most dangerous configuration. Also the freest." Whether those are the same thing or opposite things is the question Chapter 11 will answer. Chapter 10 ends here.`,
    effectsOnEnter: { setFlags: ['chapter10_complete', 'lone_wanderer_ch11'], corruption: 5 },
    choices: [
      {
        id: 'c10_resolution_alone_end',
        text: 'Chapter 10 complete. Chapter 11 begins alone.',
        nextNode: 'c10_chapter10_end',
      },
    ],
  },

  // ── CHAPTER 10 END ────────────────────────────────────────────────────────

  {
    id: 'c10_chapter10_end',
    chapter: 'Chapter 10',
    title: 'The Broken Companions Chapter Closes',
    location: 'The Quiet Safehouse',
    imageKey: 'quiet_safehouse',
    text: `Chapter 10 closes in the safehouse. The table is still there. The chalk "we will fix this" is still on the Level 2-3 platform wall. The seventeen markers are still in the Level 3 South section. Mira's personal file is on the bench, or it is not. Cain's tactical maps are on the war room wall, or they have been taken down. The mark is operational. The companions — however many remain — are committed to whatever form the chapter produced. Chapter 11: The City Beneath the City. The Archive is not the bottom. Begin.`,
    effectsOnEnter: { setFlags: ['chapter10_complete'], morale: 3 },
    choices: [
      {
        id: 'c10_end_to_ch11',
        text: 'Chapter 11 begins.',
        nextNode: 'chapter11_start',
      },
    ],
  },

  // ── ENDING NODES ─────────────────────────────────────────────────────────

  {
    id: 'c10_mira_leaves_end',
    chapter: 'Chapter 10',
    title: 'She Leaves',
    location: "Mira's Hidden Clinic",
    imageKey: 'mira_hidden_clinic',
    speaker: 'Mira',
    text: `The kit is packed in eleven minutes. She does not take the Archive brief — she knows it by memory. She takes the personal file. At the door, she stops. "The corruption gradient analysis I have been keeping is in the second drawer. You should have it." She does not explain how it works, which means she still believes she will not be needed to explain it. At the corridor junction, she turns once. The expression is the clinical one — the managed precision that she applies to things too important to display unguarded. "I hope Chapter 11 goes the way you need it to." She goes. The clinic is empty in the way that something is empty when it was recently occupied by a specific person.`,
    effectsOnEnter: { setFlags: ['mira_leaves_ch10'] },
    choices: [],
    isEnding: true,
    endingId: 'ending_ch10_mira_leaves',
    endingType: 'wanderer',
  },

  {
    id: 'c10_mira_betrayal_end',
    chapter: 'Chapter 10',
    title: 'The Archive Asset',
    location: 'The Place We Promised',
    imageKey: 'place_we_promised',
    speaker: 'Mira',
    text: `The recall order's enforcement division arrives with three agents at the Level 3 junction while you are at the Place We Promised. She knew the arrival time. She provided it. Not because she wanted to — the personal file, the clinic records, the nine chapters of staying: none of it was a fabrication. But the Archive's enforcement division has specific leverage over the Phase One modification, and when leverage was applied, the loyalty that was real was not sufficient to override the architecture that was deeper than loyalty. The last thing she says is technical: "Your corruption gradient is at thirty-one. Keep it below forty." She says it to the person she spent ten chapters trying to protect, while cooperating with the people who built her to monitor them.`,
    effectsOnEnter: { setFlags: ['game_complete', 'mira_betrayal_ch10'] },
    choices: [],
    isEnding: true,
    endingId: 'ending_ch10_mira_betrayal',
    endingType: 'betrayal',
  },

  {
    id: 'c10_mira_sacrifice_end',
    chapter: 'Chapter 10',
    title: 'What She Spent',
    location: 'The Last Medicine Room',
    imageKey: 'last_medicine_room',
    speaker: 'Mira',
    text: `The Archive's enforcement division arrives at the Last Medicine Room while the stabilisation compound is being administered. The timing is specific and not accidental — they tracked the modification's resonance signature to the mark's proximity. The modification, under the enforcement division's interference protocol, produces a feedback loop that the single compound unit cannot fully resolve. She manages the interference manually — the modified neurological architecture that was built to read the mark is used to absorb the enforcement signal instead. This is not a sustainable intervention. It is a specific, terminal application of the capacity the Archive built for monitoring, applied to protection. The enforcement division retreats. The signal is gone. So is the signal source.`,
    effectsOnEnter: { setFlags: ['mira_sacrifice_ch10'] },
    choices: [],
    isEnding: true,
    endingId: 'ending_ch10_mira_sacrifice',
    endingType: 'sacrifice',
  },

  {
    id: 'c10_mira_devotion_end',
    chapter: 'Chapter 10',
    title: 'Devoted',
    location: 'The Quiet Safehouse',
    imageKey: 'quiet_safehouse',
    speaker: 'Mira',
    text: `Chapter 10 ends with Mira at the safehouse table, writing the final entry in the personal file that started six months before the blackout. The entry reads: "Archive recall order: active, unexecuted. Research wing offer: declined. Personal log entry count: nine hundred and twelve. Subject status: operational, above expected parameters at every measured point. Assessment: the program produced the intended outcome. The outcome was not the one the Archive intended. The difference is that I am still here." She closes the file. Chapter 11 begins tomorrow. She is already calculating the corruption gradient for it.`,
    effectsOnEnter: { setFlags: ['mira_devotion_ch10_end', 'chapter10_complete'] },
    choices: [],
    isEnding: true,
    endingId: 'ending_ch10_mira_devotion',
    endingType: 'companion',
  },

  {
    id: 'c10_cain_betrayal_end',
    chapter: 'Chapter 10',
    title: 'The Saints Bargain',
    location: 'The Place We Promised',
    imageKey: 'place_we_promised',
    speaker: 'Cain',
    text: `The bargain with Veyra was accepted before the Place We Promised. Not under duress — Cain does not act under duress, which is part of what makes this particular outcome cost what it costs. The calculation ran: the immunity arrangement covers the seventeen names, the Juno case file gets an institutional review, and the Saints' handling of the mark-bearer question produces a cleaner outcome for the tunnel network than whatever the Archive has planned. He believes this. It is not an irrational belief. It is the calculation of someone who has been a soldier longer than he has been a companion, and the soldier's calculus wins when the trust is not high enough to replace it. He leaves a note beside the seventeen names. It says: "I am sorry."`,
    effectsOnEnter: { setFlags: ['cain_betrayal_ch10'] },
    choices: [],
    isEnding: true,
    endingId: 'ending_ch10_cain_betrayal',
    endingType: 'betrayal',
  },

  {
    id: 'c10_cain_rival_end',
    chapter: 'Chapter 10',
    title: 'Operational Only',
    location: "Cain's War Room",
    imageKey: 'cain_war_room',
    speaker: 'Cain',
    text: `The war room conversation resolved to: operational, not loyal. He stays through Chapter 11 because the tactical situation requires it and because leaving would produce a worse outcome for the seventeen names than remaining. He does not pretend this is the same as what it was. The tactical maps are still up. He still reports on Glass Court and Iron Saints movements. He still runs the security assessments. The four minutes are still in the accounting. The war room has two people in it who have reached the limit of what can be resolved, and both of them have decided to work from that limit rather than from anywhere easier. It is not the same chapter it was before Chapter 10. It is what Chapter 10 produced.`,
    effectsOnEnter: { setFlags: ['cain_rival_ch10_end', 'chapter10_complete'] },
    choices: [],
    isEnding: true,
    endingId: 'ending_ch10_cain_rival',
    endingType: 'faction',
  },

  {
    id: 'c10_cain_last_stand_end',
    chapter: 'Chapter 10',
    title: 'What He Spent',
    location: "The Soldier's Grave",
    imageKey: 'soldiers_grave',
    speaker: 'Cain',
    text: `The Saints ambush at the Soldier's Grave produces seven operatives instead of three. Veyra's reassessment after the war room conversation concluded that a softer approach was no longer tactically viable. The mark-bearer is the priority — the active chapter, the Last Gate approach, the entity's escalation window. Cain places himself between the mark-bearer and the seven Saints operatives at the Level 3 South wall, in the corridor where the seventeen names are recorded. The specific choice is not tactical. It is the operating principle stated at the Place We Promised, applied to the situation that requires it. The Juno case file is found the following week by Archive security. Juno files it through the Archive's legal channel. The institutional review begins.`,
    effectsOnEnter: { setFlags: ['game_complete', 'cain_last_stand_ch10'] },
    choices: [],
    isEnding: true,
    endingId: 'ending_ch10_cain_last_stand',
    endingType: 'sacrifice',
  },

  {
    id: 'c10_cain_loyalty_end',
    chapter: 'Chapter 10',
    title: 'The Operating Principle',
    location: 'The Quiet Safehouse',
    imageKey: 'quiet_safehouse',
    speaker: 'Cain',
    text: `Chapter 10 ends with Cain at the war room table, adding a note to the tactical assessment for Chapter 11. The note reads: "Glass Court forward scouts — holding position, not advancing. Iron Saints remnants — inactive following Veyra's withdrawal. Archive enforcement division — one documented approach, withdrawn after intervention. Current threat level: managed." He adds, in different ink, in the margin: "Companion configuration: intact. Mark-bearer corruption gradient: within acceptable range. Assessment: the chapter produced the required outcome." He folds the tactical assessment. Tomorrow, Chapter 11. Tonight, the war room is occupied by someone who made the calculation correctly, in the specific way that has nothing to do with tactics.`,
    effectsOnEnter: { setFlags: ['cain_loyalty_ch10_end', 'chapter10_complete'] },
    choices: [],
    isEnding: true,
    endingId: 'ending_ch10_cain_loyalty',
    endingType: 'companion',
  },

  {
    id: 'c10_both_companions_lost_end',
    chapter: 'Chapter 10',
    title: 'Neither Remains',
    location: 'The Empty Chair',
    imageKey: 'empty_chair',
    text: `The table. Three chairs. No one in the other two. Mira left through one path — the Archive's enforcement, the research wing offer, the specific limit of what the chapter's trust could hold. Cain left through another — Veyra's bargain, the four-minute calculation running differently than it needed to, the operating principle applied to a situation where the calculation reached a different answer than it should have. Both absences are specific and distinct and both arrive at the same table with the same two empty chairs. The mark reads the room as functional. It is correct that the mark is functional. What the mark reads as functional and what the chapter produced are not the same assessment.`,
    effectsOnEnter: { setFlags: ['both_companions_lost_ch10'] },
    choices: [],
    isEnding: true,
    endingId: 'ending_ch10_both_companions_lost',
    endingType: 'death',
  },

  {
    id: 'c10_empty_chair_end',
    chapter: 'Chapter 10',
    title: 'The Chair That Was Always Going to Be Empty',
    location: 'The Empty Chair',
    imageKey: 'empty_chair',
    text: `There is a specific ending the chapter reserved for the person who came to the Empty Chair knowing it would be empty and sat at the table anyway and looked at both chairs and did not leave. Not the lone wanderer, who has a direction. Not the betrayed, who has an account. This is the ending for the person who understands exactly what the chapter cost, in full, and stays at the table long enough to understand it completely. The safehouse is quiet. The mark is warm. The chalk "we will fix this" is on the platform wall two corridors away. Three chairs. The one you are sitting in. Two that no one is sitting in anymore. The chapter ended the only way it could end, given everything that came before it.`,
    effectsOnEnter: { setFlags: ['empty_chair_ending_ch10'] },
    choices: [],
    isEnding: true,
    endingId: 'ending_ch10_empty_chair',
    endingType: 'death',
  },

  {
    id: 'c10_lone_wanderer_end',
    chapter: 'Chapter 10',
    title: 'Alone Into Chapter 11',
    location: 'The Empty Chair',
    imageKey: 'empty_chair',
    text: `No companions. The mark is fully awake. The First Voice's third broadcast channel is active but not transmitting — it is waiting. The entity below the city has noted the lone configuration with what the Archive's monitoring system describes as "heightened interest." The Masked Heir's log entry: "Alone. The operating constraints that companions impose — the ethical check, the tactical oversight, the emotional anchor — are all absent." The lone wanderer carrying the power path is the specific configuration that the fourteen failed interfaces most commonly achieved before their corruption threshold events. The chapter ends on this note. Chapter 11 will determine whether the fourteen's pattern holds, or whether this bearer's lone wanderer is different.`,
    effectsOnEnter: { setFlags: ['lone_wanderer_power_end', 'chapter10_complete'] },
    choices: [],
    isEnding: true,
    endingId: 'ending_ch10_lone_wanderer',
    endingType: 'wanderer',
  },

  {
    id: 'c10_broken_companions_end',
    chapter: 'Chapter 10',
    title: 'Broken But Present',
    location: 'The Quiet Safehouse',
    imageKey: 'quiet_safehouse',
    text: `Both companions are here. Neither is fully intact — the chapter took pieces from each relationship that the chapter's work did not completely restore. Mira's trust at a workable but not devout level. Cain's loyalty at functional but not committed. The safehouse has three chairs occupied by three people who have been through ten chapters together and arrived at a state that is honest about its specific fractures. The neutral version of the companion chapter: not the broken table, not the full bond, but the real and specific thing that ten chapters of crisis and choice produced. The Archive evaluation system has a category for this outcome. The category is: "functional." The personal file is on the bench. The tactical maps are on the wall. Chapter 11 begins tomorrow from this position.`,
    effectsOnEnter: { setFlags: ['game_complete', 'broken_companions_neutral_end', 'chapter10_complete'] },
    choices: [],
    isEnding: true,
    endingId: 'ending_ch10_broken_companions',
    endingType: 'faction',
  },

  {
    id: 'c10_corruption_breaks_end',
    chapter: 'Chapter 10',
    title: 'The Mark Decides',
    location: 'The Memory Shelter',
    imageKey: 'memory_shelter',
    text: `Corruption above fifty-five produces a specific failure mode in the Memory Shelter. The relic-adjacent trace signatures in the personal effects — ten years of human emotional contact, compressed into a climate-controlled archive room — react to the mark's active gradient in a way that the corruption's interference amplifies. Mira's modified neurological architecture reads the gradient spike as a direct threat and activates the stress response in a feedback loop the available compound cannot manage. Cain registers the specific physical signature of a mark at dangerous gradient and makes the Iron Saints assessment: containment first. The chapter ends on the specific irony that high corruption in a chapter about broken companions does not destroy the companions — it produces in both of them exactly the response they were designed or trained to produce. The architecture the Archive built still functions correctly. The bearer is the variable that exceeded parameters.`,
    effectsOnEnter: { setFlags: ['corruption_breaks_ch10'] },
    choices: [],
    isEnding: true,
    endingId: 'ending_ch10_corruption_breaks_all',
    endingType: 'corruption',
  },

  {
    id: 'c10_heir_manipulation_end',
    chapter: 'Chapter 10',
    title: 'The Separation Succeeds',
    location: 'The Betrayal Alley',
    imageKey: 'betrayal_alley',
    speaker: 'The Masked Heir',
    text: `Both companions take the offers. Not because they do not care — they care, and the caring is precisely why the Heir's offers worked: the research wing is genuinely safer for Mira, the immunity arrangement is genuinely better for Cain, and the mark-bearer is the person who would have asked them to choose Chapter 11's danger over their own better options. With trust depleted enough that the choice is not a sacrifice but a calculation, both calculations resolve toward the offers. The Heir watches them leave. "You allowed them to choose their best outcome," they say. "That is not a failure of leadership. It is a specific kind of generosity." They do not say what kind. The Betrayal Alley is empty. The Last Gate approach begins alone.`,
    effectsOnEnter: { setFlags: ['heir_manipulation_succeeds_ch10'] },
    choices: [],
    isEnding: true,
    endingId: 'ending_ch10_heir_manipulation',
    endingType: 'betrayal',
  },

  {
    id: 'c10_varr_expose_end',
    chapter: 'Chapter 10',
    title: 'The Cost Accepted',
    location: "Mira's Hidden Clinic",
    imageKey: 'mira_hidden_clinic',
    speaker: 'Director Varr',
    text: `The research access deal is accepted. Varr's silence is maintained. The Archive does not execute the recall order this chapter. Mira does not know the deal was made — she stays, unaware that her continued presence in the network was purchased at the cost of Archive Research Division access in Chapter 11. Varr's research in Chapter 11 requires a live mark-bearer in a vulnerable position at a specific phase of the Last Gate approach. The deal's cost is deferred. It is not cancelled. What is purchased tonight is a chapter with intact companions and an Archive researcher who has now been confirmed as a structural participant in the mark-bearer's final approach. The entity below the city notes the access arrangement as a variable it had not anticipated.`,
    effectsOnEnter: { setFlags: ['varr_deal_cost_deferred'] },
    choices: [],
    isEnding: true,
    endingId: 'ending_ch10_varr_expose',
    endingType: 'death',
  },

  {
    id: 'c10_cain_saints_return_end',
    chapter: 'Chapter 10',
    title: 'The Saints Take Him Back',
    location: "Cain's War Room",
    imageKey: 'cain_war_room',
    speaker: 'Saint Veyra',
    text: `The negotiation failed, the trust was not sufficient, and Cain looks at the wall map and the Iron Saints folder and makes a calculation that the chapter did not give him enough reason to refuse. He goes with Veyra. Not violently — there is no violence in this, which is its own kind of cost. He takes the seventeen names, leaves the tactical maps, and walks out the war room door with the specific deliberate movement of a person who has made a decision and is executing it cleanly. From inside the Saints, he sends one message to the mark-bearer via the tunnel network's relay: "The review will proceed through the internal channel. Juno has the case number." He does not say anything else. The war room is occupied by one fewer person. The Iron Saints have their soldier back.`,
    effectsOnEnter: { setFlags: ['game_complete', 'cain_saints_return_ch10'] },
    choices: [],
    isEnding: true,
    endingId: 'ending_ch10_cain_saints_return',
    endingType: 'tyrant',
  },

  {
    id: 'c10_secret_bond_end',
    chapter: 'Chapter 10',
    title: 'The Bond',
    location: 'The Memory Shelter',
    imageKey: 'memory_shelter',
    text: `The Archive's evaluation criteria do not have a category for this outcome. The criteria assume a mark-bearer alone at the Last Gate, or a mark-bearer with functionally loyal companions. They do not have a category for: a bearer at maximum trust with both companions, both of whom know the full picture and have chosen to stay past the point where leaving was the rational option. The Masked Heir's note: "The bond was achieved. I note it for the record and acknowledge that my separation attempt failed at all three points." The entity below the city notes it as the configuration that most closely resembles the Heir before their mark failed. The entity, which does not communicate in language, produces a signal the mark reads as recognition. The Heir, reading their own mark-reading archive, writes: "The bearer is not alone. The thing below the city noticed." Chapter 11 begins from this position. It is the best position anyone has ever approached it from.`,
    effectsOnEnter: { setFlags: ['secret_bond_complete', 'chapter10_complete', 'true_ending_req_chapter10_complete'] },
    choices: [],
    isEnding: true,
    endingId: 'ending_ch10_secret_bond',
    endingType: 'secret',
  },

];
