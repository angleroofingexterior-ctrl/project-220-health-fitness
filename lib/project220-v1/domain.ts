export type Id = string;
export type IsoDateTime = string;
export type CurrencyCode = "CAD" | "USD";

export type HouseholdRole =
  | "owner"
  | "admin"
  | "inventory_manager"
  | "shopper"
  | "viewer";

export type StorageLocationType = "pantry" | "refrigerator" | "freezer" | "other";
export type PantryPhotoRetention = "retain" | "delete_after_processing";
export type InventorySource = "manual" | "barcode" | "receipt" | "photo_ai" | "order_reconciliation";

export interface Household {
  id: Id;
  name: string;
  ownerUserId: Id;
  photoRetention: PantryPhotoRetention;
  expirationRemindersEnabled: boolean;
  createdAt: IsoDateTime;
  updatedAt: IsoDateTime;
}

export interface HouseholdMember {
  householdId: Id;
  userId: Id;
  role: HouseholdRole;
  joinedAt: IsoDateTime;
}

export interface StorageLocation {
  id: Id;
  householdId: Id;
  name: string;
  type: StorageLocationType;
}

export interface ProductIdentity {
  id: Id;
  name: string;
  brand?: string;
  barcode?: string;
  packageSize?: number;
  packageUnit?: string;
  category: string;
  allergenTags: string[];
  dietaryTags: string[];
}

export interface InventoryLot {
  id: Id;
  householdId: Id;
  storageLocationId: Id;
  productId: Id;
  quantity: number;
  unit: string;
  opened: boolean;
  purchasedAt?: IsoDateTime;
  expiresAt?: IsoDateTime;
  source: InventorySource;
  sourceReferenceId?: Id;
  confirmedByUserId: Id;
  createdAt: IsoDateTime;
  updatedAt: IsoDateTime;
}

export type RetailerKind = "grocery" | "supplement";

export interface Retailer {
  id: Id;
  name:
    | "No Frills"
    | "Giant Tiger"
    | "Walmart"
    | "Real Canadian Superstore"
    | "Safeway"
    | "Sobeys"
    | "FreshCo"
    | "GNC"
    | "Popeye's Supplements"
    | string;
  kind: RetailerKind;
  enabled: boolean;
}

export type BasketMode = "preferred_store" | "cheapest_basket" | "fastest_delivery";

export interface Money {
  amountMinor: number;
  currency: CurrencyCode;
}

export interface CartItem {
  id: Id;
  productId: Id;
  requestedQuantity: number;
  unit: string;
  preferredRetailerId?: Id;
  allowSubstitution: boolean;
}

export interface UnifiedCart {
  id: Id;
  householdId: Id;
  customerUserId: Id;
  mode: BasketMode;
  preferredRetailerId?: Id;
  items: CartItem[];
  groceryBudget?: Money;
  supplementBudget?: Money;
  createdAt: IsoDateTime;
  updatedAt: IsoDateTime;
}

export type OptimizationCategory =
  | "cost"
  | "nutrition"
  | "pantry_utilization"
  | "recipe_readiness"
  | "supplement"
  | "budget"
  | "waste_prevention";

export interface OptimizationRecommendation {
  id: Id;
  category: OptimizationCategory;
  title: string;
  reason: string;
  affectedCartItemIds: Id[];
  estimatedSavings?: Money;
  scoreDelta?: number;
  requiresUserApproval: true;
  status: "pending" | "accepted" | "declined";
}

export interface BasketScoreBreakdown {
  cost: number;
  nutrition: number;
  pantryUtilization: number;
  recipeReadiness: number;
  supplement: number;
  budget: number;
  wastePrevention: number;
  total: number;
}

export const BASKET_SCORE_WEIGHTS = Object.freeze({
  cost: 0.2,
  nutrition: 0.2,
  pantryUtilization: 0.15,
  recipeReadiness: 0.15,
  supplement: 0.1,
  budget: 0.1,
  wastePrevention: 0.1,
});

export function calculateBasketScore(input: Omit<BasketScoreBreakdown, "total">): BasketScoreBreakdown {
  const clamp = (value: number) => Math.max(0, Math.min(100, value));
  const normalized = {
    cost: clamp(input.cost),
    nutrition: clamp(input.nutrition),
    pantryUtilization: clamp(input.pantryUtilization),
    recipeReadiness: clamp(input.recipeReadiness),
    supplement: clamp(input.supplement),
    budget: clamp(input.budget),
    wastePrevention: clamp(input.wastePrevention),
  };

  const total =
    normalized.cost * BASKET_SCORE_WEIGHTS.cost +
    normalized.nutrition * BASKET_SCORE_WEIGHTS.nutrition +
    normalized.pantryUtilization * BASKET_SCORE_WEIGHTS.pantryUtilization +
    normalized.recipeReadiness * BASKET_SCORE_WEIGHTS.recipeReadiness +
    normalized.supplement * BASKET_SCORE_WEIGHTS.supplement +
    normalized.budget * BASKET_SCORE_WEIGHTS.budget +
    normalized.wastePrevention * BASKET_SCORE_WEIGHTS.wastePrevention;

  return { ...normalized, total: Math.round(total * 10) / 10 };
}

