const CACHE_NAME = 'ecrin-universe-v4';

// Yeni service worker yüklendiğinde hemen aktifleş
self.addEventListener('install', (e) => {
  self.skipWaiting();
});

// Eski tüm önbellekleri (v1, v2) tamamen sil ve yeni versiyonu sahiplen
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((k) => caches.delete(k))
      );
    }).then(() => self.clients.claim())
  );
});

// Network-First Stratejisi: Daima en güncel site içeriğini canlıdan al
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;

  e.respondWith(
    fetch(e.request)
      .then((networkRes) => {
        return networkRes;
      })
      .catch(() => {
        return caches.match(e.request);
      })
  );
});
