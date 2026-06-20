const CACHE = "diccionario-latin-v1";

const ARCHIVOS = [
    "./",
    "index.html",
    "style.css",
    "script.js",
    "diccionario.txt",
    "icono.png",
    "manifest.json"
];

self.addEventListener("install", evento => {

    evento.waitUntil(

        caches.open(CACHE)
            .then(cache => cache.addAll(ARCHIVOS))

    );

});

self.addEventListener("fetch", evento => {

    evento.respondWith(

        caches.match(evento.request)
            .then(respuesta => {

                return respuesta || fetch(evento.request);

            })

    );

});