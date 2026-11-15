/** Query keys in one place, so writes know exactly what to refresh. */
export const keys = {
	workshop: (workshopId: string) => ["workshop", workshopId] as const,
	roster: (workshopId: string) => ["roster", workshopId] as const,
	student: (studentId: string) => ["student", studentId] as const,
	chargeOptions: (workshopId: string) => ["charge-options", workshopId] as const,
	payment: (paymentId: string) => ["payment", paymentId] as const,
	card: (studentId: string) => ["card", studentId] as const,
	review: (workshopId: string) => ["review", workshopId] as const,
	code: (workshopId: string) => ["enrollment-code", workshopId] as const,
};
