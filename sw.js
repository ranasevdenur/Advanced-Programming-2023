const CACHE ='Advanced-Programming-2023'
const FILES = ['/CW0/CW0.html', '/CW1/CW1.html', '/CW2/CW2.html', '/CW4/CW4.html', '/CW5/CW5.html','/CW6/CW6.html','/CW7/CW7.html','/CW8/CW8.html','/CW9/CW9.html','/HW1/HW1.html','/HW3/HW3.html','/Project/Calculator.html']

function installCB(e) {
  e.waitUntil(
    caches.open(CACHE)
    .then(cache => cache.addAll(FILES))
    .catch(console.log)
  )
}
self.addEventListener('install', installCB)

function save(req, resp) {
  return caches.open(CACHE)
  .then(cache => {
    cache.put(req, resp.clone());
    return resp;
  })
  .catch(console.log)
}
function fetchCB(e) { //fetch first
  let req = e.request
  console.log('JS_Class', req.url);
  e.respondWith(
    fetch(req).then(r2 => save(req, r2))
    .catch(() => { return caches.match(req).then(r1 => r1) })
  )
}
self.addEventListener('fetch', fetchCB)
