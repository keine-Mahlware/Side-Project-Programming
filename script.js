console.log("JavaScript funktioniert");

const button = document.getElementById("darkmode")
let roboterEasterEggGefunden = false;
let motorEasterEggGefunden = false;
button.addEventListener("click", function() {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        button.textContent = "Light Mode";       
    } else {
        button.textContent = "Dark Mode";
    }
})

const startButton = document.getElementById("start-button")
const stopButton  = document.getElementById("stop-button")
const anlagenStatus = document.getElementById("anlagen-status")
const handButton = document.getElementById("hand-betrieb")
const autoButton = document.getElementById("auto-betrieb")
const betrieb    = document.getElementById("betriebsart")
const notausButton = document.getElementById("not-aus")
const quitButton   = document.getElementById("quit-button")
const stoerungsStatus = document.getElementById("stoerungs-status")
const leuchteBetrieb = document.getElementById("lampe-betrieb")
const leuchteStop   = document.getElementById("lampe-stop")
const leuchteStoerung = document.getElementById("lampe-fehler")
const leuchteQuit   = document.getElementById("lampe-quit")
const motor = document.getElementById("motor")

let autoBetriebs = false; 
let anlageLaeuft = false;
let stoerung = false;
let motorDrehzahl = 0;
let motorWinkel = 0;
let motorKlickTimer = null;
let motorKlicks = 0;
let motorBrennt = false;

notausButton.addEventListener("click", function(){
    stoerung = true;
    anlageLaeuft = false;
    leuchteStoerung.style.backgroundColor = "red"
    leuchteBetrieb.style.backgroundColor = "white"
    leuchteStop.style.backgroundColor = "yellow"
    leuchteQuit.style.backgroundColor = "blue"
    anlagenStatus.textContent = "Anlage gestoppt"
    stoerungsStatus.textContent = "Störung Aktiv"
    motorStoppen();
})
quitButton.addEventListener("click", function(){
    if ( stoerung == true ){
        stoerung = false;
        leuchteStoerung.style.backgroundColor = "white"
        leuchteQuit.style.backgroundColor = "white"
        stoerungsStatus.textContent = "Keine Störung"
        anlagenStatus.textContent = "Anlage bereit"
    }
})

stopButton.addEventListener("click", function(){
    if (anlageLaeuft == true) {
        anlageLaeuft = false;
        leuchteBetrieb.style.backgroundColor = "white"
        leuchteStop.style.backgroundColor = "yellow"
        anlagenStatus.textContent = "Anlage gestoppt"
       motorStoppen();
    }
})
autoButton.addEventListener("click",function(){
    if (autoBetriebs == false) {
        autoBetriebs = true;
        if (stoerung == false) {
            leuchteStoerung.style.backgroundColor = "white"
            leuchteStop.style.backgroundColor = "yellow"
        }
        betrieb.textContent = "Betriebsart: AUTO"
        anlagenStatus.textContent = "Anlage bereit"
    }
})
startButton.addEventListener("click", function() {
    if (anlageLaeuft == false && autoBetriebs == false) {

        leuchteStoerung.style.backgroundColor = "red"
        anlagenStatus.textContent = "Start nicht möglich: Betriebsart HAND"
    }
    if (anlageLaeuft == false && autoBetriebs == true && stoerung == false && motorBrennt == false ) {
        anlageLaeuft = true;
        leuchteBetrieb.style.backgroundColor = "green"
        leuchteStop.style.backgroundColor = "white"
        anlagenStatus.textContent = "Anlage gestartet"
        motorDrehzahl = 10;
        motor.addEventListener("click", function() {

    if (anlageLaeuft === false) {
        return;
    }

    if (motorBrennt === true) {
        return;
    }

    motorKlicks++;

    console.log("Motor Klicks: " + motorKlicks);


    // Beim ersten Klick startet das Zeitfenster
    if (motorKlicks === 1) {

        motorKlickTimer = setTimeout(function() {

            motorKlicks = 0;
            motorKlickTimer = null;

            console.log("Motor Klicks zurückgesetzt");

        }, 4000);
    }


    // 5 Klicks innerhalb von 4 Sekunden
    if (motorKlicks >= 5) {

        clearTimeout(motorKlickTimer);

        motorKlickTimer = null;
        motorKlicks = 0;

        motorBrennt = true;
        motorEasterEggGefunden = true;

        document.querySelector(".flamme").style.zIndex = "50";

        anlageLaeuft = false;

        leuchteBetrieb.style.backgroundColor = "white";
        leuchteStop.style.backgroundColor = "yellow";
        leuchteStoerung.style.backgroundColor = "red";

        anlagenStatus.textContent = "Motor überhitzt";
        stoerungsStatus.textContent = "Motorstörung";

        motorStoppen();

        pruefeEasterEggs();
        }
        });
    }

    if (anlageLaeuft == false && autoBetriebs == true && stoerung == true ) {
        anlagenStatus.textContent = "Bitte Störung beseitigen & quittieren"
    }
})  
handButton.addEventListener("click",function(){
    if (autoBetriebs == true && anlageLaeuft == true) {
        autoBetriebs = false;
        anlageLaeuft = false;
        leuchteBetrieb.style.backgroundColor = "white"
        leuchteStop.style.backgroundColor = "yellow"
        anlagenStatus.textContent = "Anlage gestoppt"
        betrieb.textContent = "Betriebsart: HAND"
        motorStoppen();
    }
    if (autoBetriebs == true && anlageLaeuft == false) {
        autoBetriebs = false;
         betrieb.textContent = "Betriebsart: HAND"
    }
})
function motorStoppen() {
    if (motorDrehzahl > 0) {
        motorDrehzahl -= 0.15;
        setTimeout(motorStoppen, 10) 
    } else {
        motorDrehzahl = 0;
        motorKlicksZuruecksetzen();

     if (motorBrennt == false) {

            document.querySelector(
                ".flamme"
            ).style.zIndex = "-1";

    }
    }
}
function motorAnimation() {
    motorWinkel += motorDrehzahl;
    motor.style.transform = "rotate(" + motorWinkel + "deg)";
    requestAnimationFrame(motorAnimation);

}
function motorKlicksZuruecksetzen() {

    if (motorBrennt === true) {
        return;
    }

    motorKlicks = 0;

    clearTimeout(motorKlickTimer);

    motorKlickTimer = null;
}

motorAnimation();

const roboterSimulation =   document.getElementById("roboter-simulation");

const greifer = document.getElementById("greifer");

const wuerfel = document.getElementById("wuerfel");

const reset = document.getElementById("reset-roboter")

let roboterZyklusLaeuft = false;

reset.addEventListener("click",function(){
     if (roboterKaputt == true) {

        roboterKaputt = false;

        roboter.classList.remove("explodiert");

        roboterZyklusLaeuft = false;

        roboterZyklus();

    } else if (roboterZyklusLaeuft == false) {

        roboterZyklus();
    }
   
})
function warten(zeit) {
    return new Promise(function(resolve) {
        setTimeout(resolve, zeit);
    });
}
async function roboterZyklus() {

    if (roboterZyklusLaeuft == true) {
        return;
    }

    roboterZyklusLaeuft = true;

    /* Würfel auf P1 vorbereiten */
    roboterSimulation.appendChild(wuerfel);
    wuerfel.className = "wuerfel auf-p1";

    greifer.className = "greifer offen";

    /* Grundstellung */
    roboterSimulation.className =
        "roboter-simulation grundstellung";

    await warten(1400);

if (roboterKaputt) {
    return;
}

    /* P1 anfahren */
    roboterSimulation.className =
        "roboter-simulation fahre-p1";

    await warten(1400);

if (roboterKaputt) {
    return;
}

    /* Greifer schließen */
    greifer.className = "greifer geschlossen";

    await warten(500);

if (roboterKaputt) {
    return;
}

    /* Würfel mit dem Greifer verbinden */
    wuerfel.className = "wuerfel";
    greifer.appendChild(wuerfel);

    await warten(300);

if (roboterKaputt) {
    return;
}

    /* Würfel anheben */
    roboterSimulation.className =
        "roboter-simulation hebe-p1";

    await warten(1400);

if (roboterKaputt) {
    return;
}

    /* Durch die Mitte fahren */
    roboterSimulation.className =
        "roboter-simulation transport";

    await warten(1400);

if (roboterKaputt) {
    return;
}

    /* P2 anfahren */
    roboterSimulation.className =
        "roboter-simulation fahre-p2";

    await warten(1400);

if (roboterKaputt) {
    return;
}

    /* Würfel wieder in die Roboterfläche setzen */
    roboterSimulation.appendChild(wuerfel);
    wuerfel.className = "wuerfel auf-p2";

    /* Greifer öffnen */
    greifer.className = "greifer offen";

    await warten(700);

if (roboterKaputt) {
    return;
}

    /* Zur Grundstellung zurückfahren */
    roboterSimulation.className =
        "roboter-simulation grundstellung";

    await warten(1400);

if (roboterKaputt) {
    return;
}
    roboterZyklusLaeuft = false;
}
roboterZyklus();
 const roboter = document.getElementById("roboter");

let roboterKlicks = 0;
let klickTimer;
let roboterKaputt = false;

roboter.addEventListener("click", function() {

     if (roboterKaputt) {
        return;
    }
    roboterKlicks++;

    // Beim ersten Klick startet das 3-Sekunden-Fenster
    if (roboterKlicks === 1) {

        klickTimer = setTimeout(function() {
            roboterKlicks = 0;
        }, 5000);

    }

    // Easter Egg
    if (roboterKlicks >= 10) {

        clearTimeout(klickTimer);
        roboterKaputt = true;
        roboterZyklusLaeuft = true;
        roboterEasterEggGefunden = true;
        pruefeEasterEggs();
        roboter.classList.add("explodiert");

        roboterKlicks = 0;
    }

});
function istRoboterKaputt() {
    return roboterKaputt;
}

