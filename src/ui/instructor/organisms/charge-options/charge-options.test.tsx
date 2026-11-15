import { render, screen, userEvent } from "@testing-library/react-native";
import { describe, expect, it, vi } from "vitest";

import type { ChargeOption } from "~typing/charges";

import { ChargeOptions } from "./charge-options";

const option = (id: string, label: string, amount: number): ChargeOption => ({
	id,
	label,
	detail: "Mensualidad",
	amount,
});

describe("ChargeOptions", () => {
	it("shows each charge with its amount in pesos", async () => {
		await render(
			<ChargeOptions options={[option("monthly-1", "Diciembre", 130)]} onSelect={vi.fn()} />
		);

		expect(screen.getByRole("button", { name: "Diciembre, Mensualidad · $130" })).toBeOnTheScreen();
	});

	it("never shows more than four choices", async () => {
		const many = [1, 2, 3, 4, 5].map((n) => option(`monthly-${n}`, `Mes ${n}`, 100));
		await render(<ChargeOptions options={many} onSelect={vi.fn()} />);

		expect(screen.getAllByRole("button")).toHaveLength(4);
	});

	it("keeps four choices in total when it offers Otro monto", async () => {
		const onCustom = vi.fn();
		const many = [1, 2, 3, 4].map((n) => option(`monthly-${n}`, `Mes ${n}`, 100));
		await render(<ChargeOptions options={many} onSelect={vi.fn()} onCustom={onCustom} />);

		expect(screen.getAllByRole("button")).toHaveLength(4);
		await userEvent.press(screen.getByRole("button", { name: "Otro monto, Tú escribes cuánto" }));
		expect(onCustom).toHaveBeenCalled();
	});

	it("reports the chosen charge", async () => {
		const onSelect = vi.fn();
		const diciembre = option("monthly-1", "Diciembre", 130);
		await render(<ChargeOptions options={[diciembre]} onSelect={onSelect} />);

		await userEvent.press(screen.getByRole("button"));

		expect(onSelect).toHaveBeenCalledWith(diciembre);
	});
});
