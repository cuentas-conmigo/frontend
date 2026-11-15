import { StyleSheet } from "react-native";
import { useTheme } from "~contexts/theme";

import type { ImageStyle, TextStyle, ViewStyle } from "react-native";
import type { Theme } from "~contexts/theme";
import type { Scheme } from "./colors";

/** Map of named styles, as accepted by `StyleSheet.create`. */
export type NamedStyles<T> = { [Key in keyof T]: ViewStyle | TextStyle | ImageStyle };

/**
 * Builds a hook returning a `StyleSheet` for the active theme. Each scheme's sheet is created once
 * and reused, so components read semantic tokens without inline color objects.
 */
export function createStyles<T extends NamedStyles<T>>(factory: (theme: Theme) => T) {
	const sheets = new Map<Scheme, T>();

	return function useStyles(): T {
		const theme = useTheme();
		const cached = sheets.get(theme.scheme);
		if (cached) return cached;
		const sheet = StyleSheet.create(factory(theme));
		sheets.set(theme.scheme, sheet);
		return sheet;
	};
}
