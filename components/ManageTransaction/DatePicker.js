import React, { useState } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	Platform,
	StyleSheet,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function DatePicker({ label, onDateChange, initialDate }) {
	const [date, setDate] = useState(initialDate || new Date());
	const [showPicker, setShowPicker] = useState(false);

	const onChange = (event, selectedDate) => {
		// Always close the picker on Android, regardless of button pressed
		setShowPicker(Platform.OS === "ios");

		// Only update the date if user didn't cancel (selectedDate will be undefined on cancel)
		if (selectedDate) {
			setDate(selectedDate);
			onDateChange(selectedDate);
		}
	};

	const showDatepicker = () => {
		setShowPicker(true);
	};

	// Format date for display
	const formatDate = (date) => {
		return date.toISOString().split("T")[0]; // YYYY-MM-DD format
	};

	return (
		<View style={styles.container}>
			<Text style={styles.label}>{label}</Text>

			<TouchableOpacity
				style={styles.dateButton}
				onPress={showDatepicker}
			>
				<Text style={styles.dateText}>{formatDate(date)}</Text>
			</TouchableOpacity>

			{showPicker && (
				<DateTimePicker
					testID="dateTimePicker"
					value={date}
					mode="date"
					is24Hour={true}
					display={Platform.OS === "ios" ? "spinner" : "default"}
					onChange={onChange}
				/>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginHorizontal: 4,
		marginVertical: 8,
	},
	label: {
		fontSize: 12,
		color: "#666",
		marginBottom: 4,
	},
	dateButton: {
		backgroundColor: "#f9f9f9",
		padding: 12,
		borderRadius: 6,
		borderWidth: 1,
		borderColor: "#e0e0e0",
	},
	dateText: {
		fontSize: 18,
	},
});
