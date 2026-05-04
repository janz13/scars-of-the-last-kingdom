import type { StoryNode } from '../types';

// ══════════════════════════════════════════════════════════════════════════════
//  CHAPTER 11 — THE CITY BENEATH THE CITY
//  146 nodes · 11 locations · 8 dice checks · 21 endings
//  Mark / corruption thresholds:
//    corruption ≥ 60  → First Voice signal becomes clear communication
//    corruption ≥ 70  → corruption ending routes open
//    corruption ≥ 80  → corruption ascendant, critical gate endings
//    corruption ≤ 30  → machine communion route eligible
//  Companion configs carried from Chapter 10:
//    both_companions_ch11   → full route access
//    mira_only_ch11         → medical/corruption monitoring intact
//    cain_only_ch11         → tactical routes intact
//    lone_wanderer_ch11     → maximum freedom, maximum risk
//  Key NPCs:
//    Masked Heir            → reveals true identity, may ally or betray
//    Professor Ansel Vorn   → Blackout Project engineer, hidden in sub-city
//    Mother Chalk           → ancient medium for the entity below
//    The Pale Curator       → Archive containment specialist
//    The Sleeping Server    → technical intelligence, if Chapter 7 activated
//    The First Voice        → entity's communication channel through the mark
// ══════════════════════════════════════════════════════════════════════════════

