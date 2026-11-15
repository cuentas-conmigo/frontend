import type { CardCharge, ChargeOption } from "~typing/charges";

import { findWorkshop } from "./workshops";

/** Invented history: November is settled, December is half paid. */
export const sampleCardCharges: readonly CardCharge[] = [
	{
		id: "c-1",
		workshopId: "w-tejido",
		studentId: "s-1",
		period: "2026-11",
		kind: "monthly",
		label: "Noviembre",
		amount: 130,
		status: "paid",
		paidAt: "2026-11-05T17:00:00Z",
		folio: "A-0131",
	},
	{
		id: "c-2",
		workshopId: "w-tejido",
		studentId: "s-1",
		period: "2026-12",
		kind: "monthly",
		label: "Diciembre",
		amount: 130,
		status: "pending",
	},
	{
		id: "c-3",
		workshopId: "w-yoga",
		studentId: "s-1",
		period: "2026-11",
		kind: "monthly",
		label: "Noviembre",
		amount: 150,
		status: "paid",
		paidAt: "2026-11-03T16:00:00Z",
		folio: "B-0088",
	},
	{
		id: "c-4",
		workshopId: "w-yoga",
		studentId: "s-1",
		period: "2026-12",
		kind: "monthly",
		label: "Diciembre",
		amount: 150,
		status: "paid",
		paidAt: "2026-12-01T16:00:00Z",
		folio: "B-0102",
	},
	{
		id: "c-5",
		workshopId: "w-tejido",
		studentId: "s-2",
		period: "2026-12",
		kind: "monthly",
		label: "Diciembre",
		amount: 130,
		status: "paid",
		paidAt: "2026-12-02T17:00:00Z",
		folio: "A-0139",
	},
	{
		id: "c-6",
		workshopId: "w-tejido",
		studentId: "s-3",
		period: "2026-12",
		kind: "monthly",
		label: "Diciembre",
		amount: 130,
		status: "pending",
	},
	{
		id: "c-7",
		workshopId: "w-yoga",
		studentId: "s-3",
		period: "2026-12",
		kind: "monthly",
		label: "Diciembre",
		amount: 150,
		status: "pending",
	},
	{
		id: "c-8",
		workshopId: "w-tejido",
		studentId: "s-4",
		period: "2026-12",
		kind: "monthly",
		label: "Diciembre",
		amount: 130,
		status: "pending",
	},
];

/** Charges a student can pay in a workshop right now. */
export function chargeOptionsFor(workshopId: string): readonly ChargeOption[] {
	const workshop = findWorkshop(workshopId);
	if (!workshop) return [];
	const fee = workshop.monthlyFee;
	const options: ChargeOption[] = [
		{ id: "monthly-2026-12", label: "Diciembre", detail: "Mensualidad", amount: fee },
		{
			id: "months-2026-12-2027-01",
			label: "Diciembre y enero",
			detail: "Dos meses",
			amount: fee * 2,
		},
	];
	if (workshopId === "w-tejido") {
		options.push({
			id: "extra-dif-2026",
			label: "Cuota del DIF",
			detail: "Cobro aparte anual",
			amount: 40,
		});
	}
	return options;
}

/** Finds one of a workshop's charge options by id. */
export function findChargeOption(workshopId: string, optionId: string): ChargeOption | undefined {
	return chargeOptionsFor(workshopId).find((option) => option.id === optionId);
}
