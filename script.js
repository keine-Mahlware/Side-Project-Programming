console.log("JavaScript funktioniert");

const button = document.getElementById("darkmode")

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
const leuchteStoerung = document.getElementById("lampe-stoerung")
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

        }, 120000); //5000 ms = 5s / 120000 ms = 2 Minuten
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

        roboterSimulation.classList.remove("explodiert");

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

let roboterKlicks = 0;
let klickTimer;
let roboterKaputt = false;

roboterSimulation.addEventListener("click", function() {

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

        roboterSimulation.classList.add("explodiert");

        roboterKlicks = 0;
    }

});
function istRoboterKaputt() {
    return roboterKaputt;
}
