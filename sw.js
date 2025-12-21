const cacheName = 'ski-v1.1';

const assets = [
  './',
  './index.html',
  './favicon.ico',
  'public/js/p8-music.js',
  'public/js/tunes.js',
  'public/ski_tiles.png?v=1.5',
  'public/js/littlejs.min.js',
];

self.addEventListener('install', (e) => {
  console.log('[SW] Installing...');
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      console.log('[SW] Caching all assets');
      // Using map to catch which specific file fails
      return Promise.all(
        assets.map(url => {
          return cache.add(url).catch(err => console.error(`[SW] Failed to cache: ${url}`, err));
        })
      );
    })
  );
});

// The Fetch Strategy: Network first, then fallback to Cache
self.addEventListener('fetch', (e) => {
  e.respondWith(
    fetch(e.request)
      .then((response) => {
        // If the network request is successful, return it
        return response;
      })
      .catch(() => {
        // If network fails (offline or blocked), try to find it in cache
        return caches.match(e.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          // IMPORTANT: If it's not in cache and network failed, 
          // we must return a valid "Response" object or null
          // Returning nothing/undefined causes the TypeError you saw.
          return new Response('Network error occurred', {
            status: 408,
            headers: { 'Content-Type': 'text/plain' },
          });
        });
      })
  );
});
