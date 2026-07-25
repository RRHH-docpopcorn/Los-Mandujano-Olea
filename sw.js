// Service worker mínimo — solo necesario para que el navegador
// permita "instalar" la app. No guarda nada en caché de forma agresiva
// porque los datos siempre deben venir frescos de Supabase.
const CACHE_NAME = 'mandujano-olea-v1';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  // Red primero; si no hay conexión, intenta servir desde caché.
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
