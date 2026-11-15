import type { Props as TextFieldProps } from "~sharing/molecules/text-field/text-field.proptypes";

export type Props = Pick<TextFieldProps, "label" | "placeholder" | "autoComplete">;
