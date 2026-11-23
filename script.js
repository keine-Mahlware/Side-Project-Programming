const zahlElemente = document.querySelectorAll(".zahl");
const linearSuchen = document.getElementById("linear-suchen");
const binarySuchen = document.getElementById("binary-suchen");
const binaryElemente = document.querySelectorAll(".binary-zahl");
const bubbleStart = document.getElementById("bubble-start");
const bubbleElemente = document.querySelectorAll(".bubble-zahl");
const selectionStart = document.getElementById("selection-start");
const selectionElemente = document.querySelectorAll(".selection-zahl");
const insertionStart = document.getElementById("insertion-start");
const insertionElemente = document.querySelectorAll(".insertion-zahl");
const mergeStart = document.getElementById("merge-start");
const mergeElemente = document.querySelectorAll(".merge-zahl");
const quickStart = document.getElementById("quick-start");
const quickElemente =document.querySelectorAll(".quick-zahl");


let quickAusgangszahlen = [14,3,18,7,11,1,20,5,16,9,2,13,6,19,10,4,17,8,12,15];
let mergeAusgangszahlen = [12,4,17,1,9,15,6,20,3,11,8,18,2,14,7,16,5,13,19,10];
let insertionZahlen = [3,10,14,1,18,13,2,9,17,5,12,8,16,4,19,11,7,15,20,6];
let selectionZahlen = [3,7,19,4,16,12,9,18,5,2,10,14,20,13,8,15,6,17,11,1];
let bubbleZahlen = [15,3,20,8,1,17,4,13,12,9,6,10,7,11,2,5,14,18,19,16];
let binaryZahlen = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
let zahlen = [8,1,16,13,3,12,5,17,4,9,2,6,10,14,20,19,7,11,15,18]



