import { createStyles, radius, spacing } from "~styles";

export const useNoticeStyles = createStyles(({ colors }) => ({
	box: {
		flexDirection: "row",
		alignItems: "center",
		gap: spacing.md,
		paddingHorizontal: spacing.lg,
		paddingVertical: spacing.md,
		borderRadius: radius.md,
	},
	warning: { backgroundColor: colors.warning },
	success: { backgroundColor: colors.success },
	info: { backgroundColor: colors.muted },
	text: { flex: 1 },
}));
