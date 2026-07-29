export type Goal = "gain" | "maintain" | "lose";
export type Units = "imperial" | "metric";
export type Equipment = "gym" | "home" | "bodyweight";
export type DietStyle = "omnivore" | "pescatarian" | "vegetarian" | "vegan";
export type Experience = "beginner" | "intermediate" | "advanced";
export type Activity = "sedentary" | "light" | "moderate" | "high";
export type SexForEstimate = "male" | "female" | "unspecified";
export type FoodOption = {
  id: string;
  label: string;
  category: "protein" | "carbohydrate" | "fruit" | "vegetable" | "fat";
  animal?: "meat" | "seafood" | "dairy" | "egg";
  allergens?: string[];
};
export type FoodGroup = {
  title: string;
  description: string;
  items: FoodOption[];
};
export type RecipeIngredient = {
  item: string;
  amount: number;
  unit: "g" | "mL" | "tsp" | "tbsp" | "cup" | "count" | "slice";
};
export type Recipe = {
  id: string;
  meal: string;
  title: string;
  servings: number;
  prepMinutes: number;
  cookMinutes: number;
  ingredients: RecipeIngredient[];
  steps: string[];
  nutrition: string;
  note: string;
};
export type RoutineActivity = {
  id: string;
  label: string;
  detail: string;
  defaultTime: string;
  defaultDay: string;
};

