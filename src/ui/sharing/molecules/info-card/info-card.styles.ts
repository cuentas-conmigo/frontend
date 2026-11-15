import { createStyles, radius, spacing, stroke } from "~styles";

export const useInfoCardStyles = createStyles(({ colors }) => ({
	card: {
		gap: spacing.md,
		padding: spacing.xl - 2,
		borderRadius: radius.lg,
		borderWidth: stroke.thin,
		borderColor: colors.border,
		backgroundColor: colors.card,
	},
	line: { gap: 2 },
}));
