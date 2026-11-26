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

// ========================================
// LEVEL 3
// ROOT TERMINAL
// ========================================


// ========================================
// HTML-ELEMENTE
// ========================================

const rootTerminalAusgabe =
    document.getElementById(
        "root-terminal-ausgabe"
    );


const rootTerminalForm =
    document.getElementById(
        "root-terminal-form"
    );


const rootTerminalInput =
    document.getElementById(
        "root-terminal-input"
    );


const rootNetworkStatus =
    document.getElementById(
        "root-network-status"
    );


const rootNodeStatus =
    document.getElementById(
        "root-node-status"
    );


const rootAccessStatus =
    document.getElementById(
        "root-access-status"
    );


const rootCommandCount =
    document.getElementById(
        "root-command-count"
    );


const rootFortschrittText =
    document.getElementById(
        "root-fortschritt-text"
    );


const rootFortschrittBalken =
    document.getElementById(
        "root-fortschritt-balken"
    );


const rootInfo =
    document.getElementById(
        "root-info"
    );


const rootModulStatus =
    document.getElementById(
        "root-modul-status"
    );


const rootLevel4Card =
    document.getElementById(
        "secret-level-4"
    );


// ========================================
// TERMINAL-ZUSTAND
// ========================================

let rootBefehle =
    0;


let rootScanDurchgefuehrt =
    false;


let rootNodeBUntersucht =
    false;


let rootNodeBEntsperrt =
    false;


let rootRouteGefunden =
    false;


let rootLevelGeloest =
    false;


// ========================================
// TERMINAL-AUSGABE
// ========================================

function rootAusgeben(
    text,
    typ = "system"
) {

    const zeile =
        document.createElement(
            "div"
        );


    zeile.textContent =
        text;


    switch (typ) {

        case "befehl":

            zeile.className =
                "root-terminal-befehl";

            break;


        case "erfolg":

            zeile.className =
                "root-terminal-erfolg";

            break;


        case "fehler":

            zeile.className =
                "root-terminal-fehler";

            break;


        case "warnung":

            zeile.className =
                "root-terminal-warnung";

            break;


        case "info":

            zeile.className =
                "root-terminal-info";

            break;


        case "geheim":

            zeile.className =
                "root-terminal-geheim";

            break;


        default:

            zeile.className =
                "root-terminal-system";
    }


    rootTerminalAusgabe.appendChild(
        zeile
    );


    rootTerminalAusgabe.scrollTop =
        rootTerminalAusgabe.scrollHeight;
}


// ========================================
// TRENNLINIE
// ========================================

function rootTrennlinie() {

    rootAusgeben(
        "-----------------------------------------------"
    );
}


// ========================================
// FORTSCHRITT
// ========================================

function rootFortschrittSetzen(
    prozent
) {

    rootFortschrittText.textContent =
        prozent + " %";


    rootFortschrittBalken.style.width =
        prozent + "%";
}


// ========================================
// HELP
// ========================================

function rootHelp() {

    rootAusgeben(
        "AVAILABLE COMMANDS:",
        "info"
    );


    rootAusgeben(
        "help"
    );


    rootAusgeben(
        "scan"
    );


    rootAusgeben(
        "status"
    );


    rootAusgeben(
        "inspect <node>"
    );


    rootAusgeben(
        "unlock <node> <hex-key>"
    );


    rootAusgeben(
        "trace <route>"
    );


    rootAusgeben(
        "authorize <token>"
    );


    rootAusgeben(
        "clear"
    );


    rootAusgeben(
        ""
    );


    rootAusgeben(
        "Commands are not case-sensitive."
    );
}


// ========================================
// SCAN
// ========================================

function rootScan() {

    rootScanDurchgefuehrt =
        true;


    rootNetworkStatus.textContent =
        "COMPROMISED";


    rootAusgeben(
        "Scanning security network...",
        "info"
    );


    rootTrennlinie();


    rootAusgeben(
        "NODE-A     ONLINE",
        "erfolg"
    );


    rootAusgeben(
        "NODE-B     CORRUPTED",
        "warnung"
    );


    rootAusgeben(
        "NODE-C     LOCKED",
        "fehler"
    );


    rootAusgeben(
        "NODE-D     OFFLINE"
    );


    rootTrennlinie();


    rootAusgeben(
        "1 corrupted node detected.",
        "warnung"
    );


    rootNodeStatus.textContent =
        "NODE-B";


    rootFortschrittSetzen(
        20
    );


    rootInfo.textContent =
        "Netzwerk gescannt. Ein beschädigter Sicherheitsknoten wurde gefunden.";
}


// ========================================
// STATUS
// ========================================

function rootStatus() {

    rootAusgeben(
        "SYSTEM STATUS:",
        "info"
    );


    rootAusgeben(
        "NETWORK: "
        +
        (
            rootScanDurchgefuehrt
                ? "COMPROMISED"
                : "UNKNOWN"
        )
    );


    rootAusgeben(
        "NODE-B: "
        +
        (
            rootNodeBEntsperrt
                ? "RESTORED"
                : rootNodeBUntersucht
                    ? "CORRUPTED / ANALYZED"
                    : rootScanDurchgefuehrt
                        ? "CORRUPTED"
                        : "UNKNOWN"
        )
    );


    rootAusgeben(
        "ROUTE: "
        +
        (
            rootRouteGefunden
                ? "TRACED"
                : "UNKNOWN"
        )
    );


    rootAusgeben(
        "ROOT ACCESS: "
        +
        (
            rootLevelGeloest
                ? "AUTHORIZED"
                : "LOCKED"
        )
    );
}


// ========================================
// INSPECT
// ========================================