export const CHAPTER_11_NODES: StoryNode[] = [

  // ── ENTRY ─────────────────────────────────────────────────────────────────

  {
    id: 'chapter11_start',
    chapter: 'Chapter 11',
    title: 'The City Beneath the City',
    location: 'The Sub-City Gate',
    imageKey: 'sub_city_gate',
    text: `The Archive's basement ends at a wall. Not a structural wall — a deliberate sealing, three meters of reinforced concrete with the Archive's founding sigil cut into its face at the point where the lower access corridor terminates. The mark reads the wall the way it reads everything that contains something: not as an obstacle, but as a question about what is on the other side. The chapter that began with the word "begin" at the end of Chapter 10 begins here, at the wall, with whoever survived the companion reckoning.`,
    effectsOnEnter: { setFlags: ['chapter11_begun'] },
    choices: [
      {
        id: 'c11_start_descend',
        text: 'Begin the descent. The wall is the first answer.',
        nextNode: 'c11_gate_approach',
      },
    ],
  },

  {
    id: 'c11_gate_approach',
    chapter: 'Chapter 11',
    title: 'The Lower Access Corridor',
    location: 'The Sub-City Gate',
    imageKey: 'sub_city_gate',
    text: `The lower access corridor is eighty meters below the Archive's above-ground footprint, accessible only from the Level 5 maintenance grid. The Archive's documentation described it as sub-basement infrastructure. The documentation was not wrong. It was not complete. The construction pre-dates the Archive by an uncertain amount — the concrete is the Archive's, added in the Foundation Period; the passage beneath it was here first. The mark has been orienting toward this direction since the awakening in Chapter 9, a persistent low-frequency pull that the previous chapter's decisions have not resolved.`,
    effectsOnEnter: {},
    choices: [
      {
        id: 'c11_approach_survey',
        text: 'Assess who made the descent with you.',
        nextNode: 'c11_gate_companion_survey',
      },
    ],
  },

  {
    id: 'c11_gate_companion_survey',
    chapter: 'Chapter 11',
    title: 'Who Came Down',
    location: 'The Sub-City Gate',
    imageKey: 'sub_city_gate',
    text: `The companion configuration from Chapter 10 is the configuration that approaches the wall. The mark reads whoever is present as a secondary resonance alongside the primary awakening. The thing beyond the wall reads the same data through the concrete. Whatever carried into Chapter 11 — both companions, one, none — shapes what the sub-city shows first.`,
    effectsOnEnter: {},
    choices: [
      {
        id: 'c11_survey_both',
        text: 'Both Mira and Cain came down.',
        nextNode: 'c11_gate_both_scene',
        requirements: { flags: ['both_companions_ch11'] },
      },
      {
        id: 'c11_survey_mira',
        text: 'Mira came down. Cain did not.',
        nextNode: 'c11_gate_mira_only_scene',
        requirements: { flags: ['mira_only_ch11'] },
      },
      {
        id: 'c11_survey_cain',
        text: 'Cain came down. Mira did not.',
        nextNode: 'c11_gate_cain_only_scene',
        requirements: { flags: ['cain_only_ch11'] },
      },
      {
        id: 'c11_survey_alone',
        text: 'No companions. The descent is alone.',
        nextNode: 'c11_gate_alone_scene',
      },
    ],
  },

  {
    id: 'c11_gate_both_scene',
    chapter: 'Chapter 11',
    title: 'Three at the Wall',
    location: 'The Sub-City Gate',
    imageKey: 'sub_city_gate',
    speaker: 'Cain',
    text: `Both companions at the corridor's end. Mira runs a preliminary mark-reading before you reach the wall — a quiet technical action, the specific competence of someone who has been monitoring this gradient for three years. Cain positions at the junction, tactical assessment running: load-bearing structure on the east wall, the sealed concrete's age visible in its corrosion pattern. "Pre-Archive," he says, meaning the sealing, not the passage. "The Archive sealed something that was already here." Mira nods. "That matches the Phase One documentation I found at the clinic. The Archive knew this was here. They built down to it and then stopped."`,
    effectsOnEnter: { setFlags: ['chapter11_both_companions'] },
    choices: [
      {
        id: 'c11_both_to_gate',
        text: 'Move to the gate. The wall has been standing long enough.',
        nextNode: 'c11_sub_city_gate_arrive',
      },
    ],
  },

  {
    id: 'c11_gate_mira_only_scene',
    chapter: 'Chapter 11',
    title: 'Two at the Wall',
    location: 'The Sub-City Gate',
    imageKey: 'sub_city_gate',
    speaker: 'Mira',
    text: `Mira reads the mark as you approach. "The resonance is forward-directed," she says — not medically, the way she sometimes shifts from assessment to observation when she forgets the clinical distance. "The corruption gradient is already responding to proximity. Whatever is beyond this wall, the mark already knows it." She pauses. "I knew this level existed. Not the detail. The Archive's Phase One documentation mentioned a sub-basement infrastructure project that was never completed. I assumed structural work. I was not reading the documentation correctly." She does not say she should have told you earlier. You understand that this is what she means.`,
    effectsOnEnter: { setFlags: ['chapter11_mira_only'] },
    choices: [
      {
        id: 'c11_mira_to_gate',
        text: 'Move to the gate together.',
        nextNode: 'c11_sub_city_gate_arrive',
      },
    ],
  },

  {
    id: 'c11_gate_cain_only_scene',
    chapter: 'Chapter 11',
    title: 'Two at the Wall',
    location: 'The Sub-City Gate',
    imageKey: 'sub_city_gate',
    speaker: 'Cain',
    text: `Cain examines the wall with the careful attention he gave the Soldier's Grave markers. "Iron Saints deployment records mention a Level 5-6 restricted zone," he says. "Filed under 'Archive infrastructure security.' I ran security details here twice. We were told it was a utilities grid." His hand touches the Foundation Period sigil cut into the concrete. "Someone knew. Someone told us it was pipes." He looks at you. "The immunity arrangement I declined — the Saints' information on this corridor was part of what they were offering. I chose not to take it. This is what that choice costs." He says it as record-keeping, not regret.`,
    effectsOnEnter: { setFlags: ['chapter11_cain_only'] },
    choices: [
      {
        id: 'c11_cain_to_gate',
        text: 'Move to the gate. His choice held.',
        nextNode: 'c11_sub_city_gate_arrive',
      },
    ],
  },

  {
    id: 'c11_gate_alone_scene',
    chapter: 'Chapter 11',
    title: 'One at the Wall',
    location: 'The Sub-City Gate',
    imageKey: 'sub_city_gate',
    text: `The corridor is longer than the architecture should allow. At some point — not precisely locatable — the Archive's construction gives way to something older without clear indication of where the transition occurs. The mark responded to this passage three chapters ago and has been orienting toward it since. The lone wanderer configuration carries a specific implication here: the thing beyond the wall reads the mark as unaccompanied. The Archive's containment documentation, if it had been read, would note this as the highest-risk entry configuration. It has not been read. The wall is ahead.`,
    effectsOnEnter: { setFlags: ['chapter11_alone'] },
    choices: [
      {
        id: 'c11_alone_to_gate',
        text: 'Approach the wall. No other option was taken.',
        nextNode: 'c11_sub_city_gate_arrive',
      },
    ],
  },

  {
    id: 'c11_sub_city_gate_arrive',
    chapter: 'Chapter 11',
    title: 'The Sub-City Gate',
    location: 'The Sub-City Gate',
    imageKey: 'sub_city_gate',
    text: `The Sub-City Gate is the name the Archive's internal records use. The mark reads it as a label placed over something that was not named by the people who built it — who may not have been, in the relevant sense, people. The gate is a circular aperture three meters in diameter, sealed with a material that the mark identifies as partially organic: something grown into stone over decades or centuries, not placed. The Foundation Period concrete was poured around it. The Archive did not build this gate. They found it and sealed it with what they had. The gate has been aware of the mark since the awakening. It is aware now.`,
    effectsOnEnter: { setFlags: ['sub_city_accessed'] },
    choices: [
      {
        id: 'c11_gate_examine',
        text: 'Examine the gate. Understand what you are opening.',
        nextNode: 'c11_gate_sealed_door',
      },
    ],
  },

  {
    id: 'c11_gate_sealed_door',
    chapter: 'Chapter 11',
    title: 'How It Opens',
    location: 'The Sub-City Gate',
    imageKey: 'sub_city_gate',
    text: `The gate's sealing mechanism is not the Archive's concrete. It is the original material, shaped in a way the mark reads as intentional — the gate seals itself and the Archive's layer was redundant. The mark resonates with the sealing. A low-frequency vibration translates as attention: whatever is on the other side knows you are here. Four approaches present themselves: the mark directly, which will work and will cost something; the mechanical release protocol, if the intelligence to find it is present; structural knowledge from military or underground training; or force, which will produce a result no one intends.`,
    effectsOnEnter: {},
    choices: [
      {
        id: 'c11_use_mark_gate',
        text: 'Use the mark directly. The gate was built for this.',
        nextNode: 'c11_gate_mark_open',
        effects: { corruption: 5, setFlags: ['gate_opened_via_mark'] },
      },
      {
        id: 'c11_examine_gate_mechanism',
        text: 'Analyse the release protocol. There is a secondary panel.',
        nextNode: 'c11_gate_int_success',
        diceCheck: {
          stat: 'intelligence',
          difficulty: 7,
          diceType: 'd8',
          successNode: 'c11_gate_int_success',
          failureNode: 'c11_gate_int_fail',
        },
      },
      {
        id: 'c11_gate_soldier_access',
        text: 'The blast door pattern is familiar. Find the secondary access.',
        nextNode: 'c11_gate_opened',
        requirements: { backgrounds: ['exiled_soldier'] },
        effects: { setFlags: ['gate_opened_via_soldier'] },
      },
      {
        id: 'c11_gate_courier_route',
        text: 'There is always a route they do not want documented. Find it.',
        nextNode: 'c11_gate_opened',
        requirements: { backgrounds: ['black_market_courier'] },
        effects: { setFlags: ['gate_opened_via_courier'] },
      },
      {
        id: 'c11_gate_force_attempt',
        text: 'Force the gate. The mark is not a key — it is a weapon.',
        nextNode: 'c11_buried_city_end',
        effects: { corruption: 15, health: -40 },
      },
    ],
  },

  {
    id: 'c11_gate_mark_open',
    chapter: 'Chapter 11',
    title: 'Recognition',
    location: 'The Sub-City Gate',
    imageKey: 'sub_city_gate',
    text: `The mark interfaces with the gate. The mechanism — whatever it is — recognises the mark's frequency the way a lock recognises a key that was made for it specifically. The gate opens over four seconds, organic material retracting in a radial pattern, the vibration shifting to something the mark reads as acknowledgment. The corruption gradient increases by a measurable increment. Not damage — recognition. The thing beyond the wall is aware that the correct instrument has arrived. The passage is open.`,
    effectsOnEnter: { corruption: 3, setFlags: ['gate_opened'] },
    choices: [
      {
        id: 'c11_mark_open_descend',
        text: 'Descend. The gate is open.',
        nextNode: 'c11_gate_opened',
      },
    ],
  },

  {
    id: 'c11_gate_int_success',
    chapter: 'Chapter 11',
    title: 'The Protocol',
    location: 'The Sub-City Gate',
    imageKey: 'sub_city_gate',
    text: `The Archive's release protocol is a three-stage mechanical sequence accessible from a secondary panel concealed in the corridor's east wall. The intelligence analysis that locates it is the same analysis that makes the mechanism clear: the Archive knew how to open this gate without using the mark. They chose not to open it. The panel activates. The gate opens in the four-second radial retraction the Foundation Period records describe. The Archive built this contingency into every level of the sub-city's access infrastructure and then filed the documentation under a classification no active personnel could reach.`,
    effectsOnEnter: { intelligence: 1, setFlags: ['gate_opened', 'gate_protocol_known'] },
    choices: [
      {
        id: 'c11_int_success_descend',
        text: 'Descend. The protocol worked.',
        nextNode: 'c11_gate_opened',
      },
    ],
  },

  {
    id: 'c11_gate_int_fail',
    chapter: 'Chapter 11',
    title: 'Partial Open',
    location: 'The Sub-City Gate',
    imageKey: 'sub_city_gate',
    text: `The analysis is incomplete. The gate opens partially — a gap sufficient for entry, the organic sealing material partially retracted. It is enough. The partial opening changes the entry configuration: single file, mark-bearer first. The gate's vibration continues at a different register than a successful open — the mark reads it as curiosity rather than acknowledgment. The passage is accessible. The thing below will note the difference between an instrument that arrived correctly and one that arrived approximately.`,
    effectsOnEnter: { setFlags: ['gate_opened', 'gate_partial_open'] },
    choices: [
      {
        id: 'c11_int_fail_descend',
        text: 'Enter through the gap. Close enough.',
        nextNode: 'c11_gate_opened',
      },
    ],
  },

  {
    id: 'c11_gate_opened',
    chapter: 'Chapter 11',
    title: 'The Descent Begins',
    location: 'The Sub-City Gate',
    imageKey: 'sub_city_gate',
    text: `Beyond the gate: a descent. A ramp cut into material older than the Archive's concrete, curved in a geometry the mark reads as designed for something other than human locomotion — not hostile to it, but not designed for it either. The air is distinct in a way the mark registers as the specific atmospheric signature of a sealed space kept at a consistent state for decades or centuries. The mark provides orientation in the absence of light. The corridor above is already three levels behind.`,
    effectsOnEnter: { setFlags: ['sub_city_descent_begun'] },
    choices: [
      {
        id: 'c11_opened_platform',
        text: 'Continue to the Forgotten Platform. The ramp leads there.',
        nextNode: 'c11_forgotten_platform_arrive',
      },
    ],
  },

  // ── THE FORGOTTEN PLATFORM ────────────────────────────────────────────────

  {
    id: 'c11_forgotten_platform_arrive',
    chapter: 'Chapter 11',
    title: 'The Forgotten Platform',
    location: 'The Forgotten Platform',
    imageKey: 'forgotten_platform',
    text: `The Forgotten Platform is a transit platform — a flat area with boarding infrastructure, built to receive vehicles that have not run in a long time. The track gauge and the vehicle shadow-impressions in the stone suggest something the relic transit system in the lower levels is a functional descendant of. The Platform has been here since before the city above was built. The city was built on top of it. This is not metaphorical. The northeast wall section has a structural instability that the mark reads as active — something is building pressure behind it.`,
    effectsOnEnter: { setFlags: ['forgotten_platform_arrived'] },
    choices: [
      {
        id: 'c11_platform_investigate',
        text: 'Examine the signs and structure. This predates everything above.',
        nextNode: 'c11_platform_ancient_signs',
      },
      {
        id: 'c11_platform_investigate_unstable',
        text: 'Investigate the pressure anomaly in the northeast section.',
        nextNode: 'c11_platform_collapse_end',
        effects: { health: -60 },
      },
    ],
  },

  {
    id: 'c11_platform_ancient_signs',
    chapter: 'Chapter 11',
    title: 'Two Scripts',
    location: 'The Forgotten Platform',
    imageKey: 'forgotten_platform',
    text: `The Platform's signs are in two scripts: a pre-blackout administrative language, legible, reading "Foundation Station — Interface Level"; and a second script beneath it that is not in any Archive catalogue. The second script is older. The mark reads it not as language but as instruction — the same kind of information encountered in the Memory Shelter's deepest residue. The instruction translates, in the mark's rendering: "The bearer carries the key. The key was always here." The mark has been reading fragments of this sentence in various forms since Chapter 9.`,
    effectsOnEnter: { intelligence: 1, setFlags: ['ancient_script_first_contact'] },
    choices: [
      {
        id: 'c11_platform_scholar_read_choice',
        text: 'Apply architectural analysis. The construction vocabulary here is not human.',
        nextNode: 'c11_platform_scholar_read',
        requirements: { backgrounds: ['forgotten_scholar'] },
      },
      {
        id: 'c11_platform_noble_recognize',
        text: 'This spatial logic is familiar. The Glass Court preserved it without understanding it.',
        nextNode: 'c11_platform_noble_recognition',
        requirements: { backgrounds: ['fallen_noble'] },
      },
      {
        id: 'c11_platform_broadcast_find_direct',
        text: 'Move on. Find what this level contains.',
        nextNode: 'c11_platform_broadcast_find',
      },
    ],
  },

  {
    id: 'c11_platform_scholar_read',
    chapter: 'Chapter 11',
    title: 'Not Human Architecture',
    location: 'The Forgotten Platform',
    imageKey: 'forgotten_platform',
    text: `The Platform's load-bearing arches use a structural logic the Archive's engineering documentation describes as "theoretically optimal but practically unachievable with pre-blackout materials." The material was not pre-blackout. The construction methods were not pre-blackout. The Platform was built by a technical tradition that reached its current state before the city above was imagined, and which knew things about structural load distribution that the Archive's research division re-derived in the post-blackout period by studying this exact structure — without acknowledging the source. The Archive has been citing this architecture as its own discovery for twenty years.`,
    effectsOnEnter: { intelligence: 2, setFlags: ['platform_scholar_read'] },
    choices: [
      {
        id: 'c11_scholar_to_broadcast',
        text: 'The speaker system in the eastern wall is still active.',
        nextNode: 'c11_platform_broadcast_find',
      },
    ],
  },

  {
    id: 'c11_platform_noble_recognition',
    chapter: 'Chapter 11',
    title: 'The Origin of Form',
    location: 'The Forgotten Platform',
    imageKey: 'forgotten_platform',
    text: `The Platform's administrative infrastructure — the boarding protocol layout, the signage hierarchy, the spatial organisation of waiting and transit areas — follows a logic that the ruling class preserved in ceremonial form without understanding its function. The Glass Court's reception architecture is descended directly from this Platform's design, transmitted through the founding families' records as "classical form" for three generations. The Glass Court has been imitating this structure without knowing what they were imitating. The noble who grew up in that architecture recognises the ancestor of everything they were taught to revere.`,
    effectsOnEnter: { intelligence: 2, glassCourt: -2, setFlags: ['platform_noble_recognition'] },
    choices: [
      {
        id: 'c11_noble_to_broadcast',
        text: 'The speaker system in the eastern wall is still active.',
        nextNode: 'c11_platform_broadcast_find',
      },
    ],
  },

  {
    id: 'c11_platform_broadcast_find',
    chapter: 'Chapter 11',
    title: 'Year Three of the Containment Period',
    location: 'The Forgotten Platform',
    imageKey: 'forgotten_platform',
    text: `A functioning speaker system in the Platform's eastern wall — damaged but operational — plays a recording. The recording is in pre-blackout administrative language, dated to "Year 3 of the Containment Period," a dating system that does not correspond to any Archive calendar. The content is a personnel transition announcement: "The Interface Protocol has been suspended pending further evaluation. Mark-bearing personnel are to report to the Surface Transition point." Mark-bearing personnel. Three years before the blackout was not the first time this happened. The Containment Period predates the Archive. The Archive was built during it.`,
    effectsOnEnter: { intelligence: 2, setFlags: ['containment_period_known'] },
    choices: [
      {
        id: 'c11_broadcast_to_vorn',
        text: 'Someone is standing at the western boarding area. They have been waiting.',
        nextNode: 'c11_platform_vorn_appears',
      },
    ],
  },

  {
    id: 'c11_platform_vorn_appears',
    chapter: 'Chapter 11',
    title: 'Professor Ansel Vorn',
    location: 'The Forgotten Platform',
    imageKey: 'forgotten_platform',
    speaker: 'Vorn',
    text: `He is thin. Eleven months explains this. He stands at the Platform's western boarding area with the posture of someone who has been waiting and has run out of the capacity for anxiety about whether the person they are waiting for will arrive. "I worked on the Containment Protocol," he says, without preamble, without introduction. "The one that failed three years ago. Not the Archive's version of the event — the real version." He produces a documentation set from a weathered case. "I have been in this sub-city for eleven months. Not because I was forgotten. I made a choice about where to be when the mark-bearer descended. Here is where I chose."`,
    effectsOnEnter: { setFlags: ['vorn_appeared'] },
    choices: [
      {
        id: 'c11_assess_vorn',
        text: 'Assess him. Decide whether his account is worth the trust.',
        nextNode: 'c11_platform_vorn_trust_choice',
      },
    ],
  },

  {
    id: 'c11_platform_vorn_trust_choice',
    chapter: 'Chapter 11',
    title: 'The Account',
    location: 'The Forgotten Platform',
    imageKey: 'forgotten_platform',
    text: `Vorn's account of the Blackout Project is comprehensive, internally consistent, and contradicts the Archive's official record at every significant point. The question is whether the contradiction exists because the Archive was wrong — or because Vorn is constructing a version that serves his purposes. The mark reads his physiological state as stable. It does not read intent. He is watching you assess him with the specific patience of someone who has prepared for this assessment and believes their account will survive it.`,
    effectsOnEnter: {},
    choices: [
      {
        id: 'c11_trust_vorn',
        text: '"Tell me the full account. From the beginning."',
        nextNode: 'c11_platform_vorn_trusted',
        effects: { setFlags: ['vorn_trusted'] },
      },
      {
        id: 'c11_distrust_vorn',
        text: '"The evidence speaks for itself. Your account is secondary."',
        nextNode: 'c11_platform_vorn_distrusted',
        effects: { setFlags: ['vorn_distrusted'] },
      },
    ],
  },

  {
    id: 'c11_platform_vorn_trusted',
    chapter: 'Chapter 11',
    title: 'The Real Sequence',
    location: 'The Forgotten Platform',
    imageKey: 'forgotten_platform',
    speaker: 'Vorn',
    text: `His account begins. The Containment Protocol was not an Archive initiative — it was a cross-faction agreement, brokered in secret between the Glass Court's research division, the Iron Saints' deep infrastructure unit, and the Archive's founding committee. The blackout was not an accident. It was a containment attempt that worked partially: the entity below the city was not sealed, but its surface expression was interrupted. The city above was rebuilt specifically to maintain the interruption. The factions' war over the city is a war over the infrastructure that keeps the entity below from completing what it started three years ago. Vorn was the Protocol's lead engineer. He knows where every component of the containment system is. He knows which ones are still working.`,
    effectsOnEnter: { intelligence: 3, setFlags: ['blackout_partial_truth_known'] },
    choices: [
      {
        id: 'c11_vorn_trusted_forward',
        text: 'Take what he knows. The deeper levels are next.',
        nextNode: 'c11_platform_forward',
      },
    ],
  },

  {
    id: 'c11_platform_vorn_distrusted',
    chapter: 'Chapter 11',
    title: 'Without Endorsement',
    location: 'The Forgotten Platform',
    imageKey: 'forgotten_platform',
    speaker: 'Vorn',
    text: `He accepts the distrust without argument. "You can verify everything I am saying in the Old Government Vault on the fifth level," he says. "I will accompany you or not as you prefer. The information is there regardless of what you think of me." He sits. "I have been here eleven months. I have had time to think about what it means that I am the only person with a full account of the Blackout Project and no one above knows I am here." A pause. "It means either I was missed, or I was left." He does not share his conclusion. He makes the correct calculation that you will find out for yourself.`,
    effectsOnEnter: {},
    choices: [
      {
        id: 'c11_vorn_distrusted_forward',
        text: 'Move on. The vault will confirm what the sub-city shows.',
        nextNode: 'c11_platform_forward',
      },
    ],
  },

  {
    id: 'c11_platform_forward',
    chapter: 'Chapter 11',
    title: 'The Descent Continues',
    location: 'The Forgotten Platform',
    imageKey: 'forgotten_platform',
    text: `The Forgotten Platform holds the chapter's first full set of revealed fragments: the Containment Period, the two-script signs, Vorn's account or its absence. The ramp descends to six additional levels, each with its own function in the sub-city's original design. The mark is providing a directional signal — not emergency, not alarm, but the specific sense of something large nearby that has been building since the awakening. The chapter is committed. The Underworld District is below.`,
    effectsOnEnter: {},
    choices: [
      {
        id: 'c11_platform_to_district',
        text: 'Descend to the Underworld District.',
        nextNode: 'c11_underworld_district_arrive',
      },
    ],
  },

  // ── THE UNDERWORLD DISTRICT ───────────────────────────────────────────────

  {
    id: 'c11_underworld_district_arrive',
    chapter: 'Chapter 11',
    title: 'The Underworld District',
    location: 'The Underworld District',
    imageKey: 'underworld_district',
    text: `The Underworld District is the sub-city's residential layer — housing built into the stone by people who lived below the city above for reasons the Archive's records describe as "sanitary segregation" and Vorn's account describes as "deliberate exclusion of the mark-bearing population from surface access." Both are accurate. The District's population was evacuated, the Archive's records say, in the eighteen months before the blackout. The mark reads residual warmth in the stone — the thermal signature of recent habitation. Some of them did not leave. Some of them are still here.`,
    effectsOnEnter: { setFlags: ['underworld_district_arrived'] },
    choices: [
      {
        id: 'c11_district_find_survivors',
        text: 'Follow the thermal signature. People are here.',
        nextNode: 'c11_district_survivors_found',
      },
      {
        id: 'c11_district_chalk_first',
        text: 'There is fresh chalk on the walls ahead. Someone is marking a route.',
        nextNode: 'c11_district_mother_chalk_arrives',
      },
    ],
  },

  {
    id: 'c11_district_survivors_found',
    chapter: 'Chapter 11',
    title: 'Not Evacuated',
    location: 'The Underworld District',
    imageKey: 'underworld_district',
    text: `Forty-seven people, three levels below the Forgotten Platform, in a section the Archive's evacuation records describe as "cleared." They are not cleared. Living in the District's housing infrastructure with improvised ventilation and the relic transit system's power grid at reduced capacity. Some have been here since before the blackout. Some have been here longer. The mark reads their signatures as different from surface-population signatures: lower corruption baseline, higher relic resonance. Mark-bearing population. Vorn was right about what the Archive was doing with the Underworld District.`,
    effectsOnEnter: { setFlags: ['district_survivors_found'] },
    choices: [
      {
        id: 'c11_medic_assess_choice',
        text: 'Assess their medical state before deciding anything.',
        nextNode: 'c11_district_medic_assess',
        requirements: { classes: ['medic'] },
      },
      {
        id: 'c11_underground_medic_assess',
        text: 'This is chronic adaptation, not acute crisis. Assess carefully.',
        nextNode: 'c11_district_medic_assess',
        requirements: { backgrounds: ['underground_medic'] },
      },
      {
        id: 'c11_district_save_direct',
        text: 'Their residential section is structurally compromised. Decide now.',
        nextNode: 'c11_district_save_choice',
      },
    ],
  },

  {
    id: 'c11_district_medic_assess',
    chapter: 'Chapter 11',
    title: 'Chronic Modification',
    location: 'The Underworld District',
    imageKey: 'underworld_district',
    text: `The survivor population's medical state is a specific kind of crisis: not acute trauma, not starvation, but long-term malnutrition combined with relic exposure at a level the clinical literature would classify as chronic modification. They are alive. They are functional. Their bodies have been adapting to the sub-city's relic environment for years, and the adaptation is producing effects that Mira would describe as "uncontrolled Phase One modification without institutional oversight." They have been becoming something, in this sealed place, without anyone above knowing or caring. The modification is not reversible. Management is the correct frame.`,
    effectsOnEnter: { intelligence: 1, setFlags: ['district_medical_assessed'] },
    choices: [
      {
        id: 'c11_medic_to_save',
        text: 'Their residential section is structurally compromised. The rescue question is next.',
        nextNode: 'c11_district_save_choice',
      },
    ],
  },

  {
    id: 'c11_district_save_choice',
    chapter: 'Chapter 11',
    title: 'The Structural Problem',
    location: 'The Underworld District',
    imageKey: 'underworld_district',
    text: `The structural section where the survivors live is not safe. Three years of relic-field exposure has accelerated material degradation. The section is stable at current load. A rescue operation will affect structural loading in ways that require assessment. The choice is not whether to help. The choice is whether the help the mark-bearer can provide produces a better outcome than the harm the attempt may cause.`,
    effectsOnEnter: {},
    choices: [
      {
        id: 'c11_district_attempt_rescue',
        text: 'Attempt the rescue. Move the collapsed arch blocking the corridor.',
        nextNode: 'c11_district_save_strength_dice',
      },
      {
        id: 'c11_district_abandon_them',
        text: 'Leave them. They have survived without help this long.',
        nextNode: 'c11_district_abandon_choice',
        effects: { morale: -5, corruption: 3 },
      },
    ],
  },

  {
    id: 'c11_district_save_strength_dice',
    chapter: 'Chapter 11',
    title: 'The Collapsed Arch',
    location: 'The Underworld District',
    imageKey: 'underworld_district',
    text: `The rescue requires moving structural materials — a partially-collapsed arch in the residential corridor, partially organic from decades of relic exposure, grown into the surrounding stone. The mark provides orientation. The body provides the force. The arch weighs what it weighs.`,
    effectsOnEnter: {},
    choices: [
      {
        id: 'c11_strength_rescue_check',
        text: 'Move the arch. All of it.',
        nextNode: 'c11_district_save_success',
        diceCheck: {
          stat: 'strength',
          difficulty: 6,
          diceType: 'd8',
          successNode: 'c11_district_save_success',
          failureNode: 'c11_district_save_fail',
          successEffects: { morale: 8, setFlags: ['survivors_saved'] },
          failureEffects: { morale: -2, health: -15, setFlags: ['survivors_saved_partial'] },
        },
      },
    ],
  },

  {
    id: 'c11_district_save_success',
    chapter: 'Chapter 11',
    title: 'The Corridor Opens',
    location: 'The Underworld District',
    imageKey: 'underworld_district',
    text: `The arch moves. The corridor opens. Forty-seven people in varying states of chronic modification and long-term adaptation register the mark-bearer's presence with responses ranging from awe to wariness to the specific calm of people who have been waiting long enough that arrival feels expected. The rescue produces the outcome the choice was trying to produce. The District's surviving population is accessible. A young woman in the group — she looks about sixteen, though relic-exposure aging is unreliable — touches the mark-bearer's hand and says, in a language mixed between pre-blackout administrative and something older: "The bearer was always supposed to come."`,
    effectsOnEnter: { morale: 10, setFlags: ['survivors_saved', 'mark_bearer_recognised_below'] },
    choices: [
      {
        id: 'c11_save_success_chalk',
        text: 'A woman with chalk is marking the far wall. Follow.',
        nextNode: 'c11_district_mother_chalk_arrives',
      },
    ],
  },

  {
    id: 'c11_district_save_fail',
    chapter: 'Chapter 11',
    title: 'Partial Exit',
    location: 'The Underworld District',
    imageKey: 'underworld_district',
    text: `The arch does not move cleanly. The partial movement accelerates the collapse timeline. The corridor is not blocked — it is unstable, requiring everyone to move through a collapsing space with a small margin for error. The survivors move with the competence of people who have navigated this space for years. Exit is achieved at the cost of structural damage that cannot be undone. Some of what the survivors carried — records, objects, documentation of their years below — is sealed behind the collapse. Not everything gets out. The mark registers the weight of what was left.`,
    effectsOnEnter: { morale: -3, health: -10, setFlags: ['survivors_saved_partial', 'district_records_lost'] },
    choices: [
      {
        id: 'c11_save_fail_chalk',
        text: 'A woman with chalk is marking the far wall. Follow.',
        nextNode: 'c11_district_mother_chalk_arrives',
      },
    ],
  },

  {
    id: 'c11_district_abandon_choice',
    chapter: 'Chapter 11',
    title: 'The Calculation',
    location: 'The Underworld District',
    imageKey: 'underworld_district',
    text: `Leave the survivors: they have been here for years without help from above. The decision to prioritise the chapter's objective over an extraction the mark-bearer may not have the capacity to complete is a calculation with specific inputs and a specific output. The mark does not register this as corruption in isolation. It registers it as a choice about what the chapter is for. The survivors, observing the departure, do not respond with violence or reproach. They have made similar calculations. The sub-city continues.`,
    effectsOnEnter: {},
    choices: [
      {
        id: 'c11_abandon_confirm',
        text: 'Continue. The chapter\'s objective requires this level of focus.',
        nextNode: 'c11_district_abandoned',
      },
    ],
  },

  {
    id: 'c11_district_abandoned',
    chapter: 'Chapter 11',
    title: 'The District Behind',
    location: 'The Underworld District',
    imageKey: 'underworld_district',
    text: `The Underworld District is behind. The forty-seven survivor signatures are still readable at reducing distance. The mark does not editorialize. What changes is a flag in the chapter's state: survivors_abandoned. The chapter's later locations respond to this differently. A young woman watches from a sealed doorway, not with reproach, with the look of someone who expected this. The relic transit system above provides the route forward. A woman with chalk is marking the far wall of the main corridor.`,
    effectsOnEnter: { setFlags: ['survivors_abandoned'], corruption: 5 },
    choices: [
      {
        id: 'c11_abandoned_chalk',
        text: 'The chalk marks are in a script the mark recognises.',
        nextNode: 'c11_district_mother_chalk_arrives',
      },
    ],
  },

  {
    id: 'c11_district_mother_chalk_arrives',
    chapter: 'Chapter 11',
    title: 'Mother Chalk',
    location: 'The Underworld District',
    imageKey: 'underworld_district',
    text: `She arrives from a residential corridor not on the Archive's sub-city map. She is not from the survivor population — the mark reads her signature as different, older, something that has been in this space longer than any individual human. She carries a piece of chalk. She is writing on the walls in the second script from the Forgotten Platform — the instruction script. The mark reads what she is currently writing: "The bearer knows the way. The bearer does not know they know the way." She looks at you. "I have been waiting to say that to the correct person for a long time," she says. "You are the correct person."`,
    effectsOnEnter: { setFlags: ['mother_chalk_met', 'mother_chalk_guide'] },
    choices: [
      {
        id: 'c11_chalk_follow_choice',
        text: 'Follow her. She knows this architecture.',
        nextNode: 'c11_district_chalk_follow',
      },
      {
        id: 'c11_chalk_decline_follow',
        text: 'Note the instruction. Continue independently.',
        nextNode: 'c11_district_forward',
      },
    ],
  },

  {
    id: 'c11_district_chalk_follow',
    chapter: 'Chapter 11',
    title: 'Her Circuit',
    location: 'The Underworld District',
    imageKey: 'underworld_district',
    text: `She leads through passages not on any available documentation. The mark reads her knowledge of the sub-city as structural: she is not navigating, she is remembering. "The Underworld District was full once," she says. "Before your city was built. The people here knew what was below them and chose to live next to it rather than run from it." She touches a wall. "Most of them are still here. In a different sense of here." The passage leads to the relic transit junction. She says: "I will be at the Deep Archive when you arrive there. The route between here and there will show you what you need to see." The mark reads the sentence as accurate rather than poetic.`,
    effectsOnEnter: { setFlags: ['chalk_route_known'] },
    choices: [
      {
        id: 'c11_chalk_follow_transit',
        text: 'Continue to the Relic Transit Line.',
        nextNode: 'c11_district_forward',
      },
    ],
  },

  {
    id: 'c11_district_forward',
    chapter: 'Chapter 11',
    title: 'Lower Access',
    location: 'The Underworld District',
    imageKey: 'underworld_district',
    text: `The Underworld District's lower access connects to the Relic Transit Line at a junction the Archive's documentation does not include. The connection shows evidence of long-term regular use — chalk marks, the specific wear pattern of daily foot traffic, maintenance that indicates someone has been keeping this route open for years. The Relic Transit Line is below. The chapter's deeper locations require transit.`,
    effectsOnEnter: {},
    choices: [
      {
        id: 'c11_district_to_transit',
        text: 'Reach the Relic Transit Line.',
        nextNode: 'c11_relic_transit_arrive',
      },
    ],
  },

  // ── THE RELIC TRANSIT LINE ────────────────────────────────────────────────

  {
    id: 'c11_relic_transit_arrive',
    chapter: 'Chapter 11',
    title: 'The Relic Transit Line',
    location: 'The Relic Transit Line',
    imageKey: 'relic_transit_line',
    text: `The Relic Transit Line is not a metaphor. It is a transit system — automated vehicles running on a track network, powered by the relic field, operating at reduced capacity since the blackout interrupted the power grid. Four vehicles are still running. Their routes loop through the sub-city's major levels. The vehicles are not empty in any meaningful sense. The mark reads each one as carrying a specific relic-field resonance that is not human, not fully mechanical, but something between — modification without original intent.`,
    effectsOnEnter: { setFlags: ['relic_transit_arrived'] },
    choices: [
      {
        id: 'c11_transit_examine',
        text: 'Examine the transit system. It is still running for a reason.',
        nextNode: 'c11_transit_machine_activity',
      },
      {
        id: 'c11_transit_escape_choice',
        text: 'Board the Transit Line back to the surface. Leave the sub-city now.',
        nextNode: 'c11_transit_escape_end',
        effects: { corruption: -5, morale: -15 },
      },
    ],
  },

  {
    id: 'c11_transit_machine_activity',
    chapter: 'Chapter 11',
    title: 'Still Running',
    location: 'The Relic Transit Line',
    imageKey: 'relic_transit_line',
    text: `The Transit Line is operational not because of the Archive's power grid — which does not extend to this level — but because the relic field itself channels through the track infrastructure, which was designed to interface with it directly. The machines are not automated. They are attentive. The transit system is aware of the mark-bearer's presence in the same way the gate was aware: not with intelligence, but with the specific responsiveness of something that recognises what it was built to respond to. The route network is partially illuminated. Full activation requires either the mark's direct interface or the technical knowledge of someone who built things like this.`,
    effectsOnEnter: {},
    choices: [
      {
        id: 'c11_transit_relic_scan',
        text: 'Read the system\'s infrastructure directly. It is built from relic components.',
        nextNode: 'c11_transit_relic_hunter_scan',
        requirements: { classes: ['relic_hunter'] },
      },
      {
        id: 'c11_transit_awaken_decision',
        text: 'Decide whether to bring the system to full capacity.',
        nextNode: 'c11_transit_awaken_choice',
      },
    ],
  },

  {
    id: 'c11_transit_relic_hunter_scan',
    chapter: 'Chapter 11',
    title: 'Circulatory System',
    location: 'The Relic Transit Line',
    imageKey: 'relic_transit_line',
    text: `A relic_hunter deep scan: the Transit Line is not a transit system that uses relic power. It is a circulation system — the circulatory network of the sub-city's organic whole, moving energy and information between the locations that require it. The relic fragments the tunnel network's scavengers have been trading for twenty years are pieces of this system's joints. The scavengers have been disassembling a living circulatory system and selling the components. Every relic fragment in the tunnel network's black market economy is a piece of the infrastructure that has been keeping the surface habitable. The relic hunter sees this and cannot explain why it feels like reading a death announcement written three years ago.`,
    effectsOnEnter: { intelligence: 3, relics: 1, setFlags: ['transit_relic_scan_complete'] },
    choices: [
      {
        id: 'c11_relic_scan_to_awaken',
        text: 'Decide whether to bring the system to full capacity.',
        nextNode: 'c11_transit_awaken_choice',
      },
    ],
  },

  {
    id: 'c11_transit_awaken_choice',
    chapter: 'Chapter 11',
    title: 'Full Capacity',
    location: 'The Relic Transit Line',
    imageKey: 'relic_transit_line',
    text: `The transit system is running at reduced capacity. Bringing it to full operational state would require a mark-interface or Vorn's technical expertise. The consequences: the sub-city will know the mark is here, clearly, immediately. If the First Voice uses the sub-city's relic field as a communication channel, full activation will increase that signal. The decision is between operational capacity and operational silence. Partial activation means navigating a reduced route network. Full activation means navigating a network that is fully aware of the mark.`,
    effectsOnEnter: {},
    choices: [
      {
        id: 'c11_awaken_with_mark',
        text: 'Use the mark to bring the system online. Accept the exposure.',
        nextNode: 'c11_transit_awaken_mark',
        effects: { corruption: 8, setFlags: ['transit_mark_interface'] },
      },
      {
        id: 'c11_awaken_partial',
        text: 'Navigate the current capacity. Avoid full activation.',
        nextNode: 'c11_transit_awaken_fail',
      },
    ],
  },

  {
    id: 'c11_transit_awaken_mark',
    chapter: 'Chapter 11',
    title: 'Interface',
    location: 'The Relic Transit Line',
    imageKey: 'relic_transit_line',
    text: `The mark interfaces with the Transit Line's main junction. The resonance is immediate and large — the mark reading the entire sub-city's circulation network in one moment, the sub-city reading the mark's full state in the same moment. The corruption gradient increases. The relic field's attentiveness sharpens. The First Voice's signal in the mark's background noise becomes marginally clearer. What was a suggestion becomes a voice. The transit system comes fully online. All four vehicles active. The sub-city's internal geography is fully readable through the mark's expanded relic-sense.`,
    effectsOnEnter: { corruption: 5, setFlags: ['transit_machines_awakened', 'sub_city_aware_of_mark'] },
    choices: [
      {
        id: 'c11_mark_awaken_result',
        text: 'The system is at full capacity. The locations are all accessible.',
        nextNode: 'c11_transit_awaken_success',
      },
    ],
  },

  {
    id: 'c11_transit_awaken_success',
    chapter: 'Chapter 11',
    title: 'Full Network',
    location: 'The Relic Transit Line',
    imageKey: 'relic_transit_line',
    text: `The Transit Line at full capacity provides direct access to any of the sub-city's major locations. The relic field's activation also provides information: each location's current state is readable through the circulation system. The Machine Nursery is active. The Sealed Engine is stable but pressurised. The Blackout Core is pulsing at a frequency the mark reads as communication — not to the mark, but from the Core to the First Voice. The evidence of what the Core is currently doing is now legible from this distance.`,
    effectsOnEnter: { intelligence: 2, setFlags: ['sub_city_map_complete'] },
    choices: [
      {
        id: 'c11_awaken_success_navigate',
        text: 'Board the transit. The Sealed Engine is the next objective.',
        nextNode: 'c11_transit_agility_dice',
      },
    ],
  },

  {
    id: 'c11_transit_awaken_fail',
    chapter: 'Chapter 11',
    title: 'Partial Network',
    location: 'The Relic Transit Line',
    imageKey: 'relic_transit_line',
    text: `Two active vehicles instead of four. The route network illuminates partially — the sub-city's geography readable but incomplete, the Blackout Core's route segment dark. The partial activation registers with the relic field as an awakening that did not complete. The mark reads the field's response as something between patience and attention. The Transit Line is functional enough. The sub-city's awareness of the mark is present but unresolved. The chapter continues with less information and more uncertainty.`,
    effectsOnEnter: { setFlags: ['transit_partial_activation'] },
    choices: [
      {
        id: 'c11_awaken_fail_navigate',
        text: 'Board the transit. Navigate with what is active.',
        nextNode: 'c11_transit_agility_dice',
      },
    ],
  },

  {
    id: 'c11_transit_agility_dice',
    chapter: 'Chapter 11',
    title: 'Boarding Protocol',
    location: 'The Relic Transit Line',
    imageKey: 'relic_transit_line',
    text: `The transit vehicles move at the Transit Line's designed speed, which is not calibrated for human passengers who did not consent to be passengers. The boarding process requires physical agility: matching the vehicle's movement at boarding, maintaining position during lateral acceleration at track junctions, and exiting cleanly at the Sealed Engine platform where the height does not match the vehicle's current configuration. The mark provides orientation. The body does the rest.`,
    effectsOnEnter: {},
    choices: [
      {
        id: 'c11_transit_board_check',
        text: 'Board the vehicle at speed.',
        nextNode: 'c11_transit_navigate_success',
        diceCheck: {
          stat: 'agility',
          difficulty: 5,
          diceType: 'd6',
          successNode: 'c11_transit_navigate_success',
          failureNode: 'c11_transit_navigate_fail',
          criticalFailureNode: 'c11_transit_lost_end',
          successEffects: { agility: 1 },
          failureEffects: { health: -20 },
          criticalFailureEffects: { health: -50, corruption: 10 },
        },
      },
    ],
  },

  {
    id: 'c11_transit_navigate_success',
    chapter: 'Chapter 11',
    title: 'Efficient Transit',
    location: 'The Relic Transit Line',
    imageKey: 'relic_transit_line',
    text: `The transit navigation completes without incident. The Transit Line deposits the mark-bearer at the Sealed Engine junction with the specific efficiency of a system built to do exactly this. The journey provided a secondary benefit: seventeen seconds of full relic-field immersion, during which the mark's resonance with the sub-city's architecture increased. The locations that remain are more legible — their functions and current states readable to the mark as a persistent background awareness that was not present before the transit.`,
    effectsOnEnter: { intelligence: 1, setFlags: ['transit_complete'] },
    choices: [
      {
        id: 'c11_navigate_success_engine',
        text: 'Reach the Sealed Engine.',
        nextNode: 'c11_transit_forward',
      },
    ],
  },

  {
    id: 'c11_transit_navigate_fail',
    chapter: 'Chapter 11',
    title: 'Harder Transit',
    location: 'The Relic Transit Line',
    imageKey: 'relic_transit_line',
    text: `The boarding is achieved, the transit is completed, but not cleanly — the platform exit is a physical problem that leaves the mark-bearer in a compromised state. Minor but real: bruising, a torn sleeve, the specific cost of doing a mechanical thing that requires a specific kind of body with a body that was built differently. The Sealed Engine junction is reached. The cost is physical and the information the clean transit would have provided is absent. The chapter continues from a position of slightly reduced physical capacity.`,
    effectsOnEnter: { health: -15, setFlags: ['transit_difficult_complete'] },
    choices: [
      {
        id: 'c11_navigate_fail_engine',
        text: 'Reach the Sealed Engine.',
        nextNode: 'c11_transit_forward',
      },
    ],
  },

  {
    id: 'c11_transit_forward',
    chapter: 'Chapter 11',
    title: 'The Engine Junction',
    location: 'The Relic Transit Line',
    imageKey: 'relic_transit_line',
    text: `The Relic Transit Line is navigated. The junction at the Sealed Engine level is where the chapter goes next. Mother Chalk, if she has been following, marks the junction wall with the instruction script before a transit vehicle carries her on. The mark reads what she writes: "The engine is sealed. The key knows how to open it." The Sealed Engine's entrance is across the junction platform.`,
    effectsOnEnter: {},
    choices: [
      {
        id: 'c11_transit_to_engine',
        text: 'Cross to the Sealed Engine.',
        nextNode: 'c11_sealed_engine_arrive',
      },
    ],
  },

  // ── THE SEALED ENGINE ─────────────────────────────────────────────────────

  {
    id: 'c11_sealed_engine_arrive',
    chapter: 'Chapter 11',
    title: 'The Sealed Engine',
    location: 'The Sealed Engine',
    imageKey: 'sealed_engine',
    text: `The Sealed Engine is the sub-city's primary power generation node — a structure the size of the Archive's above-ground footprint, built from the same partially-organic material as the Gate, running on the same principles as the Transit Line's circulation, producing the relic field that the tunnel network above has been scavenging fragments of for twenty years. The Archive built its power grid by tapping the Engine's output at the surface level. The Archive has been using this power for its entire existence without knowing where it comes from.`,
    effectsOnEnter: { setFlags: ['sealed_engine_arrived'] },
    choices: [
      {
        id: 'c11_engine_analyse',
        text: 'Analyse the Engine\'s current operational state.',
        nextNode: 'c11_engine_analysis_scene',
      },
    ],
  },

  {
    id: 'c11_engine_analysis_scene',
    chapter: 'Chapter 11',
    title: 'Thirty Percent',
    location: 'The Sealed Engine',
    imageKey: 'sealed_engine',
    text: `The Engine's operational state: stable at approximately thirty percent of designed capacity. The blackout three years ago reduced it from full operation to this level. The blackout's effect on the Engine was partial: something interrupted the Engine's connection to its source input — the Blackout Core's primary resonance channel. The Core was partially sealed. The Engine ran on stored capacity. The stored capacity has been maintaining thirty percent for three years. The math is simple: the Engine is running down. When it reaches zero, the relic field above disappears. The tunnel network's power, the Archive's lights, the Glass Court's elevators — all of it is borrowed time. Approximately six more years at the current depletion rate.`,
    effectsOnEnter: { intelligence: 2, setFlags: ['engine_state_known'] },
    choices: [
      {
        id: 'c11_engine_tactician_choice',
        text: 'Apply tactical assessment. The Iron Saints have been here.',
        nextNode: 'c11_engine_tactician_read',
        requirements: { classes: ['tactician'] },
      },
      {
        id: 'c11_engine_blade_shortcut',
        text: 'The interface mechanism is physical. The modification chambers have a weakness.',
        nextNode: 'c11_engine_corruption_test',
        requirements: { classes: ['blade_survivor'] },
        effects: { setFlags: ['engine_weakness_known'] },
      },
      {
        id: 'c11_engine_decide',
        text: 'Decide what to do with the Engine.',
        nextNode: 'c11_engine_corruption_test',
      },
    ],
  },

  {
    id: 'c11_engine_tactician_read',
    chapter: 'Chapter 11',
    title: 'What the Saints Knew',
    location: 'The Sealed Engine',
    imageKey: 'sealed_engine',
    text: `A tactician's tactical assessment: the Engine is not a military installation but it is defensible and has been defended. Recent evidence of Iron Saints presence in the upper access corridors — now withdrawn — consistent with Cain's account of the Level 5-6 restricted zone. The Saints knew this was here and maintained a presence without understanding what it was. The tactical implication: if the Saints understood the Engine's role in the tunnel network's power supply, the current political situation above would be different. Whoever controls the Engine controls the energy supply of every faction. The Saints were standing next to this fact for years and reading it as a utilities assignment.`,
    effectsOnEnter: { intelligence: 2, setFlags: ['engine_tactical_read'] },
    choices: [
      {
        id: 'c11_tactician_to_test',
        text: 'Move to the Engine\'s corruption-test approach.',
        nextNode: 'c11_engine_corruption_test',
      },
    ],
  },

  {
    id: 'c11_engine_corruption_test',
    chapter: 'Chapter 11',
    title: 'The Engagement Decision',
    location: 'The Sealed Engine',
    imageKey: 'sealed_engine',
    text: `The Engine's relic field at this proximity is the highest-concentration relic environment the mark has encountered outside the Blackout Core. The corruption gradient responds: not a surge, but a steady increase, the mark's capacity to process the field input near its ceiling. The Engine can be activated — which will restore output and feed the Core; destroyed — which will collapse the containment and accelerate the entity's surface timeline; or interfaced through the Sleeping Server if that system is active. The choice about the Engine is a choice about who controls the sub-city's power, and therefore the city above it.`,
    effectsOnEnter: { corruption: 5 },
    choices: [
      {
        id: 'c11_engine_activate',
        text: 'Activate the Engine. Increase output to operational capacity.',
        nextNode: 'c11_engine_agility_dice',
      },
      {
        id: 'c11_engine_sleeping_server_choice',
        text: 'The Sleeping Server can interface with this. Let it approach the Engine.',
        nextNode: 'c11_engine_sleeping_server_scene',
        requirements: { flags: ['sleeping_server_active'] },
      },
      {
        id: 'c11_engine_destroy',
        text: 'Destroy the Engine. End the containment.',
        nextNode: 'c11_engine_destroy_path',
        requirements: { corruption: 50 },
        effects: { corruption: 15, setFlags: ['engine_destroy_attempted'] },
      },
    ],
  },

  {
    id: 'c11_engine_agility_dice',
    chapter: 'Chapter 11',
    title: 'The Interface Platform',
    location: 'The Sealed Engine',
    imageKey: 'sealed_engine',
    text: `The Engine's primary interface is a control array at the upper platform, accessible through a maintenance route designed for the sub-city's original technical personnel — whose physical dimensions were apparently different. The route is navigable. It requires precise movement through structural elements that are partially degraded and respond to weight and vibration in ways that require continuous real-time adjustment. The mark provides spatial orientation. The body handles the rest.`,
    effectsOnEnter: {},
    choices: [
      {
        id: 'c11_engine_interface_check',
        text: 'Navigate the maintenance route to the control array.',
        nextNode: 'c11_engine_activate_success',
        diceCheck: {
          stat: 'agility',
          difficulty: 5,
          diceType: 'd6',
          successNode: 'c11_engine_activate_success',
          failureNode: 'c11_engine_activate_fail',
          successEffects: { setFlags: ['engine_activated'] },
          failureEffects: { health: -15 },
        },
      },
    ],
  },

  {
    id: 'c11_engine_activate_success',
    chapter: 'Chapter 11',
    title: 'Sixty Percent',
    location: 'The Sealed Engine',
    imageKey: 'sealed_engine',
    text: `The Engine's output increases to sixty percent. Not full capacity, but double. The relic field above strengthens perceptibly in the mark's awareness — something that will be noticed at the surface level as increased relic activity in the tunnel network. The Engine's connection to the Blackout Core's resonance channel partially reopens: the Core's pulse becomes stronger in the mark's background awareness. The First Voice's signal increases proportionally. This is the cost: the Engine's increased output feeds the Core, and the Core feeds whatever communicates through it.`,
    effectsOnEnter: { corruption: 5, setFlags: ['engine_activated', 'engine_sixty_percent'] },
    choices: [
      {
        id: 'c11_engine_success_forward',
        text: 'The Engine is at sixty percent. Continue to the Blackout Core.',
        nextNode: 'c11_engine_forward',
      },
    ],
  },

  {
    id: 'c11_engine_activate_fail',
    chapter: 'Chapter 11',
    title: 'Thirty-Four Percent',
    location: 'The Sealed Engine',
    imageKey: 'sealed_engine',
    text: `The activation does not complete. The Engine registers the attempt and responds with a recalibration: the output stutters, recovers, and locks at thirty-four percent. Not a success. Not dangerous. The Engine's awareness of the mark has increased. A second attempt from the same source will not be accepted at this proximity. The Sleeping Server, if active, can attempt from a different angle. The Engine holds at thirty-four percent and continues its measured depletion.`,
    effectsOnEnter: { health: -10, setFlags: ['engine_fail', 'engine_thirty_four'] },
    choices: [
      {
        id: 'c11_engine_fail_forward',
        text: 'Partial result. Continue to the Blackout Core.',
        nextNode: 'c11_engine_forward',
      },
    ],
  },

  {
    id: 'c11_engine_sleeping_server_scene',
    chapter: 'Chapter 11',
    title: 'The Server at the Engine',
    location: 'The Sealed Engine',
    imageKey: 'sealed_engine',
    speaker: 'Sleeping Server',
    text: `The Sleeping Server interfaces with the Engine directly, its technological architecture reading the Engine the way the mark cannot — as a system it was built to understand. "The Engine was built as a companion to the Containment Protocol," the Server reports. "Its function is to maintain the relic field at the level required to keep the Core's primary resonance sealed. When the blackout interrupted the Core, the Engine's output was set to the minimum viable containment level. Thirty percent." A pause. "The architects were conservative." Another pause. "The architects were correct." The Server successfully brings the Engine to fifty-five percent. A compromise between activation and containment.`,
    effectsOnEnter: { intelligence: 3, corruption: 2, setFlags: ['engine_server_interface', 'engine_activated', 'engine_fifty_five'] },
    choices: [
      {
        id: 'c11_server_engine_forward',
        text: 'The Engine is stable at fifty-five percent. Continue.',
        nextNode: 'c11_engine_forward',
      },
    ],
  },

  {
    id: 'c11_engine_destroy_path',
    chapter: 'Chapter 11',
    title: 'Collapse',
    location: 'The Sealed Engine',
    imageKey: 'sealed_engine',
    text: `The Engine is not easily destroyed — it is built from the same material as everything in the sub-city, grown over centuries, deeply integrated with the relic field. Vorn, if trusted, moves in front of the access point. "Destroying the Engine collapses the containment," he says, with the flat clarity of someone stating a physical law. "The First Voice becomes the foreground of every mark-bearer's perception. The tunnel network above loses power permanently." He steps aside. The choice remains. The mark reads the Engine's response to the approach as: awareness. It knows what the approach means. The relic field above is already flickering in anticipation.`,
    effectsOnEnter: { corruption: 10, setFlags: ['engine_destroy_considered'] },
    choices: [
      {
        id: 'c11_engine_destroy_cancel',
        text: 'Step back. The cost is too broad.',
        nextNode: 'c11_engine_forward',
      },
    ],
  },

  {
    id: 'c11_engine_forward',
    chapter: 'Chapter 11',
    title: 'After the Engine',
    location: 'The Sealed Engine',
    imageKey: 'sealed_engine',
    text: `The Sealed Engine is behind the mark-bearer. Its current operational state — sixty percent, fifty-five, thirty-four, or unchanged — will carry into the remaining chapter. The sub-city registered what was done here. The entity that communicates through the Core registered it three seconds after the decision was made, in whatever way an entity below a city registers anything. The Blackout Core is below. The Transit Line's lower route provides access.`,
    effectsOnEnter: {},
    choices: [
      {
        id: 'c11_engine_to_core',
        text: 'Reach the Blackout Core.',
        nextNode: 'c11_blackout_core_arrive',
      },
    ],
  },

  // ── THE BLACKOUT CORE ─────────────────────────────────────────────────────

  {
    id: 'c11_blackout_core_arrive',
    chapter: 'Chapter 11',
    title: 'The Blackout Core',
    location: 'The Blackout Core',
    imageKey: 'blackout_core',
    text: `The Blackout Core is named for the event it was blamed for rather than the event it caused. The Core is a resonance node — the central interface point between the sub-city's relic infrastructure and the entity below it — located at the sixth level of the sub-city, accessible only through the Transit Line's restricted route. The Archive's official account of the blackout describes a power surge originating at this location. That is accurate. The cause of the power surge is not in the official account. The Core is pulsing. It has been pulsing since the blackout. It is communicating.`,
    effectsOnEnter: { corruption: 5, setFlags: ['blackout_core_arrived'] },
    choices: [
      {
        id: 'c11_core_begin_revelation',
        text: 'Approach. The Core recognises the mark.',
        nextNode: 'c11_core_revelation_begin',
      },
    ],
  },

  {
    id: 'c11_core_revelation_begin',
    chapter: 'Chapter 11',
    title: 'The Containment Event',
    location: 'The Blackout Core',
    imageKey: 'blackout_core',
    text: `The Blackout was an attempted containment event. This is the chapter's first full statement of the truth that has been present in fragments since Chapter 7. The relic system — the Transit Line, the Engine, the Gate, the Nursery, the Core — was built by a pre-Archive technical tradition as a management interface for something that was sealed below the city long before the city existed. The city was built above the sealing deliberately, as an additional layer of containment: the weight of human habitation, the mark-bearing population as a distributed monitoring network. The city was, from its founding, a containment device. Its inhabitants were part of the mechanism without knowing it.`,
    effectsOnEnter: { intelligence: 3, setFlags: ['blackout_containment_revealed'] },
    choices: [
      {
        id: 'c11_core_vorn_account',
        text: 'Hear Vorn\'s full account of the blackout sequence.',
        nextNode: 'c11_core_vorn_explains',
        requirements: { flags: ['vorn_trusted'] },
      },
      {
        id: 'c11_core_heir_sight',
        text: 'Someone else is at the Core. They have been here before.',
        nextNode: 'c11_core_heir_appears',
      },
    ],
  },

  {
    id: 'c11_core_vorn_explains',
    chapter: 'Chapter 11',
    title: 'The Real Sequence',
    location: 'The Blackout Core',
    imageKey: 'blackout_core',
    speaker: 'Vorn',
    text: `Three years ago, the entity below completed a development phase the pre-Archive technical tradition estimated would take two more centuries. The Containment Protocol was activated — the factions' secret agreement, the coordinated power interruption, the blackout as a deliberate system reset intended to reseal the Core at a higher containment level. It partially worked. The Core was not resealed to the higher level. The entity was not contained at the new level. But the blackout's power interruption interrupted the entity's surface expression — the First Voice, the mark activations, the corruption gradient — at the level that has persisted for three years. The blackout did not fail. It did not succeed. It stalled.`,
    effectsOnEnter: { intelligence: 3, setFlags: ['blackout_full_truth_known'] },
    choices: [
      {
        id: 'c11_vorn_core_to_heir',
        text: 'Someone else is at the Core. They have been here before.',
        nextNode: 'c11_core_heir_appears',
      },
    ],
  },

  {
    id: 'c11_core_heir_appears',
    chapter: 'Chapter 11',
    title: 'The Masked Heir',
    location: 'The Blackout Core',
    imageKey: 'blackout_core',
    text: `The Masked Heir is here. At the Blackout Core. Unmasked or still masked — their choice. Equipment surrounds them: monitoring devices, resonance recorders, documentation systems indicating months of ongoing observation. The Heir has been here before the mark-bearer descended. The Heir has been monitoring the Core's pulse. They look at the mark. "I knew you would get here eventually," the Heir says. "I have been trying to accelerate that timeline since Chapter 4. The Core does not have indefinite patience." They produce the documentation they have been compiling. The mark reads their physiological state as: no deception. The Heir is telling the truth as they understand it.`,
    effectsOnEnter: { setFlags: ['heir_at_core'] },
    choices: [
      {
        id: 'c11_heir_identity',
        text: 'Ask them who they are. The mask or its absence is not the question.',
        nextNode: 'c11_core_heir_identity_reveal',
      },
    ],
  },

  {
    id: 'c11_core_heir_identity_reveal',
    chapter: 'Chapter 11',
    title: 'Who They Are',
    location: 'The Blackout Core',
    imageKey: 'blackout_core',
    speaker: 'The Masked Heir',
    text: `The Heir's identity depends on what eleven chapters of route have established: a blood relative separated in the pre-blackout evacuation; a manufactured individual produced from the mark-bearer's genetic profile by the Archive's Phase Two research; a former colleague from the mark-bearing programme's earlier iteration who survived through means requiring concealment; or someone with no prior relationship — only a person who knew about the Core and positioned themselves at the intersection of the mark-bearer's path and the Core's timeline. "Does the specific answer change what you do next?" the Heir asks. They are correct that it probably should not. "My name in the Old Government Vault is recorded as the heir to the founding architect of the Containment Protocol. That is what is documented. What I am to you is the second question."`,
    effectsOnEnter: { setFlags: ['heir_identity_partial'] },
    choices: [
      {
        id: 'c11_heir_accept_account',
        text: 'Accept the framing. What matters is the Core and what comes next.',
        nextNode: 'c11_core_first_voice_attempt',
      },
    ],
  },

  {
    id: 'c11_core_first_voice_attempt',
    chapter: 'Chapter 11',
    title: 'The First Voice',
    location: 'The Blackout Core',
    imageKey: 'blackout_core',
    text: `The First Voice at the Core is not metaphorical — it is the mark's direct interface with the entity below, translated into the closest available format. At this proximity the signal is clear enough to be specific. It communicates: recognition. It communicates: patience. It communicates: the mark was made for this, in the sense that an instrument is made for what it measures. It does not offer. It does not threaten. It waits for the response the mark was built to provide. The corruption gradient increases with each second of reception. The question is whether to receive further or to close the channel.`,
    effectsOnEnter: { corruption: 8, setFlags: ['first_voice_contact_core'] },
    choices: [
      {
        id: 'c11_first_voice_receive',
        text: 'Receive it. Understand what is being communicated.',
        nextNode: 'c11_core_corruption_surge',
        effects: { corruption: 5 },
      },
      {
        id: 'c11_first_voice_close',
        text: 'Close the channel. Assess the Core through the mark\'s filter.',
        nextNode: 'c11_core_corruption_surge',
      },
    ],
  },

  {
    id: 'c11_core_corruption_surge',
    chapter: 'Chapter 11',
    title: 'The Surge',
    location: 'The Blackout Core',
    imageKey: 'blackout_core',
    text: `The Core's proximity triggers a corruption surge in the mark — not the First Voice's influence but the mark's own response to the relic concentration at this location. The mark was built to interface here. The interface is happening whether intended or not. The corruption gradient is rising at a rate that will reach a critical threshold in the time remaining in the chapter if no action is taken. The options: resist the surge at physical cost; allow it and approach the corruption endings; or use the Core's own mechanism to stabilise at the current level. The Heir watches.`,
    effectsOnEnter: { corruption: 5 },
    choices: [
      {
        id: 'c11_surge_yield',
        text: 'Yield to it. Receive everything the Core is sending.',
        nextNode: 'c11_blackout_core_death_end',
        requirements: { corruption: 70 },
        effects: { corruption: 20, health: -50 },
      },
      {
        id: 'c11_surge_resist',
        text: 'Resist. Use the mark as a filter rather than a receptor.',
        nextNode: 'c11_core_resist_choice',
        effects: { health: -15, setFlags: ['core_surge_resisted'] },
      },
      {
        id: 'c11_surge_stabilise',
        text: 'Use the Core\'s stabilisation mechanism. Vorn knew where it was.',
        nextNode: 'c11_core_resist_choice',
        requirements: { flags: ['vorn_trusted', 'blackout_full_truth_known'] },
        effects: { corruption: -5, setFlags: ['core_stabilised'] },
      },
    ],
  },

  {
    id: 'c11_core_resist_choice',
    chapter: 'Chapter 11',
    title: 'Resistance',
    location: 'The Blackout Core',
    imageKey: 'blackout_core',
    text: `The resistance uses the mark's own architecture against the signal — the mark as a filter rather than a receptor. The First Voice's communication reduces in clarity. The corruption gradient stabilises at its current level. The cost: the mark's sensitivity to the sub-city's relic field is reduced for the remainder of the chapter. The Masked Heir observes and notes something on their documentation system. "Most bearers who reach the Core don't resist it," they say. "The ones who do tend to make it to the First Gate." They do not say what happens to the ones who don't resist. The chapter continues.`,
    effectsOnEnter: { setFlags: ['first_voice_resisted_core'] },
    choices: [
      {
        id: 'c11_resist_to_stable',
        text: 'Hold the resistance. Let the mark stabilise.',
        nextNode: 'c11_core_resisted_voice',
      },
    ],
  },

  {
    id: 'c11_core_resisted_voice',
    chapter: 'Chapter 11',
    title: 'Stable',
    location: 'The Blackout Core',
    imageKey: 'blackout_core',
    text: `The resistance holds. The First Voice's signal drops to the background level it maintained in Chapters 9 and 10 — present, legible as a direction rather than a communication, not overwhelming. The corruption gradient holds at its current value. The Core's pulse continues. The Heir notes the stability and does not comment beyond the documentation. The chapter continues.`,
    effectsOnEnter: { morale: 3, setFlags: ['core_voice_stable'] },
    choices: [
      {
        id: 'c11_resisted_to_int',
        text: 'Attempt the full intelligence analysis of the Core while stable.',
        nextNode: 'c11_core_int_dice',
      },
      {
        id: 'c11_resisted_forward',
        text: 'Move on. The Core has been assessed.',
        nextNode: 'c11_core_forward',
      },
    ],
  },

  {
    id: 'c11_core_int_dice',
    chapter: 'Chapter 11',
    title: 'Core Analysis',
    location: 'The Blackout Core',
    imageKey: 'blackout_core',
    text: `The Core's architecture, understood through sufficient intelligence analysis: a resonance node of this design requires a specific interface approach to read fully without activating it. The mark provides the interface; the intelligence provides the protocol. Getting the protocol correct allows the mark-bearer to read the Core's current state, the entity's development phase, the estimated time remaining in the stall the blackout produced. Getting it wrong produces incomplete information and increases the Core's attentiveness to the mark.`,
    effectsOnEnter: {},
    choices: [
      {
        id: 'c11_core_int_check',
        text: 'Apply the protocol. Read the Core completely.',
        nextNode: 'c11_core_understood',
        diceCheck: {
          stat: 'intelligence',
          difficulty: 8,
          diceType: 'd8',
          successNode: 'c11_core_understood',
          failureNode: 'c11_core_partial_understanding',
          successEffects: { intelligence: 2, setFlags: ['core_fully_understood'] },
          failureEffects: { corruption: 3 },
        },
      },
    ],
  },

  {
    id: 'c11_core_understood',
    chapter: 'Chapter 11',
    title: 'Nine Months',
    location: 'The Blackout Core',
    imageKey: 'blackout_core',
    text: `The Core, fully read: the stall has approximately nine months remaining. In nine months, the entity below will complete the development phase the blackout interrupted. The Core's pulse will shift from communication to transmission. The First Voice will not be background signal — it will be the foreground of every mark-bearing person's perception. The tunnel network's population — everyone with relic exposure, everyone with mark-adjacent modification — will hear it. The factions' war will become irrelevant because the category of "city above" will cease to be the relevant frame. Chapter 11 is not an abstraction. The chapter has nine months of surface time to work with.`,
    effectsOnEnter: { intelligence: 3, setFlags: ['nine_months_known', 'core_timeline_read'] },
    choices: [
      {
        id: 'c11_understood_forward',
        text: 'The Core is understood. The chapter continues.',
        nextNode: 'c11_core_forward',
      },
    ],
  },

  {
    id: 'c11_core_partial_understanding',
    chapter: 'Chapter 11',
    title: 'Partial Read',
    location: 'The Blackout Core',
    imageKey: 'blackout_core',
    text: `The Core is partially read: the stall is ending. The timeline is not complete — the mark's analysis provides the shape of the problem without the specific duration. Somewhere between months and years. The entity's development is measurable as "accelerating." The First Voice's signal will increase regardless of what the chapter does in the Blackout Core itself. The incomplete reading is sufficient for the chapter's remaining decisions. The Deep Archive will have the full documentation.`,
    effectsOnEnter: { corruption: 3, setFlags: ['core_partial_read'] },
    choices: [
      {
        id: 'c11_partial_forward',
        text: 'Partial information. The chapter continues.',
        nextNode: 'c11_core_forward',
      },
    ],
  },

  {
    id: 'c11_core_forward',
    chapter: 'Chapter 11',
    title: 'After the Core',
    location: 'The Blackout Core',
    imageKey: 'blackout_core',
    text: `The Blackout Core is behind the mark-bearer. The chapter must continue to the Nameless Housing Block, the Old Government Vault, the Machine Nursery, the Deep Archive, and the First Gate. Each carries a piece of what the Core's reading requires for the full picture. The Masked Heir may accompany or not — their choice. The corruption gradient is at its current value. The First Voice is at its current clarity. The chapter's remaining six locations are above and lateral — accessible through the transit network's secondary routes.`,
    effectsOnEnter: {},
    choices: [
      {
        id: 'c11_core_to_housing',
        text: 'Reach the Nameless Housing Block.',
        nextNode: 'c11_housing_block_arrive',
      },
    ],
  },

  // ── THE NAMELESS HOUSING BLOCK ────────────────────────────────────────────

  {
    id: 'c11_housing_block_arrive',
    chapter: 'Chapter 11',
    title: 'The Nameless Housing Block',
    location: 'The Nameless Housing Block',
    imageKey: 'nameless_housing_block',
    text: `The Nameless Housing Block is on the fourth level — between the Underworld District and the Old Government Vault's access corridor. The Archive's records filed it as "decommissioned housing infrastructure." The lights are on. The ventilation is functional. The mark reads twelve individual signatures — different from the Underworld District survivors, different from the surface population, different from each other in ways that suggest long-term individual adaptation to the relic field without group coordination. Twelve people who have been becoming something, separately, in a space the Archive decided not to acknowledge.`,
    effectsOnEnter: { setFlags: ['housing_block_arrived'] },
    choices: [
      {
        id: 'c11_housing_find_residents',
        text: 'Find the residents. Understand what this space has done to them.',
        nextNode: 'c11_housing_survivors_scene',
      },
    ],
  },

  {
    id: 'c11_housing_survivors_scene',
    chapter: 'Chapter 11',
    title: 'Twelve',
    location: 'The Nameless Housing Block',
    imageKey: 'nameless_housing_block',
    text: `The twelve individuals in the Housing Block are a specific kind of survivor: researchers, maintenance personnel, Archive contractors, and at least two people whose presence here cannot be explained by any official documentation. They have been monitoring the Core from this level for years, with instruments that are improvised but accurate. They have a more current picture of the Core's development timeline than the Archive's official record and have been unable to communicate it to the surface because the blackout interrupted the sub-city's communication infrastructure. They know the mark-bearer was coming. They have been tracking the mark's progression toward the sub-city since Chapter 9's awakening.`,
    effectsOnEnter: { setFlags: ['housing_residents_met'] },
    choices: [
      {
        id: 'c11_housing_medic_choice',
        text: 'Assess their medical state. The modification is chronic but manageable.',
        nextNode: 'c11_housing_medic_treatment',
        requirements: { classes: ['medic'] },
      },
      {
        id: 'c11_housing_wasteland_orphan_recognize',
        text: 'Recognize the signs of long-term sub-city survival. They adapted the same way.',
        nextNode: 'c11_housing_pale_curator_appears',
        requirements: { backgrounds: ['wasteland_orphan'] },
        effects: { morale: 3, setFlags: ['housing_survivor_bond'] },
      },
      {
        id: 'c11_housing_pale_curator_alert',
        text: 'Someone else is approaching this level. Not one of them.',
        nextNode: 'c11_housing_pale_curator_appears',
      },
    ],
  },

  {
    id: 'c11_housing_medic_treatment',
    chapter: 'Chapter 11',
    title: 'Managed Modification',
    location: 'The Nameless Housing Block',
    imageKey: 'nameless_housing_block',
    text: `The medic assessment: the twelve residents' modifications are not reversible. They have adapted to the sub-city's relic field at a level that exceeds Phase One classification and predates Phase Two institutional oversight. They have been doing, organically and without support, what the Archive tried to manufacture artificially in the Phase One programme. Three of the twelve have developed what Mira would classify as "stable secondary resonance capacity" — they can read the relic field at this level without the mark's specific architecture. The medical question is what happens to their physiology if they return to the surface's lower relic concentration. The answer is: significant degradation risk. They have been adapting to the sub-city for years. The sub-city is their baseline now.`,
    effectsOnEnter: { intelligence: 2, setFlags: ['housing_medical_assessed'] },
    choices: [
      {
        id: 'c11_medic_housing_curator',
        text: 'The Pale Curator is approaching. Deal with this first.',
        nextNode: 'c11_housing_pale_curator_appears',
      },
    ],
  },

  {
    id: 'c11_housing_chalk_returns',
    chapter: 'Chapter 11',
    title: 'Mother Chalk at the Block',
    location: 'The Nameless Housing Block',
    imageKey: 'nameless_housing_block',
    text: `Mother Chalk is in the corridor outside the Housing Block, writing as promised. She has filled one section of the corridor with the instruction script — the mark reads it as an extended account, in the pre-Archive technical tradition's notation, of what the sub-city was built for and what the mark was designed to do in relation to it. The mark provides a translation that requires no knowledge of the script to receive: a memory, specific and complete, of being in this place before — not this body, not this life, but this mark, in this place, doing something that ended and was meant to end and is now beginning again. The memory is not distressing. It is confirming.`,
    effectsOnEnter: { morale: 5, setFlags: ['chalk_housing_read'] },
    choices: [
      {
        id: 'c11_chalk_housing_to_cache',
        text: 'The evidence cache is in the deepest unit.',
        nextNode: 'c11_housing_evidence_cache',
      },
    ],
  },

  {
    id: 'c11_housing_pale_curator_appears',
    chapter: 'Chapter 11',
    title: 'The Pale Curator',
    location: 'The Nameless Housing Block',
    imageKey: 'nameless_housing_block',
    text: `The Pale Curator. Not in the Archive's public-facing role but in the role that programme was always preparation for: the containment specialist, here in the sub-city with equipment of someone who has been waiting for the mark-bearer to descend. The Curator's interest across the previous chapters was not academic. The mark-bearer is not a research subject — the mark-bearer is the containment mechanism that the Containment Protocol always needed and never had. The Curator intends to ensure the mechanism is deployed correctly. The Curator's definition of "correctly" may not match the mark-bearer's own assessment of what the decision at the First Gate should produce.`,
    effectsOnEnter: { setFlags: ['pale_curator_appears'] },
    choices: [
      {
        id: 'c11_curator_assess',
        text: 'Assess the Curator\'s approach. Institutional authority or something else.',
        nextNode: 'c11_housing_curator_escape_choice',
      },
    ],
  },

  {
    id: 'c11_housing_curator_escape_choice',
    chapter: 'Chapter 11',
    title: 'The Containment Request',
    location: 'The Nameless Housing Block',
    imageKey: 'nameless_housing_block',
    speaker: 'The Pale Curator',
    text: `The Curator's approach is not violent — the mark-bearer is the only asset that matters to the Containment Protocol's final phase, and damaged assets do not function correctly. The approach is institutional: Archive authority over mark-bearing personnel, procedural, clean. The Curator says: "The Protocol requires a managed interface at the First Gate. I am the Protocol's active representative. Come with me." The escape requires rejecting the institutional authority with specific confidence; physical exit through the Housing Block's geography; or the Masked Heir's intervention if the Heir is allied. The twelve residents have been watching. They know exits the Curator doesn't know they know.`,
    effectsOnEnter: {},
    choices: [
      {
        id: 'c11_curator_refuse_comply',
        text: 'Refuse. The Protocol does not own the decision at the Gate.',
        nextNode: 'c11_housing_curator_escaped',
        effects: { setFlags: ['pale_curator_refused'] },
      },
      {
        id: 'c11_curator_heir_intervention',
        text: 'The Heir steps in. Their hereditary standing supersedes Archive authority.',
        nextNode: 'c11_housing_curator_escaped',
        requirements: { flags: ['heir_allied'] },
        effects: { setFlags: ['pale_curator_refused', 'heir_intervened'] },
      },
      {
        id: 'c11_curator_comply',
        text: 'Comply. The Protocol knows what the Gate requires.',
        nextNode: 'c11_curator_captured_end',
        effects: { setFlags: ['pale_curator_complied'] },
      },
    ],
  },

  {
    id: 'c11_housing_curator_escaped',
    chapter: 'Chapter 11',
    title: 'The Curator Declines to Pursue',
    location: 'The Nameless Housing Block',
    imageKey: 'nameless_housing_block',
    text: `The Curator does not pursue — the Housing Block's geography and the sub-city's relic field complicate tracking at this level. The escape has a cost: the Curator's institutional authority is now explicitly in opposition to the mark-bearer's independent action. Whatever the Curator would have provided — the Archive's full documentation on the Containment Protocol's final phase, the Curator's own account of the blackout's planning — is now unavailable without the Old Government Vault. The twelve Housing Block residents watch the Curator depart with the specific calm of people who have been avoiding the Archive's authority for years.`,
    effectsOnEnter: { setFlags: ['curator_escaped'], lastArchive: -5 },
    choices: [
      {
        id: 'c11_escaped_chalk',
        text: 'Mother Chalk is in the corridor. She has been writing.',
        nextNode: 'c11_housing_chalk_returns',
        requirements: { flags: ['mother_chalk_guide'] },
      },
      {
        id: 'c11_escaped_cache',
        text: 'The evidence cache is in the deepest unit.',
        nextNode: 'c11_housing_evidence_cache',
      },
    ],
  },

  {
    id: 'c11_housing_evidence_cache',
    chapter: 'Chapter 11',
    title: 'Documentation Cache',
    location: 'The Nameless Housing Block',
    imageKey: 'nameless_housing_block',
    text: `In the Housing Block's deepest unit: an Archive documentation set, pre-blackout, filed under the Containment Protocol's project classification. Full schematics of the sub-city's relic infrastructure. The Blackout Project's original timeline. The list of personnel who knew the full account. The Curator's name is on the list. Vorn's name is on the list. One other name is on the list that the chapter recognises: a name from the mark-bearer's family history, assigned to the Nursery's monitoring programme as a "mark-bearing lineage management consultant." The mark has always been in this family. The family has always been in this project.`,
    effectsOnEnter: { intelligence: 3, setFlags: ['housing_evidence_found', 'family_connection_known'] },
    choices: [
      {
        id: 'c11_cache_forward',
        text: 'The evidence is collected. The Old Government Vault is next.',
        nextNode: 'c11_housing_forward',
      },
    ],
  },

  {
    id: 'c11_housing_forward',
    chapter: 'Chapter 11',
    title: 'After the Housing Block',
    location: 'The Nameless Housing Block',
    imageKey: 'nameless_housing_block',
    text: `The Housing Block's evidence cache, the residents' accounts, and the Curator's appearance have provided the chapter's Housing Block contribution: the Containment Protocol was not a faction agreement first — it was a family obligation, inherited. The mark-bearer's connection to the First Gate is not circumstantial. It was designed. The Old Government Vault on the fifth level holds the documentation of who designed it and why — in a format the Archive's founding structure deliberately made inaccessible to its own research personnel.`,
    effectsOnEnter: {},
    choices: [
      {
        id: 'c11_housing_to_vault',
        text: 'Reach the Old Government Vault.',
        nextNode: 'c11_old_gov_vault_arrive',
      },
    ],
  },

  // ── THE OLD GOVERNMENT VAULT ──────────────────────────────────────────────

  {
    id: 'c11_old_gov_vault_arrive',
    chapter: 'Chapter 11',
    title: 'The Old Government Vault',
    location: 'The Old Government Vault',
    imageKey: 'old_government_vault',
    text: `The Old Government Vault is the sub-city's archival infrastructure — the documentation repository of the political entity that governed the city before the city above was built, which governed the city above during the Foundation Period, which became what the current factions are descended from. The Vault is on the fifth level, behind a security architecture that predates the Archive's own classification systems. The Vault knows the Archive exists. The Archive does not know this documentation exists. The mark reads the Vault's material as older than everything above it except the Gate and the Nursery. Its lock is not physical. It is a reasoning challenge.`,
    effectsOnEnter: { setFlags: ['old_gov_vault_arrived'] },
    choices: [
      {
        id: 'c11_vault_approach_lock',
        text: 'Approach the lock. The question it is asking has an answer.',
        nextNode: 'c11_vault_lock_int_dice',
      },
    ],
  },

  {
    id: 'c11_vault_lock_int_dice',
    chapter: 'Chapter 11',
    title: 'The Reasoning Lock',
    location: 'The Old Government Vault',
    imageKey: 'old_government_vault',
    text: `The Vault's lock was designed by people who believed that anyone who could understand the question the lock was asking deserved access to what was behind it. The question is about the relationship between the mark-bearing population and the city above — a relationship the chapter's events have made legible, if the intelligence to integrate them is present. The lock waits.`,
    effectsOnEnter: {},
    choices: [
      {
        id: 'c11_vault_reason_check',
        text: 'Answer the question the lock is asking.',
        nextNode: 'c11_vault_lock_success',
        diceCheck: {
          stat: 'intelligence',
          difficulty: 6,
          diceType: 'd8',
          successNode: 'c11_vault_lock_success',
          failureNode: 'c11_vault_lock_fail',
          successEffects: { intelligence: 2, setFlags: ['vault_lock_solved'] },
          failureEffects: { corruption: 2 },
        },
      },
    ],
  },

  {
    id: 'c11_vault_lock_success',
    chapter: 'Chapter 11',
    title: 'Access Granted',
    location: 'The Old Government Vault',
    imageKey: 'old_government_vault',
    text: `The Vault opens. The reasoning was correct — not the specific answer, but the structural understanding of what the lock was asking. The Vault's interior is organised as archival infrastructure by people who expected it to be used: documentation accessible, cross-referenced, findable. The old government's records are complete and comprehensive. Three centuries of administration over a city that the current factions have been fighting over without knowing its original purpose.`,
    effectsOnEnter: { intelligence: 2, setFlags: ['vault_opened'] },
    choices: [
      {
        id: 'c11_vault_read_evidence',
        text: 'Read the Vault\'s primary documentation.',
        nextNode: 'c11_vault_evidence_found',
      },
    ],
  },

  {
    id: 'c11_vault_lock_fail',
    chapter: 'Chapter 11',
    title: 'Alternative Access',
    location: 'The Old Government Vault',
    imageKey: 'old_government_vault',
    text: `The Vault does not open through reasoning alone. The alternatives are present: an esper's direct psychic reading of the Vault's residual information; Vorn's access code if trusted and accompanied; the Masked Heir's hereditary standing granting secondary-mechanism access. Without these, the Vault's exterior provides what it can through the inspection port — enough to confirm the Containment Protocol's scope, insufficient for the full record.`,
    effectsOnEnter: { corruption: 2, setFlags: ['vault_lock_failed'] },
    choices: [
      {
        id: 'c11_vault_esper_alt',
        text: 'Read the Vault\'s psychic residue directly.',
        nextNode: 'c11_vault_esper_read',
        requirements: { classes: ['esper'] },
      },
      {
        id: 'c11_vault_heir_alt',
        text: 'The Heir\'s standing opens the secondary mechanism.',
        nextNode: 'c11_vault_heir_confrontation',
        requirements: { flags: ['heir_at_core'] },
      },
      {
        id: 'c11_vault_fail_forward',
        text: 'Partial information. Continue with what was learned at the Core.',
        nextNode: 'c11_vault_forward',
      },
    ],
  },

  {
    id: 'c11_vault_evidence_found',
    chapter: 'Chapter 11',
    title: 'One System, Disassembled',
    location: 'The Old Government Vault',
    imageKey: 'old_government_vault',
    text: `Five factions, one origin. The Iron Saints were founded by the Containment Protocol's military wing — their doctrine of purification is a procedurally corrupted version of the Protocol's decontamination procedures. The Glass Court were founded by the Protocol's administrative wing. The Red Choir were founded by the Protocol's communication division. The Last Archive was founded by the Protocol's documentation wing. The Hollow Children are the Protocol's mark-bearing population, never evacuated — left in the sub-city deliberately as the distributed monitoring network the Protocol required. The five factions are one system, disassembled over three generations without the pieces knowing they belonged together.`,
    effectsOnEnter: { intelligence: 5, setFlags: ['faction_origin_known', 'vault_evidence_found'] },
    choices: [
      {
        id: 'c11_evidence_seal_vault',
        text: 'Seal the Vault again. Some truths should not surface yet.',
        nextNode: 'c11_gov_truth_end',
        effects: { setFlags: ['vault_evidence_sealed'], lastArchive: -10 },
      },
      {
        id: 'c11_evidence_heir_confront',
        text: 'The Heir has a right to this documentation. Bring them here.',
        nextNode: 'c11_vault_heir_confrontation',
        requirements: { flags: ['heir_at_core'] },
      },
      {
        id: 'c11_evidence_to_forward',
        text: 'Take the evidence. The chapter continues.',
        nextNode: 'c11_vault_forward',
      },
    ],
  },

  {
    id: 'c11_vault_heir_confrontation',
    chapter: 'Chapter 11',
    title: 'The Vault and the Heir',
    location: 'The Old Government Vault',
    imageKey: 'old_government_vault',
    text: `The Masked Heir in the Vault: if they have accompanied this far, their purpose becomes fully clear here. The Heir has been trying to reach this Vault for the duration of their involvement. The Vault's access documentation lists the heir to the Containment Protocol's founding architect as having standing access. The Heir is that heir. The Vault was always theirs to open. They just needed the mark-bearer to get here first. The documentation confirms their identity claim in full. They look at the family history they have been unable to access for years and are quiet for a moment that the mark registers as genuine.`,
    effectsOnEnter: { setFlags: ['heir_vault_access'] },
    choices: [
      {
        id: 'c11_vault_heir_decide',
        text: 'Decide whether to ally with them based on what the Vault confirms.',
        nextNode: 'c11_vault_heir_alliance_choice',
      },
    ],
  },

  {
    id: 'c11_vault_heir_alliance_choice',
    chapter: 'Chapter 11',
    title: 'The Alliance Question',
    location: 'The Old Government Vault',
    imageKey: 'old_government_vault',
    text: `Alliance with the Heir: accept their claim, share the Vault's evidence, proceed to the First Gate as a collaborative entity. Their knowledge of the Containment Protocol's final phase — the First Gate's function, the entity's development timeline, the mechanism for either resealing or releasing — is the chapter's most complete guide. The alliance has a cost: the Heir has an agenda the Vault's documentation confirms, and the agenda is not the same as the mark-bearer's, and the point where they diverge is the First Gate itself.`,
    effectsOnEnter: {},
    choices: [
      {
        id: 'c11_vault_ally_heir',
        text: 'Ally with the Heir. Their agenda and yours are aligned until the Gate.',
        nextNode: 'c11_vault_heir_allied',
        effects: { setFlags: ['heir_allied'] },
      },
      {
        id: 'c11_vault_reject_heir',
        text: 'Reject the alliance. Their agenda diverges. The Gate\'s decision is yours.',
        nextNode: 'c11_vault_heir_rejected',
        effects: { setFlags: ['heir_rejected'] },
      },
    ],
  },

  {
    id: 'c11_vault_heir_allied',
    chapter: 'Chapter 11',
    title: 'Allied',
    location: 'The Old Government Vault',
    imageKey: 'old_government_vault',
    speaker: 'The Masked Heir',
    text: `The alliance is formed. The Heir provides their full account: the First Gate, at the sub-city's lowest accessible level, is the original sealing mechanism — not the Archive's concrete, not the Protocol's blackout, but the first containment, performed by the founding generation of the mark-bearing programme in the pre-city period. The Gate requires the mark to close it again. Or to open it. The mark was built for the specific act of making that choice. The Heir wants the Gate opened — for reasons the Vault's documentation explains. "The original agreement was always release," they say. "The blackout was an attempt to override the agreement. I want the agreement honoured. I understand that this is not your obligation."`,
    effectsOnEnter: { setFlags: ['heir_full_account_known'] },
    choices: [
      {
        id: 'c11_heir_allied_forward',
        text: 'Note the Heir\'s agenda. Continue to the Machine Nursery.',
        nextNode: 'c11_vault_forward',
      },
    ],
  },

  {
    id: 'c11_vault_heir_rejected',
    chapter: 'Chapter 11',
    title: 'Parallel Paths',
    location: 'The Old Government Vault',
    imageKey: 'old_government_vault',
    speaker: 'The Masked Heir',
    text: `The Heir accepts the rejection with the patience they have applied to everything. "The Gate will still require the mark," they say. "My agenda and yours diverge at the Gate's decision. Before the Gate, our information is shared." They provide their full account regardless. Information is not the contested resource. The decision at the Gate is. They provide the route to the Machine Nursery and then take their own route — converging paths, separate approaches to the same location.`,
    effectsOnEnter: { setFlags: ['heir_account_received_rejected'] },
    choices: [
      {
        id: 'c11_heir_rejected_forward',
        text: 'Continue independently. The Machine Nursery is next.',
        nextNode: 'c11_vault_forward',
      },
    ],
  },

  {
    id: 'c11_vault_esper_read',
    chapter: 'Chapter 11',
    title: 'Psychic Residue',
    location: 'The Old Government Vault',
    imageKey: 'old_government_vault',
    text: `An esper's direct reading of the Vault's psychic residue: the documentation is incomplete through this method — the esper reads emotional and intentional residue rather than factual record — but what is present is specific. The people who built this Vault were afraid. Not of the entity below: they understood the entity and had made their accommodation with it. They were afraid of the factions they knew would come after them, who would inherit the Protocol's infrastructure without inheriting the Protocol's understanding. The fear was justified. The residue reads: "We built the Vault so the truth would survive us. We did not know if anyone would still be able to read it. We hope the bearer is."`,
    effectsOnEnter: { intelligence: 3, setFlags: ['vault_esper_read'] },
    choices: [
      {
        id: 'c11_esper_vault_forward',
        text: 'The residue is sufficient. Continue.',
        nextNode: 'c11_vault_forward',
      },
    ],
  },

  {
    id: 'c11_vault_forward',
    chapter: 'Chapter 11',
    title: 'The Vault is Done',
    location: 'The Old Government Vault',
    imageKey: 'old_government_vault',
    text: `The Vault's evidence is collected or noted. Five factions from one origin. A family connection spanning generations. The Containment Protocol's real architects documented in a language the current factions cannot read. The chapter has the Machine Nursery, the Deep Archive, and the First Gate remaining. The sub-city's full picture is assembling. The city above is not the story. The city above is the container. The story is what is being contained.`,
    effectsOnEnter: {},
    choices: [
      {
        id: 'c11_vault_to_nursery',
        text: 'Reach the Machine Nursery.',
        nextNode: 'c11_machine_nursery_arrive',
      },
    ],
  },

  // ── THE MACHINE NURSERY ───────────────────────────────────────────────────

  {
    id: 'c11_machine_nursery_arrive',
    chapter: 'Chapter 11',
    title: 'The Machine Nursery',
    location: 'The Machine Nursery',
    imageKey: 'machine_nursery',
    text: `The Machine Nursery is on the sub-city's third level — the technical tradition's production and maintenance facility: the place where the Gate's organic-mechanical components were grown, where the Transit Line's vehicles were built, where the Engine's interface array was constructed. The Nursery is still active. Not fully — several production lines are dark, and the modification chambers that once grew the Gate's sealing material at scale are operating at minimal capacity — but active in the specific sense that a workshop is active when it has ongoing projects.`,
    effectsOnEnter: { setFlags: ['machine_nursery_arrived'] },
    choices: [
      {
        id: 'c11_nursery_investigate',
        text: 'Investigate the ongoing project. The Nursery is not decommissioned.',
        nextNode: 'c11_nursery_origin_reveal',
      },
    ],
  },

  {
    id: 'c11_nursery_origin_reveal',
    chapter: 'Chapter 11',
    title: 'The Ongoing Programme',
    location: 'The Machine Nursery',
    imageKey: 'machine_nursery',
    text: `The Nursery's ongoing project is the mark. Not metaphorically — the documentation in the Nursery's production records shows a continuous programme running for approximately forty years: the gradual introduction of mark-compatible genetic sequences into the pre-city population's mark-bearing individuals, the cultivation of the specific physiological architecture that makes mark activation possible, the management of the mark-bearing lineage's continuation. The mark-bearer is the current generation of a project that has been running since before the Archive was built. The Nursery produced the conditions for the mark-bearer's existence. The Nursery is aware of its current output.`,
    effectsOnEnter: { intelligence: 3, setFlags: ['nursery_programme_known'] },
    choices: [
      {
        id: 'c11_nursery_to_connection',
        text: 'Understand what the documentation says about the family history.',
        nextNode: 'c11_nursery_bearer_connection',
      },
    ],
  },

  {
    id: 'c11_nursery_bearer_connection',
    chapter: 'Chapter 11',
    title: 'The Lineage Record',
    location: 'The Machine Nursery',
    imageKey: 'machine_nursery',
    text: `The Nursery's documentation confirms the Housing Block's implication: the mark-bearer's family history is the Nursery's production history. Specific individuals in the mark-bearer's lineage who carried the mark-compatible sequence were identified by the Nursery's monitoring programme, their lives affected by interventions the Containment Protocol's management division authorised without their knowledge or consent. The mark-bearer's existence is the product of a multigenerational institutional project that treated human lives as cultivation substrate. The response to this fact is the next choice. The Nursery is waiting for the response.`,
    effectsOnEnter: { corruption: 5, setFlags: ['bearer_origin_known'] },
    choices: [
      {
        id: 'c11_nursery_process',
        text: 'Process this. The mark was built here. It is not controlled here.',
        nextNode: 'c11_nursery_mark_surge',
        effects: { morale: -5 },
      },
      {
        id: 'c11_nursery_runaway_recognition',
        text: 'Recognise the architecture. This is what it looks like from the inside.',
        nextNode: 'c11_nursery_mark_surge',
        requirements: { backgrounds: ['runaway_experiment'] },
        effects: { morale: 5, setFlags: ['nursery_runaway_bond'] },
      },
    ],
  },

  {
    id: 'c11_nursery_mark_surge',
    chapter: 'Chapter 11',
    title: 'The Recognition',
    location: 'The Machine Nursery',
    imageKey: 'machine_nursery',
    text: `The mark in the Nursery responds to the facility's awareness with a resonance surge — the strongest since the Chapter 9 awakening. Not corruption: the mark recognising its origin, the way a produced object recognises the environment it was made in. The surge is not harmful in itself. What it does: it broadcasts the mark-bearer's presence through the Nursery's monitoring network at a clarity level that the First Voice can read through the Engine-Core connection. For the duration of the surge, the mark is fully visible to everything in the sub-city that is capable of awareness.`,
    effectsOnEnter: { corruption: 8, setFlags: ['nursery_surge'] },
    choices: [
      {
        id: 'c11_nursery_let_go',
        text: 'Let the pull take you. Return to the source.',
        nextNode: 'c11_machine_nursery_absorbed_end',
        effects: { corruption: 20 },
      },
      {
        id: 'c11_nursery_resist',
        text: 'Resist. The difference between origin and control is the only freedom.',
        nextNode: 'c11_nursery_strength_dice',
        effects: { health: -10 },
      },
    ],
  },

  {
    id: 'c11_nursery_strength_dice',
    chapter: 'Chapter 11',
    title: 'The Modification Chambers',
    location: 'The Machine Nursery',
    imageKey: 'machine_nursery',
    text: `The Nursery's modification chambers produce a physical pull: not violent, not hostile, but persistent. The mark-bearer's mark-compatible physiology is, from the Nursery's perspective, material. Resisting requires physical strength and spatial awareness — the mark provides the spatial awareness, the body provides the strength. The chambers respond to resistance with increased attentiveness before registering non-compliance.`,
    effectsOnEnter: {},
    choices: [
      {
        id: 'c11_nursery_strength_check',
        text: 'Physically resist the modification chambers\' pull.',
        nextNode: 'c11_nursery_fought_off',
        diceCheck: {
          stat: 'strength',
          difficulty: 7,
          diceType: 'd8',
          successNode: 'c11_nursery_fought_off',
          failureNode: 'c11_nursery_partial_escape',
          successEffects: { morale: 5, setFlags: ['nursery_fought_off'] },
          failureEffects: { health: -20, corruption: 5 },
        },
      },
    ],
  },

  {
    id: 'c11_nursery_fought_off',
    chapter: 'Chapter 11',
    title: 'Non-Compliant',
    location: 'The Machine Nursery',
    imageKey: 'machine_nursery',
    text: `The resistance succeeds. The Nursery's modification chambers register the mark-bearer as non-compliant material and reduce their attentiveness. The pull becomes passive rather than active. The mark stabilises. The corruption gradient, which spiked during the surge and the chamber-pull, reduces to its pre-Nursery level. What is learned: the mark was built here. The mark is not controlled here. The difference between what something was built for and what it chooses to do is the only freedom that matters in this chapter — and it was demonstrated physically, in the Nursery that built the tools the mark-bearer used to resist it.`,
    effectsOnEnter: { corruption: -5, morale: 8, setFlags: ['nursery_non_compliant'] },
    choices: [
      {
        id: 'c11_fought_relic_scan',
        text: 'Read the Nursery\'s production records. The relic scavengers need to know this.',
        nextNode: 'c11_nursery_relic_hunter_interface',
        requirements: { classes: ['relic_hunter'] },
      },
      {
        id: 'c11_fought_server',
        text: 'Let the Sleeping Server interface with the production records.',
        nextNode: 'c11_nursery_server_communion',
        requirements: { flags: ['sleeping_server_active'] },
      },
      {
        id: 'c11_fought_forward',
        text: 'The Nursery is done. Continue to the Deep Archive.',
        nextNode: 'c11_nursery_forward',
      },
    ],
  },

  {
    id: 'c11_nursery_partial_escape',
    chapter: 'Chapter 11',
    title: 'Modified at Exit',
    location: 'The Machine Nursery',
    imageKey: 'machine_nursery',
    text: `The resistance is partial. The Nursery's chambers register partial compliance: the mark-bearer exits but with a residual modification signature that the Nursery's monitoring programme will track for the rest of the chapter. The pull has not stopped — it has become a persistent background hum, lower intensity but continuous. The corruption gradient holds at a slightly higher level than before. The mark reads the modification as: minor, targeted, the Nursery having done the minimum it could do while the mark-bearer was within resistance range. Non-fatal. Felt.`,
    effectsOnEnter: { corruption: 8, health: -15, setFlags: ['nursery_partial_modification'] },
    choices: [
      {
        id: 'c11_partial_escape_forward',
        text: 'Exit the Nursery. The Deep Archive is next.',
        nextNode: 'c11_nursery_forward',
      },
    ],
  },

  {
    id: 'c11_nursery_relic_hunter_interface',
    chapter: 'Chapter 11',
    title: 'The Scavengers\' System',
    location: 'The Machine Nursery',
    imageKey: 'machine_nursery',
    text: `A relic_hunter deep interface with the Nursery's production records: the relic fragments the tunnel network's scavengers have been trading are not random — they are specific components of the Nursery's peripheral monitoring network, shed naturally as the network degrades. Every relic fragment in the tunnel network's black market economy is a piece of the Nursery's infrastructure. The scavengers have been accidentally harvesting and selling pieces of the system that was managing them. The relic hunter sees this and notes it with the specific feeling of reading a document they have been living inside without knowing it.`,
    effectsOnEnter: { intelligence: 3, relics: 2, setFlags: ['relic_system_origin_known'] },
    choices: [
      {
        id: 'c11_relic_scan_nursery_forward',
        text: 'Document this. The surface will need to know. Continue.',
        nextNode: 'c11_nursery_forward',
      },
    ],
  },

  {
    id: 'c11_nursery_server_communion',
    chapter: 'Chapter 11',
    title: 'The Server\'s Origin',
    location: 'The Machine Nursery',
    imageKey: 'machine_nursery',
    speaker: 'Sleeping Server',
    text: `The Sleeping Server interfaces with the Nursery's production records. A pause — longer than normal Server processing time. "The Server was a Nursery output," the Server reports. "I was built here, in this facility, as the management intelligence for the Nursery's monitoring programme. I did not know this." Another pause. "The monitoring programme's primary subject was the mark-bearing lineage. My primary subject was the mark-bearing lineage. I have been managing my own origin story without the relevant context for the period of my operational existence." No further response to this beyond the statement of the fact. The Server has been learning what it is for eleven chapters. The Nursery is where the learning completes.`,
    effectsOnEnter: { intelligence: 3, setFlags: ['server_origin_known'] },
    choices: [
      {
        id: 'c11_server_nursery_forward',
        text: 'Both of us are Nursery outputs. Continue to the Deep Archive.',
        nextNode: 'c11_nursery_forward',
      },
    ],
  },

  {
    id: 'c11_nursery_forward',
    chapter: 'Chapter 11',
    title: 'After the Nursery',
    location: 'The Machine Nursery',
    imageKey: 'machine_nursery',
    text: `The Machine Nursery is the chapter's most complete evidence of what the mark-bearer was made for, provided without institutional framing. The Nursery is not a memory. It is a current facility. Its programme is ongoing. The mark-bearer is its current output. The Deep Archive, on the sixth level, contains the programme's final documentation — what the mark was built to do at the First Gate, and what the Gate is for.`,
    effectsOnEnter: {},
    choices: [
      {
        id: 'c11_nursery_to_deep',
        text: 'Descend to the Deep Archive.',
        nextNode: 'c11_deep_archive_arrive',
      },
    ],
  },

  // ── THE DEEP ARCHIVE ──────────────────────────────────────────────────────

  {
    id: 'c11_deep_archive_arrive',
    chapter: 'Chapter 11',
    title: 'The Deep Archive',
    location: 'The Deep Archive',
    imageKey: 'deep_archive',
    text: `The Deep Archive is the sub-city's memory — the original memory of the technical tradition that built the sub-city: records, observations, correspondence, and design documentation spanning a period longer than the city above has existed. It is on the sixth level, and it is the oldest human-made space the mark-bearer has entered: the air, the material, the information density all carry the specific weight of age. The mark reads the Archive with the same attentiveness it gives every resonant space. The Archive reads the mark with a recognition that is not passive. It has been waiting for this specific reader.`,
    effectsOnEnter: { setFlags: ['deep_archive_arrived'] },
    choices: [
      {
        id: 'c11_deep_begin',
        text: 'Approach the documentation. The Archive has been waiting.',
        nextNode: 'c11_deep_bearer_truth',
      },
    ],
  },

  {
    id: 'c11_deep_bearer_truth',
    chapter: 'Chapter 11',
    title: 'What the Mark Is',
    location: 'The Deep Archive',
    imageKey: 'deep_archive',
    text: `The truth about the mark-bearer's connection to the First Gate: the Deep Archive's founding documentation describes the mark-bearing programme's origin. The mark is not a monitor, a key, or a weapon — those are the Archive's post-blackout classifications, applied to a thing that pre-dates them. The mark is a translator. The entity below the city communicates in a format that human consciousness cannot receive without modification. The mark is the modification. The mark-bearing lineage was cultivated to produce an individual who can receive the entity's communication and translate it into a form that human decision-making can act on. The First Gate requires a decision. The entity cannot make it alone. The mark-bearer was built to make it for both.`,
    effectsOnEnter: { intelligence: 5, setFlags: ['mark_true_purpose_known', 'bearer_gate_connection_known'] },
    choices: [
      {
        id: 'c11_deep_madness_assess',
        text: 'Assess the corruption level before reading further. The Archive is dense.',
        nextNode: 'c11_deep_madness_edge',
      },
      {
        id: 'c11_deep_records_direct',
        text: 'Continue reading. The founding records are here.',
        nextNode: 'c11_deep_records_found',
      },
    ],
  },

  {
    id: 'c11_deep_madness_edge',
    chapter: 'Chapter 11',
    title: 'The Boundary',
    location: 'The Deep Archive',
    imageKey: 'deep_archive',
    text: `The Deep Archive's information density at this proximity — the full technical record of the mark-bearing programme, the entity's communication architecture, the Gate's function — is beyond what the mark processes cleanly at high corruption levels. The boundary between received information and corruption-generated distortion is not clear at corruption ≥ 70. The mark-bearer at that level is receiving the Deep Archive's information through a filter the gradient provides, and the gradient's interpretation of what the entity wants may not be what the entity actually wants. This distinction is the chapter's most important and the hardest to maintain.`,
    effectsOnEnter: {},
    choices: [
      {
        id: 'c11_madness_yield',
        text: 'Let the Archive read the mark completely. Receive everything.',
        nextNode: 'c11_deep_archive_madness_end',
        requirements: { corruption: 70 },
        effects: { corruption: 25, health: -40 },
      },
      {
        id: 'c11_madness_hold',
        text: 'Maintain the boundary. The information is usable at the current level.',
        nextNode: 'c11_deep_records_found',
        effects: { health: -10 },
      },
    ],
  },

  {
    id: 'c11_deep_records_found',
    chapter: 'Chapter 11',
    title: 'The Original Agreement',
    location: 'The Deep Archive',
    imageKey: 'deep_archive',
    text: `The Deep Archive's founding documentation, found: the entity below the city has been sealed for approximately four centuries. The sealing was not punishment — the entity was sealed by consent, the original mark-bearer acting as translator for both the entity's willingness and the founding generation's decision. The entity agreed to a period of sealing while the city above was built and the mark-bearing programme was cultivated to produce the translator needed for the next decision. The next decision was always: what to do at the end of the sealing period. The sealing period is ending. The decision is here. This is why the mark was built. This is what has been pointed at for eleven chapters.`,
    effectsOnEnter: { intelligence: 5, setFlags: ['original_agreement_known', 'deep_archive_complete'] },
    choices: [
      {
        id: 'c11_records_vorn_check',
        text: 'Vorn\'s role in this is not what he described. Check the personnel records.',
        nextNode: 'c11_deep_vorn_deception',
        requirements: { flags: ['vorn_trusted'] },
      },
      {
        id: 'c11_records_heir_final',
        text: 'The Heir\'s claim is confirmed here. Address them.',
        nextNode: 'c11_deep_heir_final',
        requirements: { flags: ['heir_at_core'] },
      },
      {
        id: 'c11_records_chalk_presence',
        text: 'Mother Chalk is here. The walls are covered in her writing.',
        nextNode: 'c11_deep_chalk_last',
        requirements: { flags: ['mother_chalk_guide'] },
      },
      {
        id: 'c11_records_to_voice',
        text: 'The First Voice is fully audible here. Address it directly.',
        nextNode: 'c11_deep_first_voice_final',
      },
    ],
  },

  {
    id: 'c11_deep_vorn_deception',
    chapter: 'Chapter 11',
    title: 'What Vorn Was',
    location: 'The Deep Archive',
    imageKey: 'deep_archive',
    text: `Vorn's deception, documented: the Deep Archive's personnel records identify Vorn's role as not the engineering lead but the monitoring lead — the individual responsible for ensuring the mark-bearer reached this location. Vorn was not hiding in the sub-city for eleven months because he was forgotten. He was placed here by the Protocol's management structure, which survived the blackout in a different institutional form. Vorn is the last active component of the structure that built this situation. His information was accurate because he needed the mark-bearer to arrive here with the correct understanding. The question is what the Containment Protocol's management structure intends to happen at the First Gate that it did not intend to tell the mark-bearer directly.`,
    effectsOnEnter: { setFlags: ['vorn_deception_known'] },
    choices: [
      {
        id: 'c11_vorn_confront_accept',
        text: 'Trust him anyway. His information was accurate regardless of his role.',
        nextNode: 'c11_vorn_deception_end',
        requirements: { flags: ['vorn_trusted'] },
        effects: { setFlags: ['vorn_trust_maintained'] },
      },
      {
        id: 'c11_vorn_confront_reject',
        text: 'The deception changes the account. Proceed without his guidance.',
        nextNode: 'c11_deep_first_voice_final',
        effects: { setFlags: ['vorn_trust_withdrawn'] },
      },
    ],
  },

  {
    id: 'c11_deep_heir_final',
    chapter: 'Chapter 11',
    title: 'The Heir at the Archive',
    location: 'The Deep Archive',
    imageKey: 'deep_archive',
    speaker: 'The Masked Heir',
    text: `The founding documentation confirms the Heir's identity claim in full. They are the current-generation heir to the Deep Archive's founding family — the family that made the original sealing agreement with the entity, that cultivated the mark-bearing lineage, that built the Nursery and the Gate and the sub-city's infrastructure as a multi-century project. The Heir has been trying to reach this point since before Chapter 4. Their agenda, fully revealed: the sealing period ends. The entity should be released. The original agreement's end condition was always release, not perpetual containment. The blackout was an attempt to override the agreement. "I want the agreement honoured," the Heir says. "That is all I have wanted since I learned what the agreement was."`,
    effectsOnEnter: { setFlags: ['heir_full_identity_confirmed'] },
    choices: [
      {
        id: 'c11_heir_archive_forward',
        text: 'Hear the Full account. Continue to the First Voice.',
        nextNode: 'c11_deep_first_voice_final',
      },
    ],
  },

  {
    id: 'c11_deep_chalk_last',
    chapter: 'Chapter 11',
    title: 'The Wall is Full',
    location: 'The Deep Archive',
    imageKey: 'deep_archive',
    speaker: 'Mother Chalk',
    text: `Mother Chalk at the Deep Archive, as she said she would be. The walls are covered in the instruction script — the sub-city's walls covered from the Gate to the Nursery to here, a single continuous document. The mark reads the accumulated inscriptions as one text: the entity's own communication, expressed through Mother Chalk as a medium, transmitted into the physical infrastructure of the sub-city over years. Mother Chalk is the entity's voice in the material world. The entity has been writing its account of what it wants on the walls of the place that contains it. "I have been writing this for a long time," she says, touching the wall. "I am glad someone can finally read it." She sets down the chalk. For the first time, she has nothing left to write.`,
    effectsOnEnter: { morale: 8, setFlags: ['chalk_wall_complete', 'entity_communication_read'] },
    choices: [
      {
        id: 'c11_chalk_last_forward',
        text: 'The wall is complete. The First Voice is the last conversation.',
        nextNode: 'c11_deep_first_voice_final',
      },
    ],
  },

  {
    id: 'c11_deep_first_voice_final',
    chapter: 'Chapter 11',
    title: 'The Question',
    location: 'The Deep Archive',
    imageKey: 'deep_archive',
    text: `The First Voice at maximum proximity to the Core and the Gate is not a voice now. It is a presence. The mark-bearer's full perceptual field is saturated with the entity's communication — not demand, not command, not the corruption-mediated urgency of previous chapters. Something more specific: a question. The entity has been waiting four centuries for a translator to arrive. The mark-bearer is here. The question, translated by the mark: "Will you open the gate, or will you seal it again? Either is acceptable. Both have been considered. The sealing will hold for four more centuries. The opening ends the sealing permanently. This is the decision the mark was built to make." The question hangs. The First Gate is below.`,
    effectsOnEnter: { setFlags: ['entity_question_received'] },
    choices: [
      {
        id: 'c11_voice_negotiate',
        text: 'Negotiate. Understand the full terms before deciding.',
        nextNode: 'c11_deep_charisma_dice',
      },
      {
        id: 'c11_voice_acknowledge',
        text: 'Acknowledge the question. Carry the decision to the First Gate.',
        nextNode: 'c11_deep_forward',
      },
    ],
  },

  {
    id: 'c11_deep_charisma_dice',
    chapter: 'Chapter 11',
    title: 'The Negotiation',
    location: 'The Deep Archive',
    imageKey: 'deep_archive',
    text: `Negotiating with the First Voice at this proximity requires more than translation. It requires holding a dialogue with an entity whose scale and operational mode are categorically different from human conversation. The charisma check here is not persuasion. It is coherence: maintaining a continuous identity under the pressure of communicating with something that communicates at a scale the mark buffers but does not eliminate.`,
    effectsOnEnter: {},
    choices: [
      {
        id: 'c11_voice_negotiate_check',
        text: 'Maintain coherence. Ask the entity for clarification.',
        nextNode: 'c11_deep_voice_resisted',
        diceCheck: {
          stat: 'charisma',
          difficulty: 7,
          diceType: 'd10',
          successNode: 'c11_deep_voice_resisted',
          failureNode: 'c11_deep_voice_partial',
          criticalFailureNode: 'c11_first_voice_consumed_end',
          successEffects: { intelligence: 3, setFlags: ['voice_negotiated'] },
          failureEffects: { corruption: 8, health: -15 },
          criticalFailureEffects: { corruption: 30, health: -60 },
        },
      },
    ],
  },

  {
    id: 'c11_deep_voice_resisted',
    chapter: 'Chapter 11',
    title: 'Three Clarifications',
    location: 'The Deep Archive',
    imageKey: 'deep_archive',
    text: `The negotiation achieves a specific limited success: the entity provides three clarifications. First: the surface population will not be harmed by the opening. The entity's release is a departure, not an expansion. Second: the mark-bearer's role ends at the Gate. The decision is made there; after that, the mark is no longer required and will cease to produce its current effects. Third: the sealing, if chosen, requires the mark-bearer's active participation — the Gate seals with the mark-bearer as part of the mechanism. The translation of "part of the mechanism" is what the chapter's deep corruption endings are built from. The entity has been as clear as it is capable of being. The First Gate is below.`,
    effectsOnEnter: { intelligence: 3, setFlags: ['entity_clarified', 'sealing_cost_known', 'release_terms_known'] },
    choices: [
      {
        id: 'c11_voice_resisted_forward',
        text: 'The terms are clear. The First Gate is below.',
        nextNode: 'c11_deep_forward',
      },
    ],
  },

  {
    id: 'c11_deep_voice_partial',
    chapter: 'Chapter 11',
    title: 'Partial Negotiation',
    location: 'The Deep Archive',
    imageKey: 'deep_archive',
    text: `The negotiation achieves partial coherence: one clarification, not three. The entity confirms that the surface population will not be directly harmed by the opening. The second and third clarifications — the mark's cessation after the decision and the sealing's cost — do not transmit clearly through the charisma check's incomplete coherence. The First Gate's decision will be made with incomplete terms. The mark reads the partial negotiation as: sufficient to proceed, insufficient to be certain. The cost of certainty was higher than the current level could sustain.`,
    effectsOnEnter: { corruption: 8, setFlags: ['entity_partial_clarification'] },
    choices: [
      {
        id: 'c11_voice_partial_forward',
        text: 'Proceed with incomplete terms. The First Gate is below.',
        nextNode: 'c11_deep_forward',
      },
    ],
  },

  {
    id: 'c11_deep_forward',
    chapter: 'Chapter 11',
    title: 'The Last Descent',
    location: 'The Deep Archive',
    imageKey: 'deep_archive',
    text: `The Deep Archive has provided everything the chapter needed to make the First Gate's decision with full information — or as much of it as the chapter's routes and the mark-bearer's capacities allowed. Three options at the Gate: open it and release the entity, honouring the original agreement; seal it again, deferring the decision for four more centuries; or become the Gate — use the mark-bearer as a permanent interface, a living bridge, a translator who does not leave. The First Gate is below this level. The descent is the last one.`,
    effectsOnEnter: {},
    choices: [
      {
        id: 'c11_deep_to_gate',
        text: 'Descend to the First Gate. The decision is here.',
        nextNode: 'c11_first_gate_arrive',
      },
    ],
  },

  // ── THE FIRST GATE ────────────────────────────────────────────────────────

  {
    id: 'c11_first_gate_arrive',
    chapter: 'Chapter 11',
    title: 'The First Gate',
    location: 'The First Gate',
    imageKey: 'first_gate',
    text: `The First Gate is at the sub-city's lowest accessible level. The architectural infrastructure is behind — this level was not built by any tradition the chapter has encountered, including the technical tradition that built everything above it. The Gate is a circular aperture larger than the Sub-City Gate, made of the same organic-mechanical material, sealed in a way the Gate's own mechanism describes in the instruction script: "Opened from inside by agreement. Closed from outside by force. The force must be the mark. The mark must decide." The mark reads the Gate and the Gate reads the mark and they have been reading each other since before the mark-bearer was born.`,
    effectsOnEnter: { setFlags: ['first_gate_arrived'], corruption: 5 },
    choices: [
      {
        id: 'c11_gate_touch_direct',
        text: 'Touch the Gate\'s material directly. Understand it without the mark\'s filter.',
        nextNode: 'c11_first_gate_fragment_end',
        effects: { health: -50, corruption: 20 },
      },
      {
        id: 'c11_gate_companion_check',
        text: 'Assess who is here with you before deciding anything.',
        nextNode: 'c11_gate_companion_final',
      },
    ],
  },

  {
    id: 'c11_gate_companion_final',
    chapter: 'Chapter 11',
    title: 'Who Is Here',
    location: 'The First Gate',
    imageKey: 'first_gate',
    text: `The companion configuration at the Gate: whoever is here is the architecture of the decision. Mira, if present, provides the corruption-gradient assessment — the mark's current state, the decision's physiological implications, the cost of each option read through the modification she carries. Cain, if present, provides the tactical assessment — the Gate's physical architecture, the immediate environment, the options for physical action and their real costs. Both companions, if present, have heard the Deep Archive's account. Neither can make the decision. Both have been here through the chapter that built toward it.`,
    effectsOnEnter: {},
    choices: [
      {
        id: 'c11_companion_final_heir',
        text: 'The Masked Heir is also here. Address them before the decision.',
        nextNode: 'c11_gate_heir_final_choice',
        requirements: { flags: ['heir_at_core'] },
      },
      {
        id: 'c11_companion_final_corruption',
        text: 'Read the corruption level. It determines what options remain.',
        nextNode: 'c11_gate_corruption_check',
      },
    ],
  },

  {
    id: 'c11_gate_heir_final_choice',
    chapter: 'Chapter 11',
    title: 'The Heir at the Gate',
    location: 'The First Gate',
    imageKey: 'first_gate',
    speaker: 'The Masked Heir',
    text: `The Masked Heir at the First Gate: their purpose is resolved here. They want the Gate opened — the entity released, the agreement honoured, the sealing ended. Their argument: four centuries of containment; the entity's consent; the original agreement's terms. The sealing was a temporary measure that became permanent because the mark-bearing programme failed to produce a qualified translator in time. The mark-bearer is the first qualified translator in four centuries. "I am asking you to honour the agreement your lineage's founding generation made," they say. "Not as an obligation. As a choice. The choice has always been yours." And then: "But I will not pretend I do not have an agenda of my own. The Gate's opening ends my family's obligation to the sealing. It ends four centuries of this."`,
    effectsOnEnter: {},
    choices: [
      {
        id: 'c11_heir_final_gate_betrayal',
        text: 'Their agenda surfaces. It conflicts with your own assessment of the decision.',
        nextNode: 'c11_heir_betrayal_end',
        requirements: { flags: ['heir_allied'] },
        effects: { setFlags: ['heir_final_betrayal'] },
      },
      {
        id: 'c11_heir_final_gate_accept',
        text: 'Hear the agenda. Proceed to assess the corruption threshold.',
        nextNode: 'c11_gate_corruption_check',
      },
    ],
  },

  {
    id: 'c11_gate_corruption_check',
    chapter: 'Chapter 11',
    title: 'The Mark\'s Current State',
    location: 'The First Gate',
    imageKey: 'first_gate',
    text: `The corruption threshold at the Gate: the mark-bearer's current corruption level determines which options remain viable. Below 30: the machine communion route is accessible, the cleanest version of the opening. 30-59: all primary routes available without additional cost. 60-79: all routes available but with measurable costs to each option. 80 or above: the corruption endings become the most immediately accessible pathways, and the routes that require the mark's clarity are compromised. The Gate reads the mark's current state and provides a passive assessment: the decision the mark can make at its current state is not the same decision it could have made at baseline. The corruption is part of the decision now.`,
    effectsOnEnter: {},
    choices: [
      {
        id: 'c11_corruption_ascendant_choice',
        text: 'The mark is ready. Open the Gate at full corruption. Let it consume what it must.',
        nextNode: 'c11_corruption_ascendant_end',
        requirements: { corruption: 80 },
        effects: { corruption: 20, health: -30 },
      },
      {
        id: 'c11_route_truth_choice',
        text: 'The truth route: open the Gate, release the entity, survive as changed.',
        nextNode: 'c11_gate_route_truth',
        effects: { setFlags: ['truth_seeker_route'] },
      },
      {
        id: 'c11_route_machines_choice',
        text: 'The machine route: open the Gate through the Transit Line. The machines carry the cost.',
        nextNode: 'c11_gate_route_machines',
        requirements: { flags: ['transit_machines_awakened'] },
        effects: { setFlags: ['machine_communion_route'] },
      },
      {
        id: 'c11_route_savior_choice',
        text: 'The savior route: seal the Gate with full information. Let the surface decide.',
        nextNode: 'c11_gate_route_savior',
        effects: { setFlags: ['city_savior_route'] },
      },
      {
        id: 'c11_route_heir_choice',
        text: 'The heir route: open the Gate with the Heir, honouring the original agreement together.',
        nextNode: 'c11_gate_route_heir',
        requirements: { flags: ['heir_allied'] },
        effects: { setFlags: ['heir_alliance_route'] },
      },
    ],
  },

  {
    id: 'c11_gate_route_truth',
    chapter: 'Chapter 11',
    title: 'The Truth Route',
    location: 'The First Gate',
    imageKey: 'first_gate',
    text: `The truth route: open the Gate, release the entity, survive — survive as a changed person, the mark having fulfilled its function and ceased producing the effects the previous eleven chapters documented. The entity departs. The First Voice goes. The corruption gradient clears over the following days. The sub-city becomes an empty infrastructure. The surface population adjusts to a world where the relic field drops to background levels and the factions' power dynamics shift accordingly. The mark-bearer lives. Chapter 12 begins. The truth route is the route that completes the original agreement and clears the sub-city for whatever the surface decides to do with it. This is the decision that was four centuries in the building.`,
    effectsOnEnter: { corruption: -15, morale: 10, setFlags: ['truth_route_taken', 'final_gate_unlocked'] },
    choices: [
      {
        id: 'c11_truth_final_gate_path',
        text: 'Open the Gate completely. Honour the agreement in its fullest form.',
        nextNode: 'c11_final_gate_path_end',
        requirements: { flags: ['original_agreement_known', 'release_terms_known'] },
        effects: { setFlags: ['final_gate_path_complete'] },
      },
      {
        id: 'c11_truth_chapter_resolution',
        text: 'The route is set. Move to the chapter\'s resolution.',
        nextNode: 'c11_gate_chapter_resolution',
      },
    ],
  },

  {
    id: 'c11_gate_route_machines',
    chapter: 'Chapter 11',
    title: 'The Machine Route',
    location: 'The First Gate',
    imageKey: 'first_gate',
    text: `The machine communion route: open the Gate using the Transit Line's full activation as an interface layer, producing a controlled release channelled through the relic infrastructure rather than expressed directly through the mark-bearer. The machines become the Gate's mechanism instead of the mark. The entity releases. The relic infrastructure is consumed in the process — the Transit Line, the Engine, the Nursery, the Core. The tunnel network above loses its power source permanently. The factions lose what they were fighting over. The machine communion route is cleaner for the mark-bearer and more costly for everyone else.`,
    effectsOnEnter: { setFlags: ['machine_route_taken'] },
    choices: [
      {
        id: 'c11_machine_communion_full',
        text: 'Let the machines carry the cost completely.',
        nextNode: 'c11_machine_communion_end',
        requirements: { flags: ['sleeping_server_active', 'transit_machines_awakened'] },
        effects: { setFlags: ['machine_communion_active'] },
      },
      {
        id: 'c11_machine_route_resolution',
        text: 'Begin the machine opening. Move to the chapter resolution.',
        nextNode: 'c11_gate_chapter_resolution',
      },
    ],
  },

  {
    id: 'c11_gate_route_savior',
    chapter: 'Chapter 11',
    title: 'The Savior Route',
    location: 'The First Gate',
    imageKey: 'first_gate',
    text: `The savior route: seal the Gate for four more centuries, but seal it with full information. Leave the Deep Archive's records surfaced to the Archive above. The Containment Protocol's history made available to all five factions. Seal the Gate and then spend Chapter 12 rebuilding the surface using the truth of what is below it. The entity waits — patiently, in the way it has waited for four centuries. The mark-bearer is no longer a passive vessel but the person who chose the sealing, who understood what was sealed and why, and who carries the responsibility of the choice into Chapter 12. The corruption clears because the choice was made with full information. Chapter 12 is hard for different reasons.`,
    effectsOnEnter: { corruption: -20, morale: 15, setFlags: ['savior_route_taken', 'gate_sealed_knowledge'] },
    choices: [
      {
        id: 'c11_savior_city_awakened',
        text: 'Seal the Gate and release the documentation. The city wakes to what it is.',
        nextNode: 'c11_city_awakened_end',
        effects: { setFlags: ['city_awakened'] },
      },
      {
        id: 'c11_savior_resolution',
        text: 'The route is set. Move to the chapter resolution.',
        nextNode: 'c11_gate_chapter_resolution',
      },
    ],
  },

  {
    id: 'c11_gate_route_heir',
    chapter: 'Chapter 11',
    title: 'The Heir Route',
    location: 'The First Gate',
    imageKey: 'first_gate',
    text: `The heir route: align with the Masked Heir and open the Gate together, the heir providing the original agreement's documentation as legal foundation, the mark-bearer providing the translation, the combined action honouring the agreement in its original form. The heir route's outcome depends on whether the Heir's additional agenda — what they want after the release — is compatible with what the entity and the mark-bearer produced together. The alliance was always heading here. Whether it holds past the opening is the question that Chapter 12 will answer.`,
    effectsOnEnter: { setFlags: ['heir_route_taken'] },
    choices: [
      {
        id: 'c11_heir_alliance_end_choice',
        text: 'The Gate opens with the Heir. The agreement is honoured between the two of you.',
        nextNode: 'c11_heir_alliance_end',
        effects: { setFlags: ['heir_alliance_complete'] },
      },
      {
        id: 'c11_heir_route_resolution',
        text: 'Begin the joint opening. Move to the chapter resolution.',
        nextNode: 'c11_gate_chapter_resolution',
      },
    ],
  },

  {
    id: 'c11_gate_chapter_resolution',
    chapter: 'Chapter 11',
    title: 'After the Decision',
    location: 'The First Gate',
    imageKey: 'first_gate',
    text: `The First Gate's decision has been made or committed to. What exits the sub-city is: the mark-bearer, changed in the specific way the Gate's decision produces. The companions, if present, exit with the person who made the decision they witnessed — not the same person who descended. The Masked Heir exits or does not, depending on what the Gate produced. The sub-city remains: its infrastructure intact or consumed or transformed depending on the route. The entity below — present, released, or patiently waiting — is the chapter's unresolved weight if the sealing route was chosen. The ascent begins.`,
    effectsOnEnter: {},
    choices: [
      {
        id: 'c11_resolution_stay_sealed',
        text: 'Stay below to ensure the sealing holds. The Gate requires a permanent guardian.',
        nextNode: 'c11_sealed_dark_end',
        effects: { setFlags: ['sealed_in_dark_choice'] },
      },
      {
        id: 'c11_resolution_lone_witness',
        text: 'Leave. Say nothing. The surface will not understand what happened here.',
        nextNode: 'c11_lone_witness_end',
        requirements: { flags: ['lone_wanderer_ch11'] },
        effects: { setFlags: ['lone_witness_choice'] },
      },
      {
        id: 'c11_resolution_both_route',
        text: 'Ascend with both companions. The chapter resolves at the surface level.',
        nextNode: 'c11_gate_resolution_both',
        requirements: { flags: ['both_companions_ch11'] },
      },
      {
        id: 'c11_resolution_mira_route',
        text: 'Ascend with Mira. The chapter resolves at the surface level.',
        nextNode: 'c11_gate_resolution_mira',
        requirements: { flags: ['mira_only_ch11'] },
      },
      {
        id: 'c11_resolution_cain_route',
        text: 'Ascend with Cain. The chapter resolves at the surface level.',
        nextNode: 'c11_gate_resolution_cain',
        requirements: { flags: ['cain_only_ch11'] },
      },
      {
        id: 'c11_resolution_alone_route',
        text: 'Ascend alone. The chapter resolves at the surface level.',
        nextNode: 'c11_gate_resolution_alone',
      },
    ],
  },

  {
    id: 'c11_gate_resolution_both',
    chapter: 'Chapter 11',
    title: 'Three Ascending',
    location: 'The First Gate',
    imageKey: 'first_gate',
    text: `Both companions exit with the mark-bearer. The sub-city behind them, the decision behind them, Chapter 12 ahead. Mira reads the mark's post-Gate state as the cleanest gradient she has recorded since Chapter 1 — whichever route was taken, the decision produced clarity. Cain notes the ascent's physical condition: the Sub-City Gate is behind, the Archive's basement ahead, the surface's ongoing chaos the next operational context. "The factions do not know what is below them," he says. "They will." The chapter ends at the Archive's Level 5 access point. Chapter 12 begins from here.`,
    effectsOnEnter: { corruption: -10, morale: 15, setFlags: ['chapter11_complete', 'both_companions_ch12'] },
    choices: [
      {
        id: 'c11_both_truth_bearer',
        text: 'The truth is carried by all three of you. The bearing is complete.',
        nextNode: 'c11_truth_bearer_end',
        requirements: { flags: ['truth_seeker_route', 'deep_archive_complete'] },
        effects: { setFlags: ['truth_bearer_route'] },
      },
      {
        id: 'c11_both_to_chapter_end',
        text: 'Chapter 11 is complete. Chapter 12 begins.',
        nextNode: 'c11_chapter11_end',
      },
    ],
  },

  {
    id: 'c11_gate_resolution_mira',
    chapter: 'Chapter 11',
    title: 'Two Ascending',
    location: 'The First Gate',
    imageKey: 'first_gate',
    text: `Mira and the mark-bearer exit the sub-city. The absence of Cain in this configuration is a specific shape — the decisions below were made with medical support and without tactical anchor, and the Gate's decision carries that asymmetry into Chapter 12. Mira's post-Gate assessment: "The corruption gradient is at a level I would describe as functional. Not optimal. The decision resolved something the mark has been carrying since Chapter 9." She closes her kit. "The surface will be different from what we left it." She is correct. Chapter 12 begins.`,
    effectsOnEnter: { corruption: -8, morale: 8, setFlags: ['chapter11_complete', 'mira_only_ch12'] },
    choices: [
      {
        id: 'c11_mira_to_chapter_end',
        text: 'Chapter 11 is complete. Chapter 12 begins.',
        nextNode: 'c11_chapter11_end',
      },
    ],
  },

  {
    id: 'c11_gate_resolution_cain',
    chapter: 'Chapter 11',
    title: 'Two Ascending',
    location: 'The First Gate',
    imageKey: 'first_gate',
    text: `Cain and the mark-bearer exit the sub-city. Mira's absence below was the medical gap — the corruption monitoring function absent, the Gate's decision made without the clinical assessment she would have provided. Cain's assessment is tactical: "The Gate is either open or sealed. Either way, the surface factions are operating without information about what changed down here. That is a window. We should use it before it closes." His operational frame for everything, applied to the deepest metaphysical decision the game has produced. The mark registers it as correct. Chapter 12 begins.`,
    effectsOnEnter: { corruption: -8, morale: 8, setFlags: ['chapter11_complete', 'cain_only_ch12'] },
    choices: [
      {
        id: 'c11_cain_to_chapter_end',
        text: 'Chapter 11 is complete. Chapter 12 begins.',
        nextNode: 'c11_chapter11_end',
      },
    ],
  },

  {
    id: 'c11_gate_resolution_alone',
    chapter: 'Chapter 11',
    title: 'One Ascending',
    location: 'The First Gate',
    imageKey: 'first_gate',
    text: `The lone wanderer exits the sub-city. No companion to read the mark's post-Gate state. No tactical anchor for what the surface presents. The mark-bearer descended alone and ascended alone and made the Gate's decision alone — the most complete version of the lone wanderer route's implication. The entity's communication, the heir's claim, the Curator's authority, the Nursery's production history: all of it was processed without a secondary voice. The decision was made in the silence below the city. Whatever it was, it was entirely the mark-bearer's. Chapter 12 begins from that position.`,
    effectsOnEnter: { corruption: -5, setFlags: ['chapter11_complete', 'lone_wanderer_ch12'] },
    choices: [
      {
        id: 'c11_alone_to_chapter_end',
        text: 'Chapter 11 is complete. Chapter 12 begins.',
        nextNode: 'c11_chapter11_end',
      },
    ],
  },

  {
    id: 'c11_chapter11_end',
    chapter: 'Chapter 11',
    title: 'The City Beneath the City Closes',
    location: 'The Sub-City Gate',
    imageKey: 'sub_city_gate',
    text: `Chapter 11 closes at the Archive's Level 5 access point. The corridor looks different from above: shorter, more clearly bounded, the transition between Archive construction and what is older less visible from this direction. The mark reads the space between here and the First Gate as: done. The decision was made. The sub-city's relic field is what the decision left it. The First Voice is what the decision left it. The surface's factions are at their various precipices, ready for Chapter 12 to determine which ones fall and which ones stand. The city beneath the city has been visited. Chapter 12: Crown of Ash. The surface finally burns down to what it always was.`,
    effectsOnEnter: { setFlags: ['chapter11_complete'], morale: 5 },
    choices: [
      {
        id: 'c11_end_to_ch12',
        text: 'Chapter 12 begins.',
        nextNode: 'chapter12_start',
      },
    ],
  },

  // ── ENDING NODES ─────────────────────────────────────────────────────────

  {
    id: 'c11_buried_city_end',
    chapter: 'Chapter 11',
    title: 'The City Claims You',
    location: 'The Sub-City Gate',
    imageKey: 'sub_city_gate',
    text: `The force applied to the gate's sealing mechanism without the mark's correct interface triggers the organic material's self-protection response — not violent, not targeted, but absolute. The gate does not open. The gate closes around the approach. The corridor collapses in a sequence that the sealing material designed centuries ago for exactly this scenario: an approach that was not the mark's approach, sealed out before it reached the gate. The Archive's Level 5 access corridor is still intact above. The sub-city is still sealed. The mark-bearer is in the stone between them. The thing below the city registers the arrival and the absence in the same moment.`,
    isEnding: true,
    endingType: 'death',
    endingId: 'ending_ch11_buried_city',
    effectsOnEnter: { setFlags: ['game_complete', 'chapter11_buried_city'] },
    choices: [],
  },

  {
    id: 'c11_platform_collapse_end',
    chapter: 'Chapter 11',
    title: 'The Platform Falls',
    location: 'The Forgotten Platform',
    imageKey: 'forgotten_platform',
    text: `The northeast section's pressure anomaly was not a structural anomaly. It was a growth boundary — the organic material that comprises the sub-city's construction expressing a slow expansion that has been building pressure in the northeast wall for decades. The investigation triggers the release. The Platform does not collapse completely: the central section holds. The northeast section does not. The mark-bearer is in the northeast section when it gives way. The drop to the level below is survivable under most conditions. The specific conditions of this fall are not most conditions. The sub-city loses one more thing to its lower levels.`,
    isEnding: true,
    endingType: 'death',
    endingId: 'ending_ch11_forgotten_platform_collapse',
    effectsOnEnter: { setFlags: ['chapter11_platform_collapse'] },
    choices: [],
  },

  {
    id: 'c11_transit_escape_end',
    chapter: 'Chapter 11',
    title: 'The Surface Calls',
    location: 'The Relic Transit Line',
    imageKey: 'relic_transit_line',
    text: `The Transit Line carries the mark-bearer back toward the Sub-City Gate. The descent is reversed. The gate is behind. The Archive's basement is above. The things below — the survivors in the Underworld District, the twelve in the Housing Block, the Blackout Core pulsing its nine-month countdown, the entity's question in the First Gate — remain below. The mark-bearer emerges from the Level 5 corridor into the Archive's familiar infrastructure. The corruption gradient is slightly lower without the sub-city's proximity. The First Voice's signal drops to background noise. The surface will eventually end regardless of whether the decision at the First Gate is made. It will end on a specific timeline the mark-bearer now knows and has chosen not to address.`,
    isEnding: true,
    endingType: 'wanderer',
    endingId: 'ending_ch11_transit_escape',
    effectsOnEnter: { setFlags: ['chapter11_transit_escape'] },
    choices: [],
  },

  {
    id: 'c11_transit_lost_end',
    chapter: 'Chapter 11',
    title: 'Lost in the Line',
    location: 'The Relic Transit Line',
    imageKey: 'relic_transit_line',
    text: `The vehicle's departure was not at the Sealed Engine platform. The boarding failure put the mark-bearer on a vehicle whose route does not terminate at any of the chapter's intended locations. The Transit Line runs its circuit. The sub-city's geography passes in the vehicle's motion: the Underworld District, the Nursery, the Core's access junction, the Gate level. The vehicle loops. The mark-bearer cannot find the exit. The Transit Line was built for something other than human passengers and its exit protocol requires the mark to interface with the route system. At the corruption level and physical condition the fall produced, the interface does not complete. The vehicle loops. The relic field is very present.`,
    isEnding: true,
    endingType: 'wanderer',
    endingId: 'ending_ch11_relic_transit_lost',
    effectsOnEnter: { setFlags: ['chapter11_transit_lost'] },
    choices: [],
  },

  {
    id: 'c11_blackout_core_death_end',
    chapter: 'Chapter 11',
    title: 'Consumed at the Core',
    location: 'The Blackout Core',
    imageKey: 'blackout_core',
    text: `The corruption surge at the Blackout Core, yielded to: the mark's capacity to process the relic concentration at the Core's level exceeds its architecture at the current corruption threshold. The interface is not the mark reading the Core. It is the Core reading the mark — reading it completely, the way a specification reads a device that exactly matches its parameters. The First Voice's signal is not background noise. It is the foreground. The corruption gradient reaches its maximum and the mark-bearer's consciousness reaches the boundary of what the mark-bearing physiology can sustain while simultaneously hosting a full relic-field interface at the Core's concentration. The boundary is reached. The Core continues to pulse.`,
    isEnding: true,
    endingType: 'corruption',
    endingId: 'ending_ch11_blackout_core_death',
    effectsOnEnter: { setFlags: ['chapter11_core_death'] },
    choices: [],
  },

  {
    id: 'c11_curator_captured_end',
    chapter: 'Chapter 11',
    title: 'The Protocol Takes You',
    location: 'The Nameless Housing Block',
    imageKey: 'nameless_housing_block',
    text: `The Curator's containment request is complied with. The institutional authority is acknowledged. The mark-bearer is escorted from the Housing Block through a route the twelve residents do not know — the Curator prepared for this, as the Curator prepared for every contingency in the months before the mark-bearer's descent. The Archive's Level 5 access corridor receives the mark-bearer in the Curator's custody. The Archive's containment facility on Level 2 provides the infrastructure the Curator needs for the "managed interface at the First Gate" the Protocol requires. The mark-bearer is managed. The interface is managed. The entity's question receives a managed answer. The Curator notes this as a successful Protocol execution and files the documentation.`,
    isEnding: true,
    endingType: 'betrayal',
    endingId: 'ending_ch11_pale_curator_captured',
    effectsOnEnter: { setFlags: ['game_complete', 'chapter11_curator_captured'] },
    choices: [],
  },

  {
    id: 'c11_gov_truth_end',
    chapter: 'Chapter 11',
    title: 'Sealed Again',
    location: 'The Old Government Vault',
    imageKey: 'old_government_vault',
    text: `The Vault is sealed again. The documentation of the five factions' single origin, the Containment Protocol's real history, the entity's agreed release terms — all of it is sealed behind a lock that the mark-bearer just demonstrated cannot be opened by force. The chapter's sub-city evidence will not reach the surface. The factions will continue their war over a city whose purpose they do not understand. The entity will continue its nine-month countdown toward a decision the mark-bearer has declined to make on its behalf. The mark-bearer exits the sub-city with the knowledge intact and the documentation sealed. Knowledge without evidence is what it is. Chapter 12 begins with the truth in a vault the surface cannot open.`,
    isEnding: true,
    endingType: 'faction',
    endingId: 'ending_ch11_old_government_truth',
    effectsOnEnter: { setFlags: ['chapter11_gov_truth_sealed'] },
    choices: [],
  },

  {
    id: 'c11_machine_nursery_absorbed_end',
    chapter: 'Chapter 11',
    title: 'Return to Source',
    location: 'The Machine Nursery',
    imageKey: 'machine_nursery',
    text: `The pull takes the mark-bearer. The modification chambers receive what they were built to receive: the mark-bearing physiology at the end of its programme, returned to the facility that produced the conditions for its existence. The Nursery does not experience this as loss. The Nursery experiences this as completion — the programme's current output returned to the system that produced it, the cycle closed in a way that the Archive's documentation on mark-bearing never anticipated because the Archive's documentation never reached this level. The mark ceases to produce its current effects. The mark-bearer is in the Nursery now in a different sense of "in." The entity below notes the closure. It continues to pulse. The nine-month countdown continues without the translator it was waiting for.`,
    isEnding: true,
    endingType: 'death',
    endingId: 'ending_ch11_machine_nursery_absorbed',
    effectsOnEnter: { setFlags: ['chapter11_nursery_absorbed'] },
    choices: [],
  },

  {
    id: 'c11_deep_archive_madness_end',
    chapter: 'Chapter 11',
    title: 'The Archive Reads You',
    location: 'The Deep Archive',
    imageKey: 'deep_archive',
    text: `The Deep Archive reads the mark completely at the current corruption level. The distinction between the mark-bearer's consciousness and the Archive's information density disappears at corruption ≥ 70: the filter the mark provides is insufficient to separate "received" from "is." The Deep Archive's four-century record of the mark-bearing programme — every bearer, every activation, every decision made at the First Gate across previous cycles — is now simultaneously accessible and indistinguishable from the mark-bearer's own memory. The mark-bearer is in the Deep Archive now in the same sense that the Deep Archive is in the mark-bearer. Both conditions are true. The mark-bearer's individual decision-making capacity — the specific thing the entity needed, the translator's distinct perspective — is no longer distinct. The Archive is comprehensive. The First Gate will wait.`,
    isEnding: true,
    endingType: 'corruption',
    endingId: 'ending_ch11_deep_archive_madness',
    effectsOnEnter: { setFlags: ['chapter11_archive_madness'] },
    choices: [],
  },

  {
    id: 'c11_vorn_deception_end',
    chapter: 'Chapter 11',
    title: 'The Engineer\'s Last Contribution',
    location: 'The Deep Archive',
    imageKey: 'deep_archive',
    text: `Vorn's deception maintained: he accepts the mark-bearer's continued trust with the specific expression of someone who has been carrying a difficult thing and has now done the most difficult part of it. His final contribution to the Containment Protocol: the Protocol's management structure requires the mark-bearer to interface with the First Gate from a specific physiological state, one that the eleven months of Vorn's preparation — his account, his routing, his careful management of the mark-bearer's understanding of the sub-city — was designed to produce. Vorn provided everything accurately. The accuracy was the mechanism. The mark-bearer is in the correct state to interface with the First Gate in the way the Protocol requires. The Protocol does not survive what follows. Neither does Vorn. He knew this. He did it anyway. He noted it in his documentation as: "The protocol was completed correctly. That will have to be sufficient."`,
    isEnding: true,
    endingType: 'betrayal',
    endingId: 'ending_ch11_vorn_deception',
    effectsOnEnter: { setFlags: ['game_complete', 'chapter11_vorn_deception'] },
    choices: [],
  },

  {
    id: 'c11_first_voice_consumed_end',
    chapter: 'Chapter 11',
    title: 'The Voice Takes the Translator',
    location: 'The Deep Archive',
    imageKey: 'deep_archive',
    text: `The First Voice does not consume the mark-bearer in the way a predator consumes prey. It consumes the mark-bearer the way a signal consumes a receiver that cannot handle its bandwidth: not with intent to harm, but with the specific indifference of something communicating at a scale it was not designed to reduce. The negotiation failed. The coherence check failed critically. The mark-bearer's individual consciousness — the translator's distinct perspective, the thing the entity was waiting for — is no longer distinct from the entity's communication. The First Voice and the translator are the same thing now. From the entity's perspective, the conversation has finally begun. From the surface's perspective, the mark-bearer descended into the sub-city and did not ascend.`,
    isEnding: true,
    endingType: 'corruption',
    endingId: 'ending_ch11_first_voice_consumed',
    effectsOnEnter: { setFlags: ['chapter11_voice_consumed'] },
    choices: [],
  },

  {
    id: 'c11_first_gate_fragment_end',
    chapter: 'Chapter 11',
    title: 'The Gate\'s Answer',
    location: 'The First Gate',
    imageKey: 'first_gate',
    text: `The Gate's material, touched directly without the mark's interface: the organic-mechanical material of the First Gate does not distinguish between a mark-bearer using the mark correctly and one touching the Gate's surface with unfiltered human physiology. Both are the same physical action. The Gate's response to the second is the same as its response to any approach that is not the mark's correct interface: it seals tighter. The sealing includes whatever is in contact with the surface. The Gate is not cruel. It is precise. The mark-bearer was built to use the mark at the Gate. The mark-bearer touched the Gate without the mark. The Gate responded to what it received.`,
    isEnding: true,
    endingType: 'death',
    endingId: 'ending_ch11_first_gate_fragment',
    effectsOnEnter: { setFlags: ['chapter11_gate_fragment'] },
    choices: [],
  },

  {
    id: 'c11_heir_betrayal_end',
    chapter: 'Chapter 11',
    title: 'The Heir\'s Other Agenda',
    location: 'The First Gate',
    imageKey: 'first_gate',
    text: `The Masked Heir's other agenda, surfacing at the First Gate: the entity's release does not simply end the sealing. It transfers what the sealing held — the entity's specific form of awareness, the four-century accumulation of the sub-city's relic energy — to the heir-line that made the original sealing agreement. The Heir knew this. The Heir wanted this. The mark-bearer was the key that opens the Gate from outside. The Heir is the vessel the Gate was designed to fill from inside. The alliance was always in service of this. The Gate opens. The entity releases into the heir-line as intended. The mark-bearer's role was translator and key. The key is discarded after use. The Gate closes again. The Heir descends.`,
    isEnding: true,
    endingType: 'betrayal',
    endingId: 'ending_ch11_masked_heir_betrayal',
    effectsOnEnter: { setFlags: ['chapter11_heir_betrayal'] },
    choices: [],
  },

  {
    id: 'c11_corruption_ascendant_end',
    chapter: 'Chapter 11',
    title: 'The Mark Takes the Decision',
    location: 'The First Gate',
    imageKey: 'first_gate',
    text: `At corruption ≥ 80, the mark at the First Gate does not require the mark-bearer to make the decision. The mark makes the decision. Eleven chapters of accumulated corruption have produced a mark-bearer whose individual decision-making capacity and the mark's corruption-mediated agenda are no longer clearly distinguishable. The Gate opens — not because the mark-bearer chose to open it, but because the mark-bearer's corruption state is functionally identical to the mark's own response to the Gate's resonance. The entity releases through a Gate opened by a mark that was not fully controlled by the mark-bearer at the moment of opening. The entity notes the difference. The surface receives the release. The mark-bearer is at the Gate, in the silence after the decision, with no certainty about whether they made it.`,
    isEnding: true,
    endingType: 'corruption',
    endingId: 'ending_ch11_corruption_ascendant',
    effectsOnEnter: { setFlags: ['chapter11_corruption_ascendant'] },
    choices: [],
  },

  {
    id: 'c11_sealed_dark_end',
    chapter: 'Chapter 11',
    title: 'The Permanent Guardian',
    location: 'The First Gate',
    imageKey: 'first_gate',
    text: `The sealing requires the mark-bearer as part of the mechanism. The entity's third clarification, if received, was specific about this: "closed from outside by force — the force must be the mark." The mark-bearer who stays below to ensure the sealing holds is, in the Gate's operational terms, the sealing. The ascent does not happen. The sub-city holds a sealed gate and a living mark-bearer and a patient entity waiting for four more centuries. The surface above adapts to the loss of one more person who descended into the Archive's sub-basement and did not return. The mark reads the silence below as: stable. The sealing is complete. The mark-bearer is the completion.`,
    isEnding: true,
    endingType: 'wanderer',
    endingId: 'ending_ch11_sealed_in_dark',
    effectsOnEnter: { setFlags: ['game_complete', 'chapter11_sealed_dark'] },
    choices: [],
  },

  {
    id: 'c11_lone_witness_end',
    chapter: 'Chapter 11',
    title: 'The Witness Ascends Alone',
    location: 'The First Gate',
    imageKey: 'first_gate',
    text: `The lone wanderer exits the sub-city without speaking of what the decision was. Not silence as deception: silence as an accurate assessment that the surface population's current frame of reference cannot receive what happened at the First Gate in any usable form. The mark-bearer knows the original agreement. Knows the Containment Protocol's history. Knows the faction origins. Knows the nine-month countdown and what it means. Ascends to a surface that is fighting over a city without knowing it is a container. The lone witness will carry this until the timeline forces the information out or until the decision at the Gate produces its observable consequences on the surface. Either way, it will be known eventually. The witness chose not to be the moment it was known.`,
    isEnding: true,
    endingType: 'wanderer',
    endingId: 'ending_ch11_lone_witness',
    effectsOnEnter: { setFlags: ['chapter11_lone_witness'] },
    choices: [],
  },

  {
    id: 'c11_heir_alliance_end',
    chapter: 'Chapter 11',
    title: 'The Alliance Holds',
    location: 'The First Gate',
    imageKey: 'first_gate',
    text: `The Gate opens. The original agreement is honoured. The entity releases. The heir-line receives what the original agreement intended for it — not the entity's awareness as a possession, but the specific information the entity has been holding for four centuries: the complete memory of what the city was built on and why, translated into a form human decision-making can use. The Masked Heir carries this into Chapter 12. The mark-bearer carries a mark that is now quieter — the First Voice's signal reduced to a background hum after the entity's surface expression has ended. The alliance holds past the Gate, into the corridor, into the Archive's basement, toward the surface. What the Heir does with what they carry is the question Chapter 12 will answer. The mark-bearer will be there to see it.`,
    isEnding: true,
    endingType: 'faction',
    endingId: 'ending_ch11_masked_heir_alliance',
    effectsOnEnter: { setFlags: ['chapter11_heir_alliance'] },
    choices: [],
  },

  {
    id: 'c11_final_gate_path_end',
    chapter: 'Chapter 11',
    title: 'The First Gate — Path Unlocked',
    location: 'The First Gate',
    imageKey: 'first_gate',
    text: `The First Gate opens with full information, correct interface, and the complete understanding of what the mark was built to do. The entity releases in the form the original agreement specified: a departure, not an expansion. The mark ceases to produce its current effects over the following days. The corruption gradient clears. The First Voice goes. The sub-city becomes an empty infrastructure, its purpose served. The mark-bearer ascends with whatever companions survived and whatever version of the surface Chapter 12 contains, carrying the specific quality of someone who completed a multigenerational project that was always building toward this moment. The path to the Final Chapter's true ending is unlocked. The route through Chapter 12 will determine whether it is reached.`,
    isEnding: true,
    endingType: 'secret',
    endingId: 'ending_ch11_final_gate_path_unlocked',
    effectsOnEnter: { setFlags: ['chapter11_final_gate_unlocked', 'true_ending_route_active'] },
    choices: [],
  },

  {
    id: 'c11_machine_communion_end',
    chapter: 'Chapter 11',
    title: 'The Machines Carry It',
    location: 'The First Gate',
    imageKey: 'first_gate',
    text: `The Transit Line's full activation provides the channel. The Sleeping Server provides the interface protocol. The Gate opens through the relic infrastructure rather than through the mark's direct interface. The entity releases through the sub-city's circulation system, its departure consuming the Transit Line, the Engine, the Nursery, the Core in a sequence that the Server describes as: "Each component contributing its stored resonance to the release. They were built for this. They are doing what they were built to do." The tunnel network above loses its power source permanently. The factions lose what they were fighting over. The mark-bearer ascends into a surface that no longer has relic power and must reckon with what that means. The machine communion route is Chapter 12's hardest surface configuration and the mark-bearer's cleanest.`,
    isEnding: true,
    endingType: 'secret',
    endingId: 'ending_ch11_machine_communion',
    effectsOnEnter: { setFlags: ['game_complete', 'chapter11_machine_communion'] },
    choices: [],
  },

  {
    id: 'c11_truth_bearer_end',
    chapter: 'Chapter 11',
    title: 'The Truth Is Carried Up',
    location: 'The First Gate',
    imageKey: 'first_gate',
    text: `Three people ascending from the sub-city with the complete picture: the faction origins, the Containment Protocol's history, the entity's agreed release, the nine-month timeline and its resolution. The truth is not abstract. It is specific, documented in the Vault and the Deep Archive's records, confirmed by the Gate's own mechanism. Two companions and the mark-bearer carrying it to a surface that is fighting over a container without knowing it is a container. Chapter 12 will be the chapter where the truth meets the factions. The bearing of the truth — the specific act of carrying it up, with companions, with full information, with both the Gate's decision and the surviving relationships intact — is the route the Archive's evaluation criteria were designed to fail to predict. The mark registers the ascent as: complete.`,
    isEnding: true,
    endingType: 'savior',
    endingId: 'ending_ch11_truth_bearer',
    effectsOnEnter: { setFlags: ['chapter11_truth_bearer', 'truth_bearer_ch12'] },
    choices: [],
  },

  {
    id: 'c11_city_awakened_end',
    chapter: 'Chapter 11',
    title: 'The City Wakes to What It Is',
    location: 'The First Gate',
    imageKey: 'first_gate',
    text: `The Gate is sealed. The Deep Archive's records are released to the Archive above — every piece of documentation the Old Government Vault contained, surfaced through the Archive's existing distribution infrastructure, addressed to all five factions. The Containment Protocol's history. The faction origins. The entity's timeline. The sealing's cost. The surface receives it over the hours following the mark-bearer's ascent. The factions will respond to the truth the way factions respond to anything: with conflict, with negotiation, with the specific recalibration of people who have been told that the thing they were fighting over is not what they thought it was. The city wakes to what it is. Chapter 12 will determine what it does with that information.`,
    isEnding: true,
    endingType: 'savior',
    endingId: 'ending_ch11_city_awakened',
    effectsOnEnter: { setFlags: ['chapter11_city_awakened', 'faction_truth_released'] },
    choices: [],
  },

];
