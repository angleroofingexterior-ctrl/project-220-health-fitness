# Project 220 Production v1

## Objective
Build one testable, production-structured application instead of disconnected prototypes.

## Approved stack
- Frontend: React + TypeScript + Vite PWA
- Mobile packaging: Capacitor for Android and iOS
- Backend: Supabase (PostgreSQL, Auth, Storage, Row Level Security, Edge Functions)
- AI gateway: server-side provider adapter; no API keys in the browser
- Hosting: GitHub Actions for CI; Cloudflare Pages or Vercel for web; Supabase for backend
- Monitoring: Sentry-compatible error reporting and structured audit logs

## Release environments
- Development: local and pull-request previews
- Alpha: private tester environment for Marcel and partner
- Production: public Project 220 release

## Required roles
- master_admin
- subscriber
- shopper
- driver
- coach
- support

## Privacy rule
Master Admin may view operational account and service data. Subscriber health, pantry, photos, nutrition plans, progress and private coaching content remain protected by database row-level security and are not exposed by default.

## Build sequence
1. Repository cleanup and production application shell
2. Supabase project and environment configuration
3. Authentication, profiles and role authorization
4. Subscriber dashboard and private profile
5. Fitness and workout planning
6. Nutrition, life-stage and pregnancy-support workflows
7. Pantry, receipt and barcode workflows
8. Private cookbook and recipe generation
9. AI wellness coach and notification preferences
10. Smart Basket Optimizer
11. Marketplace simulation, shopper and driver workflows
12. Professional coach marketplace simulation
13. Admin operations and privacy-safe analytics
14. Automated browser tests and mobile tests
15. Alpha deployment and device installation

## Definition of an Alpha-ready feature
A feature is not considered complete merely because it is visible. It must:
- open from working navigation;
- save and reload its test data;
- show success and error states;
- enforce the correct role and privacy boundary;
- pass an automated interaction test;
- work on Marcel's Android tablet and mobile Chrome.

## External setup that cannot be completed by repository code alone
The corporation owner must create or approve the following accounts and supply repository secrets:
- Supabase project
- Web hosting account/domain
- AI provider account and billing limit
- Email/SMS/push notification provider when those features become live
- Apple Developer and Google Play accounts for store distribution
- Payment processor before real subscriptions or purchases are enabled

No real grocery purchase, pharmacy transaction, medical service, or payment will be activated during Alpha testing.