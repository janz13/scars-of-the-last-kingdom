# Epilogue — "The Response"

- **Chapter ID:** `epilogue_the_response` (`chapter: 'Epilogue: The Response'`)
- **Unlock Condition:** Any non-death Final Chapter 2 (`fc2`) ending completed **AND** (`flags.velna_coordinates === true` from MB2 **OR** `factionRep.lastArchive >= 70` / Archive trust ≥ 7). Also accessible from **Chapter Select** once unlocked.
- **Total Nodes:** 60 (`epi_01` through `epi_60`, including 6 terminal ending nodes)
- **New Scene `imageKey`s (6):**
  1. `velna_descent` — Sub-Level 14 Waterworks Secondary Archive Shaft
  2. `velna_camp` — Velna's Deep Listening Station (5 years underground)
  3. `signal_choir_cavern` — Acoustic Resonance Cavern where the Vault's ping is felt as physical pressure
  4. `vault_heart` — The Inner Core beneath the sealed extraction chamber
  5. `answer_chamber` — The Acoustic Terminal where humanity's reply is keyed
  6. `city_after` — Dawn over the metro skylight and surface streets after the reply
- **New Endings (6):**
  1. `ending_epilogue_yes_were_here` — **"Yes, We're Here"** (`savior`)
  2. `ending_epilogue_no_one_is_left` — **"No One Is Left"** (`sacrifice`)
  3. `ending_epilogue_velna_answers` — **"Velna Answers"** (`companion`)
  4. `ending_epilogue_second_question` — **"The Second Question"** (`secret`)
  5. `ending_epilogue_mark_goes_quiet` — **"The Mark Goes Quiet"** (`wanderer`)
  6. `ending_epilogue_chorus` — **"Chorus"** (`corruption`, requires `corruption >= 80`)

---

## 1. Narrative Premise & Bible Alignment

The war for the upper threshold of the Vault is over, yet the sigil on your left wrist has not gone dark. Every forty-one hours, it beats with a double pulse that was never part of the factions' war.

Using the etched copper plate recovered from **Velna's Trail** (`velna_coordinates`)—or the sealed survey charts entrusted to you by the **Last Archive**—you unlock the secondary drainage shaft behind the Sub-Level 14 waterworks, three hundred feet deeper than Director Kael's extraction team ever reached.

There, in a dry basalt gallery lit by induction coils powered directly off the rock, you find **Velna** alive. For five years she has been listening to the structure beneath the city. She has mapped what the Last Archive called *The Response*: when Kael's drills breached the outer seal five years ago, the deep structure did not attack the city. It sent an automated impedance check—a single, wordless question through the conductive grid: **Is the thing that touched the lock awake?**

The city's transformers burned out because copper wire and iron switches weren't built to carry that question. Now, in the **Answer Chamber**, with Mira, Cain, and Velna beside you, someone has to decide what humanity says back.

### Story Bible Compliance Check
- **Zero prohibited words:** 0 occurrences of "alien" or "divine" across all 60 nodes. The Vault is treated strictly as an ancient, manufactured structure of unknown origin whose physics operate on bioelectric impedance and syntax.
- **No "good" or "evil" signposting:** Answering honestly restarts the grid but binds the city forever to the deep structure's monitoring; lying ("No One Is Left") protects human autonomy at the cost of permanently killing every relic shard and mark in the city; letting Velna answer saves you at the cost of her voice; cutting the link leaves the question unanswered.
- **Corruption without judgment:** The `ending_epilogue_chorus` ending (`corruption >= 80`) treats full alignment with the signal with the same quiet gravity as `ending_epilogue_yes_were_here`.

---

## 2. Four-Act Arc & 60-Node Specification

### Act I — The Secondary Coordinates (`epi_01` – `epi_15`, Scene: `velna_descent`)

