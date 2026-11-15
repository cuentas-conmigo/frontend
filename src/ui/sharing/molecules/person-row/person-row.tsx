import { View } from "react-native";
import { messages } from "~messages";
import { Avatar } from "~sharing/atoms/avatar";
import { Icon } from "~sharing/atoms/icon";
import { Text } from "~sharing/atoms/text";
import { Touchable } from "~sharing/atoms/touchable";
import { StatusBadge } from "~sharing/molecules/status-badge";

import type { Props } from "./person-row.proptypes";

import { usePersonRowStyles } from "./person-row.styles";

/** A student in a list: photo tile, name, and either a status, a detail line or an action. */
export function PersonRow({ student, status, detail, onPress, action }: Props) {
	const styles = usePersonRowStyles();
	const spoken = [student.name, status ? messages.status[status] : undefined, detail]
		.filter(Boolean)
		.join(", ");
	const content = (
		<>
			<Avatar name={student.name} photo={student.photo} />
			<View style={styles.details}>
				<Text bold>{student.name}</Text>
				{status ? <StatusBadge status={status} /> : null}
				{detail ? <Text tone="mutedForeground">{detail}</Text> : null}
			</View>
		</>
	);

	if (action) {
		return (
			<View style={styles.row}>
				<View accessible aria-label={spoken} style={styles.summary}>
					{content}
				</View>
				<Touchable
					role="button"
					aria-label={action.accessibleLabel}
					onPress={() => action.onPress(student)}
					style={styles.action}
				>
					<Text bold tone="destructive">
						{action.label}
					</Text>
				</Touchable>
			</View>
		);
	}

	if (!onPress) {
		return (
			<View accessible aria-label={spoken} style={styles.row}>
				{content}
			</View>
		);
	}

	return (
		<Touchable
			role="button"
			aria-label={spoken}
			onPress={() => onPress(student)}
			style={styles.row}
		>
			{content}
			<Icon name="chevron-right" color="mutedForeground" />
		</Touchable>
	);
}
