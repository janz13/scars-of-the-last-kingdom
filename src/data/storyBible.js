/**
 * ============================================================
 *  SCARS OF THE LAST KINGDOM — STORY BIBLE  (v2.0)
 * ============================================================
 *
 * This file is the canonical machine-readable reference for all lore,
 * world-building, faction design, companion rules, and writing standards
 * for "Scars of the Last Kingdom."
 *
 * It is NOT imported by the game. It exists so that every story node
 * written for this game is consistent with the established world,
 * regardless of who writes it or when.
 *
 * The authoritative human-readable version is STORY_BIBLE.md.
 * If these files disagree, STORY_BIBLE.md takes precedence.
 *
 * Before writing any new chapter content, read this file.
 * If something contradicts what you find in the storyNodes,
 * this file is the authority — update the node.
 *
 * VERSION NOTES (v2.0):
 * - Hollow Children leader corrected: Kira (not Pera)
 * - Last Archive archivist corrected: Velna (missing/gone)
 * - Mira's true backstory added: Last Archive extraction specialist
 * - Cain's secret expanded: Glass Court knew about marks pre-Blackout
 * - Inquisitor Sera added as Chapter 4 antagonist
 * - Character creation section added
 * - Chapter roadmap updated to reflect chapters 1–4 as written
 * - Hallucination system documented
 * - Companion interlude events documented
 * ============================================================
 */


// ══════════════════════════════════════════════════════════════════════════════
//  SECTION 1 — GAME IDENTITY
// ══════════════════════════════════════════════════════════════════════════════

export const GAME_IDENTITY = {

  title: 'Scars of the Last Kingdom',

  genre: 'Dark dystopian fantasy survival visual novel RPG',

  tagline: 'The city is dead. The mark on your wrist is not.',

  platform: 'Android / PWA',

  playerExperience: `
    The player navigates a dying world through text, dialogue, and consequential
    choices. They feel the weight of scarcity — hunger, thirst, exhaustion — while
    also carrying something stranger than survival: a mark that should not exist,
    reacting to things that should be dead.

    The game is not about winning. It is about what the player becomes by the end,
    and whether they can live with it.
  `,

  toneKeywords: [
    'atmospheric',            // Every scene should have a physical presence
    'morally heavy',          // Choices should cost something real
    'slow burn',              // Revelations are earned, not given
    'intimate',               // The world is vast but the story is personal
    'bleak but not hopeless', // Darkness with reason, not darkness for shock
  ],
};


// ══════════════════════════════════════════════════════════════════════════════
//  SECTION 2 — WORLD HISTORY
// ══════════════════════════════════════════════════════════════════════════════

export const WORLD_HISTORY = {

  overview: `
    The world of Scars of the Last Kingdom is the near future of our own — recognisable
    in its ruins but transformed by a century of relentless scarcity and strange discovery.

    The city at the game's center was once a regional capital: millions of people,
    a functioning transit network, infrastructure, culture. It had a name. Nobody
    uses it now. Survivors call it the City, or sometimes the Scar — because the
    skyline above ground looks like something massive tore through it and kept moving.
  `,

  timeline: [
    {
      era: 'The Age of Extraction (100–50 years before the game)',
      summary: `
        Industrial overreach destabilises the region. Aquifers collapse. Agricultural
        zones fail. The government responds with aggressive urban consolidation —
        moving displaced populations into high-density metro zones. The underground
        metro system is expanded far beyond its original design to accommodate
        the displaced. This is when the first "relic zones" are documented: deep
        excavation teams find structures that predate any recorded civilisation.
        The government classifies these findings. The Last Archive is founded
        in secret to study them.
      `,
    },
    {
      era: 'The Compact Period (50–20 years before the game)',
      summary: `
        Surface resources are rationed. A political coalition called the Glass Court
        rises to power, composed of scientists, engineers, and former government
        officials who believe that technology — specifically the relic technology
        now being quietly reverse-engineered — can stabilise the collapse. They
        succeed, partially. The city stays alive longer than it should.

        A paramilitary organisation called the Iron Saints is established to enforce
        the Glass Court's rationing mandates. They are effective and brutal.
        Underground resistance movements multiply. The Red Choir begins broadcasting.
      `,
    },
    {
      era: 'The Unravelling (20–5 years before the game)',
      summary: `
        Relic technology, incompletely understood, is integrated into the city's
        power infrastructure. The Last Archive warns that the integration is unstable.
        The Glass Court suppresses the warning. For seventeen years the city runs
        on a power grid partially sustained by relic energy. Nobody fully understands
        how it works. Everyone becomes dependent on it.

        Deep in the metro excavations, archaeologists find the Vault — a sealed
        chamber of relic density unlike anything previously discovered. The Last
        Archive maps it. The Glass Court wants to open it. The Iron Saints are
        dispatched to secure the site. The Red Choir says it is a tomb and should
        stay closed.
      `,
    },
    {
      era: 'The Blackout (5 years before the game)',
      summary: `
        The Vault is opened by a Glass Court extraction team under Director Kael's
        authorisation. Seventeen seconds later, every power system in the city —
        conventional and relic — fails simultaneously. The failure is total,
        instantaneous, and impossible by any conventional physics. Four hundred
        thousand people die in the first week — not from the blackout itself,
        but from the systems the blackout killed: medical infrastructure, heating,
        water treatment, food refrigeration.

        The Iron Saints call it Day Zero.
        The Glass Court calls it The Incident.
        The Hollow Children call it The Collapse.
        The Red Choir calls it The Opening.
        The Last Archive calls it The Response.
      `,
    },
    {
      era: 'The Present (game start)',
      summary: `
        Five years after the Blackout. The city's surface is mostly ruins and patrols.
        Most surviving population lives underground in the metro network. Factions
        have carved out territory. Resources are critical. The relic energy grid
        that once ran the city is gone — but relic objects still exist, scattered
        in the ruins, and some of them still respond to contact. Nobody understands
        why. Nobody knows what opened the Vault, or what came out.

        The player wakes in the metro with a mark on their wrist that was not there
        before the Blackout.
      `,
    },
  ],
};


// ══════════════════════════════════════════════════════════════════════════════
//  SECTION 3 — THE BLACKOUT
// ══════════════════════════════════════════════════════════════════════════════

export const THE_BLACKOUT = {

  whatHappened: `
    The Blackout was not a conventional power failure. It was not sabotage,
    electromagnetic pulse, or infrastructure decay. Something responded to the
    opening of the Vault. Every system in the city — mechanical, electronic,
    relic-integrated — ceased operation within seventeen seconds of the Vault breach.

    Systems outside the city were not affected. The failure had a boundary,
    roughly following the old city limits. Outside that boundary, the world
    continued as normal. Inside, everything stopped.
  `,

  immediateConsequences: [
    'Hospitals lose power. Patients on life support die within hours.',
    'Metro system locks in place, trapping thousands underground.',
    'Surface heating fails. Winter is three months away.',
    'Water treatment stops. Contamination spreads within days.',
    'Food refrigeration fails. Stored provisions rot within a week.',
    'Communication is severed. Nobody can call for help.',
    'The Iron Saints, unable to contact command, begin acting independently.',
  ],

  longTermConsequences: [
    'Population drops from approximately 2.4 million to an estimated 80,000 survivors in five years.',
    'Surface is partially reclaimed by vegetation and structural decay.',
    'The metro becomes the primary habitation zone for survivors.',
    'Relic objects become the most valuable trade commodity — the only technology still functional.',
    'Pre-Blackout social structures collapse completely. New factions form around resource control.',
    'Widespread psychological trauma. Collective amnesia around the cause.',
    'A generation of children grows up in the metro who have never seen the surface in daylight.',
  ],

  factionNames: {
    ironSaints: 'Day Zero',
    glassCourt: 'The Incident',
    hollowChildren: 'The Collapse',
    redChoir: 'The Opening',
    lastArchive: 'The Response',
  },

  whatNobodyKnows: `
    Nobody knows what is in the Vault, because nobody who entered it after
    the Blackout came back. The extraction team that opened it disappeared.
    Their equipment was found — neatly arranged — outside the entrance.
    None of their bodies were ever recovered.

    Nobody knows why the wrist marks appeared after the Blackout. Approximately
    40 to 60 survivors developed them, though this number is uncertain because
    many with marks hide them. The Iron Saints scan for marks at checkpoints.
    They do not explain why.
  `,
};


// ══════════════════════════════════════════════════════════════════════════════
//  SECTION 4 — RELIC TECHNOLOGY
// ══════════════════════════════════════════════════════════════════════════════

export const RELIC_TECHNOLOGY = {

  whatRelicsAre: `
    Relics are objects — sometimes tools, sometimes structures, sometimes
    indistinguishable from natural stone — that predate recorded civilisation
    by an unknown period. They were first found in deep excavations under the
    metro tunnels during the Age of Extraction.

    They are not made of known materials. They do not follow conventional physics
    when powered. They were clearly manufactured by intelligence, but by whom,
    and for what purpose, is unknown. The Last Archive has spent forty years
    studying them and cannot answer the basic question of origin.
  `,

  howTheyWork: `
    Relic technology appears to respond to biological contact, specifically to
    certain bioelectric signatures. Most humans produce no response. A small
    number — marked individuals — produce a response that can power relic
    objects, open relic locks, and in some cases trigger relic displays of
    information that cannot be read in any known language.

    The Glass Court reverse-engineered relic energy into the city's power grid
    using a process they never fully understood. The Blackout suggests they
    were more right about the power source than they were right about the safety.
  `,

  types: [
    {
      name: 'Relic Shards',
      description: 'Small fragments, usually palm-sized. Some emit heat. Some emit light. Some do nothing until contact with a mark. The most common relic trade item.',
      value: 'High. One shard can purchase a week of clean water.',
    },
    {
      name: 'Relic Locks',
      description: 'Sealed doors or containers of relic construction. Cannot be forced open by conventional means. Respond only to mark-bearers, and not all of them — each lock appears to have a bioelectric "signature" it accepts.',
      value: 'Incalculable — what they guard may be priceless.',
    },
    {
      name: 'Relic Transmitters',
      description: 'Disc-shaped devices found primarily near the Vault zone. When activated, they emit a signal that the Last Archive has partially decoded as a map — a map of something underground that matches no known tunnel system.',
      value: 'The Archive pays more for these than anything else.',
    },
    {
      name: 'Relic Weapons',
      description: 'Extremely rare. Objects that concentrate and discharge relic energy. The Iron Saints confiscate every one they find. None have been publicly demonstrated.',
      value: 'Priceless, and extremely dangerous to possess.',
    },
    {
      name: 'The Vault',
      description: `Not a portable object but the largest known relic structure. Sealed chamber of indeterminate depth beneath the metro's lowest excavated level. Entered once, never re-entered. Contents unknown.`,
      value: 'The central mystery of the game.',
    },
  ],

  dangerOfRelics: `
    Prolonged exposure to relic energy — especially for mark-bearers — causes
    measurable changes. Not physical deformity, but perceptual shift: heightened
    sensitivity to relic objects, increased frequency of involuntary mark activation,
    and in some cases, reported experiences of "knowing" the location of relic objects
    without having been near them.

    This effect is tracked in the game as Corruption. High Corruption unlocks
    certain relic-specific choices but closes others. There is no clean return
    to zero. Once the mark has learned from a relic, it does not forget.
  `,
};


