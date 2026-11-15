import { useEffect, useState } from "react";
import { Inter_400Regular, Inter_600SemiBold } from "@expo-google-fonts/inter";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { QueryClientProvider } from "@tanstack/react-query";
import { PreferencesProvider } from "~contexts/preferences";
import { SessionProvider } from "~contexts/session";
import { ThemeProvider, useTheme } from "~contexts/theme";

import { createQueryClient } from "~queries";

SplashScreen.preventAutoHideAsync();

function ThemedStack() {
	const { scheme, colors } = useTheme();

	return (
		<>
			<StatusBar style={scheme === "light" ? "dark" : "light"} />
			<Stack
				screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.background } }}
			/>
		</>
	);
}

export default function RootLayout() {
	const [client] = useState(createQueryClient);
	const [loaded, error] = useFonts({ Inter_400Regular, Inter_600SemiBold });
	const ready = loaded || Boolean(error);

	useEffect(() => {
		if (ready) SplashScreen.hideAsync();
	}, [ready]);

	if (!ready) return null;

	return (
		<QueryClientProvider client={client}>
			<PreferencesProvider>
				<ThemeProvider>
					<SessionProvider>
						<ThemedStack />
					</SessionProvider>
				</ThemeProvider>
			</PreferencesProvider>
		</QueryClientProvider>
	);
}
