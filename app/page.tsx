"use client";

import { useEffect, useRef, useState } from "react";
import {
  buildCookbook,
  buildDailyTasks,
  buildGroceries,
  buildMeals,
  buildRoutineWeek,
  buildWorkoutWeek,
  defaultProfile,
  displayWeight,
  estimateCalories,
  foodCatalog,
  foodIsCompatible,
  genderOptions,
  planWarnings,
  proteinTarget,
  routineActivityCatalog,
  type PlannedGrocery,
  type RecipeIngredient,
  type UserProfile,
  weightUnit,
} from "./planner";

type Section =
  | "setup"
  | "today"
  | "training"
  | "nutrition"
  | "cookbook"
  | "grocery"
  | "supplements"
  | "progress"
  | "routine"
  | "install";
type CheckMap = Record<string, boolean>;
type InstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};
type WeightEntry = {
  id: string;
  date: string;
  weightKg: number;
  note?: string;
  photoDataUrl?: string;
};
type ExerciseGuide = {
  why: string;
  muscles: string;
  setup: string;
  movement: string;
  breathing: string;
  mistakes: string;
  ostomy: string;
};
type NutritionGuide = {
  why: string;
  timing: string;
  body: string;
  bestWay: string;
};

const navItems: Array<{ id: Section; label: string; short: string }> = [
  { id: "setup", label: "My Plan", short: "M" },
  { id: "today", label: "Today", short: "T" },
  { id: "training", label: "Training", short: "W" },
  { id: "nutrition", label: "Diet Plan", short: "D" },
  { id: "cookbook", label: "Cookbook", short: "C" },
  { id: "grocery", label: "Groceries", short: "G" },
  { id: "supplements", label: "Supplements", short: "S" },
  { id: "progress", label: "Progress", short: "P" },
  { id: "routine", label: "Routine", short: "R" },
  { id: "install", label: "Install", short: "I" },
];

const supplementOptions = [
  { id: "protein-powder", name: "Protein powder", use: "Convenient protein when meals fall short", timing: "Any time that helps meet the daily protein plan", amount: "Use the product label and include it in daily totals", review: "Check allergens and look for an NPN in Canada" },
  { id: "mass-gainer", name: "Mass gainer", use: "Extra calories and protein for people who struggle to eat enough", timing: "Between meals or around training if tolerated", amount: "Start with the label serving or a partial serving", review: "Count it as food; check sugar, allergens, and digestive tolerance" },
  { id: "creatine", name: "Creatine monohydrate", use: "Supports repeated high-intensity efforts and training quality", timing: "Any consistent time, including rest days", amount: "Common healthy-adult maintenance: 3-5 g daily", review: "Professional review for minors, pregnancy, kidney disease, medications, or fluid restrictions" },
  { id: "multivitamin", name: "Multivitamin", use: "May cover identified dietary gaps; it is not a muscle builder", timing: "With a meal if the label or clinician recommends it", amount: "One label-directed serving only", review: "Avoid stacking overlapping formulas" },
  { id: "vitamin-d", name: "Vitamin D", use: "Supports normal bone, muscle, and immune function", timing: "As directed on the product or by a clinician", amount: "Do not auto-dose; needs vary", review: "Discuss blood work, medications, and other fortified products" },
  { id: "vitamin-b12", name: "Vitamin B12", use: "Supports normal red-blood-cell formation and nerve function", timing: "As directed; especially relevant to some vegan diets or absorption conditions", amount: "Do not auto-dose", review: "Confirm need and product strength with a pharmacist or clinician" },
  { id: "iron", name: "Iron", use: "Treats or prevents iron deficiency only when appropriate", timing: "Only as professionally directed because foods and medications can affect absorption", amount: "No automatic dose", review: "Do not take routinely without confirmed need; excess can be harmful" },
  { id: "calcium", name: "Calcium", use: "Supports bone and muscle function when food intake is insufficient", timing: "Product- and medication-dependent", amount: "No automatic dose", review: "Food first; check medication spacing and total daily intake" },
  { id: "magnesium", name: "Magnesium", use: "Supports normal muscle, nerve, and energy metabolism", timing: "Follow the selected product label", amount: "No automatic dose", review: "Some forms cause diarrhea and can interact with medications" },
  { id: "omega3", name: "Omega-3", use: "May help meet omega-3 needs when fish intake is low", timing: "With food if used", amount: "Follow the label or clinician advice", review: "Check fish/shellfish source, allergies, and blood-thinning medicines" },
  { id: "electrolytes", name: "Electrolyte / oral rehydration product", use: "Replaces sodium and fluid in a specific heat, endurance, illness, or medical situation", timing: "When the situation calls for it", amount: "Use the label or clinical plan", review: "Not a universal daily requirement; kidney/heart conditions need guidance" },
  { id: "fibre", name: "Fibre supplement", use: "May support bowel regularity when appropriate", timing: "Separate from some medicines and increase gradually", amount: "Use the label and adequate fluid", review: "Ostomy, narrowing, swallowing difficulty, or digestive disease require professional review" },
  { id: "probiotic", name: "Probiotic", use: "Some specific strains may help specific conditions", timing: "Depends on the exact product", amount: "Follow the exact product label", review: "Benefits are strain-specific; not automatically needed" },
] as const;

const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const motivationQuotes = [
  "Show up for the person you are becoming.",
  "Controlled reps today become strength tomorrow.",
  "Progress is built one good choice at a time.",
  "You do not need perfect conditions - you need the next useful action.",
  "Strong bodies grow from patient, repeatable work.",
  "Your pace is valid. Keep moving forward.",
  "Fuel the work, respect recovery, and trust the trend.",
  "Every well-performed rep is a vote for your future health.",
  "Consistency is a skill, and you are practising it now.",
  "Finish with good form and leave something to build on.",
];

const supplementCards = [
  {
    id: "supp-protein",
    name: "Protein powder or mass gainer",
    timing: "When food alone does not conveniently meet the daily plan",
    amount: "Use the product label and count it in daily calories and protein",
    note: "Optional convenience—not mandatory. Choose a third-party-tested product that fits allergies. A mass gainer is most relevant to people who consistently struggle to eat enough.",
    effect: "Supplies amino acids used in tissue repair. Mass gainers also add carbohydrate and calories; they do not create muscle without progressive training and sufficient total intake.",
    link: "https://www.canada.ca/en/health-canada/services/food-nutrition/healthy-eating.html",
    label: "Health Canada healthy eating",
  },
  {
    id: "supp-creatine",
    name: "Creatine monohydrate",
    timing: "Any consistent time; take on rest days too",
    amount: "Common adult maintenance amount: 3-5 g once daily",
    note: "Optional for healthy adults. No loading phase is required. Minors, pregnancy, kidney disease, medications, or medical fluid restrictions require professional review first.",
    effect: "Gradually increases creatine stored in muscle. That stored creatine helps regenerate ATP during short, hard efforts, which can support extra reps, strength, and training quality. Some early scale gain may be water held inside muscle.",
    link: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5469049/",
    label: "Evidence review",
  },
  {
    id: "supp-multi",
    name: "Multivitamin",
    timing: "With a meal if a clinician or pharmacist recommends it",
    amount: "Follow one product label; do not stack overlapping formulas",
    note: "Conditional—not an automatic requirement. Food variety comes first. Blood work, pregnancy, restricted diets, absorption issues, and prescribed medications can change individual needs.",
    effect: "Provides vitamins and minerals that support normal metabolism and health when dietary intake has gaps. It is not a direct muscle builder, and taking more than directed will not speed growth.",
    link: "https://www.canada.ca/en/health-canada/services/food-nutrition/dietary-reference-intakes/tables.html",
    label: "Health Canada nutrient references",
  },
];

