import type { input as ZodInput, output as ZodOutput } from "zod/mini";
import type { StudentSchema } from "~schemas/students";

export type ProfileShape = typeof StudentSchema.Profile;
export type ProfileValues = ZodOutput<ProfileShape>;

export type PhotoValues = ZodOutput<typeof StudentSchema.Photo>;
export type HelperValues = ZodOutput<typeof StudentSchema.Helper>;

export type NewStudentShape = typeof StudentSchema.New;
export type NewStudentValues = ZodOutput<NewStudentShape>;
export type NewStudentInput = ZodInput<NewStudentShape>;
