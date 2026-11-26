
// ========================================
// SECRET ALGORITHM LAB
// LEVEL 1 + LEVEL 2
// ========================================


// ========================================
// ALLGEMEINE ELEMENTE
// ========================================

const secretIntro =
    document.getElementById(
        "secret-intro"
    );

const secretHauptbereich =
    document.getElementById(
        "secret-hauptbereich"
    );

const secretLadebalken =
    document.getElementById(
        "secret-ladebalken-inhalt"
    );

const secretLadeText =
    document.getElementById(
        "secret-lade-text"
    );

const secretSecurityLevel =
    document.getElementById(
        "secret-security-level"
    );

const secretActiveLevel =
    document.getElementById(
        "secret-active-level"
    );

const secretUnlockedCount =
    document.getElementById(
        "secret-unlocked-count"
    );

const secretLevel1 =
    document.getElementById(
        "secret-level-1"
    );

const secretLevel2 =
    document.getElementById(
        "secret-level-2"
    );

const secretLevel3 =
    document.getElementById(
        "secret-level-3"
    );

const secretCodeBreaker =
    document.getElementById(
        "secret-code-breaker"
    );

const secretNeuralVault =
    document.getElementById(
        "secret-neural-vault"
    );

const secretRootTerminal =
    document.getElementById(
        "secret-root-terminal"
    );

const secretZurueck =
    document.getElementById(
        "secret-zurueck"
    );


// ========================================
// LEVEL 1: CODE BREAKER
// ========================================

const secretCodeAntwort =
    document.getElementById(
        "secret-code-antwort"
    );

const secretCodePruefen =
    document.getElementById(
        "secret-code-pruefen"
    );

const secretCodeStatus =
    document.getElementById(
        "secret-code-status"
    );

const secretVersucheAnzeige =
    document.getElementById(
        "secret-versuche-anzahl"
    );

let secretVersuche = 0;

const secretCodeLoesung =
    "HELLO WORLD";


// ========================================
// LEVEL 2: NEURAL VAULT ELEMENTE
// ========================================

const neuralLernrateInput =
    document.getElementById(
        "neural-lernrate"
    );

const neuralTempoInput =
    document.getElementById(
        "neural-tempo"
    );

const neuralStart =
    document.getElementById(
        "neural-start"
    );

const neuralPause =
    document.getElementById(
        "neural-pause"
    );

const neuralEinzelschritt =
    document.getElementById(
        "neural-einzelschritt"
    );

const neuralReset =
    document.getElementById(
        "neural-reset"
    );

const neuralEpochAnzeige =
    document.getElementById(
        "neural-epoch"
    );

const neuralGenauigkeitAnzeige =
    document.getElementById(
        "neural-genauigkeit"
    );

const neuralFehlerAnzeige =
    document.getElementById(
        "neural-fehler"
    );

const neuralStabilAnzeige =
    document.getElementById(
        "neural-stabil"
    );

const neuralFortschrittBalken =
    document.getElementById(
        "neural-fortschritt-balken"
    );

const neuralInfo =
    document.getElementById(
        "neural-info"
    );

const neuralModulStatus =
    document.getElementById(
        "neural-modul-status"
    );

const neuralOutputNeuron =
    document.getElementById(
        "neural-output-neuron"
    );

const neuralVerbindungen =
    document.querySelectorAll(
        ".neural-verbindung"
    );

const neuralNeuronen =
    document.querySelectorAll(
        ".neural-neuron"
    );

const neuralDatenzeilen = [
    document.getElementById(
        "neural-daten-0"
    ),
    document.getElementById(
        "neural-daten-1"
    ),
    document.getElementById(
        "neural-daten-2"
    ),
    document.getElementById(
        "neural-daten-3"
    )
];

const neuralVorhersagen = [
    document.getElementById(
        "neural-vorhersage-0"
    ),
    document.getElementById(
        "neural-vorhersage-1"
    ),
    document.getElementById(
        "neural-vorhersage-2"
    ),
    document.getElementById(
        "neural-vorhersage-3"
    )
];

const neuralErgebnisse = [
    document.getElementById(
        "neural-ergebnis-0"
    ),
    document.getElementById(
        "neural-ergebnis-1"
    ),
    document.getElementById(
        "neural-ergebnis-2"
    ),
    document.getElementById(
        "neural-ergebnis-3"
    )
];


