import { useMemo, useState } from "react";
import "./App.css";

type PageKey =
  | "dashboard"
  | "stundenplan"
  | "pruefungen"
  | "aufgaben"
  | "module"
  | "events"
  | "mitteilungen"
  | "einstellungen";

type NavItem = {
  key: PageKey;
  label: string;
  icon: string;
};

type ScheduleEntry = {
  day: string;
  date: string;
  time: string;
  title: string;
  type: string;
  room: string;
  lecturer?: string;
};

type Exam = {
  day: string;
  month: string;
  title: string;
  module: string;
  date: string;
  time: string;
  room: string;
  status: "bald" | "geplant";
};

type TaskEntry = {
  title: string;
  module: string;
  date: string;
  status: "offen" | "in Arbeit" | "erledigt";
  priority: "hoch" | "mittel" | "normal";
};

type ModuleEntry = {
  title: string;
  credits: string;
  lecturer: string;
  progress: number;
};

type EventEntry = {
  title: string;
  date: string;
  place: string;
  category: string;
};

type MessageEntry = {
  title: string;
  sender: string;
  date: string;
  text: string;
  unread?: boolean;
};

const navigation: NavItem[] = [
  { key: "dashboard", label: "Dashboard", icon: "🏠" },
  { key: "stundenplan", label: "Stundenplan", icon: "📅" },
  { key: "pruefungen", label: "Prüfungen", icon: "🎓" },
  { key: "aufgaben", label: "Aufgaben", icon: "✅" },
  { key: "module", label: "Module", icon: "📚" },
  { key: "events", label: "Events", icon: "📢" },
  { key: "mitteilungen", label: "Mitteilungen", icon: "✉️" },
  { key: "einstellungen", label: "Einstellungen", icon: "⚙️" },
];

const schedule: ScheduleEntry[] = [
  {
    day: "Heute",
    date: "14. Mai 2026",
    time: "09:15 – 10:45",
    title: "Software Engineering",
    type: "Vorlesung",
    room: "Hörsaal 1",
    lecturer: "Prof. Schneider",
  },
  {
    day: "Heute",
    date: "14. Mai 2026",
    time: "11:00 – 12:30",
    title: "Datenbanken",
    type: "Übung",
    room: "G22a R211",
    lecturer: "Dr. Müller",
  },
  {
    day: "Heute",
    date: "14. Mai 2026",
    time: "14:00 – 15:30",
    title: "Web Technologien",
    type: "Labor",
    room: "G29 R427",
    lecturer: "M. Weber",
  },
  {
    day: "Morgen",
    date: "15. Mai 2026",
    time: "10:00 – 11:30",
    title: "Interaktive Systeme",
    type: "Seminar",
    room: "G29 R330",
    lecturer: "Prof. Klein",
  },
  {
    day: "Morgen",
    date: "15. Mai 2026",
    time: "13:00 – 14:30",
    title: "Wissenschaftliches Arbeiten",
    type: "Übung",
    room: "G18 R102",
    lecturer: "Dr. Fischer",
  },
];

const exams: Exam[] = [
  {
    day: "16",
    month: "JUN",
    title: "Datenbanken",
    module: "Klausur",
    date: "16.06.2026",
    time: "11:00 Uhr",
    room: "Hörsaal 1",
    status: "bald",
  },
  {
    day: "23",
    month: "JUL",
    title: "Algorithmen und Datenstrukturen",
    module: "Klausur",
    date: "23.07.2026",
    time: "08:00 Uhr",
    room: "Hörsaal 5",
    status: "geplant",
  },
  {
    day: "30",
    month: "JUL",
    title: "Software Engineering",
    module: "Projektpräsentation",
    date: "30.07.2026",
    time: "14:00 Uhr",
    room: "G29 R427",
    status: "geplant",
  },
];

