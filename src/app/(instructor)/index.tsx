import { useRouter } from "expo-router";
import { useSession, useWorkshopId } from "~contexts/session";
import { currentPeriod } from "~fixtures/workshops";
import { messages } from "~messages";
import { Button } from "~sharing/atoms/button";
import { Text } from "~sharing/atoms/text";
import { ActionTile } from "~sharing/molecules/action-tile";
import { StepScreen } from "~sharing/organisms/step-screen";
import { firstName } from "~utils/first-name";

import { useReviewList, useRoster, useWorkshop } from "~queries";

export default function HomeScreen() {
	const router = useRouter();
	const { session } = useSession();
	const workshopId = useWorkshopId();
	const workshop = useWorkshop(workshopId);
	const roster = useRoster(workshopId);
	const review = useReviewList(workshopId);
	const copy = messages.home;
	const enrolled = roster.data?.length ?? 0;
	const paid = roster.data?.filter((entry) => entry.status === "paid").length ?? 0;
	const progress = copy.progress(paid, enrolled, currentPeriod.month);

	return (
		<StepScreen
			title={copy.title(firstName(session?.name ?? ""))}
			hint={workshop.data?.name}
			script={[copy.title(firstName(session?.name ?? "")), workshop.data?.name, progress]
				.filter(Boolean)
				.join(". ")}
			loading={roster.isPending}
		>
			<Text variant="lead" bold>
				{progress}
			</Text>
			<ActionTile icon="cash-fast" {...copy.collect} onPress={() => router.push("/cobrar")} />
			<ActionTile
				icon="account-group"
				tone="accent"
				label={copy.students.label}
				detail={copy.students.detail(enrolled, review.data?.length ?? 0)}
				onPress={() => router.push("/alumnos")}
			/>
			<Button
				variant="link"
				icon="format-size"
				label={copy.settings}
				onPress={() => router.push("/formato")}
			/>
		</StepScreen>
	);
}