// ========================================
// FREISCHALTUNGSZUSTAND
// ========================================

let secretLevel2Freigeschaltet = false;
let secretLevel3Freigeschaltet = false;


// ========================================
// XOR-TRAININGSDATEN
// ========================================

const neuralTrainingsDaten = [

    {
        eingaben: [0, 0],
        ziel: 0
    },

    {
        eingaben: [0, 1],
        ziel: 1
    },

    {
        eingaben: [1, 0],
        ziel: 1
    },

    {
        eingaben: [1, 1],
        ziel: 0
    }

];


// ========================================
// NEURONALES NETZ
//
// 2 Eingaben
// 4 versteckte Neuronen
// 1 Ausgabe
// ========================================

let neuralNetz = null;

let neuralEpoch = 0;

let neuralStabileEpochen = 0;

let neuralTrainingLaeuft = false;

let neuralTrainingPausiert = false;

let neuralAnimationId = null;

let neuralVaultGeloest = false;


// ========================================
// MATHEMATISCHE HILFSFUNKTIONEN
// ========================================

function neuralZufallsGewicht() {

    return (
        Math.random() * 2 - 1
    );
}


function neuralSigmoid(wert) {

    return (
        1 /
        (
            1 + Math.exp(-wert)
        )
    );
}


function neuralSigmoidAbleitung(
    ausgabe
) {

    return (
        ausgabe
        *
        (1 - ausgabe)
    );
}


// ========================================
// NETZ ERZEUGEN
// ========================================

function neuralNetzErzeugen() {

    const netz = {

        eingabeVersteckt: [],

        verstecktBias: [],

        verstecktAusgabe: [],

        ausgabeBias:
            neuralZufallsGewicht()
    };


    for (
        let neuron = 0;
        neuron < 4;
        neuron++
    ) {

        netz.eingabeVersteckt[
            neuron
        ] = [

            neuralZufallsGewicht(),

            neuralZufallsGewicht()
        ];


        netz.verstecktBias[
            neuron
        ] =
            neuralZufallsGewicht();


        netz.verstecktAusgabe[
            neuron
        ] =
            neuralZufallsGewicht();
    }


    return netz;
}


// ========================================
// VORWÄRTSLAUF
// ========================================

function neuralVorwaerts(
    eingaben
) {

    const versteckt = [];


    for (
        let neuron = 0;
        neuron < 4;
        neuron++
    ) {

        let summe =
            neuralNetz
                .verstecktBias[
                    neuron
                ];


        summe +=
            eingaben[0]
            *
            neuralNetz
                .eingabeVersteckt[
                    neuron
                ][0];


        summe +=
            eingaben[1]
            *
            neuralNetz
                .eingabeVersteckt[
                    neuron
                ][1];


        versteckt[neuron] =
            neuralSigmoid(
                summe
            );
    }


    let ausgabeSumme =
        neuralNetz.ausgabeBias;


    for (
        let neuron = 0;
        neuron < 4;
        neuron++
    ) {

        ausgabeSumme +=
            versteckt[neuron]
            *
            neuralNetz
                .verstecktAusgabe[
                    neuron
                ];
    }


    const ausgabe =
        neuralSigmoid(
            ausgabeSumme
        );


    return {

        versteckt: versteckt,

        ausgabe: ausgabe
    };
}


// ========================================
// EIN TRAININGSSCHRITT
// ========================================

