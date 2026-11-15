import { describe, expect, it } from "vitest";

import { initialOf } from "./initial-of";

describe("initialOf", () => {
	it("returns the upper-cased first letter", () => {
		expect(initialOf("rosa Martínez")).toBe("R");
	});

	it("ignores surrounding spaces", () => {
		expect(initialOf("  ana")).toBe("A");
	});

	it("keeps accented and ñ initials intact", () => {
		expect(initialOf("élida")).toBe("É");
		expect(initialOf("ñandú")).toBe("Ñ");
	});

	it("does not split emoji made of surrogate pairs", () => {
		expect(initialOf("🌵 Club")).toBe("🌵");
	});

	it("falls back to a question mark for blank names", () => {
		expect(initialOf("   ")).toBe("?");
	});
});
