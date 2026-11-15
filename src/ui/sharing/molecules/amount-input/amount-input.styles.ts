import { createStyles, fonts, radius, spacing, stroke, typography } from "~styles";

export const useAmountInputStyles = createStyles(({ colors }) => ({
	card: {
		alignItems: "center",
		gap: spacing.sm,
		padding: spacing.xl,
		borderRadius: radius.lg,
		borderWidth: stroke.thin,
		borderColor: colors.border,
		backgroundColor: colors.card,
	},
	invalid: { borderColor: colors.destructive, borderWidth: stroke.thick },
	row: { flexDirection: "row", alignItems: "center", gap: spacing.sm },
	input: {
		...typography.display,
		fontSize: 56,
		lineHeight: 72,
		fontFamily: fonts.display,
		minWidth: 120,
		textAlign: "center",
		color: colors.cardForeground,
	},
	error: { flexDirection: "row", gap: spacing.sm, alignItems: "center" },
}));
