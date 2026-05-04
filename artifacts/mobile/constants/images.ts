/**
 * Background image registry for Scars of the Last Kingdom.
 *
 * HOW TO ADD A NEW BACKGROUND IMAGE:
 *   1. Place the PNG at:  artifacts/mobile/assets/images/<key>.png
 *   2. Add a require() entry to BACKGROUND_IMAGES below using that key.
 *   3. Set `imageKey: '<key>'` on the StoryNode in data/storyNodes.ts.
 *   4. Optionally add a matching gradient to BACKGROUND_GRADIENTS — it is
 *      used as the transition "flash" color while the image loads and as the
 *      sole background if the image file is ever missing.
 *
 * HOW IMAGE LOADING WORKS:
 *   - React Native's Metro bundler resolves require() at build time.
 *   - getBackgroundImage(key) returns the require() result or null.
 *   - BackgroundPanel uses ImageBackground when a result exists, falling
 *     back to the gradient + FallbackDecoration otherwise.
 *   - On web, CSS `image-rendering: pixelated` is injected by BackgroundPanel
 *     to keep pixel art sharp at any display resolution.
 *
 * VALIDATED IMAGE KEYS (must match files in assets/images/):
 *   ruined_metro_station   ✓ assets/images/ruined_metro_station.png
 *   dark_metro_hallway     ✓ assets/images/dark_metro_hallway.png
 *   broken_vending_area    ✓ assets/images/broken_vending_area.png
 *   collapsed_tunnel       ✓ assets/images/collapsed_tunnel.png
 *   tunnel_camp            ✓ assets/images/tunnel_camp.png
 *   surface_ruins          ✓ assets/images/surface_ruins.png
 *   iron_saints_checkpoint ✓ assets/images/iron_saints_checkpoint.png
 *   glass_tower_gate       ✓ assets/images/glass_tower_gate.png
 *   red_choir_chamber      ✓ assets/images/red_choir_chamber.png
 *   last_archive_door      ✓ assets/images/last_archive_door.png
 *
 * NOTE ON public/images/backgrounds/:
 *   Expo bundles static assets via require() from the assets/ directory for
 *   both native (iOS/Android) and web builds. The public/ folder pattern is
 *   for plain web apps only and cannot be used with React Native's Image
 *   component. All images live in assets/images/ for cross-platform support.
 */

export interface GradientConfig {
  colors: string[];
  start: { x: number; y: number };
  end: { x: number; y: number };
}

// ─── Pixel-art background images ─────────────────────────────────────────────
// Each key MUST correspond to a file at assets/images/<key>.png
// and MUST match the `imageKey` field on a StoryNode.

