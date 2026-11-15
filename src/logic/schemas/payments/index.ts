import { z } from "zod/mini";
import { messages } from "~messages";

import { CommonSchema, optional } from "../common";

const Method = z.enum(["qr", "helper", "cash"]);

/** What can be charged, the request that starts a charge, and the payment it creates. */
export const PaymentSchema = {
	Method,
	ChargeOption: z.object({
		id: z.string(),
		label: z.string(),
		detail: z.string(),
		amount: z.number(),
	}),
	Charge: z.object({
		workshopId: z.string(),
		studentId: z.string(),
		optionId: z.string(),
		method: Method,
		amount: z.number(),
		concept: z.string(),
	}),
	Payment: z.object({
		id: z.string(),
		workshopId: z.string(),
		studentId: z.string(),
		optionId: z.string(),
		method: Method,
		amount: z.number(),
		concept: z.string(),
		status: CommonSchema.PaymentStatus,
		folio: z.string(),
		createdAt: z.string(),
		paidAt: optional(z.string()),
		qrString: optional(z.string()),
	}),
	/** "Ingresa el monto": whole pesos, more than zero. */
	Amount: z.object({
		amount: z
			.string()
			.check(
				z.refine((value) => /^\d+$/.test(value) && Number(value) > 0, messages.amount.invalid)
			),
	}),
};
