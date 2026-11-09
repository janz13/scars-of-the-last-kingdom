# Mid-Game Branch 3 — "The Grain Ledger"

- **Branch ID:** `mb3_the_grain_ledger`
- **Target Chapter:** Chapter 8 (`ch8_hunger_war` / `ch8_granary_siege`)
- **Total Nodes:** 35 (`mb3_01` through `mb3_35`, including 3 terminal ending nodes)
- **New Scene `imageKey`s:** `mb3_grain_silo_catwalk`, `mb3_ration_forge_desk`, `mb3_silo_floor_riot`
- **New Endings:**
  - `ending_mb3_full_bellies_empty_streets` — **"Full Bellies, Empty Streets"** (`faction`)
  - `ending_mb3_bread_riot` — **"The Bread Riot"** (`death`)
  - `ending_mb3_nobody_starves_tonight` — **"Nobody Starves Tonight"** (`savior`, rare 3-dice-check path)
- **Persistent Flags Set:** `grain_ledger_warrens`, `grain_ledger_faction`, `grain_ledger_burned`, `grain_ledger_shared_all`, `mb3_completed`

---

## 1. Narrative Premise & Bible Alignment

At the height of Chapter 8's Hunger War, the Municipal Grain Vault at Junction Twelve holds the last forty tons of dry hard winter wheat in the underground network. Both the Iron Saints and the Glass Court maintain joint lock-control over the six hydraulic chute doors—not with keys, but through the **Master Allocation Ledger**, a punched-brass card stack that tells the mechanical scale-hoppers which sector conveyors receive grain at midnight.

A dying scale-clerk named Hobb hands you a blank set of brass punch-plates and the notary die. Inside the `grain_vault`, you face a three-way crisis—or a rare, razor-thin three-check path to recalibrate the hoppers so every sector receives an equal drop before the chutes lock.

### Story Bible Compliance Check
- **Zero prohibited words:** 0 occurrences of "alien" or "divine".
- **Scarcity has physical weight:** Dry wheat dust explosive in lantern light, brass punch-cards, the mechanical clack of hopper scales, the cost of every ton diverted.
- **Rare Savior path earned by mechanics & risk:** Requires three consecutive skill checks (`intelligence`, `agility`, `charisma`) to pull off without a massacre or purge.

---

## 2. Node-by-Node Outline & Prose Specification

### Act I — The Clerk's Brass Plates (`mb3_01` – `mb3_11`)

- **`mb3_01` — "Flour Dust and Cordite"** (`imageKey: 'grain_vault'`, Location: *Junction 12 — Municipal Grain Vault*)
  - *Prose:* The air outside the Junction Twelve silos tastes of dry wheat hulls and gun oil. Sandbagged barricades divide the loading dock into three armed camps: Iron Saints engineers on the east ramp, Glass Court auditors in the glass-brick weigh-house, and three hundred Hollow Children and Warrens families pressed against the turnstile grates below.
  - *Choices:*
    - `mb3_01_clerk`: Crouch beside the old scale-clerk slumped behind the weigh-house coal bin. → `mb3_02`
    - `mb3_01_catwalk`: Look up at the overhead conveyor catwalks linking the six concrete silos. → `mb3_03`

- **`mb3_02` — "Hobb's Punch-Die"** (`imageKey: 'mb3_ration_forge_desk'`)
  - *Prose:* Hobb's apron is stiff with dried blood from a stray ricochet during the morning bread line. He presses a heavy cast-iron hand-punch and three blank brass cards into your palm.
  - *Dialogue (Hobb, Scale-Clerk):* "Midnight drop runs on the brass stack in the upper hopper room. Saints punched a card that dumps all forty tons into their barracks cars. Glass Court punched one that sends it up the lift to their hydroponics dome. If either card runs, the other side blows the chutes."
  - *Choices:*
    - `mb3_02_next`: Ask Hobb what happens if neither card runs. → `mb3_04`

