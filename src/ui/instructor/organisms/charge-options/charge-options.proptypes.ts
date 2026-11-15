import type { ChargeOption } from "~typing/charges";

export interface Props {
	options: readonly ChargeOption[];
	onSelect: (option: ChargeOption) => void;
	/** Adds "Otro monto" as the last choice, for an amount typed by hand. */
	onCustom?: () => void;
}
