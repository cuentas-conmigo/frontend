import type { TextInputProps } from "react-native";

export interface Props extends Omit<TextInputProps, "style" | "placeholderTextColor"> {
	/** Visible label, always shown above the box. */
	label: string;
	/** What is wrong, in plain words; also read by screen readers. */
	error?: string;
}
