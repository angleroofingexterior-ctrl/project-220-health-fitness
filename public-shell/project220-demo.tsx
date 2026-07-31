import React, { FormEvent, useEffect, useState } from "react";

const DEMO_EMAIL = "demo@project220.app";
const DEMO_PASSWORD = "Project220!";

type Screen = "home" | "train" | "eat" | "recover" | "grocery" | "delivery" | "professionals" | "profile";

const modules: Array<{ id: Screen; title: string; subtitle: string; value: string }> = [
  { id: "train", title: "Train", subtitle: "Upper-body strength", value: "45 min" },
  { id: "eat", title: "Eat", subtitle: "Whole-food meals planned", value: "3 / 5" },
  { id: "recover", title: "Recover", subtitle: "Readiness score", value: "78%" },
  { id: "grocery", title: "Grocery", subtitle: "Items ready for review", value: "12" },
  { id: "delivery", title: "Delivery", subtitle: "Customer, merchant and driver flow", value: "Ready" },
  { id: "professionals", title: "Professional Care", subtitle: "Trainer and dietitian connections", value: "Connect" },
];

const screenCopy: Record<Screen, { title: string; body: string; actions: string[] }> = {
  home: { title: "Today", body: "Your healthy plan is organized around Build. Eat. Recover. Repeat.", actions: ["Start today's workout", "Review today's meals", "Check recovery"] },
  train: { title: "Training", body: "Detailed workouts include warm-up, proper form, muscles worked, common mistakes, breathing, progressions, regressions and recovery guidance.", actions: ["Open workout", "Exercise library", "Training history"] },
  eat: { title: "Whole-Food Nutrition", body: "Meal plans prioritize clean, natural, minimally processed foods and explain why every meal supports your goals.", actions: ["View meal plan", "Create recipe", "Nutrition targets"] },
  recover: { title: "Recovery", body: "Track sleep, hydration, mobility, stretching, fatigue and recovery readiness.", actions: ["Log water", "Start mobility", "Review sleep"] },
  grocery: { title: "Grocery & Pantry", body: "Meal plans connect to pantry inventory, grocery lists, household quantities and store-ready carts.", actions: ["Review grocery list", "Open pantry", "Build weekly cart"] },
  delivery: { title: "Project 220 Delivery", body: "The system foundation supports customer ordering, merchant fulfillment, driver assignment, tracking and proof of delivery.", actions: ["View delivery flow", "Driver portal", "Merchant portal"] },
  professionals: { title: "Professional Ecosystem", body: "Subscribers can connect qualified trainers, dietitians, nutrition professionals and approved health providers with permission-based plan editing.", actions: ["Find a professional", "Manage permissions", "Messages"] },
  profile: { title: "Profile", body: "Manage your goals, coaching intensity, household, privacy, connected professionals and account settings.", actions: ["Edit goals", "Choose coach", "Privacy controls"] },
};

