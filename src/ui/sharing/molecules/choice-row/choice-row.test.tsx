import { render, screen, userEvent } from "@testing-library/react-native";
import { describe, expect, it, vi } from "vitest";

import { ChoiceRow } from "./choice-row";

describe("ChoiceRow", () => {
	it("is a switch that says its state in words", async () => {
		const onChange = vi.fn();
		await render(
			<ChoiceRow
				label="Alto contraste"
				detail="Fondo negro y letra blanca"
				checked={false}
				onChange={onChange}
			/>
		);

		const toggle = screen.getByRole("switch", {
			name: "Alto contraste, Fondo negro y letra blanca",
		});
		expect(toggle).not.toBeChecked();
		expect(screen.getByText("Desactivado")).toBeOnTheScreen();

		await userEvent.press(toggle);
		expect(onChange).toHaveBeenCalledWith(true);
	});

	it("can be a checkbox for a form answer", async () => {
		await render(
			<ChoiceRow kind="checkbox" label="Dio permiso para usar su foto" checked onChange={vi.fn()} />
		);

		expect(screen.getByRole("checkbox", { name: "Dio permiso para usar su foto" })).toBeChecked();
	});
});
