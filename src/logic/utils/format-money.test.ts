import { describe, expect, it } from "vitest";

import { formatMoney } from "./format-money";

describe("formatMoney", () => {
	it("drops cents on whole amounts", () => {
		expect(formatMoney(130)).toBe("$130");
	});

	it("groups thousands with commas", () => {
		expect(formatMoney(1300)).toBe("$1,300");
	});

	it("keeps cents when there are any", () => {
		expect(formatMoney(12.5)).toBe("$12.50");
	});
});
