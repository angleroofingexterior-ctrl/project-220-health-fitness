import React, { FormEvent, useMemo, useState } from "react";

type Role = "master-admin" | "subscriber" | "shopper" | "driver" | "coach";
type Module = "dashboard" | "fitness" | "nutrition" | "pantry" | "cookbook" | "coach" | "basket" | "marketplace" | "delivery" | "admin" | "privacy";

type TestAccount = { role: Role; email: string; password: string; label: string };

const ACCOUNTS: TestAccount[] = [
  { role: "master-admin", email: "admin@project220.app", password: "Project220Admin!", label: "Master Admin" },
  { role: "subscriber", email: "subscriber@project220.app", password: "Project220User!", label: "Subscriber" },
  { role: "shopper", email: "shopper@project220.app", password: "Project220Shopper!", label: "Shopper" },
  { role: "driver", email: "driver@project220.app", password: "Project220Driver!", label: "Driver" },
  { role: "coach", email: "coach@project220.app", password: "Project220Coach!", label: "Coach" },
];

const roleModules: Record<Role, Module[]> = {
  "master-admin": ["dashboard", "fitness", "nutrition", "pantry", "cookbook", "coach", "basket", "marketplace", "delivery", "admin", "privacy"],
  subscriber: ["dashboard", "fitness", "nutrition", "pantry", "cookbook", "coach", "basket", "marketplace", "privacy"],
  shopper: ["dashboard", "marketplace", "delivery", "privacy"],
  driver: ["dashboard", "delivery", "privacy"],
  coach: ["dashboard", "fitness", "nutrition", "coach", "privacy"],
};

const moduleText: Record<Module, { title: string; summary: string; items: string[] }> = {
  dashboard: { title: "Project 220 Command Centre", summary: "One application shell for every approved Project 220 role and module.", items: ["Role-aware navigation", "Synthetic Alpha test data", "Continuous deployment foundation", "Privacy-first access controls"] },
  fitness: { title: "Fitness & Workout System", summary: "Workout planning, proper-form education, logs and progress flows.", items: ["Personalized workout plan", "Exercise form guidance", "Workout and lifting logs", "Progress milestones and reminders"] },
  nutrition: { title: "Universal Nutrition Planning", summary: "Nutrition plans for all supported life stages and household needs.", items: ["Adult, teen, child, preteen, infant and elderly profiles", "Pregnancy nutrition option", "Allergy and dietary filters", "Supplement quantity tracking"] },
  pantry: { title: "Pantry AI", summary: "Private pantry, refrigerator and freezer workflows in synthetic Alpha mode.", items: ["Photo, receipt and barcode workflow", "Expiration tracking", "Shared household pantry", "User-controlled photo deletion"] },
  cookbook: { title: "Premium Private Cookbook", summary: "Private, in-app recipe generation tailored to nutrition needs.", items: ["30-day meal options", "Kid-friendly recipes", "Healthy yogurt and frozen-yogurt snacks", "Bulk cooking and family sizing"] },
  coach: { title: "AI Wellness Coach", summary: "Tiered general-wellness coaching with privacy and safety notices.", items: ["Supportive to elite coaching tones", "Meal, workout and hydration reminders", "Weekly summaries", "Professional coach marketplace foundation"] },
  basket: { title: "Smart Basket Optimizer", summary: "Connected cost, nutrition, supplement, budget, recipe and waste optimization.", items: ["Cheapest basket simulation", "Nutrition balance checks", "Duplicate supplement prevention", "Waste-reduction recommendations"] },
  marketplace: { title: "Unified Marketplace", summary: "No-charge demonstration of grocery, supplement, restaurant and pharmacy workflows.", items: ["Grocery and supplement cart", "Retailer comparison", "Substitution approval", "Healthy restaurant alternatives"] },
  delivery: { title: "Shopper & Driver Operations", summary: "Simulated fulfilment with mandatory safe-food-handling tasks.", items: ["Item-by-item checklist", "Packing photo evidence placeholders", "Produce sealing and quantity labels", "Cold, frozen, raw and chemical separation"] },
  admin: { title: "Master Admin Operations", summary: "Corporation operations without routine access to private subscriber content.", items: ["Subscriptions and service status", "Retailers, drivers, shoppers and coaches", "Feature flags and analytics", "Synthetic AI testing console"] },
  privacy: { title: "Privacy & Access Controls", summary: "Project 220 collects only the minimum information needed for account and commerce services.", items: ["First and last name", "Account contact and subscription status", "Delivery address when required", "Private health, pantry, photo and coaching data blocked from admins"] },
};