const exerciseGuides: Record<string, ExerciseGuide> = {
  "Chest Press": {
    why: "A stable compound press that lets you train the chest hard while the machine guides the path. It also builds the front shoulders and triceps.",
    muscles: "Chest (primary), front deltoids, triceps",
    setup: "Adjust the seat so the handles are around mid-chest. Keep your head, upper back, and hips against the pad and both feet flat.",
    movement: "Draw the shoulder blades gently down and back. Press forward without aggressively locking the elbows. Return slowly until you feel a comfortable chest stretch.",
    breathing: "Breathe out while pressing and breathe in during the controlled return. Do not hold your breath.",
    mistakes: "Shrugging, elbows flared straight sideways, bouncing the stack, lifting the hips, or letting the shoulders roll forward.",
    ostomy: "Use a load that allows steady breathing. Stop for pain, pressure, leaking, or a new bulge around the stoma.",
  },
  "Pec Fly": {
    why: "Trains the chest through bringing the arms toward the midline. It adds chest volume without requiring as much triceps work as pressing.",
    muscles: "Chest (primary), front shoulders",
    setup: "Set the seat so elbows or handles are level with mid-chest. Keep a soft bend in the elbows and your chest supported.",
    movement: "Bring the arms together in a smooth arc, pause and squeeze the chest, then open only as far as your shoulders remain comfortable.",
    breathing: "Breathe out as the arms come together and in as they open.",
    mistakes: "Overstretching behind the body, straightening and bending the elbows during the rep, shrugging, or slamming the stack.",
    ostomy: "Keep ribs stacked over the pelvis instead of arching hard. Avoid straining for the last rep.",
  },
  "Shoulder Press": {
    why: "Builds shoulder size and overhead pushing strength while the back pad provides stability.",
    muscles: "Front and side deltoids, triceps",
    setup: "Set the seat so the handles begin around chin or ear height. Keep feet planted, back supported, and wrists stacked over elbows.",
    movement: "Press upward in the machine path, finishing just short of a hard elbow lock. Lower slowly until elbows reach a comfortable depth.",
    breathing: "Breathe out on the press and in on the lowering phase.",
    mistakes: "Excessive low-back arch, ribs flaring, wrists bent backward, shoulders shrugged, or lowering too deeply.",
    ostomy: "Choose a load that does not make you bear down. If you cannot breathe through the rep, reduce the weight.",
  },
  "Triceps Extension": {
    why: "Directly trains the triceps, which add upper-arm size and help every pressing movement.",
    muscles: "Triceps",
    setup: "Align your elbows with the machine pivot and keep the upper arms supported. Use a neutral wrist.",
    movement: "Extend the elbows smoothly, pause before a hard lockout, and control the handles back until the elbows are comfortably bent.",
    breathing: "Breathe out while extending and in while returning.",
    mistakes: "Lifting elbows from the pad, using the torso for momentum, snapping the elbows straight, or letting the weight crash down.",
    ostomy: "Sit tall and avoid curling the whole torso against the pad to move more weight.",
  },
  "Abdominal Machine": {
    why: "Teaches controlled trunk flexion and can build abdominal endurance when the load and range are appropriate.",
    muscles: "Rectus abdominis, supporting trunk muscles",
    setup: "Use a light load. Adjust the seat and pad so you can start tall without being forced into an extreme stretch.",
    movement: "Gently bring the ribs toward the pelvis, pause, then return to tall under control. The movement should come from the trunk, not yanking with the arms.",
    breathing: "Slowly breathe out through the curl and breathe in on the return. Never brace with a closed throat.",
    mistakes: "Heavy jerking, pulling with the arms, folding at the hips, fast twisting, or chasing a large range.",
    ostomy: "This exercise needs individual clearance from your ostomy nurse or clinician. Stop immediately for stoma-area pain, pressure, pouch problems, or bulging.",
  },
  "Lat Pulldown": {
    why: "Builds back width and pulling strength, balancing the pressing work and supporting shoulder health.",
    muscles: "Latissimus dorsi, upper back, biceps",
    setup: "Secure the thigh pad, grip just wider than shoulder width, sit tall, and lean back only slightly. Keep the head in line with the spine.",
    movement: "Start by drawing the shoulders down, then pull the bar toward the upper chest by driving elbows down. Return until the arms are long without losing control.",
    breathing: "Breathe out while pulling and in while returning overhead.",
    mistakes: "Pulling behind the neck, swinging far backward, using momentum, shrugging, or turning it into a biceps curl.",
    ostomy: "Keep the torso quiet and avoid a forceful abdominal brace or breath hold.",
  },
  "Seated Row": {
    why: "Adds back thickness, strengthens posture muscles, and balances chest training.",
    muscles: "Mid-back, lats, rear delts, biceps",
    setup: "Set the seat or chest pad so you can reach the handles with a neutral spine. Keep shoulders away from the ears.",
    movement: "Pull elbows back while keeping the chest tall. Pause when the hands reach the torso, then let the arms lengthen slowly without rounding forward.",
    breathing: "Breathe out on the pull and in on the return.",
    mistakes: "Rocking the torso, jutting the head forward, shrugging, yanking, or allowing the low back to round.",
    ostomy: "If the machine has a chest pad, position it so it does not press on the pouch or stoma.",
  },
  "Rear Delt": {
    why: "Builds the back of the shoulders and upper back, improving shoulder balance and posture.",
    muscles: "Rear deltoids, rhomboids, middle trapezius",
    setup: "Face the pad with handles near shoulder height. Keep the chest supported, shoulders down, and elbows softly bent.",
    movement: "Sweep the arms out and back until they align with the torso, pause, and return slowly.",
    breathing: "Breathe out while opening and in while returning.",
    mistakes: "Shrugging, turning the movement into a row, straightening the elbows, or bouncing off the weight stack.",
    ostomy: "Make sure the front pad does not compress the pouch. Ask staff for another rear-delt setup if it does.",
  },
  "Preacher Curl": {
    why: "Isolates the biceps and limits body swing, making progression easy to measure.",
    muscles: "Biceps, brachialis, forearms",
    setup: "Align elbows with the machine pivot and rest the full upper arms on the pad. Keep wrists straight.",
    movement: "Curl through a comfortable range, squeeze without lifting the elbows, then lower slowly without forcefully straightening the arms.",
    breathing: "Breathe out on the curl and in on the return.",
    mistakes: "Lifting elbows, shoulders rolling forward, wrists folding, bouncing from the bottom, or dropping the weight.",
    ostomy: "Keep the abdomen relaxed and supported instead of leaning or pressing hard into the machine.",
  },
  "Torso Rotation": {
    why: "Trains controlled rotation, but it should be treated as a light movement skill rather than a heavy strength test.",
    muscles: "Obliques and deep trunk stabilizers",
    setup: "Set a light load and a small, pain-free range. Secure the hips and keep the spine tall.",
    movement: "Rotate slowly through the trunk without forcing the end range. Pause briefly and return with equal control.",
    breathing: "Exhale gently during rotation and inhale on the return. Never twist while holding your breath.",
    mistakes: "Heavy loading, fast twisting, moving the knees or hips, forcing range, or rebounding off the stop.",
    ostomy: "Get specific clearance before loaded rotation. A new bulge, pain, pressure, or altered pouch fit means stop and contact your stoma team.",
  },
  "Smith Machine Squat": {
    why: "A supported squat pattern that builds thighs and glutes while allowing a consistent bar path.",
    muscles: "Quadriceps, glutes, hamstrings",
    setup: "Place the bar across the muscular upper back, not the neck. Stand with feet about shoulder width and slightly forward so balance feels natural.",
    movement: "Unlock the bar, sit down between the hips while knees track over toes, descend only while the back stays neutral, then drive through the whole foot to stand.",
    breathing: "Inhale before descending, then breathe out steadily as you stand. Avoid a prolonged breath hold.",
    mistakes: "Knees collapsing inward, heels lifting, low back rounding, bar on the neck, bouncing at the bottom, or adding weight too quickly.",
    ostomy: "Learn this with a trainer and your ostomy team's approval. Use conservative loads and professionally fitted support if recommended.",
  },
  "Seated Leg Press": {
    why: "Loads the thighs and glutes with back support, making it a practical main lower-body exercise.",
    muscles: "Quadriceps, glutes, hamstrings",
    setup: "Place feet about shoulder width on the platform. Adjust the seat so the pelvis and low back remain against the pad at the bottom.",
    movement: "Release the safety, lower until knees are comfortably bent without the pelvis curling, then push through the whole foot and stop before locking the knees.",
    breathing: "Breathe in while lowering and out while pressing.",
    mistakes: "Knees collapsing inward, lifting the hips, going so deep the low back rounds, locking knees, or placing hands on the knees.",
    ostomy: "Do not use an extreme depth that compresses the abdomen. Keep the pouch empty and comfortable before training.",
  },
  "Leg Extension": {
    why: "Directly trains the quadriceps and adds thigh volume after the main leg movement.",
    muscles: "Quadriceps",
    setup: "Align the knee with the machine pivot and place the roller above the ankle. Keep the back and hips against the pad.",
    movement: "Extend the knees smoothly, pause short of a hard lock, then lower the weight for about three seconds.",
    breathing: "Breathe out while extending and in while lowering.",
    mistakes: "Kicking with momentum, lifting the hips, slamming the stack, or snapping the knees locked.",
    ostomy: "Usually requires less trunk strain, but keep breathing and stop if seat or belt pressure affects the pouch.",
  },
  "Leg Curl": {
    why: "Directly strengthens the hamstrings, balancing the quadriceps and supporting knee and hip function.",
    muscles: "Hamstrings, calves as assistants",
    setup: "Align the knee with the pivot and set the pad above the back of the ankle. Keep hips and back supported.",
    movement: "Curl the pad down or back through a comfortable range, pause, then return slowly until the legs are nearly straight.",
    breathing: "Breathe out during the curl and in during the return.",
    mistakes: "Hips lifting, low back arching, swinging, shortening the return, or letting the stack drop.",
    ostomy: "Avoid any pad or belt position that presses across the stoma or pouch.",
  },
  "Easy mobility": {
    why: "Maintains comfortable movement and circulation without adding much fatigue on recovery days.",
    muscles: "Whole body",
    setup: "Choose a clear space and movements that feel comfortable.",
    movement: "Use gentle shoulder circles, hip movements, and easy walking for 10-15 minutes.",
    breathing: "Breathe normally throughout.",
    mistakes: "Forcing stretches, bouncing, or turning recovery into a hard workout.",
    ostomy: "Keep all movement pain-free and avoid pressure on the pouch.",
  },
  "Meal preparation": {
    why: "Makes calorie and protein consistency easier during the coming week.",
    muscles: "Recovery habit",
    setup: "Prepare containers, scale, ingredients, and grocery list.",
    movement: "Cook and portion the planned proteins, carbohydrates, and tolerated vegetables.",
    breathing: "Not applicable.",
    mistakes: "Guessing portions, cooking without enough food for the week, or preparing foods you do not tolerate.",
    ostomy: "Keep safe alternatives available for higher-output or sensitive days.",
  },
  "Weekly review": {
    why: "Turns your logs into decisions instead of reacting to one workout or weigh-in.",
    muscles: "Planning habit",
    setup: "Open your weight, workout, nutrition, hydration, and symptom records.",
    movement: "Review the weekly trend and change only one variable at a time.",
    breathing: "Not applicable.",
    mistakes: "Changing the entire program after one difficult day.",
    ostomy: "Include output, hydration, pouch fit, and any stoma-area symptoms in the review.",
  },
};

function guideForExercise(name: string): ExerciseGuide {
  if (exerciseGuides[name]) return exerciseGuides[name];
  const lower = /squat|lunge|leg|calf|glute|deadlift/i.test(name);
  const pull = /row|pull|curl|rear|snow|prone/i.test(name);
  const push = /press|push|triceps/i.test(name);
  return {
    why: lower
      ? "Builds lower-body strength for walking, stairs, lifting, and everyday independence."
      : pull
        ? "Strengthens the back, arms, and posture muscles to balance pressing and daily reaching."
        : push
          ? "Builds the chest, shoulders, and triceps for upper-body strength."
          : "Builds controlled strength and movement quality for daily activity.",
    muscles: lower ? "Legs and hips" : pull ? "Back, rear shoulders, and arms" : push ? "Chest, shoulders, and triceps" : "Core and stabilizing muscles",
    setup: "Choose a stable position and an easy starting variation. Keep the spine comfortable, joints aligned, and equipment secure.",
    movement: "Move through a pain-free range at a controlled speed. Stop the set when posture changes or another clean repetition is doubtful.",
    breathing: "Breathe out through the effort and in during the return. Do not hold your breath or bear down.",
    mistakes: "Using momentum, rushing, forcing range, choosing too much resistance, or continuing through sharp pain.",
    ostomy: "Medical conditions, recent surgery, pregnancy, dizziness, chest pain, unusual shortness of breath, or new abdominal pressure require an appropriate professional review.",
  };
}

