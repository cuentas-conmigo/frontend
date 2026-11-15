import { createStyles, radius, spacing, stroke } from "~styles";

export const useChargeRowStyles = createStyles(({ colors }) => ({
	row: {
		gap: spacing.sm,
		paddingHorizontal: spacing.lg + 2,
		paddingVertical: spacing.lg,
		borderRadius: radius.lg,
		borderWidth: stroke.thin,
		borderColor: colors.border,
		backgroundColor: colors.card,
	},
	head: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		gap: spacing.md,
	},
}));
