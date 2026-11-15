import { useStore } from "@tanstack/react-form";
import { Button } from "~sharing/atoms/button";
import { useFormContext } from "~sharing/organisms/form/context";

import type { Props } from "./form-submit.proptypes";

/**
 * The form's main button. It is busy while submitting but never disabled for invalid data: a
 * disabled button gives no reason, while tapping it shows each error and the summary.
 */
export function FormSubmit({ label, icon, variant }: Props) {
	const form = useFormContext();
	const submitting = useStore(form.store, (state) => state.isSubmitting);

	return (
		<Button
			label={label}
			icon={icon}
			variant={variant}
			busy={submitting}
			onPress={() => form.handleSubmit()}
		/>
	);
}
