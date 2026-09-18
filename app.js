// app.js — Doomsday Tracker checklist logic.
// Vanilla JS, no build step. Loaded as a module from index.html only.

import { items } from "./data.js";
import { sync } from "./sync.js";

// ---------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------

// Hardcoded target date for the countdown — swap this for your own.
// "Doomsday": the release date every title on this list builds up to.
const TARGET_DATE = new Date("2026-12-18T00:00:00");

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

// The sync code currently active on this device, or null if not syncing.
// Kept in memory only — sync.js is the source of truth for what's stored.
let activeSyncCode = null;

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

const accountBtn = document.getElementById("accountBtn");
const accountBtnLabel = document.getElementById("accountBtnLabel");
const authModalOverlay = document.getElementById("authModalOverlay");
const authModalClose = document.getElementById("authModalClose");
const authModalUnsynced = document.getElementById("authModalUnsynced");
const authModalSynced = document.getElementById("authModalSynced");
const authTabRegister = document.getElementById("authTabRegister");
const authTabSignin = document.getElementById("authTabSignin");
const authPanelRegister = document.getElementById("authPanelRegister");
const authPanelSignin = document.getElementById("authPanelSignin");
const generateCodeBtn = document.getElementById("generateCodeBtn");
const joinCodeInput = document.getElementById("joinCodeInput");
const joinCodeBtn = document.getElementById("joinCodeBtn");
const authModalError = document.getElementById("authModalError");
const syncCodeDisplay = document.getElementById("syncCodeDisplay");
const copyCodeBtn = document.getElementById("copyCodeBtn");
const stopSyncBtn = document.getElementById("stopSyncBtn");

// ---------------------------------------------------------------------
// Sorting + filtering
// ---------------------------------------------------------------------

function getVisibleItems() {
  const sortKey = state.sortBy === "timeline" ? "timelineOrder" : "releaseOrder";

  return items
    .filter((item) => !(state.hideWatched && isItemWatched(item)))
    .filter((item) => !(state.moviesOnly && item.type !== "movie"))
    .sort((a, b) => a[sortKey] - b[sortKey]);
}

// ---------------------------------------------------------------------
// Watched-state helpers (movies vs. shows)
// ---------------------------------------------------------------------
// A movie's own id lives directly in watchedIds. A show has no id of its
// own in watchedIds — instead each of its episodes does, so a show's
// progress is however many of its episode ids are currently in the set.

function getItemRuntimeMinutes(item) {
  if (item.type === "show") {
    return item.episodes.reduce((sum, ep) => sum + ep.runtimeMinutes, 0);
  }
  return item.runtimeMinutes;
}

function getWatchedEpisodeCount(item) {
  return item.episodes.filter((ep) => watchedIds.has(ep.id)).length;
}

function isItemWatched(item) {
  if (item.type === "show") {
    return item.episodes.every((ep) => watchedIds.has(ep.id));
  }
  return watchedIds.has(item.id);
}

function isItemPartiallyWatched(item) {
  if (item.type !== "show") return false;
  const watchedCount = getWatchedEpisodeCount(item);
  return watchedCount > 0 && watchedCount < item.episodes.length;
}

function getUnwatchedMinutes(item) {
  if (item.type === "show") {
    return item.episodes
      .filter((ep) => !watchedIds.has(ep.id))
      .reduce((sum, ep) => sum + ep.runtimeMinutes, 0);
  }
  return watchedIds.has(item.id) ? 0 : item.runtimeMinutes;
}

// Show ids currently expanded to reveal their episode list, and episode
// ids whose spoiler note has been revealed. Both are view state only —
// not persisted, reset on reload — so a spoiler stays hidden by default
// every time the page loads, never opt-out.
const expandedShowIds = new Set();
const revealedSpoilerIds = new Set();

// ---------------------------------------------------------------------
// Thumbnail tiles
// ---------------------------------------------------------------------
// No real poster art is used (licensing real movie/show poster images
// would carry meaningful copyright risk for a fan project). Instead each
// item gets a deterministic gradient tile + monogram, generated purely
// from its title — same input always produces the same tile, no images
// fetched, works fully offline.

