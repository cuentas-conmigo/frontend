import { useCallback, useEffect, useState } from "react";
import * as Speech from "expo-speech";

const voice = { language: "es-MX", rate: 0.9 } as const;

/** Reads text aloud in es-MX; calling `toggle` while speaking stops instead. */
export function useSpeech() {
	const [speaking, setSpeaking] = useState(false);

	const stop = useCallback(() => {
		setSpeaking(false);
		return Speech.stop();
	}, []);

	const speak = useCallback((text: string) => {
		setSpeaking(true);
		Speech.speak(text, {
			...voice,
			onDone: () => setSpeaking(false),
			onStopped: () => setSpeaking(false),
			onError: () => setSpeaking(false),
		});
	}, []);

	const toggle = useCallback(
		(text: string) => {
			if (speaking) stop();
			else speak(text);
		},
		[speaking, speak, stop]
	);

	useEffect(() => () => void Speech.stop(), []);

	return { speaking, speak, toggle, stop };
}