function warten(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

linearSuchen.addEventListener("click",async function() {
    zahlElemente.forEach(function(element) {
    element.classList.remove("pruefen");
    element.classList.remove("gefunden");
    });
    const gesucht = Number(document.getElementById("suchZahl").value);
    for (let i = 0; i < zahlen.length; i++) {
        zahlElemente[i].classList.add("pruefen");

        await warten(300);

        if (zahlen[i] == gesucht){

            zahlElemente[i].classList.remove("pruefen")
            zahlElemente[i].classList.add("gefunden")

            console.log("Gefunden!")
            break;
        }
        zahlElemente[i].classList.remove("pruefen")
    }
});

binarySuchen.addEventListener("click", async function() {

    const eingabe = document.getElementById("binarySuchZahl");
    const gesucht = Number(eingabe.value);

    // Markierungen der vorherigen Suche entfernen
    binaryElemente.forEach(function(element) {
        element.classList.remove(
            "pruefen",
            "gefunden",
            "ausgeschlossen"
        );
    });

    let links = 0;
    let rechts = binaryZahlen.length - 1;

    while (links <= rechts) {

        const mitte = Math.floor((links + rechts) / 2);

        // Die aktuelle Mitte darf nicht ausgeschlossen aussehen
        binaryElemente[mitte].classList.remove("ausgeschlossen");
        binaryElemente[mitte].classList.add("pruefen");

        await warten(500);

        // Zahl gefunden
        if (binaryZahlen[mitte] === gesucht) {
            binaryElemente[mitte].classList.remove(
                "pruefen",
                "ausgeschlossen"
            );

            binaryElemente[mitte].classList.add("gefunden");

            console.log("Gefunden!");
            break;
        }

        binaryElemente[mitte].classList.remove("pruefen");

        // Mitte ist kleiner als die gesuchte Zahl:
        // linke Hälfte einschließlich Mitte ausschließen
        if (binaryZahlen[mitte] < gesucht) {

            for (let i = links; i <= mitte; i++) {
                binaryElemente[i].classList.add("ausgeschlossen");
            }

            links = mitte + 1;

        } else {

            // Mitte ist größer als die gesuchte Zahl:
            // rechte Hälfte einschließlich Mitte ausschließen
            for (let i = mitte; i <= rechts; i++) {
                binaryElemente[i].classList.add("ausgeschlossen");
            }

            rechts = mitte - 1;
        }
    }
});
bubbleStart.addEventListener("click", async function() {

    for (let runde = 0; runde < bubbleZahlen.length - 1; runde++) {
        let getauscht = false;
        for (let i = 0; i < bubbleZahlen.length - 1 - runde; i++) {
            bubbleElemente[i].classList.add("pruefen");
            bubbleElemente[i + 1].classList.add("pruefen");

            await warten(200);
            if(bubbleZahlen[i] > bubbleZahlen[i +1]) {
                getauscht = true;
                  let temp = bubbleZahlen[i] ;
                
                  bubbleZahlen[i] = bubbleZahlen[i +1];
                  
                  bubbleZahlen[i +1] = temp;

                  bubbleElemente[i].textContent = bubbleZahlen[i];
                  bubbleElemente[i + 1].textContent = bubbleZahlen[i + 1];
            }
            bubbleElemente[i].classList.remove("pruefen");
            bubbleElemente[i + 1].classList.remove("pruefen");

        }
        bubbleElemente[bubbleZahlen.length - 1 - runde]
        .classList.add("sortiert");
        if (!getauscht) {

        for (let i = 0; i < bubbleElemente.length; i++) {
        bubbleElemente[i].classList.add("sortiert");
        }

        break;
        }
        
    }
    bubbleElemente[0].classList.add("sortiert");
});


selectionStart.addEventListener("click", async function() {

    for (let runde = 0;runde < selectionZahlen.length - 1;runde++) {

        let kleinsterIndex = runde;
         for (let i = runde + 1; i < selectionZahlen.length; i++) {
            selectionElemente[i].classList.add("pruefen");
            await warten(200);

            if (selectionZahlen[i] < selectionZahlen[kleinsterIndex]) {
                kleinsterIndex = i;
            }
            selectionElemente[i].classList.remove("pruefen");
        }
        let temp = selectionZahlen[runde];

        selectionZahlen[runde] = selectionZahlen[kleinsterIndex];
        selectionZahlen[kleinsterIndex] = temp;
        selectionElemente[runde].textContent = selectionZahlen[runde];
        selectionElemente[kleinsterIndex].textContent = selectionZahlen[kleinsterIndex];

        selectionElemente[runde].classList.add("sortiert");
    }
    selectionElemente[selectionElemente.length - 1]
    .classList.add("sortiert");
});

insertionStart.addEventListener("click", async function() {

    // Das erste Element gilt zunächst als sortierter Bereich
    insertionElemente[0].classList.add("sortiert");

    for (let i = 1; i < insertionZahlen.length; i++) {

        let aktuelleZahl = insertionZahlen[i];
        let j = i - 1;

        insertionElemente[i].classList.add("pruefen");

        await warten(200);

        while (j >= 0 && insertionZahlen[j] > aktuelleZahl) {

            insertionElemente[j].classList.add("pruefen");

            await warten(200);

            insertionZahlen[j + 1] = insertionZahlen[j];

            // Verschiebung auch im HTML anzeigen
            insertionElemente[j + 1].textContent = insertionZahlen[j + 1];

            insertionElemente[j].classList.remove("pruefen");

            j--;
        }

        // Aktuelle Zahl in die entstandene Lücke einsetzen
        insertionZahlen[j + 1] = aktuelleZahl;
        insertionElemente[j + 1].textContent = aktuelleZahl;

        insertionElemente[i].classList.remove("pruefen");

        // Der Bereich 0 bis i ist jetzt sortiert
        for (let k = 0; k <= i; k++) {
            insertionElemente[k].classList.add("sortiert");
        }
    }
});

async function mergeSortAnimiert(zahlen, startPosition) {

    // Abbruchbedingung:
    // Eine einzelne Zahl ist bereits sortiert
    if (zahlen.length <= 1) {

        mergeElemente[startPosition].classList.add("pruefen");

        await warten(100);

        mergeElemente[startPosition].classList.remove("pruefen");

        return zahlen;
    }

    let ende = startPosition + zahlen.length;

    // Aktuellen Bereich blau markieren
    for (let i = startPosition; i < ende; i++) {
        mergeElemente[i].classList.add("teilen");
    }

    await warten(200);

    for (let i = startPosition; i < ende; i++) {
        mergeElemente[i].classList.remove("teilen");
    }

    // Array teilen
    let mitte = Math.floor(zahlen.length / 2);

    let linkeHaelfte = zahlen.slice(0, mitte);
    let rechteHaelfte = zahlen.slice(mitte);

    // Linke Hälfte rekursiv sortieren
    let linksSortiert = await mergeSortAnimiert(
        linkeHaelfte,
        startPosition
    );

    // Rechte Hälfte rekursiv sortieren
    let rechtsSortiert = await mergeSortAnimiert(
        rechteHaelfte,
        startPosition + mitte
    );

    // Beide sortierten Hälften zusammenführen
    return await mergeAnimiert(
        linksSortiert,
        rechtsSortiert,
        startPosition
    );
}
async function mergeAnimiert(links, rechts, startPosition) {

    let ergebnis = [];

    let linksIndex = 0;
    let rechtsIndex = 0;

    let bereichLaenge = links.length + rechts.length;

    // Gesamten Bereich lila markieren
    for (
        let i = startPosition;
        i < startPosition + bereichLaenge;
        i++
    ) {
        mergeElemente[i].classList.add("zusammenfuehren");
    }

    await warten(200);

    // Solange beide Seiten noch Zahlen besitzen
    while (
        linksIndex < links.length &&
        rechtsIndex < rechts.length
    ) {

        let linkePosition = startPosition + linksIndex;

        let rechtePosition =
            startPosition + links.length + rechtsIndex;

        mergeElemente[linkePosition].classList.add("pruefen");
        mergeElemente[rechtePosition].classList.add("pruefen");

        await warten(200);

        if (links[linksIndex] <= rechts[rechtsIndex]) {

            ergebnis.push(links[linksIndex]);
            linksIndex++;

        } else {

            ergebnis.push(rechts[rechtsIndex]);
            rechtsIndex++;
        }

        mergeElemente[linkePosition].classList.remove("pruefen");
        mergeElemente[rechtePosition].classList.remove("pruefen");

        // Neu ausgewählten Wert direkt anzeigen
        let zielPosition =
            startPosition + ergebnis.length - 1;

        mergeElemente[zielPosition].textContent =
            ergebnis[ergebnis.length - 1];

        await warten(100);
    }

    // Verbleibende linke Werte übernehmen
    while (linksIndex < links.length) {

        ergebnis.push(links[linksIndex]);

        let zielPosition =
            startPosition + ergebnis.length - 1;

        mergeElemente[zielPosition].textContent =
            links[linksIndex];

        linksIndex++;

        await warten(100);
    }

    // Verbleibende rechte Werte übernehmen
    while (rechtsIndex < rechts.length) {

        ergebnis.push(rechts[rechtsIndex]);

        let zielPosition =
            startPosition + ergebnis.length - 1;

        mergeElemente[zielPosition].textContent =
            rechts[rechtsIndex];

        rechtsIndex++;

        await warten(100);
    }

    // Lila Markierung des fertig zusammengeführten Bereichs entfernen
    for (
        let i = startPosition;
        i < startPosition + bereichLaenge;
        i++
    ) {
        mergeElemente[i].classList.remove(
            "zusammenfuehren",
            "pruefen"
        );
    }

    return ergebnis;
}
mergeStart.addEventListener("click", async function() {

    mergeStart.disabled = true;

    try {
        mergeElemente.forEach(function(element, index) {
            element.classList.remove(
                "teilen",
                "pruefen",
                "zusammenfuehren",
                "sortiert"
            );

            element.textContent = mergeAusgangszahlen[index];
        });

        const arbeitsZahlen = [...mergeAusgangszahlen];

        const sortierteZahlen = await mergeSortAnimiert(
            arbeitsZahlen,
            0
        );

        for (let i = 0; i < sortierteZahlen.length; i++) {
            mergeElemente[i].textContent = sortierteZahlen[i];

            mergeElemente[i].classList.remove(
                "teilen",
                "pruefen",
                "zusammenfuehren"
            );

            mergeElemente[i].classList.add("sortiert");
        }

    } finally {
        mergeStart.disabled = false;
    }
});

function quickSort(zahlen) {

    // Abbruchbedingung
    if (zahlen.length <= 1) {
        return zahlen;
    }

    // Letzte Zahl als Pivot
    let pivot = zahlen[zahlen.length - 1];

    let kleiner = [];
    let groesser = [];

    // Alle Zahlen außer dem Pivot prüfen
    for (let i = 0; i < zahlen.length - 1; i++) {

        if (zahlen[i] < pivot) {
            kleiner.push(zahlen[i]);
        } else {
            groesser.push(zahlen[i]);
        }
    }

    // Beide Bereiche rekursiv sortieren
    let kleinerSortiert = quickSort(kleiner);
    let groesserSortiert = quickSort(groesser);

    // Alles zusammensetzen
    return [
        ...kleinerSortiert,
        pivot,
        ...groesserSortiert
    ];
}
async function quickSortAnimiert(zahlen, links, rechts) {

    if (links >= rechts) {

        if (links === rechts) {
            quickElemente[links].classList.add("sortiert");
        }

        return;
    }

    for (let i = links; i <= rechts; i++) {
        quickElemente[i].classList.add("bereich");
    }

    const pivotIndex = rechts;
    const pivotWert = zahlen[pivotIndex];

    quickElemente[pivotIndex].classList.add("pivot");

    await warten(200);

    let kleinerePosition = links;

    for (let i = links; i < rechts; i++) {

        quickElemente[i].classList.add("pruefen");

        await warten(200);

        if (zahlen[i] < pivotWert) {

            await quickTauschen(
                zahlen,
                i,
                kleinerePosition
            );

            kleinerePosition++;
        }

        quickElemente[i].classList.remove("pruefen");
    }

    await quickTauschen(
        zahlen,
        kleinerePosition,
        pivotIndex
    );

    quickElemente[pivotIndex].classList.remove("pivot");

    for (let i = links; i <= rechts; i++) {
        quickElemente[i].classList.remove("bereich");
    }

    quickElemente[kleinerePosition].classList.add("sortiert");

    await quickSortAnimiert(
        zahlen,
        links,
        kleinerePosition - 1
    );

    await quickSortAnimiert(
        zahlen,
        kleinerePosition + 1,
        rechts
    );
}
async function quickTauschen(zahlen, indexA, indexB) {

    if (indexA === indexB) {
        return;
    }

    quickElemente[indexA].classList.add("pruefen");
    quickElemente[indexB].classList.add("pruefen");

    await warten(200);

    const temp = zahlen[indexA];

    zahlen[indexA] = zahlen[indexB];
    zahlen[indexB] = temp;

    quickElemente[indexA].textContent = zahlen[indexA];
    quickElemente[indexB].textContent = zahlen[indexB];

    await warten(200);

    quickElemente[indexA].classList.remove("pruefen");
    quickElemente[indexB].classList.remove("pruefen");
}
quickStart.addEventListener("click", async function() {

    quickStart.disabled = true;

    try {

        quickElemente.forEach(function(element, index) {

            element.classList.remove(
                "pivot",
                "pruefen",
                "bereich",
                "sortiert"
            );

            element.textContent = quickAusgangszahlen[index];
        });

        const arbeitsZahlen = [...quickAusgangszahlen];

        await quickSortAnimiert(
            arbeitsZahlen,
            0,
            arbeitsZahlen.length - 1
        );

        quickElemente.forEach(function(element) {

            element.classList.remove(
                "pivot",
                "pruefen",
                "bereich"
            );

            element.classList.add("sortiert");
        });

    } finally {

        quickStart.disabled = false;
    }
});
// ========================================
// PFADSUCHEN: GRUNDEINSTELLUNGEN
// ========================================

const bfsGrid = document.getElementById("bfs-grid");

const bfsStart = document.getElementById("bfs-start");
const dfsStart = document.getElementById("dfs-start");
const dijkstraStart = document.getElementById("dijkstra-start");

const terrainModusButton =
    document.getElementById("terrain-modus");

const bfsReset = document.getElementById("bfs-reset");

const bfsZeilen = 15;
const bfsSpalten = 15;

let bfsFelder = [];

let bfsStartFeld = null;
let bfsZielFeld = null;

let pathfindingLaeuft = false;
let terrainModusAktiv = false;


// ========================================
// GEMEINSAME RICHTUNGEN
// ========================================

const pathfindingRichtungen = [
    [-1, 0],  // oben
    [1, 0],   // unten
    [0, -1],  // links
    [0, 1]    // rechts
];


// ========================================
// HILFSFUNKTIONEN
// ========================================

function pathfindingMarkierungenEntfernen() {

    bfsFelder.forEach(function(feld) {

        feld.classList.remove(
            "besucht",
            "weg",
            "aktuell"
        );
    });
}


function pathfindingButtonsSperren(gesperrt) {

    bfsStart.disabled = gesperrt;
    dfsStart.disabled = gesperrt;
    dijkstraStart.disabled = gesperrt;
    terrainModusButton.disabled = gesperrt;
    bfsReset.disabled = gesperrt;
}


function nachbarnErmitteln(feld) {

    const nachbarn = [];

    const zeile = Number(feld.dataset.zeile);
    const spalte = Number(feld.dataset.spalte);

    for (
        const [deltaZeile, deltaSpalte]
        of pathfindingRichtungen
    ) {

        const neueZeile = zeile + deltaZeile;
        const neueSpalte = spalte + deltaSpalte;

        if (
            neueZeile < 0 ||
            neueZeile >= bfsZeilen ||
            neueSpalte < 0 ||
            neueSpalte >= bfsSpalten
        ) {
            continue;
        }

        const index =
            neueZeile * bfsSpalten + neueSpalte;

        const nachbar = bfsFelder[index];

        if (nachbar.classList.contains("wand")) {
            continue;
        }

        nachbarn.push(nachbar);
    }

    return nachbarn;
}


function feldKostenErmitteln(feld) {

    if (feld.classList.contains("gelaende")) {
        return 5;
    }

    return 1;
}


async function wegAnzeigen(vorgaenger) {

    let wegFeld = vorgaenger.get(bfsZielFeld);

    while (
        wegFeld !== undefined &&
        wegFeld !== bfsStartFeld
    ) {

        wegFeld.classList.remove(
            "besucht",
            "aktuell"
        );

        wegFeld.classList.add("weg");

        await warten(40);

        wegFeld = vorgaenger.get(wegFeld);
    }
}


// ========================================
// RASTER ERZEUGEN
// ========================================

for (let zeile = 0; zeile < bfsZeilen; zeile++) {

    for (
        let spalte = 0;
        spalte < bfsSpalten;
        spalte++
    ) {

        const feld = document.createElement("div");

        feld.classList.add("bfs-feld");

        feld.dataset.zeile = zeile;
        feld.dataset.spalte = spalte;

        feld.addEventListener("click", function() {

            if (pathfindingLaeuft) {
                return;
            }

            // Erster Klick setzt den Start
            if (bfsStartFeld === null) {

                bfsStartFeld = feld;

                feld.classList.remove(
                    "wand",
                    "gelaende"
                );

                feld.classList.add("start");

                return;
            }

            // Zweiter Klick setzt das Ziel
            if (
                bfsZielFeld === null &&
                feld !== bfsStartFeld
            ) {

                bfsZielFeld = feld;

                feld.classList.remove(
                    "wand",
                    "gelaende"
                );

                feld.classList.add("ziel");

                return;
            }

            // Start und Ziel dürfen nicht verändert werden
            if (
                feld === bfsStartFeld ||
                feld === bfsZielFeld
            ) {
                return;
            }

            // Im Gelände-Modus schwieriges Gelände setzen
            if (terrainModusAktiv) {

                feld.classList.remove("wand");
                feld.classList.toggle("gelaende");

            } else {

                // Im normalen Modus Wände setzen
                feld.classList.remove("gelaende");
                feld.classList.toggle("wand");
            }
        });

        bfsGrid.appendChild(feld);
        bfsFelder.push(feld);
    }
}


// ========================================
// GELÄNDE-MODUS
// ========================================

terrainModusButton.addEventListener(
    "click",
    function() {

        if (pathfindingLaeuft) {
            return;
        }

        terrainModusAktiv = !terrainModusAktiv;

        terrainModusButton.classList.toggle(
            "aktiv",
            terrainModusAktiv
        );

        if (terrainModusAktiv) {

            terrainModusButton.textContent =
                "Gelände-Modus: AN";

        } else {

            terrainModusButton.textContent =
                "Gelände-Modus: AUS";
        }
    }
);


// ========================================
// BFS
// ========================================

bfsStart.addEventListener("click", async function() {

    if (pathfindingLaeuft) {
        return;
    }

    if (
        bfsStartFeld === null ||
        bfsZielFeld === null
    ) {

        console.log(
            "Bitte zuerst Start und Ziel setzen."
        );

        return;
    }

    pathfindingLaeuft = true;
    pathfindingButtonsSperren(true);

    try {

        pathfindingMarkierungenEntfernen();

        const queue = [];
        const besucht = new Set();
        const vorgaenger = new Map();

        queue.push(bfsStartFeld);
        besucht.add(bfsStartFeld);

        let zielGefunden = false;

        while (queue.length > 0) {

            const aktuell = queue.shift();

            if (
                aktuell !== bfsStartFeld &&
                aktuell !== bfsZielFeld
            ) {
                aktuell.classList.add("besucht");
            }

            await warten(25);

            if (aktuell === bfsZielFeld) {

                zielGefunden = true;
                break;
            }

            const nachbarn =
                nachbarnErmitteln(aktuell);

            for (const nachbar of nachbarn) {

                if (besucht.has(nachbar)) {
                    continue;
                }

                besucht.add(nachbar);

                vorgaenger.set(
                    nachbar,
                    aktuell
                );

                queue.push(nachbar);
            }
        }

        if (zielGefunden) {

            await wegAnzeigen(vorgaenger);

            console.log(
                "BFS hat einen kürzesten Weg gefunden."
            );

        } else {

            console.log(
                "BFS konnte keinen Weg finden."
            );
        }

    } finally {

        pathfindingLaeuft = false;
        pathfindingButtonsSperren(false);
    }
});


// ========================================
// DFS
// ========================================

dfsStart.addEventListener("click", async function() {

    if (pathfindingLaeuft) {
        return;
    }

    if (
        bfsStartFeld === null ||
        bfsZielFeld === null
    ) {

        console.log(
            "Bitte zuerst Start und Ziel setzen."
        );

        return;
    }

    pathfindingLaeuft = true;
    pathfindingButtonsSperren(true);

    try {

        pathfindingMarkierungenEntfernen();

        const stack = [];
        const besucht = new Set();
        const vorgaenger = new Map();

        stack.push(bfsStartFeld);

        let zielGefunden = false;

        while (stack.length > 0) {

            const aktuell = stack.pop();

            if (besucht.has(aktuell)) {
                continue;
            }

            besucht.add(aktuell);

            if (
                aktuell !== bfsStartFeld &&
                aktuell !== bfsZielFeld
            ) {
                aktuell.classList.add("besucht");
            }

            await warten(25);

            if (aktuell === bfsZielFeld) {

                zielGefunden = true;
                break;
            }

            const nachbarn =
                nachbarnErmitteln(aktuell);

            for (const nachbar of nachbarn) {

                if (besucht.has(nachbar)) {
                    continue;
                }

                if (!vorgaenger.has(nachbar)) {

                    vorgaenger.set(
                        nachbar,
                        aktuell
                    );
                }

                stack.push(nachbar);
            }
        }

        if (zielGefunden) {

            await wegAnzeigen(vorgaenger);

            console.log(
                "DFS hat einen Weg gefunden."
            );

        } else {

            console.log(
                "DFS konnte keinen Weg finden."
            );
        }

    } finally {

        pathfindingLaeuft = false;
        pathfindingButtonsSperren(false);
    }
});


// ========================================
// DIJKSTRA
// ========================================

dijkstraStart.addEventListener(
    "click",
    async function() {

        if (pathfindingLaeuft) {
            return;
        }

        if (
            bfsStartFeld === null ||
            bfsZielFeld === null
        ) {

            console.log(
                "Bitte zuerst Start und Ziel setzen."
            );

            return;
        }

        pathfindingLaeuft = true;
        pathfindingButtonsSperren(true);

        try {

            pathfindingMarkierungenEntfernen();

            const distanz = new Map();
            const vorgaenger = new Map();
            const verarbeitet = new Set();

            // Noch nicht verarbeitete Felder
            const offeneFelder = [];

            bfsFelder.forEach(function(feld) {

                distanz.set(feld, Infinity);
            });

            distanz.set(bfsStartFeld, 0);
            offeneFelder.push(bfsStartFeld);

            let zielGefunden = false;

            while (offeneFelder.length > 0) {

                // Feld mit der aktuell kleinsten Distanz suchen
                let kleinsterIndex = 0;

                for (
                    let i = 1;
                    i < offeneFelder.length;
                    i++
                ) {

                    const aktuelleDistanz =
                        distanz.get(
                            offeneFelder[i]
                        );

                    const kleinsteDistanz =
                        distanz.get(
                            offeneFelder[
                                kleinsterIndex
                            ]
                        );

                    if (
                        aktuelleDistanz <
                        kleinsteDistanz
                    ) {

                        kleinsterIndex = i;
                    }
                }

                // Günstigstes Feld aus der Liste entfernen
                const aktuell =
                    offeneFelder.splice(
                        kleinsterIndex,
                        1
                    )[0];

                if (verarbeitet.has(aktuell)) {
                    continue;
                }

                verarbeitet.add(aktuell);

                if (
                    aktuell !== bfsStartFeld &&
                    aktuell !== bfsZielFeld
                ) {

                    aktuell.classList.add(
                        "besucht"
                    );
                }

                await warten(30);

                // Sobald das Ziel das günstigste Feld ist,
                // steht der optimale Weg fest
                if (aktuell === bfsZielFeld) {

                    zielGefunden = true;
                    break;
                }

                const nachbarn =
                    nachbarnErmitteln(aktuell);

                for (const nachbar of nachbarn) {

                    if (
                        verarbeitet.has(nachbar)
                    ) {
                        continue;
                    }

                    const aktuelleKosten =
                        distanz.get(aktuell);

                    const schrittKosten =
                        feldKostenErmitteln(
                            nachbar
                        );

                    const neueDistanz =
                        aktuelleKosten +
                        schrittKosten;

                    if (
                        neueDistanz <
                        distanz.get(nachbar)
                    ) {

                        distanz.set(
                            nachbar,
                            neueDistanz
                        );

                        vorgaenger.set(
                            nachbar,
                            aktuell
                        );

                        if (
                            !offeneFelder.includes(
                                nachbar
                            )
                        ) {

                            offeneFelder.push(
                                nachbar
                            );
                        }
                    }
                }
            }

            if (zielGefunden) {

                await wegAnzeigen(vorgaenger);

                const gesamtkosten =
                    distanz.get(bfsZielFeld);

                console.log(
                    "Dijkstra hat den günstigsten Weg gefunden."
                );

                console.log(
                    "Gesamtkosten:",
                    gesamtkosten
                );

            } else {

                console.log(
                    "Dijkstra konnte keinen Weg finden."
                );
            }

        } finally {

            pathfindingLaeuft = false;
            pathfindingButtonsSperren(false);
        }
    }
);


// ========================================
// RASTER ZURÜCKSETZEN
// ========================================

bfsReset.addEventListener("click", function() {

    if (pathfindingLaeuft) {
        return;
    }

    bfsFelder.forEach(function(feld) {

        feld.classList.remove(
            "start",
            "ziel",
            "wand",
            "gelaende",
            "besucht",
            "weg",
            "aktuell"
        );
    });

    bfsStartFeld = null;
    bfsZielFeld = null;

    terrainModusAktiv = false;

    terrainModusButton.classList.remove(
        "aktiv"
    );

    terrainModusButton.textContent =
        "Gelände-Modus: AUS";
});
// ========================================
// BINÄRER SUCHBAUM
// ========================================

const baumEingabe = document.getElementById("baum-zahl");
const baumEinfuegen = document.getElementById("baum-einfuegen");
const baumSuchen = document.getElementById("baum-suchen");
const baumReset = document.getElementById("baum-reset");
const baumContainer = document.getElementById("baum-container");

let baumWurzel = null;


// ========================================
// KNOTEN ERSTELLEN
// ========================================

function erstelleKnoten(wert) {

    return {
        wert: wert,
        links: null,
        rechts: null
    };
}


// ========================================
// WERT EINFÜGEN
// ========================================

function wertEinfuegen(wert) {

    const neuerKnoten = erstelleKnoten(wert);

    // Baum ist noch leer
    if (baumWurzel === null) {

        baumWurzel = neuerKnoten;
        return;
    }

    let aktuell = baumWurzel;

    while (true) {

        // Kleinere Zahl nach links
        if (wert < aktuell.wert) {

            if (aktuell.links === null) {

                aktuell.links = neuerKnoten;
                break;

            } else {

                aktuell = aktuell.links;
            }
        }

        // Größere Zahl nach rechts
        else if (wert > aktuell.wert) {

            if (aktuell.rechts === null) {

                aktuell.rechts = neuerKnoten;
                break;

            } else {

                aktuell = aktuell.rechts;
            }
        }

        // Zahl existiert bereits
        else {

            console.log("Diese Zahl existiert bereits im Baum.");
            return;
        }
    }
}


// ========================================
// BAUM ZEICHNEN
// ========================================

function baumZeichnen() {

    baumContainer.innerHTML = "";

    if (baumWurzel === null) {
        return;
    }

    knotenZeichnen(
        baumWurzel,
        50,
        30,
        25
    );
}


// ========================================
// KNOTEN REKURSIV ZEICHNEN
// ========================================

function knotenZeichnen(
    knoten,
    x,
    y,
    abstand
) {

    if (knoten === null) {
        return;
    }

    const element =
        document.createElement("div");

    element.classList.add("baum-knoten");

    element.textContent = knoten.wert;

    element.dataset.wert = knoten.wert;

    element.style.position = "absolute";

    element.style.left =
        `calc(${x}% - 25px)`;

    element.style.top =
        `${y}px`;

    baumContainer.appendChild(element);


    // ====================================
    // LINKER AST
    // ====================================

    if (knoten.links !== null) {

        verbindungZeichnen(
            x,
            y,
            x - abstand,
            y + 80
        );

        knotenZeichnen(
            knoten.links,
            x - abstand,
            y + 80,
            abstand / 2
        );
    }


    // ====================================
    // RECHTER AST
    // ====================================

    if (knoten.rechts !== null) {

        verbindungZeichnen(
            x,
            y,
            x + abstand,
            y + 80
        );

        knotenZeichnen(
            knoten.rechts,
            x + abstand,
            y + 80,
            abstand / 2
        );
    }
}


// ========================================
// VERBINDUNGSLINIEN ZEICHNEN
// ========================================

function verbindungZeichnen(
    x1,
    y1,
    x2,
    y2
) {

    const linie =
        document.createElement("div");

    linie.style.position = "absolute";

    const containerBreite =
        baumContainer.clientWidth;

    const startX =
        containerBreite * x1 / 100;

    const endeX =
        containerBreite * x2 / 100;

    const startY = y1 + 25;
    const endeY = y2 + 25;

    const deltaX = endeX - startX;
    const deltaY = endeY - startY;

    const laenge =
        Math.sqrt(
            deltaX * deltaX +
            deltaY * deltaY
        );

    const winkel =
        Math.atan2(deltaY, deltaX) *
        180 / Math.PI;

    linie.style.width = `${laenge}px`;
    linie.style.height = "2px";

    linie.style.backgroundColor =
        "#30363d";

    linie.style.left = `${startX}px`;
    linie.style.top = `${startY}px`;

    linie.style.transformOrigin =
        "0 0";

    linie.style.transform =
        `rotate(${winkel}deg)`;

    linie.style.zIndex = "0";

    baumContainer.appendChild(linie);
}


// ========================================
// HTML-KNOTEN FINDEN
// ========================================

function findeKnotenElement(wert) {

    const elemente =
        document.querySelectorAll(
            ".baum-knoten"
        );

    for (const element of elemente) {

        if (
            Number(element.dataset.wert) === wert
        ) {

            return element;
        }
    }

    return null;
}


// ========================================
// ANIMIERTE SUCHE
// ========================================

async function wertSuchen(wert) {

    let aktuell = baumWurzel;

    while (aktuell !== null) {

        const element =
            findeKnotenElement(
                aktuell.wert
            );

        if (element !== null) {

            element.classList.add(
                "pruefen"
            );

            await warten(500);
        }


        // =================================
        // GEFUNDEN
        // =================================

        if (wert === aktuell.wert) {

            if (element !== null) {

                element.classList.remove(
                    "pruefen"
                );

                element.classList.add(
                    "gefunden"
                );
            }

            console.log(
                "Wert gefunden:",
                wert
            );

            return;
        }


        if (element !== null) {

            element.classList.remove(
                "pruefen"
            );
        }


        // =================================
        // LINKS ODER RECHTS?
        // =================================

        if (wert < aktuell.wert) {

            aktuell = aktuell.links;

        } else {

            aktuell = aktuell.rechts;
        }
    }


    console.log(
        "Wert nicht im Baum gefunden:",
        wert
    );
}


// ========================================
// ALTE SUCHMARKIERUNG ENTFERNEN
// ========================================

function baumMarkierungenEntfernen() {

    const knoten =
        document.querySelectorAll(
            ".baum-knoten"
        );

    knoten.forEach(function(element) {

        element.classList.remove(
            "pruefen",
            "gefunden"
        );
    });
}


// ========================================
// BUTTON: EINFÜGEN
// ========================================

baumEinfuegen.addEventListener(
    "click",
    function() {

        const wert =
            Number(baumEingabe.value);

        if (baumEingabe.value === "") {

            console.log(
                "Bitte eine Zahl eingeben."
            );

            return;
        }

        wertEinfuegen(wert);

        baumZeichnen();

        baumEingabe.value = "";
    }
);


// ========================================
// BUTTON: SUCHEN
// ========================================

baumSuchen.addEventListener(
    "click",
    async function() {

        if (baumEingabe.value === "") {

            console.log(
                "Bitte eine Zahl eingeben."
            );

            return;
        }

        const wert =
            Number(baumEingabe.value);

        baumMarkierungenEntfernen();

        baumSuchen.disabled = true;
        baumEinfuegen.disabled = true;

        try {

            await wertSuchen(wert);

        } finally {

            baumSuchen.disabled = false;
            baumEinfuegen.disabled = false;
        }
    }
);


// ========================================
// BUTTON: RESET
// ========================================

baumReset.addEventListener(
    "click",
    function() {

        baumWurzel = null;

        baumContainer.innerHTML = "";

        baumEingabe.value = "";
    }
);


// ========================================
// OPTIONALER STARTBAUM
// ========================================

const startWerte = [
    10,
    5,
    15,
    2,
    7,
    12,
    18
];

for (const wert of startWerte) {

    wertEinfuegen(wert);
}

baumZeichnen();

// ========================================
// SUDOKU BACKTRACKING
// ========================================

const sudokuGrid = document.getElementById("sudoku-grid");
const sudokuStart = document.getElementById("sudoku-start");
const sudokuReset = document.getElementById("sudoku-reset");

// Vorgegebenes Sudoku
const sudokuAusgang = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],

    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],

    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
];

