const CACHE_NAME = "WORLD-WIDE-WEB";
const FILES_TO_CACHE = [
    "/index.html",
    "/sdr/css/style.css",
    "/sdr/js/script.js",
    "/manifest.json",
    "/service-worker.js",
    "/sdr/image/icons/icon-192.png",
    "/sdr/image/icons/icon-512.png",
    "/sdr/image/logo.png",
    "/sdr/image/plano_fundo.jpg"
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(FILES_TO_CACHE);
        })
    );
    self.skipWaiting();
});

self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );

});


