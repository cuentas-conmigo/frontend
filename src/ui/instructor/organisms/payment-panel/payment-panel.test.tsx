import { render, screen } from "@testing-library/react-native";
import { describe, expect, it } from "vitest";

import type { Payment } from "~typing/charges";

import { PaymentPanel } from "./payment-panel";

const base: Payment = {
	id: "pay-A-0142",
	workshopId: "w-tejido",
	studentId: "s-1",
	optionId: "monthly-2026-12",
	method: "qr",
	amount: 130,
	concept: "Diciembre",
	status: "pending",
	folio: "A-0142",
	createdAt: "2026-11-14T18:00:00Z",
	qrString: "DEMO-NO-ES-CODI|A-0142|130",
};

describe("PaymentPanel", () => {
	it("shows the QR, the cube hint and the wait for a CoDi QR", async () => {
		await render(<PaymentPanel payment={base} />);

		expect(screen.getByRole("img", { name: "Código de ejemplo, no es CoDi" })).toBeOnTheScreen();
		expect(screen.getByText("También puede acercar su celular al cubo.")).toBeOnTheScreen();
		expect(screen.getByText("Esperando el pago…")).toBeOnTheScreen();
	});

	it("names a real CoDi code as such", async () => {
		await render(
			<PaymentPanel payment={{ ...base, qrString: "00020101021226850014MX.ORG.CODI" }} />
		);

		expect(screen.getByRole("img", { name: "Código CoDi para pagar" })).toBeOnTheScreen();
	});

	it("only shows the wait when the helper pays", async () => {
		await render(<PaymentPanel payment={{ ...base, method: "helper", qrString: undefined }} />);

		expect(screen.queryByTestId("qr-code")).toBeNull();
		expect(screen.getByText("Esperando el pago…")).toBeOnTheScreen();
	});
});