function pruefeEasterEggs() {

    if (
        roboterEasterEggGefunden == true &&
        motorEasterEggGefunden == true
    ) {

        document.getElementById("naechste-seite").style.display = "block";

    }
}
const naechsteSeite = document.getElementById("naechste-seite");
const levelTransition = document.getElementById("level-transition");
const seite1 = document.getElementById("seite1");
const seite2 = document.getElementById("seite2");
const zurueck = document.getElementById("zurueck");

naechsteSeite.addEventListener("click", async function() {

    // Übergang starten
    levelTransition.classList.add("aktiv");

    // Warten bis Bildschirm dunkel ist
    await warten(1400);

    // Seite wechseln während alles verdeckt ist
    document.body.classList.add("seite-2");

    // Animation fertig laufen lassen
    await warten(1400);

    levelTransition.classList.remove("aktiv");

});
zurueck.addEventListener(
    "click",
    hauptseiteZuruecksetzen
);
function hauptseiteZuruecksetzen() {

    /* Seitenwechsel */

    document.body.classList.remove("seite-2");

    seite2.style.display = "none";
    seite1.style.display = "block";


    /* Motor vollständig zurücksetzen */

    anlageLaeuft = false;
    motorDrehzahl = 0;

    motorBrennt = false;
    motorKlicks = 0;

    clearTimeout(motorKlickTimer);
    motorKlickTimer = null;


    const flamme =
        document.querySelector(".flamme");

    if (flamme !== null) {

        flamme.style.zIndex = "-1";

        flamme.style.display = "none";
    }


    /* Anzeigen zurücksetzen */

    stoerung = false;

    leuchteBetrieb.style.backgroundColor =
        "white";

    leuchteStop.style.backgroundColor =
        "yellow";

    leuchteStoerung.style.backgroundColor =
        "white";

    leuchteQuit.style.backgroundColor =
        "white";

    anlagenStatus.textContent =
        "Anlage bereit";

    stoerungsStatus.textContent =
        "Keine Störung";


    /* Roboter zurücksetzen */

    roboterKaputt = false;
    roboterZyklusLaeuft = false;

    roboter.classList.remove("explodiert");


    /* Master-Belohnung behandeln */

    if (
        zurueck.classList.contains(
            "kampagne-beenden"
        )
    ) {

        roboter.classList.add(
            "system-master"
        );
    }


    /* Roboterzyklus wieder starten */

    roboterZyklus();
}

    const flamme = document.querySelector(".flamme");

    if (flamme != null) {
        flamme.style.zIndex = "-1";
    }

    motorDrehzahl = 0;

    roboterKaputt = false;
    roboterZyklusLaeuft = false;

    roboter.classList.remove("explodiert");

    roboterZyklus();



naechsteSeite.addEventListener("click", function() {

    seite1.style.display = "none";
    seite2.style.display = "block";

});

zurueck.addEventListener("click", function() {

    seite2.style.display = "none";
    seite1.style.display = "block";

});

const stoerungen =
    document.querySelectorAll(".stoerung");

const spielStart =
    document.getElementById("spiel-start");

const spielZeit =
    document.getElementById("spiel-zeit");

const spielPunkte =
    document.getElementById("spiel-punkte");

const spielMeldung =
    document.getElementById("spiel-meldung");


let spiel2Freigeschaltet = false;

let punkte = 0;
let zeit = 25;

let spielLaeuft = false;

let aktiveStoerung = null;

let letzteStoerung = -1;

let spielTimer = null;

/* ===============================
   NEUE ZUFÄLLIGE STÖRUNG
================================ */

function neueStoerung() {

    // Alte Lampe ausschalten
    if (aktiveStoerung != null) {

        aktiveStoerung.classList.remove("aktiv");

    }


    let zufall;

    // Zufällige Lampe auswählen
    // Sie darf NICHT die gleiche wie vorher sein

    do {

        zufall = Math.floor(
            Math.random() * stoerungen.length
        );

    } while (zufall === letzteStoerung);


    // Nummer merken
    letzteStoerung = zufall;


    // Neue Lampe auswählen
    aktiveStoerung = stoerungen[zufall];


    // Einschalten
    aktiveStoerung.classList.add("aktiv");
}


/* ===============================
   LAMPEN ANKLICKEN
================================ */

stoerungen.forEach(function(stoerung) {

    stoerung.addEventListener("click", function() {

        // Spiel läuft nicht
        if (spielLaeuft == false) {
            return;
        }


        // Richtige Lampe getroffen
        if (stoerung === aktiveStoerung) {

            punkte++;

            spielPunkte.textContent = punkte;

            if (punkte >= 40 && spiel2Freigeschaltet == false) {

            spiel2Freigeschaltet = true;
            spiel2Freischalten();
            }
            // Aktuelle Lampe ausschalten
            stoerung.classList.remove("aktiv");


            // Neue Lampe auswählen
            neueStoerung();

        }

    });

});


/* ===============================
   SPIEL STARTEN
================================ */

spielStart.addEventListener("click", function() {

    // Verhindert mehrfaches Starten
    if (spielLaeuft == true) {
        return;
    }


    /* Spiel zurücksetzen */

    punkte = 0;

    zeit = 25;

    letzteStoerung = -1;


    spielPunkte.textContent = punkte;

    spielZeit.textContent = zeit;


    spielMeldung.textContent =
        "⚠ STÖRUNGEN ERKANNT ⚠";


    spielLaeuft = true;


    /* Erste Lampe aktivieren */

    neueStoerung();


    /* ============================
       TIMER
    ============================ */

    spielTimer = setInterval(function() {

        zeit--;

        spielZeit.textContent = zeit;


        /* Zeit abgelaufen */

        if (zeit <= 0) {

            clearInterval(spielTimer);

            spielLaeuft = false;


            /* Aktive Lampe ausschalten */

            if (aktiveStoerung != null) {

                aktiveStoerung.classList.remove("aktiv");

                aktiveStoerung = null;

            }


            /* Ergebnis */

            spielMeldung.textContent =
                "SYSTEM STABILISIERT – " +
                punkte +
                " Punkte";

        }

    }, 1000);

});

/* ==================================
   SPIEL 2: ROBOTER-AUSWEICHSPIEL
================================== */

const spiel2Bereich =
    document.getElementById("spiel2");

const spiel2Feld =
    document.getElementById("spiel2-feld");

const spiel2Roboter =
    document.getElementById("spiel2-roboter");

const spiel2Start =
    document.getElementById("spiel2-start");

const spiel2PunkteAnzeige =
    document.getElementById("spiel2-punkte");

const spiel2LebenAnzeige =
    document.getElementById("spiel2-leben");

const spiel2Meldung =
    document.getElementById("spiel2-meldung");

const spiel2Links =
    document.getElementById("spiel2-links");

const spiel2Rechts =
    document.getElementById("spiel2-rechts");


let spiel2Laeuft = false;

let spiel2Punkte = 0;
let spiel2Leben = 3;
let spiel3Freigeschaltet = false;
let roboterPosition = 0;
let bewegungsRichtung = 0;

let hindernisse = [];

let hindernisTimer = null;
let spiel2AnimationsId = null;

let letzterAnimationsZeitpunkt = 0;
let letzterTrefferZeitpunkt = 0;

let fallGeschwindigkeit = 170;
let spawnZeit = 900;


/* ==================================
   SPIEL 2 FREISCHALTEN
================================== */

function spiel2Freischalten() {

    spiel2Bereich.classList.remove(
        "spiel2-versteckt"
    );

    spiel2Bereich.classList.add(
        "spiel2-sichtbar"
    );

    spiel2Meldung.textContent =
        "🔓 BONUS LEVEL FREIGESCHALTET!";
}
function spiel2Zuruecksetzen() {

    spiel2Punkte = 0;
    spiel2Leben = 3;

    fallGeschwindigkeit = 170;
    spawnZeit = 900;

    spiel2PunkteAnzeige.textContent =
        spiel2Punkte;

    spiel2LebenAnzeige.textContent =
        spiel2Leben;


    /* Alte Werkstücke entfernen */

    hindernisse.forEach(function(hindernis) {

        hindernis.element.remove();

    });

    hindernisse = [];


    /* Roboter mittig positionieren */

    const feldBreite =
        spiel2Feld.clientWidth;

    const roboterBreite =
        spiel2Roboter.offsetWidth;

    roboterPosition =
        (feldBreite - roboterBreite) / 2;

    spiel2Roboter.style.left =
        roboterPosition + "px";


    bewegungsRichtung = 0;
    letzterTrefferZeitpunkt = 0;
}
function hindernisErstellen() {

    if (spiel2Laeuft == false) {
        return;
    }

    const hindernis =
        document.createElement("div");

    hindernis.className =
        "spiel2-hindernis";

    hindernis.textContent = "⚙";


    const hindernisBreite = 42;

    const maximalePosition =
        spiel2Feld.clientWidth -
        hindernisBreite;

    const zufaelligePosition =
        Math.random() * maximalePosition;


    hindernis.style.left =
        zufaelligePosition + "px";

    hindernis.style.top =
        "-50px";


    spiel2Feld.appendChild(hindernis);


    hindernisse.push({

        element: hindernis,

        y: -50,

        rotation: 0,

        geschwindigkeit:
            fallGeschwindigkeit +
            Math.random() * 60

    });
}
function kollidiert(element1, element2) {

    const rechteck1 =
        element1.getBoundingClientRect();

    const rechteck2 =
        element2.getBoundingClientRect();


    return !(
        rechteck1.right < rechteck2.left ||
        rechteck1.left > rechteck2.right ||
        rechteck1.bottom < rechteck2.top ||
        rechteck1.top > rechteck2.bottom
    );
}
function roboterBewegen(deltaZeit) {

    const geschwindigkeit = 330;

    roboterPosition +=
        bewegungsRichtung *
        geschwindigkeit *
        deltaZeit;


    const maximalePosition =
        spiel2Feld.clientWidth -
        spiel2Roboter.offsetWidth;


    if (roboterPosition < 0) {
        roboterPosition = 0;
    }

    if (roboterPosition > maximalePosition) {
        roboterPosition = maximalePosition;
    }


    spiel2Roboter.style.left =
        roboterPosition + "px";
}

