import { createStyles, radius, spacing, stroke } from "~styles";

export const useStatusBadgeStyles = createStyles(({ colors }) => ({
	badge: {
		flexDirection: "row",
		alignItems: "center",
		alignSelf: "flex-start",
		gap: spacing.sm,
		paddingHorizontal: spacing.md,
		paddingVertical: spacing.xs,
		borderRadius: radius.full,
		borderWidth: stroke.thick,
	},
	paid: {
		borderStyle: "solid",
		backgroundColor: colors.success,
		borderColor: colors.successForeground,
	},
	paidLabel: { color: colors.successForeground },
	pending: {
		borderStyle: "dashed",
		backgroundColor: colors.warning,
		borderColor: colors.warningForeground,
	},
	pendingLabel: { color: colors.warningForeground },
}));
