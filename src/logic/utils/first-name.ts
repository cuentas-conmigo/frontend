/** First word of a full name, used when the screen talks about the person. */
export function firstName(fullName: string): string {
	const [first = ""] = fullName.trim().split(/\s+/);
	return first;
}
