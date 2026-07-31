import React, { FormEvent, useState } from "react";

const ADMIN_EMAIL = "admin@project220.app";
const ADMIN_PASSWORD = "Project220Admin!";

type Screen = "overview" | "coach" | "pantry" | "grocery" | "delivery" | "professionals" | "training" | "nutrition" | "users";

type PantryItem = { name: string; qty: number; unit: string; low: boolean };
type GroceryItem = { name: string; qty: number; checked: boolean };
type Delivery = { id: string; customer: string; status: string; driver: string };

const initialPantry: PantryItem[] = [
  { name: "Chicken breast", qty: 2, unit: "kg", low: false },
  { name: "Brown rice", qty: 1, unit: "kg", low: false },
  { name: "Plain yogurt", qty: 500, unit: "g", low: true },
  { name: "Mixed berries", qty: 300, unit: "g", low: true },
];

const initialGroceries: GroceryItem[] = [
  { name: "Plain Greek yogurt", qty: 4, checked: false },
  { name: "Mixed berries", qty: 2, checked: false },
  { name: "Eggs", qty: 24, checked: false },
  { name: "Chicken breast", qty: 3, checked: false },
  { name: "Potatoes", qty: 5, checked: false },
];

const initialDeliveries: Delivery[] = [
  { id: "P220-1042", customer: "Marcel Goulet", status: "Merchant preparing", driver: "Unassigned" },
  { id: "P220-1041", customer: "Demo Household", status: "Driver assigned", driver: "Alex D." },
];

