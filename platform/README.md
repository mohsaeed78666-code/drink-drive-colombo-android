# Production platform foundation

This folder is the isolated home for the future production platform. It does not replace `app/` (the existing Android website wrapper) or `phase1-platform/` (the local-only interaction prototype).

## Current foundation

- `functions/`: Firebase Cloud Functions v2 callable backend foundation.
- `firestore.rules`: client access rules; privileged writes must go through trusted server functions.
- `docs/`: architecture and implementation plan maintained alongside the code.

## Local verification

Requirements: Node.js 22 and npm.

```sh
cd platform/functions
npm install
npm test
```

## Firebase setup required before deployment

1. Create/select the correct Firebase project and enable billing where required.
2. Enable Firebase Authentication and Firestore in that project.
3. Configure the Firebase CLI and project alias locally; do not commit credentials or service-account keys.
4. Review and deploy Firestore rules and Cloud Functions to a non-production project first.
5. Add and test role claims, driver verification, server-side map-distance quoting, dispatch, inspection-photo storage, PIN lifecycle, notifications and payment reconciliation before live rides.

## Current callable API

`createBooking` authenticates the caller and writes a validated booking request with server-generated ID and timestamp. It deliberately does not assign a driver or mark a fare as confirmed. Pricing and dispatch remain blocked until trusted distance inputs and the required services are implemented.

This is a backend foundation, not a launch-ready ride platform. Do not use it to coordinate real rides until all security, operational, legal and insurance gates in `docs/IMPLEMENTATION_PLAN.md` are complete.