function rootInspect(
    argumente
) {

    if (!rootScanDurchgefuehrt) {

        rootAusgeben(
            "ERROR: Run network scan first.",
            "fehler"
        );

        return;
    }


    if (argumente.length === 0) {

        rootAusgeben(
            "Usage: inspect <node>",
            "fehler"
        );

        return;
    }


    const node =
        argumente[0]
            .toLowerCase();


    if (node === "node-a") {

        rootAusgeben(
            "NODE-A",
            "info"
        );


        rootAusgeben(
            "STATUS: ONLINE"
        );


        rootAusgeben(
            "No anomalies detected."
        );


        return;
    }


    if (node === "node-c") {

        rootAusgeben(
            "NODE-C",
            "info"
        );


        rootAusgeben(
            "STATUS: LOCKED"
        );


        rootAusgeben(
            "Requires valid route authorization."
        );


        return;
    }


    if (node === "node-d") {

        rootAusgeben(
            "NODE-D",
            "info"
        );


        rootAusgeben(
            "STATUS: OFFLINE"
        );


        rootAusgeben(
            "No response."
        );


        return;
    }


    if (node !== "node-b") {

        rootAusgeben(
            "ERROR: Unknown node.",
            "fehler"
        );

        return;
    }


    rootNodeBUntersucht =
        true;


    rootAusgeben(
        "Inspecting NODE-B...",
        "info"
    );


    rootTrennlinie();


    rootAusgeben(
        "STATUS        CORRUPTED",
        "warnung"
    );


    rootAusgeben(
        "CIPHER        XOR"
    );


    rootAusgeben(
        "DATA BYTE     0x6A"
    );


    rootAusgeben(
        "MASK BYTE     0x2F"
    );


    rootAusgeben(
        "KEY FORMAT    HEX"
    );


    rootTrennlinie();


    rootAusgeben(
        "Recovery key = DATA BYTE XOR MASK BYTE",
        "geheim"
    );


    rootFortschrittSetzen(
        40
    );


    rootInfo.textContent =
        "NODE-B analysiert. Rekonstruiere den XOR-Recovery-Key.";
}


// ========================================
// UNLOCK
// ========================================

function rootUnlock(
    argumente
) {

    if (!rootNodeBUntersucht) {

        rootAusgeben(
            "ERROR: Target node has not been analyzed.",
            "fehler"
        );

        return;
    }


    if (argumente.length < 2) {

        rootAusgeben(
            "Usage: unlock <node> <hex-key>",
            "fehler"
        );

        return;
    }


    const node =
        argumente[0]
            .toLowerCase();


    const schluessel =
        argumente[1]
            .toUpperCase()
            .replace(
                /^0X/,
                ""
            );


    if (node !== "node-b") {

        rootAusgeben(
            "ACCESS DENIED: Node cannot be unlocked with this recovery method.",
            "fehler"
        );

        return;
    }


    /*
        0x6A XOR 0x2F = 0x45
    */

    if (schluessel !== "45") {

        rootAusgeben(
            "ACCESS DENIED: Invalid recovery key.",
            "fehler"
        );


        rootAusgeben(
            "NODE-B remains corrupted.",
            "warnung"
        );


        return;
    }


    rootNodeBEntsperrt =
        true;


    rootNodeStatus.textContent =
        "RESTORED";


    rootAusgeben(
        "Recovery key accepted.",
        "erfolg"
    );


    rootAusgeben(
        "NODE-B integrity restored.",
        "erfolg"
    );


    rootTrennlinie();


    rootAusgeben(
        "RECOVERED ROUTING TABLE:",
        "info"
    );


    rootAusgeben(
        "ROUTE = 3-1-4-2",
        "geheim"
    );


    rootAusgeben(
        "Trace recovered route to locate authorization token."
    );


    rootFortschrittSetzen(
        65
    );


    rootInfo.textContent =
        "NODE-B wurde repariert. Eine versteckte Routing-Sequenz wurde gefunden.";
}


// ========================================
// TRACE
// ========================================

function rootTrace(
    argumente
) {

    if (!rootNodeBEntsperrt) {

        rootAusgeben(
            "ERROR: Routing table unavailable.",
            "fehler"
        );

        return;
    }


    if (argumente.length === 0) {

        rootAusgeben(
            "Usage: trace <route>",
            "fehler"
        );

        return;
    }


    let route =
        argumente.join("")
            .replace(
                /-/g,
                ""
            );


    if (route !== "3142") {

        rootAusgeben(
            "TRACE FAILED: Invalid route.",
            "fehler"
        );

        return;
    }


    rootRouteGefunden =
        true;


    rootAusgeben(
        "Tracing route 3 → 1 → 4 → 2...",
        "info"
    );


    rootAusgeben(
        "[3] SECURE RELAY FOUND"
    );


    rootAusgeben(
        "[1] SIGNATURE VERIFIED"
    );


    rootAusgeben(
        "[4] ROOT CHANNEL OPEN"
    );


    rootAusgeben(
        "[2] TOKEN RECOVERED",
        "erfolg"
    );


    rootTrennlinie();


    rootAusgeben(
        "AUTHORIZATION TOKEN:",
        "geheim"
    );


    rootAusgeben(
        "ROOT-3142",
        "geheim"
    );


    rootFortschrittSetzen(
        85
    );


    rootInfo.textContent =
        "Root-Token gefunden. Das System wartet auf Autorisierung.";
}


// ========================================
// AUTHORIZE
// ========================================

function rootAuthorize(
    argumente
) {

    if (!rootRouteGefunden) {

        rootAusgeben(
            "ERROR: No authorization token has been recovered.",
            "fehler"
        );

        return;
    }


    if (argumente.length === 0) {

        rootAusgeben(
            "Usage: authorize <token>",
            "fehler"
        );

        return;
    }


    const token =
        argumente.join("")
            .toUpperCase();


    if (token !== "ROOT-3142") {

        rootAusgeben(
            "AUTHORIZATION FAILED.",
            "fehler"
        );

        return;
    }


    rootLevelAbschliessen();
}


// ========================================
// LEVEL ABSCHLIESSEN
// ========================================

