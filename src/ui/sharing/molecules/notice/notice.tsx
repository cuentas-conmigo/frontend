import { View } from "react-native";
import { Icon } from "~sharing/atoms/icon";
import { Text } from "~sharing/atoms/text";

import type { ColorToken } from "~styles";
import type { NoticeTone, Props } from "./notice.proptypes";

import { useNoticeStyles } from "./notice.styles";

const ink: Record<NoticeTone, ColorToken> = {
	warning: "warningForeground",
	success: "successForeground",
	info: "foreground",
};

/** A live status line, announced when it changes. */
export function Notice({ icon, text, tone = "info" }: Props) {
	const styles = useNoticeStyles();

	return (
		<View role="status" aria-live="polite" style={[styles.box, styles[tone]]}>
			<Icon name={icon} color={ink[tone]} />
			<Text variant="lead" bold tone={ink[tone]} style={styles.text}>
				{text}
			</Text>
		</View>
	);
}
