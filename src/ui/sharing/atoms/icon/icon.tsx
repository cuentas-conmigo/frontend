import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useTheme } from "~contexts/theme";

import type { Props } from "./icon.proptypes";

/** Decorative glyph: every icon sits next to words that say the same thing. */
export function Icon({ name, size = 24, color = "foreground" }: Props) {
	const { colors } = useTheme();
	return (
		<MaterialCommunityIcons
			testID={`icon-${name}`}
			aria-hidden
			name={name}
			size={size}
			color={colors[color]}
		/>
	);
}
