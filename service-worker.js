const CACHE_NAME = "WORLD-WIDE-WEB";
const FILES_TO_CACHE = [
    "index.html",
    "/sdr/css/style.css",
    "manifest.json",
    "/sdr/image/icons/icon-192.png",
    "/sdr/image/icons/icon-512.png",
    "/sdr/image/logo.png"
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(FILES_TO_CACHE);
        })
    );
    self.skipWaiting();
});

self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
            );
        })
    );
    self.clients.claim();
});

self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});