import { AmountInput } from "~sharing/molecules/amount-input";
import { useFieldContext, useFieldError } from "~sharing/organisms/form/context";

/** The large peso amount, bound to the surrounding form field. */
export function FormAmountField() {
	const field = useFieldContext<string>();
	const error = useFieldError();

	return (
		<AmountInput
			value={field.state.value}
			onChangeText={field.handleChange}
			onBlur={field.handleBlur}
			error={error}
		/>
	);
}
