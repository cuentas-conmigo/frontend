import { describe, expect, it } from "vitest";

import { radius, touch, typography } from "./scales";

describe("typography", () => {
	it.each(Object.entries(typography))("%s is at least 20px", (_name, step) => {
		expect(step.fontSize).toBeGreaterThanOrEqual(20);
	});

	it.each(Object.entries(typography))("%s line height stays within 1.4–1.6", (_name, step) => {
		const ratio = step.lineHeight / step.fontSize;
		expect(ratio).toBeGreaterThanOrEqual(1.4);
		expect(ratio).toBeLessThanOrEqual(1.6);
	});

	it.each([["body"], ["lead"]] as const)(
		"%s paragraphs use 1.5 line spacing (WCAG 1.4.8)",
		(name) => {
			expect(typography[name].lineHeight / typography[name].fontSize).toBeGreaterThanOrEqual(1.5);
		}
	);
});

describe("touch", () => {
	it("keeps targets at 56px with 12px gaps", () => {
		expect(touch.minSize).toBeGreaterThanOrEqual(56);
		expect(touch.gap).toBeGreaterThanOrEqual(12);
		expect(touch.button).toBeGreaterThanOrEqual(44);
	});
});

describe("radius", () => {
	it("grows from small to large", () => {
		expect(radius.sm).toBeLessThan(radius.md);
		expect(radius.md).toBeLessThan(radius.lg);
	});
});
