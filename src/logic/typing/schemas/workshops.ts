import type { output as ZodOutput } from "zod/mini";
import type { WorkshopSchema } from "~schemas/workshops";

export type WorkshopValues = ZodOutput<typeof WorkshopSchema.Workshop>;
export type RosterEntryValues = ZodOutput<typeof WorkshopSchema.RosterEntry>;
export type ReviewEntryValues = ZodOutput<typeof WorkshopSchema.ReviewEntry>;
export type CodeValues = ZodOutput<typeof WorkshopSchema.Code>;
