import { createContext, useContext, useState } from "react";
import { api } from "~services/api";

import type { ReactNode } from "react";
import type { Credentials, Session } from "~typing/students";

interface SessionValue {
	session: Session | null;
	signIn: (credentials: Credentials) => Promise<Session>;
	signOut: () => void;
}

const SessionContext = createContext<SessionValue>({
	session: null,
	signIn: () => Promise.reject(new Error("SessionProvider is missing")),
	signOut: () => undefined,
});

/** The signed-in tallerista or student; the login is checked by the backend. */
export function SessionProvider({
	children,
	initial = null,
}: {
	children: ReactNode;
	initial?: Session | null;
}) {
	const [session, setSession] = useState<Session | null>(initial);

	const signIn = async (credentials: Credentials) => {
		const next = await api.signIn(credentials);
		setSession(next);
		return next;
	};

	const signOut = () => {
		api.signOut();
		setSession(null);
	};

	return <SessionContext value={{ session, signIn, signOut }}>{children}</SessionContext>;
}

export function useSession(): SessionValue {
	return useContext(SessionContext);
}

/** Workshop of the signed-in instructor; empty outside the instructor screens. */
export function useWorkshopId(): string {
	return useSession().session?.workshopId ?? "";
}

/** Profile of the signed-in student; empty outside the student screens. */
export function useStudentId(): string {
	return useSession().session?.studentId ?? "";
}
