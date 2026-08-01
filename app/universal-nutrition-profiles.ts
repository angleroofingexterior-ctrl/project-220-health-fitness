export type LifeStage =
  | "infant"
  | "child"
  | "preteen"
  | "teen"
  | "adult"
  | "older-adult"
  | "pregnant"
  | "postpartum"
  | "breastfeeding";

export type NutritionGoal =
  | "general-wellness"
  | "muscle-gain"
  | "fat-loss"
  | "weight-maintenance"
  | "strength-performance"
  | "endurance"
  | "healthy-aging"
  | "prenatal-support"
  | "postpartum-recovery";

export type DietaryPattern =
  | "omnivore"
  | "vegetarian"
  | "vegan"
  | "pescatarian"
  | "halal"
  | "kosher"
  | "custom";

export type UniversalNutritionProfile = {
  lifeStage: LifeStage;
  goal: NutritionGoal;
  dietaryPattern: DietaryPattern;
  allergies: string[];
  intolerances: string[];
  foodsToAvoid: string[];
  budgetLevel: "economy" | "standard" | "premium";
  householdSize: number;
  cookingSkill: "beginner" | "intermediate" | "advanced";
  mealPrepPreference: "daily" | "batch" | "mixed";
  clinicianInstructions?: string;
};

export const lifeStageOptions: Array<{ id: LifeStage; label: string; safetyMode: boolean }> = [
  { id: "infant", label: "Infant", safetyMode: true },
  { id: "child", label: "Child", safetyMode: true },
  { id: "preteen", label: "Preteen", safetyMode: true },
  { id: "teen", label: "Teen", safetyMode: true },
  { id: "adult", label: "Adult", safetyMode: false },
  { id: "older-adult", label: "Older adult", safetyMode: true },
  { id: "pregnant", label: "Pregnant / expecting a child", safetyMode: true },
  { id: "postpartum", label: "Postpartum", safetyMode: true },
  { id: "breastfeeding", label: "Breastfeeding", safetyMode: true },
];

export function validateNutritionProfile(profile: UniversalNutritionProfile): string[] {
  const errors: string[] = [];
  if (profile.householdSize < 1) errors.push("Household size must be at least one.");
  if (!profile.lifeStage) errors.push("Choose a life stage.");
  if (!profile.goal) errors.push("Choose a nutrition goal.");
  if (!profile.dietaryPattern) errors.push("Choose a dietary pattern.");
  return errors;
}

export function getNutritionSafetyRules(profile: UniversalNutritionProfile): string[] {
  const rules = [
    "Respect all recorded allergies, intolerances and foods to avoid.",
    "Use clean, minimally processed foods whenever practical.",
    "Keep subscriber nutrition details private from administrators by default.",
  ];

  if (["infant", "child", "preteen", "teen"].includes(profile.lifeStage)) {
    rules.push("Do not generate aggressive calorie restriction, fasting, detox or bodybuilding-cut plans for minors.");
  }
  if (profile.lifeStage === "pregnant") {
    rules.push("Use the pregnancy nutrition safety engine and trimester-specific planning.");
    rules.push("Block aggressive calorie deficits, fasting, detoxes, fat burners and unapproved supplements.");
    rules.push("Display prenatal medical and emergency disclaimers.");
  }
  if (profile.lifeStage === "postpartum" || profile.lifeStage === "breastfeeding") {
    rules.push("Use recovery-focused planning and prompt clinician review when individualized medical guidance is needed.");
  }
  if (profile.lifeStage === "older-adult") {
    rules.push("Prioritize protein distribution, hydration, fibre and easy-to-prepare nutrient-dense meals while respecting clinician instructions.");
  }

  return rules;
}
