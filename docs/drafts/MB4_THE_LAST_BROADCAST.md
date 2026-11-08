# Mid-Game Branch 4 — "The Last Broadcast"

- **Branch ID:** `mb4_the_last_broadcast`
- **Target Chapters:** Chapter 10 (`ch10_signal_ridge`) → Chapter 11 (`ch11_citadel_approach`)
- **Total Nodes:** 30 (`mb4_01` through `mb4_30`, including 3 terminal ending nodes)
- **New Scene `imageKey`s:** `mb4_signal_tower_roof`, `mb4_transmitter_booth`, `mb4_tower_balcony_dawn`
- **New Endings:**
  - `ending_mb4_every_radio_in_the_city` — **"Every Radio in the City"** (`secret`)
  - `ending_mb4_voice_of_the_crown` — **"The Voice of the Crown"** (`tyrant`)
  - `ending_mb4_off_the_air` — **"Off the Air"** (`companion`)
- **Persistent Flags Set:** `broadcast_truth_aired`, `broadcast_tower_seized`, `broadcast_silenced`, `mb4_completed`

---

## 1. Narrative Premise & Bible Alignment

High on the frozen ridge above Sector Ten stands the `old_signal_tower`—the municipal civil-defense mast that went silent seventeen seconds after the Vault breach. Tonight, its fifty-kilowatt mercury-arc rectifiers are glowing blue through the sleet.

Inside the sandbagged transmitter booth, a former Glass Court acoustic engineer named **Orin** has wired Director Kael's original Vault-breach wax cylinder onto the emergency band. Every crystal set, patrol handset, and Choir horn speaker in the metro is receiving the preliminary carrier tone. Below the tower stairs, both a Glass Court strike team and an Iron Saints mortar crew are setting up to bring the mast down before the cylinder plays.

### Story Bible Compliance Check
- **Zero prohibited words:** 0 occurrences of "alien" or "divine".
- **Physical & sensory grounding:** Ozone from mercury-arc tubes, ice rattling off guy-wires, warm wax cylinders, soldering irons, wind howling through lattice steel.
- **No moral signposting:** Airing the recording shatters the Glass Court's authority and triggers riots at the checkpoints; seizing the microphone turns the tower into an instrument of personal rule; cutting the power saves the people inside the booth and leaves the city to its quiet.

---

## 2. Node-by-Node Outline & Prose Specification

### Act I — Sleet on the Guy-Wires (`mb4_01` – `mb4_10`)

- **`mb4_01` — "Blue Mercury Light"** (`imageKey: 'old_signal_tower'`, Location: *Sector 10 Ridge — Civil Defense Mast*)
  - *Prose:* Sleet drives sideways across the concrete roof of the civil-defense annex. Above the ice-crusted lattice tower, the copper corona rings hiss with violet-blue static, smelling sharply of ozone and wet iron. Even the pocket crystal receiver on Cain's belt is humming without a battery.
  - *Choices:*
    - `mb4_01_door`: Pound three times on the steel shutter of the transmitter booth. → `mb4_02`
    - `mb4_01_parapet`: Look over the roof parapet toward the street below. → `mb4_03`

- **`mb4_02` — "Orin's Firing Slit"** (`imageKey: 'mb4_transmitter_booth'`)
  - *Prose:* An observation slot slides back an inch. Behind thick leaded glass, an old man in a singed Glass Court lab coat holds a flare pistol aimed at your collarbones. Behind him, two six-foot mercury-arc rectifier tubes pulse like blue heartbeats.
  - *Dialogue (Orin, Rogue Operator):* "If Sera sent you to smash the wax cylinder, save your boots. The turntable is wired to a dead-man capacitor. You shoot me, the needle drops anyway."
  - *Choices:*
    - `mb4_02_next`: Show him your marked wrist and tell him the strike teams are already on the stairs. → `mb4_04`

- **`mb4_03` — "Mortars in the Slush"** (`imageKey: 'mb4_signal_tower_roof'`)
  - *Prose:* Three stories below, Iron Saints engineers are bracing a Stokes mortar tube in the frozen slush while Glass Court sharpshooters take positions across the pharmacy roof. Neither side is firing at the other—both are aiming at the porcelain feed-insulators at the base of the antenna mast.
  - *Choices:*
    - `mb4_03_next`: Turn back to the transmitter booth door as the observation slot slides open. → `mb4_02`

