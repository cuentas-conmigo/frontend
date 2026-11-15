import { useState } from "react";
import { TextInput, View } from "react-native";
import { useTheme } from "~contexts/theme";
import { Icon } from "~sharing/atoms/icon";
import { Text } from "~sharing/atoms/text";

import type { Props } from "./text-field.proptypes";

import { useTextFieldStyles } from "./text-field.styles";

/** Labelled input; an error shows under it with an icon and is part of the field's spoken name. */
export function TextField({ label, error, onFocus, onBlur, ...rest }: Props) {
	const styles = useTextFieldStyles();
	const { colors } = useTheme();
	const [focused, setFocused] = useState(false);

	return (
		<View style={styles.field}>
			<Text bold aria-hidden>
				{label}
			</Text>
			<TextInput
				aria-label={error ? `${label}. ${error}` : label}
				accessibilityLanguage="es-MX"
				placeholderTextColor={colors.mutedForeground}
				onFocus={(event) => {
					setFocused(true);
					onFocus?.(event);
				}}
				onBlur={(event) => {
					setFocused(false);
					onBlur?.(event);
				}}
				style={[styles.input, focused && styles.focused, error ? styles.invalid : undefined]}
				{...rest}
			/>
			{error ? (
				<View style={styles.error} aria-hidden>
					<Icon name="alert-circle" color="destructive" />
					<Text bold tone="destructive">
						{error}
					</Text>
				</View>
			) : null}
		</View>
	);
}
