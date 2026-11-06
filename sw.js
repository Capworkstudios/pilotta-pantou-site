/* Πιλόττα Παντού: offline cache. Network first for the page (so updates arrive), cache as fallback. */
var C='pilotta-f6ace7a7', FILES=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png','icon-maskable-512.png'];
self.addEventListener('install',function(e){ e.waitUntil(caches.open(C).then(function(c){ return c.addAll(FILES); }).then(function(){ return self.skipWaiting(); })); });
self.addEventListener('activate',function(e){ e.waitUntil(caches.keys().then(function(ks){ return Promise.all(ks.filter(function(k){ return k!==C && k.indexOf('pilotta-')===0; }).map(function(k){ return caches.delete(k); })); }).then(function(){ return self.clients.claim(); })); });
self.addEventListener('fetch',function(e){
  var r=e.request; if(r.method!=='GET') return;
  var u=new URL(r.url);
  if(u.origin===location.origin){
    e.respondWith(fetch(r).then(function(res){ if(res.ok){ var cp=res.clone(); caches.open(C).then(function(c){ c.put(r,cp); }); } return res; }).catch(function(){ return caches.match(r).then(function(m){ return m || caches.match('index.html'); }); }));
  } else if(u.hostname==='fonts.googleapis.com' || u.hostname==='fonts.gstatic.com'){
    e.respondWith(caches.open(C).then(function(c){ return c.match(r).then(function(m){ var f=fetch(r).then(function(res){ c.put(r,res.clone()); return res; }).catch(function(){ return m; }); return m || f; }); }));
  }
});