const nutritionGuides: Record<string, NutritionGuide> = {
  "Pre-workout": {
    why: "Provides comfortable energy and fluid before training. It is optional when a normal meal was eaten recently.",
    timing: "Use about 30-90 minutes before training, adjusted for the size of the feeding and personal digestion.",
    body: "Carbohydrate supports training energy and protein supplies amino acids. Total daily intake matters more than a perfect clock time.",
    bestWay: "Choose an allergy-safe, familiar food or labelled shake. Reduce the portion or allow more time if training feels uncomfortable.",
  },
  "Breakfast": {
    why: "Replaces energy after training and provides a whole-food protein feeding early in the day.",
    timing: "Eat within roughly two hours after training. Total daily intake matters more than racing a tiny post-workout window.",
    body: "A suitable protein food supports tissue repair; carbohydrate replenishes energy and helps prevent falling behind on the daily plan.",
    bestWay: "Use the generated allergy-safe substitutions and prepare animal foods to safe temperatures.",
  },
  "Smoothie": {
    why: "Adds a separate, drinkable feeding without turning the protein shakes into oversized meals.",
    timing: "Mid-morning keeps food spread across the day and creates space before lunch.",
    body: "Greek yogurt adds protein; milk adds calories and fluid; berries add carbohydrate and micronutrients.",
    bestWay: "Blend until completely smooth. Start with a tolerated berry portion and strain seeds or substitute banana if seeds cause problems.",
  },
  "Lunch": {
    why: "A repeatable meal anchors the middle of the day with protein, carbohydrate, and a tolerated vegetable.",
    timing: "About three hours after the smoothie supports steady intake without forcing one giant meal.",
    body: "Protein supplies amino acids, carbohydrate restores muscle fuel, and vegetables or fruit contribute vitamins, minerals, and other beneficial food components.",
    bestWay: "Use the generated protein choice, measure portions when useful, and prepare food to individual tolerance.",
  },
  "Snack": {
    why: "Prevents a long afternoon gap and supplies easy carbohydrate without nuts or difficult skins.",
    timing: "Use between lunch and dinner or move it earlier when appetite is better.",
    body: "The bagel and applesauce provide carbohydrate that supports total energy intake and recovery.",
    bestWay: "Choose plain, low-seed products. Divide the snack into two smaller portions if the full amount feels uncomfortable.",
  },
  "Dinner": {
    why: "Provides another substantial whole-food protein feeding and enough carbohydrate to finish the day's energy plan.",
    timing: "Early evening leaves time to digest before the final walk, snack, and night shake.",
    body: "Protein supports ongoing muscle repair; rice, pasta, or peeled potato restores energy; cooked vegetables provide tolerated micronutrients.",
    bestWay: "Choose an allergy-safe protein, carbohydrate, and produce option. Follow any medically required texture, fibre, sodium, or fluid guidance.",
  },
  "Evening snack": {
    why: "Adds protein and energy in a smaller feeding when the daily plan is still short.",
    timing: "Use one to two hours before bed if it does not interfere with comfort or sleep.",
    body: "A protein-rich snack supplies amino acids during the evening recovery period.",
    bestWay: "Choose the generated dairy or plant-based option and a portion that is comfortable.",
  },
  "Night shake": {
    why: "Closes the calorie gap and makes the daily mass-gainer plan consistent.",
    timing: "Take a few hours before bed if drinking it immediately before sleep feels too full. Comfort and daily consistency matter more than an exact clock time.",
    body: "Adds carbohydrate, protein, and calories that support the energy surplus and overnight availability of amino acids.",
    bestWay: "Use one label serving. Do not add a second creatine dose. Reduce or split the serving and contact your dietitian if it repeatedly causes high output or discomfort.",
  },
  "Optional second shake": {
    why: "A convenience tool for adults who cannot consistently meet the generated energy or protein plan with food.",
    timing: "Use whenever it fills a genuine gap without replacing varied meals.",
    body: "Adds labelled protein and, for mass gainers, additional carbohydrate and calories.",
    bestWay: "Follow the label, count the serving in the daily total, verify allergens, and do not assume more is better.",
  },
};

const peptideCards = [
  {
    title: "BPC-157 and TB-500",
    status: "Do not add",
    detail: "They are promoted for tissue healing, but authorized human evidence is inadequate and product purity is uncertain. Health Canada lists both among unauthorized injectable peptides that should not be bought or used.",
  },
  {
    title: "CJC-1295 and ipamorelin",
    status: "Do not add",
    detail: "These alter growth-hormone signalling. Regulators cite limited safety data, contamination and immune-reaction concerns, and serious reported adverse events. They are not a safe shortcut to mass gain.",
  },
  {
    title: "Approved peptide medicines",
    status: "Doctor only",
    detail: "Some legitimate prescriptions are peptides, but they treat diagnosed medical conditions. They should be used only when a licensed clinician selects an authorized product and monitors it.",
  },
];

const recommendedProducts = [
  ["Digital kitchen scale", "Recommended", "Makes meal portions repeatable when someone wants more accuracy than household measures."],
  ["Marked water bottle", "Recommended", "Makes fluid tracking easier. Medical fluid targets must come from the care team."],
  ["Meal-prep containers", "Recommended", "Useful for preparing several lunches and dinners without relying on takeout."],
  ["Shaker bottle", "Useful", "Convenient when protein powder is already part of the selected plan."],
  ["Food thermometer", "Recommended", "Supports safe preparation of meat, eggs, leftovers, and meal-prep food."],
  ["Oral rehydration product", "Conditional", "Use for a specific medical or endurance need—not as a universal daily drink."],
  ["Training support garment", "Ask a professional", "Medical braces and ostomy supports require individual fitting rather than guessing."],
  ["Extra BCAA/EAA powder", "Skip for now", "Usually unnecessary when daily protein needs are already met."],
  ["Second multivitamin", "Do not add", "Avoid overlapping formulas or high doses unless a clinician identifies a need."],
  ["Stimulant pre-workout", "Not needed", "Start with food, sleep, hydration, and your current plan before adding stimulants."],
];

const currentDay = () => {
  return new Intl.DateTimeFormat("en-CA", { weekday: "long" }).format(new Date());
};

function useStoredState<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(initial);
  const [ready, setReady] = useState(false);
  const initialRef = useRef(initial);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(key);
      if (stored) {
        const parsed = JSON.parse(stored) as T;
        const merged = (
          initialRef.current !== null
          && parsed !== null
          && typeof initialRef.current === "object"
          && typeof parsed === "object"
          && !Array.isArray(initialRef.current)
          && !Array.isArray(parsed)
        ) ? { ...initialRef.current, ...parsed } as T : parsed;
        setValue(merged);
      }
    } catch {
      // Keep the safe default if browser storage is unavailable.
    }
    setReady(true);
  }, [key]);

  useEffect(() => {
    if (!ready) return;
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, ready, value]);

  return [value, setValue] as const;
}

function formatQuantity(quantity: number, unit: PlannedGrocery["unit"]) {
  if (unit === "count" || unit === "servings" || unit === "packs") {
    return `${Math.ceil(quantity)} ${unit === "count" ? "" : unit}`.trim();
  }
  if (unit === "g") return `${Math.ceil(quantity / 5) * 5} g`;
  return `${quantity < 1 ? quantity.toFixed(2) : quantity.toFixed(1)} ${unit}`;
}

function formatIngredient(ingredient: RecipeIngredient, multiplier: number) {
  const quantity = ingredient.amount * multiplier;
  const precision = quantity < 1 ? 2 : quantity < 10 ? 1 : 0;
  const unit = ingredient.unit === "count"
    ? ""
    : ingredient.unit === "slice"
      ? quantity === 1 ? "slice" : "slices"
      : ingredient.unit;
  return `${Number(quantity.toFixed(precision))} ${unit}`.trim();
}