// ══════════════════════════════════════════════════════════════════════════════
//  SECTION 5 — THE WRIST MARK
// ══════════════════════════════════════════════════════════════════════════════

export const WRIST_MARK = {

  appearance: `
    A sigil on the inner left wrist, approximately palm-sized. Faintly luminescent
    in low light — a violet pulse, regular as a heartbeat but not synchronised with
    the bearer's actual heartbeat. The lines are precise and impossibly fine, as if
    engraved from within rather than applied to the surface. It does not hurt.
    It does not fade. It cannot be removed.
  `,

  whenItAppeared: `
    Mark-bearers report waking with the mark on the morning after the Blackout.
    There is no consistent explanation. The bearers were in different locations,
    different circumstances, different demographics. The only common factor is
    that every mark-bearer was within the city limits at the moment of the Blackout.
    Nobody who was outside the boundary developed a mark.
  `,

  whatItDoes: [
    'Activates relic objects within approximately two meters of the bearer.',
    'Responds to other relic technology, heating or pulsing when near active relics.',
    'Opens certain relic locks — but not all; locks appear to be keyed to specific signatures.',
    'Accumulates relic energy exposure (tracked as Corruption), which amplifies its range and sensitivity.',
    'Displays, under high Corruption, fragments of what appears to be language — no linguist has read it.',
    'At maximum Corruption: reportedly shows the bearer the location of the Vault, from inside.',
  ],

  originTheories: [
    'The Vault activated them remotely as part of whatever "Response" the opening triggered.',
    'The marks are not new — they were always latent in certain individuals, and the Blackout was the catalyst that expressed them.',
    'The marks are the relic civilisation\'s method of selecting successors or messengers.',
    'The marks are a warning system, and the Corruption accumulation is the countdown.',
  ],

  truthRevealedAt: 'Maximum Last Archive trust — Chapter 7. The marks identify people with a specific bioelectric signature. The selection criteria is mechanical, not chosen. The player was not chosen. They are useful. That distinction matters.',

  howOthersTreatMarkedIndividuals: {
    ironSaints: 'Register and monitor. High-trust Saints confiscate relics from mark-bearers "for safety." Low-trust Saints arrest on sight.',
    glassCourt: 'Study. Mark-bearers are valuable research subjects. The Court pays well for voluntary access and extracts by force if they think they can manage it.',
    hollowChildren: 'Cautious reverence. Metro folklore has built up around the marks. Some see them as protectors; others see them as cursed.',
    redChoir: 'Sacred. The Choir believes mark-bearers are chosen. They want the player to join them. They are wrong about why, but right about the significance.',
    lastArchive: 'The only group with genuine, documented knowledge about marks. They will share it — carefully, and only in exchange for trust and access.',
  },
};


// ══════════════════════════════════════════════════════════════════════════════
//  SECTION 6 — CORRUPTION
// ══════════════════════════════════════════════════════════════════════════════

export const CORRUPTION = {

  definition: `
    Corruption is not moral failure. It is not evil. It is the accumulation of
    relic energy exposure in a mark-bearer's system — a biological and perceptual
    change that cannot be reversed. Think of it as the mark learning.

    In mechanical terms: Corruption is a stat from 0 to 100. It rises through
    relic contact, certain choices, and mark activation. It never decreases.
    High Corruption unlocks certain choices and closes others.
  `,

  stages: [
    {
      range: '0–20',
      label: 'Latent',
      effects: 'Mark activates relics passively. No visible changes to the player.',
    },
    {
      range: '21–40',
      label: 'Aware',
      effects: 'Player begins sensing relic locations without line of sight. Certain Archive scholars notice and react differently.',
    },
    {
      range: '41–60',
      label: 'Resonant',
      effects: 'Mark activates relics at greater range. Relic locks previously closed to the player may open. The Red Choir approaches with more urgency.',
    },
    {
      range: '61–80',
      label: 'Saturated',
      effects: 'Corruption choices become available that bypass normal skill requirements. Some companions react with unease. Faction attitudes shift.',
    },
    {
      range: '81–100',
      label: 'Consumed',
      effects: 'The mark displays fragments of unknown language. The player begins receiving information that could not be known by ordinary means. Hallucinations trigger at ≥70. The Corruption ending becomes available.',
    },
  ],

  hallucinationSystem: {
    triggerThreshold: 70,
    description: 'At Corruption ≥ 70, the game injects hallucination nodes mid-play. These are not reachable through normal story navigation. All hallucination choices use nextNode: "__return__" to resume the real story.',
    nodeIds: [
      'halluc_mark_speaks',    // The mark drops words directly into the part of your mind that processes shame.
      'halluc_the_dead_speak', // The dead appear in the tunnel. They are not angry. That is the worst part.
      'halluc_throne_vision',  // The rebuilt city from somewhere high. Something in your left hand.
    ],
    rules: [
      'All choices must use nextNode: "__return__"',
      'All choices must include removeFlags: ["halluc_active"] in effects',
      'Hallucination nodes use chapter: "Vision"',
      'The game_engine sets halluc_active and pendingReturnNodeId before redirecting',
    ],
  },

  corruptionIsNotVillainy: `
    Corruption should never be written as the "evil stat." High-Corruption
    characters are not monsters. They are people who have been changed by
    something they didn't choose. Some of the most morally admirable choices
    in the game should be available only at high Corruption, because only
    someone who has touched that depth of relic knowledge can see the path.

    Equally: low Corruption is not virtue. Staying "clean" means staying ignorant.
    The full picture of what happened requires knowing things that cost something.
  `,
};


// ══════════════════════════════════════════════════════════════════════════════
//  SECTION 7 — SURVIVAL SYSTEMS
// ══════════════════════════════════════════════════════════════════════════════

export const SURVIVAL_SYSTEMS = {

  hungerAndScarcity: `
    Hunger and thirst are not background numbers. They are the moral context
    of every choice. When the player has plenty, they can afford generosity.
    When they are empty, they are face to face with what they are actually
    willing to do.

    Food and water are distributed by factions — and each faction uses that
    distribution as leverage. The Iron Saints ration by compliance. The Hollow
    Children share freely but have the least. The Glass Court stockpiles and
    experiments on their own supplies. The Red Choir consecrates theirs with
    ritual. The Last Archive trades information for provisions.

    Write scarcity as weight, not as a penalty. A player who chooses to share
    their last food with a stranger should feel that sacrifice, not just see
    a number change.
  `,

  stats: {
    hunger: 'Fullness. Drains slowly over time and with certain choices. At 0: morale begins to drop. At 0 hunger + 0 morale: survival ending.',
    thirst: 'Hydration. Drains faster than hunger. Contaminated water is a constant risk. At 0: health begins to drop faster.',
    health: 'Physical condition. Injuries reduce it. Sleep and medicine restore it. At 0: death ending.',
    morale: 'Mental state. Affects dialogue tone and some choice availability. Does not kill directly but opens dark options at very low values.',
    corruption: 'Relic exposure. Only rises, never falls. Unlocks relic-gated choices. Drives the hidden plot.',
    trust: 'General survivor trust — how much the community believes in the player. Affects faction attitudes collectively.',
  },

  validDiceStats: ['strength', 'intelligence', 'agility', 'charisma', 'luck'],
  invalidDiceStats: ['corruption', 'trust', 'hunger', 'thirst', 'health', 'morale'],

  writing: `
    Survival stats should be reflected in narration. A player with 20 hunger
    does not get the same narration as a player with 80. If a scene involves
    eating or drinking, note the context of what the player's supplies look like.
    If a player's health is low, their physical limitations should appear in
    the text — slower, more careful, more aware of their body.

    Do not write survival checks as abstracted menus. Write them as moments.
  `,
};


// ══════════════════════════════════════════════════════════════════════════════
//  SECTION 8 — THE CITY (ALL ZONES)
// ══════════════════════════════════════════════════════════════════════════════

