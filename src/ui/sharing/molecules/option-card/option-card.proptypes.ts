import type { IconName } from "~sharing/atoms/icon";

export interface Props {
	icon: IconName;
	label: string;
	detail?: string;
	onPress: () => void;
}
