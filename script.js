let diccionario = [];

fetch("diccionario.txt")
    .then(respuesta => respuesta.text())
    .then(texto => {

        diccionario = texto.split("\n");

        const buscador = document.getElementById("buscador");

        buscador.addEventListener("input", buscar);

        const botonLimpiar =
    document.getElementById("limpiar");

botonLimpiar.addEventListener("click", () => {

    document.getElementById("buscador").value = "";
    document.getElementById("resultados").innerHTML = "";
    document.getElementById("contador").textContent = "";

    document.getElementById("buscador").focus();

});

    });

function buscar() {

    const textoOriginal =
    document.getElementById("buscador")
    .value
    .toLowerCase()
    .trim();

const textoBusqueda =
    textoOriginal
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

    const resultados =
        document.getElementById("resultados");

    const contador =
        document.getElementById("contador");

    if (textoBusqueda === "") {

        resultados.innerHTML = "";
        contador.textContent = "";
        return;

    }

    const coincidencias = diccionario
    .filter(linea =>

        linea
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .includes(textoBusqueda)

    )
        .sort((a, b) => {

            const aInicio =
                a.toLowerCase().startsWith(textoBusqueda);

            const bInicio =
                b.toLowerCase().startsWith(textoBusqueda);

            if (aInicio && !bInicio) return -1;
            if (!aInicio && bInicio) return 1;

            return a.localeCompare(b);

        });

    let html = "";

    coincidencias.slice(0, 50).forEach(linea => {

        const partes = linea.split("|");

        const latin = partes[0] || "";
        const espanol = partes[1] || "";

        const latinResaltado =
    latin.replaceAll(
    textoOriginal,
        `<span class="resaltado">${textoBusqueda}</span>`
    );

const espanolResaltado =
    espanol.replaceAll(
    textoOriginal,
        `<span class="resaltado">${textoBusqueda}</span>`
    );

        html += `
            <div class="entrada">
               <div class="latin">${latinResaltado}</div>
               <div class="espanol">${espanolResaltado}</div>
            </div>
        `;

    });

    contador.textContent =
        coincidencias.length + " resultados encontrados";

    resultados.innerHTML = html;

}

if ("serviceWorker" in navigator) {

    navigator.serviceWorker.register("service-worker.js");

}