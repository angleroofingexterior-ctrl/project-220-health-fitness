# Project 220 Version 1.0 — Production Product Specification

## Status

Implementation blueprint for the first production release. This specification records approved product decisions and defines the required behaviour for Pantry AI, grocery and pharmacy integration, the premium cookbook, coaching, the Smart Basket Optimizer, the unified marketplace, household subscriptions, and safe delivery operations.

## 1. Product priorities

The first production build prioritizes:

1. Pantry AI and shared household inventory
2. Grocery, supplement, restaurant, and pharmacy integrations
3. Premium private cookbook and personalized meal planning
4. General AI wellness coaching and a professional coaching marketplace
5. Unified shopping cart and Project 220 marketplace
6. Smart Basket Optimizer and Smart Pantry Score
7. Safe food handling verification for shoppers and drivers

Existing workout, nutrition, supplement, and progress tracking remain connected foundation services.

## 2. Supported retailer categories

### Grocery and general merchandise

Launch configuration must support retailer records and integration adapters for:

- No Frills
- Giant Tiger
- Walmart
- Real Canadian Superstore
- Safeway
- Sobeys
- FreshCo
- Save-On-Foods
- Dollarama
- Dollar Tree

The retailer directory must be data-driven so administrators can add, disable, or restrict stores by service area without a code release.

### Supplements

- GNC
- Popeye's Supplements

### Pharmacies

- Shoppers Drug Mart
- Safeway Pharmacy
- Rexall
- Real Canadian Superstore Pharmacy
- Other approved major pharmacy chains through the same adapter model

### Healthy restaurants

The marketplace must support healthy restaurant alternatives. Restaurants are classified by cuisine, dietary compatibility, allergen controls, estimated nutrition quality, delivery range, hours, and order capabilities. The system may suggest restaurant meals when cooking is not practical, when a meal plan allows it, or when the user explicitly requests prepared food.

## 3. Customer payment and purchasing model

Customers pay Project 220 directly for marketplace grocery, supplement, general merchandise, and supported restaurant orders. Project 220 coordinates purchasing on the customer's behalf and applies configurable markups, service fees, delivery fees, taxes, deposits, adjustments, and tips.

The checkout must clearly disclose:

- estimated retail subtotal
- Project 220 markup
- service and delivery fees
- taxes
- temporary authorization or contingency amount
- tips
- final adjustments after receipt reconciliation

Pharmacy orders follow the pharmacy-specific workflow in section 15. Prescription medication is dispensed by the licensed pharmacy and is never selected, altered, substituted, or medically approved by Project 220.

## 4. Pantry AI

### Required launch capabilities

- Photograph pantry, refrigerator, freezer, cupboards, grocery bags, receipts, and supplement storage.
- Require barcode scanning at launch for item confirmation and manual additions when a barcode exists.
- Permit receipt photography and receipt-based inventory reconciliation.
- Support one shared pantry per household with multiple household members.
- Enable expiration-date reminders.
- Require user review before AI-detected inventory changes are committed.

### Photo retention choice

For every scan session, users may choose:

- retain source photos in their private household storage; or
- automatically delete source photos after processing and confirmation.

The choice is saved as a household default but can be changed for each scan.

### Inventory item fields

Each inventory item supports:

- product, brand, category, barcode, package size
- quantity and unit
- opened/unopened status
- purchase and receipt references
- storage location
- estimated and confirmed expiry dates
- nutrition and allergen metadata
- cost and retailer
- household ownership and visibility
- confidence score and correction history

## 5. Household profiles and accessibility

A subscription and shopping plan is calculated according to the number and type of household members actively using the account and the number of people for whom shopping and meal planning are performed.

Supported life-stage classifications:

- infant
- child
- preteen
- teen
- adult
- elderly adult

Each member may also have accessibility and diet-support requirements. The platform must not require a diagnosis or disability name. It provides a private free-text field named **Diet and Shopping Support Notes** for requirements such as texture, packaging, preparation, ingredient avoidance, swallowing considerations, mobility-related packaging needs, or caregiver instructions.

Household roles:

- owner
- household administrator
- adult member
- dependent profile manager
- shopper-authorized member
- view-only member
- guest

## 6. Premium cookbook

The cookbook is a premium in-app feature.

### Included

