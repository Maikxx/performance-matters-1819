const CACHE_NAME = 'performance-matters-cache'
const CORE_ASSETS = [
    '/scripts/index.js',
    '/css/DataList.css',
    '/css/index.css',
    '/css/master.css',
    '/offline.html',
    '/assets/offline-placeholder.gif'
]

self.addEventListener('install', event => {
    event.waitUntil(
        caches
        .open(CACHE_NAME)
        .then(cache => cache.addAll(CORE_ASSETS))
        .then(() => self.skipWaiting())
    )
})

self.addEventListener('fetch', event => {
    if (event.request.mode === 'navigate'
        || (event.request.method === 'GET'
            && event.request.headers.get('accept').includes('text/html')
        )
    ) {
        event.respondWith(fetch(event.request.url).catch(error => caches.match('/offline.html')))
    }
    else {
        event.respondWith(
            caches
            .match(event.request)
            .then(response => response
                ? response
                : fetch(event.request)
            )
        )
    }
})