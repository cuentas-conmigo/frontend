import { useRouter } from "expo-router";
import { useSession } from "~contexts/session";

/** Atrás and Cancelar for the flows: back one step, or leave to the person's home. */
export function useFlowNavigation() {
	const router = useRouter();
	const { session } = useSession();
	const home = session?.role === "student" ? "/tarjeta" : "/";

	return {
		home,
		back: () => (router.canGoBack() ? router.back() : router.replace(home)),
		cancel: () => router.dismissTo(home),
	};
}
