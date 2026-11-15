import { View } from "react-native";
import { messages } from "~messages";
import { Text } from "~sharing/atoms/text";

import type { Props } from "./status-badge.proptypes";

import { useStatusBadgeStyles } from "./status-badge.styles";

const glyph = { paid: "✓", pending: "!" } as const;

/** Status told apart by glyph, words and border style, never by color alone. */
export function StatusBadge({ status }: Props) {
	const styles = useStatusBadgeStyles();
	const label = status === "paid" ? styles.paidLabel : styles.pendingLabel;

	return (
		<View testID={`status-${status}`} style={[styles.badge, styles[status]]}>
			<Text bold aria-hidden style={label}>
				{glyph[status]}
			</Text>
			<Text bold style={label}>
				{messages.status[status]}
			</Text>
		</View>
	);
}
