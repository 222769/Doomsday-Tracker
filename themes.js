// themes.js — color theme presets for the Settings > Appearance picker.
// Each theme's actual colors live in styles.css as a
// :root[data-color-theme="id"] block; this file only supplies the id,
// display name, and the two swatch colors shown in the picker UI so
// app.js doesn't need to duplicate color values just to render swatches.

export const DEFAULT_THEME_ID = "multiverse";

// "custom" is handled specially by app.js — its swatch reflects whatever
// the person last picked (see loadCustomColors) rather than a fixed pair,
// and selecting it reveals the two color inputs in Settings. Its base
// (non-accent) colors live in styles.css as :root[data-color-theme="custom"]
// same as any other theme.
export const CUSTOM_THEME_ID = "custom";

export const DEFAULT_CUSTOM_ACCENT = "#b565f5";
export const DEFAULT_CUSTOM_HAZARD = "#f2b705";

// Swatch colors are chosen to match each name's real MCU/comics color
// identity (Doctor Doom's green, Apocalypse's blue-and-purple armor, the
// Quantum Realm's purple-pink haze, the Infinity Gauntlet's gold against
// a fiery glow, the Multiverse Saga's purple-to-teal key art) rather than
// being picked for the name alone — "doomsday-red"/"apocalypse-green"/
// "quantum-blue" ids are kept as stable storage keys even though their
// colors no longer match their id text.
export const themes = [
  { id: "multiverse", name: "Multiverse", swatch: ["#b565f5", "#29d3c0"] },
  { id: "doomsday-red", name: "Doomsday Green", swatch: ["#2fbf6e", "#c9a038"] },
  { id: "apocalypse-green", name: "Apocalypse Blue", swatch: ["#4d79ff", "#9b30ff"] },
  { id: "quantum-blue", name: "Quantum Purple", swatch: ["#a259ff", "#ff5da2"] },
  { id: "infinity-gold", name: "Infinity Gold", swatch: ["#f2c14e", "#e2472d"] },
  { id: "blackout", name: "Blackout", swatch: ["#e8e8e8", "#262626"] },
  { id: CUSTOM_THEME_ID, name: "Custom", swatch: null },
];
