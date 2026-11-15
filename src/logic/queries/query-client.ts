import { QueryClient } from "@tanstack/react-query";

/** Shared cache: data stays fresh 30 s and a failed read is retried once before showing an error. */
export function createQueryClient() {
	return new QueryClient({
		defaultOptions: {
			queries: { staleTime: 30_000, retry: 1 },
			mutations: { retry: 0 },
		},
	});
}
