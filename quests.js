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
            selfcheck: [
              "Warum sind Daten im RAM weg, wenn der Strom ausfaellt, auf der SSD aber nicht?",
              "Dein Mac hat 8 GB RAM und 256 GB SSD - was bedeuten die zwei Zahlen jeweils?",
              "Welcher Weg von SSD ueber RAM zur CPU passiert beim Oeffnen einer App?"
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
            selfcheck: [
              "Nenne die vier Kernaufgaben eines Betriebssystems in eigenen Worten.",
              "Wie kann ein Ein-Kern-Prozessor 15 Apps gleichzeitig wirken lassen?",
              "Was waere, wenn zwei Programme ungehindert denselben RAM-Bereich beschreiben duerften?"
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
            selfcheck: [
              "Was ist der Unterschied zwischen ls und ls -la?",
              "Wo landest du, wenn du cd .. zweimal hintereinander ausfuehrst?",
              "Was passiert, wenn mkdir einen Namen bekommt, der schon existiert?"
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
            selfcheck: [
              "Unterschied zwischen cd Ordner_A und cd /Ordner_A?",
              "Wie sieht der relative Pfad von Home zu Ordner_B aus?",
              "Warum ist rm -r gefaehrlicher als der Papierkorb im Finder?"
            ],
            reward: "+25 XP (+50% ohne Hilfe) - Fortschritt Richtung Pfad-Finder"
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
