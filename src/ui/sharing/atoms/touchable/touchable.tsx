import { useState } from "react";
import { Pressable } from "react-native";

import type { Props } from "./touchable.proptypes";

import { useTouchableStyles } from "./touchable.styles";

/** Base of every tappable element: a visible focus ring for keyboard and switch users (WCAG 2.4.13). */
export function Touchable({ style, pressedStyle, onFocus, onBlur, ...rest }: Props) {
	const styles = useTouchableStyles();
	const [focused, setFocused] = useState(false);

	return (
		<Pressable
			onFocus={(event) => {
				setFocused(true);
				onFocus?.(event);
			}}
			onBlur={(event) => {
				setFocused(false);
				onBlur?.(event);
			}}
			style={({ pressed }) => [
				style,
				pressed && [styles.pressed, pressedStyle],
				focused && styles.focused,
			]}
			{...rest}
		/>
	);
}
