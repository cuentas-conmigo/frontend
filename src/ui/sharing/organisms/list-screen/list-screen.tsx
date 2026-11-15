import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlashList } from "@shopify/flash-list";
import { messages } from "~messages";
import { Notice } from "~sharing/molecules/notice";
import { ScreenActions } from "~sharing/organisms/screen-actions";
import { ScreenHeader } from "~sharing/organisms/screen-header";

import type { Props } from "./list-screen.proptypes";

import { useListScreenStyles } from "./list-screen.styles";

function Separator() {
	const styles = useListScreenStyles();
	return <View style={styles.separator} />;
}

/** A screen whose content is a long list: only the visible rows are rendered (FlashList). */
export function ListScreen<T>({
	data,
	renderItem,
	keyExtractor,
	emptyText,
	loading,
	above,
	below,
	primaryAction,
	secondaryAction,
	onCancel,
	cancelLabel,
	...header
}: Props<T>) {
	const styles = useListScreenStyles();

	return (
		<SafeAreaView edges={["top", "bottom", "left", "right"]} style={styles.screen}>
			<FlashList
				data={loading ? [] : data}
				keyExtractor={keyExtractor}
				renderItem={({ item }) => <>{renderItem(item)}</>}
				ItemSeparatorComponent={Separator}
				contentContainerStyle={styles.content}
				keyboardShouldPersistTaps="handled"
				ListHeaderComponent={
					<View style={styles.top}>
						<ScreenHeader {...header} />
						{above}
					</View>
				}
				ListEmptyComponent={
					<Notice
						icon={loading ? "timer-sand" : "information"}
						text={loading ? messages.loading : emptyText}
					/>
				}
				ListFooterComponent={
					<View style={styles.bottom}>
						{below}
						<ScreenActions
							primaryAction={primaryAction}
							secondaryAction={secondaryAction}
							onCancel={onCancel}
							cancelLabel={cancelLabel}
						/>
					</View>
				}
			/>
		</SafeAreaView>
	);
}
