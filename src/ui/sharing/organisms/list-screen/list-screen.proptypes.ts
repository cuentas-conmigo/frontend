import type { ReactNode } from "react";
import type { Props as ActionsProps } from "~sharing/organisms/screen-actions/screen-actions.proptypes";
import type { Props as HeaderProps } from "~sharing/organisms/screen-header/screen-header.proptypes";

export interface Props<T> extends HeaderProps, ActionsProps {
	data: readonly T[] | undefined;
	renderItem: (item: T) => ReactNode;
	keyExtractor: (item: T) => string;
	/** Said when the list is empty. */
	emptyText: string;
	/** Shows "Cargando…" while the data is on its way. */
	loading?: boolean;
	/** Content between the title and the list, e.g. a heading or an option. */
	above?: ReactNode;
	/** Content between the list and the actions, e.g. a note. */
	below?: ReactNode;
}
