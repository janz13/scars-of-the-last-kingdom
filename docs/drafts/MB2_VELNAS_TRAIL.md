# Mid-Game Branch 2 — "Velna's Trail"

- **Branch ID:** `mb2_velnas_trail`
- **Target Chapters:** Chapter 6 (`ch6_red_choir_broadcast` / `ch6_relay_annex`) → Chapter 7 (`ch7_deep_tunnels`)
- **Total Nodes:** 35 (`mb2_01` through `mb2_35`, including 2 terminal ending nodes)
- **New Scene `imageKey`s:** `mb2_subcarrier_console`, `mb2_velna_survey_camp`, `mb2_old_aqueduct_exit`
- **New Endings:**
  - `ending_mb2_static_hymn` — **"Static Hymn"** (`corruption`)
  - `ending_mb2_left_the_light_on` — **"Left the Light On"** (`wanderer`)
- **Persistent Flags Set:** `velna_coordinates` (**Unlocks Epilogue: "The Response"**), `velna_journal_read`, `mb2_completed`

---

## 1. Narrative Premise & Bible Alignment

While passing through a Red Choir repeater station between Sectors Six and Seven, the mark on your left wrist begins to beat out of rhythm—not with the Choir's liturgical broadcast, but with a narrow-band carrier wave hidden 40 kilohertz below their hymn.

Decoding the subcarrier reveals a human voice reading depth measurements, rock densities, and date stamps from three years ago: **Velna**, the Last Archive's senior signal surveyor who vanished during the second post-Blackout expedition. Following her wired repeaters down an unmapped drainage drift leads to her abandoned intermediate survey camp—and the brass transit cylinder containing the **exact coordinates of the secondary Archive descent (`velna_coordinates`)**.

### Story Bible Compliance Check
- **Zero prohibited words:** 0 occurrences of "alien" or "divine".
- **Corruption without judgment:** The `ending_mb2_static_hymn` ending treats Corruption as a perceptual shift and transformation, written with physical calm and zero moralizing.
- **Tactile grounding:** Bakelite dials, copper field wire, vacuum tubes warming in damp air, pencil lead on waterproof vellum.

---

## 2. Node-by-Node Outline & Prose Specification

### Act I — The Voice Under the Hymn (`mb2_01` – `mb2_12`)

- **`mb2_01` — "Forty Kilohertz Below"** (`imageKey: 'mb2_subcarrier_console'`, Location: *Sector 6 — Repeater Gallery*)
  - *Prose:* The Red Choir's horn speakers mounted along the tunnel arch hum with a slow, three-note chord before the evening liturgy begins. Five paces from the junction box, the sigil on your left wrist tightens—not a burn, just a steady tug toward the braided copper lead running into the wall.
  - *Choices:*
    - `mb2_01_open`: Pry open the rusted repeater box and trace the secondary wire. → `mb2_02`
    - `mb2_01_listen`: Press your marked wrist against the Bakelite casing and listen to the hum. (`corruption: +2`) → `mb2_03`

- **`mb2_02` — "Spliced Copper"** (`imageKey: 'mb2_subcarrier_console'`)
  - *Prose:* Inside the junction box, someone has soldered a hair-thin enamel wire across the Choir's main transformer. It draws just enough current to power a miniature crystal oscillator wedged behind the terminal block. The solder is clean, rosin-cored—Archive workshop work, not Choir scavenging.
  - *Choices:*
    - `mb2_02_next`: Plug a pair of field headphones into the test jack. → `mb2_04`

- **`mb2_03` — "Two Heartbeats"** (`imageKey: 'mb2_subcarrier_console'`)
  - *Prose:* Through the Bakelite shell, the vibration resolves into Morse-spaced clicks followed by a woman's voice, clipped and flat, speaking between the Choir's breaths. Your mark dims and brightens in exact lockstep with her syllables.
  - *Choices:*
    - `mb2_03_next`: Hook the technician's headset inside the door to hear the words clearly. → `mb2_04`