- **`mb3_03` — "Six Silos, Four Conveyors"** (`imageKey: 'mb3_grain_silo_catwalk'`)
  - *Prose:* Above the barricades, four belt-conveyors lead out from the central scale-hopper: Belt A to the Saints' armored train, Belt B to the Glass Court freight lift, Belt C down the brick chute to the Warrens market, and Belt D to the neutral clinic annex.
  - *Choices:*
    - `mb3_03_next`: Duck behind the coal bin where the wounded clerk is gesturing to you. → `mb3_02`

- **`mb3_04` — "The Midnight Counterweight"** (`imageKey: 'mb3_ration_forge_desk'`)
  - *Prose:* Hobb coughs white flour dust onto his sleeve.
  - *Dialogue (Hobb):* "The counterweight trips at twelve sharp. You get into the upper scale room before the bell, you can swap the brass stack—or jam the hopper cams manually so all four belts run at quarter-gate. Watch your lamp up there. Wheat dust that thick will go up like black powder if a spark hits it."
  - *Choices:*
    - `mb3_04_mira`: Hear Mira's assessment of the crowd at the turnstiles. → `mb3_05`
    - `mb3_04_cain`: Hear Cain's reading of the Saints' barricade on the east ramp. → `mb3_06`

- **`mb3_05` — "Mira at the Grate"** (`imageKey: 'grain_vault'`)
  - *Prose:* Mira looks down at the families pressed against the iron bars—mothers holding tin pails, men with pry-bars tucked inside their coats.
  - *Dialogue (Mira):* "If the Warrens chute stays dry tonight, those bars come down in five minutes. And Krell's machine gunners on the east ramp have interlocking fields of fire across the whole floor."
  - *Choices:*
    - `mb3_05_next`: Climb the exterior maintenance ladder toward the upper hopper room. → `mb3_07`

- **`mb3_06` — "Cain Watches the Gunners"** (`imageKey: 'grain_vault'`)
  - *Prose:* Cain squints through the flour haze toward the Saints' sandbags.
  - *Dialogue (Cain):* "Varr's quartermaster already uncoupled the rear cars on their train. They aren't planning to ration that wheat—they're hauling it to the northern citadel and leaving Sector Four to starve out the resistance. Pick who eats, or find a way to split the chutes before the bell."
  - *Choices:*
    - `mb3_06_next`: Climb the exterior maintenance ladder toward the upper hopper room. → `mb3_07`

- **`mb3_07` — "The Flour Haze"** (`imageKey: 'mb3_grain_silo_catwalk'`, Location: *Silo 3 — Overhead Catwalk*)
  - *Prose:* Forty feet above the silo floor, suspended dust hangs in the lantern beams like yellow fog. Every step on the perforated iron catwalk sends a tiny shower of chaff drifting down toward the gun crews. Ahead, a Glass Court auditor and a Saints corporal stand guard on opposite sides of the scale-room door, watching each other with drawn pistols.
  - *Choices:*
    - `mb3_07_bluff`: Show Hobb's brass notary die and claim both commanders ordered a weight verification before midnight. (`charisma >= 12`) → `mb3_08`
    - `mb3_07_vent`: Crawl under the catwalk grating through the grain-return auger housing. (`agility >= 11`) → `mb3_09`
    - `mb3_07_silent`: Knock both guards' helmets together in the narrow doorway without firing a shot. (`strength >= 12`, `health: -6`) → `mb3_10`

- **`mb3_08` — "Mutual Suspicion"** (`imageKey: 'mb3_grain_silo_catwalk'`)
  - *Prose:* Neither guard trusts the other enough to leave his post, and neither wants to be blamed if the scale-weights jam. They unlock the double padlock—one turn from the Saints' key, one from the Court's—and give you six minutes inside the hopper room.
  - *Choices:*
    - `mb3_08_next`: Step inside the scale-hopper room and close the iron door. → `mb3_11`

- **`mb3_09` — "Through the Auger Trough"** (`imageKey: 'mb3_grain_silo_catwalk'`)
  - *Prose:* You belly-crawl through six inches of spilled hard wheat inside the sheet-metal return trough, emerging behind the cast-iron balance beam inside the hopper room while the two guards argue outside the door.
  - *Choices:*
    - `mb3_09_next`: Stand up beside the brass card reader. → `mb3_11`