- **`epi_01` — "Forty-One Hours Later"** (`imageKey: 'velna_descent'`, Location: *Sub-Level 14 — Old Waterworks Bulkhead*)
  - *Prose:* The upper tunnels have gone quiet since the dust settled at the Vault threshold, but the inner face of your left wrist has not cooled. Every forty-one hours, the violet lines contract twice—sharp as a telegraph key—pulling toward the flooded waterworks behind Archive Sector Zero. You hold Velna's etched copper plate against the rusted turbine housing until the bolt-pattern matches.
  - *Choices:*
    - `epi_01_turn_wheel`: Brace your boots against the wet cast-iron coaming and turn the drainage wheel. → `epi_02`
    - `epi_01_check_companions`: Look back at the companions who followed you down past the last mapped level. → `epi_03`

- **`epi_02` — "Behind the Turbine"** (`imageKey: 'velna_descent'`)
  - *Prose:* The iron wheel groans through five years of calcified lime and gives way. Cold air exhales from the vertical shaft beyond—not the sour, stagnant damp of the metro sumps, but dry air smelling faintly of warm slate and ozone. Down the center of the shaft runs a braided pair of Archive copper field wires, still taut.
  - *Choices:*
    - `epi_02_next`: Shine your lamp down the spiral inspection stair. → `epi_04`

- **`epi_03` — "Who Came Down"** (`imageKey: 'velna_descent'`)
  - *Prose:* In the narrow beam of your carbide lamp, Mira adjusts the strap of her medical kit while Cain checks the chamber of his rifle—though both of them know bullets won't mean much three hundred feet below the foundation pilings.
  - *Dialogue (Mira):* "Everyone upstairs thinks the story ended at the main doors. Your wrist says otherwise."
  - *Dialogue (Cain):* "If Velna's been living at the bottom of this pipe for five years, I want to see what she's been eating."
  - *Choices:*
    - `epi_03_next`: Open the turbine bulkhead and step onto the spiral inspection stair. → `epi_04`

- **`epi_04` — "Below the Pilings"** (`imageKey: 'velna_descent'`)
  - *Prose:* At a hundred feet down, the concrete caissons of the Age of Extraction end. At two hundred feet, the circular drill-marks in the black basalt give way to flat, seamless planes joined without mortar—surfaces so smooth that condensation beads and rolls off them like mercury.
  - *Choices:*
    - `epi_04_touch_wall`: Brush your bare knuckles against the jointless stone. → `epi_05`
    - `epi_04_follow_wire`: Keep your hands on the iron stair rail and follow Velna's copper wire. → `epi_06`

- **`epi_05` — "Ninety-Eight Degrees"** (`imageKey: 'velna_descent'`)
  - *Prose:* The stone is not cold. It holds the exact temperature of a living palm—ninety-eight point six degrees—steady through ten thousand tons of bedrock. As your fingers pull back, the violet lines on your wrist briefly mirror the seam in the wall.
  - *Choices:*
    - `epi_05_next`: Continue down the stair toward the glow at the shaft floor. → `epi_06`

- **`epi_06` — "Induction Lamps"** (`imageKey: 'velna_descent'`)
  - *Prose:* At the bottom of the stair, nobody is burning kerosene or tallow. Glass vacuum bulbs hang from hooks along the gallery, filled with a pale violet gas that glows without filaments—drawing power simply from standing within ten feet of the rock floor.
  - *Choices:*
    - `epi_06_next`: Step off the last iron rung onto the basalt flagstone. → `epi_07`

- **`epi_07` — "The Tripwire Bell"** (`imageKey: 'velna_descent'`)
  - *Prose:* Across the gallery floor stretches a hair-thin copper filament tied not to a mine, but to an empty brass shell casing suspended over a stone dish.
  - *Choices:*
    - `epi_07_ring`: Tap the brass casing once with your fingernail so whoever is ahead knows you aren't sneaking. → `epi_08`
    - `epi_07_step_over`: Step cleanly over the wire without disturbing the shell. (`agility >= 11`) → `epi_09`

