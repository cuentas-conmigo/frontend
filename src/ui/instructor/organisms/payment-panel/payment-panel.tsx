import { View } from "react-native";
import { messages } from "~messages";
import { Icon } from "~sharing/atoms/icon";
import { QrCode } from "~sharing/atoms/qr-code";
import { Text } from "~sharing/atoms/text";
import { Notice } from "~sharing/molecules/notice";
import { createStyles, radius, spacing, stroke, themes } from "~styles";

import type { Props } from "./payment-panel.proptypes";

/** Prefix of QR payloads made by the mock or the backend in simulate mode; they are not CoDi. */
const demoQrPrefix = "DEMO-";

/** The NFC cube is not built yet, so its hint stays off unless the build turns it on. */
const nfcCube = process.env.EXPO_PUBLIC_NFC_CUBE === "on";

const useStyles = createStyles(({ colors }) => ({
	panel: { gap: spacing.lg },
	qrCard: {
		alignItems: "center",
		gap: spacing.md,
		padding: spacing.xl,
		borderRadius: radius.lg,
		borderWidth: stroke.thin,
		borderColor: colors.border,
		backgroundColor: themes.light.card,
	},
	qrNote: { color: themes.light.mutedForeground },
	cube: { flexDirection: "row", alignItems: "center", gap: spacing.md },
	cubeText: { flex: 1 },
}));

/** What the instructor shows while CoDi confirms: the QR for the payer's bank app, or just the wait. */
export function PaymentPanel({ payment, cubeHint = nfcCube }: Props) {
	const styles = useStyles();
	const copy = messages.pay;
	const qrLabel = payment.qrString?.startsWith(demoQrPrefix) ? copy.qrSample : copy.qrLive;

	return (
		<View style={styles.panel}>
			{payment.method === "qr" && payment.qrString ? (
				<>
					<View style={styles.qrCard}>
						<QrCode value={payment.qrString} label={qrLabel} />
						<Text style={styles.qrNote}>{qrLabel}</Text>
					</View>
					{cubeHint ? (
						<View style={styles.cube}>
							<Icon name="nfc" />
							<Text style={styles.cubeText}>{copy.cube}</Text>
						</View>
					) : null}
				</>
			) : null}
			<Notice icon="timer-sand" tone="warning" text={copy.waiting} />
			<Text tone="mutedForeground">{copy.noRush}</Text>
		</View>
	);
}
