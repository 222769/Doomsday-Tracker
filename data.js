// data.js
// Seed data for the Watch Tracker checklist.
//
// This is a fan-made tracker for an original, fictional "Continuum Saga"
// viewing order — not affiliated with or based on any real franchise.
// Swap this array for your own list; every field below is required
// except `notes` and `stopPoint`.
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
  {
    id: "ember-rising",
    title: "Ember Rising",
    type: "movie",
    releaseOrder: 1,
    timelineOrder: 3,
    runtimeMinutes: 118,
    notes: "The film that started it all.",
  },
  {
    id: "signal-corps",
    title: "Signal Corps",
    type: "show",
    releaseOrder: 2,
    timelineOrder: 1,
    runtimeMinutes: 360, // 8 episodes x 45 min
    notes: "A prequel series set years before Ember Rising.",
  },
  {
    id: "hollow-point",
    title: "Hollow Point",
    type: "movie",
    releaseOrder: 3,
    timelineOrder: 5,
    runtimeMinutes: 132,
  },
  {
    id: "the-long-dusk",
    title: "The Long Dusk",
    type: "show",
    releaseOrder: 4,
    timelineOrder: 2,
    runtimeMinutes: 480, // 10 episodes x 48 min
    notes: "Only the first arc is required viewing.",
    stopPoint: "watch through S1E4 only",
  },
  {
    id: "iron-tide",
    title: "Iron Tide",
    type: "movie",
    releaseOrder: 5,
    timelineOrder: 6,
    runtimeMinutes: 141,
  },
  {
    id: "nightshade-protocol",
    title: "Nightshade Protocol",
    type: "movie",
    releaseOrder: 6,
    timelineOrder: 4,
    runtimeMinutes: 125,
    notes: "Runs concurrently with Ember Rising.",
  },
  {
    id: "vanguard-first-light",
    title: "Vanguard: First Light",
    type: "movie",
    releaseOrder: 7,
    timelineOrder: 7,
    runtimeMinutes: 149,
  },
  {
    id: "static-hour",
    title: "Static Hour",
    type: "show",
    releaseOrder: 8,
    timelineOrder: 8,
    runtimeMinutes: 405, // 9 episodes x 45 min
  },
  {
    id: "continuum-fracture",
    title: "Continuum: Fracture",
    type: "movie",
    releaseOrder: 9,
    timelineOrder: 9,
    runtimeMinutes: 156,
    notes: "Part one of the saga finale.",
  },
  {
    id: "continuum-convergence",
    title: "Continuum: Convergence",
    type: "movie",
    releaseOrder: 10,
    timelineOrder: 10,
    runtimeMinutes: 163,
    notes: "Part two of the saga finale.",
  },
];