- **`mb2_04` — "Survey Log, Day Nine Hundred"** (`imageKey: 'mb2_subcarrier_console'`)
  - *Prose:* Scratchy magnetic tape loops behind the static.
  - *Dialogue (Recorded Voice — Velna):* "Bench Four, sub-level nine. Basalt density four point one. The Vault signal is not a broadcast. Repeat: it is an impedance check. It is waiting for the line to load. If anyone from the Archive still carries a tuning fork, follow the twin-lead wire past Sluice 19."
  - *Choices:*
    - `mb2_04_mira`: Let Mira listen to the earpiece. → `mb2_05`
    - `mb2_04_cain`: Ask Cain if the Saints ever found Velna's body. → `mb2_06`

- **`mb2_05` — "Mira Recognizes the Cough"** (`imageKey: 'mb2_subcarrier_console'`)
  - *Prose:* Mira presses the cold Bakelite cup to her ear. At the end of the tape loop, the speaker clears her throat twice—a dry, measured sound.
  - *Dialogue (Mira):* "That's Velna. She used to trade battery acid for cough syrup at my old station before the Archive sealed its doors. Everyone said the Red Choir threw her down the central shaft."
  - *Choices:*
    - `mb2_05_next`: Trace the twin-lead copper wire toward Sluice 19. → `mb2_07`

- **`mb2_06` — "What Varr's Files Said"** (`imageKey: 'mb2_subcarrier_console'`)
  - *Prose:* Cain inspects the waterproof tag crimped to the wire.
  - *Dialogue (Cain):* "Varr put two squads on her trail three years ago. They found her transit tripod smashed at Sluice 19 and called her dead because nobody wanted to climb down into the wet basalt below it."
  - *Choices:*
    - `mb2_06_next`: Follow the twin-lead copper wire toward Sluice 19. → `mb2_07`

- **`mb2_07` — "The Choir Watchman"** (`imageKey: 'mb2_subcarrier_console'`)
  - *Prose:* At the mouth of the Sluice 19 drift, a Red Choir acolyte sits on a salt barrel with a tuning fork across his knees, eyes closed, humming along with the wall speakers. The twin-lead wire runs right between his boots.
  - *Choices:*
    - `mb2_07_talk`: Match the pitch of his hum and ask what comes up from the drift below. (`charisma >= 11` or `corruption >= 25`) → `mb2_08`
    - `mb2_07_slip`: Wait for the horn speaker to swell and step past him in the dark. (Dice Check: `agility` DC 12) → Success: `mb2_09`, Failure: `mb2_10`

- **`mb2_08` — "The Listener at the Gate"** (`imageKey: 'mb2_subcarrier_console'`)
  - *Prose:* The acolyte opens eyes that are bloodshot from days without sleep. He glances at your left wrist—even through your sleeve, he knows where your hand rests.
  - *Dialogue (Choir Acolyte):* "The woman down there taped her wire into our line three winters back. The Voice told us not to cut it. Said she was tuning the instrument for us."
  - *Choices:*
    - `mb2_08_next`: Step past him into the Sluice 19 drift. → `mb2_11`

- **`mb2_09` — "Between the Chords"** (`imageKey: 'mb2_subcarrier_console'`)
  - *Prose:* Your boot heels touch down on the wet tie-timbers only when the horn speakers groan at the bottom of their cycle. Ten yards past the salt barrel, the brick arch gives way to raw, drill-scarred basalt.
  - *Choices:*
    - `mb2_09_next`: Follow the wire down the incline. → `mb2_11`

- **`mb2_10` — "Iron Tuning Fork"** (`imageKey: 'mb2_subcarrier_console'`)
  - *Prose:* Your boot scrapes loose gravel. The acolyte's eyes snap open and he strikes his iron fork against the rail—a high ring that brings two Choir wardens down the catwalk with leaded staves. You drive a shoulder into the first warden and drop behind the sluice gate (`health: -10`).
  - *Choices:*
    - `mb2_10_next`: Bar the sluice gate from the inside and descend the basalt drift. → `mb2_11`

