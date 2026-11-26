// ========================================
// SECRET ALGORITHM LAB
// CODE BREAKER + NEURAL VAULT REPAIR
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
// FREISCHALTUNGSZUSTAND
// ========================================

let secretLevel2Freigeschaltet = false;

let secretLevel3Freigeschaltet = false;


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

const secretCodeLoesung =
    "HELLO WORLD";

let secretVersuche = 0;


// ========================================
// LEVEL 2: ARCHITEKTUR
// ========================================

const neuralArchitekturOptionen =
    document.querySelectorAll(
        ".neural-architektur-option"
    );

const neuralArchitekturPruefen =
    document.getElementById(
        "neural-architektur-pruefen"
    );

const neuralArchitekturInfo =
    document.getElementById(
        "neural-architektur-info"
    );

const neuralArchitekturStatus =
    document.getElementById(
        "neural-architektur-status"
    );

const neuralPhaseGewichte =
    document.getElementById(
        "neural-phase-gewichte"
    );

const neuralGewichteStatus =
    document.getElementById(
        "neural-gewichte-status"
    );

const neuralModulStatus =
    document.getElementById(
        "neural-modul-status"
    );

let neuralGewaehlteArchitektur = null;

let neuralArchitekturKorrekt = false;


// ========================================
// LEVEL 2: GEWICHTE
// ========================================

const neuralGewichtH1B =
    document.getElementById(
        "neural-gewicht-h1-b"
    );

const neuralGewichtH2A =
    document.getElementById(
        "neural-gewicht-h2-a"
    );

const neuralBiasOutput =
    document.getElementById(
        "neural-bias-output"
    );

const neuralNetzTesten =
    document.getElementById(
        "neural-netz-testen"
    );

const neuralNaechsterTest =
    document.getElementById(
        "neural-naechster-test"
    );

const neuralRepairReset =
    document.getElementById(
        "neural-repair-reset"
    );

const neuralKorrektAnzeige =
    document.getElementById(
        "neural-korrekt-anzahl"
    );

const neuralVersucheAnzeige =
    document.getElementById(
        "neural-versuche"
    );

const neuralVaultStatus =
    document.getElementById(
        "neural-vault-status"
    );

const neuralFortschrittBalken =
    document.getElementById(
        "neural-repair-fortschritt-balken"
    );

const neuralRepairInfo =
    document.getElementById(
        "neural-repair-info"
    );


// ========================================
// LIVE-ANZEIGE
// ========================================

const neuralLiveA =
    document.getElementById(
        "neural-live-a"
    );

const neuralLiveB =
    document.getElementById(
        "neural-live-b"
    );

const neuralLiveH1 =
    document.getElementById(
        "neural-live-h1"
    );

const neuralLiveH2 =
    document.getElementById(
        "neural-live-h2"
    );

const neuralLiveOutput =
    document.getElementById(
        "neural-live-output"
    );

const neuralLiveZiel =
    document.getElementById(
        "neural-live-ziel"
    );

const neuralLiveStatus =
    document.getElementById(
        "neural-live-status"
    );


// ========================================
// NEURONEN
// ========================================

const neuralInputA =
    document.getElementById(
        "neural-input-a"
    );

const neuralInputB =
    document.getElementById(
        "neural-input-b"
    );

const neuralHidden1 =
    document.getElementById(
        "neural-hidden-1"
    );

const neuralHidden2 =
    document.getElementById(
        "neural-hidden-2"
    );

const neuralOutput =
    document.getElementById(
        "neural-output"
    );


// ========================================
// TESTTABELLEN-ELEMENTE
// ========================================

const neuralTestZeilen = [];

const neuralH1Anzeigen = [];

const neuralH2Anzeigen = [];

const neuralOutputAnzeigen = [];

const neuralResultatAnzeigen = [];


