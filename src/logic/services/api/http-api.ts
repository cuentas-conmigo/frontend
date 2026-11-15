import { bare, Http, ServiceError } from "fetchzen";
import { z } from "zod/mini";

import type { StartPayment } from "~typing/charges";
import type { Credentials, NewStudent } from "~typing/students";
import type { Api } from "./api.types";

import { CardSchema } from "~schemas/card";
import { PaymentSchema } from "~schemas/payments";
import { SessionSchema } from "~schemas/session";
import { StudentSchema } from "~schemas/students";
import { WorkshopSchema } from "~schemas/workshops";
import { ApiError } from "./api.types";

type Fetch = typeof fetch;

const knownCodes = new Set<string>([
	"unauthorized",
	"not-found",
	"duplicate-phone",
	"invalid-code",
	"already-joined",
]);

const RosterSchema = z.array(WorkshopSchema.RosterEntry);
const ReviewSchema = z.array(WorkshopSchema.ReviewEntry);
const ChargeOptionsSchema = z.array(PaymentSchema.ChargeOption);
const CardsSchema = z.array(CardSchema.Workshop);

/** A failure that is not one of the contract's codes: network, timeout, invalid reply or server error. */
export class NetworkError extends Error {
	constructor(
		message: string,
		readonly status?: number
	) {
		super(message);
		this.name = "NetworkError";
	}
}

interface HttpOptions {
	timeoutMs?: number;
}

/** `Authorization: Basic` value for a tallerista login, UTF-8 safe. */
export function basicAuth({ usuario, clave }: Credentials): string {
	const bytes = new TextEncoder().encode(`${usuario.trim()}:${clave}`);
	let binary = "";
	for (const byte of bytes) binary += String.fromCharCode(byte);
	return `Basic ${btoa(binary)}`;
}

/**
 * Turns whatever FetchZen threw into the two errors screens understand. The backend's `{ code }`
 * arrives in `ServiceError.status` (API fields override the HTTP status) or in `code`.
 */
function toFailure(error: unknown, method: string, path: string): Error {
	if (error instanceof ServiceError) {
		const code = [error.code, error.status].find(
			(value): value is ApiError["code"] => typeof value === "string" && knownCodes.has(value)
		);
		if (code) return new ApiError(code, error.message);
		const status = error.response?.status;
		if (error.code === "ERR_SCHEMA")
			return new NetworkError(`Invalid reply: ${method} ${path}`, status);
		return new NetworkError(error.message || `HTTP ${status ?? "?"}: ${method} ${path}`, status);
	}
	if (error instanceof Error && (error.name === "TimeoutError" || error.name === "AbortError")) {
		return new NetworkError(`Timed out: ${method} ${path}`);
	}
	return new NetworkError(error instanceof Error ? error.message : String(error));
}

/** The backend over HTTP (FetchZen), following docs/api.md; every reply is checked against its schema. */
export function createHttpApi(
	baseUrl: string,
	fetchImpl: Fetch = fetch,
	{ timeoutMs = 10_000 }: HttpOptions = {}
): Api {
	let authorization: string | undefined;

	const client = Http.create(`${baseUrl.replace(/\/+$/, "")}/v1`, {
		cache: false,
		preset: bare,
		timeout: timeoutMs,
		fetch: (input, init) => fetchImpl(input, init),
		hooks: {
			request: [
				({ url, init }) => {
					if (authorization && !init.headers.has("Authorization"))
						init.headers.set("Authorization", authorization);
					return { url, init };
				},
			],
		},
	});

	const call = async <T>(method: string, path: string, run: () => Promise<T>): Promise<T> => {
		try {
			return await run();
		} catch (error) {
			throw toFailure(error, method, path);
		}
	};

	const id = encodeURIComponent;
	const workshop = (workshopId: string) => `/talleres/${id(workshopId)}`;
	const student = (studentId: string) => `/alumnos/${id(studentId)}`;

	const get = <S extends z.ZodMiniType>(path: string, schema: S) =>
		call("GET", path, () => client.get(path, { schema }));
	const post = <S extends z.ZodMiniType>(path: string, body: unknown, schema: S) =>
		call("POST", path, () => client.post(path, body, { schema }));
	const postEmpty = (path: string) =>
		call("POST", path, async () => {
			await client.post(path, undefined);
		});

	return {
		signIn: async (credentials: Credentials) => {
			const header = basicAuth(credentials);
			const session = await call("POST", "/sesion", () =>
				client.post("/sesion", credentials, {
					schema: SessionSchema.Session,
					headers: { Authorization: header },
				})
			);
			authorization = header;
			return session;
		},
		signOut: () => {
			authorization = undefined;
		},
		getWorkshop: (workshopId) => get(workshop(workshopId), WorkshopSchema.Workshop),
		getRoster: (workshopId) => get(`${workshop(workshopId)}/alumnos`, RosterSchema),
		getStudent: (studentId) => get(student(studentId), StudentSchema.Profile),
		getChargeOptions: (workshopId) => get(`${workshop(workshopId)}/cobros`, ChargeOptionsSchema),
		startPayment: (input: StartPayment) => post("/pagos/cobrar", input, PaymentSchema.Payment),
		getPayment: (paymentId) => get(`/pagos/${id(paymentId)}`, PaymentSchema.Payment),
		getCard: (studentId) => get(`${student(studentId)}/tarjeta`, CardsSchema),
		getReviewList: (workshopId) => get(`${workshop(workshopId)}/solicitudes`, ReviewSchema),
		approve: (workshopId, studentId) =>
			postEmpty(`${workshop(workshopId)}/alumnos/${id(studentId)}/aprobar`),
		release: (workshopId, studentId) =>
			postEmpty(`${workshop(workshopId)}/alumnos/${id(studentId)}/baja`),
		addStudent: (workshopId, input: NewStudent) =>
			post(`${workshop(workshopId)}/alumnos`, input, StudentSchema.Profile),
		getEnrollmentCode: async (workshopId) =>
			(await get(`${workshop(workshopId)}/codigo`, WorkshopSchema.Code)).code,
		rotateEnrollmentCode: async (workshopId) =>
			(await post(`${workshop(workshopId)}/codigo`, undefined, WorkshopSchema.Code)).code,
		joinWorkshop: (studentId, code) =>
			post(`${student(studentId)}/unirse`, { code }, WorkshopSchema.Workshop),
		removePhoto: (studentId) =>
			call("DELETE", `${student(studentId)}/foto`, () =>
				client.delete(`${student(studentId)}/foto`, undefined, { schema: StudentSchema.Profile })
			),
	};
}
