/** Shows only the area code and last 4 digits of a 10-digit number, e.g. "55 •••• 1122". */
export function maskPhone(phone: string): string {
	const digits = phone.replace(/\D/g, "");
	if (digits.length !== 10) return "•••• ••••";
	return `${digits.slice(0, 2)} •••• ${digits.slice(-4)}`;
}
