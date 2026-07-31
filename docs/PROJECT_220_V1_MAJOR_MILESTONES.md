# Project 220 Version 1.0 — Major Milestones

Status: implementation blueprint approved for development
Branch: `project-220-v1-marketplace-2`

## Product priority

The following systems are first-class Version 1.0 requirements and must be completed before the wider public production launch:

1. Pantry AI and shared household inventory
2. Unified grocery and supplement shopping
3. Smart Basket Optimizer
4. Premium private cookbook
5. AI wellness coaching and professional coach marketplace
6. Grocery marketplace operations
7. Safe food handling evidence and compliance

## Milestone 1 — Accounts, households, consent and privacy

### Scope
- Secure user registration, login, email verification and password reset.
- Household owner, adult, child and limited guest profiles.
- Multiple household members may share one pantry.
- Household permissions: view inventory, edit inventory, build lists, approve substitutions, place orders and manage billing.
- Pantry-photo retention choice at first use and in settings:
  - store photos after processing; or
  - delete photos after processing.
- Generated recipes and cookbooks remain private by default.
- Users cannot publish, sell or publicly share generated cookbooks through Project 220.
- Consent, privacy, medical, emergency, allergy and wellness disclaimers.

### Acceptance criteria
- A user can create or join one or more households.
- Household administrators can invite and remove members.
- Inventory changes show who made each change.
- Pantry-photo deletion preference is enforced after successful processing.
- Sensitive household and coaching data is isolated by account and household permissions.

## Milestone 2 — Pantry AI, receipts, barcode scanning and expiry reminders

### Scope
- Pantry, refrigerator, freezer and supplement storage locations.
- Required barcode scanning at launch, with manual correction when product data is missing.
- Receipt photography and item extraction.
- Pantry-photo recognition with user review before inventory updates.
- Item fields: name, brand, barcode, category, quantity, unit, package size, price, retailer, purchase date, opened date, expiry date, storage location, allergens and nutrition facts when available.
- Expiration reminders enabled by default, with configurable timing.
- Shared household pantry and collaborative grocery lists.
- Smart Pantry Score from 0–100.

### Smart Pantry Score weights
- Nutrition balance: 20
- Freshness: 20
- Pantry completeness: 15
- Meal readiness: 15
- Grocery efficiency: 10
- Waste prevention: 10
- Household goals: 10

### Acceptance criteria
- Users can add inventory by barcode, receipt, photo and manual entry.
- AI-generated inventory changes require confirmation.
- Users receive reminders for items nearing expiry.
- The app recommends recipes that use expiring ingredients first.
- Shared pantry changes synchronize for authorized household members.

## Milestone 3 — Premium cookbook and recipe intelligence

### Scope
- Premium in-app cookbook; no PDF download or export.
- Private recipes and generated cookbooks.
- Family-size portions and bulk-cooking modes.
- Kid-friendly meals and snacks.
- Dietary, allergy and ingredient-exclusion filters.
- Client-tailored nutrition plans.
- Healthy snack categories, including:
  - yogurt bowls;
  - frozen-yogurt snacks;
  - fruit and yogurt combinations;
  - smoothies;
  - high-protein snacks;
  - kid-friendly snacks;
  - school-lunch snacks;
  - budget snacks;
  - make-ahead and freezer snacks.
- Recipe nutrition, serving scaling, preparation time, storage guidance and allergen warnings.
- Healthy restaurant alternatives tied to each client’s nutrition plan.

### Healthy restaurant alternatives
- Search by location, meal type, dietary needs, allergies, calories, protein, budget and delivery speed.
- Show healthier menu alternatives without representing them as medical advice.
- Allow users to compare restaurant meals against pantry meals and their current daily targets.
- Include restaurant orders in budget, nutrition and coaching summaries when the user chooses.

### Acceptance criteria
- Premium users can generate and view a private cookbook in the app.
- Recipes automatically scale for individual, family and bulk preparation.
- Kid-friendly mode excludes unsuitable ingredients and applies household allergy rules.
- Cookbook content cannot be exported, published or sold through the platform.
- Healthy restaurant alternatives are clearly identified as suggestions and depend on current menu information where integrations exist.

## Milestone 4 — Unified shopping cart and retailer network

### Launch grocery and general retailers
- No Frills
- Giant Tiger
- Walmart
- Real Canadian Superstore
- Safeway
- Sobeys
- FreshCo
- Dollarama
- Dollar Tree
- Save-On-Foods
- Additional major stores through retailer adapters

### Launch supplement retailers
- GNC
- Popeye’s Supplements

### Scope
- One cart spanning multiple retailers.
- One payment made directly to Project 220.
- Project 220 purchases products on the customer’s behalf.
- Prices may include disclosed markups.
- Customer options:
  - preferred store;
  - cheapest basket;
  - fastest delivery.
