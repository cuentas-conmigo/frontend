import { useEffect } from "react";
import { Redirect, useLocalSearchParams, useRouter } from "expo-router";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "~contexts/session";
import { messages } from "~messages";
import { ApiError } from "~services/api";
import { useFeedback } from "~services/feedback";
import { Button } from "~sharing/atoms/button";
import { LegalLinks } from "~sharing/molecules/legal-links";
import { Notice } from "~sharing/molecules/notice";
import { serverError, useAppForm } from "~sharing/organisms/form";
import { StepScreen } from "~sharing/organisms/step-screen";

import type { Credentials } from "~typing/students";

import { SessionSchema } from "~schemas/session";

const studentSide = process.env.EXPO_PUBLIC_STUDENT_SIDE === "on";

/**
 * Hidden demo sign-in through `/entrar?demo=maria` (or `rosa`), with no button on screen. It works
 * in development and in sample-data builds (no API URL), such as the Release build used for store
 * screenshots. Store builds always set the API URL, so it stays off there.
 */
const demoSignIn = __DEV__ || !process.env.EXPO_PUBLIC_API_URL;

/** Demo logins: the backend's seeded account, or anything for the mock. */
const demoAccounts: Record<string, Credentials | undefined> = {
	maria: process.env.EXPO_PUBLIC_DEMO_USUARIO
		? {
				usuario: process.env.EXPO_PUBLIC_DEMO_USUARIO,
				clave: process.env.EXPO_PUBLIC_DEMO_CLAVE ?? "",
			}
		: process.env.EXPO_PUBLIC_API_URL
			? undefined
			: { usuario: "maria", clave: "demo" },
	rosa:
		studentSide && !process.env.EXPO_PUBLIC_API_URL
			? { usuario: "rosa", clave: "demo" }
			: undefined,
};

const isWrongLogin = (error: unknown) => error instanceof ApiError && error.code === "unauthorized";

export default function SignInScreen() {
	const router = useRouter();
	const feedback = useFeedback();
	const { session, signIn } = useSession();
	const { demo } = useLocalSearchParams<{ demo?: string }>();
	const copy = messages.signIn;
	const enter = useMutation({
		mutationFn: (credentials: Credentials) => signIn(credentials),
		onError: (error) => feedback.error(isWrongLogin(error) ? copy.wrongLogin : copy.offline),
	});
	const form = useAppForm({
		defaultValues: { usuario: "", clave: "" },
		validators: { onBlur: SessionSchema.Signin, onSubmit: SessionSchema.Signin },
		onSubmit: async ({ value, formApi }) => {
			try {
				await enter.mutateAsync(SessionSchema.Signin.parse(value));
			} catch (error) {
				if (isWrongLogin(error)) formApi.setFieldMeta("clave", serverError(copy.wrongLogin));
			}
		},
	});

	useEffect(() => {
		const account = demo ? demoAccounts[demo] : undefined;
		if (demoSignIn && account && !session) enter.mutate(account);
	}, [demo, session, enter.mutate]);

	if (session) return <Redirect href={session.role === "student" ? "/tarjeta" : "/"} />;

	const offline = enter.error && !isWrongLogin(enter.error) ? copy.offline : undefined;

	return (
		<StepScreen eyebrow={copy.eyebrow} title={copy.title} hint={copy.hint}>
			{offline ? <Notice icon="alert-circle" tone="warning" text={offline} /> : null}
			<form.AppForm>
				<form.ErrorSummary />
			</form.AppForm>
			<form.AppField
				name="usuario"
				listeners={{ onChange: () => form.setFieldMeta("clave", serverError(undefined)) }}
			>
				{(field) => (
					<field.TextField
						label={copy.name}
						placeholder={copy.namePlaceholder}
						autoCapitalize="none"
						autoCorrect={false}
						autoComplete="username"
						textContentType="username"
					/>
				)}
			</form.AppField>
			<form.AppField
				name="clave"
				listeners={{ onChange: ({ fieldApi }) => fieldApi.setMeta(serverError(undefined)) }}
			>
				{(field) => (
					<field.PasswordField label={copy.password} onSubmitEditing={() => form.handleSubmit()} />
				)}
			</form.AppField>
			<form.AppForm>
				<form.Submit label={copy.submit} />
			</form.AppForm>
			<Button
				variant="link"
				icon="human"
				label={copy.accessible}
				onPress={() => router.push("/formato")}
			/>
			<LegalLinks />
		</StepScreen>
	);
}
