# Phase-1 MVP architecture and repository boundaries

## Purpose

This document converts the uploaded **MVP Startup Architecture & Phase-1 Launch Blueprint** into an implementation structure. The blueprint remains the product source of truth. This is an architecture plan, not evidence that the production services listed here already exist.

## Repository boundaries

The repository currently contains two distinct deliverables:

1. **Android website wrapper** — loads `https://www.drinkanddrivecolombo.com.lk/`. Its website content, layout, colours, text, and behaviour stay owned by the existing website and are outside this MVP architecture change.
2. **`phase1-platform/` prototype** — a same-browser demonstration of Rider, Driver, and Admin/Dispatch flows. It is not a production backend and must not be used to coordinate real rides.

Keep both existing deliverables in place. Do not copy the live website into the platform app or change the website wrapper to build the MVP.

## Target production architecture

When production implementation begins, keep the real platform in a clearly isolated root (for example, `platform/`) rather than mixing it into the Android wrapper or replacing the prototype in place.

```text
platform/
  apps/
    rider-mobile/          # Customer booking and trip-status app
    driver-mobile/         # Driver availability, inspection, PIN and trip flow
    admin-web/             # Dispatch, support, pricing and audit interface
  services/
    api/                   # Trusted server-side commands and business rules
  packages/
    domain/                # Shared booking/trip/pricing types and state rules
    validation/            # Shared input schemas and validation helpers
  infra/
    firebase/              # Auth, Firestore rules/indexes and Functions config
  docs/
    architecture.md
    data-model.md
    security-and-privacy.md
  tests/
    acceptance/             # Rider/driver/admin end-to-end acceptance scenarios
```

This is the **target structure**, not a claim that these directories or services have already been implemented. Create real project workspaces only when the chosen app framework and build tools are agreed and configured; avoid empty placeholder app folders.

## Component responsibilities

| Component | Owns | Blueprint-aligned responsibilities |
|---|---|---|
| Rider mobile app | Customer-facing booking flow | Home address, pickup/destination, vehicle class, manual/automatic gearbox, fare estimate, payment preference, four-digit trip PIN and status |
| Driver mobile app | Driver workflow and permitted device capabilities | Availability, job offer, inbound travel, vehicle-condition photos, PIN verification, active trip and trip completion |
| Admin web | Operations and dispatch | View eligible requests/drivers, assign or reassign jobs, make audited manual overrides, manage a validated rate card, handle exceptions and export operational records |
| Trusted server/API | Authoritative business rules | Authentication/role checks, driver eligibility, assignment, trip-state transitions, pricing, PIN validation, audit records and payment/commission reconciliation |
| Firebase services | Identity and shared data, once implemented | Authentication and access-controlled data storage; server functions for privileged operations |
| Maps and notification adapters | External integrations | Map/navigation links or SDK, and SMS/notification delivery through configured providers such as Twilio or NotifyLK |

The blueprint allows React Native or Flutter for the rider/driver client and React or Vue with Node.js for admin/backend work. Choose one mobile framework and define the API/data contracts before implementation; do not mix multiple competing frameworks in the same app.

## Core workflows and state boundaries

### Rider booking

1. Validate the requested pickup, destination, service area and vehicle/gearbox requirements.
2. Obtain a server-calculated fare estimate using the published rate card.
3. Create a booking in a non-dispatchable state until the required fields and fare are confirmed.
4. Request driver assignment and show the rider the server-confirmed status.
5. Show the trip PIN to the rider only for the relevant handoff; do not expose stored PIN secrets in admin exports or logs.

### Driver and handoff

1. Driver signs in and completes verification before receiving real work.
2. Driver accepts or declines an eligible offer.
3. Record inbound transit separately from driving the customer's vehicle.
4. Before accepting the keys, collect the required four exterior inspection photos (front, back, left, right) and associate them with the booking, timestamp and authenticated driver.
5. Require server-side verification of the rider's four-digit PIN before the trip can move into the active-driving state.
6. Record trip completion and any exception with an audit trail.

Photo and PIN checks must be enforced by the trusted service, not just by disabled buttons in a mobile interface. The PIN must be short-lived, attempt-limited, and protected from logs and unauthorised access.

### Dispatch and exception handling

- Admin can assign/reassign only eligible drivers and bookings.
- Manual overrides require a reason, actor identity, timestamp and before/after state.
- Overrides must not bypass mandatory inspection evidence, PIN verification, driver verification or a safety-related hold.
- Store status changes as an auditable event history rather than silently overwriting operational history.

## Pricing model from the blueprint

Keep rates in a server-managed, versioned rate card. The uploaded blueprint gives these initial planning ranges:

- Base fare: LKR 1,500–2,500.
- Inbound driver travel offset: approximately LKR 100–150 per kilometre.
- Distance driven in the client's vehicle: LKR 250–350 per kilometre.
- Platform commission: 15%–20% per completed transaction.

The prototype's documented calculation is:

`fare = base + (client-drive kilometres × drive rate) + (driver inbound kilometres × inbound rate)`

The exact charging rules—including distance source, minimums, rounding, waiting/cancellation charges, taxes, when an estimate becomes final, and how commission is deducted—must be decided and versioned before taking live bookings. Validate every final fare on the server; the browser/mobile client is not authoritative. Values in the blueprint are assumptions, not verified market prices.

## Security, privacy and safety gates

- Enforce role-based access for rider, driver, dispatcher/admin and support roles.
- Verify driver identity, licence, eligibility and vehicle/insurance requirements before production dispatch.
- Keep API keys and provider credentials on the server or in managed secrets; never embed private secrets in browser or mobile source.
- Use least-privilege Firebase rules and test them against both allowed and denied access cases.
- Restrict and encrypt inspection-photo storage; define retention/deletion rules and access logs before pilot launch.
- Minimise background location collection, request permission transparently, and define when tracking starts/stops.
- Rate-limit PIN validation, expire PINs, and log security events without recording the PIN itself.
- Require booking-state validation and idempotency for operations that may be submitted more than once.
- Complete Sri Lankan legal, insurance, transport and payment-provider review before real service launch.

## Definition of production readiness

The prototype is **not production-ready** until all of the following are implemented and independently tested: real authentication, multi-device shared state, server-side booking/dispatch/pricing, authorised driver onboarding, secure photo storage, enforced PIN verification, notification delivery, monitored location behaviour, audit logs, payment/commission reconciliation, error monitoring, backup/restore and relevant legal/insurance sign-off.

## Implementation order

Use the companion `IMPLEMENTATION_PLAN.md` as the gate-by-gate sequence. Keep each step small, independently testable and reviewable. Do not remove the prototype or merge the production target into the website-wrapper app as a shortcut.
