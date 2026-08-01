import React, { FormEvent, useMemo, useState } from "react";

type OrderStatus = "Cart" | "Awaiting substitution approval" | "Ready for shopper" | "Shopping" | "Packed" | "Out for delivery" | "Delivered";
type CartItem = { id: string; name: string; category: "Grocery" | "Supplement" | "Pharmacy" | "Restaurant"; store: string; price: number; substitute?: string; substitutionApproved?: boolean };
type SafetyTask = { id: string; label: string; done: boolean; photoRequired?: boolean; photoAdded?: boolean };

const ADMIN_EMAIL = "admin@project220.app";
const ADMIN_PASSWORD = "Project220Admin!";
const KEY = "project220-sprint3-marketplace";

const seedItems: CartItem[] = [
  { id: "1", name: "Chicken breast", category: "Grocery", store: "No Frills", price: 18.49, substitute: "Turkey breast", substitutionApproved: false },
  { id: "2", name: "Plain Greek yogurt", category: "Grocery", store: "Walmart", price: 7.97 },
  { id: "3", name: "Frozen mixed berries", category: "Grocery", store: "FreshCo", price: 12.99 },
  { id: "4", name: "Clean mass protein powder", category: "Supplement", store: "Popeye's Supplements", price: 69.99 },
  { id: "5", name: "Prescription pickup — sealed package", category: "Pharmacy", store: "Shoppers Drug Mart", price: 0 },
  { id: "6", name: "Grilled chicken power bowl", category: "Restaurant", store: "Healthy restaurant alternative", price: 15.95 },
];

const seedTasks: SafetyTask[] = [
  { id: "t1", label: "Clean hands and work area confirmed", done: false },
  { id: "t2", label: "Correct glove use confirmed", done: false, photoRequired: true, photoAdded: false },
  { id: "t3", label: "Raw food separated from produce and ready-to-eat food", done: false },
  { id: "t4", label: "Produce bagged, zip-tied and quantity/weight labelled", done: false, photoRequired: true, photoAdded: false },
  { id: "t5", label: "Cold and frozen items placed in insulated storage", done: false, photoRequired: true, photoAdded: false },
  { id: "t6", label: "Household chemicals separated from food", done: false },
  { id: "t7", label: "Receipt and packing evidence captured", done: false, photoRequired: true, photoAdded: false },
  { id: "t8", label: "Pharmacy package remains sealed and identity check required", done: false },
  { id: "t9", label: "Vehicle cargo area is clean", done: false, photoRequired: true, photoAdded: false },
];

