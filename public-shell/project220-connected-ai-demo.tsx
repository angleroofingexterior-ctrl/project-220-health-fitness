import React, { FormEvent, useMemo, useState } from "react";

type Stage = "idle" | "running" | "complete";
type DemoState = {
  pantry: string[];
  expiring: string[];
  recipes: string[];
  cart: Array<{ item: string; store: string; price: number }>;
  coach: string;
  score: number;
  orderStatus: string;
  driverChecks: string[];
  events: string[];
};

const ADMIN_EMAIL = "admin@project220.app";
const ADMIN_PASSWORD = "Project220Admin!";
const KEY = "project220-connected-ai-demo-v1";
const initial: DemoState = {
  pantry: ["Chicken breast", "Plain yogurt", "Frozen berries", "Brown rice", "Eggs", "Creatine monohydrate"],
  expiring: ["Chicken breast", "Plain yogurt"],
  recipes: [],
  cart: [],
  coach: "",
  score: 78,
  orderStatus: "Not created",
  driverChecks: [],
  events: [],
};

function loadState(): DemoState {
  try { return { ...initial, ...JSON.parse(localStorage.getItem(KEY) || "{}") }; } catch { return initial; }
}

function money(value: number) {
  return new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD" }).format(value);
}

export default function Project220ConnectedAiDemo() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState(ADMIN_EMAIL);
  const [password, setPassword] = useState(ADMIN_PASSWORD);
  const [error, setError] = useState("");
  const [stage, setStage] = useState<Stage>("idle");
  const [state, setState] = useState<DemoState>(loadState);

  const total = useMemo(() => state.cart.reduce((sum, row) => sum + row.price, 0), [state.cart]);

  function save(next: DemoState) {
    setState(next);
    localStorage.setItem(KEY, JSON.stringify(next));
  }

  function login(event: FormEvent) {
    event.preventDefault();
    if (email.trim().toLowerCase() !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      setError("Incorrect Master Admin login.");
      return;
    }
    setLoggedIn(true);
    setError("");
  }

  async function runEcosystem() {
    setStage("running");
    const now = new Date().toLocaleTimeString("en-CA", { hour: "numeric", minute: "2-digit", second: "2-digit" });
    await new Promise((resolve) => setTimeout(resolve, 700));
    const recipes = [
      "Chicken and brown-rice power bowls",
      "Berry yogurt breakfast cups",
      "Frozen-yogurt berry bites",
      "Egg and vegetable breakfast wraps",
      "Kid-friendly banana oat yogurt cups",
    ];
    const cart = [
      { item: "Spinach", store: "FreshCo", price: 3.99 },
      { item: "Milk", store: "No Frills", price: 6.49 },
      { item: "Bananas", store: "Walmart", price: 2.68 },
      { item: "Whey protein", store: "Popeye's Supplements", price: 69.99 },
    ];
    const events = [
      `${now} — Pantry AI confirmed 6 items from barcode, receipt and photo demo inputs.`,
      `${now} — Expiration AI prioritized chicken breast and plain yogurt.`,
      `${now} — Recipe AI generated 5 private recipes, including kid-friendly and frozen-yogurt options.`,
      `${now} — Smart Basket Optimizer compared launch retailers and reduced the sample basket by $18.40.`,
      `${now} — Nutrition AI improved the basket balance and avoided duplicate creatine.`,
      `${now} — AI Coach prepared a private wellness reminder using the meal and pantry plan.`,
      `${now} — Marketplace AI created a unified grocery and supplement order in simulation mode.`,
      `${now} — Driver AI generated the safe-food-handling checklist and photo evidence tasks.`,
    ];
    save({
      ...state,
      recipes,
      cart,
      coach: "Use the chicken and yogurt first, complete today’s planned meal and hydration target, then record your workout. This is general wellness guidance, not medical care.",
      score: 91,
      orderStatus: "Simulated order ready for shopper assignment",
      driverChecks: [
        "Clean hands and correct glove use confirmed",
        "Raw food separated from produce and ready-to-eat food",
        "Produce bagged, sealed and quantity labelled",
        "Cold and frozen products placed in insulated storage",
        "Receipt, packing and cargo-area photos captured",
      ],
      events: [...events, ...state.events].slice(0, 30),
    });
    setStage("complete");
  }

  if (!loggedIn) {
    return <main style={ui.shell}><form onSubmit={login} style={ui.login}>
      <h1>PROJECT <span style={ui.red}>220</span></h1>
      <h2>Connected AI Ecosystem Demo</h2>
      <p>Master Admin testing account. All results use synthetic or corporation-owned demonstration data.</p>
      <label>Email<input value={email} onChange={(e) => setEmail(e.target.value)} autoCapitalize="none" /></label>
      <label>Password<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></label>
      {error && <p style={ui.error}>{error}</p>}
      <button type="submit">Open Master Admin</button>
      <small>Email: {ADMIN_EMAIL}<br />Password: {ADMIN_PASSWORD}</small>
    </form></main>;
  }

  return <main style={ui.shell}><section style={ui.app}>
    <header style={ui.header}><div><b>PROJECT <span style={ui.red}>220</span></b><small> CONNECTED AI DEMO</small></div><button onClick={() => setLoggedIn(false)}>Log out</button></header>
    <aside style={ui.privacy}><b>Subscriber privacy:</b> Master Admin can operate and test every service but cannot open subscriber pantry photos, progress photos, health data, plans or private AI conversations.</aside>

    <section style={ui.hero}>
      <h1>Project 220 AI Operating System</h1>
      <p>Run the entire AI ecosystem from pantry analysis through recipes, coaching, basket optimization, marketplace simulation and driver safety.</p>
      <button disabled={stage === "running"} onClick={runEcosystem}>{stage === "running" ? "Connecting ecosystem…" : "Run Full AI Ecosystem"}</button>
      <button onClick={() => { localStorage.removeItem(KEY); setState(initial); setStage("idle"); }}>Reset demo</button>
    </section>

    <div style={ui.grid}>
      <Card title="Pantry AI" value={`${state.pantry.length} items`} text={`Use first: ${state.expiring.join(", ")}`} />
      <Card title="Smart Pantry Score" value={`${state.score}/100`} text="Freshness, balance, readiness, budget and waste" />
      <Card title="Recipe & Cookbook AI" value={`${state.recipes.length} recipes`} text="Private, view-only, family and kid-friendly" />
      <Card title="Smart Basket" value={money(total)} text={`${state.cart.length} items across grocery and supplement stores`} />
      <Card title="AI Coach" value={state.coach ? "Ready" : "Waiting"} text="Private general wellness coaching" />
      <Card title="Marketplace AI" value={state.orderStatus} text="Payments and retailer purchases remain simulated" />
    </div>

    <section style={ui.panel}><h2>Pantry, Receipt & Barcode AI</h2><p>{state.pantry.join(" · ")}</p><p><b>Expiring first:</b> {state.expiring.join(", ")}</p></section>
    <section style={ui.panel}><h2>Private Premium Cookbook</h2>{state.recipes.length ? <ul>{state.recipes.map((recipe) => <li key={recipe}>{recipe}</li>)}</ul> : <p>Run the ecosystem to generate recipes.</p>}</section>
    <section style={ui.panel}><h2>AI Shopping Assistant & Basket Optimizer</h2>{state.cart.length ? <ul>{state.cart.map((row) => <li key={row.item}>{row.item} — {row.store} — {money(row.price)}</li>)}</ul> : <p>Run the ecosystem to build the optimized cart.</p>}<p><b>Demo savings:</b> $18.40 · <b>Substitutions:</b> approval required</p></section>
    <section style={ui.panel}><h2>AI Wellness Coach</h2><p>{state.coach || "Run the ecosystem to generate private coaching guidance."}</p><small>Emergency and medical disclaimer: Project 220 provides general wellness education only and does not replace medical care.</small></section>
    <section style={ui.panel}><h2>Shopper & Driver Safety AI</h2>{state.driverChecks.length ? <ul>{state.driverChecks.map((check) => <li key={check}>✓ {check}</li>)}</ul> : <p>Run the ecosystem to generate mandatory safety tasks.</p>}</section>
    <section style={ui.panel}><h2>Master Admin Activity</h2>{state.events.length ? <ul>{state.events.map((event, index) => <li key={`${event}-${index}`}>{event}</li>)}</ul> : <p>No ecosystem run yet.</p>}</section>
  </section></main>;
}

function Card({ title, value, text }: { title: string; value: string; text: string }) {
  return <article style={ui.card}><b>{title}</b><strong>{value}</strong><small>{text}</small></article>;
}

const ui: Record<string, React.CSSProperties> = {
  shell: { minHeight: "100vh", background: "#090909", color: "white", fontFamily: "Arial, sans-serif" },
  app: { maxWidth: 1120, margin: "auto", padding: "18px 16px 80px" },
  login: { maxWidth: 440, margin: "auto", padding: "42px 20px", display: "grid", gap: 14 },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 22 },
  red: { color: "#ef4444" },
  privacy: { margin: "16px 0", padding: 14, borderRadius: 10, background: "#17202a", borderLeft: "5px solid #22c55e" },
  hero: { padding: 20, borderRadius: 12, background: "#1a1a1a", marginBottom: 16 },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: 12 },
  card: { display: "grid", gap: 9, padding: 16, borderRadius: 10, background: "#171717", border: "1px solid #333" },
  panel: { marginTop: 14, padding: 18, borderRadius: 10, background: "#151515", border: "1px solid #2f2f2f" },
  error: { color: "#fecaca" },
};
