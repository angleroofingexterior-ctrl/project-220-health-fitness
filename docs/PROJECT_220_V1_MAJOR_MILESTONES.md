# Project 220 Version 1.0 — Major Milestones Production Blueprint

Status: implementation-ready product specification

## Approved launch ecosystem

Project 220 Version 1.0 is built around five connected systems:

1. Pantry AI and shared household inventory
2. Premium private cookbook and recipe intelligence
3. Tiered AI wellness coaching and a future professional coach marketplace
4. Grocery and supplement shopping integration
5. Project 220-operated marketplace with a unified cart and direct customer payment

The existing nutrition, supplement, workout, and progress tools remain supporting modules.

## Approved retailers

### Grocery and household retailers

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

### Supplement retailers

- GNC
- Popeye's Supplements

Retailer adapters must support future stores without rewriting checkout, pricing, order, or fulfillment logic.

## Healthy restaurant alternatives

Project 220 will support healthy restaurant alternatives as a separate marketplace category. Users may choose restaurant meals when they cannot cook, when pantry ingredients are insufficient, or when the AI coach identifies a practical meal replacement.

Restaurant recommendations must support:

- calorie and macronutrient targets
- allergy and dietary filters
- high-protein, lower-sodium, higher-fibre, vegetarian, vegan, and family options
- budget limits
- distance, estimated preparation time, and delivery speed
- nutrition transparency when restaurant data is available
- user confirmation before ordering

Restaurant results may be ranked by healthiest fit, lowest price, fastest delivery, preferred restaurant, or best overall match.

## Milestone 1 — Household, privacy, and permissions foundation

### Deliverables

- household owner, adult member, child profile, and guest roles
- invitation and removal workflows
- one shared pantry per household with optional multiple storage zones
- granular permissions: view inventory, edit inventory, create lists, place orders, approve substitutions, manage payments, manage members
- private individual health records separated from shared household inventory
- audit trail for inventory and order changes
- consent records and notification preferences

### Acceptance criteria

- a household can contain multiple users
- household members can share pantry data without exposing another member's private health data
- only authorized members can place orders or approve substitutions
- all sensitive actions are logged

## Milestone 2 — Pantry AI, receipt scanning, barcode launch requirement, and expiry reminders

### Approved product rules

- users choose whether processed pantry photos are stored or deleted
- users can photograph receipts
- barcode scanning is required at launch
- multiple household members can share one pantry
- expiration reminders are enabled
- AI-detected changes require user confirmation when confidence is low or the change affects quantities materially

### Core inventory record

Each item stores:

- product name, brand, category, barcode, package size
- quantity and unit
- storage location: pantry, refrigerator, freezer, cupboard, supplement shelf, or custom zone
- purchase date, opened date, best-before date, expiry date
- retailer and price
- nutrition data and allergens when available
- photo-processing consent state
- source: manual, barcode, receipt, pantry photo, marketplace order, or import

### Required workflows

1. Scan barcode and add or update item.
2. Photograph receipt and review detected products, prices, quantities, and retailer.
3. Photograph pantry, refrigerator, freezer, cupboard, or supplement shelf.
4. Review AI detections and confidence levels.
5. Confirm, edit, or reject changes.
6. Choose store photos or delete after processing.
7. Receive expiry, low-stock, duplicate, and recall-style alerts when supported.

### Acceptance criteria

- barcode entry works even when a product is unknown by allowing manual completion
- receipt items are not added until the user confirms them
- shared inventory updates appear for authorized household members
- users receive configurable expiry reminders
- stored photos can be deleted later by the household owner or uploader

## Milestone 3 — Smart Pantry Score

The household receives a score from 0 to 100.

### Weighting

- nutrition balance: 20
- freshness: 20
- pantry completeness: 15
- meal readiness: 15
- grocery efficiency: 10
- waste prevention: 10
- household-goal alignment: 10

### Outputs

- current score and seven component scores
- explanation of every score change
- projected score after accepting a recommendation or proposed basket
- weekly report showing meals available, expiring items, estimated waste avoided, estimated savings, and missing staples
- optional household challenges

### Guardrail

The score must guide rather than shame. It must not use punitive language or imply medical diagnosis.

## Milestone 4 — Premium private cookbook and recipe engine

### Approved product rules

- premium-only feature
- viewable inside the app
- no PDF download or external export at launch
- family-size and bulk-cooking options included
- dietary and allergy filters included
- users cannot publish or sell generated cookbooks
- generated recipes remain private by default

### Recipe engine inputs

- household inventory
- expiring items
- family size
- bulk-cooking preference
- dietary rules and allergies
- nutrition goals
- cooking time, skill level, available equipment, and budget
- planned workouts when the user permits this data use

### Recipe engine outputs

