import { render, screen } from "@testing-library/react-native";
import { describe, expect, it } from "vitest";
import { useAppForm } from "~sharing/organisms/form";

function Harness() {
	const form = useAppForm({ defaultValues: { clave: "" } });
	return (
		<form.AppField name="clave">
			{(field) => <field.PasswordField label="Contraseña" />}
		</form.AppField>
	);
}

describe("FormPasswordField", () => {
	it("hides what is typed and offers password autofill", async () => {
		await render(<Harness />);

		const input = screen.getByLabelText("Contraseña");
		expect(input.props.secureTextEntry).toBe(true);
		expect(input.props.textContentType).toBe("password");
	});
});
