/** Reading and feedback settings from "Formato accesible", kept on the device. */
export interface Preferences {
	/** Text 25% larger on top of the system text size. */
	largeText: boolean;
	/** Black background, white text, yellow focus. */
	highContrast: boolean;
	/** Reads each screen's title and hint aloud when it opens. */
	readAloud: boolean;
	/** Vibration and sound when something went well or wrong. */
	feedback: boolean;
}
