import { createStyles, radius, spacing, stroke, touch } from "~styles";

export const useButtonStyles = createStyles(({ colors }) => ({
	base: {
		minHeight: touch.button,
		minWidth: touch.minSize,
		flexDirection: "row",
		gap: spacing.sm,
		paddingHorizontal: spacing.lg,
		paddingVertical: spacing.md,
		borderRadius: radius.md,
		borderWidth: stroke.thin,
		alignItems: "center",
		justifyContent: "center",
	},
	label: { textAlign: "center", flexShrink: 1 },
	default: { backgroundColor: colors.primary, borderColor: colors.primary },
	success: { backgroundColor: colors.success, borderColor: colors.success },
	outline: { backgroundColor: colors.card, borderColor: colors.input },
	destructive: { backgroundColor: colors.destructive, borderColor: colors.destructive },
	link: { backgroundColor: "transparent", borderColor: "transparent" },
	disabled: { backgroundColor: colors.muted, borderColor: colors.muted },
	linkLabel: { textDecorationLine: "underline" },
}));
