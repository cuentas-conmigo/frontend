import { render, screen, userEvent } from "@testing-library/react-native";
import { describe, expect, it, vi } from "vitest";
import { themes } from "~styles/colors";

import { ActionTile } from "./action-tile";

describe("ActionTile", () => {
	it("is one button named by its label and detail", async () => {
		const onPress = vi.fn();
		await render(
			<ActionTile icon="cash" label="Cobrar" detail="Cobrar a una persona" onPress={onPress} />
		);

		await userEvent.press(screen.getByRole("button", { name: "Cobrar, Cobrar a una persona" }));

		expect(onPress).toHaveBeenCalledTimes(1);
	});

	it("fills the accent tone with the accent token", async () => {
		await render(
			<ActionTile
				icon="account-plus"
				label="Inscripciones"
				detail="Nadie por revisar"
				tone="accent"
				onPress={vi.fn()}
			/>
		);

		expect(screen.getByRole("button")).toHaveStyle({ backgroundColor: themes.light.accent });
	});
});