- **`mb4_04` — "The Amber Cylinder"** (`imageKey: 'mb4_transmitter_booth'`, Location: *Transmitter Booth — Studio B*)
  - *Prose:* Orin unbolts the steel door and lets you in out of the sleet. The booth is stiflingly hot from the tube racks. On the central broadcast console sits a dictaphone lathe loaded with an amber wax cylinder labeled in Director Kael's handwriting: **VAULT EXTRACTION — MINUS 60 SECONDS TO PLUS 17.**
  - *Dialogue (Orin):* "Five years the Court told the city the Blackout was an unpreventable grid overload. And the Saints told them it was surface saboteurs. Listen to the groove. Kael knew the Vault would strip the city's transformers before he turned the key—he did it anyway to charge the Court's deep capacitors."
  - *Choices:*
    - `mb4_04_mira`: Look at Mira standing beside the warm tube rack. → `mb4_05`
    - `mb4_04_cain`: Ask Cain how long before the Saints' mortar crew ranges the roof. → `mb4_06`

- **`mb4_05` — "Mira Listens to the Scratch"** (`imageKey: 'mb4_transmitter_booth'`)
  - *Prose:* Orin lets the acoustic horn play three seconds of the cylinder into the booth before lifting the needle. Over the hiss of wax, a calm voice reads hospital grid load numbers and orders the medical sector breakers left coupled as ballast. Mira's hands close into fists against her coat.
  - *Dialogue (Mira):* "They used the hospital grid as a surge resistor. Four hundred patients on my ward didn't die from an accident—they were wired in as a fuse."
  - *Choices:*
    - `mb4_05_next`: Check the transmitter's warmup dial as the first rifle shot cracks outside. → `mb4_07`

- **`mb4_06` — "Cain Checks the Insulators"** (`imageKey: 'mb4_transmitter_booth'`)
  - *Prose:* Cain peers through the armored louver at the roof deck.
  - *Dialogue (Cain):* "Three minutes until the mortar baseplate settles in the ice. And if this cylinder goes out over the general band, every checkpoint from Sector One to the Warrens is going to tear itself apart before dawn."
  - *Choices:*
    - `mb4_06_next`: Check the transmitter's warmup dial as a bullet chips the porcelain insulator outside. → `mb4_07`

- **`mb4_07` — "Ninety Seconds to Full Plate Voltage"** (`imageKey: 'mb4_transmitter_booth'`)
  - *Prose:* The main plate voltmeter climbs past four thousand volts. On the stairwell below, boots clang against the iron landings—Glass Court breachers coming up the north stair, Saints engineers priming charges on the south roof.
  - *Choices:*
    - `mb4_07_defend`: Brace the stairwell doors and keep the antenna feed intact until the full cylinder broadcasts to the city. → `mb4_08`
    - `mb4_07_seize`: Lock Orin out of the booth, smash the wax cylinder, and take the live fifty-kilowatt microphone for yourself. → `mb4_14`
    - `mb4_07_rewrite`: Cut the Kael recording halfway through and splice in evacuation warnings and safe tunnel routes so the checkpoints don't riot. (`intelligence >= 12`) → `mb4_17`
    - `mb4_07_pull_plug`: Throw the main mercury-arc breaker and pull your companions onto the sheltered east balcony before the mortar shells land. → `mb4_20`

### Act II — Fifty Kilowatts on the Night Air (`mb4_08` – `mb4_22`)

- **`mb4_08` — "Holding the North Stair"** (`imageKey: 'mb4_signal_tower_roof'`)
  - *Prose:* You wedge a steel grounding rod under the north fire door just as a Glass Court breaching charge blisters the paint on the other side. Sleet stings your eyes as you step onto the icy roof walkway to clear the sharpshooters aiming at the feed-horn.
  - *Choices:*
    - `mb4_08_snipe`: Use the parapet ice-lip for cover and drive the sharpshooters back from the pharmacy roof. (Dice Check: `agility` DC 13) → Success: `mb4_09`, Failure: `mb4_10`
    - `mb4_08_shunt`: Clamp your marked wrist to the auxiliary grounding bus to absorb the overload when a rifle round shatters the primary insulator. (`corruption: +7`, `health: -10`) → `mb4_11`

