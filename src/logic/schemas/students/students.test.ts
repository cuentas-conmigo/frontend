import { describe, expect, it } from "vitest";

import { StudentSchema } from "./index";

const valid = { name: " Inés Vega ", phone: "55 1234 5678", helperPhone: "", photoConsent: false };

describe("StudentSchema.New", () => {
	it("takes a name and a 10-digit WhatsApp, trimming the name", () => {
		expect(StudentSchema.New.parse(valid)).toMatchObject({
			name: "Inés Vega",
			phone: "55 1234 5678",
		});
	});

	it("explains each wrong field", () => {
		const result = StudentSchema.New.safeParse({
			...valid,
			name: "",
			phone: "55",
			helperPhone: "123",
		});

		expect(result.error?.issues.map((issue) => [issue.path.join("."), issue.message])).toEqual([
			["name", "Escribe el nombre."],
			["phone", "El WhatsApp debe tener 10 dígitos."],
			["helperPhone", "El WhatsApp de quien ayuda debe tener 10 dígitos."],
		]);
	});

	it("accepts a helper phone with 10 digits", () => {
		expect(StudentSchema.New.safeParse({ ...valid, helperPhone: "5500001122" }).success).toBe(true);
	});
});

describe("StudentSchema.Profile", () => {
	it("reads a profile without photo or helpers", () => {
		expect(StudentSchema.Profile.parse({ id: "11", name: "Rosa", phone: "5500000001" })).toEqual({
			id: "11",
			name: "Rosa",
			phone: "5500000001",
		});
	});

	it("refuses a numeric id", () => {
		expect(
			StudentSchema.Profile.safeParse({ id: 11, name: "Rosa", phone: "5500000001" }).success
		).toBe(false);
	});
});
