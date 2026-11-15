import { View } from "react-native";
import { Text } from "~sharing/atoms/text";

import type { Props } from "./info-card.proptypes";

import { useInfoCardStyles } from "./info-card.styles";

/** Label and value pairs, stacked so long values never squeeze; each pair is read as one phrase. */
export function InfoCard({ title, lines }: Props) {
	const styles = useInfoCardStyles();

	return (
		<View style={styles.card}>
			{title ? (
				<Text variant="lead" bold role="heading">
					{title}
				</Text>
			) : null}
			{lines.map((line) => (
				<View
					key={line.label}
					accessible
					aria-label={`${line.label}: ${line.value}`}
					style={styles.line}
				>
					<Text tone="mutedForeground">{line.label}</Text>
					<Text bold>{line.value}</Text>
				</View>
			))}
		</View>
	);
}
