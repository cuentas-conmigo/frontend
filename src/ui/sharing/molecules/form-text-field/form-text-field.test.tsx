import { fireEvent, render, screen, userEvent } from "@testing-library/react-native";
import { describe, expect, it } from "vitest";
import { z } from "zod/mini";
import { useAppForm } from "~sharing/organisms/form";

const Schema = z.object({ name: z.string().check(z.minLength(1, "Escribe el nombre.")) });

function Harness() {
	const form = useAppForm({
		defaultValues: { name: "" },
		validators: { onBlur: Schema, onSubmit: Schema },
	});
	return <form.AppField name="name">{(field) => <field.TextField label="Nombre" />}</form.AppField>;
}

describe("FormTextField", () => {
	it("is named by its label and keeps what the person types", async () => {
		await render(<Harness />);

		await userEvent.type(screen.getByLabelText("Nombre"), "Inés");

		expect(screen.getByLabelText("Nombre")).toHaveDisplayValue("Inés");
	});

	it("waits until the person leaves the field to show the error, then speaks it with the label", async () => {
		await render(<Harness />);
		const input = screen.getByLabelText("Nombre");

		expect(screen.queryByText("Escribe el nombre.", { includeHiddenElements: true })).toBeNull();
		await fireEvent(input, "blur");

		expect(await screen.findByLabelText("Nombre. Escribe el nombre.")).toBeOnTheScreen();
	});
});
