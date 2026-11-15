import type { PaymentStatus, StudentProfile } from "~typing/students";

export interface Props {
	student: StudentProfile;
	/** Payment status to show as a badge; omit it where it should stay private. */
	status?: PaymentStatus;
	/** One line under the name, e.g. "Pidió lugar". */
	detail?: string;
	/** Makes the whole row a button. */
	onPress?: (student: StudentProfile) => void;
	/** A separate button at the end of the row, e.g. "Baja"; the row itself is then not tappable. */
	action?: { label: string; accessibleLabel: string; onPress: (student: StudentProfile) => void };
}
