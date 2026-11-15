import { createContext, useContext } from "react";
import { usePreferences } from "~contexts/preferences";
import { themes } from "~styles/colors";

import type { ReactNode } from "react";
import type { ColorTokens, Scheme } from "~styles/colors";

import { useScheme } from "./use-scheme";

/** Active scheme and its semantic colors. */
export interface Theme {
	scheme: Scheme;
	colors: ColorTokens;
}

const ThemeContext = createContext<Theme>({ scheme: "light", colors: themes.light });

interface ThemeProviderProps {
	/** Forces a scheme, e.g. for previews and tests; otherwise system scheme or the high-contrast setting. */
	scheme?: Scheme;
	children: ReactNode;
}

export function ThemeProvider({ scheme, children }: ThemeProviderProps) {
	const system = useScheme();
	const { preferences } = usePreferences();
	const active = scheme ?? (preferences.highContrast ? "highContrast" : system);
	return <ThemeContext value={{ scheme: active, colors: themes[active] }}>{children}</ThemeContext>;
}

/** Reads the active theme; outside a provider it returns the light theme. */
export function useTheme(): Theme {
	return useContext(ThemeContext);
}
