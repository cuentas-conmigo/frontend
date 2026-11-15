import { render, screen, userEvent } from "@testing-library/react-native";
import { describe, expect, it, vi } from "vitest";
import { useAppForm } from "~sharing/organisms/form";

function Harness({ onSubmit }: { onSubmit: (value: { name: string }) => Promise<void> }) {
	const form = useAppForm({
		defaultValues: { name: "Inés" },
		onSubmit: ({ value }) => onSubmit(value),
	});
	return (
		<form.AppForm>
			<form.Submit label="Inscribir" variant="success" />
		</form.AppForm>
	);
}

describe("FormSubmit", () => {
	it("submits the form's values", async () => {
		const onSubmit = vi.fn(() => Promise.resolve());
		await render(<Harness onSubmit={onSubmit} />);

		await userEvent.press(screen.getByRole("button", { name: "Inscribir" }));

		expect(onSubmit).toHaveBeenCalledWith({ name: "Inés" });
	});

	it("is announced as busy while the form submits", async () => {
		let finish: () => void = () => undefined;
		const onSubmit = () =>
			new Promise<void>((resolve) => {
				finish = resolve;
			});
		await render(<Harness onSubmit={onSubmit} />);

		await userEvent.press(screen.getByRole("button", { name: "Inscribir" }));

		expect(screen.getByRole("button", { name: "Inscribir" })).toBeBusy();
		finish();
	});
});
