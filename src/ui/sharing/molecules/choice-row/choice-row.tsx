import { View } from "react-native";
import { messages } from "~messages";
import { Icon } from "~sharing/atoms/icon";
import { Text } from "~sharing/atoms/text";
import { Touchable } from "~sharing/atoms/touchable";

import type { Props } from "./choice-row.proptypes";

import { useChoiceRowStyles } from "./choice-row.styles";

/** A yes/no choice whose state is written out ("Activado") as well as drawn. */
export function ChoiceRow({ label, detail, checked, onChange, kind = "switch" }: Props) {
	const styles = useChoiceRowStyles();
	const copy = messages.accessible;

	return (
		<Touchable
			role={kind}
			aria-label={detail ? `${label}, ${detail}` : label}
			aria-checked={checked}
			onPress={() => onChange(!checked)}
			style={styles.row}
		>
			{kind === "checkbox" ? (
				<View style={[styles.box, checked && styles.boxOn]}>
					{checked ? <Icon name="check-bold" size={22} color="primaryForeground" /> : null}
				</View>
			) : null}
			<View style={styles.texts}>
				<Text bold>{label}</Text>
				{detail ? <Text tone="mutedForeground">{detail}</Text> : null}
				{kind === "switch" ? (
					<View style={[styles.state, checked && styles.stateOn]}>
						<Icon
							name={checked ? "check" : "close"}
							size={20}
							color={checked ? "primaryForeground" : "foreground"}
						/>
						<Text bold tone={checked ? "primaryForeground" : "foreground"}>
							{checked ? copy.on : copy.off}
						</Text>
					</View>
				) : null}
			</View>
		</Touchable>
	);
}