- **`mb2_11` — "Where the Brick Ends"** (`imageKey: 'mb2_velna_survey_camp'`, Location: *Sub-Level 9 — Basalt Drift*)
  - *Prose:* Thirty feet below Sluice 19, the municipal stonework stops. Older rock takes over—black basalt cut with circular core-drills from the Age of Extraction. Every ten paces, Velna's twin-lead wire is neatly pinned to the rock with brass masonry nails.
  - *Choices:*
    - `mb2_11_next`: Round the bend where a cold blue vacuum tube glows inside a canvas tent. → `mb2_12`

- **`mb2_12` — "Camp Nine"** (`imageKey: 'mb2_velna_survey_camp'`)
  - *Prose:* The tent is oil-treated canvas stretched over aluminum survey poles. Inside, a bank of nickel-iron batteries powers a single oscilloscope. Its green phosphor dot traces a slow, breathing ellipse. Nobody is sleeping in the cot—the wool blanket is folded with hospital corners, covered in three years of fine basalt dust.
  - *Choices:*
    - `mb2_12_oscilloscope`: Examine the oscilloscope and the brass transit case strapped to the table. → `mb2_13`
    - `mb2_12_journal`: Open the waterproof vellum notebook weighted down with a core sample. → `mb2_14`

### Act II — The Surveyor's Camp (`mb2_13` – `mb2_25`)

- **`mb2_13` — "The Breathing Ellipse"** (`imageKey: 'mb2_velna_survey_camp'`)
  - *Prose:* When your left wrist comes within a foot of the oscilloscope screen, the green ellipse snaps into a sharp, standing wave—seventeen peaks, matching the seventeen seconds between the Vault breach and the Blackout.
  - *Choices:*
    - `mb2_13_next`: Read Velna's vellum notebook beside the instrument. → `mb2_14`

- **`mb2_14` — "Vellum Notes"** (`imageKey: 'mb2_velna_survey_camp'`)
  - *Prose:* Velna's handwriting is small, square, and written with a hard #4 pencil that barely indents the vellum.
  - *Prose (Entry):* *"Month 14. The Glass Court thought they opened a generator. The Iron Saints think they're guarding a bomb. Both are wrong. When Director Kael's team broke the outer seal, the structure below sent a single ping through the city's grid—an automated query asking what kind of mind had touched the lock. Our transformers burned out because they weren't built to carry syntax."*
  - *Effects:* `setFlags: ['velna_journal_read']`.
  - *Choices:*
    - `mb2_14_turn_page`: Turn to the final pages of the notebook. → `mb2_15`

- **`mb2_15` — "Why She Went Deeper"** (`imageKey: 'mb2_velna_survey_camp'`)
  - *Prose:* The last five pages are dated two years after the first, the pencil strokes wider apart but still steady.
  - *Prose (Entry):* *"I am moving my receiver down to the secondary Archive shaft—Sub-Level 14, behind the collapsed waterworks. The query hasn't stopped. It repeats every forty-one hours, quieter now, waiting for a carrier with the right impedance to complete the handshake. I have left the shaft coordinates in the brass transit tube. Do not come down unless you know what you want to say back."*
  - *Choices:*
    - `mb2_15_tube`: Inspect the sealed brass transit cylinder bolted to the table leg. → `mb2_16`

- **`mb2_16` — "The Relic-Locked Cylinder"** (`imageKey: 'mb2_velna_survey_camp'`)
  - *Prose:* The brass cylinder has no keyhole—only a ring of dark, matte stone around the cap that drinks the light from your lamp. A relic lock, tuned to a specific bioelectric threshold.
  - *Choices:*
    - `mb2_16_mark`: Press your wrist mark directly against the stone collar to open the cylinder. (`corruption: +4`, `setFlags: ['velna_coordinates']`) → `mb2_17`
    - `mb2_16_decode`: Use the oscilloscope's calibration dials to match the collar's frequency without feeding it your own signal. (Dice Check: `intelligence` DC 14) → Success: `mb2_18`, Failure: `mb2_17`

