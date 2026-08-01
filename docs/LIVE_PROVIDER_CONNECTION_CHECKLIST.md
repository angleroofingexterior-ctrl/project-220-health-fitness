# Project 220 Live Provider Connection Checklist

Project 220 can use live providers only after the corporation creates the provider accounts and securely adds the required credentials to the deployment platform and GitHub Actions secrets. Never commit private keys or passwords to the repository.

## Required live services

### AI and image analysis
- AI provider account for coaching, pantry analysis, receipt extraction, recipe generation, and shopping optimization
- Vision-capable model access
- Usage limits and billing enabled

Required environment variables:
- `AI_PROVIDER_API_KEY`
- `AI_PROVIDER_MODEL`
- `AI_VISION_MODEL`

### Authentication and database
- Managed authentication provider
- Production PostgreSQL database
- Private object storage for user-controlled photos

Required environment variables:
- `DATABASE_URL`
- `AUTH_SECRET`
- `AUTH_BASE_URL`
- `OBJECT_STORAGE_ENDPOINT`
- `OBJECT_STORAGE_BUCKET`
- `OBJECT_STORAGE_ACCESS_KEY`
- `OBJECT_STORAGE_SECRET_KEY`

### Payments
- Payment processor account
- Subscription products and prices
- Webhook signing secret

Required environment variables:
- `PAYMENTS_SECRET_KEY`
- `PAYMENTS_PUBLISHABLE_KEY`
- `PAYMENTS_WEBHOOK_SECRET`

Project 220 must not store full card numbers or security codes.

### Barcode, food, and nutrition data
- Barcode/product-information provider
- Nutrition database provider

Required environment variables:
- `BARCODE_API_KEY`
- `NUTRITION_API_KEY`

### Grocery and retail pricing
Retailers generally require commercial agreements, approved feeds, affiliate access, or partner APIs. Until those agreements exist, the app may only use user-entered prices, receipt-derived prices, or clearly marked estimates.

Potential configuration:
- `RETAIL_PRICE_PROVIDER_API_KEY`
- `RETAILER_PARTNER_IDS`

### Maps and delivery
- Maps, routing, address validation, and distance matrix provider

Required environment variables:
- `MAPS_API_KEY`

### Notifications and email
- Transactional email provider
- Push-notification provider

Required environment variables:
- `EMAIL_API_KEY`
- `EMAIL_FROM_ADDRESS`
- `PUSH_PROVIDER_KEY`

## Privacy boundary

Master administrators may access account identity, subscription status, billing status, delivery addresses, orders, retailer operations, driver operations, and aggregated system analytics.

Master administrators must not routinely access private subscriber health, fitness, pantry, household, photo, recipe, progress, supplement, or AI-coaching content. Live AI tests in the administrator console must use synthetic or corporation-owned test data.

## Connection procedure

1. Create each provider account under the corporation.
2. Enable billing and production access.
3. Create least-privilege API credentials.
4. Add credentials to the hosting platform's encrypted environment settings.
5. Add only build-time secrets required by GitHub Actions to repository secrets.
6. Configure production domains and webhook URLs.
7. Run provider health checks.
8. Test with synthetic data.
9. Complete privacy, security, legal, and operational review.
10. Enable live subscriber traffic only after all checks pass.

## Items the owners must supply

- Corporation legal name and business address
- Production domain
- Support and privacy email addresses
- Approved provider accounts
- Subscription prices and marketplace fees
- Retailer and pharmacy commercial agreements
- Food-delivery and pharmacy-pickup legal/insurance approval
- Google Play and Apple Developer accounts
