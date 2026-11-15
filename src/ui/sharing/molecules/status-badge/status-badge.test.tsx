import { StyleSheet } from "react-native";
import { render, screen } from "@testing-library/react-native";
import { describe, expect, it } from "vitest";

import { StatusBadge } from "./status-badge";

describe("StatusBadge", () => {
	it("says in words that the person paid", async () => {
		await render(<StatusBadge status="paid" />);

		expect(screen.getByText("Ya pagó")).toBeOnTheScreen();
	});

	it("says in words that the payment is missing", async () => {
		await render(<StatusBadge status="pending" />);

		expect(screen.getByText("Falta pagar")).toBeOnTheScreen();
	});

	it("uses a different border style per status so color is never the only cue", async () => {
		await render(<StatusBadge status="paid" />);
		const paid = StyleSheet.flatten(screen.getByTestId("status-paid").props.style);

		await render(<StatusBadge status="pending" />);
		const pending = StyleSheet.flatten(screen.getByTestId("status-pending").props.style);

		expect(paid.borderStyle).not.toBe(pending.borderStyle);
	});

	it("keeps the glyph out of what screen readers announce", async () => {
		await render(<StatusBadge status="paid" />);

		expect(screen.queryByText("✓")).toBeNull();
	});
});
