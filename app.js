// app.js — Watch Tracker checklist logic.
// Vanilla JS, no build step. Loaded as a module from index.html only.

import { items } from "./data.js";

// ---------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------

// Hardcoded target date for the countdown — swap this for your own.
// "Continuum Day": the fictional in-story release date the saga builds to.
const TARGET_DATE = new Date("2027-05-07T00:00:00");

const STORAGE_KEY = "watchTracker.watchedIds.v1";

// ---------------------------------------------------------------------
// Persisted watched-state
// ---------------------------------------------------------------------
// Progress is stored as a plain array of item ids in localStorage.
// A Set is kept in memory for O(1) lookups and converted back to an
// array only when we write to storage.

function loadWatchedIds() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    const parsed = JSON.parse(raw);
    return new Set(Array.isArray(parsed) ? parsed : []);
  } catch {
    // Corrupt or blocked storage (e.g. private browsing) — start fresh
    // rather than throwing and breaking the whole page.
    return new Set();
  }
}

function saveWatchedIds(watchedIds) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...watchedIds]));
  } catch {
    // Storage may be full or unavailable — progress just won't persist.
  }
}

let watchedIds = loadWatchedIds();

// ---------------------------------------------------------------------
// View state (not persisted — resets each visit)
// ---------------------------------------------------------------------

const state = {
  sortBy: "release", // "release" | "timeline"
  hideWatched: false,
  moviesOnly: false,
};

// ---------------------------------------------------------------------
// DOM references
// ---------------------------------------------------------------------

const listEl = document.getElementById("itemList");
const sortReleaseBtn = document.getElementById("sortRelease");
const sortTimelineBtn = document.getElementById("sortTimeline");
const hideWatchedInput = document.getElementById("hideWatched");
const moviesOnlyInput = document.getElementById("moviesOnly");
const resetBtn = document.getElementById("resetBtn");

const statPercent = document.getElementById("statPercent");
const statCount = document.getElementById("statCount");
const statHoursLeft = document.getElementById("statHoursLeft");
const statPace = document.getElementById("statPace");
const progressFill = document.getElementById("progressFill");

// ---------------------------------------------------------------------
// Sorting + filtering
// ---------------------------------------------------------------------

function getVisibleItems() {
  const sortKey = state.sortBy === "timeline" ? "timelineOrder" : "releaseOrder";

  return items
    .filter((item) => !(state.hideWatched && watchedIds.has(item.id)))
    .filter((item) => !(state.moviesOnly && item.type !== "movie"))
    .sort((a, b) => a[sortKey] - b[sortKey]);
}

// ---------------------------------------------------------------------
// Rendering
// ---------------------------------------------------------------------

function renderList() {
  const visible = getVisibleItems();
  const sortKey = state.sortBy === "timeline" ? "timelineOrder" : "releaseOrder";

  listEl.textContent = "";

  if (visible.length === 0) {
    const empty = document.createElement("li");
    empty.className = "empty-state";
    empty.textContent = "Nothing matches the current filters.";
    listEl.appendChild(empty);
    return;
  }

  for (const item of visible) {
    const isWatched = watchedIds.has(item.id);

    const li = document.createElement("li");
    li.className = "item" + (isWatched ? " watched" : "");

    const label = document.createElement("label");

    const orderBadge = document.createElement("span");
    orderBadge.className = "item-order";
    orderBadge.textContent = String(item[sortKey]);

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = isWatched;
    checkbox.setAttribute("aria-label", `Mark "${item.title}" as watched`);
    checkbox.addEventListener("change", () => toggleWatched(item.id));

    const body = document.createElement("div");
    body.className = "item-body";

    const titleRow = document.createElement("div");
    titleRow.className = "item-title-row";

    const title = document.createElement("span");
    title.className = "item-title";
    title.textContent = item.title;

    const type = document.createElement("span");
    type.className = "item-type";
    type.textContent = item.type;

    titleRow.append(title, type);

    const meta = document.createElement("div");
    meta.className = "item-meta";
    const hours = (item.runtimeMinutes / 60).toFixed(1);
    meta.textContent = `${item.runtimeMinutes} min (~${hours} hr)` + (item.notes ? ` · ${item.notes}` : "");

    body.append(titleRow, meta);

    if (item.stopPoint) {
      const stop = document.createElement("div");
      stop.className = "item-stop-point";
      stop.textContent = `Stop point: ${item.stopPoint}`;
      body.appendChild(stop);
    }

    label.append(orderBadge, checkbox, body);
    li.appendChild(label);
    listEl.appendChild(li);
  }
}