function rootLevelAbschliessen() {

    if (rootLevelGeloest) {

        return;
    }


    rootLevelGeloest =
        true;


    rootAccessStatus.textContent =
        "AUTHORIZED";


    rootModulStatus.textContent =
        "ROOT ACCESS";


    rootFortschrittSetzen(
        100
    );


    rootAusgeben(
        "",
        "erfolg"
    );


    rootTrennlinie();


    rootAusgeben(
        "ROOT AUTHORIZATION ACCEPTED",
        "erfolg"
    );


    rootAusgeben(
        "SECURITY NETWORK RESTORED",
        "erfolg"
    );


    rootAusgeben(
        "CLASSIFIED MODULE ACCESS GRANTED",
        "geheim"
    );


    rootTrennlinie();


    rootInfo.classList.add(
        "erfolg"
    );


    rootInfo.textContent =
        "ROOT ACCESS GRANTED // MODULE 04 UNLOCKED";


    // ====================================
    // LEVEL 4 FREISCHALTEN
    // ====================================

    rootLevel4Card.disabled =
        false;


    rootLevel4Card.classList.remove(
        "gesperrt"
    );


    rootLevel4Card.classList.add(
        "freigeschaltet"
    );


    const status =
        rootLevel4Card.querySelector(
            ".secret-level-status"
        );


    status.textContent =
        "UNLOCKED";


    const nummer =
        rootLevel4Card.querySelector(
            ".secret-level-nummer"
        );


    nummer.textContent =
        "04";


    secretSecurityLevel.textContent =
        "4 / 4";


    secretUnlockedCount.textContent =
        "4 / 4";
}


// ========================================
// CLEAR
// ========================================

function rootClear() {

    rootTerminalAusgabe.innerHTML =
        "";


    rootAusgeben(
        "Terminal cleared."
    );
}


// ========================================
// BEFEHL VERARBEITEN
// ========================================

function rootBefehlVerarbeiten(
    eingabe
) {

    const bereinigt =
        eingabe
            .trim();


    if (bereinigt === "") {

        return;
    }


    rootBefehle++;


    rootCommandCount.textContent =
        rootBefehle;


    rootAusgeben(
        bereinigt,
        "befehl"
    );


    const teile =
        bereinigt
            .split(/\s+/);


    const befehl =
        teile.shift()
            .toLowerCase();


    const argumente =
        teile;


    switch (befehl) {

        case "help":

            rootHelp();

            break;


        case "scan":

            rootScan();

            break;


        case "status":

            rootStatus();

            break;


        case "inspect":

            rootInspect(
                argumente
            );

            break;


        case "unlock":

            rootUnlock(
                argumente
            );

            break;


        case "trace":

            rootTrace(
                argumente
            );

            break;


        case "authorize":

            rootAuthorize(
                argumente
            );

            break;


        case "clear":

            rootClear();

            break;


        default:

            rootAusgeben(
                "Command not found: "
                + befehl,
                "fehler"
            );


            rootAusgeben(
                'Type "help" for available commands.'
            );
    }
}


// ========================================
// TERMINAL FORM
// ========================================

rootTerminalForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const eingabe =
            rootTerminalInput.value;


        rootTerminalInput.value =
            "";


        rootBefehlVerarbeiten(
            eingabe
        );


        rootTerminalInput.focus();
    }
);


// ========================================
// LEVEL 3 KARTE
//
// Nach Öffnen direkt Eingabefeld fokussieren.
// ========================================

secretLevel3.addEventListener(
    "click",
    function() {

        if (
            secretLevel3Freigeschaltet
        ) {

            setTimeout(
                function() {

                    rootTerminalInput.focus();
                },
                50
            );
        }
    }
);

// ========================================
// LEVEL 4 START
// ALGORITHM CORE
// ========================================


// ========================================
// HAUPTELEMENTE
// ========================================

const secretAlgorithmCore =
    document.getElementById(
        "secret-algorithm-core"
    );

const coreModulStatus =
    document.getElementById(
        "core-modul-status"
    );

const coreKnotenAnzahl =
    document.getElementById(
        "core-knoten-anzahl"
    );

const coreStatus =
    document.getElementById(
        "core-status"
    );

const coreAccessStatus =
    document.getElementById(
        "core-access-status"
    );

const coreFortschrittText =
    document.getElementById(
        "core-fortschritt-text"
    );

const coreFortschrittBalken =
    document.getElementById(
        "core-fortschritt-balken"
    );


// ========================================
// KNOTENKARTEN
// ========================================

const coreKnotenSort =
    document.getElementById(
        "core-knoten-sort"
    );

const coreKnotenSearch =
    document.getElementById(
        "core-knoten-search"
    );

const coreKnotenCrypto =
    document.getElementById(
        "core-knoten-crypto"
    );

const coreKnotenAi =
    document.getElementById(
        "core-knoten-ai"
    );

const coreKnotenKarten = [
    coreKnotenSort,
    coreKnotenSearch,
    coreKnotenCrypto,
    coreKnotenAi
];


// ========================================
// TEILMODULE
// ========================================

const coreSortModul =
    document.getElementById(
        "core-sort-modul"
    );

const coreSearchModul =
    document.getElementById(
        "core-search-modul"
    );

const coreCryptoModul =
    document.getElementById(
        "core-crypto-modul"
    );

const coreAiModul =
    document.getElementById(
        "core-ai-modul"
    );

const coreTeilmodule = [
    coreSortModul,
    coreSearchModul,
    coreCryptoModul,
    coreAiModul
];


// ========================================
// SORT NODE
// ========================================

const coreSortAntwort =
    document.getElementById(
        "core-sort-antwort"
    );

const coreSortPruefen =
    document.getElementById(
        "core-sort-pruefen"
    );

const coreSortInfo =
    document.getElementById(
        "core-sort-info"
    );

const coreSortStatus =
    document.getElementById(
        "core-sort-status"
    );

const coreSortKartenstatus =
    document.getElementById(
        "core-sort-kartenstatus"
    );


