import { useQueryClient } from "@tanstack/react-query";
import { usePreferences } from "~contexts/preferences";
import { useSession } from "~contexts/session";
import { messages } from "~messages";
import { useFlowNavigation } from "~services/navigation";
import { ChoiceRow } from "~sharing/molecules/choice-row";
import { StepScreen } from "~sharing/organisms/step-screen";

import type { Preferences } from "~typing/preferences";

const settings: readonly (keyof Preferences)[] = [
	"largeText",
	"highContrast",
	"readAloud",
	"feedback",
];

export default function AccessibleFormatScreen() {
	const client = useQueryClient();
	const { back } = useFlowNavigation();
	const { session, signOut } = useSession();
	const { preferences, setPreference } = usePreferences();
	const copy = messages.accessible;

	return (
		<StepScreen
			eyebrow={copy.eyebrow}
			title={copy.title}
			hint={copy.hint}
			onBack={back}
			onCancel={
				session
					? () => {
							client.clear();
							signOut();
						}
					: undefined
			}
			cancelLabel={copy.signOut}
		>
			{settings.map((key) => (
				<ChoiceRow
					key={key}
					{...copy[key]}
					checked={preferences[key]}
					onChange={(value) => setPreference(key, value)}
				/>
			))}
		</StepScreen>
	);
}
