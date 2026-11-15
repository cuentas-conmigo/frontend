import { z } from "zod/mini";

import { CommonSchema } from "../common";
import { StudentSchema } from "../students";

/** A workshop, its roster and the people asking for a place. */
export const WorkshopSchema = {
	Workshop: z.object({
		id: z.string(),
		name: z.string(),
		instructor: z.string(),
		schedule: z.string(),
		monthlyFee: z.number(),
		capacity: z.number(),
	}),
	RosterEntry: z.object({ student: StudentSchema.Profile, status: CommonSchema.PaymentStatus }),
	ReviewEntry: z.object({
		student: StudentSchema.Profile,
		status: z.enum(["pending", "waitlist"]),
	}),
	Code: z.object({ code: z.string() }),
};
