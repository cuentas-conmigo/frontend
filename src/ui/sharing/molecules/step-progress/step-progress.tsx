import { View } from "react-native";
import { messages } from "~messages";

import type { Props } from "./step-progress.proptypes";

import { useStepProgressStyles } from "./step-progress.styles";

/** Segments that fill as the flow advances; announced as "Paso n de m". */
export function StepProgress({ step, total }: Props) {
	const styles = useStepProgressStyles();

	return (
		<View
			testID="step-progress"
			accessible
			role="progressbar"
			aria-label={messages.step(step, total)}
			aria-valuemin={1}
			aria-valuemax={total}
			aria-valuenow={step}
			style={styles.bar}
		>
			{Array.from({ length: total }, (_, index) => index).map((index) => (
				<View key={`segment-${index}`} style={[styles.segment, index < step && styles.done]} />
			))}
		</View>
	);
}
