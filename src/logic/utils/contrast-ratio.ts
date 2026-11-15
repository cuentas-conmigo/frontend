function channel(value: number): number {
	const srgb = value / 255;
	return srgb <= 0.04045 ? srgb / 12.92 : ((srgb + 0.055) / 1.055) ** 2.4;
}

function luminance(hex: string): number {
	const match = /^#([0-9a-f]{6})$/i.exec(hex);
	if (!match?.[1]) throw new Error(`Expected a #RRGGBB color, got "${hex}"`);
	const rgb = Number.parseInt(match[1], 16);
	const [r, g, b] = [(rgb >> 16) & 255, (rgb >> 8) & 255, rgb & 255].map(channel) as [
		number,
		number,
		number,
	];
	return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** WCAG 2 contrast ratio between two #RRGGBB colors, from 1 to 21. */
export function contrastRatio(foreground: string, background: string): number {
	const [light, dark] = [luminance(foreground), luminance(background)].sort((a, b) => b - a) as [
		number,
		number,
	];
	return (light + 0.05) / (dark + 0.05);
}
