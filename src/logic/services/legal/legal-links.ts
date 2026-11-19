import * as Linking from "expo-linking";

const site = "https://cuentasconmigo.tuentyfaiv.com";

/** Public pages the stores and the data-protection law require the app to link to. */
export const legalLinks = {
	privacy: `${site}/privacidad`,
	terms: `${site}/terminos`,
	support: `${site}/soporte`,
} as const;

export type LegalPage = keyof typeof legalLinks;

/** Opens a legal page in the system browser. */
export function openLegalPage(page: LegalPage) {
	return Linking.openURL(legalLinks[page]);
}
