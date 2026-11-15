import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import type { ReactNode } from "react";
import type { Preferences } from "~typing/preferences";

const storageKey = "preferences.v1";

export const defaultPreferences: Preferences = {
	largeText: false,
	highContrast: false,
	readAloud: false,
	feedback: true,
};

interface PreferencesValue {
	preferences: Preferences;
	setPreference: <K extends keyof Preferences>(key: K, value: Preferences[K]) => void;
}

const PreferencesContext = createContext<PreferencesValue>({
	preferences: defaultPreferences,
	setPreference: () => undefined,
});

interface PreferencesProviderProps {
	children: ReactNode;
	/** Starting values, e.g. in tests; saved values replace them once loaded. */
	initial?: Partial<Preferences>;
}

/** Keeps the accessibility settings and remembers them on the device. */
export function PreferencesProvider({ children, initial }: PreferencesProviderProps) {
	const [preferences, setPreferences] = useState<Preferences>({
		...defaultPreferences,
		...initial,
	});

	useEffect(() => {
		AsyncStorage.getItem(storageKey)
			.then((saved) => {
				if (saved)
					setPreferences({ ...defaultPreferences, ...(JSON.parse(saved) as Partial<Preferences>) });
			})
			.catch(() => undefined);
	}, []);

	const setPreference: PreferencesValue["setPreference"] = (key, value) => {
		setPreferences((current) => {
			const next = { ...current, [key]: value };
			AsyncStorage.setItem(storageKey, JSON.stringify(next)).catch(() => undefined);
			return next;
		});
	};

	return <PreferencesContext value={{ preferences, setPreference }}>{children}</PreferencesContext>;
}

export function usePreferences(): PreferencesValue {
	return useContext(PreferencesContext);
}
