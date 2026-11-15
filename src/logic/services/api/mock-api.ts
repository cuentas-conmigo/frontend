import { chargeOptionsFor, sampleCardCharges } from "~fixtures/charges";
import { sampleStudents } from "~fixtures/students";
import {
	currentPeriod,
	currentStudentId,
	instructorWorkshopId,
	sampleEnrollmentCodes,
	sampleSubscriptions,
	sampleWorkshops,
} from "~fixtures/workshops";

import type { CardCharge, Payment } from "~typing/charges";
import type { StudentProfile, Subscription } from "~typing/students";
import type { Api, CardWorkshop } from "./api.types";

import { customOptionId } from "~typing/charges";
import { ApiError } from "./api.types";

interface MockOptions {
	/** Simulated network delay per call. */
	latencyMs?: number;
	/** How long a CoDi payment stays pending before the mock marks it paid, like Pey's webhook. */
	settleAfterMs?: number;
	now?: () => number;
	firstFolio?: number;
}

/** In-memory backend seeded with the sample data; every write is visible to later reads. */
export function createMockApi({
	latencyMs = 250,
	settleAfterMs = 4000,
	now = Date.now,
	firstFolio = 142,
}: MockOptions = {}): Api {
	const students = new Map(sampleStudents.map((student) => [student.id, { ...student }]));
	const subscriptions: Subscription[] = sampleSubscriptions.map((item) => ({ ...item }));
	const charges: CardCharge[] = sampleCardCharges.map((item) => ({ ...item }));
	const codes = new Map(Object.entries(sampleEnrollmentCodes));
	const payments = new Map<string, Payment>();
	let folio = firstFolio;
	let ids = 100;

	const wait = <T>(value: T): Promise<T> =>
		new Promise((resolve) => setTimeout(() => resolve(value), latencyMs));

	const workshopOf = (workshopId: string) => {
		const workshop = sampleWorkshops.find((item) => item.id === workshopId);
		if (!workshop) throw new ApiError("not-found", `Workshop ${workshopId} not found`);
		return workshop;
	};

	const studentOf = (studentId: string): StudentProfile => {
		const student = students.get(studentId);
		if (!student) throw new ApiError("not-found", `Student ${studentId} not found`);
		return student;
	};

	const subscriptionOf = (workshopId: string, studentId: string) =>
		subscriptions.find((item) => item.workshopId === workshopId && item.studentId === studentId);

	const monthlyCharge = (workshopId: string, studentId: string, period: string) =>
		charges.find(
			(item) =>
				item.kind === "monthly" &&
				item.workshopId === workshopId &&
				item.studentId === studentId &&
				item.period === period
		);

	const recordPaid = (payment: Payment) => {
		const paid = { status: "paid" as const, paidAt: payment.paidAt, folio: payment.folio };
		if (payment.optionId.startsWith("extra") || payment.optionId === customOptionId) {
			charges.push({
				id: `c-${++ids}`,
				workshopId: payment.workshopId,
				studentId: payment.studentId,
				period: currentPeriod.id,
				kind: "extra",
				label: payment.concept,
				amount: payment.amount,
				...paid,
			});
			return;
		}
		const fee = workshopOf(payment.workshopId).monthlyFee;
		const existing = monthlyCharge(payment.workshopId, payment.studentId, currentPeriod.id);
		if (existing) Object.assign(existing, paid);
		else {
			charges.push({
				id: `c-${++ids}`,
				workshopId: payment.workshopId,
				studentId: payment.studentId,
				period: currentPeriod.id,
				kind: "monthly",
				label: "Diciembre",
				amount: fee,
				...paid,
			});
		}
		if (payment.optionId.startsWith("months")) {
			charges.push({
				id: `c-${++ids}`,
				workshopId: payment.workshopId,
				studentId: payment.studentId,
				period: "2027-01",
				kind: "monthly",
				label: "Enero",
				amount: fee,
				...paid,
			});
		}
	};

	const settle = (payment: Payment): Payment => {
		if (payment.status === "paid") return payment;
		if (now() - Date.parse(payment.createdAt) < settleAfterMs) return payment;
		const paid: Payment = { ...payment, status: "paid", paidAt: new Date(now()).toISOString() };
		payments.set(paid.id, paid);
		recordPaid(paid);
		return paid;
	};

	return {
		async signIn({ usuario, clave }) {
			if (!usuario.trim() || !clave) throw new ApiError("unauthorized", "Missing login");
			const role = usuario.trim().toLowerCase() === "rosa" ? "student" : "instructor";
			if (role === "student") {
				const student = studentOf(currentStudentId);
				return wait({ name: student.name, role, studentId: student.id });
			}
			return wait({
				name: workshopOf(instructorWorkshopId).instructor,
				role,
				workshopId: instructorWorkshopId,
			});
		},
		signOut: () => undefined,
		async getWorkshop(workshopId) {
			return wait(workshopOf(workshopId));
		},
		async getRoster(workshopId) {
			const roster = subscriptions
				.filter((item) => item.workshopId === workshopId && item.status === "enrolled")
				.map((item) => {
					const student = studentOf(item.studentId);
					const charge = monthlyCharge(workshopId, student.id, currentPeriod.id);
					return { student, status: charge?.status ?? "pending" };
				});
			return wait(roster);
		},
		async getStudent(studentId) {
			return wait(studentOf(studentId));
		},
		async getChargeOptions(workshopId) {
			return wait([...chargeOptionsFor(workshopId)]);
		},
		async startPayment(input) {
			const number = `A-${String(folio++).padStart(4, "0")}`;
			const createdAt = new Date(now()).toISOString();
			const cash = input.method === "cash";
			const payment: Payment = {
				...input,
				id: `pay-${number}`,
				folio: number,
				createdAt,
				status: cash ? "paid" : "pending",
				...(cash ? { paidAt: createdAt } : {}),
				...(input.method === "qr" ? { qrString: `DEMO-NO-ES-CODI|${number}|${input.amount}` } : {}),
			};
			payments.set(payment.id, payment);
			if (cash) recordPaid(payment);
			return wait(payment);
		},
		async getPayment(paymentId) {
			const payment = payments.get(paymentId);
			if (!payment) throw new ApiError("not-found", `Payment ${paymentId} not found`);
			return wait(settle(payment));
		},
		async getCard(studentId) {
			const card: CardWorkshop[] = subscriptions
				.filter((item) => item.studentId === studentId && item.status === "enrolled")
				.map((item) => {
					const workshop = workshopOf(item.workshopId);
					const history = [
						...charges.filter(
							(charge) => charge.workshopId === workshop.id && charge.studentId === studentId
						),
					].sort((a, b) => b.period.localeCompare(a.period) || a.kind.localeCompare(b.kind));
					return {
						workshop,
						charges: history,
						current: history.find(
							(charge) => charge.kind === "monthly" && charge.period === currentPeriod.id
						),
					};
				});
			return wait(card);
		},
		async getReviewList(workshopId) {
			const list = subscriptions
				.filter(
					(item) =>
						item.workshopId === workshopId &&
						(item.status === "pending" || item.status === "waitlist")
				)
				.map((item) => ({
					student: studentOf(item.studentId),
					status: item.status as "pending" | "waitlist",
				}));
			return wait(list);
		},
		async approve(workshopId, studentId) {
			const subscription = subscriptionOf(workshopId, studentId);
			if (!subscription) throw new ApiError("not-found", "Subscription not found");
			subscription.status = "enrolled";
			return wait(undefined);
		},
		async release(workshopId, studentId) {
			const subscription = subscriptionOf(workshopId, studentId);
			if (!subscription) throw new ApiError("not-found", "Subscription not found");
			subscription.status = "released";
			return wait(undefined);
		},
		async addStudent(workshopId, input) {
			const phone = input.phone.replace(/\D/g, "");
			const taken = [...students.values()].find((student) => student.phone === phone);
			if (taken && subscriptionOf(workshopId, taken.id)?.status === "enrolled") {
				throw new ApiError("duplicate-phone", "That WhatsApp is already enrolled");
			}
			const student: StudentProfile = taken ?? {
				id: `s-${++ids}`,
				name: input.name.trim(),
				phone,
				...(input.helperPhone
					? {
							helpers: [
								{
									name: "Ayuda",
									relation: "Familiar",
									phone: input.helperPhone.replace(/\D/g, ""),
								},
							],
						}
					: {}),
				...(input.photoUri && input.photoConsent
					? {
							photo: {
								uri: input.photoUri,
								grantedBy: input.name.trim(),
								grantedAt: new Date(now()).toISOString(),
							},
						}
					: {}),
			};
			students.set(student.id, student);
			const existing = subscriptionOf(workshopId, student.id);
			if (existing) existing.status = "enrolled";
			else subscriptions.push({ workshopId, studentId: student.id, status: "enrolled" });
			return wait(student);
		},
		async getEnrollmentCode(workshopId) {
			workshopOf(workshopId);
			return wait(codes.get(workshopId) ?? "");
		},
		async rotateEnrollmentCode(workshopId) {
			const code = `${workshopOf(workshopId).name.split(" ").at(-1)?.toUpperCase() ?? "TALLER"}-${++ids}`;
			codes.set(workshopId, code);
			return wait(code);
		},
		async joinWorkshop(studentId, code) {
			const entry = [...codes.entries()].find(([, value]) => value === code.trim().toUpperCase());
			if (!entry) throw new ApiError("invalid-code", "Unknown code");
			const [workshopId] = entry;
			const existing = subscriptionOf(workshopId, studentId);
			if (existing && existing.status !== "released")
				throw new ApiError("already-joined", "Already joined");
			if (existing) existing.status = "pending";
			else subscriptions.push({ workshopId, studentId, status: "pending" });
			return wait(workshopOf(workshopId));
		},
		async removePhoto(studentId) {
			const { photo: _removed, ...rest } = studentOf(studentId);
			students.set(studentId, rest);
			return wait(rest);
		},
	};
}
