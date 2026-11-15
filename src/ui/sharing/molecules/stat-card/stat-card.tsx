import { View } from "react-native";
import { Text } from "~sharing/atoms/text";

import type { Props } from "./stat-card.proptypes";

import { useStatCardStyles } from "./stat-card.styles";

/** A headline number with what it counts, read as one sentence. */
export function StatCard({ label, value, detail }: Props) {
	const styles = useStatCardStyles();

	return (
		<View
			accessible
			aria-label={[label, value, detail].filter(Boolean).join(". ")}
			style={styles.card}
		>
			<Text tone="mutedForeground">{label}</Text>
			<Text variant="display">{value}</Text>
			{detail ? <Text>{detail}</Text> : null}
		</View>
	);
}
