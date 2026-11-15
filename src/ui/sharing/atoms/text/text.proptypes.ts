import type { TextProps } from "react-native";
import type { ColorToken, TypeVariant } from "~styles";

export interface Props extends TextProps {
	/** Size step of the type scale; `title` and `display` are announced as headings. */
	variant?: TypeVariant;
	/** Palette token for the text color; defaults to `foreground`. */
	tone?: ColorToken;
	/** Semibold face; headings already use it. */
	bold?: boolean;
}
