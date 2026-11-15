import { defineConfig } from "vitest/config";
import { reactNative } from "vitest-native";

export default defineConfig({
	plugins: [reactNative()],
	resolve: { tsconfigPaths: true },
	test: {
		include: ["src/**/*.test.ts?(x)"],
	},
});
