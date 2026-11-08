# Mid-Game Branch 1 — "The Census of Small Names"

- **Branch ID:** `mb1_census_of_small_names`
- **Target Chapters:** Chapter 3 (`ch3_warrens_gate` / `ch3_hollow_market`) → Chapter 4 (`ch4_checkpoint_east`)
- **Total Nodes:** 30 (`mb1_01` through `mb1_30`, including 2 terminal ending nodes)
- **New Scene `imageKey`s:** `mb1_chalk_pillar`, `mb1_saints_sweep`, `mb1_aqueduct_climb`
- **New Endings:**
  - `ending_mb1_chalk_and_ash` — **"Chalk and Ash"** (`sacrifice`)
  - `ending_mb1_price_of_a_name` — **"The Price of a Name"** (`betrayal`)
- **Persistent Flags Set:** `census_kept`, `census_sold`, `census_carried_surface`, `mb1_completed`

---

## 1. Narrative Premise & Bible Alignment

Deep beneath the Warrens, where the concrete load-pillars sweat rust and limewater, the Hollow Children keep a tally they call the **Small Names**. Every child who vanished during the first winter after the Blackout—or who slipped past an Iron Saints ration cordon and never came back—has their name, height in hand-spans, and last known tunnel stamped in yellow carpenter's chalk across three support columns and a stitched oilcloth ledger.

An Iron Saints requisition squad under Sergeant Krell wants the oilcloth copy. Not to memorialize the dead, Krell says, but to cross-reference living runaways hiding on forged ration tags in Sector Four. Mael's older runners say the ledger is the only proof those children ever existed.

### Story Bible Compliance Check
- **Zero prohibited words:** 0 occurrences of "alien" or "divine".
- **Second-person present tense:** Strictly maintained across all 30 nodes.
- **Sensory precision:** Damp lime dust, tallow smoke, wet wool, rusted rebar, chalk under fingernails.
- **No moral signposting:** Selling the list buys clean antibiotics and keeps Krell's rifles out of the lower nursery; protecting it costs blood or forces an evacuation through the flooded storm drains.

---

## 2. Node-by-Node Outline & Prose Specification

### Act I — The Pillar of Yellow Chalk (`mb1_01` – `mb1_10`)

- **`mb1_01` — "Three Columns of Yellow Chalk"** (`imageKey: 'mb1_chalk_pillar'`, Location: *Lower Warrens — Pillar 14*)
  - *Prose:* The air down by Pillar 14 smells of wet lime and boiled cabbage. Three octagonal concrete columns hold up the cracked station box above. Every flat face is covered in cramped yellow chalk—names arranged by tunnel number, with two fingers' width of tally marks beside each one. A girl no older than twelve stands on an overturned ammunition crate, rubbing tallow over the lowest names so the condensation won't wash them off.
  - *Dialogue (Talla, Runner for the Hollow Children):* "Don't lean on the south face. The grease isn't dry on the Sector Six names."
  - *Choices:*
    - `mb1_01_read`: Step closer and read the names near the bottom. → `mb1_02`
    - `mb1_01_talla`: Ask why she's sealing chalk with rendered fat instead of writing it on paper. → `mb1_03`

- **`mb1_02` — "Measured in Hand-Spans"** (`imageKey: 'mb1_chalk_pillar'`)
  - *Prose:* Paper rots in the lower sumps, or gets burned for kindling when the vents freeze. Here, each line records a first name, a mark for height measured against the rebar ribs, and the last station where someone saw their boots. Beside you, Mira touches the edge of a column without letting her fingertips smudge the yellow dust.
  - *Dialogue (Mira):* "I treated three of the names on the third row during the second winter. I didn't know anyone kept count after the clinic flooded."
  - *Choices:*
    - `mb1_02_next`: Ask Talla where the oilcloth master copy is kept. → `mb1_04`

- **`mb1_03` — "What Paper Costs"** (`imageKey: 'mb1_chalk_pillar'`)
  - *Prose:* Talla scrapes a lump of grey mutton tallow across the concrete with a flattened spoon. Her knuckles are split from cold water.
  - *Dialogue (Talla):* "We have one oilcloth roll. Stitched from three stretcher covers. Mael keeps it in the dry pipe behind the cistern. The chalk is so people walking through have to look at it."
  - *Choices:*
    - `mb1_03_next`: Look toward the iron turnstiles as boots echo down the stair. → `mb1_04`

