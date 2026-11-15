import { describe, expect, it } from "vitest";

import { CardSchema } from "./index";

const workshop = {
	id: "5",
	name: "Taller de tejido",
	instructor: "María",
	schedule: "Martes",
	monthlyFee: 1,
	capacity: 12,
};
const charge = {
	id: "c-1",
	workshopId: "5",
	studentId: "11",
	period: "2026-12",
	kind: "monthly",
	label: "Diciembre",
	amount: 1,
	status: "pending",
};

describe("CardSchema.Workshop", () => {
	it("reads a workshop on the card with its current charge", () => {
		expect(
			CardSchema.Workshop.parse({ workshop, charges: [charge], current: charge }).current?.label
		).toBe("Diciembre");
	});

	it("refuses an unknown charge kind", () => {
		expect(
			CardSchema.Workshop.safeParse({ workshop, charges: [{ ...charge, kind: "fine" }] }).success
		).toBe(false);
	});
});
