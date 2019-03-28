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
        event.respondWith(fetch(event.request.url)
            .then(response => {
                return caches
                    .open('html-cache')
                    .then(cache => {
                        return cache.put(event.request.url, response.clone())
                    })
                    .then(() => {
                        return response
                    })
            })
            .catch(() => {
                return caches.open('html-cache')
                    .then(cache => {
                        return caches.match(event.request.url)
                            .then(response => {
                                return response ? response : caches.open(CACHE_NAME)
                                    .then(cache => {
                                        return cache.match('/offline.html').then(response => {
                                            return response
                                        })
                                    })
                            })
                    })
            })
        )
    } else {
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