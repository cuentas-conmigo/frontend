import { describe, expect, it } from "vitest";

import { SessionSchema } from "./index";

const issues = (result: { success: boolean; error?: { issues: { message: string }[] } }) =>
	result.error?.issues.map((issue) => issue.message) ?? [];

describe("SessionSchema.Signin", () => {
	it("takes a login and trims the user", () => {
		expect(SessionSchema.Signin.parse({ usuario: " maria ", clave: "secreta" })).toEqual({
			usuario: "maria",
			clave: "secreta",
		});
	});

	it("asks for both fields in plain words", () => {
		expect(issues(SessionSchema.Signin.safeParse({ usuario: "  ", clave: "" }))).toEqual([
			"Escribe tu usuario.",
			"Escribe tu contraseña.",
		]);
	});
});

describe("SessionSchema.Session", () => {
	it("reads an instructor session and treats null ids as missing", () => {
		expect(
			SessionSchema.Session.parse({
				name: "María",
				role: "instructor",
				workshopId: "5",
				studentId: null,
			})
		).toEqual({ name: "María", role: "instructor", workshopId: "5", studentId: undefined });
	});

	it("refuses an unknown role", () => {
		expect(SessionSchema.Session.safeParse({ name: "María", role: "admin" }).success).toBe(false);
	});
});
