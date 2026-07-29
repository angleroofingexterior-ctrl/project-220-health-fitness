export type Goal = "gain" | "maintain" | "lose";
export type Units = "imperial" | "metric";
export type Equipment = "gym" | "home" | "bodyweight";
export type DietStyle = "omnivore" | "vegetarian" | "vegan";
export type Experience = "beginner" | "intermediate" | "advanced";
export type Activity = "sedentary" | "light" | "moderate" | "high";
export type SexForEstimate = "male" | "female" | "unspecified";

export type UserProfile = {
  completed: boolean;
  name: string;
  age: number;
  sexForEstimate: SexForEstimate;
  units: Units;
  heightCm: number;
  weightKg: number;
  goalWeightKg: number;
  goal: Goal;
  activity: Activity;
  experience: Experience;
  trainingDays: number;
  equipment: Equipment;
  workoutTime: "morning" | "afternoon" | "evening";
  diet: DietStyle;
  allergies: string[];
  conditions: string[];
  dislikedFoods: string;
  dogWalks: number;
  usesProteinPowder: boolean;
  usesCreatine: boolean;
  usesMultivitamin: boolean;
};

export type PlannedExercise = [name: string, load: string, target: string];
export type PlannedWorkout = {
  title: string;
  focus: string;
  exercises: PlannedExercise[];
};
export type PlannedMeal = [name: string, time: string, portion: string, note: string];
export type PlannedTask = [id: string, time: string, title: string, detail: string];
export type PlannedGrocery = {
  id: string;
  name: string;
  quantity: number;
  unit: "count" | "kg" | "L" | "g" | "servings" | "packs";
  note: string;
};
export type GroceryGroup = { title: string; items: PlannedGrocery[] };

export const defaultProfile: UserProfile = {
  completed: false,
  name: "",
  age: 35,
  sexForEstimate: "unspecified",
  units: "imperial",
  heightCm: 175,
  weightKg: 75,
  goalWeightKg: 80,
  goal: "gain",
  activity: "light",
  experience: "beginner",
  trainingDays: 3,
  equipment: "gym",
  workoutTime: "morning",
  diet: "omnivore",
  allergies: [],
  conditions: [],
  dislikedFoods: "",
  dogWalks: 0,
  usesProteinPowder: false,
  usesCreatine: false,
  usesMultivitamin: false,
};

const dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const gym = {
  push: ["Chest Press", "Shoulder Press", "Pec Fly", "Triceps Extension"],
  pull: ["Lat Pulldown", "Seated Row", "Rear Delt", "Preacher Curl"],
  legs: ["Seated Leg Press", "Leg Extension", "Leg Curl", "Calf Raise"],
  core: ["Abdominal Machine"],
};

const home = {
  push: ["Dumbbell Floor Press", "Seated Dumbbell Press", "Dumbbell Triceps Extension"],
  pull: ["One-arm Dumbbell Row", "Dumbbell Rear-Delt Raise", "Dumbbell Curl"],
  legs: ["Goblet Squat", "Dumbbell Romanian Deadlift", "Supported Split Squat", "Standing Calf Raise"],
  core: ["Bird Dog"],
};

const bodyweight = {
  push: ["Incline Push-up", "Wall Push-up", "Bench Triceps Press"],
  pull: ["Prone W Raise", "Prone Lat Pull", "Reverse Snow Angel"],
  legs: ["Chair Squat", "Glute Bridge", "Supported Reverse Lunge", "Standing Calf Raise"],
  core: ["Bird Dog"],
};

const unique = <T,>(items: T[]) => [...new Set(items)];

function exerciseSet(names: string[], profile: UserProfile): PlannedExercise[] {
  const sets = profile.experience === "beginner" || profile.age >= 60 ? 2 : profile.experience === "advanced" ? 4 : 3;
  const reps = profile.age >= 60 ? "8-15 controlled reps" : "8-12 controlled reps";
  return unique(names).map((name) => [
    name,
    profile.equipment === "bodyweight" ? "Comfortable variation" : "Technique-first load",
    `${sets} x ${reps}`,
  ]);
}

