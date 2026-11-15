import { render, screen } from "@testing-library/react-native";
import { describe, expect, it } from "vitest";

import { Avatar } from "./avatar";

const consentedPhoto = {
	uri: "https://example.com/rosa.jpg",
	grantedBy: "Rosa Martínez",
	grantedAt: "2026-11-14T10:00:00-06:00",
};

describe("Avatar", () => {
	it("shows a silhouette with the initial when there is no consented photo", async () => {
		await render(<Avatar name="rosa Martínez" />);

		expect(screen.getByText("R", { includeHiddenElements: true })).toBeOnTheScreen();
		expect(screen.queryByTestId("avatar-photo", { includeHiddenElements: true })).toBeNull();
	});

	it("shows the photo when consent was recorded", async () => {
		await render(<Avatar name="Rosa Martínez" photo={consentedPhoto} />);

		expect(screen.getByTestId("avatar-photo", { includeHiddenElements: true })).toBeOnTheScreen();
		expect(screen.queryByText("R", { includeHiddenElements: true })).toBeNull();
	});

	it("stays out of the accessibility tree because the name is shown beside it", async () => {
		await render(<Avatar name="Rosa Martínez" />);

		expect(screen.getByTestId("avatar", { includeHiddenElements: true })).not.toBeVisible();
		expect(screen.queryByText("R")).toBeNull();
	});
});
