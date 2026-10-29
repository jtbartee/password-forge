// Password Forge service worker: keeps the app working offline.
// Serves from the cache first, then refreshes the cache in the background,
// so a pushed update shows up on the visit after next without a version bump.
// Bump CACHE only when the list of ASSETS changes.
'use strict';

var CACHE = 'forge-v2';
var ASSETS = [
  './',
  'index.html',
  'manifest.webmanifest',
  'fonts/fraunces.woff2',
  'fonts/manrope.woff2',
  'fonts/jetbrains-mono.woff2',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'icons/apple-touch-icon.png'
];

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE)
      .then(function (cache) { return cache.addAll(ASSETS); })
      .then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys()
      .then(function (keys) {
        return Promise.all(keys.filter(function (k) { return k !== CACHE; })
          .map(function (k) { return caches.delete(k); }));
      })
      .then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (e) {
  var req = e.request;
  var url = new URL(req.url);
  if (req.method !== 'GET' || url.origin !== self.location.origin) return;
  var key = url.origin + url.pathname;

  e.respondWith(caches.open(CACHE).then(function (cache) {
    return cache.match(req, { ignoreSearch: true }).then(function (cached) {
      var refresh = fetch(req).then(function (res) {
        if (res.ok) cache.put(key, res.clone());
        return res;
      });
      if (cached) {
        e.waitUntil(refresh.catch(function () {}));
        return cached;
      }
      // Not cached yet: go to the network, and fall back to the app shell
      // for page loads when offline.
      return refresh.catch(function () {
        if (req.mode === 'navigate') return cache.match('./');
        throw new Error('offline');
      });
    });
  }));
});
