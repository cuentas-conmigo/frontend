import { render, screen, userEvent } from "@testing-library/react-native";
import { describe, expect, it, vi } from "vitest";

import { ErrorState } from "./error-state";

describe("ErrorState", () => {
	it("explains the failure and offers a retry and a way out", async () => {
		const retry = vi.fn();
		const leave = vi.fn();
		await render(
			<ErrorState
				title="No se pudo crear el cobro"
				hint="No se cobró nada."
				retry={{ label: "Intentar de nuevo", onPress: retry }}
				leave={{ label: "Volver al inicio", onPress: leave }}
			/>
		);

		expect(screen.getByRole("heading", { name: "No se pudo crear el cobro" })).toBeOnTheScreen();
		await userEvent.press(screen.getByRole("button", { name: "Intentar de nuevo" }));
		await userEvent.press(screen.getByRole("button", { name: "Volver al inicio" }));

		expect(retry).toHaveBeenCalledTimes(1);
		expect(leave).toHaveBeenCalledTimes(1);
	});
});