const THUMB_STOPWORDS = new Set(["the", "of", "and", "a", "an", "in", "to"]);

function getInitials(title) {
  const words = title
    .split(/\s+/)
    .map((w) => w.replace(/[^A-Za-z]/g, ""))
    .filter((w) => w && !THUMB_STOPWORDS.has(w.toLowerCase()));
  if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase();
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return "??";
}

function hashHue(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) >>> 0;
  }
  return hash % 360;
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
    const isShow = item.type === "show";
    const isWatched = isItemWatched(item);
    const isExpanded = isShow && expandedShowIds.has(item.id);

    const li = document.createElement("li");
    li.className = "item" + (isWatched ? " watched" : "");

    const label = document.createElement("label");

    const orderBadge = document.createElement("span");
    orderBadge.className = "item-order";
    orderBadge.textContent = String(item[sortKey]);

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = isWatched;
    checkbox.setAttribute(
      "aria-label",
      isShow ? `Mark all of "${item.title}" as watched` : `Mark "${item.title}" as watched`
    );
    if (isShow) {
      checkbox.indeterminate = isItemPartiallyWatched(item);
      checkbox.addEventListener("change", () => toggleShowBulk(item));
    } else {
      checkbox.addEventListener("change", () => toggleWatched(item.id));
    }

    const thumb = document.createElement("div");
    thumb.className = "item-thumb";
    thumb.style.setProperty("--hue", String(hashHue(item.id)));
    thumb.textContent = getInitials(item.title);
    thumb.setAttribute("aria-hidden", "true");

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
    const totalMinutes = getItemRuntimeMinutes(item);
    const hours = (totalMinutes / 60).toFixed(1);
    const progressText = isShow ? `${getWatchedEpisodeCount(item)}/${item.episodes.length} episodes · ` : "";
    meta.textContent = `${progressText}${totalMinutes} min (~${hours} hr)` + (item.notes ? ` · ${item.notes}` : "");

    body.append(titleRow, meta);

    if (item.stopPoint) {
      const stop = document.createElement("div");
      stop.className = "item-stop-point";
      stop.textContent = `Stop point: ${item.stopPoint}`;
      body.appendChild(stop);
    }

    // The expand button and episode list are siblings of <label>, not
    // nested inside it — a <label> may only contain the one control it
    // labels, so a nested button/checkbox there would be invalid HTML
    // and can't reliably be told apart from clicks meant for the show's
    // own checkbox.
    label.append(orderBadge, checkbox, thumb, body);
    li.appendChild(label);

    if (isShow) {
      const expandBtn = document.createElement("button");
      expandBtn.type = "button";
      expandBtn.className = "expand-toggle" + (isExpanded ? " expanded" : "");
      expandBtn.textContent = "▾ " + (isExpanded ? "Hide episodes" : "Show episodes");
      expandBtn.setAttribute("aria-expanded", String(isExpanded));
      expandBtn.addEventListener("click", () => toggleExpand(item.id));
      li.appendChild(expandBtn);

      if (isExpanded) {
        const episodeList = document.createElement("ul");
        episodeList.className = "episode-list";

        for (const ep of item.episodes) {
          const epLi = document.createElement("li");
          epLi.className = "episode-item";

          const epLabel = document.createElement("label");

          const epCheckbox = document.createElement("input");
          epCheckbox.type = "checkbox";
          epCheckbox.checked = watchedIds.has(ep.id);
          epCheckbox.setAttribute("aria-label", `Mark "${ep.title}" as watched`);
          epCheckbox.addEventListener("change", () => toggleWatched(ep.id));

          const epTitle = document.createElement("span");
          epTitle.className = "episode-title";
          epTitle.textContent = ep.title;

          const epRuntime = document.createElement("span");
          epRuntime.className = "episode-runtime";
          epRuntime.textContent = `${ep.runtimeMinutes} min`;

          epLabel.append(epCheckbox, epTitle, epRuntime);
          epLi.appendChild(epLabel);

          // Same rule as the expand button: this button is a sibling of
          // epLabel, never nested inside it.
          if (ep.spoiler) {
            const isRevealed = revealedSpoilerIds.has(ep.id);

            const spoilerBtn = document.createElement("button");
            spoilerBtn.type = "button";
            spoilerBtn.className = "spoiler-toggle" + (isRevealed ? " revealed" : "");
            spoilerBtn.textContent = isRevealed ? "▲ Hide spoiler" : "⚠ How this connects (spoiler)";
            spoilerBtn.setAttribute("aria-expanded", String(isRevealed));
            spoilerBtn.addEventListener("click", () => toggleSpoiler(ep.id));
            epLi.appendChild(spoilerBtn);

            if (isRevealed) {
              const spoilerText = document.createElement("p");
              spoilerText.className = "spoiler-text";
              spoilerText.textContent = ep.spoiler;
              epLi.appendChild(spoilerText);
            }
          }
          episodeList.appendChild(epLi);
        }

        li.appendChild(episodeList);
      }
    }

    listEl.appendChild(li);
  }
}

