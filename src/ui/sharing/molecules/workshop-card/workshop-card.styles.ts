import { createStyles, radius, spacing, stroke, touch } from "~styles";

export const useWorkshopCardStyles = createStyles(({ colors }) => ({
	card: {
		gap: spacing.sm,
		minHeight: touch.minSize,
		paddingHorizontal: spacing.lg + 2,
		paddingVertical: spacing.lg,
		borderRadius: radius.lg,
		borderWidth: stroke.thin,
		borderColor: colors.border,
		backgroundColor: colors.card,
	},
	head: { flexDirection: "row", alignItems: "center", gap: spacing.sm },
	name: { flex: 1 },
	due: {
		flexDirection: "row",
		flexWrap: "wrap",
		alignItems: "center",
		gap: spacing.md,
		paddingTop: spacing.xs,
	},
}));
