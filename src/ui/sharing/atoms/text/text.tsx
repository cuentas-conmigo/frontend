import { Text as NativeText } from "react-native";
import { usePreferences } from "~contexts/preferences";
import { useTheme } from "~contexts/theme";
import { largeTextScale, typography } from "~styles";

import type { Props } from "./text.proptypes";

import { useTextStyles } from "./text.styles";

export function Text({
	variant = "body",
	tone = "foreground",
	bold = false,
	style,
	...rest
}: Props) {
	const styles = useTextStyles();
	const { colors } = useTheme();
	const { preferences } = usePreferences();
	const isHeading = variant === "title" || variant === "display";
	const step = typography[variant];
	const larger = preferences.largeText
		? { fontSize: step.fontSize * largeTextScale, lineHeight: step.lineHeight * largeTextScale }
		: undefined;

	return (
		<NativeText
			role={isHeading ? "heading" : undefined}
			accessibilityLanguage="es-MX"
			style={[styles[variant], bold && styles.bold, larger, { color: colors[tone] }, style]}
			{...rest}
		/>
	);
}
