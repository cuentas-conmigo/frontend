import { fireEvent, render, screen } from "@testing-library/react-native";
import { describe, expect, it, vi } from "vitest";
import { themes } from "~styles/colors";

import { Touchable } from "./touchable";

describe("Touchable", () => {
	it("draws the focus ring only while focused", async () => {
		await render(<Touchable role="button" aria-label="Cobrar" onPress={vi.fn()} />);
		const button = screen.getByRole("button", { name: "Cobrar" });

		expect(button).not.toHaveStyle({ outlineColor: themes.light.ring });
		await fireEvent(button, "focus");
		expect(button).toHaveStyle({ outlineColor: themes.light.ring });
		await fireEvent(button, "blur");
		expect(button).not.toHaveStyle({ outlineColor: themes.light.ring });
	});
});