- **`mb2_17` — "The Collar Opens"** (`imageKey: 'mb2_velna_survey_camp'`)
  - *Prose:* The stone ring warms to blood heat in half a second. A violet thread of light runs from your wrist into the seam, and the brass cap clicks open an eighth of an inch. Inside lies a rolled copper plate etched with two things: the exact survey coordinates for the Sub-Level 14 Archive descent, and a map of an uncollapsed maintenance aqueduct leading straight past the city perimeter.
  - *Effects:* `setFlags: ['velna_coordinates']`.
  - *Choices:*
    - `mb2_17_next`: Weigh the two maps in your hand as the repeater radio on the shelf begins to hiss. → `mb2_19`

- **`mb2_18` — "Harmonic Release"** (`imageKey: 'mb2_velna_survey_camp'`)
  - *Prose:* You turn the vernier dial on the oscillator until the green waveform flattens into a straight line. The stone collar on the brass tube releases with a dry metallic sigh—no shock against your skin, no spike in the mark's pulse. Inside are two etched copper plates: the Sub-Level 14 Vault descent coordinates, and a survey chart of the western aqueduct outside the city boundary.
  - *Effects:* `setFlags: ['velna_coordinates']`, `lastArchive: +10`.
  - *Choices:*
    - `mb2_18_next`: Listen as the repeater radio on the shelf clicks onto a live channel. → `mb2_19`

- **`mb2_19` — "The Live Carrier"** (`imageKey: 'mb2_velna_survey_camp'`)
  - *Prose:* The magnetic tape loop stops. Instead, the copper wire coming up from the dark shaft behind the tent begins to sing—not a recording, but a live carrier wave rising from Sub-Level 14. On the oscilloscope, a second smaller wave appears beside the Vault's ellipse, steadying it.
  - *Dialogue (Mira):* "Someone is still down at the bottom of that wire. The battery bank is still drawing charge from below."
  - *Choices:*
    - `mb2_19_listen_deep`: Put on the headphones and open the gain all the way to hear what the deeper shaft is sending. (`corruption: +8`) → `mb2_20`
    - `mb2_19_pack_coords`: Disconnect the headset, pocket the Sub-Level 14 coordinates for when you reach the lower city, and check the western aqueduct map. → `mb2_22`

- **`mb2_20` — "The Full Signal"** (`imageKey: 'mb2_subcarrier_console'`)
  - *Prose:* With the gain wide open, the static drops away completely. There is no noise at all—only the geometry of the city above you, felt as weight and distance behind your eyes. You can feel every relic shard within two miles like warm coals in dark water, and below them all, a vast, patient pressure waiting at the bottom of the rock.
  - *Choices:*
    - `mb2_20_pull_back`: Pull the headset off before your pulse locks to the oscillator's cycle. (Dice Check: `strength` DC 12) → Success: `mb2_22`, Failure: `mb2_21`
    - `mb2_20_stay_on_line`: Leave the headset on, pick up Velna's spare microphone, and match your breathing to the carrier wave. → `mb2_29`

- **`mb2_21` — "Cain's Hand on the Plug"** (`imageKey: 'mb2_velna_survey_camp'`)
  - *Prose:* Your fingers won't open around the Bakelite earcups. Across the table, Cain reaches over and yanks the banana plug straight out of the jack. The green ellipse on the screen collapses to a dot. Your nose is bleeding—two warm drops hitting the vellum notebook (`health: -8`, `corruption: +5`).
  - *Dialogue (Cain):* "You were staring at the glass for three minutes without blinking. We've got the copper plates. Let's get out of this hole."
  - *Choices:*
    - `mb2_21_next`: Wipe your upper lip and examine the second copper plate—the western aqueduct exit. → `mb2_22`

