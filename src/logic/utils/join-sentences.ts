const endsSentence = /[.?!…]$/u;

/** Joins non-empty fragments into one readable script, adding a period only where one is missing. */
export function joinSentences(parts: readonly (string | undefined)[]): string {
	return parts
		.map((part) => part?.trim())
		.filter((part): part is string => Boolean(part))
		.map((part) => (endsSentence.test(part) ? part : `${part}.`))
		.join(" ");
}
