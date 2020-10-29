<<<<<<< HEAD
// These JavaScript module imports need to be bundled:
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { CacheFirst } from 'workbox-strategies';

// Use the imported Workbox libraries to implement caching,
// routing, and other logic:
precacheAndRoute(self.__WB_MANIFEST);
registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst({ cacheName: 'images' }),
);

self.addEventListener('push', function (event) {
  const payload = event.data ? event.data.text() : 'no payload';

  event.waitUntil(
    self.registration.showNotification('ServiceWorker Cookbook', {
      body: payload,
    }),
  );
});
=======
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';

precacheAndRoute(self.__WB_MANIFEST);

registerRoute(
  ({ request }) => request.destination === 'image',
  new StaleWhileRevalidate({ cacheName: 'images' }),
);
>>>>>>> a387f7432d99cdf4a538edc5439e7f71e4060c2a
