import {
  calculateDailySupplementTotals,
  starterSupplementProducts,
  type SupplementLogEntry,
  type SupplementNutrition,
  type SupplementProduct,
  type SupplementUnit,
} from "./supplement-engine";

export type SupplementStoreSnapshot = {
  version: 1;
  products: SupplementProduct[];
  entries: SupplementLogEntry[];
};

export type DailyNutritionTotals = {
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

const STORAGE_KEY = "project220.supplements.v1";

function cloneStarterProducts(): SupplementProduct[] {
  return starterSupplementProducts.map((product) => ({
    ...product,
    nutritionPerReference: { ...product.nutritionPerReference },
  }));
}

export function createEmptySupplementStore(): SupplementStoreSnapshot {
  return {
    version: 1,
    products: cloneStarterProducts(),
    entries: [],
  };
}

function isSnapshot(value: unknown): value is SupplementStoreSnapshot {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<SupplementStoreSnapshot>;
  return (
    candidate.version === 1 &&
    Array.isArray(candidate.products) &&
    Array.isArray(candidate.entries)
  );
}

export function loadSupplementStore(
  storage: Pick<Storage, "getItem"> | undefined =
    typeof window === "undefined" ? undefined : window.localStorage,
): SupplementStoreSnapshot {
  if (!storage) return createEmptySupplementStore();

  const raw = storage.getItem(STORAGE_KEY);
  if (!raw) return createEmptySupplementStore();

  try {
    const parsed: unknown = JSON.parse(raw);
    return isSnapshot(parsed) ? parsed : createEmptySupplementStore();
  } catch {
    return createEmptySupplementStore();
  }
}

export function saveSupplementStore(
  snapshot: SupplementStoreSnapshot,
  storage: Pick<Storage, "setItem"> | undefined =
    typeof window === "undefined" ? undefined : window.localStorage,
): void {
  if (!storage) return;
  storage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
}

export function upsertSupplementProduct(
  snapshot: SupplementStoreSnapshot,
  product: SupplementProduct,
): SupplementStoreSnapshot {
  const existingIndex = snapshot.products.findIndex((item) => item.id === product.id);
  const products = [...snapshot.products];

  if (existingIndex >= 0) products[existingIndex] = product;
  else products.push(product);

  return { ...snapshot, products };
}

export function addSupplementEntry(
  snapshot: SupplementStoreSnapshot,
  input: {
    productId: string;
    amount: number;
    unit: SupplementUnit;
    takenAt?: string;
    notes?: string;
  },
): SupplementStoreSnapshot {
  const product = snapshot.products.find((item) => item.id === input.productId);
  if (!product) throw new Error("Supplement product was not found.");
  if (!Number.isFinite(input.amount) || input.amount <= 0) {
    throw new Error("Supplement amount must be greater than zero.");
  }
  if (input.unit !== product.referenceUnit) {
    throw new Error(`Use ${product.referenceUnit} when logging ${product.name}.`);
  }

  const entry: SupplementLogEntry = {
    id: globalThis.crypto?.randomUUID?.() ?? `supp-${Date.now()}-${Math.random()}`,
    productId: input.productId,
    amount: input.amount,
    unit: input.unit,
    takenAt: input.takenAt ?? new Date().toISOString(),
    notes: input.notes?.trim() || undefined,
  };

  return { ...snapshot, entries: [...snapshot.entries, entry] };
}

export function removeSupplementEntry(
  snapshot: SupplementStoreSnapshot,
  entryId: string,
): SupplementStoreSnapshot {
  return {
    ...snapshot,
    entries: snapshot.entries.filter((entry) => entry.id !== entryId),
  };
}

export function entriesForLocalDate(
  entries: SupplementLogEntry[],
  date: Date,
): SupplementLogEntry[] {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  return entries.filter((entry) => {
    const takenAt = new Date(entry.takenAt);
    return (
      takenAt.getFullYear() === year &&
      takenAt.getMonth() === month &&
      takenAt.getDate() === day
    );
  });
}

export function calculateSupplementTotalsForDate(
  snapshot: SupplementStoreSnapshot,
  date = new Date(),
): SupplementNutrition {
  return calculateDailySupplementTotals(
    snapshot.products,
    entriesForLocalDate(snapshot.entries, date),
  );
}

export function combineNutritionAndSupplementTotals(
  food: Omit<DailyNutritionTotals, "creatineMg" | "caffeineMg"> &
    Partial<Pick<DailyNutritionTotals, "creatineMg" | "caffeineMg">>,
  supplements: SupplementNutrition,
): DailyNutritionTotals {
  return {
    calories: food.calories + supplements.calories,
    proteinG: food.proteinG + supplements.proteinG,
    carbsG: food.carbsG + supplements.carbsG,
    fatG: food.fatG + supplements.fatG,
    fibreG: food.fibreG + supplements.fibreG,
    sugarG: food.sugarG + supplements.sugarG,
    sodiumMg: food.sodiumMg + supplements.sodiumMg,
    creatineMg: (food.creatineMg ?? 0) + supplements.creatineMg,
    caffeineMg: (food.caffeineMg ?? 0) + supplements.caffeineMg,
  };
}

export function exportSupplementStore(snapshot: SupplementStoreSnapshot): string {
  return JSON.stringify(snapshot, null, 2);
}
