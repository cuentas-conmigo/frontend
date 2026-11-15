import { describe, expect, it } from "vitest";

import { ApiError } from "./api.types";
import { createMockApi } from "./mock-api";

const start = {
	workshopId: "w-tejido",
	studentId: "s-1",
	optionId: "monthly-2026-12",
	amount: 130,
	concept: "Diciembre",
};

function setup() {
	let clock = Date.parse("2026-12-01T16:00:00Z");
	const api = createMockApi({ latencyMs: 0, settleAfterMs: 4000, now: () => clock });
	return { api, advance: (ms: number) => (clock += ms) };
}

describe("createMockApi", () => {
	it("signs in the two demo accounts", async () => {
		const { api } = setup();

		await expect(api.signIn({ usuario: "maria", clave: "demo" })).resolves.toMatchObject({
			name: "María González",
			workshopId: "w-tejido",
		});
		await expect(api.signIn({ usuario: "Rosa", clave: "demo" })).resolves.toMatchObject({
			name: "Rosa Martínez",
			studentId: "s-1",
		});
	});

	it("refuses an empty login", async () => {
		const { api } = setup();

		await expect(api.signIn({ usuario: " ", clave: "" })).rejects.toMatchObject({
			code: "unauthorized",
		});
	});

	it("lists only enrolled students, with December's status", async () => {
		const { api } = setup();

		const roster = await api.getRoster("w-tejido");

		expect(roster.map((entry) => `${entry.student.id}:${entry.status}`)).toEqual([
			"s-1:pending",
			"s-2:paid",
			"s-3:pending",
			"s-4:pending",
		]);
	});

	it("keeps a CoDi payment pending until the bank would confirm it, then updates the roster and the card", async () => {
		const { api, advance } = setup();
		const payment = await api.startPayment({ ...start, method: "qr" });

		expect(payment).toMatchObject({ status: "pending", folio: "A-0142" });
		expect(payment.qrString).toContain("DEMO-NO-ES-CODI");
		await expect(api.getPayment(payment.id)).resolves.toMatchObject({ status: "pending" });

		advance(4000);

		await expect(api.getPayment(payment.id)).resolves.toMatchObject({ status: "paid" });
		const roster = await api.getRoster("w-tejido");
		expect(roster.find((entry) => entry.student.id === "s-1")?.status).toBe("paid");
		const card = await api.getCard("s-1");
		expect(card.find((entry) => entry.workshop.id === "w-tejido")?.current?.status).toBe("paid");
	});

	it("marks cash as paid at once", async () => {
		const { api } = setup();

		const payment = await api.startPayment({ ...start, method: "cash" });

		expect(payment.status).toBe("paid");
		expect(payment.paidAt).toBeDefined();
	});

	it("records a typed amount as an extra charge with its concept", async () => {
		const { api } = setup();

		await api.startPayment({
			...start,
			optionId: "custom",
			amount: 75,
			concept: "Otro cobro",
			method: "cash",
		});

		const card = await api.getCard("s-1");
		const tejido = card.find((entry) => entry.workshop.id === "w-tejido");
		expect(tejido?.charges).toContainEqual(
			expect.objectContaining({ kind: "extra", label: "Otro cobro", amount: 75 })
		);
		expect(tejido?.current?.status).toBe("pending");
	});

	it("moves a reviewed student into the roster when approved", async () => {
		const { api } = setup();

		await api.approve("w-tejido", "s-5");

		expect((await api.getReviewList("w-tejido")).map((entry) => entry.student.id)).toEqual(["s-6"]);
		expect((await api.getRoster("w-tejido")).map((entry) => entry.student.id)).toContain("s-5");
	});

	it("frees the place when a student is released", async () => {
		const { api } = setup();

		await api.release("w-tejido", "s-2");

		expect((await api.getRoster("w-tejido")).map((entry) => entry.student.id)).not.toContain("s-2");
		expect((await api.getCard("s-2")).length).toBe(0);
	});

	it("adds a student and refuses a WhatsApp that is already enrolled", async () => {
		const { api } = setup();

		const added = await api.addStudent("w-tejido", {
			name: " Inés Vega ",
			phone: "55 1234 5678",
			photoConsent: false,
			photoUri: "file:///foto.jpg",
		});

		expect(added).toMatchObject({ name: "Inés Vega", phone: "5512345678" });
		expect(added.photo).toBeUndefined();
		await expect(
			api.addStudent("w-tejido", { name: "Otra", phone: "5512345678", photoConsent: false })
		).rejects.toMatchObject({
			code: "duplicate-phone",
		});
	});

	it("keeps a photo only together with its consent record", async () => {
		const { api } = setup();

		const added = await api.addStudent("w-tejido", {
			name: "Inés Vega",
			phone: "5512345678",
			photoConsent: true,
			photoUri: "file:///foto.jpg",
		});

		expect(added.photo).toMatchObject({ uri: "file:///foto.jpg", grantedBy: "Inés Vega" });
		await expect(api.removePhoto(added.id)).resolves.not.toHaveProperty("photo");
	});

	it("lets a student ask for a place with a code, once", async () => {
		const { api } = setup();

		await expect(api.joinWorkshop("s-2", " yoga-2026 ")).resolves.toMatchObject({ id: "w-yoga" });
		expect((await api.getReviewList("w-yoga")).map((entry) => entry.student.id)).toEqual(["s-2"]);
		await expect(api.joinWorkshop("s-2", "YOGA-2026")).rejects.toMatchObject({
			code: "already-joined",
		});
		await expect(api.joinWorkshop("s-2", "NOPE")).rejects.toBeInstanceOf(ApiError);
	});

	it("invalidates the old code when it rotates", async () => {
		const { api } = setup();

		const next = await api.rotateEnrollmentCode("w-tejido");

		expect(next).not.toBe("TEJIDO-2026");
		await expect(api.joinWorkshop("s-6", "TEJIDO-2026")).rejects.toMatchObject({
			code: "invalid-code",
		});
		await expect(api.getEnrollmentCode("w-tejido")).resolves.toBe(next);
	});
});
