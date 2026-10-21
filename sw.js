var C='quiz-v1';
var SHELL=['./','./index.html','./manifest.json','./islamic-192.png','./islamic-512.png'];
function key(r){var u=new URL(r.url);return u.origin+u.pathname}
self.addEventListener('install',function(e){e.waitUntil(caches.open(C).then(function(c){return c.addAll(SHELL)}).then(function(){return self.skipWaiting()}))});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(x){return x!==C}).map(function(x){return caches.delete(x)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener('fetch',function(e){
var r=e.request;if(r.method!=='GET')return;
var u=new URL(r.url);var same=u.origin===location.origin;
var fresh=same&&(r.mode==='navigate'||/questions\.json$|index\.html$|\/$/.test(u.pathname));
if(fresh){
e.respondWith(fetch(r).then(function(res){var cp=res.clone();caches.open(C).then(function(c){c.put(key(r),cp)});return res}).catch(function(){return caches.match(key(r)).then(function(m){return m||caches.match('./index.html')})}));
return}
e.respondWith(caches.match(key(r)).then(function(m){return m||fetch(r).then(function(res){var cp=res.clone();caches.open(C).then(function(c){c.put(key(r),cp)});return res})}));
});
