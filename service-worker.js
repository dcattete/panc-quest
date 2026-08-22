const CACHE = "panc-quest-v3";
const ROOT = new URL("./", self.location.href).href;
const CORE = [ROOT, new URL("styles.css", ROOT).href, new URL("app.js", ROOT).href, new URL("manifest.webmanifest", ROOT).href, new URL("icon.svg", ROOT).href, new URL("ora-pro-nobis.jpg", ROOT).href, new URL("capuchinha.jpg", ROOT).href, new URL("peixinho-da-horta.jpg", ROOT).href, new URL("beldroega.jpg", ROOT).href, new URL("taioba.jpg", ROOT).href];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(CORE)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key)))));
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(caches.match(event.request).then((cached) => {
    const network = fetch(event.request).then((response) => {
      const copy = response.clone();
      caches.open(CACHE).then((cache) => cache.put(event.request, copy));
      return response;
    }).catch(() => cached || caches.match(ROOT));
    return cached || network;
  }));
});
