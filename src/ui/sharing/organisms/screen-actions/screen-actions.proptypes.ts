import type { ButtonVariant } from "~sharing/atoms/button";
import type { IconName } from "~sharing/atoms/icon";

/** An action button of the screen. */
export interface ScreenAction {
	label: string;
	onPress: () => void;
	icon?: IconName;
	variant?: ButtonVariant;
	disabled?: boolean;
	busy?: boolean;
}

export interface Props {
	/** The one main action; `default` variant unless given. */
	primaryAction?: ScreenAction;
	/** A support action, drawn as `outline` unless given. */
	secondaryAction?: ScreenAction;
	/** Shows "Cancelar" as an underlined link under the buttons. */
	onCancel?: () => void;
	/** Text of that link when leaving is not cancelling, e.g. "Volver al inicio". */
	cancelLabel?: string;
}
