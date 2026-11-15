import { View } from "react-native";
import { Icon } from "~sharing/atoms/icon";
import { Text } from "~sharing/atoms/text";
import { Touchable } from "~sharing/atoms/touchable";

import type { ColorToken } from "~styles";
import type { ActionTileTone, Props } from "./action-tile.proptypes";

import { useActionTileStyles } from "./action-tile.styles";

const ink: Record<ActionTileTone, ColorToken> = {
	primary: "primaryForeground",
	accent: "accentForeground",
};

/** Large filled card for the main areas of the app, as on the "Acciones" screen. */
export function ActionTile({ icon, label, detail, tone = "primary", onPress }: Props) {
	const styles = useActionTileStyles();

	return (
		<Touchable
			role="button"
			aria-label={`${label}, ${detail}`}
			onPress={onPress}
			style={[styles.tile, styles[tone]]}
		>
			<View style={styles.top}>
				<Icon name={icon} size={32} color={ink[tone]} />
				<Icon name="arrow-top-right" color={ink[tone]} />
			</View>
			<View style={styles.texts}>
				<Text variant="lead" bold tone={ink[tone]}>
					{label}
				</Text>
				<Text tone={ink[tone]}>{detail}</Text>
			</View>
		</Touchable>
	);
}