function roboterGetroffen() {

    const jetzt = performance.now();


    /* Verhindert mehrere Treffer
       durch dasselbe Werkstück */

    if (
        jetzt - letzterTrefferZeitpunkt <
        700
    ) {
        return;
    }


    letzterTrefferZeitpunkt = jetzt;

    spiel2Leben--;

    spiel2LebenAnzeige.textContent =
        spiel2Leben;


    spiel2Roboter.classList.remove(
        "getroffen"
    );

    void spiel2Roboter.offsetWidth;

    spiel2Roboter.classList.add(
        "getroffen"
    );


    spiel2Meldung.textContent =
        "⚠ KOLLISION! Noch " +
        spiel2Leben +
        " Leben";


    if (spiel2Leben <= 0) {
        spiel2Beenden();
    }
}
function spiel2Animation(zeitstempel) {

    if (spiel2Laeuft == false) {
        return;
    }


    if (letzterAnimationsZeitpunkt === 0) {

        letzterAnimationsZeitpunkt =
            zeitstempel;

    }


    let deltaZeit =
        (zeitstempel -
        letzterAnimationsZeitpunkt) /
        1000;


    /* Verhindert große Sprünge,
       wenn der Browser-Tab kurz inaktiv war */

    if (deltaZeit > 0.05) {
        deltaZeit = 0.05;
    }


    letzterAnimationsZeitpunkt =
        zeitstempel;


    roboterBewegen(deltaZeit);


    for (
        let index = hindernisse.length - 1;
        index >= 0;
        index--
    ) {

        const hindernis =
            hindernisse[index];


        hindernis.y +=
            hindernis.geschwindigkeit *
            deltaZeit;

        hindernis.rotation +=
            180 * deltaZeit;


        hindernis.element.style.top =
            hindernis.y + "px";

        hindernis.element.style.transform =
            "rotate(" +
            hindernis.rotation +
            "deg)";


        /* Kollision */

        if (
            kollidiert(
                hindernis.element,
                spiel2Roboter
            )
        ) {

            roboterGetroffen();

            hindernis.element.remove();

            hindernisse.splice(index, 1);

            continue;
        }


        /* Werkstück erfolgreich ausgewichen */

        if (
            hindernis.y >
            spiel2Feld.clientHeight
        ) {

            spiel2Punkte++;

            spiel2PunkteAnzeige.textContent =
                spiel2Punkte;

            if (
                spiel2Punkte >= 100 &&
                spiel3Freigeschaltet === false
                ) {

                spiel3Freigeschaltet = true;

                spiel3Freischalten();
            }
            hindernis.element.remove();

            hindernisse.splice(index, 1);


            /* Spiel wird langsam schneller */

            if (spiel2Punkte % 5 === 0) {

                fallGeschwindigkeit += 20;

                spiel2Meldung.textContent =
                    "⚡ Geschwindigkeit erhöht!";

            }
        }
    }


    spiel2AnimationsId =
        requestAnimationFrame(
            spiel2Animation
        );
}
function spawnTimerStarten() {

    clearInterval(hindernisTimer);


    hindernisTimer =
        setInterval(function() {

            hindernisErstellen();

        }, spawnZeit);
}
function spiel2Starten() {

    if (spiel2Laeuft == true) {
        return;
    }


    spiel2Zuruecksetzen();

    spiel2Laeuft = true;

    letzterAnimationsZeitpunkt = 0;


    spiel2Meldung.textContent =
        "⚠ WERKSTÜCKE FALLEN ⚠";

    spiel2Start.textContent =
        "SPIEL LÄUFT";


    hindernisErstellen();

    spawnTimerStarten();


    spiel2AnimationsId =
        requestAnimationFrame(
            spiel2Animation
        );
}
function spiel2Beenden() {

    spiel2Laeuft = false;

    bewegungsRichtung = 0;


    clearInterval(hindernisTimer);

    cancelAnimationFrame(
        spiel2AnimationsId
    );


    hindernisse.forEach(function(hindernis) {

        hindernis.element.remove();

    });

    hindernisse = [];


    spiel2Meldung.textContent =
        "GAME OVER – " +
        spiel2Punkte +
        " Punkte";

    spiel2Start.textContent =
        "NOCH EINMAL";
}
spiel2Start.addEventListener(
    "click",
    function() {

        spiel2Starten();

    }
);
document.addEventListener(
    "keydown",
    function(event) {

        if (spiel2Laeuft == false) {
            return;
        }


        if (
            event.key === "ArrowLeft" ||
            event.key.toLowerCase() === "a"
        ) {

            event.preventDefault();

            bewegungsRichtung = -1;

        }


        if (
            event.key === "ArrowRight" ||
            event.key.toLowerCase() === "d"
        ) {

            event.preventDefault();

            bewegungsRichtung = 1;

        }

    }
);


document.addEventListener(
    "keyup",
    function(event) {

        if (
            event.key === "ArrowLeft" ||
            event.key.toLowerCase() === "a"
        ) {

            if (bewegungsRichtung === -1) {
                bewegungsRichtung = 0;
            }

        }


        if (
            event.key === "ArrowRight" ||
            event.key.toLowerCase() === "d"
        ) {

            if (bewegungsRichtung === 1) {
                bewegungsRichtung = 0;
            }

        }

    }
);
function bewegungLinksStarten(event) {

    event.preventDefault();

    if (spiel2Laeuft) {
        bewegungsRichtung = -1;
    }
}


function bewegungRechtsStarten(event) {

    event.preventDefault();

    if (spiel2Laeuft) {
        bewegungsRichtung = 1;
    }
}


function bewegungStoppen(event) {

    event.preventDefault();

    bewegungsRichtung = 0;
}


spiel2Links.addEventListener(
    "pointerdown",
    bewegungLinksStarten
);

spiel2Rechts.addEventListener(
    "pointerdown",
    bewegungRechtsStarten
);

spiel2Links.addEventListener(
    "pointerup",
    bewegungStoppen
);

spiel2Rechts.addEventListener(
    "pointerup",
    bewegungStoppen
);

spiel2Links.addEventListener(
    "pointerleave",
    bewegungStoppen
);

spiel2Rechts.addEventListener(
    "pointerleave",
    bewegungStoppen
);

spiel2Links.addEventListener(
    "pointercancel",
    bewegungStoppen
);

spiel2Rechts.addEventListener(
    "pointercancel",
    bewegungStoppen
);


/* =========================================
   LEVEL 3: COMBAT PROTOCOL
========================================= */

const spiel3Bereich =
    document.getElementById("spiel3");

const spiel3Feld =
    document.getElementById("spiel3-feld");

const spiel3Spieler =
    document.getElementById("spiel3-spieler");

const spiel3Start =
    document.getElementById("spiel3-start");

const spiel3Links =
    document.getElementById("spiel3-links");

const spiel3Rechts =
    document.getElementById("spiel3-rechts");

const spiel3Schiessen =
    document.getElementById("spiel3-schiessen");

const spiel3PunkteAnzeige =
    document.getElementById("spiel3-punkte");

const spiel3LebenAnzeige =
    document.getElementById("spiel3-leben");

const spiel3BossLebenAnzeige =
    document.getElementById("spiel3-boss-leben");

const spiel3Meldung =
    document.getElementById("spiel3-meldung");

const spiel3Boss =
    document.getElementById("spiel3-boss");

const bossLebensanzeige =
    document.getElementById("boss-lebensanzeige");

const spiel4Bereich =
    document.getElementById("spiel4");


let spiel4Freigeschaltet = false;

let spiel3Laeuft = false;

let spiel3Punkte = 0;
let spiel3Leben = 3;

let spiel3SpielerPosition = 0;
let spiel3BewegungsRichtung = 0;

let spiel3Projektile = [];
let spiel3Gegner = [];
let spiel3BossProjektile = [];

let spiel3AnimationsId = null;

let spiel3LetzteZeit = 0;
let spiel3LetzteSpawnZeit = 0;
let spiel3LetzterSchuss = 0;
let spiel3LetzterTreffer = 0;

let spiel3BossAktiv = false;
let spiel3BossBesiegt = false;

let spiel3BossLeben = 30;
const spiel3BossMaxLeben = 30;

let spiel3BossPosition = 0;
let spiel3BossRichtung = 1;
let spiel3BossLetzterSchuss = 0;


/* =========================================
   MULTIPLIKATION OHNE OPERATOR
========================================= */

function spiel3Mal(wert1, wert2) {

    if (wert1 === 0 || wert2 === 0) {
        return 0;
    }

    return wert1 / (1 / wert2);
}


/* =========================================
   PRÜFEN, OB ALLE HTML-ELEMENTE EXISTIEREN
========================================= */

function spiel3ElementeVorhanden() {

    return (
        spiel3Bereich !== null &&
        spiel3Feld !== null &&
        spiel3Spieler !== null &&
        spiel3Start !== null &&
        spiel3Links !== null &&
        spiel3Rechts !== null &&
        spiel3Schiessen !== null &&
        spiel3PunkteAnzeige !== null &&
        spiel3LebenAnzeige !== null &&
        spiel3BossLebenAnzeige !== null &&
        spiel3Meldung !== null &&
        spiel3Boss !== null &&
        bossLebensanzeige !== null
    );
}


/* =========================================
   LEVEL 3 FREISCHALTEN
========================================= */

