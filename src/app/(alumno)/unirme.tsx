import { useStudentId } from "~contexts/session";
import { messages } from "~messages";
import { ApiError } from "~services/api";
import { useFeedback } from "~services/feedback";
import { useFlowNavigation } from "~services/navigation";
import { Text } from "~sharing/atoms/text";
import { Notice } from "~sharing/molecules/notice";
import { serverError, submitForm, useAppForm } from "~sharing/organisms/form";
import { StepScreen } from "~sharing/organisms/step-screen";

import { useJoinWorkshop } from "~queries";
import { JoinSchema } from "~schemas/join";

const copy = messages.join;

/** What to tell the student when the backend refuses the code. */
function joinFailure(error: unknown): string {
	if (error instanceof ApiError && error.code === "already-joined") return copy.errors.already;
	if (error instanceof ApiError && error.code === "invalid-code") return copy.errors.invalid;
	return messages.error.loadHint;
}

export default function JoinScreen() {
	const feedback = useFeedback();
	const { back } = useFlowNavigation();
	const join = useJoinWorkshop(useStudentId());

	const form = useAppForm({
		defaultValues: { code: "" },
		validators: { onBlur: JoinSchema.Code, onSubmit: JoinSchema.Code },
		onSubmit: async ({ value, formApi }) => {
			try {
				const workshop = await join.mutateAsync(JoinSchema.Code.parse(value).code);
				feedback.success(copy.done(workshop.name));
			} catch (error) {
				const message = joinFailure(error);
				formApi.setFieldMeta("code", serverError(message));
				feedback.error(message);
			}
		},
	});

	if (join.isSuccess) {
		return (
			<StepScreen
				eyebrow={copy.eyebrow}
				title={join.data.name}
				onBack={back}
				primaryAction={{
					label: messages.card.eyebrow,
					icon: "card-account-details",
					onPress: back,
				}}
			>
				<Notice icon="check" tone="success" text={copy.done(join.data.name)} />
			</StepScreen>
		);
	}

	return (
		<StepScreen
			eyebrow={copy.eyebrow}
			title={copy.title}
			hint={copy.hint}
			onBack={back}
			onCancel={back}
		>
			<form.AppField
				name="code"
				listeners={{ onChange: ({ fieldApi }) => fieldApi.setMeta(serverError(undefined)) }}
			>
				{(field) => (
					<field.TextField
						label={copy.label}
						placeholder={copy.placeholder}
						autoCapitalize="characters"
						autoCorrect={false}
						onSubmitEditing={() => submitForm(form)}
					/>
				)}
			</form.AppField>
			<Text tone="mutedForeground">{copy.note}</Text>
			<form.AppForm>
				<form.Submit label={copy.submit} icon="send" />
			</form.AppForm>
		</StepScreen>
	);
}
