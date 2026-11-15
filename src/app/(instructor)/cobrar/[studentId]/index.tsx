import { useLocalSearchParams, useRouter } from "expo-router";
import { useWorkshopId } from "~contexts/session";
import { ChargeOptions } from "~instructor/organisms/charge-options";
import { messages } from "~messages";
import { useFlowNavigation } from "~services/navigation";
import { StepScreen } from "~sharing/organisms/step-screen";
import { firstName } from "~utils/first-name";

import { useChargeOptions, useStudent } from "~queries";

export default function WhatPaysScreen() {
	const router = useRouter();
	const { back, cancel } = useFlowNavigation();
	const { studentId } = useLocalSearchParams<{ studentId: string }>();
	const student = useStudent(studentId);
	const options = useChargeOptions(useWorkshopId());
	const copy = messages.whatPays;

	if (student.isError)
		return <StepScreen title={messages.notFound} onBack={back} onCancel={cancel} />;

	return (
		<StepScreen
			step={2}
			title={copy.title(firstName(student.data?.name ?? ""))}
			hint={copy.hint}
			onBack={back}
			onCancel={cancel}
			loading={student.isPending || options.isPending}
		>
			<ChargeOptions
				options={options.data ?? []}
				onSelect={(option) =>
					router.push({
						pathname: "/cobrar/[studentId]/pago",
						params: { studentId, cobro: option.id },
					})
				}
				onCustom={() =>
					router.push({ pathname: "/cobrar/[studentId]/monto", params: { studentId } })
				}
			/>
		</StepScreen>
	);
}
