import { createStyles, fonts, radius, spacing, stroke, touch, typography } from "~styles";

export const useTextFieldStyles = createStyles(({ colors }) => ({
	field: { gap: spacing.sm },
	input: {
		...typography.body,
		fontFamily: fonts.ui,
		minHeight: touch.minSize,
		paddingHorizontal: spacing.lg + 2,
		borderRadius: radius.md,
		borderWidth: stroke.thin,
		borderColor: colors.input,
		backgroundColor: colors.card,
		color: colors.cardForeground,
	},
	focused: { borderColor: colors.ring, borderWidth: stroke.thick },
	invalid: { borderColor: colors.destructive, borderWidth: stroke.thick },
	error: { flexDirection: "row", gap: spacing.sm, alignItems: "flex-start" },
}));
