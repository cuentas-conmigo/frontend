import { useColorScheme } from "react-native";

import type { Scheme } from "~styles/colors";

/** Current color scheme, defaulting to light when the system reports none. */
export function useScheme(): Scheme {
	return useColorScheme() === "dark" ? "dark" : "light";
}
