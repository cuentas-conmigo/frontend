import { fireEvent, render, screen } from "@testing-library/react-native";
import { describe, expect, it } from "vitest";
import { useAppForm } from "~sharing/organisms/form";

import { phoneDigits } from "./form-phone-field";

function Harness() {
	const form = useAppForm({ defaultValues: { phone: "" } });
	return (
		<form.AppField name="phone">{(field) => <field.PhoneField label="WhatsApp" />}</form.AppField>
	);
}

describe("FormPhoneField", () => {
	it("keeps only ten digits", () => {
		expect(phoneDigits("55 1234-5678 99")).toBe("5512345678");
	});

	it("stores digits only and uses the phone keypad", async () => {
		await render(<Harness />);
		const input = screen.getByLabelText("WhatsApp");

		await fireEvent.changeText(input, "(55) 1234 5678");

		expect(input).toHaveDisplayValue("5512345678");
		expect(input.props.keyboardType).toBe("phone-pad");
	});
});