- **`mb2_22` — "Two Plates of Copper"** (`imageKey: 'mb2_velna_survey_camp'`)
  - *Prose:* You hold both etched plates under the lamp. Plate One marks the sealed waterworks hatch in the lowest city—a path you can only reach after the factions settle their war at the Vault threshold. Plate Two marks a brick inspection tunnel fifty yards west of this camp that runs four miles past the Blackout boundary into the open hills.
  - *Dialogue (Cain):* "Wait a second. This second chart—Velna mapped a dry pipe that goes clear past the perimeter checkpoints."
  - *Choices:*
    - `mb2_22_check_aqueduct`: Walk fifty yards down the west drift to see if Velna's aqueduct hatch is really unsealed. → `mb2_23`
    - `mb2_22_return_city`: Stow the Sub-Level 14 coordinates in your coat lining and climb back toward Sector Seven. → `mb2_26`

- **`mb2_23` — "The Western Inspection Hatch"** (`imageKey: 'mb2_old_aqueduct_exit'`, Location: *Western Boundary — Dry Aqueduct*)
  - *Prose:* At the end of the west spur stands a circular cast-iron hatch with its dogs greased and unbolted. Beyond it, a six-foot brick water main stretches straight west. Cold night air blows through the pipe—air that smells not of wet concrete and coal smoke, but of pine needles and wet pasture grass from outside the dead zone.
  - *Choices:*
    - `mb2_23_ask_companions`: Look back at your companions in the lantern light. → `mb2_24`

- **`mb2_24` — "The Wind from Outside"** (`imageKey: 'mb2_old_aqueduct_exit'`)
  - *Prose:* A single battery lantern hangs on a hook just inside the brick main—Velna left the switch wired to a trickle charger so the bulb still burns at a dim, steady orange.
  - *Dialogue (Mira):* "Four miles of dry brick, and we're outside the boundary line. No Saints. No Choir. No Vault. Or we lock this hatch, keep the Sub-Level 14 plate, and finish what's underneath us."
  - *Choices:*
    - `mb2_24_return`: Dog the hatch shut from the inside, keep the coordinates for the final descent, and return to the city. → `mb2_25`
    - `mb2_24_walk_out`: Take the orange lantern off its hook, step into the western aqueduct, and leave the city behind for good. → `mb2_32`

- **`mb2_25` — "Leaving the Lamp Lit"** (`imageKey: 'mb2_old_aqueduct_exit'`)
  - *Prose:* You leave Velna's orange trickle-lamp burning on its hook inside the brick main and pull the cast-iron hatch closed without locking the dogs. If anyone else finds their way down here, the light will still be on. In your inside pocket, the copper plate with the Sub-Level 14 coordinates presses cold against your ribs.
  - *Choices:*
    - `mb2_25_next`: Climb back past Sluice 19 toward the main tunnel network. → `mb2_26`

### Act III — Return to the Network & Branch Endings (`mb2_26` – `mb2_35`)

- **`mb2_26` — "Cutting the Repeater"** (`imageKey: 'mb2_subcarrier_console'`)
  - *Prose:* Back at the Sluice 19 junction box, the Choir's evening broadcast is ending. Velna's spliced wire still hums against the transformer.
  - *Choices:*
    - `mb2_26_leave_wire`: Leave the splice intact so Velna's oscillator keeps running under the Choir's hymns. (`redChoir: +5`) → `mb2_27`
    - `mb2_26_disconnect`: Unclip the enamel wire from the Choir transformer so nobody else can trace her camp down the drift. (`lastArchive: +10`, `mira trust: +1`) → `mb2_28`

- **`mb2_27` — "The Underlying Note"** (`imageKey: 'mb2_subcarrier_console'`)
  - *Prose:* You close the rusted junction box door. As you walk down the main gallery toward Sector Seven, the horn speakers overhead carry the Choir's final chord—and forty kilohertz underneath it, imperceptible to anyone without a mark on their wrist, the steady pulse from the deep rock continues.
  - *Choices:*
    - `mb2_27_done`: Continue into Chapter 7 with the coordinates secured. (`setFlags: ['mb2_completed']`) → `ch7_opening`

