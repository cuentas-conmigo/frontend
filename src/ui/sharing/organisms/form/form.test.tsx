import { fireEvent, render, screen, userEvent, waitFor } from "@testing-library/react-native";
import { describe, expect, it, vi } from "vitest";
import { z } from "zod/mini";
import { submitForm, useAppForm } from "~sharing/organisms/form";

const Schema = z.object({
	usuario: z.string().check(z.minLength(1, "Escribe tu usuario.")),
	clave: z.string().check(z.minLength(1, "Escribe tu contraseña.")),
});

function SignInHarness({ onSubmit }: { onSubmit: (value: z.infer<typeof Schema>) => void }) {
	const form = useAppForm({
		defaultValues: { usuario: "", clave: "" },
		validators: { onBlur: Schema, onSubmit: Schema },
		onSubmit: ({ value }) => onSubmit(value),
	});
	return (
		<>
			<form.AppField name="usuario">{(field) => <field.TextField label="Usuario" />}</form.AppField>
			<form.AppField name="clave">
				{(field) => (
					<field.PasswordField label="Contraseña" onSubmitEditing={() => submitForm(form)} />
				)}
			</form.AppField>
			<form.AppForm>
				<form.Submit label="Continuar" />
			</form.AppForm>
		</>
	);
}

/** Types into the user field and leaves it while the password is still empty, as a person does. */
async function fillLikeAPerson() {
	const usuario = screen.getByLabelText("Usuario");
	await fireEvent.changeText(usuario, "maria");
	await fireEvent(usuario, "blur");
	await fireEvent.changeText(screen.getByLabelText(/^Contraseña/), "secreta");
}

describe("App forms", () => {
	it("submit with the button right after typing the last field, without leaving it first", async () => {
		const onSubmit = vi.fn();
		await render(<SignInHarness onSubmit={onSubmit} />);

		await fillLikeAPerson();
		await userEvent.press(screen.getByRole("button", { name: "Continuar" }));

		await waitFor(() =>
			expect(onSubmit).toHaveBeenCalledWith({ usuario: "maria", clave: "secreta" })
		);
	});

	it("submit with the keyboard's send key from the last field", async () => {
		const onSubmit = vi.fn();
		await render(<SignInHarness onSubmit={onSubmit} />);

		await fillLikeAPerson();
		await fireEvent(screen.getByLabelText(/^Contraseña/), "submitEditing");

		await waitFor(() =>
			expect(onSubmit).toHaveBeenCalledWith({ usuario: "maria", clave: "secreta" })
		);
	});
});
