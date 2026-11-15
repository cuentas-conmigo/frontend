export interface Props {
	label: string;
	detail?: string;
	checked: boolean;
	onChange: (checked: boolean) => void;
	/** `switch` for settings that apply at once, `checkbox` for a form answer such as consent. */
	kind?: "switch" | "checkbox";
}
