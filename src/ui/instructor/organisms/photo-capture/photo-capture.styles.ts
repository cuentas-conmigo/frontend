import { createStyles, radius, spacing, stroke, tileSize } from "~styles";

export const usePhotoCaptureStyles = createStyles(({ colors }) => ({
	box: {
		gap: spacing.md,
		padding: spacing.lg,
		borderRadius: radius.lg,
		borderWidth: stroke.thin,
		borderColor: colors.border,
		backgroundColor: colors.card,
	},
	preview: { flexDirection: "row", alignItems: "center", gap: spacing.lg },
	photo: { ...tileSize.lg, borderRadius: radius.lg, backgroundColor: colors.muted },
	error: { flexDirection: "row", gap: spacing.sm, alignItems: "flex-start" },
}));
