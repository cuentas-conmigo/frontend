import { describe, expect, it } from "vitest";

import { firstName } from "./first-name";

describe("firstName", () => {
	it("returns the first word", () => {
		expect(firstName("Rosa Martínez")).toBe("Rosa");
	});

	it("ignores extra spaces", () => {
		expect(firstName("  Élida   Ramírez ")).toBe("Élida");
	});

	it("returns an empty string for a blank name", () => {
		expect(firstName("   ")).toBe("");
	});
});