let sudokuDaten = sudokuKopieren(sudokuAusgang);
let sudokuFelder = [];
let sudokuLaeuft = false;


// ========================================
// SUDOKU KOPIEREN
// ========================================

function sudokuKopieren(sudoku) {

    return sudoku.map(function(zeile) {
        return [...zeile];
    });
}


// ========================================
// RASTER ERZEUGEN
// ========================================

function sudokuRasterErzeugen() {

    sudokuGrid.innerHTML = "";
    sudokuFelder = [];

    for (let zeile = 0; zeile < 9; zeile++) {

        sudokuFelder[zeile] = [];

        for (let spalte = 0; spalte < 9; spalte++) {

            const feld = document.createElement("div");

            feld.classList.add("sudoku-feld");

            feld.dataset.zeile = zeile;
            feld.dataset.spalte = spalte;

            sudokuGrid.appendChild(feld);

            sudokuFelder[zeile][spalte] = feld;
        }
    }

    sudokuAnzeigen();
}


// ========================================
// SUDOKU ANZEIGEN
// ========================================

function sudokuAnzeigen() {

    for (let zeile = 0; zeile < 9; zeile++) {

        for (let spalte = 0; spalte < 9; spalte++) {

            const feld = sudokuFelder[zeile][spalte];
            const wert = sudokuDaten[zeile][spalte];

            feld.classList.remove(
                "vorgegeben",
                "testen",
                "gueltig",
                "backtracking"
            );

            if (wert === 0) {

                feld.textContent = "";

            } else {

                feld.textContent = wert;
            }

            // Ursprünglich vorgegebene Zahlen markieren
            if (sudokuAusgang[zeile][spalte] !== 0) {

                feld.classList.add("vorgegeben");
            }
        }
    }
}


