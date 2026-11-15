/** First visible character of a name, upper-cased for es-MX, or "?" when the name is blank. */
export function initialOf(name: string): string {
	const [first] = Array.from(name.trim());
	return first ? first.toLocaleUpperCase("es-MX") : "?";
}
