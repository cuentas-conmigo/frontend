import type { IconName } from "~sharing/atoms/icon";

/** `primary` is the dark "Cobro" card, `accent` the blue "Inscripción" card. */
export type ActionTileTone = "primary" | "accent";

export interface Props {
	icon: IconName;
	label: string;
	detail: string;
	tone?: ActionTileTone;
	onPress: () => void;
}
