/**
 * ============================================================
 *  SCARS OF THE LAST KINGDOM — STORY BIBLE
 * ============================================================
 *
 * This file is the canonical reference for all lore, world-building,
 * faction design, companion rules, and writing standards for
 * "Scars of the Last Kingdom."
 *
 * It is NOT imported by the game. It exists so that every story
 * node written for this game is consistent with the established
 * world, regardless of who writes it or when.
 *
 * Before writing any new chapter content, read this file.
 * If something contradicts what you find in the storyNodes,
 * this file is the authority — update the node.
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
    'atmospheric',    // Every scene should have a physical presence
    'morally heavy',  // Choices should cost something real
    'slow burn',      // Revelations are earned, not given
    'intimate',       // The world is vast but the story is personal
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
        The Vault is opened by a Glass Court extraction team. Seventeen seconds later,
        every power system in the city — conventional and relic — fails simultaneously.
        The failure is total, instantaneous, and impossible by any conventional physics.
        Four hundred thousand people die in the first week. Not from the blackout itself,
        but from the systems the blackout killed: medical infrastructure, heating, water
        treatment, food refrigeration.

        The survivors call this The Blackout. The Glass Court calls it The Incident.
        The Red Choir calls it The Opening. The Last Archive calls it The Response.
        The Iron Saints call it Day Zero.
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

        The player wakes in the metro with a mark on their wrist. The mark is new.
        It wasn't there before the blackout.
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
      value: 'Unknown — the Archive pays more for these than anything else.',
    },
    {
      name: 'Relic Weapons',
      description: 'Extremely rare. Objects that concentrate and discharge relic energy. The Iron Saints confiscate every one they find. None have been publicly demonstrated.',
      value: 'Priceless, and extremely dangerous to possess.',
    },
    {
      name: 'The Vault',
      description: 'Not a portable object but the largest known relic structure. Sealed chamber of indeterminate depth beneath the metro\'s lowest excavated level. Entered once, never re-entered. Contents unknown.',
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
    in low light — a violet pulse, regular as a heartbeat but not synchronized with
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

  whatNobodyKnows: `
    Nobody knows why the marks appeared. The most common theories:

    1. The Vault activated them remotely as part of whatever "Response" the opening triggered.
    2. The marks are not new — they were always latent in certain individuals, and the Blackout
       was the catalyst that expressed them.
    3. The marks are the relic civilisation's method of selecting successors or messengers.
    4. The marks are a warning system, and the Corruption accumulation is the countdown.

    The player will learn more theories over the course of the game. None of them will be
    definitively confirmed by the end of Chapter 1. By the end of the full game, one of
    them should be clearly true — and it should not be the most comfortable one.
  `,

  howOthersTreatMarkedIndividuals: {
    ironSaints: 'Register and monitor. High-trust Saints will confiscate relics from mark-bearers "for safety." Low-trust Saints arrest on sight.',
    glassCourt: 'Study. Mark-bearers are valuable research subjects. The Court will pay well for voluntary access and extract by force if they think they can get away with it.',
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
    { range: '0–20', label: 'Latent', effects: 'Mark activates relics passively. No visible changes.' },
    { range: '21–40', label: 'Aware', effects: 'Player begins sensing relic locations without line of sight. Certain Archive scholars notice and react differently.' },
    { range: '41–60', label: 'Resonant', effects: 'Mark activates relics at greater range. Relic locks previously closed to the player may open. The Red Choir approaches with more urgency.' },
    { range: '61–80', label: 'Saturated', effects: 'Corruption choices become available that bypass normal skill requirements. Some companions react with unease. Faction attitudes shift.' },
    { range: '81–100', label: 'Consumed', effects: 'The mark displays fragments of unknown language. The player begins receiving information that could not be known by ordinary means. The Corruption ending becomes available.' },
  ],

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
//  SECTION 8 — THE CITY
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
      description: 'The former city centre, closest to the Vault site below. Highest structural damage. Buildings half-collapsed, streets opened by subsidence. Iron Saints maintain one patrol route. Relic density is highest here.',
      feel: 'Oppressive. Physically dangerous. The ruins here feel watched.',
      encounters: ['Iron Saint patrols', 'Relic scavengers', 'Red Choir shrines', 'Structural collapse hazards'],
    },
    {
      name: 'The Outer Ring',
      description: 'Former residential districts on the city periphery. Less damaged than the Scar but largely depopulated. Wind comes through without obstruction. Vegetation has begun to reclaim the streets.',
      feel: 'Lonely. Vast. Occasional strange beauty.',
      encounters: ['Abandoned survivor camps', 'Black market routes', 'Glass Court survey teams', 'Feral animals'],
    },
    {
      name: 'The Checkpoint Corridor',
      description: 'A fortified strip connecting three Iron Saints surface positions. Razor wire, wand-equipped soldiers, identity processing. The official route between underground and surface. Deeply unsafe for mark-bearers.',
      feel: 'Bureaucratic violence. Everything is procedure. The procedure is designed to extract compliance.',
      encounters: ['Iron Saint checkpoints', 'Informants', 'Desperate civilians', 'Processing queues'],
    },
    {
      name: 'The Glass Quarter',
      description: 'Former scientific and administrative district. The Glass Court maintains several above-ground facilities here, powered by relic energy they somehow still have access to. Clean, clinical, unsettling.',
      feel: 'Wrong kind of normal. Too orderly for what surrounds it.',
      encounters: ['Glass Court researchers', 'Security', 'Subject transfer transports', 'Archive ruins'],
    },
  ],

  undergroundZones: [
    {
      name: 'Metro Line 9 — The Starting Zone',
      description: 'Sub-level 3 of the old Line 9 metro. Where the player begins. Emergency lighting, stripped resources, scattered survivor evidence. Connected via tunnel to other metro branches.',
      feel: 'Cold. Familiar somehow. Everything that was once routine is now survival.',
      keyLocations: ['The Ruined Station (start)', 'Platform 9-B Vending Row', 'Service Corridor North', 'The Concourse Junction'],
    },
    {
      name: 'The Hollow Warrens',
      description: 'Hollow Children territory. A network of converted maintenance tunnels, roughly habitable. Lanterns, salvaged furniture, communal sleeping areas. The most human-feeling space underground.',
      feel: 'Crowded. Warm. Precarious. Community built from nothing.',
      keyLocations: ['Main Warren Hall', 'Distribution Point', 'Elder Quarters', 'The Wall (community history)'],
    },
    {
      name: 'The Saints Processing Hub',
      description: 'Iron Saints underground administrative center. Former metro management offices, converted to ID processing, supply control, and detention. Wand scans at entry.',
      feel: 'Authority without legitimacy. Everything is documented. Documentation is control.',
      keyLocations: ['Registration desk', 'Holding cells', 'Supply depot', 'Command office'],
    },
    {
      name: 'The Black Market Vein',
      description: 'Informal trade zone in decommissioned tunnels between Line 9 and the Hollow Warrens. No faction officially controls it, which is why it exists. Everything is for sale if you know which shadow to approach.',
      feel: 'Clandestine vitality. Dangerous honesty. People who have nothing left to lose.',
      keyLocations: ['Main stall row', 'Back alcoves', 'The weighing room', 'The courier post'],
    },
    {
      name: 'The Last Archive Entrance',
      description: 'A sealed section of pre-Blackout metro infrastructure, converted to Archive use. The outer hall is accessible; the inner sanctum requires invitation, a specific mark signature, or both.',
      feel: 'Old knowledge. Paper smell. Controlled desperation to preserve something.',
      keyLocations: ['Antechamber', 'Reading room', 'The relic catalog', 'The inner door (sealed)'],
    },
    {
      name: 'The Vault Approaches',
      description: 'The tunnels leading to the Vault excavation site. Officially sealed by Iron Saints. Actually used as a route by Archive researchers, Red Choir pilgrims, and anyone desperate enough. Heavy relic density. Mark reacts constantly.',
      feel: 'Wrong. Something happened here and is still happening. The air feels thicker.',
      keyLocations: ['The Saints blockade', 'The Archive bypass route', 'The lower excavation', 'The Vault entrance'],
    },
  ],
};


// ══════════════════════════════════════════════════════════════════════════════
//  SECTION 9 — MAJOR FACTIONS
// ══════════════════════════════════════════════════════════════════════════════

export const FACTIONS = {

  ironSaints: {
    fullName: 'The Iron Saints',
    shorthand: 'Saints / the Saints / Saint patrols',
    colorCode: '#8e3a2a',
    reputation: { min: -100, max: 100, neutral: 0 },

    coreBeliefs: `
      Order is survival. Without structure, the remaining eighty thousand people
      will consume each other within a year. The Iron Saints believe — genuinely,
      most of them — that their mandate is the preservation of what remains of
      civilisation. They are not wrong that order matters. They are wrong about
      who gets to define it, and at what cost.

      The Saints have a deep institutional fear of relic technology after the
      Blackout. They do not understand it. They cannot control it. Their solution
      is elimination: confiscate every relic object, register every mark-bearer,
      and systematically reduce the number of variables they cannot predict.
    `,

    leader: {
      name: 'Commander Aldric Voss',
      title: 'Iron Saints Commander, Line Authority',
      age: 58,
      background: `
        Former city military officer who survived the Blackout by being underground
        in a Saints bunker during a routine inspection. Lost his family in the first
        week. Has not spoken of them since. Rebuilt the Saints from a communication-
        severed unit into a functioning authority through sheer will and documented
        procedure. He is not cruel by disposition — he is cruel by policy, and the
        distinction has stopped mattering.
      `,
      appearance: 'Tall, grey-haired, precise. Never seen without his command uniform. Never seen to eat or drink in public.',
      motivation: 'Prevent a second collapse. Control everything that can be controlled. That includes the marks.',
      secret: 'Voss has a mark-bearing informant embedded in every faction except the Choir. He knows more about the marks than he admits.',
    },

    visualIdentity: `
      Grey-green fatigues with a stylised flame/cross emblem (the "saint mark")
      on the left chest. Wands are standard issue — metal rods that glow when
      near active relic energy. High-ranking officers carry polished pistols
      that have never, visibly, been fired. They project capability more than
      they demonstrate it.

      Their spaces are clean. Documents in order. Lighting functional.
      The contrast with everything else is designed to communicate authority.
    `,

    strengths: [
      'Largest organised force in the city — approximately 3,000 active members',
      'Control of the most reliable food distribution network (for registrants)',
      'Access to the only functional medical infrastructure above baseline',
      'The wands — ability to detect relics and marks at checkpoints',
      'Documentation system — they know more about who is alive and where than anyone',
    ],

    weaknesses: [
      'Institutional fear of relic technology limits their understanding of it',
      'Internal fractures — some Saints believe the mandate has gone too far',
      'The Blackout left them with no command structure above Voss — legitimacy is self-declared',
      'They depend on compliance; armed resistance is a vulnerability they have not fully solved',
      'Mark-bearer registration is incomplete — they cannot find what they are not told about',
    ],

    howTheyTreatThePlayer: `
      Initially suspicious. If the player registers their mark, they are monitored.
      If they do not register, they are a threat.

      High Saints rep enables: reliable food access, checkpoint passes, access to
      confiscated relic inventory. High Saints rep costs: they will eventually ask
      the player to inform on other factions. Refusal damages rep. Compliance
      damages every other faction relationship.

      Low Saints rep: checkpoint harassment, confiscation risk, arrest on low-enough
      rep combined with visible mark.
    `,

    allianceRoute: `
      The player aligns with the Saints by embracing order — registering, complying,
      demonstrating that a mark-bearer can be controlled. This route requires accepting
      that some people will be sacrificed for stability, and not flinching. Aldric Voss
      respects demonstrated consistency above all things. A player who builds full trust
      with the Saints learns the secret: Voss knows the Vault was deliberately opened,
      and he knows who ordered it.
    `,

    betrayalRoute: `
      The Saints betray the player when they determine the player is uncontrollable.
      Usually triggered by: refusal to register, helping mark-bearers evade detection,
      accumulating relic objects past their tolerance, or being caught with the Choir.
      Betrayal is not personal — it is procedural. They will process the player.
    `,

    endingPath: `
      FACTION ENDING: The player uses their mark and their Saints relationship to
      broker a formal agreement — Saints authority in exchange for protected status
      for mark-bearers and Archive independence. Voss agrees, conditionally.
      The city gets order. Mark-bearers get the right to exist. Nobody gets the truth
      about the Vault. The player lives as a registered anomaly in a system they
      helped build.

      This is a compromise ending. Not heroic. Not comfortable. Sustainable.
    `,
  },

  glassCourt: {
    fullName: 'The Glass Court',
    shorthand: 'the Court / Court researchers',
    colorCode: '#2a5a6a',
    reputation: { min: -100, max: 100, neutral: 0 },

    coreBeliefs: `
      Knowledge is survival. The Glass Court was built on the belief that
      the right application of intelligence can solve any resource problem —
      and they were largely correct until the Vault. Five years later, they
      still believe it. They just have a different problem to solve now.

      The Court's internal culture is rational, hierarchical, and quietly monstrous.
      They do not think of themselves as doing harm. They think of every sacrifice
      as a necessary data point. The fact that the data points are people is
      something they have learned not to look at directly.
    `,

    leader: {
      name: 'Director Seraphine Kael',
      title: 'Director of Continuance Research',
      age: 44,
      background: `
        A physicist who was present at the Glass Court's first successful relic
        energy extraction in the city's infrastructure project. Not present at the
        Vault opening — she was in a different facility. She watched the Blackout
        happen on instruments that went dead in sequence. She has been trying to
        understand it ever since. Her research has led her to the marks. She is
        convinced the marks are a key. She is right. She is wrong about what lock.
      `,
      appearance: 'Late forties, close-cropped grey-streaked hair, always in lab coat over civilian clothes. Speaks with the practiced patience of someone who considers most conversations a necessary inefficiency.',
      motivation: 'Understand the Blackout. Understand the marks. Prevent it from happening again.',
      secret: 'Kael ordered the Vault opening. She did not understand what would happen. She has never admitted this and has covered every trace. The guilt has made her more ruthless, not less.',
    },

    visualIdentity: `
      Clean, functional clothing — the Glass Court has the only working laundry
      facilities in the city. Staff wear pale grey-blue. Researchers wear white.
      Their facilities have actual glass (salvaged, repurposed) in the windows —
      a deliberate aesthetic signal. Lighting is bright. Everything is labelled.
    `,

    strengths: [
      'Access to functional laboratory equipment powered by a surviving relic cache',
      'Medical knowledge — the best doctors in the city work for the Court',
      'The only group systematically studying mark behaviour and relic interaction',
      'Control of three above-ground facilities the Saints have not entered (yet)',
      'Information — they have been documenting the city continuously since before the Blackout',
    ],

    weaknesses: [
      'Their resource base is fragile — the relic cache powering their facilities is finite',
      'Internal ethical fractures — some researchers are breaking from Kael\'s methods',
      'The Saints tolerate them but do not trust them — one incident from conflict',
      'They need mark-bearers for research and cannot fully recruit them; coercion creates enemies',
      'Kael\'s secret is a structural weakness — exposure would collapse the Court\'s legitimacy',
    ],

    howTheyTreatThePlayer: `
      Initially with calibrated warmth — mark-bearers are valuable and the Court
      wants their cooperation. Research opportunities, medical access, and genuine
      information exchanges are available. The Court does not immediately coerce;
      they prefer subjects who believe they are partners.

      High Court rep enables: access to the best medical care in the city,
      genuine relic knowledge shared by researchers who respect the player,
      access to pre-Blackout documentation. High rep cost: they will ask for
      controlled relic activation tests. Repeated exposure to the testing process
      raises Corruption steadily.

      Low Court rep: research subject without consent. They will attempt capture
      if the player is sufficiently valuable and sufficiently isolated.
    `,

    allianceRoute: `
      The player aligns with the Glass Court by committing to the research mandate —
      sharing mark activations, providing relic objects, and eventually gaining
      Kael's trust enough to learn the truth about the Vault opening. This route
      requires understanding that Kael's guilt makes her the most dangerous kind
      of opponent: one who cannot afford to be wrong. The alliance ending requires
      the player to choose whether to expose her or protect her secret for the
      greater good of the Court's continuing research.
    `,

    betrayalRoute: `
      The Court betrays the player the moment they become more valuable as a
      controlled subject than as a willing partner. Usually triggered by: the
      player acquiring information about the Vault opening, refusing testing
      beyond their threshold, or the player's Corruption reaching a level that
      makes them useful for a procedure Kael wants to run that the player
      would not consent to.
    `,

    endingPath: `
      FACTION ENDING: The player, with the information about Kael's role in the
      Vault opening, becomes the Court's de facto moral compass — the one person
      who knows the truth and chooses what to do with it. If they protect Kael
      and stabilise the Court, the research continues. If they expose her, the
      Court fractures but the information about the Vault becomes public. Either
      way, the player has changed what the Court is.
    `,
  },

  hollowChildren: {
    fullName: 'The Hollow Children',
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
      name: 'Pera, called the Elder',
      title: 'None — Elder is an informal title of community recognition',
      age: 67,
      background: `
        A former metro maintenance worker who was underground when the Blackout
        happened. Spent the first night guiding survivors through the tunnel system
        by memory. Has lived in the Warrens since. Has never been to the surface
        since the Blackout. Can navigate every inch of the metro system in the dark.
        Does not lead by command — leads by example, endurance, and an absolute
        refusal to eat before the children eat.
      `,
      appearance: 'Small, weathered, moves slowly. Burns no urgency on anything that is not urgent. Watching her notice something is one of the most unsettling experiences in the Warrens.',
      motivation: 'Keep the Warrens alive. Keep the practice alive. Keep the children who grew up here from becoming what the other factions became.',
      secret: 'Pera has a mark. She has had it since the Blackout. She has told no one. She has used it twice, both times to find water in tunnels no one else knew about.',
    },

    visualIdentity: `
      Salvaged, repaired, layered clothing — warm above appearance. Community
      spaces have salvaged lanterns at deliberate heights, creating warm pools
      of light rather than even illumination. Everything is worn but cared for.
      The wall in the main Warren is covered in tiles, fabric swatches, and
      written names — a community history that grows with every season.
    `,

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
      'Pera\'s age and the lack of clear succession is a structural risk',
    ],

    howTheyTreatThePlayer: `
      With provisional warmth — the Hollow Children share with strangers but
      are not naive. The player earns full trust by giving before taking:
      bringing food, water, or information that helps the community. The
      Hollow do not care about the mark unless the player's mark causes
      problems with the Saints (which it will).

      High Hollow rep enables: tunnel network access, safe passage anywhere
      the Hollow go, community intelligence, genuine friendship with Pera.
      High rep cost: the Hollow will eventually need the player to do something
      risky on behalf of people they have never met and cannot repay them.

      Low Hollow rep: cold reception. No one is hostile — the Hollow do not
      do hostile — but help dries up and the guides look through you.
    `,

    allianceRoute: `
      The player becomes a champion of the Warrens — someone who uses their
      mark and their connections with other factions to secure resources and
      protection for the community. This route requires repeatedly choosing
      the Hollow's welfare over personal advantage, and eventually brokering
      an arrangement with either the Saints or the Court that gives the Warrens
      formal protected status. Pera reveals her mark only on this route,
      and only when the player has maximum trust.
    `,

    betrayalRoute: `
      The Hollow Children do not betray. But they can be betrayed — by the player
      informing on their tunnel routes to the Saints, or by negotiating away their
      autonomy to another faction for personal gain. Pera does not confront.
      She remembers. The community knows. It spreads. The player never eats in the
      Warrens again.
    `,

    endingPath: `
      COMPANION/FACTION ENDING: The player, using every connection they have built,
      secures formal recognition of the Warrens as an autonomous community zone —
      exempt from Saints processing, supplied by Court medical resources, and
      protected by an Archive-brokered agreement. Pera survives to see it. She
      does not thank the player directly. She just keeps eating after the children eat.
      That is enough.
    `,
  },

  redChoir: {
    fullName: 'The Red Choir',
    shorthand: 'the Choir / Choir broadcasts',
    colorCode: '#7a1a3a',
    reputation: { min: -100, max: 100, neutral: 0 },

    coreBeliefs: `
      The Blackout was not a disaster. It was a gift. It was the world shedding
      what it no longer needed, and what it shed was the old way of being — the
      systems, the hierarchies, the delusion that human beings could control
      something as vast as this city, this world, this cosmos.

      The Red Choir believes that the Vault opened because it was time to open it.
      They believe the marks are chosen. They believe the marks are being called.
      They are not entirely wrong. Their interpretation of why is catastrophically,
      dangerously wrong — but the pattern they are reacting to is real.
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
      motivation: 'To gather the marked, open the Vault completely, and allow whatever is inside to complete what it started.',
      secret: 'The Voice is not alone in the broadcast location. They are with three other mark-bearers whose Corruption is near or at maximum. They are not worshipping the Vault. They are communicating with it.',
    },

    visualIdentity: `
      Deep red fabrics — cloth dyed with the only pigment still available at scale
      in the underground, which happens to be a root compound that produces crimson.
      This is practical, but the Choir has built ritual around it. Members wear
      red above the waist. The inner Choir wears marks — artificial sigils on
      their wrists that they believe will call the real mark to them. They do not.
      But mark-bearers who come near inner Choir members report their marks reacting.
    `,

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
      the Archives don't know about, the Voice's visions (some of which are useful).
      High rep cost: the Choir will ask the player to help with the reopening.
      They are genuinely convinced this is good. They are wrong.

      Low Choir rep: they do not pursue. They broadcast. They wait. They believe
      the marked always come back eventually.
    `,

    allianceRoute: `
      The player aligns with the Choir by following the Voice deep into the
      Vault approaches and surviving what they find there — which confirms some
      of what the Choir believes and invalidates other parts. The alliance ending
      does not involve completing the Choir's original mission. It involves the
      player helping the Voice understand what they are actually hearing from
      the Vault, which is not what they thought.
    `,

    betrayalRoute: `
      The Choir betrays if the player takes their knowledge and uses it to
      close the Vault routes or expose the Voice's location to the Saints.
      Betrayal from the Choir is the most personal: the Voice broadcasts a
      message about the player by name, detailing their choices. The broadcast
      reaches everyone. The Choir does not hunt. They mourn.
    `,

    endingPath: `
      SECRET ENDING: The player, working with the Voice, discovers the actual
      nature of what is in the Vault — not a god, not a weapon, not a warning,
      but a message. Left by whoever built the relic civilisation, for whoever
      developed the marks. The ending reveals the message. Not in words. In the
      player character's understanding. The game does not tell the player what
      they now know. They carry it out into the world. That is the end.
    `,
  },

  lastArchive: {
    fullName: 'The Last Archive',
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
      right conditions to act.
    `,

    leader: {
      name: 'Kira Dawnsen',
      title: 'Head Archivist',
      age: 51,
      background: `
        A linguist who was one of the original Archive team forty years ago,
        and the only member of that team still alive and working. She has spent
        more time with relic texts than any other person in history. She has
        partially decoded three relic languages. Partially. She knows what the
        Vault transmitters are broadcasting. She has not told anyone because she
        is not certain of her translation and she knows what certainty costs
        when you are wrong.

        She has no mark. She is the only major faction leader without one.
      `,
      appearance: 'Quiet, considered, moves like someone who has spent decades in small rooms. Reads everything in your face when you speak. Does not ask questions she already knows the answer to.',
      motivation: 'Finish the translation. Understand what the Vault message says before anyone else does something irreversible with it.',
      secret: 'Kira has partially decoded the Vault transmitter signal. It is not a warning. It is not an invitation. It is a question. She does not know the answer. She does not know if humans are supposed to answer it.',
    },

    visualIdentity: `
      Worn scholarly clothing — layers, pockets, everything slightly aged.
      The Archive space itself is the visual identity: stacked documentation,
      careful organisation that looks chaotic to outsiders, relic objects in
      numbered cases, light from salvaged relic shards. The smell of paper.
      The constant, low-level hum of the inner door.
    `,

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
      'The tendency to know things and not act on them is both their strength and their central flaw',
      'Inner door creates a power vacuum — everyone wants access and the Archive has no good way to share it safely',
      'Kira\'s incomplete translation is the most dangerous secret in the city',
    ],

    howTheyTreatThePlayer: `
      With careful interest. The Archive does not rush. A mark-bearer is interesting
      to them — useful, potentially — but they do not overplay their hand. The
      initial interactions are measured exchanges: information for information.
      The player brings them something; they offer something back.

      High Archive rep enables: access to the most complete relic and mark documentation
      in existence, partial translation access, and eventually an audience with Kira,
      which is the closest thing to a master key for the game's mysteries.
      High rep cost: the Archive will ask the player to enter the inner door and
      report what they experience. This raises Corruption and is not reversible.

      Low Archive rep: polite closure. They will not share. They will not threaten.
      The door remains shut. Kira sends her regards.
    `,

    allianceRoute: `
      The player becomes the Archive's agent in the field — doing what scholars
      cannot: moving through faction lines, accessing relic sites, and returning
      with data. Maximum trust unlocks the partial translation and Kira's admission
      that she needs the player to enter the Vault (not to complete a mission — to
      answer the question it is asking, because the mark is the only thing that can).
    `,

    betrayalRoute: `
      The Archive does not betray directly. But they will protect the translation
      over the player if forced to choose. If the player becomes a threat to the
      translation's security — by aligning too closely with the Choir, or by
      threatening to take the inner door by force — the Archive's diplomacy ends
      and the Saint relationship they have quietly maintained activates.
    `,

    endingPath: `
      SECRET ENDING: The player, with maximum Archive trust and high Corruption,
      enters the inner door and receives the full translation — not as language but
      as direct understanding transferred through the mark. The Vault's question is
      answered. Not by fighting, not by choosing, but by witnessing. The ending
      is quiet. Kira is there. She does not speak. She has waited forty years for
      this. The player carries the answer out into a world that has no system yet
      for what to do with it. The Archive begins building one.
    `,
  },
};


// ══════════════════════════════════════════════════════════════════════════════
//  SECTION 10 — MAJOR COMPANIONS
// ══════════════════════════════════════════════════════════════════════════════

export const COMPANIONS = {

  mira: {
    name: 'Mira',
    role: 'Former metro maintenance engineer. Survivor. The player\'s first reliable ally.',
    age: 32,

    appearance: `
      Medium height, practical. Hair kept very short — a maintenance habit that
      stuck. Always carries a tool kit that has been rebuilt and rebuilt from
      salvage. Her hands are scarred from the first winter underground.
    `,

    backstory: `
      Mira was in the metro tunnels during the Blackout on a routine maintenance
      shift. She kept seventeen people alive through the first week using her
      knowledge of the tunnel system's emergency systems — systems that still worked
      because they were purely mechanical. She does not talk about the first week.
      She talks about what comes after it.

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

    trustArc: `
      Trust builds through: honesty, protecting people at personal cost, not lying
      about what the mark is doing, listening when she talks about the first week
      (she only does this once — it matters enormously).

      Trust damages through: using people, lying to her directly, choosing
      faction interest over specific individual welfare, treating scarcity as
      abstract.

      At maximum trust, Mira tells the player something she has told no one:
      she found the bodies of the Vault extraction team. Not in the Vault.
      In the tunnels below it. Arranged. All of them facing the same direction.
    `,

    companionEnding: `
      If Mira is alive and trusted at the final chapter, she asks the player
      one question: after everything, do they want to stay or go? Her answer
      will match theirs if trust is maximal. The companion ending is the two
      of them — wherever they end up — together. Not as romance necessarily.
      As people who chose each other in a situation where choosing was the
      most expensive thing available.
    `,

    sacrificeCondition: `
      Mira can sacrifice herself in Chapter 2 to save the Hollow Children's
      Warren from a Saints purge. This happens only if the player failed to
      broker a Saints deal AND Mira's trust is high enough that she makes the
      choice independently rather than asking the player's permission. Her death
      is not shown on screen. The player arrives after. The Hollow Children
      remember her name.
    `,
  },

  cain: {
    name: 'Cain',
    role: 'Former Black Market courier. Survivor. The player\'s most useful and least trustworthy ally.',
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

    personality: `
      Charming in the way of someone who learned charm as a tool and has used it
      so long they can't always separate the performance from the person underneath.
      Genuinely funny. Occasionally genuinely kind, at moments that surprise him
      as much as everyone else. Honest about being dishonest, which is a form
      of honesty he values highly. Will not lie to the player about his own nature.
      Will lie to everyone else without hesitation.
    `,

    whatHeBringsToThePlayer: [
      'Market access — he knows every trader, route, and price',
      'Faction intelligence — he runs between all factions without full allegiance to any',
      'Mark knowledge — his own experience gives the player the most honest peer perspective available',
      'A specific Saints contact who is corruptible — useful at the right moment',
    ],

    trustArc: `
      Trust builds through: giving him space to be what he is, acknowledging
      his honesty about dishonesty, choosing to trust him in situations where
      it cost you something, and the mark — when the player reveals theirs,
      his response determines whether trust is possible at all.

      Trust damages through: demanding loyalty he has not offered, treating him
      as a tool rather than a person, exposing his network without asking, and
      most critically: if he discovers the player knew about his mark before
      he told them and didn't say so. He considers that a personal failure of
      the only standard he keeps: honesty about what you are.

      At maximum trust, Cain reveals which faction he has been reporting to.
      Not the Saints. Not the Court. The Glass Court knew about the marks before
      the Blackout. They knew. Kael told him. He has been sitting on this for
      five years because he didn't know what to do with it.
    `,

    betrayalCondition: `
      Cain betrays the player if his trust is below 3 AND the player has the
      'cain_knows_mark' flag AND the player registers with the Saints at the
      Processing Hub. He turns in the registration information — he has been
      selling Saints registration intel this whole time. It's not personal.
      He says this in the betrayal scene. He means it, and it doesn't help.
    `,

    companionEnding: `
      If Cain is alive and trusted at the final chapter, he does something the
      player has not seen him do: he asks for help. Not in a crisis — in a quiet
      moment. He has been running from something since before the Blackout and
      the Blackout didn't stop it. The companion ending is the player deciding
      whether to be the first person he has trusted that much.
    `,
  },
};


// ══════════════════════════════════════════════════════════════════════════════
//  SECTION 11 — MAJOR VILLAINS
// ══════════════════════════════════════════════════════════════════════════════

export const VILLAINS = {

  philosophyNote: `
    No character in this game is a villain by nature. Every antagonist believes
    they are doing what must be done. The horror is not that they are wrong about
    the facts. Sometimes they are not. The horror is what they are willing to do
    with facts that are correct.
  `,

  voss: {
    name: 'Commander Aldric Voss',
    whyAntagonist: `
      Voss is the antagonist of the Order path. He is right that the city needs
      structure to survive. He is right that mark-bearers represent an unpredictable
      variable. He is wrong that controlling unpredictable variables is sufficient,
      and wrong about the scale of what is underneath him.

      His final confrontation is a conversation, not a fight. He already knows
      the player cannot be stopped by that point. He wants to know if they are
      worth being stopped by what they are about to do. He is asking the player
      to justify themselves to a man who has spent five years being the only
      thing between eighty thousand people and chaos. That justification should
      be hard to give.
    `,
  },

  kael: {
    name: 'Director Seraphine Kael',
    whyAntagonist: `
      Kael is the antagonist of the Knowledge path. She opened the Vault.
      She caused the Blackout. She has spent five years trying to fix it using
      the same framework of thinking that caused it. She genuinely believes
      more knowledge will produce a solution. She is not wrong that knowledge
      helps. She is wrong that the problem can be solved by the same methodology
      that created it.

      Her final confrontation is a choice: the player can expose her, protect
      her, or offer her the one thing that might actually change her — the truth
      about what the Vault is, if the player knows it. The only path that fully
      resolves her arc is the one where she understands what she opened.
    `,
  },

  theVoice: {
    name: 'The Voice (Red Choir)',
    whyAntagonist: `
      The Voice is the antagonist of the Faith path. They are experiencing
      genuine visions. Their interpretation of those visions is the danger —
      not because they are lying, but because they are translating something
      they can feel but not fully comprehend. They want to open the Vault
      completely, which is the one act every other faction and the player's
      own instincts agree would be catastrophic.

      Their final scene is the most ambiguous in the game. If the player
      has maximum Corruption and has been to the Vault approaches, they will
      understand something about the Voice's visions that the Voice does not:
      the visions are not instructions. They are distress signals. The Voice
      has been trying to help something that is asking to be helped, and
      their method is wrong but their instinct is not.
    `,
  },
};


// ══════════════════════════════════════════════════════════════════════════════
//  SECTION 12 — IMPORTANT MYSTERIES
// ══════════════════════════════════════════════════════════════════════════════

export const MYSTERIES = [
  {
    mystery: 'What is in the Vault?',
    partialAnswers: [
      'The relic civilisation built the Vault as a communication point',
      'Something is still active inside it',
      'The extraction team that opened it was not harmed — they were responded to',
    ],
    fullAnswer: 'NOT REVEALED IN CHAPTER 1. Revealed in Chapter 3 (final chapter).',
    writingNote: 'Do not answer this. Plant evidence. Let each faction\'s interpretation feel plausible.',
  },
  {
    mystery: 'Who built the relic civilisation?',
    partialAnswers: [
      'Their architecture predates human civilisation by an unknown period',
      'Their materials are not Earth-origin — this is in Archive documentation the player can find',
      'The marks appear to be their interface technology',
    ],
    fullAnswer: 'DELIBERATELY AMBIGUOUS. The game does not confirm or deny external origin. It is enough that they were real, they are gone, and they left something behind.',
    writingNote: 'Never say alien. Never say divine. Let the player sit with not knowing.',
  },
  {
    mystery: 'Why these specific mark-bearers?',
    partialAnswers: [
      'Not genetic — family members of mark-bearers do not develop marks',
      'Not proximity-based — some bearers were far from the Vault when it opened',
      'The marks were latent — something in the Vault activation expressed them',
    ],
    fullAnswer: 'The marks identify people with a specific bioelectric signature that the relic technology uses as a key. The selection criteria is mechanical, not chosen. There is nothing special about the people — there is something specific about the signal they produce.',
    writingNote: 'This is revealed to the player at maximum Archive trust. It is both disappointing and liberating. The player was not chosen. They are useful. That distinction matters.',
  },
  {
    mystery: 'What caused the Blackout?',
    partialAnswers: [
      'The Vault opening triggered it',
      'It had a defined boundary following city limits — not a conventional electromagnetic event',
      'Every source of power failed simultaneously, which is physically impossible by standard physics',
    ],
    fullAnswer: 'The Vault responded to being opened by neutralising all energy systems in its vicinity — a defensive measure that was miscalibrated for the scale of human development. It was not trying to kill the city. It was trying to stop something. It did not know the city was there.',
    writingNote: 'This revelation, at maximum Corruption in the Vault approaches, is the single most important story beat. Handle it carefully. The Blackout was not malice. That is worse than malice in some ways.',
  },
  {
    mystery: 'What does the Vault transmitter signal mean?',
    partialAnswers: [
      'Kira has partially decoded it',
      'It is not a warning',
      'It is not an invitation',
    ],
    fullAnswer: 'It is a question: "Is anyone still there?" The relic civilisation has been broadcasting this question through the Vault transmitters for an unknown period of time, waiting for something with the right bioelectric signature to respond. The marks are the response mechanism. Nobody responded until now.',
    writingNote: 'This is the emotional core of the entire game. The great civilisation is gone, and it left behind a question, and the answer is: yes, someone is still here, and they survived something you did to them, and they are still standing. Write every ending with this as the background.',
  },
];


// ══════════════════════════════════════════════════════════════════════════════
//  SECTION 13 — CHAPTER ROADMAP
// ══════════════════════════════════════════════════════════════════════════════

export const CHAPTER_ROADMAP = [
  {
    chapter: 'Chapter 1: The Ruined Station',
    status: 'Complete',
    premise: 'The player wakes in the metro. The mark is new. Survival is immediate. The factions are establishing themselves around the player. The companions are encountered. The central mystery is presented but not named.',
    keyBeats: [
      'Player wakes, discovers mark',
      'First survival challenge — food and water',
      'Encounter with Iron Saints (registration decision)',
      'Meeting Mira (or Cain, depending on starting companion)',
      'First relic contact (mark activates something)',
      'Introduction to the Hollow Children and the Warrens',
      'First faction decision — who do you help?',
      'Chapter end: player reaches the Archive entrance, the inner door hums, the mark responds',
    ],
    endings: [
      'Starvation (survival failure)',
      'Beaten to death (fight with no retreat)',
      'Saints execution (arrested, low rep)',
      'Cain betrayal (low trust + specific conditions)',
      'Relic awakening (high corruption + specific choice)',
      'Chapter 1 completion (reach the Archive door)',
    ],
  },
  {
    chapter: 'Chapter 2: The Descent',
    status: 'In development',
    premise: 'The Archive door is open. The world is larger than the metro. The Vault approaches are accessible. The factions move from establishing to active — they need things from the player, and they begin to take if not given.',
    keyBeats: [
      'Entering the Archive inner room for the first time',
      'First Vault approach — player sees the site, does not enter',
      'Red Choir broadcast — the Voice speaks directly to mark-bearers',
      'Mira or Cain loyalty test — one choice that defines the relationship',
      'Glass Court offer — controlled research access, uncomfortable terms',
      'Hollow Children crisis — food supply cut by Saints',
      'First real peek at the Vault transmitter signal (if Archive trust is high)',
      'Chapter end: player stands at the Vault entrance for the first time',
    ],
    endings: [
      'Mira sacrifice (specific conditions)',
      'Cain betrayal escalation (if trust not rebuilt from Chapter 1)',
      'Glass Court subject capture (specific conditions)',
      'Corruption ending (very high corruption path)',
      'Faction capture by Saints (low rep + exposure)',
      'Chapter 2 completion (standing at Vault entrance)',
    ],
  },
  {
    chapter: 'Chapter 3: The Answer',
    status: 'Planned',
    premise: 'The Vault. The question. The player\'s answer. Every faction makes their final move. Every companion either stands with the player or doesn\'t. The full truth of the Blackout is available to anyone willing to pay for it.',
    keyBeats: [
      'The Vault entrance — each faction is present for different reasons',
      'Final companion decision — stay or go, together or apart',
      'The question (delivered through the mark, not through dialogue)',
      'The player\'s answer (made through final choice architecture)',
      'Faction resolutions — each faction\'s arc concludes based on prior choices',
      'Aftermath — what the city becomes next',
    ],
    endings: [
      'Death (final confrontation)',
      'Betrayal (companion or faction)',
      'Sacrifice (player dies to close the Vault, city survives)',
      'Tyrant (player uses Vault power to impose order)',
      'Savior (player answers the question in a way that heals)',
      'Companion (player and companion walk away from all of it)',
      'Faction (player delivers victory to their chosen faction)',
      'Secret (player answers the question; carries knowledge out)',
      'Corruption (player is consumed by the mark, becomes part of the Vault)',
      'Wanderer (player answers nothing, goes somewhere else)',
    ],
  },
];


// ══════════════════════════════════════════════════════════════════════════════
//  SECTION 14 — ENDING PHILOSOPHY
// ══════════════════════════════════════════════════════════════════════════════

export const ENDING_PHILOSOPHY = {

  principle: `
    No ending is the good ending. No ending is the bad ending.
    Every ending is the ending that player became.
  `,

  rules: [
    'Every ending should feel earned by the player\'s specific choices, not by a final decision alone.',
    'Death endings are not failures — they are a world in which someone with that mark, those stats, those allies, in that moment, did not make it. That is allowed.',
    'The "best" ending is whichever one the player would make again. Not the one that maximises survival.',
    'Endings should reflect tone: no ending should feel like a game-over screen. Every one should feel like the last page of a chapter that mattered.',
    'The secret endings require investment — not grinding, but attention. Players who paid attention should find things other players missed.',
    'Companion endings are only available if the companion is alive. Do not make this avoidable. Death is permanent.',
    'Corruption endings should be written without judgment. A player at maximum Corruption is not a bad player. They are a changed one.',
  ],

  endingTypes: {
    death: 'Violent or survival failure. Written with gravity, not punishment. The last thing the player sees should be worth seeing.',
    betrayal: 'Someone the player trusted turned. The ending should make clear why, without excusing it.',
    sacrifice: 'The player gives something that cannot come back — including, potentially, themselves — to protect something that matters.',
    tyrant: 'The player wins in the way that requires becoming what they feared. Not evil. Just wrong, in the specific way that is available to people who are not wrong about everything.',
    savior: 'The player finds a way through that most people would not have found. Rare. Not heroic in tone — just true.',
    companion: 'Two people, at the end of everything, choosing to stay with each other. Quiet. Specific. Earned.',
    faction: 'The player\'s chosen faction wins something real. The city changes. Not perfectly. It never does.',
    secret: 'The player carries something out that no one else has. Not power. Knowledge. The responsibility is theirs now.',
    corruption: 'The mark consumes. This is not death. It is transformation. Write it with the same care as the savior ending.',
    wanderer: 'The player walks away from the question. Not answering is an answer. Give them the road.',
  },
};


// ══════════════════════════════════════════════════════════════════════════════
//  SECTION 15 — TONE GUIDE
// ══════════════════════════════════════════════════════════════════════════════

export const TONE_GUIDE = {

  atmosphere: `
    The game is dark. Not grimdark — not darkness for spectacle — but the specific
    weight of a world where things are genuinely hard and people are genuinely trying.
    The darkness has texture. It has specific smells (rust, damp concrete, woodsmoke).
    It has sounds (the metro's structural groan, the distant sound of generators,
    the silence that follows them). It has temperature.

    Write with physical precision. The metro is cold. The surface is worse.
    The Archive smells like old paper and something electrical underneath it.
    The Choir smells like candles and something that is not quite blood.
  `,

  violence: `
    Violence in this game is not cinematic. It is expensive and it leaves
    damage that persists. When a scene involves violence, write the cost first.
    The tactical result second. Nobody wins a fight without paying something.
    If they do, the scene is not working.
  `,

  hope: `
    The game is bleak. It is also, underneath everything, about the specific
    kind of hope that exists when you are in a situation that does not promise
    resolution. Not optimism. Not heroism. The simple fact of continuing.

    People help each other here. Not always. Not reliably. But when they do,
    write it with the same weight as the violence. A stranger sharing clean water
    in the metro is as consequential as a gunshot. Often more.
  `,

  worldBuilding: `
    Do not explain the world. Let the world be apparent. A player should
    understand the faction landscape from how people talk about it, not from
    exposition. A player should feel the Blackout's weight from the specific
    gaps in the world — the things that are absent that should be there —
    not from characters recapping it.

    Trust the player to notice. Trust the player to ask. Give them things to ask about.
  `,
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
    'Exposition dumps. No character explains the world to other characters who already live in it.',
    'Morality signposting. Do not use words like "cruel," "kind," or "evil" about choices. Show what the choice costs.',
    'Redemption arcs that don\'t cost anything. If someone is redeemed, it should hurt getting there.',
    'Chosen one framing. The marks are not destiny. They are a coincidence that the player must make meaning of.',
    'Safe choices. Every choice should be a real choice — not a right answer with a wrong answer attached.',
    'Violence as punctuation. Every death should matter. Every injury should persist.',
  ],
};


// ══════════════════════════════════════════════════════════════════════════════
//  SECTION 17 — CHOICE DESIGN RULES
// ══════════════════════════════════════════════════════════════════════════════

export const CHOICE_DESIGN_RULES = {

  principle: `
    Every choice is a question about who the player is, asked through the
    mechanics of what the player can do. The choice text is not a label —
    it is a perspective. "Step forward. If they want a fight, give them one."
    is not the same as "Fight." The first is a character. The second is a menu option.
  `,

  rules: [
    'Write choices as the first-person thought or action of the player character, not as a menu description.',
    'All choices should feel like real decisions. No obvious right answers. The player should sometimes regret the right one.',
    'Always include at least one choice with no stat or flag requirements — a path for everyone.',
    'Stat-gated choices should be aspirational, not frustrating. A locked choice should make the player want to have that stat.',
    'Choice effects should be proportional. A small kindness gives small trust. A meaningful sacrifice gives meaningful change.',
    'Choices that betray companions or factions should not be labeled as such. The player should make the choice, then understand what they did.',
    'Never write a choice that is purely positive with no cost, or purely negative with no reason.',
  ],

  diceDesign: [
    'Dice checks are for moments where chance is narratively appropriate — not for every challenge.',
    'The failure path of a dice check should still be interesting, not just a penalty.',
    'Critical success should feel like luck that the player didn\'t earn. Critical failure should feel like the world reminding them it\'s still the world.',
    'Stat modifiers should make a meaningful difference — design DCs so a character with the relevant stat at 7 has a real advantage over one with it at 3.',
    'Luck rerolls are precious. Write the moment the player would use one as the kind of moment it would feel most meaningful in.',
  ],
};


// ══════════════════════════════════════════════════════════════════════════════
//  SECTION 18 — FACTION DESIGN RULES
// ══════════════════════════════════════════════════════════════════════════════

export const FACTION_DESIGN_RULES = {

  principle: `
    Every faction is right about something. Every faction is wrong about something.
    The player should be able to understand and even sympathise with each faction's
    position at the same time as they disagree with their methods.

    Faction conflict is not good vs. evil. It is incomplete information + real
    constraints + genuine fear + power dynamics. The player navigates that.
  `,

  rules: [
    'Faction members are individuals. Not every Saints soldier is Voss. Not every Choir member is the Voice.',
    'Faction reputation effects should be cumulative and visible — players should feel their choices building toward something.',
    'No faction should be universally correct. No faction should be a straw man.',
    'Faction endings are legitimate. Aligning with any faction should produce a meaningful outcome.',
    'Faction betrayal should feel like the player was a naive idealist who didn\'t understand the world — not like a narrative punishment.',
    'Inter-faction dynamics shift based on player actions. A player who makes Saints-Hollow peace possible changes how every subsequent Saints interaction feels.',
  ],

  repDesign: [
    'Faction rep ranges from -100 to +100. -100 is armed conflict. +100 is full alliance.',
    'Most players will end somewhere in the middle range with most factions.',
    'Choices that gain rep with one faction should often cost with another — faction alignment is a trade-off, not a checklist.',
    'Rep gates should be readable. A player should be able to understand why a choice requires 30 Saints rep before they need it.',
    'Maximum rep with a faction should unlock content that reveals their flaw as clearly as their strength.',
  ],
};


// ══════════════════════════════════════════════════════════════════════════════
//  SECTION 19 — COMPANION RELATIONSHIP RULES
// ══════════════════════════════════════════════════════════════════════════════

export const COMPANION_RELATIONSHIP_RULES = {

  principle: `
    Companion trust is earned by treating companions as people, not as resources.
    The game tracks this mechanically, but the player should feel it narratively.
    High trust is not loyalty purchased — it is a relationship built.
  `,

  trustScale: `
    Trust is measured 0–10.
      0:  The companion is present but wary.
      3:  Starting trust for a chosen companion.
      5:  Enough trust to share honest opinions and ask for help.
      7:  Enough trust to share something the companion has not told anyone else.
      9:  Enough trust for the companion to make an independent sacrifice.
     10:  The companion ending is available.

    Typical delta values:
      Small moment of honesty or care: +1
      Meaningful choice that respects the companion's stated values: +2
      Significant sacrifice or risk taken for the companion: +3
      Lie discovered / betrayal / using the companion as a resource: -1 to -3
  `,

  writingCompanions: [
    'Companions have opinions. Write them. They do not always agree with the player\'s choice.',
    'A companion\'s response to a choice should reflect their personality specifically, not a generic "companion approves" signal.',
    'Companion dialogue is sparse — they do not speak in every scene. When they do, it matters.',
    'Companions can be wrong. Mira\'s assessment of a situation is not always correct. Cain\'s instincts sometimes fail him. Write this.',
    'Never write a companion as fully dependent on the player. They had lives before the player arrived. Those lives matter to them.',
    'Companion deaths are permanent and should be treated as such narratively. No retroactive saves. No grief shortcut.',
  ],

  companionPresence: `
    Whether a companion is present at a scene changes the narration.
    A scene that would feel lonely without Mira should note her absence if
    she is not there. A scene that would feel safer with Cain's awareness
    should note that the player is watching their own back.

    Presence is not just mechanical (choice availability). It is atmospheric.
  `,
};