// ========================================
// PRÜFEN, OB ZAHL GÜLTIG IST
// ========================================

function sudokuZahlIstGueltig(
    zeile,
    spalte,
    zahl
) {

    // Zeile prüfen
    for (let i = 0; i < 9; i++) {

        if (sudokuDaten[zeile][i] === zahl) {
            return false;
        }
    }

    // Spalte prüfen
    for (let i = 0; i < 9; i++) {

        if (sudokuDaten[i][spalte] === zahl) {
            return false;
        }
    }

    // Startkoordinaten des 3x3-Blocks
    const blockStartZeile =
        Math.floor(zeile / 3) * 3;

    const blockStartSpalte =
        Math.floor(spalte / 3) * 3;

    // 3x3-Block prüfen
    for (
        let blockZeile = blockStartZeile;
        blockZeile < blockStartZeile + 3;
        blockZeile++
    ) {

        for (
            let blockSpalte = blockStartSpalte;
            blockSpalte < blockStartSpalte + 3;
            blockSpalte++
        ) {

            if (
                sudokuDaten[blockZeile][blockSpalte]
                === zahl
            ) {

                return false;
            }
        }
    }

    return true;
}


// ========================================
// NÄCHSTES LEERES FELD FINDEN
// ========================================

function sudokuLeeresFeldFinden() {

    for (let zeile = 0; zeile < 9; zeile++) {

        for (let spalte = 0; spalte < 9; spalte++) {

            if (sudokuDaten[zeile][spalte] === 0) {

                return {
                    zeile: zeile,
                    spalte: spalte
                };
            }
        }
    }

    // Kein leeres Feld mehr vorhanden
    return null;
}


