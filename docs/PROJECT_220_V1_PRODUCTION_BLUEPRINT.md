# Project 220 Version 1.0 Production Blueprint

## Purpose

This document is the implementation authority for the first production release of Project 220. The build is organized around Pantry AI, grocery and supplement commerce, the premium in-app cookbook, general wellness AI coaching, a professional coaching marketplace, and the Smart Basket Optimizer.

## Approved launch retailers

### Grocery and household

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

### Supplements

- GNC
- Popeye's Supplements

Retailers are represented through configurable adapters so additional stores can be added without rewriting checkout, basket optimization, or fulfillment logic.

## Healthy restaurant alternatives

Project 220 will support a restaurant-alternative discovery layer that can recommend healthier prepared-meal options when cooking is not practical. Recommendations must consider the client's nutrition plan, allergies, dietary preferences, calorie target, protein target, sodium, added sugar, budget, distance, availability, and current goals.

The launch design supports:

- healthier menu alternatives from participating restaurants;
- meal comparisons against the client's planned meal;
- high-protein, lower-calorie, lower-sodium, vegetarian, vegan, gluten-aware, and kid-friendly filters;
- restaurant meals added to the unified cart when technically and contractually supported;
- clear separation between verified nutrition data and estimated nutrition data;
- user confirmation before adding a restaurant alternative.

Restaurant recommendations are wellness guidance, not medical nutrition therapy.

## Major Milestone 1: Secure platform foundation

### Deliverables

- User accounts and profiles
- Household accounts and invitations
- Role-based permissions
- Secure session design
- Database domain model
- Audit records for sensitive changes
- Notification preferences
- Privacy controls
- Account export and deletion workflows

### Household roles

- Owner
- Administrator
- Adult member
- Limited member
- Child profile managed by an adult
- Guest viewer

Permissions are granular for pantry viewing, inventory updates, list creation, ordering, payment access, cookbook access, and household administration.

## Major Milestone 2: Pantry AI and shared inventory

### Approved behavior

- The user chooses whether processed pantry photos are stored or deleted.
- Receipt photography is supported.
- Barcode scanning is required at launch.
- Multiple household members can share one pantry.
- Expiration reminders are enabled.
- Inventory changes from AI, receipts, or barcodes require user review when confidence is low or quantities are uncertain.

### Inventory locations

- Pantry
- Refrigerator
- Freezer
- Supplement storage
- Household supplies

### Inventory record

Each item can store product name, brand, category, barcode, quantity, unit, package size, opened status, purchase date, expiration date, retailer, price, nutrition data, storage location, household ownership, confidence score, and source of entry.

### Smart Pantry Score

The household receives a score from 0 to 100 using:

- Nutrition balance: 20
- Freshness: 20
- Pantry completeness: 15
- Meal readiness: 15
- Grocery efficiency: 10
- Waste prevention: 10
- Household goal alignment: 10

The score includes explanations and improvement actions. It must not shame users or imply medical diagnosis.

## Major Milestone 3: Premium private cookbook

### Access and privacy

- Premium feature
- Viewable only inside the Project 220 app
- No PDF download or file export
- No user publishing or selling of generated cookbooks
- Generated recipes are private by default
- Household sharing is opt-in and permission-controlled

### Personalization

Recipes and collections are tailored to each client using:

- nutrition plan;
- calorie and macro targets;
- allergies and dietary restrictions;
- family size;
- cooking skill;
- available equipment;
- budget;
- pantry inventory;
- preparation time;
- fitness and wellness goals.

### Required cookbook content

- Breakfasts
- Lunches
- Dinners
- Family-size meals
- Bulk cooking and batch preparation
- Kid-friendly meals
- Kid-friendly snacks
- Yogurt snacks
- Frozen-yogurt snacks
- Smoothies
- High-protein snacks
- Low-preparation snacks
- School or work snacks
- Pantry-rescue recipes using items nearing expiration
- Healthy desserts

Every snack and recipe should show serving size, ingredients, instructions, estimated nutrition, allergy warnings, storage guidance, and suitable household profiles.

## Major Milestone 4: Smart Basket Optimizer

The optimizer runs before checkout and only applies changes after customer approval.

### Cost optimization

- Compare item and basket prices across supported retailers
- Show cheapest single-store basket
- Show optimized multi-store basket
- Include markup, taxes, service fees, delivery fees, and estimated tips in comparisons
- Explain savings and tradeoffs
- Respect preferred stores and brands

### Nutrition optimization

