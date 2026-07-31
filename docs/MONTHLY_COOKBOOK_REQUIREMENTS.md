# Project 220 Adaptive 30-Day Cookbook

## Goal

Replace the small fixed recipe set with a personalized 28–31 day meal system that can generate a complete month of breakfasts, lunches, dinners, snacks, shakes, and optional desserts based on each user's nutrition target.

## User inputs

- Goal: fat loss, maintenance, lean gain, muscle gain, athletic performance, or general wellness.
- Daily calories and macro targets.
- Number of meals and snacks per day.
- Dietary pattern: omnivore, vegetarian, vegan, pescatarian, halal-friendly, kosher-friendly, gluten-free, dairy-free, low-sodium, and user-defined preferences.
- Allergies and excluded ingredients.
- Food dislikes and favourite cuisines.
- Budget, household size, serving count, cooking skill, preparation time, and available appliances.
- Repetition preference: maximum repeats per week and leftover preference.

## Monthly output

1. A calendar containing 28, 30, or 31 days of meals.
2. Different daily menus aligned to the user's calorie and macro targets.
3. Recipe cards with ingredients, quantities, servings, steps, cooking time, storage, reheating, substitutions, and nutrition estimates.
4. Weekly grocery lists organized by produce, proteins, dairy/alternatives, grains, frozen, canned, spices, and household items.
5. A full-month grocery overview with quantity consolidation and waste-reduction notes.
6. Meal-prep plans for one, two, or three preparation days per week.
7. One-tap meal replacement that automatically recalculates the day, grocery quantities, and leftovers.
8. Pantry-aware generation that uses ingredients already available and prioritizes items nearing expiry.

## Variety rules

- At least 30 breakfast choices, 45 lunches, 60 dinners, 30 snacks, 20 shakes, and 15 optional desserts in the initial catalogue.
- Do not repeat the same main meal more than twice within 14 days unless the user permits repeats.
- Rotate protein sources, vegetables, grains, cuisines, textures, and cooking methods.
- Include quick meals, batch meals, slow-cooker meals, oven meals, stovetop meals, air-fryer meals, and no-cook choices where equipment permits.
- Provide realistic substitutions without violating allergies or dietary restrictions.

## Nutrition safeguards

- Nutrition values must be labelled as estimates.
- Plans should avoid extreme calorie deficits or surpluses and display appropriate professional-review warnings.
- Supplements must remain separate from food plans and should never be treated as replacements for meals.
- Medical diets, eating-disorder risk, pregnancy, kidney disease, diabetes, allergies, and medication interactions require additional safeguards and professional guidance.

## Generation and tracking

- Save the generated month locally by default.
- Allow regenerate day, regenerate meal, lock favourite, and exclude recipe.
- Log completed meals and compare estimated intake with the target.
- Automatically update future portions based on weight trend only after user approval.
- Offer metric and imperial measurements.

## Acceptance criteria

- The app can generate a complete 30-day plan without displaying fewer than four eating occasions per day when that schedule is selected.
- Every generated ingredient appears in the grocery list with consolidated quantities.
- Replacing a meal updates daily nutrition and affected grocery quantities.
- Allergens and excluded foods never appear in recipes or substitutions.
- All monthly-plan data functions offline and remains private to the user in local-only mode.