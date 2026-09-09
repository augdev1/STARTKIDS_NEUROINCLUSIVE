/* ==========================================================================
   SERVICE WORKER - STARKIDS PWA
   Permite que o aplicativo seja instalado em celulares/tablets, funcione em
   tela cheia e carregue instantaneamente mesmo em redes lentas.
   ========================================================================== */

const CACHE_NAME = 'startkids-cache-v1';
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

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        // Atualiza o cache em segundo plano (Stale-While-Revalidate)
        fetch(event.request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              caches.open(CACHE_NAME).then((cache) => cache.put(event.request, networkResponse));
            }
          })
          .catch(() => {});
        return cachedResponse;
      }
      return fetch(event.request);
    })
  );
});