export default function Project220Sprint3Marketplace() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState(ADMIN_EMAIL);
  const [password, setPassword] = useState(ADMIN_PASSWORD);
  const [error, setError] = useState("");
  const [items, setItems] = useState<CartItem[]>(() => load("items", seedItems));
  const [tasks, setTasks] = useState<SafetyTask[]>(() => load("tasks", seedTasks));
  const [status, setStatus] = useState<OrderStatus>(() => load("status", "Cart"));
  const [events, setEvents] = useState<string[]>(() => load("events", []));
  const [view, setView] = useState<"customer" | "shopper" | "driver" | "admin">("customer");

  const total = useMemo(() => items.reduce((sum, item) => sum + item.price, 0), [items]);
  const pendingSubstitutions = items.filter((item) => item.substitute && !item.substitutionApproved);
  const safetyComplete = tasks.every((task) => task.done && (!task.photoRequired || task.photoAdded));

  function persist<T>(name: string, value: T) {
    localStorage.setItem(`${KEY}-${name}`, JSON.stringify(value));
  }
  function record(message: string) {
    const next = [`${new Date().toLocaleTimeString("en-CA")} — ${message}`, ...events].slice(0, 30);
    setEvents(next); persist("events", next);
  }
  function login(event: FormEvent) {
    event.preventDefault();
    if (email.trim().toLowerCase() !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      setError("Incorrect Master Admin login."); return;
    }
    setLoggedIn(true); setError(""); record("Master Admin opened Sprint 3 marketplace demo.");
  }
  function updateItems(next: CartItem[]) { setItems(next); persist("items", next); }
  function updateTasks(next: SafetyTask[]) { setTasks(next); persist("tasks", next); }
  function updateStatus(next: OrderStatus) { setStatus(next); persist("status", next); record(`Order moved to ${next}.`); }
  function approveAll() {
    updateItems(items.map((item) => item.substitute ? { ...item, substitutionApproved: true } : item));
    record("Customer approved all proposed substitutions.");
  }
  function advance() {
    if (status === "Cart") return updateStatus(pendingSubstitutions.length ? "Awaiting substitution approval" : "Ready for shopper");
    if (status === "Awaiting substitution approval") {
      if (pendingSubstitutions.length) return record("Cannot continue: customer substitution approval is required.");
      return updateStatus("Ready for shopper");
    }
    if (status === "Ready for shopper") return updateStatus("Shopping");
    if (status === "Shopping") {
      if (!safetyComplete) return record("Packing blocked until all food-safety tasks and required photos are complete.");
      return updateStatus("Packed");
    }
    if (status === "Packed") return updateStatus("Out for delivery");
    if (status === "Out for delivery") return updateStatus("Delivered");
  }

  if (!loggedIn) return <main style={ui.shell}><form onSubmit={login} style={ui.login}>
    <h1>PROJECT <span style={ui.red}>220</span></h1><h2>Sprint 3 Marketplace & Delivery Alpha</h2>
    <p>Master Admin demo using synthetic orders. No payment, purchase or medication handling occurs.</p>
    <label>Email<input value={email} onChange={(e) => setEmail(e.target.value)} /></label>
    <label>Password<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></label>
    {error && <p style={ui.error}>{error}</p>}<button style={ui.primary}>Open Sprint 3 Alpha</button>
  </form></main>;

  return <main style={ui.shell}><section style={ui.app}>
    <header style={ui.header}><div><b>PROJECT <span style={ui.red}>220</span></b><small> Sprint 3 · Marketplace & Delivery</small></div><button style={ui.button} onClick={() => setLoggedIn(false)}>Log out</button></header>
    <aside style={ui.notice}><b>Demo boundary:</b> Payments, retailer purchases, restaurant ordering and pharmacy pickup are simulated. Prescription packages remain sealed and pharmacy-controlled.</aside>
    <nav style={ui.nav}>{(["customer","shopper","driver","admin"] as const).map((tab) => <button key={tab} style={view===tab?ui.active:ui.button} onClick={() => setView(tab)}>{tab}</button>)}</nav>

    {view === "customer" && <section>
      <h1>Unified Shopping Cart</h1><p>Grocery, supplements, healthy restaurant alternatives and simulated pharmacy pickup.</p>
      <ul style={ui.list}>{items.map((item) => <li key={item.id} style={ui.row}><span><b>{item.name}</b><small>{item.category} · {item.store} · {money(item.price)}</small>{item.substitute && <small>Proposed substitute: {item.substitute} — {item.substitutionApproved ? "approved" : "approval required"}</small>}</span></li>)}</ul>
      <div style={ui.grid}><Card title="Cart total" value={money(total)} text="No live charge"/><Card title="Order status" value={status} text="Customer-controlled substitutions"/><Card title="Retailer mode" value="Balanced" text="Cheapest basket + delivery speed"/></div>
      {pendingSubstitutions.length > 0 && <button style={ui.primary} onClick={approveAll}>Approve substitutions</button>}
      <button style={ui.primary} onClick={advance}>Continue order</button>
    </section>}

    {view === "shopper" && <section><h1>Shopper Portal</h1><p>Item-by-item fulfilment and customer substitution communication.</p>
      <ul style={ui.list}>{items.map((item) => <li key={item.id} style={ui.row}><span><b>{item.name}</b><small>{item.store}</small></span><button style={ui.button} onClick={() => record(`${item.name} marked found by shopper.`)}>Mark found</button></li>)}</ul>
      <button style={ui.primary} onClick={() => record("Customer message opened for an unavailable-item substitution request.")}>Message customer</button>
      <button style={ui.primary} onClick={advance}>Advance shopper workflow</button></section>}

    {view === "driver" && <section><h1>Driver Food-Safety Dashboard</h1><p>Order completion is blocked until mandatory checks and required evidence are recorded.</p>
      <ul style={ui.list}>{tasks.map((task) => <li key={task.id} style={ui.row}><span><b>{task.label}</b><small>{task.photoRequired ? `Photo ${task.photoAdded ? "added" : "required"}` : "Confirmation required"}</small></span><div><button style={task.done?ui.active:ui.button} onClick={() => updateTasks(tasks.map((x) => x.id===task.id?{...x,done:!x.done}:x))}>{task.done?"Checked":"Check"}</button>{task.photoRequired && <button style={task.photoAdded?ui.active:ui.button} onClick={() => updateTasks(tasks.map((x) => x.id===task.id?{...x,photoAdded:true}:x))}>Add demo photo</button>}</div></li>)}</ul>
      <p><b>Safety status:</b> {safetyComplete ? "Complete" : "Incomplete — packing/delivery blocked"}</p><button style={ui.primary} onClick={advance}>Advance delivery workflow</button></section>}

    {view === "admin" && <section><h1>Master Admin Operations</h1><div style={ui.grid}><Card title="Order" value={status} text="Synthetic test order"/><Card title="Substitutions" value={String(pendingSubstitutions.length)} text="Pending customer approvals"/><Card title="Safety" value={safetyComplete?"Verified":"Blocked"} text="Evidence-controlled workflow"/><Card title="Payments" value="Disabled" text="No real transaction"/><Card title="Pharmacy" value="Simulation only" text="Sealed package and identity check"/><Card title="Private data" value="Protected" text="Admin sees operations only"/></div><section style={ui.panel}><h2>Activity log</h2>{events.length?<ul>{events.map((event,index)=><li key={`${event}-${index}`}>{event}</li>)}</ul>:<p>No events yet.</p>}</section><button style={ui.button} onClick={() => { localStorage.clear(); setItems(seedItems); setTasks(seedTasks); setStatus("Cart"); setEvents([]); }}>Reset Sprint 3 demo</button></section>}
  </section></main>;
}