export default function Project220Demo() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState(DEMO_EMAIL);
  const [password, setPassword] = useState(DEMO_PASSWORD);
  const [error, setError] = useState("");
  const [screen, setScreen] = useState<Screen>("home");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    setLoggedIn(window.localStorage.getItem("project220-demo-session") === "active");
  }, []);

  function login(event: FormEvent) {
    event.preventDefault();
    if (email.trim().toLowerCase() !== DEMO_EMAIL || password !== DEMO_PASSWORD) {
      setError("The demo email or password is incorrect.");
      return;
    }
    window.localStorage.setItem("project220-demo-session", "active");
    setError("");
    setLoggedIn(true);
    setScreen("home");
  }

  function logout() {
    window.localStorage.removeItem("project220-demo-session");
    setLoggedIn(false);
    setPassword(DEMO_PASSWORD);
    setNotice("");
  }

  function action(label: string) {
    setNotice(`${label} is connected in this working prototype. The production data service is the next implementation step.`);
  }

  if (!loggedIn) {
    return (
      <main style={styles.page}>
        <section style={styles.loginWrap}>
          <div style={styles.logo}>PROJECT <span style={styles.red}>220</span></div>
          <div style={styles.tagline}>BUILD. EAT. RECOVER. REPEAT.</div>
          <form onSubmit={login} style={styles.card}>
            <h1 style={styles.heading}>Demo Login</h1>
            <p style={styles.muted}>Use the pre-filled demonstration account.</p>
            <label style={styles.label} htmlFor="email">Email</label>
            <input id="email" value={email} onChange={(e) => setEmail(e.target.value)} inputMode="email" autoCapitalize="none" style={styles.input} />
            <label style={styles.label} htmlFor="password">Password</label>
            <input id="password" value={password} onChange={(e) => setPassword(e.target.value)} type="password" style={styles.input} />
            {error && <div role="alert" style={styles.error}>{error}</div>}
            <button type="submit" style={styles.primaryButton}>Log In</button>
            <button type="button" onClick={() => { setEmail(DEMO_EMAIL); setPassword(DEMO_PASSWORD); setError(""); }} style={styles.secondaryButton}>Reset Demo Login</button>
            <div style={styles.credentials}><strong>Email:</strong> {DEMO_EMAIL}<br/><strong>Password:</strong> {DEMO_PASSWORD}</div>
          </form>
        </section>
      </main>
    );
  }

  const copy = screenCopy[screen];
  return (
    <main style={styles.page}>
      <section style={styles.appWrap}>
        <header style={styles.header}>
          <button onClick={() => setScreen("home")} style={styles.logoButton}>PROJECT <span style={styles.red}>220</span></button>
          <button onClick={logout} style={styles.logout}>Log out</button>
        </header>
        <div style={styles.badge}>Motivational Coach</div>
        <h1 style={styles.welcome}>Welcome back, Marcel</h1>
        <p style={styles.muted}>{copy.title}: {copy.body}</p>

        {screen === "home" ? (
          <div style={styles.grid}>
            {modules.map((module) => (
              <button key={module.id} onClick={() => { setScreen(module.id); setNotice(""); }} style={styles.moduleCard}>
                <span style={styles.moduleTitle}>{module.title}</span>
                <span style={styles.metric}>{module.value}</span>
                <span style={styles.moduleSubtitle}>{module.subtitle}</span>
              </button>
            ))}
          </div>
        ) : (
          <section style={styles.card}>
            <h2 style={styles.heading}>{copy.title}</h2>
            <p style={styles.body}>{copy.body}</p>
            <div style={styles.actionList}>
              {copy.actions.map((item) => <button key={item} onClick={() => action(item)} style={styles.primaryButton}>{item}</button>)}
            </div>
            <button onClick={() => { setScreen("home"); setNotice(""); }} style={styles.secondaryButton}>Back to Dashboard</button>
          </section>
        )}

        {notice && <div role="status" style={styles.notice}>{notice}</div>}
        <nav style={styles.nav} aria-label="Main navigation">
          {(["home", "train", "eat", "recover", "profile"] as Screen[]).map((id) => (
            <button key={id} onClick={() => { setScreen(id); setNotice(""); }} style={screen === id ? styles.navActive : styles.navButton}>{id === "home" ? "Home" : id.charAt(0).toUpperCase() + id.slice(1)}</button>
          ))}
        </nav>
      </section>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: { minHeight: "100vh", background: "#111111", color: "#ffffff", fontFamily: "Arial, Helvetica, sans-serif" },
  loginWrap: { maxWidth: 480, margin: "0 auto", padding: "48px 20px" },
  appWrap: { maxWidth: 720, margin: "0 auto", padding: "20px 18px 110px" },
  logo: { fontSize: 50, fontWeight: 900, letterSpacing: -3, textAlign: "center", marginTop: 20 },
  logoButton: { color: "#fff", background: "transparent", border: 0, fontWeight: 900, fontSize: 25, cursor: "pointer" },
  red: { color: "#C1121F" },
  tagline: { color: "#B8BCC2", textAlign: "center", fontSize: 12, letterSpacing: 2, margin: "8px 0 30px" },
  card: { background: "#1b1b1b", border: "1px solid #343434", borderRadius: 20, padding: 20, boxShadow: "0 14px 34px rgba(0,0,0,.3)" },
  heading: { margin: "0 0 8px", fontSize: 26 },
  muted: { color: "#B8BCC2", lineHeight: 1.5 },
  body: { lineHeight: 1.65, color: "#e7e7e7" },
  label: { display: "block", color: "#B8BCC2", margin: "16px 0 7px", fontSize: 14 },
  input: { boxSizing: "border-box", width: "100%", padding: 15, borderRadius: 12, border: "1px solid #4a4a4a", background: "#0b0b0b", color: "#fff", fontSize: 16 },
  primaryButton: { width: "100%", marginTop: 14, padding: 15, border: 0, borderRadius: 12, background: "#C1121F", color: "#fff", fontSize: 16, fontWeight: 800, cursor: "pointer" },
  secondaryButton: { width: "100%", marginTop: 12, padding: 14, border: "1px solid #555", borderRadius: 12, background: "transparent", color: "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer" },
  credentials: { marginTop: 18, background: "#101010", padding: 13, borderRadius: 12, color: "#B8BCC2", fontSize: 13, lineHeight: 1.6 },
  error: { marginTop: 12, color: "#ff8c8c", background: "#351317", padding: 10, borderRadius: 10 },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 },
  logout: { background: "transparent", border: "1px solid #555", color: "#fff", borderRadius: 10, padding: "9px 12px", cursor: "pointer" },
  badge: { display: "inline-block", background: "#292929", color: "#B8BCC2", borderRadius: 999, padding: "7px 10px", fontSize: 12 },
  welcome: { fontSize: 30, margin: "15px 0 4px" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(145px, 1fr))", gap: 12, marginTop: 20 },
  moduleCard: { minHeight: 145, textAlign: "left", padding: 17, borderRadius: 17, border: "1px solid #353535", background: "#1b1b1b", color: "#fff", cursor: "pointer", display: "flex", flexDirection: "column" },
  moduleTitle: { fontWeight: 800, fontSize: 17 },
  metric: { color: "#C1121F", fontSize: 27, fontWeight: 900, margin: "14px 0 7px" },
  moduleSubtitle: { color: "#B8BCC2", fontSize: 13, lineHeight: 1.35 },
  actionList: { marginTop: 18 },
  notice: { marginTop: 16, background: "#222", borderLeft: "4px solid #C1121F", padding: 14, borderRadius: 10, color: "#ddd", lineHeight: 1.45 },
  nav: { position: "fixed", left: "50%", transform: "translateX(-50%)", bottom: 0, width: "min(720px, 100%)", display: "grid", gridTemplateColumns: "repeat(5, 1fr)", padding: "10px 8px calc(10px + env(safe-area-inset-bottom))", background: "rgba(10,10,10,.97)", borderTop: "1px solid #333", zIndex: 20 },
  navButton: { background: "transparent", border: 0, color: "#B8BCC2", padding: "11px 2px", fontSize: 12, cursor: "pointer" },
  navActive: { background: "#2a1517", border: 0, borderRadius: 10, color: "#fff", padding: "11px 2px", fontSize: 12, fontWeight: 800, cursor: "pointer" },
};
