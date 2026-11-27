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
// ========================================
// LINEAR SEARCH + GEHEIMER CODE
// ========================================
//Nimm Hallo AES Welt!!  --> [V]XOR [42]--> [V]Vigenère [Secret]--> [V]Ceasar-->[E]Rail-Fence [3] --> Linear Search
const geheimPasswort =
    "64 52 40 H6 46 GW 56 ZL 47 96 00 HG 47 Z6 04 AV";


const geheimEingabe =
    document.getElementById(
        "suchZahl"
    );


linearSuchen.addEventListener(
    "click",
    async function() {

        // =================================
        // EINGABE LESEN
        // =================================

        const eingabe =
            geheimEingabe.value
                .trim()
                .toUpperCase();


        // =================================
        // GEHEIMCODE PRÜFEN
        // =================================

        if (
            eingabe === geheimPasswort
        ) {

            document.body.classList.add(
                "geheim-freigeschaltet"
            );


            linearSuchen.textContent =
                "ACCESS GRANTED";


            geheimEingabe.value =
                "ZUGANG FREIGESCHALTET";


            geheimEingabe.disabled =
                true;


            // Kurz warten und geheime
            // Seite öffnen

            setTimeout(
                function() {

                   window.open(
                    "secret.html",
                    "_blank"
                    );
                },
                1200
            );


            // Sehr wichtig:
            // Die normale Suche danach
            // NICHT ausführen.

            return;
        }


        // =================================
        // NORMALE LINEAR SEARCH
        // =================================

        const gesucht =
            Number(eingabe);


        // Prüfen, ob tatsächlich
        // eine Zahl eingegeben wurde

        if (Number.isNaN(gesucht)) {

            geheimEingabe.value = "";

            geheimEingabe.placeholder =
                "Ungültige Zahl";

            return;
        }


        // Alte Markierungen entfernen

        zahlElemente.forEach(
            function(element) {

                element.classList.remove(
                    "pruefen"
                );

                element.classList.remove(
                    "gefunden"
                );
            }
        );


        // =================================
        // LINEAR SEARCH
        // =================================

        for (
            let i = 0;
            i < zahlen.length;
            i++
        ) {

            zahlElemente[i]
                .classList.add(
                    "pruefen"
                );


            await warten(300);


            if (
                zahlen[i] === gesucht
            ) {

                zahlElemente[i]
                    .classList.remove(
                        "pruefen"
                    );


                zahlElemente[i]
                    .classList.add(
                        "gefunden"
                    );


                console.log(
                    "Gefunden!"
                );


                return;
            }


            zahlElemente[i]
                .classList.remove(
                    "pruefen"
                );
        }


        console.log(
            "Zahl nicht gefunden."
        );
    }
);


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
// ========================================
// K-MEANS CLUSTERING
// ========================================

const kmeansFlaeche =
    document.getElementById("kmeans-flaeche");

const kmeansStart =
    document.getElementById("kmeans-start");

const kmeansZufall =
    document.getElementById("kmeans-zufall");

const kmeansReset =
    document.getElementById("kmeans-reset");

const kmeansAuswahl =
    document.getElementById("kmeans-k");


let kmeansPunkte = [];
let kmeansZentren = [];
let kmeansLaeuft = false;


// Farben müssen zu deinen CSS-Klassen passen
const kmeansFarben = [
    "#f85149",
    "#58a6ff",
    "#3fb950",
    "#d29922",
    "#a371f7"
];


// ========================================
// PUNKT ERSTELLEN
// ========================================

function kmeansPunktErstellen(x, y) {

    const element =
        document.createElement("div");

    element.classList.add("kmeans-punkt");

    element.style.left = `${x}px`;
    element.style.top = `${y}px`;

    kmeansFlaeche.appendChild(element);


    const punkt = {
        x: x,
        y: y,
        cluster: null,
        element: element
    };

    kmeansPunkte.push(punkt);

    return punkt;
}


// ========================================
// MITTELPUNKT ERSTELLEN
// ========================================

function kmeansZentrumErstellen(
    x,
    y,
    clusterIndex
) {

    const element =
        document.createElement("div");

    element.classList.add(
        "kmeans-zentrum",
        `cluster-${clusterIndex}`
    );

    element.style.left = `${x}px`;
    element.style.top = `${y}px`;

    element.title =
        `Zentrum von Cluster ${clusterIndex + 1}`;

    kmeansFlaeche.appendChild(element);


    return {
        x: x,
        y: y,
        cluster: clusterIndex,
        element: element
    };
}


// ========================================
// MANUELLEN PUNKT SETZEN
// ========================================

kmeansFlaeche.addEventListener(
    "click",
    function(event) {

        if (kmeansLaeuft) {
            return;
        }

        const rechteck =
            kmeansFlaeche.getBoundingClientRect();

        const x =
            event.clientX - rechteck.left;

        const y =
            event.clientY - rechteck.top;


        // Sicherheitsabstand zum Rand
        const punktX = Math.max(
            7,
            Math.min(
                x,
                kmeansFlaeche.clientWidth - 7
            )
        );

        const punktY = Math.max(
            7,
            Math.min(
                y,
                kmeansFlaeche.clientHeight - 7
            )
        );


        kmeansPunktErstellen(
            punktX,
            punktY
        );
    }
);


// ========================================
// EUKLIDISCHE DISTANZ
// ========================================

function kmeansDistanz(
    punktA,
    punktB
) {

    const deltaX =
        punktB.x - punktA.x;

    const deltaY =
        punktB.y - punktA.y;


    return Math.sqrt(
        deltaX * deltaX +
        deltaY * deltaY
    );
}


// ========================================
// ALTE ZENTREN ENTFERNEN
// ========================================

function kmeansZentrenEntfernen() {

    for (const zentrum of kmeansZentren) {

        zentrum.element.remove();
    }

    kmeansZentren = [];
}


// ========================================
// ZUFÄLLIGE STARTZENTREN
// ========================================

function kmeansStartzentrenErzeugen(k) {

    kmeansZentrenEntfernen();


    const verwendetePunkte =
        new Set();


    while (kmeansZentren.length < k) {

        const zufallsIndex =
            Math.floor(
                Math.random() *
                kmeansPunkte.length
            );


        if (
            verwendetePunkte.has(
                zufallsIndex
            )
        ) {

            continue;
        }


        verwendetePunkte.add(
            zufallsIndex
        );


        const punkt =
            kmeansPunkte[zufallsIndex];


        const zentrum =
            kmeansZentrumErstellen(
                punkt.x,
                punkt.y,
                kmeansZentren.length
            );


        kmeansZentren.push(
            zentrum
        );
    }
}


// ========================================
// CLUSTER-KLASSEN ENTFERNEN
// ========================================

function kmeansClusterKlassenEntfernen(
    element
) {

    for (
        let i = 0;
        i < kmeansFarben.length;
        i++
    ) {

        element.classList.remove(
            `cluster-${i}`
        );
    }
}


// ========================================
// PUNKTE ZUORDNEN
// ========================================

function kmeansPunkteZuordnen() {

    let zuordnungGeaendert = false;


    for (const punkt of kmeansPunkte) {

        let naechsterCluster = 0;

        let kleinsteDistanz =
            kmeansDistanz(
                punkt,
                kmeansZentren[0]
            );


        for (
            let i = 1;
            i < kmeansZentren.length;
            i++
        ) {

            const distanz =
                kmeansDistanz(
                    punkt,
                    kmeansZentren[i]
                );


            if (distanz < kleinsteDistanz) {

                kleinsteDistanz = distanz;
                naechsterCluster = i;
            }
        }


        if (
            punkt.cluster !==
            naechsterCluster
        ) {

            zuordnungGeaendert = true;
        }


        punkt.cluster =
            naechsterCluster;


        kmeansClusterKlassenEntfernen(
            punkt.element
        );


        punkt.element.classList.add(
            `cluster-${naechsterCluster}`
        );
    }


    return zuordnungGeaendert;
}


// ========================================
// NEUE MITTELPUNKTE BERECHNEN
// ========================================

function kmeansNeueZentrenBerechnen() {

    const neueZentren = [];


    for (
        let clusterIndex = 0;
        clusterIndex <
            kmeansZentren.length;
        clusterIndex++
    ) {

        const clusterPunkte =
            kmeansPunkte.filter(
                function(punkt) {

                    return (
                        punkt.cluster ===
                        clusterIndex
                    );
                }
            );


        // Ein leeres Cluster behält
        // vorerst sein bisheriges Zentrum
        if (clusterPunkte.length === 0) {

            neueZentren.push({
                x: kmeansZentren[
                    clusterIndex
                ].x,

                y: kmeansZentren[
                    clusterIndex
                ].y
            });

            continue;
        }


        let summeX = 0;
        let summeY = 0;


        for (
            const punkt
            of clusterPunkte
        ) {

            summeX += punkt.x;
            summeY += punkt.y;
        }


        neueZentren.push({

            x:
                summeX /
                clusterPunkte.length,

            y:
                summeY /
                clusterPunkte.length
        });
    }


    return neueZentren;
}


// ========================================
// ZENTREN VERSCHIEBEN
// ========================================

function kmeansZentrenAktualisieren(
    neueZentren
) {

    let groessteBewegung = 0;


    for (
        let i = 0;
        i < kmeansZentren.length;
        i++
    ) {

        const altesZentrum =
            kmeansZentren[i];

        const neuesZentrum =
            neueZentren[i];


        const bewegung =
            kmeansDistanz(
                altesZentrum,
                neuesZentrum
            );


        if (
            bewegung >
            groessteBewegung
        ) {

            groessteBewegung =
                bewegung;
        }


        altesZentrum.x =
            neuesZentrum.x;

        altesZentrum.y =
            neuesZentrum.y;


        altesZentrum.element.style.left =
            `${neuesZentrum.x}px`;

        altesZentrum.element.style.top =
            `${neuesZentrum.y}px`;
    }


    return groessteBewegung;
}


// ========================================
// K-MEANS AUSFÜHREN
// ========================================

async function kmeansAusfuehren() {

    const k =
        Number(kmeansAuswahl.value);


    if (kmeansPunkte.length < k) {

        console.log(
            `Für ${k} Cluster werden mindestens ${k} Punkte benötigt.`
        );

        return false;
    }


    kmeansStartzentrenErzeugen(k);


    await warten(500);


    const maximaleIterationen = 30;
    const bewegungsGrenze = 0.5;


    for (
        let iteration = 1;
        iteration <=
            maximaleIterationen;
        iteration++
    ) {

        const zuordnungGeaendert =
            kmeansPunkteZuordnen();


        await warten(600);


        const neueZentren =
            kmeansNeueZentrenBerechnen();


        const groessteBewegung =
            kmeansZentrenAktualisieren(
                neueZentren
            );


        console.log(
            `K-Means Iteration ${iteration}: größte Bewegung ${groessteBewegung.toFixed(2)} px`
        );


        await warten(600);


        // Algorithmus ist stabil
        if (
            !zuordnungGeaendert ||
            groessteBewegung <
                bewegungsGrenze
        ) {

            console.log(
                `K-Means ist nach ${iteration} Iterationen konvergiert.`
            );

            break;
        }
    }


    // Nach der letzten Verschiebung
    // Zuordnung noch einmal aktualisieren
    kmeansPunkteZuordnen();


    return true;
}


// ========================================
// START-BUTTON
// ========================================

kmeansStart.addEventListener(
    "click",
    async function() {

        if (kmeansLaeuft) {
            return;
        }


        const k =
            Number(kmeansAuswahl.value);


        if (kmeansPunkte.length < k) {

            console.log(
                `Bitte mindestens ${k} Punkte setzen.`
            );

            return;
        }


        kmeansLaeuft = true;


        kmeansStart.disabled = true;
        kmeansZufall.disabled = true;
        kmeansReset.disabled = true;
        kmeansAuswahl.disabled = true;


        try {

            await kmeansAusfuehren();

        } finally {

            kmeansLaeuft = false;


            kmeansStart.disabled = false;
            kmeansZufall.disabled = false;
            kmeansReset.disabled = false;
            kmeansAuswahl.disabled = false;
        }
    }
);


// ========================================
// ZUFÄLLIGE PUNKTE
// ========================================

kmeansZufall.addEventListener(
    "click",
    function() {

        if (kmeansLaeuft) {
            return;
        }


        kmeansAllesZuruecksetzen();


        const anzahlPunkte = 1000;

        const breite =
            kmeansFlaeche.clientWidth;

        const hoehe =
            kmeansFlaeche.clientHeight;


        for (
            let i = 0;
            i < anzahlPunkte;
            i++
        ) {

            const x =
                15 +
                Math.random() *
                (breite - 30);

            const y =
                15 +
                Math.random() *
                (hoehe - 30);


            kmeansPunktErstellen(
                x,
                y
            );
        }
    }
);


// ========================================
// ALLES ZURÜCKSETZEN
// ========================================

function kmeansAllesZuruecksetzen() {

    for (const punkt of kmeansPunkte) {

        punkt.element.remove();
    }


    kmeansZentrenEntfernen();


    kmeansPunkte = [];
}


// ========================================
// RESET-BUTTON
// ========================================

kmeansReset.addEventListener(
    "click",
    function() {

        if (kmeansLaeuft) {
            return;
        }


        kmeansAllesZuruecksetzen();


        console.log(
            "K-Means wurde zurückgesetzt."
        );
    }
);


// ========================================
// CAESAR CHIFFRE
// ========================================

const caesarText =
    document.getElementById("caesar-text");

const caesarShift =
    document.getElementById("caesar-shift");

const caesarVerschluesseln =
    document.getElementById("caesar-verschluesseln");

const caesarEntschluesseln =
    document.getElementById("caesar-entschluesseln");

const caesarBruteforce =
    document.getElementById("caesar-bruteforce");

const caesarReset =
    document.getElementById("caesar-reset");

const caesarAusgabe =
    document.getElementById("caesar-ausgabe");


let caesarLaeuft = false;


// ========================================
// BUTTONS SPERREN
// ========================================

function caesarButtonsSperren(gesperrt) {

    caesarVerschluesseln.disabled =
        gesperrt;

    caesarEntschluesseln.disabled =
        gesperrt;

    caesarBruteforce.disabled =
        gesperrt;

    caesarReset.disabled =
        gesperrt;

    caesarText.disabled =
        gesperrt;

    caesarShift.disabled =
        gesperrt;
}


// ========================================
// EINEN BUCHSTABEN VERSCHIEBEN
// ========================================

function caesarBuchstabeVerschieben(
    buchstabe,
    verschiebung
) {

    const code =
        buchstabe.charCodeAt(0);


    // ====================================
    // GROßBUCHSTABEN A-Z
    // ====================================

    if (code >= 65 && code <= 90) {

        const neuerCode =
            (
                (code - 65 + verschiebung)
                % 26
                + 26
            )
            % 26
            + 65;


        return String.fromCharCode(
            neuerCode
        );
    }


    // ====================================
    // KLEINBUCHSTABEN a-z
    // ====================================

    if (code >= 97 && code <= 122) {

        const neuerCode =
            (
                (code - 97 + verschiebung)
                % 26
                + 26
            )
            % 26
            + 97;


        return String.fromCharCode(
            neuerCode
        );
    }


    // Leerzeichen, Zahlen,
    // Satzzeichen usw. nicht verändern
    return buchstabe;
}


// ========================================
// KOMPLETTEN TEXT VERSCHIEBEN
// ========================================

function caesarTextVerschieben(
    text,
    verschiebung
) {

    let ergebnis = "";

    for (const buchstabe of text) {

        ergebnis +=
            caesarBuchstabeVerschieben(
                buchstabe,
                verschiebung
            );
    }


    return ergebnis;
}


// ========================================
// ANIMIERTE VERSCHLÜSSELUNG
// ========================================

async function caesarAnimieren(
    text,
    verschiebung
) {

    caesarAusgabe.innerHTML = "";


    const elemente = [];


    // Zunächst Originaltext anzeigen
    for (const buchstabe of text) {

        const element =
            document.createElement("span");

        element.classList.add(
            "caesar-buchstabe"
        );


        // Leerzeichen sichtbar lassen
        if (buchstabe === " ") {

            element.textContent = " ";

        } else {

            element.textContent =
                buchstabe;
        }


        caesarAusgabe.appendChild(
            element
        );

        elemente.push(element);
    }


    let ergebnis = "";


    // Zeichen nacheinander verarbeiten
    for (
        let i = 0;
        i < text.length;
        i++
    ) {

        const element =
            elemente[i];

        const alterBuchstabe =
            text[i];


        element.classList.add(
            "pruefen"
        );


        await warten(150);


        const neuerBuchstabe =
            caesarBuchstabeVerschieben(
                alterBuchstabe,
                verschiebung
            );


        element.textContent =
            neuerBuchstabe;


        ergebnis +=
            neuerBuchstabe;


        element.classList.remove(
            "pruefen"
        );

        element.classList.add(
            "fertig"
        );


        await warten(80);
    }


    console.log(
        "Caesar-Ergebnis:",
        ergebnis
    );


    return ergebnis;
}


// ========================================
// VERSCHLÜSSELN
// ========================================

caesarVerschluesseln.addEventListener(
    "click",
    async function() {

        if (caesarLaeuft) {
            return;
        }


        const text =
            caesarText.value;


        if (text.length === 0) {

            console.log(
                "Bitte zuerst einen Text eingeben."
            );

            return;
        }


        const shift =
            Number(caesarShift.value);


        if (
            shift < 1 ||
            shift > 25
        ) {

            console.log(
                "Die Verschiebung muss zwischen 1 und 25 liegen."
            );

            return;
        }


        caesarLaeuft = true;

        caesarButtonsSperren(true);


        try {

            await caesarAnimieren(
                text,
                shift
            );

        } finally {

            caesarLaeuft = false;

            caesarButtonsSperren(false);
        }
    }
);


// ========================================
// ENTSCHLÜSSELN
// ========================================

caesarEntschluesseln.addEventListener(
    "click",
    async function() {

        if (caesarLaeuft) {
            return;
        }


        const text =
            caesarText.value;


        if (text.length === 0) {

            console.log(
                "Bitte zuerst einen Text eingeben."
            );

            return;
        }


        const shift =
            Number(caesarShift.value);


        if (
            shift < 1 ||
            shift > 25
        ) {

            console.log(
                "Die Verschiebung muss zwischen 1 und 25 liegen."
            );

            return;
        }


        caesarLaeuft = true;

        caesarButtonsSperren(true);


        try {

            // Zum Entschlüsseln
            // verschieben wir rückwärts
            await caesarAnimieren(
                text,
                -shift
            );

        } finally {

            caesarLaeuft = false;

            caesarButtonsSperren(false);
        }
    }
);


// ========================================
// BRUTE FORCE
// ========================================

caesarBruteforce.addEventListener(
    "click",
    async function() {

        if (caesarLaeuft) {
            return;
        }


        const text =
            caesarText.value;


        if (text.length === 0) {

            console.log(
                "Bitte zuerst einen verschlüsselten Text eingeben."
            );

            return;
        }


        caesarLaeuft = true;

        caesarButtonsSperren(true);


        try {

            caesarAusgabe.innerHTML = "";


            // Alle möglichen Schlüssel testen
            for (
                let shift = 1;
                shift <= 25;
                shift++
            ) {

                const ergebnis =
                    caesarTextVerschieben(
                        text,
                        -shift
                    );


                const zeile =
                    document.createElement(
                        "div"
                    );


                zeile.classList.add(
                    "caesar-brute-zeile"
                );


                const shiftAnzeige =
                    document.createElement(
                        "span"
                    );


                shiftAnzeige.classList.add(
                    "caesar-shift-nummer"
                );


                shiftAnzeige.textContent =
                    `Shift ${shift}:`;


                const textAnzeige =
                    document.createElement(
                        "span"
                    );


                textAnzeige.textContent =
                    ergebnis;


                zeile.appendChild(
                    shiftAnzeige
                );

                zeile.appendChild(
                    textAnzeige
                );


                caesarAusgabe.appendChild(
                    zeile
                );


                zeile.classList.add(
                    "aktiv"
                );


                await warten(120);


                zeile.classList.remove(
                    "aktiv"
                );
            }


            console.log(
                "Brute Force abgeschlossen."
            );

        } finally {

            caesarLaeuft = false;

            caesarButtonsSperren(false);
        }
    }
);


// ========================================
// RESET
// ========================================

caesarReset.addEventListener(
    "click",
    function() {

        if (caesarLaeuft) {
            return;
        }


        caesarText.value = "";

        caesarShift.value = 3;

        caesarAusgabe.innerHTML = "";


        console.log(
            "Caesar-Chiffre wurde zurückgesetzt."
        );
    }
);
// ========================================
// VIGENERE CHIFFRE
// ========================================

const vigenereText =
    document.getElementById("vigenere-text");

const vigenereKey =
    document.getElementById("vigenere-key");

const vigenereVerschluesseln =
    document.getElementById("vigenere-verschluesseln");

const vigenereEntschluesseln =
    document.getElementById("vigenere-entschluesseln");

const vigenereReset =
    document.getElementById("vigenere-reset");

const vigenereTextZeile =
    document.getElementById("vigenere-text-zeile");

const vigenereKeyZeile =
    document.getElementById("vigenere-key-zeile");

const vigenereErgebnisZeile =
    document.getElementById("vigenere-ergebnis-zeile");

const vigenereInfo =
    document.getElementById("vigenere-info");


let vigenereLaeuft = false;


// ========================================
// BUTTONS SPERREN
// ========================================

function vigenereButtonsSperren(gesperrt) {

    vigenereVerschluesseln.disabled =
        gesperrt;

    vigenereEntschluesseln.disabled =
        gesperrt;

    vigenereReset.disabled =
        gesperrt;

    vigenereText.disabled =
        gesperrt;

    vigenereKey.disabled =
        gesperrt;
}


// ========================================
// PRÜFEN, OB EIN BUCHSTABE A-Z IST
// ========================================

function vigenereIstBuchstabe(buchstabe) {

    const gross =
        buchstabe.toUpperCase();

    const code =
        gross.charCodeAt(0);

    return code >= 65 && code <= 90;
}


// ========================================
// SCHLÜSSEL VORBEREITEN
// ========================================

function vigenereKeyBereinigen(key) {

    let ergebnis = "";

    for (const buchstabe of key) {

        if (vigenereIstBuchstabe(buchstabe)) {

            ergebnis +=
                buchstabe.toUpperCase();
        }
    }

    return ergebnis;
}


// ========================================
// SCHLÜSSELBUCHSTABE IN SHIFT UMWANDELN
// ========================================

function vigenereShiftBerechnen(
    keyBuchstabe
) {

    // A = 0
    // B = 1
    // C = 2
    // ...
    // Z = 25

    return (
        keyBuchstabe
            .toUpperCase()
            .charCodeAt(0)
        - 65
    );
}


// ========================================
// EINEN BUCHSTABEN VERSCHIEBEN
// ========================================

function vigenereBuchstabeVerschieben(
    buchstabe,
    verschiebung
) {

    const code =
        buchstabe.charCodeAt(0);


    // Großbuchstaben
    if (code >= 65 && code <= 90) {

        const neuerCode =
            (
                (code - 65 + verschiebung)
                % 26
                + 26
            )
            % 26
            + 65;

        return String.fromCharCode(
            neuerCode
        );
    }


    // Kleinbuchstaben
    if (code >= 97 && code <= 122) {

        const neuerCode =
            (
                (code - 97 + verschiebung)
                % 26
                + 26
            )
            % 26
            + 97;

        return String.fromCharCode(
            neuerCode
        );
    }


    // Leerzeichen, Zahlen und Satzzeichen
    // bleiben unverändert
    return buchstabe;
}


// ========================================
// VISUALISIERUNGSFELD ERSTELLEN
// ========================================

function vigenereFeldErstellen(
    buchstabe,
    klasse
) {

    const element =
        document.createElement("span");

    element.classList.add(
        "vigenere-buchstabe",
        klasse
    );

    element.textContent =
        buchstabe === " "
            ? "\u00A0"
            : buchstabe;

    return element;
}


// ========================================
// VISUALISIERUNG VORBEREITEN
// ========================================

function vigenereVisualisierungErstellen(
    text,
    key
) {

    vigenereTextZeile.innerHTML = "";
    vigenereKeyZeile.innerHTML = "";
    vigenereErgebnisZeile.innerHTML = "";


    const textElemente = [];
    const keyElemente = [];
    const ergebnisElemente = [];


    let keyIndex = 0;


    for (
        let i = 0;
        i < text.length;
        i++
    ) {

        const buchstabe =
            text[i];


        // =================================
        // TEXT
        // =================================

        const textElement =
            vigenereFeldErstellen(
                buchstabe,
                "text"
            );

        vigenereTextZeile.appendChild(
            textElement
        );

        textElemente.push(
            textElement
        );


        // =================================
        // SCHLÜSSEL
        // =================================

        let keyBuchstabe = " ";


        if (
            vigenereIstBuchstabe(
                buchstabe
            )
        ) {

            keyBuchstabe =
                key[
                    keyIndex %
                    key.length
                ];

            keyIndex++;
        }


        const keyElement =
            vigenereFeldErstellen(
                keyBuchstabe,
                "key"
            );

        vigenereKeyZeile.appendChild(
            keyElement
        );

        keyElemente.push(
            keyElement
        );


        // =================================
        // ERGEBNIS
        // =================================

        const ergebnisElement =
            vigenereFeldErstellen(
                " ",
                "ergebnis"
            );

        vigenereErgebnisZeile.appendChild(
            ergebnisElement
        );

        ergebnisElemente.push(
            ergebnisElement
        );
    }


    return {
        textElemente,
        keyElemente,
        ergebnisElemente
    };
}


