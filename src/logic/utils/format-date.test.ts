import { describe, expect, it } from "vitest";

import { formatDate } from "./format-date";

describe("formatDate", () => {
	it("shows day, short month and year in Mexico City time", () => {
		expect(formatDate("2026-11-14T18:00:00Z")).toBe("14 nov 2026");
	});

	it("uses the Mexico City day, not the UTC day", () => {
		expect(formatDate("2026-11-15T03:00:00Z")).toBe("14 nov 2026");
	});
});
