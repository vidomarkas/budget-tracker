import { View, Text, TextInput, StyleSheet } from "react-native";
import { useState } from "react";

function Input({ label, textInputConfig, style, invalid }) {
	const [isFocused, setIsFocused] = useState(false);

	const inputStyles = [
		styles.input,
		textInputConfig && textInputConfig.multiline && styles.inputMultiline,
		invalid && styles.invalidInput,
		isFocused && styles.focusedInput,
	];

	const labelStyles = [
		styles.label,
		invalid && styles.invalidLabel,
		isFocused && styles.focusedLabel,
	];

	return (
		<View style={[styles.inputContainer, style]}>
			<Text style={labelStyles}>{label}</Text>
			<TextInput
				style={inputStyles}
				{...textInputConfig}
				onFocus={() => setIsFocused(true)}
				onBlur={() => setIsFocused(false)}
			/>
			{invalid && (
				<Text style={styles.errorText}>Please enter a valid value</Text>
			)}
		</View>
	);
}

export default Input;

const styles = StyleSheet.create({
	inputContainer: {
		marginVertical: 8,
	},
	label: {
		fontSize: 14,
		color: "#666",
		marginBottom: 6,
		fontWeight: "500",
	},
	input: {
		backgroundColor: "#f9f9f9",
		padding: 12,
		borderRadius: 8,
		fontSize: 16,
		borderWidth: 1,
		borderColor: "#e0e0e0",
		color: "#333",
	},
	inputMultiline: {
		minHeight: 100,
		textAlignVertical: "top",
		borderWidth: 1,
		borderColor: "#e0e0e0",
	},
	invalidLabel: {
		color: "#d32f2f",
	},
	invalidInput: {
		borderColor: "#d32f2f",
		backgroundColor: "#fff8f8",
	},
	errorText: {
		color: "#d32f2f",
		fontSize: 12,
		marginTop: 4,
	},
	focusedInput: {
		borderColor: "#4A6FFF",
		borderWidth: 2,
		backgroundColor: "#fff",
	},
	focusedLabel: {
		color: "#4A6FFF",
	},
});