- **`mb1_04` — "Whistles at the Turnstile"** (`imageKey: 'mb1_saints_sweep'`)
  - *Prose:* Two short blasts of a brass whistle cut through the drip of the cistern. Above the broken escalators, lantern beams sweep in disciplined arcs—white carbide light, not the orange tallow lamps of the Warrens. Iron Saints patrolmen in oiled canvas coats step onto the landing, rifle butts knocking against the tile.
  - *Dialogue (Mael):* "Back pipe. Now. Talla, take the crate."
  - *Choices:*
    - `mb1_04_stand`: Stand between the turnstiles and Pillar 14 with your hands visible. → `mb1_05`
    - `mb1_04_hide`: Slip into the dry maintenance pipe with Mael and the oilcloth roll. (`agility >= 11`) → `mb1_06`

- **`mb1_05` — "Sergeant Krell's Offer"** (`imageKey: 'mb1_saints_sweep'`)
  - *Prose:* The sergeant at the front has a ledger of his own—stamped tin covers chained to his belt. He stops two paces from the chalk pillar, shining his carbide lamp across the names before lowering the beam to your chest.
  - *Dialogue (Sergeant Krell):* "Fourteen juveniles drawing double rations under dead names in Sector Four. Commander Varr doesn't want a firefight in a nursery. He wants the oilcloth roll Mael's runners carry. Bring it to the east grate before shift change, and I leave two crates of sulfur tablets and forty tins of lard on the stairs."
  - *Choices:*
    - `mb1_05_listen`: Tell Krell you'll hear Mael out before anyone bleeds on the stairs. → `mb1_07`
    - `mb1_05_refuse`: Tell him the chalk is all he's getting and he can copy it himself. (`strength >= 12`, `ironSaints: -10`, `hollowChildren: +10`) → `mb1_08`

- **`mb1_06` — "Inside the Dry Pipe"** (`imageKey: 'mb1_chalk_pillar'`)
  - *Prose:* The cast-iron pipe smells of old rust and dry straw. Through the inspection slit, you watch Sergeant Krell's patrol halt beside the pillar. Krell doesn't order his soldiers to scrub the chalk; he leaves a chalked notice of his own on the turnstile—an offer of sulfur medicine and canned fat in exchange for the stitched oilcloth roll.
  - *Choices:*
    - `mb1_06_next`: Crawl deeper into the pipe where Mael is unrolling the oilcloth. → `mb1_07`

- **`mb1_07` — "Four Hundred and Twelve"** (`imageKey: 'mb1_chalk_pillar'`)
  - *Prose:* Mael spreads the stitched stretcher canvas across his knees. Four hundred and twelve names are inked in lampblack and axle grease. Half have a small circle beside them—alive, hidden under dead workers' brass tags in the upper sectors.
  - *Dialogue (Mael):* "If Krell gets this cloth, forty kids lose their ration tags by tomorrow morning. If he doesn't get something, he brings welding torches down here at midnight and seals the lower grates."
  - *Choices:*
    - `mb1_07_cain`: Look at Cain leaning against the pipe wall. → `mb1_09`
    - `mb1_07_mira`: Ask Mira how many of the sick down here need Krell's sulfur tablets. → `mb1_10`

- **`mb1_08` — "Rifle Butts on Tile"** (`imageKey: 'mb1_saints_sweep'`)
  - *Prose:* Krell studies your stance, then taps two fingers against his tin clipboard. "Midnight," he says. "Either the oilcloth comes up to the east grate, or we weld the grate shut and let the sump rise." His squad backs up the stairs without turning their backs.
  - *Choices:*
    - `mb1_08_next`: Join Mael and the others behind the cistern. → `mb1_09`

- **`mb1_09` — "Cain's Arithmetic"** (`imageKey: 'mb1_chalk_pillar'`)
  - *Prose:* Cain thumbs the rivet on his coat cuff, eyes fixed on the stenciled serial numbers along the stretcher cloth.
  - *Dialogue (Cain):* "Krell was third company under Varr. He won't shoot first if he thinks he can close a file with ink. Give him a forged cloth, or give him the real one, or move the kids now. Waiting till midnight just gives his welders time to haul their tanks."
  - *Choices:*
    - `mb1_09_next`: Weigh the three options with Mira and Mael. → `mb1_11`

- **`mb1_10` — "Mira's Count"** (`imageKey: 'mb1_chalk_pillar'`)
  - *Prose:* Mira's fingers rest on her canvas satchel, which is half-empty.
  - *Dialogue (Mira):* "Six kids in the sump annex have grey-cough. Sulfur tablets would clear their lungs in four days. Without them, at least two won't see the end of the month. Make sure whatever you do with that cloth, you can look at both rooms afterward."
  - *Choices:*
    - `mb1_10_next`: Decide how to handle the oilcloth census before midnight. → `mb1_11`

