import type { Props as FormTextFieldProps } from "~sharing/molecules/form-text-field/form-text-field.proptypes";

export type Props = Omit<
	FormTextFieldProps,
	"secureTextEntry" | "autoComplete" | "textContentType"
>;
