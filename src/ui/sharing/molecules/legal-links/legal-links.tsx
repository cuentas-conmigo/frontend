import { View } from "react-native";
import { messages } from "~messages";
import { openLegalPage } from "~services/legal";
import { Button } from "~sharing/atoms/button";

import type { LegalPage } from "~services/legal";
import type { IconName } from "~sharing/atoms/icon";
import type { Props } from "./legal-links.proptypes";

import { useLegalLinksStyles } from "./legal-links.styles";

const icons: Record<LegalPage, IconName> = {
	privacy: "shield-lock-outline",
	terms: "file-document-outline",
	support: "help-circle-outline",
};

const defaultPages: readonly LegalPage[] = ["privacy", "terms"];

/** Links to the public privacy notice, terms and help pages, opened in the browser. */
export function LegalLinks({ pages = defaultPages }: Props) {
	const styles = useLegalLinksStyles();
	const copy = messages.legal;

	return (
		<View style={styles.list}>
			{pages.map((page) => (
				<Button
					key={page}
					variant="link"
					role="link"
					icon={icons[page]}
					label={copy[page]}
					onPress={() => openLegalPage(page)}
				/>
			))}
		</View>
	);
}
