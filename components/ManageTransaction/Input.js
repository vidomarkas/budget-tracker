import { Text, TextInput, View, StyleSheet } from "react-native";

export default function Input({ label, textInputConfig, style }) {
	const inputStyles = [styles.input];

	if (textInputConfig && textInputConfig.multiline) {
		inputStyles.push(styles.inputMultiline);
	}

	// Special styling for date input
	if (label === "Date") {
		inputStyles.push(styles.dateInput);
	}

	return (
		<View style={[styles.inputContainer, style]}>
			<Text style={styles.label}>{label}</Text>
			<TextInput style={inputStyles} {...textInputConfig} />
		</View>
	);
}

const styles = StyleSheet.create({
	inputContainer: {
		marginHorizontal: 4,
		marginVertical: 8,
	},
	label: {
		fontSize: 12,
		color: "#666",
		marginBottom: 4,
	},
	input: {
		backgroundColor: "#f9f9f9",
		padding: 6,
		borderRadius: 6,
		fontSize: 18,
		borderWidth: 1,
		borderColor: "#e0e0e0",
	},
	inputMultiline: {
		minHeight: 100,
		textAlignVertical: "top",
	},
	dateInput: {
		letterSpacing: 1, // Better spacing for date format
		fontFamily: "monospace", // Use monospace for better alignment of date
	},
});
