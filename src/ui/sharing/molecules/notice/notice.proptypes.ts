import type { IconName } from "~sharing/atoms/icon";

export type NoticeTone = "warning" | "success" | "info";

export interface Props {
	icon: IconName;
	text: string;
	tone?: NoticeTone;
}
