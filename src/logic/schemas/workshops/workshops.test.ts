import { describe, expect, it } from "vitest";

import { WorkshopSchema } from "./index";

describe("WorkshopSchema", () => {
	it("reads a roster entry with its payment status", () => {
		expect(
			WorkshopSchema.RosterEntry.parse({
				student: { id: "12", name: "Ana", phone: "55" },
				status: "paid",
			})
		).toMatchObject({ status: "paid" });
	});

	it("only accepts pending or waitlist on the review list", () => {
		const entry = { student: { id: "13", name: "Élida", phone: "55" }, status: "enrolled" };

		expect(WorkshopSchema.ReviewEntry.safeParse(entry).success).toBe(false);
	});
});