export function buildWorkoutWeek(profile: UserProfile): Record<string, PlannedWorkout> {
  const pool = profile.equipment === "gym" ? gym : profile.equipment === "home" ? home : bodyweight;
  const requested = Math.max(2, Math.min(6, profile.trainingDays));
  const safeDays = profile.age >= 60 ? Math.min(requested, 3) : profile.age < 18 ? Math.min(requested, 3) : requested;
  const templates: Array<{ title: string; focus: string; names: string[] }> =
    safeDays === 2
      ? [
          { title: "Full Body A", focus: "Squat / Push / Pull / Core", names: [pool.legs[0], pool.push[0], pool.pull[0], pool.legs[1], pool.core[0]] },
          { title: "Full Body B", focus: "Hips / Back / Shoulders / Legs", names: [pool.legs[1], pool.pull[1], pool.push[1], pool.legs[2], pool.core[0]] },
        ]
      : safeDays === 3
        ? [
            { title: "Full Body A", focus: "Squat / Push / Pull", names: [pool.legs[0], pool.push[0], pool.pull[0], pool.pull[2], pool.core[0]] },
            { title: "Full Body B", focus: "Hips / Shoulders / Back", names: [pool.legs[1], pool.push[1], pool.pull[1], pool.push[2], pool.core[0]] },
            { title: "Full Body C", focus: "Legs / Chest / Back / Arms", names: [pool.legs[2], pool.push[0], pool.pull[0], pool.pull[2], pool.legs[3]] },
          ]
        : safeDays === 4
          ? [
              { title: "Upper A", focus: "Chest / Back / Shoulders / Arms", names: [pool.push[0], pool.pull[0], pool.push[1], pool.pull[1], pool.push[2]] },
              { title: "Lower A", focus: "Quads / Hips / Hamstrings / Core", names: [pool.legs[0], pool.legs[1], pool.legs[2], pool.legs[3], pool.core[0]] },
              { title: "Upper B", focus: "Back / Chest / Rear Delts / Arms", names: [pool.pull[1], pool.push[0], pool.pull[0], pool.pull[2], pool.push[2]] },
              { title: "Lower B", focus: "Hips / Quads / Calves / Core", names: [pool.legs[1], pool.legs[0], pool.legs[2], pool.legs[3], pool.core[0]] },
            ]
          : [
              { title: "Push", focus: "Chest / Shoulders / Triceps", names: [pool.push[0], pool.push[1], pool.push[2], pool.core[0]] },
              { title: "Pull", focus: "Back / Biceps / Rear Delts", names: [pool.pull[0], pool.pull[1], pool.pull[2]] },
              { title: "Legs", focus: "Quads / Hamstrings / Glutes / Calves", names: [pool.legs[0], pool.legs[1], pool.legs[2], pool.legs[3], pool.core[0]] },
              { title: "Upper", focus: "Chest / Back / Shoulders", names: [pool.push[0], pool.pull[0], pool.push[1], pool.pull[1]] },
              { title: "Lower + Arms", focus: "Legs / Biceps / Triceps", names: [pool.legs[0], pool.legs[1], pool.pull[2], pool.push[2], pool.core[0]] },
              { title: "Optional Technique", focus: "Light full-body practice", names: [pool.legs[0], pool.push[0], pool.pull[0], pool.core[0]] },
            ].slice(0, safeDays);

  const week: Record<string, PlannedWorkout> = {};
  dayNames.forEach((day, index) => {
    const template = templates[index];
    week[day] = template
      ? { title: template.title, focus: template.focus, exercises: exerciseSet(template.names, profile) }
      : { title: "Recovery", focus: profile.age >= 60 ? "Easy walking / Mobility / Balance" : "Easy walking / Mobility / Meal prep", exercises: [["Easy movement", "10-30 min", "Comfortable pace"], ["Mobility", "5-10 min", "Pain-free range"]] };
  });
  week.Sunday = { title: "Recovery", focus: "Weekly review / Meal prep / Easy activity", exercises: [["Weekly review", "10 min", "Review the trend"], ["Meal preparation", "As needed", "Prepare the week"]] };
  return week;
}

