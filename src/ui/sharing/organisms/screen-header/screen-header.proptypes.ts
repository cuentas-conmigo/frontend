export interface Props {
	/** Current step, starting at 1; omit it on screens outside a numbered flow. */
	step?: number;
	/** Steps in the flow; flows are kept to three. */
	total?: number;
	/** Small line above the title that says where the person is, e.g. the section. */
	eyebrow?: string;
	title: string;
	/** One short line under the title, at most two lines long. */
	hint?: string;
	/** What Escuchar reads aloud; defaults to the step, title and hint. */
	script?: string;
	onBack?: () => void;
}
