import { useLocalSearchParams } from "expo-router";
import { useStudentId } from "~contexts/session";
import { messages } from "~messages";
import { useFlowNavigation } from "~services/navigation";
import { Text } from "~sharing/atoms/text";
import { ChargeRow } from "~sharing/molecules/charge-row";
import { ListScreen } from "~sharing/organisms/list-screen";
import { StepScreen } from "~sharing/organisms/step-screen";
import { formatDate } from "~utils/format-date";
import { formatMoney } from "~utils/format-money";

import { useCard } from "~queries";

export default function CardWorkshopScreen() {
	const { back } = useFlowNavigation();
	const { workshopId } = useLocalSearchParams<{ workshopId: string }>();
	const card = useCard(useStudentId());
	const entry = card.data?.find((item) => item.workshop.id === workshopId);
	const copy = messages.card;

	if (card.data && !entry) return <StepScreen title={messages.notFound} onBack={back} />;

	return (
		<ListScreen
			eyebrow={copy.eyebrow}
			title={entry?.workshop.name ?? ""}
			hint={entry ? `${entry.workshop.instructor} · ${entry.workshop.schedule}` : undefined}
			onBack={back}
			loading={card.isPending}
			data={entry?.charges}
			keyExtractor={(charge) => charge.id}
			emptyText={copy.noCharges}
			above={
				<Text variant="lead" bold role="heading">
					{copy.history}
				</Text>
			}
			renderItem={(charge) => (
				<ChargeRow
					label={charge.label}
					amount={formatMoney(charge.amount)}
					status={charge.status}
					note={
						charge.status === "paid" && charge.paidAt && charge.folio
							? copy.paidOn(formatDate(charge.paidAt), charge.folio)
							: copy.due
					}
				/>
			)}
		/>
	);
}
