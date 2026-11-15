import { describe, expect, it } from "vitest";

import { maskPhone } from "./mask-phone";

describe("maskPhone", () => {
	it("keeps the area code and the last 4 digits", () => {
		expect(maskPhone("5500001122")).toBe("55 •••• 1122");
	});

	it("ignores spaces and dashes", () => {
		expect(maskPhone("55-0000 1122")).toBe("55 •••• 1122");
	});

	it("hides everything when the number is not 10 digits", () => {
		expect(maskPhone("12345")).toBe("•••• ••••");
	});
});
