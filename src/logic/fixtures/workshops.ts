import type { Subscription, Workshop } from "~typing/students";

/** Invented workshops; Rosa and Élida attend both, which is what their single card shows. */
export const sampleWorkshops: readonly Workshop[] = [
	{
		id: "w-tejido",
		name: "Taller de tejido",
		instructor: "María González",
		schedule: "Martes y jueves, 10:00",
		monthlyFee: 130,
		capacity: 12,
	},
	{
		id: "w-yoga",
		name: "Yoga en silla",
		instructor: "Laura Pérez",
		schedule: "Lunes, 9:00",
		monthlyFee: 150,
		capacity: 10,
	},
];

export const sampleSubscriptions: readonly Subscription[] = [
	{ workshopId: "w-tejido", studentId: "s-1", status: "enrolled" },
	{ workshopId: "w-tejido", studentId: "s-2", status: "enrolled" },
	{ workshopId: "w-tejido", studentId: "s-3", status: "enrolled" },
	{ workshopId: "w-tejido", studentId: "s-4", status: "enrolled" },
	{ workshopId: "w-yoga", studentId: "s-1", status: "enrolled" },
	{ workshopId: "w-yoga", studentId: "s-3", status: "enrolled" },
	{ workshopId: "w-tejido", studentId: "s-5", status: "pending" },
	{ workshopId: "w-tejido", studentId: "s-6", status: "waitlist" },
];

/** Codes students scan to ask for a place; one per workshop. */
export const sampleEnrollmentCodes: Readonly<Record<string, string>> = {
	"w-tejido": "TEJIDO-2026",
	"w-yoga": "YOGA-2026",
};

/** Workshop the instructor side of the prototype runs. */
export const instructorWorkshopId = "w-tejido";

/** Student the student side of the prototype shows, until sign-in exists. */
export const currentStudentId = "s-1";

/** Period being charged, in `yyyy-mm`, and how it is read aloud. */
export const currentPeriod = { id: "2026-12", month: "diciembre" } as const;

/** Finds a sample workshop by id. */
export function findWorkshop(id: string): Workshop | undefined {
	return sampleWorkshops.find((workshop) => workshop.id === id);
}
