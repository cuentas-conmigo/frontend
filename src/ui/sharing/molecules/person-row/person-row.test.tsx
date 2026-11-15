import { render, screen, userEvent } from "@testing-library/react-native";
import { describe, expect, it, vi } from "vitest";

import type { StudentProfile } from "~typing/students";

import { PersonRow } from "./person-row";

const rosa: StudentProfile = { id: "s-1", name: "Rosa Martínez", phone: "5500000001" };

describe("PersonRow", () => {
	it("announces the name together with the payment status", async () => {
		await render(<PersonRow student={rosa} status="pending" onPress={vi.fn()} />);

		expect(screen.getByRole("button", { name: "Rosa Martínez, Falta pagar" })).toBeOnTheScreen();
	});

	it("reports the student when tapped", async () => {
		const onPress = vi.fn();
		await render(<PersonRow student={rosa} status="pending" onPress={onPress} />);

		await userEvent.press(screen.getByRole("button"));

		expect(onPress).toHaveBeenCalledWith(rosa);
	});

	it("keeps the payment status private when none is given", async () => {
		await render(<PersonRow student={rosa} onPress={vi.fn()} />);

		expect(screen.getByRole("button", { name: "Rosa Martínez" })).toBeOnTheScreen();
		expect(screen.queryByText("Falta pagar")).toBeNull();
	});

	it("is a plain, labelled group when it cannot be tapped", async () => {
		await render(<PersonRow student={rosa} detail="Pidió lugar" />);

		expect(screen.queryByRole("button")).toBeNull();
		expect(screen.getByLabelText("Rosa Martínez, Pidió lugar")).toBeOnTheScreen();
	});

	it("offers a separate, clearly named action button", async () => {
		const onRelease = vi.fn();
		await render(
			<PersonRow
				student={rosa}
				action={{
					label: "Baja",
					accessibleLabel: "Dar de baja a Rosa Martínez",
					onPress: onRelease,
				}}
			/>
		);

		await userEvent.press(screen.getByRole("button", { name: "Dar de baja a Rosa Martínez" }));

		expect(onRelease).toHaveBeenCalledWith(rosa);
		expect(screen.getAllByRole("button")).toHaveLength(1);
	});
});
