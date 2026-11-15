import { useMemo } from "react";
import { AccessibilityInfo } from "react-native";
import * as Haptics from "expo-haptics";
import { usePreferences } from "~contexts/preferences";

/** Tells the person how an action went: always to the screen reader, and by vibration when allowed. */
export function useFeedback() {
	const { preferences } = usePreferences();

	return useMemo(() => {
		const notify = (message: string, type: Haptics.NotificationFeedbackType) => {
			AccessibilityInfo.announceForAccessibility(message);
			if (preferences.feedback) Haptics.notificationAsync(type).catch(() => undefined);
		};
		return {
			success: (message: string) => notify(message, Haptics.NotificationFeedbackType.Success),
			error: (message: string) => notify(message, Haptics.NotificationFeedbackType.Error),
		};
	}, [preferences.feedback]);
}
