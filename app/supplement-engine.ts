export type SupplementUnit = "g" | "mg" | "mcg" | "ml" | "scoop" | "capsule" | "tablet";

export type SupplementNutrition = {
  calories: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
  fibreG: number;
  sugarG: number;
  sodiumMg: number;
  creatineMg: number;
  caffeineMg: number;
};

export type SupplementProduct = {
  id: string;
  brand: string;
  name: string;
  category: string;
  referenceAmount: number;
  referenceUnit: SupplementUnit;
  nutritionPerReference: SupplementNutrition;
  containerAmount?: number;
  containerUnit?: SupplementUnit;
};

export type SupplementLogEntry = {
  id: string;
  productId: string;
  takenAt: string;
  amount: number;
  unit: SupplementUnit;
  notes?: string;
};

export const emptySupplementNutrition = (): SupplementNutrition => ({
  calories: 0,
  proteinG: 0,
  carbsG: 0,
  fatG: 0,
  fibreG: 0,
  sugarG: 0,
  sodiumMg: 0,
  creatineMg: 0,
  caffeineMg: 0,
});

const round = (value: number, places = 2) => {
  const factor = 10 ** places;
  return Math.round((value + Number.EPSILON) * factor) / factor;
};

export function calculateSupplementNutrition(
  product: SupplementProduct,
  amount: number,
  unit: SupplementUnit,
): SupplementNutrition {
  if (!Number.isFinite(amount) || amount < 0) {
    throw new Error("Supplement amount must be a non-negative number.");
  }

  if (unit !== product.referenceUnit) {
    throw new Error(
      `Unit conversion is required before calculating ${product.name}: expected ${product.referenceUnit}, received ${unit}.`,
    );
  }

  if (!Number.isFinite(product.referenceAmount) || product.referenceAmount <= 0) {
    throw new Error("Reference amount must be greater than zero.");
  }

  const ratio = amount / product.referenceAmount;
  const source = product.nutritionPerReference;

  return {
    calories: round(source.calories * ratio),
    proteinG: round(source.proteinG * ratio),
    carbsG: round(source.carbsG * ratio),
    fatG: round(source.fatG * ratio),
    fibreG: round(source.fibreG * ratio),
    sugarG: round(source.sugarG * ratio),
    sodiumMg: round(source.sodiumMg * ratio),
    creatineMg: round(source.creatineMg * ratio),
    caffeineMg: round(source.caffeineMg * ratio),
  };
}

export function addSupplementNutrition(
  totals: SupplementNutrition,
  addition: SupplementNutrition,
): SupplementNutrition {
  return {
    calories: round(totals.calories + addition.calories),
    proteinG: round(totals.proteinG + addition.proteinG),
    carbsG: round(totals.carbsG + addition.carbsG),
    fatG: round(totals.fatG + addition.fatG),
    fibreG: round(totals.fibreG + addition.fibreG),
    sugarG: round(totals.sugarG + addition.sugarG),
    sodiumMg: round(totals.sodiumMg + addition.sodiumMg),
    creatineMg: round(totals.creatineMg + addition.creatineMg),
    caffeineMg: round(totals.caffeineMg + addition.caffeineMg),
  };
}

export function calculateDailySupplementTotals(
  products: SupplementProduct[],
  entries: SupplementLogEntry[],
): SupplementNutrition {
  const byId = new Map(products.map((product) => [product.id, product]));

  return entries.reduce((totals, entry) => {
    const product = byId.get(entry.productId);
    if (!product) {
      return totals;
    }

    return addSupplementNutrition(
      totals,
      calculateSupplementNutrition(product, entry.amount, entry.unit),
    );
  }, emptySupplementNutrition());
}

export function estimateRemainingServings(
  product: SupplementProduct,
  amountUsed: number,
): number | null {
  if (
    product.containerAmount === undefined ||
    product.containerUnit !== product.referenceUnit ||
    product.referenceAmount <= 0
  ) {
    return null;
  }

  const remaining = Math.max(0, product.containerAmount - amountUsed);
  return round(remaining / product.referenceAmount, 1);
}

export const starterSupplementProducts: SupplementProduct[] = [
  {
    id: "creatine-monohydrate",
    brand: "Custom",
    name: "Creatine Monohydrate",
    category: "Creatine",
    referenceAmount: 5,
    referenceUnit: "g",
    nutritionPerReference: {
      ...emptySupplementNutrition(),
      creatineMg: 5000,
    },
  },
  {
    id: "custom-protein-powder",
    brand: "Custom",
    name: "Protein Powder",
    category: "Protein",
    referenceAmount: 35,
    referenceUnit: "g",
    nutritionPerReference: {
      calories: 140,
      proteinG: 25,
      carbsG: 4,
      fatG: 2,
      fibreG: 1,
      sugarG: 2,
      sodiumMg: 150,
      creatineMg: 0,
      caffeineMg: 0,
    },
  },
  {
    id: "custom-mass-gainer",
    brand: "Custom",
    name: "Mass Gainer / Clean Mass",
    category: "Mass Gainer",
    referenceAmount: 150,
    referenceUnit: "g",
    nutritionPerReference: {
      calories: 600,
      proteinG: 40,
      carbsG: 90,
      fatG: 8,
      fibreG: 4,
      sugarG: 12,
      sodiumMg: 320,
      creatineMg: 0,
      caffeineMg: 0,
    },
  },
];