- ingredient quantities and substitutions
- step-by-step instructions
- serving adjustment
- estimated nutrition and cost per serving
- pantry items used and missing ingredients
- expiry-first and waste-reduction recommendations
- batch-cooking, freezing, and leftover guidance

### Acceptance criteria

- recipes cannot include excluded allergens
- users can regenerate or replace a recipe
- cookbook content remains private to the authorized user or household
- no publishing, selling, public-link, or unrestricted export controls are exposed

## Milestone 5 — AI wellness coach and professional coach marketplace foundation

### Tiered coaching

#### General wellness AI

- nutrition, activity, hydration, sleep-habit, meal, grocery, pantry, budget, and supplement reminders
- weekly summaries and goal check-ins
- motivational and educational guidance
- no diagnosis, treatment plan, prescription, or emergency service representation

#### Professional coach marketplace

- approved fitness coaches, personal trainers, and permitted wellness professionals
- credentials, specialties, availability, pricing, reviews, booking, messaging, and session history
- users cannot connect a dietitian or support worker through the initial marketplace
- professional access to user data is opt-in, scoped, revocable, and logged

### Safety requirements

- prominent emergency warning and medical disclaimer
- escalation language for urgent symptoms or crisis situations
- coach output filters for dangerous exercise, supplement, eating, and medical advice
- clear distinction between AI guidance and professional coaching

### Notifications

- meals
- groceries
- workouts
- hydration
- supplements
- pantry expiry
- substitution approvals
- weekly progress and budget summaries

## Milestone 6 — Unified Shopping Cart

One cart may contain products from multiple grocery, household, and supplement retailers and, where enabled, healthy restaurant alternatives.

### Approved payment model

- customer pays Project 220 directly
- Project 220 purchases goods on the customer's behalf
- Project 220 presents one checkout, one order dashboard, and one customer receipt
- underlying retailer purchases, receipts, and fulfillment legs remain traceable internally

### Cart capabilities

- multiple retailer sections
- separate fulfillment windows per retailer or restaurant
- one customer payment authorization
- item-level taxes, deposits, fees, markups, discounts, substitutions, and tips
- split fulfillment and partial refunds
- customer approval when basket totals increase beyond the approved tolerance

## Milestone 7 — AI Shopping Assistant and Smart Basket Optimizer

### Required optimizer engines

#### Cost optimization

- compare eligible retailers and restaurant alternatives
- calculate preferred-store, cheapest-basket, and fastest-delivery options
- show item moves, extra delivery legs, fees, markups, taxes, and estimated savings
- never claim exact savings when price data is stale or estimated

#### Nutrition optimization

- evaluate basket-level protein, produce, fibre, whole grains, healthy fats, sodium, added sugar, and variety
- apply allergies and dietary exclusions before recommendations
- show suggestions rather than silently changing the cart

#### Supplement optimization

- compare cart against supplement inventory, schedule, and estimated days of supply
- identify duplicates and premature reorders
- support package-size and cost-per-serving comparison
- avoid medical claims and unsupported supplement recommendations

#### Budget optimization

- weekly, monthly, grocery, restaurant, and supplement budgets
- projected spend, over-budget warnings, and lower-cost alternatives
- household and individual budget scopes

#### Recipe optimization

- identify recipes available now
- find the smallest set of missing ingredients that unlocks the most useful recipes
- support family meals and bulk cooking
- prioritize expiring inventory

#### Waste prevention

- duplicate detection
- quantity reduction for historically wasted items
- expiry-first meal suggestions
- freezing and storage suggestions where safe
- donation suggestions for suitable unopened items

### Master basket score

- cost: 20%
- nutrition: 20%
- pantry utilization: 15%
- recipe readiness: 15%
- supplement optimization: 10%
- budget performance: 10%
- waste prevention: 10%

### User controls

Users may accept all, accept selected recommendations, dismiss, or restore the original basket. No purchase occurs without confirmation.

## Milestone 8 — Retailer and restaurant integration layer

### Adapter contract

Every integration adapter must normalize:

- retailer or restaurant identity and locations
- catalog items, options, sizes, nutrition, allergens, prices, promotions, and availability
- timestamps and price confidence
- cart validation
- checkout or shopper-purchase instructions
- order and fulfillment status
- receipts and refunds

### Integration modes

- official API integration
- affiliate or checkout handoff
- approved product feed
- manual shopper-assisted purchasing
- administrator-maintained catalog for pilot operations

No retailer or restaurant may be represented as officially integrated until a valid agreement or supported technical connection exists.

## Milestone 9 — Marketplace operations

### Roles

- customer
- household purchaser
- shopper
- driver
- shopper-driver
- professional coach
- retailer or restaurant operator where supported
- customer-support agent
- administrator

### Order lifecycle

