import { createStyles, radius, tileSize } from "~styles";

export const useAvatarStyles = createStyles(({ colors }) => ({
	frame: {
		borderRadius: radius.tile,
		backgroundColor: colors.muted,
		overflow: "hidden",
		alignItems: "center",
		justifyContent: "center",
	},
	md: tileSize.md,
	lg: { ...tileSize.lg, borderRadius: radius.lg },
	photo: { width: "100%", height: "100%" },
}));
