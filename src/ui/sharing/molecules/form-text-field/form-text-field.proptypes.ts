import type { Props as TextFieldProps } from "~sharing/molecules/text-field/text-field.proptypes";

/** Everything the plain text field takes, except what the form owns. */
export type Props = Omit<TextFieldProps, "value" | "onChangeText" | "onBlur" | "error">;