1. Build or import list.
2. Run optimizer.
3. Choose preferred store, cheapest basket, fastest delivery, or healthiest restaurant alternative.
4. Approve basket, substitutions policy, fees, markup, and payment authorization.
5. Assign shopper or route order through an approved partner integration.
6. Scan and verify products.
7. Request approval for substitutions.
8. Capture underlying purchase receipt.
9. Assign delivery if separate.
10. Confirm handoff and proof of delivery.
11. Reconcile final amount and issue adjustment or refund.
12. Update pantry, budget, purchase history, and Smart Pantry Score.

### Substitution rule

Substitutions always require customer approval. The request must show original item, proposed replacement, size, price difference, relevant nutrition or allergen differences, and response deadline.

## Milestone 10 — Payments, pricing, markup, refunds, and payouts

### Customer pricing

- retail or restaurant item price
- Project 220 markup
- service fee
- delivery fee
- taxes and deposits
- optional tips
- promotions or credits

Prices and markups must be shown before order confirmation.

### Payment controls

- authorize an estimated total with a clearly disclosed tolerance
- capture only after fulfillment or according to the approved business model
- support final total adjustments, partial fulfillment, cancellations, credits, and refunds
- maintain an immutable financial ledger

### Marketplace payouts

- configurable shopper and driver compensation
- tips assigned according to the approved policy
- payout statements and reconciliation
- no production payout activation until legal, tax, banking, and worker-classification decisions are approved

## Milestone 11 — Notifications and communications

Channels:

- in-app
- push
- email
- optional SMS later

Events:

- expiry and low stock
- order accepted, shopping started, substitution required, checkout completed, out for delivery, delivered
- payment, adjustment, refund, and receipt
- coach reminders and weekly summaries
- household invitations and permission changes

All marketing notifications require separate consent from operational notifications.

## Milestone 12 — Administration, analytics, and support

### Administration

- retailer, restaurant, product, markup, fee, and service-zone management
- order intervention, refund, fraud review, and customer support
- shopper, driver, and professional-coach onboarding and status
- audit logs and feature flags

### Analytics

- gross merchandise value
- revenue, markup, fees, refunds, and payouts
- fulfillment time and substitution rate
- basket savings estimates and confidence
- pantry-score changes
- food waste prevented estimates
- customer retention and premium conversion

## Milestone 13 — Security, privacy, and compliance implementation

- least-privilege authorization
- encrypted transport and managed encrypted storage
- separate secrets for development, staging, and production
- private media storage with expiring access links
- user-controlled pantry-photo retention
- account and data export/deletion workflows
- payment data handled by a compliant payment provider rather than stored directly
- audit logging, backups, restore testing, rate limiting, validation, abuse controls, and incident response
- Canadian privacy and consumer-law review before public launch
- marketplace, food, tax, insurance, employment/contractor, accessibility, and health-claim legal review before activation

## Milestone 14 — Testing and release gates

### Automated tests

- authorization and household isolation
- inventory and quantity calculations
- expiry reminders
- recipe allergen exclusion
- optimizer calculations and reversibility
- cart totals, markup, taxes, refunds, and ledger integrity
- substitution approval
- order state transitions
- notification preferences

### Human testing

- accessibility
- Android, iPhone, tablet, and web
- barcode camera performance
- receipt and pantry-photo review flows
- real shopping and delivery pilot
- poor connectivity and offline recovery
- restaurant nutrition and allergen disclaimer presentation

### Release sequence

1. internal development
2. staging with simulated payments and stores
3. invitation-only Winnipeg household pilot
4. controlled shopper and driver pilot
5. premium and coaching beta
6. public regional launch after legal and operational approval

## Milestone 15 — Implementation backlog order

1. household permissions and data isolation
2. inventory schema and manual inventory
3. barcode scanner
4. receipt import and review
5. pantry-photo workflow and retention choice
6. expiry reminders
7. Smart Pantry Score
8. recipes and premium cookbook
9. unified cart
10. retailer adapters and normalized catalog
11. Smart Basket Optimizer engines
12. checkout and payment ledger
13. substitution workflow
14. shopper and driver applications
15. restaurant alternatives
16. AI wellness coach
17. professional coach marketplace
18. administration and analytics
19. security, load, accessibility, and pilot testing
20. signed production releases

## Decisions recorded as final for this blueprint

- pantry photos: user chooses store or delete after processing
- receipts: supported
- barcode: required at launch
- pantry: shared by multiple household members
- expiration reminders: enabled
- cookbook: premium, app viewing only, private, not publishable or sellable
- family and bulk cooking: enabled
- dietary and allergy filters: enabled
- coaching: tiered AI wellness plus professional coach marketplace
- dietitian and support-worker connections: excluded from initial professional marketplace
- reminders and notifications: enabled
- customer pays Project 220 directly
- Project 220 purchases on the customer's behalf
- substitutions require approval
- shopping modes: preferred store, cheapest basket, fastest delivery
- prices include disclosed markups
- unified cart: enabled
- healthy restaurant alternatives: enabled
