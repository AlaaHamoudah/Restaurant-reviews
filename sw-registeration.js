
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/sw-registeration.js').then(function() {
        console.log("Service worker is registred ")
      }, function(err) {
        // registration failed :(
        console.log('ServiceWorker registration failed: ', err);
      });
    });
  }

 
  var CACHE_NAME = 'restaurant-cache-v1';
  var urlsToCache = [
    '/',
    '/index.html',
    '/restaurant.html',
    '/css/mobile.css',
    '/css/tablet.css',
    '/css/styles.css',
    '/js/dbhelper.js',
    '/js/main.js',
    '/js/restaurant_info.js',
    '/data/restaurants.json'
  ];

  self.addEventListener('install', function(event) {
  console.log('Service Worker installing.');
   // Perform install steps
    event.waitUntil(
      caches.open(CACHE_NAME)
        .then(function(cache) {
          console.log('Install all assets in cache');
          return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('fetch', function(event) {
  console.log('Service Worker fetching from cache.');
  event.respondWith(
    fetch(event.request).catch(function() {
      return caches.match(event.request, {'ignoreSearch':true}).then(function(response) {
        return response || fetch(event.request);
      })
    })
  );
});
