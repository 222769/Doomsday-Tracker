// data.js
// The real watch order: every mainline Marvel Cinematic Universe movie and
// series, the Disney+ "side story" shows, the pre-Disney+ "Netflix corner"
// (Daredevil, Jessica Jones, The Punisher) that Daredevil: Born Again
// directly continues, plus the non-MCU "guest" tier — Fox's X-Men series
// and the Raimi/Webb Spider-Man films — that Avengers: Doomsday is
// reportedly pulling back in via the multiverse. Covers everything from
// X-Men (2000) through Avengers: Doomsday (Dec 18, 2026).
//
// This is an independent, fan-made list — not an official Marvel Studios,
// Disney, Netflix, Fox, or Sony publication. Release dates and runtimes are
// drawn from public sources; timelineOrder reflects the commonly cited
// fan-consensus in-universe chronology (not an official numbered canon —
// Marvel has never published one).
//
// releaseOrder is grouped by tier rather than strictly interleaved by
// real-world date: the mainline MCU/Disney+ track (1-57), then the guest
// tier (58-75), then the Netflix corner (76-81) — so, for example, the
// Netflix corner's 2015 premiere doesn't get interleaved into the middle
// of the mainline track. The guest-tier films belong to their own
// separate continuities (the Fox-verse, the Raimi-verse, the Webb-verse);
// timelineOrder places each block at the point it's pulled into the main
// story via a multiverse crossover, not as a literal claim that they share
// Earth-616's timeline. The Netflix corner *is* Earth-616 continuity, but
// for timelineOrder it's likewise placed as one block right before
// Daredevil: Born Again — the point it's actually relevant to watch —
// rather than scattered across 2015-2019 mid-list; if you'd rather slot
// it in strictly by date, that's a one-line change to each item's
// timelineOrder below.
//
// Shape of each item:
//   id             - unique string, used as the localStorage key (for movies)
//   title          - display name
//   type           - "movie" | "show"
//   releaseOrder   - integer, position in real-world release order
//   timelineOrder  - integer, position in in-universe chronological order
//   runtimeMinutes - movies only; total watch time in minutes
//   episodes       - shows only; array of { id, title, runtimeMinutes, spoiler? } —
//                    each episode id is its own localStorage key, so
//                    progress is tracked per episode, not per show.
//                    spoiler, where present, is a short note on how that
//                    episode connects to the wider story — hidden behind
//                    a tap-to-reveal warning in the UI, never shown by
//                    default. Most episodes have none; only the ones with
//                    a genuine connection (a reveal, a setup for another
//                    title) carry one — this isn't a full recap.
//   notes          - optional short blurb shown under the title
//   stopPoint      - optional string, e.g. "watch through S1E4 only"

