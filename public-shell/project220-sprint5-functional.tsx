import React, { FormEvent, useMemo, useState } from "react";

type Module = "dashboard" | "pantry" | "nutrition" | "cookbook" | "coach" | "basket" | "marketplace" | "delivery" | "pharmacy" | "coaches" | "admin" | "privacy";

const EMAIL = "admin@project220.app";
const PASSWORD = "Project220Admin!";

const modules: { id: Module; label: string; description: string }[] = [
  { id: "dashboard", label: "Dashboard", description: "Complete Project 220 test centre" },
  { id: "pantry", label: "Pantry AI", description: "Photo, receipt and barcode demo" },
  { id: "nutrition", label: "Nutrition", description: "Universal and pregnancy plans" },
  { id: "cookbook", label: "Cookbook", description: "Private 30-day meal generation" },
  { id: "coach", label: "AI Coach", description: "Tone, reminders and wellness guidance" },
  { id: "basket", label: "Basket Optimizer", description: "Cost, nutrition, budget and waste checks" },
  { id: "marketplace", label: "Marketplace", description: "Simulated grocery and supplement order" },
  { id: "delivery", label: "Driver Portal", description: "Shopping and food-safety workflow" },
  { id: "pharmacy", label: "Pharmacy", description: "Simulated chain of custody" },
  { id: "coaches", label: "Coach Marketplace", description: "Verified professional coach requests" },
  { id: "admin", label: "Master Admin", description: "Privacy-safe operations and analytics" },
  { id: "privacy", label: "Privacy", description: "Private subscriber data boundaries" },
];

