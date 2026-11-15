import type { SessionValues, SigninValues } from "./schemas/session";
import type {
	HelperValues,
	NewStudentValues,
	PhotoValues,
	ProfileValues,
} from "./schemas/students";
import type { ReviewEntryValues, RosterEntryValues, WorkshopValues } from "./schemas/workshops";

/** Whether a charge has been paid. */
export type PaymentStatus = "paid" | "pending";

/** A photo can only exist together with the record of who allowed it and when. */
export type ConsentedPhoto = PhotoValues;

/** Someone who pays on the student's behalf, usually a relative. */
export type Helper = HelperValues;

/** One person across every workshop they attend: their single "card". */
export type StudentProfile = ProfileValues;

/** A workshop someone runs and charges for. */
export type Workshop = WorkshopValues;

export type SubscriptionStatus = "pending" | "enrolled" | "waitlist" | "released";

/** A student's place in one workshop. */
export interface Subscription {
	workshopId: string;
	studentId: string;
	status: SubscriptionStatus;
}

/** A student in a workshop's list, with the status of the current period's charge. */
export type RosterEntry = RosterEntryValues;

/** Who is using the app. */
export type Role = SessionValues["role"];

/** A tallerista login, as Amanda's backend checks it (argon2). */
export type Credentials = SigninValues;

/** The signed-in person. */
export type Session = SessionValues;

/** Someone waiting for the instructor to approve their place. */
export type ReviewEntry = ReviewEntryValues;

/** Data the instructor sends to add a student by hand; `helperPhone` is optional on the wire. */
export type NewStudent = Omit<NewStudentValues, "helperPhone"> & { helperPhone?: string };
