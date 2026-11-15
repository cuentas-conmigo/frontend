import { AccessibilityInfo } from "react-native";
import { render, screen, userEvent } from "@testing-library/react-native";
import { describe, expect, it, vi } from "vitest";
import { useAppForm } from "~sharing/organisms/form";

import type { NewStudentInput } from "~typing/schemas/students";

const blank: NewStudentInput = { name: "", phone: "", helperPhone: "", photoConsent: false };

import { StudentSchema } from "~schemas/students";

function Harness() {
	const form = useAppForm({
		defaultValues: blank,
		validators: { onSubmit: StudentSchema.New },
	});
	return (
		<form.AppForm>
			<form.ErrorSummary />
			<form.Submit label="Inscribir" />
		</form.AppForm>
	);
}

describe("FormErrorSummary", () => {
	it("stays hidden until the person tries to submit", async () => {
		await render(<Harness />);

		expect(screen.queryByText(/Falta corregir/)).toBeNull();
	});

	it("counts the fields to fix and announces it", async () => {
		const announce = vi
			.spyOn(AccessibilityInfo, "announceForAccessibility")
			.mockImplementation(() => undefined);
		await render(<Harness />);

		await userEvent.press(screen.getByRole("button", { name: "Inscribir" }));

		expect(await screen.findByText("Falta corregir 2 datos.")).toBeOnTheScreen();
		expect(announce).toHaveBeenCalledWith("Falta corregir 2 datos.");
	});
});
