/**
 * service-worker.js – Chloé Aventure v5
 * Cache + notifications programmées
 */

const CACHE_NAME = 'chloe-aventure-v6';
const STATIC_ASSETS = [
  './', './index.html', './style.css', './app.js', './api.js',
  './manifest.json', './icons/icon-192.png', './icons/icon-512.png',
  'https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&display=swap',
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(STATIC_ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))
    .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (url.hostname.includes('script.google.com')) {
    e.respondWith(fetch(e.request).catch(() => new Response(JSON.stringify({ error: 'Offline' }), { headers: { 'Content-Type': 'application/json' } })));
    return;
  }
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(res => {
        if (!res || res.status !== 200 || res.type === 'opaque') return res;
        const clone = res.clone();
        caches.open(CACHE_NAME).then(c => c.put(e.request, clone));
        return res;
      }).catch(() => e.request.mode === 'navigate' ? caches.match('./index.html') : null);
    })
  );
});

/* ── Notifications push ───────────────────────────────────────── */
self.addEventListener('push', e => {
  const data = e.data?.json() ?? {};
  e.waitUntil(self.registration.showNotification(data.title || 'Chloé Aventure', {
    body: data.body || 'Tu as des missions à accomplir !',
    icon: './icons/icon-192.png',
    badge: './icons/icon-72.png',
    vibrate: [100, 50, 100],
    data: { url: './' },
    actions: [{ action: 'open', title: '🎯 Voir mes missions' }]
  }));
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(clients.openWindow(e.notification.data?.url || './'));
});

/* ── Rappel quotidien via periodic background sync ──────────── */
self.addEventListener('periodicsync', e => {
  if (e.tag === 'daily-reminder') {
    e.waitUntil(sendDailyReminder());
  }
});

async function sendDailyReminder() {
  const allClients = await self.clients.matchAll();
  if (allClients.length > 0) return; // App ouverte, pas besoin
  await self.registration.showNotification('Chloé Aventure 🌍', {
    body: 'N\'oublie pas tes missions du jour ! 🎯',
    icon: './icons/icon-192.png',
    badge: './icons/icon-72.png',
    vibrate: [100, 50, 100],
  });
}
