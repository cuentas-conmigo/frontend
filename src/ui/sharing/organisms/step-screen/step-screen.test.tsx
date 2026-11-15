import * as Speech from "expo-speech";
import { render, screen, userEvent } from "@testing-library/react-native";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { StepScreen } from "./step-screen";

vi.mock("expo-speech", () => ({ speak: vi.fn(), stop: vi.fn(() => Promise.resolve()) }));

const speak = vi.mocked(Speech.speak);

beforeEach(() => vi.clearAllMocks());

describe("StepScreen", () => {
	it("shows the progress and announces the title as a heading", async () => {
		await render(<StepScreen step={1} title="¿Quién paga?" />);

		expect(screen.getByText("Paso 1 de 3")).toBeOnTheScreen();
		expect(screen.getByRole("progressbar", { name: "Paso 1 de 3" })).toBeOnTheScreen();
		expect(screen.getByRole("heading", { name: "¿Quién paga?" })).toBeOnTheScreen();
	});

	it("reads the step, title and hint aloud when Escuchar is tapped", async () => {
		await render(<StepScreen step={2} title="¿Cuánto?" hint="Escribe el monto." />);

		await userEvent.press(screen.getByRole("button", { name: "Escuchar" }));

		expect(speak).toHaveBeenCalledWith(
			"Paso 2 de 3. ¿Cuánto? Escribe el monto.",
			expect.objectContaining({ language: "es-MX" })
		);
	});

	it("only shows Atrás and Cancelar when the flow provides them", async () => {
		await render(<StepScreen step={1} title="¿Quién paga?" />);

		expect(screen.queryByRole("button", { name: "Atrás" })).toBeNull();
		expect(screen.queryByRole("button", { name: "Cancelar" })).toBeNull();
	});

	it("wires the main action, Atrás and Cancelar", async () => {
		const onNext = vi.fn();
		const onBack = vi.fn();
		const onCancel = vi.fn();
		await render(
			<StepScreen
				step={2}
				title="¿Cuánto?"
				primaryAction={{ label: "Continuar", onPress: onNext }}
				onBack={onBack}
				onCancel={onCancel}
			/>
		);

		await userEvent.press(screen.getByRole("button", { name: "Continuar" }));
		await userEvent.press(screen.getByRole("button", { name: "Atrás" }));
		await userEvent.press(screen.getByRole("button", { name: "Cancelar" }));

		expect(onNext).toHaveBeenCalledTimes(1);
		expect(onBack).toHaveBeenCalledTimes(1);
		expect(onCancel).toHaveBeenCalledTimes(1);
	});

	it("says it is loading instead of showing content or actions", async () => {
		await render(
			<StepScreen title="Inicio" loading primaryAction={{ label: "Cobrar", onPress: vi.fn() }} />
		);

		expect(screen.getByText("Cargando…")).toBeOnTheScreen();
		expect(screen.queryByRole("button", { name: "Cobrar" })).toBeNull();
	});
});
