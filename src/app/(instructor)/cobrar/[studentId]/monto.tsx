import { useLocalSearchParams, useRouter } from "expo-router";
import { messages } from "~messages";
import { useFlowNavigation } from "~services/navigation";
import { useAppForm } from "~sharing/organisms/form";
import { StepScreen } from "~sharing/organisms/step-screen";

import { PaymentSchema } from "~schemas/payments";
import { customOptionId } from "~typing/charges";

export default function AmountScreen() {
	const router = useRouter();
	const { back, cancel } = useFlowNavigation();
	const { studentId } = useLocalSearchParams<{ studentId: string }>();
	const copy = messages.amount;

	const form = useAppForm({
		defaultValues: { amount: "" },
		validators: { onBlur: PaymentSchema.Amount, onSubmit: PaymentSchema.Amount },
		onSubmit: ({ value }) =>
			router.push({
				pathname: "/cobrar/[studentId]/pago",
				params: { studentId, cobro: customOptionId, monto: value.amount },
			}),
	});

	return (
		<StepScreen step={2} title={copy.title} hint={copy.hint} onBack={back} onCancel={cancel}>
			<form.AppField name="amount">{(field) => <field.AmountField />}</form.AppField>
			<form.AppForm>
				<form.Submit label={messages.actions.next} />
			</form.AppForm>
		</StepScreen>
	);
}
