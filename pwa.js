// pwa.js — registers the service worker. Included on every page so the
// app shell gets cached (and offline access works) no matter which
// page a visitor lands on first.

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch((err) => {
      console.warn("Service worker registration failed:", err);
    });
  });

  // sw.js activates a new version immediately (skipWaiting + clients.claim)
  // rather than waiting for every tab to close, so an update can take
  // control of an already-open page mid-session. That's great for the
  // cache itself, but the page's HTML/JS was already loaded into memory
  // before the swap — it keeps running the old code until reloaded. Left
  // alone, that shows up as "a feature I just shipped isn't there yet"
  // even though the deploy succeeded, so prompt for a reload instead of
  // leaving the old version running silently.
  let bannerShown = false;
  function showUpdateBanner() {
    if (bannerShown) return;
    bannerShown = true;
    const banner = document.getElementById("updateBanner");
    const btn = document.getElementById("updateBannerBtn");
    if (!banner || !btn) return;
    banner.hidden = false;
    btn.addEventListener("click", () => location.reload());
  }

  navigator.serviceWorker.addEventListener("controllerchange", showUpdateBanner);
}

// ---------------------------------------------------------------------
// Pull-to-refresh
// ---------------------------------------------------------------------
// A normal browser tab gets pull-to-refresh for free from the browser
// chrome, but an installed (standalone) PWA has no browser chrome to
// provide it — there's otherwise no gesture-based way to reload. This
// reimplements it: drag down from the top of the page past a threshold
// to reload, same effect as tapping the update banner's Refresh button.
(function setUpPullToRefresh() {
  const indicator = document.getElementById("ptrIndicator");
  const authModalOverlay = document.getElementById("authModalOverlay");
  if (!indicator) return;

  const THRESHOLD = 70;
  let startY = null;
  let dragging = false;
  let triggered = false;

  function setProgress(px) {
    const progress = Math.min(1.4, Math.max(0, px / THRESHOLD));
    indicator.style.setProperty("--ptr-progress", String(progress));
    indicator.classList.toggle("ready", progress >= 1);
  }

  document.addEventListener(
    "touchstart",
    (e) => {
      if (triggered) return;
      if (authModalOverlay && !authModalOverlay.hidden) return;
      if (e.touches.length !== 1) return;
      if ((document.scrollingElement || document.documentElement).scrollTop > 0) return;
      startY = e.touches[0].clientY;
      dragging = true;
      indicator.classList.add("pulling");
      indicator.classList.remove("settling", "refreshing");
    },
    { passive: true }
  );

  document.addEventListener(
    "touchmove",
    (e) => {
      if (!dragging || startY === null || triggered) return;
      const deltaY = e.touches[0].clientY - startY;
      if (deltaY <= 0) {
        setProgress(0);
        return;
      }
      // A genuine downward pull from the top is underway — take over the
      // gesture so the page doesn't rubber-band/scroll along with it too.
      e.preventDefault();
      setProgress(deltaY);
    },
    { passive: false }
  );

  function endDrag() {
    if (!dragging) return;
    dragging = false;
    indicator.classList.remove("pulling");
    const progress = parseFloat(indicator.style.getPropertyValue("--ptr-progress")) || 0;
    if (progress >= 1 && !triggered) {
      triggered = true;
      indicator.classList.add("refreshing");
      location.reload();
    } else {
      indicator.classList.add("settling");
      setProgress(0);
    }
    startY = null;
  }

  document.addEventListener("touchend", endDrag, { passive: true });
  document.addEventListener("touchcancel", endDrag, { passive: true });
})();
