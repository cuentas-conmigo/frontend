import { render, screen } from "@testing-library/react-native";
import { describe, expect, it } from "vitest";

import { InfoCard } from "./info-card";

describe("InfoCard", () => {
	it("reads each label with its value", async () => {
		await render(
			<InfoCard title="Comprobante de pago" lines={[{ label: "Folio", value: "A-0142" }]} />
		);

		expect(screen.getByRole("heading", { name: "Comprobante de pago" })).toBeOnTheScreen();
		expect(screen.getByLabelText("Folio: A-0142")).toBeOnTheScreen();
	});
});