### Act II — Three Ways Through the Grate (`mb1_11` – `mb1_22`)

- **`mb1_11` — "The Oilcloth Decision"** (`imageKey: 'mb1_chalk_pillar'`)
  - *Prose:* The oilcloth roll weighs less than two pounds. Lampblack ink stains the creases. Above the ceiling slab, the generator hum of the east checkpoint vibrates through the lime dust.
  - *Choices:*
    - `mb1_11_protect`: Keep the real census and lead the children through the flooded storm drain before Krell's welders arrive. → `mb1_12`
    - `mb1_11_forge`: Forge a second stretcher cloth with dead pre-Blackout names to buy Krell's medicine. (`intelligence >= 12`, Dice Check: `intelligence` DC 13) → Success: `mb1_15`, Failure: `mb1_16`
    - `mb1_11_surface`: Strap the oilcloth to your pack and climb the old ventilation shaft to the Archive relay on the surface. → `mb1_17`
    - `mb1_11_sell`: Take the oilcloth roll up to Sergeant Krell at the east grate and claim the medicine crates. → `mb1_21`

- **`mb1_12` — "Cold Water Up to the Chest"** (`imageKey: 'mb1_saints_sweep'`)
  - *Prose:* Thirty-two children move single-file into the overflow culvert. Nobody cries; the older ones carry the toddlers in canvas coal slings. The water smells of iron filings and dead roots. Halfway to the junction, carbide searchlights spear through the overhead storm grates.
  - *Choices:*
    - `mb1_12_hold_tunnel`: Unclip a flare and draw Krell's squad down the dry service gallery while Mael gets the line through. → `mb1_13`
    - `mb1_12_slip_past`: Extinguish every lamp and guide the line under the rusted weir by touch. (Dice Check: `agility` DC 12) → Success: `mb1_14`, Failure: `mb1_13`

- **`mb1_13` — "The Dry Gallery Stand"** (`imageKey: 'mb1_saints_sweep'`)
  - *Prose:* Your magnesium flare hisses white against the wet brick. Boots thunder toward your gallery, away from the culvert weir. Krell's point man fires a warning round that chips brick into your cheek (`health: -12`). Behind you, the iron sluice wheel turns twice and locks from the far side—Mael and the children are through.
  - *Choices:*
    - `mb1_13_break_contact`: Dive through the coal chute before the squad closes both ends of the gallery. → `mb1_23`
    - `mb1_13_stay_gate`: Jam your crowbar into the gear housing and hold the gallery until the last runner clears the outer siphon. (`census_kept`, leads toward Sacrifice ending) → `mb1_27`

- **`mb1_14` — "Under the Weir"** (`imageKey: 'mb1_chalk_pillar'`)
  - *Prose:* Four inches of breathing room remain between the black water and the concrete lip of the weir. You pass each child's hand to Cain on the far side. Above the grate, Krell's boots pause, then march past toward the dry station. Not a single ration tag is lost.
  - *Effects:* `setFlags: ['census_kept']`, `hollowChildren: +15`, `mira trust: +1`, `cain trust: +1`. → `mb1_23`

- **`mb1_15` — "Lampblack and Mutton Fat"** (`imageKey: 'mb1_chalk_pillar'`)
  - *Prose:* Working by a single hooded wick, you and Talla copy four hundred names from an old municipal burial register onto a spare stretcher canvas, rubbing axle grease into the seams so it smells of the lower sumps. When Krell inspects it under his carbide lamp at the east grate, he checks three serial numbers against his tin clipboard and nods once.
  - *Dialogue (Sergeant Krell):* "Tell Mael the grates stay unlocked. Take your crates."
  - *Effects:* `setFlags: ['census_kept']`, `medicine: +2`, `food: +2`, `hollowChildren: +10`, `ironSaints: +5`, `mira trust: +2`. → `mb1_24`

- **`mb1_16` — "Fresh Ink on Old Cloth"** (`imageKey: 'mb1_saints_sweep'`)
  - *Prose:* Krell rubs his thumb across the third column of the forged canvas. Black soot smears across his calloused skin—the tallow hadn't set in the cold air. His jaw tightens.
  - *Dialogue (Sergeant Krell):* "Fresh lampblack. You think I haven't smelled sump grease for five years? Squad—drop the gate."
  - *Choices:*
    - `mb1_16_fight`: Kick the medicine crate into the lantern bearer and fight your way back down the stairs. (`health: -15`, `medicine: +1`, `setFlags: ['census_kept']`) → `mb1_23`
    - `mb1_16_surrender_real`: Hand over the real oilcloth from inside your coat before his rifles level. (`setFlags: ['census_sold']`) → `mb1_21`

