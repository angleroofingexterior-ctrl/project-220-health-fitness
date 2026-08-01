# Project 220 Pregnancy Nutrition Requirements

## Purpose

Project 220 will include a pregnancy-specific nutrition mode for general wellness education. It must never replace prenatal care or provide diagnosis, treatment, medication advice, or individualized medical nutrition therapy.

## Required onboarding

The subscriber selects:

- trimester
- eating pattern
- allergies and intolerances
- food dislikes
- nausea or constipation support preferences
- clinician-provided instructions, entered voluntarily by the subscriber

The app must not require the subscriber to disclose a diagnosis.

## Safety controls

- Display a medical and emergency disclaimer before generating a plan.
- Block weight-loss, aggressive calorie-deficit, bodybuilding-cut, detox and fasting plans during pregnancy.
- Do not provide exact gestational weight-gain targets without clinician-confirmed pre-pregnancy information.
- Do not recommend herbs, peptides, performance enhancers, fat burners, stimulant products or unverified supplements.
- Flag supplemented foods carrying pregnancy caution labels.
- Require clinician review for high-risk pregnancy, severe vomiting, diabetes, kidney disease, malabsorption, eating disorders, multiple pregnancy, significant anemia, or other conditions needing individualized care.
- Keep pregnancy plans and conversations private from administrators unless the subscriber explicitly shares a specific item for support.

## Health Canada defaults

- Daily multivitamin containing 400 mcg (0.4 mg) folic acid.
- During pregnancy, the multivitamin should contain 16 to 20 mg iron.
- Keep caffeine below 300 mg per day from all sources.
- Encourage vegetables and fruit, whole grains, protein foods, healthy fats and water.
- Later pregnancy generally needs a modest increase in nutrient-dense food rather than unrestricted eating.
- Encourage low-mercury fish choices and compliance with local fish advisories.

Supplement amounts must remain editable only through clinician-directed notes. Project 220 must not advise taking more than the product label or clinician instruction.

## Food-safety exclusions

The generated meal plan and cookbook must exclude:

- unpasteurized milk, juice and dairy products
- raw or undercooked meat, poultry, seafood, fish and eggs
- raw sprouts
- refrigerated pâté and meat spreads
- refrigerated smoked seafood unless cooked in a dish
- deli meats and hot dogs unless reheated until steaming hot
- high-mercury fish and fish covered by a local advisory
- alcohol and cannabis products

Recipes must clearly mark pasteurization, cooking-temperature and safe-storage requirements.

## Meal-plan features

- trimester-aware daily structure
- regular meals and snacks
- nausea-friendly small-meal option
- constipation-support option emphasizing gradual fibre and fluids
- omnivore, vegetarian and vegan options
- allergy filtering
- culturally adaptable foods
- budget-conscious grocery lists
- family-sized meal scaling
- kid-friendly household side dishes kept separate from pregnancy safety rules
- pasteurized yogurt and homemade frozen-yogurt snacks
- use-before-expiry recipes connected to Pantry AI

## AI Coach boundaries

The pregnancy coach may:

- remind the subscriber to eat regularly, hydrate and take clinician-approved prenatal supplements
- suggest food-safe recipes from the private cookbook
- track caffeine entered by the subscriber
- surface expiration and grocery reminders
- encourage contacting the prenatal care team when symptoms interfere with eating or hydration

The pregnancy coach may not:

- diagnose complications
- interpret laboratory results
- alter medication or supplement doses
- promise fetal or maternal outcomes
- provide emergency triage beyond directing the subscriber to emergency services or their prenatal care team

## Administrative privacy

Master administrators may see subscription status, service usage status and system errors. They must not see pregnancy status, trimester, meal plans, pantry contents, photographs, coaching conversations or clinician notes unless the subscriber deliberately shares a specific item for time-limited support.

## Source basis

This specification follows current Health Canada and Public Health Agency of Canada pregnancy nutrition and food-safety guidance. It must be reviewed periodically and updated when official guidance changes.
