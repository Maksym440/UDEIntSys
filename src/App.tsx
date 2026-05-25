import "./App.css";

function App() {
  return (
    <div className="app">
      <aside className="sidebar">
        <div className="logo">🎓 UniDashboard</div>

        <nav>
          <a className="active">Dashboard</a>
          <a>Stundenplan</a>
          <a>Prüfungen</a>
          <a>Aufgaben</a>
          <a>Module</a>
          <a>Events</a>
          <a>Mitteilungen</a>
          <a>Einstellungen</a>
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
            <h1>Dashboard</h1>
            <p>Hallo User! Hier ist dein Überblick für heute.</p>
          </div>

          <div className="icons">
            <span>🔍</span>
            <span>🔔</span>
            <span>↪</span>
          </div>
        </header>

        <section className="stats">
          <Card title="Heute" value="3" subtitle="Termine" icon="📅" />
          <Card title="Aufgaben" value="5" subtitle="offen" icon="✅" />
          <Card title="Prüfungen" value="2" subtitle="nächste 7 Tage" icon="🎓" />
          <Card title="Events" value="4" subtitle="diese Woche" icon="📢" />
        </section>

        <section className="grid">
          <div className="panel large">
            <PanelHeader title="Heute – 14. Mai 2024" />

            <ScheduleItem
              time="09:15 – 10:45"
              title="Software Engineering"
              type="Vorlesung"
              room="Hörsaal 1"
            />
            <ScheduleItem
              time="11:00 – 12:30"
              title="Datenbanken"
              type="Übung"
              room="G22a R211"
            />
            <ScheduleItem
              time="14:00 – 15:30"
              title="Web Technologien"
              type="Labor"
              room="G29 R427"
            />

            <a className="link">Zum vollständigen Stundenplan →</a>
          </div>

          <div className="panel large">
            <PanelHeader title="Kommende Prüfungen" link="Alle anzeigen" />

            <ExamItem
              day="16"
              month="MAI"
              title="Datenbanken"
              date="16.06.2026"
              time="11:00 Uhr"
              room="Hörsaal 1"
            />
            <ExamItem
              day="23"
              month="MAI"
              title="Algorithmen und Datenstrukturen"
              date="23.07.2026"
              time="8:00 Uhr"
              room="Hörsaal 5"
            />

            <a className="link">Zu allen Prüfungen →</a>
          </div>

          <div className="panel">
            <PanelHeader title="Offene Aufgaben" link="Alle anzeigen" />

            <Task title="Übungsblatt 6" module="Datenbanken" date="16.05.2026" />
            <Task title="Projektabgabe" module="Software Engineering" date="20.05.2026" />
            <Task title="Essay" module="Wissenschaftliches Arbeiten" date="27.05.2026" />

            <a className="link">Zu allen Aufgaben →</a>
          </div>

          <div className="panel">
            <PanelHeader title="Aktuelle Events" link="Alle anzeigen" />

            <Event title="Workshop: AI Basics" date="15. Mai 2026 · 14:00 Uhr" place="Campus Raum 3.12" />
            <Event title="Career Day 2026" date="16. Mai 2026 · 10:00 Uhr" place="Zentralgebäude" />
            <Event title="Campus Sommerfest" date="17. Mai 2026 · 18:00 Uhr" place="Innenhof" />

            <a className="link">Zu allen Events →</a>
          </div>

          <div className="panel">
            <PanelHeader title="Meine Module" link="Alle anzeigen" />

            <Module title="Datenbanken" credits="6 CP" />
            <Module title="Software Engineering" credits="9 CP" />
            <Module title="Interaktive Systeme" credits="5 CP" />
            <Module title="Algorithmen und Datenstrukturen" credits="9 CP" />

            <a className="link">Zu allen Modulen →</a>
          </div>
        </section>
      </main>
    </div>
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

function PanelHeader(props: { title: string; link?: string }) {
  return (
    <div className="panelHeader">
      <h3>{props.title}</h3>
      {props.link && <a>{props.link}</a>}
    </div>
  );
}

function ScheduleItem(props: { time: string; title: string; type: string; room: string }) {
  return (
    <div className="scheduleItem">
      <div className="time">{props.time}</div>
      <div>
        <strong>{props.title}</strong>
        <span>{props.type}</span>
      </div>
      <div className="room">📍 {props.room}</div>
    </div>
  );
}

function ExamItem(props: {
  day: string;
  month: string;
  title: string;
  date: string;
  time: string;
  room: string;
}) {
  return (
    <div className="examItem">
      <div className="dateBox">
        <strong>{props.day}</strong>
        <span>{props.month}</span>
      </div>
      <div>
        <strong>{props.title}</strong>
        <span>Klausur</span>
      </div>
      <div className="examMeta">
        <b>{props.date}</b>
        <span>{props.time}</span>
        <span>{props.room}</span>
      </div>
    </div>
  );
}

function Task(props: { title: string; module: string; date: string }) {
  return (
    <div className="row">
      <span>☐</span>
      <div>
        <strong>{props.title}</strong>
        <small>{props.module}</small>
      </div>
      <b>{props.date}</b>
    </div>
  );
}

function Event(props: { title: string; date: string; place: string }) {
  return (
    <div className="event">
      <div className="eventImg"></div>
      <div>
        <strong>{props.title}</strong>
        <span>{props.date}</span>
        <small>{props.place}</small>
      </div>
    </div>
  );
}

function Module(props: { title: string; credits: string }) {
  return (
    <div className="row">
      <span className="moduleIcon">📘</span>
      <strong>{props.title}</strong>
      <b>{props.credits}</b>
    </div>
  );
}

export default App;