"use client";

import { useEffect, useMemo, useState } from "react";

type Food={id:string;name:string;meal:string;calories:number;protein:number};
type Supplement={id:string;name:string;grams:number;servingGrams:number;caloriesPerServing:number;proteinPerServing:number;creatinePerServing:number};
type Workout={id:string;exercise:string;sets:number;reps:number;weight:number;unit:"lb"|"kg"};
type Weight={id:string;date:string;value:number;unit:"lb"|"kg"};
type State={profile:{name:string;email:string;calorieGoal:number;proteinGoal:number;goalWeight:number;unit:"lb"|"kg"};foods:Food[];supplements:Supplement[];workouts:Workout[];weights:Weight[]};
const KEY="project220-build02-react";
const initial:State={profile:{name:"",email:"",calorieGoal:3000,proteinGoal:220,goalWeight:220,unit:"lb"},foods:[],supplements:[],workouts:[],weights:[]};
const id=()=>crypto.randomUUID();

export default function Build02Page(){
 const [state,setState]=useState<State>(initial); const [ready,setReady]=useState(false); const [tab,setTab]=useState("dashboard");
 useEffect(()=>{try{const saved=localStorage.getItem(KEY);if(saved)setState(JSON.parse(saved));}finally{setReady(true)}},[]);
 useEffect(()=>{if(ready)localStorage.setItem(KEY,JSON.stringify(state));},[state,ready]);
 const supplementTotals=useMemo(()=>state.supplements.reduce((t,s)=>{const r=s.servingGrams>0?s.grams/s.servingGrams:0;return{calories:t.calories+s.caloriesPerServing*r,protein:t.protein+s.proteinPerServing*r,creatine:t.creatine+s.creatinePerServing*r}}, {calories:0,protein:0,creatine:0}),[state.supplements]);
 const foodTotals=useMemo(()=>state.foods.reduce((t,f)=>({calories:t.calories+f.calories,protein:t.protein+f.protein}),{calories:0,protein:0}),[state.foods]);
 const totals={calories:foodTotals.calories+supplementTotals.calories,protein:foodTotals.protein+supplementTotals.protein}; const latest=state.weights.at(-1);
 const addFood=(form:FormData)=>setState(s=>({...s,foods:[...s.foods,{id:id(),name:String(form.get("name")),meal:String(form.get("meal")),calories:Number(form.get("calories")),protein:Number(form.get("protein"))}]}));
 const addSupplement=(form:FormData)=>setState(s=>({...s,supplements:[...s.supplements,{id:id(),name:String(form.get("name")),grams:Number(form.get("grams")),servingGrams:Number(form.get("servingGrams")),caloriesPerServing:Number(form.get("calories")),proteinPerServing:Number(form.get("protein")),creatinePerServing:Number(form.get("creatine"))}]}));
 const addWorkout=(form:FormData)=>setState(s=>({...s,workouts:[...s.workouts,{id:id(),exercise:String(form.get("exercise")),sets:Number(form.get("sets")),reps:Number(form.get("reps")),weight:Number(form.get("weight")),unit:String(form.get("unit")) as "lb"|"kg"}]}));
 const addWeight=(form:FormData)=>setState(s=>({...s,weights:[...s.weights,{id:id(),date:String(form.get("date")),value:Number(form.get("value")),unit:String(form.get("unit")) as "lb"|"kg"}]}));
 const remove=(key:"foods"|"supplements"|"workouts"|"weights",itemId:string)=>setState(s=>({...s,[key]:s[key].filter((x:{id:string})=>x.id!==itemId)}));
 const exportData=()=>{const blob=new Blob([JSON.stringify(state,null,2)],{type:"application/json"});const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="project-220-build-0.2-backup.json";a.click();URL.revokeObjectURL(a.href)};
 if(!ready)return <main className="p-8">Loading Project 220…</main>;
 return <main className="mx-auto max-w-5xl p-4 pb-24"><header className="mb-5"><h1 className="text-3xl font-bold">Project <span className="text-red-600">220</span> Build 0.2</h1><p>Integrated local-first beta</p></header>
 <nav className="mb-5 flex flex-wrap gap-2">{["dashboard","nutrition","supplements","workouts","progress","profile"].map(x=><button key={x} onClick={()=>setTab(x)} className="rounded bg-neutral-800 px-3 py-2 capitalize text-white">{x}</button>)}</nav>
 {tab==="dashboard"&&<section><div className="grid gap-3 sm:grid-cols-4"><Stat label="Calories" value={`${Math.round(totals.calories)} / ${state.profile.calorieGoal}`}/><Stat label="Protein" value={`${totals.protein.toFixed(1)} / ${state.profile.proteinGoal} g`}/><Stat label="Creatine" value={`${supplementTotals.creatine.toFixed(2)} g`}/><Stat label="Weight" value={latest?`${latest.value} ${latest.unit}`:"Not logged"}/></div><Card><h2 className="font-bold">Coach</h2><p>{totals.protein<state.profile.proteinGoal?`${Math.max(0,state.profile.proteinGoal-Math.round(totals.protein))} g protein remaining today.`:"Protein goal reached."}</p></Card></section>}
 {tab==="nutrition"&&<Module title="Nutrition"><EntryForm fields={["name","meal","calories","protein"]} onSave={addFood}/>{state.foods.map(x=><Row key={x.id} text={`${x.meal}: ${x.name} — ${x.calories} kcal, ${x.protein} g protein`} onDelete={()=>remove("foods",x.id)}/>)}</Module>}
 {tab==="supplements"&&<Module title="Supplements"><EntryForm fields={["name","grams","servingGrams","calories","protein","creatine"]} onSave={addSupplement}/>{state.supplements.map(x=><Row key={x.id} text={`${x.name}: ${x.grams} g used`} onDelete={()=>remove("supplements",x.id)}/>)}</Module>}
 {tab==="workouts"&&<Module title="Workouts"><EntryForm fields={["exercise","sets","reps","weight","unit"]} onSave={addWorkout}/>{state.workouts.map(x=><Row key={x.id} text={`${x.exercise}: ${x.sets} × ${x.reps} @ ${x.weight} ${x.unit}`} onDelete={()=>remove("workouts",x.id)}/>)}</Module>}
 {tab==="progress"&&<Module title="Progress"><EntryForm fields={["date","value","unit"]} onSave={addWeight}/>{state.weights.map(x=><Row key={x.id} text={`${x.date}: ${x.value} ${x.unit}`} onDelete={()=>remove("weights",x.id)}/>)}</Module>}
 {tab==="profile"&&<Card><h2 className="mb-3 text-xl font-bold">Profile and data</h2><label>Name<input className="input" value={state.profile.name} onChange={e=>setState(s=>({...s,profile:{...s.profile,name:e.target.value}}))}/></label><label>Email<input className="input" value={state.profile.email} onChange={e=>setState(s=>({...s,profile:{...s.profile,email:e.target.value}}))}/></label><button className="mt-4 rounded bg-red-600 px-4 py-2 text-white" onClick={exportData}>Export backup</button></Card>}
 </main>}
function Card({children}:{children:React.ReactNode}){return <div className="my-3 rounded-xl border border-neutral-700 bg-neutral-900 p-4 text-white">{children}</div>}
function Stat({label,value}:{label:string;value:string}){return <Card><small>{label}</small><strong className="block text-xl">{value}</strong></Card>}
function Module({title,children}:{title:string;children:React.ReactNode}){return <section><h2 className="text-2xl font-bold">{title}</h2>{children}</section>}
function Row({text,onDelete}:{text:string;onDelete:()=>void}){return <Card><div className="flex items-center justify-between gap-3"><span>{text}</span><button onClick={onDelete} className="rounded bg-red-800 px-3 py-1">Delete</button></div></Card>}
function EntryForm({fields,onSave}:{fields:string[];onSave:(form:FormData)=>void}){return <Card><form action={onSave} className="grid gap-3 sm:grid-cols-3">{fields.map(f=><label key={f} className="capitalize">{f}<input name={f} required className="mt-1 w-full rounded bg-neutral-800 p-2" type={["sets","reps","weight","value","grams","servingGrams","calories","protein","creatine"].includes(f)?"number":f==="date"?"date":"text"}/></label>)}<button className="rounded bg-red-600 px-4 py-2 text-white">Save</button></form></Card>}