function renderStats() {
  const total = items.length;
  const watchedCount = items.filter((item) => isItemWatched(item)).length;
  const percent = total === 0 ? 0 : Math.round((watchedCount / total) * 100);

  // A show counts toward "watched/total" only once fully watched, but
  // contributes partial credit here — only its still-unwatched episodes
  // count toward hours left.
  const unwatchedMinutes = items.reduce((sum, item) => sum + getUnwatchedMinutes(item), 0);
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

function pushDeltaIfActive(ids, watched) {
  if (activeSyncCode) {
    sync.pushDelta(activeSyncCode, ids, watched).catch((err) => {
      console.warn("Sync push failed:", err);
    });
  }
}

function toggleWatched(id) {
  const nowWatched = !watchedIds.has(id);
  if (nowWatched) {
    watchedIds.add(id);
  } else {
    watchedIds.delete(id);
  }
  saveWatchedIds(watchedIds);
  renderAll();
  pushDeltaIfActive([id], nowWatched);
}

// The show's own checkbox is a bulk action: check it to mark every
// episode watched, uncheck to clear them all. Individual episodes still
// toggle independently via toggleWatched.
function toggleShowBulk(item) {
  const shouldWatchAll = !isItemWatched(item);
  const episodeIds = item.episodes.map((ep) => ep.id);
  for (const id of episodeIds) {
    if (shouldWatchAll) {
      watchedIds.add(id);
    } else {
      watchedIds.delete(id);
    }
  }
  saveWatchedIds(watchedIds);
  renderAll();
  pushDeltaIfActive(episodeIds, shouldWatchAll);
}

function toggleExpand(itemId) {
  if (expandedShowIds.has(itemId)) {
    expandedShowIds.delete(itemId);
  } else {
    expandedShowIds.add(itemId);
  }
  renderList();
}

function toggleSpoiler(episodeId) {
  if (revealedSpoilerIds.has(episodeId)) {
    revealedSpoilerIds.delete(episodeId);
  } else {
    revealedSpoilerIds.add(episodeId);
  }
  renderList();
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

  const previouslyWatched = [...watchedIds];
  watchedIds = new Set();
  saveWatchedIds(watchedIds);
  renderAll();
  pushDeltaIfActive(previouslyWatched, false);
});

// ---------------------------------------------------------------------
// Account (cross-device sync via a generated code — no email/password)
// ---------------------------------------------------------------------
// The header's Account button and its modal are hidden entirely unless
// firebase-config.js has been filled in — see SYNC_SETUP.md.

function applyRemoteWatchedIds(remoteIds) {
  watchedIds = new Set(remoteIds);
  saveWatchedIds(watchedIds);
  renderAll();
}

function showSyncedState(code) {
  activeSyncCode = code;
  syncCodeDisplay.textContent = sync.formatCodeForDisplay(code);
  authModalUnsynced.hidden = true;
  authModalSynced.hidden = false;
  accountBtn.classList.add("synced");
  accountBtnLabel.textContent = "Synced";
}

function showUnsyncedState() {
  activeSyncCode = null;
  authModalUnsynced.hidden = false;
  authModalSynced.hidden = true;
  joinCodeInput.value = "";
  authModalError.hidden = true;
  accountBtn.classList.remove("synced");
  accountBtnLabel.textContent = "Account";
}

