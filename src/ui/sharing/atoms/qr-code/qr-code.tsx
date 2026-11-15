import { View } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { themes } from "~styles";

import type { Props } from "./qr-code.proptypes";

/** Always dark on white, whatever the theme, so every banking app can read it. */
export function QrCode({ value, label, size = 200 }: Props) {
	return (
		<View testID="qr-code" accessible role="img" aria-label={label}>
			<QRCode
				value={value}
				size={size}
				color={themes.light.foreground}
				backgroundColor={themes.light.card}
			/>
		</View>
	);
}