- personalized recipes based on each client's nutrition plan
- breakfast, lunch, dinner, dessert, beverages, and snacks
- yogurt and frozen-yogurt recipes
- healthy snacks aligned with the nutrition plan
- kid-friendly meals and snacks
- family-size recipes
- bulk-cooking and meal-prep recipes
- life-stage filtering
- dietary and allergy filters
- pantry-first and use-before-expiry recipes
- restaurant-style healthy alternatives

### Restrictions

- no PDF or file download
- no publishing through Project 220
- no selling generated cookbooks or recipes
- generated recipes and cookbooks remain private by default
- sharing is limited to authorized household members unless a later policy explicitly permits more

The application may render print-like pages on screen, but export, copy-packaging, public links, and marketplace resale remain disabled.

## 7. AI coaching

### General wellness coach

The AI coach provides general wellness guidance, reminders, habit support, nutrition-plan assistance, activity encouragement, pantry and budget insights, and progress summaries. It does not diagnose, prescribe, modify medication, or replace medical care.

### Professional coach marketplace

A tiered professional marketplace may include approved fitness coaches, personal trainers, and approved wellness professionals. Users may not connect dietitians or support workers through the first release.

### Required warnings

Every coaching experience must include an accessible medical and emergency disclaimer. Urgent or emergency symptoms must direct the user to local emergency services rather than continuing routine coaching.

### Notifications

Configurable reminders include meals, hydration, workouts, supplements, shopping, pantry expiry, substitution requests, delivery status, household activity, and weekly progress summaries.

## 8. Unified shopping cart

One Project 220 cart may contain items from multiple grocery, general merchandise, supplement, pharmacy pickup, and restaurant sources.

The customer receives:

- one cart
- one Project 220 checkout where legally permitted
- one order dashboard
- grouped retailer fulfilment segments
- separate substitution and fulfilment status per segment
- one consolidated Project 220 receipt plus retailer receipt records

Orders may be split into multiple shopping and delivery tasks while remaining connected under one parent order.

## 9. Store selection modes

Customers can select:

- preferred store
- cheapest basket
- fastest delivery
- balanced recommendation combining price and delivery time

The customer may lock specific items to a preferred retailer or brand. The optimizer may recommend changes but cannot override locked selections.

## 10. Smart Basket Optimizer

The optimizer runs before checkout and whenever a material cart change occurs.

### Cost optimization

- compare retailer and restaurant prices when current data is available
- calculate lowest practical basket cost
- account for markups, service fees, delivery fees, taxes, minimums, travel, and split-order costs
- show estimated savings and confidence
- never present stale or estimated pricing as guaranteed

### Nutrition optimization

- compare the full basket with household nutrition plans
- identify protein, produce, fibre, whole-grain, healthy-fat, sodium, sugar, and variety gaps
- respect allergies, dietary restrictions, life stage, and support notes
- offer alternatives, never silently replace

### Supplement optimization

- compare cart items with supplement inventory and schedules
- estimate days of supply
- identify duplicates
- recommend reorder timing and suitable package sizes
- avoid medical claims and medication interactions unless supplied by an approved clinical data service and presented as a safety warning

### Budget optimization

- support weekly, monthly, grocery, restaurant, household, and supplement budgets
- show projected spend before checkout
- warn about budget overruns
- suggest lower-cost choices
- measure accepted savings over time

### Recipe optimization

- match basket and pantry inventory to approved private recipes
- show recipes unlocked by one or more missing ingredients
- prioritize family-size, bulk-cooking, kid-friendly, snack, yogurt, and frozen-yogurt options when relevant
- account for cooking time and household size

### Waste prevention

- flag duplicate inventory
- prioritize items near expiry
- suggest freezing, meal preparation, portion changes, or delayed purchase
- calculate estimated waste and cost avoided

### Basket score

The 0–100 basket score uses configurable weights:

- cost: 20
- nutrition: 20
- pantry utilization: 15
- recipe readiness: 15
- supplement efficiency: 10
- budget performance: 10
- waste prevention: 10

## 11. Smart Pantry Score

Each household receives a 0–100 score based on:

- nutrition balance: 20
- freshness: 20
- pantry completeness: 15
- meal readiness: 15
- grocery efficiency: 10
- waste prevention: 10
- household goals: 10

The score must explain its inputs and allow households to disable goal-based personalization. Weekly reports show score changes, expiring items, meals available, savings estimates, and waste estimates.

## 12. Substitutions

All substitutions require customer approval.

A substitution request includes:

- original item
- proposed replacement
- quantity and package size
- price difference
- nutrition and allergen differences
- photograph when available
- response deadline

The customer can approve, reject, request another option, or remove the item. Allergy-conflicting alternatives are blocked.

## 13. Marketplace roles

### Customer

Builds carts, manages household information, approves substitutions, pays, tracks orders, and receives deliveries.

### Shopper

Accepts shopping tasks, follows lists, scans items, requests substitutions, uploads receipts, and completes retailer handoff.

### Driver

Accepts delivery tasks, verifies safe handling, maintains chain of custody, records required evidence, and completes delivery.

### Restaurant or retailer operator

Manages available products, order readiness, pricing feeds, and fulfilment status where direct integration exists.

### Administrator

Manages users, service areas, retailers, pharmacies, restaurants, pricing, fees, safety policies, incidents, refunds, payouts, and audits.

## 14. Safe food handling and delivery verification

All shoppers and drivers must accept and follow the current safe-food-handling policy and any applicable local requirements before activation.

### Required task checklist

The shopper/driver dashboard provides an order-specific checklist with timestamped confirmations and photographs where required. Configurable tasks include:

- clean hands and clean work area
- appropriate glove use where required by policy or task
- clean, food-safe bags and containers
- separation of raw meat, seafood, produce, ready-to-eat food, household chemicals, and medication
- produce placed in appropriate bags
- tamper-evident closure or zip tie applied when required
- bag label recording contents/category, weight or quantity when required, order identifier, and packing time
- hot and cold item separation
- insulated containers used for temperature-sensitive items
- temperature check and photograph for designated orders
- receipt and item-count reconciliation
- vehicle cargo area cleanliness confirmation
- no smoking or vaping around orders
- pharmacy package seal and identity-verification steps
- delivery photograph or customer handoff confirmation, subject to privacy settings

The app records checklist version, timestamps, GPS where consent and policy permit, evidence references, exceptions, and incident reports. Administrators can block completion when mandatory steps are missing.

Gloves do not replace handwashing. The policy and training must explain when gloves are appropriate and require glove changes to prevent cross-contamination.

## 15. Pharmacy pickup workflow

Project 220 may coordinate pickup and delivery from supported pharmacies only after legal, insurer, pharmacy, and privacy review.

### Core rules

- the licensed pharmacy dispenses the medication
- Project 220 does not prescribe, select, change, split, repackage, or substitute medication
- customer authorization and pharmacy release approval are required
- identity, age, signature, and recipient requirements are configurable per pharmacy and medication
- sealed pharmacy packaging must remain sealed
- temperature and time controls are followed when specified by the pharmacy
- medication details are hidden from shoppers and drivers except for minimum necessary handling instructions
- controlled, narcotic, refrigerated, high-risk, or otherwise restricted medications may be disabled by policy or jurisdiction
- failed identity verification results in return to the pharmacy, not unattended delivery
- pharmacy orders use a complete chain-of-custody audit trail

Prescription cost, co-pay, benefit processing, and Project 220 service charges must be separated. The final payment flow will depend on pharmacy agreements and applicable law.

## 16. Subscription and pricing model

Pricing is household-based and reflects:

- number of active account users
- number of people included in shopping and meal planning
- life-stage mix
- shopping volume
- number of stores per order
- marketplace delivery frequency
- premium AI and cookbook access
- coaching tier
- accessibility-related service effort without charging based on a disability diagnosis

Suggested configurable plan structure:

- Individual
- Couple or two-person household
- Small Family
- Large Family
- Extended Household
- Custom or Assisted Shopping Plan

The system stores pricing rules in configuration rather than code. Final public prices require partner approval, cost modelling, payment-processor fees, insurance, taxes, and legal review.

## 17. Privacy and safety principles

- minimum necessary data access
- private-by-default household and recipe data
- explicit consent for photo retention, location, household sharing, coaching access, and pharmacy pickup
- audit trails for purchases, substitutions, safety evidence, pharmacy custody, and administrator actions
- role-based permissions
- secure storage and deletion schedules
- no diagnosis required for dietary support notes
- child and dependent profiles controlled by an authorized adult
- no automatic purchase without clear customer approval

## 18. Launch geography

The architecture supports global expansion, but marketplace, pharmacy, restaurant, retailer, pricing, tax, labour, and food-safety rules are activated by service area. Winnipeg should be represented as the initial configurable launch market unless the owners approve a different launch area.