export const items = [
  { id: "x-men", title: "X-Men", type: "movie", releaseOrder: 58, timelineOrder: 50, runtimeMinutes: 104, notes: "Opens Fox's original X-Men series — folded into the multiverse alongside Deadpool & Wolverine and, reportedly, Doomsday itself." },
  { id: "spider-man-2002", title: "Spider-Man", type: "movie", releaseOrder: 59, timelineOrder: 33, runtimeMinutes: 121, notes: "Opens Sam Raimi's trilogy — this Peter Parker reappears via No Way Home's multiverse crossover." },
  { id: "x2-x-men-united", title: "X2: X-Men United", type: "movie", releaseOrder: 60, timelineOrder: 51, runtimeMinutes: 134 },
  { id: "spider-man-2-2004", title: "Spider-Man 2", type: "movie", releaseOrder: 61, timelineOrder: 34, runtimeMinutes: 127 },
  { id: "x-men-last-stand", title: "X-Men: The Last Stand", type: "movie", releaseOrder: 62, timelineOrder: 52, runtimeMinutes: 104 },
  { id: "spider-man-3-2007", title: "Spider-Man 3", type: "movie", releaseOrder: 63, timelineOrder: 35, runtimeMinutes: 139 },
  { id: "iron-man", title: "Iron Man", type: "movie", releaseOrder: 1, timelineOrder: 3, runtimeMinutes: 126 },
  { id: "incredible-hulk", title: "The Incredible Hulk", type: "movie", releaseOrder: 2, timelineOrder: 5, runtimeMinutes: 112, notes: "Often skipped today — Mark Ruffalo replaces Edward Norton as Banner from here on." },
  { id: "x-men-origins-wolverine", title: "X-Men Origins: Wolverine", type: "movie", releaseOrder: 64, timelineOrder: 53, runtimeMinutes: 107 },
  { id: "iron-man-2", title: "Iron Man 2", type: "movie", releaseOrder: 3, timelineOrder: 4, runtimeMinutes: 124 },
  { id: "thor", title: "Thor", type: "movie", releaseOrder: 4, timelineOrder: 6, runtimeMinutes: 115 },
  { id: "x-men-first-class", title: "X-Men: First Class", type: "movie", releaseOrder: 65, timelineOrder: 54, runtimeMinutes: 131 },
  { id: "captain-america-first-avenger", title: "Captain America: The First Avenger", type: "movie", releaseOrder: 5, timelineOrder: 1, runtimeMinutes: 124 },
  { id: "the-avengers", title: "The Avengers", type: "movie", releaseOrder: 6, timelineOrder: 7, runtimeMinutes: 143 },
  { id: "amazing-spider-man", title: "The Amazing Spider-Man", type: "movie", releaseOrder: 66, timelineOrder: 36, runtimeMinutes: 136, notes: "Begins the Andrew Garfield era — also folded in by No Way Home." },
  { id: "iron-man-3", title: "Iron Man 3", type: "movie", releaseOrder: 7, timelineOrder: 9, runtimeMinutes: 130 },
  { id: "the-wolverine", title: "The Wolverine", type: "movie", releaseOrder: 67, timelineOrder: 55, runtimeMinutes: 126 },
  { id: "thor-dark-world", title: "Thor: The Dark World", type: "movie", releaseOrder: 8, timelineOrder: 8, runtimeMinutes: 112 },
  { id: "captain-america-winter-soldier", title: "Captain America: The Winter Soldier", type: "movie", releaseOrder: 9, timelineOrder: 10, runtimeMinutes: 136 },
  { id: "amazing-spider-man-2", title: "The Amazing Spider-Man 2", type: "movie", releaseOrder: 68, timelineOrder: 37, runtimeMinutes: 142 },
  { id: "x-men-days-of-future-past", title: "X-Men: Days of Future Past", type: "movie", releaseOrder: 69, timelineOrder: 56, runtimeMinutes: 132 },
  { id: "guardians-of-the-galaxy", title: "Guardians of the Galaxy", type: "movie", releaseOrder: 10, timelineOrder: 11, runtimeMinutes: 121 },
  { id: "avengers-age-of-ultron", title: "Avengers: Age of Ultron", type: "movie", releaseOrder: 11, timelineOrder: 13, runtimeMinutes: 141 },
  { id: "ant-man", title: "Ant-Man", type: "movie", releaseOrder: 12, timelineOrder: 14, runtimeMinutes: 117 },
  { id: "deadpool", title: "Deadpool", type: "movie", releaseOrder: 70, timelineOrder: 57, runtimeMinutes: 108 },
  { id: "captain-america-civil-war", title: "Captain America: Civil War", type: "movie", releaseOrder: 13, timelineOrder: 15, runtimeMinutes: 147 },
  { id: "x-men-apocalypse", title: "X-Men: Apocalypse", type: "movie", releaseOrder: 71, timelineOrder: 58, runtimeMinutes: 144 },
  { id: "doctor-strange", title: "Doctor Strange", type: "movie", releaseOrder: 14, timelineOrder: 18, runtimeMinutes: 115 },
  { id: "logan", title: "Logan", type: "movie", releaseOrder: 72, timelineOrder: 59, runtimeMinutes: 137 },
  { id: "guardians-of-the-galaxy-vol-2", title: "Guardians of the Galaxy Vol. 2", type: "movie", releaseOrder: 15, timelineOrder: 12, runtimeMinutes: 136 },
  { id: "spider-man-homecoming", title: "Spider-Man: Homecoming", type: "movie", releaseOrder: 16, timelineOrder: 17, runtimeMinutes: 133 },
  { id: "thor-ragnarok", title: "Thor: Ragnarok", type: "movie", releaseOrder: 17, timelineOrder: 20, runtimeMinutes: 130 },
  { id: "black-panther", title: "Black Panther", type: "movie", releaseOrder: 18, timelineOrder: 19, runtimeMinutes: 134 },
  { id: "avengers-infinity-war", title: "Avengers: Infinity War", type: "movie", releaseOrder: 19, timelineOrder: 21, runtimeMinutes: 149 },
  { id: "deadpool-2", title: "Deadpool 2", type: "movie", releaseOrder: 73, timelineOrder: 60, runtimeMinutes: 119 },
  { id: "ant-man-and-the-wasp", title: "Ant-Man and the Wasp", type: "movie", releaseOrder: 20, timelineOrder: 22, runtimeMinutes: 118 },
  { id: "captain-marvel", title: "Captain Marvel", type: "movie", releaseOrder: 21, timelineOrder: 2, runtimeMinutes: 123, notes: "Set in 1995 — chronologically early despite its release date." },
  { id: "avengers-endgame", title: "Avengers: Endgame", type: "movie", releaseOrder: 22, timelineOrder: 23, runtimeMinutes: 181, notes: "The Infinity Saga payoff. Essential." },
  { id: "dark-phoenix", title: "Dark Phoenix", type: "movie", releaseOrder: 74, timelineOrder: 61, runtimeMinutes: 113 },
  { id: "spider-man-far-from-home", title: "Spider-Man: Far From Home", type: "movie", releaseOrder: 23, timelineOrder: 28, runtimeMinutes: 129 },
  { id: "the-new-mutants", title: "The New Mutants", type: "movie", releaseOrder: 75, timelineOrder: 62, runtimeMinutes: 94 },
  {
    id: "wandavision", title: "WandaVision", type: "show", releaseOrder: 24, timelineOrder: 26,
    notes: "Sets up Wanda's arc for Doctor Strange in the Multiverse of Madness.",
    episodes: [
      { id: "wandavision-e1", title: "Filmed Before a Live Studio Audience", runtimeMinutes: 30 },
      { id: "wandavision-e2", title: "Don't Touch That Dial", runtimeMinutes: 37 },
      { id: "wandavision-e3", title: "Now in Color", runtimeMinutes: 33 },
      { id: "wandavision-e4", title: "We Interrupt This Program", runtimeMinutes: 35 },
      { id: "wandavision-e5", title: "On a Very Special Episode...", runtimeMinutes: 41 },
      { id: "wandavision-e6", title: "All-New Halloween Spooktacular!", runtimeMinutes: 38 },
      { id: "wandavision-e7", title: "Breaking the Fourth Wall", runtimeMinutes: 38, spoiler: "\"Agnes\" is revealed to be Agatha Harkness, a centuries-old witch who has been manipulating events from the start." },
      { id: "wandavision-e8", title: "Previously On", runtimeMinutes: 46 },
      { id: "wandavision-e9", title: "The Series Finale", runtimeMinutes: 50, spoiler: "Wanda becomes the Scarlet Witch and takes the Darkhold — directly setting up Doctor Strange in the Multiverse of Madness." },
    ],
  },
  {
    id: "falcon-and-winter-soldier", title: "The Falcon and the Winter Soldier", type: "show", releaseOrder: 25, timelineOrder: 27,
    notes: "Sam Wilson takes up the Captain America shield.",
    episodes: [
      { id: "falcon-and-winter-soldier-e1", title: "New World Order", runtimeMinutes: 49 },
      { id: "falcon-and-winter-soldier-e2", title: "The Star-Spangled Man", runtimeMinutes: 50 },
      { id: "falcon-and-winter-soldier-e3", title: "Power Broker", runtimeMinutes: 53 },
      { id: "falcon-and-winter-soldier-e4", title: "The Whole World is Watching", runtimeMinutes: 50 },
      { id: "falcon-and-winter-soldier-e5", title: "Truth", runtimeMinutes: 60 },
      { id: "falcon-and-winter-soldier-e6", title: "One World, One People", runtimeMinutes: 50, spoiler: "Sam Wilson becomes the new Captain America, and Sharon Carter is revealed to be the Power Broker — a thread that resurfaces in Captain America: Brave New World and Thunderbolts*." },
    ],
  },
  {
    id: "loki-season-1", title: "Loki (Season 1)", type: "show", releaseOrder: 26, timelineOrder: 24,
    notes: "Branches the multiverse — required viewing for everything that follows.",
    episodes: [
      { id: "loki-season-1-e1", title: "Glorious Purpose", runtimeMinutes: 52 },
      { id: "loki-season-1-e2", title: "The Variant", runtimeMinutes: 54 },
      { id: "loki-season-1-e3", title: "Lamentis", runtimeMinutes: 42 },
      { id: "loki-season-1-e4", title: "The Nexus Event", runtimeMinutes: 48 },
      { id: "loki-season-1-e5", title: "Journey into Mystery", runtimeMinutes: 49 },
      { id: "loki-season-1-e6", title: "For All Time. Always.", runtimeMinutes: 46, spoiler: "Loki meets He Who Remains, a Kang variant, at the end of time — his death fractures the Sacred Timeline into the multiverse that Doctor Strange 2, Loki Season 2, and eventually Doomsday all deal with." },
    ],
  },
  { id: "black-widow", title: "Black Widow", type: "movie", releaseOrder: 27, timelineOrder: 16, runtimeMinutes: 134, notes: "A flashback set between Civil War and Infinity War." },
  {
    id: "what-if", title: "What If...? (Seasons 1-3)", type: "show", releaseOrder: 28, timelineOrder: 25,
    notes: "Animated anthology exploring alternate timelines.",
    stopPoint: "widely considered optional — most viewers skip it entirely except episodes that tie into live-action events",
    episodes: [
      { id: "what-if-s1e1", title: "S1: What If... Captain Carter Were the First Avenger?", runtimeMinutes: 34 },
      { id: "what-if-s1e2", title: "S1: What If... T'Challa Became a Star-Lord?", runtimeMinutes: 32 },
      { id: "what-if-s1e3", title: "S1: What If... the World Lost Its Mightiest Heroes?", runtimeMinutes: 34 },
      { id: "what-if-s1e4", title: "S1: What If... Doctor Strange Lost His Heart Instead of His Hands?", runtimeMinutes: 32 },
      { id: "what-if-s1e5", title: "S1: What If... Zombies?!", runtimeMinutes: 32 },
      { id: "what-if-s1e6", title: "S1: What If... Killmonger Rescued Tony Stark?", runtimeMinutes: 31 },
      { id: "what-if-s1e7", title: "S1: What If... Thor Were an Only Child?", runtimeMinutes: 32 },
      { id: "what-if-s1e8", title: "S1: What If... Ultron Won?", runtimeMinutes: 34 },
      { id: "what-if-s1e9", title: "S1: What If... the Watcher Broke His Oath?", runtimeMinutes: 34 },
      { id: "what-if-s2e1", title: "S2: What If... Nebula Joined the Nova Corps?", runtimeMinutes: 31 },
      { id: "what-if-s2e2", title: "S2: What If... Peter Quill Attacked Earth's Mightiest Heroes?", runtimeMinutes: 31 },
      { id: "what-if-s2e3", title: "S2: What If... Happy Hogan Saved Christmas?", runtimeMinutes: 32 },
      { id: "what-if-s2e4", title: "S2: What If... Iron Man Crashed Into the Grandmaster?", runtimeMinutes: 31 },
      { id: "what-if-s2e5", title: "S2: What If... Captain Carter Fought the Hydra Stomper?", runtimeMinutes: 32 },
      { id: "what-if-s2e6", title: "S2: What If... Kahhori Reshaped the World?", runtimeMinutes: 33 },
      { id: "what-if-s2e7", title: "S2: What If... Hela Found the Ten Rings?", runtimeMinutes: 32 },
      { id: "what-if-s2e8", title: "S2: What If... the Avengers Assembled in 1602?", runtimeMinutes: 33 },
      { id: "what-if-s2e9", title: "S2: What If... Strange Supreme Intervened?", runtimeMinutes: 34 },
      { id: "what-if-s3e1", title: "S3: What If... the Hulk Fought the Mech Avengers?", runtimeMinutes: 32 },
      { id: "what-if-s3e2", title: "S3: What If... Agatha Went to Hollywood?", runtimeMinutes: 32 },
      { id: "what-if-s3e3", title: "S3: What If... the Red Guardian Stopped the Winter Soldier?", runtimeMinutes: 31 },
      { id: "what-if-s3e4", title: "S3: What If... Howard the Duck Got Hitched?", runtimeMinutes: 31 },
      { id: "what-if-s3e5", title: "S3: What If... the Emergence Destroyed the Earth?", runtimeMinutes: 33 },
      { id: "what-if-s3e6", title: "S3: What If... 1872?", runtimeMinutes: 32 },
      { id: "what-if-s3e7", title: "S3: What If... the Watcher Disappeared?", runtimeMinutes: 33 },
      { id: "what-if-s3e8", title: "S3: What If... (Series Finale)", runtimeMinutes: 35 },
    ],
  },
  { id: "shang-chi", title: "Shang-Chi and the Legend of the Ten Rings", type: "movie", releaseOrder: 29, timelineOrder: 29, runtimeMinutes: 132 },
  { id: "eternals", title: "Eternals", type: "movie", releaseOrder: 30, timelineOrder: 30, runtimeMinutes: 156 },
  {
    id: "hawkeye", title: "Hawkeye", type: "show", releaseOrder: 31, timelineOrder: 31,
    notes: "Introduces Kate Bishop.",
    episodes: [
      { id: "hawkeye-e1", title: "Never Meet Your Heroes", runtimeMinutes: 47 },
      { id: "hawkeye-e2", title: "Hide and Seek", runtimeMinutes: 51 },
      { id: "hawkeye-e3", title: "Echoes", runtimeMinutes: 43 },
      { id: "hawkeye-e4", title: "Partners, Am I Right?", runtimeMinutes: 45 },
      { id: "hawkeye-e5", title: "Ronin", runtimeMinutes: 44 },
      { id: "hawkeye-e6", title: "So This Is Christmas?", runtimeMinutes: 55, spoiler: "A post-credits scene reveals Wilson Fisk (Kingpin) survived being shot — setting up Echo and Daredevil: Born Again." },
    ],
  },
  { id: "spider-man-no-way-home", title: "Spider-Man: No Way Home", type: "movie", releaseOrder: 32, timelineOrder: 32, runtimeMinutes: 148, notes: "The multiverse crossover that pulls in the Raimi and Webb-era Spider-Men." },
  {
    id: "moon-knight", title: "Moon Knight", type: "show", releaseOrder: 33, timelineOrder: 38,
    notes: "Self-contained — minimal ties to the wider saga so far.",
    episodes: [
      { id: "moon-knight-e1", title: "The Goldfish Problem", runtimeMinutes: 47 },
      { id: "moon-knight-e2", title: "Summon the Suit", runtimeMinutes: 50 },
      { id: "moon-knight-e3", title: "The Friendly Type", runtimeMinutes: 50 },
      { id: "moon-knight-e4", title: "The Tomb", runtimeMinutes: 51 },
      { id: "moon-knight-e5", title: "Asylum", runtimeMinutes: 49 },
      { id: "moon-knight-e6", title: "Gods and Monsters", runtimeMinutes: 50 },
    ],
  },
  { id: "doctor-strange-multiverse-of-madness", title: "Doctor Strange in the Multiverse of Madness", type: "movie", releaseOrder: 34, timelineOrder: 39, runtimeMinutes: 126, notes: "Introduces key multiverse rules that carry through to Doomsday." },
  {
    id: "ms-marvel", title: "Ms. Marvel", type: "show", releaseOrder: 35, timelineOrder: 40,
    notes: "Sets up Kamala Khan ahead of The Marvels.",
    episodes: [
      { id: "ms-marvel-e1", title: "Generation Why", runtimeMinutes: 38 },
      { id: "ms-marvel-e2", title: "Crushed", runtimeMinutes: 39 },
      { id: "ms-marvel-e3", title: "Destined", runtimeMinutes: 37 },
      { id: "ms-marvel-e4", title: "Seeing Red", runtimeMinutes: 40 },
      { id: "ms-marvel-e5", title: "Time and Again", runtimeMinutes: 38 },
      { id: "ms-marvel-e6", title: "No Normal", runtimeMinutes: 40, spoiler: "A post-credits scene ties Kamala Khan's powers to mutant genetics, not just her bangle — connecting her to the X-Men thread Doomsday is expected to bring into the MCU." },
    ],
  },
  { id: "thor-love-and-thunder", title: "Thor: Love and Thunder", type: "movie", releaseOrder: 36, timelineOrder: 41, runtimeMinutes: 119 },
  {
    id: "she-hulk", title: "She-Hulk: Attorney at Law", type: "show", releaseOrder: 37, timelineOrder: 42,
    notes: "Mostly self-contained; the finale breaks the fourth wall.",
    episodes: [
      { id: "she-hulk-e1", title: "A Normal Amount of Rage", runtimeMinutes: 33 },
      { id: "she-hulk-e2", title: "Superhuman Law", runtimeMinutes: 34 },
      { id: "she-hulk-e3", title: "The People vs. Emil Blonsky", runtimeMinutes: 36 },
      { id: "she-hulk-e4", title: "Is This Not Real Magic?", runtimeMinutes: 33 },
      { id: "she-hulk-e5", title: "Mean, Green, and Straight Poured into These Jeans", runtimeMinutes: 32 },
      { id: "she-hulk-e6", title: "Just Jen", runtimeMinutes: 30 },
      { id: "she-hulk-e7", title: "The Retreat", runtimeMinutes: 35 },
      { id: "she-hulk-e8", title: "Ribbit and Rip It", runtimeMinutes: 36 },
      { id: "she-hulk-e9", title: "Whose Show Is This?", runtimeMinutes: 38, spoiler: "Jennifer breaks the fourth wall to confront the show's writers directly, and Matt Murdock (Daredevil) appears as a legal favor — connecting to Daredevil: Born Again." },
    ],
  },
  { id: "black-panther-wakanda-forever", title: "Black Panther: Wakanda Forever", type: "movie", releaseOrder: 38, timelineOrder: 43, runtimeMinutes: 161 },
  { id: "ant-man-quantumania", title: "Ant-Man and the Wasp: Quantumania", type: "movie", releaseOrder: 39, timelineOrder: 45, runtimeMinutes: 125 },
  { id: "guardians-of-the-galaxy-vol-3", title: "Guardians of the Galaxy Vol. 3", type: "movie", releaseOrder: 40, timelineOrder: 46, runtimeMinutes: 150 },
  {
    id: "secret-invasion", title: "Secret Invasion", type: "show", releaseOrder: 41, timelineOrder: 44,
    notes: "Establishes the Skrull infiltration thread.",
    stopPoint: "if short on time, the finale (S1E6) is the only essential episode",
    episodes: [
      { id: "secret-invasion-e1", title: "Resurrection", runtimeMinutes: 43 },
      { id: "secret-invasion-e2", title: "Promises", runtimeMinutes: 45 },
      { id: "secret-invasion-e3", title: "Betrayed", runtimeMinutes: 42 },
      { id: "secret-invasion-e4", title: "Beloved", runtimeMinutes: 38 },
      { id: "secret-invasion-e5", title: "Harvest", runtimeMinutes: 40 },
      { id: "secret-invasion-e6", title: "Home", runtimeMinutes: 34, spoiler: "After a Skrull impersonating Rhodey is exposed, President Ritson declares all Skrulls enemies of the state — a xenophobic policy shift that ripples into later political plotlines." },
    ],
  },
  {
    id: "loki-season-2", title: "Loki (Season 2)", type: "show", releaseOrder: 42, timelineOrder: 47,
    notes: "Resolves the TVA storyline and reshapes the multiverse's branches.",
    episodes: [
      { id: "loki-season-2-e1", title: "Ouroboros", runtimeMinutes: 47 },
      { id: "loki-season-2-e2", title: "Breaking Brad", runtimeMinutes: 51 },
      { id: "loki-season-2-e3", title: "1893", runtimeMinutes: 55 },
      { id: "loki-season-2-e4", title: "Heart of the TVA", runtimeMinutes: 50 },
      { id: "loki-season-2-e5", title: "Science/Fiction", runtimeMinutes: 50 },
      { id: "loki-season-2-e6", title: "Glorious Purpose", runtimeMinutes: 58, spoiler: "Loki chooses to hold every branched timeline together himself on the Temporal Loom, becoming \"the god of stories\" — the multiverse's fragile new stability going into Doomsday rests on this choice." },
    ],
  },
  { id: "the-marvels", title: "The Marvels", type: "movie", releaseOrder: 43, timelineOrder: 48, runtimeMinutes: 105 },
  {
    id: "echo", title: "Echo", type: "show", releaseOrder: 44, timelineOrder: 49,
    notes: "Follow-up to Hawkeye's Kingpin/Maya Lopez thread.",
    episodes: [
      { id: "echo-e1", title: "Chafa", runtimeMinutes: 49 },
      { id: "echo-e2", title: "Lowak", runtimeMinutes: 39 },
      { id: "echo-e3", title: "Tuklo", runtimeMinutes: 42 },
      { id: "echo-e4", title: "Taloa", runtimeMinutes: 37 },
      { id: "echo-e5", title: "Maya", runtimeMinutes: 34, spoiler: "Wilson Fisk (Kingpin) survives Maya's attempt on his life and doubles down on his plans for New York — picked up directly in Daredevil: Born Again." },
    ],
  },
  { id: "deadpool-and-wolverine", title: "Deadpool & Wolverine", type: "movie", releaseOrder: 45, timelineOrder: 63, runtimeMinutes: 128, notes: "Folds in Fox's X-Men-era multiverse — directly relevant to Doomsday's cast." },
  {
    id: "daredevil-season-1", title: "Daredevil (Season 1)", type: "show", releaseOrder: 76, timelineOrder: 65,
    notes: "The Netflix corner: Matt Murdock's origin as Daredevil, and Wilson Fisk's rise as Kingpin. Placed here as backstory for Daredevil: Born Again, though it originally aired in 2015.",
    episodes: [
      { id: "daredevil-season-1-e1", title: "Into the Ring", runtimeMinutes: 54 },
      { id: "daredevil-season-1-e2", title: "Cut Man", runtimeMinutes: 54 },
      { id: "daredevil-season-1-e3", title: "Rabbit in a Snowstorm", runtimeMinutes: 53 },
      { id: "daredevil-season-1-e4", title: "In the Blood", runtimeMinutes: 49 },
      { id: "daredevil-season-1-e5", title: "World on Fire", runtimeMinutes: 47 },
      { id: "daredevil-season-1-e6", title: "Condemned", runtimeMinutes: 50 },
      { id: "daredevil-season-1-e7", title: "Stick", runtimeMinutes: 50 },
      { id: "daredevil-season-1-e8", title: "Shadows in the Glass", runtimeMinutes: 50 },
      { id: "daredevil-season-1-e9", title: "Speak of the Devil", runtimeMinutes: 49 },
      { id: "daredevil-season-1-e10", title: "Nelson v. Murdock", runtimeMinutes: 50 },
      { id: "daredevil-season-1-e11", title: "The Path of the Righteous", runtimeMinutes: 49 },
      { id: "daredevil-season-1-e12", title: "The Ones We Leave Behind", runtimeMinutes: 49 },
      { id: "daredevil-season-1-e13", title: "Daredevil", runtimeMinutes: 61, spoiler: "Matt Murdock puts on the horned Daredevil suit for the first time and puts Wilson Fisk behind bars — the status quo Daredevil: Born Again opens by upending." },
    ],
  },
  {
    id: "jessica-jones-season-1", title: "Jessica Jones (Season 1)", type: "show", releaseOrder: 77, timelineOrder: 66,
    notes: "Netflix corner. Jessica Jones' origin and her fight against Kilgrave — set in the same Hell's Kitchen as Daredevil.",
    episodes: [
      { id: "jessica-jones-season-1-e1", title: "AKA Ladies Night", runtimeMinutes: 48 },
      { id: "jessica-jones-season-1-e2", title: "AKA Crush Syndrome", runtimeMinutes: 48 },
      { id: "jessica-jones-season-1-e3", title: "AKA It's Called Whiskey", runtimeMinutes: 48 },
      { id: "jessica-jones-season-1-e4", title: "AKA 99 Friends", runtimeMinutes: 48 },
      { id: "jessica-jones-season-1-e5", title: "AKA The Sandwich Saved Me", runtimeMinutes: 48 },
      { id: "jessica-jones-season-1-e6", title: "AKA You're a Winner!", runtimeMinutes: 48 },
      { id: "jessica-jones-season-1-e7", title: "AKA Top Shelf Perverts", runtimeMinutes: 48 },
      { id: "jessica-jones-season-1-e8", title: "AKA WWJD?", runtimeMinutes: 48 },
      { id: "jessica-jones-season-1-e9", title: "AKA Sin Bin", runtimeMinutes: 48 },
      { id: "jessica-jones-season-1-e10", title: "AKA 1,000 Cuts", runtimeMinutes: 48 },
      { id: "jessica-jones-season-1-e11", title: "AKA I've Got the Blues", runtimeMinutes: 48 },
      { id: "jessica-jones-season-1-e12", title: "AKA Take a Bloody Number", runtimeMinutes: 48 },
      { id: "jessica-jones-season-1-e13", title: "AKA Smile", runtimeMinutes: 54 },
    ],
  },
  {
    id: "daredevil-season-2", title: "Daredevil (Season 2)", type: "show", releaseOrder: 78, timelineOrder: 67,
    notes: "Netflix corner. Introduces Frank Castle (the Punisher) and Elektra.",
    episodes: [
      { id: "daredevil-season-2-e1", title: "Bang", runtimeMinutes: 54 },
      { id: "daredevil-season-2-e2", title: "Dogs to a Gunfight", runtimeMinutes: 50 },
      { id: "daredevil-season-2-e3", title: "New York's Finest", runtimeMinutes: 50 },
      { id: "daredevil-season-2-e4", title: "Penny and Dime", runtimeMinutes: 50 },
      { id: "daredevil-season-2-e5", title: "Kinbaku", runtimeMinutes: 50 },
      { id: "daredevil-season-2-e6", title: "Regrets Only", runtimeMinutes: 50 },
      { id: "daredevil-season-2-e7", title: "Semper Fidelis", runtimeMinutes: 50 },
      { id: "daredevil-season-2-e8", title: "Guilty as Sin", runtimeMinutes: 50 },
      { id: "daredevil-season-2-e9", title: "Seven Minutes in Heaven", runtimeMinutes: 50 },
      { id: "daredevil-season-2-e10", title: "The Man in the Box", runtimeMinutes: 50 },
      { id: "daredevil-season-2-e11", title: ".380", runtimeMinutes: 49 },
      { id: "daredevil-season-2-e12", title: "The Dark at the End of the Tunnel", runtimeMinutes: 50 },
      { id: "daredevil-season-2-e13", title: "A Cold Day in Hell's Kitchen", runtimeMinutes: 56, spoiler: "Elektra is killed by the Hand's ninjas, and Frank Castle takes up the Punisher identity for good — setting up his own series." },
    ],
  },
  {
    id: "punisher-season-1", title: "The Punisher (Season 1)", type: "show", releaseOrder: 79, timelineOrder: 68,
    notes: "Netflix corner. Frank Castle's own series, spun off from Daredevil Season 2.",
    episodes: [
      { id: "punisher-season-1-e1", title: "3AM", runtimeMinutes: 52 },
      { id: "punisher-season-1-e2", title: "Two Dead Men", runtimeMinutes: 52 },
      { id: "punisher-season-1-e3", title: "Kandahar", runtimeMinutes: 52 },
      { id: "punisher-season-1-e4", title: "Resupply", runtimeMinutes: 52 },
      { id: "punisher-season-1-e5", title: "Gunner", runtimeMinutes: 52 },
      { id: "punisher-season-1-e6", title: "The Judas Goat", runtimeMinutes: 52 },
      { id: "punisher-season-1-e7", title: "Crosshairs", runtimeMinutes: 52 },
      { id: "punisher-season-1-e8", title: "Cold Steel", runtimeMinutes: 52 },
      { id: "punisher-season-1-e9", title: "Front Toward Enemy", runtimeMinutes: 52 },
      { id: "punisher-season-1-e10", title: "Virtue of the Vicious", runtimeMinutes: 52 },
      { id: "punisher-season-1-e11", title: "Danger Close", runtimeMinutes: 52 },
      { id: "punisher-season-1-e12", title: "Home", runtimeMinutes: 52 },
      { id: "punisher-season-1-e13", title: "Memento Mori", runtimeMinutes: 58 },
    ],
  },
  {
    id: "daredevil-season-3", title: "Daredevil (Season 3)", type: "show", releaseOrder: 80, timelineOrder: 69,
    notes: "Netflix corner. Wilson Fisk works his way back to power from behind bars.",
    episodes: [
      { id: "daredevil-season-3-e1", title: "Resurrection", runtimeMinutes: 50 },
      { id: "daredevil-season-3-e2", title: "Please", runtimeMinutes: 50 },
      { id: "daredevil-season-3-e3", title: "No Good Deed", runtimeMinutes: 50 },
      { id: "daredevil-season-3-e4", title: "Blindsided", runtimeMinutes: 50 },
      { id: "daredevil-season-3-e5", title: "The Perfect Game", runtimeMinutes: 50 },
      { id: "daredevil-season-3-e6", title: "The Devil You Know", runtimeMinutes: 50 },
      { id: "daredevil-season-3-e7", title: "Aftermath", runtimeMinutes: 50 },
      { id: "daredevil-season-3-e8", title: "Upstairs/Downstairs", runtimeMinutes: 50 },
      { id: "daredevil-season-3-e9", title: "Revelations", runtimeMinutes: 50 },
      { id: "daredevil-season-3-e10", title: "Karen", runtimeMinutes: 50 },
      { id: "daredevil-season-3-e11", title: "Reunion", runtimeMinutes: 50 },
      { id: "daredevil-season-3-e12", title: "One Last Shot", runtimeMinutes: 50 },
      { id: "daredevil-season-3-e13", title: "A New Napkin", runtimeMinutes: 56, spoiler: "Wilson Fisk manipulates the FBI into freeing him and killing his handler, walking free with a plan to go legitimate — exactly the setup Daredevil: Born Again opens on years later." },
    ],
  },
  {
    id: "punisher-season-2", title: "The Punisher (Season 2)", type: "show", releaseOrder: 81, timelineOrder: 70,
    notes: "Netflix corner. The last of this era before the story jumps to Daredevil: Born Again.",
    episodes: [
      { id: "punisher-season-2-e1", title: "Roadhouse Blues", runtimeMinutes: 52 },
      { id: "punisher-season-2-e2", title: "Fight or Flight", runtimeMinutes: 52 },
      { id: "punisher-season-2-e3", title: "Trouble the Water", runtimeMinutes: 52 },
      { id: "punisher-season-2-e4", title: "Scar Tissue", runtimeMinutes: 52 },
      { id: "punisher-season-2-e5", title: "One-Eyed Jacks", runtimeMinutes: 52 },
      { id: "punisher-season-2-e6", title: "Nakazat", runtimeMinutes: 52 },
      { id: "punisher-season-2-e7", title: "One Bad Day", runtimeMinutes: 52 },
      { id: "punisher-season-2-e8", title: "My Brother's Keeper", runtimeMinutes: 52 },
      { id: "punisher-season-2-e9", title: "Flustercluck", runtimeMinutes: 52 },
      { id: "punisher-season-2-e10", title: "The Dark Hearts of Men", runtimeMinutes: 52 },
      { id: "punisher-season-2-e11", title: "The Abyss", runtimeMinutes: 52 },
      { id: "punisher-season-2-e12", title: "Collision Course", runtimeMinutes: 52 },
      { id: "punisher-season-2-e13", title: "The Whirlwind", runtimeMinutes: 58 },
    ],
  },
  {
    id: "agatha-all-along", title: "Agatha All Along", type: "show", releaseOrder: 46, timelineOrder: 64,
    notes: "WandaVision spinoff following Agatha Harkness.",
    episodes: [
      { id: "agatha-all-along-e1", title: "Seekest Thou the Road", runtimeMinutes: 42 },
      { id: "agatha-all-along-e2", title: "Circle Sewn with Fate / Unlock Thy Hidden Gate", runtimeMinutes: 44 },
      { id: "agatha-all-along-e3", title: "Through Many Miles of Tricks and Trials", runtimeMinutes: 40 },
      { id: "agatha-all-along-e4", title: "If I Can't Reach You / Let My Song Teach You", runtimeMinutes: 43 },
      { id: "agatha-all-along-e5", title: "Darkest Hour, Wake Thy Power", runtimeMinutes: 41 },
      { id: "agatha-all-along-e6", title: "Familiar by Thy Side", runtimeMinutes: 39 },
      { id: "agatha-all-along-e7", title: "Death's Hand in Mine", runtimeMinutes: 45 },
      { id: "agatha-all-along-e8", title: "Follow Me, My Friend / To Glory at the End", runtimeMinutes: 48 },
      { id: "agatha-all-along-e9", title: "Maiden Mother Crone", runtimeMinutes: 50, spoiler: "Agatha sacrifices herself for Billy Maximoff and returns as a ghost; Billy sets off to find his twin brother Tommy, last seen erased from reality in WandaVision." },
    ],
  },
  {
    id: "daredevil-born-again", title: "Daredevil: Born Again (Season 1)", type: "show", releaseOrder: 48, timelineOrder: 71,
    notes: "Wilson Fisk's rise sets up the political thread running through Thunderbolts*.",
    episodes: [
      { id: "daredevil-born-again-e1", title: "Heaven's Half Hour", runtimeMinutes: 52 },
      { id: "daredevil-born-again-e2", title: "Optics", runtimeMinutes: 48 },
      { id: "daredevil-born-again-e3", title: "The Hollow of His Hand", runtimeMinutes: 50 },
      { id: "daredevil-born-again-e4", title: "Sic Semper Systema", runtimeMinutes: 49 },
      { id: "daredevil-born-again-e5", title: "With Interest", runtimeMinutes: 51 },
      { id: "daredevil-born-again-e6", title: "Excessive Force", runtimeMinutes: 50 },
      { id: "daredevil-born-again-e7", title: "Art for Art's Sake", runtimeMinutes: 49 },
      { id: "daredevil-born-again-e8", title: "Isle of Joy", runtimeMinutes: 52 },
      { id: "daredevil-born-again-e9", title: "Straight to Hell", runtimeMinutes: 54, spoiler: "Wilson Fisk uses his position as mayor to outlaw vigilantes and orders Matt Murdock killed on sight — the authoritarian backdrop that carries into Season 2 and Thunderbolts*." },
    ],
  },
  {
    id: "daredevil-born-again-season-2", title: "Daredevil: Born Again (Season 2)", type: "show", releaseOrder: 53, timelineOrder: 72,
    notes: "Direct continuation of Season 1's cliffhanger.",
    episodes: [
      { id: "daredevil-born-again-season-2-e1", title: "The Northern Star", runtimeMinutes: 50 },
      { id: "daredevil-born-again-season-2-e2", title: "Shoot the Moon", runtimeMinutes: 50 },
      { id: "daredevil-born-again-season-2-e3", title: "The Scales & The Sword", runtimeMinutes: 50 },
      { id: "daredevil-born-again-season-2-e4", title: "Gloves Off", runtimeMinutes: 50 },
      { id: "daredevil-born-again-season-2-e5", title: "The Grand Design", runtimeMinutes: 50 },
      { id: "daredevil-born-again-season-2-e6", title: "Requiem", runtimeMinutes: 50 },
      { id: "daredevil-born-again-season-2-e7", title: "The Hateful Darkness", runtimeMinutes: 50 },
      { id: "daredevil-born-again-season-2-e8", title: "The Southern Cross", runtimeMinutes: 54, spoiler: "The season closes with Fisk's grip on New York shaken but not broken, and Frank Castle drawn back into the fight — picked up directly by The Punisher: One Last Kill." },
    ],
  },
  { id: "punisher-one-last-kill", title: "The Punisher: One Last Kill", type: "movie", releaseOrder: 54, timelineOrder: 73, runtimeMinutes: 51, notes: "A one-off special, not a full series — Frank Castle's last word on the Born Again Season 2 fallout." },
  { id: "captain-america-brave-new-world", title: "Captain America: Brave New World", type: "movie", releaseOrder: 47, timelineOrder: 74, runtimeMinutes: 118 },
  { id: "thunderbolts", title: "Thunderbolts*", type: "movie", releaseOrder: 49, timelineOrder: 75, runtimeMinutes: 126 },
  {
    id: "ironheart", title: "Ironheart", type: "show", releaseOrder: 50, timelineOrder: 76,
    notes: "Introduces Riri Williams ahead of her expected role in the wider saga.",
    episodes: [
      { id: "ironheart-e1", title: "Take Me Home", runtimeMinutes: 38 },
      { id: "ironheart-e2", title: "Will the Real Natalie Please Stand Up?", runtimeMinutes: 37 },
      { id: "ironheart-e3", title: "We in Danger, Girl", runtimeMinutes: 39 },
      { id: "ironheart-e4", title: "Bad Magic", runtimeMinutes: 36 },
      { id: "ironheart-e5", title: "Karma's a Glitch", runtimeMinutes: 38 },
      { id: "ironheart-e6", title: "The Past Is the Past", runtimeMinutes: 42, spoiler: "Riri makes a literal deal with Mephisto — the MCU's first on-screen appearance of the demon — trading something of her own to bring Natalie back to life." },
    ],
  },
  {
    id: "wonder-man", title: "Wonder Man", type: "show", releaseOrder: 52, timelineOrder: 77,
    notes: "Mostly self-contained Hollywood satire about a stuntman chasing the role of a retired superhero.",
    episodes: [
      { id: "wonder-man-e1", title: "Matinee", runtimeMinutes: 36 },
      { id: "wonder-man-e2", title: "Self-Tape", runtimeMinutes: 34 },
      { id: "wonder-man-e3", title: "Pacoima", runtimeMinutes: 34 },
      { id: "wonder-man-e4", title: "Doorman", runtimeMinutes: 34 },
      { id: "wonder-man-e5", title: "Found Footage", runtimeMinutes: 34 },
      { id: "wonder-man-e6", title: "Call Back", runtimeMinutes: 34 },
      { id: "wonder-man-e7", title: "Kathy Friedman", runtimeMinutes: 34 },
      { id: "wonder-man-e8", title: "Yucca Valley", runtimeMinutes: 40 },
    ],
  },
  { id: "fantastic-four-first-steps", title: "The Fantastic Four: First Steps", type: "movie", releaseOrder: 51, timelineOrder: 78, runtimeMinutes: 115, notes: "Introduces Marvel's First Family ahead of their merge into the main timeline." },
  { id: "spider-man-brand-new-day", title: "Spider-Man: Brand New Day", type: "movie", releaseOrder: 55, timelineOrder: 79, runtimeMinutes: 145 },
  {
    id: "visionquest", title: "VisionQuest", type: "show", releaseOrder: 56, timelineOrder: 80,
    notes: "White Vision's search for his lost memories and humanity after WandaVision. Episode titles hadn't been announced as of this list's last update — shown as placeholders.",
    episodes: [
      { id: "visionquest-e1", title: "Episode 1", runtimeMinutes: 45 },
      { id: "visionquest-e2", title: "Episode 2", runtimeMinutes: 45 },
      { id: "visionquest-e3", title: "Episode 3", runtimeMinutes: 45 },
      { id: "visionquest-e4", title: "Episode 4", runtimeMinutes: 45 },
      { id: "visionquest-e5", title: "Episode 5", runtimeMinutes: 45 },
      { id: "visionquest-e6", title: "Episode 6", runtimeMinutes: 45 },
      { id: "visionquest-e7", title: "Episode 7", runtimeMinutes: 45 },
      { id: "visionquest-e8", title: "Episode 8", runtimeMinutes: 45 },
    ],
  },
  { id: "avengers-doomsday", title: "Avengers: Doomsday", type: "movie", releaseOrder: 57, timelineOrder: 81, runtimeMinutes: 180, notes: "In theaters December 18, 2026. Runtime is an estimate — not yet officially confirmed." },
];
