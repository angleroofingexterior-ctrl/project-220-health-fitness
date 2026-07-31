# Project 220 Version 1.0 Production Blueprint

Status: implementation-ready architecture

## Product priorities

Version 1.0 is built around five connected systems:

1. Pantry AI and shared household inventory
2. Unified grocery and supplement shopping
3. Smart Basket Optimizer
4. Private premium cookbook and recipe intelligence
5. Tiered AI and professional wellness coaching

The existing nutrition, supplements, workouts, and progress modules remain supporting systems.

## Approved product rules

### Pantry AI

- Users choose whether source pantry photos are retained or deleted after processing.
- Receipt photographs are supported.
- Barcode scanning is required at launch.
- Multiple household members can share one pantry.
- Expiration reminders are enabled.
- AI-detected inventory changes require user confirmation when confidence is low.

### Cookbook

- Premium feature.
- Viewable only inside Project 220.
- No PDF download or recipe export.
- Family-size and bulk-cooking options are supported.
- Dietary and allergy filters are mandatory.
- Users cannot publish or sell generated cookbooks.
- Generated recipes and cookbooks are private by default.

### Coaching

- General wellness AI coaching is included.
- A professional wellness-coach marketplace is included as a separate tier.
- Dietitian and support-worker connections are excluded.
- Reminders and notifications are included.
- Emergency, medical, nutrition, supplement, and wellness disclaimers are mandatory.

### Retailers

Initial retailer adapters:

- No Frills
- Giant Tiger
- Walmart
- Real Canadian Superstore
- Safeway
- Sobeys
- FreshCo
- GNC
- Popeye's Supplements

Adapters must support manual catalogue import, retailer feed import, and future first-party APIs without changing checkout domain logic.

### Marketplace

- Customers pay Project 220 directly.
- Project 220 purchases products on the customer's behalf.
- Every substitution requires customer approval.
- Store-selection modes: preferred store, cheapest basket, and fastest delivery.
- Retail prices may include a Project 220 markup.
- One unified cart can contain items from multiple retailers.
- The checkout must clearly disclose retail subtotal, markup, service fees, delivery fees, taxes, tips, credits, and final total.

## System modules

- Authentication and identity
- Profiles and wellness goals
- Households, invitations, and permissions
- Pantry, refrigerator, freezer, and supplement inventory
- Vision-processing jobs
- Receipt ingestion
- Barcode catalogue
- Expiration and low-stock notifications
- Retailer catalogue and pricing adapters
- Unified carts and retailer sub-orders
- Smart Basket Optimizer
- Checkout, payments, refunds, and ledger
- Shopper and driver operations
- Recipes, meal plans, and private cookbook
- General wellness AI coach
- Professional coach marketplace
- Nutrition, workout, supplement, and progress tracking
- Administration, audit logging, analytics, and feature flags

## Major milestone sequence

### Milestone 1 — Domain foundation

Deliverables:

- Production database model
- Role and permission matrix
- Audit-event model
- Data-retention controls
- Retailer adapter contract
- Optimizer input/output contract

Acceptance criteria:

- Every record has an owner or household boundary.
- Sensitive reads and writes can be authorized consistently.
- Photos have an explicit retention policy.
- Marketplace money is represented with integer minor units.

### Milestone 2 — Pantry intelligence

Deliverables:

- Shared household inventory
- Manual inventory entry
- Barcode scan workflow
- Receipt capture workflow
- Image-analysis job workflow
- Expiration reminders
- Smart Pantry Score

Acceptance criteria:

- Household members see the same inventory according to permissions.
- Users can correct AI results before inventory mutation.
- A retained photo and a delete-after-processing photo follow different storage lifecycles.
- Inventory transactions preserve a history of every quantity change.

### Milestone 3 — Recipe and cookbook intelligence

Deliverables:

- Recipe catalogue
- Allergy and dietary exclusion engine
- Serving and batch scaling
- Pantry-match calculation
- Expiring-ingredient prioritization
- Private premium cookbook viewer

Acceptance criteria:

- Unsafe allergen matches are excluded, not merely ranked lower.
- Cookbook content is inaccessible without premium entitlement.
- No export or public publishing endpoint exists.
- Recipe quantities scale predictably with servings and batch count.

### Milestone 4 — Smart Basket Optimizer

Required optimization dimensions:

- Cost
- Nutrition
- Supplements
- Budget
- Recipe readiness
- Waste prevention

Acceptance criteria:

- The optimizer never changes a cart without approval.
- Every recommendation includes reasons, expected effect, confidence, and reversal data.
- Budget constraints can be treated as hard limits.
- Allergies are hard exclusions.
- Duplicate and unnecessary supplement purchases are flagged.

### Milestone 5 — Unified marketplace

Deliverables:

- Unified multi-retailer cart
- Retailer sub-orders
- Direct Project 220 checkout
- Markup and fee engine
- Shopper assignment
- Driver assignment
- Substitution approval
- Delivery proof
- Refund and adjustment ledger

Acceptance criteria:

- One customer payment can fund multiple retailer sub-orders.
- Customer approval is recorded for every substitution.
- Tips are accounted for separately from company revenue.
- Payment, purchase, refund, and payout records reconcile.

### Milestone 6 — AI coaching

Deliverables:

- General wellness coach
- Tiered entitlement model
- Reminder and notification engine
- Professional coach listings and bookings
- Consent-based data sharing with coaches
- Safety classifier and disclaimer presentation

Acceptance criteria:

- AI coaching never presents itself as medical diagnosis or emergency care.
- Emergency language routes users to local emergency resources.
- Professional coaches only see data explicitly shared by the member.
- Dietitian and support-worker provider categories are unavailable.

### Milestone 7 — Production release

Deliverables:

- Automated tests and CI gates
- Production environment template
- Signed Android App Bundle
- Installable PWA
- iOS project and TestFlight-ready build configuration
- Monitoring, backups, incident runbook, legal screens, and store metadata

Acceptance criteria:

- No production secrets exist in source control.
- Database backups and restore drills are documented.
- Account export and deletion are functional.
- Critical marketplace and payment events are auditable.

## Smart Pantry Score

Default score weights:

- Nutrition balance: 20
- Freshness: 20
- Pantry completeness: 15
- Meal readiness: 15
- Grocery efficiency: 10
- Waste prevention: 10
- Household goals: 10

The calculation must store both the final score and category explanations so users understand how to improve it.

## Smart Basket Optimizer score

Default weights:

- Cost: 20%
- Nutrition: 20%
- Pantry utilization: 15%
- Recipe readiness: 15%
- Supplement optimization: 10%
- Budget performance: 10%
- Waste prevention: 10%

Hard constraints override scoring:

- Allergens
- Explicit dietary exclusions
- Customer-locked products
- Legal or retailer restrictions
- Hard budget ceiling when enabled

## Definition of done

A milestone is complete only when its code, migrations, tests, operational documentation, accessibility review, privacy review, and acceptance criteria are complete. A design document alone is not a production completion claim.
