import type { input as ZodInput, output as ZodOutput } from "zod/mini";
import type { PaymentSchema } from "~schemas/payments";

export type PaymentMethodValues = ZodOutput<typeof PaymentSchema.Method>;
export type ChargeOptionValues = ZodOutput<typeof PaymentSchema.ChargeOption>;
export type ChargeValues = ZodOutput<typeof PaymentSchema.Charge>;
export type PaymentValues = ZodOutput<typeof PaymentSchema.Payment>;

export type AmountShape = typeof PaymentSchema.Amount;
export type AmountValues = ZodOutput<AmountShape>;
export type AmountInput = ZodInput<AmountShape>;
