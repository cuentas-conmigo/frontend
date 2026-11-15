import type { input as ZodInput, output as ZodOutput } from "zod/mini";
import type { JoinSchema } from "~schemas/join";

export type JoinShape = typeof JoinSchema.Code;
export type JoinValues = ZodOutput<JoinShape>;
export type JoinInput = ZodInput<JoinShape>;