function neuralBeispielTrainieren(
    trainingsBeispiel,
    lernrate
) {

    const eingaben =
        trainingsBeispiel.eingaben;

    const ziel =
        trainingsBeispiel.ziel;


    const vorwaerts =
        neuralVorwaerts(
            eingaben
        );


    const ausgabe =
        vorwaerts.ausgabe;

    const versteckt =
        vorwaerts.versteckt;


    const ausgabeFehler =
        ziel - ausgabe;


    const ausgabeDelta =
        ausgabeFehler
        *
        neuralSigmoidAbleitung(
            ausgabe
        );


    const alteAusgabeGewichte =
        [
            ...neuralNetz
                .verstecktAusgabe
        ];


    for (
        let neuron = 0;
        neuron < 4;
        neuron++
    ) {

        neuralNetz
            .verstecktAusgabe[
                neuron
            ] +=
                lernrate
                *
                ausgabeDelta
                *
                versteckt[neuron];
    }


    neuralNetz.ausgabeBias +=
        lernrate
        *
        ausgabeDelta;


    for (
        let neuron = 0;
        neuron < 4;
        neuron++
    ) {

        const verstecktFehler =
            ausgabeDelta
            *
            alteAusgabeGewichte[
                neuron
            ];


        const verstecktDelta =
            verstecktFehler
            *
            neuralSigmoidAbleitung(
                versteckt[neuron]
            );


        neuralNetz
            .eingabeVersteckt[
                neuron
            ][0] +=
                lernrate
                *
                verstecktDelta
                *
                eingaben[0];


        neuralNetz
            .eingabeVersteckt[
                neuron
            ][1] +=
                lernrate
                *
                verstecktDelta
                *
                eingaben[1];


        neuralNetz
            .verstecktBias[
                neuron
            ] +=
                lernrate
                *
                verstecktDelta;
    }


    return (
        ausgabeFehler
        *
        ausgabeFehler
    );
}


// ========================================
// EINE EPOCHE TRAINIEREN
// ========================================

function neuralEineEpoche() {

    if (neuralVaultGeloest) {

        return;
    }


    const lernrate =
        Number(
            neuralLernrateInput.value
        );


    if (
        Number.isNaN(lernrate)
        ||
        lernrate < 0.05
        ||
        lernrate > 1
    ) {

        neuralInfo.textContent =
            "Learning Rate muss zwischen 0.05 und 1 liegen.";

        neuralTrainingPausiert =
            true;

        return;
    }


    let gesamtFehler = 0;


    /*
        Reihenfolge zufällig mischen.
    */

    const gemischt =
        [...neuralTrainingsDaten]
            .sort(
                function() {

                    return (
                        Math.random()
                        - 0.5
                    );
                }
            );


    for (
        const beispiel
        of gemischt
    ) {

        gesamtFehler +=
            neuralBeispielTrainieren(
                beispiel,
                lernrate
            );
    }


    neuralEpoch++;


    const durchschnittFehler =
        gesamtFehler
        /
        neuralTrainingsDaten.length;


    const auswertung =
        neuralNetzAuswerten();


    if (
        auswertung.genauigkeit
        === 100
    ) {

        neuralStabileEpochen++;

    } else {

        neuralStabileEpochen = 0;
    }


    neuralAnzeigeAktualisieren(
        auswertung,
        durchschnittFehler
    );


    if (
        neuralStabileEpochen >= 8
    ) {

        neuralVaultAbschliessen();
    }
}


// ========================================
// NETZ AUSWERTEN
// ========================================

function neuralNetzAuswerten() {

    const vorhersagen = [];

    let korrekt = 0;


    for (
        const beispiel
        of neuralTrainingsDaten
    ) {

        const ergebnis =
            neuralVorwaerts(
                beispiel.eingaben
            );


        const klasse =
            ergebnis.ausgabe >= 0.5
                ? 1
                : 0;


        const istKorrekt =
            klasse === beispiel.ziel;


        if (istKorrekt) {

            korrekt++;
        }


        vorhersagen.push({

            wert:
                ergebnis.ausgabe,

            klasse: klasse,

            korrekt:
                istKorrekt
        });
    }


    return {

        vorhersagen:
            vorhersagen,

        genauigkeit:
            (
                korrekt
                /
                neuralTrainingsDaten.length
            )
            * 100
    };
}


// ========================================
// ANZEIGE AKTUALISIEREN
// ========================================

