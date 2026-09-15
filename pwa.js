// pwa.js — registers the service worker. Included on every page so the
// app shell gets cached (and offline access works) no matter which
// page a visitor lands on first.

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch((err) => {
      console.warn("Service worker registration failed:", err);
    });
  });
}
