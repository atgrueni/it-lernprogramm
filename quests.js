/*
  Inhalts-Datei fuer das IT-Lernprogramm.
  Diese Datei wird nach jeder Lern-Session aktualisiert (neue Quests, erledigte Quests,
  neuer XP-Stand). Die Engine (app.js/index.html/style.css) bleibt dabei unveraendert.
*/

var RANKS = [
  {
    id: "bronze",
    name: "Bronze",
    subtitle: "Das Fundament",
    color: "#c58b4a",
    xpFrom: 0,
    xpTo: 999,
    locked: false,
    weeks: [
      {
        week: 1,
        title: "Hardware, OS und der erste Terminal-Kontakt",
        quests: [
          {
            id: "b-q1",
            title: "Charaktererstellung",
            icon: "flag",
            xp: 20,
            status: "done",
            theory: "15 Fragen haben deinen Startpunkt ermittelt: solides Sicherheitsbewusstsein (Passwoerter, Phishing), aber Terminal, Netzwerke, Programmierung und Datenbanken bei null. Ausserdem eine kleine Verwechslung bei RAM vs. SSD.",
            practice: [],
            selfcheck: [],
            reward: "Badges: Erster Schritt, Sicherheitsinstinkt"
          },
          {
            id: "b-q2",
            title: "Das Herz der Maschine",
            icon: "cpu",
            xp: 25,
            status: "active",
            theory: "RAM ist fluechtiger Arbeitsspeicher: schnell, aber weg sobald der Strom ausgeht. SSD/Festplatte ist dauerhafter Speicher: langsamer, aber die Daten bleiben. Die richtige Unterscheidung ist fluechtig vs. dauerhaft, nicht intern vs. extern. Wenn du ein Programm oeffnest, wird es von der SSD in den RAM geladen. CPU rechnet, RAM merkt sich kurzfristig, SSD merkt sich dauerhaft.",
            practice: [
              "Apple-Menue oben links -> Ueber diesen Mac -> notiere RAM und Speicherplatz.",
              "cmd+Leertaste -> Aktivitaetsanzeige -> Reiter Speicher -> wie viel RAM ist gerade belegt?"
            ],
            selfcheck: [],
            quiz: [
              {
                q: "Was passiert mit Daten im RAM, wenn der Strom ausfaellt?",
                options: ["Sie bleiben erhalten", "Sie gehen verloren", "Sie werden automatisch auf die SSD kopiert", "Der RAM hat einen eigenen Akku dafuer"],
                correct: 1,
                explain: "RAM ist fluechtiger Speicher - ohne Strom ist der Inhalt weg. Deshalb speichert man wichtige Dinge auf der SSD."
              },
              {
                q: "Welche Aussage ist richtig?",
                options: ["RAM ist dauerhafter Speicher", "SSD ist dauerhafter Speicher", "RAM und SSD sind technisch dasselbe", "SSD ist immer ein externes Geraet"],
                correct: 1,
                explain: "Die SSD behaelt Daten auch ohne Strom - das macht sie zum dauerhaften Speicher, unabhaengig davon ob intern oder extern."
              },
              {
                q: "Wenn du eine App oeffnest, passiert Folgendes:",
                options: ["Sie wird von der CPU direkt ausgefuehrt, ganz ohne RAM", "Sie wird von der SSD in den RAM geladen und dann von der CPU verarbeitet", "Sie wird vom RAM dauerhaft auf die SSD geschrieben", "Sie laeuft nur im Cache der Tastatur"],
                correct: 1,
                explain: "Programme liegen dauerhaft auf der SSD, werden zur Ausfuehrung aber in den schnelleren RAM geladen."
              }
            ],
            reward: "+25 XP (+50% ohne Hilfe)"
          },
          {
            id: "b-q3",
            title: "Das Betriebssystem-Orakel",
            icon: "device-desktop",
            xp: 25,
            status: "locked",
            theory: "Ein Betriebssystem hat vier Kernaufgaben: Prozess-Verwaltung (wer bekommt wann Rechenzeit), Speicher-Verwaltung (RAM-Zuteilung), Dateisystem-Verwaltung (Ordnerstruktur auf der SSD) und Ein-/Ausgabe-Verwaltung (Tastatur, Bildschirm, Netzwerk).",
            practice: [
              "Aktivitaetsanzeige -> Reiter CPU -> nach % CPU sortieren -> welche 3 Prozesse verbrauchen am meisten?",
              "Finder oeffnen -> Macintosh HD -> Benutzer -> dein Name -> Ordnerstruktur ansehen."
            ],
            selfcheck: [],
            quiz: [
              {
                q: "Welche Aufgabe uebernimmt das Betriebssystem NICHT?",
                options: ["Prozess-Verwaltung", "Speicher-Verwaltung", "Das Design von Webseiten, die du besuchst", "Dateisystem-Verwaltung"],
                correct: 2,
                explain: "Webseiten-Design macht der Browser bzw. die Webseite selbst - das OS kuemmert sich um Prozesse, Speicher, Dateisystem und Ein-/Ausgabe."
              },
              {
                q: "Wie schafft es ein Ein-Kern-Prozessor, mehrere Programme gleichzeitig wirken zu lassen?",
                options: ["Er rechnet wirklich mehrere Dinge gleichzeitig", "Das Betriebssystem schaltet sehr schnell zwischen den Prozessen hin und her", "Programme werden angehalten, bis du manuell wechselst", "Das ist technisch unmoeglich"],
                correct: 1,
                explain: "Das OS teilt die Rechenzeit in kleine Haeppchen auf und wechselt so schnell zwischen Prozessen, dass es fuer uns wie Gleichzeitigkeit wirkt."
              },
              {
                q: "Warum verwaltet das Betriebssystem, welches Programm welchen RAM-Bereich nutzen darf?",
                options: ["Damit sich Programme nicht gegenseitig ueberschreiben", "Damit der RAM schneller wird", "Um Strom zu sparen", "Nur zur Anzeige, ohne echte Funktion"],
                correct: 0,
                explain: "Ohne diese Kontrolle koennten Programme sich gegenseitig Daten im Speicher zerstoeren - das OS verhindert das."
              }
            ],
            reward: "+25 XP (+50% ohne Hilfe)"
          },
          {
            id: "b-q4",
            title: "Der erste Sprung ins Terminal",
            icon: "terminal-2",
            xp: 50,
            status: "locked",
            theory: "Das Terminal ist eine Text-Eingabe fuer Befehle statt Klicks. pwd zeigt den aktuellen Ort, ls listet Dateien/Ordner, ls -la zeigt auch versteckte Dateien, cd wechselt den Ordner, cd .. geht eine Ebene hoch, mkdir legt einen neuen Ordner an.",
            practice: [
              "Terminal oeffnen: cmd+Leertaste -> Terminal.",
              "pwd eintippen und Enter - wo bist du?",
              "ls eintippen - was siehst du?",
              "cd Desktop, danach wieder pwd - hat sich der Pfad geaendert?",
              "mkdir IT-Lernprogramm-Test anlegen, mit ls pruefen, mit cd hineinwechseln, mit cd .. zurueck."
            ],
            selfcheck: [],
            practiceCheck: {
              instructions: "Fuehre zusaetzlich aus: mkdir woche1_check && cd woche1_check && pwd -- und fuege die Ausgabe von pwd hier ein:",
              placeholder: "z.B. /Users/deinname/woche1_check",
              checks: [
                {
                  regex: /\/woche1_check\s*$/,
                  hint: "Die Ausgabe sollte am Ende genau auf /woche1_check enden - hast du den Ordner exakt so benannt und bist du danach mit cd hineingewechselt?",
                  successHint: "Pfad endet korrekt auf /woche1_check."
                }
              ]
            },
            quiz: [
              {
                q: "Welcher Befehl zeigt dir, wo du dich gerade befindest?",
                options: ["ls", "cd", "pwd", "mkdir"],
                correct: 2,
                explain: "pwd steht fuer print working directory - zeigt den aktuellen Pfad."
              },
              {
                q: "Was macht der Befehl cd ..?",
                options: ["Erstellt einen neuen Ordner", "Wechselt eine Ebene nach oben", "Loescht den aktuellen Ordner", "Zeigt versteckte Dateien an"],
                correct: 1,
                explain: "Zwei Punkte stehen fuer den uebergeordneten Ordner."
              },
              {
                q: "Was zeigt ls -la zusaetzlich zu einem einfachen ls?",
                options: ["Nur Ordner, keine Dateien", "Versteckte Dateien und Detailinformationen", "Nur Videos", "Die IP-Adresse des Rechners"],
                correct: 1,
                explain: "-l zeigt Details (Rechte, Groesse, Datum), -a zeigt auch versteckte Dateien (die mit einem Punkt beginnen)."
              }
            ],
            reward: "+50 XP (+50% ohne Hilfe) - Fortschritt Richtung Terminal-Neuling"
          },
          {
            id: "b-q5",
            title: "Dateien und Pfade meistern",
            icon: "folder",
            xp: 25,
            status: "locked",
            theory: "Absoluter Pfad: kompletter Weg ab der Wurzel, beginnt mit /. Relativer Pfad: Weg ausgehend vom aktuellen Standort. Punkt = aktueller Ordner, zwei Punkte = eine Ebene hoeher, Tilde = Home-Verzeichnis.",
            practice: [
              "cd ~ und dann pwd - das ist dein Home-Verzeichnis.",
              "mkdir -p Uebung/Ordner_A/Ordner_B anlegen.",
              "Mit einem einzigen cd-Befehl direkt in Ordner_B wechseln.",
              "pwd pruefen, dann mit cd ~/Uebung in einem Schritt zurueck.",
              "Zum Schluss aufraeumen: rm -r ~/Uebung"
            ],
            selfcheck: [],
            practiceCheck: {
              instructions: "Nutze deine Uebung/Ordner_A/Ordner_B-Struktur von oben. Fuege die Ausgabe von pwd ein, nachdem du in Ordner_B gewechselt bist:",
              placeholder: "z.B. /Users/deinname/Uebung/Ordner_A/Ordner_B",
              checks: [
                {
                  regex: /\/Uebung\/Ordner_A\/Ordner_B\s*$/,
                  hint: "Die Ausgabe sollte am Ende auf /Uebung/Ordner_A/Ordner_B enden.",
                  successHint: "Pfad korrekt bis Ordner_B."
                }
              ]
            },
            quiz: [
              {
                q: "Ein Pfad, der mit / beginnt, ist ein...",
                options: ["relativer Pfad", "absoluter Pfad", "versteckter Pfad", "defekter Pfad"],
                correct: 1,
                explain: "Der fuehrende Schraegstrich bedeutet: Start an der Wurzel des Dateisystems - das ist die Definition eines absoluten Pfads."
              },
              {
                q: "Wofuer steht die Tilde (~) im Terminal?",
                options: ["Der aktuelle Ordner", "Eine Ebene hoeher", "Das Home-Verzeichnis", "Der Papierkorb"],
                correct: 2,
                explain: "~ ist die Abkuerzung fuer dein persoenliches Home-Verzeichnis, z.B. /Users/Nico."
              },
              {
                q: "Warum ist rm -r riskanter als eine Datei im Finder in den Papierkorb zu ziehen?",
                options: ["Ist es gar nicht, genau gleich sicher", "Es loescht sofort und endgueltig, ohne Papierkorb", "Es fragt vorher immer nochmal nach", "Es funktioniert nur bei Bildern"],
                correct: 1,
                explain: "Im Terminal geloeschte Dateien landen nicht im Papierkorb - es gibt kein Zurueck."
              }
            ],
            reward: "+25 XP (+50% ohne Hilfe) - Fortschritt Richtung Pfad-Finder"
          },
          {
            id: "b-q6",
            title: "Die Geheimbotschaft",
            icon: "message",
            xp: 30,
            status: "locked",
            theory: "Mit echo \"Text\" gibst du Text aus. Kombiniert mit > schreibst du diesen Text in eine neue Datei, statt ihn nur am Bildschirm anzuzeigen (vorhandener Inhalt wird dabei ueberschrieben). Mit cat dateiname liest du den Inhalt einer Datei wieder aus. Das ist die Grundlage fuer sehr vieles, was spaeter mit Dateien in der Programmierung passiert.",
            practice: [
              "Terminal oeffnen, mit cd ~ sicherstellen, dass du in deinem Home-Verzeichnis bist.",
              "Fuehre aus: echo \"Ich habe Bronze-Woche-1 gemeistert\" > geheim.txt",
              "Fuehre aus: cat geheim.txt",
              "Kopiere die komplette Ausgabe von cat unten in das Feld.",
              "Zum Aufraeumen: rm geheim.txt"
            ],
            selfcheck: [],
            practiceCheck: {
              instructions: "Fuege die Ausgabe von cat geheim.txt hier ein:",
              placeholder: "Ausgabe von cat einfuegen ...",
              checks: [
                {
                  regex: /Ich habe Bronze-Woche-1 gemeistert/,
                  hint: "Der Text sollte genau 'Ich habe Bronze-Woche-1 gemeistert' enthalten - hast du echo exakt so eingegeben (inkl. Anfuehrungszeichen im Befehl, nicht in der Ausgabe)?",
                  successHint: "Geheimbotschaft korrekt entschluesselt."
                }
              ]
            },
            quiz: [
              {
                q: "Was macht das Zeichen > in einem Terminal-Befehl wie echo \"Hallo\" > datei.txt?",
                options: ["Vergleicht zwei Zahlen", "Leitet die Ausgabe in eine Datei um (und ueberschreibt sie)", "Loescht die Datei", "Oeffnet die Datei in einem Texteditor"],
                correct: 1,
                explain: "> schreibt die Ausgabe des Befehls in eine Datei. Existiert die Datei schon, wird ihr Inhalt ueberschrieben."
              }
            ],
            reward: "+30 XP - deine erste komplett selbst kontrollierte Praxisaufgabe."
          }
        ]
      },
      { week: 2, title: "Terminal-Navigation, Dateien anlegen/verschieben/loeschen", quests: [] },
      { week: 3, title: "Terminal-Textverarbeitung (cat, nano, grep)", quests: [] },
      { week: 4, title: "Erste eigene Skript-Datei", quests: [] },
      { week: 5, title: "Netzwerk-Grundlagen: IP, WLAN vs. Internet, DNS", quests: [] },
      { week: 6, title: "Server/Client-Prinzip", quests: [] },
      { week: 7, title: "Ports, HTTP-Basics", quests: [] },
      { week: 8, title: "Eigenes Heimnetzwerk analysieren", quests: [] },
      { week: 9, title: "IT-Sicherheit: Passwoerter, 2FA, Phishing vertieft", quests: [] },
      { week: 10, title: "Verschluesselung-Basics", quests: [] },
      { week: 11, title: "Wiederholungs-Gauntlet (Spaced Repetition)", quests: [] }
    ],
    boss: {
      title: "Der Systemwaechter",
      week: 12,
      description: "Terminal-Navigation unter Zeitdruck, Netzwerk-Quiz, Security-Check. Bestehen ab 80%.",
      status: "locked"
    }
  },
  {
    id: "silber",
    name: "Silber",
    subtitle: "Der Code erwacht",
    color: "#9fa6ad",
    xpFrom: 1000,
    xpTo: 1999,
    locked: true,
    unlockCondition: "Boss-Fight Bronze bestehen",
    themes: ["Bash vertiefen, Berechtigungen", "Python: Variablen, Bedingungen, Schleifen", "Funktionen, Listen, Dateien, Fehlerbehandlung"],
    boss: { title: "Das Codebrecher-Duell", description: "Eigenes Python-Skript unter Zeitdruck bauen. Bestehen ab 80%.", status: "locked" }
  },
  {
    id: "gold",
    name: "Gold",
    subtitle: "Meister der Daten",
    color: "#d4af37",
    xpFrom: 2000,
    xpTo: 2999,
    locked: true,
    unlockCondition: "Boss-Fight Silber bestehen",
    themes: ["Python vertiefen, eigene Tools", "Datenbanken-Konzepte, SQLite", "SQL: SELECT, WHERE, JOIN, INSERT/UPDATE/DELETE", "IT-Sicherheit vertieft"],
    boss: { title: "Die Datenbank-Festung", description: "Python-Skript, das eine SQLite-DB abfragt und veraendert. Bestehen ab 80%.", status: "locked" }
  },
  {
    id: "platin",
    name: "Platin",
    subtitle: "Der IT-Meister",
    color: "#8fd0e0",
    xpFrom: 3000,
    xpTo: 3999,
    locked: true,
    unlockCondition: "Boss-Fight Gold bestehen",
    themes: ["Projekt 1: CLI-Tool mit Datenspeicherung", "Projekt 2: Netzwerk-/Security-Tool", "Projekt 3: freie Wahl", "Gesamtwiederholung"],
    boss: { title: "Der IT-Meister-Trial", description: "Praesentation der 3 Projekte + Gesamtpruefung. Bestehen ab 80%.", status: "locked" }
  }
];

var DEFAULT_STATE = {
  name: "Nico",
  xp: 20,
  streak: 1,
  lastSession: "2026-07-04",
  completed: ["b-q1"],
  badges: [
    { id: "erster-schritt", name: "Erster Schritt", icon: "flag", earned: "2026-07-04" },
    { id: "sicherheitsinstinkt", name: "Sicherheitsinstinkt", icon: "shield-lock", earned: "2026-07-04" }
  ]
};