function spiel3Freischalten() {

    if (spiel3ElementeVorhanden() === false) {

        console.error(
            "Mindestens ein HTML-Element von Level 3 fehlt."
        );

        return;
    }

    spiel3Bereich.classList.remove(
        "spiel3-versteckt"
    );

    spiel3Bereich.classList.add(
        "spiel3-sichtbar"
    );

    spiel3Meldung.textContent =
        "COMBAT PROTOCOL FREIGESCHALTET";
}


/* =========================================
   KOLLISIONSPRÜFUNG
========================================= */

function spiel3Kollidiert(element1, element2) {

    if (
        element1 === null ||
        element2 === null ||
        element1.isConnected === false ||
        element2.isConnected === false
    ) {
        return false;
    }

    const rechteck1 =
        element1.getBoundingClientRect();

    const rechteck2 =
        element2.getBoundingClientRect();

    return !(
        rechteck1.right < rechteck2.left ||
        rechteck1.left > rechteck2.right ||
        rechteck1.bottom < rechteck2.top ||
        rechteck1.top > rechteck2.bottom
    );
}


/* =========================================
   ALLE SPIELELEMENTE ENTFERNEN
========================================= */

function spiel3ElementeEntfernen() {

    spiel3Projektile.forEach(function(projektil) {

        if (projektil.element.isConnected) {
            projektil.element.remove();
        }
    });

    spiel3Gegner.forEach(function(gegner) {

        if (gegner.element.isConnected) {
            gegner.element.remove();
        }
    });

    spiel3BossProjektile.forEach(function(projektil) {

        if (projektil.element.isConnected) {
            projektil.element.remove();
        }
    });

    spiel3Projektile = [];
    spiel3Gegner = [];
    spiel3BossProjektile = [];
}


/* =========================================
   LEVEL 3 ZURÜCKSETZEN
========================================= */

function spiel3Zuruecksetzen() {

    spiel3ElementeEntfernen();

    spiel3Punkte = 0;
    spiel3Leben = 3;

    spiel3BossAktiv = false;
    spiel3BossBesiegt = false;
    spiel3BossLeben = spiel3BossMaxLeben;

    spiel3PunkteAnzeige.textContent =
        spiel3Punkte;

    spiel3LebenAnzeige.textContent =
        spiel3Leben;

    spiel3BossLebenAnzeige.textContent =
        "GESPERRT";

    bossLebensanzeige.style.width =
        "100%";

    spiel3Boss.classList.remove(
        "aktiv",
        "phase-2",
        "phase-3"
    );

    const feldBreite =
        spiel3Feld.clientWidth;

    const spielerBreite =
        spiel3Spieler.offsetWidth;

    spiel3SpielerPosition =
        (feldBreite - spielerBreite) / 2;

    spiel3Spieler.style.left =
        spiel3SpielerPosition + "px";

    spiel3BewegungsRichtung = 0;

    spiel3LetzteZeit = 0;
    spiel3LetzteSpawnZeit = 0;
    spiel3LetzterSchuss = 0;
    spiel3LetzterTreffer = 0;

    spiel3BossLetzterSchuss = 0;
    spiel3BossRichtung = 1;
}


/* =========================================
   SPIELER BEWEGEN
========================================= */

function spiel3SpielerBewegen(deltaZeit) {

    const geschwindigkeit = 360;

    const bewegung =
        spiel3Mal(
            spiel3BewegungsRichtung,
            spiel3Mal(
                geschwindigkeit,
                deltaZeit
            )
        );

    spiel3SpielerPosition += bewegung;

    const maximalePosition =
        spiel3Feld.clientWidth -
        spiel3Spieler.offsetWidth;

    if (spiel3SpielerPosition < 0) {
        spiel3SpielerPosition = 0;
    }

    if (
        spiel3SpielerPosition >
        maximalePosition
    ) {
        spiel3SpielerPosition =
            maximalePosition;
    }

    spiel3Spieler.style.left =
        spiel3SpielerPosition + "px";
}


/* =========================================
   SPIELER SCHIESST
========================================= */

function spiel3Feuern() {

    if (spiel3Laeuft === false) {
        return;
    }

    const jetzt = performance.now();

    if (
        jetzt - spiel3LetzterSchuss <
        250
    ) {
        return;
    }

    spiel3LetzterSchuss = jetzt;

    const projektil =
        document.createElement("div");

    projektil.className =
        "spiel3-projektil";

    const x =
        spiel3SpielerPosition +
        spiel3Spieler.offsetWidth / 2 -
        3;

    const y =
        spiel3Feld.clientHeight -
        85;

    projektil.style.left = x + "px";
    projektil.style.top = y + "px";

    spiel3Feld.appendChild(projektil);

    spiel3Projektile.push({
        element: projektil,
        x: x,
        y: y,
        geschwindigkeit: 480
    });
}


/* =========================================
   GEGNER ERSTELLEN
========================================= */

function spiel3GegnerErstellen() {

    if (
        spiel3Laeuft === false ||
        spiel3BossAktiv === true
    ) {
        return;
    }

    const gegner =
        document.createElement("div");

    gegner.className =
        "spiel3-gegner";

    gegner.textContent = "⚙";

    const gegnerBreite = 46;

    const maximalePosition =
        spiel3Feld.clientWidth -
        gegnerBreite;

    const zufaelligePosition =
        Math.random() /
        (1 / maximalePosition);

    gegner.style.left =
        zufaelligePosition + "px";

    gegner.style.top =
        "-55px";

    spiel3Feld.appendChild(gegner);

    const zufaelligeGeschwindigkeit =
        Math.random() / (1 / 65);

    spiel3Gegner.push({
        element: gegner,
        x: zufaelligePosition,
        y: -55,
        rotation: 0,
        geschwindigkeit:
            100 +
            zufaelligeGeschwindigkeit
    });
}


/* =========================================
   SPIELER WIRD GETROFFEN
========================================= */

function spiel3SpielerGetroffen() {

    const jetzt = performance.now();

    if (
        jetzt - spiel3LetzterTreffer <
        800
    ) {
        return;
    }

    spiel3LetzterTreffer = jetzt;

    spiel3Leben--;

    spiel3LebenAnzeige.textContent =
        spiel3Leben;

    spiel3Spieler.classList.remove(
        "getroffen"
    );

    void spiel3Spieler.offsetWidth;

    spiel3Spieler.classList.add(
        "getroffen"
    );

    spiel3Meldung.textContent =
        "TREFFER! Noch " +
        spiel3Leben +
        " Leben";

    if (spiel3Leben <= 0) {
        spiel3Beenden(false);
    }
}


/* =========================================
   BOSS STARTEN
========================================= */

function spiel3BossStarten() {

    if (
        spiel3BossAktiv === true ||
        spiel3BossBesiegt === true
    ) {
        return;
    }

    spiel3BossAktiv = true;
    spiel3BossLeben = spiel3BossMaxLeben;

    spiel3Boss.classList.add("aktiv");

    const bossBreite =
        spiel3Boss.offsetWidth;

    spiel3BossPosition =
        (
            spiel3Feld.clientWidth -
            bossBreite
        ) / 2;

    spiel3BossRichtung = 1;

    spiel3Boss.style.left =
        spiel3BossPosition + "px";

    spiel3BossLebenAnzeige.textContent =
        spiel3BossLeben +
        " / " +
        spiel3BossMaxLeben;

    bossLebensanzeige.style.width =
        "100%";

    spiel3Meldung.textContent =
        "BOSS WARNING: CORRUPTED CONTROL UNIT";

    spiel3Gegner.forEach(function(gegner) {

        if (gegner.element.isConnected) {
            gegner.element.remove();
        }
    });

    spiel3Gegner = [];
}


/* =========================================
   BOSS BEWEGEN
========================================= */

function spiel3BossBewegen(deltaZeit) {

    if (spiel3BossAktiv === false) {
        return;
    }

    let geschwindigkeit = 105;

    if (spiel3BossLeben <= 13) {

        geschwindigkeit = 150;

        spiel3Boss.classList.add(
            "phase-2"
        );
    }

    if (spiel3BossLeben <= 6) {

        geschwindigkeit = 220;

        spiel3Boss.classList.add(
            "phase-3"
        );
    }

    const bewegung =
        spiel3Mal(
            spiel3BossRichtung,
            spiel3Mal(
                geschwindigkeit,
                deltaZeit
            )
        );

    spiel3BossPosition += bewegung;

    const maximalePosition =
        spiel3Feld.clientWidth -
        spiel3Boss.offsetWidth;

    if (spiel3BossPosition <= 0) {

        spiel3BossPosition = 0;
        spiel3BossRichtung = 1;
    }

    if (
        spiel3BossPosition >=
        maximalePosition
    ) {
        spiel3BossPosition =
            maximalePosition;

        spiel3BossRichtung = -1;
    }

    spiel3Boss.style.left =
        spiel3BossPosition + "px";
}


/* =========================================
   BOSS SCHIESST
========================================= */

function spiel3BossFeuern(zeitstempel) {

    if (spiel3BossAktiv === false) {
        return;
    }

    let schussPause = 1150;

    if (spiel3BossLeben <= 13) {
        schussPause = 800;
    }

    if (spiel3BossLeben <= 6) {
        schussPause = 480;
    }

    if (
        zeitstempel -
        spiel3BossLetzterSchuss <
        schussPause
    ) {
        return;
    }

    spiel3BossLetzterSchuss =
        zeitstempel;

    const projektil =
        document.createElement("div");

    projektil.className =
        "spiel3-boss-projektil";

    const x =
        spiel3BossPosition +
        spiel3Boss.offsetWidth / 2 -
        6;

    const y =
        spiel3Boss.offsetTop +
        spiel3Boss.offsetHeight;

    projektil.style.left = x + "px";
    projektil.style.top = y + "px";

    spiel3Feld.appendChild(projektil);

    spiel3BossProjektile.push({
        element: projektil,
        x: x,
        y: y,
        geschwindigkeit: 265
    });
}