- **`mb4_09` — "Clean Feed"** (`imageKey: 'mb4_signal_tower_roof'`)
  - *Prose:* Two well-placed shots into the pharmacy parapet searchlight drop the street into shadow. Inside the booth, Orin drops the sapphire needle onto the spinning amber wax. Above your head, the copper mast sings out across ten miles of frozen roofs and forty miles of underground rail.
  - *Choices:*
    - `mb4_09_next`: Step back into the booth as Kael's voice echoes up from the street below. → `mb4_12`

- **`mb4_10` — "Porcelain Shards"** (`imageKey: 'mb4_signal_tower_roof'`)
  - *Prose:* A heavy round shatters the left feed-insulator, spraying glazed porcelain across your cheek (`health: -14`). The copper lead whips loose in the wind, arcing blue lightning against the wet roof. You grab the insulated tongs and clamp the live lead directly to the steel handrail to keep the carrier on the air.
  - *Choices:*
    - `mb4_10_next`: Hold the tongs steady while the wax cylinder turns inside. → `mb4_12`

- **`mb4_11` — "Living Ballast"** (`imageKey: 'mb4_signal_tower_roof'`)
  - *Prose:* Fifty kilowatts of carrier hum brushes the edge of your nervous system as the mark on your wrist bridges the cracked insulator gap. The sleet hitting your coat vaporizes into steam. Through the hum, you hear Kael's recorded voice vibrating in your own teeth as it goes out to every speaker in the metro.
  - *Choices:*
    - `mb4_11_next`: Release the bus bar as the cylinder reaches its final groove. → `mb4_12`

- **`mb4_12` — "Seventeen Seconds on Every Horn"** (`imageKey: 'mb4_transmitter_booth'`)
  - *Prose:* Down on the street, the mortar crew stops loading. The Glass Court sharpshooters lower their rifles. From the open stairwell, from the patrol radios on the street, and from the distant ventilation grates of Sector Ten, Director Kael's voice plays in crystal clarity—followed by the seventeen-second countdown and the sound of the hospital breakers fusing shut.
  - *Effects:* `setFlags: ['broadcast_truth_aired']`, `hollowChildren: +20`, `lastArchive: +15`, `glassCourt: -30`, `ironSaints: -15`, `mira trust: +2`, `cain trust: +1`.
  - *Choices:*
    - `mb4_12_slip_away`: Descend the rear fire escape while the strike teams argue in the street below. → `mb4_23`
    - `mb4_12_keep_spinning`: Lock the booth doors from within, wire the cylinder to repeat on an endless loop, and stay with Orin until the batteries burn dry. → `mb4_28`

- **`mb4_13` — "Reserved Transition"** (`imageKey: 'mb4_transmitter_booth'`)
  - *Prose:* The last groove of the wax cylinder clicks against the sapphire stop. → `mb4_23`

- **`mb4_14` — "Crushing the Wax"** (`imageKey: 'mb4_transmitter_booth'`)
  - *Prose:* You sweep Kael's amber cylinder off the lathe; it shatters into twenty brittle orange shards across the concrete floor. Before Orin can reach his flare pistol, you shove him into the battery closet, shoot the iron bolt, and pull the heavy chrome broadcast microphone toward your mouth.
  - *Choices:*
    - `mb4_14_speak`: Key the fifty-kilowatt carrier and speak to the city in your own voice. (Dice Check: `charisma` DC 13) → Success: `mb4_15`, Failure: `mb4_16`

- **`mb4_15` — "One Voice on the Band"** (`imageKey: 'mb4_transmitter_booth'`)
  - *Prose:* Your voice rolls out from the copper mast, louder than the Red Choir's horns and clearer than Commander Varr's dispatch riders. You read the coordinates of the Mortar Crew on the south street and the Court squad on the north stair—telling them that anyone who fires on the tower loses their sector's water pressure at dawn. Down in the slush, the mortar tube is quietly lowered to the pavement.
  - *Effects:* `setFlags: ['broadcast_tower_seized']`, `ironSaints: +10`, `glassCourt: +10`, `mira trust: -2`, `cain trust: +1`.
  - *Choices:*
    - `mb4_15_return`: Leave a trusted guard on the transmitter key and descend to the citadel road. → `mb4_24`
    - `mb4_15_throne`: Bolt the studio doors, wire the city's checkpoint relays into the master console, and rule the sectors from the microphone booth. → `mb4_29`

