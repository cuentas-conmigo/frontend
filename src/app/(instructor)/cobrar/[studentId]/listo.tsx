import { View } from "react-native";
import * as Linking from "expo-linking";
import { useLocalSearchParams, useRouter } from "expo-router";
import { messages } from "~messages";
import { useFlowNavigation } from "~services/navigation";
import { Icon } from "~sharing/atoms/icon";
import { InfoCard } from "~sharing/molecules/info-card";
import { StepScreen } from "~sharing/organisms/step-screen";
import { createStyles } from "~styles";
import { firstName } from "~utils/first-name";
import { formatDate } from "~utils/format-date";
import { formatMoney } from "~utils/format-money";

import { usePayment, useStudent } from "~queries";

const useStyles = createStyles(({ colors }) => ({
	check: {
		alignSelf: "center",
		width: 96,
		height: 96,
		borderRadius: 48,
		backgroundColor: colors.success,
		alignItems: "center",
		justifyContent: "center",
	},
}));

export default function DoneScreen() {
	const styles = useStyles();
	const router = useRouter();
	const { cancel } = useFlowNavigation();
	const { studentId, paymentId } = useLocalSearchParams<{ studentId: string; paymentId: string }>();
	const payment = usePayment(paymentId);
	const student = useStudent(studentId);
	const copy = messages.done;

	if (!payment.data || !student.data) return <StepScreen title={copy.title} loading />;

	const name = firstName(student.data.name);
	const amount = formatMoney(payment.data.amount);
	const date = formatDate(payment.data.paidAt ?? payment.data.createdAt);
	const share = copy.shareText(
		student.data.name,
		payment.data.concept,
		amount,
		payment.data.folio,
		date
	);

	return (
		<StepScreen
			title={copy.title}
			hint={payment.data.method === "cash" ? copy.hintCash(name) : copy.hintBank(name)}
			primaryAction={{
				label: copy.share,
				icon: "whatsapp",
				onPress: () => Linking.openURL(`https://wa.me/?text=${encodeURIComponent(share)}`),
			}}
			onCancel={cancel}
			cancelLabel={copy.home}
			secondaryAction={{
				label: copy.another,
				icon: "account-multiple",
				onPress: () => router.dismissTo("/cobrar"),
			}}
		>
			<View style={styles.check} aria-hidden>
				<Icon name="check" size={56} color="successForeground" />
			</View>
			<InfoCard
				title={copy.receipt}
				lines={[
					{ label: copy.folio, value: payment.data.folio },
					{ label: copy.amount, value: `${amount} MXN` },
					{ label: copy.concept, value: payment.data.concept },
					{ label: copy.date, value: date },
				]}
			/>
		</StepScreen>
	);
}
