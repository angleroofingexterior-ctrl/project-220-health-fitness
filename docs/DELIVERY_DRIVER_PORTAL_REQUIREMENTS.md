# Project 220 Delivery Driver Portal Requirements

## Purpose

Create a simple, mobile-first driver and shopper portal that helps customers receive affordable groceries based on their Project 220 nutrition plans. The experience must reduce stress for customers and delivery workers while protecting private health and profile information.

## Driver access

- Separate driver role and portal from the customer app.
- Drivers only see assigned orders and the minimum information needed to shop and deliver.
- Drivers must never see customer progress photos, body measurements, medical details, workout history, private notes, or unrelated profile data.
- Use secure authentication, device session controls, and automatic sign-out on lost or shared devices.

## Order workflow

1. View available or assigned orders.
2. See store, pickup window, delivery window, estimated distance, estimated pay, item count, and special handling notes.
3. Accept or decline an order without penalty disclosures being hidden.
4. Open a store-ordered grocery checklist on the phone.
5. Check off each item as found.
6. Record actual quantity, package size, price, and substitutions.
7. Scan barcode or photograph the shelf label where supported.
8. Mark items unavailable, partially available, or limited in quantity.
9. Contact the customer for approval when a change is needed.
10. Upload or scan the receipt.
11. Confirm checkout, departure, arrival, and delivery completion.
12. Capture proof of delivery only with the customer’s consent and local legal compliance.

## Item-by-item checklist

Each item should show:

- Product name and generic description.
- Required amount from the nutrition plan.
- Preferred brand, size, and acceptable alternatives.
- Unit-price target and maximum approved price.
- Allergy and dietary restrictions clearly highlighted.
- Storage and temperature requirements.
- Quantity found and quantity still needed.
- Customer substitution preference: automatic, ask first, or no substitution.

The list should automatically group items by store section to reduce shopping time.

## Customer communication

- In-app text chat tied to the active order.
- Optional masked calling where legally and technically supported.
- Quick messages such as “item unavailable,” “smaller size available,” “price is higher,” “quantity limited,” and “approve substitution.”
- Allow photos of available alternatives, shelf labels, and package sizes.
- Customer can approve, decline, or choose another option.
- All messages are limited to the order and retained only as long as required for support, disputes, and legal obligations.
- No sharing of personal phone numbers by default.

## Substitutions and affordability

- Rank alternatives by nutrition compatibility, allergy safety, unit price, total price, and customer preference.
- Show the cheapest acceptable alternative first.
- Never substitute an allergen or restricted ingredient.
- Require explicit approval when the replacement materially changes nutrition, quantity, brand, or total price.
- Display expected savings or added cost before approval.
- Allow partial fulfillment when the customer prefers not to exceed budget.

## Driver support and safety

- Clear route and stop order.
- Pickup and delivery instructions.
- Emergency and incident reporting.
- Contactless delivery support.
- Accessibility notes supplied voluntarily by the customer.
- No discriminatory filtering of customers or drivers.
- Code of conduct prohibiting harassment, discrimination, exploitation, or retaliation.
- Transparent pay, tips, expenses, and adjustment records.

## Inclusion and accessibility

Project 220 welcomes everyone. The portal must support:

- Inclusive language and nondiscrimination across race, colour, ancestry, nationality, citizenship, religion, sex, sexual orientation, gender identity or expression, age, disability, family status, body size, income, housing status, and any other protected characteristic.
- Screen readers, large text, high contrast, simple language, and accessible tap targets.
- Multiple languages and local measurement/currency formats.
- Dietary, cultural, religious, allergy, and accessibility needs without judgment.

## Privacy

- Drivers receive only order-specific data.
- Hide unrelated account information.
- Remove access after order completion except for limited support records.
- Encrypt order messages and delivery records in transit and at rest.
- Do not sell or use delivery activity for behavioural advertising.
- Do not use third-party tracking pixels, session replay, fingerprinting, or advertising identifiers.

## Acceptance criteria

- A driver can complete an order entirely from a phone.
- Every grocery item can be checked off individually.
- Quantity shortages and substitutions can be communicated and approved in-app.
- Customer and driver phone numbers remain private by default.
- The app blocks unsafe allergy substitutions.
- The driver cannot access private fitness, health, or progress information.
- The interface works with screen readers and large text.
- The experience supports the lowest-cost acceptable option without pressuring customers into unsuitable substitutions.
