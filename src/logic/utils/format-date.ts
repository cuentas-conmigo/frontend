const shortDate = new Intl.DateTimeFormat("es-MX", {
	day: "numeric",
	month: "short",
	year: "numeric",
	timeZone: "America/Mexico_City",
});

/** Formats an ISO timestamp as a short Mexican date, e.g. "14 nov 2026". */
export function formatDate(iso: string): string {
	return shortDate.format(new Date(iso)).replaceAll(".", "");
}
