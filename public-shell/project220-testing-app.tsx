import React, { FormEvent, useMemo, useState } from "react";

type Role = "admin" | "subscriber" | "professional" | "merchant" | "driver";
type ModuleId = "home" | "coach" | "training" | "nutrition" | "pantry" | "grocery" | "delivery" | "professionals" | "family" | "community" | "operations" | "profile";

type AppState = {
  pantry: Array<{name:string; qty:number; unit:string; expires:string}>;
  grocery: Array<{name:string; qty:number; checked:boolean}>;
  orders: Array<{id:string; status:string; driver?:string}>;
  coachTone: "Supportive" | "Motivational" | "Performance" | "Elite";
  subscribers: number;
};

const ADMIN_EMAIL = "admin@project220.app";
const ADMIN_PASSWORD = "Project220Admin!";
const STORAGE_KEY = "project220-testing-state-v1";

const initialState: AppState = {
  pantry: [
    {name:"Chicken breast", qty:1.5, unit:"kg", expires:"2 days"},
    {name:"Plain yogurt", qty:2, unit:"tubs", expires:"4 days"},
    {name:"Brown rice", qty:1.8, unit:"kg", expires:"Long life"},
    {name:"Frozen berries", qty:1, unit:"bag", expires:"Frozen"},
    {name:"Eggs", qty:18, unit:"eggs", expires:"9 days"},
  ],
  grocery: [
    {name:"Milk", qty:4, checked:false},
    {name:"Chicken breast", qty:3, checked:false},
    {name:"Potatoes", qty:5, checked:false},
    {name:"Eggs", qty:24, checked:false},
    {name:"Mixed berries", qty:2, checked:false},
  ],
  orders: [{id:"P220-1034", status:"Ready for driver"}],
  coachTone:"Motivational",
  subscribers:1248,
};

const nav: Array<{id:ModuleId; label:string}> = [
  {id:"home",label:"Home"},{id:"coach",label:"AI Coach"},{id:"training",label:"Training"},{id:"nutrition",label:"Nutrition"},{id:"pantry",label:"Pantry AI"},{id:"grocery",label:"Grocery"},{id:"delivery",label:"Delivery"},{id:"professionals",label:"Professionals"},{id:"family",label:"Family"},{id:"community",label:"Community"},{id:"operations",label:"Admin"},{id:"profile",label:"Profile"},
];

function loadState():AppState {
  try { const raw = localStorage.getItem(STORAGE_KEY); return raw ? {...initialState,...JSON.parse(raw)} : initialState; } catch { return initialState; }
}