- **`mb1_17` — "The Shaft Ladder"** (`imageKey: 'mb1_aqueduct_climb'`)
  - *Prose:* The iron rungs inside Vent Shaft 9 are furred with frost and pigeon bone. Talla climbs ten feet below you, the oilcloth cylinder strapped diagonally across her narrow shoulders.
  - *Choices:*
    - `mb1_17_next`: Push open the louvered storm damper onto the surface. → `mb1_18`

- **`mb1_18` — "Above the Collapsed Station"** (`imageKey: 'mb1_aqueduct_climb'`, Location: *Surface — Old Aqueduct Ridge*)
  - *Prose:* Wind off the dead river hits your face like crushed glass. Below the broken viaduct, the city is a grid of black roofs and drifted ash. Only the Last Archive's watchtower three blocks north shows a pinpoint of amber light behind shuttered glass.
  - *Dialogue (Mira):* "If the Archive logs those names into the permanent stone index, even the Saints won't dare erase their tags."
  - *Choices:*
    - `mb1_18_archive`: Cross the exposed viaduct to deliver the census to the Archive's night clerk. → `mb1_19`
    - `mb1_18_keep`: Copy the names into the Archive's register and return the original cloth to Mael. → `mb1_20`

- **`mb1_19` — "The Stone Index"** (`imageKey: 'mb1_aqueduct_climb'`)
  - *Prose:* The Archive clerk receives the oilcloth through a brass revolving drum without asking your name. He stamps a lead receipt token with the Archive seal: four hundred and twelve entries, verified under the Compact Registry law that even Commander Varr still recognizes on paper.
  - *Effects:* `setFlags: ['census_kept', 'census_carried_surface']`, `lastArchive: +15`, `hollowChildren: +10`, `mira trust: +1`. → `mb1_25`

- **`mb1_20` — "Two Copies in the Dark"** (`imageKey: 'mb1_aqueduct_climb'`)
  - *Prose:* By dawn, the names exist in two places: scratched onto the Archive's slate plates above ground, and carried back down Shaft 9 in Talla's oilcloth roll. Your hands are raw from the frozen rungs, and the mark on your wrist pulses dull violet against the cold iron.
  - *Effects:* `setFlags: ['census_kept', 'census_carried_surface']`, `lastArchive: +10`, `hollowChildren: +15`, `cain trust: +1`, `mira trust: +1`. → `mb1_25`

- **`mb1_21` — "Thirty Tins and Two Crates"** (`imageKey: 'mb1_saints_sweep'`)
  - *Prose:* Sergeant Krell unrolls the oilcloth across an ammunition box under the east grate. He runs a scarred finger down the circled names, then signals his corporal. Two wooden crates stamped with the red cross of the old municipal hospital are slid across the tile to your boots.
  - *Dialogue (Sergeant Krell):* "Fair weight. We'll pull the Sector Four runaways off the line quietly at shift change. No shots fired."
  - *Effects:* `setFlags: ['census_sold']`, `medicine: +3`, `food: +3`, `ironSaints: +15`, `hollowChildren: -25`, `mira trust: -2`, `cain trust: -1`.
  - *Choices:*
    - `mb1_21_return`: Carry the medicine crates back down to the Warrens clinic. → `mb1_22`
    - `mb1_21_walk_away`: Take Krell's safe-conduct pass and walk through the Saints' cordon without looking back down the stairs. → `mb1_28`

- **`mb1_22` — "The Empty Pillar"** (`imageKey: 'mb1_chalk_pillar'`)
  - *Prose:* When you carry the sulfur crates past Pillar 14, Talla's ammunition crate is gone. Someone has taken a wet rag and wiped the lower half of the concrete clean so the Saints won't know which tunnels the remaining children use. Mira takes the medicine from your hands without meeting your eyes.
  - *Dialogue (Mira):* "It'll save the six in the sump annex. Don't ask me to thank you for how we bought it."
  - *Choices:*
    - `mb1_22_next`: Continue toward the east checkpoint as the Warrens shutters close behind you. → `mb1_26`

### Act III — Resolution & Endings (`mb1_23` – `mb1_30`)