/* =========================================
   BOSS TREFFEN
========================================= */

function spiel3BossTreffen() {

    if (spiel3BossAktiv === false) {
        return;
    }

    spiel3BossLeben--;

    if (spiel3BossLeben < 0) {
        spiel3BossLeben = 0;
    }

    spiel3BossLebenAnzeige.textContent =
        spiel3BossLeben +
        " / " +
        spiel3BossMaxLeben;

    const prozent =
        spiel3BossLeben /
        spiel3BossMaxLeben /
        0.01;

    bossLebensanzeige.style.width =
        prozent + "%";

    if (spiel3BossLeben <= 0) {
        spiel3BossBesiegen();
    }
}


/* =========================================
   BOSS BESIEGEN
========================================= */

function spiel3BossBesiegen() {

    spiel3BossAktiv = false;
    spiel3BossBesiegt = true;

    spiel3Boss.classList.remove(
        "aktiv",
        "phase-2",
        "phase-3"
    );

    spiel3BossProjektile.forEach(
        function(projektil) {

            if (projektil.element.isConnected) {
                projektil.element.remove();
            }
        }
    );

    spiel3BossProjektile = [];

    spiel3Meldung.textContent =
        "BOSS DEFEATED – SYSTEM GERETTET";

    spiel4Freischalten();

    spiel3Beenden(true);
}


/* =========================================
   LEVEL 4 FREISCHALTEN
========================================= */

function spiel4Freischalten() {

    if (spiel4Freigeschaltet === true) {
        return;
    }

    spiel4Freigeschaltet = true;

    if (spiel4Bereich === null) {

        console.error(
            "Das HTML-Element spiel4 fehlt."
        );

        return;
    }

    spiel4Bereich.classList.remove(
        "spiel4-versteckt"
    );

    spiel4Bereich.classList.add(
        "spiel4-sichtbar"
    );
}


/* =========================================
   PROJEKTILE DES SPIELERS AKTUALISIEREN
========================================= */

function spiel3ProjektileAktualisieren(
    deltaZeit
) {

    for (
        let index =
            spiel3Projektile.length - 1;

        index >= 0;

        index--
    ) {

        const projektil =
            spiel3Projektile[index];

        projektil.y -= spiel3Mal(
            projektil.geschwindigkeit,
            deltaZeit
        );

        projektil.element.style.top =
            projektil.y + "px";

        let projektilEntfernt = false;

        for (
            let gegnerIndex =
                spiel3Gegner.length - 1;

            gegnerIndex >= 0;

            gegnerIndex--
        ) {

            const gegner =
                spiel3Gegner[gegnerIndex];

            if (
                spiel3Kollidiert(
                    projektil.element,
                    gegner.element
                )
            ) {

                projektil.element.remove();
                gegner.element.remove();

                spiel3Projektile.splice(
                    index,
                    1
                );

                spiel3Gegner.splice(
                    gegnerIndex,
                    1
                );

                spiel3Punkte++;

                spiel3PunkteAnzeige.textContent =
                    spiel3Punkte;

                projektilEntfernt = true;

                if (
                    spiel3Punkte >= 20 &&
                    spiel3BossAktiv === false &&
                    spiel3BossBesiegt === false
                ) {
                    spiel3BossStarten();
                }

                break;
            }
        }

        if (projektilEntfernt === true) {
            continue;
        }

        if (
            spiel3BossAktiv === true &&
            spiel3Kollidiert(
                projektil.element,
                spiel3Boss
            )
        ) {

            projektil.element.remove();

            spiel3Projektile.splice(
                index,
                1
            );

            spiel3BossTreffen();

            continue;
        }

        if (projektil.y < -30) {

            projektil.element.remove();

            spiel3Projektile.splice(
                index,
                1
            );
        }
    }
}


/* =========================================
   GEGNER AKTUALISIEREN
========================================= */

function spiel3GegnerAktualisieren(
    deltaZeit
) {

    for (
        let index =
            spiel3Gegner.length - 1;

        index >= 0;

        index--
    ) {

        const gegner =
            spiel3Gegner[index];

        gegner.y += spiel3Mal(
            gegner.geschwindigkeit,
            deltaZeit
        );

        gegner.rotation += spiel3Mal(
            140,
            deltaZeit
        );

        gegner.element.style.top =
            gegner.y + "px";

        gegner.element.style.transform =
            "rotate(" +
            gegner.rotation +
            "deg)";

        if (
            spiel3Kollidiert(
                gegner.element,
                spiel3Spieler
            )
        ) {

            gegner.element.remove();

            spiel3Gegner.splice(
                index,
                1
            );

            spiel3SpielerGetroffen();

            continue;
        }

        if (
            gegner.y >
            spiel3Feld.clientHeight
        ) {

            gegner.element.remove();

            spiel3Gegner.splice(
                index,
                1
            );

            spiel3SpielerGetroffen();
        }
    }
}


/* =========================================
   BOSSPROJEKTILE AKTUALISIEREN
========================================= */

function spiel3BossProjektileAktualisieren(
    deltaZeit
) {

    for (
        let index =
            spiel3BossProjektile.length - 1;

        index >= 0;

        index--
    ) {

        const projektil =
            spiel3BossProjektile[index];

        projektil.y += spiel3Mal(
            projektil.geschwindigkeit,
            deltaZeit
        );

        projektil.element.style.top =
            projektil.y + "px";

        if (
            spiel3Kollidiert(
                projektil.element,
                spiel3Spieler
            )
        ) {

            projektil.element.remove();

            spiel3BossProjektile.splice(
                index,
                1
            );

            spiel3SpielerGetroffen();

            continue;
        }

        if (
            projektil.y >
            spiel3Feld.clientHeight
        ) {

            projektil.element.remove();

            spiel3BossProjektile.splice(
                index,
                1
            );
        }
    }
}


/* =========================================
   HAUPTANIMATION
========================================= */

function spiel3Animation(zeitstempel) {

    if (spiel3Laeuft === false) {
        return;
    }

    if (spiel3LetzteZeit === 0) {
        spiel3LetzteZeit = zeitstempel;
    }

    let deltaZeit =
        (
            zeitstempel -
            spiel3LetzteZeit
        ) / 1000;

    if (deltaZeit > 0.05) {
        deltaZeit = 0.05;
    }

    spiel3LetzteZeit = zeitstempel;

    spiel3SpielerBewegen(deltaZeit);

    if (
        spiel3BossAktiv === false &&
        zeitstempel -
        spiel3LetzteSpawnZeit >
        850
    ) {

        spiel3LetzteSpawnZeit =
            zeitstempel;

        spiel3GegnerErstellen();
    }

    spiel3ProjektileAktualisieren(
        deltaZeit
    );

    spiel3GegnerAktualisieren(
        deltaZeit
    );

    if (spiel3BossAktiv === true) {

        spiel3BossBewegen(deltaZeit);

        spiel3BossFeuern(zeitstempel);
    }

    spiel3BossProjektileAktualisieren(
        deltaZeit
    );

    if (spiel3Laeuft === true) {

        spiel3AnimationsId =
            requestAnimationFrame(
                spiel3Animation
            );
    }
}


/* =========================================
   LEVEL 3 STARTEN
========================================= */

function spiel3Starten() {

    if (spiel3Laeuft === true) {
        return;
    }

    if (spiel3ElementeVorhanden() === false) {

        console.error(
            "Level 3 kann nicht gestartet werden."
        );

        return;
    }

    spiel3Zuruecksetzen();

    spiel3Laeuft = true;
    spiel3LetzteZeit = 0;

    spiel3Meldung.textContent =
        "FEINDLICHE MASCHINEN ERKANNT";

    spiel3Start.textContent =
        "LEVEL LÄUFT";

    spiel3AnimationsId =
        requestAnimationFrame(
            spiel3Animation
        );
}


/* =========================================
   LEVEL 3 BEENDEN
========================================= */

function spiel3Beenden(gewonnen) {

    spiel3Laeuft = false;
    spiel3BewegungsRichtung = 0;

    if (spiel3AnimationsId !== null) {

        cancelAnimationFrame(
            spiel3AnimationsId
        );
    }

    spiel3ElementeEntfernen();

    if (gewonnen === true) {

        spiel3Meldung.textContent =
            "BOSS DEFEATED – LEVEL 4 FREIGESCHALTET";

        spiel3Start.textContent =
            "ERNEUT SPIELEN";

    } else {

        spiel3Meldung.textContent =
            "GAME OVER – " +
            spiel3Punkte +
            " Punkte";

        spiel3Start.textContent =
            "NOCH EINMAL";
    }
}


/* =========================================
   STARTKNOPF
========================================= */

if (spiel3Start !== null) {

    spiel3Start.addEventListener(
        "click",
        function() {

            spiel3Starten();
        }
    );
}


/* =========================================
   TASTATURSTEUERUNG
========================================= */

document.addEventListener(
    "keydown",
    function(event) {

        if (spiel3Laeuft === false) {
            return;
        }

        const taste =
            event.key.toLowerCase();

        if (
            event.key === "ArrowLeft" ||
            taste === "a"
        ) {

            event.preventDefault();

            spiel3BewegungsRichtung = -1;
        }

        if (
            event.key === "ArrowRight" ||
            taste === "d"
        ) {

            event.preventDefault();

            spiel3BewegungsRichtung = 1;
        }

        if (event.code === "Space") {

            event.preventDefault();

            spiel3Feuern();
        }
    }
);


