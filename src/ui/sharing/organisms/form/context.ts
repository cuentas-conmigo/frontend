import { createFormHookContexts, useStore } from "@tanstack/react-form";

import type { AnyFormApi } from "@tanstack/react-form";

export const { fieldContext, formContext, useFieldContext, useFormContext } =
	createFormHookContexts();

/**
 * Submits after re-running the blur validation. Leaving one field validates the whole form, so a
 * later field that was still empty keeps a stale error that would otherwise block the submit.
 */
export async function submitForm(form: Pick<AnyFormApi, "validate" | "handleSubmit">) {
	await form.validate("blur");
	await form.handleSubmit();
}

/** First error of a field, in plain words, or `undefined`. Accepts schema issues and server strings. */
export function errorText(errors: readonly unknown[]): string | undefined {
	const first = errors.find(Boolean);
	if (!first) return undefined;
	if (typeof first === "string") return first;
	return (first as { message?: string }).message;
}

/**
 * The error to show under the current field: only after the person leaves the field or tries to
 * submit, never while they are still typing.
 */
export function useFieldError(): string | undefined {
	const field = useFieldContext<unknown>();
	const attempts = useStore(field.form.store, (state) => state.submissionAttempts);
	const { errors, isBlurred } = field.state.meta;
	return isBlurred || attempts > 0 ? errorText(errors) : undefined;
}

/**
 * Updates a field's meta with an error the backend reported (or clears it with `undefined`),
 * e.g. `form.setFieldMeta("phone", serverError(copy.duplicate))`.
 */
export const serverError =
	(message: string | undefined) =>
	<M extends { errorMap: object }>(meta: M): M => ({
		...meta,
		errorMap: { ...meta.errorMap, onServer: message },
	});
