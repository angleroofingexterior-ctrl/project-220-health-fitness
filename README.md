# Project 220 Health & Fitness

Project 220 is a public, device-private starter planning app for workouts, meals, groceries, supplements, routines, and progress.

## Ownership

Project 220 Health & Fitness was created by and is owned by **Marcel Joseph Goulet**. No open-source licence is granted by this repository unless the owner provides separate written permission.

## What it generates

- Age- and experience-aware resistance-training schedules
- Gym-machine, home-dumbbell, or bodyweight routines
- Editable calorie and protein planning estimates
- Omnivore, vegetarian, and vegan meal options
- Allergy-aware food substitutions
- Automatic grocery quantities for 1–14 days
- Health and safety reminders for situations that need professional review

Answers and progress are saved only in the visitor's browser storage. The app is educational and is not a medical diagnosis or prescription.

## Development

```bash
npm ci
npm run build:public
```

The public static build is produced in `public-pages/`. GitHub Actions deploys that folder to GitHub Pages after changes reach `main`.
