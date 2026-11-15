import { View } from "react-native";
import { messages } from "~messages";
import { Text } from "~sharing/atoms/text";
import { StatusBadge } from "~sharing/molecules/status-badge";

import type { Props } from "./charge-row.proptypes";

import { useChargeRowStyles } from "./charge-row.styles";

/** One line of a payment history, read by screen readers as a single sentence. */
export function ChargeRow({ label, amount, status, note }: Props) {
	const styles = useChargeRowStyles();
	const spoken = [label, amount, messages.status[status], note].filter(Boolean).join(", ");

	return (
		<View accessible aria-label={spoken} style={styles.row}>
			<View style={styles.head}>
				<Text variant="lead" bold>
					{label} · {amount}
				</Text>
			</View>
			<StatusBadge status={status} />
			{note ? <Text tone="mutedForeground">{note}</Text> : null}
		</View>
	);
}
