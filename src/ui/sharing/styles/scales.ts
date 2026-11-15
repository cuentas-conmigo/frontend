/** Font family names registered by `useFonts` in the root layout. */
export const fonts = {
	ui: "Inter_400Regular",
	uiBold: "Inter_600SemiBold",
	display: "Inter_600SemiBold",
} as const;

/** Never below 20px; titles are 32px; paragraphs use 1.5 line spacing (WCAG 1.4.8, AAA). */
export const typography = {
	body: { fontSize: 20, lineHeight: 30 },
	lead: { fontSize: 22, lineHeight: 33 },
	title: { fontSize: 32, lineHeight: 46 },
	display: { fontSize: 40, lineHeight: 58 },
} as const;

/** Extra scale applied on top of the system text size when "Letra más grande" is on. */
export const largeTextScale = 1.25;

export type TypeVariant = keyof typeof typography;

export const spacing = {
	xs: 4,
	sm: 8,
	md: 12,
	lg: 16,
	xl: 24,
	xxl: 32,
} as const;

const baseRadius = 16;

/** Derived from one base value, like shadcn's `--radius`. */
export const radius = {
	sm: baseRadius - 8,
	md: baseRadius,
	lg: baseRadius + 6,
	tile: 13,
	full: 999,
} as const;

/** Targets: 56px minimum (WCAG 2.5.5 asks 44), 14px gap between neighbours. */
export const touch = {
	minSize: 56,
	button: 56,
	gap: 14,
} as const;

export const stroke = {
	thin: 2,
	thick: 3,
	/** Keyboard focus outline, thicker than any border. */
	focus: 4,
} as const;

/** Photo tiles are portrait, as in the pen.dev lists. */
export const tileSize = {
	md: { width: 46, height: 54 },
	lg: { width: 92, height: 108 },
} as const;