// ========================================
// VIGENERE ANIMIEREN
// ========================================

async function vigenereAnimieren(
    text,
    key,
    entschluesseln
) {

    const visualisierung =
        vigenereVisualisierungErstellen(
            text,
            key
        );


    let keyIndex = 0;
    let ergebnis = "";


    for (
        let i = 0;
        i < text.length;
        i++
    ) {

        const buchstabe =
            text[i];


        const textElement =
            visualisierung
                .textElemente[i];

        const keyElement =
            visualisierung
                .keyElemente[i];

        const ergebnisElement =
            visualisierung
                .ergebnisElemente[i];


        // Zeichen wie Leerzeichen
        // werden nicht verschlüsselt
        if (
            !vigenereIstBuchstabe(
                buchstabe
            )
        ) {

            ergebnis += buchstabe;

            ergebnisElement.textContent =
                buchstabe === " "
                    ? "\u00A0"
                    : buchstabe;

            ergebnisElement.classList.add(
                "fertig"
            );

            continue;
        }


        const keyBuchstabe =
            key[
                keyIndex %
                key.length
            ];


        let verschiebung =
            vigenereShiftBerechnen(
                keyBuchstabe
            );


        // Beim Entschlüsseln
        // rückwärts verschieben
        if (entschluesseln) {

            verschiebung =
                -verschiebung;
        }


        // =================================
        // AKTUELLEN SCHRITT MARKIEREN
        // =================================

        textElement.classList.add(
            "pruefen"
        );

        keyElement.classList.add(
            "pruefen"
        );


        const normaleVerschiebung =
            vigenereShiftBerechnen(
                keyBuchstabe
            );


        vigenereInfo.textContent =
            `${buchstabe.toUpperCase()} mit ${keyBuchstabe} `
            + `→ Verschiebung ${entschluesseln ? "-" : "+"}${normaleVerschiebung}`;


        await warten(300);


        // =================================
        // BUCHSTABEN BERECHNEN
        // =================================

        const neuerBuchstabe =
            vigenereBuchstabeVerschieben(
                buchstabe,
                verschiebung
            );


        ergebnis +=
            neuerBuchstabe;


        ergebnisElement.textContent =
            neuerBuchstabe;


        ergebnisElement.classList.add(
            "fertig"
        );


        textElement.classList.remove(
            "pruefen"
        );

        keyElement.classList.remove(
            "pruefen"
        );


        keyIndex++;


        await warten(120);
    }


    vigenereInfo.textContent =
        `Ergebnis: ${ergebnis}`;


    console.log(
        "Vigenère-Ergebnis:",
        ergebnis
    );


    return ergebnis;
}


// ========================================
// EINGABEN PRÜFEN
// ========================================

function vigenereEingabenPruefen() {

    const text =
        vigenereText.value;


    const key =
        vigenereKeyBereinigen(
            vigenereKey.value
        );


    if (text.length === 0) {

        vigenereInfo.textContent =
            "Bitte einen Text eingeben.";

        return null;
    }


    if (key.length === 0) {

        vigenereInfo.textContent =
            "Bitte ein gültiges Schlüsselwort eingeben.";

        return null;
    }


    return {
        text,
        key
    };
}


// ========================================
// VERSCHLÜSSELN
// ========================================

vigenereVerschluesseln.addEventListener(
    "click",
    async function() {

        if (vigenereLaeuft) {
            return;
        }


        const eingaben =
            vigenereEingabenPruefen();


        if (eingaben === null) {
            return;
        }


        vigenereLaeuft = true;

        vigenereButtonsSperren(true);


        try {

            await vigenereAnimieren(
                eingaben.text,
                eingaben.key,
                false
            );

        } finally {

            vigenereLaeuft = false;

            vigenereButtonsSperren(false);
        }
    }
);


// ========================================
// ENTSCHLÜSSELN
// ========================================

vigenereEntschluesseln.addEventListener(
    "click",
    async function() {

        if (vigenereLaeuft) {
            return;
        }


        const eingaben =
            vigenereEingabenPruefen();


        if (eingaben === null) {
            return;
        }


        vigenereLaeuft = true;

        vigenereButtonsSperren(true);


        try {

            await vigenereAnimieren(
                eingaben.text,
                eingaben.key,
                true
            );

        } finally {

            vigenereLaeuft = false;

            vigenereButtonsSperren(false);
        }
    }
);


// ========================================
// RESET
// ========================================

vigenereReset.addEventListener(
    "click",
    function() {

        if (vigenereLaeuft) {
            return;
        }


        vigenereText.value = "";
        vigenereKey.value = "";

        vigenereTextZeile.innerHTML = "";
        vigenereKeyZeile.innerHTML = "";
        vigenereErgebnisZeile.innerHTML = "";

        vigenereInfo.textContent =
            "Gib einen Text und ein Schlüsselwort ein.";
    }
);
// ========================================
// XOR VERSCHLÜSSELUNG
// ========================================

const xorText =
    document.getElementById("xor-text");

const xorKey =
    document.getElementById("xor-key");

const xorVerschluesseln =
    document.getElementById("xor-verschluesseln");

const xorEntschluesseln =
    document.getElementById("xor-entschluesseln");

const xorReset =
    document.getElementById("xor-reset");

const xorZeichen =
    document.getElementById("xor-zeichen");

const xorTextBinaer =
    document.getElementById("xor-text-binaer");

const xorKeyBinaer =
    document.getElementById("xor-key-binaer");

const xorErgebnisBinaer =
    document.getElementById("xor-ergebnis-binaer");

const xorAusgabe =
    document.getElementById("xor-ausgabe");


let xorLaeuft = false;


// ========================================
// BUTTONS SPERREN
// ========================================

function xorButtonsSperren(gesperrt) {

    xorVerschluesseln.disabled =
        gesperrt;

    xorEntschluesseln.disabled =
        gesperrt;

    xorReset.disabled =
        gesperrt;

    xorText.disabled =
        gesperrt;

    xorKey.disabled =
        gesperrt;
}


// ========================================
// ZAHL ALS 8 BIT ANZEIGEN
// ========================================

function xorAlsBinaer(zahl) {

    return zahl
        .toString(2)
        .padStart(8, "0");
}


// ========================================
// BYTE ALS HEX
// ========================================

function xorAlsHex(zahl) {

    return zahl
        .toString(16)
        .padStart(2, "0")
        .toUpperCase();
}


// ========================================
// HEX-TEXT PRÜFEN
// ========================================

function xorHexIstGueltig(text) {

    const bereinigt =
        text.replace(/\s/g, "");

    if (bereinigt.length === 0) {
        return false;
    }

    if (bereinigt.length % 2 !== 0) {
        return false;
    }

    return /^[0-9a-fA-F]+$/.test(
        bereinigt
    );
}


// ========================================
// VISUALISIERUNG EINES BYTES
// ========================================

async function xorByteAnimieren(
    zeichenAnzeige,
    textByte,
    keyByte,
    ergebnisByte
) {

    xorZeichen.textContent =
        zeichenAnzeige;

    xorTextBinaer.textContent =
        xorAlsBinaer(textByte);

    xorKeyBinaer.textContent =
        xorAlsBinaer(keyByte);

    xorErgebnisBinaer.textContent =
        "00000000";


    xorTextBinaer.classList.add("aktiv");
    xorKeyBinaer.classList.add("aktiv");


    await warten(300);


    xorErgebnisBinaer.textContent =
        xorAlsBinaer(ergebnisByte);

    xorErgebnisBinaer.classList.add(
        "aktiv"
    );


    await warten(300);


    xorTextBinaer.classList.remove(
        "aktiv"
    );

    xorKeyBinaer.classList.remove(
        "aktiv"
    );

    xorErgebnisBinaer.classList.remove(
        "aktiv"
    );
}


// ========================================
// VERSCHLÜSSELN
//
// Der Geheimtext wird absichtlich als HEX
// angezeigt, weil XOR nicht druckbare Bytes
// erzeugen kann.
// ========================================

async function xorTextVerschluesseln(
    text,
    key
) {

    const ergebnisBytes = [];


    for (
        let i = 0;
        i < text.length;
        i++
    ) {

        /*
            Für dieses Lernbeispiel arbeiten wir
            byteweise mit Zeichenwerten 0-255.
        */

        const textByte =
            text.charCodeAt(i) & 255;

        const ergebnisByte =
            textByte ^ key;


        await xorByteAnimieren(
            text[i],
            textByte,
            key,
            ergebnisByte
        );


        ergebnisBytes.push(
            ergebnisByte
        );


        xorAusgabe.textContent =
            "HEX: "
            + ergebnisBytes
                .map(xorAlsHex)
                .join(" ");
    }


    return ergebnisBytes;
}


// ========================================
// HEX ENTSCHLÜSSELN
// ========================================

async function xorHexEntschluesseln(
    hexText,
    key
) {

    const bereinigt =
        hexText.replace(/\s/g, "");


    const bytes = [];


    for (
        let i = 0;
        i < bereinigt.length;
        i += 2
    ) {

        const byte =
            parseInt(
                bereinigt.slice(
                    i,
                    i + 2
                ),
                16
            );

        bytes.push(byte);
    }


    let ergebnis = "";


    for (
        let i = 0;
        i < bytes.length;
        i++
    ) {

        const geheimByte =
            bytes[i];


        /*
            Genau derselbe XOR-Vorgang
            entschlüsselt wieder.
        */

        const originalByte =
            geheimByte ^ key;


        await xorByteAnimieren(
            "0x" + xorAlsHex(geheimByte),
            geheimByte,
            key,
            originalByte
        );


        const zeichen =
            String.fromCharCode(
                originalByte
            );


        ergebnis += zeichen;


        xorAusgabe.textContent =
            "Text: " + ergebnis;
    }


    return ergebnis;
}


// ========================================
// KEY PRÜFEN
// ========================================

function xorKeyPruefen() {

    const key =
        Number(xorKey.value);


    if (
        !Number.isInteger(key) ||
        key < 0 ||
        key > 255
    ) {

        xorAusgabe.textContent =
            "Der Schlüssel muss zwischen 0 und 255 liegen.";

        return null;
    }


    return key;
}


// ========================================
// VERSCHLÜSSELN BUTTON
// ========================================

xorVerschluesseln.addEventListener(
    "click",
    async function() {

        if (xorLaeuft) {
            return;
        }


        const text =
            xorText.value;


        if (text.length === 0) {

            xorAusgabe.textContent =
                "Bitte einen Text eingeben.";

            return;
        }


        const key =
            xorKeyPruefen();


        if (key === null) {
            return;
        }


        xorLaeuft = true;

        xorButtonsSperren(true);


        try {

            const bytes =
                await xorTextVerschluesseln(
                    text,
                    key
                );


            const hex =
                bytes
                    .map(xorAlsHex)
                    .join(" ");


            xorAusgabe.textContent =
                "HEX: " + hex;


            console.log(
                "XOR verschlüsselt:",
                hex
            );

        } finally {

            xorLaeuft = false;

            xorButtonsSperren(false);
        }
    }
);


// ========================================
// ENTSCHLÜSSELN BUTTON
// ========================================

xorEntschluesseln.addEventListener(
    "click",
    async function() {

        if (xorLaeuft) {
            return;
        }


        const text =
            xorText.value;


        if (!xorHexIstGueltig(text)) {

            xorAusgabe.textContent =
                "Zum Entschlüsseln bitte den HEX-Text eingeben.";

            return;
        }


        const key =
            xorKeyPruefen();


        if (key === null) {
            return;
        }


        xorLaeuft = true;

        xorButtonsSperren(true);


        try {

            const ergebnis =
                await xorHexEntschluesseln(
                    text,
                    key
                );


            xorAusgabe.textContent =
                "Text: " + ergebnis;


            console.log(
                "XOR entschlüsselt:",
                ergebnis
            );

        } finally {

            xorLaeuft = false;

            xorButtonsSperren(false);
        }
    }
);


// ========================================
// RESET
// ========================================

xorReset.addEventListener(
    "click",
    function() {

        if (xorLaeuft) {
            return;
        }


        xorText.value = "";

        xorKey.value = 42;

        xorZeichen.textContent = "-";

        xorTextBinaer.textContent =
            "00000000";

        xorKeyBinaer.textContent =
            "00000000";

        xorErgebnisBinaer.textContent =
            "00000000";

        xorAusgabe.textContent =
            "Ergebnis erscheint hier.";
    }
);
// ========================================
// RAIL FENCE CHIFFRE
// ========================================

const railText =
    document.getElementById("rail-text");

const railAnzahl =
    document.getElementById("rail-anzahl");

const railVerschluesseln =
    document.getElementById("rail-verschluesseln");

const railEntschluesseln =
    document.getElementById("rail-entschluesseln");

const railReset =
    document.getElementById("rail-reset");

const railVisualisierung =
    document.getElementById("rail-visualisierung");

const railAusgabe =
    document.getElementById("rail-ausgabe");

let railLaeuft = false;


// ========================================
// BUTTONS SPERREN
// ========================================

function railButtonsSperren(gesperrt) {

    railVerschluesseln.disabled =
        gesperrt;

    railEntschluesseln.disabled =
        gesperrt;

    railReset.disabled =
        gesperrt;

    railText.disabled =
        gesperrt;

    railAnzahl.disabled =
        gesperrt;
}


// ========================================
// EINGABEN PRÜFEN
// ========================================

function railEingabenPruefen() {

    const text =
        railText.value;

    const schienen =
        Number(railAnzahl.value);


    if (text.length === 0) {

        railAusgabe.textContent =
            "Bitte zuerst einen Text eingeben.";

        return null;
    }


    if (
        !Number.isInteger(schienen) ||
        schienen < 2 ||
        schienen > 6
    ) {

        railAusgabe.textContent =
            "Bitte zwischen 2 und 6 Schienen wählen.";

        return null;
    }


    if (schienen > text.length) {

        railAusgabe.textContent =
            "Es gibt mehr Schienen als Zeichen.";

        return null;
    }


    return {
        text: text,
        schienen: schienen
    };
}


// ========================================
// ZICKZACK-MUSTER BERECHNEN
// ========================================

function railMusterErzeugen(
    textLaenge,
    schienen
) {

    const muster = [];

    let aktuelleSchiene = 0;
    let richtung = 1;


    for (
        let i = 0;
        i < textLaenge;
        i++
    ) {

        muster.push(
            aktuelleSchiene
        );


        if (aktuelleSchiene === 0) {

            richtung = 1;

        } else if (
            aktuelleSchiene ===
            schienen - 1
        ) {

            richtung = -1;
        }


        aktuelleSchiene +=
            richtung;
    }


    return muster;
}


// ========================================
// LEERES VISUALISIERUNGSRASTER
// ========================================

function railRasterErzeugen(
    textLaenge,
    schienen
) {

    railVisualisierung.innerHTML = "";


    const felder = [];


    for (
        let zeile = 0;
        zeile < schienen;
        zeile++
    ) {

        const schiene =
            document.createElement("div");

        schiene.classList.add(
            "rail-schiene"
        );


        felder[zeile] = [];


        for (
            let spalte = 0;
            spalte < textLaenge;
            spalte++
        ) {

            const feld =
                document.createElement("div");


            feld.classList.add(
                "rail-position",
                "leer"
            );


            schiene.appendChild(
                feld
            );


            felder[zeile][spalte] =
                feld;
        }


        railVisualisierung.appendChild(
            schiene
        );
    }


    return felder;
}


// ========================================
// VERSCHLÜSSELN
// ========================================

async function railTextVerschluesseln(
    text,
    schienen
) {

    const muster =
        railMusterErzeugen(
            text.length,
            schienen
        );


    const felder =
        railRasterErzeugen(
            text.length,
            schienen
        );


    // Jede Schiene erhält ihre Zeichen
    const schienenTexte =
        Array.from(
            { length: schienen },
            function() {
                return "";
            }
        );


    // ====================================
    // ZICKZACK AUFBAUEN
    // ====================================

    for (
        let i = 0;
        i < text.length;
        i++
    ) {

        const zeile =
            muster[i];


        const feld =
            felder[zeile][i];


        feld.classList.remove(
            "leer"
        );

        feld.classList.add(
            "pruefen"
        );


        feld.textContent =
            text[i] === " "
                ? "\u00A0"
                : text[i];


        await warten(150);


        feld.classList.remove(
            "pruefen"
        );

        feld.classList.add(
            "fertig"
        );


        schienenTexte[zeile] +=
            text[i];
    }


    // ====================================
    // SCHIENEN ZEILENWEISE AUSLESEN
    // ====================================

    let ergebnis = "";


    for (
        let zeile = 0;
        zeile < schienen;
        zeile++
    ) {

        ergebnis +=
            schienenTexte[zeile];
    }


    railAusgabe.textContent =
        "Verschlüsselt: " + ergebnis;


    console.log(
        "Rail Fence:",
        ergebnis
    );


    return ergebnis;
}


// ========================================
// ENTSCHLÜSSELN
// ========================================

async function railTextEntschluesseln(
    text,
    schienen
) {

    const muster =
        railMusterErzeugen(
            text.length,
            schienen
        );


    const felder =
        railRasterErzeugen(
            text.length,
            schienen
        );


    // ====================================
    // ANZAHL ZEICHEN PRO SCHIENE
    // ====================================

    const anzahlProSchiene =
        new Array(schienen)
            .fill(0);


    for (const zeile of muster) {

        anzahlProSchiene[zeile]++;
    }


    // ====================================
    // GEHEIMTEXT AUF SCHIENEN VERTEILEN
    // ====================================

    const schienenInhalte = [];

    let textIndex = 0;


    for (
        let zeile = 0;
        zeile < schienen;
        zeile++
    ) {

        const anzahl =
            anzahlProSchiene[zeile];


        schienenInhalte[zeile] =
            text.slice(
                textIndex,
                textIndex + anzahl
            )
            .split("");


        textIndex += anzahl;
    }


    // Zeigt, welches Zeichen aus einer
    // Schiene bereits verwendet wurde
    const positionen =
        new Array(schienen)
            .fill(0);


    let ergebnis = "";


    // ====================================
    // ZICKZACK REKONSTRUIEREN
    // ====================================

    for (
        let i = 0;
        i < muster.length;
        i++
    ) {

        const zeile =
            muster[i];


        const index =
            positionen[zeile];


        const buchstabe =
            schienenInhalte[zeile][index];


        positionen[zeile]++;


        const feld =
            felder[zeile][i];


        feld.classList.remove(
            "leer"
        );

        feld.classList.add(
            "pruefen"
        );


        feld.textContent =
            buchstabe === " "
                ? "\u00A0"
                : buchstabe;


        await warten(150);


        feld.classList.remove(
            "pruefen"
        );

        feld.classList.add(
            "fertig"
        );


        ergebnis += buchstabe;


        railAusgabe.textContent =
            "Entschlüsselt: "
            + ergebnis;
    }


    console.log(
        "Rail Fence entschlüsselt:",
        ergebnis
    );


    return ergebnis;
}


// ========================================
// BUTTON: VERSCHLÜSSELN
// ========================================

railVerschluesseln.addEventListener(
    "click",
    async function() {

        if (railLaeuft) {
            return;
        }


        const eingaben =
            railEingabenPruefen();


        if (eingaben === null) {
            return;
        }


        railLaeuft = true;

        railButtonsSperren(true);


        try {

            await railTextVerschluesseln(
                eingaben.text,
                eingaben.schienen
            );

        } finally {

            railLaeuft = false;

            railButtonsSperren(false);
        }
    }
);


// ========================================
// BUTTON: ENTSCHLÜSSELN
// ========================================

railEntschluesseln.addEventListener(
    "click",
    async function() {

        if (railLaeuft) {
            return;
        }


        const eingaben =
            railEingabenPruefen();


        if (eingaben === null) {
            return;
        }


        railLaeuft = true;

        railButtonsSperren(true);


        try {

            await railTextEntschluesseln(
                eingaben.text,
                eingaben.schienen
            );

        } finally {

            railLaeuft = false;

            railButtonsSperren(false);
        }
    }
);


// ========================================
// RESET
// ========================================

railReset.addEventListener(
    "click",
    function() {

        if (railLaeuft) {
            return;
        }


        railText.value = "";

        railAnzahl.value = 3;

        railVisualisierung.innerHTML =
            "";

        railAusgabe.textContent =
            "Ergebnis erscheint hier.";
    }
);
// ========================================
// PLAYFAIR CHIFFRE
// ========================================

const playfairText =
    document.getElementById("playfair-text");

const playfairKey =
    document.getElementById("playfair-key");

const playfairVerschluesseln =
    document.getElementById("playfair-verschluesseln");

const playfairEntschluesseln =
    document.getElementById("playfair-entschluesseln");

const playfairReset =
    document.getElementById("playfair-reset");

const playfairMatrix =
    document.getElementById("playfair-matrix");

const playfairPaarA =
    document.getElementById("playfair-paar-a");

const playfairPaarB =
    document.getElementById("playfair-paar-b");

const playfairRegel =
    document.getElementById("playfair-regel");

const playfairPaare =
    document.getElementById("playfair-paare");

const playfairErgebnis =
    document.getElementById("playfair-ergebnis");

const playfairAusgabe =
    document.getElementById("playfair-ausgabe");


let playfairLaeuft = false;
let playfairMatrixDaten = [];
let playfairMatrixElemente = [];


// ========================================
// BUTTONS SPERREN
// ========================================

function playfairButtonsSperren(gesperrt) {

    playfairVerschluesseln.disabled =
        gesperrt;

    playfairEntschluesseln.disabled =
        gesperrt;

    playfairReset.disabled =
        gesperrt;

    playfairText.disabled =
        gesperrt;

    playfairKey.disabled =
        gesperrt;
}


// ========================================
// TEXT BEREINIGEN
// ========================================

function playfairTextBereinigen(text) {

    let ergebnis = "";


    for (const zeichen of text.toUpperCase()) {

        if (
            zeichen >= "A" &&
            zeichen <= "Z"
        ) {

            // I und J teilen sich ein Feld.
            // Deshalb wird J zu I.
            if (zeichen === "J") {

                ergebnis += "I";

            } else {

                ergebnis += zeichen;
            }
        }
    }


    return ergebnis;
}


// ========================================
// SCHLÜSSEL BEREINIGEN
// ========================================

function playfairKeyBereinigen(key) {

    const bereinigt =
        playfairTextBereinigen(key);

    let ergebnis = "";


    for (const buchstabe of bereinigt) {

        if (!ergebnis.includes(buchstabe)) {

            ergebnis += buchstabe;
        }
    }


    return ergebnis;
}


// ========================================
// MATRIX ERZEUGEN
// ========================================

function playfairMatrixErzeugen(key) {

    const alphabet =
        "ABCDEFGHIKLMNOPQRSTUVWXYZ";

    const bereinigterKey =
        playfairKeyBereinigen(key);

    let matrixText =
        bereinigterKey;


    for (const buchstabe of alphabet) {

        if (!matrixText.includes(buchstabe)) {

            matrixText += buchstabe;
        }
    }


    playfairMatrixDaten = [];


    for (let zeile = 0; zeile < 5; zeile++) {

        playfairMatrixDaten[zeile] = [];


        for (
            let spalte = 0;
            spalte < 5;
            spalte++
        ) {

            const index =
                zeile * 5 + spalte;

            playfairMatrixDaten[zeile][spalte] =
                matrixText[index];
        }
    }


    return {
        matrix: playfairMatrixDaten,
        keyLaenge: bereinigterKey.length
    };
}


// ========================================
// MATRIX ANZEIGEN
// ========================================

function playfairMatrixAnzeigen(key) {

    const matrixErgebnis =
        playfairMatrixErzeugen(key);

    const keyLaenge =
        matrixErgebnis.keyLaenge;


    playfairMatrix.innerHTML = "";
    playfairMatrixElemente = [];


    let index = 0;


    for (let zeile = 0; zeile < 5; zeile++) {

        playfairMatrixElemente[zeile] = [];


        for (
            let spalte = 0;
            spalte < 5;
            spalte++
        ) {

            const feld =
                document.createElement("div");


            feld.classList.add(
                "playfair-matrix-feld"
            );


            if (index < keyLaenge) {

                feld.classList.add(
                    "schluessel"
                );
            }


            feld.textContent =
                playfairMatrixDaten[zeile][spalte];


            playfairMatrix.appendChild(
                feld
            );


            playfairMatrixElemente[zeile][spalte] =
                feld;


            index++;
        }
    }
}


// ========================================
// POSITION EINES BUCHSTABENS FINDEN
// ========================================

function playfairPositionFinden(buchstabe) {

    const gesucht =
        buchstabe === "J"
            ? "I"
            : buchstabe;


    for (let zeile = 0; zeile < 5; zeile++) {

        for (
            let spalte = 0;
            spalte < 5;
            spalte++
        ) {

            if (
                playfairMatrixDaten[zeile][spalte]
                === gesucht
            ) {

                return {
                    zeile: zeile,
                    spalte: spalte
                };
            }
        }
    }


    return null;
}


