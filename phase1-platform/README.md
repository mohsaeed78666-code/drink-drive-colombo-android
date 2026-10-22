# Drink & Drive Colombo — Phase 1 MVP prototype

This responsive installable web prototype implements the three roles in the attached blueprint in one same-device test interface. It is isolated in its own folder so the existing Android website-wrapper app is not replaced.

## Included

- Rider: Take Me Home, saved home address, Colombo 03, Colombo 07, Mount Lavinia, Negombo, Weligama and Hikkaduwa service areas, vehicle class, manual/automatic gearbox, pickup/destination, payment preference and fare estimate.
- Driver: demo profiles, availability, pickup map link, inbound-transit state, mandatory Front/Back/Left/Right photos, four-digit PIN check and trip-state completion.
- Admin/dispatch: demo-driver assignment, manual status override with photo/PIN guardrails, configurable rate card, totals and CSV export.
- PWA shell and automated fare tests.

## Pricing model

Fare = base + (client-drive kilometres × drive rate) + (driver inbound kilometres × inbound rate). Defaults: base LKR 1,500; drive LKR 250/km; inbound LKR 100/km; commission 15%. Admin can adjust within the PDF ranges: base LKR 1,500–2,500, drive LKR 250–350/km, inbound LKR 100–150/km and commission 15%–20%. These are blueprint assumptions, not verified market prices.

## Run and test

Serve this folder over HTTP for PWA behaviour. For example, run a local Python HTTP server from the phase1-platform folder on port 8080, then open http://localhost:8080. Run npm test with Node.js 18 or newer for fare tests.

## Not production-ready

All bookings, saved addresses, PINs, rates and compressed inspection photos are local to one browser/device and do not sync to other phones. There is no production authentication, Firebase backend, background location, live driver dispatch, SMS notification, payment processing, verified-driver onboarding, production photo storage, telemetry upload or secure key-handoff PIN service. Do not coordinate real rides with this prototype.

Before a live pilot, add the shared backend and role-based access rules, driver identity/licence verification, secure photo storage and retention, notifications, server-side fare validation, monitored location permissions, logging, and Sri Lankan legal/insurance review. Keep service secrets out of browser code.