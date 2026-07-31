# Pantry Photo Cookbook and Launch Checklist

## Pantry-photo cookbook flow

Project 220 must let a user photograph the contents of their pantry, cupboards, refrigerator, and freezer, then generate a private, editable inventory and cookbook aligned to that user's nutrition plan.

### User flow

1. User selects **Scan pantry**, **Scan cupboards**, **Scan fridge**, or **Scan freezer**.
2. The app explains that images remain private, strips EXIF/location metadata, and asks for permission before analysis.
3. The recognition service proposes detected items, brands, package sizes, estimated quantities, and confidence levels.
4. The user must review, correct, add, remove, and confirm every item before it affects the meal plan or grocery list.
5. Confirmed inventory is compared with the user's calorie, protein, macro, allergy, dietary, budget, cooking-time, serving-count, and equipment settings.
6. The app generates 1-day, 7-day, or 28–31-day meal plans that prioritize ingredients already owned.
7. Every recipe shows ingredients already available, ingredients running low, and ingredients still required.
8. The grocery list consolidates exact quantities and searches for lower-cost substitutions without violating allergies or dietary rules.
9. When a meal is swapped, the cookbook, macros, pantry deductions, leftovers, and grocery quantities recalculate.
10. Users can mark ingredients consumed, expired, donated, frozen, or restocked.

### Required safeguards

- Never treat image recognition as certain; display confidence and require user confirmation.
- Never infer expiry dates unless clearly visible and verified by the user.
- Never use pantry photos for advertising, analytics, model training, or unrelated profiling.
- Images and recognized inventory must follow the Project 220 local-only or user-held-key encrypted storage model.
- Administrators and delivery drivers must not receive pantry photos.
- Drivers receive only the approved shopping list and substitution rules.
- Allergy restrictions override cost optimization and substitutions.
- The system must support manual inventory entry when photo recognition is unavailable.

### Cookbook generation requirements

- Prioritize owned ingredients and foods nearing user-confirmed expiry.
- Support breakfast, lunch, dinner, snacks, shakes, desserts, batch cooking, leftovers, freezer meals, and no-cook meals.
- Offer multiple recipe choices for each meal slot.
- Generate at least a full month of variety while avoiding unwanted repetition.
- Show calories, protein, carbohydrates, fats, fibre, serving size, preparation time, storage, reheating, and substitutions.
- Let users choose budget-first, pantry-first, fastest-prep, highest-protein, family-friendly, or maximum-variety modes.
- Produce **Already have**, **Still need**, and **Full list** views with measurable quantities.

## Work required to make the full platform operational

### Phase 1 — Complete without external retail approvals

- Finish private onboarding, workout generation, form instructions, logs, adaptive planning, 30-day cookbook, manual pantry inventory, local progress photos, grocery consolidation, reminders, offline operation, privacy centre, export, and deletion controls.
- Add automated tests for calculations, allergies, data deletion, tracker blocking, offline use, and recipe/grocery recalculation.
- Perform accessibility, mobile, tablet, and browser testing.

### Phase 2 — Pantry image recognition

- Select an image-recognition provider that contractually prohibits training on customer images and supports immediate deletion.
- Create a production API account and server-side key management. Never place secret keys in the browser or public repository.
- Build the review-and-confirmation screen and confidence handling.
- Complete privacy and security testing before enabling the feature publicly.

### Phase 3 — Project 220 Delivery pilot

- Start with one pilot city and a controlled number of customers and approved shoppers/drivers.
- Implement driver onboarding, identity and eligibility checks appropriate to the jurisdiction, order claiming, item checklist, substitutions, in-app messaging, masked contact, receipts, proof of delivery, refunds, incident reporting, and support.
- Select payment, mapping/routing, messaging, tax, identity-verification, and notification providers.
- Obtain commercial insurance and legal review for delivery operations, worker classification, consumer protection, taxes, food handling, privacy, refunds, accessibility, and nondiscrimination.

### Phase 4 — Retail and partner integrations

- Apply for official commercial/API access from retailers and grocery platforms.
- Use approved product, inventory, pricing, cart, and checkout interfaces only.
- Where direct integrations are unavailable, use Project 220's own driver-shopping workflow or an approved external checkout partner.
- Do not scrape retailer websites or store customer payment credentials.

### Phase 5 — Geographic expansion

- Add one province, state, or country only after reviewing local tax, employment, insurance, delivery, privacy, accessibility, and consumer laws.
- Localize language, currency, units, nutrition labels, retailers, substitutions, and support.

## Actions required from the owner

1. Decide whether the first launch is **fitness/cookbook only** or includes a **Winnipeg delivery pilot**.
2. Establish a legal business entity and business bank account before accepting customer or delivery payments.
3. Engage a Canadian technology/privacy lawyer and accountant before public launch or paid delivery operations.
4. Obtain quotes for commercial general liability, cyber/privacy, and delivery/non-owned automobile coverage.
5. Choose and open production accounts for payments, maps/routing, notifications, customer-driver messaging, email, and optional image recognition.
6. Apply to retailers and grocery partners for official commercial/API access.
7. Decide the delivery pricing model: flat fee, distance fee, membership, markup, shopper fee, or a combination, with all charges disclosed before checkout.
8. Recruit a small group of testers representing different diets, budgets, abilities, ages, and device types.
9. Provide the final brand assets, support contact, refund policy, terms, privacy promise, nondiscrimination statement, and service area.
10. Never send API keys, payment secrets, identity documents, or customer data through GitHub issues or chat. Store secrets only in the approved hosting platform's encrypted secret manager.

## Definition of complete

The feature is complete only when a user can privately scan or enter food inventory, verify it, receive a diet-compliant monthly cookbook, see exact owned/missing quantities, generate a cheapest-safe grocery list, and optionally send an approved order to a supported checkout or Project 220 delivery workflow. All calculations, privacy controls, deletion functions, accessibility paths, and failure modes must be tested before release.
