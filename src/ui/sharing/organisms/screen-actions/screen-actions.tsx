import { View } from "react-native";
import { messages } from "~messages";
import { Button } from "~sharing/atoms/button";
import { createStyles, touch } from "~styles";

import type { Props } from "./screen-actions.proptypes";

const useStyles = createStyles(() => ({ actions: { gap: touch.gap } }));

/** Bottom of every screen: the main button, a support button, then Cancelar. */
export function ScreenActions({ primaryAction, secondaryAction, onCancel, cancelLabel }: Props) {
	const styles = useStyles();

	if (!primaryAction && !secondaryAction && !onCancel) return null;

	return (
		<View style={styles.actions}>
			{primaryAction ? <Button {...primaryAction} /> : null}
			{secondaryAction ? <Button variant="outline" {...secondaryAction} /> : null}
			{onCancel ? (
				<Button variant="link" label={cancelLabel ?? messages.actions.cancel} onPress={onCancel} />
			) : null}
		</View>
	);
}
