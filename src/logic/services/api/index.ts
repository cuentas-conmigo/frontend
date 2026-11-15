import { createHttpApi } from "./http-api";
import { createMockApi } from "./mock-api";

export type { Api, CardWorkshop } from "./api.types";

export { ApiError } from "./api.types";
export { createHttpApi, NetworkError } from "./http-api";
export { createMockApi } from "./mock-api";

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

/** The backend the screens use: the Actix API when EXPO_PUBLIC_API_URL is set, otherwise the in-memory mock. */
export const api = apiUrl ? createHttpApi(apiUrl) : createMockApi();
