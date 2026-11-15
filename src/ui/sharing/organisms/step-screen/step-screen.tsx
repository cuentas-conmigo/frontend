import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { messages } from "~messages";
import { Notice } from "~sharing/molecules/notice";
import { ScreenActions } from "~sharing/organisms/screen-actions";
import { ScreenHeader } from "~sharing/organisms/screen-header";

import type { Props } from "./step-screen.proptypes";

import { useStepScreenStyles } from "./step-screen.styles";

/** Frame of every screen with short content; long lists use `ListScreen`. */
export function StepScreen({
	loading,
	children,
	primaryAction,
	secondaryAction,
	onCancel,
	cancelLabel,
	...header
}: Props) {
	const styles = useStepScreenStyles();

	return (
		<SafeAreaView edges={["top", "bottom", "left", "right"]} style={styles.screen}>
			<ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
				<ScreenHeader {...header} />
				{loading ? (
					<Notice icon="timer-sand" text={messages.loading} />
				) : children ? (
					<View style={styles.body}>{children}</View>
				) : null}
				{loading ? null : (
					<ScreenActions
						primaryAction={primaryAction}
						secondaryAction={secondaryAction}
						onCancel={onCancel}
						cancelLabel={cancelLabel}
					/>
				)}
			</ScrollView>
		</SafeAreaView>
	);
}