// ========================================
// SEARCH NODE
// ========================================

const coreSearchButtons =
    document.querySelectorAll(
        "#core-search-zahlen button"
    );

const coreSearchSequenzAnzeige =
    document.getElementById(
        "core-search-sequenz"
    );

const coreSearchPruefen =
    document.getElementById(
        "core-search-pruefen"
    );

const coreSearchReset =
    document.getElementById(
        "core-search-reset"
    );

const coreSearchInfo =
    document.getElementById(
        "core-search-info"
    );

const coreSearchStatus =
    document.getElementById(
        "core-search-status"
    );

const coreSearchKartenstatus =
    document.getElementById(
        "core-search-kartenstatus"
    );


// ========================================
// CRYPTO NODE
// ========================================

const coreCryptoAntwort =
    document.getElementById(
        "core-crypto-antwort"
    );

const coreCryptoPruefen =
    document.getElementById(
        "core-crypto-pruefen"
    );

const coreCryptoInfo =
    document.getElementById(
        "core-crypto-info"
    );

const coreCryptoStatus =
    document.getElementById(
        "core-crypto-status"
    );

const coreCryptoKartenstatus =
    document.getElementById(
        "core-crypto-kartenstatus"
    );


// ========================================
// AI NODE
// ========================================

const coreAiSituationAnzeige =
    document.getElementById(
        "core-ai-situation"
    );

const coreAiPunkteAnzeige =
    document.getElementById(
        "core-ai-punkte"
    );

const coreAiVersucheAnzeige =
    document.getElementById(
        "core-ai-versuche"
    );

const coreAiLinks =
    document.getElementById(
        "core-ai-links"
    );

const coreAiVorne =
    document.getElementById(
        "core-ai-vorne"
    );

const coreAiRechts =
    document.getElementById(
        "core-ai-rechts"
    );

const coreAiLinksBalken =
    document.getElementById(
        "core-ai-links-balken"
    );

const coreAiVorneBalken =
    document.getElementById(
        "core-ai-vorne-balken"
    );

const coreAiRechtsBalken =
    document.getElementById(
        "core-ai-rechts-balken"
    );

const coreAiH1Antwort =
    document.getElementById(
        "core-ai-h1-antwort"
    );

const coreAiH2Antwort =
    document.getElementById(
        "core-ai-h2-antwort"
    );

const coreAiH3Antwort =
    document.getElementById(
        "core-ai-h3-antwort"
    );

const coreAiPruefen =
    document.getElementById(
        "core-ai-pruefen"
    );

const coreAiResetEingabe =
    document.getElementById(
        "core-ai-reset-eingabe"
    );

const coreAiAktionen =
    document.querySelectorAll(
        ".core-ai-aktionen button"
    );

const coreAiH1Status =
    document.getElementById(
        "core-ai-h1-status"
    );

const coreAiH2Status =
    document.getElementById(
        "core-ai-h2-status"
    );

const coreAiH3Status =
    document.getElementById(
        "core-ai-h3-status"
    );

const coreAiOutputStatus =
    document.getElementById(
        "core-ai-output-status"
    );

const coreAiInfo =
    document.getElementById(
        "core-ai-info"
    );

const coreAiStatus =
    document.getElementById(
        "core-ai-status"
    );

const coreAiKartenstatus =
    document.getElementById(
        "core-ai-kartenstatus"
    );


// ========================================
// AI NEURONEN
// ========================================

const coreAiNeuronLinks =
    document.getElementById(
        "core-ai-neuron-links"
    );

const coreAiNeuronVorne =
    document.getElementById(
        "core-ai-neuron-vorne"
    );

const coreAiNeuronRechts =
    document.getElementById(
        "core-ai-neuron-rechts"
    );

const coreAiNeuronH1 =
    document.getElementById(
        "core-ai-neuron-h1"
    );

const coreAiNeuronH2 =
    document.getElementById(
        "core-ai-neuron-h2"
    );

const coreAiNeuronH3 =
    document.getElementById(
        "core-ai-neuron-h3"
    );

const coreAiNeuronOutput =
    document.getElementById(
        "core-ai-neuron-output"
    );

const coreAiBerechnungsZeilen =
    document.querySelectorAll(
        ".core-ai-neuron-berechnung"
    );


// ========================================
// FRAGMENTE / FINALE
// ========================================

const coreFragmentSort =
    document.getElementById(
        "core-fragment-sort"
    );

const coreFragmentSearch =
    document.getElementById(
        "core-fragment-search"
    );

const coreFragmentCrypto =
    document.getElementById(
        "core-fragment-crypto"
    );

const coreFragmentAi =
    document.getElementById(
        "core-fragment-ai"
    );

const coreFinalBereich =
    document.getElementById(
        "core-final-bereich"
    );

const coreFinalCode =
    document.getElementById(
        "core-final-code"
    );

const coreFinalPruefen =
    document.getElementById(
        "core-final-pruefen"
    );

const coreFinalInfo =
    document.getElementById(
        "core-final-info"
    );

const coreAbschluss =
    document.getElementById(
        "core-abschluss"
    );


// ========================================
// SPIELZUSTAND
// ========================================

let coreSortGeloest = false;
let coreSearchGeloest = false;
let coreCryptoGeloest = false;
let coreAiGeloest = false;

let coreKomplettGeloest = false;

let coreSearchSequenz = [];


// ========================================
// SEARCH LÖSUNG
// ========================================

const coreSearchLoesung = [
    13,
    24
];


// ========================================
// AI SITUATIONEN
// ========================================

const coreAiSituationen = [

    {
        links: 0.20,
        vorne: 0.90,
        rechts: 0.40
    },

    {
        links: 0.85,
        vorne: 0.12,
        rechts: 0.45
    },

    {
        links: 0.22,
        vorne: 0.15,
        rechts: 0.88
    },

    {
        links: 0.80,
        vorne: 0.50,
        rechts: 0.20
    },

    {
        links: 0.10,
        vorne: 0.10,
        rechts: 0.20
    }
];

