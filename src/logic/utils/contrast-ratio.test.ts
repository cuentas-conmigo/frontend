import { describe, expect, it } from "vitest";

import { contrastRatio } from "./contrast-ratio";

describe("contrastRatio", () => {
	it("returns 21 for black on white", () => {
		expect(contrastRatio("#000000", "#FFFFFF")).toBeCloseTo(21, 5);
	});

	it("is symmetric", () => {
		expect(contrastRatio("#0F5F28", "#FFFFFF")).toBeCloseTo(
			contrastRatio("#FFFFFF", "#0F5F28"),
			10
		);
	});

	it("matches the 7.81:1 measured for white on the paid green", () => {
		expect(contrastRatio("#FFFFFF", "#0F5F28")).toBeCloseTo(7.81, 2);
	});

	it("rejects colors that are not #RRGGBB", () => {
		expect(() => contrastRatio("red", "#FFFFFF")).toThrow('Expected a #RRGGBB color, got "red"');
	});
});