export default function Project220Demo() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState(ADMIN_EMAIL);
  const [password, setPassword] = useState(ADMIN_PASSWORD);
  const [error, setError] = useState("");
  const [screen, setScreen] = useState<Screen>("overview");
  const [coachTone, setCoachTone] = useState("Motivational");
  const [coachMessage, setCoachMessage] = useState("Your daily goals are ready. Complete the next useful action with good form.");
  const [pantry, setPantry] = useState(initialPantry);
  const [groceries, setGroceries] = useState(initialGroceries);
  const [deliveries, setDeliveries] = useState(initialDeliveries);
  const [notice, setNotice] = useState("");

  function login(event: FormEvent) {
    event.preventDefault();
    if (email.trim().toLowerCase() !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      setError("The administrator email or password is incorrect.");
      return;
    }
    setError("");
    setLoggedIn(true);
    setScreen("overview");
  }

  function logout() {
    setLoggedIn(false);
    setScreen("overview");
    setNotice("");
  }

  function generateCoachMessage() {
    const messages: Record<string, string> = {
      Supportive: "You are building consistency. Complete one healthy action now and let that win carry you forward.",
      Motivational: "Your plan is ready. Start now, stay focused, and finish today's goals with purpose.",
      Performance: "Execute today's workout, hit your nutrition targets, and record your results accurately.",
      Elite: "No wasted motion. Complete the plan, protect your form, recover properly, and earn tomorrow's progress.",
    };
    setCoachMessage(messages[coachTone]);
    setNotice("AI Coach briefing regenerated using the selected intensity.");
  }

  function scanPantry() {
    setPantry((items) => items.map((item) => item.name === "Plain yogurt" ? { ...item, qty: item.qty + 908, low: false } : item));
    setNotice("Pantry AI processed a simulated 908 g yogurt scan and updated inventory.");
  }

  function buildCart() {
    setGroceries((items) => items.map((item) => ({ ...item, checked: true })));
    setNotice("Grocery AI reviewed pantry levels and prepared the full weekly cart.");
  }

  function placeOrder() {
    const id = `P220-${1043 + deliveries.length}`;
    setDeliveries((items) => [{ id, customer: "Marcel Goulet", status: "Order received", driver: "Unassigned" }, ...items]);
    setNotice(`Order ${id} was created in the delivery system prototype.`);
    setScreen("delivery");
  }

  function assignDriver(id: string) {
    setDeliveries((items) => items.map((item) => item.id === id ? { ...item, status: "Driver assigned", driver: "Jordan P." } : item));
    setNotice(`Driver assigned to ${id}.`);
  }

  if (!loggedIn) {
    return (
      <main style={styles.page}>
        <section style={styles.loginWrap}>
          <div style={styles.logo}>PROJECT <span style={styles.red}>220</span></div>
          <div style={styles.tagline}>BUILD. EAT. RECOVER. REPEAT.</div>
          <form onSubmit={login} style={styles.card}>
            <div style={styles.adminBadge}>ADMINISTRATOR PORTAL</div>
            <h1 style={styles.heading}>Sign in to Project 220</h1>
            <p style={styles.muted}>The administrator account opens every prototype system.</p>
            <label style={styles.label}>Administrator email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} autoCapitalize="none" style={styles.input} />
            <label style={styles.label}>Password</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" style={styles.input} />
            {error && <div style={styles.error}>{error}</div>}
            <button type="submit" style={styles.primaryButton}>Sign In as Administrator</button>
            <button type="button" onClick={() => { setEmail(ADMIN_EMAIL); setPassword(ADMIN_PASSWORD); setError(""); }} style={styles.secondaryButton}>Fill Administrator Login</button>
            <div style={styles.credentials}><strong>Email:</strong> {ADMIN_EMAIL}<br/><strong>Password:</strong> {ADMIN_PASSWORD}</div>
          </form>
        </section>
      </main>
    );
  }

  return (
    <main style={styles.page}>
      <section style={styles.appWrap}>
        <header style={styles.header}>
          <button onClick={() => setScreen("overview")} style={styles.logoButton}>PROJECT <span style={styles.red}>220</span></button>
          <button onClick={logout} style={styles.logout}>Log out</button>
        </header>
        <div style={styles.adminBadge}>OWNER ADMIN • MARCEL GOULET</div>
        <h1 style={styles.welcome}>{titleFor(screen)}</h1>
        <p style={styles.muted}>{subtitleFor(screen)}</p>

        {screen === "overview" && <Overview open={setScreen} />}
        {screen === "coach" && (
          <Panel>
            <h2>AI Coach Control Centre</h2>
            <label style={styles.label}>Coach intensity</label>
            <select value={coachTone} onChange={(e) => setCoachTone(e.target.value)} style={styles.input}>
              <option>Supportive</option><option>Motivational</option><option>Performance</option><option>Elite</option>
            </select>
            <div style={styles.aiMessage}>{coachMessage}</div>
            <button onClick={generateCoachMessage} style={styles.primaryButton}>Generate Daily Coach Briefing</button>
          </Panel>
        )}
        {screen === "pantry" && (
          <Panel>
            <h2>Pantry AI</h2>
            {pantry.map((item) => <Row key={item.name} left={item.name} right={`${item.qty} ${item.unit}${item.low ? " • LOW" : ""}`} alert={item.low} />)}
            <button onClick={scanPantry} style={styles.primaryButton}>Simulate Barcode / Receipt Scan</button>
          </Panel>
        )}
        {screen === "grocery" && (
          <Panel>
            <h2>Grocery Shopping</h2>
            {groceries.map((item, index) => (
              <button key={item.name} style={styles.listButton} onClick={() => setGroceries((items) => items.map((x, i) => i === index ? { ...x, checked: !x.checked } : x))}>
                <span>{item.checked ? "✓" : "○"} {item.name}</span><strong>{item.qty}</strong>
              </button>
            ))}
            <button onClick={buildCart} style={styles.primaryButton}>AI Build Weekly Cart</button>
            <button onClick={placeOrder} style={styles.secondaryButton}>Place Prototype Grocery Order</button>
          </Panel>
        )}
        {screen === "delivery" && (
          <Panel>
            <h2>Project 220 Delivery</h2>
            {deliveries.map((item) => (
              <div key={item.id} style={styles.deliveryCard}>
                <strong>{item.id}</strong><span>{item.customer}</span><span>{item.status}</span><span>Driver: {item.driver}</span>
                {item.driver === "Unassigned" && <button onClick={() => assignDriver(item.id)} style={styles.smallButton}>Assign Driver</button>}
              </div>
            ))}
          </Panel>
        )}
        {screen === "professionals" && <Simple title="Professional Network" lines={["Registered dietitians: 2 pending verification", "Personal trainers: 4 active", "Physiotherapists: 1 invited", "Subscriber-controlled permissions: enabled"]} />}
        {screen === "training" && <Simple title="Training Engine" lines={["Bodybuilding and strength plans", "Running, cycling and hiking", "Youth and healthy aging", "Prenatal, postpartum and adaptive fitness", "Detailed form explanations and safety guidance"]} />}
        {screen === "nutrition" && <Simple title="Whole-Food Nutrition Engine" lines={["Clean, minimally processed food standard", "Personal meal plans and recipes", "Household quantities and grocery budget", "Allergy and professional restriction checks"]} />}
        {screen === "users" && <Simple title="Platform Administration" lines={["Subscribers: 1 demo account", "Professionals: 7", "Merchants: 2 pending", "Drivers: 3", "Audit logging: enabled in architecture"]} />}

        {notice && <div style={styles.notice}>{notice}</div>}
        <nav style={styles.nav}>
          {(["overview", "coach", "pantry", "grocery", "delivery"] as Screen[]).map((id) => <button key={id} onClick={() => { setScreen(id); setNotice(""); }} style={screen === id ? styles.navActive : styles.navButton}>{id === "overview" ? "Home" : id.charAt(0).toUpperCase() + id.slice(1)}</button>)}
        </nav>
      </section>
    </main>
  );
}