let coreAiAktuellerIndex = 0;

let coreAiKorrekteSituationen = 0;

let coreAiVersuche = 0;

let coreAiGewaehlteRichtung = null;


// ========================================
// KNOTEN ANZEIGEN
// ========================================

function coreKnotenAnzeigen(knoten) {

    coreTeilmodule.forEach(
        function(modul) {

            modul.classList.add(
                "secret-versteckt"
            );
        }
    );


    coreKnotenKarten.forEach(
        function(karte) {

            karte.classList.remove(
                "ausgewaehlt"
            );
        }
    );


    if (knoten === "sort") {

        coreSortModul.classList.remove(
            "secret-versteckt"
        );

        coreKnotenSort.classList.add(
            "ausgewaehlt"
        );
    }


    if (knoten === "search") {

        coreSearchModul.classList.remove(
            "secret-versteckt"
        );

        coreKnotenSearch.classList.add(
            "ausgewaehlt"
        );
    }


    if (knoten === "crypto") {

        coreCryptoModul.classList.remove(
            "secret-versteckt"
        );

        coreKnotenCrypto.classList.add(
            "ausgewaehlt"
        );
    }


    if (knoten === "ai") {

        coreAiModul.classList.remove(
            "secret-versteckt"
        );

        coreKnotenAi.classList.add(
            "ausgewaehlt"
        );

        coreAiSituationAnzeigen();
    }
}


// ========================================
// SORT NODE
// ========================================

function coreSortAntwortPruefen() {

    if (coreSortGeloest) {
        return;
    }


    const antwort =
        Number(
            coreSortAntwort.value
        );


    coreSortInfo.classList.remove(
        "richtig",
        "falsch"
    );


    if (antwort !== 19) {

        coreSortInfo.classList.add(
            "falsch"
        );

        coreSortInfo.textContent =
            "SORT VERIFICATION FAILED: Überprüfe den ersten vollständigen Bubble-Sort-Durchlauf.";

        return;
    }


    coreSortGeloest = true;


    coreSortInfo.classList.add(
        "richtig"
    );

    coreSortInfo.textContent =
        "SORT NODE RESTORED // FRAGMENT: 19";


    coreSortStatus.textContent =
        "ONLINE";

    coreSortStatus.classList.add(
        "online"
    );


    coreSortKartenstatus.textContent =
        "ONLINE";

    coreKnotenSort.classList.add(
        "wiederhergestellt"
    );


    coreSortAntwort.disabled = true;
    coreSortPruefen.disabled = true;


    coreFragmentSort.textContent =
        "...";


    coreStatusAktualisieren();
}


// ========================================
// SEARCH NODE
// ========================================

function coreSearchWertWaehlen(button) {

    if (coreSearchGeloest) {
        return;
    }


    const wert =
        Number(
            button.dataset.wert
        );


    coreSearchSequenz.push(
        wert
    );


    button.classList.add(
        "gewaehlt"
    );


    coreSearchSequenzAnzeige.textContent =
        coreSearchSequenz.join(
            " → "
        );
}


function coreSearchAntwortPruefen() {

    if (coreSearchGeloest) {
        return;
    }


    const korrekt =
        coreSearchSequenz.length
        ===
        coreSearchLoesung.length
        &&
        coreSearchSequenz.every(
            function(wert, index) {

                return (
                    wert
                    ===
                    coreSearchLoesung[index]
                );
            }
        );


    coreSearchInfo.classList.remove(
        "richtig",
        "falsch"
    );


    if (!korrekt) {

        coreSearchInfo.classList.add(
            "falsch"
        );

        coreSearchInfo.textContent =
            "SEARCH VERIFICATION FAILED: Prüfe die Mittelwerte des Suchbereichs.";

        return;
    }


    coreSearchGeloest = true;


    coreSearchInfo.classList.add(
        "richtig"
    );

    coreSearchInfo.textContent =
        "SEARCH NODE RESTORED // FRAGMENT: 24";


    coreSearchStatus.textContent =
        "ONLINE";

    coreSearchStatus.classList.add(
        "online"
    );


    coreSearchKartenstatus.textContent =
        "ONLINE";

    coreKnotenSearch.classList.add(
        "wiederhergestellt"
    );


    coreSearchButtons.forEach(
        function(button) {

            button.disabled = true;
        }
    );


    coreSearchPruefen.disabled = true;
    coreSearchReset.disabled = true;


    coreFragmentSearch.textContent =
        "...";


    coreStatusAktualisieren();
}


function coreSearchZuruecksetzen() {

    if (coreSearchGeloest) {
        return;
    }


    coreSearchSequenz = [];


    coreSearchSequenzAnzeige.textContent =
        "-";


    coreSearchButtons.forEach(
        function(button) {

            button.classList.remove(
                "gewaehlt"
            );
        }
    );


    coreSearchInfo.classList.remove(
        "richtig",
        "falsch"
    );


    coreSearchInfo.textContent =
        "Sequenz zurückgesetzt.";
}


// ========================================
// CRYPTO NODE
// ========================================

function coreCryptoAntwortPruefen() {

    if (coreCryptoGeloest) {
        return;
    }


    const antwort =
        coreCryptoAntwort.value
            .trim()
            .replace(/\s/g, "");


    coreCryptoInfo.classList.remove(
        "richtig",
        "falsch"
    );


    if (antwort !== "01100011") {

        coreCryptoInfo.classList.add(
            "falsch"
        );

        coreCryptoInfo.textContent =
            "CRYPTO VERIFICATION FAILED: Prüfe jedes Bitpaar.";

        return;
    }


    coreCryptoGeloest = true;


    coreCryptoInfo.classList.add(
        "richtig"
    );

    coreCryptoInfo.textContent =
        "CRYPTO NODE RESTORED // 01100011 = HEX 63";


    coreCryptoStatus.textContent =
        "ONLINE";

    coreCryptoStatus.classList.add(
        "online"
    );


    coreCryptoKartenstatus.textContent =
        "ONLINE";

    coreKnotenCrypto.classList.add(
        "wiederhergestellt"
    );


    coreCryptoAntwort.disabled = true;
    coreCryptoPruefen.disabled = true;


    coreFragmentCrypto.textContent =
        "...";


    coreStatusAktualisieren();
}


