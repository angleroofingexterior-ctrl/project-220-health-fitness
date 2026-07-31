# Project 220 Build 0.2 — Release Status

## Current confirmed state

- A functional browser test build exists in the repository.
- The test build includes local-device profile entry, nutrition logging, exact-quantity supplement scaling, workout logging, weight tracking, dashboard totals, export, and delete-all-data controls.
- The current test build stores data in browser localStorage and is not yet production authentication or cloud synchronization.
- A separate supplement-engine pull request remains open and should be reconciled with the functional test build before release.

## Phase 1 — Working PWA beta

### Required

- [ ] Reconcile the functional test app with the main Next.js application.
- [ ] Replace inline prototype code with typed React components and shared data models.
- [ ] Connect nutrition, supplement, workout, progress, profile, and dashboard modules.
- [ ] Add edit and delete operations for every log type.
- [ ] Add input validation and user-visible error states.
- [ ] Confirm manifest, icons, theme colour, start URL, and display mode.
- [ ] Confirm service-worker registration and offline shell caching.
- [ ] Add an app version display: 0.2.0-beta.1.
- [ ] Run production build and automated tests.
- [ ] Deploy beta PWA and test installation on iPhone, iPad, Android, and desktop.

### Acceptance test

A user can install Project 220 from the browser, reopen it from the home screen, log food, supplements, workouts, and weight, close the app, reopen it, and still see the saved data.

## Phase 2 — Authentication and cloud data

- [ ] Select PostgreSQL hosting.
- [ ] Create database schema and migrations.
- [ ] Implement registration, login, logout, password reset, and session persistence.
- [ ] Enforce per-user data ownership.
- [ ] Add account export and account deletion.
- [ ] Add encrypted photo storage for progress photos.
- [ ] Add offline queue and reconnect synchronization.

## Phase 3 — Android packaging

- [ ] Add Capacitor configuration.
- [ ] Create Android project.
- [ ] Set package ID to com.project220.health.
- [ ] Add Project 220 icons and splash screen.
- [ ] Configure network and storage permissions only as needed.
- [ ] Generate debug APK for private testing.
- [ ] Test installation on Android phone and tablet.
- [ ] Create secure signing key outside the repository.
- [ ] Generate signed release APK and Android App Bundle.

## Phase 4 — Windows packaging

- [ ] Select Tauri or Electron.
- [ ] Create Windows package configuration.
- [ ] Build and test installer.
- [ ] Add signing when preparing public distribution.

## Phase 5 — iPhone and iPad

- [ ] Create Apple Developer account and identifiers.
- [ ] Add iOS Capacitor project.
- [ ] Configure signing and provisioning.
- [ ] Test on physical devices.
- [ ] Publish private TestFlight beta.

## Phase 6 — macOS

- [ ] Create macOS package.
- [ ] Test local installation.
- [ ] Sign and notarize before public distribution.

## Phase 7 — Public release preparation

- [ ] Privacy policy.
- [ ] Terms of use.
- [ ] Medical, fitness, nutrition, and supplement disclaimers.
- [ ] Support and data-deletion instructions.
- [ ] Store screenshots and descriptions.
- [ ] Google Play data-safety submission.
- [ ] Apple privacy questionnaire.
- [ ] Production monitoring and backups.
- [ ] Beta feedback review and release approval.

## Immediate engineering order

1. Merge the useful supplement-engine work into the functional Build 0.2 branch.
2. Refactor the browser prototype into the repository's React application.
3. confirm production PWA build and installation.
4. add automated build checks.
5. begin Capacitor Android packaging.

## Important limitation

The current functional test build is a local-device beta prototype. It should not be represented as a secure production health-data platform until authentication, cloud isolation, privacy controls, testing, and release signing are complete.
