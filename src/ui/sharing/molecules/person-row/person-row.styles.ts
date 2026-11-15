import { createStyles, radius, spacing, stroke, touch } from "~styles";

export const usePersonRowStyles = createStyles(({ colors }) => ({
	row: {
		flexDirection: "row",
		alignItems: "center",
		gap: spacing.md + 2,
		minHeight: touch.minSize,
		paddingHorizontal: spacing.lg + 2,
		paddingVertical: spacing.md + 2,
		borderRadius: radius.lg,
		borderWidth: stroke.thin,
		borderColor: colors.border,
		backgroundColor: colors.card,
	},
	details: { flex: 1, gap: spacing.xs },
	summary: { flex: 1, flexDirection: "row", alignItems: "center", gap: spacing.md + 2 },
	action: {
		minHeight: touch.minSize,
		minWidth: touch.minSize,
		paddingHorizontal: spacing.lg,
		borderRadius: radius.md,
		borderWidth: stroke.thin,
		borderColor: colors.destructive,
		backgroundColor: colors.card,
		alignItems: "center",
		justifyContent: "center",
	},
}));
