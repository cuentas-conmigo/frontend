import { useLocalSearchParams, useRouter } from "expo-router";
import { useWorkshopId } from "~contexts/session";
import { messages } from "~messages";
import { useFeedback } from "~services/feedback";
import { useFlowNavigation } from "~services/navigation";
import { PersonRow } from "~sharing/molecules/person-row";
import { StepScreen } from "~sharing/organisms/step-screen";
import { firstName } from "~utils/first-name";

import { useEnrollment, useStudent } from "~queries";

export default function ConfirmReleaseScreen() {
	const router = useRouter();
	const feedback = useFeedback();
	const { back } = useFlowNavigation();
	const { studentId } = useLocalSearchParams<{ studentId: string }>();
	const student = useStudent(studentId);
	const { release } = useEnrollment(useWorkshopId());
	const copy = messages.release;
	const name = student.data?.name ?? "";

	return (
		<StepScreen
			eyebrow={copy.eyebrow}
			title={copy.confirmTitle(firstName(name))}
			hint={copy.confirmHint}
			onBack={back}
			loading={student.isPending}
			primaryAction={{ label: copy.keep, icon: "account-check", onPress: back }}
			secondaryAction={{
				label: copy.confirm,
				icon: "account-remove",
				variant: "destructive",
				busy: release.isPending,
				onPress: () =>
					release.mutate(studentId, {
						onSuccess: () => {
							feedback.success(copy.done(name));
							router.dismissTo("/alumnos");
						},
						onError: () => feedback.error(messages.error.loadHint),
					}),
			}}
		>
			{student.data ? <PersonRow student={student.data} /> : null}
		</StepScreen>
	);
}