- **`mb2_28` — "Silence on the Spur"** (`imageKey: 'mb2_subcarrier_console'`)
  - *Prose:* With a twist of your pliers, the hair-thin copper wire parts. The Choir speakers overhead drop half a decibel, their hum suddenly flat and ordinary. Velna's camp below is hidden again, known only to the copper plate in your coat.
  - *Choices:*
    - `mb2_28_done`: Continue into Chapter 7 with the coordinates secured. (`setFlags: ['mb2_completed']`) → `ch7_opening`

- **`mb2_29` — "Tuning the Throat"** (`imageKey: 'mb2_subcarrier_console'`)
  - *Prose:* The microphone key clicks down under your thumb. You don't speak words—words are too wide for the narrow band. Instead, you let the rhythm in your left wrist set the cadence of your breath: seventeen seconds in, pause, seventeen seconds out.
  - *Choices:*
    - `mb2_29_next`: Watch the green ellipse on the oscilloscope double in brightness. → `mb2_31`

- **`mb2_30` — "Four Miles of Brick"** (`imageKey: 'mb2_old_aqueduct_exit'`)
  - *Prose:* The brick main slopes upward at a gentle two-degree grade. After the first mile, the sound of the metro generators fades behind the curve of the earth. After the second mile, the sigil on your left wrist slows its pulse from twice a second to once every ten seconds, then dims to the color of an old scar.
  - *Choices:*
    - `mb2_30_next`: Reach the grated outfall above the river valley. → `mb2_33`

- **`mb2_31` — "The Third Oscillator"** (`imageKey: 'mb2_subcarrier_console'`)
  - *Prose:* When Mira calls your name from the tent flap, her voice registers only as a slight wobble on the lower trace of the screen. You adjust the vernier dial with your left hand until the wobble smooths out. The battery bank doesn't need charging anymore; your wrist rests across the copper bus bar, and the vacuum tube burns steady violet.
  - *Choices:*
    - `mb2_31_end`: Lock the transmitter key in the closed position. → `mb2_34`

- **`mb2_32` — "Closing the Iron Door"** (`imageKey: 'mb2_old_aqueduct_exit'`)
  - *Prose:* You step over the cast-iron coaming into the dry main. Whether Mira and Cain walk beside you or watch from the drift, nobody tries to pull you back. The orange battery lamp throws long shadows ahead of your boots down the clean brick tube.
  - *Choices:*
    - `mb2_32_next`: Walk west toward the smell of wet grass. → `mb2_30`

- **`mb2_33` — "Outside the Boundary"** (`imageKey: 'mb2_old_aqueduct_exit'`)
  - *Prose:* The rusted bars of the outfall grate give way with two shoves of your boot. Outside, rain is falling—clean rain that doesn't taste of coal ash or lime. Half a mile down the valley, a farmhouse window shows the steady yellow square of an electric bulb powered by a grid that never went dark.
  - *Choices:*
    - `mb2_33_end`: Set Velna's orange battery lamp down on the dry stone inside the grate and step out into the rain. → `mb2_35`

- **`mb2_34` — ENDING: "Static Hymn"** (`isEnding: true`, `endingId: 'ending_mb2_static_hymn'`, `endingType: 'corruption'`, `imageKey: 'mb2_subcarrier_console'`)
  - *Prose:* Months later, Red Choir operators in Sector Six notice that the subcarrier beneath their evening broadcast has grown stronger—two voices now instead of one, braided together forty kilohertz below the liturgy. Neither voice uses words anymore. They read rock densities, water levels, and the slow, patient intervals of the dark below, keeping the line open until someone else comes down to listen.

- **`mb2_35` — ENDING: "Left the Light On"** (`isEnding: true`, `endingId: 'ending_mb2_left_the_light_on'`, `endingType: 'wanderer'`, `imageKey: 'mb2_old_aqueduct_exit'`)
  - *Prose:* You never learn what was waiting at the bottom of Sub-Level 14, and after the first winter in the valley towns to the west, you stop waking up with your right hand covering your left wrist. Behind you, four miles inside the hill, Velna's trickle-charged lantern keeps burning on its iron hook—a tiny orange star in a dry brick tunnel, waiting for anyone else who decides the city has taken enough.