// ========================================
// KLARTEXT IN PAARE AUFTEILEN
// ========================================

function playfairKlartextPaareErzeugen(text) {

    const bereinigt =
        playfairTextBereinigen(text);

    const paare = [];

    let index = 0;


    while (index < bereinigt.length) {

        const erster =
            bereinigt[index];

        let zweiter =
            bereinigt[index + 1];


        // Letzter einzelner Buchstabe
        if (zweiter === undefined) {

            /*
                Wenn der letzte Buchstabe X ist,
                verwenden wir Q als Füllzeichen.
            */

            const fueller =
                erster === "X"
                    ? "Q"
                    : "X";


            paare.push(
                erster + fueller
            );


            index++;

            continue;
        }


        // Zwei gleiche Buchstaben dürfen
        // nicht im selben Paar stehen
        if (erster === zweiter) {

            const fueller =
                erster === "X"
                    ? "Q"
                    : "X";


            paare.push(
                erster + fueller
            );


            // Nur den ersten Buchstaben verbrauchen.
            // Der zweite wird im nächsten Paar erneut geprüft.
            index++;

        } else {

            paare.push(
                erster + zweiter
            );

            index += 2;
        }
    }


    return paare;
}


// ========================================
// GEHEIMTEXT IN PAARE AUFTEILEN
// ========================================

function playfairGeheimtextPaareErzeugen(text) {

    const bereinigt =
        playfairTextBereinigen(text);


    if (
        bereinigt.length === 0 ||
        bereinigt.length % 2 !== 0
    ) {

        return null;
    }


    const paare = [];


    for (
        let index = 0;
        index < bereinigt.length;
        index += 2
    ) {

        paare.push(
            bereinigt[index]
            + bereinigt[index + 1]
        );
    }


    return paare;
}


// ========================================
// EIN PAAR VERARBEITEN
// ========================================

function playfairPaarVerarbeiten(
    paar,
    entschluesseln
) {

    const buchstabeA =
        paar[0];

    const buchstabeB =
        paar[1];


    const positionA =
        playfairPositionFinden(
            buchstabeA
        );

    const positionB =
        playfairPositionFinden(
            buchstabeB
        );


    const richtung =
        entschluesseln
            ? -1
            : 1;


    let ergebnisA;
    let ergebnisB;
    let regel;


    // ====================================
    // GLEICHE ZEILE
    // ====================================

    if (
        positionA.zeile ===
        positionB.zeile
    ) {

        const neueSpalteA =
            (
                positionA.spalte
                + richtung
                + 5
            )
            % 5;


        const neueSpalteB =
            (
                positionB.spalte
                + richtung
                + 5
            )
            % 5;


        ergebnisA =
            playfairMatrixDaten[
                positionA.zeile
            ][neueSpalteA];


        ergebnisB =
            playfairMatrixDaten[
                positionB.zeile
            ][neueSpalteB];


        regel =
            entschluesseln
                ? "Gleiche Zeile: beide Buchstaben ein Feld nach links."
                : "Gleiche Zeile: beide Buchstaben ein Feld nach rechts.";


        return {
            ergebnis:
                ergebnisA + ergebnisB,

            regel: regel,

            positionA: positionA,
            positionB: positionB,

            ergebnisPositionA: {
                zeile: positionA.zeile,
                spalte: neueSpalteA
            },

            ergebnisPositionB: {
                zeile: positionB.zeile,
                spalte: neueSpalteB
            },

            typ: "zeile"
        };
    }


    // ====================================
    // GLEICHE SPALTE
    // ====================================

    if (
        positionA.spalte ===
        positionB.spalte
    ) {

        const neueZeileA =
            (
                positionA.zeile
                + richtung
                + 5
            )
            % 5;


        const neueZeileB =
            (
                positionB.zeile
                + richtung
                + 5
            )
            % 5;


        ergebnisA =
            playfairMatrixDaten[
                neueZeileA
            ][positionA.spalte];


        ergebnisB =
            playfairMatrixDaten[
                neueZeileB
            ][positionB.spalte];


        regel =
            entschluesseln
                ? "Gleiche Spalte: beide Buchstaben ein Feld nach oben."
                : "Gleiche Spalte: beide Buchstaben ein Feld nach unten.";


        return {
            ergebnis:
                ergebnisA + ergebnisB,

            regel: regel,

            positionA: positionA,
            positionB: positionB,

            ergebnisPositionA: {
                zeile: neueZeileA,
                spalte: positionA.spalte
            },

            ergebnisPositionB: {
                zeile: neueZeileB,
                spalte: positionB.spalte
            },

            typ: "spalte"
        };
    }


    // ====================================
    // RECHTECKREGEL
    // ====================================

    ergebnisA =
        playfairMatrixDaten[
            positionA.zeile
        ][positionB.spalte];


    ergebnisB =
        playfairMatrixDaten[
            positionB.zeile
        ][positionA.spalte];


    regel =
        "Rechteckregel: Jeder Buchstabe nimmt die andere Ecke seiner Zeile.";


    return {
        ergebnis:
            ergebnisA + ergebnisB,

        regel: regel,

        positionA: positionA,
        positionB: positionB,

        ergebnisPositionA: {
            zeile: positionA.zeile,
            spalte: positionB.spalte
        },

        ergebnisPositionB: {
            zeile: positionB.zeile,
            spalte: positionA.spalte
        },

        typ: "rechteck"
    };
}


// ========================================
// MATRIX-MARKIERUNGEN ENTFERNEN
// ========================================

function playfairMarkierungenEntfernen() {

    for (
        let zeile = 0;
        zeile < playfairMatrixElemente.length;
        zeile++
    ) {

        for (
            let spalte = 0;
            spalte <
                playfairMatrixElemente[zeile].length;
            spalte++
        ) {

            playfairMatrixElemente[zeile][spalte]
                .classList.remove(
                    "buchstabe-a",
                    "buchstabe-b",
                    "ergebnis",
                    "rechteck"
                );
        }
    }
}


// ========================================
// PAARE ANZEIGEN
// ========================================

function playfairPaareAnzeigen(paare) {

    playfairPaare.innerHTML = "";


    const elemente = [];


    for (const paar of paare) {

        const element =
            document.createElement("span");


        element.classList.add(
            "playfair-paar"
        );


        element.textContent =
            paar;


        playfairPaare.appendChild(
            element
        );


        elemente.push(
            element
        );
    }


    return elemente;
}


// ========================================
// PLAYFAIR ANIMIEREN
// ========================================

async function playfairAnimieren(
    paare,
    entschluesseln
) {

    const paarElemente =
        playfairPaareAnzeigen(
            paare
        );


    playfairErgebnis.innerHTML = "";


    let gesamtesErgebnis = "";


    for (
        let index = 0;
        index < paare.length;
        index++
    ) {

        const paar =
            paare[index];


        const paarElement =
            paarElemente[index];


        playfairPaarA.textContent =
            paar[0];

        playfairPaarB.textContent =
            paar[1];


        playfairPaarA.classList.add(
            "pruefen"
        );

        playfairPaarB.classList.add(
            "pruefen"
        );

        paarElement.classList.add(
            "aktiv"
        );


        playfairMarkierungenEntfernen();


        const schritt =
            playfairPaarVerarbeiten(
                paar,
                entschluesseln
            );


        const feldA =
            playfairMatrixElemente[
                schritt.positionA.zeile
            ][schritt.positionA.spalte];


        const feldB =
            playfairMatrixElemente[
                schritt.positionB.zeile
            ][schritt.positionB.spalte];


        feldA.classList.add(
            "buchstabe-a"
        );

        feldB.classList.add(
            "buchstabe-b"
        );


        // Bei der Rechteckregel alle vier Ecken zeigen
        if (schritt.typ === "rechteck") {

            feldA.classList.add(
                "rechteck"
            );

            feldB.classList.add(
                "rechteck"
            );


            playfairMatrixElemente[
                schritt.ergebnisPositionA.zeile
            ][schritt.ergebnisPositionA.spalte]
                .classList.add(
                    "rechteck"
                );


            playfairMatrixElemente[
                schritt.ergebnisPositionB.zeile
            ][schritt.ergebnisPositionB.spalte]
                .classList.add(
                    "rechteck"
                );
        }


        playfairRegel.textContent =
            `${paar} → ${schritt.regel}`;


        await warten(500);


        const ergebnisFeldA =
            playfairMatrixElemente[
                schritt.ergebnisPositionA.zeile
            ][schritt.ergebnisPositionA.spalte];


        const ergebnisFeldB =
            playfairMatrixElemente[
                schritt.ergebnisPositionB.zeile
            ][schritt.ergebnisPositionB.spalte];


        ergebnisFeldA.classList.add(
            "ergebnis"
        );

        ergebnisFeldB.classList.add(
            "ergebnis"
        );


        await warten(350);


        const ergebnisElement =
            document.createElement("span");


        ergebnisElement.classList.add(
            "playfair-paar",
            "fertig"
        );


        ergebnisElement.textContent =
            schritt.ergebnis;


        playfairErgebnis.appendChild(
            ergebnisElement
        );


        gesamtesErgebnis +=
            schritt.ergebnis;


        playfairAusgabe.textContent =
            (
                entschluesseln
                    ? "Entschlüsselt: "
                    : "Verschlüsselt: "
            )
            + gesamtesErgebnis;


        paarElement.classList.remove(
            "aktiv"
        );

        paarElement.classList.add(
            "fertig"
        );


        playfairPaarA.classList.remove(
            "pruefen"
        );

        playfairPaarB.classList.remove(
            "pruefen"
        );


        await warten(180);
    }


    playfairMarkierungenEntfernen();


    playfairPaarA.textContent = "-";
    playfairPaarB.textContent = "-";


    playfairRegel.textContent =
        "Verarbeitung abgeschlossen.";


    return gesamtesErgebnis;
}


// ========================================
// EINGABEN PRÜFEN
// ========================================

function playfairEingabenPruefen(
    entschluesseln
) {

    const text =
        playfairText.value;

    const key =
        playfairKey.value;


    if (
        playfairTextBereinigen(text).length
        === 0
    ) {

        playfairAusgabe.textContent =
            "Bitte einen Text mit Buchstaben eingeben.";

        return null;
    }


    if (
        playfairKeyBereinigen(key).length
        === 0
    ) {

        playfairAusgabe.textContent =
            "Bitte ein gültiges Schlüsselwort eingeben.";

        return null;
    }


    let paare;


    if (entschluesseln) {

        paare =
            playfairGeheimtextPaareErzeugen(
                text
            );


        if (paare === null) {

            playfairAusgabe.textContent =
                "Der Geheimtext muss aus einer geraden Anzahl Buchstaben bestehen.";

            return null;
        }

    } else {

        paare =
            playfairKlartextPaareErzeugen(
                text
            );
    }


    return {
        key: key,
        paare: paare
    };
}


// ========================================
// VERSCHLÜSSELN
// ========================================

playfairVerschluesseln.addEventListener(
    "click",
    async function() {

        if (playfairLaeuft) {
            return;
        }


        const eingaben =
            playfairEingabenPruefen(
                false
            );


        if (eingaben === null) {
            return;
        }


        playfairLaeuft = true;

        playfairButtonsSperren(true);


        try {

            playfairMatrixAnzeigen(
                eingaben.key
            );


            await playfairAnimieren(
                eingaben.paare,
                false
            );

        } finally {

            playfairLaeuft = false;

            playfairButtonsSperren(false);
        }
    }
);


// ========================================
// ENTSCHLÜSSELN
// ========================================

playfairEntschluesseln.addEventListener(
    "click",
    async function() {

        if (playfairLaeuft) {
            return;
        }


        const eingaben =
            playfairEingabenPruefen(
                true
            );


        if (eingaben === null) {
            return;
        }


        playfairLaeuft = true;

        playfairButtonsSperren(true);


        try {

            playfairMatrixAnzeigen(
                eingaben.key
            );


            await playfairAnimieren(
                eingaben.paare,
                true
            );

        } finally {

            playfairLaeuft = false;

            playfairButtonsSperren(false);
        }
    }
);


// ========================================
// RESET
// ========================================

playfairReset.addEventListener(
    "click",
    function() {

        if (playfairLaeuft) {
            return;
        }


        playfairText.value = "";
        playfairKey.value = "";


        playfairMatrix.innerHTML = "";
        playfairPaare.innerHTML = "";
        playfairErgebnis.innerHTML = "";


        playfairPaarA.textContent = "-";
        playfairPaarB.textContent = "-";


        playfairRegel.textContent =
            "Gib Text und Schlüsselwort ein.";


        playfairAusgabe.textContent =
            "Ergebnis erscheint hier.";


        playfairMatrixDaten = [];
        playfairMatrixElemente = [];
    }
);
// ========================================
// AES-128 VISUALIZER
// ========================================

const aesText =
    document.getElementById("aes-text");

const aesKey =
    document.getElementById("aes-key");

const aesVorbereiten =
    document.getElementById("aes-vorbereiten");

const aesNaechsterSchritt =
    document.getElementById("aes-naechster-schritt");

const aesAutomatisch =
    document.getElementById("aes-automatisch");

const aesReset =
    document.getElementById("aes-reset");

const aesStateMatrix =
    document.getElementById("aes-state-matrix");

const aesKeyMatrix =
    document.getElementById("aes-key-matrix");

const aesByteZeile =
    document.getElementById("aes-byte-zeile");

const aesRundeAnzeige =
    document.getElementById("aes-runde");

const aesOperationAnzeige =
    document.getElementById("aes-operation");

const aesSchrittTitel =
    document.getElementById("aes-schritt-titel");

const aesSchrittText =
    document.getElementById("aes-schritt-text");

const aesAusgabe =
    document.getElementById("aes-ausgabe");


let aesSchritte = [];
let aesAktuellerSchritt = -1;
let aesLaeuft = false;

let aesStateElemente = [];
let aesKeyElemente = [];


// ========================================
// AES S-BOX
// ========================================

const aesSBox = [
    0x63, 0x7c, 0x77, 0x7b, 0xf2, 0x6b, 0x6f, 0xc5,
    0x30, 0x01, 0x67, 0x2b, 0xfe, 0xd7, 0xab, 0x76,
    0xca, 0x82, 0xc9, 0x7d, 0xfa, 0x59, 0x47, 0xf0,
    0xad, 0xd4, 0xa2, 0xaf, 0x9c, 0xa4, 0x72, 0xc0,
    0xb7, 0xfd, 0x93, 0x26, 0x36, 0x3f, 0xf7, 0xcc,
    0x34, 0xa5, 0xe5, 0xf1, 0x71, 0xd8, 0x31, 0x15,
    0x04, 0xc7, 0x23, 0xc3, 0x18, 0x96, 0x05, 0x9a,
    0x07, 0x12, 0x80, 0xe2, 0xeb, 0x27, 0xb2, 0x75,
    0x09, 0x83, 0x2c, 0x1a, 0x1b, 0x6e, 0x5a, 0xa0,
    0x52, 0x3b, 0xd6, 0xb3, 0x29, 0xe3, 0x2f, 0x84,
    0x53, 0xd1, 0x00, 0xed, 0x20, 0xfc, 0xb1, 0x5b,
    0x6a, 0xcb, 0xbe, 0x39, 0x4a, 0x4c, 0x58, 0xcf,
    0xd0, 0xef, 0xaa, 0xfb, 0x43, 0x4d, 0x33, 0x85,
    0x45, 0xf9, 0x02, 0x7f, 0x50, 0x3c, 0x9f, 0xa8,
    0x51, 0xa3, 0x40, 0x8f, 0x92, 0x9d, 0x38, 0xf5,
    0xbc, 0xb6, 0xda, 0x21, 0x10, 0xff, 0xf3, 0xd2,
    0xcd, 0x0c, 0x13, 0xec, 0x5f, 0x97, 0x44, 0x17,
    0xc4, 0xa7, 0x7e, 0x3d, 0x64, 0x5d, 0x19, 0x73,
    0x60, 0x81, 0x4f, 0xdc, 0x22, 0x2a, 0x90, 0x88,
    0x46, 0xee, 0xb8, 0x14, 0xde, 0x5e, 0x0b, 0xdb,
    0xe0, 0x32, 0x3a, 0x0a, 0x49, 0x06, 0x24, 0x5c,
    0xc2, 0xd3, 0xac, 0x62, 0x91, 0x95, 0xe4, 0x79,
    0xe7, 0xc8, 0x37, 0x6d, 0x8d, 0xd5, 0x4e, 0xa9,
    0x6c, 0x56, 0xf4, 0xea, 0x65, 0x7a, 0xae, 0x08,
    0xba, 0x78, 0x25, 0x2e, 0x1c, 0xa6, 0xb4, 0xc6,
    0xe8, 0xdd, 0x74, 0x1f, 0x4b, 0xbd, 0x8b, 0x8a,
    0x70, 0x3e, 0xb5, 0x66, 0x48, 0x03, 0xf6, 0x0e,
    0x61, 0x35, 0x57, 0xb9, 0x86, 0xc1, 0x1d, 0x9e,
    0xe1, 0xf8, 0x98, 0x11, 0x69, 0xd9, 0x8e, 0x94,
    0x9b, 0x1e, 0x87, 0xe9, 0xce, 0x55, 0x28, 0xdf,
    0x8c, 0xa1, 0x89, 0x0d, 0xbf, 0xe6, 0x42, 0x68,
    0x41, 0x99, 0x2d, 0x0f, 0xb0, 0x54, 0xbb, 0x16
];


// Rundkonstanten für AES-128

const aesRcon = [
    0x00,
    0x01,
    0x02,
    0x04,
    0x08,
    0x10,
    0x20,
    0x40,
    0x80,
    0x1b,
    0x36
];


// ========================================
// HILFSFUNKTIONEN
// ========================================

function aesByteHex(wert) {

    return wert
        .toString(16)
        .padStart(2, "0")
        .toUpperCase();
}


function aesArrayKopieren(array) {

    return [...array];
}


function aesAsciiInBytes(text) {

    const bytes = [];

    for (let i = 0; i < text.length; i++) {

        bytes.push(
            text.charCodeAt(i) & 255
        );
    }

    return bytes;
}


// ========================================
// MATRIXPOSITION
//
// AES ordnet die Eingabebytes spaltenweise
// in den State ein.
//
// Index = Spalte * 4 + Zeile
// ========================================

function aesStateIndex(zeile, spalte) {

    return spalte * 4 + zeile;
}


// ========================================
// MATRIX-ELEMENTE ERZEUGEN
// ========================================

function aesMatrizenErzeugen() {

    aesStateMatrix.innerHTML = "";
    aesKeyMatrix.innerHTML = "";

    aesStateElemente = [];
    aesKeyElemente = [];


    for (let zeile = 0; zeile < 4; zeile++) {

        for (let spalte = 0; spalte < 4; spalte++) {

            const index =
                aesStateIndex(
                    zeile,
                    spalte
                );


            const stateFeld =
                document.createElement("div");

            stateFeld.classList.add(
                "aes-byte"
            );

            stateFeld.textContent = "00";

            stateFeld.dataset.index =
                index;

            aesStateMatrix.appendChild(
                stateFeld
            );

            aesStateElemente[index] =
                stateFeld;


            const keyFeld =
                document.createElement("div");

            keyFeld.classList.add(
                "aes-byte"
            );

            keyFeld.textContent = "00";

            keyFeld.dataset.index =
                index;

            aesKeyMatrix.appendChild(
                keyFeld
            );

            aesKeyElemente[index] =
                keyFeld;
        }
    }
}


// ========================================
// MATRIZEN AKTUALISIEREN
// ========================================

function aesStateAnzeigen(state) {

    for (let index = 0; index < 16; index++) {

        aesStateElemente[index].textContent =
            aesByteHex(state[index]);
    }


    aesByteZeile.innerHTML = "";


    for (const byte of state) {

        const element =
            document.createElement("span");

        element.classList.add(
            "aes-byte-inline"
        );

        element.textContent =
            aesByteHex(byte);

        aesByteZeile.appendChild(
            element
        );
    }
}


function aesKeyAnzeigen(key) {

    for (let index = 0; index < 16; index++) {

        aesKeyElemente[index].textContent =
            aesByteHex(key[index]);
    }
}


// ========================================
// MARKIERUNGEN
// ========================================

function aesMarkierungenEntfernen() {

    const alleElemente = [
        ...aesStateElemente,
        ...aesKeyElemente
    ];


    for (const element of alleElemente) {

        element.classList.remove(
            "aktiv",
            "fertig",
            "xor",
            "verschieben",
            "mischen"
        );
    }
}


function aesKlasseAufState(klasse) {

    for (const element of aesStateElemente) {

        element.classList.add(
            klasse
        );
    }
}


function aesKlasseAufKey(klasse) {

    for (const element of aesKeyElemente) {

        element.classList.add(
            klasse
        );
    }
}


// ========================================
// AES SCHRITTE
// ========================================

function aesAddRoundKey(
    state,
    roundKey
) {

    const ergebnis = [];

    for (let i = 0; i < 16; i++) {

        ergebnis[i] =
            state[i] ^ roundKey[i];
    }

    return ergebnis;
}


function aesSubBytes(state) {

    return state.map(
        function(byte) {

            return aesSBox[byte];
        }
    );
}


function aesShiftRows(state) {

    const ergebnis =
        new Array(16);


    for (let zeile = 0; zeile < 4; zeile++) {

        for (
            let spalte = 0;
            spalte < 4;
            spalte++
        ) {

            const quelleSpalte =
                (spalte + zeile) % 4;


            ergebnis[
                aesStateIndex(
                    zeile,
                    spalte
                )
            ] =
                state[
                    aesStateIndex(
                        zeile,
                        quelleSpalte
                    )
                ];
        }
    }


    return ergebnis;
}


// Multiplikation mit x im endlichen Körper

function aesXtime(byte) {

    const verschoben =
        byte << 1;

    if (byte & 0x80) {

        return (
            (verschoben ^ 0x1b)
            & 0xff
        );
    }

    return verschoben & 0xff;
}


function aesMixSingleColumn(
    a0,
    a1,
    a2,
    a3
) {

    const doppelt0 =
        aesXtime(a0);

    const doppelt1 =
        aesXtime(a1);

    const doppelt2 =
        aesXtime(a2);

    const doppelt3 =
        aesXtime(a3);


    return [
        (
            doppelt0
            ^ (doppelt1 ^ a1)
            ^ a2
            ^ a3
        ) & 0xff,

        (
            a0
            ^ doppelt1
            ^ (doppelt2 ^ a2)
            ^ a3
        ) & 0xff,

        (
            a0
            ^ a1
            ^ doppelt2
            ^ (doppelt3 ^ a3)
        ) & 0xff,

        (
            (doppelt0 ^ a0)
            ^ a1
            ^ a2
            ^ doppelt3
        ) & 0xff
    ];
}


function aesMixColumns(state) {

    const ergebnis =
        new Array(16);


    for (
        let spalte = 0;
        spalte < 4;
        spalte++
    ) {

        const start =
            spalte * 4;


        const gemischt =
            aesMixSingleColumn(
                state[start],
                state[start + 1],
                state[start + 2],
                state[start + 3]
            );


        for (let i = 0; i < 4; i++) {

            ergebnis[start + i] =
                gemischt[i];
        }
    }


    return ergebnis;
}


// ========================================
// KEY EXPANSION
// ========================================

function aesRotWord(word) {

    return [
        word[1],
        word[2],
        word[3],
        word[0]
    ];
}


function aesSubWord(word) {

    return word.map(
        function(byte) {

            return aesSBox[byte];
        }
    );
}


function aesKeyExpansion(key) {

    /*
        AES-128 benötigt 44 Wörter
        mit jeweils vier Bytes.

        4 Wörter pro Rundenschlüssel.
        Insgesamt 11 Rundenschlüssel.
    */

    const woerter = [];


    for (let i = 0; i < 4; i++) {

        woerter[i] = [
            key[i * 4],
            key[i * 4 + 1],
            key[i * 4 + 2],
            key[i * 4 + 3]
        ];
    }


    for (let i = 4; i < 44; i++) {

        let temp =
            [...woerter[i - 1]];


        if (i % 4 === 0) {

            temp =
                aesRotWord(temp);

            temp =
                aesSubWord(temp);

            temp[0] ^=
                aesRcon[i / 4];
        }


        woerter[i] = [];


        for (let byte = 0; byte < 4; byte++) {

            woerter[i][byte] =
                woerter[i - 4][byte]
                ^ temp[byte];
        }
    }


    const roundKeys = [];


    for (let runde = 0; runde <= 10; runde++) {

        const roundKey = [];


        for (let wort = 0; wort < 4; wort++) {

            roundKey.push(
                ...woerter[
                    runde * 4 + wort
                ]
            );
        }


        roundKeys.push(
            roundKey
        );
    }


    return roundKeys;
}


// ========================================
// SCHRITT SPEICHERN
// ========================================

function aesSchrittSpeichern(
    runde,
    operation,
    titel,
    beschreibung,
    state,
    roundKey,
    klasse
) {

    aesSchritte.push({

        runde: runde,

        operation: operation,

        titel: titel,

        beschreibung:
            beschreibung,

        state:
            aesArrayKopieren(state),

        roundKey:
            aesArrayKopieren(roundKey),

        klasse: klasse
    });
}