- Substitutions always require customer approval.
- Separate fulfillment legs may be used for multi-store orders while maintaining one customer order dashboard.

### Acceptance criteria
- A customer can combine groceries and supplements in one cart.
- Checkout displays retail subtotal, markup, service fees, delivery fees, taxes, deposits, discounts and tips separately.
- No substitution can be finalized without recorded customer approval.
- The system can split fulfillment by retailer without creating duplicate customer payments.

## Milestone 5 — Smart Basket Optimizer

### Optimization engines

#### Cost optimization
- Compare item and basket prices across enabled retailers.
- Calculate cheapest single-store and multi-store baskets.
- Account for delivery fees, markups, taxes, minimum orders and travel/fulfillment costs.
- Respect preferred brands and locked items.

#### Nutrition optimization
- Evaluate the basket as a whole for protein, produce, fibre, whole grains, healthy fats, sodium, added sugar and meal-plan compatibility.
- Apply allergies and dietary restrictions before suggestions.
- Present recommendations for approval; never silently alter a cart.

#### Supplement optimization
- Compare current supplement inventory, days of supply, schedules and duplicate active ingredients.
- Suggest reorder timing and package-size savings.
- Avoid medical treatment claims and provide supplement safety warnings.

#### Budget optimization
- Support weekly, monthly, grocery, supplement, household and individual budgets.
- Show projected spend and lower-cost alternatives.
- Require user confirmation before changing the basket.

#### Recipe optimization
- Identify meals already possible from inventory.
- Recommend the smallest set of added ingredients that unlocks the greatest number of suitable meals.
- Include kid-friendly, family-size, bulk-cooking and healthy-snack options.

#### Waste prevention
- Prioritize ingredients nearing expiry.
- Flag duplicates and likely over-purchasing.
- Suggest freezing, portioning or reducing quantities where safe.
- Track estimated cost and food waste avoided.

### Master Optimization Score
- Cost: 20%
- Nutrition: 20%
- Pantry utilization: 15%
- Recipe readiness: 15%
- Supplement optimization: 10%
- Budget performance: 10%
- Waste prevention: 10%

### Acceptance criteria
- Every recommendation explains the expected benefit and trade-off.
- The customer can accept or reject recommendations individually.
- Locked items, allergies, dietary restrictions and approved brands are never overridden.
- The score recalculates before checkout and after confirmed substitutions.

## Milestone 6 — AI shopping assistant

### Before shopping
- Review pantry, refrigerator, freezer and supplement inventory.
- Review receipts, consumption history, meal plan, allergies, nutrition targets and budget.
- Generate a proposed list and restock recommendations.

### During shopping
- Monitor price, budget, availability, substitutions and duplicate purchases.
- Alert the customer when approval is required.
- Show cheaper, healthier and faster alternatives.

### After shopping
- Import the final receipt.
- Reconcile ordered, substituted, refunded and delivered items.
- Update inventory and expiry estimates.
- Update budgets, nutrition planning and Smart Pantry Score.

### Acceptance criteria
- AI recommendations never place or modify an order without confirmation.
- Inventory is updated from the final fulfilled order, not merely the original cart.
- Household members only see information permitted by their role.

## Milestone 7 — AI wellness coaching and professional coaching marketplace

### General wellness coaching
- Tiered plans.
- Nutrition, hydration, sleep, movement, grocery, pantry, meal and habit guidance.
- Reminders and notifications.
- Weekly progress summaries.
- Emergency and medical disclaimer warning.
- No diagnosis, emergency response, prescribing or treatment claims.

### Professional coach marketplace
- Approved fitness coaches, personal trainers and permitted wellness professionals.
- Dietitians and support workers are not connectable through the initial marketplace.
- Coach verification, profile, availability, booking, payment, reviews and client consent.
- Clients control which records are shared.

### Acceptance criteria
- AI coaching is visibly distinguished from professional coaching.
- Emergency wording directs users to local emergency services and appropriate professional care.
- Coaches cannot access client records without explicit, revocable consent.
- Notifications can be controlled by category and quiet hours.

## Milestone 8 — Marketplace operations and payments

### Roles
- Customer
- Household administrator/member
- Shopper
- Driver
- Professional coach
- Retailer operations user
- Customer support
- Marketplace administrator

### Order lifecycle
1. Build cart.
2. Optimize basket.
3. Review and approve recommendations.
4. Authorize payment to Project 220.
5. Assign shopping and delivery legs.
6. Purchase items on the customer’s behalf.
7. Request and record substitution approvals.
8. Capture final receipt and reconcile totals.
9. Perform safe-food-handling checks.
10. Deliver and capture proof of delivery.
11. Settle adjustments, tips and payouts.
12. Update inventory, budget and scores.

