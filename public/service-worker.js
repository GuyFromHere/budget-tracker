const FILES_TO_CACHE = [
  '/',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  'db.js',
  '/index.html',
  '/index.js',
  '/manifest.webmanifest',
  '/styles.css'
];

const PRECACHE = "pre-cache";

// install
self.addEventListener("install", function(e) {
  e.waitUntil(
    caches.open(PRECACHE).then(cache => {
      console.log("Your files were pre-cached successfully!");
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// activate
/* self.addEventListener("activate", function(e) {
  e.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(
        keyList.map(key => {
          if (key !== PRECACHE && key !== DATA_CACHE_NAME) {
            console.log("Removing old cache data", key);
            return caches.delete(key);
          }
        })
      );
    })
  );

  self.clients.claim();
}); */

// fetch
self.addEventListener("fetch", function(e) {
  if (e.request.url.includes("/api/")) {
    e.respondWith(
      caches.open(DATA_CACHE_NAME).then(cache => {
        return fetch(e.request)
          .then(response => {
            // If the response was good, clone it and store it in the cache.
            if (response.status === 200) {
              cache.put(e.request.url, response.clone());
            }
            return response;
          })
          .catch(err => {
            console.log('No internet. Retrieve from cache...');
            // Network request failed, try to get it from the cache.
            return cache.match(e.request);
          });
      }).catch(err => console.log(err))
    );

    return;
  }

  e.respondWith(
    caches.open(PRECACHE).then(cache => {
      return cache.match(e.request).then(response => {
        return response || fetch(e.request);
      });
    })
  );
});