export const THE_CITY = {

  overview: `
    The city has no canonical name in the game. Characters refer to it as
    "the City," "the Scar," or by specific district names. This is intentional:
    the name died with the people who used it daily. What remains is geography.
  `,

  surfaceZones: [
    {
      name: 'The Scar District',
      chapters: [1, 2],
      description: 'The former city centre, closest to the Vault site below. Highest structural damage. Buildings half-collapsed, streets opened by subsidence. Iron Saints maintain one patrol route. Relic density is highest here.',
      feel: 'Oppressive. Physically dangerous. The ruins here feel watched.',
      encounters: ['Iron Saint patrols', 'Relic scavengers', 'Red Choir shrines', 'Structural collapse hazards'],
    },
    {
      name: 'The Outer Ring',
      chapters: [2, 8],
      description: 'Former residential districts on the city periphery. Less damaged than the Scar but largely depopulated. Wind comes through without obstruction. Vegetation has begun to reclaim the streets.',
      feel: 'Lonely. Vast. Occasional strange beauty.',
      encounters: ['Abandoned survivor camps', 'Black market routes', 'Glass Court survey teams', 'Feral animals'],
    },
    {
      name: 'The Checkpoint Corridor',
      chapters: [1, 2, 4],
      description: 'A fortified strip connecting three Iron Saints surface positions. Razor wire, wand-equipped soldiers, identity processing. The official route between underground and surface. Deeply unsafe for mark-bearers.',
      feel: 'Bureaucratic violence. Everything is procedure. The procedure is designed to extract compliance.',
      encounters: ['Iron Saint checkpoints', 'Informants', 'Desperate civilians', 'Processing queues'],
    },
    {
      name: 'The Glass Quarter',
      chapters: [2, 5],
      description: 'Former scientific and administrative district. The Glass Court maintains several above-ground facilities here, powered by relic energy they somehow still have access to. Clean, clinical, unsettling.',
      feel: 'Wrong kind of normal. Too orderly for what surrounds it.',
      encounters: ['Glass Court researchers', 'Security', 'Subject transfer transports', 'Archive ruins'],
    },
    {
      name: 'District 4 — The Surface',
      chapters: [2],
      description: 'Open ground above the metro network. Iron Saints patrol in force. Ash drifts through intersections. Three days of survival here test every resource.',
      feel: 'Exposed. Relentless. The sky is the wrong colour.',
      encounters: ['Saints patrol routes', 'Dehydration hazards', 'Black market exfil points'],
    },
    {
      name: 'The Eastern Quarter',
      chapters: [2, 6],
      description: 'Red Choir territory. A former concert hall converted to cathedral use. The Choir\'s broadcasts reach farther from here than anywhere else.',
      feel: 'Feverish. Communal. Something is resonating in the walls.',
      encounters: ['Choir recruits', 'Mark-bearer community', 'Broadcast equipment', 'The Voice\'s broadcasts'],
    },
  ],

  undergroundZones: [
    {
      name: 'Metro Line 9 — The Starting Zone',
      chapters: [1],
      description: 'Sub-level 3 of the old Line 9 metro. Where the player begins. Emergency lighting, stripped resources, scattered survivor evidence. Connected via tunnel to other metro branches.',
      feel: 'Cold. Familiar somehow. Everything that was once routine is now survival.',
      keyLocations: [
        'The Ruined Station (chapter1_start)',
        'Platform 9-B Vending Row',
        'Service Corridor North',
        'The Concourse Junction',
        'Metro Security Room',
        'Clinic Booth — East Wing',
        'Archive Antechamber — Sublevel 6',
      ],
    },
    {
      name: 'The Hollow Warrens',
      chapters: [1, 3],
      description: 'Hollow Children territory. A network of converted maintenance tunnels, roughly habitable. Lanterns, salvaged furniture, communal sleeping areas. The most human-feeling space underground.',
      feel: 'Crowded. Warm. Precarious. Community built from nothing.',
      keyLocations: ['Main Warren Hall', 'Distribution Point', 'Kira\'s meeting spaces', 'The Wall (community history)'],
    },
    {
      name: 'The Saints Processing Hub',
      chapters: [1, 4],
      description: 'Iron Saints underground administrative centre. Former metro management offices, converted to ID processing, supply control, and detention. Wand scans at entry.',
      feel: 'Authority without legitimacy. Everything is documented. Documentation is control.',
      keyLocations: ['Registration desk', 'Holding cells', 'Supply depot', 'Command office'],
    },
    {
      name: 'The Black Market Vein',
      chapters: [1, 2],
      description: 'Informal trade zone in decommissioned tunnels between Line 9 and the Hollow Warrens. No faction officially controls it, which is why it exists. Everything is for sale if you know which shadow to approach.',
      feel: 'Clandestine vitality. Dangerous honesty. People who have nothing left to lose.',
      keyLocations: ['Main stall row', 'Back alcoves', 'The weighing room', 'The courier post'],
    },
    {
      name: 'The Last Archive Entrance',
      chapters: [1, 2, 7],
      description: 'A sealed section of pre-Blackout metro infrastructure, converted to Archive use. The outer hall is accessible; the inner sanctum requires invitation, a specific mark signature, or both.',
      feel: 'Old knowledge. Paper smell. Controlled desperation to preserve something.',
      keyLocations: ['Outer hall', 'Inner sanctum door', 'Velna\'s research station (before her disappearance)', 'The secondary access point (secret ending route)'],
    },
    {
      name: 'The Vault Approaches',
      chapters: [2, 6, 7],
      description: 'The tunnels leading to the Vault excavation site. Officially sealed by Iron Saints. Actually used by Archive researchers, Choir pilgrims, and the desperate. Heavy relic density. The mark reacts constantly here.',
      feel: 'Wrong. Something happened here and is still happening. The air feels thicker.',
      keyLocations: ['Iron Saints seal point', 'Choir access tunnels', 'Relic transmitter cluster', 'The Vault entrance (unreachable until Chapter 7)'],
    },
    {
      name: 'The Hollow Sanctum — Sublevel 7',
      chapters: [3],
      description: 'The political and communal heart of the Hollow Children\'s deeper warrens. Further from the surface than Line 9. Kira\'s meeting spaces, the Builder Quarter, the Walker staging tunnels, and the Archive Observation Post all branch from here.',
      feel: 'Underground civilisation. Fragile. Detailed. Something is wrong with the changed child in the back room.',
      keyLocations: ['Builder Quarter', 'Walker Staging Tunnels', 'Archive Observation Post', 'Kira\'s Private Tunnel', 'The Changed Child\'s room'],
    },
    {
      name: 'Flooded Sublevel 9 — The Record Room',
      chapters: [3],
      description: 'A pre-Blackout research basement that flooded before the Blackout but retained its documentation on sealed shelving. Accessible only to those who know the tunnel path.',
      feel: 'Cold water. Submerged history. Paper that should not have survived.',
      keyLocations: ['Record shelving (sealed)', 'The central document (proves the city was built over something intentional)'],
    },
    {
      name: 'Iron Saints Northern Fortress',
      chapters: [4],
      description: 'The Iron Saints\' primary underground command post. Inquisitor\'s Records Hall, the Sinner Registry, training yards, the confession hall. Either the player is here as a registered citizen or a covert operative.',
      feel: 'Institutional. Disciplined. The specific violence of a bureaucracy with a mandate.',
      keyLocations: ['Inquisitor\'s Records Hall', 'The Sinner Registry', 'Saints Training Yard', 'Confession Hall', 'Sera\'s Private Office', 'Barracks of Ash'],
    },
    {
      name: 'The Checkpoint Grid — Sector 4',
      chapters: [4],
      description: 'The Saints\' checkpoint network at its densest. The player must navigate this as either a registered citizen or a covert operative.',
      feel: 'Surveillance. Every movement documented. The wand operators watch everything.',
      keyLocations: ['Iron checkpoint', 'Purification yard', 'Prison carts', 'War shrine', 'Saint furnace'],
    },
  ],
};


// ══════════════════════════════════════════════════════════════════════════════
//  SECTION 9 — MAJOR FACTIONS
// ══════════════════════════════════════════════════════════════════════════════

