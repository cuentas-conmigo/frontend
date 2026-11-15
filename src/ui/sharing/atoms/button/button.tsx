import { Icon } from "~sharing/atoms/icon";
import { Text } from "~sharing/atoms/text";
import { Touchable } from "~sharing/atoms/touchable";

import type { ColorToken } from "~styles";
import type { ButtonVariant, Props } from "./button.proptypes";

import { useButtonStyles } from "./button.styles";

const ink: Record<ButtonVariant | "disabled", ColorToken> = {
	default: "primaryForeground",
	success: "successForeground",
	outline: "cardForeground",
	destructive: "destructiveForeground",
	link: "mutedForeground",
	disabled: "mutedForeground",
};

export function Button({
	label,
	variant = "default",
	icon,
	disabled,
	busy = false,
	...rest
}: Props) {
	const styles = useButtonStyles();
	const isDisabled = Boolean(disabled) || busy;
	const tone = isDisabled && variant !== "link" ? "disabled" : variant;

	return (
		<Touchable
			role="button"
			aria-label={label}
			aria-disabled={isDisabled}
			aria-busy={busy}
			disabled={isDisabled}
			style={[styles.base, styles[tone]]}
			{...rest}
		>
			{icon ? <Icon name={icon} color={ink[tone]} /> : null}
			<Text
				bold={variant !== "link"}
				tone={ink[tone]}
				style={[styles.label, variant === "link" && styles.linkLabel]}
			>
				{label}
			</Text>
		</Touchable>
	);
}