// ========================================
// ANIMIERTER BACKTRACKING-ALGORITHMUS
// ========================================

async function sudokuLoesen() {

    const leeresFeld = sudokuLeeresFeldFinden();

    // Kein leeres Feld mehr:
    // Das Sudoku ist gelöst
    if (leeresFeld === null) {
        return true;
    }

    const zeile = leeresFeld.zeile;
    const spalte = leeresFeld.spalte;

    const feld = sudokuFelder[zeile][spalte];

    for (let zahl = 1; zahl <= 9; zahl++) {

        // Zuerst ohne Wartezeit prüfen
        if (!sudokuZahlIstGueltig(zeile, spalte, zahl)) {
            continue;
        }

        // Nur gültige Kandidaten animieren
        feld.textContent = zahl;
        feld.classList.add("testen");

        await warten(5);

        sudokuDaten[zeile][spalte] = zahl;

        feld.classList.remove("testen");
        feld.classList.add("gueltig");

        const restGeloest = await sudokuLoesen();

        if (restGeloest) {
            return true;
        }

        // Sackgasse: Zahl zurücknehmen
        sudokuDaten[zeile][spalte] = 0;

        feld.classList.remove(
            "testen",
            "gueltig"
        );

        feld.classList.add("backtracking");

        await warten(10);

        feld.textContent = "";

        feld.classList.remove("backtracking");
    }

    // Keine Zahl funktioniert an dieser Position
    feld.textContent = "";

    feld.classList.remove(
        "testen",
        "gueltig",
        "backtracking"
    );

    return false;
}

