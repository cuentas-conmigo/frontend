import type { LegalPage } from "~services/legal";

export interface Props {
	/** Pages to link, in order; defaults to the privacy notice and the terms. */
	pages?: readonly LegalPage[];
}
