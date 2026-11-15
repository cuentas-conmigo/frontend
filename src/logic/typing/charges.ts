import type { CardChargeValues } from "./schemas/card";
import type {
	ChargeOptionValues,
	ChargeValues,
	PaymentMethodValues,
	PaymentValues,
} from "./schemas/payments";

/** Something a student can be charged for in a workshop. */
export type ChargeOption = ChargeOptionValues;

/** A charge on a student's card for one workshop and period. */
export type CardCharge = CardChargeValues;

/** How the payment is collected: CoDi QR, CoDi push to a helper, or cash noted by hand. */
export type PaymentMethod = PaymentMethodValues;

/** One attempt to collect a charge. */
export type Payment = PaymentValues;

/** Data needed to start collecting a charge. */
export type StartPayment = ChargeValues;

/** Option id for an amount the instructor types by hand. */
export const customOptionId = "custom";