// ========================================
// GELÖSTE FELDER MARKIEREN
// ========================================

function sudokuAlsGeloestMarkieren() {

    for (let zeile = 0; zeile < 9; zeile++) {

        for (let spalte = 0; spalte < 9; spalte++) {

            const feld =
                sudokuFelder[zeile][spalte];

            feld.classList.remove(
                "testen",
                "backtracking"
            );

            // Vorgegebene Zahlen behalten ihre Farbe
            if (
                sudokuAusgang[zeile][spalte] === 0
            ) {

                feld.classList.add("gueltig");
            }
        }
    }
}


// ========================================
// BUTTON: SUDOKU LÖSEN
// ========================================

sudokuStart.addEventListener(
    "click",
    async function() {

        if (sudokuLaeuft) {
            return;
        }

        sudokuLaeuft = true;

        sudokuStart.disabled = true;
        sudokuReset.disabled = true;

        try {

            // Immer mit dem Ausgangsrätsel beginnen
            sudokuDaten =
                sudokuKopieren(sudokuAusgang);

            sudokuAnzeigen();

            const geloest =
                await sudokuLoesen();

            if (geloest) {

                sudokuAlsGeloestMarkieren();

                console.log(
                    "Sudoku wurde gelöst."
                );

            } else {

                console.log(
                    "Für dieses Sudoku wurde keine Lösung gefunden."
                );
            }

        } finally {

            sudokuLaeuft = false;

            sudokuStart.disabled = false;
            sudokuReset.disabled = false;
        }
    }
);


