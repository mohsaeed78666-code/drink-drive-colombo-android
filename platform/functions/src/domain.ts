export const SERVICE_AREAS = [
  "Colombo 03",
  "Colombo 07",
  "Mount Lavinia",
  "Negombo",
  "Weligama",
  "Hikkaduwa",
] as const;

export const VEHICLE_CLASSES = ["Sedan/Hatchback", "SUV", "Luxury"] as const;
export const GEARBOX_TYPES = ["Manual", "Automatic"] as const;
export const PAYMENT_METHODS = ["Cash", "Genie", "FriMi", "Card"] as const;

export type BookingInput = {
  pickupText: string;
  destinationText: string;
  serviceArea: (typeof SERVICE_AREAS)[number];
  vehicleClass: (typeof VEHICLE_CLASSES)[number];
  gearbox: (typeof GEARBOX_TYPES)[number];
  paymentMethod: (typeof PAYMENT_METHODS)[number];
};

export type ValidationResult =
  | { ok: true; value: BookingInput }
  | { ok: false; reason: string };

function boundedText(value: unknown, max: number): value is string {
  return typeof value === "string" && value.trim().length > 0 && value.trim().length <= max;
}

export function validateBookingInput(input: unknown): ValidationResult {
  if (input === null || typeof input !== "object" || Array.isArray(input)) {
    return { ok: false, reason: "Booking input must be an object." };
  }

  const data = input as Record<string, unknown>;
  if (!boundedText(data.pickupText, 240)) {
    return { ok: false, reason: "Pickup must be between 1 and 240 characters." };
  }
  if (!boundedText(data.destinationText, 240)) {
    return { ok: false, reason: "Destination must be between 1 and 240 characters." };
  }
  if (!(SERVICE_AREAS as readonly unknown[]).includes(data.serviceArea)) {
    return { ok: false, reason: "Service area is not supported." };
  }
  if (!(VEHICLE_CLASSES as readonly unknown[]).includes(data.vehicleClass)) {
    return { ok: false, reason: "Vehicle class is not supported." };
  }
  if (!(GEARBOX_TYPES as readonly unknown[]).includes(data.gearbox)) {
    return { ok: false, reason: "Gearbox type is not supported." };
  }
  if (!(PAYMENT_METHODS as readonly unknown[]).includes(data.paymentMethod)) {
    return { ok: false, reason: "Payment method is not supported." };
  }

  return {
    ok: true,
    value: {
      pickupText: data.pickupText.trim(),
      destinationText: data.destinationText.trim(),
      serviceArea: data.serviceArea as BookingInput["serviceArea"],
      vehicleClass: data.vehicleClass as BookingInput["vehicleClass"],
      gearbox: data.gearbox as BookingInput["gearbox"],
      paymentMethod: data.paymentMethod as BookingInput["paymentMethod"],
    },
  };
}
