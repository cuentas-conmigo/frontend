import { z } from "zod/mini";

import { CommonSchema, optional } from "../common";
import { WorkshopSchema } from "../workshops";

const Charge = z.object({
	id: z.string(),
	workshopId: z.string(),
	studentId: z.string(),
	period: z.string(),
	kind: z.enum(["monthly", "extra"]),
	label: z.string(),
	amount: z.number(),
	status: CommonSchema.PaymentStatus,
	paidAt: optional(z.string()),
	folio: optional(z.string()),
});

/** The student's single card: each workshop with its charges. */
export const CardSchema = {
	Charge,
	Workshop: z.object({
		workshop: WorkshopSchema.Workshop,
		charges: z.array(Charge),
		current: optional(Charge),
	}),
};
