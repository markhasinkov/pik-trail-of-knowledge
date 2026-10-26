/* Сгенерировано .tools/sw-build.mjs — не редактировать dist/sw.js вручную. */
const SHELL = [
  "./assets/index-BfEdNE5m.css",
  "./assets/index-T4pnt9PI.js",
  "./assets/pixelify-sans-cyrillic-400-normal-DfOZNMlW.woff",
  "./assets/pixelify-sans-cyrillic-600-normal-B3EuUOZG.woff",
  "./assets/pixelify-sans-cyrillic-700-normal-BrZTw8tu.woff",
  "./assets/pixelify-sans-latin-400-normal-DLrIX9QE.woff2",
  "./assets/pixelify-sans-latin-400-normal-JapMNN6Z.woff",
  "./assets/pixelify-sans-latin-600-normal-BNlgYbDL.woff",
  "./assets/pixelify-sans-latin-600-normal-Dd_Dy7u5.woff2",
  "./assets/pixelify-sans-latin-700-normal-BctWAS0u.woff",
  "./assets/pixelify-sans-latin-700-normal-D3Xxx3QE.woff2",
  "./assets/pixelify-sans-latin-ext-400-normal-BkfTUL4s.woff",
  "./assets/pixelify-sans-latin-ext-400-normal-DdH6zlBQ.woff2",
  "./assets/pixelify-sans-latin-ext-600-normal-CDaIumwU.woff",
  "./assets/pixelify-sans-latin-ext-600-normal-Dha6RiOG.woff2",
  "./assets/pixelify-sans-latin-ext-700-normal-BadXkHzZ.woff",
  "./assets/pixelify-sans-latin-ext-700-normal-ClyJstAh.woff2",
  "./favicon.svg",
  "./index.html"
];
const VERSION = 'pik-2aabb6aa6d';
const SHELL_CACHE = `${VERSION}-shell`;
const RUNTIME_CACHE = `${VERSION}-runtime`;
const CACHE_PREFIX = 'pik-';
const ROOT = new URL('./', self.registration.scope);
const SHELL_URL = new URL('./index.html', ROOT).href;

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(SHELL_CACHE)
      .then((cache) =>
        cache.addAll(SHELL.map((file) => new Request(new URL(file, ROOT).href))),
      )
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter(
              (key) =>
                key.startsWith(CACHE_PREFIX) && key !== SHELL_CACHE && key !== RUNTIME_CACHE,
            )
            .map((key) => caches.delete(key)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

async function serveShell(request) {
  const cache = await caches.open(SHELL_CACHE);
  const cached = await cache.match(SHELL_URL);
  const network = fetch(request)
    .then((response) => {
      if (response.status === 200) void cache.put(SHELL_URL, response.clone());
      return response;
    })
    .catch(() => null);
  return cached || (await network) || Response.error();
}

async function serveAsset(request) {
  const cached = await caches.match(request);
  const network = fetch(request)
    .then((response) => {
      if (response.status === 200) {
        const copy = response.clone();
        void caches.open(RUNTIME_CACHE).then((cache) => cache.put(request, copy));
      }
      return response;
    })
    .catch(() => null);
  return cached || (await network) || Response.error();
}

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;
  if (new URL(request.url).origin !== self.location.origin) return;
  event.respondWith(request.mode === 'navigate' ? serveShell(request) : serveAsset(request));
});
