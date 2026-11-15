import type { ChargeOption, Payment, StartPayment } from "~typing/charges";
import type { CardWorkshopValues } from "~typing/schemas/card";
import type {
	Credentials,
	NewStudent,
	ReviewEntry,
	RosterEntry,
	Session,
	StudentProfile,
	Workshop,
} from "~typing/students";

/** A workshop on a student's card with its charges, newest first. */
export type CardWorkshop = CardWorkshopValues;

/** Everything the app asks the backend; the Actix API will implement the same contract. */
export interface Api {
	/** Checks the login; later calls carry it until `signOut`. */
	signIn(credentials: Credentials): Promise<Session>;
	signOut(): void;
	getWorkshop(workshopId: string): Promise<Workshop>;
	getRoster(workshopId: string): Promise<RosterEntry[]>;
	getStudent(studentId: string): Promise<StudentProfile>;
	getChargeOptions(workshopId: string): Promise<ChargeOption[]>;
	startPayment(input: StartPayment): Promise<Payment>;
	getPayment(paymentId: string): Promise<Payment>;
	getCard(studentId: string): Promise<CardWorkshop[]>;
	getReviewList(workshopId: string): Promise<ReviewEntry[]>;
	approve(workshopId: string, studentId: string): Promise<void>;
	release(workshopId: string, studentId: string): Promise<void>;
	addStudent(workshopId: string, input: NewStudent): Promise<StudentProfile>;
	getEnrollmentCode(workshopId: string): Promise<string>;
	rotateEnrollmentCode(workshopId: string): Promise<string>;
	joinWorkshop(studentId: string, code: string): Promise<Workshop>;
	/** Deletes the photo and its consent record. */
	removePhoto(studentId: string): Promise<StudentProfile>;
}

/** A failure the screen can explain in plain words. */
export class ApiError extends Error {
	constructor(
		readonly code:
			| "unauthorized"
			| "not-found"
			| "duplicate-phone"
			| "invalid-code"
			| "already-joined",
		message: string
	) {
		super(message);
		this.name = "ApiError";
	}
}