- **`epi_08` — "One Clear Note"** (`imageKey: 'velna_descent'`)
  - *Prose:* The brass casing rings against the stone dish—a single, dry *ping*. Three seconds later, a voice answers from the archway ahead, calm and slightly hoarse from disuse.
  - *Dialogue (Velna):* "F-sharp. That's the outer wire. Leave your carbide lamp by the pillar—open flames throw soot on the paper rolls."
  - *Choices:*
    - `epi_08_next`: Set the carbide lamp down and walk through the archway. → `epi_10`

- **`epi_09` — "She Hears Your Wrist Instead"** (`imageKey: 'velna_descent'`)
  - *Prose:* Your boots make no sound on the smooth stone, and the brass shell never moves. Yet as you approach the archway, a woman's voice speaks from the other side before your shadow crosses the threshold.
  - *Dialogue (Velna):* "You stepped over the F-sharp wire, but your left wrist is running at sixty-two cycles a second. Come in. And turn down the carbide wick—it's smoking."
  - *Choices:*
    - `epi_09_next`: Lower the lamp wick and step through the archway. → `epi_10`

- **`epi_10`–`epi_15` — Transition into the Deep Station** (`imageKey: 'velna_descent'`)
  - *Summary of beats (`epi_10`–`epi_15`):* You pass five years of meticulous core-samples stacked by date (`epi_10`), condensation traps distilling clean drinking water from the upper rock (`epi_11`), hydroponic trays of pale cave-moss grown under violet induction bulbs (`epi_12`), and wall-length paper seismograph rolls where every faction battle upstairs registered only as tiny surface scratches (`epi_13`–`epi_14`), arriving at the main instrument table of Velna's camp (`epi_15`).

### Act II — Velna's Camp (`epi_16` – `epi_30`, Scene: `velna_camp`)

