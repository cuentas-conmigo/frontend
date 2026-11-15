import { createStyles, radius, spacing, stroke } from "~styles";

export const useStatCardStyles = createStyles(({ colors }) => ({
	card: {
		gap: spacing.xs,
		padding: spacing.xl - 2,
		borderRadius: radius.lg,
		borderWidth: stroke.thin,
		borderColor: colors.border,
		backgroundColor: colors.card,
	},
}));
