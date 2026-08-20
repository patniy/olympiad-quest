const CACHE="olympiad-quest-v5";
const ASSETS=["./","./index.html","./questions.js","./manifest.json","./icon.svg","./theme-fix.js","./question-fix.js"];

async function appResponse(req){
  const cache=await caches.open(CACHE);
  let response=await cache.match(req);
  if(!response) response=await fetch(req);
  if(req.mode==="navigate" || req.destination==="document"){
    const text=await response.text();
    if(!text.includes('theme-fix.js')){
      const injected=text.replace("</body>",
        '<script src="theme-fix.js"></script><script src="question-fix.js"></script></body>');
      return new Response(injected,{headers:{"Content-Type":"text/html;charset=UTF-8"}});
    }
  }
  return response;
}
self.addEventListener("install",e=>e.waitUntil(
  caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())
));
self.addEventListener("activate",e=>e.waitUntil(
  caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))
    .then(()=>self.clients.claim())
));
self.addEventListener("fetch",e=>e.respondWith(appResponse(e.request)));
