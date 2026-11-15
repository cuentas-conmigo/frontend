import { useRouter } from "expo-router";
import { useWorkshopId } from "~contexts/session";
import { messages } from "~messages";
import { useFlowNavigation } from "~services/navigation";
import { PersonRow } from "~sharing/molecules/person-row";
import { ErrorState } from "~sharing/organisms/error-state";
import { ListScreen } from "~sharing/organisms/list-screen";

import { useRoster } from "~queries";

export default function WhoPaysScreen() {
	const router = useRouter();
	const { back, cancel } = useFlowNavigation();
	const roster = useRoster(useWorkshopId());
	const copy = messages.whoPays;

	if (roster.isError) {
		return (
			<ErrorState
				title={messages.error.loadTitle}
				hint={messages.error.loadHint}
				retry={{ label: messages.error.retry, onPress: () => roster.refetch() }}
				leave={{ label: messages.error.home, onPress: cancel }}
			/>
		);
	}

	return (
		<ListScreen
			step={1}
			title={copy.title}
			hint={copy.hint}
			onBack={back}
			onCancel={cancel}
			loading={roster.isPending}
			data={roster.data}
			keyExtractor={(entry) => entry.student.id}
			emptyText={copy.empty}
			renderItem={({ student, status }) => (
				<PersonRow
					student={student}
					status={status}
					onPress={() =>
						router.push({ pathname: "/cobrar/[studentId]", params: { studentId: student.id } })
					}
				/>
			)}
		/>
	);
}
