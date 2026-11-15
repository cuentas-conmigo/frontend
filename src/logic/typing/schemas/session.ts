import type { input as ZodInput, output as ZodOutput } from "zod/mini";
import type { SessionSchema } from "~schemas/session";

export type SigninShape = typeof SessionSchema.Signin;
export type SigninValues = ZodOutput<SigninShape>;
export type SigninInput = ZodInput<SigninShape>;

export type SessionShape = typeof SessionSchema.Session;
export type SessionValues = ZodOutput<SessionShape>;