function neuralAnzeigeAktualisieren(
    auswertung,
    fehler
) {

    neuralEpochAnzeige.textContent =
        neuralEpoch;


    neuralGenauigkeitAnzeige.textContent =
        auswertung.genauigkeit
        .toFixed(0)
        + " %";


    neuralFehlerAnzeige.textContent =
        fehler.toFixed(5);


    neuralStabilAnzeige.textContent =
        Math.min(
            neuralStabileEpochen,
            8
        )
        + " / 8";


    const fortschritt =
        Math.min(
            100,
            auswertung.genauigkeit
            *
            0.8
            +
            (
                neuralStabileEpochen
                /
                8
            )
            *
            20
        );


    neuralFortschrittBalken
        .style.width =
            fortschritt
            + "%";


    for (
        let index = 0;
        index <
            auswertung
                .vorhersagen
                .length;
        index++
    ) {

        const ergebnis =
            auswertung
                .vorhersagen[
                    index
                ];


        neuralVorhersagen[
            index
        ].textContent =
            ergebnis.wert
                .toFixed(3);


        neuralErgebnisse[
            index
        ].classList.remove(
            "korrekt",
            "falsch"
        );


        if (ergebnis.korrekt) {

            neuralErgebnisse[
                index
            ].classList.add(
                "korrekt"
            );


            neuralErgebnisse[
                index
            ].textContent =
                "CORRECT";

        } else {

            neuralErgebnisse[
                index
            ].classList.add(
                "falsch"
            );


            neuralErgebnisse[
                index
            ].textContent =
                "FAILED";
        }
    }


    if (
        auswertung.genauigkeit
        === 100
    ) {

        neuralOutputNeuron
            .classList.add(
                "aktiv"
            );

    } else {

        neuralOutputNeuron
            .classList.remove(
                "aktiv"
            );
    }


    neuralInfo.textContent =
        "Epoch "
        + neuralEpoch
        + ": Accuracy "
        + auswertung.genauigkeit
            .toFixed(0)
        + "%, Loss "
        + fehler.toFixed(5)
        + ".";
}


// ========================================
// ANIMATION
// ========================================

function neuralAnimation() {

    if (!neuralTrainingLaeuft) {

        neuralAnimationId = null;

        return;
    }


    if (
        !neuralTrainingPausiert
        &&
        !neuralVaultGeloest
    ) {

        const tempo =
            Number(
                neuralTempoInput.value
            );


        for (
            let schritt = 0;
            schritt < tempo;
            schritt++
        ) {

            neuralEineEpoche();


            if (neuralVaultGeloest) {

                break;
            }
        }


        neuralVerbindungen.forEach(
            function(element) {

                element.classList.add(
                    "aktiv"
                );
            }
        );


        neuralNeuronen.forEach(
            function(element) {

                element.classList.add(
                    "aktiv"
                );
            }
        );


        setTimeout(
            function() {

                if (!neuralVaultGeloest) {

                    neuralVerbindungen
                        .forEach(
                            function(
                                element
                            ) {

                                element
                                    .classList
                                    .remove(
                                        "aktiv"
                                    );
                            }
                        );


                    neuralNeuronen
                        .forEach(
                            function(
                                element
                            ) {

                                element
                                    .classList
                                    .remove(
                                        "aktiv"
                                    );
                            }
                        );
                }
            },

            90
        );
    }


    neuralAnimationId =
        requestAnimationFrame(
            neuralAnimation
        );
}


// ========================================
// NEURAL VAULT ABSCHLIESSEN
// ========================================

function neuralVaultAbschliessen() {

    if (neuralVaultGeloest) {

        return;
    }


    neuralVaultGeloest = true;

    neuralTrainingPausiert = true;


    neuralFortschrittBalken
        .style.width =
            "100%";


    neuralInfo.classList.add(
        "erfolg"
    );


    neuralInfo.textContent =
        "NEURAL PATTERN ACCEPTED // VAULT UNLOCKED // MODULE 03 AVAILABLE";


    neuralModulStatus.textContent =
        "ACCESS GRANTED";


    neuralStart.disabled = true;

    neuralPause.disabled = true;

    neuralEinzelschritt.disabled =
        true;

    neuralLernrateInput.disabled =
        true;


    neuralNeuronen.forEach(
        function(element) {

            element.classList.add(
                "aktiv"
            );
        }
    );


    neuralVerbindungen.forEach(
        function(element) {

            element.classList.add(
                "aktiv"
            );
        }
    );


    secretLevel3Freischalten();
}


// ========================================
// NEURAL NETZ RESET
// ========================================

