// sw.js — service worker for offline caching.
//
// Strategy: cache-first for the app shell (HTML/CSS/JS/data/icons), with a
// network fallback that also updates the cache. Bump CACHE_NAME whenever
// shell files change so old clients pick up the new version.

const CACHE_NAME = "doomsday-tracker-v22";

const APP_SHELL = [
  "./",
  "index.html",
  "styles.css",
  "app.js",
  "data.js",
  "themes.js",
  "pwa.js",
  "sync.js",
  "firebase-config.js",
  "manifest.json",
  "icons/icon-192.png",
  "icons/icon-512.png",
  "icons/apple-touch-icon.png",
  "icons/favicon-32.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  // Only handle same-origin GET requests; let everything else pass through.
  if (event.request.method !== "GET" || !event.request.url.startsWith(self.location.origin)) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;

      return fetch(event.request)
        .then((response) => {
          if (response && response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => {
          // Offline and not cached — fall back to the shell page for
          // navigations so the app still opens.
          if (event.request.mode === "navigate") {
            return caches.match("index.html");
          }
          return undefined;
        });
    })
  );
});