- **`mb4_16` — "Iron in the Throat"** (`imageKey: 'mb4_transmitter_booth'`)
  - *Prose:* When the strike teams hear your ultimatum over their field sets, the north stair team hesitates, then backs down one landing. You key the mark's sub-harmonic into the carrier (`corruption: +6`) until every listener within three miles feels the weight of the signal behind their breastbone.
  - *Effects:* `setFlags: ['broadcast_tower_seized']`, `mira trust: -2`.
  - *Choices:*
    - `mb4_16_return`: Step away from the console and return to the citadel approach. → `mb4_24`
    - `mb4_16_throne`: Keep your hand on the gain wheel and make the tower your permanent seat. → `mb4_29`

- **`mb4_17` — "The Splicing Block"** (`imageKey: 'mb4_transmitter_booth'`)
  - *Prose:* With a razor blade and splicing tape, you cut the panic-inducing troop deployment codes out of Kael's transcript while keeping the hospital surge logs intact—then take the microphone for the final thirty seconds to read out the safe culvert bypasses around the checkpoint cordons.
  - *Dialogue (Mira):* "They'll know what the Court did, and they'll know which tunnels are safe before the Saints lock the gates."
  - *Effects:* `setFlags: ['broadcast_truth_aired']`, `hollowChildren: +15`, `lastArchive: +15`, `glassCourt: -20`, `mira trust: +2`, `cain trust: +2`.
  - *Choices:*
    - `mb4_17_next`: Pull the main breaker as the spliced message finishes and slip down the cable shaft. → `mb4_23`

- **`mb4_18` — "Reserved Node — Roof Ice"** (`imageKey: 'mb4_signal_tower_roof'`)
  - *Prose:* Ice breaks loose from the upper cross-arm and crashes onto the parapet as you clear the doorway. → `mb4_23`

- **`mb4_19` — "Reserved Node — Stairwell Echo"** (`imageKey: 'mb4_transmitter_booth'`)
  - *Prose:* In the stairwell below, a corporal drops his radio handset on the iron steps, the tinny speaker still repeating the last sentence of the broadcast. → `mb4_23`

- **`mb4_20` — "Killing the Mercury Arc"** (`imageKey: 'mb4_transmitter_booth'`)
  - *Prose:* You wrap your sleeve around the insulated wooden handle of the master knife-switch and pull it down hard. The two six-foot mercury-arc tubes die from blinding blue to dark glass with a sound like a plucked cello string. Outside, the corona hiss vanishes into the sound of ordinary sleet.
  - *Dialogue (Orin):* "Five years I carried that cylinder in a wool sock. And you pull the switch with ten seconds on the dial."
  - *Choices:*
    - `mb4_20_explain`: Tell Orin that a city tearing itself apart in the dark won't bring the hospital ward back, and hand him his coat. (`setFlags: ['broadcast_silenced']`) → `mb4_21`

- **`mb4_21` — "The East Balcony"** (`imageKey: 'mb4_tower_balcony_dawn'`, Location: *Signal Tower — Sheltered East Balcony*)
  - *Prose:* Seeing the mast go dark and the carrier tone drop off their sets, both strike teams hold their fire and withdraw down the ridge out of the sleet. You step out onto the covered concrete balcony on the leeward side of the tower, where the wind can't reach.
  - *Choices:*
    - `mb4_21_companion`: Sit on the cable spool beside your closest companion and share a tin of hot tea brewed over the tube rack's residual heat. → `mb4_22`

- **`mb4_22` — "Residual Heat"** (`imageKey: 'mb4_tower_balcony_dawn'`)
  - *Prose:* The cast-iron transformer casing stays warm for hours after the power dies. Mira (or Cain, if closer) leans a shoulder against yours, watching the first grey line of dawn touch the clouds above the dead river. No radios are screaming in the tunnels below.
  - *Dialogue (Mira):* "Sometimes I think the only thing keeping anyone alive down there is that we don't have to know everything all at once."
  - *Effects:* `setFlags: ['broadcast_silenced']`, `morale: +10`, `mira trust: +2`, `cain trust: +2`.
  - *Choices:*
    - `mb4_22_return`: Pack the intact wax cylinder in your rucksack and head down toward Chapter 11. → `mb4_25`
    - `mb4_22_stay`: Bar the tower door from the inside, hang a blanket over the booth window, and stay up here above the ash with the person beside you. → `mb4_30`