- **`mb3_10` — "No Sparks"** (`imageKey: 'mb3_grain_silo_catwalk'`)
  - *Prose:* Firing a gun in this dust cloud would blow the roof off Junction Twelve. You catch the corporal by his collar strap and drive his steel helmet into the auditor's temple, catching both rifles before they clatter on the grating. You drag them behind the weight bin and slip into the hopper room.
  - *Choices:*
    - `mb3_10_next`: Bar the door from the inside and approach the brass card reader. → `mb3_11`

- **`mb3_11` — "The Scale-Hopper Room"** (`imageKey: 'mb3_ration_forge_desk'`, Location: *Junction 12 — Master Scale Room*)
  - *Prose:* In the center of the room stands the brass pin-reader—a clockwork loom built during the Compact Period to ration grain by the ounce. On the desk lie two pre-punched brass cards: **Card Alpha** (100% to the Iron Saints train) and **Card Beta** (100% to the Glass Court lift). In your hand are Hobb's blank brass plates and the iron hand-punch. Five minutes remain until the midnight counterweight drops.
  - *Choices:*
    - `mb3_11_warrens`: Punch a new card routing 80% of the wheat down Belt C to the Warrens and Hollow Children. → `mb3_12`
    - `mb3_11_faction`: Run the faction card that backs your strongest ally (Saints or Glass Court) and lock the lower grates so the crowd can't interfere. → `mb3_15`
    - `mb3_11_burn`: Smash the pin-reader gears and dump all six silos straight onto the central floor at once. → `mb3_18`
    - `mb3_11_three_way`: Attempt Hobb's four-belt quarter-gate split—re-punching the master plate, re-tensioning the rusted Belt D clutch, and calling a truce from the weigh-house megaphone. (**Three-Check Savior Path**) → `mb3_20`

### Act II — The Hopper Drops (`mb3_12` – `mb3_26`)

- **`mb3_12` — "Punching Belt C"** (`imageKey: 'mb3_ration_forge_desk'`)
  - *Prose:* Your thumb aches as you drive the iron die through twenty-four brass coordinates on the blank plate, opening Belt C wide while leaving just enough trickle on Belts A and B to keep the hopper counterweights balanced for the first ninety seconds.
  - *Choices:*
    - `mb3_12_next`: Slot the forged brass plate into the reader as the midnight bell strikes. → `mb3_13`

- **`mb3_13` — "Gold in the Brick Chute"** (`imageKey: 'mb3_grain_silo_catwalk'`)
  - *Prose:* The counterweight drops with a heavy *thump*. Beneath your boots, the main chute opens and forty tons of winter wheat begin to roar down the brick incline toward the Warrens market like dry gravel. Down at the turnstiles, three hundred people drop their pry-bars and run back down the stairs with sacks and pails.
  - *Choices:*
    - `mb3_13_escape`: Cut the catwalk hoist cable and ride the counterweight sack down to the Warrens tunnel before the Saints realize their cars are empty. (`setFlags: ['grain_ledger_warrens']`, `food: +4`, `hollowChildren: +25`, `ironSaints: -15`, `glassCourt: -15`, `mira trust: +2`) → `mb3_25`

- **`mb3_14` — "Conveyor Jam"** (`imageKey: 'mb3_grain_silo_catwalk'`)
  - *Prose:* The leather drive belt on Conveyor C squeals under the load, smoking against the iron pulley. You pour your own canteen of water over the bearing housing (`thirst: -15`) to keep the belt from snapping until the last ton clears the throat. → `mb3_27`

- **`mb3_15` — "Order by Tonnage"** (`imageKey: 'mb3_ration_forge_desk'`)
  - *Prose:* You lock the master allocation card into the brass loom and pull the red pneumatic lever that seals the lower Warrens blast doors. When the midnight bell hits, the heavy conveyors thunder toward the armored sidings.
  - *Choices:*
    - `mb3_15_saints`: Route the full silo reserve to the Iron Saints' armored train and authorize Varr's curfew sweep. (`setFlags: ['grain_ledger_faction']`, `ironSaints: +25`, `hollowChildren: -25`, `food: +3`) → `mb3_16`
    - `mb3_15_court`: Route the full silo reserve up the Glass Court freight lift and seal the lower station vents. (`setFlags: ['grain_ledger_faction']`, `glassCourt: +25`, `hollowChildren: -25`, `food: +3`) → `mb3_17`

