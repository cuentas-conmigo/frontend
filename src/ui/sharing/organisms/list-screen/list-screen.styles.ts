import { createStyles, spacing, touch } from "~styles";

export const useListScreenStyles = createStyles(({ colors }) => ({
	screen: { flex: 1, backgroundColor: colors.background },
	content: { paddingHorizontal: spacing.xl, paddingTop: spacing.md, paddingBottom: spacing.xxl },
	top: { gap: spacing.xl, paddingBottom: spacing.xl },
	bottom: { gap: spacing.xl, paddingTop: spacing.xl },
	separator: { height: touch.gap },
}));
