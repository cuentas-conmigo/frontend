import { useEffect, useRef, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useWorkshopId } from "~contexts/session";
import { PaymentPanel } from "~instructor/organisms/payment-panel";
import { messages } from "~messages";
import { useFeedback } from "~services/feedback";
import { useFlowNavigation } from "~services/navigation";
import { Notice } from "~sharing/molecules/notice";
import { ErrorState } from "~sharing/organisms/error-state";
import { StepScreen } from "~sharing/organisms/step-screen";
import { firstName } from "~utils/first-name";
import { formatMoney } from "~utils/format-money";
import { maskPhone } from "~utils/mask-phone";

import type { PaymentMethod } from "~typing/charges";

import { useChargeChoice, usePayment, useStartPayment, useStudent } from "~queries";

/** Step 3: the QR opens at once; cash and the helper's notice are second choices on the same screen. */
export default function PayScreen() {
	const router = useRouter();
	const feedback = useFeedback();
	const { back, cancel } = useFlowNavigation();
	const workshopId = useWorkshopId();
	const { studentId, cobro, monto } = useLocalSearchParams<{
		studentId: string;
		cobro: string;
		monto?: string;
	}>();
	const student = useStudent(studentId);
	const { option, isPending } = useChargeChoice(workshopId, cobro, monto);
	const [mode, setMode] = useState<PaymentMethod>("qr");
	const qr = useStartPayment();
	const helperCharge = useStartPayment();
	const cash = useStartPayment();
	const qrPayment = usePayment(qr.data?.id);
	const helperPayment = usePayment(helperCharge.data?.id);
	const started = useRef(false);

	const startWith = (method: PaymentMethod) => {
		if (!option) return;
		const charge = { qr, helper: helperCharge, cash }[method];
		charge.reset();
		charge.mutate({
			workshopId,
			studentId,
			optionId: option.id,
			method,
			amount: option.amount,
			concept: option.label,
		});
	};

	useEffect(() => {
		if (!option || started.current) return;
		started.current = true;
		qr.mutate({
			workshopId,
			studentId,
			optionId: option.id,
			method: "qr",
			amount: option.amount,
			concept: option.label,
		});
	}, [option, qr.mutate, studentId, workshopId]);

	const paid = [qrPayment.data, helperPayment.data, cash.data].find(
		(payment) => payment?.status === "paid"
	);

	useEffect(() => {
		if (!paid) return;
		feedback.success(messages.done.title);
		router.replace({
			pathname: "/cobrar/[studentId]/listo",
			params: { studentId, paymentId: paid.id },
		});
	}, [paid, feedback, router, studentId]);

	const failed =
		mode === "cash"
			? cash.isError
			: mode === "helper"
				? helperCharge.isError || helperPayment.isError
				: qr.isError || qrPayment.isError;

	if (failed) {
		return (
			<ErrorState
				title={messages.error.title}
				hint={messages.error.hint}
				retry={{ label: messages.error.retry, onPress: () => startWith(mode) }}
				leave={{ label: messages.error.home, onPress: cancel }}
			/>
		);
	}

	const loading = student.isPending || isPending;
	if (!loading && (!student.data || !option))
		return <StepScreen title={messages.notFound} onBack={back} onCancel={cancel} />;

	const copy = messages.pay;
	const amount = formatMoney(option?.amount ?? 0);
	const summary = <Notice icon="account" text={`${option?.label ?? ""} · ${amount} MXN`} />;
	const helper = student.data?.helpers?.[0];
	const toQr = {
		label: copy.backToQr,
		icon: "qrcode",
		variant: "outline",
		onPress: () => setMode("qr"),
	} as const;
	const toCash = {
		label: copy.paidCash,
		icon: "cash",
		variant: "outline",
		onPress: () => setMode("cash"),
	} as const;

	if (mode === "cash") {
		return (
			<StepScreen
				step={3}
				title={copy.cashTitle(amount)}
				hint={copy.cashHint}
				loading={loading}
				primaryAction={{
					label: copy.cashConfirm,
					icon: "check",
					variant: "success",
					busy: cash.isPending,
					onPress: () => startWith("cash"),
				}}
				secondaryAction={toQr}
				onBack={back}
				onCancel={cancel}
			>
				{summary}
			</StepScreen>
		);
	}

	if (mode === "helper" && helper) {
		return (
			<StepScreen
				step={3}
				title={copy.helperTitle(helper.name)}
				hint={copy.helperHint(maskPhone(helper.phone))}
				primaryAction={toQr}
				secondaryAction={toCash}
				onBack={back}
				onCancel={cancel}
			>
				{summary}
				{helperPayment.data ? (
					<PaymentPanel payment={helperPayment.data} />
				) : (
					<Notice icon="timer-sand" tone="warning" text={copy.waiting} />
				)}
			</StepScreen>
		);
	}

	return (
		<StepScreen
			step={3}
			title={copy.qrTitle}
			hint={copy.qrHint(firstName(student.data?.name ?? ""))}
			loading={loading}
			primaryAction={toCash}
			secondaryAction={
				helper
					? {
							label: copy.notifyHelper(helper.name),
							icon: "account-heart",
							variant: "outline",
							onPress: () => {
								setMode("helper");
								if (!helperCharge.data && !helperCharge.isPending) startWith("helper");
							},
						}
					: undefined
			}
			onBack={back}
			onCancel={cancel}
		>
			{summary}
			{qrPayment.data ? (
				<PaymentPanel payment={qrPayment.data} />
			) : (
				<Notice icon="timer-sand" tone="warning" text={copy.waiting} />
			)}
		</StepScreen>
	);
}
