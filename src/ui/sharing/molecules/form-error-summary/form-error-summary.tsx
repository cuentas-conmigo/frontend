import { useEffect } from "react";
import { useStore } from "@tanstack/react-form";
import { messages } from "~messages";
import { useFeedback } from "~services/feedback";
import { Notice } from "~sharing/molecules/notice";
import { errorText, useFormContext } from "~sharing/organisms/form/context";

/** "Falta corregir n datos" after a failed submit, shown and announced to screen readers. */
export function FormErrorSummary() {
	const form = useFormContext();
	const feedback = useFeedback();
	const attempts = useStore(form.store, (state) => state.submissionAttempts);
	const count = useStore(
		form.store,
		(state) =>
			Object.values(state.fieldMeta).filter((meta) =>
				errorText((meta as { errors?: unknown[] } | undefined)?.errors ?? [])
			).length
	);
	const text = messages.form.summary(count);

	useEffect(() => {
		if (attempts > 0 && count > 0) feedback.error(text);
	}, [attempts, count, feedback, text]);

	if (attempts === 0 || count === 0) return null;
	return <Notice icon="alert-circle" tone="warning" text={text} />;
}
