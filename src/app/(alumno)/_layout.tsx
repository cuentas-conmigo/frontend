import { Redirect, Stack } from "expo-router";
import { useSession } from "~contexts/session";

export default function StudentLayout() {
	const { session } = useSession();

	if (!session) return <Redirect href="/entrar" />;
	if (session.role !== "student") return <Redirect href="/" />;

	return <Stack screenOptions={{ headerShown: false }} />;
}
