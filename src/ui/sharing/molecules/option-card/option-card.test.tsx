import { render, screen, userEvent } from "@testing-library/react-native";
import { describe, expect, it, vi } from "vitest";

import { OptionCard } from "./option-card";

describe("OptionCard", () => {
	it("is one button named by its label and detail", async () => {
		await render(
			<OptionCard
				icon="qrcode"
				label="Con su celular"
				detail="Le muestras un código QR"
				onPress={vi.fn()}
			/>
		);

		expect(
			screen.getByRole("button", { name: "Con su celular, Le muestras un código QR" })
		).toBeOnTheScreen();
	});

	it("uses only the label when there is no detail", async () => {
		await render(<OptionCard icon="cash" label="En efectivo" onPress={vi.fn()} />);

		expect(screen.getByRole("button", { name: "En efectivo" })).toBeOnTheScreen();
	});

	it("reports the tap", async () => {
		const onPress = vi.fn();
		await render(<OptionCard icon="cash" label="En efectivo" onPress={onPress} />);

		await userEvent.press(screen.getByRole("button", { name: "En efectivo" }));

		expect(onPress).toHaveBeenCalledTimes(1);
	});
});