document.addEventListener(
    "keyup",
    function(event) {

        const taste =
            event.key.toLowerCase();

        if (
            event.key === "ArrowLeft" ||
            taste === "a"
        ) {

            if (
                spiel3BewegungsRichtung === -1
            ) {
                spiel3BewegungsRichtung = 0;
            }
        }

        if (
            event.key === "ArrowRight" ||
            taste === "d"
        ) {

            if (
                spiel3BewegungsRichtung === 1
            ) {
                spiel3BewegungsRichtung = 0;
            }
        }
    }
);


/* =========================================
   BILDSCHIRMTASTEN
========================================= */

function spiel3BewegungStoppen(event) {

    event.preventDefault();

    spiel3BewegungsRichtung = 0;
}


if (
    spiel3Links !== null &&
    spiel3Rechts !== null &&
    spiel3Schiessen !== null
) {

    spiel3Links.addEventListener(
        "pointerdown",
        function(event) {

            event.preventDefault();

            if (spiel3Laeuft === true) {
                spiel3BewegungsRichtung = -1;
            }
        }
    );

    spiel3Rechts.addEventListener(
        "pointerdown",
        function(event) {

            event.preventDefault();

            if (spiel3Laeuft === true) {
                spiel3BewegungsRichtung = 1;
            }
        }
    );

    spiel3Links.addEventListener(
        "pointerup",
        spiel3BewegungStoppen
    );

    spiel3Rechts.addEventListener(
        "pointerup",
        spiel3BewegungStoppen
    );

    spiel3Links.addEventListener(
        "pointerleave",
        spiel3BewegungStoppen
    );

    spiel3Rechts.addEventListener(
        "pointerleave",
        spiel3BewegungStoppen
    );

    spiel3Links.addEventListener(
        "pointercancel",
        spiel3BewegungStoppen
    );

    spiel3Rechts.addEventListener(
        "pointercancel",
        spiel3BewegungStoppen
    );

    spiel3Schiessen.addEventListener(
        "pointerdown",
        function(event) {

            event.preventDefault();

            spiel3Feuern();
        }
    );
}
/* =========================================
   LEVEL 4: REACTOR CONTROL
========================================= */

const level4ZeitAnzeige =
    document.getElementById("level4-zeit");

const level4StabilZeitAnzeige =
    document.getElementById("level4-stabil-zeit");

const level4KritischZeitAnzeige =
    document.getElementById("level4-kritisch-zeit");

const level4TemperaturText =
    document.getElementById("level4-temperatur-text");

const level4DruckText =
    document.getElementById("level4-druck-text");

const level4EnergieText =
    document.getElementById("level4-energie-text");

const level4TemperaturBalken =
    document.getElementById("level4-temperatur-balken");

const level4DruckBalken =
    document.getElementById("level4-druck-balken");

const level4EnergieBalken =
    document.getElementById("level4-energie-balken");

const level4Kuehlung =
    document.getElementById("level4-kuehlung");

const level4Ventil =
    document.getElementById("level4-ventil");

const level4LeistungPlus =
    document.getElementById("level4-leistung-plus");

const level4LeistungMinus =
    document.getElementById("level4-leistung-minus");

const level4Notkuehlung =
    document.getElementById("level4-notkuehlung");

const level4Start =
    document.getElementById("level4-start");

const level4Meldung =
    document.getElementById("level4-meldung");

const level4ZielAbschluss =
    document.getElementById("level4-ziel-abschluss");

const level4ZielStabil =
    document.getElementById("level4-ziel-stabil");

const level4ZielNotkuehlung =
    document.getElementById("level4-ziel-notkuehlung");

const spiel5Bereich =
    document.getElementById("spiel5");


let level4Laeuft = false;
let level4Timer = null;

let level4Restzeit = 60;
let level4SichereZeit = 0;
let level4KritischeZeit = 0;

let level4Temperatur = 50;
let level4Druck = 50;
let level4Energie = 50;

let level4NotkuehlungBenutzt = false;
let level5Freigeschaltet = false;


/* =========================================
   WERT BEGRENZEN
========================================= */

function level4Begrenzen(wert) {

    if (wert < 0) {
        return 0;
    }

    if (wert > 100) {
        return 100;
    }

    return wert;
}


/* =========================================
   KLEINE ZUFÄLLIGE VERÄNDERUNG
========================================= */

function level4Zufall(minimum, maximum) {

    const bereich =
        maximum - minimum;

    return minimum +
        Math.random() / (1 / bereich);
}


/* =========================================
   EINZELNEN BALKEN AKTUALISIEREN
========================================= */

function level4BalkenAktualisieren(
    balken,
    wert,
    minimum,
    maximum
) {

    balken.style.width =
        wert + "%";

    balken.classList.remove(
        "warnung",
        "kritisch"
    );

    if (
        wert < minimum ||
        wert > maximum
    ) {
        balken.classList.add(
            "kritisch"
        );

        return;
    }

    if (
        wert < minimum + 10 ||
        wert > maximum - 10
    ) {
        balken.classList.add(
            "warnung"
        );
    }
}


/* =========================================
   ANZEIGEN AKTUALISIEREN
========================================= */

function level4AnzeigeAktualisieren() {

    level4Temperatur =
        level4Begrenzen(
            level4Temperatur
        );

    level4Druck =
        level4Begrenzen(
            level4Druck
        );

    level4Energie =
        level4Begrenzen(
            level4Energie
        );


    level4TemperaturText.textContent =
        Math.round(level4Temperatur) + " %";

    level4DruckText.textContent =
        Math.round(level4Druck) + " %";

    level4EnergieText.textContent =
        Math.round(level4Energie) + " %";


    level4ZeitAnzeige.textContent =
        level4Restzeit;

    level4StabilZeitAnzeige.textContent =
        level4SichereZeit;

    level4KritischZeitAnzeige.textContent =
        level4KritischeZeit;


    level4BalkenAktualisieren(
        level4TemperaturBalken,
        level4Temperatur,
        25,
        75
    );

    level4BalkenAktualisieren(
        level4DruckBalken,
        level4Druck,
        20,
        80
    );

    level4BalkenAktualisieren(
        level4EnergieBalken,
        level4Energie,
        30,
        85
    );
}


/* =========================================
   KRITISCHEN ZUSTAND PRÜFEN
========================================= */

function level4IstKritisch() {

    const temperaturKritisch =
        level4Temperatur < 25 ||
        level4Temperatur > 75;

    const druckKritisch =
        level4Druck < 20 ||
        level4Druck > 80;

    const energieKritisch =
        level4Energie < 30 ||
        level4Energie > 85;

    return (
        temperaturKritisch ||
        druckKritisch ||
        energieKritisch
    );
}


/* =========================================
   LEVEL ZURÜCKSETZEN
========================================= */

function level4Zuruecksetzen() {

    clearInterval(level4Timer);

    level4Laeuft = false;

    level4Restzeit = 60;
    level4SichereZeit = 0;
    level4KritischeZeit = 0;

    level4Temperatur = 50;
    level4Druck = 50;
    level4Energie = 50;

    level4NotkuehlungBenutzt = false;

    level4Notkuehlung.disabled = false;

    spiel4Bereich.classList.remove(
        "level4-kritisch"
    );

    level4ZielAbschluss.textContent =
    "❓ ???";

    level4ZielStabil.textContent =
    "❓ ???";

    level4ZielNotkuehlung.textContent =
    "❓ ???";
    level4AnzeigeAktualisieren();
}


/* =========================================
   WERTE AUTOMATISCH VERÄNDERN
========================================= */

function level4SystemVerändern() {

    level4Temperatur +=
        level4Zufall(1, 5);

    level4Druck +=
        level4Zufall(-3, 5);

    level4Energie +=
        level4Zufall(-4, 3);


    if (level4Energie > 70) {

        level4Temperatur +=
            level4Zufall(1, 3);
    }


    if (level4Temperatur > 65) {

        level4Druck +=
            level4Zufall(1, 3);
    }
}


/* =========================================
   LEVEL 4 STARTEN
========================================= */

function level4Starten() {

    if (level4Laeuft === true) {
        return;
    }

    level4Zuruecksetzen();

    level4Laeuft = true;

    level4Start.textContent =
        "REAKTOR LÄUFT";

    level4Meldung.textContent =
        "REAKTOR ONLINE – SYSTEM ÜBERWACHEN";

    level4Timer =
        setInterval(function() {

            if (level4Laeuft === false) {
                return;
            }

            level4Restzeit--;

            level4SystemVerändern();


            if (level4IstKritisch()) {

                level4KritischeZeit++;

                spiel4Bereich.classList.add(
                    "level4-kritisch"
                );

                level4Meldung.textContent =
                    "⚠ SYSTEM CRITICAL ⚠";

            } else {

                level4SichereZeit++;

                level4KritischeZeit = 0;

                spiel4Bereich.classList.remove(
                    "level4-kritisch"
                );

                level4Meldung.textContent =
                    "SYSTEM STABIL";
            }


            level4AnzeigeAktualisieren();


            if (level4KritischeZeit >= 5) {

                level4Verloren();

                return;
            }


            if (level4Restzeit <= 0) {

                level4Gewonnen();
            }

        }, 1000);
}


/* =========================================
   BEDIENELEMENTE
========================================= */

level4Kuehlung.addEventListener(
    "click",
    function() {

        if (level4Laeuft === false) {
            return;
        }

        level4Temperatur -= 12;
        level4Energie -= 5;
        level4Druck -= 2;

        level4Meldung.textContent =
            "Kühlung aktiviert";

        level4AnzeigeAktualisieren();
    }
);


level4Ventil.addEventListener(
    "click",
    function() {

        if (level4Laeuft === false) {
            return;
        }

        level4Druck -= 13;
        level4Temperatur += 2;

        level4Meldung.textContent =
            "Druckventil geöffnet";

        level4AnzeigeAktualisieren();
    }
);