- **`mb3_16` — "The Train Pulls Out"** (`imageKey: 'mb3_grain_silo_catwalk'`)
  - *Prose:* Below the catwalk, the steel blast shutters slam down in front of the Warrens turnstiles, cutting off the shouting of the crowd. On the east ramp, Krell's engineers tarp the overflowing hopper cars as the locomotive builds steam.
  - *Choices:*
    - `mb3_16_rejoin`: Step down to the platform, collect your officer's ration chit, and continue toward Chapter 9. → `mb3_26`
    - `mb3_16_enforce`: Board the armored train as Commissar of the Granary and oversee the pacification of Sector Four. → `mb3_33`

- **`mb3_17` — "The Freight Lift Rises"** (`imageKey: 'mb3_grain_silo_catwalk'`)
  - *Prose:* Hydraulic pistons hiss as the Glass Court's ten-ton freight elevator rises into the ceiling shaft, carrying the last harvest out of reach of the tunnels. Below the shuttered grates, the pounding of iron bars slowly dies away into silence.
  - *Choices:*
    - `mb3_17_rejoin`: Take the auditor's voucher and return to the main corridor. → `mb3_26`
    - `mb3_17_enforce`: Ride the lift up to the Court's upper terrace and sign the permanent closure order for the lower Warrens. → `mb3_33`

- **`mb3_18` — "Smashing the Loom"** (`imageKey: 'mb3_silo_floor_riot'`)
  - *Prose:* You swing the iron hand-punch into the brass pin-wheel and yank the emergency dump cable. All six silo gates shear their pins at once. Forty tons of dry wheat avalanche straight through the floor chutes onto the central loading dock between the three barricades, throwing up a blinding yellow wall of suspended flour dust.
  - *Choices:*
    - `mb3_18_crawl_out`: Drop flat onto the catwalk and crawl toward the exhaust duct before someone fires a rifle into the dust cloud. (Dice Check: `agility` DC 14) → Success: `mb3_19`, Failure: `mb3_31`
    - `mb3_18_into_crowd`: Leap down onto the grain pile to pull the Warrens children back from the barricades as the first rifle flash ignites the air. → `mb3_31`

- **`mb3_19` — "The Spark in the Cloud"** (`imageKey: 'mb3_silo_floor_riot'`)
  - *Prose:* You barely pull the cast-iron exhaust hatch shut behind your boots when a nervous corporal on the east ramp fires a warning shot into the yellow fog. The suspended flour dust ignites in a single, chest-crushing *whump* that blows the weigh-house windows out into the tunnel (`health: -18`, `morale: -15`, `setFlags: ['grain_ledger_burned']`).
  - *Choices:*
    - `mb3_19_next`: Stumble out through the smoke-blackened service tunnel into the dark. → `mb3_29`

- **`mb3_20` — "Check One: The Four-Gate Plate"** (`imageKey: 'mb3_ration_forge_desk'`)
  - *Prose:* To feed all four belts without tripping the anti-tamper lock, the holes on the brass card must be staggered to a sixteenth of an inch so the scale beam never bottoms out. You set the iron die against the brass under the flickering lamp.
  - *Choices:*
    - `mb3_20_roll`: Punch the staggered four-belt sequence before the clock ticks down. (Dice Check: `intelligence` DC 13) → Success: `mb3_21`, Failure: `mb3_12`

- **`mb3_21` — "Check Two: The Rusted Clutch"** (`imageKey: 'mb3_grain_silo_catwalk'`)
  - *Prose:* The brass card slots home and the clockwork pins engage—all four gates crack open to twenty-five percent. Immediately, Belt D's iron clutch seizes above the catwalk, threatening to snap the main drive chain and dump the load. You scramble out onto the vibrating I-beam over the thirty-foot drop with a grease bar in your teeth.
  - *Choices:*
    - `mb3_21_roll`: Free the seized clutch pulley while the drive chain whips past your shoulder. (Dice Check: `agility` DC 13) → Success: `mb3_22`, Failure: `mb3_14`