// ========================================
// AI NODE
// ========================================

function coreAiSchwelle(wert) {

    return wert > 0
        ? 1
        : 0;
}


function coreAiNetzBerechnen(
    situation
) {

    const links =
        situation.links;

    const vorne =
        situation.vorne;

    const rechts =
        situation.rechts;


    const h1Summe =
        links * 0.8
        +
        vorne * -0.6
        +
        rechts * 0.2
        -
        0.1;


    const h2Summe =
        links * -0.4
        +
        vorne * 0.9
        +
        rechts * 0.4
        +
        0.2;


    const h3Summe =
        links * 0.3
        +
        vorne * 0.5
        +
        rechts * -0.8;


    const h1 =
        coreAiSchwelle(
            h1Summe
        );


    const h2 =
        coreAiSchwelle(
            h2Summe
        );


    const h3 =
        coreAiSchwelle(
            h3Summe
        );


    const steeringScore =
        h1 * -1
        +
        h2 * 0
        +
        h3 * 1;


    let richtung =
        "vorne";


    if (steeringScore < 0) {

        richtung =
            "links";
    }


    if (steeringScore > 0) {

        richtung =
            "rechts";
    }


    return {

        h1: h1,
        h2: h2,
        h3: h3,

        h1Summe: h1Summe,
        h2Summe: h2Summe,
        h3Summe: h3Summe,

        steeringScore:
            steeringScore,

        richtung:
            richtung
    };
}


// ========================================
// AI SITUATION ANZEIGEN
// ========================================

function coreAiSituationAnzeigen() {

    if (
        coreAiGeloest
        ||
        coreAiAktuellerIndex >=
        coreAiSituationen.length
    ) {

        return;
    }


    const situation =
        coreAiSituationen[
            coreAiAktuellerIndex
        ];


    coreAiSituationAnzeige.textContent =
        (coreAiAktuellerIndex + 1)
        + " / "
        + coreAiSituationen.length;


    coreAiPunkteAnzeige.textContent =
        coreAiKorrekteSituationen
        + " / "
        + coreAiSituationen.length;


    coreAiVersucheAnzeige.textContent =
        coreAiVersuche;


    coreAiLinks.textContent =
        situation.links.toFixed(2);

    coreAiVorne.textContent =
        situation.vorne.toFixed(2);

    coreAiRechts.textContent =
        situation.rechts.toFixed(2);


    coreAiLinksBalken.style.width =
        situation.links * 100
        + "%";

    coreAiVorneBalken.style.width =
        situation.vorne * 100
        + "%";

    coreAiRechtsBalken.style.width =
        situation.rechts * 100
        + "%";


    coreAiEingabeZuruecksetzen();


    coreAiSensorNeuronSetzen(
        coreAiNeuronLinks,
        situation.links
    );

    coreAiSensorNeuronSetzen(
        coreAiNeuronVorne,
        situation.vorne
    );

    coreAiSensorNeuronSetzen(
        coreAiNeuronRechts,
        situation.rechts
    );


    coreAiInfo.classList.remove(
        "richtig",
        "falsch"
    );


    coreAiInfo.textContent =
        "Berechne H1, H2 und H3 und bestimme anschließend den Steering Score.";
}


function coreAiSensorNeuronSetzen(
    element,
    wert
) {

    element.classList.remove(
        "aktiv",
        "inaktiv",
        "falsch"
    );


    element.classList.add(
        wert >= 0.5
            ? "aktiv"
            : "inaktiv"
    );
}


// ========================================
// AI RICHTUNG AUSWÄHLEN
// ========================================

function coreAiRichtungWaehlen(
    button
) {

    if (coreAiGeloest) {
        return;
    }


    coreAiAktionen.forEach(
        function(element) {

            element.classList.remove(
                "ausgewaehlt"
            );
        }
    );


    button.classList.add(
        "ausgewaehlt"
    );


    coreAiGewaehlteRichtung =
        button.dataset.richtung;
}


// ========================================
// AI VORHERSAGE PRÜFEN
// ========================================

