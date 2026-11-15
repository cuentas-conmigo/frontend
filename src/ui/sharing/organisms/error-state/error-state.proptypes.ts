import type { ScreenAction } from "~sharing/organisms/screen-actions";

export interface Props {
	title: string;
	hint: string;
	retry: ScreenAction;
	leave: ScreenAction;
}
