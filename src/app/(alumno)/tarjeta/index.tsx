import { View } from "react-native";
import { useRouter } from "expo-router";
import { useSession, useStudentId } from "~contexts/session";
import { messages } from "~messages";
import { Notice } from "~sharing/molecules/notice";
import { OptionCard } from "~sharing/molecules/option-card";
import { WorkshopCard } from "~sharing/molecules/workshop-card";
import { ListScreen } from "~sharing/organisms/list-screen";
import { createStyles, touch } from "~styles";
import { firstName } from "~utils/first-name";
import { formatMoney } from "~utils/format-money";

import { useCard } from "~queries";

const useStyles = createStyles(() => ({ links: { gap: touch.gap } }));

export default function CardScreen() {
	const styles = useStyles();
	const router = useRouter();
	const { session } = useSession();
	const card = useCard(useStudentId());
	const copy = messages.card;

	return (
		<ListScreen
			eyebrow={copy.eyebrow}
			title={copy.title(firstName(session?.name ?? ""))}
			hint={card.data && card.data.length > 0 ? copy.hint(card.data.length) : undefined}
			loading={card.isPending}
			data={card.data}
			keyExtractor={(entry) => entry.workshop.id}
			emptyText={copy.empty}
			renderItem={({ workshop, current }) => (
				<WorkshopCard
					name={workshop.name}
					detail={`${workshop.instructor} · ${workshop.schedule}`}
					dueLabel={current ? `${current.label} · ${formatMoney(current.amount)}` : undefined}
					status={current?.status}
					onPress={() =>
						router.push({ pathname: "/tarjeta/[workshopId]", params: { workshopId: workshop.id } })
					}
				/>
			)}
			below={
				<View style={styles.links}>
					<Notice icon="bank" text={copy.howToPay} />
					<OptionCard icon="account-plus" {...copy.join} onPress={() => router.push("/unirme")} />
					<OptionCard icon="account" {...copy.profile} onPress={() => router.push("/perfil")} />
					<OptionCard icon="human" {...copy.accessible} onPress={() => router.push("/formato")} />
				</View>
			}
		/>
	);
}