// ========================================
// KOMPLETTE AES-SCHRITTE BERECHNEN
// ========================================

function aesSchritteBerechnen(
    textBytes,
    keyBytes
) {

    aesSchritte = [];


    const roundKeys =
        aesKeyExpansion(keyBytes);


    let state =
        aesArrayKopieren(
            textBytes
        );


    aesSchrittSpeichern(
        0,
        "Eingabe",
        "Klartext laden",
        "Die 16 Klartext-Bytes werden spaltenweise in die 4 × 4-State-Matrix geschrieben.",
        state,
        roundKeys[0],
        "aktiv"
    );


    // Initialer AddRoundKey

    state =
        aesAddRoundKey(
            state,
            roundKeys[0]
        );


    aesSchrittSpeichern(
        0,
        "AddRoundKey",
        "Initial AddRoundKey",
        "Jedes Byte des State wird per XOR mit dem ersten Rundenschlüssel kombiniert.",
        state,
        roundKeys[0],
        "xor"
    );


    // Runden 1 bis 9

    for (
        let runde = 1;
        runde <= 9;
        runde++
    ) {

        state =
            aesSubBytes(state);


        aesSchrittSpeichern(
            runde,
            "SubBytes",
            `Runde ${runde}: SubBytes`,
            "Jedes Byte wird mithilfe der AES-S-Box durch ein anderes Byte ersetzt.",
            state,
            roundKeys[runde],
            "aktiv"
        );


        state =
            aesShiftRows(state);


        aesSchrittSpeichern(
            runde,
            "ShiftRows",
            `Runde ${runde}: ShiftRows`,
            "Die zweite, dritte und vierte Zeile werden um 1, 2 beziehungsweise 3 Positionen nach links verschoben.",
            state,
            roundKeys[runde],
            "verschieben"
        );


        state =
            aesMixColumns(state);


        aesSchrittSpeichern(
            runde,
            "MixColumns",
            `Runde ${runde}: MixColumns`,
            "Die vier Bytes jeder Spalte werden im endlichen Körper miteinander vermischt.",
            state,
            roundKeys[runde],
            "mischen"
        );


        state =
            aesAddRoundKey(
                state,
                roundKeys[runde]
            );


        aesSchrittSpeichern(
            runde,
            "AddRoundKey",
            `Runde ${runde}: AddRoundKey`,
            "Der State wird per XOR mit dem Rundenschlüssel dieser Runde kombiniert.",
            state,
            roundKeys[runde],
            "xor"
        );
    }


    // Runde 10 ohne MixColumns

    state =
        aesSubBytes(state);


    aesSchrittSpeichern(
        10,
        "SubBytes",
        "Runde 10: SubBytes",
        "Auch in der letzten Runde ersetzt die S-Box jedes Byte.",
        state,
        roundKeys[10],
        "aktiv"
    );


    state =
        aesShiftRows(state);


    aesSchrittSpeichern(
        10,
        "ShiftRows",
        "Runde 10: ShiftRows",
        "Die Zeilen werden ein letztes Mal verschoben.",
        state,
        roundKeys[10],
        "verschieben"
    );


    state =
        aesAddRoundKey(
            state,
            roundKeys[10]
        );


    aesSchrittSpeichern(
        10,
        "AddRoundKey",
        "Runde 10: Final AddRoundKey",
        "Die letzte Runde besitzt kein MixColumns. Der abschließende Rundenschlüssel erzeugt den Ciphertext.",
        state,
        roundKeys[10],
        "xor"
    );


    return state;
}


// ========================================
// EINEN SCHRITT ANZEIGEN
// ========================================

async function aesSchrittAnzeigen(index) {

    if (
        index < 0 ||
        index >= aesSchritte.length
    ) {

        return;
    }


    const schritt =
        aesSchritte[index];


    aesMarkierungenEntfernen();


    aesRundeAnzeige.textContent =
        schritt.runde;

    aesOperationAnzeige.textContent =
        schritt.operation;

    aesSchrittTitel.textContent =
        schritt.titel;

    aesSchrittText.textContent =
        schritt.beschreibung;


    aesStateAnzeigen(
        schritt.state
    );

    aesKeyAnzeigen(
        schritt.roundKey
    );


    aesKlasseAufState(
        schritt.klasse
    );


    if (
        schritt.operation
        === "AddRoundKey"
    ) {

        aesKlasseAufKey(
            "xor"
        );
    }


    await warten(350);


    aesMarkierungenEntfernen();


    aesKlasseAufState(
        "fertig"
    );


    await warten(150);


    aesMarkierungenEntfernen();


    // Letzter Schritt

    if (
        index ===
        aesSchritte.length - 1
    ) {

        const hex =
            schritt.state
                .map(aesByteHex)
                .join(" ");


        aesAusgabe.textContent =
            "Ciphertext HEX: "
            + hex;


        aesNaechsterSchritt.disabled =
            true;

        aesAutomatisch.disabled =
            true;
    }
}


// ========================================
// EINGABEN PRÜFEN
// ========================================

function aesEingabenPruefen() {

    const text =
        aesText.value;

    const key =
        aesKey.value;


    if (text.length !== 16) {

        aesAusgabe.textContent =
            "Der Klartext muss genau 16 ASCII-Zeichen enthalten.";

        return null;
    }


    if (key.length !== 16) {

        aesAusgabe.textContent =
            "Der Schlüssel muss genau 16 ASCII-Zeichen enthalten.";

        return null;
    }


    for (const zeichen of text + key) {

        if (
            zeichen.charCodeAt(0)
            > 255
        ) {

            aesAusgabe.textContent =
                "Bitte für diesen Visualizer nur ASCII-Zeichen verwenden.";

            return null;
        }
    }


    return {
        textBytes:
            aesAsciiInBytes(text),

        keyBytes:
            aesAsciiInBytes(key)
    };
}


// ========================================
// AES VORBEREITEN
// ========================================

aesVorbereiten.addEventListener(
    "click",
    async function() {

        if (aesLaeuft) {
            return;
        }


        const eingaben =
            aesEingabenPruefen();


        if (eingaben === null) {
            return;
        }


        const ciphertext =
            aesSchritteBerechnen(
                eingaben.textBytes,
                eingaben.keyBytes
            );


        aesAktuellerSchritt = 0;


        aesNaechsterSchritt.disabled =
            false;

        aesAutomatisch.disabled =
            false;


        aesAusgabe.textContent =
            "AES wurde vorbereitet. Starte die einzelnen Schritte.";


        await aesSchrittAnzeigen(
            aesAktuellerSchritt
        );


        const hex =
            ciphertext
                .map(aesByteHex)
                .join(" ");


        console.log(
            "AES-128 Ciphertext:",
            hex
        );
    }
);


// ========================================
// NÄCHSTER SCHRITT
// ========================================

aesNaechsterSchritt.addEventListener(
    "click",
    async function() {

        if (
            aesLaeuft ||
            aesSchritte.length === 0
        ) {

            return;
        }


        if (
            aesAktuellerSchritt >=
            aesSchritte.length - 1
        ) {

            return;
        }


        aesLaeuft = true;


        aesVorbereiten.disabled = true;
        aesNaechsterSchritt.disabled = true;
        aesAutomatisch.disabled = true;


        try {

            aesAktuellerSchritt++;


            await aesSchrittAnzeigen(
                aesAktuellerSchritt
            );

        } finally {

            aesLaeuft = false;

            aesVorbereiten.disabled = false;


            if (
                aesAktuellerSchritt <
                aesSchritte.length - 1
            ) {

                aesNaechsterSchritt.disabled =
                    false;

                aesAutomatisch.disabled =
                    false;
            }
        }
    }
);


// ========================================
// AUTOMATISCH ABSPIELEN
// ========================================

aesAutomatisch.addEventListener(
    "click",
    async function() {

        if (
            aesLaeuft ||
            aesSchritte.length === 0
        ) {

            return;
        }


        aesLaeuft = true;


        aesVorbereiten.disabled = true;
        aesNaechsterSchritt.disabled = true;
        aesAutomatisch.disabled = true;


        try {

            while (
                aesAktuellerSchritt <
                aesSchritte.length - 1
            ) {

                aesAktuellerSchritt++;


                await aesSchrittAnzeigen(
                    aesAktuellerSchritt
                );


                await warten(300);
            }

        } finally {

            aesLaeuft = false;

            aesVorbereiten.disabled = false;
        }
    }
);


// ========================================
// RESET
// ========================================

aesReset.addEventListener(
    "click",
    function() {

        if (aesLaeuft) {
            return;
        }


        aesSchritte = [];
        aesAktuellerSchritt = -1;


        aesMatrizenErzeugen();


        aesByteZeile.innerHTML = "";

        aesRundeAnzeige.textContent = "-";

        aesOperationAnzeige.textContent =
            "Noch nicht gestartet";

        aesSchrittTitel.textContent =
            "AES-128 vorbereiten";

        aesSchrittText.textContent =
            "Gib einen 16 Zeichen langen Klartext und Schlüssel ein.";

        aesAusgabe.textContent =
            "Verschlüsseltes Ergebnis erscheint hier.";


        aesNaechsterSchritt.disabled =
            true;

        aesAutomatisch.disabled =
            true;
    }
);


// ========================================
// BEIM LADEN INITIALISIEREN
// ========================================

aesMatrizenErzeugen();

aesNaechsterSchritt.disabled = true;
aesAutomatisch.disabled = true;

// ========================================
// AES-128 ENTSCHLÜSSELER
// ========================================

const aesDecryptCiphertext =
    document.getElementById(
        "aes-decrypt-ciphertext"
    );

const aesDecryptKey =
    document.getElementById(
        "aes-decrypt-key"
    );

const aesDecryptVorbereiten =
    document.getElementById(
        "aes-decrypt-vorbereiten"
    );

const aesDecryptNaechsterSchritt =
    document.getElementById(
        "aes-decrypt-naechster-schritt"
    );

const aesDecryptAuto =
    document.getElementById(
        "aes-decrypt-auto"
    );

const aesDecryptReset =
    document.getElementById(
        "aes-decrypt-reset"
    );

const aesDecryptStateMatrix =
    document.getElementById(
        "aes-decrypt-state-matrix"
    );

const aesDecryptKeyMatrix =
    document.getElementById(
        "aes-decrypt-key-matrix"
    );

const aesDecryptByteZeile =
    document.getElementById(
        "aes-decrypt-byte-zeile"
    );

const aesDecryptRunde =
    document.getElementById(
        "aes-decrypt-runde"
    );

const aesDecryptOperation =
    document.getElementById(
        "aes-decrypt-operation"
    );

const aesDecryptSchrittTitel =
    document.getElementById(
        "aes-decrypt-schritt-titel"
    );

const aesDecryptSchrittText =
    document.getElementById(
        "aes-decrypt-schritt-text"
    );

const aesDecryptAusgabe =
    document.getElementById(
        "aes-decrypt-ausgabe"
    );


let aesDecryptSchritte = [];
let aesDecryptAktuellerSchritt = -1;
let aesDecryptLaeuft = false;

let aesDecryptStateElemente = [];
let aesDecryptKeyElemente = [];


// ========================================
// INVERSE S-BOX ERZEUGEN
//
// Die normale aesSBox stammt aus dem
// AES-Verschlüsseler.
// ========================================

const aesInvSBox =
    new Array(256);


for (
    let index = 0;
    index < aesSBox.length;
    index++
) {

    aesInvSBox[
        aesSBox[index]
    ] = index;
}


// ========================================
// MATRIZEN ERZEUGEN
// ========================================

function aesDecryptMatrizenErzeugen() {

    aesDecryptStateMatrix.innerHTML = "";
    aesDecryptKeyMatrix.innerHTML = "";

    aesDecryptStateElemente = [];
    aesDecryptKeyElemente = [];


    for (let zeile = 0; zeile < 4; zeile++) {

        for (
            let spalte = 0;
            spalte < 4;
            spalte++
        ) {

            const index =
                aesStateIndex(
                    zeile,
                    spalte
                );


            const stateFeld =
                document.createElement("div");


            stateFeld.classList.add(
                "aes-decrypt-byte"
            );


            stateFeld.textContent = "00";

            stateFeld.dataset.index =
                index;


            aesDecryptStateMatrix
                .appendChild(
                    stateFeld
                );


            aesDecryptStateElemente[index] =
                stateFeld;


            const keyFeld =
                document.createElement("div");


            keyFeld.classList.add(
                "aes-decrypt-byte"
            );


            keyFeld.textContent = "00";

            keyFeld.dataset.index =
                index;


            aesDecryptKeyMatrix
                .appendChild(
                    keyFeld
                );


            aesDecryptKeyElemente[index] =
                keyFeld;
        }
    }
}


// ========================================
// HEX-CIPHERTEXT EINLESEN
// ========================================

function aesDecryptHexEinlesen(text) {

    const bereinigt =
        text.replace(
            /[^0-9a-fA-F]/g,
            ""
        );


    if (bereinigt.length !== 32) {

        return null;
    }


    const bytes = [];


    for (
        let index = 0;
        index < 32;
        index += 2
    ) {

        bytes.push(
            parseInt(
                bereinigt.slice(
                    index,
                    index + 2
                ),
                16
            )
        );
    }


    return bytes;
}


// ========================================
// MATRIZEN ANZEIGEN
// ========================================

function aesDecryptStateAnzeigen(state) {

    for (
        let index = 0;
        index < 16;
        index++
    ) {

        aesDecryptStateElemente[
            index
        ].textContent =
            aesByteHex(
                state[index]
            );
    }


    aesDecryptByteZeile.innerHTML = "";


    for (const byte of state) {

        const element =
            document.createElement("span");


        element.classList.add(
            "aes-decrypt-byte-inline"
        );


        element.textContent =
            aesByteHex(byte);


        aesDecryptByteZeile.appendChild(
            element
        );
    }
}


function aesDecryptKeyAnzeigen(key) {

    for (
        let index = 0;
        index < 16;
        index++
    ) {

        aesDecryptKeyElemente[
            index
        ].textContent =
            aesByteHex(
                key[index]
            );
    }
}


// ========================================
// MARKIERUNGEN
// ========================================

function aesDecryptMarkierungenEntfernen() {

    const alleElemente = [
        ...aesDecryptStateElemente,
        ...aesDecryptKeyElemente
    ];


    for (const element of alleElemente) {

        element.classList.remove(
            "inv-sub",
            "inv-shift",
            "inv-mix",
            "xor",
            "fertig"
        );
    }
}


function aesDecryptKlasseAufState(
    klasse
) {

    for (
        const element
        of aesDecryptStateElemente
    ) {

        element.classList.add(
            klasse
        );
    }
}


function aesDecryptKlasseAufKey(
    klasse
) {

    for (
        const element
        of aesDecryptKeyElemente
    ) {

        element.classList.add(
            klasse
        );
    }
}


// ========================================
// INV SUB BYTES
// ========================================

function aesInvSubBytes(state) {

    return state.map(
        function(byte) {

            return aesInvSBox[byte];
        }
    );
}


// ========================================
// INV SHIFT ROWS
// ========================================

function aesInvShiftRows(state) {

    const ergebnis =
        new Array(16);


    for (let zeile = 0; zeile < 4; zeile++) {

        for (
            let spalte = 0;
            spalte < 4;
            spalte++
        ) {

            const quelleSpalte =
                (
                    spalte
                    - zeile
                    + 4
                )
                % 4;


            ergebnis[
                aesStateIndex(
                    zeile,
                    spalte
                )
            ] =
                state[
                    aesStateIndex(
                        zeile,
                        quelleSpalte
                    )
                ];
        }
    }


    return ergebnis;
}


// ========================================
// MULTIPLIKATION IM AES-KÖRPER
// ========================================

function aesDecryptGfMultiplizieren(
    a,
    b
) {

    let ergebnis = 0;

    let wertA = a;
    let wertB = b;


    for (
        let bit = 0;
        bit < 8;
        bit++
    ) {

        if (wertB & 1) {

            ergebnis ^= wertA;
        }


        const hoechstesBit =
            wertA & 0x80;


        wertA =
            (wertA << 1)
            & 0xff;


        if (hoechstesBit) {

            wertA ^= 0x1b;
        }


        wertB >>= 1;
    }


    return ergebnis & 0xff;
}


// ========================================
// INV MIX SINGLE COLUMN
// ========================================

function aesInvMixSingleColumn(
    a0,
    a1,
    a2,
    a3
) {

    return [

        (
            aesDecryptGfMultiplizieren(
                a0,
                14
            )
            ^ aesDecryptGfMultiplizieren(
                a1,
                11
            )
            ^ aesDecryptGfMultiplizieren(
                a2,
                13
            )
            ^ aesDecryptGfMultiplizieren(
                a3,
                9
            )
        ) & 0xff,


        (
            aesDecryptGfMultiplizieren(
                a0,
                9
            )
            ^ aesDecryptGfMultiplizieren(
                a1,
                14
            )
            ^ aesDecryptGfMultiplizieren(
                a2,
                11
            )
            ^ aesDecryptGfMultiplizieren(
                a3,
                13
            )
        ) & 0xff,


        (
            aesDecryptGfMultiplizieren(
                a0,
                13
            )
            ^ aesDecryptGfMultiplizieren(
                a1,
                9
            )
            ^ aesDecryptGfMultiplizieren(
                a2,
                14
            )
            ^ aesDecryptGfMultiplizieren(
                a3,
                11
            )
        ) & 0xff,


        (
            aesDecryptGfMultiplizieren(
                a0,
                11
            )
            ^ aesDecryptGfMultiplizieren(
                a1,
                13
            )
            ^ aesDecryptGfMultiplizieren(
                a2,
                9
            )
            ^ aesDecryptGfMultiplizieren(
                a3,
                14
            )
        ) & 0xff
    ];
}


// ========================================
// INV MIX COLUMNS
// ========================================

function aesInvMixColumns(state) {

    const ergebnis =
        new Array(16);


    for (
        let spalte = 0;
        spalte < 4;
        spalte++
    ) {

        const start =
            spalte * 4;


        const gemischt =
            aesInvMixSingleColumn(
                state[start],
                state[start + 1],
                state[start + 2],
                state[start + 3]
            );


        for (let index = 0; index < 4; index++) {

            ergebnis[start + index] =
                gemischt[index];
        }
    }


    return ergebnis;
}


// ========================================
// SCHRITT SPEICHERN
// ========================================

function aesDecryptSchrittSpeichern(
    runde,
    operation,
    titel,
    beschreibung,
    state,
    roundKey,
    klasse
) {

    aesDecryptSchritte.push({

        runde: runde,

        operation: operation,

        titel: titel,

        beschreibung:
            beschreibung,

        state:
            [...state],

        roundKey:
            [...roundKey],

        klasse: klasse
    });
}


// ========================================
// ENTSCHLÜSSELUNGSSCHRITTE BERECHNEN
// ========================================

function aesDecryptSchritteBerechnen(
    ciphertext,
    keyBytes
) {

    aesDecryptSchritte = [];


    const roundKeys =
        aesKeyExpansion(
            keyBytes
        );


    let state =
        [...ciphertext];


    aesDecryptSchrittSpeichern(
        10,
        "Ciphertext",
        "Ciphertext laden",
        "Die 16 Ciphertext-Bytes werden als AES-State geladen.",
        state,
        roundKeys[10],
        "fertig"
    );


    // ====================================
    // INITIAL: ADD ROUND KEY 10
    // ====================================

    state =
        aesAddRoundKey(
            state,
            roundKeys[10]
        );


    aesDecryptSchrittSpeichern(
        10,
        "AddRoundKey",
        "Runde 10: AddRoundKey",
        "Der Ciphertext wird per XOR mit dem letzten Rundenschlüssel kombiniert.",
        state,
        roundKeys[10],
        "xor"
    );


    // ====================================
    // RUNDEN 9 BIS 1
    // ====================================

    for (
        let runde = 9;
        runde >= 1;
        runde--
    ) {

        state =
            aesInvShiftRows(state);


        aesDecryptSchrittSpeichern(
            runde,
            "InvShiftRows",
            `Runde ${runde}: InvShiftRows`,
            "Die Zeilen werden in die entgegengesetzte Richtung zurückverschoben.",
            state,
            roundKeys[runde],
            "inv-shift"
        );


        state =
            aesInvSubBytes(state);


        aesDecryptSchrittSpeichern(
            runde,
            "InvSubBytes",
            `Runde ${runde}: InvSubBytes`,
            "Jedes Byte wird mithilfe der inversen AES-S-Box zurückübersetzt.",
            state,
            roundKeys[runde],
            "inv-sub"
        );


        state =
            aesAddRoundKey(
                state,
                roundKeys[runde]
            );


        aesDecryptSchrittSpeichern(
            runde,
            "AddRoundKey",
            `Runde ${runde}: AddRoundKey`,
            "Der State wird per XOR mit dem Rundenschlüssel dieser Runde kombiniert.",
            state,
            roundKeys[runde],
            "xor"
        );


        state =
            aesInvMixColumns(state);


        aesDecryptSchrittSpeichern(
            runde,
            "InvMixColumns",
            `Runde ${runde}: InvMixColumns`,
            "Die Spaltenmischung der Verschlüsselung wird rückgängig gemacht.",
            state,
            roundKeys[runde],
            "inv-mix"
        );
    }


    // ====================================
    // ABSCHLIESSENDE RUNDE 0
    // ====================================

    state =
        aesInvShiftRows(state);


    aesDecryptSchrittSpeichern(
        0,
        "InvShiftRows",
        "Runde 0: InvShiftRows",
        "Die Zeilen werden ein letztes Mal zurückverschoben.",
        state,
        roundKeys[0],
        "inv-shift"
    );


    state =
        aesInvSubBytes(state);


    aesDecryptSchrittSpeichern(
        0,
        "InvSubBytes",
        "Runde 0: InvSubBytes",
        "Die inverse S-Box stellt die ursprünglichen Bytewerte wieder her.",
        state,
        roundKeys[0],
        "inv-sub"
    );


    state =
        aesAddRoundKey(
            state,
            roundKeys[0]
        );


    aesDecryptSchrittSpeichern(
        0,
        "AddRoundKey",
        "Final AddRoundKey",
        "Der erste Rundenschlüssel stellt den ursprünglichen Klartextblock wieder her.",
        state,
        roundKeys[0],
        "xor"
    );


    return state;
}


// ========================================
// BYTES IN TEXT UMWANDELN
// ========================================

function aesDecryptBytesInText(
    bytes
) {

    let text = "";


    for (const byte of bytes) {

        text +=
            String.fromCharCode(
                byte
            );
    }


    return text;
}


// ========================================
// EINEN SCHRITT ANZEIGEN
// ========================================

async function aesDecryptSchrittAnzeigen(
    index
) {

    if (
        index < 0 ||
        index >= aesDecryptSchritte.length
    ) {

        return;
    }


    const schritt =
        aesDecryptSchritte[index];


    aesDecryptMarkierungenEntfernen();


    aesDecryptRunde.textContent =
        schritt.runde;

    aesDecryptOperation.textContent =
        schritt.operation;

    aesDecryptSchrittTitel.textContent =
        schritt.titel;

    aesDecryptSchrittText.textContent =
        schritt.beschreibung;


    aesDecryptStateAnzeigen(
        schritt.state
    );

    aesDecryptKeyAnzeigen(
        schritt.roundKey
    );


    aesDecryptKlasseAufState(
        schritt.klasse
    );


    if (
        schritt.operation
        === "AddRoundKey"
    ) {

        aesDecryptKlasseAufKey(
            "xor"
        );
    }


    await warten(350);


    aesDecryptMarkierungenEntfernen();


    aesDecryptKlasseAufState(
        "fertig"
    );


    await warten(150);


    aesDecryptMarkierungenEntfernen();


    // Letzter Schritt

    if (
        index ===
        aesDecryptSchritte.length - 1
    ) {

        const klartext =
            aesDecryptBytesInText(
                schritt.state
            );


        aesDecryptAusgabe.textContent =
            "Klartext: "
            + klartext;


        aesDecryptNaechsterSchritt.disabled =
            true;

        aesDecryptAuto.disabled =
            true;
    }
}


// ========================================
// EINGABEN PRÜFEN
// ========================================

function aesDecryptEingabenPruefen() {

    const ciphertext =
        aesDecryptHexEinlesen(
            aesDecryptCiphertext.value
        );


    if (ciphertext === null) {

        aesDecryptAusgabe.textContent =
            "Bitte genau 16 Hex-Bytes beziehungsweise 32 Hex-Zeichen eingeben.";

        return null;
    }


    const key =
        aesDecryptKey.value;


    if (key.length !== 16) {

        aesDecryptAusgabe.textContent =
            "Der Schlüssel muss genau 16 ASCII-Zeichen enthalten.";

        return null;
    }


    for (const zeichen of key) {

        if (
            zeichen.charCodeAt(0)
            > 255
        ) {

            aesDecryptAusgabe.textContent =
                "Bitte für diesen Visualizer nur ASCII-Zeichen verwenden.";

            return null;
        }
    }


    return {
        ciphertext: ciphertext,

        keyBytes:
            aesAsciiInBytes(key)
    };
}


