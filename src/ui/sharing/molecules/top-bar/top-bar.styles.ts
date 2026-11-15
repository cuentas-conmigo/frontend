import { createStyles, radius, spacing, stroke, touch } from "~styles";

export const useTopBarStyles = createStyles(({ colors }) => ({
	bar: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		gap: spacing.md,
	},
	back: {
		flexDirection: "row",
		alignItems: "center",
		gap: spacing.xs,
		minHeight: touch.minSize,
		minWidth: touch.minSize,
		paddingRight: spacing.md,
	},
	spacer: { flex: 1 },
	listen: {
		flexDirection: "row",
		alignItems: "center",
		gap: spacing.sm,
		minHeight: touch.minSize,
		paddingHorizontal: spacing.lg,
		borderRadius: radius.full,
		borderWidth: stroke.thin,
		borderColor: colors.input,
		backgroundColor: colors.card,
	},
}));