- **`mb3_22` — "Check Three: The Weigh-House Horn"** (`imageKey: 'mb3_grain_silo_catwalk'`)
  - *Prose:* All four belts are running—wheat pouring equally into the Saints' cars, the Glass Court lift, the Warrens chute, and the clinic bins. Below, both commanders think the other is stealing their half; rifle bolts clack back along the sandbags. You kick open the weigh-house window and grab the brass megaphone horn.
  - *Choices:*
    - `mb3_22_roll`: Shout the exact tonnage numbers down to both barricades and warn them that a single gunshot in this flour dust will incinerate everyone on the dock. (Dice Check: `charisma` DC 14) → Success: `mb3_23`, Failure: `mb3_19`

- **`mb3_23` — "Ten Tons Apiece"** (`imageKey: 'mb3_grain_silo_catwalk'`)
  - *Prose:* Your voice echoes off the concrete silos. On the east ramp, the Saints quartermaster looks up at the yellow dust hanging thick around his lantern, then looks at the wheat already filling his first two cars. Slowly, he pushes his corporal's rifle barrel down. Across the dock, the Glass Court auditor signals her guards to holster their sidearms.
  - *Effects:* `setFlags: ['grain_ledger_shared_all']`, `food: +4`, `morale: +15`, `ironSaints: +10`, `glassCourt: +10`, `hollowChildren: +20`, `mira trust: +2`, `cain trust: +2`.
  - *Choices:*
    - `mb3_23_next`: Watch the four belts run until the hoppers empty cleanly. → `mb3_24`

- **`mb3_24` — "The Sound of Full Sacks"** (`imageKey: 'grain_vault'`)
  - *Prose:* For forty minutes, nobody speaks at Junction Twelve. The only sound is the dry hiss of hard winter wheat filling burlap sacks, hopper cars, and tin pails. Down by the coal bin, Mira binds Hobb's chest with clean linen while Cain leans on his rifle, watching children carry twenty-pound sacks down the Warrens stairs without a single shot fired.
  - *Choices:*
    - `mb3_24_continue`: Rejoin the main story as the first flatbreads go onto the Warrens stoves. → `mb3_30`
    - `mb3_24_stay_steward`: Accept the joint warrant from all three camps to remain at Junction Twelve as the neutral Steward of the Scales. → `mb3_32`

- **`mb3_25` — "Mira Binds the Clerk"** (`imageKey: 'grain_vault'`)
  - *Prose:* Hobb opens his eyes as the first sack of Warrens wheat is set beside his stretcher. He touches the brass notary die in his pocket and lets out a long breath. → `mb3_27`

- **`mb3_26` — "Silence Behind the Shutters"** (`imageKey: 'grain_vault'`)
  - *Prose:* Cain walks past the sealed Warrens blast doors without looking at the chalk marks scratched across the steel.
  - *Dialogue (Cain):* "An army marches on its stomach. Just don't ask who we left on the other side of the bulkhead." → `mb3_28`

### Act III — Aftermath & Branch Endings (`mb3_27` – `mb3_35`)

- **`mb3_27` — "Flatbread on the Iron Plate"** (`imageKey: 'grain_vault'`)
  - *Prose:* Down in the Warrens market, someone has dragged a sheet of boiler iron over a coal brazier. Unleavened wheat cakes blister on the hot steel—the first real bread the lower tunnels have smelled in fourteen months.
  - *Choices:*
    - `mb3_27_done`: Take a warm cake wrapped in oilpaper and continue toward Chapter 9. (`setFlags: ['mb3_completed']`) → `ch8_aftermath`