// ========================================
// ENTSCHLÜSSELUNG VORBEREITEN
// ========================================

aesDecryptVorbereiten.addEventListener(
    "click",
    async function() {

        if (aesDecryptLaeuft) {
            return;
        }


        const eingaben =
            aesDecryptEingabenPruefen();


        if (eingaben === null) {
            return;
        }


        const klartextBytes =
            aesDecryptSchritteBerechnen(
                eingaben.ciphertext,
                eingaben.keyBytes
            );


        aesDecryptAktuellerSchritt = 0;


        aesDecryptNaechsterSchritt.disabled =
            false;

        aesDecryptAuto.disabled =
            false;


        aesDecryptAusgabe.textContent =
            "Entschlüsselung vorbereitet. Starte die einzelnen Schritte.";


        await aesDecryptSchrittAnzeigen(
            aesDecryptAktuellerSchritt
        );


        console.log(
            "AES entschlüsselter Text:",
            aesDecryptBytesInText(
                klartextBytes
            )
        );
    }
);


// ========================================
// NÄCHSTER SCHRITT
// ========================================

aesDecryptNaechsterSchritt
    .addEventListener(
        "click",
        async function() {

            if (
                aesDecryptLaeuft ||
                aesDecryptSchritte.length
                === 0
            ) {

                return;
            }


            if (
                aesDecryptAktuellerSchritt
                >=
                aesDecryptSchritte.length
                - 1
            ) {

                return;
            }


            aesDecryptLaeuft = true;


            aesDecryptVorbereiten.disabled =
                true;

            aesDecryptNaechsterSchritt.disabled =
                true;

            aesDecryptAuto.disabled =
                true;


            try {

                aesDecryptAktuellerSchritt++;


                await aesDecryptSchrittAnzeigen(
                    aesDecryptAktuellerSchritt
                );

            } finally {

                aesDecryptLaeuft = false;

                aesDecryptVorbereiten.disabled =
                    false;


                if (
                    aesDecryptAktuellerSchritt
                    <
                    aesDecryptSchritte.length
                    - 1
                ) {

                    aesDecryptNaechsterSchritt.disabled =
                        false;

                    aesDecryptAuto.disabled =
                        false;
                }
            }
        }
    );


// ========================================
// AUTOMATISCH ABSPIELEN
// ========================================

aesDecryptAuto.addEventListener(
    "click",
    async function() {

        if (
            aesDecryptLaeuft ||
            aesDecryptSchritte.length === 0
        ) {

            return;
        }


        aesDecryptLaeuft = true;


        aesDecryptVorbereiten.disabled =
            true;

        aesDecryptNaechsterSchritt.disabled =
            true;

        aesDecryptAuto.disabled =
            true;


        try {

            while (
                aesDecryptAktuellerSchritt
                <
                aesDecryptSchritte.length
                - 1
            ) {

                aesDecryptAktuellerSchritt++;


                await aesDecryptSchrittAnzeigen(
                    aesDecryptAktuellerSchritt
                );


                await warten(300);
            }

        } finally {

            aesDecryptLaeuft = false;

            aesDecryptVorbereiten.disabled =
                false;
        }
    }
);


// ========================================
// RESET
// ========================================

aesDecryptReset.addEventListener(
    "click",
    function() {

        if (aesDecryptLaeuft) {
            return;
        }


        aesDecryptSchritte = [];
        aesDecryptAktuellerSchritt = -1;


        aesDecryptCiphertext.value = "";


        aesDecryptMatrizenErzeugen();


        aesDecryptByteZeile.innerHTML = "";


        aesDecryptRunde.textContent = "-";


        aesDecryptOperation.textContent =
            "Noch nicht gestartet";


        aesDecryptSchrittTitel.textContent =
            "AES-128-Entschlüsselung vorbereiten";


        aesDecryptSchrittText.textContent =
            "Füge einen AES-Ciphertext mit 16 Hex-Bytes ein und verwende denselben Schlüssel wie beim Verschlüsseln.";


        aesDecryptAusgabe.textContent =
            "Der entschlüsselte Klartext erscheint hier.";


        aesDecryptNaechsterSchritt.disabled =
            true;
 
        aesDecryptAuto.disabled =
            true;
    }
);


// ========================================
// BEIM LADEN INITIALISIEREN
// ========================================

aesDecryptMatrizenErzeugen();

aesDecryptNaechsterSchritt.disabled = true;
aesDecryptAuto.disabled = true;

// ========================================
// RABIN-KARP TEXTSUCHE
// ========================================

const rabinText =
    document.getElementById("rabin-text");

const rabinMuster =
    document.getElementById("rabin-muster");

const rabinStart =
    document.getElementById("rabin-start");

const rabinNaechsterSchritt =
    document.getElementById(
        "rabin-naechster-schritt"
    );

const rabinAuto =
    document.getElementById("rabin-auto");

const rabinReset =
    document.getElementById("rabin-reset");

const rabinTextZeile =
    document.getElementById("rabin-text-zeile");

const rabinMusterZeile =
    document.getElementById("rabin-muster-zeile");

const rabinPosition =
    document.getElementById("rabin-position");

const rabinMusterHash =
    document.getElementById("rabin-muster-hash");

const rabinFensterHash =
    document.getElementById("rabin-fenster-hash");

const rabinHashFormel =
    document.getElementById("rabin-hash-formel");

const rabinInfo =
    document.getElementById("rabin-info");

const rabinAusgabe =
    document.getElementById("rabin-ausgabe");


let rabinLaeuft = false;
let rabinVorbereitet = false;

let rabinTextWert = "";
let rabinMusterWert = "";

let rabinTextElemente = [];
let rabinMusterElemente = [];

let rabinAktuellePosition = 0;
let rabinAktuellerFensterHash = 0;
let rabinGesuchterMusterHash = 0;

let rabinTrefferPositionen = [];


// ========================================
// HASH-EINSTELLUNGEN
// ========================================

const rabinBasis = 256;

/*
    Eine Primzahl als Modulo hält die
    Hashwerte klein.

    Für Lernzwecke ist 101 übersichtlich.
*/

const rabinModulo = 101;


// ========================================
// BUTTONS SPERREN
// ========================================

function rabinButtonsSperren(gesperrt) {

    rabinStart.disabled =
        gesperrt;

    rabinReset.disabled =
        gesperrt;

    rabinText.disabled =
        gesperrt;

    rabinMuster.disabled =
        gesperrt;
}


// ========================================
// ZEICHENFELD ERSTELLEN
// ========================================

function rabinZeichenErstellen(
    zeichen,
    istMuster
) {

    const element =
        document.createElement("span");


    element.classList.add(
        "rabin-zeichen"
    );


    if (istMuster) {

        element.classList.add(
            "muster"
        );
    }


    element.textContent =
        zeichen === " "
            ? "\u00A0"
            : zeichen;


    return element;
}


// ========================================
// VISUALISIERUNG ERSTELLEN
// ========================================

function rabinVisualisierungErstellen(
    text,
    muster
) {

    rabinTextZeile.innerHTML = "";
    rabinMusterZeile.innerHTML = "";

    rabinTextElemente = [];
    rabinMusterElemente = [];


    for (const zeichen of text) {

        const element =
            rabinZeichenErstellen(
                zeichen,
                false
            );


        rabinTextZeile.appendChild(
            element
        );


        rabinTextElemente.push(
            element
        );
    }


    for (const zeichen of muster) {

        const element =
            rabinZeichenErstellen(
                zeichen,
                true
            );


        rabinMusterZeile.appendChild(
            element
        );


        rabinMusterElemente.push(
            element
        );
    }
}


// ========================================
// HASH EINES TEXTABSCHNITTS
// ========================================

function rabinHashBerechnen(
    text,
    start,
    laenge
) {

    let hash = 0;


    for (
        let index = 0;
        index < laenge;
        index++
    ) {

        const zeichenCode =
            text.charCodeAt(
                start + index
            );


        hash =
            (
                hash * rabinBasis
                + zeichenCode
            )
            % rabinModulo;
    }


    return hash;
}


// ========================================
// HÖCHSTE POTENZ FÜR ROLLING HASH
// ========================================

function rabinHoechstePotenzBerechnen(
    musterLaenge
) {

    let potenz = 1;


    for (
        let index = 0;
        index < musterLaenge - 1;
        index++
    ) {

        potenz =
            (
                potenz * rabinBasis
            )
            % rabinModulo;
    }


    return potenz;
}


// ========================================
// ROLLING HASH
// ========================================

function rabinNaechstenHashBerechnen(
    alterHash,
    altesZeichen,
    neuesZeichen,
    hoechstePotenz
) {

    let neuerHash =
        (
            alterHash
            - altesZeichen.charCodeAt(0)
            * hoechstePotenz
        )
        % rabinModulo;


    if (neuerHash < 0) {

        neuerHash +=
            rabinModulo;
    }


    neuerHash =
        (
            neuerHash * rabinBasis
            + neuesZeichen.charCodeAt(0)
        )
        % rabinModulo;


    return neuerHash;
}


// ========================================
// TEXT-MARKIERUNGEN ENTFERNEN
// ========================================

function rabinMarkierungenEntfernen() {

    for (
        const element
        of rabinTextElemente
    ) {

        element.classList.remove(
            "fenster",
            "verworfen",
            "vergleichen"
        );


        /*
            Die gefunden-Markierung bleibt
            bestehen, damit alle Treffer
            sichtbar bleiben.
        */
    }


    for (
        const element
        of rabinMusterElemente
    ) {

        element.classList.remove(
            "vergleichen"
        );
    }
}


// ========================================
// AKTUELLES FENSTER MARKIEREN
// ========================================

function rabinFensterMarkieren(
    start
) {

    rabinMarkierungenEntfernen();


    for (
        let index = 0;
        index < rabinMusterWert.length;
        index++
    ) {

        rabinTextElemente[
            start + index
        ].classList.add(
            "fenster"
        );
    }
}


// ========================================
// ECHTEN ZEICHENVERGLEICH ANIMIEREN
// ========================================

async function rabinDirektVergleichen(
    start
) {

    let stimmt =
        true;


    for (
        let index = 0;
        index < rabinMusterWert.length;
        index++
    ) {

        const textElement =
            rabinTextElemente[
                start + index
            ];


        const musterElement =
            rabinMusterElemente[
                index
            ];


        textElement.classList.add(
            "vergleichen"
        );

        musterElement.classList.add(
            "vergleichen"
        );


        await warten(180);


        if (
            rabinTextWert[
                start + index
            ]
            !==
            rabinMusterWert[
                index
            ]
        ) {

            stimmt = false;
        }


        textElement.classList.remove(
            "vergleichen"
        );

        musterElement.classList.remove(
            "vergleichen"
        );


        if (!stimmt) {

            break;
        }
    }


    return stimmt;
}


// ========================================
// TREFFER MARKIEREN
// ========================================

function rabinTrefferMarkieren(
    start
) {

    for (
        let index = 0;
        index < rabinMusterWert.length;
        index++
    ) {

        rabinTextElemente[
            start + index
        ].classList.add(
            "gefunden"
        );
    }


    rabinTrefferPositionen.push(
        start
    );


    const treffer =
        document.createElement("span");


    treffer.classList.add(
        "rabin-treffer"
    );


    treffer.textContent =
        `Treffer ab Index ${start}`;


    rabinAusgabe.appendChild(
        treffer
    );
}


// ========================================
// KEIN TREFFER MARKIEREN
// ========================================

async function rabinFensterVerwerfen(
    start
) {

    for (
        let index = 0;
        index < rabinMusterWert.length;
        index++
    ) {

        const element =
            rabinTextElemente[
                start + index
            ];


        if (
            !element.classList.contains(
                "gefunden"
            )
        ) {

            element.classList.add(
                "verworfen"
            );
        }
    }


    await warten(180);


    for (
        let index = 0;
        index < rabinMusterWert.length;
        index++
    ) {

        rabinTextElemente[
            start + index
        ].classList.remove(
            "verworfen"
        );
    }
}


// ========================================
// EINEN RABIN-KARP-SCHRITT AUSFÜHREN
// ========================================

async function rabinSchrittAusfuehren() {

    const maximalePosition =
        rabinTextWert.length
        - rabinMusterWert.length;


    if (
        rabinAktuellePosition >
        maximalePosition
    ) {

        rabinSucheAbschliessen();

        return false;
    }


    rabinFensterMarkieren(
        rabinAktuellePosition
    );


    rabinPosition.textContent =
        rabinAktuellePosition;


    rabinFensterHash.textContent =
        rabinAktuellerFensterHash;


    const aktuellesFenster =
        rabinTextWert.slice(
            rabinAktuellePosition,
            rabinAktuellePosition
            + rabinMusterWert.length
        );


    rabinInfo.textContent =
        `Fenster "${aktuellesFenster}" wird geprüft.`;


    /*
        Der Hashwert ist nur ein Filter.

        Bei gleichen Hashwerten müssen
        die Zeichen trotzdem direkt
        verglichen werden, weil verschiedene
        Texte denselben Hash besitzen können.
    */

    if (
        rabinAktuellerFensterHash
        ===
        rabinGesuchterMusterHash
    ) {

        rabinHashFormel.textContent =
            `Hash-Treffer: ${rabinAktuellerFensterHash} = ${rabinGesuchterMusterHash}. `
            + "Jetzt werden die Zeichen direkt verglichen.";


        const echterTreffer =
            await rabinDirektVergleichen(
                rabinAktuellePosition
            );


        if (echterTreffer) {

            rabinTrefferMarkieren(
                rabinAktuellePosition
            );


            rabinInfo.textContent =
                `Muster an Position ${rabinAktuellePosition} gefunden.`;

        } else {

            /*
                Gleicher Hash, aber andere Zeichen.
                Das nennt man Hash-Kollision.
            */

            rabinInfo.textContent =
                "Hash-Kollision: Hashwerte stimmen, die Zeichen aber nicht überein.";


            await rabinFensterVerwerfen(
                rabinAktuellePosition
            );
        }

    } else {

        rabinHashFormel.textContent =
            `Kein Hash-Treffer: ${rabinAktuellerFensterHash} ≠ ${rabinGesuchterMusterHash}. `
            + "Ein direkter Zeichenvergleich ist nicht notwendig.";


        await rabinFensterVerwerfen(
            rabinAktuellePosition
        );
    }


    // Nächsten Rolling Hash berechnen

    if (
        rabinAktuellePosition
        <
        maximalePosition
    ) {

        const hoechstePotenz =
            rabinHoechstePotenzBerechnen(
                rabinMusterWert.length
            );


        const altesZeichen =
            rabinTextWert[
                rabinAktuellePosition
            ];


        const neuesZeichen =
            rabinTextWert[
                rabinAktuellePosition
                + rabinMusterWert.length
            ];


        const alterHash =
            rabinAktuellerFensterHash;


        rabinAktuellerFensterHash =
            rabinNaechstenHashBerechnen(
                alterHash,
                altesZeichen,
                neuesZeichen,
                hoechstePotenz
            );


        rabinHashFormel.textContent +=
            ` Rolling Hash: "${altesZeichen}" entfernen, `
            + `"${neuesZeichen}" hinzufügen. `
            + `Neuer Hash = ${rabinAktuellerFensterHash}.`;
    }


    rabinAktuellePosition++;


    if (
        rabinAktuellePosition >
        maximalePosition
    ) {

        rabinSucheAbschliessen();

        return false;
    }


    return true;
}


// ========================================
// SUCHE ABSCHLIESSEN
// ========================================

function rabinSucheAbschliessen() {

    rabinVorbereitet = false;


    rabinNaechsterSchritt.disabled =
        true;

    rabinAuto.disabled =
        true;


    rabinMarkierungenEntfernen();


    if (
        rabinTrefferPositionen.length
        === 0
    ) {

        rabinInfo.textContent =
            "Die Suche ist abgeschlossen. Das Muster wurde nicht gefunden.";

        rabinAusgabe.textContent =
            "Keine Treffer.";

    } else {

        rabinInfo.textContent =
            `Suche abgeschlossen: ${rabinTrefferPositionen.length} Treffer gefunden.`;
    }
}


// ========================================
// EINGABEN PRÜFEN
// ========================================

function rabinEingabenPruefen() {

    const text =
        rabinText.value;

    const muster =
        rabinMuster.value;


    if (text.length === 0) {

        rabinInfo.textContent =
            "Bitte einen Text eingeben.";

        return null;
    }


    if (muster.length === 0) {

        rabinInfo.textContent =
            "Bitte ein Suchmuster eingeben.";

        return null;
    }


    if (
        muster.length >
        text.length
    ) {

        rabinInfo.textContent =
            "Das Suchmuster ist länger als der Text.";

        return null;
    }


    return {
        text: text,
        muster: muster
    };
}


// ========================================
// SUCHE VORBEREITEN
// ========================================

rabinStart.addEventListener(
    "click",
    function() {

        if (rabinLaeuft) {
            return;
        }


        const eingaben =
            rabinEingabenPruefen();


        if (eingaben === null) {
            return;
        }


        rabinTextWert =
            eingaben.text;

        rabinMusterWert =
            eingaben.muster;


        rabinVisualisierungErstellen(
            rabinTextWert,
            rabinMusterWert
        );


        rabinAktuellePosition = 0;

        rabinTrefferPositionen = [];


        rabinGesuchterMusterHash =
            rabinHashBerechnen(
                rabinMusterWert,
                0,
                rabinMusterWert.length
            );


        rabinAktuellerFensterHash =
            rabinHashBerechnen(
                rabinTextWert,
                0,
                rabinMusterWert.length
            );


        rabinMusterHash.textContent =
            rabinGesuchterMusterHash;

        rabinFensterHash.textContent =
            rabinAktuellerFensterHash;

        rabinPosition.textContent =
            0;


        rabinHashFormel.textContent =
            `Muster-Hash = ${rabinGesuchterMusterHash}. `
            + `Erster Fenster-Hash = ${rabinAktuellerFensterHash}.`;


        rabinInfo.textContent =
            "Rabin-Karp wurde vorbereitet. Starte die einzelnen Schritte.";


        rabinAusgabe.innerHTML = "";


        rabinVorbereitet = true;


        rabinFensterMarkieren(0);


        rabinNaechsterSchritt.disabled =
            false;

        rabinAuto.disabled =
            false;
    }
);


// ========================================
// NÄCHSTER SCHRITT
// ========================================

rabinNaechsterSchritt.addEventListener(
    "click",
    async function() {

        if (
            rabinLaeuft ||
            !rabinVorbereitet
        ) {

            return;
        }


        rabinLaeuft = true;


        rabinButtonsSperren(true);

        rabinNaechsterSchritt.disabled =
            true;

        rabinAuto.disabled =
            true;


        try {

            const weiter =
                await rabinSchrittAusfuehren();


            if (weiter) {

                rabinNaechsterSchritt.disabled =
                    false;

                rabinAuto.disabled =
                    false;
            }

        } finally {

            rabinLaeuft = false;

            rabinButtonsSperren(false);
        }
    }
);


// ========================================
// AUTOMATISCH ABSPIELEN
// ========================================

rabinAuto.addEventListener(
    "click",
    async function() {

        if (
            rabinLaeuft ||
            !rabinVorbereitet
        ) {

            return;
        }


        rabinLaeuft = true;


        rabinButtonsSperren(true);

        rabinNaechsterSchritt.disabled =
            true;

        rabinAuto.disabled =
            true;


        try {

            let weiter = true;


            while (
                weiter &&
                rabinVorbereitet
            ) {

                weiter =
                    await rabinSchrittAusfuehren();


                await warten(180);
            }

        } finally {

            rabinLaeuft = false;

            rabinButtonsSperren(false);
        }
    }
);


// ========================================
// RESET
// ========================================

rabinReset.addEventListener(
    "click",
    function() {

        if (rabinLaeuft) {
            return;
        }


        rabinText.value =
            "DAS IST EIN ALGORITHMUS TEST";

        rabinMuster.value =
            "ALGORITHMUS";


        rabinTextZeile.innerHTML = "";
        rabinMusterZeile.innerHTML = "";


        rabinPosition.textContent = "-";
        rabinMusterHash.textContent = "-";
        rabinFensterHash.textContent = "-";


        rabinHashFormel.textContent =
            "Der Algorithmus wurde noch nicht gestartet.";


        rabinInfo.textContent =
            "Gib einen Text und ein Suchmuster ein.";


        rabinAusgabe.textContent =
            "Suchergebnisse erscheinen hier.";


        rabinVorbereitet = false;

        rabinAktuellePosition = 0;

        rabinTrefferPositionen = [];


        rabinNaechsterSchritt.disabled =
            true;

        rabinAuto.disabled =
            true;
    }
);


// ========================================
// BEIM LADEN INITIALISIEREN
// ========================================

rabinNaechsterSchritt.disabled = true;
rabinAuto.disabled = true;

// ========================================
// EVOLUTIONAERE ALGORITHMEN
// MULTI-MODUS
// ========================================


// ========================================
// HTML-ELEMENTE
// ========================================

const geneticModus =
    document.getElementById("genetic-modus");

const geneticTextBereich =
    document.getElementById("genetic-text-bereich");

const geneticZahlBereich =
    document.getElementById("genetic-zahl-bereich");

const geneticFarbeBereich =
    document.getElementById("genetic-farbe-bereich");

const geneticPunktBereich =
    document.getElementById("genetic-punkt-bereich");


const geneticZiel =
    document.getElementById("genetic-ziel");

const geneticZielZahl =
    document.getElementById("genetic-ziel-zahl");

const geneticZielFarbe =
    document.getElementById("genetic-ziel-farbe");

const geneticZielX =
    document.getElementById("genetic-ziel-x");

const geneticZielY =
    document.getElementById("genetic-ziel-y");


const geneticFarbeVorschau =
    document.getElementById("genetic-farbe-vorschau");


const geneticPopulationInput =
    document.getElementById("genetic-population");

const geneticMutationInput =
    document.getElementById("genetic-mutation");


const geneticStart =
    document.getElementById("genetic-start");

const geneticPause =
    document.getElementById("genetic-pause");

const geneticSchritt =
    document.getElementById("genetic-schritt");

const geneticReset =
    document.getElementById("genetic-reset");


const geneticModusAnzeige =
    document.getElementById("genetic-modus-anzeige");

const geneticGenerationAnzeige =
    document.getElementById("genetic-generation");

const geneticFitnessAnzeige =
    document.getElementById("genetic-fitness");

const geneticBesterAnzeige =
    document.getElementById("genetic-bester");

const geneticZielAnzeige =
    document.getElementById("genetic-ziel-anzeige");


const geneticBesterFarbe =
    document.getElementById("genetic-bester-farbe");

const geneticZielFarbeAnzeige =
    document.getElementById("genetic-ziel-farbe-anzeige");


const geneticKoordinatenFlaeche =
    document.getElementById("genetic-koordinaten-flaeche");

const geneticZielPunkt =
    document.getElementById("genetic-ziel-punkt");

const geneticBesterPunkt =
    document.getElementById("genetic-bester-punkt");


const geneticFortschrittBalken =
    document.getElementById("genetic-fortschritt-balken");

const geneticPopulationAnzeige =
    document.getElementById("genetic-population-anzeige");

const geneticInfo =
    document.getElementById("genetic-info");


// ========================================
// ZUSTAND
// ========================================

let geneticPopulation = [];

let geneticGeneration = 0;

let geneticLaeuft = false;

let geneticPausiert = false;

let geneticInitialisiert = false;

let geneticAktuellerModus = "text";

let geneticPopulationsGroesse = 100;

let geneticMutationsRate = 0.02;


// Zielwerte

let geneticTextZiel = "ALGORITHMUS";

let geneticZahlenZiel = 750;

let geneticFarbZiel = {
    r: 30,
    g: 170,
    b: 224
};

let geneticPunktZiel = {
    x: 400,
    y: 200
};


// Logische Größe der Koordinatenfläche

const geneticFlaechenBreite = 700;

const geneticFlaechenHoehe = 450;


// Zeichen für Text Evolution

const geneticZeichen =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    + "abcdefghijklmnopqrstuvwxyz"
    + "0123456789"
    + " .,!?-_:/;";


// ========================================
// ALLGEMEINE HILFSFUNKTIONEN
// ========================================

function geneticZahlBegrenzen(
    wert,
    minimum,
    maximum
) {

    return Math.max(
        minimum,
        Math.min(
            maximum,
            wert
        )
    );
}


function geneticZufallsGanzzahl(
    minimum,
    maximum
) {

    return Math.floor(
        Math.random()
        * (maximum - minimum + 1)
    )
    + minimum;
}


function geneticZufallsZeichen() {

    const index =
        geneticZufallsGanzzahl(
            0,
            geneticZeichen.length - 1
        );

    return geneticZeichen[index];
}


function geneticHexZuRgb(hex) {

    const bereinigt =
        hex.replace("#", "");

    return {
        r: parseInt(
            bereinigt.slice(0, 2),
            16
        ),

        g: parseInt(
            bereinigt.slice(2, 4),
            16
        ),

        b: parseInt(
            bereinigt.slice(4, 6),
            16
        )
    };
}


function geneticRgbZuCss(farbe) {

    return (
        "rgb("
        + Math.round(farbe.r)
        + ", "
        + Math.round(farbe.g)
        + ", "
        + Math.round(farbe.b)
        + ")"
    );
}