function coreAiVorhersagePruefen() {

    if (coreAiGeloest) {
        return;
    }


    if (
        coreAiH1Antwort.value === ""
        ||
        coreAiH2Antwort.value === ""
        ||
        coreAiH3Antwort.value === ""
        ||
        coreAiGewaehlteRichtung === null
    ) {

        coreAiInfo.classList.remove(
            "richtig"
        );

        coreAiInfo.classList.add(
            "falsch"
        );

        coreAiInfo.textContent =
            "PREDICTION INCOMPLETE: H1, H2, H3 und Steering müssen ausgewählt werden.";

        return;
    }


    coreAiVersuche++;


    coreAiVersucheAnzeige.textContent =
        coreAiVersuche;


    const situation =
        coreAiSituationen[
            coreAiAktuellerIndex
        ];


    const korrekt =
        coreAiNetzBerechnen(
            situation
        );


    const antwortH1 =
        Number(
            coreAiH1Antwort.value
        );

    const antwortH2 =
        Number(
            coreAiH2Antwort.value
        );

    const antwortH3 =
        Number(
            coreAiH3Antwort.value
        );


    const h1Richtig =
        antwortH1 === korrekt.h1;

    const h2Richtig =
        antwortH2 === korrekt.h2;

    const h3Richtig =
        antwortH3 === korrekt.h3;

    const outputRichtig =
        coreAiGewaehlteRichtung
        ===
        korrekt.richtung;


    coreAiDiagnoseSetzen(
        coreAiH1Status,
        h1Richtig
    );

    coreAiDiagnoseSetzen(
        coreAiH2Status,
        h2Richtig
    );

    coreAiDiagnoseSetzen(
        coreAiH3Status,
        h3Richtig
    );

    coreAiDiagnoseSetzen(
        coreAiOutputStatus,
        outputRichtig
    );


    coreAiBerechnungsZeilen[
        0
    ].classList.toggle(
        "richtig",
        h1Richtig
    );

    coreAiBerechnungsZeilen[
        0
    ].classList.toggle(
        "falsch",
        !h1Richtig
    );


    coreAiBerechnungsZeilen[
        1
    ].classList.toggle(
        "richtig",
        h2Richtig
    );

    coreAiBerechnungsZeilen[
        1
    ].classList.toggle(
        "falsch",
        !h2Richtig
    );


    coreAiBerechnungsZeilen[
        2
    ].classList.toggle(
        "richtig",
        h3Richtig
    );

    coreAiBerechnungsZeilen[
        2
    ].classList.toggle(
        "falsch",
        !h3Richtig
    );


    coreAiNeuronSetzen(
        coreAiNeuronH1,
        korrekt.h1,
        h1Richtig
    );

    coreAiNeuronSetzen(
        coreAiNeuronH2,
        korrekt.h2,
        h2Richtig
    );

    coreAiNeuronSetzen(
        coreAiNeuronH3,
        korrekt.h3,
        h3Richtig
    );

    coreAiNeuronSetzen(
        coreAiNeuronOutput,
        1,
        outputRichtig
    );


    if (
        !h1Richtig
        ||
        !h2Richtig
        ||
        !h3Richtig
        ||
        !outputRichtig
    ) {

        coreAiInfo.classList.remove(
            "richtig"
        );

        coreAiInfo.classList.add(
            "falsch"
        );

        coreAiInfo.textContent =
            "AI PREDICTION MISMATCH: Prüfe die als ERROR markierten Komponenten.";

        return;
    }


    coreAiKorrekteSituationen++;


    coreAiPunkteAnzeige.textContent =
        coreAiKorrekteSituationen
        + " / "
        + coreAiSituationen.length;


    coreAiInfo.classList.remove(
        "falsch"
    );

    coreAiInfo.classList.add(
        "richtig"
    );


    coreAiInfo.textContent =
        "PREDICTION VERIFIED // H1="
        + korrekt.h1
        + " H2="
        + korrekt.h2
        + " H3="
        + korrekt.h3
        + " SCORE="
        + korrekt.steeringScore;


    coreAiAktuellerIndex++;


    if (
        coreAiAktuellerIndex
        >=
        coreAiSituationen.length
    ) {

        setTimeout(
            coreAiNodeAbschliessen,
            700
        );

        return;
    }


    setTimeout(
        coreAiSituationAnzeigen,
        900
    );
}


// ========================================
// AI DIAGNOSE
// ========================================

function coreAiDiagnoseSetzen(
    element,
    richtig
) {

    element.classList.remove(
        "richtig",
        "falsch"
    );


    element.classList.add(
        richtig
            ? "richtig"
            : "falsch"
    );


    element.textContent =
        richtig
            ? "VERIFIED"
            : "ERROR";
}


function coreAiNeuronSetzen(
    element,
    wert,
    antwortRichtig
) {

    element.classList.remove(
        "aktiv",
        "inaktiv",
        "falsch"
    );


    if (!antwortRichtig) {

        element.classList.add(
            "falsch"
        );

        return;
    }


    element.classList.add(
        wert === 1
            ? "aktiv"
            : "inaktiv"
    );
}


// ========================================
// AI EINGABE RESET
// ========================================

function coreAiEingabeZuruecksetzen() {

    coreAiH1Antwort.value = "";
    coreAiH2Antwort.value = "";
    coreAiH3Antwort.value = "";


    coreAiGewaehlteRichtung =
        null;


    coreAiAktionen.forEach(
        function(button) {

            button.classList.remove(
                "ausgewaehlt"
            );
        }
    );


    coreAiBerechnungsZeilen.forEach(
        function(zeile) {

            zeile.classList.remove(
                "richtig",
                "falsch"
            );
        }
    );


    [
        coreAiH1Status,
        coreAiH2Status,
        coreAiH3Status,
        coreAiOutputStatus
    ].forEach(
        function(element) {

            element.classList.remove(
                "richtig",
                "falsch"
            );

            element.textContent =
                "NOT TESTED";
        }
    );


    [
        coreAiNeuronH1,
        coreAiNeuronH2,
        coreAiNeuronH3,
        coreAiNeuronOutput
    ].forEach(
        function(element) {

            element.classList.remove(
                "aktiv",
                "inaktiv",
                "falsch"
            );
        }
    );
}


// ========================================
// AI NODE ABSCHLIESSEN
// ========================================

function coreAiNodeAbschliessen() {

    if (coreAiGeloest) {
        return;
    }


    coreAiGeloest = true;


    coreAiStatus.textContent =
        "ONLINE";

    coreAiStatus.classList.add(
        "online"
    );


    coreAiKartenstatus.textContent =
        "ONLINE";

    coreKnotenAi.classList.add(
        "wiederhergestellt"
    );


    coreAiInfo.classList.remove(
        "falsch"
    );

    coreAiInfo.classList.add(
        "richtig"
    );


    coreAiInfo.textContent =
        "5 / 5 NEURAL PREDICTIONS VERIFIED // AI NODE RESTORED // FRAGMENT: R";


    coreFragmentAi.textContent =
        "...";


    coreAiH1Antwort.disabled = true;
    coreAiH2Antwort.disabled = true;
    coreAiH3Antwort.disabled = true;

    coreAiPruefen.disabled = true;
    coreAiResetEingabe.disabled = true;


    coreAiAktionen.forEach(
        function(button) {

            button.disabled = true;
        }
    );


    coreStatusAktualisieren();
}


