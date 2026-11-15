import { StyleSheet } from "react-native";
import { render, screen, userEvent } from "@testing-library/react-native";
import { describe, expect, it, vi } from "vitest";
import { themes, touch } from "~styles";

import { Button } from "./button";

describe("Button", () => {
	it("is exposed as a button named by its label", async () => {
		await render(<Button label="Continuar" />);

		expect(screen.getByRole("button", { name: "Continuar" })).toBeOnTheScreen();
	});

	it("calls onPress when tapped", async () => {
		const onPress = vi.fn();
		await render(<Button label="Continuar" onPress={onPress} />);

		await userEvent.press(screen.getByRole("button", { name: "Continuar" }));

		expect(onPress).toHaveBeenCalledTimes(1);
	});

	it("ignores taps and reports itself disabled when disabled", async () => {
		const onPress = vi.fn();
		await render(<Button label="Continuar" disabled onPress={onPress} />);

		const button = screen.getByRole("button", { name: "Continuar" });
		await userEvent.press(button);

		expect(onPress).not.toHaveBeenCalled();
		expect(button).toBeDisabled();
	});

	it("keeps the touch target at least 56px tall", async () => {
		await render(<Button label="Atrás" />);

		const style = StyleSheet.flatten(screen.getByRole("button", { name: "Atrás" }).props.style);
		expect(style.minHeight).toBeGreaterThanOrEqual(touch.minSize);
	});
});

describe("Button variants", () => {
	it("fills the default variant with the primary token", async () => {
		await render(<Button label="Continuar" />);

		expect(screen.getByRole("button", { name: "Continuar" })).toHaveStyle({
			backgroundColor: themes.light.primary,
		});
	});

	it("draws the outline variant on the card with an input border", async () => {
		await render(<Button label="Escuchar" variant="outline" />);

		expect(screen.getByRole("button", { name: "Escuchar" })).toHaveStyle({
			backgroundColor: themes.light.card,
			borderColor: themes.light.input,
		});
	});

	it("switches to muted tokens when disabled", async () => {
		await render(<Button label="Continuar" disabled />);

		expect(screen.getByRole("button", { name: "Continuar" })).toHaveStyle({
			backgroundColor: themes.light.muted,
		});
	});
});

describe("Button states", () => {
	it("fills the success variant with the success token", async () => {
		await render(<Button label="Inscribir" variant="success" />);

		expect(screen.getByRole("button", { name: "Inscribir" })).toHaveStyle({
			backgroundColor: themes.light.success,
		});
	});

	it("announces a busy button and blocks repeated taps", async () => {
		const onPress = vi.fn();
		await render(<Button label="Inscribir" busy onPress={onPress} />);

		const button = screen.getByRole("button", { name: "Inscribir" });
		await userEvent.press(button);

		expect(onPress).not.toHaveBeenCalled();
		expect(button).toBeBusy();
	});

	it("underlines the link variant so it is not told apart by color alone", async () => {
		await render(<Button label="Cancelar" variant="link" />);

		expect(screen.getByText("Cancelar")).toHaveStyle({ textDecorationLine: "underline" });
	});
});
