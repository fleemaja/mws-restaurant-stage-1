const restaurantReviewsCache = 'reviews-v0.01';

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(restaurantReviewsCache).then(function(cache) {
      // not a scalable/maintainable way to cache project assets
      // use build tool if project changes/gets more complicated
      return cache.addAll(
        [
          '/',
          '/index.html',
          '/restaurant.html',
          '/js/dbhelper.js',
          '/js/main.js',
          '/js/restaurant_info.js',
          '/data/restaurants.json',
          '/css/styles.css',
          '/img/1.jpg',
          '/img/2.jpg',
          '/img/3.jpg',
          '/img/4.jpg',
          '/img/5.jpg',
          '/img/6.jpg',
          '/img/7.jpg',
          '/img/8.jpg',
          '/img/9.jpg',
          '/img/10.jpg'
        ]
      );
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith('reviews-') &&
                cacheName != restaurantReviewsCache;
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('message', function(event) {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});