### Act III — Return to the Ridge & Branch Endings (`mb4_23` – `mb4_30`)

- **`mb4_23` — "Echoes in the Vents"** (`imageKey: 'old_signal_tower'`)
  - *Prose:* As you descend the ridge path toward the Sector Eleven approach, every ventilation grate you pass carries the sound of voices arguing in the stations below. Glass Court posters are already being torn off the wet brick walls.
  - *Choices:*
    - `mb4_23_done`: Continue into Chapter 11 as the city absorbs the broadcast. (`setFlags: ['mb4_completed']`) → `ch11_opening`

- **`mb4_24` — "The Carrier Holds"** (`imageKey: 'old_signal_tower'`)
  - *Prose:*Behind you on the ridge, the blue mercury light still shines through the sleet—a private beacon tuned to your command frequency. Patrols along the ridge step aside without asking for your papers.
  - *Choices:*
    - `mb4_24_done`: March down the ridge road toward Chapter 11. (`setFlags: ['mb4_completed']`) → `ch11_opening`

- **`mb4_25` — "Quiet on the Band"** (`imageKey: 'old_signal_tower'`)
  - *Prose:* You walk down the frozen switchbacks with Kael's unplayed wax cylinder wrapped in wool inside your pack. Only the people who were in that booth know what is etched in its grooves.
  - *Choices:*
    - `mb4_25_done`: Rejoin the main trail toward Chapter 11. (`setFlags: ['mb4_completed']`) → `ch11_opening`

- **`mb4_26` — "Reserved Node — Static Fade"** (`imageKey: 'old_signal_tower'`)
  - *Prose:* The last static charge bleeds off the guy-wires into the wet snow. → `mb4_25`

- **`mb4_27` — "Reserved Node — Dawn Sleet"** (`imageKey: 'mb4_tower_balcony_dawn'`)
  - *Prose:* Morning light turns the sleet on the iron railings to clear glass. → `mb4_25`

- **`mb4_28` — ENDING: "Every Radio in the City"** (`isEnding: true`, `endingId: 'ending_mb4_every_radio_in_the_city'`, `endingType: 'secret'`, `imageKey: 'mb4_transmitter_booth'`)
  - *Prose:* By noon, the wax cylinder has worn so thin from repeating that Director Kael's voice sounds like dry sleet on tin—yet nobody in the metro turns their receiver off. Down at the checkpoints, Iron Saints corporals unbolt the turnstiles and walk away from their posts; in the Glass Court terraces, clerks burn their ledgers in oil drums. Up in Studio B, you and Orin watch the mercury tubes cool to silver as a city without lies tries to figure out how to survive the afternoon.

- **`mb4_29` — ENDING: "The Voice of the Crown"** (`isEnding: true`, `endingId: 'ending_mb4_voice_of_the_crown'`, `endingType: 'tyrant'`, `imageKey: 'mb4_signal_tower_roof'`)
  - *Prose:* You never have to go back down into the wet tunnels again. Every evening at six, the fifty-kilowatt rectifiers warm to blue, and eighty thousand people stop beside the wall speakers with their spoons halfway to their mouths to hear which sectors have earned water pressure for the night and which have not. Your voice is calm, even, and measured—and nobody in the city is allowed to own a pair of wire-cutters.

- **`mb4_30` — ENDING: "Off the Air"** (`isEnding: true`, `endingId: 'ending_mb4_off_the_air'`, `endingType: 'companion'`, `imageKey: 'mb4_tower_balcony_dawn'`)
  - *Prose:* The transmitter booth makes a dry, warm room once you seal the cable ports against the wind. You use the copper antenna wire to snare pigeons on the lower cross-arms and collect clean rainwater in the glass battery jars on the east balcony. Below the ridge, the factions march and counter-march through the dark, wondering why the tower never came back on the air—while sixty feet above the sleet, two people sit by a coal brazier listening to nothing louder than the kettle coming to a boil.
