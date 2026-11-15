import { ChoiceRow } from "~sharing/molecules/choice-row";
import { useFieldContext } from "~sharing/organisms/form/context";

import type { Props } from "./form-consent-field.proptypes";

/** A yes/no answer such as consent, as a checkbox whose state is also written out. */
export function FormConsentField({ label, detail }: Props) {
	const field = useFieldContext<boolean>();

	return (
		<ChoiceRow
			kind="checkbox"
			label={label}
			detail={detail}
			checked={field.state.value}
			onChange={(checked) => {
				field.handleChange(checked);
				field.handleBlur();
			}}
		/>
	);
}
