import { AccessibilityInfo } from "react-native";
import * as Haptics from "expo-haptics";
import { renderHook } from "@testing-library/react-native";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { PreferencesProvider } from "~contexts/preferences";

import type { ReactNode } from "react";

import { useFeedback } from "./use-feedback";

vi.mock("expo-haptics", () => ({
	notificationAsync: vi.fn(() => Promise.resolve()),
	NotificationFeedbackType: { Success: "success", Error: "error" },
}));

const announce = vi
	.spyOn(AccessibilityInfo, "announceForAccessibility")
	.mockImplementation(() => undefined);
const vibrate = vi.mocked(Haptics.notificationAsync);

const withFeedback = (feedback: boolean) =>
	function Wrapper({ children }: { children: ReactNode }) {
		return <PreferencesProvider initial={{ feedback }}>{children}</PreferencesProvider>;
	};

beforeEach(() => vi.clearAllMocks());

describe("useFeedback", () => {
	it("announces and vibrates when sound and vibration are on", async () => {
		const { result } = await renderHook(() => useFeedback(), { wrapper: withFeedback(true) });

		result.current.success("Ya pagó");

		expect(announce).toHaveBeenCalledWith("Ya pagó");
		expect(vibrate).toHaveBeenCalledWith("success");
	});

	it("still announces but does not vibrate when the person turned it off", async () => {
		const { result } = await renderHook(() => useFeedback(), { wrapper: withFeedback(false) });

		result.current.error("No se pudo");

		expect(announce).toHaveBeenCalledWith("No se pudo");
		expect(vibrate).not.toHaveBeenCalled();
	});
});
