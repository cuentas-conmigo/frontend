import type { IconName } from "~sharing/atoms/icon";
import type { TouchableProps } from "~sharing/atoms/touchable";

/**
 * `default` for the one main action, `success` to confirm money or a new student, `outline` for
 * support actions, `destructive` for removals and `link` for Cancelar.
 */
export type ButtonVariant = "default" | "success" | "outline" | "destructive" | "link";

export interface Props extends Omit<TouchableProps, "children" | "style" | "pressedStyle"> {
	/** Visible text, also used as the accessible name. */
	label: string;
	variant?: ButtonVariant;
	icon?: IconName;
	/** Shows a spinner-free busy state: disabled and announced as busy. */
	busy?: boolean;
}
