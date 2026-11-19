import * as Linking from "expo-linking";
import { render, screen, userEvent } from "@testing-library/react-native";
import { afterEach, describe, expect, it, vi } from "vitest";

import { LegalLinks } from "./legal-links";

vi.mock("expo-linking", () => ({ openURL: vi.fn(() => Promise.resolve(true)) }));

describe("LegalLinks", () => {
	afterEach(() => vi.clearAllMocks());

	it("opens the public privacy notice", async () => {
		await render(<LegalLinks />);

		await userEvent.press(screen.getByRole("link", { name: "Aviso de privacidad" }));

		expect(Linking.openURL).toHaveBeenCalledWith(
			"https://cuentasconmigo.tuentyfaiv.com/privacidad"
		);
	});

	it("shows only the pages asked for", async () => {
		await render(<LegalLinks pages={["support", "terms"]} />);

		expect(screen.getAllByRole("link")).toHaveLength(2);
		expect(screen.getByRole("link", { name: "Ayuda" })).toBeOnTheScreen();
		expect(screen.getByRole("link", { name: "Términos de uso" })).toBeOnTheScreen();
		expect(screen.queryByRole("link", { name: "Aviso de privacidad" })).not.toBeOnTheScreen();
	});
});
