import type { PaymentStatus } from "~typing/students";

export interface Props {
	name: string;
	/** Who teaches it and when. */
	detail: string;
	/** Current charge, e.g. "Diciembre · $130". */
	dueLabel?: string;
	status?: PaymentStatus;
	onPress?: () => void;
}
