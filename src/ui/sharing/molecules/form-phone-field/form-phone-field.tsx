import { TextField } from "~sharing/molecules/text-field";
import { useFieldContext, useFieldError } from "~sharing/organisms/form/context";

import type { Props } from "./form-phone-field.proptypes";

/** Digits of a Mexican mobile number keep at most ten. */
export const phoneDigits = (text: string) => text.replace(/\D/g, "").slice(0, 10);

/** A 10-digit phone: only digits can be typed, with the phone keypad. */
export function FormPhoneField({ autoComplete = "tel", ...props }: Props) {
	const field = useFieldContext<string>();
	const error = useFieldError();

	return (
		<TextField
			{...props}
			value={field.state.value}
			onChangeText={(text) => field.handleChange(phoneDigits(text))}
			onBlur={field.handleBlur}
			error={error}
			keyboardType="phone-pad"
			inputMode="tel"
			autoComplete={autoComplete}
			textContentType="telephoneNumber"
		/>
	);
}
