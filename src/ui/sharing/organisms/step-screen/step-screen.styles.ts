import { createStyles, spacing, touch } from "~styles";

export const useStepScreenStyles = createStyles(({ colors }) => ({
	screen: { flex: 1, backgroundColor: colors.background },
	content: {
		flexGrow: 1,
		gap: spacing.xl,
		paddingHorizontal: spacing.xl,
		paddingTop: spacing.md,
		paddingBottom: spacing.xxl,
	},
	body: { gap: touch.gap },
}));
