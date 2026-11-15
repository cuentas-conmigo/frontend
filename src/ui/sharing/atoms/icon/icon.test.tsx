import { render, screen } from "@testing-library/react-native";
import { describe, expect, it } from "vitest";

import { Icon } from "./icon";

describe("Icon", () => {
	it("stays out of the accessibility tree", async () => {
		await render(<Icon name="qrcode" />);

		expect(screen.getByTestId("icon-qrcode", { includeHiddenElements: true })).not.toBeVisible();
	});
});
