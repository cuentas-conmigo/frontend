import * as ImagePicker from "expo-image-picker";
import { render, screen, userEvent } from "@testing-library/react-native";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { PhotoCapture } from "./photo-capture";

vi.mock("expo-image-picker", () => ({
	requestCameraPermissionsAsync: vi.fn(),
	launchCameraAsync: vi.fn(),
	launchImageLibraryAsync: vi.fn(),
}));

const picker = vi.mocked(ImagePicker);

beforeEach(() => vi.clearAllMocks());

describe("PhotoCapture", () => {
	it("takes a photo with the camera when allowed", async () => {
		picker.requestCameraPermissionsAsync.mockResolvedValue({ granted: true } as never);
		picker.launchCameraAsync.mockResolvedValue({
			canceled: false,
			assets: [{ uri: "file:///foto.jpg" }],
		} as never);
		const onChange = vi.fn();
		await render(<PhotoCapture onChange={onChange} />);

		await userEvent.press(screen.getByRole("button", { name: "Tomar foto" }));

		expect(onChange).toHaveBeenCalledWith("file:///foto.jpg");
	});

	it("falls back to the gallery without camera permission", async () => {
		picker.requestCameraPermissionsAsync.mockResolvedValue({ granted: false } as never);
		picker.launchImageLibraryAsync.mockResolvedValue({
			canceled: false,
			assets: [{ uri: "file:///galeria.jpg" }],
		} as never);
		const onChange = vi.fn();
		await render(<PhotoCapture onChange={onChange} />);

		await userEvent.press(screen.getByRole("button", { name: "Tomar foto" }));

		expect(onChange).toHaveBeenCalledWith("file:///galeria.jpg");
	});

	it("explains when no picture could be taken", async () => {
		picker.requestCameraPermissionsAsync.mockResolvedValue({ granted: false } as never);
		picker.launchImageLibraryAsync.mockRejectedValue(new Error("no gallery"));
		await render(<PhotoCapture onChange={vi.fn()} />);

		await userEvent.press(screen.getByRole("button", { name: "Tomar foto" }));

		expect(await screen.findByRole("alert")).toHaveTextContent(
			/No se pudo abrir la cámara\. Puedes inscribir sin foto\./
		);
	});

	it("lets the instructor remove the photo before saving", async () => {
		const onChange = vi.fn();
		await render(<PhotoCapture uri="file:///foto.jpg" onChange={onChange} />);

		await userEvent.press(screen.getByRole("button", { name: "Quitar foto" }));

		expect(onChange).toHaveBeenCalledWith(undefined);
		expect(screen.getByRole("button", { name: "Tomar otra foto" })).toBeOnTheScreen();
	});
});