function setAuthTab(tab) {
  authTabRegister.classList.toggle("active", tab === "register");
  authTabSignin.classList.toggle("active", tab === "signin");
  authPanelRegister.hidden = tab !== "register";
  authPanelSignin.hidden = tab !== "signin";
  authModalError.hidden = true;
}

function openAuthModal() {
  authModalOverlay.hidden = false;
  if (!activeSyncCode) setAuthTab("register");
}

function closeAuthModal() {
  authModalOverlay.hidden = true;
}

if (sync.isConfigured()) {
  accountBtn.hidden = false;

  accountBtn.addEventListener("click", openAuthModal);
  authModalClose.addEventListener("click", closeAuthModal);
  authModalOverlay.addEventListener("click", (e) => {
    if (e.target === authModalOverlay) closeAuthModal();
  });

  authTabRegister.addEventListener("click", () => setAuthTab("register"));
  authTabSignin.addEventListener("click", () => setAuthTab("signin"));

  // Auto-space the code as "0000 0000 0000 0000" while typing.
  joinCodeInput.addEventListener("input", () => {
    const digits = joinCodeInput.value.replace(/[^0-9]/g, "").slice(0, 16);
    joinCodeInput.value = digits.replace(/(.{4})/g, "$1 ").trim();
  });

  generateCodeBtn.addEventListener("click", async () => {
    generateCodeBtn.disabled = true;
    generateCodeBtn.textContent = "Generating…";
    try {
      const code = await sync.createCode(watchedIds);
      await sync.listen(code, applyRemoteWatchedIds);
      showSyncedState(code);
    } catch (err) {
      console.warn("Could not create an access code:", err);
      authModalError.textContent = "Couldn't create a code — check your connection and try again.";
      authModalError.hidden = false;
    } finally {
      generateCodeBtn.disabled = false;
      generateCodeBtn.textContent = "Generate my code";
    }
  });

  // Signing in replaces local progress, so this uses the same
  // arm-then-confirm pattern as Reset when there's anything to lose.
  let joinArmed = false;
  let joinArmTimer = null;

  joinCodeBtn.addEventListener("click", async () => {
    const code = sync.normalizeCode(joinCodeInput.value);
    authModalError.hidden = true;

    if (!code) {
      authModalError.textContent = "Enter the 16-digit code exactly as you received it.";
      authModalError.hidden = false;
      return;
    }

    if (watchedIds.size > 0 && !joinArmed) {
      joinArmed = true;
      joinCodeBtn.textContent = "Tap again to replace progress";
      joinArmTimer = setTimeout(() => {
        joinArmed = false;
        joinCodeBtn.textContent = "Sign In";
      }, 4000);
      return;
    }

    clearTimeout(joinArmTimer);
    joinArmed = false;
    joinCodeBtn.disabled = true;
    joinCodeBtn.textContent = "Signing in…";

    try {
      const remoteIds = await sync.joinCode(code);
      applyRemoteWatchedIds(remoteIds);
      await sync.listen(code, applyRemoteWatchedIds);
      showSyncedState(code);
    } catch (err) {
      console.warn("Could not sign in:", err);
      authModalError.textContent = err.message || "Couldn't sign in with that code.";
      authModalError.hidden = false;
    } finally {
      joinCodeBtn.disabled = false;
      joinCodeBtn.textContent = "Sign In";
    }
  });

  copyCodeBtn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(sync.formatCodeForDisplay(activeSyncCode));
      copyCodeBtn.textContent = "Copied!";
      setTimeout(() => {
        copyCodeBtn.textContent = "Copy code";
      }, 1500);
    } catch {
      // Clipboard API may be unavailable — the code is already shown on screen.
    }
  });

  stopSyncBtn.addEventListener("click", () => {
    sync.stop();
    showUnsyncedState();
    setAuthTab("register");
  });

  // Resume syncing automatically if this device was mid-session.
  const storedCode = sync.getStoredCode();
  if (storedCode) {
    sync.listen(storedCode, applyRemoteWatchedIds).then(() => showSyncedState(storedCode));
  }
}

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