level4LeistungPlus.addEventListener(
    "click",
    function() {

        if (level4Laeuft === false) {
            return;
        }

        level4Energie += 11;
        level4Temperatur += 7;
        level4Druck += 3;

        level4Meldung.textContent =
            "Reaktorleistung erhöht";

        level4AnzeigeAktualisieren();
    }
);


level4LeistungMinus.addEventListener(
    "click",
    function() {

        if (level4Laeuft === false) {
            return;
        }

        level4Energie -= 10;
        level4Temperatur -= 3;
        level4Druck -= 2;

        level4Meldung.textContent =
            "Reaktorleistung reduziert";

        level4AnzeigeAktualisieren();
    }
);


level4Notkuehlung.addEventListener(
    "click",
    function() {

        if (
            level4Laeuft === false ||
            level4NotkuehlungBenutzt === true
        ) {
            return;
        }

        level4NotkuehlungBenutzt = true;

        level4Temperatur = 45;
        level4Druck = 45;
        level4Energie = 45;

        level4KritischeZeit = 0;

        level4Notkuehlung.disabled = true;

        spiel4Bereich.classList.remove(
            "level4-kritisch"
        );

        level4ZielNotkuehlung.textContent =
            "❌ Notkühlung wurde verwendet";

        level4Meldung.textContent =
            "NOTKÜHLUNG AKTIVIERT";

        level4AnzeigeAktualisieren();
    }
);


/* =========================================
   LEVEL GEWONNEN
========================================= */

function level4Gewonnen() {

    clearInterval(level4Timer);

    level4Laeuft = false;


    const stabilBedingung =
        level4SichereZeit >= 30;

    const notkuehlungBedingung =
        level4NotkuehlungBenutzt === false;


    if (
        stabilBedingung &&
        notkuehlungBedingung
    ) {

        level4Meldung.textContent =
            "PERFECT CONTROL – LEVEL 5 FREIGESCHALTET";

        level5Freischalten();

    } else {

        level4Meldung.textContent =
            "REAKTOR GERETTET – LEVEL-5-ZIELE NICHT ERFÜLLT";
    }


    level4Start.textContent =
        "ERNEUT VERSUCHEN";
}


/* =========================================
   LEVEL VERLOREN
========================================= */

function level4Verloren() {

    clearInterval(level4Timer);

    level4Laeuft = false;

    spiel4Bereich.classList.remove(
        "level4-kritisch"
    );

    level4Meldung.textContent =
        "💥 REACTOR FAILURE – SYSTEM OFFLINE";

    level4Start.textContent =
        "NEU STARTEN";
}


/* =========================================
   LEVEL 5 FREISCHALTEN
========================================= */

function level5Freischalten() {

    if (level5Freigeschaltet === true) {
        return;
    }

    level5Freigeschaltet = true;

    spiel5Bereich.classList.remove(
        "spiel5-versteckt"
    );

    spiel5Bereich.classList.add(
        "spiel5-sichtbar"
    );
}


/* =========================================
   STARTKNOPF
========================================= */

level4Start.addEventListener(
    "click",
    function() {

        level4Starten();
    }
);


/* Erste Anzeige beim Laden */

level4AnzeigeAktualisieren();

/* =========================================
   LEVEL 5: NETWORK BREACH
========================================= */

const level5Bereich =
    document.getElementById("spiel5");

const level5Feld =
    document.getElementById("level5-feld");

const level5ZeitAnzeige =
    document.getElementById("level5-zeit");

const level5EnergieAnzeige =
    document.getElementById("level5-energie");

const level5KnotenStatus =
    document.getElementById("level5-knoten-status");

const level5SequenzAnzeige =
    document.getElementById("level5-sequenz");

const level5Meldung =
    document.getElementById("level5-meldung");

const level5Start =
    document.getElementById("level5-start");

const level5Oben =
    document.getElementById("level5-oben");

const level5Unten =
    document.getElementById("level5-unten");

const level5Links =
    document.getElementById("level5-links");

const level5Rechts =
    document.getElementById("level5-rechts");

const finaleBereich =
    document.getElementById("finale");


let level5Laeuft = false;

let level5Zeit = 120;
let level5Energie = 300;

let level5SpielerZeile = 16;
let level5SpielerSpalte = 1;

let level5VirusZeile = 1;
let level5VirusSpalte = 16;

let level5Timer = null;
let level5VirusTimer = null;

let level5AktuellerKnoten = 0;

let level5Zellen = [];

let level5AktivierteKnoten = [];

let level5KnotenReihenfolge = [];


/* =========================================
   SPIELFELD

   0 = begehbar
   1 = Wand
========================================= */

const level5Karte = [


    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],

    [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],

    [1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1],

    [1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1],

    [1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1],

    [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1],

    [1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1],

    [1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],

    [1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1],

    [1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],

    [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1],

    [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],

    [1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1],

    [1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],

    [1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1],

    [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],

    [1, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1],

    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];


/* Positionen der Kontrollknoten */

const level5Knoten = {

       SPS: {
        zeile: 1,
        spalte: 1,
        symbol: "🔵"
    },

    ROBOT: {
        zeile: 9,
        spalte: 10,
        symbol: "🟠"
    },

    SAFETY: {
        zeile: 16,
        spalte: 16,
        symbol: "🟢"
    }
};


/* Position des Cores */

const level5Core = {
    zeile: 9,
    spalte: 8
};


/* =========================================
   MULTIPLIKATION OHNE OPERATOR
========================================= */

function level5Mal(wert1, wert2) {

    if (wert1 === 0 || wert2 === 0) {
        return 0;
    }

    return wert1 / (1 / wert2);
}


/* =========================================
   INDEX EINER ZELLE BERECHNEN
========================================= */

function level5Index(zeile, spalte) {

    return level5Mal(zeile, 18) + spalte;
}


/* =========================================
   ZUFÄLLIGE REIHENFOLGE
========================================= */

function level5SequenzErstellen() {

    const namen = [
        "SPS",
        "ROBOT",
        "SAFETY"
    ];

    for (
        let index = namen.length - 1;
        index > 0;
        index--
    ) {

        const zufall =
            Math.floor(
                Math.random() /
                (1 / (index + 1))
            );

        const zwischenwert =
            namen[index];

        namen[index] =
            namen[zufall];

        namen[zufall] =
            zwischenwert;
    }

    level5KnotenReihenfolge = namen;

    level5SequenzAnzeige.textContent =
        namen.join(" → ");
}


/* =========================================
   SPIELFELD ERSTELLEN
========================================= */

function level5FeldErstellen() {

    level5Feld.innerHTML = "";

    level5Zellen = [];

    for (
        let zeile = 0;
        zeile < 18;
        zeile++
    ) {

        for (
            let spalte = 0;
            spalte < 18;
            spalte++
        ) {

            const zelle =
                document.createElement("div");

            zelle.className =
                "level5-zelle";

            if (
                level5Karte[zeile][spalte] === 1
            ) {
                zelle.classList.add("wand");
            }

            level5Feld.appendChild(zelle);

            level5Zellen.push(zelle);
        }
    }
}


/* =========================================
   PRÜFEN, OB EINE POSITION BEGEHBAR IST
========================================= */

function level5IstBegehbar(zeile, spalte) {

    if (
        zeile < 0 ||
        zeile >= 18 ||
        spalte < 0 ||
        spalte >= 18
    ) {
        return false;
    }

    return (
        level5Karte[zeile][spalte] === 0
    );
}


/* =========================================
   KNOTEN AN POSITION SUCHEN
========================================= */

function level5KnotenAnPosition(
    zeile,
    spalte
) {

    const namen = [
        "SPS",
        "ROBOT",
        "SAFETY"
    ];

    for (
        let index = 0;
        index < namen.length;
        index++
    ) {

        const name = namen[index];

        const knoten =
            level5Knoten[name];

        if (
            knoten.zeile === zeile &&
            knoten.spalte === spalte
        ) {
            return name;
        }
    }

    return null;
}


/* =========================================
   DARSTELLUNG AKTUALISIEREN
========================================= */

function level5DarstellungAktualisieren() {

    level5Zellen.forEach(function(zelle) {

        zelle.classList.remove(
            "spieler",
            "virus",
            "knoten-sps",
            "knoten-robot",
            "knoten-safety",
            "aktiviert",
            "core",
            "core-offen"
        );

        if (
            zelle.classList.contains("wand") ===
            false
        ) {
            zelle.textContent = "";
        }
    });


    const knotenNamen = [
        "SPS",
        "ROBOT",
        "SAFETY"
    ];

    knotenNamen.forEach(function(name) {

        const knoten =
            level5Knoten[name];

        const index =
            level5Index(
                knoten.zeile,
                knoten.spalte
            );

        const zelle =
            level5Zellen[index];

        zelle.textContent =
            knoten.symbol;

        zelle.classList.add(
            "knoten-" +
            name.toLowerCase()
        );

        if (
            level5AktivierteKnoten.includes(name)
        ) {
            zelle.classList.add(
                "aktiviert"
            );
        }
    });


    const coreIndex =
        level5Index(
            level5Core.zeile,
            level5Core.spalte
        );

    const coreZelle =
        level5Zellen[coreIndex];

    if (
        level5AktuellerKnoten >= 3
    ) {
        coreZelle.textContent = "⭐";

        coreZelle.classList.add(
            "core-offen"
        );

    } else {

        coreZelle.textContent = "🔒";

        coreZelle.classList.add(
            "core"
        );
    }


    const virusIndex =
        level5Index(
            level5VirusZeile,
            level5VirusSpalte
        );

    level5Zellen[virusIndex].textContent =
        "🔴";

    level5Zellen[virusIndex].classList.add(
        "virus"
    );


    const spielerIndex =
        level5Index(
            level5SpielerZeile,
            level5SpielerSpalte
        );

    level5Zellen[spielerIndex].textContent =
        "🔷";

    level5Zellen[spielerIndex].classList.add(
        "spieler"
    );


    level5ZeitAnzeige.textContent =
        level5Zeit;

    level5EnergieAnzeige.textContent =
        level5Energie;

    level5KnotenStatus.textContent =
        level5AktuellerKnoten + " / 3";


    if (level5Energie <= 25) {

        level5Bereich.classList.add(
            "level5-kritisch"
        );

    } else {

        level5Bereich.classList.remove(
            "level5-kritisch"
        );
    }
}


