import { useWorkshopId } from "~contexts/session";
import { PhotoCapture } from "~instructor/organisms/photo-capture";
import { messages } from "~messages";
import { ApiError } from "~services/api";
import { useFeedback } from "~services/feedback";
import { useFlowNavigation } from "~services/navigation";
import { Text } from "~sharing/atoms/text";
import { LegalLinks } from "~sharing/molecules/legal-links";
import { serverError, useAppForm } from "~sharing/organisms/form";
import { StepScreen } from "~sharing/organisms/step-screen";

import type { NewStudentInput } from "~typing/schemas/students";

import { useEnrollment } from "~queries";
import { StudentSchema } from "~schemas/students";

const blank: NewStudentInput = {
	name: "",
	phone: "",
	helperPhone: "",
	photoUri: undefined,
	photoConsent: false,
};

export default function NewStudentScreen() {
	const feedback = useFeedback();
	const { back } = useFlowNavigation();
	const { add } = useEnrollment(useWorkshopId());
	const copy = messages.newStudent;

	const form = useAppForm({
		defaultValues: blank,
		validators: { onBlur: StudentSchema.New, onSubmit: StudentSchema.New },
		onSubmit: async ({ value, formApi }) => {
			const student = StudentSchema.New.parse(value);
			try {
				const added = await add.mutateAsync({
					name: student.name,
					phone: student.phone,
					helperPhone: student.helperPhone || undefined,
					photoUri: student.photoConsent ? student.photoUri : undefined,
					photoConsent: student.photoConsent,
				});
				feedback.success(copy.done(added.name));
				back();
			} catch (error) {
				if (error instanceof ApiError && error.code === "duplicate-phone") {
					formApi.setFieldMeta("phone", serverError(copy.errors.duplicate));
					feedback.error(copy.errors.duplicate);
				} else {
					feedback.error(messages.error.loadHint);
				}
			}
		},
	});

	return (
		<StepScreen
			eyebrow={copy.eyebrow}
			title={copy.title}
			hint={copy.hint}
			onBack={back}
			onCancel={back}
		>
			<form.AppForm>
				<form.ErrorSummary />
			</form.AppForm>
			<form.AppField name="name">
				{(field) => (
					<field.TextField
						label={copy.name}
						placeholder={copy.namePlaceholder}
						autoComplete="name"
						textContentType="name"
						autoCapitalize="words"
					/>
				)}
			</form.AppField>
			<form.AppField
				name="phone"
				listeners={{ onChange: ({ fieldApi }) => fieldApi.setMeta(serverError(undefined)) }}
			>
				{(field) => <field.PhoneField label={copy.phone} placeholder={copy.phonePlaceholder} />}
			</form.AppField>
			<form.AppField name="helperPhone">
				{(field) => (
					<field.PhoneField
						label={copy.helper}
						placeholder={copy.helperPlaceholder}
						autoComplete="off"
					/>
				)}
			</form.AppField>
			<form.Field name="photoUri">
				{(field) => <PhotoCapture uri={field.state.value} onChange={field.handleChange} />}
			</form.Field>
			<form.Subscribe
				selector={(state) => [state.values.photoUri, state.values.photoConsent] as const}
			>
				{([photoUri, consent]) =>
					photoUri ? (
						<>
							<form.AppField name="photoConsent">
								{(field) => <field.ConsentField label={copy.consent} />}
							</form.AppField>
							{consent ? null : <Text tone="mutedForeground">{copy.consentNeeded}</Text>}
						</>
					) : null
				}
			</form.Subscribe>
			<Text tone="mutedForeground">{copy.later}</Text>
			<Text tone="mutedForeground">{copy.privacyNotice}</Text>
			<LegalLinks pages={["privacy"]} />
			<form.AppForm>
				<form.Submit label={copy.submit} icon="check" variant="success" />
			</form.AppForm>
		</StepScreen>
	);
}
