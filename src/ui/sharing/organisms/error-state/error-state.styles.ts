import { createStyles } from "~styles";

export const useErrorStateStyles = createStyles(({ colors }) => ({
	badge: {
		alignSelf: "center",
		width: 112,
		height: 112,
		borderRadius: 56,
		borderWidth: 6,
		borderColor: colors.destructive,
		alignItems: "center",
		justifyContent: "center",
	},
}));
