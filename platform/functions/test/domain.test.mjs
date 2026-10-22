import test from "node:test";
import assert from "node:assert/strict";
import { validateBookingInput, SERVICE_AREAS } from "../lib/domain.js";

const valid = {
  pickupText: "Colombo 03, Sri Lanka",
  destinationText: "Negombo, Sri Lanka",
  serviceArea: "Colombo 03",
  vehicleClass: "Sedan/Hatchback",
  gearbox: "Automatic",
  paymentMethod: "Cash",
};

test("accepts a valid booking and trims user text", () => {
  const result = validateBookingInput({ ...valid, pickupText: "  Colombo 03  " });
  assert.equal(result.ok, true);
  if (result.ok) assert.equal(result.value.pickupText, "Colombo 03");
});

test("accepts only the blueprint service areas", () => {
  assert.equal(SERVICE_AREAS.length, 6);
  assert.equal(validateBookingInput({ ...valid, serviceArea: "Kandy" }).ok, false);
});

test("rejects missing or malformed input", () => {
  assert.equal(validateBookingInput(null).ok, false);
  assert.equal(validateBookingInput([]).ok, false);
  assert.equal(validateBookingInput({ ...valid, pickupText: "" }).ok, false);
  assert.equal(validateBookingInput({ ...valid, destinationText: "x".repeat(241) }).ok, false);
});

test("rejects unsupported vehicle, gearbox and payment values", () => {
  assert.equal(validateBookingInput({ ...valid, vehicleClass: "Bus" }).ok, false);
  assert.equal(validateBookingInput({ ...valid, gearbox: "Unknown" }).ok, false);
  assert.equal(validateBookingInput({ ...valid, paymentMethod: "Crypto" }).ok, false);
});
