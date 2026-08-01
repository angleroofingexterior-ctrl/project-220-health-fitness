export type Trimester = 1 | 2 | 3;
export type EatingPattern = "omnivore" | "vegetarian" | "vegan";

export type PregnancyNutritionInput = {
  trimester: Trimester;
  eatingPattern: EatingPattern;
  allergies: string[];
  dislikes: string[];
  clinicianNotes?: string;
  nauseaSupport?: boolean;
  constipationSupport?: boolean;
};

export type PregnancyNutritionPlan = {
  title: string;
  safetyNotice: string;
  dailyStructure: string[];
  mealTemplate: Array<{ meal: string; examples: string[] }>;
  nutrientPriorities: string[];
  supplementReminder: string;
  caffeineLimitMg: number;
  foodsToAvoid: string[];
  alerts: string[];
};

const foodSafetyAvoid = [
  "unpasteurized milk, juice, cheese or other unpasteurized products",
  "raw or undercooked meat, poultry, seafood, fish, eggs or sprouts",
  "refrigerated pâté, meat spreads or smoked seafood unless cooked in a dish",
  "deli meat or hot dogs unless reheated until steaming hot",
  "high-mercury fish and locally caught fish under an active advisory",
  "alcohol and cannabis products",
  "supplemented foods carrying pregnancy caution labels unless a clinician approves them",
];

export function createPregnancyNutritionPlan(input: PregnancyNutritionInput): PregnancyNutritionPlan {
  const trimesterGuidance = input.trimester === 1
    ? "Prioritize regular balanced meals and snacks; extra calories are not automatically added in the first trimester."
    : "Add a modest nutrient-dense snack or small meal to support increased energy needs in later pregnancy.";

  const proteinOptions = input.eatingPattern === "vegan"
    ? ["tofu or tempeh", "lentils or beans", "fortified soy beverage", "nut or seed butter"]
    : input.eatingPattern === "vegetarian"
      ? ["eggs", "Greek yogurt", "lentils or beans", "tofu", "fortified milk or soy beverage"]
      : ["fully cooked eggs", "chicken or turkey", "low-mercury fish", "Greek yogurt", "lentils or beans"];

  const alerts: string[] = [];
  if (input.nauseaSupport) alerts.push("Use smaller, more frequent meals; seek clinical advice if vomiting limits fluids or food intake.");
  if (input.constipationSupport) alerts.push("Increase fibre-rich foods and fluids gradually, and discuss persistent symptoms with a clinician.");
  if (input.clinicianNotes?.trim()) alerts.push(`Clinician-directed note: ${input.clinicianNotes.trim()}`);

  return {
    title: `Project 220 Pregnancy Nutrition Plan — Trimester ${input.trimester}`,
    safetyNotice: "This plan provides general wellness education only. It does not replace prenatal care, diagnosis, treatment or individualized advice from an obstetric clinician or registered dietitian. Urgent symptoms require immediate medical care.",
    dailyStructure: [
      "3 balanced meals plus 2 to 3 planned snacks as tolerated",
      trimesterGuidance,
      "Make water the main beverage and include pasteurized milk or fortified plant beverage when appropriate",
      "Choose vegetables and fruit, whole grains and protein foods throughout the day",
      "Use only pasteurized products and thoroughly cook animal foods",
    ],
    mealTemplate: [
      { meal: "Breakfast", examples: ["oatmeal with berries, pasteurized yogurt and chia", "fully cooked eggs with whole-grain toast and fruit"] },
      { meal: "Lunch", examples: [`whole-grain bowl with vegetables and ${proteinOptions[0]}`, `soup and sandwich with ${proteinOptions[1]}`] },
      { meal: "Dinner", examples: [`vegetables, whole grain or potato, and ${proteinOptions[2]}`, `stir-fry with ${proteinOptions[3]} and brown rice`] },
      { meal: "Snacks", examples: ["pasteurized yogurt with fruit", "apple with nut or seed butter", "whole-grain crackers with hummus", "homemade frozen-yogurt bites made with pasteurized yogurt"] },
    ],
    nutrientPriorities: [
      "folate and folic acid",
      "iron plus vitamin C-rich foods",
      "choline",
      "calcium and vitamin D",
      "iodine",
      "omega-3 fats from low-mercury fish or clinician-approved alternatives",
      "fibre and fluids",
    ],
    supplementReminder: "Health Canada recommends a daily multivitamin containing 400 mcg (0.4 mg) folic acid and 16 to 20 mg iron during pregnancy. Higher doses or additional supplements should only be used when a qualified clinician recommends them.",
    caffeineLimitMg: 300,
    foodsToAvoid: foodSafetyAvoid,
    alerts,
  };
}
