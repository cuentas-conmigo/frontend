import { Share, View } from "react-native";
import { useWorkshopId } from "~contexts/session";
import { messages } from "~messages";
import { useFeedback } from "~services/feedback";
import { useFlowNavigation } from "~services/navigation";
import { QrCode } from "~sharing/atoms/qr-code";
import { Text } from "~sharing/atoms/text";
import { StepScreen } from "~sharing/organisms/step-screen";
import { createStyles, radius, spacing, stroke, themes } from "~styles";

import { useEnrollment, useEnrollmentCode, useWorkshop } from "~queries";

const useStyles = createStyles(({ colors }) => ({
	card: {
		alignItems: "center",
		gap: spacing.md,
		padding: spacing.xl,
		borderRadius: radius.lg,
		borderWidth: stroke.thin,
		borderColor: colors.border,
		backgroundColor: themes.light.card,
	},
	code: { color: themes.light.foreground, letterSpacing: 2 },
}));

export default function EnrollmentCodeScreen() {
	const styles = useStyles();
	const feedback = useFeedback();
	const { back } = useFlowNavigation();
	const workshopId = useWorkshopId();
	const workshop = useWorkshop(workshopId);
	const code = useEnrollmentCode(workshopId);
	const { rotateCode } = useEnrollment(workshopId);
	const copy = messages.code;

	return (
		<StepScreen
			eyebrow={copy.eyebrow}
			title={copy.title}
			hint={copy.hint}
			onBack={back}
			loading={code.isPending}
			primaryAction={{
				label: copy.share,
				icon: "share-variant",
				onPress: () =>
					Share.share({ message: copy.shareText(workshop.data?.name ?? "", code.data ?? "") }),
			}}
			secondaryAction={{
				label: copy.rotate,
				icon: "refresh",
				busy: rotateCode.isPending,
				onPress: () =>
					rotateCode.mutate(undefined, {
						onSuccess: (next) => feedback.success(copy.rotated(next)),
					}),
			}}
		>
			{code.data ? (
				<View style={styles.card}>
					<QrCode value={code.data} label={copy.qrLabel(code.data)} />
					<Text variant="title" style={styles.code} aria-hidden>
						{code.data}
					</Text>
				</View>
			) : null}
			<Text tone="mutedForeground">{copy.rotateNote}</Text>
		</StepScreen>
	);
}
