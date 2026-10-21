const CACHE_NAME = 'ecrin-universe-v15';

// Yeni service worker yüklendiğinde hemen aktifleş
self.addEventListener('install', (e) => {
  self.skipWaiting();
});

// Eski tüm önbellekleri sil ve yeni versiyonu sahiplen
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

// 💓 KOZMİK SEVGİ SİNYALİ - KİLİT EKRANI BİLDİRİM YÖNETİCİSİ
self.addEventListener('push', (event) => {
  let data = {
    title: '❤️ Ecrin & Efe',
    body: 'Seni çok seviyorum! Kalbim şu an senin için çarpıyor... 💖',
    tag: 'love-signal',
    url: '/#love'
  };

  if (event.data) {
    try {
      const parsed = event.data.json();
      data = Object.assign(data, parsed);
    } catch (err) {
      const txt = event.data.text();
      if (txt) data.body = txt;
    }
  }

  const options = {
    body: data.body,
    icon: '/apple-touch-icon.png',
    badge: '/assets/icons/favicon-32x32.png',
    vibrate: [150, 80, 200, 100, 250],
    tag: data.tag || 'love-signal',
    renotify: true,
    requireInteraction: true,
    data: {
      url: data.url || '/#love'
    }
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// Bildirime tıklandığında uygulamayı öne getir veya aç
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const targetUrl = event.notification.data?.url || '/#love';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
      for (let client of windowClients) {
        if ('focus' in client) {
          client.navigate(targetUrl);
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});
