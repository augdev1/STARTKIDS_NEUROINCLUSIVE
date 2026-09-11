/* ==========================================================================
   SERVICE WORKER - STARKIDS PWA
   Permite que o aplicativo seja instalado em celulares/tablets, funcione em
   tela cheia e carregue instantaneamente mesmo em redes lentas.
   ========================================================================== */

const CACHE_NAME = 'startkids-cache-v3';
const PRECACHE_ASSETS = [
  '/',
  '/login.html',
  '/index.html',
  '/css/style.css',
  '/css/animations.css',
  '/css/login.css',
  '/js/app.js',
  '/js/audio.js',
  '/js/speech.js',
  '/js/mascot.js',
  '/js/authService.js',
  '/js/educationalGames.js',
  '/js/calmMode.js',
  '/js/wardrobe.js',
  '/js/accessoriesData.js',
  '/js/login.js',
  '/js/emojiEnhancer.js',
  '/manifest.json',
  '/assets/startkids_logo_card.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS).catch((err) => {
        console.warn('[SW] Aviso ao pré-carregar alguns assets:', err.message);
      });
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // NUNCA faz cache de chamadas da API (sempre rede em tempo real)
  if (url.pathname.startsWith('/api/')) {
    return;
  }

  // Network-First para HTML, CSS e JS: sempre busca a versão mais recente em tempo real
  if (
    event.request.mode === 'navigate' ||
    url.pathname.endsWith('.html') ||
    url.pathname.endsWith('.css') ||
    url.pathname.endsWith('.js')
  ) {
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const clone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return networkResponse;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // Cache-First para imagens e mídias estáticas
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) return cachedResponse;
      return fetch(event.request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const clone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        }
        return networkResponse;
      });
    })
  );
});