function neuralNetzZuruecksetzen() {

    neuralTrainingLaeuft = false;

    neuralTrainingPausiert = false;

    neuralVaultGeloest = false;


    if (neuralAnimationId !== null) {

        cancelAnimationFrame(
            neuralAnimationId
        );

        neuralAnimationId = null;
    }


    neuralNetz =
        neuralNetzErzeugen();


    neuralEpoch = 0;

    neuralStabileEpochen = 0;


    neuralEpochAnzeige.textContent =
        "0";

    neuralGenauigkeitAnzeige.textContent =
        "0 %";

    neuralFehlerAnzeige.textContent =
        "-";

    neuralStabilAnzeige.textContent =
        "0 / 8";


    neuralFortschrittBalken
        .style.width =
            "0%";


    neuralInfo.classList.remove(
        "erfolg"
    );


    neuralInfo.textContent =
        "Das neuronale Netz besitzt neue zufällige Gewichte. Starte das Training.";


    neuralModulStatus.textContent =
        "TRAINING REQUIRED";


    neuralStart.disabled = false;

    neuralPause.disabled = false;

    neuralEinzelschritt.disabled =
        false;

    neuralLernrateInput.disabled =
        false;


    neuralPause.textContent =
        "PAUSE";


    neuralNeuronen.forEach(
        function(element) {

            element.classList.remove(
                "aktiv"
            );
        }
    );


    neuralVerbindungen.forEach(
        function(element) {

            element.classList.remove(
                "aktiv"
            );
        }
    );


    for (
        let index = 0;
        index < 4;
        index++
    ) {

        neuralVorhersagen[
            index
        ].textContent =
            "-";


        neuralErgebnisse[
            index
        ].textContent =
            "WAITING";


        neuralErgebnisse[
            index
        ].classList.remove(
            "korrekt",
            "falsch"
        );


        neuralDatenzeilen[
            index
        ].classList.remove(
            "aktiv"
        );
    }
}


// ========================================
// LEVEL 1 PRÜFEN
// ========================================

function secretAntwortPruefen() {

    const antwort =
        secretCodeAntwort.value
            .trim()
            .toUpperCase();


    secretVersuche++;


    secretVersucheAnzeige.textContent =
        secretVersuche;


    if (
        antwort ===
        secretCodeLoesung
    ) {

        secretCodeStatus.classList.remove(
            "falsch"
        );


        secretCodeStatus.classList.add(
            "richtig"
        );


        secretCodeStatus.textContent =
            "DECRYPTION SUCCESSFUL // MODULE 02 UNLOCKED";


        secretCodeAntwort.disabled =
            true;


        secretCodePruefen.disabled =
            true;


        secretLevel2Freischalten();


        return;
    }


    secretCodeStatus.classList.remove(
        "richtig"
    );


    secretCodeStatus.classList.add(
        "falsch"
    );


    secretCodeStatus.textContent =
        "DECRYPTION FAILED // INVALID PLAINTEXT";
}


// ========================================
// LEVEL 2 FREISCHALTEN
// ========================================

function secretLevel2Freischalten() {

    if (secretLevel2Freigeschaltet) {

        return;
    }


    secretLevel2Freigeschaltet =
        true;


    secretLevel2.disabled =
        false;


    secretLevel2.classList.remove(
        "gesperrt"
    );


    secretLevel2.classList.add(
        "freigeschaltet"
    );


    secretLevel2
        .querySelector(
            ".secret-level-status"
        )
        .textContent =
            "UNLOCKED";


    secretSecurityLevel.textContent =
        "2 / 4";


    secretUnlockedCount.textContent =
        "2 / 4";
}


// ========================================
// LEVEL 3 FREISCHALTEN
// ========================================

function secretLevel3Freischalten() {

    if (secretLevel3Freigeschaltet) {

        return;
    }


    secretLevel3Freigeschaltet =
        true;


    secretLevel3.disabled =
        false;


    secretLevel3.classList.remove(
        "gesperrt"
    );


    secretLevel3.classList.add(
        "freigeschaltet"
    );


    secretLevel3
        .querySelector(
            ".secret-level-status"
        )
        .textContent =
            "UNLOCKED";


    secretSecurityLevel.textContent =
        "3 / 4";


    secretUnlockedCount.textContent =
        "3 / 4";
}


// ========================================
// MODULE AUSBLENDEN
// ========================================