export default function Home() {
  const [section, setSection] = useState<Section>("setup");
  const [checks, setChecks] = useStoredState<CheckMap>("p220-checks", {});
  const [groceryChecks, setGroceryChecks] = useStoredState<CheckMap>("p220-grocery-checks", {});
  const [profile, setProfile] = useStoredState<UserProfile>("p220-profile", defaultProfile);
  const [draft, setDraft] = useStoredState<UserProfile>("p220-profile-draft", defaultProfile);
  const [weightKg, setWeightKg] = useStoredState("p220-current-weight-kg", defaultProfile.weightKg);
  const [water, setWater] = useStoredState("p220-water", 0);
  const [sleep, setSleep] = useStoredState("p220-sleep", 8);
  const [calorieTarget, setCalorieTarget] = useStoredState("p220-calorie-target", 2400);
  const [plannedDays, setPlannedDays] = useStoredState("p220-grocery-days", 7);
  const [weightHistory, setWeightHistory] = useStoredState<WeightEntry[]>("p220-weight-history", []);
  const [cookbookServings, setCookbookServings] = useStoredState<Record<string, number>>("p220-cookbook-servings", {});
  const [remindersEnabled, setRemindersEnabled] = useStoredState("p220-reminders-enabled", false);
  const [reminderLead, setReminderLead] = useStoredState("p220-reminder-lead", 10);
  const [progressNote, setProgressNote] = useState("");
  const [routineDay, setRoutineDay] = useState(currentDay());
  const [installPrompt, setInstallPrompt] = useState<InstallPromptEvent | null>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);

  const day = currentDay();
  const workouts = buildWorkoutWeek(profile);
  const workout = workouts[day] || workouts.Sunday;
  const routineWeek = buildRoutineWeek(profile);
  const dailyTasks = routineWeek[day] || buildDailyTasks(profile, day);
  const selectedRoutineTasks = routineWeek[routineDay] || [];
  const meals = buildMeals(profile, calorieTarget);
  const cookbook = buildCookbook(profile, calorieTarget);
  const scaledGroceries = buildGroceries(profile, plannedDays, calorieTarget);
  const warnings = planWarnings(profile);
  const dailyProtein = proteinTarget(profile);
  const unit = weightUnit(profile.units);
  const currentDisplayWeight = displayWeight(weightKg, profile.units);
  const startDisplayWeight = displayWeight(profile.weightKg, profile.units);
  const goalDisplayWeight = displayWeight(profile.goalWeightKg, profile.units);
  const checkpointStep = profile.units === "imperial" ? 5 : 2.5;
  const nextCheckpoint = profile.goalWeightKg >= profile.weightKg
    ? Math.min(goalDisplayWeight, Math.ceil((currentDisplayWeight + 0.01) / checkpointStep) * checkpointStep)
    : Math.max(goalDisplayWeight, Math.floor((currentDisplayWeight - 0.01) / checkpointStep) * checkpointStep);
  const milestoneValues = Array.from({ length: 10 }, (_, index) => profile.weightKg + ((profile.goalWeightKg - profile.weightKg) * (index + 1)) / 10);
  const trackedIds = [...dailyTasks.map((item) => item[0]), ...workout.exercises.map((_, index) => `exercise-${day}-${index}`)];
  const complete = trackedIds.filter((id) => checks[id]).length;
  const dailyScore = Math.round((complete / trackedIds.length) * 100);
  const progressDenominator = profile.goalWeightKg - profile.weightKg;
  const weightProgress = progressDenominator === 0
    ? 100
    : Math.max(0, Math.min(100, ((weightKg - profile.weightKg) / progressDenominator) * 100));
  const groceryTotal = scaledGroceries.flatMap((group) => group.items).length;
  const groceryComplete = scaledGroceries
    .flatMap((group) => group.items)
    .filter((item) => groceryChecks[item.id]).length;

  const toggle = (id: string) => {
    setChecks((previous) => ({ ...previous, [id]: !previous[id] }));
  };

  const toggleGrocery = (id: string) => {
    setGroceryChecks((previous) => ({ ...previous, [id]: !previous[id] }));
  };

  const updateDraft = <K extends keyof UserProfile>(key: K, value: UserProfile[K]) => {
    setDraft((previous) => ({ ...previous, [key]: value }));
  };

  const toggleDraftList = (
    key: "allergies" | "conditions" | "selectedFoods" | "selectedSupplements" | "dietaryPractices" | "workSchoolDays" | "routineActivities" | "wellnessPriorities",
    value: string,
  ) => {
    setDraft((previous) => ({
      ...previous,
      [key]: (previous[key] ?? []).includes(value)
        ? (previous[key] ?? []).filter((item) => item !== value)
        : [...(previous[key] ?? []), value],
    }));
  };

  const generatePlan = () => {
    const compatibleFoods = (draft.selectedFoods ?? []).filter((id) => {
      const food = foodCatalog.flatMap((group) => group.items).find((item) => item.id === id);
      return food ? foodIsCompatible(draft, food) : false;
    });
    const supplements = draft.selectedSupplements ?? [];
    const next = {
      ...draft,
      completed: true,
      selectedFoods: compatibleFoods,
      usesProteinPowder: supplements.includes("protein-powder") || supplements.includes("mass-gainer"),
      usesCreatine: supplements.includes("creatine"),
      usesMultivitamin: supplements.includes("multivitamin"),
    };
    setProfile(next);
    setWeightKg(next.weightKg);
    setCalorieTarget(estimateCalories(next));
    if (!weightHistory.length) {
      setWeightHistory([{ id: `start-${Date.now()}`, date: new Date().toISOString(), weightKg: next.weightKg, note: "Starting weight" }]);
    }
    setChecks({});
    setGroceryChecks({});
    setSection("today");
  };

  const logWeight = (photoDataUrl?: string) => {
    const entry: WeightEntry = {
      id: `weight-${Date.now()}`,
      date: new Date().toISOString(),
      weightKg,
      note: progressNote.trim() || undefined,
      photoDataUrl,
    };
    setWeightHistory((previous) => [entry, ...previous]);
    setProgressNote("");
  };

  const handleProgressPhoto = (file?: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const image = new Image();
      image.onload = () => {
        const scale = Math.min(1, 1200 / Math.max(image.width, image.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.max(1, Math.round(image.width * scale));
        canvas.height = Math.max(1, Math.round(image.height * scale));
        const context = canvas.getContext("2d");
        if (!context) return;
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        logWeight(canvas.toDataURL("image/jpeg", 0.78));
      };
      image.src = String(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const updateActivitySetting = (field: "activityTimes" | "activityDays", id: string, value: string) => {
    setDraft((previous) => ({ ...previous, [field]: { ...(previous[field] ?? {}), [id]: value } }));
  };

  const enableReminders = async () => {
    if (typeof Notification === "undefined") return;
    const permission = await Notification.requestPermission();
    setRemindersEnabled(permission === "granted");
    if (permission === "granted") {
      new Notification("Project 220 reminders are ready", { body: "Your in-app schedule reminders are enabled on this device." });
    }
  };

  const downloadRoutineCalendar = () => {
    const now = new Date();
    const mondayOffset = (8 - (now.getDay() || 7)) % 7;
    const lines = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Project 220//Routine//EN", "CALSCALE:GREGORIAN"];
    weekDays.forEach((dayName, index) => {
      const eventDate = new Date(now);
      eventDate.setDate(now.getDate() + mondayOffset + index);
      (routineWeek[dayName] || []).forEach(([id, time, title, detail]) => {
        if (!/^\d{2}:\d{2}$/.test(time)) return;
        const [hours, minutes] = time.split(":").map(Number);
        const start = new Date(eventDate);
        start.setHours(hours, minutes, 0, 0);
        const end = new Date(start.getTime() + 30 * 60 * 1000);
        const stamp = (value: Date) => value.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
        lines.push(
          "BEGIN:VEVENT",
          `UID:${id}-${start.getTime()}@project220`,
          `DTSTAMP:${stamp(now)}`,
          `DTSTART:${stamp(start)}`,
          `DTEND:${stamp(end)}`,
          `SUMMARY:${title.replaceAll(",", "\\,")}`,
          `DESCRIPTION:${detail.replaceAll(",", "\\,")}`,
          "BEGIN:VALARM",
          `TRIGGER:-PT${reminderLead}M`,
          "ACTION:DISPLAY",
          `DESCRIPTION:Project 220 - ${title.replaceAll(",", "\\,")}`,
          "END:VALARM",
          "END:VEVENT",
        );
      });
    });
    lines.push("END:VCALENDAR");
    const blob = new Blob([lines.join("\r\n")], { type: "text/calendar;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "project-220-routine.ics";
    link.click();
    URL.revokeObjectURL(link.href);
  };

  const installApp = async () => {
    if (!installPrompt) return;
    await installPrompt.prompt();
    await installPrompt.userChoice;
    setInstallPrompt(null);
  };

  const formattedDate = new Intl.DateTimeFormat("en-CA", {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(new Date());

  useEffect(() => {
    if (!remindersEnabled || typeof Notification === "undefined" || Notification.permission !== "granted") return;
    const now = new Date();
    const reminderTasks = buildDailyTasks(profile, currentDay());
    const timers = reminderTasks.flatMap(([, time, title, detail]) => {
      if (!/^\d{2}:\d{2}$/.test(time)) return [];
      const [hours, minutes] = time.split(":").map(Number);
      const alertAt = new Date(now);
      alertAt.setHours(hours, minutes - reminderLead, 0, 0);
      const delay = alertAt.getTime() - now.getTime();
      if (delay <= 0 || delay > 24 * 60 * 60 * 1000) return [];
      return [window.setTimeout(() => {
        const message = title.toLowerCase().includes("training")
          ? `${motivationQuotes[Math.floor(Math.random() * motivationQuotes.length)]} ${detail}`
          : detail;
        new Notification(`Project 220 - ${title}`, { body: message, icon: "./icon.svg" });
      }, delay)];
    });
    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [profile, reminderLead, remindersEnabled]);

  useEffect(() => {
    const capture = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event as InstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", capture);
    return () => window.removeEventListener("beforeinstallprompt", capture);
  }, []);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("./sw.js").catch(() => {
        // Online use remains available when offline installation is unsupported.
      });
    }
  }, []);

  return (
    <div className="app-shell">
      <header className="topbar">
        <button className="brand" onClick={() => setSection(profile.completed ? "today" : "setup")} aria-label="Project 220 home">
          <span className="brand-mark">220</span>
          <span>
            <strong>PROJECT 220</strong>
            <small>Health & Fitness</small>
          </span>
        </button>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <button key={item.id} className={section === item.id ? "active" : ""} onClick={() => setSection(item.id)}>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="profile-chip">
          <span className="status-dot" />
          <span>
            <small>{profile.completed ? "MY PLAN" : "START HERE"}</small>
            <strong>{profile.completed ? `${profile.name || "My"} · ${profile.goal}` : "Create a personal plan"}</strong>
          </span>
        </div>
      </header>

      <main>
        {section === "setup" && (
          <section className="content-page">
            <div className="page-heading compact">
              <div>
                <p className="eyebrow">PUBLIC PERSONAL PLAN GENERATOR</p>
                <h1>{profile.completed ? "Update my plan" : "Build my Project 220 plan"}</h1>
                <p>Answer the questions once. Project 220 will generate a starter workout, meal schedule, measured cookbook, product guide, daily routine, reminders, and automatic grocery list.</p>
              </div>
              {profile.completed && (
                <div className="day-badge"><small>PLAN STATUS</small><strong>Generated</strong></div>
              )}
            </div>

            <div className="privacy-strip">
              <strong>Your answers stay on this device.</strong>
              <span>No account is required. This generator supports planning and education; it does not diagnose conditions or replace medical care.</span>
            </div>

            <div className="builder-grid">
              <section className="builder-card">
                <div className="builder-card-heading"><span>01</span><div><strong>About you</strong><small>Used for units and a starter energy estimate</small></div></div>
                <div className="form-grid">
                  <label className="field span-2">First name
                    <input value={draft.name} onChange={(event) => updateDraft("name", event.target.value)} placeholder="Your name" />
                  </label>
                  <label className="field">Age
                    <input type="number" min="13" max="100" value={draft.age} onChange={(event) => updateDraft("age", Number(event.target.value))} />
                  </label>
                  <label className="field">Units
                    <select value={draft.units} onChange={(event) => updateDraft("units", event.target.value as UserProfile["units"])}>
                      <option value="imperial">Imperial (lb / ft)</option>
                      <option value="metric">Metric (kg / cm)</option>
                    </select>
                  </label>
                  <label className="field">Gender identity
                    <select value={draft.genderIdentity} onChange={(event) => updateDraft("genderIdentity", event.target.value)}>
                      {genderOptions.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                    </select>
                  </label>
                  <label className="field">Pronouns (optional)
                    <input value={draft.pronouns} onChange={(event) => updateDraft("pronouns", event.target.value)} placeholder="she/her, he/him, they/them" />
                  </label>
                  {draft.genderIdentity === "another" && (
                    <label className="field span-2">How would you describe your identity?
                      <input value={draft.genderIdentityOther} onChange={(event) => updateDraft("genderIdentityOther", event.target.value)} />
                    </label>
                  )}
                  <label className="field span-2">Sex used only for the calorie equation
                    <select value={draft.sexForEstimate} onChange={(event) => updateDraft("sexForEstimate", event.target.value as UserProfile["sexForEstimate"])}>
                      <option value="unspecified">Use a midpoint estimate</option>
                      <option value="male">Male equation</option>
                      <option value="female">Female equation</option>
                    </select>
                    <small>This optional physiological input is separate from gender identity. Choose midpoint if neither binary equation fits or you prefer not to answer.</small>
                  </label>
                  {draft.units === "imperial" ? (
                    <>
                      <label className="field">Height — feet
                        <input
                          type="number"
                          min="4"
                          max="7"
                          value={Math.floor((draft.heightCm / 2.54) / 12)}
                          onChange={(event) => {
                            const inches = draft.heightCm / 2.54;
                            updateDraft("heightCm", (Number(event.target.value) * 12 + (inches % 12)) * 2.54);
                          }}
                        />
                      </label>
                      <label className="field">Height — inches
                        <input
                          type="number"
                          min="0"
                          max="11.9"
                          step="0.5"
                          value={Number(((draft.heightCm / 2.54) % 12).toFixed(1))}
                          onChange={(event) => {
                            const feet = Math.floor((draft.heightCm / 2.54) / 12);
                            updateDraft("heightCm", (feet * 12 + Number(event.target.value)) * 2.54);
                          }}
                        />
                      </label>
                    </>
                  ) : (
                    <label className="field span-2">Height — centimetres
                      <input type="number" min="120" max="230" value={Math.round(draft.heightCm)} onChange={(event) => updateDraft("heightCm", Number(event.target.value))} />
                    </label>
                  )}
                  <label className="field">Current weight ({weightUnit(draft.units)})
                    <input
                      type="number"
                      min="35"
                      max="700"
                      step="0.1"
                      value={Number(displayWeight(draft.weightKg, draft.units).toFixed(1))}
                      onChange={(event) => updateDraft("weightKg", draft.units === "imperial" ? Number(event.target.value) / 2.2046226218 : Number(event.target.value))}
                    />
                  </label>
                  <label className="field">Goal weight ({weightUnit(draft.units)})
                    <input
                      type="number"
                      min="35"
                      max="700"
                      step="0.1"
                      value={Number(displayWeight(draft.goalWeightKg, draft.units).toFixed(1))}
                      onChange={(event) => updateDraft("goalWeightKg", draft.units === "imperial" ? Number(event.target.value) / 2.2046226218 : Number(event.target.value))}
                    />
                  </label>
                </div>
              </section>

              <section className="builder-card">
                <div className="builder-card-heading"><span>02</span><div><strong>Training</strong><small>Controls the schedule, exercise selection, and starting volume</small></div></div>
                <div className="form-grid">
                  <label className="field">Primary goal
                    <select value={draft.goal} onChange={(event) => updateDraft("goal", event.target.value as UserProfile["goal"])}>
                      <option value="gain">Gain muscle and weight</option>
                      <option value="maintain">Maintain and get stronger</option>
                      <option value="lose">Lose weight while preserving muscle</option>
                    </select>
                  </label>
                  <label className="field">Daily activity
                    <select value={draft.activity} onChange={(event) => updateDraft("activity", event.target.value as UserProfile["activity"])}>
                      <option value="sedentary">Mostly seated</option>
                      <option value="light">Lightly active</option>
                      <option value="moderate">Active most days</option>
                      <option value="high">Very physical work or sport</option>
                    </select>
                  </label>
                  <label className="field">Experience
                    <select value={draft.experience} onChange={(event) => updateDraft("experience", event.target.value as UserProfile["experience"])}>
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                  </label>
                  <label className="field">Preferred training days
                    <input type="number" min="2" max="6" value={draft.trainingDays} onChange={(event) => updateDraft("trainingDays", Number(event.target.value))} />
                  </label>
                  <label className="field">Equipment
                    <select value={draft.equipment} onChange={(event) => updateDraft("equipment", event.target.value as UserProfile["equipment"])}>
                      <option value="gym">Gym machines</option>
                      <option value="home">Dumbbells / home gym</option>
                      <option value="bodyweight">Bodyweight only</option>
                    </select>
                  </label>
                  <label className="field">Best workout time
                    <select value={draft.workoutTime} onChange={(event) => updateDraft("workoutTime", event.target.value as UserProfile["workoutTime"])}>
                      <option value="morning">Morning</option>
                      <option value="afternoon">Afternoon</option>
                      <option value="evening">Evening</option>
                    </select>
                  </label>
                  <label className="field">Preferred workout clock time
                    <input type="time" value={draft.workoutClock} onChange={(event) => updateDraft("workoutClock", event.target.value)} />
                  </label>
                </div>
              </section>

              <section className="builder-card">
                <div className="builder-card-heading"><span>03</span><div><strong>Food and supplements</strong><small>Controls substitutions, meal choices, and the grocery list</small></div></div>
                <div className="form-grid">
                  <label className="field span-2">Eating style
                    <select value={draft.diet} onChange={(event) => updateDraft("diet", event.target.value as UserProfile["diet"])}>
                      <option value="omnivore">Omnivore</option>
                      <option value="pescatarian">Pescatarian</option>
                      <option value="vegetarian">Vegetarian</option>
                      <option value="vegan">Vegan</option>
                    </select>
                  </label>
                  <div className="field span-2"><span>Allergies or exclusions</span>
                    <div className="choice-chips">
                      {["peanuts", "tree-nuts", "dairy", "eggs", "gluten", "fish", "shellfish", "soy", "sesame"].map((item) => (
                        <button type="button" key={item} className={(draft.allergies ?? []).includes(item) ? "selected" : ""} onClick={() => toggleDraftList("allergies", item)}>{item}</button>
                      ))}
                    </div>
                  </div>
                  <label className="field span-2">Foods you dislike or avoid
                    <input value={draft.dislikedFoods} onChange={(event) => updateDraft("dislikedFoods", event.target.value)} placeholder="Example: tuna, mushrooms" />
                  </label>
                  <div className="field span-2"><span>Products you already use</span>
                    <div className="choice-chips">
                      <button type="button" className={(draft.selectedSupplements ?? []).includes("protein-powder") ? "selected" : ""} onClick={() => toggleDraftList("selectedSupplements", "protein-powder")}>Protein powder</button>
                      <button type="button" className={(draft.selectedSupplements ?? []).includes("creatine") ? "selected" : ""} onClick={() => toggleDraftList("selectedSupplements", "creatine")}>Creatine</button>
                      <button type="button" className={(draft.selectedSupplements ?? []).includes("multivitamin") ? "selected" : ""} onClick={() => toggleDraftList("selectedSupplements", "multivitamin")}>Multivitamin</button>
                    </div>
                  </div>
                </div>
              </section>

              <section className="builder-card">
                <div className="builder-card-heading"><span>04</span><div><strong>Health and daily life</strong><small>Triggers safety notes and adapts the routine</small></div></div>
                <div className="form-grid">
                  <div className="field span-2"><span>Health considerations</span>
                    <div className="choice-chips">
                      {[
                        ["ostomy", "Ostomy"],
                        ["diabetes", "Diabetes"],
                        ["heart", "Heart condition"],
                        ["kidney", "Kidney condition"],
                        ["pregnancy", "Pregnancy / postpartum"],
                        ["injury", "Pain or injury"],
                      ].map(([value, label]) => (
                        <button type="button" key={value} className={draft.conditions.includes(value) ? "selected" : ""} onClick={() => toggleDraftList("conditions", value)}>{label}</button>
                      ))}
                    </div>
                  </div>
                  <label className="field span-2">Daily dog walks
                    <input type="number" min="0" max="4" value={draft.dogWalks} onChange={(event) => updateDraft("dogWalks", Number(event.target.value))} />
                  </label>
                </div>
                <div className="builder-safety">
                  <strong>When professional review comes first</strong>
                  <p>Minors, pregnancy/postpartum, eating disorders, significant medical conditions, recent surgery, unexplained weight change, or symptoms during exercise require a qualified clinician before following an automated plan.</p>
                </div>
              </section>

              <section className="builder-card span-full">
                <div className="builder-card-heading"><span>05</span><div><strong>Foods I enjoy</strong><small>The meal plan, cookbook, and grocery list use these choices</small></div></div>
                <div className="form-grid compact-form">
                  <label className="field">Meals and snacks per day
                    <input type="number" min="3" max="8" value={draft.mealsPerDay} onChange={(event) => updateDraft("mealsPerDay", Number(event.target.value))} />
                  </label>
                  <label className="field">Cooking preference
                    <select value={draft.cookingStyle} onChange={(event) => updateDraft("cookingStyle", event.target.value as UserProfile["cookingStyle"])}>
                      <option value="quick">Fast and simple</option><option value="balanced">Fresh plus easy meals</option><option value="batch">Batch cook and freeze</option>
                    </select>
                  </label>
                  <div className="field span-2"><span>Dietary or cultural practices (optional)</span>
                    <div className="choice-chips">
                      {[["halal", "Halal"], ["kosher", "Kosher"], ["low-lactose", "Low lactose"], ["skinless", "Skinless meat"], ["peeled-produce", "Peeled produce"], ["soft-texture", "Soft / cooked texture"]].map(([id, label]) => (
                        <button type="button" key={id} className={(draft.dietaryPractices ?? []).includes(id) ? "selected" : ""} onClick={() => toggleDraftList("dietaryPractices", id)}>{label}</button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="food-catalog">
                  {foodCatalog.map((group) => (
                    <section key={group.title}>
                      <h3>{group.title}</h3><p>{group.description}</p>
                      <div className="choice-chips food-options">
                        {group.items.map((food) => {
                          const compatible = foodIsCompatible(draft, food);
                          return (
                            <button type="button" key={food.id} disabled={!compatible} title={!compatible ? "Unavailable because of your eating style or allergy choices" : ""} className={(draft.selectedFoods ?? []).includes(food.id) ? "selected" : ""} onClick={() => toggleDraftList("selectedFoods", food.id)}>
                              {food.label}
                            </button>
                          );
                        })}
                      </div>
                    </section>
                  ))}
                </div>
                <label className="field custom-entry">Other foods or culturally important staples
                  <input value={draft.customFoods} onChange={(event) => updateDraft("customFoods", event.target.value)} placeholder="Add foods that are not listed" />
                </label>
              </section>

              <section className="builder-card span-full">
                <div className="builder-card-heading"><span>06</span><div><strong>Supplements, vitamins, and multivitamins</strong><small>Select what you use or want explained; selection is not a recommendation</small></div></div>
                <div className="supplement-selector">
                  {supplementOptions.map((item) => (
                    <button type="button" key={item.id} className={(draft.selectedSupplements ?? []).includes(item.id) ? "selected" : ""} onClick={() => toggleDraftList("selectedSupplements", item.id)}>
                      <strong>{item.name}</strong><span>{item.use}</span>
                    </button>
                  ))}
                </div>
                <label className="field custom-entry">Other product
                  <input value={draft.customSupplements} onChange={(event) => updateDraft("customSupplements", event.target.value)} placeholder="Brand or product name; always check the full label" />
                </label>
                <div className="builder-safety"><strong>Selection does not set a vitamin dose.</strong><p>Needs depend on age, diet, pregnancy, blood work, health conditions, and medications. The generated guide explains purpose and timing, then flags products that need pharmacist or clinician review.</p></div>
              </section>

              <section className="builder-card span-full">
                <div className="builder-card-heading"><span>07</span><div><strong>Work, school, family, and daily life</strong><small>The weekly routine places fitness around your real commitments</small></div></div>
                <div className="form-grid">
                  <label className="field">Wake time<input type="time" value={draft.wakeTime} onChange={(event) => updateDraft("wakeTime", event.target.value)} /></label>
                  <label className="field">Bedtime<input type="time" value={draft.bedTime} onChange={(event) => updateDraft("bedTime", event.target.value)} /></label>
                  <label className="field">Regular commitment
                    <select value={draft.workSchoolMode} onChange={(event) => updateDraft("workSchoolMode", event.target.value as UserProfile["workSchoolMode"])}>
                      <option value="none">No fixed work or school hours</option><option value="work">Work</option><option value="school">School / study</option><option value="both">Work and school</option>
                    </select>
                  </label>
                  <label className="field">Start time<input type="time" value={draft.workStart} onChange={(event) => updateDraft("workStart", event.target.value)} /></label>
                  <label className="field">End time<input type="time" value={draft.workEnd} onChange={(event) => updateDraft("workEnd", event.target.value)} /></label>
                  <div className="field span-2"><span>Work or school days</span>
                    <div className="choice-chips">{weekDays.map((name) => <button type="button" key={name} className={(draft.workSchoolDays ?? []).includes(name) ? "selected" : ""} onClick={() => toggleDraftList("workSchoolDays", name)}>{name.slice(0, 3)}</button>)}</div>
                  </div>
                  <label className="field">Dog walks per day<input type="number" min="0" max="6" value={draft.dogWalks} onChange={(event) => updateDraft("dogWalks", Number(event.target.value))} /></label>
                  <div className="field span-2 dog-time-grid"><span>Dog-walk times</span>
                    {Array.from({ length: Math.max(0, draft.dogWalks) }, (_, index) => (
                      <label key={index}>Walk {index + 1}<input type="time" value={(draft.dogWalkTimes ?? [])[index] || ["07:00", "13:00", "19:00", "21:30"][index] || "12:00"} onChange={(event) => {
                        const times = [...(draft.dogWalkTimes ?? [])];
                        times[index] = event.target.value;
                        updateDraft("dogWalkTimes", times);
                      }} /></label>
                    ))}
                  </div>
                </div>
                <div className="routine-selector">
                  <h3>Other activities to schedule</h3>
                  <div className="choice-chips">{routineActivityCatalog.map((item) => <button type="button" key={item.id} className={(draft.routineActivities ?? []).includes(item.id) ? "selected" : ""} onClick={() => toggleDraftList("routineActivities", item.id)}>{item.label}</button>)}</div>
                  {(draft.routineActivities ?? []).map((id) => {
                    const item = routineActivityCatalog.find((entry) => entry.id === id);
                    if (!item) return null;
                    return (
                      <div className="activity-config" key={id}>
                        <div><strong>{item.label}</strong><small>{item.detail}</small></div>
                        <input aria-label={`${item.label} time`} type="time" value={draft.activityTimes?.[id] || item.defaultTime} onChange={(event) => updateActivitySetting("activityTimes", id, event.target.value)} />
                        <select aria-label={`${item.label} days`} value={draft.activityDays?.[id] || item.defaultDay} onChange={(event) => updateActivitySetting("activityDays", id, event.target.value)}>
                          <option value="daily">Every day</option><option value="weekdays">Weekdays</option><option value="weekends">Weekends</option>{weekDays.map((name) => <option key={name} value={name}>{name}</option>)}
                        </select>
                      </div>
                    );
                  })}
                </div>
              </section>
            </div>

            <div className="generate-panel">
              <div>
                <small>YOUR STARTER ESTIMATE</small>
                <strong>{estimateCalories(draft).toLocaleString()} kcal/day · {proteinTarget(draft)} g protein/day</strong>
                <span>Editable after generation. These are planning estimates, not prescriptions.</span>
              </div>
              <button onClick={generatePlan}>Generate my complete plan</button>
            </div>
          </section>
        )}

        {section === "today" && (
          <>
            <section className="page-heading">
              <div>
                <p className="eyebrow">{formattedDate}</p>
                <h1>Good morning{profile.name ? `, ${profile.name}` : ""}.</h1>
                <p>Your plan is generated from your goal, age, experience, schedule, equipment, and food needs.</p>
              </div>
              <div className="day-badge">
                <small>TODAY&apos;S FOCUS</small>
                <strong>{workout.title}</strong>
              </div>
            </section>

            <section className="dashboard-grid">
              <article className="card weight-card">
                <div className="card-label">BODY WEIGHT</div>
                <div className="weight-row">
                  <div><strong>{currentDisplayWeight.toFixed(1)}</strong><span>{unit}</span></div>
                  <label>
                    Update
                    <input
                      type="number"
                      min="35"
                      max="700"
                      step="0.1"
                      value={Number(currentDisplayWeight.toFixed(1))}
                      onChange={(event) => setWeightKg(profile.units === "imperial" ? Number(event.target.value) / 2.2046226218 : Number(event.target.value))}
                    />
                  </label>
                </div>
                <div className="progress-track" aria-label={`${Math.round(weightProgress)} percent to goal`}>
                  <span style={{ width: `${weightProgress}%` }} />
                </div>
                <div className="progress-labels"><span>Start {startDisplayWeight.toFixed(1)}</span><span>Goal {goalDisplayWeight.toFixed(1)}</span></div>
                <div className="milestone-note"><span>Next checkpoint</span><strong>{nextCheckpoint.toFixed(1)} {unit}</strong></div>
              </article>

              <article className="card workout-card">
                <div className="card-heading">
                  <div><div className="card-label">TODAY&apos;S WORKOUT</div><h2>{workout.title}</h2><p>{workout.focus}</p></div>
                  <button className="text-button" onClick={() => setSection("training")}>Open workout</button>
                </div>
                <div className="exercise-preview">
                  {workout.exercises.slice(0, 4).map((exercise, index) => {
                    const id = `exercise-${day}-${index}`;
                    return (
                      <button key={exercise[0]} className={checks[id] ? "exercise done" : "exercise"} onClick={() => toggle(id)}>
                        <span className="check">{checks[id] ? "OK" : index + 1}</span>
                        <span><strong>{exercise[0]}</strong><small>{exercise[1]} / {exercise[2]}</small></span>
                      </button>
                    );
                  })}
                </div>
              </article>

              <article className="card score-card">
                <div className="card-label">DAILY SCORE</div>
                <div className="score-ring" style={{ "--score": `${dailyScore * 3.6}deg` } as React.CSSProperties}>
                  <span><strong>{dailyScore}</strong><small>%</small></span>
                </div>
                <h3>{dailyScore >= 80 ? "Mission nearly complete" : "Keep stacking wins"}</h3>
                <p>{complete} of {trackedIds.length} tracked actions complete</p>
              </article>

              <article className="card hydration-card">
                <div className="card-heading"><div><div className="card-label">RECOVERY</div><h2>Hydration & sleep</h2></div></div>
                <div className="recovery-metrics">
                  <div>
                    <span>Water</span><strong>{water.toFixed(1)} L</strong><small>Personal target: confirm with your care team</small>
                    <div className="button-row">
                      <button onClick={() => setWater(Math.max(0, water - 0.25))}>-</button>
                      <button onClick={() => setWater(Math.min(8, water + 0.25))}>+ 250 mL</button>
                    </div>
                  </div>
                  <div>
                    <span>Sleep</span><strong>{sleep.toFixed(1)} h</strong><small>Goal: 8-9 hours</small>
                    <input className="range" type="range" min="4" max="12" step="0.5" value={sleep} onChange={(event) => setSleep(Number(event.target.value))} aria-label="Hours of sleep" />
                  </div>
                </div>
              </article>

              <article className="card quick-link-card">
                <div className="card-label">YOUR AUTOMATIC PLAN</div>
                <h2>{calorieTarget.toLocaleString()} calories · {dailyProtein} g protein</h2>
                <p>Your portions, workout schedule, routine, and grocery quantities are linked to the answers in My Plan.</p>
                <div className="quick-link-actions">
                  <button onClick={() => setSection("nutrition")}>Open diet plan</button>
                  <button onClick={() => setSection("grocery")}>Build grocery list</button>
                  <button onClick={() => setSection("setup")}>Update my answers</button>
                </div>
              </article>
            </section>

            {warnings.length > 0 && (
              <section className="safety-alert" aria-label="Plan safety notes">
                <strong>Review these safety notes before continuing</strong>
                <ul>{warnings.map((warning) => <li key={warning}>{warning}</li>)}</ul>
              </section>
            )}

            <section className="section-block">
              <div className="section-title">
                <div><p className="eyebrow">YOUR OPERATING SYSTEM</p><h2>Today&apos;s plan</h2></div>
                <span>{dailyTasks.filter((item) => checks[item[0]]).length} / {dailyTasks.length} complete</span>
              </div>
              <div className="timeline">
                {dailyTasks.map(([id, time, title, detail]) => (
                  <button key={id} className={checks[id] ? "timeline-item complete" : "timeline-item"} onClick={() => toggle(id)}>
                    <span className="timeline-time">{time}</span>
                    <span className="timeline-dot">{checks[id] ? "OK" : ""}</span>
                    <span className="timeline-copy"><strong>{title}</strong><small>{detail}</small></span>
                  </button>
                ))}
              </div>
            </section>
          </>
        )}

        {section === "training" && (
          <section className="content-page">
            <div className="page-heading compact">
              <div><p className="eyebrow">{profile.equipment.toUpperCase()} / PERSONAL STARTER PLAN</p><h1>{day}: {workout.title}</h1><p>Controlled form, 1-2 good reps in reserve, and gradual progression.</p></div>
              <div className="day-badge"><small>EXPERIENCE</small><strong>{profile.experience}</strong></div>
            </div>
            <blockquote className="motivation-banner workout-motivation"><span>COACH&apos;S WORKOUT MESSAGE</span>{motivationQuotes[new Date().getDate() % motivationQuotes.length]}</blockquote>
            <div className="training-primer">
              <div><span>01</span><strong>{profile.conditions.includes("ostomy") ? "Empty and secure the pouch" : "Check readiness"}</strong><p>{profile.conditions.includes("ostomy") ? "Use the washroom first and make sure the pouch and clothing feel secure without being compressed." : "Start only if you feel well. New pain, chest pressure, dizziness, or unusual shortness of breath means stop and seek appropriate advice."}</p></div>
              <div><span>02</span><strong>Warm up for 5-10 minutes</strong><p>Walk easily, move the shoulders and hips, then perform one light practice set of the first exercise.</p></div>
              <div><span>03</span><strong>Train, do not strain</strong><p>Finish most sets with 1-2 controlled reps left. Breathe continuously and never force a rep by bearing down.</p></div>
            </div>
            <div className="workout-table">
              <div className="workout-table-head"><span>Exercise</span><span>Starting load</span><span>Target</span><span>Done</span></div>
              {workout.exercises.map((exercise, index) => {
                const id = `exercise-${day}-${index}`;
                return (
                  <button key={exercise[0]} className={checks[id] ? "workout-row completed" : "workout-row"} onClick={() => toggle(id)}>
                    <span><strong>{exercise[0]}</strong><small>1 sec lift / 1 sec pause / 3 sec lower · {motivationQuotes[index % motivationQuotes.length]}</small></span>
                    <span>{exercise[1]}</span><span>{exercise[2]}</span><span className="row-check">{checks[id] ? "OK" : ""}</span>
                  </button>
                );
              })}
            </div>
            <div className="info-grid">
              <article className="card"><div className="card-label">PROGRESSION RULE</div><h2>Earn the increase.</h2><p>Complete every prescribed rep with controlled technique, then add the smallest available weight next time. If form breaks, stay at the same load.</p></article>
              <article className="card caution-card"><div className="card-label">INDIVIDUAL SAFETY</div><h2>{warnings.length ? "Review before progressing." : "Build gradually."}</h2><p>{warnings[0] || "Increase resistance only after every repetition is controlled and pain-free. Ask a qualified trainer to check unfamiliar movements."}</p></article>
            </div>
            <div className="section-title subheading">
              <div><p className="eyebrow">PURPOSE + FORM</p><h2>How to perform today&apos;s exercises</h2></div>
              <span>Open each exercise before your first set</span>
            </div>
            <div className="exercise-guide-list">
              {workout.exercises.map((exercise, index) => {
                const guide = guideForExercise(exercise[0]);
                return (
                  <details key={exercise[0]} className="exercise-guide">
                    <summary>
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <div><strong>{exercise[0]}</strong><small>{guide.muscles}</small></div>
                      <b>Form guide</b>
                    </summary>
                    <div className="guide-body">
                      <section><small>WHY WE DO IT</small><p>{guide.why}</p></section>
                      <section><small>SET UP</small><p>{guide.setup}</p></section>
                      <section><small>MOVEMENT</small><p>{guide.movement}</p></section>
                      <section><small>BREATHING</small><p>{guide.breathing}</p></section>
                      <section><small>COMMON MISTAKES</small><p>{guide.mistakes}</p></section>
                      <section className="ostomy-cue"><small>INDIVIDUAL SAFETY</small><p>{profile.conditions.includes("ostomy") ? guide.ostomy : "Use a pain-free range, breathe continuously, and stop for concerning symptoms. Conditions, pregnancy, recent surgery, or injury require individualized guidance."}</p></section>
                    </div>
                  </details>
                );
              })}
            </div>
          </section>
        )}

        {section === "nutrition" && (
          <section className="content-page">
            <div className="page-heading compact">
              <div><p className="eyebrow">AUTOMATIC PORTION PLANNER</p><h1>Diet plan</h1><p>Generated for a {profile.age}-year-old {profile.diet} eater with a goal to {profile.goal} weight. Allergies and selected health considerations are applied.</p></div>
            </div>

            <div className="planner-panel">
              <div>
                <label htmlFor="calorie-target">Daily planning target</label>
                <div className="number-control">
                  <input id="calorie-target" type="number" min="1500" max="5000" step="50" value={calorieTarget} onChange={(event) => setCalorieTarget(Number(event.target.value))} />
                  <span>calories</span>
                </div>
                <small>Starter estimate: {estimateCalories(profile).toLocaleString()} calories. Editable, not a prescription.</small>
              </div>
              <div>
                <span className="control-label">Starter protein target</span>
                <strong className="control-value">{dailyProtein} g / day</strong>
                <small>Generated from body weight and goal. A renal condition or medically prescribed diet requires clinician review.</small>
              </div>
              <div className="automatic-result">
                <small>PLAN FILTERS ACTIVE</small>
                <strong>{profile.allergies.length + profile.conditions.length}</strong>
                <span>allergies + health considerations</span>
              </div>
            </div>

            <div className="nutrition-summary">
              <div><small>DAILY ENERGY</small><strong>{calorieTarget.toLocaleString()} kcal estimate</strong></div>
              <div><small>PROTEIN</small><strong>{dailyProtein} g starter target</strong></div>
              <div><small>EATING STYLE</small><strong>{profile.diet}</strong></div>
              <div><small>MEAL PATTERN</small><strong>{meals.length} feedings</strong></div>
            </div>
            <div className="plan-link-strip">
              <div><strong>{(profile.selectedFoods ?? []).length} preferred foods and {(profile.selectedSupplements ?? []).length} selected products are active.</strong><span>The cookbook and grocery list rebuild automatically when this plan changes.</span></div>
              <button onClick={() => setSection("cookbook")}>Open my cookbook</button>
            </div>

            <div className="meal-list">
              {meals.map(([name, time, portion, note]) => (
                <article key={name} className="meal-row">
                  <time>{time}</time>
                  <div><strong>{name}</strong><p>{portion}</p></div>
                  <span>{note}</span>
                </article>
              ))}
            </div>

            <div className="section-title subheading">
              <div><p className="eyebrow">WHY + TIMING + BODY ROLE</p><h2>Nutrition learning guide</h2></div>
              <span>Total daily consistency comes first</span>
            </div>
            <div className="nutrition-guide-grid">
              {meals.map(([name, time, portion]) => {
                const guide = nutritionGuides[name] || nutritionGuides.Snack;
                return (
                  <details key={name} className="nutrition-guide">
                    <summary>
                      <time>{time}</time>
                      <div><strong>{name}</strong><small>{portion}</small></div>
                      <b>Why?</b>
                    </summary>
                    <div>
                      <section><small>WHY IT IS HERE</small><p>{guide.why}</p></section>
                      <section><small>BEST TIME</small><p>{guide.timing}</p></section>
                      <section><small>WHAT IT SUPPORTS</small><p>{guide.body}</p></section>
                      <section><small>BEST WAY TO USE IT</small><p>{guide.bestWay}</p></section>
                    </div>
                  </details>
                );
              })}
            </div>

            <div className="section-title subheading">
              <div><p className="eyebrow">HOW THE GENERATOR WORKS</p><h2>What changes your plan</h2></div>
            </div>
            <div className="info-grid">
              <article className="card"><div className="card-label">ENERGY</div><h2>Age, size, activity, and goal</h2><p>The app uses a standard resting-energy equation, an activity factor, and a modest goal adjustment. Real needs can differ, so adjust only from multi-week trends.</p></article>
              <article className="card"><div className="card-label">FOOD</div><h2>Eating style and exclusions</h2><p>Omnivore, vegetarian, vegan, dairy-free, egg-free, gluten-free, nut-free, and seafood-free selections change meals and the matching grocery list.</p></article>
            </div>

            <div className="medical-note">
              <strong>Use health, tolerance, and the weight trend—not one calculated number.</strong>
              <p>{warnings.length ? warnings.join(" ") : "Introduce major changes gradually. Allergic reactions, repeated digestive symptoms, rapid unexplained weight change, or a medically prescribed diet require professional care."}</p>
            </div>
          </section>
        )}

        {section === "cookbook" && (
          <section className="content-page">
            <div className="page-heading compact">
              <div><p className="eyebrow">AUTOMATIC PERSONAL COOKBOOK</p><h1>Recipes made from your food choices</h1><p>Every recipe uses the foods selected in My Plan wherever possible. Change servings to recalculate exact ingredient quantities.</p></div>
              <div className="day-badge"><small>GENERATED</small><strong>{cookbook.length} recipes</strong></div>
            </div>
            <div className="cookbook-intro">
              <div><small>SELECTED FOODS</small><strong>{(profile.selectedFoods ?? []).length}</strong><span>used to personalize recipes</span></div>
              <div><small>COOKING STYLE</small><strong>{profile.cookingStyle}</strong><span>{profile.mealsPerDay} planned feedings daily</span></div>
              <div><small>SAFETY FILTERS</small><strong>{(profile.allergies ?? []).length}</strong><span>allergies or exclusions applied</span></div>
              <button onClick={() => setSection("setup")}>Change food choices</button>
            </div>
            <div className="recipe-grid">
              {cookbook.map((recipe, index) => {
                const servings = cookbookServings[recipe.id] || recipe.servings;
                const multiplier = servings / recipe.servings;
                return (
                  <details key={recipe.id} className="recipe-card" open={index === 0}>
                    <summary>
                      <div><small>{recipe.meal}</small><h2>{recipe.title}</h2><span>{recipe.prepMinutes} min prep · {recipe.cookMinutes} min cook</span></div>
                      <b>Open recipe</b>
                    </summary>
                    <div className="recipe-body">
                      <div className="recipe-serving-control">
                        <label>Make
                          <input type="number" min="1" max="12" value={servings} onChange={(event) => setCookbookServings((previous) => ({ ...previous, [recipe.id]: Math.max(1, Math.min(12, Number(event.target.value))) }))} />
                          servings
                        </label>
                        <span>Nutrition is approximate per serving.</span>
                      </div>
                      <section><h3>Exact ingredients</h3>
                        <ul className="ingredient-list">{recipe.ingredients.map((ingredient, ingredientIndex) => <li key={`${ingredient.item}-${ingredientIndex}`}><strong>{formatIngredient(ingredient, multiplier)}</strong><span>{ingredient.item}</span></li>)}</ul>
                      </section>
                      <section><h3>Method</h3>
                        <ol>{recipe.steps.map((step, stepIndex) => <li key={step}>{stepIndex + 1}. {step}</li>)}</ol>
                      </section>
                      <div className="recipe-nutrition"><strong>Approximate nutrition</strong><span>{recipe.nutrition}</span></div>
                      <p className="recipe-note">{recipe.note}</p>
                    </div>
                  </details>
                );
              })}
            </div>
            <div className="medical-note">
              <strong>Measurements are exact; nutrition remains an estimate.</strong>
              <p>Brands, cooking losses, ripeness, and package labels change the final totals. Verify allergens every time. Medical diets, swallowing issues, eating-disorder recovery, kidney disease, diabetes, pregnancy, and ostomy-related food tolerance need individualized guidance.</p>
              <a href="https://www.canada.ca/en/health-canada/services/food-guide/eating-support/cooking/make-healthy-meals-plate.html" target="_blank" rel="noreferrer">See Health Canada&apos;s healthy plate guidance</a>
            </div>
          </section>
        )}

        {section === "grocery" && (
          <section className="content-page">
            <div className="page-heading compact">
              <div><p className="eyebrow">AUTOMATIC SHOPPING LIST</p><h1>Grocery builder</h1><p>Quantities update from the generated diet, allergies, selected supplements, calorie target, and number of shopping days.</p></div>
              <div className="day-badge"><small>CHECKED</small><strong>{groceryComplete} / {groceryTotal}</strong></div>
            </div>

            <div className="planner-panel grocery-controls">
              <div>
                <label htmlFor="planned-days">Days to shop for</label>
                <div className="number-control">
                  <input id="planned-days" type="number" min="1" max="14" step="1" value={plannedDays} onChange={(event) => setPlannedDays(Math.max(1, Math.min(14, Number(event.target.value))))} />
                  <span>days</span>
                </div>
                <small>Choose 1-14 days.</small>
              </div>
              <div>
                <span className="control-label">Current diet target</span>
                <strong className="control-value">{calorieTarget.toLocaleString()} calories</strong>
                <button className="text-button left" onClick={() => setSection("nutrition")}>Change portions</button>
              </div>
              <div>
                <span className="control-label">Applied food filters</span>
                <strong className="control-value">{profile.diet}</strong>
                <small>{profile.allergies.length ? profile.allergies.join(", ") : "No allergies selected"}</small>
              </div>
              <button className="reset-button" onClick={() => setGroceryChecks({})}>Clear all checks</button>
            </div>

            <div className="grocery-groups">
              {scaledGroceries.map((group) => (
                <section key={group.title} className="grocery-group">
                  <h2>{group.title}</h2>
                  <div>
                    {group.items.map((item) => (
                      <button key={item.id} className={groceryChecks[item.id] ? "grocery-item checked" : "grocery-item"} onClick={() => toggleGrocery(item.id)}>
                        <span className="grocery-check">{groceryChecks[item.id] ? "OK" : ""}</span>
                        <span><strong>{item.name}</strong><small>{item.note}</small></span>
                        <b>{formatQuantity(item.quantity, item.unit)}</b>
                      </button>
                    ))}
                  </div>
                </section>
              ))}
            </div>
            <div className="medical-note">
              <strong>Automatic list notes.</strong>
              <p>Quantities are rounded planning estimates and package sizes vary. Confirm every product label for allergens. Replace disliked or poorly tolerated foods with a nutritionally similar option; medically required substitutions should be reviewed by a dietitian.</p>
            </div>
          </section>
        )}

        {section === "supplements" && (
          <section className="content-page">
            <div className="page-heading compact">
              <div><p className="eyebrow">WHAT / HOW MUCH / WHEN</p><h1>Supplements & products</h1><p>Optional adult guidance. Food, training, recovery, and the daily total come before products.</p></div>
            </div>

            <div className="selected-products">
              <div className="section-title subheading"><div><p className="eyebrow">YOUR SELECTIONS</p><h2>Generated product guide</h2></div><button className="text-button" onClick={() => setSection("setup")}>Change selections</button></div>
              {(profile.selectedSupplements ?? []).length ? (
                <div className="selected-product-grid">
                  {supplementOptions.filter((item) => (profile.selectedSupplements ?? []).includes(item.id)).map((item) => (
                    <article key={item.id}>
                      <span>SELECTED - NOT AUTOMATICALLY RECOMMENDED</span><h3>{item.name}</h3><p>{item.use}</p>
                      <dl><div><dt>Best time</dt><dd>{item.timing}</dd></div><div><dt>Amount</dt><dd>{item.amount}</dd></div><div><dt>Check first</dt><dd>{item.review}</dd></div></dl>
                    </article>
                  ))}
                </div>
              ) : <div className="empty-state"><strong>No products selected.</strong><span>That is completely fine. Supplements are optional and food comes first.</span></div>}
              {profile.customSupplements && <p className="custom-product-note"><strong>Other product entered:</strong> {profile.customSupplements}. Check the complete label and review ingredients, doses, interactions, and Canadian licensing before use.</p>}
            </div>

            <div className="supplement-grid">
              {supplementCards.map((supplement, index) => (
                <article key={supplement.id} className="supplement-card">
                  <span className="supplement-number">0{index + 1}</span>
                  <div className="card-label">GENERAL GUIDANCE</div>
                  <h2>{supplement.name}</h2>
                  <dl>
                    <div><dt>Amount</dt><dd>{supplement.amount}</dd></div>
                    <div><dt>Timing</dt><dd>{supplement.timing}</dd></div>
                  </dl>
                  <p>{supplement.note}</p>
                  <div className="supplement-effect"><strong>What it does in the body</strong><p>{supplement.effect}</p></div>
                  <a href={supplement.link} target="_blank" rel="noreferrer">{supplement.label}</a>
                </article>
              ))}
            </div>

            <div className="medical-note strong-note">
              <strong>Important before combining products.</strong>
              <p>Bring photos of every label to a physician, dietitian, or pharmacist when you have medical conditions, take prescriptions, are pregnant, are under 18, or use multiple formulas. Do not double doses to make up for a missed day.</p>
            </div>
            <div className="source-links">
              <a href="https://www.canada.ca/en/health-canada/services/drugs-health-products/natural-health-products-canada.html" target="_blank" rel="noreferrer">Health Canada: natural health products</a>
              <a href="https://www.canada.ca/en/health-canada/services/drugs-health-products/natural-non-prescription/applications-submissions/product-licensing/licensed-natural-health-products-database.html" target="_blank" rel="noreferrer">Look up a Canadian NPN or DIN-HM</a>
              <a href="https://ods.od.nih.gov/factsheets/list-all/" target="_blank" rel="noreferrer">NIH supplement fact sheets</a>
            </div>

            <section className="peptide-decision">
              <div className="peptide-heading">
                <div><p className="eyebrow">PEPTIDE DECISION</p><h2>Stick with the foundation.</h2></div>
                <span>Coach recommendation: do not add bodybuilding or recovery peptides.</span>
              </div>
              <p className="peptide-intro">For general muscle gain or recovery, the expected benefit of unauthorized peptides does not justify the uncertainty or risk. Give measurable training, nutrition, sleep, and recovery habits time to work before discussing any legitimate prescription treatment for a diagnosed condition.</p>
              <div className="peptide-grid">
                {peptideCards.map((peptide) => (
                  <article key={peptide.title}>
                    <span>{peptide.status}</span>
                    <h3>{peptide.title}</h3>
                    <p>{peptide.detail}</p>
                  </article>
                ))}
              </div>
              <div className="peptide-next-step">
                <strong>What to do instead</strong>
                <p>Track food intake, body-weight trend, gym performance, hydration, sleep, and symptoms. If progress does not match the goal despite consistent use, review the plan with a qualified professional. Do not buy products labelled &quot;research use only&quot; or inject anything without a Canadian DIN and a prescription from a licensed clinician.</p>
                <a href="https://recalls-rappels.canada.ca/en/alert-recall/think-twice-injecting-peptides-bought-online-unauthorized-products-can-seriously-harm" target="_blank" rel="noreferrer">Read Health Canada&apos;s peptide warning</a>
              </div>
            </section>

            <div className="section-title subheading">
              <div><p className="eyebrow">RECOMMENDED SUPPORT PRODUCTS</p><h2>What helps - and what can wait</h2></div>
            </div>
            <div className="product-list">
              {recommendedProducts.map(([name, status, detail]) => (
                <article key={name}>
                  <span className={`product-status ${status.toLowerCase().replaceAll(" ", "-")}`}>{status}</span>
                  <div><strong>{name}</strong><p>{detail}</p></div>
                </article>
              ))}
            </div>
          </section>
        )}

        {section === "progress" && (
          <section className="content-page">
            <div className="page-heading compact">
              <div><p className="eyebrow">MEASURE THE TREND</p><h1>Progress command center</h1><p>Track body weight, consistency, and strength without judging progress from one day.</p></div>
            </div>
            <div className="progress-capture">
              <button className="weight-camera" onClick={() => photoInputRef.current?.click()}>
                <small>CURRENT WEIGHT - TAP TO ADD PHOTO</small>
                <strong>{currentDisplayWeight.toFixed(1)} {unit}</strong>
                <span>Take a progress picture or choose one from this device</span>
              </button>
              <div className="progress-entry-form">
                <label>Weight ({unit})
                  <input type="number" min="20" max="700" step="0.1" value={Number(currentDisplayWeight.toFixed(1))} onChange={(event) => setWeightKg(profile.units === "imperial" ? Number(event.target.value) / 2.2046226218 : Number(event.target.value))} />
                </label>
                <label>Note (optional)<input value={progressNote} onChange={(event) => setProgressNote(event.target.value)} placeholder="Energy, milestone, or how the week felt" /></label>
                <div><button onClick={() => photoInputRef.current?.click()}>Take or choose photo</button><button className="secondary-button" onClick={() => logWeight()}>Log weight only</button></div>
              </div>
              <input ref={photoInputRef} className="visually-hidden" type="file" accept="image/*" capture="environment" onChange={(event) => {
                handleProgressPhoto(event.target.files?.[0]);
                event.currentTarget.value = "";
              }} />
            </div>
            <div className="privacy-strip photo-privacy"><strong>Photo privacy</strong><span>Progress photos stay in this browser on this device. They are not uploaded, shared, or included in the grocery or health-plan generator.</span></div>
            <div className="milestone-grid">
              {milestoneValues.map((targetKg, index) => {
                const reached = profile.goalWeightKg >= profile.weightKg ? weightKg >= targetKg : weightKg <= targetKg;
                return (
                <div key={index} className={reached ? "milestone reached" : "milestone"}>
                  <span>{reached ? "OK" : ""}</span><strong>{displayWeight(targetKg, profile.units).toFixed(profile.units === "imperial" ? 0 : 1)}</strong><small>{unit.toUpperCase()}</small>
                </div>
                );
              })}
            </div>
            <div className="section-title subheading"><div><p className="eyebrow">WEIGHT + PHOTO HISTORY</p><h2>Your progress timeline</h2></div><span>{weightHistory.length} entries saved on this device</span></div>
            {weightHistory.length ? (
              <div className="progress-gallery">
                {weightHistory.map((entry) => (
                  <article key={entry.id}>
                    {/* Device-local data URLs are user-selected progress records, not optimized site assets. */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    {entry.photoDataUrl ? <img src={entry.photoDataUrl} alt={`Progress recorded ${new Date(entry.date).toLocaleDateString()}`} /> : <div className="no-photo">WEIGHT LOG</div>}
                    <div><strong>{displayWeight(entry.weightKg, profile.units).toFixed(1)} {unit}</strong><time>{new Date(entry.date).toLocaleDateString()}</time>{entry.note && <p>{entry.note}</p>}</div>
                  </article>
                ))}
              </div>
            ) : <div className="empty-state"><strong>No progress entries yet.</strong><span>Tap the weight card to take your first private progress photo.</span></div>}
            <div className="baseline-grid">
              {Object.entries(workouts).slice(0, 6).map(([workoutDay, planned]) => (
                <article key={workoutDay} className="baseline-card">
                  <small>{workoutDay}</small><div><strong>{planned.title}</strong></div><p>{planned.focus} · {planned.exercises.length} movements</p>
                </article>
              ))}
            </div>
          </section>
        )}

        {section === "routine" && (
          <section className="content-page">
            <div className="page-heading compact">
              <div><p className="eyebrow">ONE WORKOUT / ONE MEAL / ONE DAY</p><h1>Weekly routine and reminders</h1><p>Your generated schedule works around training, meals, recovery, work, school, family, pets, sports, and social time.</p></div>
            </div>
            <div className="reminder-center">
              <div><small>REMINDER CENTER</small><h2>Stay on schedule without living in the app.</h2><p>In-app reminders work while Project 220 is open. Download the calendar to receive dependable device alarms even when it is closed.</p></div>
              <label>Remind me before each item
                <select value={reminderLead} onChange={(event) => setReminderLead(Number(event.target.value))}><option value="0">At start time</option><option value="5">5 minutes before</option><option value="10">10 minutes before</option><option value="15">15 minutes before</option><option value="30">30 minutes before</option><option value="60">1 hour before</option></select>
              </label>
              <div className="reminder-actions">
                <button onClick={enableReminders}>{remindersEnabled ? "Notifications enabled" : "Enable notifications"}</button>
                <button className="secondary-button" onClick={downloadRoutineCalendar}>Download calendar alarms</button>
              </div>
              <span className="reminder-note">iPhone/iPad: open the downloaded calendar file and add its events. Android, Windows, and Mac: import it into your preferred calendar. Browser permission and operating-system notification settings still apply.</span>
            </div>
            <blockquote className="motivation-banner"><span>COACH&apos;S MESSAGE</span>{motivationQuotes[weekDays.indexOf(routineDay) % motivationQuotes.length]}</blockquote>
            <div className="day-tabs" role="tablist" aria-label="Routine day">
              {weekDays.map((name) => <button role="tab" aria-selected={routineDay === name} key={name} className={routineDay === name ? "active" : ""} onClick={() => setRoutineDay(name)}>{name.slice(0, 3)}</button>)}
            </div>
            <div className="routine-board">
              {selectedRoutineTasks.map(([id, time, title, detail]) => (
                <button key={id} className={checks[id] ? "routine-row checked" : "routine-row"} onClick={() => toggle(id)}>
                  <time>{time}</time><span className="routine-check">{checks[id] ? "OK" : ""}</span><span><strong>{title}</strong><small>{detail}</small></span>
                </button>
              ))}
            </div>
          </section>
        )}

        {section === "install" && (
          <section className="content-page">
            <div className="page-heading compact">
              <div><p className="eyebrow">ONE APP / EVERY DEVICE</p><h1>Install Project 220</h1><p>Use the same mobile-friendly app on Windows, Mac, iPhone, iPad, Android phones, and Android tablets.</p></div>
            </div>
            <div className="install-hero">
              <div><span className="brand-mark">220</span><div><small>INSTALLABLE WEB APP</small><h2>Fast, full-screen, and available offline</h2><p>Visit once while online, install it, and the core app will open without a connection. Your plan, checklists, weight entries, and progress pictures remain stored on that device.</p></div></div>
              {installPrompt ? <button onClick={installApp}>Install Project 220 now</button> : <span>Use the instructions for your device below.</span>}
            </div>
            <div className="install-grid">
              <article><span>01</span><h3>iPhone or iPad</h3><ol><li>Open this site in Safari.</li><li>Tap Share.</li><li>Tap Add to Home Screen.</li><li>Turn on Open as Web App, then tap Add.</li></ol></article>
              <article><span>02</span><h3>Android phone or tablet</h3><ol><li>Open this site in Chrome.</li><li>Tap the menu.</li><li>Choose Install app or Add to Home screen.</li><li>Confirm Install.</li></ol></article>
              <article><span>03</span><h3>Windows computer</h3><ol><li>Open in Edge or Chrome.</li><li>Choose Apps / Install Project 220 from the browser menu or address bar.</li><li>Confirm Install.</li><li>Pin it to Start or the taskbar if desired.</li></ol></article>
              <article><span>04</span><h3>Mac computer</h3><ol><li>Open in Safari or Chrome.</li><li>Safari: File, then Add to Dock. Chrome: choose Install from the menu.</li><li>Confirm the app name.</li><li>Launch it from the Dock or Applications.</li></ol></article>
            </div>
            <div className="offline-card"><strong>Offline and private by design</strong><p>The app shell is cached after the first successful visit. Personal data is stored separately on each device, so it does not automatically sync. Export or cloud sync is not enabled in this release, and clearing browser data can remove local records.</p></div>
          </section>
        )}
      </main>

      <nav className="mobile-nav" aria-label="Mobile navigation">
        {navItems.map((item) => (
          <button key={item.id} className={section === item.id ? "active" : ""} onClick={() => setSection(item.id)}>
            <span className="mobile-icon">{item.short}</span>{item.label}
          </button>
        ))}
      </nav>
    </div>
  );
}