const tasks: TaskEntry[] = [
  {
    title: "Übungsblatt 6",
    module: "Datenbanken",
    date: "16.05.2026",
    status: "offen",
    priority: "hoch",
  },
  {
    title: "Projektabgabe",
    module: "Software Engineering",
    date: "20.05.2026",
    status: "in Arbeit",
    priority: "hoch",
  },
  {
    title: "Essay",
    module: "Wissenschaftliches Arbeiten",
    date: "27.05.2026",
    status: "offen",
    priority: "mittel",
  },
  {
    title: "Interface-Skizze",
    module: "Interaktive Systeme",
    date: "29.05.2026",
    status: "erledigt",
    priority: "normal",
  },
  {
    title: "SQL-Abfragen vorbereiten",
    module: "Datenbanken",
    date: "02.06.2026",
    status: "offen",
    priority: "mittel",
  },
];

const modules: ModuleEntry[] = [
  { title: "Datenbanken", credits: "6 CP", lecturer: "Dr. Müller", progress: 64 },
  { title: "Software Engineering", credits: "9 CP", lecturer: "Prof. Schneider", progress: 72 },
  { title: "Interaktive Systeme", credits: "5 CP", lecturer: "Prof. Klein", progress: 48 },
  { title: "Algorithmen und Datenstrukturen", credits: "9 CP", lecturer: "Dr. Wagner", progress: 58 },
  { title: "Web Technologien", credits: "6 CP", lecturer: "M. Weber", progress: 80 },
  { title: "Wissenschaftliches Arbeiten", credits: "3 CP", lecturer: "Dr. Fischer", progress: 35 },
];

const events: EventEntry[] = [
  {
    title: "Workshop: AI Basics",
    date: "15. Mai 2026 · 14:00 Uhr",
    place: "Campus Raum 3.12",
    category: "Workshop",
  },
  {
    title: "Career Day 2026",
    date: "16. Mai 2026 · 10:00 Uhr",
    place: "Zentralgebäude",
    category: "Karriere",
  },
  {
    title: "Campus Sommerfest",
    date: "17. Mai 2026 · 18:00 Uhr",
    place: "Innenhof",
    category: "Campusleben",
  },
  {
    title: "Bibliotheksführung",
    date: "21. Mai 2026 · 12:30 Uhr",
    place: "Universitätsbibliothek",
    category: "Info",
  },
];

const messages: MessageEntry[] = [
  {
    title: "Raumänderung: Web Technologien",
    sender: "Studienbüro",
    date: "Heute · 08:10 Uhr",
    text: "Das Labor findet heute in G29 R427 statt.",
    unread: true,
  },
  {
    title: "Neue Unterlagen in Moodle",
    sender: "Datenbanken",
    date: "Gestern · 17:45 Uhr",
    text: "Die Materialien für Übungsblatt 6 wurden veröffentlicht.",
    unread: true,
  },
  {
    title: "Erinnerung: Projektabgabe",
    sender: "Software Engineering",
    date: "12. Mai 2026",
    text: "Die Abgabe des Zwischenstands ist bis zum 20.05. vorgesehen.",
  },
];

const pageTitles: Record<PageKey, { title: string; subtitle: string }> = {
  dashboard: {
    title: "Dashboard",
    subtitle: "Hallo User! Hier ist dein Überblick für heute.",
  },
  stundenplan: {
    title: "Stundenplan",
    subtitle: "Alle Veranstaltungen der aktuellen Woche im Überblick.",
  },
  pruefungen: {
    title: "Prüfungen",
    subtitle: "Kommende Klausuren, Termine und Räume.",
  },
  aufgaben: {
    title: "Aufgaben",
    subtitle: "Offene Abgaben, Deadlines und Bearbeitungsstatus.",
  },
  module: {
    title: "Module",
    subtitle: "Belegte Kurse, Credit Points und Fortschritt.",
  },
  events: {
    title: "Events",
    subtitle: "Aktuelle Veranstaltungen auf dem Campus.",
  },
  mitteilungen: {
    title: "Mitteilungen",
    subtitle: "Wichtige Nachrichten aus Kursen und Universität.",
  },
  einstellungen: {
    title: "Einstellungen",
    subtitle: "Demo-Einstellungen für Benachrichtigungen und Darstellung.",
  },
};