export const FACTIONS = {

  ironSaints: {
    fullName: 'The Iron Saints',
    motto: 'Order is survival.',
    shorthand: 'Saints / Saint patrols',
    colorCode: '#8e3a2a',
    reputation: { min: -100, max: 100, neutral: 0 },

    coreBeliefs: `
      Without structure, the remaining eighty thousand survivors will consume each
      other within a year. The Iron Saints believe — genuinely, most of them —
      that their mandate is the preservation of what remains of civilisation.
      They are not wrong that order matters. They are wrong about who gets to
      define it, and at what cost.

      The Saints have a deep institutional fear of relic technology after the Blackout.
      Their solution is elimination: confiscate every relic object, register every
      mark-bearer, and systematically reduce the number of variables they cannot predict.
    `,

    leader: {
      name: 'Commander Aldric Voss',
      age: 58,
      background: `
        Former city military officer who survived the Blackout underground in a Saints
        bunker. Lost his family in the first week. Has not spoken of them since.
        Rebuilt the Saints from a communication-severed unit into a functioning authority
        through sheer will and documented procedure.
      `,
      appearance: 'Large. Deliberate in all movement. Gives no impression of urgency because urgency would suggest that what he has built can be threatened. It cannot be, yet. He knows it cannot be, yet.',
      motivation: 'Maintain the structure until something better exists. Nothing better exists.',
      secret: 'Voss has a mark-bearing informant embedded in every faction except the Choir. He knows more about the marks than he admits. He knows the Vault was deliberately opened. He knows who authorised it.',
    },

    chapterFourAntagonist: {
      name: 'Inquisitor Sera',
      age: 41,
      role: 'Senior Inquisitor, Northern Fortress. Chapter 4 primary antagonist.',
      background: `
        Sera is not a true believer. She is a pragmatist who chose the Saints early
        and has been steering from inside ever since. She knew about the Archive
        before the Blackout and deliberately concealed it from the order's founder.
        This secret is her leverage and her liability.
      `,
      secret: 'She knew about the Last Archive before the Blackout. She concealed it from the order\'s founder. All documentation of this is somewhere in her private office.',
      writingNote: 'Sera cannot be defeated in the conventional sense. She can be outmanoeuvred. Every confrontation with her should feel like a negotiation in which she controls the terms until she does not.',
    },

    strengths: [
      'Largest organised force — approximately 3,000 active members',
      'Control of the most reliable food distribution network (for registrants)',
      'The only functional medical infrastructure above baseline',
      'The wands — ability to detect relics and marks at checkpoints',
      'Documentation — they know more about who is alive and where than anyone',
    ],

    weaknesses: [
      'Institutional fear of relic technology limits their understanding of it',
      'Internal fractures — some Saints believe the mandate has gone too far',
      'Legitimacy is self-declared since the Blackout severed command structure',
      'Mark-bearer registration is incomplete — they cannot find what they are not told about',
    ],

    howTheyTreatThePlayer: `
      Initially suspicious. High Saints rep enables: reliable food access, checkpoint
      passes, confiscated relic access. High rep cost: they will eventually ask the
      player to inform on other factions.

      Low Saints rep: checkpoint harassment, confiscation risk, arrest on low rep
      combined with a visible mark.
    `,

    allianceRoute: `
      The player aligns with the Saints by embracing order — registering, complying,
      demonstrating that a mark-bearer can be controlled. Voss respects demonstrated
      consistency above all things. At maximum trust, the player learns: Voss knows
      the Vault was deliberately opened, and he knows who ordered it.
    `,

    betrayalRoute: `
      The Saints betray when they determine the player is uncontrollable: refusal to
      register, helping mark-bearers evade detection, accumulating relic objects past
      their tolerance, or being caught with the Choir. Betrayal is not personal —
      it is procedural.
    `,

    endingPath: `
      FACTION ENDING: The player brokers a formal agreement — Saints authority in
      exchange for protected status for mark-bearers and Archive independence. Voss
      agrees, conditionally. The city gets order. Mark-bearers get the right to exist.
      Nobody gets the truth about the Vault. A compromise ending. Not heroic.
      Not comfortable. Sustainable.
    `,
  },

  glassCourt: {
    fullName: 'The Glass Court',
    motto: 'Knowledge is survival.',
    shorthand: 'the Court / Court researchers',
    colorCode: '#2a5a6a',
    reputation: { min: -100, max: 100, neutral: 0 },

    coreBeliefs: `
      The right application of intelligence can solve any resource problem — and they
      were largely correct until the Vault. Five years later, they still believe it.
      Their internal culture is rational, hierarchical, and quietly monstrous. They
      do not think of themselves as doing harm. They think of every sacrifice as a
      necessary data point. The fact that the data points are people is something
      they have learned not to look at directly.
    `,

    leader: {
      name: 'Director Seraphine Kael',
      age: 44,
      background: `
        A physicist who was present at the Glass Court's first successful relic energy
        extraction. Not present at the Vault opening — she was in a different facility.
        She watched the Blackout happen on instruments that went dead in sequence.
        She has been trying to understand it ever since. She is convinced the marks are
        a key. She is right. She is wrong about what lock.
      `,
      appearance: 'Precise. Contained. Has learned to read people the way she reads instruments: for information, not for connection. This has been useful. It has also made her very dangerous.',
      motivation: 'Understand the Vault. Understand the marks. Reverse the Blackout or at minimum prevent another one.',
      secret: 'Kael ordered the Vault opening. She did not understand what would happen. She has never admitted this and has covered every trace. She also knew about the marks before the Blackout and shared this knowledge with Cain, who has been sitting on it for five years.',
    },

    strengths: [
      'Functional laboratory equipment powered by a surviving relic cache',
      'Medical knowledge — the best doctors in the city work for the Court',
      'The only group systematically studying mark behaviour and relic interaction',
      'Control of three above-ground facilities the Saints have not entered (yet)',
      'Information — they have documented the city continuously since before the Blackout',
    ],

    weaknesses: [
      'Their relic cache powering their facilities is finite',
      'Internal ethical fractures — some researchers are breaking from Kael\'s methods',
      'The Saints tolerate them but do not trust them — one incident from conflict',
      'They need mark-bearers for research and cannot fully recruit; coercion creates enemies',
      'Kael\'s secret is a structural weakness — exposure would collapse the Court\'s legitimacy',
    ],

    howTheyTreatThePlayer: `
      Initially with calibrated warmth — they prefer subjects who believe they are
      partners. High rep enables: the best medical care in the city, genuine relic
      knowledge, access to pre-Blackout documentation. High rep cost: controlled
      relic activation tests that raise Corruption.

      Low rep: research subject without consent. They will attempt capture if the
      player is sufficiently valuable and sufficiently isolated.
    `,

    allianceRoute: `
      The player aligns with the Glass Court by committing to the research mandate —
      sharing mark activations, providing relic objects, and eventually gaining Kael's
      trust enough to learn the truth about the Vault opening. The alliance ending
      requires the player to choose whether to expose her or protect her secret.
    `,

    betrayalRoute: `
      The Court betrays the player the moment they become more valuable as a
      controlled subject than as a willing partner. Usually triggered by: the
      player acquiring information about the Vault opening, refusing testing,
      or reaching a Corruption level that makes them useful for a procedure
      Kael wants to run that the player would not consent to.
    `,

    endingPath: `
      FACTION ENDING: The player, with information about Kael's role in the Vault
      opening, becomes the Court's de facto moral compass. Protect Kael and
      stabilise the Court — the research continues. Expose her — the Court
      fractures but the information becomes public. Either way, the player has
      changed what the Court is.
    `,
  },

  hollowChildren: {
    fullName: 'The Hollow Children',
    motto: 'Survival is communal or it is nothing.',
    shorthand: 'the Hollow / Hollow kids / the Warrens',
    colorCode: '#5a7a3a',
    reputation: { min: -100, max: 100, neutral: 0 },

    coreBeliefs: `
      Survival is communal or it is nothing. The Hollow Children are the largest
      civilian survivor group and the only faction built from the bottom up rather
      than imposed from above. They formed in the metro tunnels during the first
      winter — people who had nothing pooling what little they had. Their ethics
      are simple and extremely difficult: share what you can, protect who you can,
      ask nothing that you wouldn't give yourself.

      They do not have a political ideology. They have a practice. That practice
      is fragile and beautiful and the game should never let the player forget
      that it could fail.
    `,

    leader: {
      name: 'Kira',
      title: 'Elder — informal title of community recognition',
      age: 67,
      background: `
        A former metro maintenance supervisor who was underground when the Blackout
        happened. Spent the first night guiding survivors through the tunnel system
        by memory. Has lived in the Warrens since. Has never been to the surface
        since the Blackout. Can navigate every inch of the metro system in the dark.
        Does not lead by command — leads by example, endurance, and an absolute
        refusal to eat before the children eat.

        In Chapter 3, her leadership is under pressure from two internal factions:
        the Builders (fortify and survive) and the Walkers (reach the Archive).
      `,
      appearance: 'Small, weathered, moves slowly. Burns no urgency on anything that is not urgent. Watching her notice something is one of the most unsettling experiences in the Warrens.',
      motivation: 'Keep the Warrens alive. Keep the practice alive. Keep the children who grew up here from becoming what the other factions became.',
      secret: 'Kira has a mark. She has had it since the Blackout. She has told no one. She has used it twice, both times to find water in tunnels no one else knew about. She will reveal this only to a player with maximum trust.',
    },

    strengths: [
      'Largest civilian population — approximately 15,000 people in the Warrens',
      'Genuine community loyalty — intelligence about movements comes freely here',
      'Deep tunnel knowledge — Hollow guides can move players through the metro unseen',
      'The moral center of the city — helping the Hollow has cascading goodwill effects',
      'Access to salvaged resources that no faction has catalogued because they are not organized',
    ],

    weaknesses: [
      'No military capacity to speak of — Hollow fighters exist but are few and lightly armed',
      'Completely dependent on continuing to receive some resources from above',
      'Any faction that decides to cut their supply has immediate leverage',
      'Their openness makes them vulnerable to infiltration (Saints informants are in the Warrens)',
      'Kira\'s age and the lack of clear succession is a structural risk',
    ],

    howTheyTreatThePlayer: `
      With provisional warmth — the Hollow Children share with strangers but are not naive.
      The player earns full trust by giving before taking: bringing food, water, or
      information that helps the community.

      High Hollow rep enables: tunnel network access, safe passage anywhere the Hollow go,
      community intelligence, genuine relationship with Kira.
      High rep cost: the Hollow will eventually need the player to do something risky
      on behalf of people they have never met and cannot repay.

      Low rep: cold reception. No one is hostile — the Hollow do not do hostile —
      but help dries up and the guides look through you.
    `,

    allianceRoute: `
      The player becomes a champion of the Warrens — someone who uses their mark and
      their connections with other factions to secure resources and protection for the
      community. This route requires repeatedly choosing the Hollow's welfare over
      personal advantage. Kira reveals her mark only on this route, and only when the
      player has maximum trust.
    `,

    betrayalRoute: `
      The Hollow Children do not betray. But they can be betrayed — by the player
      informing on their tunnel routes to the Saints, or by negotiating away their
      autonomy. Kira does not confront. She remembers. The community knows. It spreads.
      The player never eats in the Warrens again.
    `,

    endingPath: `
      COMPANION/FACTION ENDING: The player, using every connection they have built,
      secures formal recognition of the Warrens as an autonomous community zone —
      exempt from Saints processing, supplied by Court medical resources, and
      protected by an Archive-brokered agreement. Kira survives to see it.
      She does not thank the player directly. She just keeps eating after the
      children eat. That is enough.
    `,
  },

  redChoir: {
    fullName: 'The Red Choir',
    motto: 'The Blackout was not a disaster. It was a gift.',
    shorthand: 'the Choir / Choir broadcasts',
    colorCode: '#7a1a3a',
    reputation: { min: -100, max: 100, neutral: 0 },

    coreBeliefs: `
      The Red Choir believes that the Vault opened because it was time to open it.
      They believe the marks are chosen. They believe the marks are being called.
      They are not entirely wrong — the pattern they are reacting to is real.
      Their interpretation of why is catastrophically, dangerously wrong.
    `,

    leader: {
      name: 'The Voice',
      title: 'Unnamed — referred to only as the Voice in all Choir communications',
      age: 'Unknown',
      background: `
        The Voice broadcasts every third day from a location that has never been
        found despite serious effort by the Saints and the Court. The broadcasts
        are technically complex — they use a relic transmitter of unusual power
        to penetrate metro concrete. Whether the Voice is one person or a rotating
        position is unknown outside the inner Choir.

        What is known: the Voice has a mark. Their Corruption is extremely high.
        They see things that have not happened yet, or appear to. They are not a
        liar. Their visions are genuine. Their interpretation of those visions is
        the danger.
      `,
      appearance: 'Never seen in person by anyone who has reported back.',
      motivation: 'Gather the marked, open the Vault completely, and allow whatever is inside to complete what it started.',
      secret: 'The Voice is not alone in the broadcast location. They are with three other mark-bearers whose Corruption is near or at maximum. They are not worshipping the Vault. They are communicating with it.',
    },

    strengths: [
      'The only faction that actively recruits mark-bearers, offering genuine community',
      'Broadcast reach — the Voice can communicate with most of the metro network',
      'Deep understanding of relic geography — they have mapped more of the underground than the Archive',
      'Absolute member loyalty — no Saints informants have successfully penetrated the inner Choir',
      'Access to the Vault approaches — they have routes no other faction has found',
    ],

    weaknesses: [
      'Perceived as dangerous or insane by the majority of survivors',
      'No conventional resource base — dependent on member provision and relic trade',
      'Their goal (Vault reopening) is opposed by every other faction for different reasons',
      'High Corruption among leadership means decision-making is increasingly non-standard',
      'The Voice\'s genuine visions are not clearly distinguishable from delusion, even from inside',
    ],

    howTheyTreatThePlayer: `
      With immediate, intense welcome. The Choir is the only faction that is
      delighted by the mark rather than threatened or exploitative. That warmth
      is real and it is dangerous — it is the warmth of people who want something
      from the player that the player may not be willing to give.

      High Choir rep enables: access to Vault approach routes, relic locations
      the Archive doesn't know about, the Voice's visions (some of which are useful).
      High rep cost: the Choir will ask the player to help with the reopening.
      They are genuinely convinced this is good. They are wrong.

      Low rep: they do not pursue. They broadcast. They wait. They believe the
      marked always come back eventually.
    `,

    allianceRoute: `
      The player aligns with the Choir by following the Voice deep into the Vault
      approaches and surviving what they find there — which confirms some of what
      the Choir believes and invalidates other parts. The alliance ending does not
      involve completing the Choir's original mission. It involves the player helping
      the Voice understand what they are actually hearing from the Vault, which is
      not what they thought.
    `,

    betrayalRoute: `
      The Choir betrays if the player takes their knowledge and uses it to close
      the Vault routes or expose the Voice's location to the Saints. Betrayal from
      the Choir is the most personal: the Voice broadcasts a message about the player
      by name, detailing their choices. The broadcast reaches everyone.
      The Choir does not hunt. They mourn.
    `,

    endingPath: `
      SECRET ENDING: The player, working with the Voice, discovers the actual nature
      of what is in the Vault — not a god, not a weapon, not a warning, but a message.
      Left by whoever built the relic civilisation, for whoever developed the marks.
      The ending reveals the message. Not in words. In the player character's
      understanding. The game does not tell the player what they now know.
      They carry it out into the world. That is the end.
    `,
  },

  lastArchive: {
    fullName: 'The Last Archive',
    motto: 'Knowledge must be preserved, not wielded.',
    shorthand: 'the Archive / Archive scholars',
    colorCode: '#6a5a2a',
    reputation: { min: -100, max: 100, neutral: 0 },

    coreBeliefs: `
      Knowledge must be preserved, not wielded. The Last Archive was founded to
      document the relic findings and ensure that information was not lost if
      the political situation changed — which it did, dramatically. They were right
      to preserve it. They were wrong to think preservation was enough.

      The Archive's failure is the failure of the scholar who watches the fire
      from a safe distance taking careful notes. They have the most knowledge.
      They have used it least effectively. Five years after the Blackout, they
      know more about the marks than anyone, and they are still waiting for the
      right conditions to act. Their head archivist stopped waiting and went inside.
    `,

    headArchivist: {
      name: 'Velna',
      status: 'Missing — entered secondary archive access point during the game\'s timeline',
      age: 54,
      background: `
        A linguist who was one of the original Archive team forty years ago, and the
        only member of that team who successfully partially decoded three relic languages.
        She knows what the Vault transmitters are broadcasting. She did not tell anyone
        because she was not certain of her translation and she knew what certainty costs
        when you are wrong.

        She found a secondary archive entrance — coordinates she left in writing.
        She entered. She left a message on the wall just inside: "It's larger than I
        expected. I'm going further." She has not returned.

        She has no mark. She was the only major faction figure without one.
      `,
      appearance: 'Quiet, considered, moved like someone who spent decades in small rooms.',
      motivation: 'Finish the translation. Understand what the Vault message says before anyone does something irreversible with it.',
      secret: 'The Vault transmitter signal is not a warning and not an invitation. It is a question. She did not know the answer. She went inside to find it.',
      narrativeRole: 'The player finds Velna\'s message in the secret ending route — following the coordinates she left to the secondary entrance, finding her words on the wall just inside. She went further. The player follows.',
    },

    strengths: [
      'The most accurate and complete knowledge of relic technology and mark behaviour',
      'Sole holders of the partial Vault transmitter translation',
      'Extensive pre-Blackout documentation — they know what the city was',
      'The only faction operating on genuine diplomatic neutrality (all factions need what they know)',
      'Access to the inner door — the most relic-dense space outside the Vault itself',
    ],

    weaknesses: [
      'Smallest faction in terms of active members — perhaps 200 scholars',
      'No military capacity, dependent entirely on diplomatic neutrality',
      'Head archivist Velna is missing — leadership crisis',
      'Inner door creates a power vacuum — everyone wants access and the Archive has no good way to share it safely',
      'Velna\'s incomplete translation is the most dangerous document in the city',
    ],

    howTheyTreatThePlayer: `
      With careful interest. The Archive does not rush. A mark-bearer is interesting
      to them — useful, potentially — but they do not overplay their hand. The
      initial interactions are measured exchanges: information for information.

      High Archive rep enables: access to the most complete relic and mark documentation
      in existence, partial translation access, and eventually Velna's coordinates —
      the closest thing to a master key for the game's mysteries.
      High rep cost: the Archive will ask the player to enter the inner door and
      report what they experience. This raises Corruption and is not reversible.

      Low rep: polite closure. They will not share. They will not threaten.
      The door remains shut.
    `,

    allianceRoute: `
      The player becomes the Archive's agent in the field — doing what scholars
      cannot: moving through faction lines, accessing relic sites, and returning
      with data. Maximum trust unlocks the partial translation and Velna's coordinates
      (not as a mission — as an admission that the Archive needs the player to
      answer the question the Vault is asking, because the mark is the only thing that can).
    `,

    betrayalRoute: `
      The Archive does not betray directly. But they will protect the translation
      over the player if forced to choose. If the player becomes a threat to the
      translation's security — by aligning too closely with the Choir, or by
      threatening to take the inner door by force — the Archive's diplomacy ends
      and the quiet Saints relationship activates.
    `,

    endingPath: `
      SECRET ENDING: The player, with maximum Archive trust and high Corruption,
      enters the secondary door using Velna's coordinates and receives the full
      translation — not as language but as direct understanding transferred through
      the mark. The Vault's question is answered. Not by fighting, not by choosing,
      but by witnessing. The Archive begins building something for the first time
      in five years.
    `,
  },
};


