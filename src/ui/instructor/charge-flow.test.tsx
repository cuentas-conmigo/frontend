import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, userEvent, waitFor } from "@testing-library/react-native";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { SessionProvider } from "~contexts/session";

import PayScreen from "../../app/(instructor)/cobrar/[studentId]/pago";

const navigation = vi.hoisted(() => ({
	params: {} as Record<string, string>,
	router: {
		replace: vi.fn(),
		push: vi.fn(),
		back: vi.fn(),
		canGoBack: vi.fn(() => true),
		dismissTo: vi.fn(),
	},
}));

vi.mock("expo-router", () => ({
	useRouter: () => navigation.router,
	useLocalSearchParams: () => navigation.params,
}));
vi.mock("expo-speech", () => ({ speak: vi.fn(), stop: vi.fn(() => Promise.resolve()) }));
vi.mock("expo-haptics", () => ({
	notificationAsync: vi.fn(() => Promise.resolve()),
	NotificationFeedbackType: { Success: "success", Error: "error" },
}));
vi.mock("~services/api", async () => {
	const actual =
		await vi.importActual<typeof import("~services/api/mock-api")>("~services/api/mock-api");
	const types =
		await vi.importActual<typeof import("~services/api/api.types")>("~services/api/api.types");
	return { ...types, api: actual.createMockApi({ latencyMs: 0, settleAfterMs: 60_000 }) };
});

/** Renders step 3 for a student, as the router would with `/cobrar/{studentId}/pago?cobro=…`. */
async function openPayment(studentId: string) {
	navigation.params = { studentId, cobro: "monthly-2026-12" };
	const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
	await render(
		<QueryClientProvider client={client}>
			<SessionProvider
				initial={{ name: "María González", role: "instructor", workshopId: "w-tejido" }}
			>
				<PayScreen />
			</SessionProvider>
		</QueryClientProvider>
	);
	await screen.findByRole("img", { name: "Código de ejemplo, no es CoDi" });
}

beforeEach(() => {
	vi.clearAllMocks();
});

describe("Charge step 3", () => {
	it("opens on the QR and offers cash and the helper as second choices", async () => {
		await openPayment("s-1");

		expect(screen.getByText("Paso 3 de 3")).toBeOnTheScreen();
		expect(screen.getByRole("button", { name: "Pagó en efectivo" })).toBeOnTheScreen();
		expect(screen.getByRole("button", { name: "Mejor avisarle a Lucía" })).toBeOnTheScreen();
	});

	it("switches to cash, can go back to the QR, and records the cash payment", async () => {
		await openPayment("s-1");

		await userEvent.press(screen.getByRole("button", { name: "Pagó en efectivo" }));
		expect(screen.getByRole("heading", { name: "¿Ya te dio $130?" })).toBeOnTheScreen();

		await userEvent.press(screen.getByRole("button", { name: "Volver al código" }));
		expect(screen.getByRole("heading", { name: "Que escanee el código" })).toBeOnTheScreen();

		await userEvent.press(screen.getByRole("button", { name: "Pagó en efectivo" }));
		await userEvent.press(screen.getByRole("button", { name: "Sí, ya me pagó" }));

		await waitFor(() =>
			expect(navigation.router.replace).toHaveBeenCalledWith({
				pathname: "/cobrar/[studentId]/listo",
				params: { studentId: "s-1", paymentId: expect.any(String) },
			})
		);
	});

	it("notifies the helper without leaving the step", async () => {
		await openPayment("s-1");

		await userEvent.press(screen.getByRole("button", { name: "Mejor avisarle a Lucía" }));

		expect(await screen.findByRole("heading", { name: "Le avisamos a Lucía" })).toBeOnTheScreen();
		expect(screen.getByText("Paso 3 de 3")).toBeOnTheScreen();
		expect(navigation.router.replace).not.toHaveBeenCalled();
	});

	it("hides the helper choice when the student has none", async () => {
		await openPayment("s-2");

		expect(screen.queryByRole("button", { name: /Mejor avisarle/ })).toBeNull();
	});
});
