import type { ConfigContext, ExpoConfig } from "expo/config";

/**
 * Store builds tie their runtime to the app version. `EXPO_GO_PREVIEW=1` publishes an update for
 * Expo Go instead, which only opens updates built for its SDK.
 */
export default ({ config }: ConfigContext): ExpoConfig => ({
	...(config as ExpoConfig),
	runtimeVersion:
		process.env.EXPO_GO_PREVIEW === "1" ? { policy: "sdkVersion" } : { policy: "appVersion" },
});
