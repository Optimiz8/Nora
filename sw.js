const CACHE_VERSION = 'nora-v2.16';
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const AUDIO_CACHE  = 'nora-audio-stable'; // Indépendant de la version — survit aux mises à jour

/* ---------- LISTE DES RESSOURCES STATIQUES À PRÉ-CACHER ---------- */
const STATIC_ASSETS = [
  // Pages HTML
  './',
  './index.html',
  './a-propos.html',
  './besoins.html',
  './capacites.html',
  './carte.html',
  './carte-config.html',
  './cartes-com-config.html',
  './cartes-communication.html',
  './cliqueur.html',
  './coherence.html',
  './confidentialite.html',
  './conseils.html',
  './contacts-urgence.html',
  './contexte-commun.html',
  './contexte-detail.html',
  './contextes-liste.html',
  './etats.html',
  './faq.html',
  './fidgets.html',
  './harmonie-visuelle.html',
  './infos-medicales.html',
  './journal.html',
  './mon-profil.html',
  './parametres.html',
  './playlist.html',
  './Pop-it.html',
  './profil-crise.html',
  './recap.html',
  './recap-exemple.html',
  './Slider.html',
  './sons.html',
  './stats.html',
  './stats-approfondie.html',
  './timer.html',
  './tutoriel.html',
  './404.html',
  // CSS, JS partagés & manifest
  './nora-common.css',
  './nora-data.js',
  './nora-scroll.js',
  './sw-register.js',
  './manifest.webmanifest',
  './assets/js/qrcode.min.js',
  // Images
  './assets/images/logo.png',
  './assets/images/favicone.png',
  './assets/images/shortcut-cartes.svg',
  './assets/images/shortcut-cartes.png',
  './assets/images/shortcut-coherence.svg',
  './assets/images/shortcut-coherence.png',
  './assets/images/shortcut-timer.svg',
  './assets/images/shortcut-timer.png',
  './assets/images/shortcut-urgence.svg',
  './assets/images/shortcut-urgence.png',
  './assets/images/ruisseau.jpg',
  './assets/images/underwater.jpg',
  "./assets/images/arriv\u00e9e au refuge.jpg",
  './assets/images/chant des oiseaux.jpg',
  './assets/images/chant des grillons.jpg',
  './assets/images/chanter sous la pluie.jpg',
  './assets/images/chant nocturne.jpg',
  './assets/images/chant des baleines.jpg',
  './assets/images/bruits de bouche.jpg',
  './assets/images/doux ronronnements.jpg',
  './assets/images/gouttes du ciel.jpg',
  "./assets/images/\u00e9crire son histoire.jpg",
  './assets/images/feu de chemin\u00e9e.jpg',
  "./assets/images/l'appel lointain.jpg",
  "./assets/images/nuit d'\u00e9t\u00e9.jpg",
  "./assets/images/libre comme l'air.jpg",
  "./assets/images/l'appel de la for\u00eat.jpg",
  './assets/images/mar\u00e9e basse.jpg',
  './assets/images/orage.jpg',
  './assets/images/paisibles flottements.jpg',
  './assets/images/relaxation l\u00e9g\u00e8re.jpg',
  './assets/images/pluie sur la fen\u00eatre.jpg',
  './assets/images/promenade en bord de mer.jpg',
  './assets/images/balade au bord du ruisseau.jpg',
  './assets/images/train.jpg',
  './assets/images/sur le rivage.jpg',
  './assets/images/voyage interieur.jpg',
  './assets/images/vers les \u00e9toiles.jpg',
  './assets/images/pluie.jpg',
  // Animations Lottie / vidéos
  './assets/Glitter-Star.json',
  './assets/Glitter-Star.webm',
  './assets/SearchEmpty404.json',
  './assets/Search-Empty404.webm',
  './assets/Space-Man.json',
  './assets/Space-Man.webm',
  './assets/Sunrise-Breathe in Breathe out.json',
  './assets/Sunrise - Breathe in Breathe out.webm',
];

/* ---------- INSTALLATION : pré-cache des ressources statiques ---------- */
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then(cache =>
      Promise.all(
        STATIC_ASSETS.map(url =>
          fetch(url)
            .then(r => { if (r.ok) return cache.put(url, r); })
            .catch(() => {}) // échec silencieux pour ne pas bloquer l'install
        )
      )
    )
  );
  self.skipWaiting();
});

/* ---------- ACTIVATION : nettoyage des anciens caches ---------- */
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(k => k !== STATIC_CACHE && k !== AUDIO_CACHE)
          .map(k => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

/* ---------- FETCH : stratégie par type de ressource ---------- */
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Ignorer les requêtes externes (playlist, CDN…)
  if (url.origin !== self.location.origin) return;

  // Audio : cache-first (les fichiers ne changent pas)
  if (url.pathname.includes('/assets/audio/')) {
    event.respondWith(cacheFirst(event.request, AUDIO_CACHE));
    return;
  }

  // Tout le reste : stale-while-revalidate
  event.respondWith(staleWhileRevalidate(event.request, STATIC_CACHE));
});

/* ---------- STRATÉGIES DE CACHE ---------- */

// Retourne le cache immédiatement + met à jour en arrière-plan
async function staleWhileRevalidate(request, cacheName) {
  const cache  = await caches.open(cacheName);
  const cached = await cache.match(request);

  const fetchPromise = fetch(request)
    .then(response => {
      if (response && response.ok) cache.put(request, response.clone());
      return response;
    })
    .catch(async () => cached || await cache.match('./404.html'));

  return cached || fetchPromise;
}

// Retourne le cache si dispo, sinon va chercher sur le réseau
async function cacheFirst(request, cacheName) {
  const cache  = await caches.open(cacheName);
  const cached = await cache.match(request);
  if (cached) return cached;

  const response = await fetch(request).catch(() => null);
  if (response && response.ok) cache.put(request, response.clone());
  return response;
}

/* ---------- MESSAGES : cache à la demande pour les sons de préréglages ---------- */
self.addEventListener('message', event => {
  if (event.data?.type === 'CACHE_AUDIO') {
    const urls = event.data.urls || [];
    caches.open(AUDIO_CACHE).then(cache => {
      urls.forEach(url => {
        fetch(url)
          .then(r => { if (r.ok) cache.put(url, r); })
          .catch(() => {});
      });
    });
  }
});
