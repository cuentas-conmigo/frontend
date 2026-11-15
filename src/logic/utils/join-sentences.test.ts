import { describe, expect, it } from "vitest";

import { joinSentences } from "./join-sentences";

describe("joinSentences", () => {
	it("adds a period between fragments that lack one", () => {
		expect(joinSentences(["Paso 1 de 4", "Elige a una persona"])).toBe(
			"Paso 1 de 4. Elige a una persona."
		);
	});

	it("keeps existing question and exclamation marks without doubling punctuation", () => {
		expect(joinSentences(["Paso 2 de 4", "¿Cuánto?", "¡Listo!", "Escribe el monto."])).toBe(
			"Paso 2 de 4. ¿Cuánto? ¡Listo! Escribe el monto."
		);
	});

	it("skips missing and blank fragments", () => {
		expect(joinSentences(["Paso 1 de 4", undefined, "  ", "¿Quién paga?"])).toBe(
			"Paso 1 de 4. ¿Quién paga?"
		);
	});
});
