# Project 220 Delivery and Retail Integration

## Goal

Allow a user to turn a personalized meal and grocery plan into an order that can be fulfilled either by Project 220's own delivery network or, where that is not yet available, by an approved third-party grocery platform.

## Recommended rollout

### Phase 1 — Partner checkout fallback

- Generate an exact grocery basket from the user's nutrition plan, servings, pantry inventory, allergies, dislikes, and budget.
- Compare participating retailers by unit price, total basket price, package size, substitutions, delivery charges, service fees, minimum order requirements, estimated taxes, and expected delivery time.
- Let the user choose the cheapest acceptable basket or another preferred retailer.
- Hand off checkout to an approved partner such as Instacart where direct retailer APIs are unavailable.
- Never store retailer payment-card details inside Project 220.

### Phase 2 — Project 220 local delivery marketplace

- Add customer, shopper/driver, dispatcher, and operations roles.
- Customers choose items and quantities from their personalized nutrition plan.
- Project 220 generates the complete pick list, substitution rules, allergy warnings, delivery notes, and route-ready order.
- Approved shoppers can claim or be assigned orders, shop at supported stores, upload receipts, report substitutions, and complete delivery with proof of delivery.
- Customers receive live order status, item changes, estimated arrival time, receipt breakdown, and delivery confirmation.
- Include configurable delivery zones, service hours, fees, tips, taxes, refunds, cancellations, and support workflows.
- Support independent contractors or employees only after legal, insurance, tax, payroll, workers' compensation, and local labour requirements are reviewed for each jurisdiction.

## Retail integrations

Project 220 should use a connector-based retail adapter so each chain can be supported independently when an official commercial API or partnership is available.

Initial retailer targets may include:

- Walmart
- Real Canadian Superstore / Loblaw banners
- No Frills
- FreshCo
- Safeway / Sobeys banners
- Costco where commercial terms permit
- Regional grocers and international retailers

No retailer integration may rely on unauthorized scraping or automated checkout that violates retailer terms. If a store does not provide an approved integration, Project 220 may still let shoppers manually purchase from that store using a generated list and receipt capture.

## Cheapest-basket engine

The app must:

- Normalize unit prices across grams, kilograms, millilitres, litres, ounces, pounds, and item counts.
- Compare exact required quantities, not just shelf price.
- Include delivery and service fees in the final comparison.
- Prefer nutritionally equivalent lower-cost substitutions when approved by the user.
- Show expected savings and any macro or ingredient differences before a substitution is accepted.
- Consider store-brand options, frozen produce, bulk sizes, sale prices, loyalty pricing where authorized, and split-store baskets only when the additional travel or delivery cost still produces real savings.

## Global operation

The app must be location-aware and use jurisdictional configuration for:

- Currency and taxes
- Units of measure
- Retailers and service areas
- Delivery fees and tipping customs
- Consumer-protection, privacy, food-handling, employment, insurance, and marketplace rules
- Accessibility and language

The delivery service must launch city-by-city or region-by-region. The app must never claim worldwide delivery until a supported service zone and compliant operating partner exist in that location.

## Privacy and safety

- Separate private nutrition/health data from order-fulfilment data.
- Share only the minimum information needed to fulfil the order.
- Drivers and shoppers must not receive progress photos, measurements, medical notes, or unrelated profile data.
- Mask phone numbers and use in-app messaging where possible.
- Encrypt addresses, delivery instructions, receipts, and order history.
- Provide role-based access, audit logs, account deletion, retention limits, and fraud controls.
- Require explicit consent before sharing dietary restrictions or allergy information with a shopper.

## Acceptance criteria

- A user can generate an order from a meal plan in one action.
- The app displays a full basket, already-have items, still-needed items, quantities, estimated prices, fees, and total.
- The user can select Project 220 delivery where available or a partner checkout fallback where it is not.
- A Project 220 shopper can receive, shop, substitute, receipt, and deliver an order.
- The system does not store payment-card numbers directly.
- Unsupported retailers and regions are clearly identified without making false availability claims.