export default function Project220Sprint1Foundation() {
  const [account, setAccount] = useState<TestAccount | null>(null);
  const [email, setEmail] = useState(ACCOUNTS[0].email);
  const [password, setPassword] = useState(ACCOUNTS[0].password);
  const [active, setActive] = useState<Module>("dashboard");
  const [error, setError] = useState("");
  const [events, setEvents] = useState<string[]>([]);

  const modules = useMemo(() => account ? roleModules[account.role] : [], [account]);

  function login(event: FormEvent) {
    event.preventDefault();
    const match = ACCOUNTS.find((candidate) => candidate.email.toLowerCase() === email.trim().toLowerCase() && candidate.password === password);
    if (!match) {
      setError("That Alpha account was not recognized.");
      return;
    }
    setAccount(match);
    setActive("dashboard");
    setError("");
    setEvents([`${new Date().toLocaleTimeString("en-CA")} — ${match.label} signed in to Sprint 1 Alpha.`]);
  }

  function testModule(module: Module) {
    setEvents((current) => [`${new Date().toLocaleTimeString("en-CA")} — Tested ${moduleText[module].title}.`, ...current].slice(0, 20));
  }

  if (!account) {
    return <main style={ui.shell}><section style={ui.loginWrap}>
      <div style={ui.brand}>PROJECT <span style={ui.red}>220</span></div>
      <h1>Sprint 1 Foundation Alpha</h1>
      <p style={ui.muted}>Choose a synthetic testing role, then sign in to test the unified application shell.</p>
      <div style={ui.roleGrid}>{ACCOUNTS.map((candidate) => <button key={candidate.role} onClick={() => { setEmail(candidate.email); setPassword(candidate.password); }} style={email === candidate.email ? ui.activeButton : ui.button}>{candidate.label}</button>)}</div>
      <form onSubmit={login} style={ui.form}>
        <label>Email<input value={email} onChange={(event) => setEmail(event.target.value)} autoCapitalize="none" /></label>
        <label>Password<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} /></label>
        {error && <p style={ui.error}>{error}</p>}
        <button type="submit" style={ui.primary}>Sign in to Project 220</button>
      </form>
      <aside style={ui.privacy}><b>Privacy promise:</b> private health, nutrition, pantry, household, photo, progress and AI coaching content is never exposed to Master Admin in this Alpha.</aside>
    </section></main>;
  }

  const info = moduleText[active];
  return <main style={ui.shell}><section style={ui.app}>
    <header style={ui.header}><div><div style={ui.brand}>PROJECT <span style={ui.red}>220</span></div><small>Sprint 1 · {account.label}</small></div><button style={ui.button} onClick={() => setAccount(null)}>Log out</button></header>
    <aside style={ui.privacy}><b>Access boundary:</b> You are testing as {account.label}. The navigation below only shows modules permitted for this role.</aside>
    <nav style={ui.nav}>{modules.map((module) => <button key={module} onClick={() => setActive(module)} style={active === module ? ui.activeButton : ui.button}>{module}</button>)}</nav>
    <section style={ui.hero}><h1>{info.title}</h1><p>{info.summary}</p><button style={ui.primary} onClick={() => testModule(active)}>Test this module</button></section>
    <div style={ui.grid}>{info.items.map((item) => <article key={item} style={ui.card}><strong>{item}</strong><small>Available in the unified Sprint 1 Alpha shell.</small></article>)}</div>
    <section style={ui.panel}><h2>Role access</h2><p>{modules.length} modules are enabled for {account.label}. Unauthorized modules are removed from navigation rather than merely hidden behind a button.</p></section>
    <section style={ui.panel}><h2>Alpha activity</h2>{events.length ? <ul>{events.map((event, index) => <li key={`${event}-${index}`}>{event}</li>)}</ul> : <p>No module tests recorded yet.</p>}</section>
  </section></main>;
}

const ui: Record<string, React.CSSProperties> = {
  shell: { minHeight: "100vh", background: "#080808", color: "#fff", fontFamily: "Arial, sans-serif" },
  app: { maxWidth: 1180, margin: "auto", padding: "18px 16px 80px" },
  loginWrap: { maxWidth: 620, margin: "auto", padding: "46px 20px", display: "grid", gap: 16 },
  brand: { fontSize: 28, fontWeight: 900, letterSpacing: 1 },
  red: { color: "#ef4444" },
  muted: { color: "#c9c9c9" },
  form: { display: "grid", gap: 14 },
  roleGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(130px,1fr))", gap: 8 },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 },
  privacy: { background: "#17202a", borderLeft: "5px solid #22c55e", borderRadius: 10, padding: 14, margin: "16px 0" },
  nav: { display: "flex", gap: 8, overflowX: "auto", paddingBottom: 14 },
  button: { background: "#242424", color: "white", border: "1px solid #444", borderRadius: 8, padding: "10px 12px" },
  activeButton: { background: "#991b1b", color: "white", border: "1px solid #ef4444", borderRadius: 8, padding: "10px 12px" },
  primary: { background: "#b91c1c", color: "white", border: 0, borderRadius: 8, padding: "12px 16px", fontWeight: 700 },
  hero: { background: "#181818", border: "1px solid #333", borderRadius: 12, padding: 20, marginBottom: 14 },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 12 },
  card: { background: "#151515", border: "1px solid #303030", borderRadius: 10, padding: 16, display: "grid", gap: 8 },
  panel: { background: "#121212", border: "1px solid #2b2b2b", borderRadius: 10, padding: 18, marginTop: 14 },
  error: { color: "#fecaca" },
};
