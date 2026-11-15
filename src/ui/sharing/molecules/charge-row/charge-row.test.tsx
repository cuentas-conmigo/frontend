import { render, screen } from "@testing-library/react-native";
import { describe, expect, it } from "vitest";

import { ChargeRow } from "./charge-row";

describe("ChargeRow", () => {
	it("is read as one sentence with amount, status and note", async () => {
		await render(
			<ChargeRow
				label="Noviembre"
				amount="$130"
				status="paid"
				note="Pagado el 5 nov 2026 · Folio A-0131"
			/>
		);

		expect(
			screen.getByLabelText("Noviembre, $130, Ya pagó, Pagado el 5 nov 2026 · Folio A-0131")
		).toBeOnTheScreen();
	});

	it("shows a pending charge without a note", async () => {
		await render(<ChargeRow label="Diciembre" amount="$130" status="pending" />);

		expect(screen.getByLabelText("Diciembre, $130, Falta pagar")).toBeOnTheScreen();
	});
});
