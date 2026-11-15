import { View } from "react-native";
import { messages } from "~messages";
import { OptionCard } from "~sharing/molecules/option-card";
import { createStyles, touch } from "~styles";
import { formatMoney } from "~utils/format-money";

import type { IconName } from "~sharing/atoms/icon";
import type { Props } from "./charge-options.proptypes";

const useStyles = createStyles(() => ({ list: { gap: touch.gap } }));

const maxChoices = 4;

const iconFor = (id: string): IconName => {
	if (id.startsWith("months")) return "calendar-range";
	if (id.startsWith("extra")) return "receipt";
	return "calendar";
};

/** What the person can pay right now, at most four choices counting "Otro monto". */
export function ChargeOptions({ options, onSelect, onCustom }: Props) {
	const styles = useStyles();
	const shown = options.slice(0, onCustom ? maxChoices - 1 : maxChoices);

	return (
		<View style={styles.list}>
			{shown.map((option) => (
				<OptionCard
					key={option.id}
					icon={iconFor(option.id)}
					label={option.label}
					detail={`${option.detail} · ${formatMoney(option.amount)}`}
					onPress={() => onSelect(option)}
				/>
			))}
			{onCustom ? (
				<OptionCard icon="pencil" {...messages.whatPays.other} onPress={onCustom} />
			) : null}
		</View>
	);
}