export default function Project220Sprint5Functional() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState(EMAIL);
  const [password, setPassword] = useState(PASSWORD);
  const [error, setError] = useState("");
  const [active, setActive] = useState<Module>("dashboard");
  const [events, setEvents] = useState<string[]>([]);
  const [pantryItems, setPantryItems] = useState<string[]>([]);
  const [mealPlan, setMealPlan] = useState<string[]>([]);
  const [coachTone, setCoachTone] = useState("Supportive");
  const [basketReady, setBasketReady] = useState(false);
  const [orderStatus, setOrderStatus] = useState("No demo order created");
  const [safety, setSafety] = useState({ gloves: false, produce: false, cold: false, photo: false });
  const [pharmacy, setPharmacy] = useState({ identity: false, seal: false, handoff: false });
  const [appointment, setAppointment] = useState("No appointment requested");

  const pharmacyReady = useMemo(() => Object.values(pharmacy).every(Boolean), [pharmacy]);
  const safetyReady = useMemo(() => Object.values(safety).every(Boolean), [safety]);

  function log(message: string) {
    setEvents((current) => [`${new Date().toLocaleTimeString("en-CA")} — ${message}`, ...current].slice(0, 30));
  }

  function login(event: FormEvent) {
    event.preventDefault();
    if (email.trim().toLowerCase() !== EMAIL || password !== PASSWORD) {
      setError("Incorrect Master Admin test login.");
      return;
    }
    setLoggedIn(true);
    setError("");
    log("Master Admin signed in to functional Sprint 5 Alpha.");
  }

  function openModule(id: Module) {
    setActive(id);
    log(`Opened ${modules.find((m) => m.id === id)?.label}.`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function runFullDemo() {
    setPantryItems(["Chicken breast", "Rice", "Greek yogurt", "Frozen berries", "Spinach", "Milk"]);
    setMealPlan(["Berry yogurt breakfast bowl", "Chicken rice power bowl", "Spinach pasta dinner", "Frozen yogurt berry bites"]);
    setBasketReady(true);
    setOrderStatus("Demo order created — awaiting substitution approval");
    setEvents([`${new Date().toLocaleTimeString("en-CA")} — Full connected demo completed. Pantry, nutrition, cookbook, coach, basket and marketplace results generated.`]);
  }

  if (!loggedIn) {
    return <main style={ui.shell}><form onSubmit={login} style={ui.login}>
      <div style={ui.brand}>PROJECT <span style={ui.red}>220</span></div>
      <h1>Functional Unified Alpha</h1>
      <p style={ui.muted}>This build contains working navigation and clickable demonstration controls.</p>
      <label style={ui.label}>Email<input style={ui.input} value={email} onChange={(e) => setEmail(e.target.value)} autoCapitalize="none" /></label>
      <label style={ui.label}>Password<input style={ui.input} type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></label>
      {error && <p style={ui.error}>{error}</p>}
      <button type="submit" style={ui.primary}>Sign in</button>
      <small>{EMAIL}<br />{PASSWORD}</small>
    </form></main>;
  }

  return <main style={ui.shell}><section style={ui.app}>
    <header style={ui.header}>
      <div><div style={ui.brand}>PROJECT <span style={ui.red}>220</span></div><small>Functional Sprint 5 Unified Alpha</small></div>
      <button type="button" style={ui.button} onClick={() => setLoggedIn(false)}>Log out</button>
    </header>

    <aside style={ui.privacy}><b>Privacy promise:</b> Master Admin can test operations but cannot view real subscriber health information, pantry photos, progress photos, private plans or coaching conversations.</aside>

    <nav style={ui.nav}>{modules.map((module) => <button type="button" key={module.id} style={active === module.id ? ui.active : ui.button} onClick={() => openModule(module.id)}>{module.label}</button>)}</nav>

    {active === "dashboard" && <>
      <section style={ui.hero}><h1>Project 220 Test Centre</h1><p>Use the module buttons above or the cards below. Every red button runs a real local demo action.</p><button type="button" style={ui.primary} onClick={runFullDemo}>Run Full AI Ecosystem Demo</button></section>
      <div style={ui.grid}>{modules.filter((m) => m.id !== "dashboard").map((module) => <button type="button" key={module.id} style={ui.cardButton} onClick={() => openModule(module.id)}><b>{module.label}</b><span>{module.description}</span><small>Open module →</small></button>)}</div>
    </>}

    {active === "pantry" && <Panel title="Pantry AI"><p>Simulate pantry-photo, receipt and barcode recognition.</p><button type="button" style={ui.primary} onClick={() => { setPantryItems(["Chicken breast", "Rice", "Greek yogurt", "Frozen berries", "Spinach", "Milk"]); log("Pantry AI recognized six synthetic items."); }}>Process Demo Pantry Photo</button>{pantryItems.length > 0 && <List items={pantryItems} />}</Panel>}

    {active === "nutrition" && <Panel title="Universal Nutrition Planning"><p>Choose a test profile. Pregnancy plans include safety notices and avoid restrictive dieting.</p><div style={ui.rowButtons}>{["Adult muscle gain", "Pregnancy — trimester 2", "Teen athlete", "Elderly wellness", "Child family plan"].map((p) => <button type="button" key={p} style={ui.button} onClick={() => { setMealPlan([`${p}: balanced breakfast`, `${p}: protein-rich lunch`, `${p}: family dinner`, `${p}: healthy snack`]); log(`Generated ${p} nutrition plan.`); }}>{p}</button>)}</div>{mealPlan.length > 0 && <List items={mealPlan} />}</Panel>}

    {active === "cookbook" && <Panel title="Premium Private Cookbook"><button type="button" style={ui.primary} onClick={() => { setMealPlan(["Berry yogurt breakfast bowl", "Chicken rice power bowl", "Kid-friendly turkey pasta", "Frozen yogurt berry bites", "Bulk-prep vegetable soup"]); log("Generated private cookbook recipes."); }}>Generate Private Recipes</button>{mealPlan.length > 0 && <List items={mealPlan} />}</Panel>}

    {active === "coach" && <Panel title="AI Wellness Coach"><p>Current tone: <b>{coachTone}</b></p><div style={ui.rowButtons}>{["Supportive", "Motivational", "Intense", "Elite"].map((tone) => <button type="button" key={tone} style={coachTone === tone ? ui.active : ui.button} onClick={() => { setCoachTone(tone); log(`Changed AI Coach tone to ${tone}.`); }}>{tone}</button>)}</div><button type="button" style={ui.primary} onClick={() => log(`AI Coach (${coachTone}) generated today's hydration, workout and meal reminders.`)}>Generate Today’s Coaching</button></Panel>}

    {active === "basket" && <Panel title="Smart Basket Optimizer"><button type="button" style={ui.primary} onClick={() => { setBasketReady(true); log("Basket optimization completed."); }}>Run All Optimizers</button>{basketReady && <List items={["Cost: lowest demo basket selected", "Nutrition: protein and produce balance improved", "Supplements: duplicate products removed", "Budget: within weekly target", "Waste: expiring yogurt used first"]} />}</Panel>}

    {active === "marketplace" && <Panel title="Unified Marketplace"><p>{orderStatus}</p><button type="button" style={ui.primary} onClick={() => { setOrderStatus("Demo order created — awaiting substitution approval"); log("Created grocery and supplement demo order."); }}>Create Demo Order</button><button type="button" style={ui.button} onClick={() => { setOrderStatus("Substitution approved — sent to shopper"); log("Customer approved substitution."); }}>Approve Substitution</button></Panel>}

    {active === "delivery" && <Panel title="Shopper & Driver Portal"><CheckGroup values={safety} setValues={setSafety} labels={{ gloves: "Clean hands/gloves confirmed", produce: "Produce sealed and labelled", cold: "Cold/frozen/raw items separated", photo: "Packing evidence photo recorded" }} /> <p>Status: <b>{safetyReady ? "Ready for simulated delivery" : "Blocked until every safety task is completed"}</b></p><button type="button" style={ui.primary} disabled={!safetyReady} onClick={() => log("Simulated delivery completed safely.")}>Complete Demo Delivery</button></Panel>}

    {active === "pharmacy" && <Panel title="Pharmacy Chain of Custody"><CheckGroup values={pharmacy} setValues={setPharmacy} labels={{ identity: "Customer identity verified", seal: "Package seal intact", handoff: "Customer handoff or pharmacy return recorded" }} /><p>Status: <b>{pharmacyReady ? "Demo handoff approved" : "Release blocked"}</b></p></Panel>}

    {active === "coaches" && <Panel title="Professional Coach Marketplace"><p>{appointment}</p>{["Jordan Lee — Strength & habits — Verified", "Maya Singh — Family wellness — Verified", "Alex Martin — Verification pending"].map((coach) => <div key={coach} style={ui.row}><span>{coach}</span><button type="button" style={ui.button} onClick={() => { const blocked = coach.includes("pending"); setAppointment(blocked ? "Request blocked: coach is not verified" : `Demo appointment requested with ${coach.split(" — ")[0]}`); log(blocked ? "Blocked unverified coach request." : "Created synthetic coach request."); }}>Request</button></div>)}</Panel>}

    {active === "admin" && <Panel title="Master Admin Operations"><List items={["25 synthetic active accounts", "12 demo orders", "96% synthetic safety completion", "Retailer integration readiness visible", "Private subscriber content unavailable"]} /></Panel>}

    {active === "privacy" && <Panel title="Privacy & Confidentiality"><List items={["No advertising trackers in this demo", "No cross-site tracking cookies", "Pantry and progress photos remain subscriber-private", "Admins see operational status only", "Users choose whether pantry photos are retained or deleted after processing"]} /></Panel>}

    <section style={ui.activity}><h2>Live Test Activity</h2>{events.length ? <ul>{events.map((event, index) => <li key={`${event}-${index}`}>{event}</li>)}</ul> : <p>No actions recorded yet.</p>}</section>
  </section></main>;
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) { return <section style={ui.panel}><h1>{title}</h1>{children}</section>; }
function List({ items }: { items: string[] }) { return <ul style={ui.list}>{items.map((item) => <li key={item}>{item}</li>)}</ul>; }
function CheckGroup<T extends Record<string, boolean>>({ values, setValues, labels }: { values: T; setValues: React.Dispatch<React.SetStateAction<T>>; labels: Record<keyof T, string> }) { return <div>{(Object.keys(values) as (keyof T)[]).map((key) => <label key={String(key)} style={ui.check}><input type="checkbox" checked={values[key]} onChange={(e) => setValues((current) => ({ ...current, [key]: e.target.checked }))} /> {labels[key]}</label>)}</div>; }

const ui: Record<string, React.CSSProperties> = {
  shell: { minHeight: "100vh", background: "#080808", color: "#fff", fontFamily: "Arial, sans-serif", margin: 0, maxWidth: "none", padding: 0 },
  app: { maxWidth: 1180, margin: "0 auto", padding: "18px 16px 80px" }, login: { maxWidth: 520, margin: "0 auto", padding: "48px 20px", display: "grid", gap: 14 },
  brand: { fontSize: 28, fontWeight: 900 }, red: { color: "#ef4444" }, muted: { color: "#c7c7c7" }, error: { color: "#fecaca" }, label: { display: "grid", gap: 6 }, input: { padding: 12, borderRadius: 8, border: "1px solid #555", background: "#111", color: "white" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }, privacy: { background: "#17202a", borderLeft: "5px solid #22c55e", padding: 14, borderRadius: 10, margin: "16px 0" },
  nav: { display: "flex", gap: 8, overflowX: "auto", padding: "4px 0 16px" }, button: { background: "#242424", color: "white", border: "1px solid #555", borderRadius: 8, padding: "11px 13px", cursor: "pointer" }, active: { background: "#991b1b", color: "white", border: "1px solid #ef4444", borderRadius: 8, padding: "11px 13px", cursor: "pointer" }, primary: { background: "#b91c1c", color: "white", border: 0, borderRadius: 8, padding: "12px 16px", fontWeight: 700, cursor: "pointer", marginRight: 8 },
  hero: { background: "#181818", border: "1px solid #333", borderRadius: 12, padding: 20, marginBottom: 14 }, grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 12 }, cardButton: { background: "#151515", color: "white", border: "1px solid #333", borderRadius: 10, padding: 16, display: "grid", gap: 8, textAlign: "left", cursor: "pointer" },
  panel: { background: "#121212", border: "1px solid #2b2b2b", borderRadius: 12, padding: 20, minHeight: 300 }, activity: { background: "#101010", border: "1px solid #2b2b2b", borderRadius: 10, padding: 18, marginTop: 14 }, list: { lineHeight: 1.8 }, rowButtons: { display: "flex", flexWrap: "wrap", gap: 8, margin: "12px 0" }, row: { display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, padding: "12px 0", borderBottom: "1px solid #333" }, check: { display: "block", padding: "10px 0", cursor: "pointer" }
};
