import type { PaymentStatus } from "~typing/students";

export interface Props {
	label: string;
	/** Formatted amount, e.g. "$130". */
	amount: string;
	status: PaymentStatus;
	/** One line under it, e.g. the date and folio of the payment. */
	note?: string;
}
