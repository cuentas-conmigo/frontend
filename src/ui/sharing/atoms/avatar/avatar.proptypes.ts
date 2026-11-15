import type { ConsentedPhoto } from "~typing/students";

export type AvatarSize = "md" | "lg";

export interface Props {
	name: string;
	/** Shown only when present, which implies recorded consent; otherwise the initial. */
	photo?: ConsentedPhoto;
	size?: AvatarSize;
}