// ══════════════════════════════════════════════════════════════════════════════
//  SECTION 10 — MAJOR COMPANIONS
// ══════════════════════════════════════════════════════════════════════════════

export const COMPANIONS = {

  mira: {
    name: 'Mira',
    role: 'Former Last Archive extraction specialist, working as a street medic. The player\'s first reliable ally.',
    age: 32,

    appearance: `
      Medium height, practical. Hair kept very short — a maintenance habit that
      stuck. Always carries a tool kit that has been rebuilt and rebuilt from
      salvage. Her hands are scarred from the first winter underground.
    `,

    trueBackstory: `
      Mira was not just a metro maintenance engineer. Before the Blackout, she was
      a Last Archive extraction specialist — her job was to get texts out of places
      that were about to stop existing. She got very good at moving fast and not
      asking what she was carrying.

      She knew about the marks three years before the Blackout. She knew what they
      were being designed for. She did not tell anyone who was not already in the room.

      After the Blackout she deliberately reinvented herself as a street medic —
      the role least likely to attract Archive or faction attention. She has been
      watching for a mark-bearer she could trust. The player is the first one she
      has decided to approach.

      She does not have a mark. She has thought carefully about what it would mean
      if she did. She decided she is glad she doesn't.
    `,

    personality: `
      Honest to the point of abruptness. Does not perform comfort — gives it
      directly or not at all. Has a very specific sense of what is fair and will
      not compromise on it in ways that destroy her. Has compromised on many
      smaller things and knows exactly which ones, and in what order, and what
      they cost her. Reads the player accurately and quickly. Does not mention it.
    `,

    whatSheBringsToThePlayer: [
      'Tunnel access — she knows routes that are not on any map',
      'Mechanical knowledge — can identify relic objects by function without touching them',
      'Honest assessment — she will tell the player when they are wrong, clearly',
      'Community connection — the Hollow Children trust her unconditionally',
    ],

    trustArc: {
      trust3: 'Starting trust. She travels with the player. She watches.',
      trust5: 'She reveals she was Last Archive, not just maintenance. "I am telling you now."',
      trust7: 'She tells the player what she has told no one: she found the bodies of the Vault extraction team. Not in the Vault. In the tunnels below it. Arranged. All of them facing the same direction.',
      trust10: 'Companion ending available. She asks one question. Her answer will match the player\'s if trust is maximal.',
    },

    trustDamageEvents: [
      'Using people as tools in front of her',
      'Lying to her directly',
      'Choosing faction interest over specific individual welfare',
      'Treating scarcity as abstract when people around you are hungry',
    ],

    interludes: [
      {
        nodeId: 'mira_event_opens_up',
        title: 'What She Carried Out',
        trigger: 'miraTrust ≥ 5 AND mira_shared_archive_secret NOT set',
        summary: 'She tells the player she was Last Archive. "I knew what they were being designed for. I am telling you now."',
      },
      {
        nodeId: 'mira_event_corruption_warning',
        title: 'The Mark Is Changing You',
        trigger: 'corruption ≥ 40 AND mira_event_corruption_warning_seen NOT set',
        summary: '"I\'ve seen three people carry marks like yours. Two of them stopped being recognisable as themselves by the time it reached forty percent saturation."',
      },
      {
        nodeId: 'mira_event_pulls_away',
        title: 'The Space Between Us',
        trigger: 'mira_pull_away_critical NOT set AND player has made ≥2 choices Mira disapproves of',
        summary: '"I need to know if that\'s who you\'re becoming or if it\'s who you\'ve always been and I wasn\'t paying attention."',
      },
      {
        nodeId: 'mira_event_sacrifice_offer',
        title: 'If It Comes to It',
        trigger: 'miraTrust ≥ 7 AND mira_event_sacrifice_offer_seen NOT set',
        summary: '"If the door asks for something I can give. I want you to know that I have already made the decision."',
      },
    ],

    sacrificeCondition: `
      Mira can sacrifice herself to save the Hollow Children's Warren from a Saints
      purge. This happens only if the player failed to broker a Saints deal AND
      Mira's trust is high enough (≥7) that she makes the choice independently.
      Her death is not shown on screen. The player arrives after.
      The Hollow Children remember her name.
    `,

    companionEnding: `
      If Mira is alive and trusted at the final chapter, she asks the player
      one question: after everything, do they want to stay or go? Her answer
      will match theirs if trust is maximal. The companion ending is the two
      of them — wherever they end up — together. Not as romance necessarily.
      As people who chose each other in a situation where choosing was the
      most expensive thing available.
    `,
  },

  cain: {
    name: 'Cain',
    role: 'Former Black Market courier. The player\'s most useful and least trustworthy ally.',
    age: 27,

    appearance: `
      Lean, quick. Always wearing something with too many pockets. Eyes that
      calculate distance before other things. A quality of stillness when still
      that suggests the movement that follows will be fast.
    `,

    backstory: `
      Cain was running routes through the metro black market before the Blackout —
      he was good at it, well-connected, and entirely amoral in the survival-means-
      nothing-is-beneath-me way that the market rewarded. The Blackout made him
      briefly irrelevant (no one had anything to trade) and then more useful than
      ever (everyone needed routes, contacts, and a flexible conscience).

      He has a mark. He has known about it since the morning after the Blackout.
      He has told no one — not because he fears it, but because information is
      currency and he hasn't found the right buyer yet. He is still looking.
    `,

    theSecretHeHolding: `
      The Glass Court knew about the marks before the Blackout. Director Kael told him —
      they had documentation suggesting that certain bioelectric signatures responded
      to relic technology. He has been sitting on this for five years. At maximum trust,
      he tells the player. And only the player.
    `,

    personality: `
      Charming in the way of someone who learned charm as a tool and has used it
      so long it has become genuine in some spots and remains entirely instrumental
      in others. He cannot always tell which is which anymore. Neither can you.

      Genuinely funny. Occasionally genuinely kind, at moments that surprise him
      as much as everyone else. Honest about being dishonest, which is a form of
      honesty he values highly. Will not lie to the player about his own nature.
      Will lie to everyone else without hesitation.
    `,

    whatHeBringsToThePlayer: [
      'Market access — he knows every trader, route, and price',
      'Faction intelligence — he runs between all factions without full allegiance to any',
      'Mark knowledge — his own experience gives the player the most honest peer perspective available',
      'A specific Saints contact who is corruptible — useful at the right moment',
    ],

    trustArc: {
      trust3: 'He acknowledges the player\'s mark without exploitation — rare from Cain.',
      trust5: 'He begins sharing genuine intelligence, not filtered or sold.',
      trust7: 'He reveals which faction he has been reporting to. Not the Saints. The Glass Court. They knew about the marks. They knew.',
      trust10: 'Companion ending. Two people honest about the exact nature of their dishonesty.',
    },

    trustDamageEvents: [
      'Discovering the player knew about his mark before he told them and didn\'t say so',
      'Being used as a distraction or tool without being informed',
      'Having his information sold or shared with a faction without his cut',
      'Being given empty promises about resources',
    ],

    interludes: [
      {
        nodeId: 'cain_event_respect_earned',
        title: 'The Ledger',
        trigger: 'cainTrust ≥ 4 AND cain_event_respect_earned_seen NOT set',
        summary: 'He says one word: "Capable." With Cain, this is a speech.',
      },
      {
        nodeId: 'cain_event_resource_warning',
        title: 'The Inventory',
        trigger: 'player inventory critically low AND cain_event_resource_warning_seen NOT set',
        summary: '"I have been assuming you understand what those numbers mean. The choices you\'ve been making suggest I may have been wrong."',
      },
      {
        nodeId: 'cain_event_hesitation',
        title: 'The Cost of Waiting',
        trigger: 'player_hesitated_twice flag set AND cain_event_hesitation_seen NOT set',
        summary: '"Three times you had a clear path and you waited for a better option that didn\'t exist."',
      },
      {
        nodeId: 'cain_event_betrayal_warning',
        title: 'The Other Offer',
        trigger: 'cain_betrayal_likely risk conditions met AND cain_event_betrayal_warning_seen NOT set',
        summary: '"The Iron Saints sent a message three days ago. The offer expires in approximately forty-eight hours. I have not responded. I am telling you that too."',
      },
    ],

    betrayalCondition: `
      Cain betrays if his trust is below 3 AND the player has a specific flag AND
      registers with the Saints at the Processing Hub. He turns in the registration
      information — he has been selling Saints registration intel. It's not personal.
      He says this in the betrayal scene. He means it. That doesn't help.
    `,

    companionEnding: `
      If Cain is alive and trusted at the final chapter, the ending is quiet.
      Two people who have been honest with each other about the exact nature of
      their dishonesty. Not romantic by default — that would require trust in
      a specific direction. But genuine. Whatever it is, it was earned.
    `,
  },
};


