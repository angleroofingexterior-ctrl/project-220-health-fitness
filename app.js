const KEY='project220-data-v1';
const today=()=>new Date().toISOString().slice(0,10);
const defaults={date:today(),water:0,habits:[{name:'Eat enough protein',done:false},{name:'Complete workout or recovery',done:false},{name:'Drink 8 cups of water',done:false},{name:'Sleep and recovery check',done:false}],exercises:[{name:'Smith machine squat',sets:'4 × 8',done:false,weight:''},{name:'Lat pulldown',sets:'4 × 10',done:false,weight:''},{name:'Bench press',sets:'4 × 8',done:false,weight:''},{name:'Romanian deadlift',sets:'3 × 10',done:false,weight:''},{name:'Shoulder press',sets:'3 × 10',done:false,weight:''}],meals:[],weights:[]};
let data=load();
function load(){try{const saved=JSON.parse(localStorage.getItem(KEY));if(!saved)return structuredClone(defaults);if(saved.date!==today())return {...saved,date:today(),water:0,meals:[],habits:saved.habits.map(x=>({...x,done:false})),exercises:saved.exercises.map(x=>({...x,done:false}))};return saved}catch{return structuredClone(defaults)}}
function save(){localStorage.setItem(KEY,JSON.stringify(data));render()}
const $=s=>document.querySelector(s);
function render(){
 $('#todayLabel').textContent=new Date().toLocaleDateString('en-CA',{weekday:'long',month:'long',day:'numeric'});
 $('#waterValue').textContent=data.water;
 $('#calorieValue').textContent=data.meals.reduce((s,m)=>s+Number(m.calories),0);
 $('#weightValue').textContent=data.weights.at(-1)?.weight??'—';
 const done=data.exercises.filter(x=>x.done).length;$('#workoutValue').textContent=Math.round(done/data.exercises.length*100)+'%';
 $('#habitList').innerHTML=data.habits.map((h,i)=>`<label class="check-row"><span>${h.name}</span><input type="checkbox" data-habit="${i}" ${h.done?'checked':''}></label>`).join('');
 $('#exerciseList').innerHTML=data.exercises.map((e,i)=>`<div class="exercise"><label><input type="checkbox" data-exercise="${i}" ${e.done?'checked':''}> Done</label><div class="exercise-info"><strong>${e.name}</strong><div class="muted">${e.sets}</div></div><input aria-label="Weight for ${e.name}" type="number" inputmode="decimal" placeholder="lb" value="${e.weight}" data-weight="${i}"></div>`).join('');
 $('#mealList').innerHTML=data.meals.length?data.meals.map((m,i)=>`<div class="meal"><span><strong>${m.name}</strong><br><small>${m.protein||0} g protein</small></span><span>${m.calories} cal <button class="secondary" data-delete-meal="${i}">×</button></span></div>`).join(''):'<p class="muted">No meals logged yet.</p>';
 $('#weightHistory').innerHTML=data.weights.length?[...data.weights].reverse().map(w=>`<div class="history"><span>${w.date}</span><strong>${w.weight} lb</strong></div>`).join(''):'<p class="muted">No weight entries yet.</p>';
}
function connection(){const online=navigator.onLine;$('#networkStatus').textContent=online?'Online · saved locally':'Offline mode · saved locally'}
addEventListener('online',connection);addEventListener('offline',connection);
document.addEventListener('change',e=>{if(e.target.dataset.habit!==undefined){data.habits[e.target.dataset.habit].done=e.target.checked;save()}if(e.target.dataset.exercise!==undefined){data.exercises[e.target.dataset.exercise].done=e.target.checked;save()}if(e.target.dataset.weight!==undefined){data.exercises[e.target.dataset.weight].weight=e.target.value;save()}});
document.addEventListener('click',e=>{const tab=e.target.dataset.tab;if(tab){document.querySelectorAll('.tab,.panel').forEach(x=>x.classList.remove('active'));e.target.classList.add('active');$('#'+tab).classList.add('active')}if(e.target.dataset.deleteMeal!==undefined){data.meals.splice(e.target.dataset.deleteMeal,1);save()}});
$('#addWater').onclick=()=>{data.water=Math.min(20,data.water+1);if(data.water>=8)data.habits[2].done=true;save()};
$('#resetDay').onclick=()=>{data.habits.forEach(x=>x.done=false);data.water=0;save()};
$('#resetWorkout').onclick=()=>{data.exercises.forEach(x=>x.done=false);save()};
$('#clearMeals').onclick=()=>{data.meals=[];save()};
$('#mealForm').onsubmit=e=>{e.preventDefault();data.meals.push({name:$('#mealName').value.trim(),calories:Number($('#mealCalories').value),protein:Number($('#mealProtein').value||0)});e.target.reset();save()};
$('#weightForm').onsubmit=e=>{e.preventDefault();data.weights.push({date:today(),weight:Number($('#weightInput').value)});e.target.reset();save()};
$('#exportData').onclick=()=>{const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'}),a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=`project-220-backup-${today()}.json`;a.click();URL.revokeObjectURL(a.href)};
$('#clearData').onclick=()=>{if(confirm('Clear all Project 220 data from this device?')){localStorage.removeItem(KEY);data=structuredClone(defaults);save()}};
let installPrompt;addEventListener('beforeinstallprompt',e=>{e.preventDefault();installPrompt=e;$('#installButton').classList.remove('hidden')});$('#installButton').onclick=async()=>{if(installPrompt){installPrompt.prompt();await installPrompt.userChoice;installPrompt=null;$('#installButton').classList.add('hidden')}};
if('serviceWorker'in navigator)addEventListener('load',()=>navigator.serviceWorker.register('./service-worker.js'));
connection();save();