function renderStats() {
  const total = items.length;
  const watchedCount = items.filter((item) => watchedIds.has(item.id)).length;
  const percent = total === 0 ? 0 : Math.round((watchedCount / total) * 100);

  const unwatchedMinutes = items
    .filter((item) => !watchedIds.has(item.id))
    .reduce((sum, item) => sum + item.runtimeMinutes, 0);
  const hoursLeft = unwatchedMinutes / 60;

  const msLeft = TARGET_DATE.getTime() - Date.now();
  const weeksLeft = msLeft > 0 ? msLeft / (1000 * 60 * 60 * 24 * 7) : 0;
  const hoursPerWeek = weeksLeft > 0 ? hoursLeft / weeksLeft : hoursLeft;

  statPercent.textContent = `${percent}%`;
  statCount.textContent = `${watchedCount} / ${total}`;
  statHoursLeft.textContent = `${hoursLeft.toFixed(1)} hr`;
  statPace.textContent =
    msLeft > 0 ? `${hoursPerWeek.toFixed(1)} hr/wk` : "past target date";

  progressFill.style.width = `${percent}%`;
}

function renderAll() {
  renderList();
  renderStats();
}

// ---------------------------------------------------------------------
// Event handlers
// ---------------------------------------------------------------------

function toggleWatched(id) {
  if (watchedIds.has(id)) {
    watchedIds.delete(id);
  } else {
    watchedIds.add(id);
  }
  saveWatchedIds(watchedIds);
  renderAll();
}

function setSort(sortBy) {
  state.sortBy = sortBy;
  sortReleaseBtn.classList.toggle("active", sortBy === "release");
  sortTimelineBtn.classList.toggle("active", sortBy === "timeline");
  renderList();
}

sortReleaseBtn.addEventListener("click", () => setSort("release"));
sortTimelineBtn.addEventListener("click", () => setSort("timeline"));

hideWatchedInput.addEventListener("change", (e) => {
  state.hideWatched = e.target.checked;
  renderList();
});

moviesOnlyInput.addEventListener("change", (e) => {
  state.moviesOnly = e.target.checked;
  renderList();
});

// Reset requires two clicks: the first arms a confirm state, the second
// (within a few seconds) actually clears progress. This avoids an extra
// browser confirm() dialog while still preventing an accidental wipe.
let resetArmed = false;
let resetArmTimer = null;

resetBtn.addEventListener("click", () => {
  if (!resetArmed) {
    resetArmed = true;
    resetBtn.classList.add("confirming");
    resetBtn.textContent = "Tap again to confirm";
    resetArmTimer = setTimeout(() => {
      resetArmed = false;
      resetBtn.classList.remove("confirming");
      resetBtn.textContent = "Reset progress";
    }, 4000);
    return;
  }

  clearTimeout(resetArmTimer);
  resetArmed = false;
  resetBtn.classList.remove("confirming");
  resetBtn.textContent = "Reset progress";

  watchedIds = new Set();
  saveWatchedIds(watchedIds);
  renderAll();
});

// ---------------------------------------------------------------------
// Countdown timer
// ---------------------------------------------------------------------

const cdDays = document.getElementById("cdDays");
const cdHours = document.getElementById("cdHours");
const cdMinutes = document.getElementById("cdMinutes");
const cdSeconds = document.getElementById("cdSeconds");

function updateCountdown() {
  const msLeft = TARGET_DATE.getTime() - Date.now();
  const clamped = Math.max(0, msLeft);

  const totalSeconds = Math.floor(clamped / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  cdDays.textContent = String(days);
  cdHours.textContent = String(hours).padStart(2, "0");
  cdMinutes.textContent = String(minutes).padStart(2, "0");
  cdSeconds.textContent = String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);

// Hours-left / pace depend on wall-clock time too, so refresh stats
// alongside the countdown (cheap: only ~10 items).
setInterval(renderStats, 1000);

// ---------------------------------------------------------------------
// Initial render
// ---------------------------------------------------------------------

renderAll();
