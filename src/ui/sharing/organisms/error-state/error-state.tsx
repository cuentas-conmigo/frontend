import { View } from "react-native";
import { Icon } from "~sharing/atoms/icon";
import { StepScreen } from "~sharing/organisms/step-screen";

import type { Props } from "./error-state.proptypes";

import { useErrorStateStyles } from "./error-state.styles";

/** Standard failure screen: says what happened, that nothing was lost, and how to go on. */
export function ErrorState({ title, hint, retry, leave }: Props) {
	const styles = useErrorStateStyles();

	return (
		<StepScreen
			title={title}
			hint={hint}
			primaryAction={{ icon: "refresh", ...retry }}
			secondaryAction={{ icon: "home", ...leave }}
		>
			<View role="alert" aria-label={`${title}. ${hint}`} style={styles.badge}>
				<Icon name="wifi-off" size={56} color="destructive" />
			</View>
		</StepScreen>
	);
}