- **`mb1_23` — "The New Chalk Line"** (`imageKey: 'mb1_chalk_pillar'`)
  - *Prose:* In the dry cistern annex half a mile south, Talla unpacks a fresh piece of yellow carpenter's chalk from her pocket and draws a single vertical line on the brick wall. One column started. Four hundred and twelve names intact.
  - *Choices:*
    - `mb1_23_done`: Pack your gear and rejoin the main tunnel toward Sector Four. (`setFlags: ['mb1_completed']`) → `ch4_opening`

- **`mb1_24` — "Sulfur and Tallow"** (`imageKey: 'mb1_chalk_pillar'`)
  - *Prose:* In the annex clinic, Mira crushes the first sulfur tablet into boiled water for a boy whose breathing sounds like dry leaves. Across the room, Cain watches Krell's patrol march past the upper grate with the forged stretcher cloth tucked under the sergeant's arm.
  - *Dialogue (Cain):* "He'll figure it out in three weeks when none of the brass tags match. By then those kids will be three sectors away."
  - *Choices:*
    - `mb1_24_done`: Move out toward the Sector Four checkpoint before the shift changes. (`setFlags: ['mb1_completed']`) → `ch4_opening`

- **`mb1_25` — "Stamped in Lead"** (`imageKey: 'mb1_aqueduct_climb'`)
  - *Prose:* When you show Sergeant Krell the lead Archive registry token at the east grate, his mouth flattens into a thin line. Compact Registry property cannot be requisitioned without a Marshal's warrant. He waves his welders back up the stairs.
  - *Choices:*
    - `mb1_25_done`: Pass through the east grate into Sector Four. (`setFlags: ['mb1_completed']`) → `ch4_opening`

- **`mb1_26` — "Ration Tags in the Gutter"** (`imageKey: 'mb1_saints_sweep'`)
  - *Prose:* At dawn near the Sector Four turnstiles, you pass a wire basket outside the guardhouse filled with confiscated children's ration tags—small circles of stamped tin on knotted twine. Your pack is heavy with food and sulfur tablets. Nobody in the line speaks to you.
  - *Choices:*
    - `mb1_26_continue`: Keep walking into the checkpoint corridor. (`setFlags: ['mb1_completed']`) → `ch4_opening`
    - `mb1_26_stay_saints`: Accept Krell's permanent informant billet in the Ration Registry office and leave the tunnels behind. → `mb1_28`

- **`mb1_27` — "Sparks on the Sluice Wheel"** (`imageKey: 'mb1_saints_sweep'`)
  - *Prose:* You wedge the iron bar deeper into the worm gear as Krell's breachers fire twice down the brick gallery. One round punches through your shoulder; the second sparks off the cast-iron wheel, fusing the teeth in place. Behind the bulkhead, the rushing water goes quiet as the last child clears the siphon ladder.
  - *Choices:*
    - `mb1_27_end`: Lean your back against the warm iron bulkhead and listen to the carbide lamps approach. → `mb1_29`

- **`mb1_28` — "A Desk Above the Grate"** (`imageKey: 'mb1_saints_sweep'`)
  - *Prose:* They give you a dry room two floors above the station, a tin lamp with clean kerosene, and a ledger bound in grey cloth. Every Tuesday, patrolmen bring up confiscated brass tags from the lower vents for you to cross off.
  - *Choices:*
    - `mb1_28_end`: Open the grey ledger to the first page. → `mb1_30`

- **`mb1_29` — ENDING: "Chalk and Ash"** (`isEnding: true`, `endingId: 'ending_mb1_chalk_and_ash'`, `endingType: 'sacrifice'`, `imageKey: 'mb1_chalk_pillar'`)
  - *Prose:* When Sergeant Krell's torches finally cut through the jammed sluice wheel, the culvert beyond is empty—nothing left on the wet brick but a smear of yellow carpenter's chalk where Talla's shoulder brushed the wall. You sit against the gear housing with the empty flare casing cooling beside your boot. Two days later, in a dry pipe under Sector Seven, a twelve-year-old girl stands on an ammunition crate and writes a four-hundred-and-thirteenth name at the top of the column.

- **`mb1_30` — ENDING: "The Price of a Name"** (`isEnding: true`, `endingId: 'ending_mb1_price_of_a_name'`, `endingType: 'betrayal'`, `imageKey: 'mb1_saints_sweep'`)
  - *Prose:* You never go hungry that winter. Your stove has coal, your coat has dry wool, and your ration book carries Commander Varr's counter-signature in red ink. Only in the mornings, when the damp comes up through the floor vents, do you notice the yellow dust under your fingernails—chalk that won't wash out no matter how many times you scrub your hands in clean water.