// ========================================
// GESAMTSTATUS
// ========================================

function coreStatusAktualisieren() {

    const geloesteKnoten = [

        coreSortGeloest,
        coreSearchGeloest,
        coreCryptoGeloest,
        coreAiGeloest

    ].filter(
        function(geloest) {

            return geloest;
        }
    ).length;


    const prozent =
        geloesteKnoten * 25;


    coreKnotenAnzahl.textContent =
        geloesteKnoten
        + " / 4";


    coreFortschrittText.textContent =
        prozent
        + " %";


    coreFortschrittBalken.style.width =
        prozent
        + "%";


    coreModulStatus.textContent =
        (4 - geloesteKnoten)
        + " NODES OFFLINE";


    if (geloesteKnoten === 4) {

        coreStatus.textContent =
            "NODES RESTORED";


        coreModulStatus.textContent =
            "FINAL CODE REQUIRED";


        coreFinalBereich.classList.remove(
            "gesperrt"
        );


        coreFinalCode.disabled = false;
        coreFinalPruefen.disabled = false;


        coreFinalInfo.textContent =
            "Alle Fragmente wurden gefunden. Reihenfolge: SORT-SEARCH-CRYPTO-AI.";


        setTimeout(
            function() {

                coreFinalCode.focus();
            },
            100
        );
    }
}


// ========================================
// FINALER CODE
// ========================================

function coreFinalCodePruefen() {

    if (coreKomplettGeloest) {
        return;
    }


    const antwort =
        coreFinalCode.value
            .trim()
            .toUpperCase()
            .replace(/\s/g, "");


    coreFinalInfo.classList.remove(
        "richtig",
        "falsch"
    );


    if (
        antwort !==
        "19-24-63-R"
    ) {

        coreFinalInfo.classList.add(
            "falsch"
        );

        coreFinalInfo.textContent =
            "CORE AUTHORIZATION REJECTED";

        return;
    }


    coreKomplettGeloest = true;


    coreFinalInfo.classList.add(
        "richtig"
    );

    coreFinalInfo.textContent =
        "CORE AUTHORIZATION ACCEPTED";


    coreFinalCode.disabled = true;
    coreFinalPruefen.disabled = true;


    coreAccessStatus.textContent =
        "AUTHORIZED";

    coreStatus.textContent =
        "OPERATIONAL";

    coreModulStatus.textContent =
        "CORE RESTORED";


    coreFortschrittText.textContent =
        "100 %";

    coreFortschrittBalken.style.width =
        "100%";


    setTimeout(
        function() {

            coreAbschluss.classList.remove(
                "secret-versteckt"
            );


            coreAbschluss.scrollIntoView({

                behavior: "smooth",

                block: "center"
            });

        },
        650
    );
}


// ========================================
// LEVEL 4 ÖFFNEN
// ========================================

function coreLevel4Anzeigen() {

    if (rootLevel4Card.disabled) {
        return;
    }


    secretAlleModuleAusblenden();


    secretAlgorithmCore.classList.remove(
        "secret-versteckt"
    );


    rootLevel4Card.classList.add(
        "aktiv"
    );


    secretActiveLevel.textContent =
        "ALGORITHM CORE";


    coreKnotenAnzeigen(
        "sort"
    );
}


// ========================================
// EVENT LISTENER
// ========================================

rootLevel4Card.addEventListener(
    "click",
    coreLevel4Anzeigen
);


// KNOTEN

coreKnotenSort.addEventListener(
    "click",
    function() {

        coreKnotenAnzeigen(
            "sort"
        );
    }
);


coreKnotenSearch.addEventListener(
    "click",
    function() {

        coreKnotenAnzeigen(
            "search"
        );
    }
);


coreKnotenCrypto.addEventListener(
    "click",
    function() {

        coreKnotenAnzeigen(
            "crypto"
        );
    }
);


coreKnotenAi.addEventListener(
    "click",
    function() {

        coreKnotenAnzeigen(
            "ai"
        );
    }
);


// SORT

coreSortPruefen.addEventListener(
    "click",
    coreSortAntwortPruefen
);


coreSortAntwort.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Enter") {

            coreSortAntwortPruefen();
        }
    }
);


// SEARCH

coreSearchButtons.forEach(
    function(button) {

        button.addEventListener(
            "click",
            function() {

                coreSearchWertWaehlen(
                    button
                );
            }
        );
    }
);


coreSearchPruefen.addEventListener(
    "click",
    coreSearchAntwortPruefen
);


coreSearchReset.addEventListener(
    "click",
    coreSearchZuruecksetzen
);


// CRYPTO

coreCryptoPruefen.addEventListener(
    "click",
    coreCryptoAntwortPruefen
);


coreCryptoAntwort.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Enter") {

            coreCryptoAntwortPruefen();
        }
    }
);


// AI

coreAiAktionen.forEach(
    function(button) {

        button.addEventListener(
            "click",
            function() {

                coreAiRichtungWaehlen(
                    button
                );
            }
        );
    }
);


coreAiPruefen.addEventListener(
    "click",
    coreAiVorhersagePruefen
);


coreAiResetEingabe.addEventListener(
    "click",
    function() {

        if (!coreAiGeloest) {

            coreAiEingabeZuruecksetzen();


            coreAiInfo.classList.remove(
                "richtig",
                "falsch"
            );


            coreAiInfo.textContent =
                "Eingabe gelöscht. Situation erneut berechnen.";
        }
    }
);


// FINAL

coreFinalPruefen.addEventListener(
    "click",
    coreFinalCodePruefen
);


coreFinalCode.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Enter") {

            coreFinalCodePruefen();
        }
    }
);


// ========================================
// LEVEL 4 INITIALISIEREN
// ========================================

coreKnotenAnzeigen(
    "sort"
);


coreAiSituationAnzeigen();


// ========================================
// LEVEL 4 ENDE
// ========================================

