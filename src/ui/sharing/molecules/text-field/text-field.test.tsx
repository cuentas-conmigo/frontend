import { render, screen, userEvent } from "@testing-library/react-native";
import { describe, expect, it, vi } from "vitest";
import { themes } from "~styles/colors";

import { TextField } from "./text-field";

describe("TextField", () => {
	it("is named by its visible label and passes typing through", async () => {
		const onChangeText = vi.fn();
		await render(<TextField label="Nombre" onChangeText={onChangeText} />);

		await userEvent.type(screen.getByLabelText("Nombre"), "Inés");

		expect(onChangeText).toHaveBeenLastCalledWith("Inés");
	});

	it("includes the error in the spoken name and marks the border", async () => {
		await render(<TextField label="WhatsApp" error="El WhatsApp debe tener 10 dígitos." />);

		const input = screen.getByLabelText("WhatsApp. El WhatsApp debe tener 10 dígitos.");
		expect(input).toHaveStyle({ borderColor: themes.light.destructive });
		expect(
			screen.getByText("El WhatsApp debe tener 10 dígitos.", { includeHiddenElements: true })
		).toBeOnTheScreen();
	});
});