export type OrderStatus =
  | "draft"
  | "optimized"
  | "awaiting_payment"
  | "paid"
  | "assigned"
  | "shopping"
  | "awaiting_substitution"
  | "ready_for_delivery"
  | "out_for_delivery"
  | "delivered"
  | "reconciliation_required"
  | "completed"
  | "cancelled"
  | "refunded";

export interface FulfillmentGroup {
  id: Id;
  retailerId: Id;
  shopperUserId?: Id;
  driverUserId?: Id;
  cartItemIds: Id[];
  estimatedSubtotal: Money;
  estimatedReadyAt?: IsoDateTime;
}

export interface MarketplaceOrder {
  id: Id;
  cartId: Id;
  householdId: Id;
  customerUserId: Id;
  status: OrderStatus;
  fulfillmentGroups: FulfillmentGroup[];
  merchandise: Money;
  markup: Money;
  serviceFees: Money;
  deliveryFees: Money;
  tax: Money;
  tip: Money;
  total: Money;
  createdAt: IsoDateTime;
  updatedAt: IsoDateTime;
}

export interface SubstitutionRequest {
  id: Id;
  orderId: Id;
  fulfillmentGroupId: Id;
  unavailableCartItemId: Id;
  proposedProductId?: Id;
  originalPrice?: Money;
  proposedPrice?: Money;
  status: "pending" | "approved" | "rejected" | "item_removed" | "expired";
  requestedAt: IsoDateTime;
  resolvedAt?: IsoDateTime;
  resolvedByUserId?: Id;
}

export interface SmartPantryScore {
  householdId: Id;
  nutritionBalance: number;
  freshness: number;
  completeness: number;
  mealReadiness: number;
  groceryEfficiency: number;
  wastePrevention: number;
  householdGoals: number;
  total: number;
  calculatedAt: IsoDateTime;
}

export const SMART_PANTRY_WEIGHTS = Object.freeze({
  nutritionBalance: 20,
  freshness: 20,
  completeness: 15,
  mealReadiness: 15,
  groceryEfficiency: 10,
  wastePrevention: 10,
  householdGoals: 10,
});

export function calculateSmartPantryScore(
  input: Omit<SmartPantryScore, "householdId" | "total" | "calculatedAt">,
): number {
  const clamp = (value: number) => Math.max(0, Math.min(100, value));
  const weighted =
    clamp(input.nutritionBalance) * SMART_PANTRY_WEIGHTS.nutritionBalance +
    clamp(input.freshness) * SMART_PANTRY_WEIGHTS.freshness +
    clamp(input.completeness) * SMART_PANTRY_WEIGHTS.completeness +
    clamp(input.mealReadiness) * SMART_PANTRY_WEIGHTS.mealReadiness +
    clamp(input.groceryEfficiency) * SMART_PANTRY_WEIGHTS.groceryEfficiency +
    clamp(input.wastePrevention) * SMART_PANTRY_WEIGHTS.wastePrevention +
    clamp(input.householdGoals) * SMART_PANTRY_WEIGHTS.householdGoals;

  return Math.round(weighted / 100);
}

export const ALLOWED_ORDER_TRANSITIONS: Readonly<Record<OrderStatus, readonly OrderStatus[]>> = Object.freeze({
  draft: ["optimized", "cancelled"],
  optimized: ["awaiting_payment", "draft", "cancelled"],
  awaiting_payment: ["paid", "cancelled"],
  paid: ["assigned", "refunded", "cancelled"],
  assigned: ["shopping", "cancelled", "refunded"],
  shopping: ["awaiting_substitution", "ready_for_delivery", "cancelled", "refunded"],
  awaiting_substitution: ["shopping", "ready_for_delivery", "cancelled", "refunded"],
  ready_for_delivery: ["out_for_delivery", "cancelled", "refunded"],
  out_for_delivery: ["delivered", "cancelled", "refunded"],
  delivered: ["reconciliation_required", "completed", "refunded"],
  reconciliation_required: ["completed", "refunded"],
  completed: ["refunded"],
  cancelled: [],
  refunded: [],
});

export function canTransitionOrder(from: OrderStatus, to: OrderStatus): boolean {
  return ALLOWED_ORDER_TRANSITIONS[from].includes(to);
}
