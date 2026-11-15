import * as Speech from "expo-speech";
import { act, renderHook } from "@testing-library/react-native";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { useSpeech } from "./use-speech";

vi.mock("expo-speech", () => ({
	speak: vi.fn(),
	stop: vi.fn(() => Promise.resolve()),
}));

const speak = vi.mocked(Speech.speak);
const stop = vi.mocked(Speech.stop);

beforeEach(() => {
	vi.clearAllMocks();
});

describe("useSpeech", () => {
	it("speaks in Mexican Spanish at a slower rate", async () => {
		const { result } = await renderHook(() => useSpeech());

		await act(() => result.current.toggle("Paso 1 de 4"));

		expect(speak).toHaveBeenCalledWith(
			"Paso 1 de 4",
			expect.objectContaining({ language: "es-MX", rate: 0.9 })
		);
		expect(result.current.speaking).toBe(true);
	});

	it("stops instead of queueing when toggled while speaking", async () => {
		const { result } = await renderHook(() => useSpeech());

		await act(() => result.current.toggle("Hola"));
		await act(() => result.current.toggle("Hola"));

		expect(speak).toHaveBeenCalledTimes(1);
		expect(stop).toHaveBeenCalledTimes(1);
		expect(result.current.speaking).toBe(false);
	});

	it("resets when the voice finishes", async () => {
		const { result } = await renderHook(() => useSpeech());

		await act(() => result.current.toggle("Hola"));
		const options = speak.mock.calls[0]?.[1];
		await act(() => options?.onDone?.());

		expect(result.current.speaking).toBe(false);
	});

	it("stops talking when the screen unmounts", async () => {
		const { unmount } = await renderHook(() => useSpeech());

		await unmount();

		expect(stop).toHaveBeenCalled();
	});
});
