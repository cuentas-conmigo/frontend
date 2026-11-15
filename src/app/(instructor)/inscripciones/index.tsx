import { useRouter } from "expo-router";
import { useWorkshopId } from "~contexts/session";
import { messages } from "~messages";
import { useFlowNavigation } from "~services/navigation";
import { OptionCard } from "~sharing/molecules/option-card";
import { PersonRow } from "~sharing/molecules/person-row";
import { ListScreen } from "~sharing/organisms/list-screen";

import { useReviewList } from "~queries";

export default function ReviewScreen() {
	const router = useRouter();
	const { back } = useFlowNavigation();
	const review = useReviewList(useWorkshopId());
	const copy = messages.review;

	return (
		<ListScreen
			eyebrow={copy.eyebrow}
			title={copy.title}
			hint={copy.hint}
			onBack={back}
			loading={review.isPending}
			data={review.data}
			keyExtractor={(entry) => entry.student.id}
			emptyText={copy.empty}
			above={
				<OptionCard
					icon="qrcode"
					{...copy.code}
					onPress={() => router.push("/inscripciones/codigo")}
				/>
			}
			renderItem={({ student, status }) => (
				<PersonRow
					student={student}
					detail={copy[status]}
					onPress={() =>
						router.push({
							pathname: "/inscripciones/[studentId]",
							params: { studentId: student.id },
						})
					}
				/>
			)}
		/>
	);
}
