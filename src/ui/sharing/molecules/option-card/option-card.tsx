import { View } from "react-native";
import { Icon } from "~sharing/atoms/icon";
import { Text } from "~sharing/atoms/text";
import { Touchable } from "~sharing/atoms/touchable";

import type { Props } from "./option-card.proptypes";

import { useOptionCardStyles } from "./option-card.styles";

/** One of at most four choices on a screen; the whole card is the tap target. */
export function OptionCard({ icon, label, detail, onPress }: Props) {
	const styles = useOptionCardStyles();

	return (
		<Touchable
			role="button"
			aria-label={detail ? `${label}, ${detail}` : label}
			onPress={onPress}
			style={styles.card}
		>
			<View style={styles.tile}>
				<Icon name={icon} />
			</View>
			<View style={styles.texts}>
				<Text bold>{label}</Text>
				{detail ? <Text tone="mutedForeground">{detail}</Text> : null}
			</View>
			<Icon name="chevron-right" color="mutedForeground" />
		</Touchable>
	);
}
