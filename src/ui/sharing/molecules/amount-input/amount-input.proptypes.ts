export interface Props {
	/** Digits typed so far, without the peso sign. */
	value: string;
	onChangeText: (value: string) => void;
	onBlur?: () => void;
	error?: string;
}
