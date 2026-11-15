import { useEffect } from "react";
import { View } from "react-native";
import { Redirect, useLocalSearchParams, useRouter } from "expo-router";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "~contexts/session";
import { messages } from "~messages";
import { ApiError } from "~services/api";
import { useFeedback } from "~services/feedback";
import { Button } from "~sharing/atoms/button";
import { Text } from "~sharing/atoms/text";
import { Notice } from "~sharing/molecules/notice";
import { serverError, useAppForm } from "~sharing/organisms/form";
import { StepScreen } from "~sharing/organisms/step-screen";
import { createStyles, spacing, touch } from "~styles";

import type { Credentials } from "~typing/students";

import { SessionSchema } from "~schemas/session";

const useStyles = createStyles(() => ({
	demo: { gap: touch.gap, paddingTop: spacing.lg },
}));

const studentSide = process.env.EXPO_PUBLIC_STUDENT_SIDE === "on";

/** Demo logins for development builds: the backend's seeded account, or anything for the mock. */
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
	const styles = useStyles();
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
		if (__DEV__ && account && !session) enter.mutate(account);
	}, [demo, session, enter.mutate]);

	if (session) return <Redirect href={session.role === "student" ? "/tarjeta" : "/"} />;

	const offline = enter.error && !isWrongLogin(enter.error) ? copy.offline : undefined;
	const maria = __DEV__ ? demoAccounts.maria : undefined;
	const rosa = __DEV__ ? demoAccounts.rosa : undefined;

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
			{maria || rosa ? (
				<View style={styles.demo}>
					<Text bold role="heading">
						{copy.demoTitle}
					</Text>
					<Text tone="mutedForeground">{copy.demoNote}</Text>
					{maria ? (
						<Button
							variant="outline"
							icon="account"
							label={copy.asInstructor}
							busy={enter.isPending}
							onPress={() => enter.mutate(maria)}
						/>
					) : null}
					{rosa ? (
						<Button
							variant="outline"
							icon="account"
							label={copy.asStudent}
							busy={enter.isPending}
							onPress={() => enter.mutate(rosa)}
						/>
					) : null}
				</View>
			) : null}
		</StepScreen>
	);
}