export default function Project220TestingApp(){
  const [loggedIn,setLoggedIn]=useState(false);
  const [email,setEmail]=useState(ADMIN_EMAIL);
  const [password,setPassword]=useState(ADMIN_PASSWORD);
  const [error,setError]=useState("");
  const [role,setRole]=useState<Role>("admin");
  const [screen,setScreen]=useState<ModuleId>("home");
  const [state,setState]=useState<AppState>(loadState);
  const [notice,setNotice]=useState("");

  function persist(next:AppState){ setState(next); localStorage.setItem(STORAGE_KEY,JSON.stringify(next)); }
  function login(e:FormEvent){ e.preventDefault(); if(email.trim().toLowerCase()!==ADMIN_EMAIL || password!==ADMIN_PASSWORD){setError("Incorrect administrator email or password.");return;} setLoggedIn(true);setError("");setScreen("home"); }
  function action(message:string){ setNotice(message); window.setTimeout(()=>setNotice(""),3500); }

  if(!loggedIn) return <main style={s.page}><section style={s.login}><div style={s.logo}>PROJECT <span style={s.red}>220</span></div><div style={s.tag}>BUILD. EAT. RECOVER. REPEAT.</div><form onSubmit={login} style={s.card}><h1 style={s.h1}>Administrator Sign In</h1><p style={s.muted}>Use your Project 220 testing account to explore the complete demo.</p><label style={s.label}>Email</label><input style={s.input} value={email} onChange={e=>setEmail(e.target.value)} autoCapitalize="none"/><label style={s.label}>Password</label><input style={s.input} value={password} onChange={e=>setPassword(e.target.value)} type="password"/>{error&&<div style={s.error}>{error}</div>}<button style={s.primary} type="submit">Sign In as Administrator</button><button style={s.secondary} type="button" onClick={()=>{setEmail(ADMIN_EMAIL);setPassword(ADMIN_PASSWORD);setError("")}}>Reset Login</button><div style={s.credentials}><b>Email:</b> {ADMIN_EMAIL}<br/><b>Password:</b> {ADMIN_PASSWORD}</div></form></section></main>;

  const content = renderModule(screen,state,persist,action);
  return <main style={s.page}><section style={s.app}>
    <header style={s.header}><div><div style={s.brand}>PROJECT <span style={s.red}>220</span></div><span style={s.badge}>ADMIN TESTING RELEASE</span></div><button style={s.secondarySmall} onClick={()=>setLoggedIn(false)}>Log out</button></header>
    <div style={s.rolebar}><span>Viewing as:</span>{(["admin","subscriber","professional","merchant","driver"] as Role[]).map(r=><button key={r} onClick={()=>setRole(r)} style={role===r?s.roleActive:s.roleButton}>{r}</button>)}</div>
    <nav style={s.nav}>{nav.map(n=><button key={n.id} onClick={()=>{setScreen(n.id);setNotice("")}} style={screen===n.id?s.navActive:s.navBtn}>{n.label}</button>)}</nav>
    {notice&&<div style={s.notice}>{notice}</div>}
    <section>{content}</section>
  </section></main>;
}