export const BACKGROUND_IMAGES: Record<string, any> = {
  // Opening act — underground metro
  ruined_metro_station:   require('../assets/images/ruined_metro_station.png'),
  dark_metro_hallway:     require('../assets/images/dark_metro_hallway.png'),
  broken_vending_area:    require('../assets/images/broken_vending_area.png'),
  collapsed_tunnel:       require('../assets/images/collapsed_tunnel.png'),
  tunnel_camp:            require('../assets/images/tunnel_camp.png'),

  // Act 2 — surface & faction zones (Chapter 1)
  surface_ruins:          require('../assets/images/surface_ruins.png'),
  iron_saints_checkpoint: require('../assets/images/iron_saints_checkpoint.png'),
  glass_tower_gate:       require('../assets/images/glass_tower_gate.png'),
  red_choir_chamber:      require('../assets/images/red_choir_chamber.png'),

  // Chapter 2 — The Surface Does Not Forgive
  surface_dawn:           require('../assets/images/surface_dawn.png'),
  ruined_street:          require('../assets/images/ruined_street.png'),
  saints_patrol:          require('../assets/images/saints_patrol.png'),
  black_market_alley:     require('../assets/images/black_market_alley.png'),
  glass_tower_lobby:      require('../assets/images/glass_tower_lobby.png'),
  choir_broadcast_point:  require('../assets/images/choir_broadcast_point.png'),
  archive_ruin_wall:      require('../assets/images/archive_ruin_wall.png'),
  surface_night:          require('../assets/images/surface_night.png'),

  // Act 3 — the Archive
  last_archive_door:      require('../assets/images/last_archive_door.png'),

  // Chapter 3 — Children of the Tunnels
  candle_market:          require('../assets/images/candle_market.png'),
  bone_turnstile:         require('../assets/images/bone_turnstile.png'),
  flooded_platform:       require('../assets/images/flooded_platform.png'),
  nursery_of_knives:      require('../assets/images/nursery_of_knives.png'),
  chalk_map_wall:         require('../assets/images/chalk_map_wall.png'),
  rat_king_gate:          require('../assets/images/rat_king_gate.png'),
  hidden_clinic:          require('../assets/images/hidden_clinic.png'),
  relic_engine_room:      require('../assets/images/relic_engine_room.png'),

  // Chapter 1 — intimate mark-examination scenes (placeholder → dark metro hallway)
  examine_mark:           require('../assets/images/dark_metro_hallway.png'),

  // Chapter 4 — Saints in Iron (placeholder art → closest existing environment)
  // TODO: replace with dedicated Chapter 4 artwork
  iron_checkpoint:        require('../assets/images/iron_saints_checkpoint.png'),
  chapel_of_chains:       require('../assets/images/iron_saints_checkpoint.png'),
  purification_yard:      require('../assets/images/saints_patrol.png'),
  barracks_of_ash:        require('../assets/images/saints_patrol.png'),
  confession_hall:        require('../assets/images/iron_saints_checkpoint.png'),
  saint_furnace:          require('../assets/images/relic_engine_room.png'),
  prison_carts:           require('../assets/images/collapsed_tunnel.png'),
  war_shrine:             require('../assets/images/surface_ruins.png'),

  // Chapter 5 — The Glass Court (placeholder art → closest existing environment)
  // TODO: replace with dedicated Chapter 5 dark-luxury pixel art
  glass_gate:             require('../assets/images/glass_tower_gate.png'),
  ascension_elevator:     require('../assets/images/glass_tower_lobby.png'),
  white_atrium:           require('../assets/images/glass_tower_lobby.png'),
  hunger_gallery:         require('../assets/images/glass_tower_lobby.png'),
  orchid_clinic:          require('../assets/images/hidden_clinic.png'),
  mirror_ballroom:        require('../assets/images/glass_tower_lobby.png'),
  servant_quarters:       require('../assets/images/tunnel_camp.png'),
  experiment_ward:        require('../assets/images/hidden_clinic.png'),
  sky_garden:             require('../assets/images/surface_dawn.png'),
  council_chamber:        require('../assets/images/glass_tower_lobby.png'),
  cracked_observatory:    require('../assets/images/archive_ruin_wall.png'),
  private_auction_hall:   require('../assets/images/glass_tower_lobby.png'),

  // Chapter 6 — The Red Choir (placeholder art → closest existing environment)
  // TODO: replace with dedicated Chapter 6 dark-infection pixel art
  bloodlit_underpass:     require('../assets/images/collapsed_tunnel.png'),
  singing_hospital:       require('../assets/images/hidden_clinic.png'),
  red_chapel:             require('../assets/images/red_choir_chamber.png'),
  vein_market:            require('../assets/images/black_market_alley.png'),
  choir_nest:             require('../assets/images/red_choir_chamber.png'),
  silent_ward:            require('../assets/images/hidden_clinic.png'),
  pulse_tower:            require('../assets/images/relic_engine_room.png'),
  drowned_choir_hall:     require('../assets/images/flooded_platform.png'),
  infected_nursery:       require('../assets/images/nursery_of_knives.png'),
  crimson_relay:          require('../assets/images/choir_broadcast_point.png'),
  echo_chamber:           require('../assets/images/archive_ruin_wall.png'),

  // Chapter 7 — The Last Archive (placeholder art → closest existing environment)
  // TODO: replace with dedicated Chapter 7 archive/library pixel art
  door_without_name:      require('../assets/images/archive_ruin_wall.png'),
  dust_library:           require('../assets/images/archive_ruin_wall.png'),
  memory_vault:           require('../assets/images/relic_engine_room.png'),
  ink_chapel:             require('../assets/images/archive_ruin_wall.png'),
  broken_observatory:     require('../assets/images/surface_dawn.png'),
  relic_map_room:         require('../assets/images/relic_engine_room.png'),
  forbidden_stacks:       require('../assets/images/archive_ruin_wall.png'),
  archive_tribunal:       require('../assets/images/glass_tower_lobby.png'),
  hollow_lecture_hall:    require('../assets/images/glass_tower_lobby.png'),
  blackout_record_chamber: require('../assets/images/archive_ruin_wall.png'),
  sleeping_server:        require('../assets/images/relic_engine_room.png'),

  // Chapter 8 — Hunger War (placeholder art → closest existing environment)
  // TODO: replace with dedicated Chapter 8 famine/survival pixel art
  empty_ration_square:   require('../assets/images/collapsed_tunnel.png'),
  water_riot:            require('../assets/images/ruined_street.png'),
  burned_clinic:         require('../assets/images/hidden_clinic.png'),
  grain_vault:           require('../assets/images/relic_engine_room.png'),
  bone_soup_kitchen:     require('../assets/images/tunnel_camp.png'),
  scavenger_front:       require('../assets/images/surface_ruins.png'),
  broken_aqueduct:       require('../assets/images/flooded_platform.png'),
  famine_camp:           require('../assets/images/tunnel_camp.png'),
  dead_orchard:          require('../assets/images/surface_ruins.png'),
  siege_tunnels:         require('../assets/images/collapsed_tunnel.png'),
  starving_bridge:       require('../assets/images/ruined_metro_station.png'),

  // Chapter 9 — The Mark Awakens (placeholder art → closest existing environment)
  // TODO: replace with dedicated Chapter 9 mark/relic pixel art
  relic_scar:            require('../assets/images/relic_engine_room.png'),
  machine_graveyard:     require('../assets/images/collapsed_tunnel.png'),
  marked_shrine:         require('../assets/images/archive_ruin_wall.png'),
  memory_storm:          require('../assets/images/archive_ruin_wall.png'),
  pulse_engine:          require('../assets/images/relic_engine_room.png'),
  rust_cathedral:        require('../assets/images/ruined_metro_station.png'),
  broken_tram_core:      require('../assets/images/collapsed_tunnel.png'),
  old_signal_tower:      require('../assets/images/surface_ruins.png'),
  corruption_garden:     require('../assets/images/surface_ruins.png'),
  gate_fragment_chamber: require('../assets/images/relic_engine_room.png'),
  dream_of_before:       require('../assets/images/dark_metro_hallway.png'),

  // Chapter 10 — Broken Companions (placeholder art → closest existing environment)
  // TODO: replace with dedicated Chapter 10 companion/emotional pixel art
  quiet_safehouse:       require('../assets/images/collapsed_tunnel.png'),
  mira_hidden_clinic:    require('../assets/images/archive_ruin_wall.png'),
  cain_war_room:         require('../assets/images/relic_engine_room.png'),
  broken_bridge_camp:    require('../assets/images/ruined_metro_station.png'),
  betrayal_alley:        require('../assets/images/surface_ruins.png'),
  memory_shelter:        require('../assets/images/dark_metro_hallway.png'),
  companion_crossroads:  require('../assets/images/archive_ruin_wall.png'),
  last_medicine_room:    require('../assets/images/archive_ruin_wall.png'),
  soldiers_grave:        require('../assets/images/surface_ruins.png'),
  place_we_promised:     require('../assets/images/dark_metro_hallway.png'),
  empty_chair:           require('../assets/images/dark_metro_hallway.png'),

  // ── Chapter 12 — Crown of Ash ────────────────────────────────────────────
  // Placeholder art mapped to closest existing environment images.
  // TODO: Replace with dedicated city-war / faction-front pixel art.
  ashen_square:            require('../assets/images/surface_ruins.png'),
  war_council:             require('../assets/images/archive_ruin_wall.png'),
  burning_market:          require('../assets/images/tunnel_camp.png'),
  saint_front:             require('../assets/images/iron_saints_checkpoint.png'),
  glass_barricade:         require('../assets/images/glass_tower_gate.png'),
  red_choir_march:         require('../assets/images/red_choir_chamber.png'),
  archive_siege:           require('../assets/images/last_archive_door.png'),
  hollow_children_hideout: require('../assets/images/collapsed_tunnel.png'),
  broken_throne:           require('../assets/images/archive_ruin_wall.png'),
  execution_plaza:         require('../assets/images/surface_ruins.png'),
  citywide_battlefield:    require('../assets/images/surface_ruins.png'),

  // ── Chapter 11 — The City Beneath the City ──────────────────────────────
  // Placeholder art mapped to closest existing environment images.
  // TODO: Replace with dedicated sub-city / ancient-structure pixel art.
  sub_city_gate:           require('../assets/images/collapsed_tunnel.png'),
  forgotten_platform:      require('../assets/images/dark_metro_hallway.png'),
  underworld_district:     require('../assets/images/dark_metro_hallway.png'),
  relic_transit_line:      require('../assets/images/relic_engine_room.png'),
  sealed_engine:           require('../assets/images/relic_engine_room.png'),
  blackout_core:           require('../assets/images/archive_ruin_wall.png'),
  nameless_housing_block:  require('../assets/images/tunnel_camp.png'),
  old_government_vault:    require('../assets/images/archive_ruin_wall.png'),
  machine_nursery:         require('../assets/images/relic_engine_room.png'),
  deep_archive:            require('../assets/images/archive_ruin_wall.png'),
  first_gate:              require('../assets/images/relic_engine_room.png'),
};

