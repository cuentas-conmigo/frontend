import { render, screen, userEvent } from "@testing-library/react-native";
import { describe, expect, it } from "vitest";
import { useAppForm } from "~sharing/organisms/form";

import { PaymentSchema } from "~schemas/payments";

function Harness() {
	const form = useAppForm({
		defaultValues: { amount: "" },
		validators: { onSubmit: PaymentSchema.Amount },
	});
	return (
		<>
			<form.AppField name="amount">{(field) => <field.AmountField />}</form.AppField>
			<form.AppForm>
				<form.Submit label="Continuar" />
			</form.AppForm>
		</>
	);
}

describe("FormAmountField", () => {
	it("explains an empty amount after the person tries to continue", async () => {
		await render(<Harness />);

		await userEvent.press(screen.getByRole("button", { name: "Continuar" }));

		expect(
			await screen.findByLabelText("Monto a cobrar, en pesos. Escribe un monto mayor a cero.")
		).toBeOnTheScreen();
	});
});