for (
    let index = 0;
    index < 4;
    index++
) {

    neuralTestZeilen.push(
        document.getElementById(
            "neural-test-zeile-"
            + index
        )
    );


    neuralH1Anzeigen.push(
        document.getElementById(
            "neural-h1-"
            + index
        )
    );


    neuralH2Anzeigen.push(
        document.getElementById(
            "neural-h2-"
            + index
        )
    );


    neuralOutputAnzeigen.push(
        document.getElementById(
            "neural-output-"
            + index
        )
    );


    neuralResultatAnzeigen.push(
        document.getElementById(
            "neural-resultat-"
            + index
        )
    );
}


// ========================================
// XOR-TESTDATEN
// ========================================

const neuralTestDaten = [

    {
        a: 0,
        b: 0,
        ziel: 0
    },

    {
        a: 0,
        b: 1,
        ziel: 1
    },

    {
        a: 1,
        b: 0,
        ziel: 1
    },

    {
        a: 1,
        b: 1,
        ziel: 0
    }

];


// ========================================
// NEURAL-ZUSTAND
// ========================================

let neuralTestErgebnisse = [];

let neuralAktuellerTest = 0;

let neuralVersuche = 0;

let neuralVaultGeloest = false;


// ========================================
// SCHWELLENFUNKTION
// ========================================

function neuralSchwelle(wert) {

    if (wert >= 0) {

        return 1;
    }


    return 0;
}


// ========================================
// NETZWERK AUSFÜHREN
// ========================================

function neuralNetzBerechnen(
    a,
    b
) {

    const gewichtH1B =
        Number(
            neuralGewichtH1B.value
        );


    const gewichtH2A =
        Number(
            neuralGewichtH2A.value
        );


    const outputBias =
        Number(
            neuralBiasOutput.value
        );


    // H1:
    // A-Gewicht = 1
    // B-Gewicht = Benutzerauswahl
    // Bias = -0.5

    const h1Summe =
        a * 1
        +
        b * gewichtH1B
        -
        0.5;


    const h1 =
        neuralSchwelle(
            h1Summe
        );


    // H2:
    // A-Gewicht = Benutzerauswahl
    // B-Gewicht = -1
    // Bias = 1.5

    const h2Summe =
        a * gewichtH2A
        +
        b * -1
        +
        1.5;


    const h2 =
        neuralSchwelle(
            h2Summe
        );


    // Output:
    // H1-Gewicht = 1
    // H2-Gewicht = 1
    // Bias = Benutzerauswahl

    const outputSumme =
        h1 * 1
        +
        h2 * 1
        +
        outputBias;


    const output =
        neuralSchwelle(
            outputSumme
        );


    return {

        a: a,

        b: b,

        h1: h1,

        h2: h2,

        output: output,

        h1Summe: h1Summe,

        h2Summe: h2Summe,

        outputSumme: outputSumme
    };
}


// ========================================
// ARCHITEKTUR AUSWÄHLEN
// ========================================

function neuralArchitekturAuswaehlen(
    option
) {

    neuralArchitekturOptionen.forEach(
        function(element) {

            element.classList.remove(
                "ausgewaehlt",
                "falsch"
            );
        }
    );


    option.classList.add(
        "ausgewaehlt"
    );


    neuralGewaehlteArchitektur =
        option.dataset.architektur;


    neuralArchitekturInfo.classList.remove(
        "richtig",
        "falsch"
    );


    neuralArchitekturInfo.textContent =
        "Ausgewählt: "
        + neuralGewaehlteArchitektur;
}


// ========================================
// ARCHITEKTUR PRÜFEN
// ========================================

