# Project 220 Global Grocery Delivery Marketplace

## Goal

Replace dependence on a single third-party marketplace with a Project 220-owned grocery planning, shopping, and delivery workflow that can operate region by region.

## User experience

1. The user's nutrition plan generates exact grocery quantities.
2. Pantry inventory is subtracted from the required list.
3. Project 220 compares available retailers, package sizes, fees, and substitutions.
4. The user chooses a store, delivery window, substitution preferences, and budget.
5. The user reviews the final basket and pays through Project 220 using a supported payment provider.
6. A delivery job is created for an approved Project 220 shopper/driver.
7. The shopper receives the store, item quantities, substitution rules, route, and delivery instructions.
8. The customer receives status updates, proof of purchase, delivery tracking, and a final receipt.

## Retailer connections

Target retailers include Walmart, Real Canadian Superstore, No Frills, FreshCo, Sobeys, Safeway, Costco, and equivalent retailers in each supported country.

Project 220 must use official retailer APIs, affiliate programs, approved data feeds, or retailer agreements where available. It must not scrape protected websites or represent that a direct integration exists until the retailer approves it.

Where direct purchasing APIs are unavailable, Project 220 may still:

- compare user-entered or publicly permitted pricing;
- generate a store-specific shopping list;
- let the shopper purchase in store;
- upload and verify the receipt;
- reconcile estimated and final totals;
- refund or charge approved differences.

## Cheapest-basket engine

The system should optimize for the lowest true delivered cost while respecting nutrition and dietary requirements.

Calculate:

- item price and unit price;
- required quantity versus package size;
- loyalty or member pricing where the user is eligible;
- delivery, service, shopper, and payment fees;
- taxes, deposits, and minimum-order charges;
- travel distance and delivery zone;
- expected waste from oversized packages;
- approved substitutions;
- total basket cost and cost per meal.

Show users:

- cheapest single-store basket;
- cheapest multi-store basket;
- fastest basket;
- best nutrition-value basket;
- expected savings compared with their preferred store.

Never substitute an allergen, prohibited ingredient, or nutritionally unsuitable item merely because it is cheaper.

## Project 220 delivery system

### Customer features

- precise quantities generated from the meal plan;
- choose pickup, same-day delivery, scheduled delivery, or recurring weekly delivery;
- choose retailer or allow cheapest-store selection;
- approve or reject substitutions;
- live order status and optional map tracking;
- secure in-app messaging with the shopper;
- digital receipts, refunds, tips, ratings, and support;
- contactless delivery and proof-of-delivery controls.

### Shopper and driver features

- identity and eligibility verification;
- region-specific background checks where legally permitted or required;
- availability and delivery-zone settings;
- job offers showing estimated time, distance, pay, store, and item count;
- optimized shopping order by store department;
- barcode and quantity verification;
- substitution approval workflow;
- receipt capture and total reconciliation;
- navigation and delivery confirmation;
- earnings, tips, expenses, mileage, and tax records;
- incident, damaged-item, and unavailable-item reporting.

### Owner-operated launch

The first launch may use Marcel Goulet as the initial approved shopper/driver in one local service area. The architecture must not hard-code a single driver; it should later support multiple independent or employed shoppers by region.

## Payments and money handling

Use a licensed payment processor and marketplace-payment product. Project 220 should not directly store complete payment-card details.

The order flow must support:

- pre-authorization for the estimated basket plus an approved variance;
- final capture after receipt verification;
- shopper reimbursement or controlled purchasing card;
- delivery fees, tips, taxes, refunds, and partial refunds;
- transparent shopper pay and platform fees;
- fraud, chargeback, cancellation, and failed-delivery procedures.

## Global and regional operation

Every launch region requires configuration for:

- country, province/state, city, postal/ZIP code, currency, language, and units;
- retailer availability and product catalogues;
- sales tax, food tax exemptions, deposits, and invoicing;
- delivery-worker classification and labour rules;
- vehicle, insurance, licence, and background-check requirements;
- food handling, privacy, accessibility, consumer protection, and refund laws;
- prohibited or age-restricted products;
- service zones, operating hours, weather limitations, and emergency procedures.

Do not claim worldwide availability until each region is operationally and legally supported.

## Privacy requirements

- Grocery and delivery data is used only to complete the user's requested service.
- No advertising profiles, behavioural tracking, or sale of customer data.
- Shoppers see only the minimum information needed for an active delivery.
- Exact addresses are hidden until a job is accepted and needed.
- Private health details and progress photos are never shown to retailers or shoppers.
- Delivery records, chats, receipts, and location history use strict retention limits.
- Administrators receive role-limited operational access; end-to-end encrypted health content remains inaccessible.

## Safety and trust

- Emergency and unsafe-delivery reporting;
- customer and shopper blocking;
- masked contact information;
- delivery PIN or photo confirmation;
- no unattended delivery where prohibited;
- clear cold-food handling expectations;
- tamper-evident handling guidance;
- support escalation and documented dispute resolution.

## Required implementation phases

### Phase 1: local assisted shopping

- Generate exact grocery quantities.
- Compare stores using permitted/manual price data.
- Create customer orders and owner-operated delivery jobs.
- Receipt capture, reconciliation, payment, status updates, and delivery proof.

### Phase 2: regional marketplace

- Multiple approved shoppers;
- automated dispatch;
- live tracking;
- shopper payouts;
- retailer catalogue feeds and loyalty support.

### Phase 3: direct retailer integrations

- Official inventory and pricing connections;
- product reservation or ordering where retailers permit it;
- multi-region configuration and compliance.

## Acceptance criteria

- A customer can convert a meal plan into exact grocery quantities.
- Existing pantry items are removed correctly.
- The user can select cheapest-store mode or a preferred retailer.
- All material fees are shown before checkout.
- The shopper can complete the entire job through the app.
- Final totals reconcile against the receipt.
- The user receives proof of delivery and a final itemized receipt.
- Health photos and unrelated private data are never exposed to shoppers or retailers.
- Retailer integrations are clearly labelled as direct, assisted, or manual.
