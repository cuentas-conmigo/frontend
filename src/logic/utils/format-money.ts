const options = { style: "currency", currency: "MXN" } as const;
const whole = new Intl.NumberFormat("es-MX", { ...options, maximumFractionDigits: 0 });
const withCents = new Intl.NumberFormat("es-MX", { ...options, minimumFractionDigits: 2 });

/** Formats an MXN amount the way it is read in Mexico: "$1,300" for whole pesos, "$12.50" with cents. */
export function formatMoney(amount: number): string {
	return (Number.isInteger(amount) ? whole : withCents).format(amount);
}