function neuralArchitekturValidieren() {

    if (
        neuralGewaehlteArchitektur
        === null
    ) {

        neuralArchitekturInfo.classList.add(
            "falsch"
        );


        neuralArchitekturInfo.textContent =
            "Keine Architektur ausgewählt.";

        return;
    }


    if (
        neuralGewaehlteArchitektur
        !== "2-2-1"
    ) {

        neuralArchitekturOptionen.forEach(
            function(element) {

                if (
                    element.classList
                        .contains(
                            "ausgewaehlt"
                        )
                ) {

                    element.classList.add(
                        "falsch"
                    );
                }
            }
        );


        neuralArchitekturInfo.classList.remove(
            "richtig"
        );


        neuralArchitekturInfo.classList.add(
            "falsch"
        );


        if (
            neuralGewaehlteArchitektur
            === "2-1"
        ) {

            neuralArchitekturInfo.textContent =
                "ARCHITECTURE REJECTED: XOR ist nicht linear separierbar. Eine einzelne Ausgabeschicht reicht nicht aus.";

        } else {

            neuralArchitekturInfo.textContent =
                "ARCHITECTURE REJECTED: Das Sicherheitssystem benötigt genau einen binären Ausgang.";
        }


        return;
    }


    neuralArchitekturKorrekt = true;


    neuralArchitekturStatus.textContent =
        "VERIFIED";


    neuralArchitekturStatus.classList.add(
        "verifiziert"
    );


    neuralArchitekturInfo.classList.remove(
        "falsch"
    );


    neuralArchitekturInfo.classList.add(
        "richtig"
    );


    neuralArchitekturInfo.textContent =
        "ARCHITECTURE ACCEPTED: Die versteckte Schicht kann nichtlineare XOR-Muster abbilden.";


    neuralArchitekturPruefen.disabled =
        true;


    neuralArchitekturOptionen.forEach(
        function(element) {

            element.disabled = true;
        }
    );


    neuralPhaseGewichte.classList.remove(
        "neural-gesperrt"
    );


    neuralGewichteStatus.textContent =
        "REPAIR ACTIVE";


    neuralNetzTesten.disabled =
        false;


    neuralRepairReset.disabled =
        false;


    neuralRepairInfo.textContent =
        "Setze alle drei fehlenden Werte ein und teste anschließend das Netzwerk.";
}


// ========================================
// EINGABEN PRÜFEN
// ========================================

function neuralGewichteVollstaendig() {

    return (
        neuralGewichtH1B.value
        !== ""
        &&
        neuralGewichtH2A.value
        !== ""
        &&
        neuralBiasOutput.value
        !== ""
    );
}


// ========================================
// ALLE MUSTER TESTEN
// ========================================

function neuralNetzwerkTesten() {

    if (
        !neuralArchitekturKorrekt
        ||
        neuralVaultGeloest
    ) {

        return;
    }


    if (
        !neuralGewichteVollstaendig()
    ) {

        neuralRepairInfo.classList.remove(
            "erfolg"
        );


        neuralRepairInfo.classList.add(
            "fehler"
        );


        neuralRepairInfo.textContent =
            "REPAIR INCOMPLETE: Alle drei fehlenden Werte müssen eingesetzt werden.";

        return;
    }


    neuralVersuche++;


    neuralVersucheAnzeige.textContent =
        neuralVersuche;


    neuralTestErgebnisse = [];


    let korrekt = 0;


    for (
        let index = 0;
        index < neuralTestDaten.length;
        index++
    ) {

        const test =
            neuralTestDaten[index];


        const berechnung =
            neuralNetzBerechnen(
                test.a,
                test.b
            );


        const istKorrekt =
            berechnung.output
            ===
            test.ziel;


        if (istKorrekt) {

            korrekt++;
        }


        neuralTestErgebnisse.push({

            ...berechnung,

            ziel: test.ziel,

            korrekt: istKorrekt
        });


        neuralH1Anzeigen[
            index
        ].textContent =
            berechnung.h1;


        neuralH2Anzeigen[
            index
        ].textContent =
            berechnung.h2;


        neuralOutputAnzeigen[
            index
        ].textContent =
            berechnung.output;


        neuralResultatAnzeigen[
            index
        ].textContent =
            istKorrekt
                ? "CORRECT"
                : "FAILED";


        neuralTestZeilen[
            index
        ].classList.remove(
            "korrekt",
            "falsch",
            "aktiv"
        );


        neuralTestZeilen[
            index
        ].classList.add(
            istKorrekt
                ? "korrekt"
                : "falsch"
        );
    }


    neuralKorrektAnzeige.textContent =
        korrekt
        + " / 4";


    neuralFortschrittBalken.style.width =
        korrekt * 25
        + "%";


    neuralAktuellerTest = 0;


    neuralNaechsterTest.disabled =
        false;


    neuralLiveTestAnzeigen(
        neuralAktuellerTest
    );


    if (korrekt === 4) {

        neuralVaultAbschliessen();

        return;
    }


    neuralRepairInfo.classList.remove(
        "erfolg"
    );


    neuralRepairInfo.classList.add(
        "fehler"
    );


    if (korrekt === 3) {

        neuralRepairInfo.textContent =
            "VALIDATION 75 %: Nur ein Muster ist fehlerhaft. Untersuche, welches versteckte Neuron beim fehlgeschlagenen Fall falsch reagiert.";

    } else if (korrekt === 2) {

        neuralRepairInfo.textContent =
            "VALIDATION 50 %: Das Netzwerk bildet nur einen Teil der XOR-Regel ab. Prüfe OR-, NAND- und Output-Schwelle.";

    } else {

        neuralRepairInfo.textContent =
            "VALIDATION FAILED: Die eingesetzten Gewichte erzeugen kein verwendbares XOR-Netz.";
    }
}


