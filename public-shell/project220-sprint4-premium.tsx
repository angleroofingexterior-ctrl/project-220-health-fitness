import React, { FormEvent, useMemo, useState } from "react";

type View = "overview" | "coaches" | "pharmacy" | "retailers" | "notifications" | "analytics";
type Coach = { name: string; specialty: string; verified: boolean; rate: number; status: string };

const ADMIN_EMAIL = "admin@project220.app";
const ADMIN_PASSWORD = "Project220Admin!";

const coaches: Coach[] = [
  { name: "Jordan Lee", specialty: "Strength and habit coaching", verified: true, rate: 55, status: "Available" },
  { name: "Maya Singh", specialty: "Family wellness and meal routines", verified: true, rate: 60, status: "Available tomorrow" },
  { name: "Alex Martin", specialty: "Boxing conditioning and recovery", verified: false, rate: 45, status: "Verification pending" },
];

const retailerStatus = [
  ["Walmart", "Demo catalogue ready"], ["Real Canadian Superstore", "Commercial access required"],
  ["No Frills", "Receipt-price demo ready"], ["FreshCo", "Receipt-price demo ready"],
  ["GNC", "Supplement catalogue demo"], ["Popeye's Supplements", "Supplement catalogue demo"],
  ["Shoppers Drug Mart", "Pharmacy pickup framework only"], ["Rexall", "Pharmacy pickup framework only"],
];

export default function Project220Sprint4Premium() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState(ADMIN_EMAIL);
  const [password, setPassword] = useState(ADMIN_PASSWORD);
  const [error, setError] = useState("");
  const [view, setView] = useState<View>("overview");
  const [events, setEvents] = useState<string[]>([]);
  const [appointment, setAppointment] = useState("No appointment requested");
  const [identityChecked, setIdentityChecked] = useState(false);
  const [sealChecked, setSealChecked] = useState(false);
  const [handoffRecorded, setHandoffRecorded] = useState(false);
  const [notifications, setNotifications] = useState({ workout: true, meals: true, hydration: true, pantry: true, delivery: true });
  const [flags, setFlags] = useState({ coachMarketplace: true, pharmacyDemo: true, retailerComparison: true, pushDemo: true });

  const pharmacyReady = identityChecked && sealChecked && handoffRecorded;
  const enabledNotifications = useMemo(() => Object.values(notifications).filter(Boolean).length, [notifications]);

  function addEvent(message: string) {
    setEvents((current) => [`${new Date().toLocaleTimeString("en-CA")} — ${message}`, ...current].slice(0, 25));
  }

  function login(event: FormEvent) {
    event.preventDefault();
    if (email.trim().toLowerCase() !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      setError("Incorrect Master Admin test login.");
      return;
    }
    setLoggedIn(true);
    setError("");
    addEvent("Master Admin opened Sprint 4 Premium Operations.");
  }

  function requestCoach(coach: Coach) {
    if (!coach.verified) {
      setAppointment("Request blocked: coach verification is incomplete");
      addEvent(`Blocked appointment request for ${coach.name}.`);
      return;
    }
    setAppointment(`Demo appointment requested with ${coach.name}`);
    addEvent(`Requested a demo appointment with ${coach.name}.`);
  }

  if (!loggedIn) {
    return <main style={ui.shell}><form onSubmit={login} style={ui.login}>
      <div style={ui.brand}>PROJECT <span style={ui.red}>220</span></div>
      <h1>Sprint 4 Premium Operations Alpha</h1>
      <p>Test professional coaching, pharmacy chain-of-custody, retailer readiness, notifications and privacy-safe analytics.</p>
      <label>Email<input value={email} onChange={(e) => setEmail(e.target.value)} autoCapitalize="none" /></label>
      <label>Password<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></label>
      {error && <p style={ui.error}>{error}</p>}
      <button style={ui.primary}>Sign in</button>
      <small>{ADMIN_EMAIL}<br />{ADMIN_PASSWORD}</small>
    </form></main>;
  }

  return <main style={ui.shell}><section style={ui.app}>
    <header style={ui.header}><div><div style={ui.brand}>PROJECT <span style={ui.red}>220</span></div><small>Sprint 4 · Premium Services Demo</small></div><button style={ui.button} onClick={() => setLoggedIn(false)}>Log out</button></header>
    <aside style={ui.privacy}><b>Privacy boundary:</b> Analytics show service counts and workflow status only. Subscriber health data, pantry contents, photos, plans and private coaching conversations remain inaccessible.</aside>
    <nav style={ui.nav}>{(["overview","coaches","pharmacy","retailers","notifications","analytics"] as View[]).map((item) => <button key={item} style={view === item ? ui.active : ui.button} onClick={() => setView(item)}>{item}</button>)}</nav>

    {view === "overview" && <>
      <section style={ui.hero}><h1>Premium Operations Command Centre</h1><p>All systems operate with synthetic data. No payment, prescription release, retailer purchase or professional service is actually booked.</p></section>
      <div style={ui.grid}>
        <Card title="Coach marketplace" value={`${coaches.filter((c) => c.verified).length} verified`} text={appointment} />
        <Card title="Pharmacy workflow" value={pharmacyReady ? "Ready" : "Blocked"} text="Identity, sealed package and handoff are mandatory" />
        <Card title="Retailer readiness" value={`${retailerStatus.length} partners`} text="Demo, framework or commercial-access status" />
        <Card title="Notifications" value={`${enabledNotifications} enabled`} text="Local Alpha reminder controls" />
      </div>
    </>}

    {view === "coaches" && <section style={ui.panel}><h2>Professional Coach Marketplace</h2><p>{appointment}</p><div style={ui.grid}>{coaches.map((coach) => <article key={coach.name} style={ui.card}><b>{coach.name}</b><span>{coach.specialty}</span><span>{coach.verified ? "✓ Verified" : "Verification pending"}</span><span>${coach.rate}/session · {coach.status}</span><button style={ui.primary} onClick={() => requestCoach(coach)}>Request demo appointment</button></article>)}</div><small>Project 220 general AI coaching is not medical care. Professional credentials and marketplace agreements require production verification.</small></section>}

    {view === "pharmacy" && <section style={ui.panel}><h2>Pharmacy Pickup Chain of Custody</h2><p>Status: <b>{pharmacyReady ? "Demo release approved" : "Release blocked"}</b></p>
      <Check label="Customer identity verification recorded" checked={identityChecked} setChecked={(v) => { setIdentityChecked(v); addEvent("Updated pharmacy identity check."); }} />
      <Check label="Pharmacy package seal confirmed intact" checked={sealChecked} setChecked={(v) => { setSealChecked(v); addEvent("Updated pharmacy package seal check."); }} />
      <Check label="Customer handoff or pharmacy return recorded" checked={handoffRecorded} setChecked={(v) => { setHandoffRecorded(v); addEvent("Updated pharmacy handoff record."); }} />
      <p>Project 220 does not prescribe, dispense, substitute, open or repackage medication. Controlled and restricted categories remain disabled.</p></section>}

    {view === "retailers" && <section style={ui.panel}><h2>Retailer Integration Readiness</h2>{retailerStatus.map(([name,status]) => <div key={name} style={ui.row}><b>{name}</b><span>{status}</span></div>)}</section>}

    {view === "notifications" && <section style={ui.panel}><h2>Notification Centre</h2>{Object.entries(notifications).map(([key,value]) => <Check key={key} label={`${key} reminders`} checked={value} setChecked={(v) => { setNotifications((current) => ({ ...current, [key]: v })); addEvent(`Changed ${key} reminder setting.`); }} />)}<button style={ui.primary} onClick={() => addEvent("Sent a synthetic test notification.")}>Send test notification</button></section>}

    {view === "analytics" && <section style={ui.panel}><h2>Master Admin Analytics and Feature Flags</h2>
      <div style={ui.grid}><Card title="Synthetic active accounts" value="25" text="No subscriber-private content included" /><Card title="Demo orders" value="12" text="No real purchases" /><Card title="Safety completion" value="96%" text="Synthetic operational metric" /><Card title="Coach requests" value={appointment.startsWith("Demo") ? "1" : "0"} text="Synthetic appointment workflow" /></div>
      <h3>Feature flags</h3>{Object.entries(flags).map(([key,value]) => <Check key={key} label={key} checked={value} setChecked={(v) => { setFlags((current) => ({ ...current, [key]: v })); addEvent(`Changed ${key} feature flag.`); }} />)}
      <h3>Operational activity</h3>{events.length ? <ul>{events.map((event,index) => <li key={`${event}-${index}`}>{event}</li>)}</ul> : <p>No activity yet.</p>}
    </section>}
  </section></main>;
}

