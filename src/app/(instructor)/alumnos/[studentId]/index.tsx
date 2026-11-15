import { useLocalSearchParams, useRouter } from "expo-router";
import { useWorkshopId } from "~contexts/session";
import { currentPeriod } from "~fixtures/workshops";
import { messages } from "~messages";
import { useFlowNavigation } from "~services/navigation";
import { Avatar } from "~sharing/atoms/avatar";
import { InfoCard } from "~sharing/molecules/info-card";
import { StepScreen } from "~sharing/organisms/step-screen";
import { formatDate } from "~utils/format-date";
import { maskPhone } from "~utils/mask-phone";

import { useRoster, useStudent } from "~queries";

export default function StudentFileScreen() {
	const router = useRouter();
	const { back } = useFlowNavigation();
	const { studentId } = useLocalSearchParams<{ studentId: string }>();
	const student = useStudent(studentId);
	const roster = useRoster(useWorkshopId());
	const status = roster.data?.find((entry) => entry.student.id === studentId)?.status;
	const copy = messages.student;

	if (student.isError) return <StepScreen title={messages.notFound} onBack={back} />;

	const profile = student.data;
	const helper = profile?.helpers?.[0];

	return (
		<StepScreen
			eyebrow={copy.eyebrow}
			title={profile?.name ?? ""}
			onBack={back}
			loading={!profile}
			primaryAction={{
				label: copy.collect,
				icon: "cash-fast",
				onPress: () => router.push({ pathname: "/cobrar/[studentId]", params: { studentId } }),
			}}
			secondaryAction={{
				label: copy.remove,
				icon: "account-minus",
				variant: "destructive",
				onPress: () =>
					router.push({ pathname: "/alumnos/[studentId]/baja", params: { studentId } }),
			}}
		>
			{profile ? (
				<>
					<Avatar name={profile.name} photo={profile.photo} size="lg" />
					<InfoCard
						lines={[
							{ label: copy.whatsapp, value: maskPhone(profile.phone) },
							{
								label: copy.helper,
								value: helper ? `${helper.name} · ${maskPhone(helper.phone)}` : copy.nobody,
							},
							{
								label: copy.month(currentPeriod.month),
								value: status ? messages.status[status] : "—",
							},
							{
								label: copy.photo,
								value: profile.photo
									? copy.photoGranted(formatDate(profile.photo.grantedAt))
									: copy.noPhoto,
							},
						]}
					/>
				</>
			) : null}
		</StepScreen>
	);
}
