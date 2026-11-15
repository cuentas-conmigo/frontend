import { TextInput, View } from "react-native";
import { useTheme } from "~contexts/theme";
import { messages } from "~messages";
import { Icon } from "~sharing/atoms/icon";
import { Text } from "~sharing/atoms/text";

import type { Props } from "./amount-input.proptypes";

import { useAmountInputStyles } from "./amount-input.styles";

/** Large peso amount, digits only, as on the "Ingresa el monto" screen. */
export function AmountInput({ value, onChangeText, onBlur, error }: Props) {
	const styles = useAmountInputStyles();
	const { colors } = useTheme();
	const copy = messages.amount;

	return (
		<View style={[styles.card, error ? styles.invalid : undefined]}>
			<Text bold tone="mutedForeground" aria-hidden>
				{copy.label}
			</Text>
			<View style={styles.row}>
				<Text variant="display" aria-hidden>
					$
				</Text>
				<TextInput
					aria-label={error ? `${copy.label}, en pesos. ${error}` : `${copy.label}, en pesos`}
					value={value}
					onChangeText={(text) => onChangeText(text.replace(/\D/g, "").slice(0, 6))}
					onBlur={onBlur}
					keyboardType="number-pad"
					inputMode="numeric"
					placeholder="0"
					placeholderTextColor={colors.mutedForeground}
					style={styles.input}
				/>
			</View>
			<Text bold tone="mutedForeground" aria-hidden>
				{copy.currency}
			</Text>
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
