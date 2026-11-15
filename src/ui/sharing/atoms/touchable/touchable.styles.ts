import { createStyles, stroke } from "~styles";

export const useTouchableStyles = createStyles(({ colors }) => ({
	focused: {
		outlineColor: colors.ring,
		outlineWidth: stroke.focus,
		outlineStyle: "solid",
		outlineOffset: 2,
	},
	pressed: { opacity: 0.85 },
}));
