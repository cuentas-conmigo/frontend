import { createStyles, radius, spacing } from "~styles";

export const useActionTileStyles = createStyles(({ colors }) => ({
	tile: { gap: spacing.xl, padding: spacing.xl - 2, borderRadius: radius.lg, minHeight: 148 },
	primary: { backgroundColor: colors.primary },
	accent: { backgroundColor: colors.accent },
	top: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
	texts: { gap: spacing.xs },
}));
