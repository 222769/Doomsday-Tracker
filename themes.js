// themes.js — color theme presets for the Settings > Appearance picker.
// Each theme's actual colors live in styles.css as a
// :root[data-color-theme="id"] block; this file only supplies the id,
// display name, and the two swatch colors shown in the picker UI so
// app.js doesn't need to duplicate color values just to render swatches.

export const DEFAULT_THEME_ID = "multiverse";

export const themes = [
  { id: "multiverse", name: "Multiverse", swatch: ["#b565f5", "#f2b705"] },
  { id: "doomsday-red", name: "Doomsday Red", swatch: ["#ff3b2f", "#ffc233"] },
  { id: "apocalypse-green", name: "Apocalypse Green", swatch: ["#33e07a", "#ffb020"] },
  { id: "quantum-blue", name: "Quantum Blue", swatch: ["#4da6ff", "#ffce54"] },
  { id: "infinity-gold", name: "Infinity Gold", swatch: ["#f2c14e", "#ff8a3d"] },
  { id: "blackout", name: "Blackout", swatch: ["#e8e8e8", "#262626"] },
];
