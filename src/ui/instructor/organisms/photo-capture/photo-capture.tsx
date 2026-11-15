import { useState } from "react";
import { View } from "react-native";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { messages } from "~messages";
import { Button } from "~sharing/atoms/button";
import { Icon } from "~sharing/atoms/icon";
import { Text } from "~sharing/atoms/text";

import type { Props } from "./photo-capture.proptypes";

import { usePhotoCaptureStyles } from "./photo-capture.styles";

const options: ImagePicker.ImagePickerOptions = {
	mediaTypes: ["images"],
	quality: 0.6,
	allowsEditing: true,
	aspect: [46, 54],
};

/** Opens the camera, or the gallery where there is no camera (simulator, desktop web). */
async function pickPhoto(): Promise<string | undefined> {
	const fromLibrary = () => ImagePicker.launchImageLibraryAsync(options);
	const cameraAllowed = await ImagePicker.requestCameraPermissionsAsync().then(
		(permission) => permission.granted,
		() => false
	);
	const result = cameraAllowed
		? await ImagePicker.launchCameraAsync(options).catch(fromLibrary)
		: await fromLibrary();
	return result.canceled ? undefined : result.assets[0]?.uri;
}

/** Optional photo of a new student, shown so the instructor can check it before saving. */
export function PhotoCapture({ uri, onChange }: Props) {
	const styles = usePhotoCaptureStyles();
	const copy = messages.newStudent;
	const [failed, setFailed] = useState(false);

	const take = async () => {
		setFailed(false);
		try {
			const next = await pickPhoto();
			if (next) onChange(next);
		} catch {
			setFailed(true);
		}
	};

	return (
		<View style={styles.box}>
			<Text bold>{copy.photo}</Text>
			{uri ? (
				<View style={styles.preview}>
					<Image
						testID="photo-preview"
						source={{ uri }}
						style={styles.photo}
						contentFit="cover"
						aria-hidden
					/>
					<Text>{copy.photoTaken}</Text>
				</View>
			) : null}
			<Button
				variant="outline"
				icon="camera"
				label={uri ? copy.retakePhoto : copy.takePhoto}
				onPress={take}
			/>
			{uri ? (
				<Button variant="link" label={copy.removePhoto} onPress={() => onChange(undefined)} />
			) : null}
			{failed ? (
				<View accessible role="alert" style={styles.error}>
					<Icon name="alert-circle" color="destructive" />
					<Text bold tone="destructive">
						{copy.photoFailed}
					</Text>
				</View>
			) : null}
		</View>
	);
}
