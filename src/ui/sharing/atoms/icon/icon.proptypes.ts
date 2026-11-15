import type MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import type { ComponentProps } from "react";
import type { ColorToken } from "~styles";

export type IconName = ComponentProps<typeof MaterialCommunityIcons>["name"];

export interface Props {
	name: IconName;
	size?: number;
	/** Palette token for the glyph; defaults to `foreground`. */
	color?: ColorToken;
}
