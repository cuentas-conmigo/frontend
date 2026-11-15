export interface Props {
	/** Local uri of the photo taken, if any. */
	uri?: string;
	onChange: (uri: string | undefined) => void;
}
