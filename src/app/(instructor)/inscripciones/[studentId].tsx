import { useLocalSearchParams } from "expo-router";
import { useWorkshopId } from "~contexts/session";
import { messages } from "~messages";
import { useFeedback } from "~services/feedback";
import { useFlowNavigation } from "~services/navigation";
import { InfoCard } from "~sharing/molecules/info-card";
import { Notice } from "~sharing/molecules/notice";
import { StepScreen } from "~sharing/organisms/step-screen";
import { maskPhone } from "~utils/mask-phone";

import { useEnrollment, useReviewList, useRoster, useWorkshop } from "~queries";

export default function ReviewOneScreen() {
	const feedback = useFeedback();
	const { back } = useFlowNavigation();
	const { studentId } = useLocalSearchParams<{ studentId: string }>();
	const workshopId = useWorkshopId();
	const workshop = useWorkshop(workshopId);
	const roster = useRoster(workshopId);
	const review = useReviewList(workshopId);
	const { approve, release } = useEnrollment(workshopId);
	const entry = review.data?.find((item) => item.student.id === studentId);
	const copy = messages.reviewOne;
	const loading = review.isPending || roster.isPending || workshop.isPending;

	if (!loading && !entry) return <StepScreen title={messages.notFound} onBack={back} />;

	const name = entry?.student.name ?? "";
	const helper = entry?.student.helpers?.[0];
	const used = roster.data?.length ?? 0;
	const capacity = workshop.data?.capacity ?? 0;
	const busy = approve.isPending || release.isPending;
	const done = (message: string) => () => {
		feedback.success(message);
		back();
	};

	return (
		<StepScreen
			eyebrow={copy.eyebrow}
			title={name}
			hint={entry ? messages.review[entry.status] : undefined}
			onBack={back}
			loading={loading}
			primaryAction={{
				label: copy.approve,
				icon: "check",
				variant: "success",
				busy,
				onPress: () => approve.mutate(studentId, { onSuccess: done(copy.approved(name)) }),
			}}
			secondaryAction={{
				label: copy.reject,
				icon: "close",
				variant: "destructive",
				busy,
				onPress: () => release.mutate(studentId, { onSuccess: done(copy.rejected(name)) }),
			}}
		>
			{entry ? (
				<>
					<InfoCard
						lines={[
							{ label: copy.whatsapp, value: maskPhone(entry.student.phone) },
							{
								label: copy.helper,
								value: helper ? `${helper.name} · ${maskPhone(helper.phone)}` : copy.nobody,
							},
							{ label: copy.places, value: copy.placesValue(used, capacity) },
						]}
					/>
					{used >= capacity ? <Notice icon="alert" tone="warning" text={copy.full} /> : null}
					<Notice icon="information" text={copy.note} />
				</>
			) : null}
		</StepScreen>
	);
}
