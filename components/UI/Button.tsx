import {
	Pressable,
	StyleSheet,
	Text,
	View,
	ViewStyle,
	TextStyle,
	PressableStateCallbackType,
} from "react-native";
import { Colors } from "../../constants/Colors";

interface ButtonProps {
	children: React.ReactNode;
	onPress: () => void;
	mode?: "flat" | "default";
	style?: ViewStyle;
}

export function Button({ children, onPress, mode, style }: ButtonProps) {
	return (
		<View style={style}>
			<Pressable
				onPress={onPress}
				style={({ pressed }: PressableStateCallbackType) =>
					pressed && styles.pressed
				}
			>
				<View style={[styles.button, mode === "flat" && styles.flat]}>
					<Text
						style={[
							styles.buttonText,
							mode === "flat" && styles.flatText,
						]}
					>
						{children}
					</Text>
				</View>
			</Pressable>
		</View>
	);
}

// export default Button;

const styles = StyleSheet.create({
	button: {
		borderRadius: 4,
		padding: 8,
		backgroundColor: Colors.light.background,
	},
	flat: {
		backgroundColor: "transparent",
	},
	buttonText: {
		color: "black",
		textAlign: "center",
	},
	flatText: {
		color: "black",
	},
	pressed: {
		opacity: 0.75,
		backgroundColor: Colors.light.background,
		borderRadius: 4,
	},
});
