import { Redirect, Stack } from "expo-router";
import { useSession } from "~contexts/session";

export default function InstructorLayout() {
	const { session } = useSession();

	if (!session) return <Redirect href="/entrar" />;
	if (session.role !== "instructor") return <Redirect href="/tarjeta" />;

	return <Stack screenOptions={{ headerShown: false }} />;
}
