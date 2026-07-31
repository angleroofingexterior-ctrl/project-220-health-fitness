# Project 220 Version 1.0 — Major Milestones

Status: implementation blueprint approved for staged production work.

## Product priority

The first production program is centred on:

1. Pantry AI
2. Grocery and supplement retail integration
3. Premium in-app cookbook
4. General wellness AI coaching and a future professional-coach marketplace
5. Project 220 grocery marketplace
6. Unified cart and Smart Basket Optimizer

The existing fitness, nutrition, supplement and progress modules support these systems.

## Approved business decisions

### Pantry AI
- Users choose whether processed pantry photos are retained or deleted.
- Receipt photography is supported.
- Barcode scanning is required at launch.
- Multiple household members may share one pantry.
- Expiration reminders are enabled.
- Inventory changes produced by vision, receipt or barcode processing require user confirmation.

### Premium cookbook
- Premium feature.
- Viewable only inside Project 220.
- No PDF or external recipe download.
- Family-size and bulk-cooking modes are included.
- Dietary and allergy filters are included.
- Generated recipes and cookbooks are private by default.
- Users cannot publish or sell generated cookbooks through Project 220.

### Coaching
- Tiered general-wellness AI coaching.
- Future professional-coach marketplace.
- No dietitian or support-worker connection feature.
- Reminders and notifications included.
- Emergency, medical and wellness disclaimers required.
- AI coaching must not diagnose, prescribe, or present itself as emergency care.

### Retailers
Initial retailer catalogue:
- No Frills
- Giant Tiger
- Walmart
- Real Canadian Superstore
- Safeway
- Sobeys
- FreshCo
- GNC
- Popeye's Supplements

The retailer adapter layer must support additional stores without redesigning the cart or order domains.

### Payments and fulfilment
- Customers pay Project 220 directly.
- Project 220 purchases goods on the customer's behalf.
- Substitutions require customer approval.
- Customers may choose a preferred store, cheapest basket, or fastest delivery.
- Prices include configurable Project 220 markups.
- The app shows grocery cost, markup, fees, tax, tip and final total before payment.

### Unified cart
- One cart and one Project 220 payment may contain items from multiple retailers.
- Orders may be divided into fulfilment groups while remaining one customer-facing order.
- Tips are tracked separately from merchandise, markups, taxes and fees.

## Milestone 1 — Secure platform foundation

Deliverables:
- Account, profile and session architecture.
- Household, membership, invitation and permission models.
- PostgreSQL and Drizzle production schema.
- Tenant isolation: every user request is scoped to an authorized user and household.
- Audit events for inventory, order, payment, role and privacy-setting changes.
- Environment validation and secrets documentation.
- Data export and account deletion workflows.

Acceptance criteria:
- A user cannot read or modify another household's private records.
- Household owners can invite, remove and assign member permissions.
- Sensitive writes generate auditable events.
- Production secrets are never committed to the repository.

## Milestone 2 — Pantry intelligence

Deliverables:
- Pantry, refrigerator and freezer locations.
- Product, package, barcode and nutrition-reference records.
- Inventory lots with quantity, unit, opened state and expiration date.
- Manual entry and editing.
- Barcode-required launch workflow.
- Receipt upload and extraction review queue.
- Pantry-photo processing with retain/delete preference.
- Shared household updates and conflict-safe inventory events.
- Expiration reminders.
- Smart Pantry Score from 0 to 100.

Smart Pantry Score weights:
- Nutrition balance: 20
- Freshness: 20
- Pantry completeness: 15
- Meal readiness: 15
- Grocery efficiency: 10
- Waste prevention: 10
- Household-goal alignment: 10

Acceptance criteria:
- AI-extracted items are not committed until reviewed.
- Users can correct product, quantity, location and expiration data.
- Deletion preference removes original images after processing while retaining only permitted structured results and audit metadata.
- Household members see authorized inventory updates.

## Milestone 3 — Recipes and premium cookbook

Deliverables:
- Recipe, ingredient, instruction, nutrition and allergen models.
- Pantry-based recipe matching.
- Missing-ingredient and recipe-unlock calculations.
- Family-size scaling.
- Bulk cooking and batch preparation.
- Dietary and allergy exclusion rules.
- Weekly meal-plan generation.
- Private premium cookbook shelves and in-app reader.
- Screenshot-resistant and export-disabled presentation where the platform permits; no download endpoint.

Acceptance criteria:
- Restricted allergens are excluded from generated suggestions.
- Serving changes recalculate quantities and nutrition.
- Cookbook access requires an active eligible entitlement.
- Cookbook records are private unless a future explicit sharing feature is approved.

## Milestone 4 — Smart Basket Optimizer

The optimizer produces recommendations; the user approves changes.