// ─── Gradient fallbacks & transition colors ───────────────────────────────────
// Used when a key is NOT in BACKGROUND_IMAGES, or as the ambient color during
// cross-fade transitions. Each gradient should roughly match its image's mood.

export const BACKGROUND_GRADIENTS: Record<string, GradientConfig> = {
  ruined_metro_station: {
    colors: ['#0d0408', '#1a0608', '#0d0408', '#080306'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  dark_metro_hallway: {
    colors: ['#050508', '#0a0a10', '#050508', '#030305'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  broken_vending_area: {
    colors: ['#0a0808', '#140e08', '#0a0808', '#070505'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  collapsed_tunnel: {
    colors: ['#080608', '#100810', '#080608', '#050405'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  tunnel_camp: {
    colors: ['#0d0a06', '#1a1208', '#0d0a06', '#08070404'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  surface_ruins: {
    colors: ['#0a0814', '#160e20', '#0a0814', '#07060e'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  iron_saints_checkpoint: {
    colors: ['#080a08', '#0e140a', '#080a08', '#050705'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  glass_tower_gate: {
    colors: ['#08081a', '#0e0e2a', '#08081a', '#050510'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  red_choir_chamber: {
    colors: ['#140404', '#200808', '#140404', '#0a0202'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  last_archive_door: {
    colors: ['#0a0814', '#120f1f', '#1a1030', '#0a0814'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  // Chapter 2 gradients
  surface_dawn: {
    colors: ['#1a0e08', '#2a1a0a', '#1a1208', '#0e0a06'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  ruined_street: {
    colors: ['#0e0c10', '#18141e', '#0e0c10', '#08080e'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  saints_patrol: {
    colors: ['#080c08', '#0e1810', '#080c08', '#050805'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  black_market_alley: {
    colors: ['#0c0808', '#1a1008', '#0c0808', '#080606'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  glass_tower_lobby: {
    colors: ['#08081e', '#0c0c2e', '#08081e', '#050510'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  choir_broadcast_point: {
    colors: ['#180404', '#280606', '#180404', '#0c0202'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  archive_ruin_wall: {
    colors: ['#0c0a18', '#14102a', '#1c1438', '#0c0a18'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  surface_night: {
    colors: ['#060608', '#0c0c14', '#060608', '#040406'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  // Chapter 3 gradients — Children of the Tunnels
  candle_market: {
    colors: ['#1a0e04', '#2a1a06', '#1a0e04', '#0e0802'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  bone_turnstile: {
    colors: ['#0e0c0a', '#18140e', '#0e0c0a', '#08080608'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  flooded_platform: {
    colors: ['#04080e', '#060e18', '#04080e', '#020408'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  nursery_of_knives: {
    colors: ['#0c0808', '#180e0e', '#0c0808', '#080404'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  chalk_map_wall: {
    colors: ['#0a0c10', '#12141c', '#0a0c10', '#060810'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  rat_king_gate: {
    colors: ['#0c0a06', '#18140a', '#0c0a06', '#080604'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  hidden_clinic: {
    colors: ['#080c0a', '#0e1810', '#080c0a', '#040806'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  relic_engine_room: {
    colors: ['#060414', '#0c0624', '#180a3a', '#060414'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  // Chapter 1 — examine mark
  examine_mark: {
    colors: ['#050508', '#0a0a12', '#050508', '#030305'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  // Chapter 4 — Saints in Iron
  iron_checkpoint: {
    colors: ['#080c08', '#0e1810', '#080c08', '#050805'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  chapel_of_chains: {
    colors: ['#100804', '#1e1006', '#100804', '#080402'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  purification_yard: {
    colors: ['#0c0c0a', '#181610', '#0c0c0a', '#080806'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  barracks_of_ash: {
    colors: ['#0e0c08', '#1a1610', '#0e0c08', '#080604'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  confession_hall: {
    colors: ['#0a0806', '#160e08', '#0a0806', '#060402'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  saint_furnace: {
    colors: ['#1a0402', '#2e0604', '#1a0402', '#0c0202'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  prison_carts: {
    colors: ['#060808', '#0c1010', '#060808', '#040606'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  war_shrine: {
    colors: ['#0a0810', '#14101c', '#0a0810', '#060608'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  // Chapter 5 — The Glass Court (dark luxury dystopian — elegant cold white/gold)
  glass_gate: {
    colors: ['#0c0c1e', '#141428', '#0c1020', '#080810'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  ascension_elevator: {
    colors: ['#101018', '#181824', '#101018', '#080810'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  white_atrium: {
    colors: ['#14141e', '#1c1c2c', '#14141e', '#0c0c14'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  hunger_gallery: {
    colors: ['#0e0e18', '#161622', '#0e0e18', '#08080e'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  orchid_clinic: {
    colors: ['#0a1010', '#0e1a16', '#0a1010', '#060a08'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  mirror_ballroom: {
    colors: ['#0e0c18', '#1a1428', '#0e0c18', '#08060e'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  servant_quarters: {
    colors: ['#0c0a08', '#161208', '#0c0a08', '#080604'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  experiment_ward: {
    colors: ['#0a0e10', '#10161a', '#0a0e10', '#060a0c'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  sky_garden: {
    colors: ['#0c1210', '#101c14', '#0c1210', '#080c0a'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  council_chamber: {
    colors: ['#0c0c20', '#14142e', '#0c0c20', '#080812'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  cracked_observatory: {
    colors: ['#080c18', '#0e1224', '#080c18', '#040610'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  private_auction_hall: {
    colors: ['#10080e', '#1c0e18', '#10080e', '#080408'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  // Chapter 6 — The Red Choir (deep crimson infection palette)
  bloodlit_underpass: {
    colors: ['#0e0204', '#1a0406', '#0e0204', '#080102'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  singing_hospital: {
    colors: ['#0a0c0a', '#121814', '#0a0c0a', '#060806'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  red_chapel: {
    colors: ['#180202', '#280404', '#180202', '#0c0101'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  vein_market: {
    colors: ['#120404', '#1e0606', '#120404', '#0a0202'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  choir_nest: {
    colors: ['#1a0206', '#2a0408', '#1a0206', '#0e0103'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  silent_ward: {
    colors: ['#080c0c', '#0e1616', '#080c0c', '#040808'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  pulse_tower: {
    colors: ['#100204', '#1e0408', '#100204', '#080102'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  drowned_choir_hall: {
    colors: ['#04080e', '#060e1a', '#040c14', '#020608'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  infected_nursery: {
    colors: ['#0e0606', '#180a0a', '#0e0606', '#080303'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  crimson_relay: {
    colors: ['#140204', '#200408', '#140204', '#0a0102'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  echo_chamber: {
    colors: ['#080812', '#0e0e1e', '#08081a', '#040410'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  // Chapter 7 — The Last Archive (deep indigo / muted amber archive palette)
  door_without_name: {
    colors: ['#080812', '#0e0e1c', '#080812', '#04040c'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  dust_library: {
    colors: ['#0c0a08', '#18140e', '#0c0a08', '#080705'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  memory_vault: {
    colors: ['#06080e', '#0c1018', '#060c14', '#040608'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  ink_chapel: {
    colors: ['#08080c', '#10101a', '#08080e', '#050508'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  broken_observatory: {
    colors: ['#0a0c10', '#121620', '#0a0c14', '#060810'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  relic_map_room: {
    colors: ['#080c0a', '#0e1810', '#080e0a', '#040806'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  forbidden_stacks: {
    colors: ['#060408', '#0c0810', '#060408', '#040306'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  archive_tribunal: {
    colors: ['#0a0808', '#160e0c', '#0a0808', '#070504'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  hollow_lecture_hall: {
    colors: ['#0c0c0a', '#181610', '#0c0c0a', '#080806'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  blackout_record_chamber: {
    colors: ['#080608', '#100c10', '#080608', '#050405'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  sleeping_server: {
    colors: ['#04080c', '#080e18', '#040c14', '#020608'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  empty_ration_square: {
    colors: ['#0c0a06', '#1a1408', '#0c0a06', '#080604'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  water_riot: {
    colors: ['#060a10', '#0c1420', '#060a10', '#040608'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  burned_clinic: {
    colors: ['#0e0808', '#1a1008', '#0e0808', '#090504'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  grain_vault: {
    colors: ['#080c08', '#101810', '#080c08', '#050806'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  bone_soup_kitchen: {
    colors: ['#0e0a04', '#1c1408', '#0e0a04', '#090704'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  scavenger_front: {
    colors: ['#080a08', '#101410', '#080a08', '#050705'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  broken_aqueduct: {
    colors: ['#060c10', '#0a1420', '#060c10', '#040810'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  famine_camp: {
    colors: ['#0c0804', '#180e06', '#0c0804', '#080504'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  dead_orchard: {
    colors: ['#080a06', '#101406', '#080a06', '#060704'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  siege_tunnels: {
    colors: ['#080608', '#100a10', '#080608', '#050405'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  starving_bridge: {
    colors: ['#0a0a0e', '#12121c', '#0a0a0e', '#070708'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  // Chapter 9 — The Mark Awakens
  relic_scar: {
    colors: ['#080414', '#120624', '#1a083a', '#080414'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  machine_graveyard: {
    colors: ['#06080a', '#0c1014', '#060a0e', '#040608'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  marked_shrine: {
    colors: ['#0a0810', '#14101e', '#0a0814', '#06060c'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  memory_storm: {
    colors: ['#080c1a', '#0c1430', '#060e24', '#040810'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  pulse_engine: {
    colors: ['#06041c', '#0a0630', '#12083e', '#060418'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  rust_cathedral: {
    colors: ['#100a04', '#1e1406', '#160e04', '#0a0702'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  broken_tram_core: {
    colors: ['#080808', '#101010', '#080808', '#060606'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  old_signal_tower: {
    colors: ['#0c0c10', '#16141e', '#0c0c14', '#080810'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  corruption_garden: {
    colors: ['#040e06', '#061808', '#04100a', '#020804'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  gate_fragment_chamber: {
    colors: ['#06040e', '#0e0820', '#160a30', '#06040c'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  dream_of_before: {
    colors: ['#0a0a16', '#12122a', '#0c0c20', '#060610'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  // Chapter 10 — Broken Companions
  quiet_safehouse: {
    colors: ['#080808', '#0e0e10', '#0a0a0c', '#060606'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  mira_hidden_clinic: {
    colors: ['#06080e', '#0a1018', '#060810', '#040608'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  cain_war_room: {
    colors: ['#0a0806', '#160e08', '#0e0a06', '#080604'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  broken_bridge_camp: {
    colors: ['#060a0c', '#0a1214', '#060a0e', '#04080a'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  betrayal_alley: {
    colors: ['#080810', '#10101e', '#080814', '#04040a'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  memory_shelter: {
    colors: ['#0a0c10', '#141620', '#0c0e16', '#06080c'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  companion_crossroads: {
    colors: ['#080a10', '#10121e', '#080a14', '#04060a'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  last_medicine_room: {
    colors: ['#060c0a', '#0a1610', '#060e0c', '#040806'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  soldiers_grave: {
    colors: ['#060608', '#0c0c10', '#080808', '#040406'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  place_we_promised: {
    colors: ['#08080e', '#10101a', '#0a0a12', '#060608'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  empty_chair: {
    colors: ['#040404', '#080808', '#060606', '#020202'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  // ── Chapter 12 gradients ──────────────────────────────────────────────────
  ashen_square: {
    colors: ['#100a06', '#1e1008', '#100a06', '#0a0704'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  war_council: {
    colors: ['#080a0c', '#10141a', '#080a0c', '#050608'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  burning_market: {
    colors: ['#140a06', '#241208', '#140a06', '#0e0704'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  saint_front: {
    colors: ['#0a0c08', '#14180e', '#0a0c08', '#060808'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  glass_barricade: {
    colors: ['#080c14', '#0e1422', '#080c14', '#05080e'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  red_choir_march: {
    colors: ['#14060a', '#240a10', '#14060a', '#0e0406'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  archive_siege: {
    colors: ['#060810', '#0a0e1e', '#060810', '#04060c'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  hollow_children_hideout: {
    colors: ['#080806', '#10100a', '#080806', '#060604'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  broken_throne: {
    colors: ['#0c080a', '#1a0e10', '#0c080a', '#080506'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  execution_plaza: {
    colors: ['#140606', '#240a0a', '#140606', '#0e0404'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  citywide_battlefield: {
    colors: ['#100c06', '#1e1608', '#100c06', '#0a0904'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },

  // ── Chapter 11 gradients ──────────────────────────────────────────────────
  sub_city_gate: {
    colors: ['#060408', '#0c0810', '#060408', '#040306'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  forgotten_platform: {
    colors: ['#050508', '#0a0a12', '#050508', '#030306'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  underworld_district: {
    colors: ['#060508', '#0c0a10', '#060508', '#040306'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  relic_transit_line: {
    colors: ['#060810', '#0a0e1e', '#060810', '#04060c'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  sealed_engine: {
    colors: ['#080a06', '#10140a', '#080a06', '#050705'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  blackout_core: {
    colors: ['#0a0614', '#160a24', '#0a0614', '#07040e'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  nameless_housing_block: {
    colors: ['#0a0806', '#14100a', '#0a0806', '#070604'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  old_government_vault: {
    colors: ['#0c0a18', '#14102a', '#0c0a18', '#08060e'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  machine_nursery: {
    colors: ['#060a08', '#0a1410', '#060a08', '#040706'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  deep_archive: {
    colors: ['#080618', '#10082a', '#08061c', '#050410'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
  first_gate: {
    colors: ['#0a0814', '#160e24', '#0a0814', '#07060e'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },

  // Generic fallback for any key not listed above
  default: {
    colors: ['#0a0a14', '#12121f', '#0a0a14', '#080810'],
    start: { x: 0, y: 0 }, end: { x: 0, y: 1 },
  },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Returns the require() bundle for a background image key, or null if the key
 * is not registered. BackgroundPanel uses null to trigger the gradient fallback.
 */
export function getBackgroundImage(key: string): any | null {
  return BACKGROUND_IMAGES[key] ?? null;
}

/**
 * Returns a GradientConfig for a given key. Falls back to 'default' if the key
 * has no specific gradient defined.
 */
export function getBackgroundGradient(key: string): GradientConfig {
  return BACKGROUND_GRADIENTS[key] ?? BACKGROUND_GRADIENTS['default'];
}
