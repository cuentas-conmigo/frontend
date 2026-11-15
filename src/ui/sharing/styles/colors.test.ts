import { describe, expect, it } from "vitest";
import { contrastRatio } from "~utils/contrast-ratio";

import type { ColorToken, Scheme } from "./colors";

import { themes } from "./colors";

const textPairs: readonly [label: string, text: ColorToken, fill: ColorToken][] = [
	["text on page", "foreground", "background"],
	["text on card", "cardForeground", "card"],
	["muted text on page", "mutedForeground", "background"],
	["muted text on card", "mutedForeground", "card"],
	["muted text on muted", "mutedForeground", "muted"],
	["primary button", "primaryForeground", "primary"],
	["primary text on card", "primary", "card"],
	["paid badge", "successForeground", "success"],
	["pending badge", "warningForeground", "warning"],
	["destructive text on card", "destructive", "card"],
	["destructive text on page", "destructive", "background"],
	["destructive button", "destructiveForeground", "destructive"],
	["avatar initial", "foreground", "muted"],
	["accent card", "accentForeground", "accent"],
	["success text on card", "success", "card"],
];

describe.each(Object.keys(themes) as Scheme[])("%s theme", (scheme) => {
	const colors = themes[scheme];

	it.each(textPairs)("%s reaches 7:1", (_label, text, fill) => {
		expect(contrastRatio(colors[text], colors[fill])).toBeGreaterThanOrEqual(7);
	});

	it("draws the focus ring at 3:1 against the page and cards (WCAG 2.4.13)", () => {
		expect(contrastRatio(colors.ring, colors.background)).toBeGreaterThanOrEqual(3);
		expect(contrastRatio(colors.ring, colors.card)).toBeGreaterThanOrEqual(3);
	});

	it("draws control borders at 3:1 against cards and the page", () => {
		expect(contrastRatio(colors.input, colors.card)).toBeGreaterThanOrEqual(3);
		expect(contrastRatio(colors.border, colors.background)).toBeGreaterThanOrEqual(3);
	});
});
