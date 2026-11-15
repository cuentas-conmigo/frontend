import { useRouter } from "expo-router";
import { useWorkshopId } from "~contexts/session";
import { messages } from "~messages";
import { useFlowNavigation } from "~services/navigation";
import { Notice } from "~sharing/molecules/notice";
import { PersonRow } from "~sharing/molecules/person-row";
import { ListScreen } from "~sharing/organisms/list-screen";

import { useRoster, useWorkshop } from "~queries";

export default function ReleaseScreen() {
	const router = useRouter();
	const { back } = useFlowNavigation();
	const workshopId = useWorkshopId();
	const workshop = useWorkshop(workshopId);
	const roster = useRoster(workshopId);
	const copy = messages.release;

	return (
		<ListScreen
			eyebrow={copy.eyebrow}
			title={copy.title}
			hint={copy.hint}
			onBack={back}
			loading={roster.isPending}
			data={roster.data}
			keyExtractor={(entry) => entry.student.id}
			emptyText={messages.students.empty}
			renderItem={({ student }) => (
				<PersonRow
					student={student}
					detail={workshop.data?.name}
					action={{
						label: copy.action,
						accessibleLabel: copy.actionFor(student.name),
						onPress: () =>
							router.push({
								pathname: "/alumnos/[studentId]/baja",
								params: { studentId: student.id },
							}),
					}}
				/>
			)}
			below={<Notice icon="information" text={copy.note} />}
		/>
	);
}
