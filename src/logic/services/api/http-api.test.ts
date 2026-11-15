import { describe, expect, it, vi } from "vitest";

import { ApiError } from "./api.types";
import { basicAuth, createHttpApi, NetworkError } from "./http-api";

const json = (status: number, body?: unknown) =>
	new Response(body === undefined ? null : JSON.stringify(body), {
		status,
		headers: { "Content-Type": "application/json" },
	});

const rosa = { id: "s-1", name: "Rosa Martínez", phone: "5500000001" };
const session = { name: "María González", role: "instructor", workshopId: "w-tejido" };
const payment = {
	id: "pay-1",
	workshopId: "w-tejido",
	studentId: "s-1",
	optionId: "custom",
	method: "qr",
	amount: 1,
	concept: "Otro cobro",
	status: "pending",
	folio: "A-0001",
	createdAt: "2026-11-15T12:00:00Z",
};

function setup(...responses: Response[]) {
	const queue = [...responses];
	const fetchMock = vi.fn((_url: RequestInfo | URL, _init?: RequestInit) =>
		Promise.resolve(queue.length > 1 ? (queue.shift() as Response) : (queue[0] as Response).clone())
	);
	const api = createHttpApi("https://demo.example.com/", fetchMock as unknown as typeof fetch, {
		timeoutMs: 50,
	});
	const authorization = (index: number) =>
		new Headers(fetchMock.mock.calls[index]?.[1]?.headers).get("Authorization");
	const call = () => {
		const [url, init] = fetchMock.mock.calls[0] ?? [];
		return {
			url: String(url),
			method: init?.method,
			body: init?.body ? JSON.parse(String(init.body)) : undefined,
		};
	};
	return { api, call, authorization };
}

describe("basicAuth", () => {
	it("encodes the login as UTF-8 Basic credentials", () => {
		expect(basicAuth({ usuario: " maria ", clave: "ñandú" })).toBe("Basic bWFyaWE6w7FhbmTDug==");
	});
});

describe("createHttpApi sign-in", () => {
	it("checks the login and then sends it with every request until sign-out", async () => {
		const { api, call, authorization } = setup(
			json(200, session),
			json(200, [{ student: rosa, status: "paid" }])
		);
		const login = { usuario: "maria", clave: "secreta" };

		await api.signIn(login);
		await api.getRoster("w-tejido");
		api.signOut();
		await api.getRoster("w-tejido");

		expect(call()).toMatchObject({
			url: "https://demo.example.com/v1/sesion",
			method: "POST",
			body: login,
		});
		expect(authorization(0)).toBe(basicAuth(login));
		expect(authorization(1)).toBe(basicAuth(login));
		expect(authorization(2)).toBeNull();
	});

	it("keeps no login when the backend refuses it", async () => {
		const { api, authorization } = setup(json(401, { code: "unauthorized", message: "bad login" }));

		await expect(api.signIn({ usuario: "maria", clave: "mala" })).rejects.toMatchObject({
			code: "unauthorized",
		});
		await api.getRoster("w-tejido").catch(() => undefined);

		expect(authorization(1)).toBeNull();
	});
});

describe("createHttpApi", () => {
	it("reads the roster from the workshop path", async () => {
		const { api, call } = setup(json(200, [{ student: rosa, status: "paid" }]));

		await expect(api.getRoster("w-tejido")).resolves.toEqual([{ student: rosa, status: "paid" }]);
		expect(call()).toEqual({
			url: "https://demo.example.com/v1/talleres/w-tejido/alumnos",
			method: "GET",
			body: undefined,
		});
	});

	it("posts a payment with the contract's body", async () => {
		const { api, call } = setup(json(201, payment));
		const input = {
			workshopId: "w-tejido",
			studentId: "s-1",
			optionId: "custom",
			method: "qr" as const,
			amount: 1,
			concept: "Otro cobro",
		};

		await api.startPayment(input);

		expect(call()).toEqual({
			url: "https://demo.example.com/v1/pagos/cobrar",
			method: "POST",
			body: input,
		});
	});

	it("handles 204 replies", async () => {
		const { api, call } = setup(json(204));

		await expect(api.approve("w-tejido", "s-5")).resolves.toBeUndefined();
		expect(call().url).toBe("https://demo.example.com/v1/talleres/w-tejido/alumnos/s-5/aprobar");
	});

	it("unwraps the enrollment code and encodes path segments", async () => {
		const { api, call } = setup(json(200, { code: "TEJIDO-2026" }));

		await expect(api.getEnrollmentCode("w tejido")).resolves.toBe("TEJIDO-2026");
		expect(call().url).toBe("https://demo.example.com/v1/talleres/w%20tejido/codigo");
	});

	it("maps contract error codes to ApiError", async () => {
		const { api } = setup(json(409, { code: "duplicate-phone", message: "taken" }));

		await expect(
			api.addStudent("w-tejido", { name: "Inés", phone: "5512345678", photoConsent: false })
		).rejects.toEqual(expect.objectContaining({ code: "duplicate-phone" }));
	});

	it("refuses a reply that does not match its schema", async () => {
		const { api } = setup(json(200, { id: 11, name: "Rosa" }));

		const failure = api.getStudent("s-1");

		await expect(failure).rejects.toBeInstanceOf(NetworkError);
		await expect(failure).rejects.toThrow("Invalid reply: GET /alumnos/s-1");
	});

	it("turns other failures into a NetworkError", async () => {
		const { api } = setup(json(500, { code: "boom", message: "db down" }));

		const failure = api.getStudent("s-1");

		await expect(failure).rejects.toBeInstanceOf(NetworkError);
		await expect(failure).rejects.not.toBeInstanceOf(ApiError);
	});

	it("gives up after the timeout", async () => {
		const fetchMock = vi.fn(
			(_url: RequestInfo | URL, init?: RequestInit) =>
				new Promise<Response>((_resolve, reject) => {
					init?.signal?.addEventListener("abort", () => reject(init.signal?.reason));
				})
		);
		const api = createHttpApi("https://demo.example.com", fetchMock as unknown as typeof fetch, {
			timeoutMs: 20,
		});

		await expect(api.getPayment("pay-1")).rejects.toThrow("Timed out: GET /pagos/pay-1");
	});
});