function load<T>(name: string, fallback: T): T { try { const raw = localStorage.getItem(`${KEY}-${name}`); return raw ? JSON.parse(raw) : fallback; } catch { return fallback; } }
function money(value: number) { return new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD" }).format(value); }
function Card({title,value,text}:{title:string;value:string;text:string}) { return <article style={ui.card}><b>{title}</b><strong>{value}</strong><small>{text}</small></article>; }
const ui: Record<string, React.CSSProperties> = { shell:{minHeight:"100vh",background:"#080808",color:"white",fontFamily:"Arial,sans-serif"}, app:{maxWidth:1120,margin:"auto",padding:"18px 16px 80px"}, login:{maxWidth:460,margin:"auto",padding:"46px 20px",display:"grid",gap:14}, header:{display:"flex",justifyContent:"space-between",alignItems:"center",fontSize:22}, red:{color:"#ef4444"}, notice:{background:"#17202a",borderLeft:"5px solid #22c55e",padding:14,borderRadius:9,margin:"16px 0"}, nav:{display:"flex",gap:8,overflowX:"auto",marginBottom:16}, button:{background:"#242424",color:"white",border:"1px solid #444",borderRadius:8,padding:"10px 12px",margin:3}, active:{background:"#991b1b",color:"white",border:"1px solid #ef4444",borderRadius:8,padding:"10px 12px",margin:3}, primary:{background:"#b91c1c",color:"white",border:0,borderRadius:8,padding:"12px 16px",fontWeight:700,margin:"8px 8px 8px 0"}, error:{color:"#fecaca"}, list:{listStyle:"none",padding:0,display:"grid",gap:8}, row:{display:"flex",justifyContent:"space-between",gap:12,alignItems:"center",background:"#151515",border:"1px solid #303030",borderRadius:9,padding:14}, grid:{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:10,margin:"14px 0"}, card:{display:"grid",gap:8,background:"#151515",border:"1px solid #303030",borderRadius:9,padding:15}, panel:{marginTop:14,background:"#121212",border:"1px solid #2b2b2b",borderRadius:9,padding:16} };