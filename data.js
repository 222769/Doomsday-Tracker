// data.js
// The real watch order: every Marvel Cinematic Universe movie, plus the
// handful of Disney+ series most watch-order guides treat as essential
// (not side stories), from Iron Man (2008) through Avengers: Doomsday
// (Dec 18, 2026).
//
// This is an independent, fan-made list — not an official Marvel Studios
// or Disney publication. Release dates and runtimes are drawn from public
// sources; timelineOrder reflects the commonly cited fan-consensus
// in-universe chronology (not an official numbered canon — Marvel has
// never published one), so treat close calls (e.g. exactly when a
// Disney+ season lands relative to a film) as approximate.
//
// Shape of each item:
//   id             - unique string, used as the localStorage key
//   title          - display name
//   type           - "movie" | "show"
//   releaseOrder   - integer, position in real-world release order
//   timelineOrder  - integer, position in in-universe chronological order
//   runtimeMinutes - total watch time in minutes (sum of episode runtimes for shows)
//   notes          - optional short blurb shown under the title
//   stopPoint      - optional string, e.g. "watch through S1E4 only"

export const items = [
  { id: "iron-man", title: "Iron Man", type: "movie", releaseOrder: 1, timelineOrder: 3, runtimeMinutes: 126 },
  { id: "incredible-hulk", title: "The Incredible Hulk", type: "movie", releaseOrder: 2, timelineOrder: 5, runtimeMinutes: 112, notes: "Often skipped today — Mark Ruffalo replaces Edward Norton as Banner from here on." },
  { id: "iron-man-2", title: "Iron Man 2", type: "movie", releaseOrder: 3, timelineOrder: 4, runtimeMinutes: 124 },
  { id: "thor", title: "Thor", type: "movie", releaseOrder: 4, timelineOrder: 6, runtimeMinutes: 115 },
  { id: "captain-america-first-avenger", title: "Captain America: The First Avenger", type: "movie", releaseOrder: 5, timelineOrder: 1, runtimeMinutes: 124 },
  { id: "the-avengers", title: "The Avengers", type: "movie", releaseOrder: 6, timelineOrder: 7, runtimeMinutes: 143 },
  { id: "iron-man-3", title: "Iron Man 3", type: "movie", releaseOrder: 7, timelineOrder: 9, runtimeMinutes: 130 },
  { id: "thor-dark-world", title: "Thor: The Dark World", type: "movie", releaseOrder: 8, timelineOrder: 8, runtimeMinutes: 112 },
  { id: "captain-america-winter-soldier", title: "Captain America: The Winter Soldier", type: "movie", releaseOrder: 9, timelineOrder: 10, runtimeMinutes: 136 },
  { id: "guardians-of-the-galaxy", title: "Guardians of the Galaxy", type: "movie", releaseOrder: 10, timelineOrder: 11, runtimeMinutes: 121 },
  { id: "avengers-age-of-ultron", title: "Avengers: Age of Ultron", type: "movie", releaseOrder: 11, timelineOrder: 13, runtimeMinutes: 141 },
  { id: "ant-man", title: "Ant-Man", type: "movie", releaseOrder: 12, timelineOrder: 14, runtimeMinutes: 117 },
  { id: "captain-america-civil-war", title: "Captain America: Civil War", type: "movie", releaseOrder: 13, timelineOrder: 15, runtimeMinutes: 147 },
  { id: "doctor-strange", title: "Doctor Strange", type: "movie", releaseOrder: 14, timelineOrder: 18, runtimeMinutes: 115 },
  { id: "guardians-of-the-galaxy-vol-2", title: "Guardians of the Galaxy Vol. 2", type: "movie", releaseOrder: 15, timelineOrder: 12, runtimeMinutes: 136 },
  { id: "spider-man-homecoming", title: "Spider-Man: Homecoming", type: "movie", releaseOrder: 16, timelineOrder: 17, runtimeMinutes: 133 },
  { id: "thor-ragnarok", title: "Thor: Ragnarok", type: "movie", releaseOrder: 17, timelineOrder: 20, runtimeMinutes: 130 },
  { id: "black-panther", title: "Black Panther", type: "movie", releaseOrder: 18, timelineOrder: 19, runtimeMinutes: 134 },
  { id: "avengers-infinity-war", title: "Avengers: Infinity War", type: "movie", releaseOrder: 19, timelineOrder: 21, runtimeMinutes: 149 },
  { id: "ant-man-and-the-wasp", title: "Ant-Man and the Wasp", type: "movie", releaseOrder: 20, timelineOrder: 22, runtimeMinutes: 118 },
  { id: "captain-marvel", title: "Captain Marvel", type: "movie", releaseOrder: 21, timelineOrder: 2, runtimeMinutes: 123, notes: "Set in 1995 — chronologically early despite its release date." },
  { id: "avengers-endgame", title: "Avengers: Endgame", type: "movie", releaseOrder: 22, timelineOrder: 23, runtimeMinutes: 181, notes: "The Infinity Saga payoff. Essential." },
  { id: "spider-man-far-from-home", title: "Spider-Man: Far From Home", type: "movie", releaseOrder: 23, timelineOrder: 26, runtimeMinutes: 129 },
  { id: "wandavision", title: "WandaVision", type: "show", releaseOrder: 24, timelineOrder: 25, runtimeMinutes: 340, notes: "9 episodes. Sets up Wanda's arc for Doctor Strange in the Multiverse of Madness." },
  { id: "loki-season-1", title: "Loki (Season 1)", type: "show", releaseOrder: 25, timelineOrder: 24, runtimeMinutes: 300, notes: "6 episodes. Branches the multiverse — required viewing for everything that follows." },
  { id: "black-widow", title: "Black Widow", type: "movie", releaseOrder: 26, timelineOrder: 16, runtimeMinutes: 134, notes: "A flashback set between Civil War and Infinity War." },
  { id: "shang-chi", title: "Shang-Chi and the Legend of the Ten Rings", type: "movie", releaseOrder: 27, timelineOrder: 27, runtimeMinutes: 132 },
  { id: "eternals", title: "Eternals", type: "movie", releaseOrder: 28, timelineOrder: 28, runtimeMinutes: 156 },
  { id: "spider-man-no-way-home", title: "Spider-Man: No Way Home", type: "movie", releaseOrder: 29, timelineOrder: 29, runtimeMinutes: 148, notes: "First multiverse crossover with prior non-MCU Spider-Man films." },
  { id: "doctor-strange-multiverse-of-madness", title: "Doctor Strange in the Multiverse of Madness", type: "movie", releaseOrder: 30, timelineOrder: 30, runtimeMinutes: 126, notes: "Introduces key multiverse rules that carry through to Doomsday." },
  { id: "thor-love-and-thunder", title: "Thor: Love and Thunder", type: "movie", releaseOrder: 31, timelineOrder: 31, runtimeMinutes: 119 },
  { id: "black-panther-wakanda-forever", title: "Black Panther: Wakanda Forever", type: "movie", releaseOrder: 32, timelineOrder: 32, runtimeMinutes: 161 },
  { id: "secret-invasion", title: "Secret Invasion", type: "show", releaseOrder: 35, timelineOrder: 33, runtimeMinutes: 240, notes: "6 episodes. Establishes the Skrull infiltration thread.", stopPoint: "if short on time, the finale (S1E6) is the only essential episode" },
  { id: "ant-man-quantumania", title: "Ant-Man and the Wasp: Quantumania", type: "movie", releaseOrder: 33, timelineOrder: 34, runtimeMinutes: 125 },
  { id: "guardians-of-the-galaxy-vol-3", title: "Guardians of the Galaxy Vol. 3", type: "movie", releaseOrder: 34, timelineOrder: 35, runtimeMinutes: 150 },
  { id: "loki-season-2", title: "Loki (Season 2)", type: "show", releaseOrder: 36, timelineOrder: 36, runtimeMinutes: 300, notes: "6 episodes. Resolves the TVA storyline and reshapes the multiverse's branches." },
  { id: "the-marvels", title: "The Marvels", type: "movie", releaseOrder: 37, timelineOrder: 37, runtimeMinutes: 105 },
  { id: "deadpool-and-wolverine", title: "Deadpool & Wolverine", type: "movie", releaseOrder: 38, timelineOrder: 41, runtimeMinutes: 128, notes: "Folds in Fox's X-Men-era multiverse — directly relevant to Doomsday's cast." },
  { id: "captain-america-brave-new-world", title: "Captain America: Brave New World", type: "movie", releaseOrder: 39, timelineOrder: 39, runtimeMinutes: 118 },
  { id: "daredevil-born-again", title: "Daredevil: Born Again", type: "show", releaseOrder: 40, timelineOrder: 38, runtimeMinutes: 450, notes: "9 episodes. Wilson Fisk's rise sets up the political thread running through Thunderbolts*." },
  { id: "thunderbolts", title: "Thunderbolts*", type: "movie", releaseOrder: 41, timelineOrder: 40, runtimeMinutes: 126 },
  { id: "fantastic-four-first-steps", title: "The Fantastic Four: First Steps", type: "movie", releaseOrder: 42, timelineOrder: 42, runtimeMinutes: 115, notes: "Introduces Marvel's First Family ahead of their merge into the main timeline." },
  { id: "spider-man-brand-new-day", title: "Spider-Man: Brand New Day", type: "movie", releaseOrder: 43, timelineOrder: 43, runtimeMinutes: 145 },
  { id: "avengers-doomsday", title: "Avengers: Doomsday", type: "movie", releaseOrder: 44, timelineOrder: 44, runtimeMinutes: 180, notes: "In theaters December 18, 2026. Runtime is an estimate — not yet officially confirmed." },
];