function Overview({ open }: { open: (screen: Screen) => void }) {
  const cards: Array<[Screen, string, string]> = [
    ["coach", "AI Coach", "Change intensity and generate coaching"],
    ["pantry", "Pantry AI", "Scan, track and replenish household food"],
    ["grocery", "Grocery Shopping", "Build carts and create orders"],
    ["delivery", "Delivery Service", "Dispatch drivers and track orders"],
    ["professionals", "Professional Network", "Dietitians, trainers and providers"],
    ["training", "Training Engine", "All fitness disciplines and form education"],
    ["nutrition", "Nutrition Engine", "Whole-food meal and recipe intelligence"],
    ["users", "Admin Operations", "Users, merchants, drivers and controls"],
  ];
  return <div style={styles.grid}>{cards.map(([id, title, subtitle]) => <button key={id} onClick={() => open(id)} style={styles.moduleCard}><strong style={styles.moduleTitle}>{title}</strong><span style={styles.moduleSubtitle}>{subtitle}</span><span style={styles.openLabel}>OPEN →</span></button>)}</div>;
}

function Panel({ children }: { children: React.ReactNode }) { return <section style={styles.card}>{children}</section>; }
function Row({ left, right, alert }: { left: string; right: string; alert?: boolean }) { return <div style={styles.row}><span>{left}</span><strong style={alert ? styles.alert : undefined}>{right}</strong></div>; }
function Simple({ title, lines }: { title: string; lines: string[] }) { return <Panel><h2>{title}</h2>{lines.map((line) => <div key={line} style={styles.row}>{line}<span>✓</span></div>)}</Panel>; }
function titleFor(screen: Screen) { return screen === "overview" ? "Project 220 Command Centre" : screen.charAt(0).toUpperCase() + screen.slice(1); }
function subtitleFor(screen: Screen) { return screen === "overview" ? "Manage the complete health, grocery, delivery and professional ecosystem." : "Interactive administrator prototype module."; }