export type UserProfile = {
  completed: boolean;
  name: string;
  age: number;
  genderIdentity: string;
  genderIdentityOther: string;
  pronouns: string;
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
  workoutClock: string;
  diet: DietStyle;
  allergies: string[];
  dietaryPractices: string[];
  conditions: string[];
  dislikedFoods: string;
  selectedFoods: string[];
  customFoods: string;
  mealsPerDay: number;
  cookingStyle: "quick" | "balanced" | "batch";
  selectedSupplements: string[];
  customSupplements: string;
  dogWalks: number;
  dogWalkTimes: string[];
  wakeTime: string;
  bedTime: string;
  workSchoolMode: "none" | "work" | "school" | "both";
  workSchoolDays: string[];
  workStart: string;
  workEnd: string;
  routineActivities: string[];
  activityTimes: Record<string, string>;
  activityDays: Record<string, string>;
  wellnessPriorities: string[];
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

export const genderOptions = [
  ["woman", "Woman"],
  ["man", "Man"],
  ["non-binary", "Non-binary"],
  ["gender-fluid", "Gender-fluid / genderqueer"],
  ["agender", "Agender"],
  ["two-spirit", "Two-Spirit"],
  ["another", "Another identity"],
  ["prefer-not", "Prefer not to say"],
] as const;

export const foodCatalog: FoodGroup[] = [
  {
    title: "Protein foods",
    description: "Choose every protein you enjoy. Incompatible choices are shown but cannot be selected.",
    items: [
      { id: "chicken", label: "Skinless chicken", category: "protein", animal: "meat" },
      { id: "turkey", label: "Turkey", category: "protein", animal: "meat" },
      { id: "lean-beef", label: "Lean ground beef or steak", category: "protein", animal: "meat" },
      { id: "pork", label: "Lean pork", category: "protein", animal: "meat" },
      { id: "eggs", label: "Eggs", category: "protein", animal: "egg", allergens: ["eggs"] },
      { id: "salmon", label: "Salmon", category: "protein", animal: "seafood", allergens: ["fish"] },
      { id: "tuna", label: "Tuna", category: "protein", animal: "seafood", allergens: ["fish"] },
      { id: "white-fish", label: "White fish", category: "protein", animal: "seafood", allergens: ["fish"] },
      { id: "shrimp", label: "Shrimp", category: "protein", animal: "seafood", allergens: ["shellfish"] },
      { id: "greek-yogurt", label: "Greek yogurt", category: "protein", animal: "dairy", allergens: ["dairy"] },
      { id: "cottage-cheese", label: "Cottage cheese", category: "protein", animal: "dairy", allergens: ["dairy"] },
      { id: "milk", label: "Milk", category: "protein", animal: "dairy", allergens: ["dairy"] },
      { id: "tofu", label: "Tofu", category: "protein", allergens: ["soy"] },
      { id: "tempeh", label: "Tempeh", category: "protein", allergens: ["soy"] },
      { id: "lentils", label: "Lentils", category: "protein" },
      { id: "chickpeas", label: "Chickpeas", category: "protein" },
      { id: "black-beans", label: "Black beans", category: "protein" },
      { id: "kidney-beans", label: "Kidney beans", category: "protein" },
      { id: "edamame", label: "Edamame", category: "protein", allergens: ["soy"] },
      { id: "seitan", label: "Seitan", category: "protein", allergens: ["gluten"] },
    ],
  },
  {
    title: "Carbohydrate foods",
    description: "Select grains and starches that fit your culture, budget, digestion, and cooking style.",
    items: [
      { id: "white-rice", label: "White rice", category: "carbohydrate" },
      { id: "brown-rice", label: "Brown rice", category: "carbohydrate" },
      { id: "quinoa", label: "Quinoa", category: "carbohydrate" },
      { id: "oats", label: "Oats", category: "carbohydrate" },
      { id: "pasta", label: "Pasta", category: "carbohydrate", allergens: ["gluten"] },
      { id: "potatoes", label: "Potatoes", category: "carbohydrate" },
      { id: "sweet-potatoes", label: "Sweet potatoes", category: "carbohydrate" },
      { id: "bread", label: "Bread / toast", category: "carbohydrate", allergens: ["gluten"] },
      { id: "wraps", label: "Wraps / tortillas", category: "carbohydrate", allergens: ["gluten"] },
      { id: "bagels", label: "Bagels", category: "carbohydrate", allergens: ["gluten"] },
      { id: "couscous", label: "Couscous", category: "carbohydrate", allergens: ["gluten"] },
      { id: "barley", label: "Barley", category: "carbohydrate", allergens: ["gluten"] },
    ],
  },
  {
    title: "Fruit",
    description: "Fresh, frozen, canned, cooked, blended, or peeled options can all be useful.",
    items: [
      { id: "bananas", label: "Bananas", category: "fruit" },
      { id: "berries", label: "Mixed berries", category: "fruit" },
      { id: "apples", label: "Apples", category: "fruit" },
      { id: "oranges", label: "Oranges", category: "fruit" },
      { id: "mango", label: "Mango", category: "fruit" },
      { id: "pineapple", label: "Pineapple", category: "fruit" },
      { id: "melon", label: "Melon", category: "fruit" },
      { id: "peaches", label: "Peaches", category: "fruit" },
      { id: "pears", label: "Pears", category: "fruit" },
      { id: "grapes", label: "Grapes", category: "fruit" },
      { id: "applesauce", label: "Applesauce", category: "fruit" },
    ],
  },
  {
    title: "Vegetables",
    description: "Choose preferred forms. People with digestive or texture restrictions can select peeled and cooked preparations.",
    items: [
      { id: "carrots", label: "Carrots", category: "vegetable" },
      { id: "green-beans", label: "Green beans", category: "vegetable" },
      { id: "zucchini", label: "Zucchini", category: "vegetable" },
      { id: "squash", label: "Squash", category: "vegetable" },
      { id: "spinach", label: "Spinach", category: "vegetable" },
      { id: "broccoli", label: "Broccoli", category: "vegetable" },
      { id: "peas", label: "Green peas", category: "vegetable" },
      { id: "peppers", label: "Bell peppers", category: "vegetable" },
      { id: "tomatoes", label: "Tomatoes", category: "vegetable" },
      { id: "cucumber", label: "Cucumber", category: "vegetable" },
      { id: "mushrooms", label: "Mushrooms", category: "vegetable" },
      { id: "cauliflower", label: "Cauliflower", category: "vegetable" },
    ],
  },
  {
    title: "Fats, spreads, and flavour",
    description: "These help meals taste satisfying and can raise energy intake when the goal requires it.",
    items: [
      { id: "olive-oil", label: "Olive or canola oil", category: "fat" },
      { id: "avocado", label: "Avocado", category: "fat" },
      { id: "cheese", label: "Cheese", category: "fat", animal: "dairy", allergens: ["dairy"] },
      { id: "hummus", label: "Hummus", category: "fat", allergens: ["sesame"] },
      { id: "peanut-butter", label: "Peanut butter", category: "fat", allergens: ["peanuts"] },
      { id: "almond-butter", label: "Almond butter", category: "fat", allergens: ["tree-nuts"] },
      { id: "sunflower-butter", label: "Sunflower seed butter", category: "fat" },
      { id: "tahini", label: "Tahini", category: "fat", allergens: ["sesame"] },
    ],
  },
];

export const routineActivityCatalog: RoutineActivity[] = [
  { id: "family", label: "Family / play with children", detail: "Protected family time", defaultTime: "17:00", defaultDay: "daily" },
  { id: "sports", label: "Sports or practice", detail: "Practice, league, or recreational sport", defaultTime: "19:00", defaultDay: "Tuesday" },
  { id: "date-night", label: "Date night", detail: "Protected relationship and social time", defaultTime: "19:00", defaultDay: "Friday" },
  { id: "outing", label: "Outing or event", detail: "Community, entertainment, or family outing", defaultTime: "13:00", defaultDay: "Saturday" },
  { id: "meal-prep", label: "Meal preparation", detail: "Cook and portion the coming meals", defaultTime: "15:00", defaultDay: "Sunday" },
  { id: "household", label: "Household tasks", detail: "Cleaning, errands, and home responsibilities", defaultTime: "10:00", defaultDay: "Saturday" },
  { id: "mobility", label: "Mobility or stretching", detail: "Gentle movement and recovery", defaultTime: "20:30", defaultDay: "daily" },
  { id: "hobby", label: "Hobby or personal project", detail: "Protected personal-interest time", defaultTime: "20:00", defaultDay: "Wednesday" },
  { id: "social", label: "Friends or social connection", detail: "Connection and mental wellbeing", defaultTime: "18:30", defaultDay: "Saturday" },
  { id: "community", label: "Community / faith activity", detail: "Community, cultural, or spiritual time", defaultTime: "10:00", defaultDay: "Sunday" },
  { id: "appointments", label: "Appointments", detail: "Health, personal, or administrative appointments", defaultTime: "14:00", defaultDay: "Wednesday" },
  { id: "commute", label: "Commute", detail: "Travel time before and after work or school", defaultTime: "08:00", defaultDay: "weekdays" },
];

export const defaultProfile: UserProfile = {
  completed: false,
  name: "",
  age: 35,
  genderIdentity: "prefer-not",
  genderIdentityOther: "",
  pronouns: "",
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
  workoutClock: "06:30",
  diet: "omnivore",
  allergies: [],
  dietaryPractices: [],
  conditions: [],
  dislikedFoods: "",
  selectedFoods: ["chicken", "eggs", "greek-yogurt", "white-rice", "potatoes", "bananas", "berries", "carrots", "green-beans", "olive-oil"],
  customFoods: "",
  mealsPerDay: 5,
  cookingStyle: "balanced",
  selectedSupplements: [],
  customSupplements: "",
  dogWalks: 0,
  dogWalkTimes: ["07:00", "13:00", "19:00", "21:30"],
  wakeTime: "06:00",
  bedTime: "22:30",
  workSchoolMode: "none",
  workSchoolDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  workStart: "09:00",
  workEnd: "17:00",
  routineActivities: [],
  activityTimes: {},
  activityDays: {},
  wellnessPriorities: ["strength", "energy", "sleep"],
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

const flatFoods = foodCatalog.flatMap((group) => group.items);

export function foodIsCompatible(profile: UserProfile, option: FoodOption) {
  const allergies = profile.allergies ?? [];
  if (allergies.includes("nuts") && (option.allergens ?? []).some((item) => item === "peanuts" || item === "tree-nuts")) return false;
  if (allergies.includes("seafood") && (option.allergens ?? []).some((item) => item === "fish" || item === "shellfish")) return false;
  if ((option.allergens ?? []).some((allergen) => allergies.includes(allergen))) return false;
  if ((profile.dietaryPractices ?? []).includes("halal") && option.id === "pork") return false;
  if ((profile.dietaryPractices ?? []).includes("kosher") && option.id === "pork") return false;
  if (profile.diet === "vegan" && option.animal) return false;
  if (profile.diet === "vegetarian" && (option.animal === "meat" || option.animal === "seafood")) return false;
  if (profile.diet === "pescatarian" && option.animal === "meat") return false;
  return true;
}

function foodById(id: string) {
  return flatFoods.find((food) => food.id === id);
}

function selectedFoodIds(profile: UserProfile, category?: FoodOption["category"]) {
  return (profile.selectedFoods ?? []).filter((id) => {
    const option = foodById(id);
    return Boolean(option && (!category || option.category === category) && foodIsCompatible(profile, option));
  });
}

function preferredFoodId(profile: UserProfile, category: FoodOption["category"], fallbacks: string[]) {
  const selected = selectedFoodIds(profile, category);
  const preferred = selected.find((id) => fallbacks.includes(id)) ?? selected[0];
  if (preferred) return preferred;
  return fallbacks.find((id) => {
    const option = foodById(id);
    return option && foodIsCompatible(profile, option);
  }) ?? fallbacks[0];
}

function foodLabel(id: string) {
  return foodById(id)?.label ?? id.replaceAll("-", " ");
}

function foodChoices(profile: UserProfile) {
  const dairyFree = (profile.allergies ?? []).includes("dairy") || profile.diet === "vegan";
  const eggFree = (profile.allergies ?? []).includes("eggs") || profile.diet === "vegan";
  const glutenFree = (profile.allergies ?? []).includes("gluten");
  const plantOnly = profile.diet === "vegan";
  const vegetarian = profile.diet === "vegetarian";
  const pescatarian = profile.diet === "pescatarian";
  const avoid = profile.dislikedFoods.toLowerCase();
  const chosenProteins = selectedFoodIds(profile, "protein").filter((id) => !["milk", "greek-yogurt", "cottage-cheese"].includes(id));
  const fallbackProteins = plantOnly || vegetarian
    ? ["tofu", "tempeh", "lentils", "chickpeas"]
    : pescatarian
      ? ["salmon", "shrimp", "eggs", "tofu"]
      : ["chicken", "lean-beef", "turkey", "eggs", "tofu"];
  const mealProteins = (chosenProteins.length ? chosenProteins : fallbackProteins)
    .filter((id) => {
      const option = foodById(id);
      return Boolean(option && foodIsCompatible(profile, option));
    })
    .slice(0, 4)
    .map(foodLabel)
    .join(", ");
  const milkId = preferredFoodId(profile, "protein", dairyFree ? ["tofu"] : ["milk"]);
  const yogurtId = preferredFoodId(profile, "protein", dairyFree ? ["tofu"] : ["greek-yogurt", "cottage-cheese"]);
  const breakfastId = preferredFoodId(profile, "protein", eggFree ? ["tofu", "tempeh"] : ["eggs", "greek-yogurt"]);
  return {
    milk: dairyFree ? "fortified soy beverage" : foodLabel(milkId),
    yogurt: dairyFree ? "fortified soy yogurt" : foodLabel(yogurtId),
    breakfastProtein: eggFree ? `${foodLabel(breakfastId)} scramble` : foodLabel(breakfastId),
    lunchProtein: mealProteins,
    dinnerProtein: mealProteins,
    bread: glutenFree ? "gluten-free toast" : "toast",
    bagel: glutenFree ? "gluten-free bread or rice cakes" : "plain bagel",
    dairyFree,
    eggFree,
    plantOnly,
    vegetarian,
    pescatarian,
    avoidsChicken: avoid.includes("chicken") || !selectedFoodIds(profile).includes("chicken"),
    avoidsBeef: avoid.includes("beef") || avoid.includes("steak") || !selectedFoodIds(profile).includes("lean-beef"),
    avoidsBananas: avoid.includes("banana"),
    avoidsBerries: avoid.includes("berr"),
  };
}

function roundFive(value: number) {
  return Math.max(5, Math.round(value / 5) * 5);
}

function recipeNutrition(calories: number, protein: number) {
  return `Approx. ${Math.round(calories / 10) * 10} kcal · ${Math.round(protein)} g protein per serving`;
}

export function buildCookbook(profile: UserProfile, calories: number): Recipe[] {
  const factor = Math.max(0.75, Math.min(1.45, calories / 2400));
  const glutenFree = (profile.allergies ?? []).includes("gluten");
  const dairyFree = (profile.allergies ?? []).includes("dairy") || profile.diet === "vegan";
  const eggFree = (profile.allergies ?? []).includes("eggs") || profile.diet === "vegan";
  const proteinId = preferredFoodId(
    profile,
    "protein",
    profile.diet === "vegan" || profile.diet === "vegetarian"
      ? ["tofu", "tempeh", "lentils", "chickpeas"]
      : profile.diet === "pescatarian"
        ? ["salmon", "shrimp", "eggs", "tofu"]
        : ["chicken", "lean-beef", "turkey", "tofu"],
  );
  const breakfastProteinId = preferredFoodId(profile, "protein", eggFree ? ["tofu", "tempeh"] : ["eggs", "greek-yogurt"]);
  const carbId = preferredFoodId(profile, "carbohydrate", ["white-rice", "brown-rice", "quinoa"]);
  const secondCarbId = preferredFoodId(profile, "carbohydrate", ["potatoes", "sweet-potatoes", "pasta"]);
  const fruitId = preferredFoodId(profile, "fruit", ["berries", "bananas", "mango", "apples"]);
  const vegetableId = preferredFoodId(profile, "vegetable", ["carrots", "green-beans", "zucchini", "spinach"]);
  const secondVegetableId = preferredFoodId(profile, "vegetable", ["green-beans", "spinach", "squash", "peas"]);
  const fatId = preferredFoodId(profile, "fat", ["olive-oil", "avocado", "sunflower-butter"]);
  const protein = foodLabel(proteinId);
  const breakfastProtein = foodLabel(breakfastProteinId);
  const carb = foodLabel(carbId);
  const secondCarb = foodLabel(secondCarbId);
  const fruit = foodLabel(fruitId);
  const vegetable = foodLabel(vegetableId);
  const secondVegetable = foodLabel(secondVegetableId);
  const fat = foodLabel(fatId);
  const milk = dairyFree ? "fortified soy beverage" : "milk";
  const yogurt = dairyFree ? "fortified soy yogurt" : "Greek yogurt";
  const pasta = glutenFree ? "gluten-free pasta, dry" : "pasta, dry";
  const wrap = glutenFree ? "corn tortillas" : "whole-grain wraps";
  const tolerance = profile.conditions.includes("ostomy")
    ? "Prepare fruit and vegetables in the texture, peeled form, and portion your stoma team has confirmed you tolerate."
    : "Use allergy-safe products and adjust seasonings to taste.";
  const prepBase = profile.cookingStyle === "quick" ? 8 : profile.cookingStyle === "batch" ? 18 : 12;
  const mealProtein = roundFive(170 * factor);
  const grain = roundFive(85 * factor);
  const potato = roundFive(320 * factor);
  const vegetables = roundFive(190 * factor);

  return [
    {
      id: "breakfast-bowl",
      meal: "Breakfast",
      title: `${breakfastProtein} breakfast bowl`,
      servings: 1,
      prepMinutes: prepBase,
      cookMinutes: eggFree ? 8 : 6,
      ingredients: [
        { item: breakfastProtein, amount: eggFree ? roundFive(180 * factor) : Math.max(2, Math.round(2 * factor)), unit: eggFree ? "g" : "count" },
        { item: "oats", amount: roundFive(55 * factor), unit: "g" },
        { item: fruit, amount: roundFive(120 * factor), unit: "g" },
        { item: milk, amount: roundFive(200 * factor), unit: "mL" },
      ],
      steps: [
        `Cook the ${breakfastProtein.toLowerCase()} fully using a non-stick pan.`,
        `Cook oats with ${milk.toLowerCase()} until soft.`,
        `Serve with ${fruit.toLowerCase()} in the preparation you tolerate.`,
      ],
      nutrition: recipeNutrition(560 * factor, 31 * factor),
      note: tolerance,
    },
    {
      id: "smoothie",
      meal: "Smoothie / snack",
      title: `${fruit} yogurt smoothie`,
      servings: 1,
      prepMinutes: 5,
      cookMinutes: 0,
      ingredients: [
        { item: yogurt, amount: roundFive(250 * factor), unit: "g" },
        { item: milk, amount: roundFive(250 * factor), unit: "mL" },
        { item: fruit, amount: roundFive(150 * factor), unit: "g" },
        { item: "oats, optional", amount: roundFive(35 * factor), unit: "g" },
        { item: "honey or maple syrup, optional", amount: 1, unit: "tbsp" },
      ],
      steps: ["Add all ingredients to a blender.", "Blend until completely smooth.", "Thin with more beverage if needed and drink at a comfortable pace."],
      nutrition: recipeNutrition(510 * factor, 28 * factor),
      note: `${tolerance} Keep protein or mass-gainer shakes separate if that is your preference.`,
    },
    {
      id: "rice-bowl",
      meal: "Lunch",
      title: `${protein} and ${carb} bowl`,
      servings: 1,
      prepMinutes: prepBase,
      cookMinutes: 25,
      ingredients: [
        { item: `${protein}, raw`, amount: mealProtein, unit: "g" },
        { item: `${carb}, dry`, amount: grain, unit: "g" },
        { item: vegetable, amount: vegetables, unit: "g" },
        { item: fat, amount: 1, unit: "tbsp" },
        { item: "preferred low-sodium seasoning", amount: 1, unit: "tsp" },
      ],
      steps: [
        `Cook the ${carb.toLowerCase()} according to its package.`,
        `Cook the ${protein.toLowerCase()} to a safe internal temperature.`,
        `Cook the ${vegetable.toLowerCase()} until the texture suits you, then combine and add ${fat.toLowerCase()}.`,
      ],
      nutrition: recipeNutrition(690 * factor, 45 * factor),
      note: tolerance,
    },
    {
      id: "tray-bake",
      meal: "Dinner",
      title: `${protein} and ${secondCarb} tray meal`,
      servings: 1,
      prepMinutes: prepBase,
      cookMinutes: 35,
      ingredients: [
        { item: `${protein}, raw`, amount: mealProtein, unit: "g" },
        { item: secondCarb, amount: potato, unit: "g" },
        { item: secondVegetable, amount: vegetables, unit: "g" },
        { item: fat, amount: 1, unit: "tbsp" },
        { item: "preferred herbs", amount: 1, unit: "tsp" },
      ],
      steps: [
        "Heat the oven to 205°C / 400°F.",
        `Cut the ${secondCarb.toLowerCase()} and ${secondVegetable.toLowerCase()} into tolerated pieces and toss with half the ${fat.toLowerCase()}.`,
        `Add the ${protein.toLowerCase()}, season, and bake until the protein reaches a safe internal temperature and the vegetables are tender.`,
      ],
      nutrition: recipeNutrition(720 * factor, 46 * factor),
      note: tolerance,
    },
    {
      id: "pasta-skillet",
      meal: "Lunch or dinner",
      title: `${protein} pasta skillet`,
      servings: 1,
      prepMinutes: prepBase,
      cookMinutes: 22,
      ingredients: [
        { item: `${protein}, raw`, amount: mealProtein, unit: "g" },
        { item: pasta, amount: roundFive(95 * factor), unit: "g" },
        { item: "tomato sauce", amount: roundFive(125 * factor), unit: "mL" },
        { item: vegetable, amount: roundFive(150 * factor), unit: "g" },
        { item: "olive or canola oil", amount: 2, unit: "tsp" },
      ],
      steps: [
        "Cook pasta until tender and reserve a small amount of cooking water.",
        `Cook the ${protein.toLowerCase()} fully, then add the ${vegetable.toLowerCase()} and sauce.`,
        "Stir in pasta and enough cooking water to coat. Heat through before serving.",
      ],
      nutrition: recipeNutrition(730 * factor, 44 * factor),
      note: tolerance,
    },
    {
      id: "wrap",
      meal: "Portable meal",
      title: `${protein} wrap`,
      servings: 1,
      prepMinutes: 12,
      cookMinutes: 10,
      ingredients: [
        { item: `${protein}, cooked`, amount: roundFive(140 * factor), unit: "g" },
        { item: wrap, amount: 2, unit: "count" },
        { item: vegetable, amount: roundFive(120 * factor), unit: "g" },
        { item: profile.allergies.includes("sesame") ? "allergy-safe spread" : "hummus", amount: roundFive(30 * factor), unit: "g" },
        { item: "preferred seasoning", amount: 1, unit: "tsp" },
      ],
      steps: [
        `Warm the ${protein.toLowerCase()} and wraps.`,
        "Spread, fill, fold tightly, and cut only if desired.",
        "Pack cold with an ice pack or eat immediately.",
      ],
      nutrition: recipeNutrition(620 * factor, 39 * factor),
      note: tolerance,
    },
    {
      id: "snack-bowl",
      meal: "Snack",
      title: `${yogurt} and ${fruit} snack bowl`,
      servings: 1,
      prepMinutes: 5,
      cookMinutes: 0,
      ingredients: [
        { item: yogurt, amount: roundFive(250 * factor), unit: "g" },
        { item: fruit, amount: roundFive(140 * factor), unit: "g" },
        { item: "oats", amount: roundFive(35 * factor), unit: "g" },
        { item: foodIsCompatible(profile, foodById(fatId) ?? flatFoods[0]) ? fat : "allergy-safe seed butter", amount: roundFive(15 * factor), unit: "g" },
      ],
      steps: ["Add yogurt to a bowl.", `Top with ${fruit.toLowerCase()} and oats.`, `Stir in ${fat.toLowerCase()} or serve it on the side.`],
      nutrition: recipeNutrition(430 * factor, 26 * factor),
      note: tolerance,
    },
    {
      id: "one-pot",
      meal: "Batch meal",
      title: `One-pot ${protein} and vegetable stew`,
      servings: 4,
      prepMinutes: Math.max(15, prepBase),
      cookMinutes: 40,
      ingredients: [
        { item: `${protein}, raw`, amount: roundFive(mealProtein * 4), unit: "g" },
        { item: secondCarb, amount: roundFive(potato * 4), unit: "g" },
        { item: `${vegetable} and ${secondVegetable}`, amount: roundFive(vegetables * 4), unit: "g" },
        { item: "low-sodium broth", amount: 1000, unit: "mL" },
        { item: "olive or canola oil", amount: 2, unit: "tbsp" },
      ],
      steps: [
        `Brown or sauté the ${protein.toLowerCase()} in oil.`,
        `Add the ${secondCarb.toLowerCase()}, vegetables, and broth.`,
        "Simmer until everything is fully cooked and tender. Cool promptly and divide into four labelled containers.",
      ],
      nutrition: recipeNutrition(680 * factor, 43 * factor),
      note: `${tolerance} Nutrition shown is per serving.`,
    },
  ];
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
  const feedings = Math.max(3, Math.min(8, profile.mealsPerDay ?? 5));
  const breakfastMeal: PlannedMeal = ["Breakfast", profile.workoutTime === "morning" ? "After training" : "Morning", breakfast, "Protein + carbohydrate"];
  const lunchMeal: PlannedMeal = ["Lunch", "Midday", `125-175 g cooked ${food.lunchProtein}; ${rice} cups cooked rice or ${potato} g potato; cooked vegetables`, medicalNote];
  const dinnerMeal: PlannedMeal = ["Dinner", "Evening", `150-200 g cooked ${food.dinnerProtein}; ${rice} cups cooked rice/pasta or ${potato} g potato; vegetables`, medicalNote];
  const optional: PlannedMeal[] = [
    ["Pre-workout", `30-90 min before ${profile.workoutClock || "training"}`, preWorkout, "Choose a portion that feels comfortable"],
    ["Snack", "Mid-morning", `${food.yogurt}, fruit, and optional oats if tolerated`, "Small, repeatable feeding"],
    ["Snack", "Afternoon", `${food.bagel}, fruit or applesauce`, "Add protein if the meal gap is long"],
    ["Evening snack", "1-2 h before bed", `${food.yogurt} or a tolerated protein food plus ${food.bread}`, "Useful when daily calories or protein are short"],
    ["Optional second shake", "Only if needed", "Use the product label and count it in the daily plan", "Food and total daily intake still come first"],
  ];
  const base = [breakfastMeal, lunchMeal, dinnerMeal];
  const extrasNeeded = feedings - base.length;
  const extras = optional
    .filter((meal) => meal[0] !== "Optional second shake" || profile.usesProteinPowder)
    .slice(0, extrasNeeded);
  return [...extras.slice(0, 2), ...base, ...extras.slice(2)].slice(0, feedings);
}

export function buildGroceries(profile: UserProfile, days: number, calories: number): GroceryGroup[] {
  const food = foodChoices(profile);
  const factor = Math.max(0.75, Math.min(1.45, calories / 2400));
  const d = Math.max(1, Math.min(14, days));
  const proteins: PlannedGrocery[] = [];
  const chosenProteinIds = selectedFoodIds(profile, "protein")
    .filter((id) => !["milk", "greek-yogurt", "cottage-cheese"].includes(id))
    .slice(0, 3);
  const groceryProteinIds = chosenProteinIds.length
    ? chosenProteinIds
    : profile.diet === "vegan" || profile.diet === "vegetarian"
      ? ["tofu", "lentils"]
      : profile.diet === "pescatarian"
        ? ["salmon", "shrimp"]
        : ["chicken", "lean-beef"];
  const selectedCarbs = selectedFoodIds(profile, "carbohydrate");
  const selectedFruit = selectedFoodIds(profile, "fruit");
  const selectedVegetables = selectedFoodIds(profile, "vegetable");

  if (!food.eggFree) proteins.push({ id: "eggs", name: "Eggs", quantity: Math.ceil(2 * factor * d), unit: "count", note: "Breakfast or meal protein" });
  groceryProteinIds.forEach((id, index) => {
    if (id === "eggs") return;
    proteins.push({
      id: `protein-${id}`,
      name: foodLabel(id),
      quantity: (index === 0 ? 0.2 : 0.12) * factor * d,
      unit: "kg",
      note: ["lentils", "chickpeas", "black-beans", "kidney-beans"].includes(id)
        ? "Cooked or canned estimate; rinse canned products"
        : "Raw purchase estimate; use an allergy-safe preparation",
    });
  });
  proteins.push({ id: "yogurt", name: food.yogurt, quantity: 0.25 * d, unit: "kg", note: "Snacks and breakfast" });
  proteins.push({ id: "milk", name: food.milk, quantity: 0.5 * d, unit: "L", note: "Meals, smoothies, or shakes" });

  const groups: GroceryGroup[] = [
    { title: "Protein foods", items: proteins },
    {
      title: "Carbohydrates & fruit",
      items: [
        { id: "grain", name: `${foodLabel(selectedCarbs[0] ?? "white-rice")}, dry`, quantity: 0.1 * factor * d, unit: "kg", note: "Batch-cook for meals" },
        { id: "starch", name: foodLabel(selectedCarbs[1] ?? "potatoes"), quantity: 0.3 * factor * d, unit: "kg", note: "Prepare to personal tolerance" },
        { id: "bread", name: food.bread, quantity: Math.ceil(3 * factor * d), unit: "count", note: "Number of slices" },
        { id: "fruit", name: foodLabel(selectedFruit[0] ?? "bananas"), quantity: Math.ceil(2 * d), unit: "count", note: "Choose allergy-safe fresh, frozen, canned, peeled, or cooked forms" },
        { id: "smoothie-fruit", name: foodLabel(selectedFruit[1] ?? "berries"), quantity: 0.15 * d, unit: "kg", note: "Blend or prepare to tolerance" },
        { id: "oats", name: profile.allergies.includes("gluten") ? "Certified gluten-free oats" : "Oats", quantity: 0.05 * d, unit: "kg", note: "Optional; use only if tolerated" },
      ],
    },
    {
      title: "Vegetables & cooking",
      items: [
        { id: "vegetables", name: (selectedVegetables.length ? selectedVegetables.slice(0, 4).map(foodLabel).join(", ") : "Preferred vegetables"), quantity: 0.3 * d, unit: "kg", note: profile.conditions.includes("ostomy") ? "Peel/cook and use only tolerated varieties" : "Fresh, frozen, canned, or cooked" },
        { id: "oil", name: "Olive or canola oil", quantity: 0.02 * d, unit: "L", note: "Measure portions" },
        { id: "seasoning", name: "Preferred seasonings or sauces", quantity: 1, unit: "packs", note: "Check allergens and sodium" },
      ],
    },
  ];

  const selectedSupplements: PlannedGrocery[] = [];
  const supplements = profile.selectedSupplements ?? [];
  if (profile.usesProteinPowder || supplements.includes("protein-powder") || supplements.includes("mass-gainer")) {
    selectedSupplements.push({ id: "protein", name: supplements.includes("mass-gainer") ? "Selected mass gainer" : "Selected protein powder", quantity: d, unit: "servings", note: "Use the label serving and count it in the daily plan" });
  }
  if (profile.usesCreatine || supplements.includes("creatine")) {
    selectedSupplements.push({ id: "creatine", name: "Creatine monohydrate", quantity: 5 * d, unit: "g", note: "Common healthy-adult maintenance range: 3-5 g daily; professional review applies" });
  }
  if (profile.usesMultivitamin || supplements.includes("multivitamin")) {
    selectedSupplements.push({ id: "multivitamin", name: "Selected multivitamin", quantity: d, unit: "servings", note: "Follow one label; avoid duplicate nutrients" });
  }
  const conditionalLabels: Record<string, string> = {
    "vitamin-d": "Vitamin D",
    "vitamin-b12": "Vitamin B12",
    iron: "Iron",
    calcium: "Calcium",
    magnesium: "Magnesium",
    omega3: "Omega-3",
    electrolytes: "Electrolyte / oral rehydration product",
    fibre: "Fibre supplement",
    probiotic: "Probiotic",
  };
  supplements
    .filter((id) => conditionalLabels[id])
    .forEach((id) => selectedSupplements.push({
      id: `supp-${id}`,
      name: conditionalLabels[id],
      quantity: d,
      unit: "servings",
      note: "Only if the label and a pharmacist or clinician confirm it fits your needs",
    }));
  if ((profile.customSupplements ?? "").trim()) {
    selectedSupplements.push({ id: "supp-custom", name: profile.customSupplements.trim(), quantity: d, unit: "servings", note: "Record the product and label; verify ingredients and interactions" });
  }
  if (selectedSupplements.length) groups.push({ title: "Selected supplements", items: selectedSupplements });
  return groups;
}

const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

function minutesFromClock(clock: string) {
  const [hours, minutes] = (clock || "00:00").split(":").map(Number);
  return (Number.isFinite(hours) ? hours : 0) * 60 + (Number.isFinite(minutes) ? minutes : 0);
}

function clockFromMinutes(total: number) {
  const safe = ((Math.round(total) % 1440) + 1440) % 1440;
  const hours = Math.floor(safe / 60);
  const minutes = safe % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

function activityRunsOnDay(rule: string | undefined, dayName: string) {
  if (!rule || rule === "daily") return true;
  if (rule === "weekdays") return weekDays.slice(0, 5).includes(dayName);
  if (rule === "weekends") return weekDays.slice(5).includes(dayName);
  return rule === dayName;
}

function workoutClockForDay(profile: UserProfile, dayName: string) {
  let chosen = profile.workoutClock
    || (profile.workoutTime === "morning" ? "06:30" : profile.workoutTime === "afternoon" ? "16:00" : "19:00");
  const scheduled = profile.workSchoolMode !== "none" && (profile.workSchoolDays ?? []).includes(dayName);
  if (!scheduled) return chosen;
  const workout = minutesFromClock(chosen);
  const start = minutesFromClock(profile.workStart || "09:00");
  const end = minutesFromClock(profile.workEnd || "17:00");
  if (workout >= start - 30 && workout <= end) {
    const before = start - 75;
    chosen = before >= minutesFromClock(profile.wakeTime || "06:00")
      ? clockFromMinutes(before)
      : clockFromMinutes(end + 45);
  }
  return chosen;
}

export function buildDailyTasks(profile: UserProfile, dayName = "Monday"): PlannedTask[] {
  const wake = profile.wakeTime || "06:00";
  const bed = profile.bedTime || "22:30";
  const breakfast = clockFromMinutes(minutesFromClock(wake) + 45);
  const dinner = clockFromMinutes(minutesFromClock(bed) - 210);
  const selectedActivities = profile.routineActivities ?? [];
  const tasks: PlannedTask[] = [
    [`${dayName}-water`, wake, "Wake, hydrate, and check readiness", "Use the fluid plan that fits your health, medications, climate, and activity"],
    [`${dayName}-breakfast`, breakfast, "Breakfast", "Begin the day's protein, energy, and fluids"],
    [`${dayName}-lunch`, "12:30", "Lunch", "Balanced meal from the generated plan"],
    [`${dayName}-workout`, workoutClockForDay(profile, dayName), "Training or recovery", "Follow the generated session for this day"],
    [`${dayName}-dinner`, dinner, "Dinner", "Protein food, carbohydrate, vegetables or fruit, and fluids"],
    [`${dayName}-sleep`, bed, "Sleep routine", "Wind down early enough to support consistent sleep"],
  ];

  if (profile.workSchoolMode !== "none" && (profile.workSchoolDays ?? []).includes(dayName)) {
    const label = profile.workSchoolMode === "both"
      ? "Work and school"
      : profile.workSchoolMode === "work"
        ? "Work"
        : "School / study";
    tasks.push([
      `${dayName}-work-school`,
      profile.workStart || "09:00",
      `${label} block`,
      `${profile.workStart || "09:00"}-${profile.workEnd || "17:00"} reserved; meals and training are placed around it`,
    ]);
  }

  const walkTimes = profile.dogWalkTimes ?? ["07:00", "13:00", "19:00", "21:30"];
  for (let index = 0; index < Math.max(0, profile.dogWalks); index += 1) {
    tasks.push([
      `${dayName}-dog-walk-${index + 1}`,
      walkTimes[index] || clockFromMinutes(minutesFromClock(wake) + 60 + index * 240),
      `Dog walk #${index + 1}`,
      "Comfortable pace; shorten or slow the walk when recovery or weather requires it",
    ]);
  }

  selectedActivities.forEach((id) => {
    const activity = routineActivityCatalog.find((item) => item.id === id);
    if (!activity || !activityRunsOnDay(profile.activityDays?.[id], dayName)) return;
    tasks.push([
      `${dayName}-activity-${id}`,
      profile.activityTimes?.[id] || "18:00",
      activity.label,
      activity.detail,
    ]);
  });

  return tasks.sort((a, b) => minutesFromClock(a[1]) - minutesFromClock(b[1]));
}

export function buildRoutineWeek(profile: UserProfile) {
  return Object.fromEntries(weekDays.map((dayName) => [dayName, buildDailyTasks(profile, dayName)])) as Record<string, PlannedTask[]>;
}

export function planWarnings(profile: UserProfile) {
  const warnings: string[] = [];
  if (profile.age < 18) warnings.push("A parent/guardian and qualified youth professional should review this plan. The app does not set a calorie deficit or bodybuilding supplement plan for minors.");
  if (profile.age >= 65) warnings.push("Include balance work and begin conservatively. A clinician should help adapt training around chronic conditions, fall risk, or medications.");
  if (profile.conditions.length) warnings.push("Your health considerations require individual review before major diet, supplement, or resistance changes.");
  if (profile.conditions.includes("pregnancy")) warnings.push("Pregnancy or postpartum nutrition and exercise require individualized care; do not rely on the automatic calorie estimate.");
  if (profile.conditions.includes("ostomy")) warnings.push("Ask your stoma team about hydration, food texture/fibre, lifting technique, and parastomal-hernia risk.");
  if (profile.goal === "lose" && profile.weightKg / ((profile.heightCm / 100) ** 2) < 18.5) warnings.push("The app will not recommend intentional weight loss at a low calculated BMI. Seek clinical guidance.");
  if (!(profile.selectedFoods ?? []).length) warnings.push("Choose foods you enjoy before relying on the generated cookbook; fallback foods are only examples.");
  if ((profile.selectedSupplements ?? []).some((id) => ["iron", "vitamin-d", "calcium", "magnesium"].includes(id))) warnings.push("Selected vitamin or mineral products should be checked with a pharmacist or clinician for dose, duplication, medication interactions, and whether they are needed.");
  return warnings;
}

export function displayWeight(kg: number, units: Units) {
  return units === "imperial" ? kg * 2.2046226218 : kg;
}

export function weightUnit(units: Units) {
  return units === "imperial" ? "lb" : "kg";
}
