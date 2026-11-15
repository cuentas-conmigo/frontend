import { createStyles, radius, spacing, stroke, tileSize, touch } from "~styles";

export const useOptionCardStyles = createStyles(({ colors }) => ({
	card: {
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
	tile: {
		...tileSize.md,
		borderRadius: radius.tile,
		backgroundColor: colors.muted,
		alignItems: "center",
		justifyContent: "center",
	},
	texts: { flex: 1, gap: 2 },
}));