// ========================================
// LIVE-TEST ANZEIGEN
// ========================================

function neuralLiveTestAnzeigen(index) {

    if (
        neuralTestErgebnisse.length
        === 0
    ) {

        return;
    }


    const ergebnis =
        neuralTestErgebnisse[index];


    neuralTestZeilen.forEach(
        function(element) {

            element.classList.remove(
                "aktiv"
            );
        }
    );


    neuralTestZeilen[
        index
    ].classList.add(
        "aktiv"
    );


    neuralLiveA.textContent =
        ergebnis.a;

    neuralLiveB.textContent =
        ergebnis.b;

    neuralLiveH1.textContent =
        ergebnis.h1;

    neuralLiveH2.textContent =
        ergebnis.h2;

    neuralLiveOutput.textContent =
        ergebnis.output;

    neuralLiveZiel.textContent =
        ergebnis.ziel;


    neuralLiveStatus.classList.remove(
        "korrekt",
        "falsch"
    );


    if (ergebnis.korrekt) {

        neuralLiveStatus.classList.add(
            "korrekt"
        );


        neuralLiveStatus.textContent =
            "MATCH: Netzwerk-Ausgabe entspricht dem XOR-Ziel.";

    } else {

        neuralLiveStatus.classList.add(
            "falsch"
        );


        neuralLiveStatus.textContent =
            "MISMATCH: Erwartet "
            + ergebnis.ziel
            + ", Netzwerk liefert "
            + ergebnis.output
            + ".";
    }


    neuralNeuronStatusSetzen(
        neuralInputA,
        ergebnis.a
    );


    neuralNeuronStatusSetzen(
        neuralInputB,
        ergebnis.b
    );


    neuralNeuronStatusSetzen(
        neuralHidden1,
        ergebnis.h1
    );


    neuralNeuronStatusSetzen(
        neuralHidden2,
        ergebnis.h2
    );


    neuralNeuronStatusSetzen(
        neuralOutput,
        ergebnis.output
    );


    neuralOutput.classList.remove(
        "falsches-ergebnis"
    );


    if (!ergebnis.korrekt) {

        neuralOutput.classList.add(
            "falsches-ergebnis"
        );
    }
}


// ========================================
// NEURONENSTATUS
// ========================================

function neuralNeuronStatusSetzen(
    element,
    wert
) {

    element.classList.remove(
        "aktiv",
        "inaktiv",
        "falsches-ergebnis"
    );


    element.classList.add(
        wert === 1
            ? "aktiv"
            : "inaktiv"
    );
}


// ========================================
// NÄCHSTES MUSTER
// ========================================

function neuralNaechstesMuster() {

    if (
        neuralTestErgebnisse.length
        === 0
    ) {

        return;
    }


    neuralAktuellerTest++;


    if (
        neuralAktuellerTest
        >=
        neuralTestErgebnisse.length
    ) {

        neuralAktuellerTest = 0;
    }


    neuralLiveTestAnzeigen(
        neuralAktuellerTest
    );
}


// ========================================
// REPAIR-WERTE ZURÜCKSETZEN
// ========================================

