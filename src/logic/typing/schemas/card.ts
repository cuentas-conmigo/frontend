import type { output as ZodOutput } from "zod/mini";
import type { CardSchema } from "~schemas/card";

export type CardChargeValues = ZodOutput<typeof CardSchema.Charge>;
export type CardWorkshopValues = ZodOutput<typeof CardSchema.Workshop>;
