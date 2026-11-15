import { TextField } from "~sharing/molecules/text-field";
import { useFieldContext, useFieldError } from "~sharing/organisms/form/context";

import type { Props } from "./form-text-field.proptypes";

/** Text field bound to the surrounding form field: value, blur and error come from TanStack Form. */
export function FormTextField(props: Props) {
	const field = useFieldContext<string>();
	const error = useFieldError();

	return (
		<TextField
			{...props}
			value={field.state.value}
			onChangeText={field.handleChange}
			onBlur={field.handleBlur}
			error={error}
		/>
	);
}
