import { render, screen, userEvent } from "@testing-library/react-native";
import { describe, expect, it } from "vitest";
import { useAppForm } from "~sharing/organisms/form";

function Harness() {
	const form = useAppForm({ defaultValues: { consent: false } });
	return (
		<form.AppField name="consent">
			{(field) => <field.ConsentField label="Dio permiso para usar su foto" />}
		</form.AppField>
	);
}

describe("FormConsentField", () => {
	it("is a checkbox that stores the answer", async () => {
		await render(<Harness />);
		const box = screen.getByRole("checkbox", { name: "Dio permiso para usar su foto" });

		expect(box).not.toBeChecked();
		await userEvent.press(box);

		expect(box).toBeChecked();
	});
});