function App() {
  const [activePage, setActivePage] = useState<PageKey>("dashboard");
  const currentPage = pageTitles[activePage];

  return (
    <div className="app">
      <aside className="sidebar">
        <button className="logo" onClick={() => setActivePage("dashboard")}>
          🎓 UniDashboard
        </button>

        <nav aria-label="Hauptnavigation">
          {navigation.map((item) => (
            <button
              key={item.key}
              className={activePage === item.key ? "active" : ""}
              onClick={() => setActivePage(item.key)}
            >
              <span>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="profile">
          <div className="avatar">M</div>
          <div>
            <strong>User12345</strong>
            <span>Student</span>
          </div>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div>
            <h1>{currentPage.title}</h1>
            <p>{currentPage.subtitle}</p>
          </div>

          <div className="icons" aria-label="Demo Aktionen">
            <button title="Suche">🔍</button>
            <button title="Benachrichtigungen">🔔</button>
            <button title="Logout">↪</button>
          </div>
        </header>

        {activePage === "dashboard" && <DashboardPage onNavigate={setActivePage} />}
        {activePage === "stundenplan" && <SchedulePage />}
        {activePage === "pruefungen" && <ExamsPage />}
        {activePage === "aufgaben" && <TasksPage />}
        {activePage === "module" && <ModulesPage />}
        {activePage === "events" && <EventsPage />}
        {activePage === "mitteilungen" && <MessagesPage />}
        {activePage === "einstellungen" && <SettingsPage />}
      </main>
    </div>
  );
}

function DashboardPage(props: { onNavigate: (page: PageKey) => void }) {
  const todaySchedule = schedule.filter((entry) => entry.day === "Heute");
  const openTasks = tasks.filter((task) => task.status !== "erledigt");

  return (
    <>
      <section className="stats">
        <Card title="Heute" value={String(todaySchedule.length)} subtitle="Termine" icon="📅" />
        <Card title="Aufgaben" value={String(openTasks.length)} subtitle="offen" icon="✅" />
        <Card title="Prüfungen" value="2" subtitle="nächste 7 Tage" icon="🎓" />
        <Card title="Events" value="4" subtitle="diese Woche" icon="📢" />
      </section>

      <section className="grid dashboardGrid">
        <div className="panel large">
          <PanelHeader title="Heute – 14. Mai 2026" />
          {todaySchedule.map((entry) => (
            <ScheduleItem key={`${entry.time}-${entry.title}`} {...entry} />
          ))}
          <button className="link" onClick={() => props.onNavigate("stundenplan")}>
            Zum vollständigen Stundenplan →
          </button>
        </div>

        <div className="panel large">
          <PanelHeader title="Kommende Prüfungen" link="Alle anzeigen" onClick={() => props.onNavigate("pruefungen")} />
          {exams.slice(0, 2).map((exam) => (
            <ExamItem key={exam.title} {...exam} />
          ))}
          <button className="link" onClick={() => props.onNavigate("pruefungen")}>
            Zu allen Prüfungen →
          </button>
        </div>

        <div className="panel">
          <PanelHeader title="Offene Aufgaben" link="Alle anzeigen" onClick={() => props.onNavigate("aufgaben")} />
          {openTasks.slice(0, 3).map((task) => (
            <Task key={task.title} {...task} />
          ))}
          <button className="link" onClick={() => props.onNavigate("aufgaben")}>
            Zu allen Aufgaben →
          </button>
        </div>

        <div className="panel">
          <PanelHeader title="Aktuelle Events" link="Alle anzeigen" onClick={() => props.onNavigate("events")} />
          {events.slice(0, 3).map((event) => (
            <Event key={event.title} {...event} />
          ))}
          <button className="link" onClick={() => props.onNavigate("events")}>
            Zu allen Events →
          </button>
        </div>

        <div className="panel">
          <PanelHeader title="Meine Module" link="Alle anzeigen" onClick={() => props.onNavigate("module")} />
          {modules.slice(0, 4).map((module) => (
            <Module key={module.title} {...module} />
          ))}
          <button className="link" onClick={() => props.onNavigate("module")}>
            Zu allen Modulen →
          </button>
        </div>
      </section>
    </>
  );
}

function SchedulePage() {
  const entriesByDay = useMemo(() => {
    return schedule.reduce<Record<string, ScheduleEntry[]>>((acc, entry) => {
      acc[entry.day] = acc[entry.day] || [];
      acc[entry.day].push(entry);
      return acc;
    }, {});
  }, []);

  return (
    <section className="pageGrid twoColumns">
      {Object.entries(entriesByDay).map(([day, entries]) => (
        <div className="panel" key={day}>
          <PanelHeader title={`${day} – ${entries[0].date}`} />
          {entries.map((entry) => (
            <ScheduleItem key={`${entry.time}-${entry.title}`} {...entry} />
          ))}
        </div>
      ))}
      <InfoPanel
        title="Demo-Hinweis"
        icon="💡"
        text="In einer echten Version könnten Stundenplandaten später aus LSF oder einem Uni-Kalender übernommen werden."
      />
    </section>
  );
}

function ExamsPage() {
  return (
    <section className="pageGrid twoColumns">
      <div className="panel widePanel">
        <PanelHeader title="Alle kommenden Prüfungen" />
        {exams.map((exam) => (
          <ExamItem key={exam.title} {...exam} />
        ))}
      </div>
      <div className="panel sidePanel">
        <PanelHeader title="Prüfungsstatus" />
        <MiniStat label="Bald" value="1" />
        <MiniStat label="Geplant" value="2" />
        <MiniStat label="Räume hinterlegt" value="3" />
      </div>
    </section>
  );
}

function TasksPage() {
  const openTasks = tasks.filter((task) => task.status !== "erledigt");
  const doneTasks = tasks.filter((task) => task.status === "erledigt");

  return (
    <section className="pageGrid twoColumns">
      <div className="panel widePanel">
        <PanelHeader title="Offene Aufgaben" />
        {openTasks.map((task) => (
          <Task key={task.title} {...task} />
        ))}
      </div>
      <div className="panel">
        <PanelHeader title="Erledigt" />
        {doneTasks.map((task) => (
          <Task key={task.title} {...task} />
        ))}
        <InfoPanel
          title="Priorisierung"
          icon="⏰"
          text="Aufgaben können später nach Deadline, Modul oder Priorität sortiert werden."
        />
      </div>
    </section>
  );
}

function ModulesPage() {
  return (
    <section className="moduleGrid">
      {modules.map((module) => (
        <ModuleCard key={module.title} {...module} />
      ))}
    </section>
  );
}

function EventsPage() {
  return (
    <section className="pageGrid twoColumns">
      <div className="panel widePanel">
        <PanelHeader title="Campus Events" />
        {events.map((event) => (
          <Event key={event.title} {...event} />
        ))}
      </div>
      <InfoPanel
        title="Mehrwert"
        icon="📢"
        text="Campus-Veranstaltungen werden sichtbar, ohne dass Studierende verschiedene Webseiten durchsuchen müssen."
      />
    </section>
  );
}

function MessagesPage() {
  return (
    <section className="pageGrid twoColumns">
      <div className="panel widePanel">
        <PanelHeader title="Aktuelle Mitteilungen" />
        {messages.map((message) => (
          <Message key={message.title} {...message} />
        ))}
      </div>
      <InfoPanel
        title="Demo-Daten"
        icon="✉️"
        text="Die Nachrichten sind Beispielinhalte. Später könnte dieser Bereich wichtige Uni-Mails oder Kursmeldungen bündeln."
      />
    </section>
  );
}

function SettingsPage() {
  return (
    <section className="pageGrid twoColumns">
      <div className="panel widePanel">
        <PanelHeader title="Benachrichtigungen" />
        <Setting label="Erinnerung an Aufgaben" description="1 Tag vor der Deadline anzeigen" enabled />
        <Setting label="Prüfungserinnerungen" description="7 Tage vorher hervorheben" enabled />
        <Setting label="Event-Hinweise" description="Campus-Events auf dem Dashboard anzeigen" enabled />
      </div>
      <div className="panel">
        <PanelHeader title="Darstellung" />
        <Setting label="Kompakte Ansicht" description="Mehr Einträge auf einer Seite anzeigen" />
        <Setting label="Wichtige Termine zuerst" description="Dashboard automatisch priorisieren" enabled />
        <InfoPanel
          title="Prototyp"
          icon="⚙️"
          text="Diese Einstellungen sind Platzhalter, um spätere Bedienoptionen in der Demo zu zeigen."
        />
      </div>
    </section>
  );
}

function Card(props: { title: string; value: string; subtitle: string; icon: string }) {
  return (
    <div className="card">
      <div className="cardIcon">{props.icon}</div>
      <div>
        <p>{props.title}</p>
        <h2>{props.value}</h2>
        <span>{props.subtitle}</span>
      </div>
    </div>
  );
}

function PanelHeader(props: { title: string; link?: string; onClick?: () => void }) {
  return (
    <div className="panelHeader">
      <h3>{props.title}</h3>
      {props.link && (
        <button className="link" onClick={props.onClick}>
          {props.link}
        </button>
      )}
    </div>
  );
}

function ScheduleItem(props: ScheduleEntry) {
  return (
    <div className="scheduleItem">
      <div className="time">{props.time}</div>
      <div>
        <strong>{props.title}</strong>
        <span>{props.type}</span>
        {props.lecturer && <small>{props.lecturer}</small>}
      </div>
      <div className="room">📍 {props.room}</div>
    </div>
  );
}

function ExamItem(props: Exam) {
  return (
    <div className="examItem">
      <div className="dateBox">
        <strong>{props.day}</strong>
        <span>{props.month}</span>
      </div>
      <div>
        <strong>{props.title}</strong>
        <span>{props.module}</span>
        <small className={`badge ${props.status === "bald" ? "danger" : "info"}`}>
          {props.status === "bald" ? "bald" : "geplant"}
        </small>
      </div>
      <div className="examMeta">
        <b>{props.date}</b>
        <span>{props.time}</span>
        <span>{props.room}</span>
      </div>
    </div>
  );
}

function Task(props: TaskEntry) {
  return (
    <div className={`row taskRow ${props.status === "erledigt" ? "done" : ""}`}>
      <span>{props.status === "erledigt" ? "☑" : "☐"}</span>
      <div>
        <strong>{props.title}</strong>
        <small>{props.module}</small>
      </div>
      <div className="rowMeta">
        <b>{props.date}</b>
        <small className={`badge ${props.priority}`}>{props.status}</small>
      </div>
    </div>
  );
}

function Event(props: EventEntry) {
  return (
    <div className="event">
      <div className="eventImg"></div>
      <div>
        <strong>{props.title}</strong>
        <span>{props.date}</span>
        <small>{props.place}</small>
      </div>
      <span className="eventCategory">{props.category}</span>
    </div>
  );
}

function Module(props: ModuleEntry) {
  return (
    <div className="row">
      <span className="moduleIcon">📘</span>
      <strong>{props.title}</strong>
      <b>{props.credits}</b>
    </div>
  );
}

function ModuleCard(props: ModuleEntry) {
  return (
    <div className="panel moduleCard">
      <div className="moduleCardHeader">
        <span className="moduleIcon">📘</span>
        <b>{props.credits}</b>
      </div>
      <h3>{props.title}</h3>
      <p>{props.lecturer}</p>
      <div className="progressLabel">
        <span>Fortschritt</span>
        <strong>{props.progress}%</strong>
      </div>
      <div className="progressBar">
        <div style={{ width: `${props.progress}%` }}></div>
      </div>
    </div>
  );
}

function Message(props: MessageEntry) {
  return (
    <div className={`message ${props.unread ? "unread" : ""}`}>
      <div>
        <strong>{props.title}</strong>
        <span>{props.sender} · {props.date}</span>
        <p>{props.text}</p>
      </div>
      {props.unread && <small className="badge info">neu</small>}
    </div>
  );
}

function Setting(props: { label: string; description: string; enabled?: boolean }) {
  return (
    <div className="settingRow">
      <div>
        <strong>{props.label}</strong>
        <span>{props.description}</span>
      </div>
      <span className={`toggle ${props.enabled ? "on" : ""}`}></span>
    </div>
  );
}

function MiniStat(props: { label: string; value: string }) {
  return (
    <div className="miniStat">
      <span>{props.label}</span>
      <strong>{props.value}</strong>
    </div>
  );
}

function InfoPanel(props: { title: string; icon: string; text: string }) {
  return (
    <div className="panel infoPanel">
      <div className="infoIcon">{props.icon}</div>
      <h3>{props.title}</h3>
      <p>{props.text}</p>
    </div>
  );
}

export default App;
