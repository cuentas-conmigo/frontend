import { createStyles, spacing } from "~styles";

export const useStepProgressStyles = createStyles(({ colors }) => ({
	bar: { flexDirection: "row", gap: spacing.sm },
	segment: { flex: 1, height: 6, borderRadius: 3, backgroundColor: colors.muted },
	done: { backgroundColor: colors.foreground },
}));