function geneticModusName() {

    switch (geneticAktuellerModus) {

        case "text":
            return "Text Evolution";

        case "zahl":
            return "Zahlen Evolution";

        case "farbe":
            return "Farb Evolution";

        case "punkt":
            return "Koordinaten Evolution";

        default:
            return "Evolution";
    }
}


// ========================================
// MODUS-OBERFLAECHE ANZEIGEN
// ========================================

function geneticModusAnzeigen() {

    geneticTextBereich.classList.add(
        "versteckt"
    );

    geneticZahlBereich.classList.add(
        "versteckt"
    );

    geneticFarbeBereich.classList.add(
        "versteckt"
    );

    geneticPunktBereich.classList.add(
        "versteckt"
    );


    geneticBesterFarbe.classList.add(
        "versteckt"
    );

    geneticZielFarbeAnzeige.classList.add(
        "versteckt"
    );

    geneticKoordinatenFlaeche.classList.add(
        "versteckt"
    );


    geneticBesterAnzeige.classList.remove(
        "versteckt"
    );

    geneticZielAnzeige.classList.remove(
        "versteckt"
    );


    if (geneticAktuellerModus === "text") {

        geneticTextBereich.classList.remove(
            "versteckt"
        );
    }


    if (geneticAktuellerModus === "zahl") {

        geneticZahlBereich.classList.remove(
            "versteckt"
        );
    }


    if (geneticAktuellerModus === "farbe") {

        geneticFarbeBereich.classList.remove(
            "versteckt"
        );

        geneticBesterFarbe.classList.remove(
            "versteckt"
        );

        geneticZielFarbeAnzeige.classList.remove(
            "versteckt"
        );
    }


    if (geneticAktuellerModus === "punkt") {

        geneticPunktBereich.classList.remove(
            "versteckt"
        );

        geneticKoordinatenFlaeche.classList.remove(
            "versteckt"
        );
    }


    geneticModusAnzeige.textContent =
        geneticModusName();


    geneticZielAnzeigeAktualisieren();
}


// ========================================
// ZIELANZEIGE
// ========================================

function geneticZielAnzeigeAktualisieren() {

    if (geneticAktuellerModus === "text") {

        geneticZielAnzeige.textContent =
            geneticZiel.value || "-";
    }


    if (geneticAktuellerModus === "zahl") {

        geneticZielAnzeige.textContent =
            geneticZielZahl.value;
    }


    if (geneticAktuellerModus === "farbe") {

        const farbe =
            geneticZielFarbe.value;

        geneticZielAnzeige.textContent =
            farbe.toUpperCase();

        geneticFarbeVorschau.style.backgroundColor =
            farbe;

        geneticZielFarbeAnzeige.style.backgroundColor =
            farbe;
    }


    if (geneticAktuellerModus === "punkt") {

        const x =
            Number(geneticZielX.value);

        const y =
            Number(geneticZielY.value);

        geneticZielAnzeige.textContent =
            `(${x}, ${y})`;

        geneticPunktPositionAnzeigen(
            geneticZielPunkt,
            x,
            y
        );
    }
}


// ========================================
// PUNKT RESPONSIV POSITIONIEREN
// ========================================

function geneticPunktPositionAnzeigen(
    element,
    x,
    y
) {

    const xProzent =
        (
            x / geneticFlaechenBreite
        )
        * 100;

    const yProzent =
        (
            y / geneticFlaechenHoehe
        )
        * 100;


    element.style.left =
        xProzent + "%";

    element.style.top =
        yProzent + "%";
}


// ========================================
// EINGABEN SPERREN
// ========================================

function geneticEingabenSperren(
    gesperrt
) {

    geneticModus.disabled =
        gesperrt;

    geneticZiel.disabled =
        gesperrt;

    geneticZielZahl.disabled =
        gesperrt;

    geneticZielFarbe.disabled =
        gesperrt;

    geneticZielX.disabled =
        gesperrt;

    geneticZielY.disabled =
        gesperrt;

    geneticPopulationInput.disabled =
        gesperrt;

    geneticMutationInput.disabled =
        gesperrt;
}


// ========================================
// ZUFÄLLIGE DNA NACH MODUS
// ========================================

function geneticZufallsDNA() {

    if (geneticAktuellerModus === "text") {

        let text = "";

        for (
            let index = 0;
            index < geneticTextZiel.length;
            index++
        ) {

            text +=
                geneticZufallsZeichen();
        }

        return text;
    }


    if (geneticAktuellerModus === "zahl") {

        return geneticZufallsGanzzahl(
            0,
            1000
        );
    }


    if (geneticAktuellerModus === "farbe") {

        return {
            r: geneticZufallsGanzzahl(
                0,
                255
            ),

            g: geneticZufallsGanzzahl(
                0,
                255
            ),

            b: geneticZufallsGanzzahl(
                0,
                255
            )
        };
    }


    if (geneticAktuellerModus === "punkt") {

        return {
            x: geneticZufallsGanzzahl(
                0,
                geneticFlaechenBreite
            ),

            y: geneticZufallsGanzzahl(
                0,
                geneticFlaechenHoehe
            )
        };
    }


    return null;
}


// ========================================
// DNA KOPIEREN
// ========================================

function geneticDNAKopieren(dna) {

    if (
        geneticAktuellerModus === "farbe"
        ||
        geneticAktuellerModus === "punkt"
    ) {

        return {
            ...dna
        };
    }

    return dna;
}


// ========================================
// FITNESS: TEXT
// ========================================

function geneticTextFitness(dna) {

    let richtigeZeichen = 0;


    for (
        let index = 0;
        index < geneticTextZiel.length;
        index++
    ) {

        if (
            dna[index]
            ===
            geneticTextZiel[index]
        ) {

            richtigeZeichen++;
        }
    }


    return (
        richtigeZeichen
        / geneticTextZiel.length
    );
}


// ========================================
// FITNESS: ZAHL
// ========================================

function geneticZahlenFitness(dna) {

    const entfernung =
        Math.abs(
            dna - geneticZahlenZiel
        );


    return geneticZahlBegrenzen(
        1 - entfernung / 1000,
        0,
        1
    );
}


// ========================================
// FITNESS: FARBE
// ========================================

function geneticFarbFitness(dna) {

    const deltaR =
        dna.r - geneticFarbZiel.r;

    const deltaG =
        dna.g - geneticFarbZiel.g;

    const deltaB =
        dna.b - geneticFarbZiel.b;


    const entfernung =
        Math.sqrt(
            deltaR * deltaR
            + deltaG * deltaG
            + deltaB * deltaB
        );


    const maximaleEntfernung =
        Math.sqrt(
            255 * 255
            + 255 * 255
            + 255 * 255
        );


    return geneticZahlBegrenzen(
        1
        - entfernung
        / maximaleEntfernung,
        0,
        1
    );
}


// ========================================
// FITNESS: PUNKT
// ========================================

function geneticPunktFitness(dna) {

    const deltaX =
        dna.x - geneticPunktZiel.x;

    const deltaY =
        dna.y - geneticPunktZiel.y;


    const entfernung =
        Math.sqrt(
            deltaX * deltaX
            + deltaY * deltaY
        );


    const maximaleEntfernung =
        Math.sqrt(
            geneticFlaechenBreite
            * geneticFlaechenBreite
            +
            geneticFlaechenHoehe
            * geneticFlaechenHoehe
        );


    return geneticZahlBegrenzen(
        1
        - entfernung
        / maximaleEntfernung,
        0,
        1
    );
}


// ========================================
// ZENTRALE FITNESSFUNKTION
// ========================================

function geneticFitnessBerechnen(dna) {

    switch (geneticAktuellerModus) {

        case "text":
            return geneticTextFitness(dna);

        case "zahl":
            return geneticZahlenFitness(dna);

        case "farbe":
            return geneticFarbFitness(dna);

        case "punkt":
            return geneticPunktFitness(dna);

        default:
            return 0;
    }
}


// ========================================
// KANDIDAT ERSTELLEN
// ========================================

function geneticKandidatErstellen(dna) {

    return {
        dna: dna,

        fitness:
            geneticFitnessBerechnen(
                dna
            )
    };
}


// ========================================
// POPULATION ERZEUGEN
// ========================================

function geneticPopulationErzeugen() {

    geneticPopulation = [];


    for (
        let index = 0;
        index < geneticPopulationsGroesse;
        index++
    ) {

        const dna =
            geneticZufallsDNA();


        geneticPopulation.push(
            geneticKandidatErstellen(
                dna
            )
        );
    }
}


// ========================================
// POPULATION SORTIEREN
// ========================================

function geneticPopulationSortieren() {

    geneticPopulation.sort(
        function(a, b) {

            return (
                b.fitness
                - a.fitness
            );
        }
    );
}


// ========================================
// BESTER KANDIDAT
// ========================================

function geneticBestenKandidaten() {

    geneticPopulationSortieren();

    return geneticPopulation[0];
}


// ========================================
// GEWICHTETE SELEKTION
// ========================================

function geneticElternteilWaehlen() {

    const gewichte = [];

    let gesamtGewicht = 0;


    for (
        const kandidat
        of geneticPopulation
    ) {

        /*
            Die Fitness wird quadriert.

            Dadurch werden bessere
            Kandidaten bevorzugt.

            0,01 verhindert, dass Kandidaten
            mit Fitness 0 niemals gewählt
            werden können.
        */

        const gewicht =
            0.01
            + kandidat.fitness
            * kandidat.fitness
            * 100;


        gewichte.push(
            gewicht
        );


        gesamtGewicht +=
            gewicht;
    }


    let zufall =
        Math.random()
        * gesamtGewicht;


    for (
        let index = 0;
        index < geneticPopulation.length;
        index++
    ) {

        zufall -=
            gewichte[index];


        if (zufall <= 0) {

            return geneticPopulation[
                index
            ];
        }
    }


    return geneticPopulation[
        geneticPopulation.length - 1
    ];
}


// ========================================
// CROSSOVER: TEXT
// ========================================

function geneticTextCrossover(
    dnaA,
    dnaB
) {

    let kind = "";


    for (
        let index = 0;
        index < geneticTextZiel.length;
        index++
    ) {

        if (Math.random() < 0.5) {

            kind += dnaA[index];

        } else {

            kind += dnaB[index];
        }
    }


    return kind;
}


// ========================================
// CROSSOVER: ZAHL
// ========================================

function geneticZahlenCrossover(
    dnaA,
    dnaB
) {

    /*
        Gewichteter Mittelwert der Eltern.
    */

    const mischung =
        Math.random();


    const kind =
        dnaA * mischung
        +
        dnaB * (1 - mischung);


    return Math.round(
        geneticZahlBegrenzen(
            kind,
            0,
            1000
        )
    );
}


// ========================================
// CROSSOVER: FARBE
// ========================================

function geneticFarbCrossover(
    dnaA,
    dnaB
) {

    return {

        r:
            Math.random() < 0.5
                ? dnaA.r
                : dnaB.r,

        g:
            Math.random() < 0.5
                ? dnaA.g
                : dnaB.g,

        b:
            Math.random() < 0.5
                ? dnaA.b
                : dnaB.b
    };
}


// ========================================
// CROSSOVER: PUNKT
// ========================================

function geneticPunktCrossover(
    dnaA,
    dnaB
) {

    return {

        x:
            Math.random() < 0.5
                ? dnaA.x
                : dnaB.x,

        y:
            Math.random() < 0.5
                ? dnaA.y
                : dnaB.y
    };
}


// ========================================
// ZENTRALE CROSSOVER-FUNKTION
// ========================================

function geneticCrossover(
    elternteilA,
    elternteilB
) {

    const dnaA =
        elternteilA.dna;

    const dnaB =
        elternteilB.dna;


    switch (geneticAktuellerModus) {

        case "text":

            return geneticTextCrossover(
                dnaA,
                dnaB
            );


        case "zahl":

            return geneticZahlenCrossover(
                dnaA,
                dnaB
            );


        case "farbe":

            return geneticFarbCrossover(
                dnaA,
                dnaB
            );


        case "punkt":

            return geneticPunktCrossover(
                dnaA,
                dnaB
            );
    }


    return null;
}


// ========================================
// MUTATION: TEXT
// ========================================

function geneticTextMutieren(dna) {

    let ergebnis = "";


    for (
        let index = 0;
        index < dna.length;
        index++
    ) {

        if (
            Math.random()
            < geneticMutationsRate
        ) {

            ergebnis +=
                geneticZufallsZeichen();

        } else {

            ergebnis +=
                dna[index];
        }
    }


    return ergebnis;
}


// ========================================
// MUTATION: ZAHL
// ========================================

function geneticZahlMutieren(dna) {

    if (
        Math.random()
        >= geneticMutationsRate
    ) {

        return dna;
    }


    /*
        Zufällige Veränderung zwischen
        -100 und +100.
    */

    const veraenderung =
        geneticZufallsGanzzahl(
            -100,
            100
        );


    return Math.round(
        geneticZahlBegrenzen(
            dna + veraenderung,
            0,
            1000
        )
    );
}


// ========================================
// MUTATION: FARBE
// ========================================

function geneticFarbeMutieren(dna) {

    const ergebnis = {
        ...dna
    };


    if (
        Math.random()
        < geneticMutationsRate
    ) {

        ergebnis.r =
            geneticZahlBegrenzen(
                ergebnis.r
                + geneticZufallsGanzzahl(
                    -40,
                    40
                ),
                0,
                255
            );
    }


    if (
        Math.random()
        < geneticMutationsRate
    ) {

        ergebnis.g =
            geneticZahlBegrenzen(
                ergebnis.g
                + geneticZufallsGanzzahl(
                    -40,
                    40
                ),
                0,
                255
            );
    }


    if (
        Math.random()
        < geneticMutationsRate
    ) {

        ergebnis.b =
            geneticZahlBegrenzen(
                ergebnis.b
                + geneticZufallsGanzzahl(
                    -40,
                    40
                ),
                0,
                255
            );
    }


    ergebnis.r =
        Math.round(ergebnis.r);

    ergebnis.g =
        Math.round(ergebnis.g);

    ergebnis.b =
        Math.round(ergebnis.b);


    return ergebnis;
}


// ========================================
// MUTATION: PUNKT
// ========================================

function geneticPunktMutieren(dna) {

    const ergebnis = {
        ...dna
    };


    if (
        Math.random()
        < geneticMutationsRate
    ) {

        ergebnis.x =
            geneticZahlBegrenzen(
                ergebnis.x
                + geneticZufallsGanzzahl(
                    -80,
                    80
                ),
                0,
                geneticFlaechenBreite
            );
    }


    if (
        Math.random()
        < geneticMutationsRate
    ) {

        ergebnis.y =
            geneticZahlBegrenzen(
                ergebnis.y
                + geneticZufallsGanzzahl(
                    -60,
                    60
                ),
                0,
                geneticFlaechenHoehe
            );
    }


    ergebnis.x =
        Math.round(ergebnis.x);

    ergebnis.y =
        Math.round(ergebnis.y);


    return ergebnis;
}


// ========================================
// ZENTRALE MUTATIONSFUNKTION
// ========================================

function geneticMutieren(dna) {

    switch (geneticAktuellerModus) {

        case "text":

            return geneticTextMutieren(
                dna
            );


        case "zahl":

            return geneticZahlMutieren(
                dna
            );


        case "farbe":

            return geneticFarbeMutieren(
                dna
            );


        case "punkt":

            return geneticPunktMutieren(
                dna
            );
    }


    return dna;
}


// ========================================
// NEUE GENERATION ERZEUGEN
// ========================================

function geneticNeueGeneration() {

    geneticPopulationSortieren();


    const neuePopulation = [];


    /*
        Die besten 5 % werden direkt
        übernommen.

        Das nennt man Elitismus.
    */

    const eliteAnzahl =
        Math.max(
            1,
            Math.floor(
                geneticPopulationsGroesse
                * 0.05
            )
        );


    for (
        let index = 0;
        index < eliteAnzahl;
        index++
    ) {

        const kandidat =
            geneticPopulation[index];


        neuePopulation.push({

            dna:
                geneticDNAKopieren(
                    kandidat.dna
                ),

            fitness:
                kandidat.fitness
        });
    }


    while (
        neuePopulation.length
        < geneticPopulationsGroesse
    ) {

        const elternteilA =
            geneticElternteilWaehlen();

        const elternteilB =
            geneticElternteilWaehlen();


        let kindDNA =
            geneticCrossover(
                elternteilA,
                elternteilB
            );


        kindDNA =
            geneticMutieren(
                kindDNA
            );


        neuePopulation.push(
            geneticKandidatErstellen(
                kindDNA
            )
        );
    }


    geneticPopulation =
        neuePopulation;


    geneticGeneration++;
}


// ========================================
// DNA ALS TEXT ANZEIGEN
// ========================================

function geneticDNAAlsText(dna) {

    if (geneticAktuellerModus === "text") {

        return dna;
    }


    if (geneticAktuellerModus === "zahl") {

        return String(dna);
    }


    if (geneticAktuellerModus === "farbe") {

        return (
            "RGB("
            + dna.r
            + ", "
            + dna.g
            + ", "
            + dna.b
            + ")"
        );
    }


    if (geneticAktuellerModus === "punkt") {

        return (
            "("
            + dna.x
            + ", "
            + dna.y
            + ")"
        );
    }


    return "-";
}


// ========================================
// ANZEIGE AKTUALISIEREN
// ========================================

function geneticAnzeigeAktualisieren() {

    const bester =
        geneticBestenKandidaten();


    const fitnessProzent =
        bester.fitness * 100;


    geneticModusAnzeige.textContent =
        geneticModusName();


    geneticGenerationAnzeige.textContent =
        geneticGeneration;


    geneticFitnessAnzeige.textContent =
        fitnessProzent.toFixed(2)
        + " %";


    geneticBesterAnzeige.textContent =
        geneticDNAAlsText(
            bester.dna
        );


    geneticFortschrittBalken.style.width =
        geneticZahlBegrenzen(
            fitnessProzent,
            0,
            100
        )
        + "%";


    // ====================================
    // FARBMODUS
    // ====================================

    if (geneticAktuellerModus === "farbe") {

        geneticBesterFarbe.style.backgroundColor =
            geneticRgbZuCss(
                bester.dna
            );


        geneticBesterFarbe.style.boxShadow =
            "0 0 18px "
            + geneticRgbZuCss(
                bester.dna
            );


        geneticZielFarbeAnzeige.style.backgroundColor =
            geneticRgbZuCss(
                geneticFarbZiel
            );
    }


    // ====================================
    // KOORDINATENMODUS
    // ====================================

    if (geneticAktuellerModus === "punkt") {

        geneticPunktPositionAnzeigen(
            geneticZielPunkt,
            geneticPunktZiel.x,
            geneticPunktZiel.y
        );


        geneticPunktPositionAnzeigen(
            geneticBesterPunkt,
            bester.dna.x,
            bester.dna.y
        );
    }


    // ====================================
    // POPULATION ANZEIGEN
    // ====================================

    geneticPopulationAnzeige.innerHTML =
        "";


    const maximalAnzeigen =
        Math.min(
            30,
            geneticPopulation.length
        );


    for (
        let index = 0;
        index < maximalAnzeigen;
        index++
    ) {

        const kandidat =
            geneticPopulation[index];


        const element =
            document.createElement("div");


        element.classList.add(
            "genetic-kandidat"
        );


        if (index === 0) {

            element.classList.add(
                "bester"
            );
        }


        const prozent =
            (
                kandidat.fitness
                * 100
            )
            .toFixed(1);


        element.textContent =
            geneticDNAAlsText(
                kandidat.dna
            )
            + " | "
            + prozent
            + "%";


        if (
            geneticAktuellerModus
            === "farbe"
        ) {

            element.style.borderLeft =
                "12px solid "
                + geneticRgbZuCss(
                    kandidat.dna
                );
        }


        geneticPopulationAnzeige.appendChild(
            element
        );
    }
}


// ========================================
// ZIEL EXAKT ERREICHT?
// ========================================

function geneticZielErreicht() {

    if (geneticPopulation.length === 0) {

        return false;
    }


    const bester =
        geneticBestenKandidaten();


    if (geneticAktuellerModus === "text") {

        return (
            bester.dna
            ===
            geneticTextZiel
        );
    }


    if (geneticAktuellerModus === "zahl") {

        return (
            bester.dna
            ===
            geneticZahlenZiel
        );
    }


    if (geneticAktuellerModus === "farbe") {

        return (
            bester.dna.r
            === geneticFarbZiel.r
            &&
            bester.dna.g
            === geneticFarbZiel.g
            &&
            bester.dna.b
            === geneticFarbZiel.b
        );
    }


    if (geneticAktuellerModus === "punkt") {

        return (
            bester.dna.x
            === geneticPunktZiel.x
            &&
            bester.dna.y
            === geneticPunktZiel.y
        );
    }


    return false;
}


// ========================================
// EINGABEN PRUEFEN
// ========================================

function geneticEingabenPruefen() {

    geneticAktuellerModus =
        geneticModus.value;


    const population =
        Number(
            geneticPopulationInput.value
        );


    const mutationProzent =
        Number(
            geneticMutationInput.value
        );


    if (
        !Number.isInteger(population)
        ||
        population < 20
        ||
        population > 500
    ) {

        geneticInfo.textContent =
            "Die Population muss zwischen 20 und 500 liegen.";

        return false;
    }


    if (
        Number.isNaN(mutationProzent)
        ||
        mutationProzent < 0
        ||
        mutationProzent > 50
    ) {

        geneticInfo.textContent =
            "Die Mutationsrate muss zwischen 0 und 50 Prozent liegen.";

        return false;
    }


    geneticPopulationsGroesse =
        population;


    geneticMutationsRate =
        mutationProzent / 100;


    // ====================================
    // TEXTZIEL
    // ====================================

    if (geneticAktuellerModus === "text") {

        geneticTextZiel =
            geneticZiel.value;


        if (geneticTextZiel.length === 0) {

            geneticInfo.textContent =
                "Bitte einen Zieltext eingeben.";

            return false;
        }
    }


    // ====================================
    // ZAHLENZIEL
    // ====================================

    if (geneticAktuellerModus === "zahl") {

        geneticZahlenZiel =
            Number(
                geneticZielZahl.value
            );


        if (
            !Number.isInteger(
                geneticZahlenZiel
            )
            ||
            geneticZahlenZiel < 0
            ||
            geneticZahlenZiel > 1000
        ) {

            geneticInfo.textContent =
                "Die Zielzahl muss zwischen 0 und 1000 liegen.";

            return false;
        }
    }


    // ====================================
    // FARBZIEL
    // ====================================

    if (geneticAktuellerModus === "farbe") {

        geneticFarbZiel =
            geneticHexZuRgb(
                geneticZielFarbe.value
            );
    }


    // ====================================
    // PUNKTZIEL
    // ====================================

    if (geneticAktuellerModus === "punkt") {

        const zielX =
            Number(
                geneticZielX.value
            );

        const zielY =
            Number(
                geneticZielY.value
            );


        if (
            Number.isNaN(zielX)
            ||
            zielX < 0
            ||
            zielX > geneticFlaechenBreite
        ) {

            geneticInfo.textContent =
                "X muss zwischen 0 und 700 liegen.";

            return false;
        }


        if (
            Number.isNaN(zielY)
            ||
            zielY < 0
            ||
            zielY > geneticFlaechenHoehe
        ) {

            geneticInfo.textContent =
                "Y muss zwischen 0 und 450 liegen.";

            return false;
        }


        geneticPunktZiel = {
            x: Math.round(zielX),
            y: Math.round(zielY)
        };
    }


    return true;
}


// ========================================
// INITIALISIEREN
// ========================================

function geneticInitialisieren() {

    if (
        !geneticEingabenPruefen()
    ) {

        return false;
    }


    geneticGeneration = 0;


    geneticPopulationErzeugen();

    geneticPopulationSortieren();


    geneticInitialisiert = true;

    geneticPausiert = false;


    geneticModusAnzeigen();

    geneticZielAnzeigeAktualisieren();

    geneticAnzeigeAktualisieren();


    geneticInfo.textContent =
        geneticModusName()
        + " wurde initialisiert.";


    return true;
}


// ========================================
// EINE GENERATION
// ========================================

function geneticEineGeneration() {

    if (!geneticInitialisiert) {

        const erfolgreich =
            geneticInitialisieren();


        if (!erfolgreich) {

            return false;
        }
    }


    if (geneticZielErreicht()) {

        return false;
    }


    geneticNeueGeneration();

    geneticAnzeigeAktualisieren();


    const bester =
        geneticBestenKandidaten();


    geneticInfo.textContent =
        "Generation "
        + geneticGeneration
        + ": beste Fitness "
        + (
            bester.fitness
            * 100
        ).toFixed(2)
        + " %.";


    if (geneticZielErreicht()) {

        geneticInfo.textContent =
            "Ziel erreicht! "
            + geneticDNAAlsText(
                bester.dna
            )
            + " wurde nach "
            + geneticGeneration
            + " Generationen gefunden.";


        return false;
    }


    return true;
}


// ========================================
// START
// ========================================

