# Project 220 TestFlight Setup

This branch prepares Project 220 for an iOS TestFlight build using Capacitor.

## What is already prepared

- iOS Capacitor scripts in `package.json`
- Bundle identifier: `com.project220.health`
- App name: `Project 220`
- Public web build directory: `public-pages`

## Required Apple-side setup

The Apple account holder must complete these steps because they involve identity verification, legal agreements, payment, certificates, and private signing credentials.

1. Enroll in the Apple Developer Program.
2. Open App Store Connect and create an iOS app named `Project 220`.
3. Use bundle ID `com.project220.health`.
4. Create an App Store Connect API key with permission to upload builds.
5. Create or enable iOS distribution signing for the bundle ID.
6. Complete TestFlight beta information, export-compliance questions, contact information, privacy details, and age rating.

Never commit Apple private keys, signing certificates, provisioning profiles, passwords, or App Store Connect API secrets to GitHub.

## Local Mac build

A Mac with the current supported Xcode and iOS SDK is required.

```bash
npm ci
npm run ios:init
npm run ios:open
```

In Xcode:

1. Select the `App` project and `App` target.
2. Select the correct Apple Developer Team.
3. Confirm bundle identifier `com.project220.health`.
4. Set a unique version and build number.
5. Add required privacy descriptions for camera and photo-library access.
6. Test on a physical iPhone.
7. Choose Product → Archive.
8. In Organizer, choose Distribute App → App Store Connect → Upload.

## TestFlight release

1. Wait for App Store Connect to finish processing the uploaded build.
2. Add the build to an Internal Testing group first.
3. Install the TestFlight app on the iPhone.
4. Invite the tester using their Apple Account email.
5. Open the invitation on the iPhone and install Project 220.
6. For external testers, create an external group and submit the build for TestFlight Beta App Review.

## Required production work before clinical or commercial use

The current product is an Alpha and contains demonstration workflows. Before public or clinical use it still requires:

- secure backend authentication and database
- privacy and consent controls
- secure photo storage
- live AI and nutrition integrations
- accessibility review
- automated tests and device testing
- legal/privacy review for health data
- Apple privacy manifest and permission descriptions
- production payment, grocery, delivery, and pharmacy integrations

## GitHub secrets for future automated upload

When the Apple account is ready, store these as GitHub Actions secrets rather than source files:

- `APP_STORE_CONNECT_KEY_ID`
- `APP_STORE_CONNECT_ISSUER_ID`
- `APP_STORE_CONNECT_PRIVATE_KEY`
- `APPLE_TEAM_ID`
- signing certificate and provisioning-profile secrets if automatic signing is not used

The first practical target is an internal TestFlight Alpha for the account holder, followed by external beta testing after Apple review.
