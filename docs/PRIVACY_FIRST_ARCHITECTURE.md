# Project 220 Privacy-First Architecture

## Product promise

Project 220 is designed so each person's progress photos, measurements, meal-plan answers, health notes, workout logs, and private profile details are accessible only to that person. Administrators, support staff, advertisers, analytics providers, and other users must not be able to view private content.

## Non-negotiable requirements

1. No advertising identifiers, behavioural analytics, fingerprinting, cross-site tracking, tracking pixels, session replay, or sale/sharing of personal data.
2. No non-essential cookies. Authentication should use secure, strictly necessary session storage only when an account-backed edition is enabled.
3. Public/static mode stores plans and logs locally on the user's device and must work without creating an account.
4. Cloud-sync mode must use client-side/end-to-end encryption before uploads. The service stores ciphertext only and does not hold decryption keys.
5. Progress photos must be encrypted on the device before storage or synchronization. Plaintext images must never be written to server logs, support consoles, backups, thumbnails, moderation queues, or analytics tools.
6. Encryption keys are generated and held on the user's device, protected by the platform keychain/secure enclave where available. Recovery must use a user-controlled recovery key or passphrase; administrators cannot reset or recover encrypted content.
7. Metadata minimization: store only what is required to operate the feature. Avoid filenames, EXIF location, device identifiers, IP retention, and detailed access logs. Strip EXIF metadata from imported photos before saving.
8. Export and deletion: users can export their information and permanently delete local and synchronized data. Deleted cloud ciphertext and backups must expire under a documented retention schedule.
9. No hidden third-party calls. Every external service must be listed in a machine-readable dependency inventory and privacy disclosure.
10. Privacy-safe defaults: photo uploads, cloud backup, notifications, camera access, health integrations, and location access are off until explicitly enabled.

## Recommended technical design

### Local-only mode

- IndexedDB for structured plans and logs.
- Origin Private File System or encrypted IndexedDB blobs for progress photos.
- Web Crypto API using AES-GCM for data at rest.
- Per-user master key derived locally and wrapped by device credentials or a passphrase.
- Service worker supports offline use without third-party requests.

### Optional private sync

- Client encrypts each record and image with a unique data-encryption key.
- Data-encryption keys are wrapped by the user's master key.
- Server receives encrypted payloads, encrypted filenames, coarse timestamps, and the minimum account identifier.
- Database row-level access controls remain mandatory even though payloads are encrypted.
- Admin consoles may show account status and storage totals, never decrypted plans, logs, measurements, notes, or photos.

### Security controls

- Content Security Policy blocks unauthorized scripts, frames, beacons, and network destinations.
- Subresource Integrity for any permitted static dependency.
- No remote fonts, trackers, tag managers, crash-replay tools, or advertising SDKs.
- Dependency auditing, secret scanning, secure headers, rate limiting, CSRF protection, and regular penetration testing.
- Automated test that fails the build if unapproved network hosts, cookies, analytics SDKs, or tracking APIs are detected.

## Privacy centre requirements

The app must include a privacy centre showing:

- What is stored locally.
- Whether private sync is enabled.
- Which permissions are granted.
- Export my data.
- Delete photos and logs.
- Delete my account and encrypted cloud data.
- Clear this device.
- External-services inventory.
- A plain-language statement: "Project 220 does not sell your information, use advertising trackers, or allow staff to view your private photos and plans."

## Important limitation

Absolute privacy cannot be promised merely through policy. The no-admin-access promise is only technically credible when private content is end-to-end encrypted and keys remain under user control. Device compromise, screenshots, exported files, and voluntary sharing remain under the user's control.