function renderModule(id:ModuleId,state:AppState,persist:(s:AppState)=>void,action:(m:string)=>void){
  const Tile=({title,value,body,onClick}:{title:string;value:string;body:string;onClick?:()=>void})=><button onClick={onClick} style={s.tile}><b>{title}</b><strong style={s.metric}>{value}</strong><span style={s.mutedSmall}>{body}</span></button>;
  const Section=({title,body,children}:{title:string;body:string;children:React.ReactNode})=><div><h1 style={s.h1}>{title}</h1><p style={s.muted}>{body}</p>{children}</div>;
  if(id==="home") return <Section title="Project 220 Health Operating System" body="Test every major workflow from one administrator account."><div style={s.grid}>
    <Tile title="AI Coach" value={state.coachTone} body="Tone, reminders and daily accountability"/>
    <Tile title="Training" value="12 paths" body="Strength, endurance, adaptive and life-stage programs"/>
    <Tile title="Nutrition" value="Whole-food" body="Meal plans, recipes and education"/>
    <Tile title="Pantry AI" value={String(state.pantry.length)} body="Tracked household items"/>
    <Tile title="Grocery" value={String(state.grocery.filter(x=>!x.checked).length)} body="Items remaining"/>
    <Tile title="Delivery" value={String(state.orders.length)} body="Active demo orders"/>
    <Tile title="Professionals" value="4" body="Trainer, dietitian and provider workflows"/>
    <Tile title="Subscribers" value={String(state.subscribers)} body="Admin-managed demo accounts"/>
  </div></Section>;
  if(id==="coach") return <Section title="AI Coach Control Centre" body="Choose the coaching intensity and generate a message."><div style={s.actions}>{["Supportive","Motivational","Performance","Elite"].map(t=><button style={state.coachTone===t?s.primarySmall:s.secondarySmall} key={t} onClick={()=>persist({...state,coachTone:t as AppState["coachTone"]})}>{t}</button>)}</div><div style={s.card}><h3>{state.coachTone} Coach</h3><p style={s.body}>{coachMessage(state.coachTone)}</p><button style={s.primary} onClick={()=>action("A new coach reminder was generated and added to the demo activity log.")}>Generate Daily Coach Message</button></div></Section>;
  if(id==="training") return <Section title="Training Engine" body="Every path includes detailed form, warm-up, recovery and progression guidance."><div style={s.grid}>{["Bodybuilding","Powerlifting","Running","Cycling","Hiking","Functional Fitness","Youth Fitness","Healthy Aging","Prenatal/Postpartum","Adaptive Fitness","Sport-Specific","General Health"].map(x=><Tile key={x} title={x} value="Ready" body="Open demo program" onClick={()=>action(`${x} demo program generated with proper-form instructions.`)}/>)}</div></Section>;
  if(id==="nutrition") return <Section title="Whole-Food Nutrition Engine" body="Clean, natural, minimally processed foods are integrated across every recommendation."><div style={s.list}>{["Breakfast: oats, berries and plain yogurt","Lunch: chicken, brown rice and vegetables","Dinner: salmon, potatoes and greens","Snack: fruit, nuts and water"].map(x=><div style={s.row} key={x}>{x}<span style={s.status}>Project 220 Approved</span></div>)}</div><button style={s.primary} onClick={()=>action("A seven-day whole-food meal plan was generated from the user profile and pantry.")}>Generate 7-Day Meal Plan</button></Section>;
  if(id==="pantry") return <Section title="Pantry AI" body="Inventory changes persist on this device for testing."><div style={s.list}>{state.pantry.map((p,i)=><div style={s.row} key={p.name}><span><b>{p.name}</b><br/><small>{p.qty} {p.unit} · expires {p.expires}</small></span><button style={s.secondarySmall} onClick={()=>persist({...state,pantry:state.pantry.filter((_,n)=>n!==i)})}>Use item</button></div>)}</div><div style={s.actions}><button style={s.primarySmall} onClick={()=>persist({...state,pantry:[...state.pantry,{name:"Spinach",qty:1,unit:"bag",expires:"3 days"}]})}>Scan Demo Barcode</button><button style={s.primarySmall} onClick={()=>action("Pantry AI found chicken and yogurt that should be used first.")}>Find Expiring Foods</button></div></Section>;
  if(id==="grocery") return <Section title="Grocery Shopping" body="Build and edit the cart, then send it into the delivery workflow."><div style={s.list}>{state.grocery.map((g,i)=><label style={s.row} key={g.name}><span><input type="checkbox" checked={g.checked} onChange={()=>persist({...state,grocery:state.grocery.map((x,n)=>n===i?{...x,checked:!x.checked}:x)})}/> <b>{g.name}</b> · {g.qty}</span><span style={s.status}>{g.checked?"In cart":"Needed"}</span></label>)}</div><div style={s.actions}><button style={s.primarySmall} onClick={()=>persist({...state,grocery:state.grocery.map(x=>({...x,checked:true}))})}>Build Optimized Cart</button><button style={s.primarySmall} onClick={()=>{const id=`P220-${1035+state.orders.length}`;persist({...state,orders:[...state.orders,{id,status:"Merchant preparing"}]});action(`Demo order ${id} created.`)}}>Place Demo Order</button></div></Section>;
  if(id==="delivery") return <Section title="Project 220 Delivery" body="Test customer ordering, merchant preparation, driver assignment and completion."><div style={s.list}>{state.orders.map((o,i)=><div style={s.row} key={o.id}><span><b>{o.id}</b><br/><small>{o.status}{o.driver?` · ${o.driver}`:""}</small></span><button style={s.primarySmall} onClick={()=>{const next=state.orders.map((x,n)=>n===i?advanceOrder(x):x);persist({...state,orders:next})}>Advance</button></div>)}</div><button style={s.primary} onClick={()=>action("Dispatch dashboard refreshed. Twelve demo drivers are online.")}>Refresh Driver Dispatch</button></Section>;
  if(id==="professionals") return <Section title="Professional Ecosystem" body="Subscribers control which professionals can view or modify each part of their plan."><div style={s.list}>{["Registered Dietitian — nutrition edit access","Personal Trainer — training edit access","Physiotherapist — movement restrictions","Family Doctor — read-only summary"].map(x=><div style={s.row} key={x}>{x}<button style={s.secondarySmall} onClick={()=>action("Professional permission updated and recorded in the audit log.")}>Permissions</button></div>)}</div><button style={s.primary} onClick={()=>action("Secure demo message sent to the connected care team.")}>Send Secure Team Message</button></Section>;
  if(id==="family") return <Section title="Family Health Hub" body="Manage adults, youth, children, household meals, pantry and grocery delivery."><div style={s.grid}>{["Household Admin","Adult Member","Teen Member","Child Account","Shared Pantry","Family Meal Plan"].map(x=><Tile key={x} title={x} value="Active" body="Open demo controls" onClick={()=>action(`${x} controls opened.`)}/>)}</div></Section>;
  if(id==="community") return <Section title="Community & Challenges" body="Privacy-controlled accountability without turning Project 220 into ordinary social media."><div style={s.list}>{["30-Day Whole-Food Challenge","Family Walking Challenge","Beginner Strength Group","Adaptive Fitness Community"].map(x=><div style={s.row} key={x}>{x}<button style={s.primarySmall} onClick={()=>action(`Joined ${x}.`)}>Join</button></div>)}</div></Section>;
  if(id==="operations") return <Section title="Operations Command Centre" body="Administrator controls for subscribers, merchants, drivers, support and platform health."><div style={s.grid}><Tile title="Subscribers" value={String(state.subscribers)} body="Create and manage accounts" onClick={()=>persist({...state,subscribers:state.subscribers+1})}/><Tile title="Merchants" value="18" body="3 pending approval" onClick={()=>action("Merchant approval queue opened.")}/><Tile title="Drivers" value="12 online" body="4 applications pending" onClick={()=>action("Driver operations opened.")}/><Tile title="Support" value="6 tickets" body="2 need reply" onClick={()=>action("Support queue opened.")}/><Tile title="Security" value="Healthy" body="No critical alerts" onClick={()=>action("Security health check completed.")}/><Tile title="AI Services" value="Demo online" body="Standards engine active" onClick={()=>action("AI quality report opened.")}/></div></Section>;
  return <Section title="Administrator Profile" body="Manage branding, account, coach defaults, privacy and demo data."><div style={s.card}><p><b>Account:</b> Marcel Goulet</p><p><b>Role:</b> Platform Administrator</p><p><b>Brand:</b> Project 220 Legacy Edition</p><p><b>Motto:</b> Build. Eat. Recover. Repeat.</p><button style={s.primary} onClick={()=>{persist(initialState);action("All local demo data was reset.")}}>Reset All Demo Data</button></div></Section>;
}

function coachMessage(t:AppState["coachTone"]){return ({Supportive:"You are building something important. Complete the next healthy action and give yourself credit for showing up.",Motivational:"Your plan is ready. Let’s complete today’s workout, meals and recovery goals.",Performance:"Execute today’s program with controlled form, complete the planned work and record every result.",Elite:"No wasted effort. Follow the plan, protect your form, finish every priority and recover like performance depends on it."})[t]}
function advanceOrder(o:{id:string;status:string;driver?:string}){if(o.status==="Merchant preparing")return {...o,status:"Ready for driver"};if(o.status==="Ready for driver")return {...o,status:"Driver assigned",driver:"Maya R."};if(o.status==="Driver assigned")return {...o,status:"Out for delivery"};return {...o,status:"Delivered"}}

const s:Record<string,React.CSSProperties>={page:{minHeight:"100vh",background:"#0d0d0d",color:"#fff",fontFamily:"Arial,Helvetica,sans-serif"},login:{maxWidth:500,margin:"0 auto",padding:"48px 20px"},app:{maxWidth:1100,margin:"0 auto",padding:"18px 16px 90px"},logo:{fontSize:48,fontWeight:900,textAlign:"center",letterSpacing:-3},brand:{fontSize:26,fontWeight:900},red:{color:"#C1121F"},tag:{textAlign:"center",color:"#B8BCC2",letterSpacing:2,fontSize:12,margin:"8px 0 28px"},card:{background:"#191919",border:"1px solid #353535",borderRadius:18,padding:20,marginTop:16},h1:{fontSize:28,margin:"16px 0 6px"},muted:{color:"#B8BCC2",lineHeight:1.5},mutedSmall:{color:"#B8BCC2",fontSize:13,lineHeight:1.4},body:{lineHeight:1.65},label:{display:"block",margin:"15px 0 7px",color:"#B8BCC2"},input:{boxSizing:"border-box",width:"100%",padding:15,borderRadius:12,border:"1px solid #4a4a4a",background:"#090909",color:"#fff",fontSize:16},primary:{width:"100%",marginTop:14,padding:15,border:0,borderRadius:12,background:"#C1121F",color:"#fff",fontWeight:800,fontSize:16},secondary:{width:"100%",marginTop:10,padding:14,borderRadius:12,border:"1px solid #555",background:"transparent",color:"#fff",fontWeight:700},primarySmall:{padding:"10px 12px",border:0,borderRadius:10,background:"#C1121F",color:"#fff",fontWeight:800},secondarySmall:{padding:"9px 11px",borderRadius:10,border:"1px solid #555",background:"transparent",color:"#fff"},credentials:{marginTop:16,padding:12,borderRadius:10,background:"#101010",color:"#B8BCC2",fontSize:13,lineHeight:1.6},error:{marginTop:12,padding:10,borderRadius:10,background:"#3a1518",color:"#ff9b9b"},header:{display:"flex",justifyContent:"space-between",alignItems:"center",gap:12},badge:{display:"inline-block",marginTop:5,padding:"5px 8px",borderRadius:999,background:"#2b1518",fontSize:11},rolebar:{display:"flex",gap:7,alignItems:"center",flexWrap:"wrap",margin:"18px 0",color:"#B8BCC2",fontSize:13},roleButton:{padding:"7px 10px",border:"1px solid #444",borderRadius:999,background:"transparent",color:"#B8BCC2"},roleActive:{padding:"7px 10px",border:"1px solid #77343b",borderRadius:999,background:"#2b1518",color:"#fff"},nav:{display:"flex",gap:8,overflowX:"auto",padding:"8px 0 14px",borderBottom:"1px solid #333"},navBtn:{whiteSpace:"nowrap",padding:"10px 12px",border:0,borderRadius:10,background:"#1a1a1a",color:"#B8BCC2"},navActive:{whiteSpace:"nowrap",padding:"10px 12px",border:0,borderRadius:10,background:"#C1121F",color:"#fff",fontWeight:800},grid:{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:12,marginTop:18},tile:{minHeight:140,padding:17,textAlign:"left",borderRadius:16,border:"1px solid #353535",background:"#191919",color:"#fff",display:"flex",flexDirection:"column",gap:9},metric:{fontSize:25,color:"#C1121F"},list:{display:"grid",gap:9,marginTop:16},row:{display:"flex",justifyContent:"space-between",alignItems:"center",gap:12,padding:13,borderRadius:12,border:"1px solid #353535",background:"#191919"},status:{padding:"5px 8px",borderRadius:999,background:"#263129",fontSize:11,whiteSpace:"nowrap"},actions:{display:"flex",gap:10,flexWrap:"wrap",marginTop:16},notice:{position:"sticky",top:8,zIndex:10,marginTop:12,padding:12,borderRadius:10,background:"#1d281f",borderLeft:"4px solid #30b873"}};
