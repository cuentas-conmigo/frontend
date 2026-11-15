import { z } from "zod/mini";
import { messages } from "~messages";

import { digitCount, optional } from "../common";

const errors = messages.newStudent.errors;

const Photo = z.object({ uri: z.string(), grantedBy: z.string(), grantedAt: z.string() });

const Helper = z.object({ name: z.string(), relation: z.string(), phone: z.string() });

/** A student's single profile, and the form that enrolls a new one. */
export const StudentSchema = {
	Photo,
	Helper,
	Profile: z.object({
		id: z.string(),
		name: z.string(),
		phone: z.string(),
		photo: optional(Photo),
		helpers: optional(z.array(Helper)),
	}),
	New: z.object({
		name: z.string().check(z.trim(), z.minLength(1, errors.name)),
		phone: z.string().check(z.refine((value) => digitCount(value) === 10, errors.phone)),
		helperPhone: z
			.string()
			.check(z.refine((value) => value === "" || digitCount(value) === 10, errors.helper)),
		photoUri: z.optional(z.string()),
		photoConsent: z.boolean(),
	}),
};