function neuralRepairZuruecksetzen() {

    if (neuralVaultGeloest) {

        return;
    }


    neuralGewichtH1B.value = "";

    neuralGewichtH2A.value = "";

    neuralBiasOutput.value = "";


    neuralTestErgebnisse = [];

    neuralAktuellerTest = 0;


    neuralKorrektAnzeige.textContent =
        "0 / 4";


    neuralFortschrittBalken.style.width =
        "0%";


    neuralNaechsterTest.disabled =
        true;


    neuralRepairInfo.classList.remove(
        "erfolg",
        "fehler"
    );


    neuralRepairInfo.textContent =
        "Werte zurückgesetzt. Rekonstruiere das Netzwerk erneut.";


    neuralLiveA.textContent = "-";
    neuralLiveB.textContent = "-";
    neuralLiveH1.textContent = "-";
    neuralLiveH2.textContent = "-";
    neuralLiveOutput.textContent = "-";
    neuralLiveZiel.textContent = "-";


    neuralLiveStatus.classList.remove(
        "korrekt",
        "falsch"
    );


    neuralLiveStatus.textContent =
        "Netzwerk noch nicht getestet.";


    neuralTestZeilen.forEach(
        function(element) {

            element.classList.remove(
                "aktiv",
                "korrekt",
                "falsch"
            );
        }
    );


    for (
        let index = 0;
        index < 4;
        index++
    ) {

        neuralH1Anzeigen[index]
            .textContent = "-";

        neuralH2Anzeigen[index]
            .textContent = "-";

        neuralOutputAnzeigen[index]
            .textContent = "-";

        neuralResultatAnzeigen[index]
            .textContent = "WAITING";
    }


    [
        neuralInputA,
        neuralInputB,
        neuralHidden1,
        neuralHidden2,
        neuralOutput
    ].forEach(
        function(element) {

            element.classList.remove(
                "aktiv",
                "inaktiv",
                "falsches-ergebnis"
            );
        }
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


    neuralVaultStatus.textContent =
        "OPEN";


    neuralModulStatus.textContent =
        "ACCESS GRANTED";


    neuralGewichteStatus.textContent =
        "CORE RESTORED";


    neuralFortschrittBalken.style.width =
        "100%";


    neuralRepairInfo.classList.remove(
        "fehler"
    );


    neuralRepairInfo.classList.add(
        "erfolg"
    );


    neuralRepairInfo.textContent =
        "4 / 4 PATTERNS VERIFIED // NEURAL CORE RESTORED // MODULE 03 UNLOCKED";


    neuralNetzTesten.disabled =
        true;

    neuralRepairReset.disabled =
        true;

    neuralNaechsterTest.disabled =
        false;


    neuralGewichtH1B.disabled =
        true;

    neuralGewichtH2A.disabled =
        true;

    neuralBiasOutput.disabled =
        true;


    secretLevel3Freischalten();
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
        antwort === secretCodeLoesung
    ) {

        secretCodeStatus.classList.remove(
            "falsch"
        );


        secretCodeStatus.classList.add(
            "richtig"
        );


        secretCodeStatus.textContent =
            "DECRYPTION SUCCESSFUL // MODULE 02 UNLOCKED";


        secretCodeAntwort.disabled = true;

        secretCodePruefen.disabled = true;


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


    secretLevel2Freigeschaltet = true;


    secretLevel2.disabled = false;


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


    secretLevel3Freigeschaltet = true;


    secretLevel3.disabled = false;


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
// LEVELS ÖFFNEN
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

// Level 1

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


// Levelkarten

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


// Architektur

neuralArchitekturOptionen.forEach(
    function(option) {

        option.addEventListener(
            "click",
            function() {

                neuralArchitekturAuswaehlen(
                    option
                );
            }
        );
    }
);


neuralArchitekturPruefen.addEventListener(
    "click",
    neuralArchitekturValidieren
);


// Netzwerk testen

neuralNetzTesten.addEventListener(
    "click",
    neuralNetzwerkTesten
);


neuralNaechsterTest.addEventListener(
    "click",
    neuralNaechstesMuster
);


neuralRepairReset.addEventListener(
    "click",
    neuralRepairZuruecksetzen
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

secretIntroStarten();