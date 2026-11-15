import type { ButtonVariant } from "~sharing/atoms/button";
import type { IconName } from "~sharing/atoms/icon";

export interface Props {
	label: string;
	icon?: IconName;
	variant?: ButtonVariant;
}
