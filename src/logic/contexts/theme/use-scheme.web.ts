import { useEffect, useState } from "react";
import { useColorScheme } from "react-native";

import type { Scheme } from "~styles/colors";

/** Server-rendered HTML is always light; the real scheme is applied after hydration. */
export function useScheme(): Scheme {
	const [hydrated, setHydrated] = useState(false);
	const system = useColorScheme();

	useEffect(() => {
		setHydrated(true);
	}, []);

	return hydrated && system === "dark" ? "dark" : "light";
}
