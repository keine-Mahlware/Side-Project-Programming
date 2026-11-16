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

    document.body.classList.remove("seite-2");

});





naechsteSeite.addEventListener("click", function() {

    seite1.style.display = "none";
    seite2.style.display = "block";

});
zurueck.addEventListener("click", function() {
    
    levelTransition.classList.add("aktiv");
    await warten(1400);
    location.reload();

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


let punkte = 0;
let zeit = 20;

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
