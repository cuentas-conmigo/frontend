import { useState } from "react";
import { render, screen, userEvent } from "@testing-library/react-native";
import { describe, expect, it, vi } from "vitest";

import { AmountInput } from "./amount-input";

function Harness() {
	const [value, setValue] = useState("");
	return <AmountInput value={value} onChangeText={setValue} />;
}

describe("AmountInput", () => {
	it("keeps only digits", async () => {
		await render(<Harness />);

		await userEvent.type(screen.getByLabelText("Monto a cobrar, en pesos"), "1a5.0");

		expect(screen.getByLabelText("Monto a cobrar, en pesos")).toHaveDisplayValue("150");
	});

	it("puts the error in the spoken name", async () => {
		await render(
			<AmountInput value="" onChangeText={vi.fn()} error="Escribe un monto mayor a cero." />
		);

		expect(
			screen.getByLabelText("Monto a cobrar, en pesos. Escribe un monto mayor a cero.")
		).toBeOnTheScreen();
	});
});
