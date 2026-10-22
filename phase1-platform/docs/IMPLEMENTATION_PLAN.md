# Phase-1 implementation plan and acceptance gates

This sequence is based on the uploaded **MVP Startup Architecture & Phase-1 Launch Blueprint** and the current `phase1-platform/README.md`. It separates what the prototype already demonstrates from what must be built before any real bookings.

## Phase 0 — Protect existing deliverables

**Scope**
- Keep the Android wrapper loading `https://www.drinkanddrivecolombo.com.lk/`.
- Keep the current `phase1-platform/` demo accessible for design/flow review.
- Keep the live website repository and its content, styling, colours and wording independent from the MVP code.

**Acceptance gate**
- Android wrapper files are not changed by platform work.
- Existing prototype files are not replaced as part of architecture documentation.
- Android build/lint and existing prototype checks remain green.

## Phase 1 — Agree contracts before coding production apps

**Deliverables**
- Select React Native or Flutter for the two mobile apps.
- Select the admin web framework and supported Node.js runtime.
- Define shared booking, driver, trip, inspection, pricing and audit-event schemas.
- Define the booking/trip state machine, role matrix, failure states and idempotency rules.
- Define the fare formula, rounding, cancellation/waiting rules and commission settlement.
- Document the service areas: Colombo 03, Colombo 07, Mount Lavinia, Negombo, Weligama and Hikkaduwa.

**Acceptance gate**
- Rider, driver and admin use the same documented names and allowed state transitions.
- Fare test cases cover boundary values and invalid inputs.
- No decision about a payment or notification provider is treated as implemented before credentials, sandbox behaviour, pricing and operational ownership are verified.

## Phase 2 — Identity and trusted backend

**Deliverables**
- Authentication and role-based authorisation for rider, verified driver and operations users.
- Server-owned booking and trip state transitions.
- Server-side rate-card lookup and fare calculation.
- Driver eligibility and availability filtering.
- Audit events for assignment, re-assignment, override, inspection, PIN validation and completion.
- Environment configuration and managed secret storage.

**Acceptance gate**
- Unauthenticated users cannot read or change protected records.
- A rider cannot alter the authoritative fare or mark a trip completed.
- Admin actions are authorised and reason-coded.
- Tests cover duplicate requests, stale status changes, rejected state transitions and service errors.

## Phase 3 — Rider app

**Deliverables**
- High-visibility booking path with large touch targets (blueprint target: at least 64 dp for critical controls).
- Saved home destination and pickup/destination input.
- Vehicle class and transmission selection.
- Server-calculated estimated fare, payment preference and booking status.
- Clear accessible error, retry and cancellation states.

**Acceptance gate**
- A booking cannot be submitted without required valid fields and service-area checks.
- Fare shown to the rider matches the server estimate for the same rate-card version.
- UI tests verify the booking flow on supported Android screen sizes and slow/unstable connections.

## Phase 4 — Driver app and secure handoff

**Deliverables**
- Driver verification status, availability, offer accept/decline and job navigation.
- Inbound-transit state distinct from driving the client's vehicle.
- Required front/back/left/right exterior photos before key handoff.
- Four-digit rider PIN with expiry, attempt limit and server validation.
- Active trip, completion, exception reporting and auditable transitions.

**Acceptance gate**
- Unverified drivers cannot receive real jobs.
- Trip activation is rejected unless required photos and correct current PIN are recorded.
- Reused, expired or over-attempted PINs are rejected.
- Photo upload failure blocks handoff and offers a safe retry path.
- Location collection follows platform permissions and documented retention limits.

## Phase 5 — Admin and manual dispatch

**Deliverables**
- Searchable booking/driver queue with clear lifecycle states.
- Eligible-driver assignment and re-assignment.
- Manual override with reason and audit record.
- Versioned rate-card management with validation against agreed limits.
- Exceptions queue, operational export and minimal health indicators.

**Acceptance gate**
- Dispatcher cannot force a trip past safety-critical verification.
- Every override records actor, reason, timestamp and before/after state.
- A rate change affects new quotations according to a recorded version and does not silently rewrite a confirmed fare.

## Phase 6 — Notifications, maps and payment

**Deliverables**
- Configured maps/navigation integration.
- SMS/notification adapter (for example, a verified Twilio or NotifyLK integration).
- Chosen payment provider integration or documented cash-handling procedure.
- Provider timeout, retry, duplicate-event and reconciliation handling.

**Acceptance gate**
- Sandbox-to-production switch is explicit and protected.
- Provider secrets never ship in client bundles.
- Failures are visible to operations; they do not silently create duplicate bookings or charges.
- Payments and platform commission reconcile against completed transactions.

## Phase 7 — Controlled pilot readiness

**Deliverables**
- Driver verification/onboarding and operational support procedure.
- Monitoring, structured logs, error alerts, backups and a tested restore procedure.
- Photo/data retention and deletion policy, access controls and incident procedure.
- Legal, transport, insurance, data protection and payment review suitable for Sri Lanka.
- Pilot runbook, support contacts, rollback procedure and written go/no-go checklist.

**Acceptance gate**
- End-to-end tests pass for booking, assignment, driver travel, four-photo inspection, PIN handoff, active trip, completion, payment outcome and exception recovery.
- Access-control tests include denial cases.
- Real ride testing begins only after owners approve operational, insurance and legal readiness.

## Do not treat these as completed

The existing same-device prototype can demonstrate interaction flow and local fare calculations. It does **not** prove authentication, server-side enforcement, live dispatch, cross-device synchronisation, location tracking, SMS delivery, photo storage, PIN security or real payment processing. The acceptance gates above must be met by production implementations and tests before those capabilities are advertised as available.
