import type { ReactNode } from "react";
import type { Props as ActionsProps } from "~sharing/organisms/screen-actions/screen-actions.proptypes";
import type { Props as HeaderProps } from "~sharing/organisms/screen-header/screen-header.proptypes";

export interface Props extends HeaderProps, ActionsProps {
	/** Shows "Cargando…" in place of the content. */
	loading?: boolean;
	children?: ReactNode;
}
