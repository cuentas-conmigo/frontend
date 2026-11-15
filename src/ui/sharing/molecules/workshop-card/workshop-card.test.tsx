import { render, screen, userEvent } from "@testing-library/react-native";
import { describe, expect, it, vi } from "vitest";

import { WorkshopCard } from "./workshop-card";

describe("WorkshopCard", () => {
	it("reads name, teacher, current charge and its status as one button", async () => {
		await render(
			<WorkshopCard
				name="Taller de tejido"
				detail="María González · Martes y jueves, 10:00"
				dueLabel="Diciembre · $130"
				status="pending"
			/>
		);

		expect(
			screen.getByRole("button", {
				name: "Taller de tejido, María González · Martes y jueves, 10:00, Diciembre · $130, Falta pagar",
			})
		).toBeOnTheScreen();
	});

	it("leaves out the charge when there is none this month", async () => {
		await render(<WorkshopCard name="Yoga en silla" detail="Laura Pérez" />);

		expect(screen.getByRole("button", { name: "Yoga en silla, Laura Pérez" })).toBeOnTheScreen();
		expect(screen.queryByText("Falta pagar")).toBeNull();
	});

	it("reports the tap", async () => {
		const onPress = vi.fn();
		await render(<WorkshopCard name="Yoga en silla" detail="Laura Pérez" onPress={onPress} />);

		await userEvent.press(screen.getByRole("button"));

		expect(onPress).toHaveBeenCalledTimes(1);
	});
});
