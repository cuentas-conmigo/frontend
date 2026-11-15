import { z } from "zod/mini";
import { messages } from "~messages";

import { optional } from "../common";

const copy = messages.signIn;

/** Sign-in form and the session the backend returns for it. */
export const SessionSchema = {
	Signin: z.object({
		usuario: z.string().check(z.trim(), z.minLength(1, copy.missingName)),
		clave: z.string().check(z.minLength(1, copy.missingPassword)),
	}),
	Session: z.object({
		name: z.string(),
		role: z.enum(["instructor", "student"]),
		workshopId: optional(z.string()),
		studentId: optional(z.string()),
	}),
};
