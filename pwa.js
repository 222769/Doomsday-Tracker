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
