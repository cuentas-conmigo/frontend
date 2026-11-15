import { createStyles, fonts, typography } from "~styles";

export const useTextStyles = createStyles(() => ({
	body: { ...typography.body, fontFamily: fonts.ui },
	lead: { ...typography.lead, fontFamily: fonts.ui },
	title: { ...typography.title, fontFamily: fonts.display },
	display: { ...typography.display, fontFamily: fonts.display },
	bold: { fontFamily: fonts.uiBold },
}));