- **`epi_16` — "Five Years of Paper"** (`imageKey: 'velna_camp'`, Location: *Sub-Level 15 — Velna's Listening Station*)
  - *Prose:* Velna sits on a surveyor's stool behind a long slate bench. Her hair has gone the color of iron filings, cropped short with instrument shears, and her Archive coat is patched at the elbows with oilcloth. Around her left wrist—and halfway up her forearm—runs a lattice of fine violet lines, denser than yours, pulsing in slow, four-second waves.
  - *Dialogue (Velna):* "Mira. You still carry your satchel on the left shoulder. And Cain—you took the Saint eagles off your collar. Sit down. The kettle on the induction coil is hot."
  - *Choices:*
    - `epi_16_mira`: Let Mira step forward to examine Velna's arm. → `epi_17`
    - `epi_16_ask_blackout`: Ask Velna what she found at the bottom of the shaft five years ago. → `epi_18`

- **`epi_17` — "Not a Burn"** (`imageKey: 'velna_camp'`)
  - *Prose:* Mira gently turns Velna's forearm toward the induction bulb. The violet lines under Velna's skin are cool to the touch, arranged like a printed circuit diagram or a topographic map.
  - *Dialogue (Mira):* "Your pulse is forty-two beats a minute, Velna. You're completely steady."
  - *Dialogue (Velna):* "It isn't an infection, Mira. It's an antenna. Once you stop fighting the impedance, it doesn't even give you a headache."
  - *Choices:*
    - `epi_17_next`: Ask her what the antenna has been receiving for five years. → `epi_18`

- **`epi_18` — "Seventeen Seconds Explained"** (`imageKey: 'velna_camp'`)
  - *Prose:* Velna unrolls a six-foot strip of graph paper across the slate bench. Inked across the grid is the exact moment of the Blackout—five years ago to the week.
  - *Dialogue (Velna):* "When Kael's team cut the outer seal, they expected steam or radiation. Instead, the structure below did what any long-dormant relay does when a circuit closes: it sent a handshake packet up the line to measure what had touched it. Seventeen seconds of pure syntactic load. Our copper transformers melted because they tried to turn a question into sixty-hertz alternating current."
  - *Choices:*
    - `epi_18_question`: "What was the question?" → `epi_19`
    - `epi_18_marks`: "And why did the marks appear on our wrists afterward?" → `epi_20`

- **`epi_19` — "The Handshake"** (`imageKey: 'velna_camp'`)
  - *Prose:* Velna taps the repeating forty-one-hour spike on her paper roll.
  - *Dialogue (Velna):* "It doesn't use words. In engineering terms, it's asking three things: *Is the contact deliberate? Is the caller coherent? Should the lower system wake up?* Because our power grid burned out in seventeen seconds, the handshake never completed. So every forty-one hours, it pings again at one-tenth power."
  - *Choices:*
    - `epi_19_next`: Ask how the wrist marks fit into the incomplete handshake. → `epi_20`

- **`epi_20` — "Why Some People Marked"** (`imageKey: 'velna_camp'`)
  - *Prose:* Velna looks down at your left wrist, then at her own.
  - *Dialogue (Velna):* "When the copper grid failed, the structure looked for any secondary conductors within the city boundary that could hold the address register without melting. A small fraction of human nervous systems had the right baseline impedance. The marks aren't a curse, and they aren't a crown. We're the open telephone receivers left off the hook."
  - *Choices:*
    - `epi_20_next`: Ask why she hasn't answered it herself in five years. → `epi_21`

- **`epi_21`–`epi_30` — The Weight of the Reply** (`imageKey: 'velna_camp'`)
  - *Summary of beats (`epi_21`–`epi_30`):* Velna explains that a single receiver can only listen; completing the return packet requires either a second mark-bearer who has walked through the upper city's full field (`epi_21`), or burning out a single bearer's nervous system completely (`epi_22`). Cain asks what happens to the city above if the structure wakes (`epi_23`) vs. if it powers down forever (`epi_24`). Mira checks Velna's journals (`epi_25`–`epi_27`), and you calibrate your wrist mark against Velna's bench oscillator (First Epilogue Dice Check at `epi_28`: `intelligence` DC 14 to synchronize without taking `corruption: +6`) before descending into the acoustic resonance cavern (`epi_29`–`epi_30`).

### Act III — The Signal Cavern (`epi_31` – `epi_45`, Scene: `signal_choir_cavern` & `vault_heart`)

- **`epi_31` — "The Acoustic Cavern"** (`imageKey: 'signal_choir_cavern'`, Location: *Sub-Level 16 — Resonance Vault*)
  - *Prose:* Beneath Velna's camp, the gallery opens into a hemispherical dome of black stone three hundred feet wide. Thousands of hexagonal basalt columns hang from the vault like organ pipes above a shallow pool of still, mineral-heavy water. As you step onto the causeway, the forty-one-hour cycle begins.
  - *Choices:*
    - `epi_31_feel`: Stand still on the causeway and let the ping pass through your mark. → `epi_32`
    - `epi_31_brace`: Grip the iron guide-rope with Cain and Mira as the water surface ripples into standing hexagons. → `epi_33`

- **`epi_32`–`epi_45` — Crossing the Vault Heart** (`imageKey: 'signal_choir_cavern'` → `'vault_heart'`)
  - *Summary of beats (`epi_32`–`epi_45`):* In the cavern, you experience the Vault's ping not as sound, but as a three-part pressure behind the ribs: **Weight** (the age of the rock), **Boundary** (the exact outline of the city above), and **Wait** (an open bracket waiting to be closed) (`epi_32`–`epi_36`). Crossing the inner bridge into `vault_heart` (`epi_37`–`epi_41`), you pass the neatly stacked diving helmets and wrenches of Director Kael's original extraction team—they didn't die of violence; when the first full-power ping hit them at point-blank range, they laid down their tools and walked into the lower galleries before the bulkhead sealed (`epi_42`). A Second Epilogue Dice Check (`epi_43`: `strength` or `charisma` DC 14) keeps the party anchored together as the inner pressure peaks before entering the `answer_chamber` (`epi_44`–`epi_45`).

### Act IV — The Answer Chamber & The Six Endings (`epi_46` – `epi_60`, Scene: `answer_chamber` & `city_after`)

- **`epi_46` — "The Answer Chamber"** (`imageKey: 'answer_chamber'`, Location: *The Vault Core — Acoustic Terminal*)
  - *Prose:* At the center of the core stands a circular table of dark stone split into two halves by a narrow channel of mercury. Above it, three bronze-colored acoustic horns—added by the Last Archive's first deep surveyors forty years ago and wired directly into the stone's contact pads—wait beside a manual shunt bar.
  - *Dialogue (Velna):* "The forty-one-hour window is open for ninety seconds. Put your left palm on the west contact pad, and whatever impedance state we key into the bridge goes down the column as the city's final answer."
  - *Choices:*
    - `epi_46_talk_mira`: Speak with Mira beside the mercury channel first. → `epi_47`
    - `epi_46_talk_cain`: Speak with Cain by the bronze shunt bar first. → `epi_48`
    - `epi_46_talk_velna`: Ask Velna what she wants to say after five years of listening. → `epi_49`

- **`epi_47` — "Mira's Perspective"** (`imageKey: 'answer_chamber'`)
  - *Prose:* Mira looks at her own unmarked hands, then at the violet pulse on your wrist.
  - *Dialogue (Mira):* "If we tell it we're here and ready, the power comes back up in the wards—along with whatever else this place was built to do. If we tell it nobody's home, every relic heater and water purifier in the metro dies tonight, and we survive on coal and rainwater like our grandparents. Either way, don't let it answer for us." → `epi_50`

- **`epi_48` — "Cain's Perspective"** (`imageKey: 'answer_chamber'`)
  - *Prose:* Cain rests his boot on the base of the Archive shunt bar, looking at the heavy copper blades.
  - *Dialogue (Cain):* "Varr, Sera, the Choir—every one of them wanted to own this room so they could point it at the others. If you can cut the wire clean so nobody ever uses it as a gun again, I won't complain about walking home in the dark." → `epi_50`

- **`epi_49` — "Velna's Offer"** (`imageKey: 'answer_chamber'`)
  - *Prose:* Velna touches the dense violet lattice covering her forearm.
  - *Dialogue (Velna):* "I've been tuning my pulse to this room for eighteen hundred days. If you bridge the outer pad for ten seconds, I can send the full Archive taxonomy myself. It'll leave my voice down here in the stone, and you'll have to carry me back up the stairs—but your wrist will be free." → `epi_50`

- **`epi_50` — "What Humanity Says Back"** (`imageKey: 'answer_chamber'`)
  - *Prose:* In the mercury channel, the standing ripples gather toward the center. Sixty seconds remain in the forty-one-hour window. You rest your left hand above the stone contact pad.
  - *Choices:*
    1. `epi_50_yes`: **"Yes, We're Here."** — Press your palm flat, steady your breathing with Mira and Cain, and send an honest, bounded human signal: *We are small, we are damaged, and we are awake.* → `epi_51` → `epi_55` (**Ending 1**)
    2. `epi_50_no_one`: **"No One Is Left."** — Invert the phase on Velna's oscillator and send a dead-line termination code—convincing the structure the surface is empty so it seals itself forever. → `epi_52` → `epi_56` (**Ending 2**)
    3. `epi_50_velna`: **Let Velna Answer.** — Hold the outer bridge while Velna pours five years of recorded human history into the stone, then pull her off the pad before her heart stops. (`companions.mira.present` or `velna_journal_read`) → `epi_53` → `epi_57` (**Ending 3**)
    4. `epi_50_query`: **Send the Archive's Diagnostic Query.** — Key the Last Archive's deep-structure counterfactual back down the line: *Before we answer, what built you?* (`intelligence >= 13`) → `epi_54` → `epi_58` (**Ending 4**)
    5. `epi_50_cut`: **Throw the Shunt Bar and Cut the Link.** — Drive the bronze grounding bar straight through the mercury bridge, severing the secondary conductors without sending a reply. → `epi_59` (**Ending 5**)
    6. `epi_50_chorus`: **Open the Gain All the Way.** — Step into the mercury channel yourself and let the forty-one-hour cycle become permanent. (`corruption >= 80`) → `epi_60` (**Ending 6**)

### Terminal Ending Nodes (`epi_55` – `epi_60`)

- **`epi_55` — ENDING: "Yes, We're Here"** (`isEnding: true`, `endingId: 'ending_epilogue_yes_were_here'`, `endingType: 'savior'`, `imageKey: 'city_after'`)
  - *Prose:* The mercury channel flattens into a mirror. Three hundred feet above your head, in the flooded sub-basements of the municipal hospitals and the rusted transformer vaults of Sector Four, the surviving copper bus bars warm by three degrees—not a surge that melts the lead, but a steady, regulated trickle calibrated to what human wire can carry. When you climb out onto the surface at dawn, the streetlights along the broken viaduct are glowing at half-wattage through the ash, and the mark on your wrist beats once a minute—quiet, warm, and answered.

- **`epi_56` — ENDING: "No One Is Left"** (`isEnding: true`, `endingId: 'ending_epilogue_no_one_is_left'`, `endingType: 'sacrifice'`, `imageKey: 'city_after'`)
  - *Prose:* As the termination packet closes the circuit, every violet induction bulb along the gallery goes black at once. Across the city above, every relic shard in every faction vault cools to ordinary grey slate, and every relic lock releases its bolts with a final metallic sigh. The burn in your left wrist aches once, sharply, as the circuit grounds out through your arm (`health: -20`), leaving a pale white line where the sigil used to be. Humanity will have to rebuild its boilers with coal and iron—but the dark beneath the city will never knock on the door again.

- **`epi_57` — ENDING: "Velna Answers"** (`isEnding: true`, `endingId: 'ending_epilogue_velna_answers'`, `endingType: 'companion'`, `imageKey: 'velna_camp'`)
  - *Prose:* For eleven seconds, the mercury channel sings with five years of Velna's penciled notes—every name from the Warrens pillars, every weather reading, every cough and argument recorded on her wax cylinders. When you and Cain pull her hands off the stone, the violet lattice on her forearm has faded to nothing. She cannot speak above a whisper for the rest of the winter, and she walks with a cane made from an aluminum survey pole, but she sits by the window of Mira's surface clinic every afternoon, watching the snow melt off roofs that no longer hum in the dark.

- **`epi_58` — ENDING: "The Second Question"** (`isEnding: true`, `endingId: 'ending_epilogue_second_question'`, `endingType: 'secret'`, `imageKey: 'answer_chamber'`)
  - *Prose:* For seventeen seconds after you key the Archive's query, the chamber is completely silent. Then the mercury channel parts down the middle—not in hexagons, but in a three-dimensional relief map of the continent as it looked before the rivers cut their valleys, with nineteen other dots pulsing at equal intervals across the stone, and a single coordinates bracket blinking over the northern sea. The Vault was never the center. It was Station Seven of twenty, and the other nineteen just heard you pick up the line.

- **`epi_59` — ENDING: "The Mark Goes Quiet"** (`isEnding: true`, `endingId: 'ending_epilogue_mark_goes_quiet'`, `endingType: 'wanderer'`, `imageKey: 'city_after'`)
  - *Prose:* The bronze shunt bar shears through the stone contact pad with a shower of blue sparks that smells of scorched lime. Below the floor, a series of massive stone counterweights drops into place, sealing the Sub-Level 16 shaft under forty feet of dry basalt. By the time you reach the top of the spiral waterworks stair, the inner face of your left wrist is just skin again—warm only with your own blood, beating only at the speed of your own heart.

- **`epi_60` — ENDING: "Chorus"** (`isEnding: true`, `endingId: 'ending_epilogue_chorus'`, `endingType: 'corruption'`, `imageKey: 'signal_choir_cavern'`)
  - *Prose:* When you step into the shallow mineral pool under the basalt pipes, the forty-one-hour interval disappears; there is no gap between the question and the reply anymore. Through eighty thousand wrists and ten thousand miles of buried stone, you feel the weight of the buildings above and the slow drift of groundwater below as parts of a single, continuous chord. Up in the metro tunnels, people pause on the stairs as the horn speakers stop hissing static and begin to hum a warm, steady fifth that keeps the frost off the rails all winter.
