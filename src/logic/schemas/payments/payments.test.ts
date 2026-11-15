import { describe, expect, it } from "vitest";

import { PaymentSchema } from "./index";

const payment = {
	id: "28",
	workshopId: "5",
	studentId: "11",
	optionId: "monthly-2026-12",
	method: "qr",
	amount: 1,
	concept: "Diciembre",
	status: "pending",
	folio: "A-0028",
	createdAt: "2026-11-15T15:49:00Z",
	qrString: '{"TYP":20}',
};

describe("PaymentSchema.Payment", () => {
	it("reads a pending CoDi payment", () => {
		expect(PaymentSchema.Payment.parse(payment)).toMatchObject({
			folio: "A-0028",
			status: "pending",
		});
	});

	it("refuses an unknown status or method", () => {
		expect(PaymentSchema.Payment.safeParse({ ...payment, status: "refunded" }).success).toBe(false);
		expect(PaymentSchema.Payment.safeParse({ ...payment, method: "card" }).success).toBe(false);
	});
});

describe("PaymentSchema.Amount", () => {
	it.each(["1", "130"])("takes %s pesos", (amount) => {
		expect(PaymentSchema.Amount.safeParse({ amount }).success).toBe(true);
	});

	it.each(["", "0", "1.5", "-3"])("refuses %j with one plain message", (amount) => {
		expect(PaymentSchema.Amount.safeParse({ amount }).error?.issues[0]?.message).toBe(
			"Escribe un monto mayor a cero."
		);
	});
});