export function estimateCalories(profile: UserProfile) {
  const sexAdjustment = profile.sexForEstimate === "male" ? 5 : profile.sexForEstimate === "female" ? -161 : -78;
  const resting = 10 * profile.weightKg + 6.25 * profile.heightCm - 5 * profile.age + sexAdjustment;
  const factor = { sedentary: 1.25, light: 1.4, moderate: 1.55, high: 1.7 }[profile.activity];
  const change = profile.goal === "gain" ? (profile.age >= 60 ? 200 : 300) : profile.goal === "lose" ? -300 : 0;
  return Math.round(Math.max(1500, Math.min(5000, resting * factor + change)) / 50) * 50;
}

export function proteinTarget(profile: UserProfile) {
  const multiplier = profile.goal === "gain" ? 1.6 : 1.4;
  return Math.round(profile.weightKg * multiplier);
}

function foodChoices(profile: UserProfile) {
  const dairyFree = profile.allergies.includes("dairy") || profile.diet === "vegan";
  const eggFree = profile.allergies.includes("eggs") || profile.diet === "vegan";
  const glutenFree = profile.allergies.includes("gluten");
  const plantOnly = profile.diet === "vegan";
  const vegetarian = profile.diet === "vegetarian";
  const avoid = profile.dislikedFoods.toLowerCase();
  const avoidsChicken = avoid.includes("chicken");
  const avoidsBeef = avoid.includes("beef") || avoid.includes("steak");
  const omnivoreProteins = [
    !avoidsChicken ? "skinless chicken" : "",
    !avoidsBeef ? "lean beef" : "",
    !eggFree ? "eggs" : "",
    "tofu or beans",
  ].filter(Boolean).join(", ");
  return {
    milk: dairyFree ? "fortified soy beverage" : "milk",
    yogurt: dairyFree ? "soy yogurt" : "Greek yogurt",
    breakfastProtein: eggFree ? "tofu scramble" : "eggs",
    lunchProtein: plantOnly || vegetarian ? "tofu, tempeh, lentils, or beans" : omnivoreProteins,
    dinnerProtein: plantOnly || vegetarian ? "tofu, tempeh, lentils, or beans" : omnivoreProteins,
    bread: glutenFree ? "gluten-free toast" : "toast",
    bagel: glutenFree ? "gluten-free bread or rice cakes" : "plain bagel",
    dairyFree,
    eggFree,
    plantOnly,
    vegetarian,
    avoidsChicken,
    avoidsBeef,
    avoidsBananas: avoid.includes("banana"),
    avoidsBerries: avoid.includes("berr"),
  };
}

export function buildMeals(profile: UserProfile, calories: number): PlannedMeal[] {
  const food = foodChoices(profile);
  const factor = Math.max(0.75, Math.min(1.45, calories / 2400));
  const rice = Math.round(1.25 * factor * 4) / 4;
  const potato = Math.round(300 * factor / 25) * 25;
  const preWorkout = profile.usesProteinPowder
    ? `1 label serving protein or mass-gainer shake mixed as directed`
    : `1 banana plus 250 mL ${food.milk}`;
  const breakfast = `${food.eggFree ? "200 g" : Math.max(2, Math.round(2 * factor))} ${food.breakfastProtein}, ${Math.max(2, Math.round(2 * factor))} slices ${food.bread}, fruit`;
  const medicalNote = profile.conditions.includes("ostomy")
    ? "Use foods and textures your stoma team has confirmed you tolerate"
    : "Adjust food choices for allergies and tolerance";
  const base: PlannedMeal[] = [
    ["Pre-workout", profile.workoutTime === "morning" ? "30-90 min before" : "Before training", preWorkout, "Choose a portion that feels comfortable"],
    ["Breakfast", profile.workoutTime === "morning" ? "After training" : "Morning", breakfast, "Protein + carbohydrate"],
    ["Snack", "Mid-morning", `${food.yogurt}, fruit, and optional oats if tolerated`, "Small, repeatable feeding"],
    ["Lunch", "Midday", `125-175 g cooked ${food.lunchProtein}; ${rice} cups cooked rice or ${potato} g potato; cooked vegetables`, medicalNote],
    ["Snack", "Afternoon", `${food.bagel}, fruit or applesauce`, "Add protein if the meal gap is long"],
    ["Dinner", "Evening", `150-200 g cooked ${food.dinnerProtein}; ${rice} cups cooked rice/pasta or ${potato} g potato; vegetables`, medicalNote],
    ["Evening snack", "1-2 h before bed", `${food.yogurt} or a tolerated protein food plus ${food.bread}`, "Useful when daily calories or protein are short"],
  ];
  if (profile.usesProteinPowder) base.push(["Optional second shake", "Only if needed", "Use the product label and count it in the daily plan", "Food and total daily intake still come first"]);
  return base;
}