### Cost optimization
- Compare item and basket estimates across enabled retailers.
- Calculate preferred-store, cheapest-basket and fastest-delivery scenarios.
- Include retailer splits, additional fees and markups in comparisons.

### Nutrition optimization
- Evaluate protein, produce, whole grains, fibre, healthy fats, sodium, added sugar and micronutrient variety.
- Respect household dietary and allergy rules.

### Supplement optimization
- Check supplement inventory, planned schedule and estimated days of supply.
- Prevent unnecessary duplicate purchases.
- Support GNC and Popeye's Supplements in the same cart model.
- Wellness-only recommendations; no diagnosis or treatment claims.

### Budget optimization
- Weekly, monthly, grocery, supplement and household budgets.
- Pre-checkout warnings and lower-cost alternatives.
- Spending projections and savings estimates.

### Recipe optimization
- Prefer items that complete planned meals or unlock multiple recipes.
- Avoid buying ingredients already available in sufficient quantity.

### Waste prevention
- Prioritize soon-to-expire inventory.
- Recommend smaller quantities when prior waste patterns support it.
- Suggest freezing or safe storage where appropriate.

Basket score weights:
- Cost: 20%
- Nutrition: 20%
- Pantry utilization: 15%
- Recipe readiness: 15%
- Supplement optimization: 10%
- Budget performance: 10%
- Waste prevention: 10%

Acceptance criteria:
- Original and optimized baskets remain viewable.
- Each recommendation shows reason, estimated effect and accept/decline controls.
- No substitution or purchase is finalized without required approval.

## Milestone 5 — Grocery and supplement marketplace

Customer flow:
1. Build or generate list.
2. Select preferred-store, cheapest-basket or fastest-delivery mode.
3. Run Smart Basket Optimizer.
4. Review retailer fulfilment groups, markup, fees, tax and tip.
5. Authorize payment to Project 220.
6. Shopper purchases on the customer's behalf.
7. Customer approves or rejects substitutions.
8. Shopper or driver completes delivery.
9. Receipt is reconciled.
10. Inventory, spending and Smart Pantry Score are updated.

Roles:
- Customer
- Household member
- Shopper
- Driver
- Professional coach
- Retailer/operator support
- Administrator

Core order states:
- draft
- optimized
- awaiting_payment
- paid
- assigned
- shopping
- awaiting_substitution
- ready_for_delivery
- out_for_delivery
- delivered
- reconciliation_required
- completed
- cancelled
- refunded

Acceptance criteria:
- One customer-facing order supports multiple retailer fulfilment groups.
- Every substitution records customer approval or rejection.
- Markups and fees are configurable and disclosed.
- Payment settlement, shopper expenses, refunds, tips and payouts are separately recorded.

## Milestone 6 — AI shopping assistant and coaching

Shopping assistant:
- Before shopping: generate lists from pantry, meal plans, goals and budgets.
- During shopping: monitor availability, substitutions, cost and budget.
- After shopping: reconcile receipt, update inventory and refresh plans.

General wellness coach:
- Meal, hydration, workout, supplement and habit reminders.
- Weekly progress summaries.
- Pantry and budget insights.
- Explicit wellness scope and emergency banner.

Professional-coach marketplace:
- Coach application and approval.
- Credentials and service catalogue.
- Client booking, messaging and consent-based data sharing.
- Tiered subscriptions and/or sessions.
- Excludes dietitian and support-worker connection categories unless later approved.

Acceptance criteria:
- AI responses include safety boundaries where health risk may be present.
- Private household and personal data is only shared with a coach after explicit, revocable consent.
- Notifications honour quiet hours and category settings.

## Milestone 7 — Production release and operations

Deliverables:
- Production PWA deployment.
- Android signed app bundle and release APK.
- iOS Capacitor project and TestFlight preparation.
- CI for lint, type checks, tests, PWA verification and mobile builds.
- Observability, backups, incident procedures and feature flags.
- Store listing, privacy disclosures and data-safety documentation.
- Winnipeg-first marketplace controls with future regional expansion.

Release gates:
- Security review completed.
- Payment and refund flows tested in sandbox and production-readiness review.
- Privacy and legal documents approved by the corporation.
- Shopper/driver business and insurance requirements approved.
- Accessibility and device testing completed.
- No unresolved critical or high-severity defects.

## Delivery sequence

1. Merge verified Build 0.2 foundation.
2. Commit this approved v1 blueprint.
3. Add production domain contracts and schema.
4. Implement household and inventory foundation.
5. Implement recipes/cookbook entitlement boundary.
6. Implement basket optimizer as deterministic services before connecting external AI.
7. Implement marketplace order state machine and payment abstraction.
8. Add AI adapters, notifications and coaching safety layer.
9. Connect approved external providers and retailer data sources.
10. Complete store signing, legal approvals and public launch gates.