function Card({ title, value, text }: { title: string; value: string; text: string }) { return <article style={ui.card}><b>{title}</b><strong style={{fontSize:24}}>{value}</strong><small>{text}</small></article>; }
function Check({ label, checked, setChecked }: { label: string; checked: boolean; setChecked: (value:boolean) => void }) { return <label style={ui.check}><input type="checkbox" checked={checked} onChange={(e) => setChecked(e.target.checked)} /> {label}</label>; }

const ui: Record<string, React.CSSProperties> = {
  shell: { minHeight: "100vh", background: "#080808", color: "white", fontFamily: "Arial, sans-serif" }, app: { maxWidth: 1180, margin: "auto", padding: "18px 16px 80px" }, login: { maxWidth: 500, margin: "auto", padding: "48px 20px", display: "grid", gap: 14 },
  brand: { fontSize: 28, fontWeight: 900 }, red: { color: "#ef4444" }, error: { color: "#fecaca" }, header: { display: "flex", justifyContent: "space-between", alignItems: "center" }, privacy: { background: "#17202a", borderLeft: "5px solid #22c55e", padding: 14, borderRadius: 10, margin: "16px 0" },
  nav: { display: "flex", gap: 8, overflowX: "auto", marginBottom: 14 }, button: { background: "#242424", color: "white", border: "1px solid #444", borderRadius: 8, padding: "10px 12px" }, active: { background: "#991b1b", color: "white", border: "1px solid #ef4444", borderRadius: 8, padding: "10px 12px" }, primary: { background: "#b91c1c", color: "white", border: 0, borderRadius: 8, padding: "11px 14px", fontWeight: 700 },
  hero: { background: "#181818", border: "1px solid #333", borderRadius: 12, padding: 20, marginBottom: 14 }, grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 12 }, card: { background: "#151515", border: "1px solid #303030", borderRadius: 10, padding: 16, display: "grid", gap: 8 }, panel: { background: "#121212", border: "1px solid #2b2b2b", borderRadius: 10, padding: 18 }, row: { display: "flex", justifyContent: "space-between", gap: 16, padding: "12px 0", borderBottom: "1px solid #2b2b2b" }, check: { display: "block", padding: "10px 0" }
};