function secretAlleModuleAusblenden() {

    secretCodeBreaker.classList.add(
        "secret-versteckt"
    );


    secretNeuralVault.classList.add(
        "secret-versteckt"
    );


    secretRootTerminal.classList.add(
        "secret-versteckt"
    );


    secretLevel1.classList.remove(
        "aktiv"
    );


    secretLevel2.classList.remove(
        "aktiv"
    );


    secretLevel3.classList.remove(
        "aktiv"
    );
}


// ========================================
// LEVELS ANZEIGEN
// ========================================

function secretLevel1Anzeigen() {

    secretAlleModuleAusblenden();


    secretCodeBreaker.classList.remove(
        "secret-versteckt"
    );


    secretLevel1.classList.add(
        "aktiv"
    );


    secretActiveLevel.textContent =
        "CODE BREAKER";
}


function secretLevel2Anzeigen() {

    if (!secretLevel2Freigeschaltet) {

        return;
    }


    secretAlleModuleAusblenden();


    secretNeuralVault.classList.remove(
        "secret-versteckt"
    );


    secretLevel2.classList.add(
        "aktiv"
    );


    secretActiveLevel.textContent =
        "NEURAL VAULT";
}


function secretLevel3Anzeigen() {

    if (!secretLevel3Freigeschaltet) {

        return;
    }


    secretAlleModuleAusblenden();


    secretRootTerminal.classList.remove(
        "secret-versteckt"
    );


    secretLevel3.classList.add(
        "aktiv"
    );


    secretActiveLevel.textContent =
        "ROOT TERMINAL";
}


// ========================================
// ACCESS INTRO
// ========================================

function secretIntroStarten() {

    secretLadebalken.style.width =
        "20%";


    setTimeout(
        function() {

            secretLadeText.textContent =
                "Authentifiziere Schlüssel...";

            secretLadebalken.style.width =
                "45%";
        },

        350
    );


    setTimeout(
        function() {

            secretLadeText.textContent =
                "Lade geheime Module...";

            secretLadebalken.style.width =
                "72%";
        },

        750
    );


    setTimeout(
        function() {

            secretLadeText.textContent =
                "ACCESS LEVEL VERIFIED";

            secretLadebalken.style.width =
                "100%";
        },

        1150
    );


    setTimeout(
        function() {

            secretIntro.classList.add(
                "secret-versteckt"
            );


            secretHauptbereich.classList.remove(
                "secret-versteckt"
            );

        },

        1700
    );
}


// ========================================
// EVENT LISTENER
// ========================================

secretCodePruefen.addEventListener(
    "click",
    secretAntwortPruefen
);


secretCodeAntwort.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Enter") {

            secretAntwortPruefen();
        }
    }
);


secretLevel1.addEventListener(
    "click",
    secretLevel1Anzeigen
);


secretLevel2.addEventListener(
    "click",
    secretLevel2Anzeigen
);


secretLevel3.addEventListener(
    "click",
    secretLevel3Anzeigen
);


// ========================================
// NEURAL-BUTTONS
// ========================================

neuralStart.addEventListener(
    "click",
    function() {

        if (neuralVaultGeloest) {

            return;
        }


        neuralTrainingLaeuft = true;

        neuralTrainingPausiert = false;


        neuralPause.textContent =
            "PAUSE";


        neuralInfo.textContent =
            "Neural training active...";


        if (neuralAnimationId === null) {

            neuralAnimation();
        }
    }
);


neuralPause.addEventListener(
    "click",
    function() {

        if (!neuralTrainingLaeuft) {

            neuralInfo.textContent =
                "Das Training wurde noch nicht gestartet.";

            return;
        }


        neuralTrainingPausiert =
            !neuralTrainingPausiert;


        if (neuralTrainingPausiert) {

            neuralPause.textContent =
                "CONTINUE";


            neuralInfo.textContent =
                "Training paused.";

        } else {

            neuralPause.textContent =
                "PAUSE";


            neuralInfo.textContent =
                "Training resumed.";
        }
    }
);


neuralEinzelschritt.addEventListener(
    "click",
    function() {

        if (neuralVaultGeloest) {

            return;
        }


        neuralEineEpoche();
    }
);


neuralReset.addEventListener(
    "click",
    neuralNetzZuruecksetzen
);


// Tab schließen

secretZurueck.addEventListener(
    "click",
    function() {

        window.close();
    }
);


// ========================================
// START
// ========================================

neuralNetzZuruecksetzen();

secretIntroStarten();