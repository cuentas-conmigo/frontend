import { useRouter } from "expo-router";
import { useWorkshopId } from "~contexts/session";
import { messages } from "~messages";
import { useFlowNavigation } from "~services/navigation";
import { Text } from "~sharing/atoms/text";
import { OptionCard } from "~sharing/molecules/option-card";
import { PersonRow } from "~sharing/molecules/person-row";
import { ListScreen } from "~sharing/organisms/list-screen";

import { useReviewList, useRoster, useWorkshop } from "~queries";

export default function StudentsScreen() {
	const router = useRouter();
	const { back } = useFlowNavigation();
	const workshopId = useWorkshopId();
	const workshop = useWorkshop(workshopId);
	const roster = useRoster(workshopId);
	const review = useReviewList(workshopId);
	const waiting = review.data?.length ?? 0;
	const copy = messages.students;

	return (
		<ListScreen
			eyebrow={copy.eyebrow}
			title={copy.title}
			hint={
				roster.data && workshop.data ? copy.hint(roster.data.length, workshop.data.name) : undefined
			}
			onBack={back}
			loading={roster.isPending}
			data={roster.data}
			keyExtractor={(entry) => entry.student.id}
			emptyText={copy.empty}
			renderItem={({ student, status }) => (
				<PersonRow
					student={student}
					status={status}
					onPress={() =>
						router.push({ pathname: "/alumnos/[studentId]", params: { studentId: student.id } })
					}
				/>
			)}
			above={
				waiting > 0 ? (
					<OptionCard
						icon="account-clock"
						label={copy.waiting(waiting)}
						detail={copy.waitingDetail}
						onPress={() => router.push("/inscripciones")}
					/>
				) : undefined
			}
			below={<Text tone="mutedForeground">{copy.tapHint}</Text>}
			primaryAction={{
				label: copy.add,
				icon: "account-plus",
				variant: "success",
				onPress: () => router.push("/alumnos/nuevo"),
			}}
		/>
	);
}
