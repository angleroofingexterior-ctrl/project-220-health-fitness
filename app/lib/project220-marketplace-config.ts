export type RetailerCategory = "grocery" | "general" | "supplements" | "restaurant";

export type RetailerDefinition = {
  id: string;
  name: string;
  category: RetailerCategory;
  country: "CA";
  enabledAtLaunch: boolean;
  supportsPriceComparison: boolean;
  supportsUnifiedCart: boolean;
  supportsSubstitutionApproval: boolean;
};

export const launchRetailers: RetailerDefinition[] = [
  { id: "no-frills", name: "No Frills", category: "grocery", country: "CA", enabledAtLaunch: true, supportsPriceComparison: true, supportsUnifiedCart: true, supportsSubstitutionApproval: true },
  { id: "giant-tiger", name: "Giant Tiger", category: "general", country: "CA", enabledAtLaunch: true, supportsPriceComparison: true, supportsUnifiedCart: true, supportsSubstitutionApproval: true },
  { id: "walmart", name: "Walmart", category: "general", country: "CA", enabledAtLaunch: true, supportsPriceComparison: true, supportsUnifiedCart: true, supportsSubstitutionApproval: true },
  { id: "real-canadian-superstore", name: "Real Canadian Superstore", category: "grocery", country: "CA", enabledAtLaunch: true, supportsPriceComparison: true, supportsUnifiedCart: true, supportsSubstitutionApproval: true },
  { id: "safeway", name: "Safeway", category: "grocery", country: "CA", enabledAtLaunch: true, supportsPriceComparison: true, supportsUnifiedCart: true, supportsSubstitutionApproval: true },
  { id: "sobeys", name: "Sobeys", category: "grocery", country: "CA", enabledAtLaunch: true, supportsPriceComparison: true, supportsUnifiedCart: true, supportsSubstitutionApproval: true },
  { id: "freshco", name: "FreshCo", category: "grocery", country: "CA", enabledAtLaunch: true, supportsPriceComparison: true, supportsUnifiedCart: true, supportsSubstitutionApproval: true },
  { id: "dollarama", name: "Dollarama", category: "general", country: "CA", enabledAtLaunch: true, supportsPriceComparison: true, supportsUnifiedCart: true, supportsSubstitutionApproval: true },
  { id: "dollar-tree", name: "Dollar Tree", category: "general", country: "CA", enabledAtLaunch: true, supportsPriceComparison: true, supportsUnifiedCart: true, supportsSubstitutionApproval: true },
  { id: "save-on-foods", name: "Save-On-Foods", category: "grocery", country: "CA", enabledAtLaunch: true, supportsPriceComparison: true, supportsUnifiedCart: true, supportsSubstitutionApproval: true },
  { id: "gnc", name: "GNC", category: "supplements", country: "CA", enabledAtLaunch: true, supportsPriceComparison: true, supportsUnifiedCart: true, supportsSubstitutionApproval: true },
  { id: "popeyes-supplements", name: "Popeye's Supplements", category: "supplements", country: "CA", enabledAtLaunch: true, supportsPriceComparison: true, supportsUnifiedCart: true, supportsSubstitutionApproval: true },
];

export const marketplaceRules = {
  customerPaysProject220Directly: true,
  project220PurchasesOnCustomerBehalf: true,
  substitutionApprovalRequired: true,
  disclosedMarkupEnabled: true,
  selectionModes: ["preferred-store", "cheapest-basket", "fastest-delivery"] as const,
  unifiedCartEnabled: true,
  finalInventoryUsesFulfilledOrder: true,
};

export const cookbookRules = {
  premiumOnly: true,
  inAppViewOnly: true,
  pdfDownloadEnabled: false,
  exportEnabled: false,
  publishingEnabled: false,
  sellingEnabled: false,
  privateByDefault: true,
  familySizeEnabled: true,
  bulkCookingEnabled: true,
  kidFriendlyEnabled: true,
  dietaryFiltersEnabled: true,
  allergyFiltersEnabled: true,
  tailoredHealthySnacksEnabled: true,
  healthyRestaurantAlternativesEnabled: true,
};

export const pantryRules = {
  receiptCaptureEnabled: true,
  barcodeScanningRequiredAtLaunch: true,
  sharedHouseholdPantryEnabled: true,
  expirationRemindersEnabledByDefault: true,
  photoRetentionChoice: ["store-after-processing", "delete-after-processing"] as const,
};

export const coachingRules = {
  generalWellnessCoachingEnabled: true,
  professionalCoachMarketplaceEnabled: true,
  tieredPlansEnabled: true,
  emergencyDisclaimerRequired: true,
  medicalDisclaimerRequired: true,
  dietitianConnectionsEnabled: false,
  supportWorkerConnectionsEnabled: false,
  remindersAndNotificationsEnabled: true,
};

export const basketOptimizationWeights = {
  cost: 20,
  nutrition: 20,
  pantryUtilization: 15,
  recipeReadiness: 15,
  supplements: 10,
  budget: 10,
  wastePrevention: 10,
} as const;
