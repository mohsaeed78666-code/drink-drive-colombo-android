import { initializeApp } from "firebase-admin/app";
import { getFirestore, FieldValue } from "firebase-admin/firestore";
import { HttpsError, onCall } from "firebase-functions/v2/https";
import { validateBookingInput } from "./domain.js";

initializeApp();
const db = getFirestore();

export const createBooking = onCall(
  { enforceAppCheck: true, region: "asia-southeast1" },
  async (request) => {
    if (!request.auth) {
      throw new HttpsError("unauthenticated", "Sign in before creating a booking.");
    }

    const validation = validateBookingInput(request.data);
    if (!validation.ok) {
      throw new HttpsError("invalid-argument", validation.reason);
    }

    const bookingRef = db.collection("bookings").doc();
    const booking = {
      id: bookingRef.id,
      riderUid: request.auth.uid,
      pickupText: validation.value.pickupText,
      destinationText: validation.value.destinationText,
      serviceArea: validation.value.serviceArea,
      vehicleClass: validation.value.vehicleClass,
      gearbox: validation.value.gearbox,
      paymentMethod: validation.value.paymentMethod,
      status: "REQUESTED",
      fareStatus: "NOT_QUOTED",
      dispatchStatus: "NOT_ASSIGNED",
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    };

    await bookingRef.create(booking);
    return {
      bookingId: bookingRef.id,
      status: booking.status,
      fareStatus: booking.fareStatus,
      dispatchStatus: booking.dispatchStatus,
    };
  },
);
