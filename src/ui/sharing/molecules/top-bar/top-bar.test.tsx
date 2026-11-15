import * as Speech from "expo-speech";
import { render, screen, userEvent } from "@testing-library/react-native";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { PreferencesProvider } from "~contexts/preferences";

import { TopBar } from "./top-bar";

vi.mock("expo-speech", () => ({ speak: vi.fn(), stop: vi.fn(() => Promise.resolve()) }));

const speak = vi.mocked(Speech.speak);

beforeEach(() => vi.clearAllMocks());

describe("TopBar", () => {
	it("hides Atrás when there is nowhere to go back to", async () => {
		await render(<TopBar script="Inicio" />);

		expect(screen.queryByRole("button", { name: "Atrás" })).toBeNull();
		expect(screen.getByRole("button", { name: "Escuchar" })).toBeOnTheScreen();
	});

	it("goes back and reads the screen aloud on request", async () => {
		const onBack = vi.fn();
		await render(<TopBar script="Paso 1 de 4. ¿Quién paga?" onBack={onBack} />);

		await userEvent.press(screen.getByRole("button", { name: "Atrás" }));
		await userEvent.press(screen.getByRole("button", { name: "Escuchar" }));

		expect(onBack).toHaveBeenCalledTimes(1);
		expect(speak).toHaveBeenCalledWith(
			"Paso 1 de 4. ¿Quién paga?",
			expect.objectContaining({ language: "es-MX" })
		);
		expect(screen.getByRole("button", { name: "Detener" })).toBeOnTheScreen();
	});

	it("reads the screen on open when Leer en voz alta is on", async () => {
		await render(
			<PreferencesProvider initial={{ readAloud: true }}>
				<TopBar script="Inicio" />
			</PreferencesProvider>
		);

		expect(speak).toHaveBeenCalledWith("Inicio", expect.anything());
	});

	it("stays quiet on open by default", async () => {
		await render(<TopBar script="Inicio" />);

		expect(speak).not.toHaveBeenCalled();
	});
});
