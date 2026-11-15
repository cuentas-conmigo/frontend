import { View } from "react-native";
import { messages } from "~messages";
import { Icon } from "~sharing/atoms/icon";
import { Text } from "~sharing/atoms/text";
import { Touchable } from "~sharing/atoms/touchable";
import { StatusBadge } from "~sharing/molecules/status-badge";

import type { Props } from "./workshop-card.proptypes";

import { useWorkshopCardStyles } from "./workshop-card.styles";

/** One workshop on the student's card: who teaches it and how this month's charge stands. */
export function WorkshopCard({ name, detail, dueLabel, status, onPress }: Props) {
	const styles = useWorkshopCardStyles();
	const spoken = [name, detail, dueLabel, status ? messages.status[status] : undefined]
		.filter(Boolean)
		.join(", ");

	return (
		<Touchable role="button" aria-label={spoken} onPress={onPress} style={styles.card}>
			<View style={styles.head}>
				<Text variant="lead" bold style={styles.name}>
					{name}
				</Text>
				<Icon name="chevron-right" color="mutedForeground" />
			</View>
			<Text tone="mutedForeground">{detail}</Text>
			{dueLabel && status ? (
				<View style={styles.due}>
					<Text bold>{dueLabel}</Text>
					<StatusBadge status={status} />
				</View>
			) : null}
		</Touchable>
	);
}