// ══════════════════════════════════════════════════════════════════════════════
//  SECTION 11 — MAJOR VILLAINS AND ANTAGONISTS
// ══════════════════════════════════════════════════════════════════════════════

export const VILLAINS = {

  designPrinciple: `
    No character in this game is a villain by nature. Every antagonist believes they
    are doing what must be done. The horror is not that they are wrong about the facts.
    Sometimes they are not. The horror is what they are willing to do with facts
    that are correct.
  `,

  voss: {
    name: 'Commander Aldric Voss',
    faction: 'Iron Saints',
    writingNote: `
      Voss is right that the city needs structure to survive. He is right that
      mark-bearers represent an unpredictable variable. He is wrong that controlling
      unpredictable variables is sufficient, and wrong about the scale of what is
      underneath him. His final confrontation is a conversation, not a fight. He
      already knows the player cannot be stopped. He wants to know if they are worth
      what they are about to do.
    `,
  },

  sera: {
    name: 'Inquisitor Sera',
    faction: 'Iron Saints',
    chapter: 4,
    writingNote: `
      Sera is the Saints' chief Inquisitor and the most dangerous character in
      Chapter 4. Unlike Voss, she has no ideological investment in the Saints'
      mandate — she is a pragmatist who chose the winning vehicle early. She knew
      about the Archive before the Blackout and concealed it from the founder.
      She is not protecting anyone with this secret. She is protecting her leverage.

      She cannot be defeated in the conventional sense. She can be outmanoeuvred.
      Every confrontation with her should feel like a negotiation in which she
      controls the terms until she does not.
    `,
  },

  kael: {
    name: 'Director Seraphine Kael',
    faction: 'Glass Court',
    writingNote: `
      Kael opened the Vault. She caused the Blackout. She has spent five years
      trying to fix it using the same framework of thinking that caused it. She
      genuinely believes more knowledge will produce a solution. The only path
      that fully resolves her arc is the one where she understands what she opened.
      Not what it did. What it is.
    `,
  },

  theVoice: {
    name: 'The Voice',
    faction: 'Red Choir',
    writingNote: `
      The Voice is experiencing genuine visions. Their interpretation of those
      visions is the danger — not because they are lying, but because they are
      translating something they can feel but not fully comprehend. Their final
      scene is the most ambiguous in the game. A player at maximum Corruption
      will understand something about the Voice's visions that the Voice does not:
      they are not instructions. They are distress signals. The Voice has been
      trying to help something that is asking to be helped. Their method is wrong.
      Their instinct is not.
    `,
  },
};


// ══════════════════════════════════════════════════════════════════════════════
//  SECTION 12 — IMPORTANT MYSTERIES
// ══════════════════════════════════════════════════════════════════════════════

export const MYSTERIES = {

  whatIsInTheVault: {
    partialAnswers: [
      'The relic civilisation built the Vault as a communication point.',
      'Something is still active inside it.',
      'The extraction team that opened it was not harmed — they were responded to.',
    ],
    fullAnswer: 'NOT REVEALED IN CHAPTERS 1–4. Revealed in Chapter 7.',
    writingNote: 'Do not answer this. Plant evidence. Let each faction\'s interpretation feel plausible.',
  },

  whoBuiltTheRelicCivilisation: {
    partialAnswers: [
      'Their architecture predates human civilisation by an unknown period.',
      'Their materials are not Earth-origin.',
      'The marks appear to be their interface technology.',
    ],
    fullAnswer: 'DELIBERATELY AMBIGUOUS. The game does not confirm or deny external origin.',
    writingNote: 'Never say alien. Never say divine. Let the player sit with not knowing.',
  },

  whyTheseMarkBearers: {
    fullAnswer: 'The marks identify people with a specific bioelectric signature that the relic technology uses as a key. The selection criteria is mechanical, not chosen. There is nothing special about the people — there is something specific about the signal they produce.',
    revealedAt: 'Maximum Last Archive trust — Chapter 7.',
    writingNote: 'This is both disappointing and liberating. The player was not chosen. They are useful. That distinction matters.',
  },

  whatCausedTheBlackout: {
    fullAnswer: 'The Vault responded to being opened by neutralising all energy systems in its vicinity — a defensive measure miscalibrated for the scale of human development. It was not trying to kill the city. It was trying to stop something. It did not know the city was there.',
    writingNote: 'This revelation is the single most important story beat. The Blackout was not malice. That is worse than malice in some ways.',
  },

  whatDoesTheVaultTransmitterSignalMean: {
    fullAnswer: 'It is a question: "Is anyone still there?" The relic civilisation has been broadcasting through the Vault transmitters, waiting for something with the right bioelectric signature to respond. The marks are the response mechanism. Nobody responded until now.',
    writingNote: 'This is the emotional core of the entire game. Write every ending with this as the background.',
  },

  whereIsVelna: {
    partialAnswer: 'She left coordinates to a secondary archive entrance and a message on the wall inside: "It\'s larger than I expected. I\'m going further."',
    fullAnswer: 'Revealed only in the secret ending route. Follow the coordinates. Find what she found.',
    writingNote: 'Do not close this mystery before Chapter 7. The player should find it themselves.',
  },
};


// ══════════════════════════════════════════════════════════════════════════════
//  SECTION 13 — CHARACTER CREATION
// ══════════════════════════════════════════════════════════════════════════════

export const CHARACTER_CREATION = {

  backgrounds: [
    {
      id: 'wasteland_orphan',
      name: 'Wasteland Orphan',
      description: 'Grew up outside the city walls. You know hunger, cold, and how to disappear.',
      bonus: '+1 Agility, +1 Luck. Start with extra food.',
      statModifiers: { agility: 1, luck: 1 },
      writingNote: 'This character knows scarcity as a baseline, not a crisis. Write their relationship with hunger as practiced resignation, not panic.',
    },
    {
      id: 'fallen_noble',
      name: 'Fallen Noble',
      description: 'Once lived in the towers. The collapse stripped everything. Now you use your knowledge of the powerful.',
      bonus: '+2 Charisma. Glass Court reputation starts higher.',
      statModifiers: { charisma: 2 },
      writingNote: 'This character knows what the Glass Court is because they came from the same world. Write their Glass Court encounters with the specific friction of someone who recognises the furniture.',
    },
    {
      id: 'underground_medic',
      name: 'Underground Medic',
      description: 'You treated the forgotten and the hunted before the lights went out.',
      bonus: '+2 Intelligence. Start with extra medicine.',
      statModifiers: { intelligence: 2 },
      writingNote: 'Mira recognises this background immediately. Write their first meeting with an additional layer of professional assessment.',
    },
    {
      id: 'exiled_soldier',
      name: 'Exiled Soldier',
      description: 'Dishonourably discharged. You know how Iron Saints think — and how to avoid them.',
      bonus: '+2 Strength. Iron Saints reputation starts lower but you recognise their tactics.',
      statModifiers: { strength: 2 },
      writingNote: 'This character looks at Saints patrols the way you look at your old house after you\'ve been evicted. Write their Iron Saints encounters with the specific contempt of someone who knows the script.',
    },
    {
      id: 'black_market_courier',
      name: 'Black Market Courier',
      description: 'You moved things that shouldn\'t be moved to places that shouldn\'t exist.',
      bonus: '+1 Agility, +1 Charisma. Hollow Children reputation starts higher.',
      statModifiers: { agility: 1, charisma: 1 },
      writingNote: 'Cain recognises this background and reacts to it. They have probably moved things for the same people at some point. Write their first meeting with the specific recognition of two people who know the same tunnels.',
    },
    {
      id: 'forgotten_scholar',
      name: 'Forgotten Scholar',
      description: 'You studied the relics before anyone admitted they were dangerous.',
      bonus: '+2 Intelligence. Last Archive reputation starts higher. Can read relic symbols.',
      statModifiers: { intelligence: 2 },
      writingNote: 'This character knows what the Archive is and has opinions about it. Write their Archive encounters with the specific complicated feeling of someone returning to work they left unfinished.',
    },
    {
      id: 'runaway_experiment',
      name: 'Runaway Experiment',
      description: 'You were part of a programme you barely understand. The mark may have been put there deliberately.',
      bonus: '+2 Intelligence, −1 Charisma. Higher starting Corruption. Better relic affinity.',
      statModifiers: { intelligence: 2, charisma: -1, corruption: 2 },
      writingNote: 'This character has the most complicated relationship with the mark — it may not be new for them. Write their early relic encounters with a specific lack of surprise that is itself a kind of horror.',
    },
  ],

  classes: [
    {
      id: 'blade_survivor',
      name: 'Blade Survivor',
      description: 'You fight with whatever\'s at hand. You\'ve learned that close is safer than far.',
      playstyle: 'High Strength. Best at direct confrontation and survival.',
      baseStats: { maxHealth: 100, strength: 8, agility: 5, intelligence: 4, charisma: 4, luck: 5, corruption: 0 },
      startingInventory: { food: 1, water: 1, medicine: 0, scrap: 2, ammo: 0, relics: 0 },
    },
    {
      id: 'gun_scavenger',
      name: 'Gun Scavenger',
      description: 'Distance is life. You keep your options and your exits open.',
      playstyle: 'High Agility and Luck. Best at ranged options and scavenging.',
      baseStats: { maxHealth: 85, strength: 5, agility: 8, intelligence: 4, charisma: 4, luck: 7, corruption: 0 },
      startingInventory: { food: 1, water: 1, medicine: 0, scrap: 1, ammo: 3, relics: 0 },
    },
    {
      id: 'medic',
      name: 'Medic',
      description: 'You keep people alive. Including yourself — sometimes.',
      playstyle: 'High Intelligence and Charisma. Best at healing and faction relations.',
      baseStats: { maxHealth: 90, strength: 4, agility: 5, intelligence: 8, charisma: 6, luck: 4, corruption: 0 },
      startingInventory: { food: 1, water: 2, medicine: 3, scrap: 0, ammo: 0, relics: 0 },
    },
    {
      id: 'tactician',
      name: 'Tactician',
      description: 'You read situations before they happen. Preparation is your only armor.',
      playstyle: 'Balanced with high Charisma. Best at negotiation and planning.',
      baseStats: { maxHealth: 80, strength: 5, agility: 5, intelligence: 7, charisma: 8, luck: 4, corruption: 0 },
      startingInventory: { food: 2, water: 2, medicine: 1, scrap: 1, ammo: 1, relics: 0 },
    },
    {
      id: 'relic_hunter',
      name: 'Relic Hunter',
      description: 'You\'ve always been drawn to the old machines. They respond to you.',
      playstyle: 'High Intelligence and Luck. Best with relics and Archive content. Starts with Corruption.',
      baseStats: { maxHealth: 75, strength: 4, agility: 6, intelligence: 8, charisma: 5, luck: 6, corruption: 2 },
      startingInventory: { food: 1, water: 1, medicine: 1, scrap: 2, ammo: 0, relics: 1 },
    },
    {
      id: 'shadow_broker',
      name: 'Shadow Broker',
      description: 'Information is currency. You sell it carefully and buy loyalty cheaper.',
      playstyle: 'High Agility and Charisma. Best at stealth, secrets, and faction manipulation.',
      baseStats: { maxHealth: 85, strength: 5, agility: 8, intelligence: 6, charisma: 7, luck: 5, corruption: 0 },
      startingInventory: { food: 1, water: 1, medicine: 1, scrap: 3, ammo: 1, relics: 0 },
    },
    {
      id: 'esper',
      name: 'Esper / Psychic Mutant',
      description: 'The mark chose you before the blackout. You have been hearing it for years.',
      playstyle: 'Highest Intelligence. Unique relic interactions. High starting Corruption. High risk, high power.',
      baseStats: { maxHealth: 70, strength: 3, agility: 5, intelligence: 9, charisma: 5, luck: 6, corruption: 5 },
      startingInventory: { food: 0, water: 1, medicine: 0, scrap: 1, ammo: 0, relics: 2 },
    },
  ],

  personalityTraits: [
    {
      id: 'pragmatic',
      name: 'Pragmatic',
      description: 'You do what works. Morality is a luxury.',
      effect: '+1 to all resource-finding choices. −1 Morale from self-sacrifice options.',
    },
    {
      id: 'empathetic',
      name: 'Empathetic',
      description: 'You feel what others feel. That is your strength and your wound.',
      effect: '+2 Companion Trust gains. −1 Morale from abandoning NPCs.',
    },
    {
      id: 'cold',
      name: 'Cold',
      description: 'You removed emotion from your decision-making. It hurt, and then it didn\'t.',
      effect: 'Immune to morale penalties from witnessing deaths. −1 Trust with all companions.',
    },
    {
      id: 'reckless',
      name: 'Reckless',
      description: 'You move before you think. Sometimes that\'s exactly what\'s needed.',
      effect: '+1 Agility to all combat-adjacent checks. −1 Intelligence to planning checks.',
    },
    {
      id: 'calculating',
      name: 'Calculating',
      description: 'You model outcomes before acting. The world is math.',
      effect: '+1 to all stat checks that require a minimum. Choices always show requirement thresholds.',
    },
    {
      id: 'faithful',
      name: 'Faithful',
      description: 'You believe in something. Whatever the blackout destroyed, it didn\'t take that.',
      effect: '+2 Iron Saints reputation if cooperating. Unique dialogue with the Red Choir.',
    },
    {
      id: 'cynical',
      name: 'Cynical',
      description: 'You expected this. The world confirmed what you always suspected.',
      effect: '+1 Luck on all scavenging. −1 to Charisma-based choices involving optimism.',
    },
  ],
};


