import { createFormHook } from "@tanstack/react-form";
import { FormAmountField } from "~sharing/molecules/form-amount-field";
import { FormConsentField } from "~sharing/molecules/form-consent-field";
import { FormErrorSummary } from "~sharing/molecules/form-error-summary";
import { FormPasswordField } from "~sharing/molecules/form-password-field";
import { FormPhoneField } from "~sharing/molecules/form-phone-field";
import { FormSubmit } from "~sharing/molecules/form-submit";
import { FormTextField } from "~sharing/molecules/form-text-field";

import { fieldContext, formContext } from "./context";

/** The app's forms: `form.AppField` renders these fields and `form.AppForm` the form components. */
export const { useAppForm, withForm } = createFormHook({
	fieldContext,
	formContext,
	fieldComponents: {
		TextField: FormTextField,
		PasswordField: FormPasswordField,
		PhoneField: FormPhoneField,
		AmountField: FormAmountField,
		ConsentField: FormConsentField,
	},
	formComponents: {
		Submit: FormSubmit,
		ErrorSummary: FormErrorSummary,
	},
});

export { errorText, serverError, submitForm } from "./context";