export function buildGroceries(profile: UserProfile, days: number, calories: number): GroceryGroup[] {
  const food = foodChoices(profile);
  const factor = Math.max(0.75, Math.min(1.45, calories / 2400));
  const d = Math.max(1, Math.min(14, days));
  const proteins: PlannedGrocery[] = [];

  if (!food.eggFree) proteins.push({ id: "eggs", name: "Eggs", quantity: Math.ceil(2 * factor * d), unit: "count", note: "Breakfast or meal protein" });
  if (food.plantOnly || food.vegetarian) {
    proteins.push({ id: "tofu", name: "Tofu or tempeh", quantity: 0.32 * factor * d, unit: "kg", note: "Primary meal protein" });
    proteins.push({ id: "legumes", name: "Cooked or canned beans/lentils", quantity: 0.2 * factor * d, unit: "kg", note: "Choose tolerated forms and rinse canned products" });
  } else {
    if (!food.avoidsChicken) proteins.push({ id: "chicken", name: "Skinless chicken breast", quantity: 0.22 * factor * d, unit: "kg", note: "Raw purchase estimate" });
    if (!food.avoidsBeef) proteins.push({ id: "beef", name: "Lean beef", quantity: 0.12 * factor * d, unit: "kg", note: "Rotate with chicken or plant protein" });
    if (food.avoidsChicken && food.avoidsBeef) proteins.push({ id: "tofu", name: "Tofu, tempeh, or preferred protein", quantity: 0.3 * factor * d, unit: "kg", note: "Replacement for disliked meat" });
  }
  proteins.push({ id: "yogurt", name: food.yogurt, quantity: 0.25 * d, unit: "kg", note: "Snacks and breakfast" });
  proteins.push({ id: "milk", name: food.milk, quantity: 0.5 * d, unit: "L", note: "Meals, smoothies, or shakes" });

  const groups: GroceryGroup[] = [
    { title: "Protein foods", items: proteins },
    {
      title: "Carbohydrates & fruit",
      items: [
        { id: "rice", name: "Rice, dry", quantity: 0.1 * factor * d, unit: "kg", note: "Batch-cook for meals" },
        { id: "potatoes", name: "Potatoes", quantity: 0.3 * factor * d, unit: "kg", note: "Prepare to personal tolerance" },
        { id: "bread", name: food.bread, quantity: Math.ceil(3 * factor * d), unit: "count", note: "Number of slices" },
        { id: "fruit", name: food.avoidsBananas ? "Preferred fruit" : "Bananas or preferred fruit", quantity: Math.ceil(2 * d), unit: "count", note: "Choose allergy-safe options" },
        { id: "berries", name: food.avoidsBerries ? "Preferred smoothie fruit" : "Frozen berries or preferred smoothie fruit", quantity: 0.15 * d, unit: "kg", note: "Blend or prepare to tolerance" },
        { id: "oats", name: profile.allergies.includes("gluten") ? "Certified gluten-free oats" : "Oats", quantity: 0.05 * d, unit: "kg", note: "Optional; use only if tolerated" },
      ],
    },
    {
      title: "Vegetables & cooking",
      items: [
        { id: "vegetables", name: "Preferred vegetables", quantity: 0.3 * d, unit: "kg", note: profile.conditions.includes("ostomy") ? "Peel/cook and use only tolerated varieties" : "Fresh, frozen, or canned" },
        { id: "oil", name: "Olive or canola oil", quantity: 0.02 * d, unit: "L", note: "Measure portions" },
        { id: "seasoning", name: "Preferred seasonings or sauces", quantity: 1, unit: "packs", note: "Check allergens and sodium" },
      ],
    },
  ];

  const selectedSupplements: PlannedGrocery[] = [];
  if (profile.usesProteinPowder) selectedSupplements.push({ id: "protein", name: "Current protein powder", quantity: d, unit: "servings", note: "Use the label serving; optional, not required" });
  if (profile.usesCreatine) selectedSupplements.push({ id: "creatine", name: "Creatine monohydrate", quantity: 5 * d, unit: "g", note: "Adult default: 3-5 g daily after clinician/pharmacist review" });
  if (profile.usesMultivitamin) selectedSupplements.push({ id: "multivitamin", name: "Current multivitamin", quantity: d, unit: "servings", note: "Follow the label; avoid doubling ingredients" });
  if (selectedSupplements.length) groups.push({ title: "Selected supplements", items: selectedSupplements });
  return groups;
}