// ══════════════════════════════════════════════════════════════════════════════
//  SECTION 14 — CHAPTER ROADMAP
// ══════════════════════════════════════════════════════════════════════════════

export const CHAPTER_ROADMAP = [
  {
    id: 'prologue',
    title: 'The Blackout',
    status: 'planned',
    nodeCount: 0,
    summary: 'Three years before the main story. A series of vignettes: the night the city-wide blackout occurred. Each playable background class gets its own scene. No resources drain. Always advances to Chapter 1.',
    flagsIntroduced: ['prologue_complete', 'background_vignette_played', 'knows_blackout_origin'],
  },
  {
    id: 'chapter_1',
    title: 'The Ruined Station',
    subtitle: 'The city is dead. The mark on your wrist is not.',
    status: 'written',
    nodeCount: 98,
    summary: 'The player wakes in the metro. The mark is new. Survival is immediate. The factions are establishing. The companions are encountered. The central mystery is presented but not named.',
    availableEndings: [
      'ending_buried_tunnel — death (tunnel collapse)',
      'ending_mira_abandoned — death (companion abandonment)',
      'ending_cain_dies_alone — companion',
      'ending_saints_surface_execution — death',
      'ending_ash_suffocation — death',
      'ending_glass_court_prisoner — faction',
      'ending_mira_sacrifice — companion (sacrifice)',
      'ending_cain_betrayal — betrayal',
      'ending_relic_awakening — corruption',
      'chapter1_end — chapter completion',
    ],
    flagsIntroduced: [
      'met_mira', 'mira_joins_party', 'mira_injury_treated',
      'met_cain', 'cain_joins_party', 'cain_injury_treated',
      'met_kira', 'hollow_member', 'knows_archive_exists',
      'knows_archive_location', 'found_archive_door',
      'activated_relic', 'examined_mark', 'first_mark_control',
      'escaped_iron_saints', 'saints_registered', 'has_saints_papers',
      'chapter1_complete',
    ],
  },
  {
    id: 'chapter_2',
    title: 'The Surface Does Not Forgive',
    subtitle: 'Three days of light and everything trying to kill you',
    status: 'written',
    nodeCount: 77,
    summary: 'The player reaches the surface and survives three brutal days in the ruined city above. Food and water are scarce. Iron Saints patrol in force. Mira and Cain\'s backstories deepen.',
    availableEndings: [
      'c2_ending_dehydration — death',
      'c2_ending_saints_executed — death',
      'c2_ending_glass_vivisected — death',
      'c2_ending_choir_absorbed — corruption',
      'c2_ending_market_buried — death',
      'c2_ending_mira_dies_checkpoint — companion',
      'c2_ending_exile_wanderer — wanderer',
      'c2_ending_saints_enlisted — faction',
      'c2_ending_glass_data_trade — faction',
      'c2_ending_archive_messenger — secret',
      'ending_glass_court_prisoner — faction',
    ],
    flagsIntroduced: [
      'reached_surface_chapter2', 'mira_identity_partial',
      'cain_confronted_unit', 'red_choir_contact',
      'glass_court_wary', 'chapter2_complete',
    ],
  },
  {
    id: 'chapter_3',
    title: 'Children of the Tunnels',
    subtitle: 'Every war looks different from the bottom',
    status: 'written',
    summary: 'Deep in the tunnel network. Kira\'s leadership is under pressure from Builders vs Walkers. The changed child. The Record Room. The Hollow Children\'s secret: they have been to the Archive door before.',
    flagsIntroduced: [
      'hollow_politics_known', 'builders_backed', 'walkers_backed',
      'changed_child_met', 'record_room_found', 'city_built_deliberately',
      'kira_trusts_player',
    ],
  },
  {
    id: 'chapter_4',
    title: 'Saints in Iron',
    subtitle: 'Faith is a better weapon than any rifle',
    status: 'written',
    summary: 'The Iron Saints are more than a military faction — they are a religious order. The player infiltrates their hierarchy. Inquisitor Sera. Cain\'s full betrayal arc or redemption arc plays out here.',
    flagsIntroduced: [
      'infiltrated_saints', 'met_sera', 'sera_secret_known',
      'sinner_registry_status', 'cain_redemption_or_betrayal',
      'saints_dismantled', 'saints_allied',
    ],
  },
  {
    id: 'chapter_5',
    title: 'The Glass Court',
    subtitle: 'They never wanted the city. They wanted what was under it.',
    status: 'planned',
    nodeCount: 0,
    summary: 'The Glass Court has seventeen marked individuals in containment. None of their extractions have survived intact. The player must navigate Kael\'s research programme and what she is willing to do to complete it.',
  },
  {
    id: 'chapter_6',
    title: 'The Red Choir',
    subtitle: 'Something below the city learned how to sing',
    status: 'planned',
    nodeCount: 0,
    summary: 'The Red Choir recruits through sound. The player must navigate the Choir\'s territory and determine whether their founder is a genuine prophet or a manipulated instrument.',
  },
  {
    id: 'chapter_7',
    title: 'The Last Archive',
    subtitle: 'It has been waiting for exactly this long',
    status: 'planned',
    nodeCount: 0,
    summary: 'The player enters the Last Archive. An AI called the Archivist has been expecting them. It knows the mark\'s origin and the Blackout\'s true cause. Velna\'s final message is found here.',
  },
  {
    id: 'chapter_8',
    title: 'Hunger War',
    subtitle: 'The city runs out of food before it runs out of people',
    status: 'planned',
    nodeCount: 0,
    summary: 'Three months after Chapter 7. A food crisis. Saints seizing caches. Glass Court algorithmic rationing. Hollow Children starving. Red Choir offering something that suppresses hunger and is not food.',
  },
  {
    id: 'chapter_9',
    title: 'The Mark Awakens',
    subtitle: 'You have been the signal this entire time',
    status: 'planned',
    nodeCount: 0,
    summary: 'Corruption reaches its consequence point. The player learns the mark is a memory system, storing every choice made since the Blackout. The Archive was designed to evaluate those choices.',
  },
  {
    id: 'chapter_10',
    title: 'Broken Companions',
    subtitle: 'Everyone you brought this far has a cost',
    status: 'planned',
    nodeCount: 0,
    summary: 'Dedicated entirely to companion resolution. Mira\'s pre-Blackout identity is fully revealed. Cain makes his final choice. Kira must decide whether to lead the Hollow Children to the surface or underground forever.',
  },
  {
    id: 'chapter_11',
    title: 'The City Beneath the City',
    subtitle: 'Something has been here the whole time',
    status: 'planned',
    nodeCount: 0,
    summary: 'The oldest parts of the metro — possibly pre-human — have been accessible since the Blackout changed the metro\'s relic density. Things have been moving in them.',
  },
  {
    id: 'chapter_12',
    title: 'Crown of Ash',
    subtitle: 'Every faction makes their final move',
    status: 'planned',
    nodeCount: 0,
    summary: 'The surface city becomes the contested prize. Every faction\'s arc reaches its military moment. The player\'s faction relationships determine which side wins.',
  },
  {
    id: 'final_chapter_1',
    title: 'The Vault',
    subtitle: 'The question arrives without words',
    status: 'planned',
    nodeCount: 0,
    summary: 'All major faction arcs converge at the Vault entrance. Companions make their final decision. The question the Vault has been asking is delivered through the mark.',
  },
  {
    id: 'final_chapter_2',
    title: 'The Answer',
    subtitle: 'Every ending is the ending that player became',
    status: 'planned',
    nodeCount: 0,
    summary: 'The player\'s answer. Every faction resolution. All 10 ending types.',
    endingTypes: ['death', 'betrayal', 'sacrifice', 'tyrant', 'savior', 'companion', 'faction', 'secret', 'corruption', 'wanderer'],
  },
];


