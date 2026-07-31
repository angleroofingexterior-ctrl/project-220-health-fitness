# Project 220 — Live Launch Master Plan

## Current status

The repository currently contains an installable offline-first PWA prototype. It stores fitness information locally in the browser. It is not yet a production marketplace, grocery retailer integration, payment platform, private cloud service, image-recognition system, or delivery dispatch system.

## Production release scope

### Customer application
- Account creation and secure sign-in
- Consent, age confirmation, privacy controls and account deletion
- Profile, goals, allergies, dietary requirements and accessibility preferences
- Personalized workout and nutrition plans
- Pantry, cupboard, fridge and freezer photo capture
- Private image analysis followed by mandatory customer review
- Confirmed household inventory with quantities and expiry estimates
- 1-day, 7-day and 28–31-day cookbook generation
- Recipes showing Already Have, Running Low and Still Need
- Budget-aware grocery list and cheapest-safe substitution comparison
- Winnipeg pilot ordering, Manitoba delivery availability and scheduling
- Secure checkout, optional tips, receipts, refunds and order history
- Customer-driver in-app messaging and substitution approvals

### Driver application
- Driver onboarding, screening and document verification
- Availability and delivery-zone settings
- Order offer, acceptance and cancellation workflow
- Store-sorted item checklist with quantities and package sizes
- Barcode/photo confirmation where appropriate
- Out-of-stock workflow and customer-approved substitutions
- In-app messaging without revealing personal phone numbers
- Receipt capture, delivery navigation and proof of delivery
- Earnings, tips, adjustments and payout history

### Operations portal
- Role-based access with least privilege
- Order support without access to private fitness photos or pantry images
- Driver verification and incident handling
- Refund and dispute tools
- Service zones, fees, promotions and delivery-capacity controls
- Audit logs, fraud controls and abuse reporting
- No administrator access to end-to-end encrypted personal content

## Recommended technical architecture

- Customer and driver apps: Flutter or React Native for iOS and Android; retain the PWA as a lightweight web companion.
- API: TypeScript backend using a maintained web framework.
- Database: managed PostgreSQL with row-level authorization.
- Authentication: managed identity provider supporting passkeys, MFA and account recovery.
- Private media: encrypted object storage with short-lived signed URLs.
- Messaging: real-time database/websocket service with masked notifications.
- Payments: marketplace-capable processor supporting customer charges, refunds, tips and driver payouts.
- Maps: commercial maps, geocoding, routing and distance-matrix provider.
- Notifications: APNs, Firebase Cloud Messaging, email and optional masked SMS.
- Image analysis: approved computer-vision provider or private model endpoint; never trust detection without user confirmation.
- Hosting: Canadian region for the Manitoba pilot where practical, with encrypted backups and documented disaster recovery.

## Security and privacy gates

- Complete threat model and privacy impact assessment.
- Encrypt data in transit and at rest.
- Keep secrets out of source control.
- Separate customer, driver, support and administrator permissions.
- Collect only information needed for the service.
- Automatically delete unneeded pantry images after confirmed extraction unless the customer chooses to retain them.
- Provide download, correction and deletion controls.
- Log sensitive administrative actions.
- Complete independent penetration testing before public delivery launch.
- Publish privacy policy, terms, delivery agreement, refund policy, driver agreement and nondiscrimination policy.

## Winnipeg pilot

- Initial zone: Winnipeg city limits and selected nearby communities.
- Initial users: 25–100 invited households.
- Initial drivers: 5–15 screened drivers.
- Initial stores: retailers that permit the shopping workflow; direct API access only where officially approved.
- Pilot length: 4–8 weeks.
- Start with scheduled delivery windows rather than instant delivery.
- Manually cap orders per time block.
- Track fill rate, substitution rate, average shop time, delivery time, refunds, support contacts, driver earnings, customer savings and repeat usage.
- Expand to Manitoba only after insurance, operations and route economics are validated.

## Owner actions required before live operation

1. Register Project 220 as a business and confirm ownership/shareholder documents.
2. Open a business bank account and bookkeeping system.
3. Retain a Manitoba lawyer for privacy, consumer terms, delivery liability, driver classification and marketplace agreements.
4. Retain an accountant for GST/HST, PST where applicable, subscriptions, tips, driver payments and international expansion.
5. Obtain commercial general liability, cyber/privacy, errors and omissions, non-owned auto and delivery/courier insurance advice.
6. Choose and open production accounts for authentication, hosting, database, storage, payment processing, maps, notifications and customer support.
7. Apply for official retailer or commerce partnerships. Do not depend on unauthorized scraping.
8. Decide whether drivers are employees or independent contractors based on legal advice.
9. Approve service zones, operating hours, cancellation rules, refund rules, minimum order and driver compensation.
10. Supply final logo, legal business name, support email, support phone number and mailing address.
11. Recruit pilot customers and drivers and obtain signed pilot agreements.
12. Fund professional development, legal review, insurance, testing and launch operations.

## Release gates

### Gate 1 — Internal prototype
- Core customer and driver flows work in a test environment.
- No real payments or public access.

### Gate 2 — Closed Winnipeg beta
- Legal documents signed off.
- Insurance active.
- Payment and payout sandbox passed.
- Driver screening operational.
- Privacy and security review passed.

### Gate 3 — Paid Winnipeg pilot
- Live payments enabled for invited users.
- Support coverage and incident process active.
- Daily order limits enforced.

### Gate 4 — Manitoba expansion
- Unit economics proven.
- Regional delivery partners or scheduled routes established.
- Remote-community pricing and availability clearly disclosed.

### Gate 5 — Global expansion
- Launch country by country.
- Localize taxes, privacy, employment, payments, food delivery, accessibility and consumer rules.
- Add retailers only through approved integrations or lawful customer-directed checkout.

## Definition of production complete

Project 220 is production complete only when the applications, backend, payments, driver payouts, private image processing, messaging, retailer workflow, support tools, legal documents, insurance, security testing and pilot operations have all been implemented and verified. Documentation alone does not make these services live.
