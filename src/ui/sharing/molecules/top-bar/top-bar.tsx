import { useEffect } from "react";
import { View } from "react-native";
import { usePreferences } from "~contexts/preferences";
import { messages } from "~messages";
import { useSpeech } from "~services/speech";
import { Icon } from "~sharing/atoms/icon";
import { Text } from "~sharing/atoms/text";
import { Touchable } from "~sharing/atoms/touchable";

import type { Props } from "./top-bar.proptypes";

import { useTopBarStyles } from "./top-bar.styles";

/** Same place on every screen: Atrás on the left, Escuchar on the right. */
export function TopBar({ onBack, script }: Props) {
	const styles = useTopBarStyles();
	const { preferences } = usePreferences();
	const { speaking, speak, toggle } = useSpeech();
	const copy = messages.actions;

	useEffect(() => {
		if (preferences.readAloud) speak(script);
	}, [preferences.readAloud, script, speak]);

	return (
		<View style={styles.bar}>
			{onBack ? (
				<Touchable role="button" aria-label={copy.back} onPress={onBack} style={styles.back}>
					<Icon name="chevron-left" size={28} />
					<Text bold>{copy.back}</Text>
				</Touchable>
			) : (
				<View style={styles.spacer} />
			)}
			<Touchable
				role="button"
				aria-label={speaking ? copy.stop : copy.listen}
				onPress={() => toggle(script)}
				style={styles.listen}
			>
				<Icon name={speaking ? "stop" : "volume-high"} />
				<Text bold>{speaking ? copy.stop : copy.listen}</Text>
			</Touchable>
		</View>
	);
}
