/** Semantic color roles in shadcn naming: every fill has a matching `*Foreground` for content on it. */
export interface ColorTokens {
	background: string;
	foreground: string;
	card: string;
	cardForeground: string;
	primary: string;
	primaryForeground: string;
	muted: string;
	mutedForeground: string;
	border: string;
	input: string;
	ring: string;
	/** Second brand fill, the blue "Inscripción" card in the design. */
	accent: string;
	accentForeground: string;
	success: string;
	successForeground: string;
	warning: string;
	warningForeground: string;
	destructive: string;
	destructiveForeground: string;
}

/** Light follows the pen.dev design and high contrast follows Pili's prototype; every pair reaches 7:1 (WCAG AAA). */
export const themes = {
	light: {
		background: "#F6F5F2",
		foreground: "#141414",
		card: "#FFFFFF",
		cardForeground: "#141414",
		primary: "#141414",
		primaryForeground: "#F7F6F3",
		muted: "#EAE7E1",
		mutedForeground: "#3D3B37",
		border: "#3D3B37",
		input: "#3D3B37",
		ring: "#2E4AA8",
		accent: "#2E4AA8",
		accentForeground: "#FFFFFF",
		success: "#0F5F28",
		successForeground: "#FFFFFF",
		warning: "#F2B01E",
		warningForeground: "#2A1D00",
		destructive: "#9C1C15",
		destructiveForeground: "#FFFFFF",
	},
	dark: {
		background: "#0E1322",
		foreground: "#EEF1FA",
		card: "#192039",
		cardForeground: "#EEF1FA",
		primary: "#EEF1FA",
		primaryForeground: "#0E1322",
		muted: "#2E3858",
		mutedForeground: "#C9CFE6",
		border: "#8C97BC",
		input: "#8C97BC",
		ring: "#8FA6FF",
		accent: "#8FA6FF",
		accentForeground: "#0E1322",
		success: "#4CC474",
		successForeground: "#07200F",
		warning: "#F5BE3F",
		warningForeground: "#2A1D00",
		destructive: "#FF8A80",
		destructiveForeground: "#0E1322",
	},
	highContrast: {
		background: "#000000",
		foreground: "#FFFFFF",
		card: "#000000",
		cardForeground: "#FFFFFF",
		primary: "#FFFFFF",
		primaryForeground: "#000000",
		muted: "#262626",
		mutedForeground: "#FFFFFF",
		border: "#FFFFFF",
		input: "#FFFFFF",
		ring: "#FFEB3B",
		accent: "#FFEB3B",
		accentForeground: "#000000",
		success: "#3DDC84",
		successForeground: "#000000",
		warning: "#FFC400",
		warningForeground: "#000000",
		destructive: "#FF8A80",
		destructiveForeground: "#000000",
	},
} as const satisfies Record<string, ColorTokens>;

export type Scheme = keyof typeof themes;
export type ColorToken = keyof ColorTokens;