### Acceptance criteria
- Payment changes caused by substitutions or out-of-stock items are reconciled transparently.
- Tips are tracked separately from Project 220 revenue.
- Refunds and disputes preserve an audit trail.
- Multi-store orders can have multiple shoppers or drivers while retaining one customer-facing order.

## Milestone 9 — Driver and shopper safe food handling compliance

Project 220 requires shoppers and drivers to follow applicable safe-food-handling requirements and platform procedures. The app must not claim that photographs alone prove regulatory compliance; they are supporting operational evidence.

### Required dashboard checklist
Before accepting food:
- Confirm vehicle/cargo area is clean and free from chemicals, pets, smoke and contamination risks.
- Confirm insulated hot/cold bags and coolers are clean and available when required.
- Confirm hand hygiene was completed.
- Confirm clean disposable gloves are available for tasks that require them. Gloves do not replace handwashing and must be changed between contamination risks.

At store pickup or shopping completion:
- Separate raw meat, poultry and seafood from produce and ready-to-eat food.
- Place raw products in leak-resistant secondary bags.
- Keep chemicals and non-food products separate from food.
- Verify refrigerated and frozen products are collected near the end of the shop where practical.
- Record pickup time.
- Capture required temperature evidence where the operating policy or local rules require it.

Produce handling:
- Use clean food-grade produce bags.
- Apply tamper-evident zip tie or seal when required by Project 220 procedure.
- Label bag with product, measured weight or item count, order identifier and preparer initials/time.
- Never write directly on unpackaged food.

Vehicle loading:
- Photograph separated food zones before departure.
- Confirm cold foods are in insulated cold storage with suitable cooling media.
- Confirm hot foods are separated in suitable insulated storage.
- Confirm food is protected from crushing, leaking and cross-contamination.
- Record departure time.

At delivery:
- Verify address and customer instructions.
- Check packaging for leaks, broken seals, contamination or temperature concerns.
- Photograph sealed order at the permitted delivery location without exposing private household details unnecessarily.
- Record delivery time and obtain required customer confirmation.
- Report and quarantine unsafe items rather than delivering them.

### Evidence controls
- Each mandatory task has a checkbox, timestamp and responsible worker ID.
- Specified tasks require a photo before the Next button activates.
- Photos are linked to the order leg and retained according to the approved evidence-retention policy.
- Location and timestamp metadata are collected only with appropriate disclosure and consent.
- Failed checks create an incident and block completion until resolved or escalated.
- Administrators can review evidence, incidents and corrective actions.

### Acceptance criteria
- A driver cannot mark a controlled delivery leg complete with missing mandatory checks.
- Required photos are captured in-app rather than selected from an old photo library, except where policy explicitly permits otherwise.
- Safety incidents are visible to operations staff immediately.
- The checklist can be configured by jurisdiction, retailer, food category and delivery method.

## Milestone 10 — Notifications, analytics, administration and audit

### Scope
- Expiration, meal, workout, hydration, supplement, substitution, order and delivery alerts.
- Quiet hours and per-category notification controls.
- Operations dashboard for orders, retailers, shoppers, drivers, coaches, refunds, incidents and safety evidence.
- Feature flags for staged launch.
- Audit logs for inventory, permissions, payments, substitutions, safety checks and administrative actions.

### Acceptance criteria
- High-risk actions have immutable audit records.
- Operations users can locate an order’s payment, substitution, receipt, safety and delivery history from one timeline.
- Analytics use aggregated or de-identified data where practical.

## Milestone 11 — Testing and staged release

### Required test groups
- Unit and integration tests.
- Permission and household-isolation tests.
- Payment and refund tests.
- Barcode, receipt and image-recognition confidence tests.
- Allergy and dietary rule tests.
- Safe-food-handling workflow tests.
- Accessibility tests.
- PWA and Android tests.
- Internal Winnipeg marketplace pilot.

### Release gates
- No critical security findings.
- No known cross-household data exposure.
- Payment reconciliation validated.
- Safety checklist blocking rules validated.
- Legal, insurance and food-handling requirements approved for launch jurisdiction.
- Retailer data sources and commercial permissions confirmed.

## Delivery sequence

1. Data model and permissions
2. Pantry, receipts, barcodes and expiry
3. Cookbook, snacks, kid-friendly meals and restaurant alternatives
4. Retailer catalogue and unified cart
5. Basket optimization and AI shopping assistant
6. Payments, orders and substitutions
7. Shopper/driver apps and safety evidence
8. AI wellness coach and professional coach marketplace
9. Administration, analytics and audit
10. Testing, Winnipeg pilot and staged launch