- **`mb3_28` — "Stamped Rations"** (`imageKey: 'grain_vault'`)
  - *Prose:* Your pack is full of high-grade military hardtack, and the patrol checkpoints salute as you pass. Below the floor grates, the lower tunnels are dark and quiet.
  - *Choices:*
    - `mb3_28_done`: Continue along the upper cordon toward Chapter 9. (`setFlags: ['mb3_completed']`) → `ch8_aftermath`

- **`mb3_29` — "Charred Hulls"** (`imageKey: 'mb3_silo_floor_riot'`)
  - *Prose:* Black smoke still curls from the Junction Twelve ventilation shafts, smelling of burned toast and scorched wool. Neither the Saints nor the Court got their trainload; only what spilled down the storm drains before the flash fire remains.
  - *Choices:*
    - `mb3_29_done`: Move on through the smoke-stained gallery before the patrols reorganize. (`setFlags: ['mb3_completed']`) → `ch8_aftermath`

- **`mb3_30` — "The Night Nobody Bled"** (`imageKey: 'grain_vault'`)
  - *Prose:* As you leave Junction Twelve, a woman at the turnstile presses a handful of roasted wheat berries into Mira's palm. Even Krell's rear-guard nods once as they couple their half-loaded cars.
  - *Choices:*
    - `mb3_30_done`: Continue into the deeper sectors with your companions. (`setFlags: ['mb3_completed']`) → `ch8_aftermath`

- **`mb3_31` — "White Heat in the Chaff"** (`imageKey: 'mb3_silo_floor_riot'`)
  - *Prose:* Your boots hit the shifting mound of wheat just as a muzzle flash on the east ramp turns the suspended flour dust into a solid wall of orange fire. The pressure wave lifts the catwalk grating off its bolts. You throw your body over two Warrens runners by the turnstile, taking the full weight of the falling timber beam across your spine.
  - *Choices:*
    - `mb3_31_end`: Hear the iron turnstile give way as the runners scramble out into the cool air below. → `mb3_34`

- **`mb3_32` — "The Balance Beam"** (`imageKey: 'mb3_ration_forge_desk'`)
  - *Prose:* All three factions sign the truce charter on the back of Hobb's blank brass card: Junction Twelve becomes neutral ground, and the scale-hopper room answers only to the Steward who kept the dust from burning.
  - *Choices:*
    - `mb3_32_end`: Hang Hobb's iron hand-punch on its hook above the scale beam. → `mb3_35`

- **`mb3_33` — ENDING: "Full Bellies, Empty Streets"** (`isEnding: true`, `endingId: 'ending_mb3_full_bellies_empty_streets'`, `endingType: 'faction'`, `imageKey: 'mb3_grain_silo_catwalk'`)
  - *Prose:* By the third week of winter, your chosen faction's barracks smell of fresh soup every evening, and their patrols march in boots with whole soles. When you walk the lower galleries checking the sealed Warrens bulkheads, the corridors are spotless and completely silent—no chalk on the pillars, no crowding at the grates, only the steady hum of conveyors carrying grain past empty platforms.

- **`mb3_34` — ENDING: "The Bread Riot"** (`isEnding: true`, `endingId: 'ending_mb3_bread_riot'`, `endingType: 'death'`, `imageKey: 'mb3_silo_floor_riot'`)
  - *Prose:* The flour-dust fire burns itself out in four seconds, leaving warm roasted wheat drifted ankle-deep across the dock like golden snow. Through the ringing in your ears, you watch the two children you shielded crawl under the bent turnstile with their coat pockets overflowing with grain. Your fingers rest in the warm kernels as the smoke clears toward the vaulted roof.

- **`mb3_35` — ENDING: "Nobody Starves Tonight"** (`isEnding: true`, `endingId: 'ending_mb3_nobody_starves_tonight'`, `endingType: 'savior'`, `imageKey: 'grain_vault'`)
  - *Prose:* Forty tons of wheat does not save a dead city forever, and everyone at Junction Twelve knows it. But for six weeks during the hardest freeze since the Blackout, all four belts run at midnight, the clinic annexes stay warm, and no child in Sector Four goes to sleep crying from an empty stomach. Years later, people in the metro still date the winter not by the faction treaties, but by the night the four chutes opened together.
