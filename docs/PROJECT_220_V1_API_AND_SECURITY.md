# Project 220 Version 1.0 API and Security Specification

## API conventions

- Base path: `/api/v1`
- JSON request and response bodies
- UUID identifiers
- Money uses integer minor units plus ISO currency code
- Timestamps use ISO 8601 UTC
- Mutating requests accept an `Idempotency-Key`
- Pagination uses opaque cursors
- Every response includes a request ID

## Authentication

Required flows:

- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/logout`
- `POST /auth/verify-email`
- `POST /auth/password/forgot`
- `POST /auth/password/reset`
- `GET /auth/session`
- `DELETE /account`
- `POST /account/export`

Production authentication must use a managed or independently audited identity provider. Passwords must never be stored by application code in reversible form.

## Household and permissions

Endpoints:

- `POST /households`
- `GET /households/:id`
- `PATCH /households/:id`
- `POST /households/:id/invitations`
- `POST /households/:id/invitations/:token/accept`
- `PATCH /households/:id/members/:memberId`
- `DELETE /households/:id/members/:memberId`

Roles:

- Owner
- Administrator
- Adult member
- Limited member
- Viewer

Permissions are action-based: inventory view, inventory edit, list edit, order placement, payment management, member management, coaching-share management, and subscription management.

## Pantry and inventory

Endpoints:

- `GET /households/:id/inventory`
- `POST /households/:id/inventory/items`
- `PATCH /households/:id/inventory/items/:itemId`
- `POST /households/:id/inventory/items/:itemId/adjustments`
- `DELETE /households/:id/inventory/items/:itemId`
- `GET /households/:id/inventory/expiring`
- `POST /households/:id/pantry-score/recalculate`

Every quantity mutation creates an immutable inventory transaction. Direct replacement of quantity without a transaction is prohibited.

## Barcode and receipt ingestion

Endpoints:

- `GET /catalogue/barcodes/:barcode`
- `POST /catalogue/barcodes/resolve`
- `POST /receipts`
- `POST /receipts/:id/images`
- `POST /receipts/:id/process`
- `GET /receipts/:id/results`
- `POST /receipts/:id/confirm`

Unknown barcodes permit manual product creation and later catalogue review.

## Pantry-image processing

Endpoints:

- `POST /vision/pantry-jobs`
- `POST /vision/pantry-jobs/:id/images`
- `POST /vision/pantry-jobs/:id/process`
- `GET /vision/pantry-jobs/:id`
- `POST /vision/pantry-jobs/:id/confirm`
- `DELETE /vision/pantry-jobs/:id/source-images`

Required request field:

`photoRetentionPolicy`: `retain` or `delete_after_processing`

The job records whether deletion completed. Failed deletion creates an operational alert.

## Recipes and premium cookbook

Endpoints:

- `GET /recipes`
- `GET /recipes/:id`
- `POST /recipes/generate`
- `POST /recipes/:id/scale`
- `GET /cookbooks/current`
- `POST /cookbooks/generate`
- `GET /meal-plans`
- `POST /meal-plans/generate`

Cookbook endpoints require premium entitlement. No public share, publishing, sale, PDF, download, or export endpoint is included.

Allergen exclusions are evaluated before recipe ranking. A recipe that conflicts with a declared allergy is rejected from results.

## Smart Basket Optimizer

Endpoints:

- `POST /carts/:id/optimize`
- `GET /carts/:id/optimization-runs/:runId`
- `POST /carts/:id/recommendations/:recommendationId/accept`
- `POST /carts/:id/recommendations/:recommendationId/reject`

Optimization request dimensions:

- cost
- nutrition
- supplements
- budget
- recipes
- waste

Recommendation response fields:

- type
- title
- explanation
- confidence
- affected cart lines
- current cost
- proposed cost
- expected savings
- nutrition delta
- budget delta
- recipes unlocked
- waste risk reduced
- reversible patch
- approval required

The server recalculates prices and constraints when a recommendation is accepted.

## Unified cart and marketplace

Endpoints:

- `POST /carts`
- `GET /carts/:id`
- `POST /carts/:id/items`
- `PATCH /carts/:id/items/:lineId`
- `DELETE /carts/:id/items/:lineId`
- `POST /carts/:id/quote`
- `POST /carts/:id/checkout`
- `GET /orders/:id`
- `POST /orders/:id/substitutions`
- `POST /orders/:id/substitutions/:substitutionId/approve`
- `POST /orders/:id/substitutions/:substitutionId/reject`
- `POST /orders/:id/cancel`

Cart selection modes:

- preferred_store
- cheapest_basket
- fastest_delivery

Checkout creates one parent order and one or more retailer sub-orders. The customer pays Project 220. Retailer purchases, shopper reimbursements, driver payouts, tips, refunds, and company revenue must use a double-entry or equivalently reconcilable ledger.

## Shopper and driver APIs

- `GET /shopper/jobs`
- `POST /shopper/jobs/:id/accept`
- `POST /shopper/jobs/:id/start`
- `POST /shopper/jobs/:id/items/:lineId/scan`
- `POST /shopper/jobs/:id/substitutions`
- `POST /shopper/jobs/:id/complete`
- `GET /driver/deliveries`
- `POST /driver/deliveries/:id/accept`
- `POST /driver/deliveries/:id/pickup`
- `POST /driver/deliveries/:id/deliver`
- `POST /driver/deliveries/:id/proof`

Location access must be purpose-limited, visible to the worker, and disabled outside active jobs.

## Coaching

- `POST /coach/conversations`
- `POST /coach/conversations/:id/messages`
- `GET /coach/insights`
- `GET /coach/reminders`
- `POST /coach/reminders`
- `GET /professional-coaches`
- `POST /professional-coaches/:id/bookings`
- `POST /coaching-shares`
- `DELETE /coaching-shares/:id`

General wellness AI must not diagnose, prescribe, or replace emergency care. Professional categories exclude dietitians and support workers. Any professional data access requires explicit, revocable consent.

## Security controls

- Deny by default authorization
- Household boundary checks on every household resource
- Row-level security where supported
- Encrypted transport and encrypted storage
- Secret manager for production credentials
- Malware scanning for uploads
- File type and size validation
- Signed, expiring media URLs
- Rate limiting by user, IP, route, and risk level
- CSRF protection where cookie authentication is used
- Content Security Policy
- Audit logs for authentication, permissions, orders, payments, refunds, substitutions, photo retention, account export, and deletion
- Admin actions require stronger authentication and are fully logged
- Production logs must not contain health data, payment data, image contents, tokens, or passwords

## Privacy controls

- Explicit pantry-photo retention choice
- Separate consent for coaching data sharing
- Household members cannot automatically see another member's private health logs
- Minimum necessary AI context
- Configurable notification privacy on lock screens
- Account export
- Account deletion and downstream deletion jobs
- Published data-retention schedule

## Safety controls

The AI coach displays persistent scope language and detects high-risk medical or emergency language. It must stop ordinary coaching and provide an emergency-oriented response when required. Supplement recommendations must account for user-declared allergies, contraindication warnings supplied by trusted product data, and configured safety limits. The system must not recommend illegal or restricted products.
