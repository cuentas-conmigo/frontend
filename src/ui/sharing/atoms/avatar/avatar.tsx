import { View } from "react-native";
import { Image } from "expo-image";
import { Text } from "~sharing/atoms/text";
import { initialOf } from "~utils/initial-of";

import type { Props } from "./avatar.proptypes";

import { useAvatarStyles } from "./avatar.styles";

/** Portrait photo tile; decorative because the name is always next to it. */
export function Avatar({ name, photo, size = "md" }: Props) {
	const styles = useAvatarStyles();

	return (
		<View testID="avatar" aria-hidden style={[styles.frame, styles[size]]}>
			{photo ? (
				<Image
					testID="avatar-photo"
					source={{ uri: photo.uri }}
					style={styles.photo}
					contentFit="cover"
				/>
			) : (
				<Text variant={size === "lg" ? "display" : "lead"} bold role="none">
					{initialOf(name)}
				</Text>
			)}
		</View>
	);
}
