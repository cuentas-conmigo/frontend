import { z } from "zod/mini";
import { messages } from "~messages";

/** "Unirme a un taller": the code the instructor shares. */
export const JoinSchema = {
	Code: z.object({
		code: z.string().check(z.trim(), z.minLength(1, messages.join.errors.empty)),
	}),
};