export function buildDailyTasks(profile: UserProfile): PlannedTask[] {
  const workoutTime = profile.workoutTime === "morning" ? "6:30 AM" : profile.workoutTime === "afternoon" ? "4:00 PM" : "7:00 PM";
  const tasks: PlannedTask[] = [
    ["water", "On waking", "Hydrate", "Use a personal fluid target appropriate for your health"],
    ["breakfast", "Morning", "Breakfast", "Begin the day's protein and energy intake"],
    ["lunch", "Midday", "Lunch", "Balanced meal from the generated plan"],
    ["workout", workoutTime, "Training or recovery", "Follow today's generated session"],
    ["dinner", "Evening", "Dinner", "Protein, carbohydrate, vegetables, and fluids"],
    ["sleep", "Bedtime", "Recovery routine", "Prepare for consistent sleep"],
  ];
  for (let index = 0; index < profile.dogWalks; index += 1) {
    const times = ["Morning", "Afternoon", "Evening", "Before bed"];
    tasks.splice(Math.min(1 + index * 2, tasks.length), 0, [`dog-walk-${index + 1}`, times[index] || "Daily", `Dog walk #${index + 1}`, "Comfortable pace"]);
  }
  return tasks;
}

export function planWarnings(profile: UserProfile) {
  const warnings: string[] = [];
  if (profile.age < 18) warnings.push("A parent/guardian and qualified youth professional should review this plan. The app does not set a calorie deficit or bodybuilding supplement plan for minors.");
  if (profile.age >= 65) warnings.push("Include balance work and begin conservatively. A clinician should help adapt training around chronic conditions, fall risk, or medications.");
  if (profile.conditions.length) warnings.push("Your health considerations require individual review before major diet, supplement, or resistance changes.");
  if (profile.conditions.includes("pregnancy")) warnings.push("Pregnancy or postpartum nutrition and exercise require individualized care; do not rely on the automatic calorie estimate.");
  if (profile.conditions.includes("ostomy")) warnings.push("Ask your stoma team about hydration, food texture/fibre, lifting technique, and parastomal-hernia risk.");
  if (profile.goal === "lose" && profile.weightKg / ((profile.heightCm / 100) ** 2) < 18.5) warnings.push("The app will not recommend intentional weight loss at a low calculated BMI. Seek clinical guidance.");
  return warnings;
}

export function displayWeight(kg: number, units: Units) {
  return units === "imperial" ? kg * 2.2046226218 : kg;
}

export function weightUnit(units: Units) {
  return units === "imperial" ? "lb" : "kg";
}