/* =========================================
   KNOTEN AKTIVIEREN
========================================= */

function level5KnotenPruefen() {

    const knotenName =
        level5KnotenAnPosition(
            level5SpielerZeile,
            level5SpielerSpalte
        );

    if (knotenName === null) {
        return;
    }

    if (
        level5AktivierteKnoten.includes(
            knotenName
        )
    ) {
        return;
    }


    const erwarteterKnoten =
        level5KnotenReihenfolge[
            level5AktuellerKnoten
        ];


    if (knotenName === erwarteterKnoten) {

        level5AktivierteKnoten.push(
            knotenName
        );

        level5AktuellerKnoten++;

        level5Meldung.textContent =
            knotenName +
            " erfolgreich aktiviert";


        if (level5AktuellerKnoten >= 3) {

            level5Meldung.textContent =
                "ALLE KNOTEN AKTIV – CORE GEÖFFNET";

            level5VirusBeschleunigen();
        }

    } else {

        level5Energie -= 15;

        level5Meldung.textContent =
            "FALSCHE SEQUENZ – 15 ENERGIE VERLOREN";
    }
}


/* =========================================
   SPIELER BEWEGEN
========================================= */

function level5SpielerBewegen(
    zeilenAenderung,
    spaltenAenderung
) {

    if (level5Laeuft === false) {
        return;
    }

    const neueZeile =
        level5SpielerZeile +
        zeilenAenderung;

    const neueSpalte =
        level5SpielerSpalte +
        spaltenAenderung;


    if (
        level5IstBegehbar(
            neueZeile,
            neueSpalte
        ) === false
    ) {
        return;
    }


    level5SpielerZeile =
        neueZeile;

    level5SpielerSpalte =
        neueSpalte;

    level5Energie--;


    level5KnotenPruefen();

    level5CorePruefen();

    level5NiederlagePruefen();

    level5DarstellungAktualisieren();
}


/* =========================================
   CORE PRÜFEN
========================================= */

function level5CorePruefen() {

    const coreErreicht =
        level5SpielerZeile ===
            level5Core.zeile &&
        level5SpielerSpalte ===
            level5Core.spalte;

    if (coreErreicht === false) {
        return;
    }


    if (level5AktuellerKnoten < 3) {

        level5Energie -= 10;

        level5Meldung.textContent =
            "CORE GESPERRT – 10 ENERGIE VERLOREN";

        return;
    }


    level5Gewonnen();
}


/* =========================================
   VIRUS BEWEGEN
========================================= */

function level5VirusBewegen() {

    if (level5Laeuft === false) {
        return;
    }

    const moeglichkeiten = [

        {
            zeile:
                level5VirusZeile - 1,

            spalte:
                level5VirusSpalte
        },

        {
            zeile:
                level5VirusZeile + 1,

            spalte:
                level5VirusSpalte
        },

        {
            zeile:
                level5VirusZeile,

            spalte:
                level5VirusSpalte - 1
        },

        {
            zeile:
                level5VirusZeile,

            spalte:
                level5VirusSpalte + 1
        }
    ];


    let bestePosition = null;
    let besteDistanz = Infinity;


    moeglichkeiten.forEach(
        function(position) {

            if (
                level5IstBegehbar(
                    position.zeile,
                    position.spalte
                ) === false
            ) {
                return;
            }


            const zeilenDistanz =
                Math.abs(
                    position.zeile -
                    level5SpielerZeile
                );

            const spaltenDistanz =
                Math.abs(
                    position.spalte -
                    level5SpielerSpalte
                );

            const gesamteDistanz =
                zeilenDistanz +
                spaltenDistanz;


            if (
                gesamteDistanz <
                besteDistanz
            ) {

                besteDistanz =
                    gesamteDistanz;

                bestePosition =
                    position;
            }
        }
    );


    if (bestePosition !== null) {

        level5VirusZeile =
            bestePosition.zeile;

        level5VirusSpalte =
            bestePosition.spalte;
    }


    level5NiederlagePruefen();

    level5DarstellungAktualisieren();
}


/* =========================================
   VIRUS BESCHLEUNIGEN
========================================= */

function level5VirusBeschleunigen() {

    clearInterval(level5VirusTimer);

    level5VirusTimer =
        setInterval(
            level5VirusBewegen,
            200
        );
}


/* =========================================
   NIEDERLAGE PRÜFEN
========================================= */

function level5NiederlagePruefen() {

    const virusBeruehrtSpieler =
        level5SpielerZeile ===
            level5VirusZeile &&
        level5SpielerSpalte ===
            level5VirusSpalte;


    if (virusBeruehrtSpieler) {

        level5Verloren(
            "SYSTEM COMPROMISED – VIRUS HAT DICH ERREICHT"
        );

        return;
    }


    if (level5Energie <= 0) {

        level5Verloren(
            "ENERGIE ERSCHÖPFT – VERBINDUNG GETRENNT"
        );
    }
}


/* =========================================
   LEVEL ZURÜCKSETZEN
========================================= */

function level5Zuruecksetzen() {

    clearInterval(level5Timer);
    clearInterval(level5VirusTimer);

    level5Laeuft = false;

    level5Zeit = 120;
    level5Energie = 100;

    level5SpielerZeile = 16;
    level5SpielerSpalte = 1;

    level5VirusZeile = 1;
    level5VirusSpalte = 16;

    level5AktuellerKnoten = 0;

    level5AktivierteKnoten = [];

    level5Bereich.classList.remove(
        "level5-kritisch"
    );

    level5FeldErstellen();

    level5SequenzErstellen();

    level5DarstellungAktualisieren();
}


/* =========================================
   LEVEL STARTEN
========================================= */

function level5Starten() {

    if (level5Laeuft === true) {
        return;
    }

    level5Zuruecksetzen();

    level5Laeuft = true;

    level5Meldung.textContent =
        "VERBINDUNG AKTIV – VIRUS ERKANNT";

    level5Start.textContent =
        "VERBINDUNG AKTIV";


    level5Timer =
        setInterval(function() {

            if (level5Laeuft === false) {
                return;
            }

            level5Zeit--;

            level5ZeitAnzeige.textContent =
                level5Zeit;

            if (level5Zeit <= 0) {

                level5Verloren(
                    "ZEIT ABGELAUFEN – VERBINDUNG GETRENNT"
                );
            }

        }, 1000);


    level5VirusTimer =
        setInterval(
            level5VirusBewegen,
            300
        );
}


/* =========================================
   LEVEL VERLOREN
========================================= */

function level5Verloren(nachricht) {

    if (level5Laeuft === false) {
        return;
    }

    level5Laeuft = false;

    clearInterval(level5Timer);
    clearInterval(level5VirusTimer);

    level5Bereich.classList.remove(
        "level5-kritisch"
    );

    level5Meldung.textContent =
        nachricht;

    level5Start.textContent =
        "ERNEUT VERBINDEN";
}


/* =========================================
   LEVEL GEWONNEN
========================================= */

function level5Gewonnen() {

    if (level5Laeuft === false) {
        return;
    }

    level5Laeuft = false;

    clearInterval(level5Timer);
    clearInterval(level5VirusTimer);

    level5Bereich.classList.remove(
        "level5-kritisch"
    );

    level5Meldung.textContent =
        "VIRUS ISOLIERT – FABRIKSTEUERUNG WIEDERHERGESTELLT";

    level5Start.textContent =
        "LEVEL ABGESCHLOSSEN";

    finaleBereich.classList.remove(
        "finale-versteckt"
    );

    finaleBereich.classList.add(
        "finale-sichtbar"
    );
    roboter.classList.add("system-master");
    zurueck.textContent = "BEENDEN";
    zurueck.classList.add("kampagne-beenden");
}


/* =========================================
   STARTKNOPF
========================================= */

level5Start.addEventListener(
    "click",
    level5Starten
);


/* =========================================
   BILDSCHIRMTASTEN
========================================= */

level5Oben.addEventListener(
    "click",
    function() {

        level5SpielerBewegen(-1, 0);
    }
);

level5Unten.addEventListener(
    "click",
    function() {

        level5SpielerBewegen(1, 0);
    }
);

level5Links.addEventListener(
    "click",
    function() {

        level5SpielerBewegen(0, -1);
    }
);

level5Rechts.addEventListener(
    "click",
    function() {

        level5SpielerBewegen(0, 1);
    }
);


/* =========================================
   TASTATURSTEUERUNG
========================================= */

document.addEventListener(
    "keydown",
    function(event) {

        if (level5Laeuft === false) {
            return;
        }


        const taste =
            event.key.toLowerCase();


        if (
            event.key === "ArrowUp" ||
            taste === "w"
        ) {

            event.preventDefault();

            level5SpielerBewegen(-1, 0);
        }


        if (
            event.key === "ArrowDown" ||
            taste === "s"
        ) {

            event.preventDefault();

            level5SpielerBewegen(1, 0);
        }


        if (
            event.key === "ArrowLeft" ||
            taste === "a"
        ) {

            event.preventDefault();

            level5SpielerBewegen(0, -1);
        }


        if (
            event.key === "ArrowRight" ||
            taste === "d"
        ) {

            event.preventDefault();

            level5SpielerBewegen(0, 1);
        }
    }
);


/* =========================================
   ERSTE DARSTELLUNG
========================================= */

level5FeldErstellen();

level5DarstellungAktualisieren();
