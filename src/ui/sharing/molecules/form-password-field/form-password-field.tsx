import { FormTextField } from "~sharing/molecules/form-text-field";

import type { Props } from "./form-password-field.proptypes";

/** Hidden text for a password, with the platform's password autofill. */
export function FormPasswordField(props: Props) {
	return (
		<FormTextField
			{...props}
			secureTextEntry
			autoCapitalize="none"
			autoCorrect={false}
			autoComplete="current-password"
			textContentType="password"
		/>
	);
}
