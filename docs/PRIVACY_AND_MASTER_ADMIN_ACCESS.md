# Project 220 Subscriber Privacy and Master Administrator Access

## Required account and commerce information

Project 220 may require only the information needed to operate subscriptions and deliveries:

- first name
- last name
- email or account contact
- subscription selection and status
- delivery address when delivery is used
- payment-processor customer reference and billing status

Project 220 must not store full payment card numbers, security codes, or equivalent sensitive payment credentials. Those remain with the approved payment processor.

## Subscriber-private information

The following information belongs to the subscriber and is private by default:

- height and weight
- fitness goals and workout history
- nutrition goals, meal plans and food logs
- supplement plans and supplement logs
- household members and household profiles
- pantry, refrigerator and freezer inventory
- pantry, receipt and progress photographs
- barcode history
- medical or dietary-support information
- progress measurements
- AI coaching conversations
- generated cookbook and recipe history
- private wellness reminders and recommendations

Subscribers may use these features without making their information visible to administrators.

## Master administrator access

Master administrators may access operational information necessary to run the platform:

- account identity and contact details
- subscription status
- billing status and payment-processor references
- delivery address and delivery instructions
- orders, refunds, disputes and support cases
- retailer, pharmacy, restaurant, shopper, driver and coach operations
- pricing, fees, markups, service areas and feature settings
- system health, security events and aggregated analytics

Master administrators must not have routine access to subscriber-private content.

## Subscriber-controlled support sharing

A subscriber may deliberately share a specific item with support for a limited purpose. The system must:

1. identify exactly what will be shared;
2. obtain explicit consent;
3. limit access to authorized support personnel;
4. record the reason and access period;
5. revoke access when the case closes or the subscriber withdraws consent.

## Privacy notice for onboarding and checkout

> **Your personal health, fitness, nutrition, pantry and photo information stays private.** Project 220 only needs your identity, subscription and billing status, and your delivery address when you request delivery. Administrators cannot routinely view your pantry photos, progress photos, personal plans, logs or private AI coaching conversations. You control whether specific private information is shared for support.

## AI isolation requirements

- AI processing must retrieve only the data needed for the subscriber's request.
- Household and subscriber identifiers must be enforced on every query.
- Administrators may test AI services with synthetic or corporation-owned demonstration data, never by opening subscriber-private data.
- Logs must exclude private prompts, photos and detailed personal records unless the subscriber has explicitly authorized a support review.
- AI outputs must not be used for advertising profiles or sold to third parties.
