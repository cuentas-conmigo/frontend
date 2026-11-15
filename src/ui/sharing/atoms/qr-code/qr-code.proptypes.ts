export interface Props {
	/** Payload to encode, e.g. Pey's `qrString`. */
	value: string;
	/** What the code is, read by screen readers. */
	label: string;
	size?: number;
}
