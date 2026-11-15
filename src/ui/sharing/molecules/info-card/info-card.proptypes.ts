export interface InfoLine {
	label: string;
	value: string;
}

export interface Props {
	title?: string;
	lines: readonly InfoLine[];
}