const styles: Record<string, React.CSSProperties> = {
  page: { minHeight: "100vh", background: "#111", color: "#fff", fontFamily: "Arial, Helvetica, sans-serif" },
  loginWrap: { maxWidth: 480, margin: "0 auto", padding: "40px 20px" }, appWrap: { maxWidth: 850, margin: "0 auto", padding: "18px 16px 110px" },
  logo: { fontSize: 48, fontWeight: 900, letterSpacing: -3, textAlign: "center", marginTop: 18 }, red: { color: "#C1121F" }, tagline: { textAlign: "center", color: "#B8BCC2", letterSpacing: 2, fontSize: 12, margin: "8px 0 28px" },
  card: { background: "#1b1b1b", border: "1px solid #353535", borderRadius: 20, padding: 20, boxShadow: "0 14px 34px rgba(0,0,0,.3)" }, heading: { fontSize: 27, marginBottom: 6 }, muted: { color: "#B8BCC2", lineHeight: 1.5 },
  label: { display: "block", color: "#B8BCC2", margin: "15px 0 7px", fontSize: 14 }, input: { boxSizing: "border-box", width: "100%", padding: 15, borderRadius: 12, border: "1px solid #4a4a4a", background: "#0b0b0b", color: "#fff", fontSize: 16 },
  primaryButton: { width: "100%", marginTop: 14, padding: 15, border: 0, borderRadius: 12, background: "#C1121F", color: "#fff", fontSize: 16, fontWeight: 800, cursor: "pointer" }, secondaryButton: { width: "100%", marginTop: 12, padding: 14, border: "1px solid #555", borderRadius: 12, background: "transparent", color: "#fff", fontWeight: 700, cursor: "pointer" },
  credentials: { marginTop: 18, background: "#101010", padding: 13, borderRadius: 12, color: "#B8BCC2", lineHeight: 1.6, fontSize: 13 }, error: { marginTop: 12, color: "#ff8c8c" }, adminBadge: { display: "inline-block", background: "#341317", color: "#ffb2b7", border: "1px solid #6d2028", borderRadius: 999, padding: "7px 10px", fontSize: 11, fontWeight: 800, letterSpacing: 1 },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }, logoButton: { color: "#fff", background: "transparent", border: 0, fontWeight: 900, fontSize: 24 }, logout: { background: "transparent", border: "1px solid #555", color: "#fff", borderRadius: 10, padding: "9px 12px" }, welcome: { fontSize: 30, margin: "14px 0 4px" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: 12, marginTop: 20 }, moduleCard: { minHeight: 150, textAlign: "left", padding: 17, borderRadius: 17, border: "1px solid #353535", background: "#1b1b1b", color: "#fff", display: "flex", flexDirection: "column", cursor: "pointer" }, moduleTitle: { fontSize: 18 }, moduleSubtitle: { color: "#B8BCC2", fontSize: 13, lineHeight: 1.4, marginTop: 10 }, openLabel: { marginTop: "auto", color: "#C1121F", fontWeight: 900, fontSize: 12 },
  row: { display: "flex", justifyContent: "space-between", gap: 12, padding: "13px 0", borderBottom: "1px solid #333" }, alert: { color: "#ff9a9a" }, aiMessage: { marginTop: 18, padding: 16, background: "#101010", borderLeft: "4px solid #C1121F", borderRadius: 10, lineHeight: 1.55 }, listButton: { width: "100%", display: "flex", justifyContent: "space-between", padding: "14px 5px", background: "transparent", color: "#fff", border: 0, borderBottom: "1px solid #333", textAlign: "left", fontSize: 15 },
  deliveryCard: { display: "grid", gap: 6, background: "#101010", padding: 15, borderRadius: 13, marginTop: 12, color: "#ddd" }, smallButton: { marginTop: 7, padding: 10, border: 0, borderRadius: 9, background: "#C1121F", color: "#fff", fontWeight: 800 }, notice: { marginTop: 15, padding: 14, borderRadius: 10, background: "#222", borderLeft: "4px solid #C1121F", lineHeight: 1.45 },
  nav: { position: "fixed", left: "50%", transform: "translateX(-50%)", bottom: 0, width: "min(850px, 100%)", display: "grid", gridTemplateColumns: "repeat(5, 1fr)", padding: "9px 6px calc(9px + env(safe-area-inset-bottom))", background: "rgba(10,10,10,.98)", borderTop: "1px solid #333" }, navButton: { background: "transparent", border: 0, color: "#B8BCC2", padding: "11px 1px", fontSize: 11 }, navActive: { background: "#321417", border: 0, borderRadius: 9, color: "#fff", padding: "11px 1px", fontSize: 11, fontWeight: 800 },
};
