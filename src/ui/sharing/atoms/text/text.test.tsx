import { StyleSheet } from "react-native";
import { render, screen } from "@testing-library/react-native";
import { describe, expect, it } from "vitest";
import { PreferencesProvider } from "~contexts/preferences";
import { themes, typography } from "~styles";

import { Text } from "./text";

describe("Text", () => {
	it("announces titles as headings", async () => {
		await render(<Text variant="title">¿Quién paga?</Text>);

		expect(screen.getByRole("heading", { name: "¿Quién paga?" })).toBeOnTheScreen();
	});

	it("does not announce body copy as a heading", async () => {
		await render(<Text>Toca la foto</Text>);

		expect(screen.queryByRole("heading")).not.toBeOnTheScreen();
	});

	it("never renders body copy below 20px", async () => {
		await render(<Text>Toca la foto</Text>);

		const style = StyleSheet.flatten(screen.getByText("Toca la foto").props.style);
		expect(style.fontSize).toBe(typography.body.fontSize);
		expect(style.fontSize).toBeGreaterThanOrEqual(20);
	});

	it("uses the muted foreground token for muted text", async () => {
		await render(<Text tone="mutedForeground">Nota</Text>);

		expect(screen.getByText("Nota")).toHaveStyle({ color: themes.light.mutedForeground });
	});
});

describe("Text with large text on", () => {
	it("grows the size and the line height by a quarter", async () => {
		await render(
			<PreferencesProvider initial={{ largeText: true }}>
				<Text>Hola</Text>
			</PreferencesProvider>
		);

		expect(screen.getByText("Hola")).toHaveStyle({ fontSize: 25, lineHeight: 37.5 });
	});
});