// ========================================
// BUTTON: ZURÜCKSETZEN
// ========================================

sudokuReset.addEventListener(
    "click",
    function() {

        if (sudokuLaeuft) {
            return;
        }

        sudokuDaten =
            sudokuKopieren(sudokuAusgang);

        sudokuAnzeigen();

        console.log(
            "Sudoku wurde zurückgesetzt."
        );
    }
);


// ========================================
// SUDOKU BEIM LADEN ERZEUGEN
// ========================================

sudokuRasterErzeugen();
// ========================================
// N-QUEENS BACKTRACKING
// ========================================

const queensGrid = document.getElementById("queens-grid");
const queensStart = document.getElementById("queens-start");
const queensReset = document.getElementById("queens-reset");

const queensGroesse = 8;

let queensFelder = [];
let queensPositionen = [];
let queensLaeuft = false;


// ========================================
// SCHACHBRETT ERZEUGEN
// ========================================

function queensBrettErzeugen() {

    queensGrid.innerHTML = "";
    queensFelder = [];
    queensPositionen = [];

    for (let zeile = 0; zeile < queensGroesse; zeile++) {

        queensFelder[zeile] = [];

        for (let spalte = 0; spalte < queensGroesse; spalte++) {

            const feld = document.createElement("div");

            feld.classList.add("queens-feld");

            // Schachbrett-Muster
            if ((zeile + spalte) % 2 === 0) {

                feld.classList.add("hell");

            } else {

                feld.classList.add("dunkel");
            }

            feld.dataset.zeile = zeile;
            feld.dataset.spalte = spalte;

            queensGrid.appendChild(feld);

            queensFelder[zeile][spalte] = feld;
        }
    }
}


