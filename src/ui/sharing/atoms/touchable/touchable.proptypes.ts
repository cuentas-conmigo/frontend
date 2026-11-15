import type { PressableProps, StyleProp, ViewStyle } from "react-native";

export interface Props extends Omit<PressableProps, "style"> {
	style?: StyleProp<ViewStyle>;
	/** Extra style while pressed; no motion, so it is safe with reduced motion on. */
	pressedStyle?: StyleProp<ViewStyle>;
}
