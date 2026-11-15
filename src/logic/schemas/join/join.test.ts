import { describe, expect, it } from "vitest";

import { JoinSchema } from "./index";

describe("JoinSchema.Code", () => {
	it("trims the code", () => {
		expect(JoinSchema.Code.parse({ code: " TEJIDO-2026 " })).toEqual({ code: "TEJIDO-2026" });
	});

	it("asks for the code when it is empty", () => {
		expect(JoinSchema.Code.safeParse({ code: "  " }).error?.issues[0]?.message).toBe(
			"Escribe el código."
		);
	});
});
