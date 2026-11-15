import { Text } from "react-native";
import { render, screen } from "@testing-library/react-native";
import { describe, expect, it } from "vitest";
import { ThemeProvider } from "~contexts/theme";

import type { Scheme } from "./colors";

import { themes } from "./colors";
import { createStyles } from "./create-styles";

const useSampleStyles = createStyles((theme) => ({
	label: { color: theme.colors.foreground },
}));

const seen: object[] = [];

function Sample() {
	const styles = useSampleStyles();
	seen.push(styles);
	return <Text style={styles.label}>Hola</Text>;
}

async function renderIn(scheme: Scheme) {
	await render(
		<ThemeProvider scheme={scheme}>
			<Sample />
		</ThemeProvider>
	);
}

describe("createStyles", () => {
	it("resolves tokens for the light theme", async () => {
		await renderIn("light");

		expect(screen.getByText("Hola")).toHaveStyle({ color: themes.light.foreground });
	});

	it("resolves tokens for the dark theme", async () => {
		await renderIn("dark");

		expect(screen.getByText("Hola")).toHaveStyle({ color: themes.dark.foreground });
	});

	it("reuses one sheet per scheme across renders", async () => {
		seen.length = 0;
		await renderIn("dark");
		await renderIn("dark");

		expect(seen[0]).toBe(seen[1]);
	});
});