geneticStart.addEventListener(
    "click",
    async function() {

        if (geneticLaeuft) {

            return;
        }


        if (!geneticInitialisiert) {

            const erfolgreich =
                geneticInitialisieren();


            if (!erfolgreich) {

                return;
            }
        }


        if (geneticZielErreicht()) {

            geneticInfo.textContent =
                "Das Ziel wurde bereits erreicht.";

            return;
        }


        geneticLaeuft = true;

        geneticPausiert = false;


        geneticStart.disabled = true;

        geneticSchritt.disabled = true;


        geneticEingabenSperren(true);


        geneticInfo.textContent =
            "Evolution läuft...";


        try {

            const maximaleGenerationen =
                20000;


            while (
                !geneticPausiert
                &&
                geneticGeneration
                < maximaleGenerationen
            ) {

                const weiter =
                    geneticEineGeneration();


                if (!weiter) {

                    break;
                }


                /*
                    Browser regelmäßig Zeit
                    für die Darstellung geben.
                */

                if (
                    geneticGeneration
                    % 5 === 0
                ) {

                    await warten(10);
                }
            }


            if (
                geneticGeneration
                >= maximaleGenerationen
                &&
                !geneticZielErreicht()
            ) {

                geneticInfo.textContent =
                    "Sicherheitslimit von 20.000 Generationen erreicht.";
            }

        } finally {

            geneticLaeuft = false;


            geneticStart.disabled = false;

            geneticSchritt.disabled = false;
        }
    }
);


// ========================================
// PAUSE
// ========================================

geneticPause.addEventListener(
    "click",
    function() {

        if (!geneticLaeuft) {

            geneticInfo.textContent =
                "Die Evolution läuft momentan nicht.";

            return;
        }


        geneticPausiert = true;


        geneticInfo.textContent =
            "Pause bei Generation "
            + geneticGeneration
            + ".";
    }
);


// ========================================
// EINE GENERATION
// ========================================

geneticSchritt.addEventListener(
    "click",
    function() {

        if (geneticLaeuft) {

            return;
        }


        if (!geneticInitialisiert) {

            const erfolgreich =
                geneticInitialisieren();


            if (!erfolgreich) {

                return;
            }


            geneticEingabenSperren(true);
        }


        geneticEineGeneration();
    }
);


// ========================================
// RESET
// ========================================

geneticReset.addEventListener(
    "click",
    function() {

        geneticPausiert = true;

        geneticLaeuft = false;

        geneticInitialisiert = false;


        geneticPopulation = [];

        geneticGeneration = 0;


        geneticGenerationAnzeige.textContent =
            "0";

        geneticFitnessAnzeige.textContent =
            "0 %";

        geneticBesterAnzeige.textContent =
            "-";


        geneticFortschrittBalken.style.width =
            "0%";


        geneticPopulationAnzeige.innerHTML =
            "";


        geneticBesterFarbe.style.backgroundColor =
            "#21262d";


        geneticBesterPunkt.style.left =
            "0%";

        geneticBesterPunkt.style.top =
            "0%";


        geneticEingabenSperren(false);


        geneticStart.disabled =
            false;

        geneticSchritt.disabled =
            false;


        geneticAktuellerModus =
            geneticModus.value;


        geneticModusAnzeigen();


        geneticInfo.textContent =
            "Wähle einen Modus, konfiguriere die Evolution und starte den Algorithmus.";
    }
);


// ========================================
// MODUS WECHSELN
// ========================================

geneticModus.addEventListener(
    "change",
    function() {

        if (geneticLaeuft) {

            geneticModus.value =
                geneticAktuellerModus;

            return;
        }


        geneticAktuellerModus =
            geneticModus.value;


        geneticInitialisiert = false;

        geneticPopulation = [];

        geneticGeneration = 0;


        geneticGenerationAnzeige.textContent =
            "0";

        geneticFitnessAnzeige.textContent =
            "0 %";

        geneticBesterAnzeige.textContent =
            "-";

        geneticPopulationAnzeige.innerHTML =
            "";

        geneticFortschrittBalken.style.width =
            "0%";


        geneticModusAnzeigen();


        geneticInfo.textContent =
            geneticModusName()
            + " ausgewählt.";
    }
);


// ========================================
// ZIELWERTE LIVE AKTUALISIEREN
// ========================================

geneticZiel.addEventListener(
    "input",
    function() {

        if (!geneticInitialisiert) {

            geneticZielAnzeigeAktualisieren();
        }
    }
);


geneticZielZahl.addEventListener(
    "input",
    function() {

        if (!geneticInitialisiert) {

            geneticZielAnzeigeAktualisieren();
        }
    }
);


geneticZielFarbe.addEventListener(
    "input",
    function() {

        if (!geneticInitialisiert) {

            geneticZielAnzeigeAktualisieren();
        }
    }
);


geneticZielX.addEventListener(
    "input",
    function() {

        if (!geneticInitialisiert) {

            geneticZielAnzeigeAktualisieren();
        }
    }
);


geneticZielY.addEventListener(
    "input",
    function() {

        if (!geneticInitialisiert) {

            geneticZielAnzeigeAktualisieren();
        }
    }
);


// ========================================
// BEIM LADEN INITIALISIEREN
// ========================================

geneticAktuellerModus =
    geneticModus.value;


geneticModusAnzeigen();

geneticZielAnzeigeAktualisieren();

// ========================================
// NEUROEVOLUTION: KI-RENNWAGEN
// VOLLSTÄNDIGE VERSION
// ========================================


// ========================================
// HTML-ELEMENTE
// ========================================

const kiAutoCanvas =
    document.getElementById("ki-auto-canvas");

const kiAutoCtx =
    kiAutoCanvas.getContext("2d");


const kiAutoPopulationInput =
    document.getElementById("ki-auto-population");

const kiAutoMutationInput =
    document.getElementById("ki-auto-mutation");

const kiAutoTempoInput =
    document.getElementById("ki-auto-tempo");

const kiAutoSensorenInput =
    document.getElementById("ki-auto-sensoren");


const kiAutoStart =
    document.getElementById("ki-auto-start");

const kiAutoPause =
    document.getElementById("ki-auto-pause");

const kiAutoNaechsteGeneration =
    document.getElementById(
        "ki-auto-naechste-generation"
    );

const kiAutoReset =
    document.getElementById("ki-auto-reset");


const kiAutoGenerationAnzeige =
    document.getElementById("ki-auto-generation");

const kiAutoLebendAnzeige =
    document.getElementById("ki-auto-lebend");

const kiAutoCheckpointAnzeige =
    document.getElementById("ki-auto-checkpoint");

const kiAutoFitnessAnzeige =
    document.getElementById("ki-auto-fitness");

const kiAutoInfo =
    document.getElementById("ki-auto-info");


// ========================================
// CANVAS UND SIMULATION
// ========================================

const kiAutoBreite =
    kiAutoCanvas.width;

const kiAutoHoehe =
    kiAutoCanvas.height;


// Start links unten

const kiAutoStartX = 120;
const kiAutoStartY = 430;

const kiAutoStartWinkel =
    -Math.PI / 2;


// Fahrverhalten

const kiAutoGeschwindigkeit = 2.25;

const kiAutoMaxFrames = 2200;

const kiAutoCheckpointRadius = 45;

const kiAutoCp1Zeitlimit = 150;
// ========================================
// OFFENE RENNSTRECKE
//
// Die Strecke besteht aus drei Korridoren:
//
// linke Gerade
// obere Gerade
// rechte Gerade
//
// Unten gibt es keine Verbindung.
// ========================================

const kiStrecke = {
    breite: 140,

    linksX: 140,
    rechtsX: 760,

    untenY: 450,
    obenY: 100,

    radius: 90
};

// ========================================
// CHECKPOINTS
//
// Das Ziel ist KEIN Checkpoint.
// ========================================

const kiAutoCheckpoints = [

    // CP 1: linke Gerade
    {
        x1: 70,
        y1: 350,

        x2: 210,
        y2: 350
    },

    // CP 2: linke Gerade vor der Kurve
    {
        x1: 70,
        y1: 200,

        x2: 210,
        y2: 200
    },

    // CP 3: obere Gerade
    {
        x1: 300,
        y1: 30,

        x2: 300,
        y2: 170
    },

    // CP 4: obere Gerade
    {
        x1: 450,
        y1: 30,

        x2: 450,
        y2: 170
    },

    // CP 5: obere Gerade
    {
        x1: 600,
        y1: 30,

        x2: 600,
        y2: 170
    },

    // CP 6: rechte Gerade
    {
        x1: 690,
        y1: 200,

        x2: 830,
        y2: 200
    },

    // CP 7: rechte Gerade
    {
        x1: 690,
        y1: 350,

        x2: 830,
        y2: 350
    }
];


const kiAutoZiel = {

    x1: 690,
    x2: 830,

    y: 420
};

// ========================================
// SENSOREN
// ========================================

const kiAutoSensorWinkel = [

    -Math.PI / 2.8,
    -Math.PI / 5,
    0,
    Math.PI / 5,
    Math.PI / 2.8
];

const kiAutoSensorLaenge = 115;


// ========================================
// TRAININGSZUSTAND
// ========================================

let kiAutos = [];

let kiGeneration = 1;

let kiGenerationFrame = 0;

let kiPopulationGroesse = 10;

let kiMutationsRate = 0.08;


let kiTrainingLaeuft = false;

let kiTrainingPausiert = false;

let kiAnimationsId = null;


// Zielankünfte der aktuellen Generation

let kiZielAnkuenfte = [];

let kiSiegerAuto = null;


// Globaler Champion

let kiBestesNetz = null;

let kiBesteBewertungGlobal = null;


// ========================================
// ALLGEMEINE HILFSFUNKTIONEN
// ========================================

function kiZahlBegrenzen(
    wert,
    minimum,
    maximum
) {

    return Math.max(
        minimum,
        Math.min(
            maximum,
            wert
        )
    );
}


function kiZufallsWert(
    minimum,
    maximum
) {

    return (
        minimum
        + Math.random()
        * (maximum - minimum)
    );
}


function kiDistanz(
    x1,
    y1,
    x2,
    y2
) {

    const deltaX =
        x2 - x1;

    const deltaY =
        y2 - y1;


    return Math.sqrt(
        deltaX * deltaX
        + deltaY * deltaY
    );
}


function kiPunktImRechteck(
    x,
    y,
    rechteck
) {

    return (
        x >= rechteck.x
        &&
        x <=
            rechteck.x
            + rechteck.breite
        &&
        y >= rechteck.y
        &&
        y <=
            rechteck.y
            + rechteck.hoehe
    );
}


// ========================================
// PUNKT AUF DER STRECKE?
// ========================================

function kiPunktAufStrecke(x, y) {

    const halbeBreite =
        kiStrecke.breite / 2;


    // ====================================
    // ABSTAND ZU EINER GERADEN
    // ====================================

    function abstandZuGerade(
        punktX,
        punktY,
        startX,
        startY,
        endeX,
        endeY
    ) {

        const deltaX =
            endeX - startX;

        const deltaY =
            endeY - startY;


        const laengeQuadrat =
            deltaX * deltaX
            +
            deltaY * deltaY;


        if (laengeQuadrat === 0) {

            return kiDistanz(
                punktX,
                punktY,
                startX,
                startY
            );
        }


        let anteil =
            (
                (punktX - startX)
                * deltaX
                +
                (punktY - startY)
                * deltaY
            )
            /
            laengeQuadrat;


        anteil =
            kiZahlBegrenzen(
                anteil,
                0,
                1
            );


        const naechsterX =
            startX
            +
            anteil * deltaX;

        const naechsterY =
            startY
            +
            anteil * deltaY;


        return kiDistanz(
            punktX,
            punktY,
            naechsterX,
            naechsterY
        );
    }


    // ====================================
    // LINKE GERADE
    //
    // Von unten bis zum Kurvenanfang
    // ====================================

    const linkeGeradeAbstand =
        abstandZuGerade(
            x,
            y,

            kiStrecke.linksX,
            kiStrecke.untenY,

            kiStrecke.linksX,
            kiStrecke.obenY
            + kiStrecke.radius
        );


    if (
        linkeGeradeAbstand
        <= halbeBreite
    ) {

        return true;
    }


    // ====================================
    // OBERE GERADE
    // ====================================

    const obereGeradeAbstand =
        abstandZuGerade(
            x,
            y,

            kiStrecke.linksX
            + kiStrecke.radius,
            kiStrecke.obenY,

            kiStrecke.rechtsX
            - kiStrecke.radius,
            kiStrecke.obenY
        );


    if (
        obereGeradeAbstand
        <= halbeBreite
    ) {

        return true;
    }


    // ====================================
    // RECHTE GERADE
    // ====================================

    const rechteGeradeAbstand =
        abstandZuGerade(
            x,
            y,

            kiStrecke.rechtsX,
            kiStrecke.obenY
            + kiStrecke.radius,

            kiStrecke.rechtsX,
            kiStrecke.untenY
        );


    if (
        rechteGeradeAbstand
        <= halbeBreite
    ) {

        return true;
    }


    // ====================================
    // LINKE RUNDE KURVE
    //
    // Kurvenmittelpunkt:
    // linksX + radius
    // obenY + radius
    // ====================================

    const linkeKurveMitteX =
        kiStrecke.linksX
        + kiStrecke.radius;

    const linkeKurveMitteY =
        kiStrecke.obenY
        + kiStrecke.radius;


    const linkeKurveAbstand =
        kiDistanz(
            x,
            y,
            linkeKurveMitteX,
            linkeKurveMitteY
        );


    const linkeKurveWinkel =
        Math.atan2(
            y - linkeKurveMitteY,
            x - linkeKurveMitteX
        );


    const inLinkerKurve =
        linkeKurveWinkel >= -Math.PI
        &&
        linkeKurveWinkel <=
            -Math.PI / 2;


    if (
        inLinkerKurve
        &&
        Math.abs(
            linkeKurveAbstand
            - kiStrecke.radius
        )
        <= halbeBreite
    ) {

        return true;
    }


    // ====================================
    // RECHTE RUNDE KURVE
    // ====================================

    const rechteKurveMitteX =
        kiStrecke.rechtsX
        - kiStrecke.radius;

    const rechteKurveMitteY =
        kiStrecke.obenY
        + kiStrecke.radius;


    const rechteKurveAbstand =
        kiDistanz(
            x,
            y,
            rechteKurveMitteX,
            rechteKurveMitteY
        );


    const rechteKurveWinkel =
        Math.atan2(
            y - rechteKurveMitteY,
            x - rechteKurveMitteX
        );


    const inRechterKurve =
        rechteKurveWinkel >=
            -Math.PI / 2
        &&
        rechteKurveWinkel <= 0;


    if (
        inRechterKurve
        &&
        Math.abs(
            rechteKurveAbstand
            - kiStrecke.radius
        )
        <= halbeBreite
    ) {

        return true;
    }


    return false;
}

// ========================================
// NEURONALES NETZ
//
// 5 Sensoren
// 6 versteckte Neuronen
// 1 Lenkungsausgabe
// ========================================

function kiNetzZufaelligErzeugen() {

    const netz = {

        eingabeVersteckt: [],

        verstecktBias: [],

        verstecktAusgabe: [],

        ausgabeBias:
            kiZufallsWert(
                -1,
                1
            )
    };


    for (
        let neuron = 0;
        neuron < 6;
        neuron++
    ) {

        netz.eingabeVersteckt[
            neuron
        ] = [];


        for (
            let eingabe = 0;
            eingabe < 5;
            eingabe++
        ) {

            netz.eingabeVersteckt[
                neuron
            ][eingabe] =
                kiZufallsWert(
                    -1,
                    1
                );
        }


        netz.verstecktBias[
            neuron
        ] =
            kiZufallsWert(
                -1,
                1
            );


        netz.verstecktAusgabe[
            neuron
        ] =
            kiZufallsWert(
                -1,
                1
            );
    }


    return netz;
}


// ========================================
// NETZ KOPIEREN
// ========================================

function kiNetzKopieren(netz) {

    return {

        eingabeVersteckt:
            netz.eingabeVersteckt.map(
                function(gewichte) {

                    return [
                        ...gewichte
                    ];
                }
            ),

        verstecktBias:
            [
                ...netz.verstecktBias
            ],

        verstecktAusgabe:
            [
                ...netz.verstecktAusgabe
            ],

        ausgabeBias:
            netz.ausgabeBias
    };
}


// ========================================
// NETZ AUSFÜHREN
// ========================================

function kiNetzAusfuehren(
    netz,
    eingaben
) {

    const versteckteWerte = [];


    for (
        let neuron = 0;
        neuron < 6;
        neuron++
    ) {

        let summe =
            netz.verstecktBias[
                neuron
            ];


        for (
            let eingabe = 0;
            eingabe < 5;
            eingabe++
        ) {

            summe +=
                eingaben[eingabe]
                *
                netz.eingabeVersteckt[
                    neuron
                ][eingabe];
        }


        versteckteWerte[
            neuron
        ] =
            Math.tanh(summe);
    }


    let ausgabe =
        netz.ausgabeBias;


    for (
        let neuron = 0;
        neuron < 6;
        neuron++
    ) {

        ausgabe +=
            versteckteWerte[
                neuron
            ]
            *
            netz.verstecktAusgabe[
                neuron
            ];
    }


    // -1 = links
    //  0 = geradeaus
    // +1 = rechts

    return Math.tanh(ausgabe);
}


// ========================================
// NETZE KREUZEN
// ========================================

function kiNetzKreuzen(
    netzA,
    netzB
) {

    const kind =
        kiNetzKopieren(
            netzA
        );


    for (
        let neuron = 0;
        neuron < 6;
        neuron++
    ) {

        for (
            let eingabe = 0;
            eingabe < 5;
            eingabe++
        ) {

            if (Math.random() < 0.5) {

                kind.eingabeVersteckt[
                    neuron
                ][eingabe] =
                    netzB
                        .eingabeVersteckt[
                            neuron
                        ][eingabe];
            }
        }


        if (Math.random() < 0.5) {

            kind.verstecktBias[
                neuron
            ] =
                netzB.verstecktBias[
                    neuron
                ];
        }


        if (Math.random() < 0.5) {

            kind.verstecktAusgabe[
                neuron
            ] =
                netzB.verstecktAusgabe[
                    neuron
                ];
        }
    }


    if (Math.random() < 0.5) {

        kind.ausgabeBias =
            netzB.ausgabeBias;
    }


    return kind;
}


// ========================================
// NETZ MUTIEREN
// ========================================

function kiNetzMutieren(netz) {

    const ergebnis =
        kiNetzKopieren(
            netz
        );


    function mutiereWert(wert) {

        if (
            Math.random()
            <
            kiMutationsRate
        ) {

            return (
                wert
                +
                kiZufallsWert(
                    -0.45,
                    0.45
                )
            );
        }


        return wert;
    }


    for (
        let neuron = 0;
        neuron < 6;
        neuron++
    ) {

        for (
            let eingabe = 0;
            eingabe < 5;
            eingabe++
        ) {

            ergebnis.eingabeVersteckt[
                neuron
            ][eingabe] =
                mutiereWert(
                    ergebnis
                        .eingabeVersteckt[
                            neuron
                        ][eingabe]
                );
        }


        ergebnis.verstecktBias[
            neuron
        ] =
            mutiereWert(
                ergebnis.verstecktBias[
                    neuron
                ]
            );


        ergebnis.verstecktAusgabe[
            neuron
        ] =
            mutiereWert(
                ergebnis.verstecktAusgabe[
                    neuron
                ]
            );
    }


    ergebnis.ausgabeBias =
        mutiereWert(
            ergebnis.ausgabeBias
        );


    return ergebnis;
}


// ========================================
// AUTO ERZEUGEN
// ========================================

function kiAutoErzeugen(netz) {

    return {
  
        x: kiAutoStartX,
        y: kiAutoStartY,

        vorherX: kiAutoStartX,
        vorherY: kiAutoStartY,

        winkel:
            kiAutoStartWinkel,

        breite: 13,
        laenge: 23,

        geschwindigkeit:
            kiAutoGeschwindigkeit,

        aktiv: true,

        kollision: false,

        zielErreicht: false,

        zielPlatz: null,

        zielFrame: null,

        checkpoint: 0,

        framesLebendig: 0,

        netz:
            netz
            ||
            kiNetzZufaelligErzeugen(),

        sensoren: []
    };
}


// ========================================
// POPULATION ERZEUGEN
// ========================================

function kiPopulationErzeugen(netze) {

    kiAutos = [];

    kiZielAnkuenfte = [];

    kiSiegerAuto = null;


    for (
        let index = 0;
        index < kiPopulationGroesse;
        index++
    ) {

        let netz;


        if (
            netze
            &&
            netze[index]
        ) {

            netz =
                kiNetzKopieren(
                    netze[index]
                );

        } else {

            netz =
                kiNetzZufaelligErzeugen();
        }


        kiAutos.push(
            kiAutoErzeugen(
                netz
            )
        );
    }


    kiGenerationFrame = 0;
}


// ========================================
// SENSOR MESSEN
// ========================================

function kiSensorMessen(
    auto,
    offsetWinkel
) {

    const winkel =
        auto.winkel
        +
        offsetWinkel;


    for (
        let entfernung = 0;
        entfernung <=
            kiAutoSensorLaenge;
        entfernung += 3
    ) {

        const x =
            auto.x
            +
            Math.cos(winkel)
            *
            entfernung;

        const y =
            auto.y
            +
            Math.sin(winkel)
            *
            entfernung;


        if (
            !kiPunktAufStrecke(
                x,
                y
            )
        ) {

            return {

                distanz:
                    entfernung,

                x: x,
                y: y
            };
        }
    }


    return {

        distanz:
            kiAutoSensorLaenge,

        x:
            auto.x
            +
            Math.cos(winkel)
            *
            kiAutoSensorLaenge,

        y:
            auto.y
            +
            Math.sin(winkel)
            *
            kiAutoSensorLaenge
    };
}


// ========================================
// SENSOREN AKTUALISIEREN
// ========================================

function kiSensorenAktualisieren(auto) {

    auto.sensoren = [];


    const eingaben = [];


    for (
        const sensorWinkel
        of kiAutoSensorWinkel
    ) {

        const sensor =
            kiSensorMessen(
                auto,
                sensorWinkel
            );


        auto.sensoren.push(
            sensor
        );


        eingaben.push(
            sensor.distanz
            /
            kiAutoSensorLaenge
        );
    }


    return eingaben;
}


// ========================================
// AUTO-ECKEN
// ========================================

function kiAutoEcken(auto) {

    const halbeLaenge =
        auto.laenge / 2;

    const halbeBreite =
        auto.breite / 2;


    const vorX =
        Math.cos(auto.winkel)
        *
        halbeLaenge;

    const vorY =
        Math.sin(auto.winkel)
        *
        halbeLaenge;


    const seitX =
        Math.cos(
            auto.winkel
            +
            Math.PI / 2
        )
        *
        halbeBreite;

    const seitY =
        Math.sin(
            auto.winkel
            +
            Math.PI / 2
        )
        *
        halbeBreite;


    return [

        {
            x:
                auto.x
                +
                vorX
                +
                seitX,

            y:
                auto.y
                +
                vorY
                +
                seitY
        },

        {
            x:
                auto.x
                +
                vorX
                -
                seitX,

            y:
                auto.y
                +
                vorY
                -
                seitY
        },

        {
            x:
                auto.x
                -
                vorX
                +
                seitX,

            y:
                auto.y
                -
                vorY
                +
                seitY
        },

        {
            x:
                auto.x
                -
                vorX
                -
                seitX,

            y:
                auto.y
                -
                vorY
                -
                seitY
        }
    ];
}


// ========================================
// KOLLISION
// ========================================

function kiAutoHatKollision(auto) {

    const ecken =
        kiAutoEcken(auto);


    for (const ecke of ecken) {

        if (
            !kiPunktAufStrecke(
                ecke.x,
                ecke.y
            )
        ) {

            return true;
        }
    }


    return false;
}


// ========================================
// CHECKPOINT PRÜFEN
// ========================================
function kiLinieUeberquert(
    vorherX,
    vorherY,
    aktuellX,
    aktuellY,
    linie
) {

    function richtung(
        ax,
        ay,
        bx,
        by,
        cx,
        cy
    ) {

        return (
            (cx - ax) * (by - ay)
            -
            (cy - ay) * (bx - ax)
        );
    }


    const d1 =
        richtung(
            vorherX,
            vorherY,
            aktuellX,
            aktuellY,
            linie.x1,
            linie.y1
        );


    const d2 =
        richtung(
            vorherX,
            vorherY,
            aktuellX,
            aktuellY,
            linie.x2,
            linie.y2
        );


    const d3 =
        richtung(
            linie.x1,
            linie.y1,
            linie.x2,
            linie.y2,
            vorherX,
            vorherY
        );


    const d4 =
        richtung(
            linie.x1,
            linie.y1,
            linie.x2,
            linie.y2,
            aktuellX,
            aktuellY
        );


    return (
        (
            d1 > 0 &&
            d2 < 0
        )
        ||
        (
            d1 < 0 &&
            d2 > 0
        )
    )
    &&
    (
        (
            d3 > 0 &&
            d4 < 0
        )
        ||
        (
            d3 < 0 &&
            d4 > 0
        )
    );
}
function kiCheckpointPruefen(auto) {

    if (
        !auto.aktiv ||
        auto.zielErreicht
    ) {
        return false;
    }


    if (
        auto.checkpoint >=
        kiAutoCheckpoints.length
    ) {
        return false;
    }


    const checkpoint =
        kiAutoCheckpoints[
            auto.checkpoint
        ];


    const ueberquert =
        kiLinieUeberquert(
            auto.vorherX,
            auto.vorherY,

            auto.x,
            auto.y,

            checkpoint
        );


    if (!ueberquert) {
        return false;
    }


    auto.checkpoint++;


    console.log(
        "Checkpoint erreicht:",
        auto.checkpoint,
        "/",
        kiAutoCheckpoints.length
    );


    return true;
}