- Compare basket composition with the client's nutrition plan
- Identify protein, produce, fibre, healthy-fat, micronutrient, sodium, and added-sugar gaps
- Suggest alternatives without automatically replacing products
- Respect allergies and dietary restrictions

### Supplement optimization

- Check current supplement inventory
- Estimate days of supply
- Flag duplicate or premature purchases
- Compare package sizes and cost per serving
- Avoid medical claims
- Require user confirmation for all additions and substitutions

### Budget optimization

- Weekly and monthly grocery budgets
- Separate supplement budget
- Household and individual budget views
- Projected spend before checkout
- Warnings before budget overruns
- Lower-cost suggestions
- Savings history

### Recipe optimization

- Match cart and pantry items to the client's meal plan and cookbook
- Show recipes unlocked by the basket
- Suggest minimal extra ingredients that unlock multiple meals
- Prioritize family-size, bulk-cooking, kid-friendly, and tailored snack options when relevant

### Waste prevention

- Detect duplicate purchases
- Prioritize expiring inventory
- Suggest smaller quantities where waste history indicates overbuying
- Suggest freezing or safe storage where appropriate
- Track estimated waste and money prevented

### Basket score

- Cost: 20%
- Nutrition: 20%
- Pantry utilization: 15%
- Recipe readiness: 15%
- Supplement optimization: 10%
- Budget performance: 10%
- Waste prevention: 10%

## Major Milestone 5: Unified shopping cart and checkout

### Customer experience

- One cart across grocery, household, supplement, and supported restaurant partners
- One payment made directly to Project 220
- Project 220 purchases goods on the customer's behalf
- One order dashboard and receipt history
- Sub-orders may be fulfilled separately by retailer

### Store selection modes

- Preferred store
- Cheapest basket
- Fastest delivery

### Pricing

Prices include configurable Project 220 markups. Checkout must clearly disclose:

- merchandise subtotal;
- markup or service charge;
- taxes;
- delivery fees;
- temporary substitution authorization if used;
- tip;
- final or estimated total.

### Substitutions

- Every substitution requires customer approval
- Alternatives show price and quantity differences
- Customer may approve, reject, remove, or request another option
- No silent substitutions

## Major Milestone 6: Marketplace operations

### Customer workflow

Build cart, optimize basket, approve recommendations, pay Project 220, monitor shopping, approve substitutions, track delivery, confirm receipt, rate service, and update pantry.

### Shopper workflow

Accept assignment, view retailer-specific list, scan products, record unavailable items, request substitution approval, upload receipt, complete handoff, and report issues.

### Driver workflow

Accept delivery, verify order, navigate, communicate through protected channels, capture proof of delivery when required, and complete delivery.

### Administration

- Retailer and restaurant configuration
- Product mappings
- Markups and fees
- Service areas
- Order monitoring
- Refunds and disputes
- Shopper and driver management
- Fraud review
- Payout reporting
- Feature flags
- Operational analytics

## Major Milestone 7: Coaching

### General wellness AI coaching

Tiered coaching may include nutrition-plan adherence, meal and snack reminders, hydration, workouts, grocery planning, pantry alerts, supplement schedule reminders, weekly summaries, motivation, and habit education.

### Professional coaching marketplace

The future marketplace supports approved professional wellness coaches and personal trainers. Dietitian and support-worker connections are excluded from the approved scope.

### Safety requirements

- Emergency warning displayed in appropriate contexts
- Medical and wellness disclaimer
- The service does not diagnose, treat, or replace licensed medical care
- High-risk or emergency language routes users to immediate local help
- Coaches must stay within approved credentials and scope
- Notifications are configurable and may be disabled

## Major Milestone 8: Notifications and reminders

Required categories:

- Expiration reminders
- Pantry low-stock alerts
- Receipt review reminders
- Meal and healthy-snack reminders
- Workout reminders
- Hydration reminders
- Supplement reminders
- Shopping and substitution alerts
- Delivery status
- Budget alerts
- Weekly pantry report
- Weekly wellness summary
- Professional coaching messages

## Major Milestone 9: Production quality and release

- Automated lint, build, test, PWA verification, and Android build
- Secure production environment variables
- Database migrations
- Backups and restore testing
- Error monitoring
- Privacy and security review
- Accessibility testing
- Android signed release
- PWA production deployment
- iOS build preparation
- Store listing materials
- Beta and staged rollout

## Definition of done

A milestone is complete only when its implementation, validation, permissions, error states, analytics, accessibility, tests, and documentation are complete. External integrations are complete only after the relevant retailer, restaurant, payment, mapping, messaging, and platform credentials or agreements are available.