// ========================================
// PRÜFEN, OB EINE DAME GESETZT WERDEN DARF
// ========================================

function queensPositionGueltig(zeile, spalte) {

    // Wir müssen nur bereits gesetzte Damen prüfen.
    // queensPositionen[index] enthält die Zeile
    // der Dame in dieser Spalte.

    for (
        let alteSpalte = 0;
        alteSpalte < queensPositionen.length;
        alteSpalte++
    ) {

        const alteZeile =
            queensPositionen[alteSpalte];


        // =================================
        // GLEICHE ZEILE?
        // =================================

        if (alteZeile === zeile) {

            return false;
        }


        // =================================
        // GLEICHE DIAGONALE?
        // =================================

        const zeilenAbstand =
            Math.abs(zeile - alteZeile);

        const spaltenAbstand =
            Math.abs(spalte - alteSpalte);

        if (zeilenAbstand === spaltenAbstand) {

            return false;
        }
    }

    return true;
}


// ========================================
// DAME ANZEIGEN
// ========================================

function queensDameSetzen(zeile, spalte) {

    const feld =
        queensFelder[zeile][spalte];

    feld.textContent = "♛";

    feld.classList.add("dame");
}


// ========================================
// DAME ENTFERNEN
// ========================================

function queensDameEntfernen(zeile, spalte) {

    const feld =
        queensFelder[zeile][spalte];

    feld.textContent = "";

    feld.classList.remove(
        "dame",
        "testen",
        "backtracking",
        "geloest"
    );
}


// ========================================
// BACKTRACKING
// ========================================

async function queensLoesen(spalte) {

    // Wenn wir hinter der letzten Spalte
    // angekommen sind, wurden alle 8 Damen gesetzt.
    if (spalte >= queensGroesse) {

        return true;
    }


    // Jede Zeile dieser Spalte ausprobieren
    for (
        let zeile = 0;
        zeile < queensGroesse;
        zeile++
    ) {

        const feld =
            queensFelder[zeile][spalte];


        // =================================
        // POSITION WIRD AUSPROBIERT
        // =================================

        feld.classList.add("testen");

        await warten(60);


        // =================================
        // IST DIE POSITION GÜLTIG?
        // =================================

        if (queensPositionGueltig(zeile, spalte)) {

            feld.classList.remove("testen");

            queensDameSetzen(
                zeile,
                spalte
            );


            // Position merken
            queensPositionen.push(
                zeile
            );


            await warten(25);


            // =================================
            // NÄCHSTE SPALTE REKURSIV LÖSEN
            // =================================

            const restGeloest =
                await queensLoesen(
                    spalte + 1
                );


            // =================================
            // LÖSUNG GEFUNDEN
            // =================================

            if (restGeloest) {

                return true;
            }


            // =================================
            // BACKTRACKING
            // =================================

            // Diese Dame führt später
            // zu einer Sackgasse.

            queensPositionen.pop();

            feld.classList.add(
                "backtracking"
            );

            await warten(50);

            queensDameEntfernen(
                zeile,
                spalte
            );
        }


        feld.classList.remove(
            "testen"
        );
    }


    // Keine Position in dieser Spalte funktioniert.
    // Zur vorherigen Rekursion zurückkehren.
    return false;
}


// ========================================
// ENDGÜLTIGE LÖSUNG MARKIEREN
// ========================================

function queensLoesungMarkieren() {

    for (
        let spalte = 0;
        spalte < queensPositionen.length;
        spalte++
    ) {

        const zeile =
            queensPositionen[spalte];

        const feld =
            queensFelder[zeile][spalte];

        feld.classList.remove(
            "testen",
            "backtracking"
        );

        feld.classList.add(
            "geloest"
        );
    }
}


// ========================================
// BRETT ZURÜCKSETZEN
// ========================================

function queensZuruecksetzen() {

    queensPositionen = [];

    for (
        let zeile = 0;
        zeile < queensGroesse;
        zeile++
    ) {

        for (
            let spalte = 0;
            spalte < queensGroesse;
            spalte++
        ) {

            const feld =
                queensFelder[zeile][spalte];

            feld.textContent = "";

            feld.classList.remove(
                "dame",
                "testen",
                "backtracking",
                "geloest"
            );
        }
    }
}


// ========================================
// START-BUTTON
// ========================================

queensStart.addEventListener(
    "click",
    async function() {

        if (queensLaeuft) {

            return;
        }


        queensLaeuft = true;

        queensStart.disabled = true;
        queensReset.disabled = true;


        try {

            queensZuruecksetzen();


            const geloest =
                await queensLoesen(0);


            if (geloest) {

                queensLoesungMarkieren();

                console.log(
                    "N-Queens wurde gelöst."
                );

            } else {

                console.log(
                    "Keine Lösung gefunden."
                );
            }

        } finally {

            queensLaeuft = false;

            queensStart.disabled = false;
            queensReset.disabled = false;
        }
    }
);


// ========================================
// RESET-BUTTON
// ========================================

queensReset.addEventListener(
    "click",
    function() {

        if (queensLaeuft) {

            return;
        }

        queensZuruecksetzen();

        console.log(
            "N-Queens wurde zurückgesetzt."
        );
    }
);


// ========================================
// BRETT BEIM LADEN ERZEUGEN
// ========================================

queensBrettErzeugen();
