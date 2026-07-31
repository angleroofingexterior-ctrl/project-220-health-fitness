# Project 220 Pantry, Grocery, Instacart and Budget Requirements

## Goal

Complete the pantry-to-grocery workflow so a user can photograph or manually enter food at home, compare it against the active meal plan, see exact quantities already available and still required, and then hand a measured shopping list to Instacart while prioritizing affordable choices.

## Pantry inventory

- Support fridge, freezer, cupboard and supplement inventory zones.
- Allow manual add, edit, merge, split and delete.
- Track food name, brand, package size, quantity, unit, expiry date, opened/unopened state and storage location.
- Support metric and imperial units with normalization to grams, millilitres and item counts.
- Work fully offline using encrypted local storage.
- Show three views: Full list, Already have, Still need.

## Photo recognition

- Let users capture multiple pantry, fridge and cupboard photos.
- Obtain explicit per-photo consent before any cloud processing.
- Strip EXIF and location metadata before processing.
- Display every detected item as an unconfirmed suggestion.
- Require user review of item name, quantity and unit before saving.
- Never silently add recognized food to inventory.
- Provide a local/manual-only mode that requires no image API.
- Delete temporary processing images immediately after results are returned unless the user explicitly saves them locally.

## Meal-plan comparison

- Compare confirmed inventory against the active 28–31 day nutrition plan.
- Convert recipe requirements into normalized quantities.
- Deduct usable pantry quantities from required quantities.
- Account for partial packages, leftovers, expiry dates and planned meal-prep batches.
- Show exact quantities for Full list, Already have and Still need.
- Recalculate automatically when meals, servings or pantry entries change.

## Cheapest-alternative engine

- Add a user-controlled "Lowest total cost" shopping mode.
- Compare eligible products by true unit price, package size and required quantity.
- Prefer store brands and economical package sizes when they still meet the meal plan, allergy rules and dietary restrictions.
- Offer lower-cost substitutions such as frozen instead of fresh produce, dried instead of canned legumes, value packs, bulk sizes and equivalent protein sources.
- Never replace an item that conflicts with allergies, medical restrictions, dietary choices or minimum nutrition requirements.
- Show why each substitute is cheaper and how it changes calories, protein, carbohydrates, fat and sodium.
- Calculate total basket cost including service fees, delivery fees, minimum-order charges and estimated taxes where the retailer provides them.
- Compare nearby participating retailers when data is available and show the cheapest complete basket, not merely the cheapest individual item.
- Let the user set a weekly or monthly grocery budget and flag over-budget plans.
- Provide a "Reduce my grocery cost" action that revises meals while preserving the user's calorie and macro targets as closely as possible.
- Preserve user choice: every substitution must be reviewable and reversible before checkout.

## Instacart handoff

- Let the user select a participating retailer and location.
- Map measured grocery requirements to retailer products.
- Show unavailable items, substitutions and final quantities before handoff.
- Send the reviewed list to Instacart using an approved production integration.
- Keep product confirmation, delivery details and payment inside Instacart's hosted flow.
- Project 220 must never collect or store payment-card data.
- Disclose that prices and availability can change before checkout.

## Privacy

- Do not send private profile, progress-photo, health or workout data to Instacart.
- Send only the minimum shopping information needed for the user's approved grocery handoff.
- Do not add behavioural tracking, advertising identifiers, fingerprinting or non-essential cookies.
- Keep pantry inventory local by default.
- Require explicit consent before any external photo recognition or shopping service is used.

## Offline behaviour

Without external APIs, users must still be able to:

- Maintain pantry inventory.
- Generate Full list, Already have and Still need quantities.
- Copy, print or export the grocery list.
- Review budget estimates entered manually.
- Select cheaper substitutions from the local recipe and food catalogue.

## Required external credentials

Production integrations may require:

- An approved Instacart production API credential.
- An approved image-recognition service credential when the user opts into cloud photo analysis.

The app must remain useful without either credential.

## Acceptance criteria

- A user can build inventory manually without signing in.
- Pantry photos are never processed without explicit consent.
- Every recognized product is confirmed by the user.
- The measured list updates correctly after inventory or meal-plan changes.
- The cheapest-basket recommendation respects allergies, dietary restrictions and nutrition targets.
- Users can see unit prices, fees, substitutions and estimated savings before approving the handoff.
- Payment occurs only within the retailer or Instacart hosted checkout.
- No private health, photo or account information is included in the shopping handoff.
