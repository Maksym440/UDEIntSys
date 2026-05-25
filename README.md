# Erster Start des Projekts

Um das Projekt lokal zu starten, muss zuerst das Repository geklont werden:

```bash
git clone https://github.com/Maksym440/UDEIntSys.git
```

Danach in den Projektordner wechseln:

```bash
cd <projektordner>
```

Anschließend müssen die benötigten Abhängigkeiten installiert werden:

```bash
npm install
```

Danach kann das Projekt im Entwicklungsmodus gestartet werden:

```bash
npm run dev
```

Nach dem Start wird im Terminal eine lokale Adresse angezeigt.
Normalerweise ist die Anwendung unter folgender Adresse erreichbar:

```
http://localhost:5173
```

Falls ein anderer Port verwendet wird, wird dieser ebenfalls im Terminal angezeigt.



# Entwicklungsmaterial: UniDashboard

## 1. Ziel des Projekts

Das Ziel unseres Projekts ist die Entwicklung einer Demo-Version eines webbasierten Uni-Dashboards für Studierende.

Das Dashboard soll wichtige Informationen aus dem Studienalltag zentral darstellen. Dazu gehören zum Beispiel:

- heutige Termine
- offene Aufgaben
- kommende Prüfungen
- aktuelle Events
- belegte Module
- Mitteilungen

Die Demo-Version soll zeigen, wie Studierende durch eine zentrale Oberfläche schneller einen Überblick über ihren Studienalltag bekommen können.

---

## 2. Demo-Version

Da kein vollständig fertiges Produkt mit echten Schnittstellen zu Moodle, LSF oder E-Mail erforderlich ist, konzentrieren wir uns auf eine funktionsfähige Demo-Version.

Die Demo-Version arbeitet zunächst mit lokalen Beispieldaten.

Wichtig ist, dass die wichtigsten Funktionen sichtbar und verständlich dargestellt werden:

- Dashboard-Übersicht
- Stundenplan
- Prüfungen
- Aufgaben
- Module
- Events
- Mitteilungen
- Einstellungen

Die Demo soll nicht alle echten Systeme technisch anbinden, sondern das Konzept und die mögliche Nutzung des Systems zeigen.

---

## 3. Technische Struktur der Umsetzung

Die Anwendung wird als React-Projekt umgesetzt.

Die Oberfläche besteht aus mehreren Bereichen:

### 3.1 Sidebar / Navigation

Die Sidebar enthält die Hauptbereiche der Anwendung:

- Dashboard
- Stundenplan
- Prüfungen
- Aufgaben
- Module
- Events
- Mitteilungen
- Einstellungen

Dadurch kann der Nutzer zwischen den wichtigsten Bereichen wechseln.

### 3.2 Dashboard-Startseite

Die Startseite zeigt eine kurze Übersicht über den aktuellen Tag.

Dazu gehören vier zentrale Karten:

- Termine heute
- offene Aufgaben
- kommende Prüfungen
- Events diese Woche

Diese Karten geben dem Nutzer sofort einen Überblick über wichtige Informationen.

### 3.3 Inhaltsbereiche

Auf der Dashboard-Seite werden verschiedene Panels angezeigt:

- heutiger Stundenplan
- kommende Prüfungen
- offene Aufgaben
- aktuelle Events
- meine Module

Jeder Bereich soll übersichtlich dargestellt werden und später bei Bedarf erweitert werden können.

### 3.4 Komponentenstruktur

Für die Umsetzung werden wiederverwendbare React-Komponenten verwendet.

Beispiele:

- Card
- PanelHeader
- ScheduleItem
- ExamItem
- Task
- Event
- Module

Dadurch bleibt der Code übersichtlich und einzelne Bereiche können leichter angepasst oder erweitert werden.

---

## 4. User Stories

Die User Stories helfen uns dabei, die Funktionen aus Sicht der Nutzer zu planen.

Sie werden nicht nur in der Präsentation erwähnt, sondern auch für die Aufgabenverteilung und das Kanban-Board genutzt.

### User Story 1: Tagesübersicht

Als Student möchte ich direkt nach dem Öffnen des Dashboards eine Übersicht über meinen heutigen Tag sehen, damit ich schnell weiß, welche Termine, Aufgaben und Prüfungen wichtig sind.

Akzeptanzkriterien:

- Die heutigen Termine werden angezeigt.
- Offene Aufgaben werden angezeigt.
- Kommende Prüfungen werden angezeigt.
- Die wichtigsten Zahlen werden auf der Startseite sichtbar dargestellt.

### User Story 2: Stundenplan

Als Student möchte ich meinen Stundenplan mit Uhrzeit, Modul und Raum sehen, damit ich meine Veranstaltungen besser planen kann.

Akzeptanzkriterien:

- Jede Veranstaltung zeigt Uhrzeit, Titel, Art der Veranstaltung und Raum.
- Die heutigen Veranstaltungen werden auf der Startseite angezeigt.
- Ein späterer Wechsel zu einer vollständigen Stundenplan-Seite ist möglich.

### User Story 3: Aufgaben

Als Student möchte ich offene Aufgaben und Deadlines sehen, damit ich keine Abgabe vergesse.

Akzeptanzkriterien:

- Offene Aufgaben werden mit Titel, Modul und Datum angezeigt.
- Die Aufgaben sind auf der Startseite sichtbar.
- Aufgaben können später nach Priorität oder Datum sortiert werden.

### User Story 4: Prüfungen

Als Student möchte ich kommende Prüfungen mit Datum, Uhrzeit und Raum sehen, damit ich mich rechtzeitig vorbereiten kann.

Akzeptanzkriterien:

- Prüfungstermine werden übersichtlich dargestellt.
- Jede Prüfung zeigt Datum, Uhrzeit und Raum.
- Besonders nahe Prüfungstermine sollen schnell erkennbar sein.

### User Story 5: Module

Als Student möchte ich meine belegten Module sehen, damit ich einen Überblick über meine Kurse und Credit Points habe.

Akzeptanzkriterien:

- Module werden mit Namen angezeigt.
- Credit Points werden angezeigt.
- Die Liste kann später erweitert werden.

### User Story 6: Events

Als Student möchte ich aktuelle Uni-Events sehen, damit ich über Veranstaltungen auf dem Campus informiert bin.

Akzeptanzkriterien:

- Events werden mit Titel, Datum und Ort angezeigt.
- Mehrere Events können in einer Liste dargestellt werden.
- Eine spätere Detailansicht ist möglich.

---

## 5. Aufgabenverteilung im Team

Die User Stories werden in konkrete Aufgaben aufgeteilt.

Mögliche Aufgabenbereiche:

### Frontend

- Aufbau der React-Komponenten
- Layout der Dashboard-Seite
- Umsetzung der Sidebar
- Styling mit CSS
- Responsive Design

### Daten / Mock-Daten

- Erstellung lokaler Beispieldaten
- Struktur für Termine, Aufgaben, Prüfungen, Module und Events
- Vorbereitung einer möglichen späteren Schnittstellenanbindung

---

## 6. Arbeitsmethode (optional, da wir nicht genug Zeit haben)

Für die Organisation verwenden wir eine einfache Kombination aus Scrum und Kanban.

Scrum hilft uns, weil wir feste Abgabefristen und ein kleines Team haben.

Kanban hilft uns, weil wir Aufgaben sichtbar machen und den Fortschritt besser verfolgen können.

Das Kanban-Board kann folgende Spalten haben:

- Backlog
- To Do
- In Progress
- Review
- Done

Die User Stories werden im Backlog gesammelt und danach in konkrete Aufgaben aufgeteilt.

---


