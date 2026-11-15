import { View } from "react-native";
import { messages } from "~messages";
import { Text } from "~sharing/atoms/text";
import { StepProgress } from "~sharing/molecules/step-progress";
import { TopBar } from "~sharing/molecules/top-bar";
import { createStyles, spacing } from "~styles";
import { joinSentences } from "~utils/join-sentences";

import type { Props } from "./screen-header.proptypes";

const useStyles = createStyles(() => ({
	header: { gap: spacing.lg },
	texts: { gap: spacing.sm },
}));

/** Top of every screen: Atrás and Escuchar, the step, where you are, and the one question asked. */
export function ScreenHeader({ step, total = 3, eyebrow, title, hint, script, onBack }: Props) {
	const styles = useStyles();
	const progress = step ? messages.step(step, total) : undefined;
	const kicker = progress ?? eyebrow;

	return (
		<View style={styles.header}>
			<TopBar onBack={onBack} script={script ?? joinSentences([kicker, title, hint])} />
			{step ? <StepProgress step={step} total={total} /> : null}
			<View style={styles.texts}>
				{kicker ? (
					<Text bold tone="mutedForeground">
						{kicker}
					</Text>
				) : null}
				<Text variant="title">{title}</Text>
				{hint ? <Text tone="mutedForeground">{hint}</Text> : null}
			</View>
		</View>
	);
}
