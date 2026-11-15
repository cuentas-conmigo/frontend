import { Text } from "react-native";
import { render, screen, userEvent } from "@testing-library/react-native";
import { describe, expect, it, vi } from "vitest";

import { ListScreen } from "./list-screen";

vi.mock("expo-speech", () => ({ speak: vi.fn(), stop: vi.fn(() => Promise.resolve()) }));

const names = ["Rosa", "Ana", "Élida"];

describe("ListScreen", () => {
	it("renders the header, the rows and the actions", async () => {
		const onCancel = vi.fn();
		await render(
			<ListScreen
				step={1}
				title="¿Quién paga?"
				data={names}
				keyExtractor={(name) => name}
				renderItem={(name) => <Text>{name}</Text>}
				emptyText="Nadie"
				onCancel={onCancel}
			/>
		);

		expect(screen.getByRole("heading", { name: "¿Quién paga?" })).toBeOnTheScreen();
		expect(screen.getByText("Élida")).toBeOnTheScreen();
		await userEvent.press(screen.getByRole("button", { name: "Cancelar" }));
		expect(onCancel).toHaveBeenCalled();
	});

	it("says so when the list is empty", async () => {
		await render(
			<ListScreen
				title="Por revisar"
				data={[]}
				keyExtractor={(name: string) => name}
				renderItem={(name) => <Text>{name}</Text>}
				emptyText="Nadie está esperando."
			/>
		);

		expect(screen.getByText("Nadie está esperando.")).toBeOnTheScreen();
	});

	it("says it is loading while the data is on its way", async () => {
		await render(
			<ListScreen
				title="Alumnos"
				loading
				data={undefined}
				keyExtractor={(name: string) => name}
				renderItem={(name) => <Text>{name}</Text>}
				emptyText="Nadie"
			/>
		);

		expect(screen.getByText("Cargando…")).toBeOnTheScreen();
	});
});
