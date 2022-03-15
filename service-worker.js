/* eslint-disable no-restricted-globals */

/* global self, caches, fetch */

const CACHE = 'cache-a06fd43';

self.addEventListener('install', e => {
  e.waitUntil(precache()).then(() => self.skipWaiting());
});

self.addEventListener('activate', event => {
  self.clients
    .matchAll({
      includeUncontrolled: true,
    })
    .then(clientList => {
      const urls = clientList.map(client => client.url);
      console.log('[ServiceWorker] Matching clients:', urls.join(', '));
    });

  event.waitUntil(
    caches
      .keys()
      .then(cacheNames =>
        Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE) {
              console.log('[ServiceWorker] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
            return null;
          })
        )
      )
      .then(() => {
        console.log('[ServiceWorker] Claiming clients for version', CACHE);
        return self.clients.claim();
      })
  );
});

function precache() {
  return caches.open(CACHE).then(cache => cache.addAll(["./","./favicon.png","./colophon.html","./index.html","./manifest.json","./section0005.html","./section0006.html","./section0007.html","./section0008.html","./section0009.html","./section0010.html","./section0011.html","./section0012.html","./section0013.html","./section0014.html","./section0015.html","./section0016.html","./section0017.html","./section0018.html","./section0019.html","./section0020.html","./section0021.html","./section0022.html","./section0023.html","./section0024.html","./section0025.html","./section0026.html","./section0027.html","./section0028.html","./section0029.html","./section0030.html","./section0031.html","./section0032.html","./section0033.html","./section0034.html","./section0035.html","./section0036.html","./section0037.html","./fonts/Literata-Italic-var.woff2","./fonts/Literata-var.woff2","./fonts/LiterataTT-TextItalic.woff2","./fonts/LiterataTT-TextRegular.woff2","./fonts/LiterataTT-TextSemibold.woff2","./fonts/LiterataTT_LICENSE.txt","./fonts/SpaceGroteskVF.woff2","./fonts/SpaceGroteskVF_LICENSE.txt","./resources/88x31.png","./resources/obalka.jpg","./resources/pd-88x31.png","./resources/upoutavka_eknihy.jpg","./scripts/bundle.js","./style/style.min.css","./template-images/circles.png"]));
}

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.open(CACHE).then(cache => {
      return cache.match(e.request).then(matching => {
        if (matching) {
          console.log('[ServiceWorker] Serving file from cache.');
          console.log(e.request);
          return matching;
        }

        return fetch(e.request);
      });
    })
  );
});
