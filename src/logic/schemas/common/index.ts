import { z } from "zod/mini";

/** Optional field the backend may omit or send as `null`; both read as `undefined`. */
export const optional = <T extends z.ZodMiniType>(schema: T) =>
	z.optional(
		z.pipe(
			z.nullable(schema),
			z.transform((value) => value ?? undefined)
		)
	);

/** Counts the digits of a phone number, ignoring spaces and dashes. */
export const digitCount = (value: string) => value.replace(/\D/g, "").length;

/** Shared building blocks for the domain schemas. */
export const CommonSchema = {
	Id: z.string(),
	Money: z.number(),
	Date: z.string(),
	PaymentStatus: z.enum(["paid", "pending"]),
};