// ========================================
// ZIEL PRÜFEN
// ========================================

function kiZielPruefen(auto) {

    if (
        auto.zielErreicht
        ||
        !auto.aktiv
    ) {

        return auto.zielErreicht;
    }


    if (
        auto.checkpoint
        <
        kiAutoCheckpoints.length
    ) {

        return false;
    }


    const ueberquert =
        kiLinieUeberquert(
            auto.vorherX,
            auto.vorherY,

            auto.x,
            auto.y,

            {
                x1: kiAutoZiel.x1,
                y1: kiAutoZiel.y,

                x2: kiAutoZiel.x2,
                y2: kiAutoZiel.y
            }
        );


    if (!ueberquert) {

        return false;
    }


    auto.zielErreicht = true;

    auto.aktiv = false;

    auto.zielFrame =
        kiGenerationFrame;


    kiZielAnkuenfte.push(
        auto
    );


    auto.zielPlatz =
        kiZielAnkuenfte.length;


    if (kiSiegerAuto === null) {

        kiSiegerAuto = auto;
    }


    kiAutoInfo.textContent =
        "Auto erreicht das Ziel auf Platz "
        + auto.zielPlatz
        + ".";


    return true;
}

// ========================================
// ENTFERNUNG ZUM NÄCHSTEN ZIELPUNKT
// ========================================

function kiEntfernungZumNaechstenCheckpoint(
    auto
) {

    if (auto.zielErreicht) {

        return 0;
    }


    // ====================================
    // ALLE CHECKPOINTS ERREICHT
    //
    // Jetzt Entfernung zur Ziellinie
    // ====================================

    if (
        auto.checkpoint
        >=
        kiAutoCheckpoints.length
    ) {

        const zielMitteX =
            (
                kiAutoZiel.x1
                +
                kiAutoZiel.x2
            )
            / 2;


        return kiDistanz(
            auto.x,
            auto.y,
            zielMitteX,
            kiAutoZiel.y
        );
    }


    // ====================================
    // MITTELPUNKT DES NÄCHSTEN CHECKPOINTS
    // ====================================

    const checkpoint =
        kiAutoCheckpoints[
            auto.checkpoint
        ];


    const checkpointMitteX =
        (
            checkpoint.x1
            +
            checkpoint.x2
        )
        / 2;


    const checkpointMitteY =
        (
            checkpoint.y1
            +
            checkpoint.y2
        )
        / 2;


    return kiDistanz(
        auto.x,
        auto.y,
        checkpointMitteX,
        checkpointMitteY
    );
}

// ========================================
// AUTOS VERGLEICHEN
//
// Reihenfolge:
//
// 1. Ziel erreicht
// 2. Frühere Zielankunft
// 3. Mehr Checkpoints
// 4. Näher zum nächsten Checkpoint
// ========================================

function kiAutoVergleichen(a, b) {

    if (
        a.zielErreicht
        &&
        !b.zielErreicht
    ) {

        return -1;
    }


    if (
        b.zielErreicht
        &&
        !a.zielErreicht
    ) {

        return 1;
    }


    if (
        a.zielErreicht
        &&
        b.zielErreicht
    ) {

        return (
            a.zielFrame
            -
            b.zielFrame
        );
    }


    if (
        a.checkpoint
        !==
        b.checkpoint
    ) {

        return (
            b.checkpoint
            -
            a.checkpoint
        );
    }


    const entfernungA =
        kiEntfernungZumNaechstenCheckpoint(
            a
        );

    const entfernungB =
        kiEntfernungZumNaechstenCheckpoint(
            b
        );


    return (
        entfernungA
        -
        entfernungB
    );
}


// ========================================
// AKTUELL BESTES AUTO
// ========================================

function kiBestesAktuellesAuto() {

    if (kiAutos.length === 0) {

        return null;
    }


    const sortiert =
        [...kiAutos].sort(
            kiAutoVergleichen
        );


    return sortiert[0];
}


// ========================================
// BEWERTUNG SPEICHERN
// ========================================

function kiBewertungErstellen(auto) {

    return {

        zielErreicht:
            auto.zielErreicht,

        zielFrame:
            auto.zielFrame,

        checkpoint:
            auto.checkpoint,

        distanz:
            kiEntfernungZumNaechstenCheckpoint(
                auto
            )
    };
}


// ========================================
// BEWERTUNGEN VERGLEICHEN
// ========================================

function kiBewertungIstBesser(
    neu,
    alt
) {

    if (alt === null) {

        return true;
    }


    if (
        neu.zielErreicht
        &&
        !alt.zielErreicht
    ) {

        return true;
    }


    if (
        !neu.zielErreicht
        &&
        alt.zielErreicht
    ) {

        return false;
    }


    if (
        neu.zielErreicht
        &&
        alt.zielErreicht
    ) {

        return (
            neu.zielFrame
            <
            alt.zielFrame
        );
    }


    if (
        neu.checkpoint
        >
        alt.checkpoint
    ) {

        return true;
    }


    if (
        neu.checkpoint
        <
        alt.checkpoint
    ) {

        return false;
    }


    return (
        neu.distanz
        <
        alt.distanz
    );
}


// ========================================
// AUTO AKTUALISIEREN
// ========================================

function kiAutoAktualisieren(auto) {

    if (
        !auto.aktiv
        ||
        auto.kollision
        ||
        auto.zielErreicht
    ) {

        return;
    }


    const sensorEingaben =
        kiSensorenAktualisieren(
            auto
        );


    const lenkung =
        kiNetzAusfuehren(
            auto.netz,
            sensorEingaben
        );


    auto.winkel +=
        lenkung * 0.06;


    // Alte Position merken

    auto.vorherX = auto.x;
    auto.vorherY = auto.y;


    // Auto bewegen

    auto.x +=
        Math.cos(auto.winkel)
        *
        auto.geschwindigkeit;


    auto.y +=
        Math.sin(auto.winkel)
        *
        auto.geschwindigkeit;


    auto.framesLebendig++;


    // ====================================
    // CHECKPOINT PRÜFEN
    // ====================================

    kiCheckpointPruefen(auto);


    // ====================================
    // CP1-ZEITLIMIT
    //
    // Nach 250 Frames muss CP1
    // passiert worden sein.
    // ====================================

    if (
        auto.framesLebendig >
        kiAutoCp1Zeitlimit
        &&
        auto.checkpoint === 0
    ) {

        auto.kollision = true;
        auto.aktiv = false;

        return;
    }


    // ====================================
    // ZIEL PRÜFEN
    // ====================================

    if (
        kiZielPruefen(auto)
    ) {

        return;
    }


    // ====================================
    // WANDKOLLISION
    // ====================================

    if (
        kiAutoHatKollision(auto)
    ) {

        auto.kollision = true;
        auto.aktiv = false;

        return;
    }
}

// ========================================
// ELTERNTEIL AUSWÄHLEN
// ========================================

function kiElternteilWaehlen(
    sortierteAutos
) {

    const poolGroesse =
        Math.max(
            2,
            Math.floor(
                sortierteAutos.length
                * 0.30
            )
        );


    const zufall =
        Math.random();


    const index =
        Math.floor(
            zufall
            *
            zufall
            *
            poolGroesse
        );


    return sortierteAutos[
        index
    ];
}


// ========================================
// NEUE GENERATION
// ========================================

function kiNeueGenerationErzeugen() {

    const sortiert =
        [...kiAutos].sort(
            kiAutoVergleichen
        );


    const bester =
        sortiert[0];


    const neueBewertung =
        kiBewertungErstellen(
            bester
        );


    // Globalen Champion speichern

    if (
        kiBewertungIstBesser(
            neueBewertung,
            kiBesteBewertungGlobal
        )
    ) {

        kiBesteBewertungGlobal = {
            ...neueBewertung
        };


        kiBestesNetz =
            kiNetzKopieren(
                bester.netz
            );


        console.log(
            "Neuer Champion:",
            "Checkpoint",
            bester.checkpoint,
            "Entfernung",
            Math.round(
                neueBewertung.distanz
            )
        );
    }


    const neueNetze = [];


    // Globaler Champion

    if (kiBestesNetz !== null) {

        neueNetze.push(
            kiNetzKopieren(
                kiBestesNetz
            )
        );
    }


    // Bester dieser Generation

    neueNetze.push(
        kiNetzKopieren(
            bester.netz
        )
    );


    // Top 5 % als unveränderte Elite

    const eliteAnzahl =
        Math.max(
            2,
            Math.floor(
                kiPopulationGroesse
                * 0.05
            )
        );


    for (
        let index = 0;
        index < eliteAnzahl;
        index++
    ) {

        neueNetze.push(
            kiNetzKopieren(
                sortiert[index].netz
            )
        );
    }


    // Restliche Netze kreuzen und mutieren

    while (
        neueNetze.length
        <
        kiPopulationGroesse
    ) {

        const elternteilA =
            kiElternteilWaehlen(
                sortiert
            );

        const elternteilB =
            kiElternteilWaehlen(
                sortiert
            );


        let kindNetz =
            kiNetzKreuzen(
                elternteilA.netz,
                elternteilB.netz
            );


        kindNetz =
            kiNetzMutieren(
                kindNetz
            );


        neueNetze.push(
            kindNetz
        );
    }


    neueNetze.length =
        kiPopulationGroesse;


    kiGeneration++;


    kiPopulationErzeugen(
        neueNetze
    );


    kiAutoInfo.textContent =
        "Generation "
        +
        kiGeneration
        +
        " gestartet.";
}


// ========================================
// STRECKE ZEICHNEN
// ========================================

function kiStreckeZeichnen() {

    // ====================================
    // HINTERGRUND
    // ====================================

    kiAutoCtx.clearRect(
        0,
        0,
        kiAutoBreite,
        kiAutoHoehe
    );


    kiAutoCtx.fillStyle =
        "#05070a";


    kiAutoCtx.fillRect(
        0,
        0,
        kiAutoBreite,
        kiAutoHoehe
    );


    // ====================================
    // DURCHGEHENDER U-PFAD
    // ====================================

    function uPfadErstellen() {

        kiAutoCtx.beginPath();


        // Start unten links

        kiAutoCtx.moveTo(
            kiStrecke.linksX,
            kiStrecke.untenY
        );


        // Linke Gerade hoch

        kiAutoCtx.lineTo(
            kiStrecke.linksX,
            kiStrecke.obenY
            + kiStrecke.radius
        );


        // Linke runde Kurve

        kiAutoCtx.arc(
            kiStrecke.linksX
            + kiStrecke.radius,

            kiStrecke.obenY
            + kiStrecke.radius,

            kiStrecke.radius,

            Math.PI,

            Math.PI * 1.5
        );


        // Obere Gerade

        kiAutoCtx.lineTo(
            kiStrecke.rechtsX
            - kiStrecke.radius,

            kiStrecke.obenY
        );


        // Rechte runde Kurve

        kiAutoCtx.arc(
            kiStrecke.rechtsX
            - kiStrecke.radius,

            kiStrecke.obenY
            + kiStrecke.radius,

            kiStrecke.radius,

            Math.PI * 1.5,

            Math.PI * 2
        );


        // Rechte Gerade nach unten

        kiAutoCtx.lineTo(
            kiStrecke.rechtsX,
            kiStrecke.untenY
        );
    }


    // ====================================
    // FAHRBAHNRAND
    //
    // Erst breiter grauer Rand
    // ====================================

    uPfadErstellen();


    kiAutoCtx.strokeStyle =
        "#8b949e";

    kiAutoCtx.lineWidth =
        kiStrecke.breite + 10;

    kiAutoCtx.lineCap =
        "butt";

    kiAutoCtx.lineJoin =
        "round";

    kiAutoCtx.stroke();


    // ====================================
    // FAHRBAHN
    //
    // Danach etwas schmaler darüber
    // ====================================

    uPfadErstellen();


    kiAutoCtx.strokeStyle =
        "#30363d";

    kiAutoCtx.lineWidth =
        kiStrecke.breite;

    kiAutoCtx.lineCap =
        "butt";

    kiAutoCtx.lineJoin =
        "round";

    kiAutoCtx.stroke();


    // ====================================
    // CHECKPOINTS
    // ====================================

    for (
        let index = 0;
        index <
            kiAutoCheckpoints.length;
        index++
    ) {

        const checkpoint =
            kiAutoCheckpoints[index];


        kiAutoCtx.strokeStyle =
            "rgba(210, 153, 34, 0.65)";

        kiAutoCtx.lineWidth = 3;


        kiAutoCtx.beginPath();


        kiAutoCtx.moveTo(
            checkpoint.x1,
            checkpoint.y1
        );


        kiAutoCtx.lineTo(
            checkpoint.x2,
            checkpoint.y2
        );


        kiAutoCtx.stroke();


        const mitteX =
            (
                checkpoint.x1
                +
                checkpoint.x2
            )
            / 2;


        const mitteY =
            (
                checkpoint.y1
                +
                checkpoint.y2
            )
            / 2;


        kiAutoCtx.fillStyle =
            "#d29922";

        kiAutoCtx.font =
            "bold 13px monospace";

        kiAutoCtx.textAlign =
            "center";

        kiAutoCtx.textBaseline =
            "middle";


        kiAutoCtx.fillText(
            String(index + 1),
            mitteX,
            mitteY - 10
        );
    }


    // ====================================
    // STARTLINIE
    // ====================================

    kiAutoCtx.strokeStyle =
        "#3fb950";

    kiAutoCtx.lineWidth = 6;


    kiAutoCtx.beginPath();


    kiAutoCtx.moveTo(
        kiStrecke.linksX
        - kiStrecke.breite / 2,

        430
    );


    kiAutoCtx.lineTo(
        kiStrecke.linksX
        + kiStrecke.breite / 2,

        430
    );


    kiAutoCtx.stroke();


    kiAutoCtx.fillStyle =
        "#3fb950";

    kiAutoCtx.font =
        "bold 15px monospace";

    kiAutoCtx.textAlign =
        "center";


    kiAutoCtx.fillText(
        "START",
        kiStrecke.linksX,
        470
    );


    // ====================================
    // ZIELLINIE
    // ====================================

    kiAutoCtx.strokeStyle =
        "#f85149";

    kiAutoCtx.lineWidth = 6;


    kiAutoCtx.beginPath();


    kiAutoCtx.moveTo(
        kiAutoZiel.x1,
        kiAutoZiel.y
    );


    kiAutoCtx.lineTo(
        kiAutoZiel.x2,
        kiAutoZiel.y
    );


    kiAutoCtx.stroke();


    kiAutoCtx.fillStyle =
        "#f85149";


    kiAutoCtx.fillText(
        "ZIEL",

        (
            kiAutoZiel.x1
            +
            kiAutoZiel.x2
        )
        / 2,

        470
    );
}
// ========================================
// SENSOREN ZEICHNEN
// ========================================

function kiSensorenZeichnen(auto) {

    for (
        const sensor
        of auto.sensoren
    ) {

        kiAutoCtx.strokeStyle =
            "rgba(210,153,34,0.65)";

        kiAutoCtx.lineWidth = 1;


        kiAutoCtx.beginPath();

        kiAutoCtx.moveTo(
            auto.x,
            auto.y
        );

        kiAutoCtx.lineTo(
            sensor.x,
            sensor.y
        );

        kiAutoCtx.stroke();


        kiAutoCtx.fillStyle =
            "#f85149";

        kiAutoCtx.beginPath();

        kiAutoCtx.arc(
            sensor.x,
            sensor.y,
            2.5,
            0,
            Math.PI * 2
        );

        kiAutoCtx.fill();
    }
}



// ========================================
// AUTO ZEICHNEN
// ========================================

function kiAutoZeichnen(
    auto,
    istBestes
) {

    kiAutoCtx.save();


    kiAutoCtx.translate(
        auto.x,
        auto.y
    );


    kiAutoCtx.rotate(
        auto.winkel
    );


    if (auto.zielErreicht) {

        kiAutoCtx.fillStyle =
            "#d29922";

        kiAutoCtx.shadowColor =
            "#d29922";

        kiAutoCtx.shadowBlur =
            14;

    } else if (istBestes) {

        kiAutoCtx.fillStyle =
            "#3fb950";

        kiAutoCtx.shadowColor =
            "#3fb950";

        kiAutoCtx.shadowBlur =
            12;

    } else if (auto.kollision) {

        kiAutoCtx.fillStyle =
            "rgba(248,81,73,0.18)";

        kiAutoCtx.shadowBlur = 0;

    } else {

        kiAutoCtx.fillStyle =
            "rgba(88,166,255,0.45)";

        kiAutoCtx.shadowBlur = 0;
    }


    kiAutoCtx.fillRect(
        -auto.laenge / 2,
        -auto.breite / 2,
        auto.laenge,
        auto.breite
    );


    // Vorderseite

    kiAutoCtx.fillStyle =
        "#ffffff";


    kiAutoCtx.fillRect(
        auto.laenge / 2 - 4,
        -auto.breite / 2 + 2,
        3,
        auto.breite - 4
    );


    kiAutoCtx.restore();
}


// ========================================
// ALLES ZEICHNEN
// ========================================

function kiAllesZeichnen() {

    kiStreckeZeichnen();


    const bestes =
        kiBestesAktuellesAuto();


    for (const auto of kiAutos) {

        kiAutoZeichnen(
            auto,
            auto === bestes
        );
    }


    if (
        bestes
        &&
        bestes.aktiv
        &&
        kiAutoSensorenInput.checked
    ) {

        kiSensorenZeichnen(
            bestes
        );
    }
}


// ========================================
// STATUS AKTUALISIEREN
// ========================================

function kiStatusAktualisieren() {

    const lebend =
        kiAutos.filter(
            function(auto) {

                return auto.aktiv;
            }
        ).length;


    const bestes =
        kiBestesAktuellesAuto();


    kiAutoGenerationAnzeige.textContent =
        kiGeneration;


    kiAutoLebendAnzeige.textContent =
        lebend
        +
        " / "
        +
        kiPopulationGroesse;


    if (!bestes) {

        kiAutoCheckpointAnzeige.textContent =
            "0 / "
            +
            kiAutoCheckpoints.length;

        kiAutoFitnessAnzeige.textContent =
            "-";

        return;
    }


    kiAutoCheckpointAnzeige.textContent =
        bestes.checkpoint
        +
        " / "
        +
        kiAutoCheckpoints.length;


    if (bestes.zielErreicht) {

        kiAutoFitnessAnzeige.textContent =
            "ZIEL | Platz "
            +
            bestes.zielPlatz;

        return;
    }


    const entfernung =
        kiEntfernungZumNaechstenCheckpoint(
            bestes
        );


    if (
        bestes.checkpoint
        >=
        kiAutoCheckpoints.length
    ) {

        kiAutoFitnessAnzeige.textContent =
            "Alle CP | "
            +
            Math.round(entfernung)
            +
            " px bis Ziel";

    } else {

        kiAutoFitnessAnzeige.textContent =
            "CP "
            +
            bestes.checkpoint
            +
            " | "
            +
            Math.round(entfernung)
            +
            " px";
    }
}


// ========================================
// SIMULATIONSSCHRITT
// ========================================

function kiSimulationsSchritt() {

    const tempo =
        Number(
            kiAutoTempoInput.value
        );


    for (
        let wiederholung = 0;
        wiederholung < tempo;
        wiederholung++
    ) {

        for (const auto of kiAutos) {

            kiAutoAktualisieren(
                auto
            );
        }


        kiGenerationFrame++;


        const mindestensEinAutoAktiv =
            kiAutos.some(
                function(auto) {

                    return auto.aktiv;
                }
            );


        if (
            !mindestensEinAutoAktiv
            ||
            kiGenerationFrame
            >=
            kiAutoMaxFrames
        ) {

            kiNeueGenerationErzeugen();

            break;
        }
    }
}


// ========================================
// ANIMATIONSSCHLEIFE
// ========================================

function kiAnimationsSchleife() {

    if (!kiTrainingLaeuft) {

        kiAnimationsId = null;

        return;
    }


    if (!kiTrainingPausiert) {

        kiSimulationsSchritt();
    }


    kiAllesZeichnen();

    kiStatusAktualisieren();


    kiAnimationsId =
        requestAnimationFrame(
            kiAnimationsSchleife
        );
}


// ========================================
// EINGABEN LESEN
// ========================================

function kiEingabenLesen() {

    const population =
        Number(
            kiAutoPopulationInput.value
        );

    const mutation =
        Number(
            kiAutoMutationInput.value
        );


    if (
        !Number.isInteger(population)
        ||
        population < 10
        ||
        population > 100
    ) {

        kiAutoInfo.textContent =
            "Die Population muss zwischen 10 und 100 liegen.";

        return false;
    }


    if (
        Number.isNaN(mutation)
        ||
        mutation < 0
        ||
        mutation > 100
    ) {

        kiAutoInfo.textContent =
            "Die Mutationsrate muss zwischen 0 und 50 Prozent liegen.";

        return false;
    }


    kiPopulationGroesse =
        population;


    kiMutationsRate =
        mutation / 100;


    return true;
}


// ========================================
// TRAINING STARTEN
// ========================================

kiAutoStart.addEventListener(
    "click",
    function() {

        if (
            kiTrainingLaeuft
            &&
            !kiTrainingPausiert
        ) {

            return;
        }


        if (!kiTrainingLaeuft) {

            if (!kiEingabenLesen()) {

                return;
            }


            if (kiAutos.length === 0) {

                kiPopulationErzeugen();
            }


            kiTrainingLaeuft = true;
        }


        kiTrainingPausiert = false;


        kiAutoPopulationInput.disabled =
            true;

        kiAutoMutationInput.disabled =
            true;


        kiAutoPause.textContent =
            "Pause";


        kiAutoInfo.textContent =
            "Training läuft. Bewertet wird nach Checkpoints und Entfernung zum nächsten Zielpunkt.";


        if (kiAnimationsId === null) {

            kiAnimationsSchleife();
        }
    }
);


// ========================================
// PAUSE
// ========================================

kiAutoPause.addEventListener(
    "click",
    function() {

        if (!kiTrainingLaeuft) {

            kiAutoInfo.textContent =
                "Das Training wurde noch nicht gestartet.";

            return;
        }


        kiTrainingPausiert =
            !kiTrainingPausiert;


        if (kiTrainingPausiert) {

            kiAutoPause.textContent =
                "Fortsetzen";

            kiAutoInfo.textContent =
                "Training pausiert.";

        } else {

            kiAutoPause.textContent =
                "Pause";

            kiAutoInfo.textContent =
                "Training wird fortgesetzt.";
        }
    }
);


// ========================================
// NÄCHSTE GENERATION
// ========================================

kiAutoNaechsteGeneration.addEventListener(
    "click",
    function() {

        if (kiAutos.length === 0) {

            if (!kiEingabenLesen()) {

                return;
            }


            kiPopulationErzeugen();

        } else {

            kiNeueGenerationErzeugen();
        }


        kiAllesZeichnen();

        kiStatusAktualisieren();
    }
);


// ========================================
// RESET
// ========================================

kiAutoReset.addEventListener(
    "click",
    function() {

        kiTrainingLaeuft = false;

        kiTrainingPausiert = false;


        if (kiAnimationsId !== null) {

            cancelAnimationFrame(
                kiAnimationsId
            );

            kiAnimationsId = null;
        }


        kiAutos = [];

        kiZielAnkuenfte = [];

        kiSiegerAuto = null;


        kiGeneration = 1;

        kiGenerationFrame = 0;


        kiBestesNetz = null;

        kiBesteBewertungGlobal = null;


        kiAutoPopulationInput.disabled =
            false;

        kiAutoMutationInput.disabled =
            false;


        kiAutoPause.textContent =
            "Pause";


        kiAutoGenerationAnzeige.textContent =
            "1";

        kiAutoLebendAnzeige.textContent =
            "0 / "
            +
            kiAutoPopulationInput.value;

        kiAutoCheckpointAnzeige.textContent =
            "0 / "
            +
            kiAutoCheckpoints.length;

        kiAutoFitnessAnzeige.textContent =
            "-";


        kiAutoInfo.textContent =
            "Training zurückgesetzt. Die erste Generation erhält zufällige neuronale Netze.";


        kiStreckeZeichnen();
    }
);


// ========================================
// BEIM LADEN INITIALISIEREN
// ========================================

kiStreckeZeichnen();


kiAutoLebendAnzeige.textContent =
    "0 / "
    +
    kiAutoPopulationInput.value;


kiAutoCheckpointAnzeige.textContent =
    "0 / "
    +
    kiAutoCheckpoints.length;


kiAutoFitnessAnzeige.textContent =
    "-";