// ══════════════════════════════════════════════════════════════════════════════
//  SECTION 15 — ENDING PHILOSOPHY
// ══════════════════════════════════════════════════════════════════════════════

export const ENDING_PHILOSOPHY = {

  coreStatement: 'No ending is the good ending. No ending is the bad ending. Every ending is the ending that player became.',

  rules: [
    'Every ending should feel earned by the player\'s specific choices, not by a final decision alone.',
    'Death endings are not failures — they are a world in which someone with that mark, those stats, those allies, in that moment, did not make it. That is allowed.',
    'The "best" ending is whichever one the player would make again. Not the one that maximises survival.',
    'Companion endings are only available if the companion is alive. Death is permanent. Do not make this avoidable.',
    'Corruption endings should be written without judgment. A player at maximum Corruption is not a bad player. They are a changed one.',
  ],

  endingTypes: [
    {
      type: 'death',
      description: 'Violent or survival failure. Written with gravity, not punishment. The last thing the player sees should be worth seeing.',
    },
    {
      type: 'betrayal',
      description: 'Someone the player trusted turned. The ending should make clear why, without excusing it.',
    },
    {
      type: 'sacrifice',
      description: 'The player gives something that cannot come back — including, potentially, themselves — to protect something that matters.',
    },
    {
      type: 'tyrant',
      description: 'The player wins in the way that requires becoming what they feared. Not evil. Just wrong, in the specific way available to people who are not wrong about everything.',
    },
    {
      type: 'savior',
      description: 'The player finds a way through that most people would not have found. Rare. Not heroic in tone — just true.',
    },
    {
      type: 'companion',
      description: 'Two people, at the end of everything, choosing to stay with each other. Quiet. Specific. Earned.',
    },
    {
      type: 'faction',
      description: 'The player\'s chosen faction wins something real. The city changes. Not perfectly. It never does.',
    },
    {
      type: 'secret',
      description: 'The player carries something out that no one else has. Not power. Knowledge. The responsibility is theirs now.',
    },
    {
      type: 'corruption',
      description: 'The mark consumes. This is not death. It is transformation. Write it with the same care as the Savior ending.',
    },
    {
      type: 'wanderer',
      description: 'The player walks away from the question. Not answering is an answer. Give them the road.',
    },
  ],
};


// ══════════════════════════════════════════════════════════════════════════════
//  SECTION 16 — WRITING RULES
// ══════════════════════════════════════════════════════════════════════════════

export const WRITING_RULES = {

  voice: [
    'Second person present tense. Always. "You open your eyes." Not "The character opened their eyes."',
    'Do not describe the player\'s emotions. Describe what they observe. The player supplies the feeling.',
    'Narration is the camera. What it shows matters. What it does not show matters more.',
    'Dialogue is specific. People in this world talk like people who do not have time for subtext — and then reveal that everything they said was subtext.',
    'Use the location as a character. The metro pushes back. So does the surface.',
  ],

  structure: [
    'Every node needs one thing the player will remember — one image, one line, one physical detail.',
    'End narration on an edge. The next choice should feel like the thing that relieves or extends the tension, not like a prompt.',
    'If the node is longer than three paragraphs, split it. Pacing in text is white space.',
    'Dialogue nodes should feel like interruptions to narration, not the reverse.',
    'Ending nodes should slow down. The last thing the player reads before the ending screen should earn the screen.',
  ],

  thingsToAvoid: [
    'EXPOSITION DUMPS: No character explains the world to other characters who already live in it.',
    'MORALITY SIGNPOSTING: Do not use words like "cruel," "kind," or "evil" about choices. Show what the choice costs.',
    'CHEAP REDEMPTION: If someone is redeemed, it should hurt getting there.',
    'CHOSEN ONE FRAMING: The marks are not destiny. They are a coincidence that the player must make meaning of.',
    'SAFE CHOICES: Every choice should be a real choice — not a right answer with a wrong answer attached.',
    'VIOLENCE AS PUNCTUATION: Every death should matter. Every injury should persist.',
  ],

  tone: {
    atmosphere: 'Write with physical precision. Temperature, texture, smell. The metro has a smell. The surface has a different one.',
    violence: 'Write the cost first. The tactical result second. Nobody wins a fight without paying something.',
    hope: 'People help each other here. Not always. Not reliably. When they do, write it with the same weight as the violence.',
    worldBuilding: 'Do not explain the world. Let it be apparent. A player should understand the faction landscape from how people talk about it.',
  },
};


// ══════════════════════════════════════════════════════════════════════════════
//  SECTION 17 — CHOICE DESIGN RULES
// ══════════════════════════════════════════════════════════════════════════════

export const CHOICE_DESIGN_RULES = {

  principle: `
    Every choice is a question about who the player is, asked through the mechanics
    of what the player can do. "Step forward. If they want a fight, give them one."
    is not the same as "Fight." The first is a character. The second is a menu option.
  `,

  rules: [
    'Write choices as the first-person thought or action, not as a menu description.',
    'All choices should feel like real decisions. No obvious right answers. The player should sometimes regret the right one.',
    'Always include at least one choice with no stat or flag requirements — a path for everyone.',
    'Stat-gated choices should be aspirational, not frustrating. A locked choice should make the player want to have that stat.',
    'Effects should be proportional. A small kindness gives small trust. A meaningful sacrifice gives meaningful change.',
    'Choices that betray companions or factions should not be labelled as such. The player makes the choice, then understands what they did.',
    'Never write a choice that is purely positive with no cost, or purely negative with no reason.',
  ],

  diceDesign: {
    principle: 'Dice checks are for moments where chance is narratively appropriate — not for every challenge.',
    rules: [
      'The failure path should still be interesting, not just a penalty.',
      'Critical success should feel like luck that the player didn\'t earn.',
      'Critical failure should feel like the world reminding them it\'s still the world.',
      'Luck rerolls are precious. Write the moment the player would use one as the kind of moment it would feel most meaningful in.',
    ],
    validStats: ['strength', 'intelligence', 'agility', 'charisma', 'luck'],
    invalidStats: ['corruption', 'trust', 'hunger', 'thirst', 'health', 'morale'],
  },
};


// ══════════════════════════════════════════════════════════════════════════════
//  SECTION 18 — FACTION DESIGN RULES
// ══════════════════════════════════════════════════════════════════════════════

export const FACTION_DESIGN_RULES = {

  principle: `
    Every faction is right about something. Every faction is wrong about something.
    Faction conflict is not good vs. evil — it is incomplete information + real
    constraints + genuine fear + power dynamics. The player navigates that.
  `,

  rules: [
    'Faction members are individuals. Not every Saints soldier is Voss. Not every Choir member is the Voice.',
    'Faction reputation effects should be cumulative and visible — players should feel their choices building toward something.',
    'No faction should be universally correct. No faction should be a straw man.',
    'Faction endings are legitimate. Aligning with any faction should produce a meaningful outcome.',
    'Inter-faction dynamics shift based on player actions. A player who makes Saints-Hollow peace possible changes how every subsequent Saints interaction feels.',
  ],

  reputationDesign: {
    range: { min: -100, max: 100 },
    neutralPoint: 0,
    rules: [
      'Most players will end somewhere in the middle range with most factions.',
      'Choices that gain rep with one faction should often cost with another.',
      'Rep gates should be readable — the player should understand why a choice requires a specific threshold before they need it.',
      'Maximum rep with a faction should reveal their flaw as clearly as their strength.',
    ],
  },
};


// ══════════════════════════════════════════════════════════════════════════════
//  SECTION 19 — COMPANION RELATIONSHIP RULES
// ══════════════════════════════════════════════════════════════════════════════

export const COMPANION_RULES = {

  principle: `
    Companion trust is earned by treating companions as people, not as resources.
    High trust is not loyalty purchased — it is a relationship built.
  `,

  trustScale: [
    { value: 0,  meaning: 'The companion is present but wary' },
    { value: 3,  meaning: 'Starting trust for a chosen companion' },
    { value: 5,  meaning: 'Enough trust to share honest opinions and ask for help' },
    { value: 7,  meaning: 'Enough trust to share something the companion has not told anyone else' },
    { value: 9,  meaning: 'Enough trust for the companion to make an independent sacrifice' },
    { value: 10, meaning: 'The companion ending is available' },
  ],

  typicalDeltas: {
    smallHonestyOrCare: '+1',
    meaningfulChoiceRespectsValues: '+2',
    significantSacrificeForCompanion: '+3',
    lieDiscoveredOrBetrayalOrUsedAsResource: '-1 to -3',
  },

  interludes: {
    description: 'Companion interlude events are brief scenes injected between story beats when specific trust conditions are met. They are not reachable through normal navigation.',
    rules: [
      'All interlude choices must use nextNode: "__return__"',
      'All interlude choices must include removeFlags: ["companion_event_active"] in effects',
      'Each event sets a "<nodeId>_seen" flag to prevent it firing again',
      'Events use chapter: "Interlude"',
      'GameContext sets companion_event_active and pendingReturnNodeId before redirecting',
    ],
    mirasEvents: [
      'mira_event_opens_up — she reveals her Archive past at trust ≥ 5',
      'mira_event_corruption_warning — she confronts the player about corruption at ≥ 40',
      'mira_event_pulls_away — she challenges the player\'s direction',
      'mira_event_sacrifice_offer — she tells the player she has already decided at trust ≥ 7',
    ],
    cainsEvents: [
      'cain_event_respect_earned — "Capable." This is a speech.',
      'cain_event_resource_warning — he has already counted everything and the numbers are bad',
      'cain_event_hesitation — he counted three moments of hesitation. He always counts.',
      'cain_event_betrayal_warning — "The offer expires in forty-eight hours. I have not responded."',
    ],
  },

  writingCompanions: [
    'Companions have opinions. Write them. They do not always agree with the player\'s choice.',
    'A companion\'s response to a choice should reflect their personality specifically, not a generic approval signal.',
    'Companion dialogue is sparse — they do not speak in every scene. When they do, it matters.',
    'Companions can be wrong. Mira\'s assessment of a situation is not always correct. Cain\'s instincts sometimes fail him.',
    'Never write a companion as fully dependent on the player. They had lives before the player arrived. Those lives matter to them.',
    'Companion deaths are permanent. No retroactive saves. No grief shortcut.',
  ],
};
