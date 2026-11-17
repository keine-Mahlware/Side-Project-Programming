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
let motorTimer;

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
    if (anlageLaeuft == false && autoBetriebs == true && stoerung == false ) {
        anlageLaeuft = true;
        leuchteBetrieb.style.backgroundColor = "green"
        leuchteStop.style.backgroundColor = "white"
        anlagenStatus.textContent = "Anlage gestartet"
        motorDrehzahl = 10;
        clearTimeout(motorTimer);

        motorTimer = setTimeout(function() {
            document.querySelector(".flamme").style.zIndex = "50";
            motorEasterEggGefunden = true;
            pruefeEasterEggs();
        }, 15000); //5000 ms = 5s / 120000 ms = 2 Minuten
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
        clearTimeout(motorTimer);

        document.querySelector(".flamme").style.zIndex = "-1";
    }
}
function motorAnimation() {
    motorWinkel += motorDrehzahl;
    motor.style.transform = "rotate(" + motorWinkel + "deg)";
    requestAnimationFrame(motorAnimation);

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
zurueck.addEventListener("click", function() {

        window.location.reload();

});

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

    zeit = 20;

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
