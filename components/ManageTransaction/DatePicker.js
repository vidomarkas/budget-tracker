import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	Platform,
	Modal,
} from "react-native";
import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";

function DatePicker({ label, onDateChange, initialDate, style, invalid }) {
	const [date, setDate] = useState(initialDate || new Date());
	const [showPicker, setShowPicker] = useState(false);
	const [isFocused, setIsFocused] = useState(false);

	const handleDateChange = (event, selectedDate) => {
		const currentDate = selectedDate || date;

		if (Platform.OS === "android") {
			setShowPicker(false);
		}

		setDate(currentDate);
		onDateChange(currentDate);
	};

	const toggleDatePicker = () => {
		setShowPicker(!showPicker);
		setIsFocused(!isFocused);
	};

	const containerStyles = [
		styles.container,
		invalid && styles.invalidContainer,
		isFocused && styles.focusedContainer,
		style,
	];

	const labelStyles = [
		styles.label,
		invalid && styles.invalidLabel,
		isFocused && styles.focusedLabel,
	];

	const formatDate = (date) => {
		return date.toLocaleDateString("en-US", {
			year: "numeric",
			month: "short",
			day: "numeric",
		});
	};

	return (
		<View style={containerStyles}>
			<Text style={labelStyles}>{label}</Text>

			<TouchableOpacity
				onPress={toggleDatePicker}
				style={styles.pickerButton}
			>
				<Text style={styles.dateText}>{formatDate(date)}</Text>
				<Ionicons name="calendar" size={20} color="#666" />
			</TouchableOpacity>

			{invalid && (
				<Text style={styles.errorText}>Please enter a valid date</Text>
			)}

			{showPicker &&
				(Platform.OS === "ios" ? (
					<Modal
						animationType="slide"
						transparent={true}
						visible={showPicker}
					>
						<View style={styles.centeredView}>
							<View style={styles.modalView}>
								<View style={styles.pickerHeader}>
									<TouchableOpacity
										onPress={() => {
											setShowPicker(false);
											setIsFocused(false);
										}}
										style={styles.headerButton}
									>
										<Text style={styles.cancelText}>
											Cancel
										</Text>
									</TouchableOpacity>

									<Text style={styles.headerTitle}>
										Select Date
									</Text>

									<TouchableOpacity
										onPress={() => {
											setShowPicker(false);
											setIsFocused(false);
										}}
										style={styles.headerButton}
									>
										<Text style={styles.doneText}>
											Done
										</Text>
									</TouchableOpacity>
								</View>

								<DateTimePicker
									value={date}
									mode="date"
									display="spinner"
									onChange={handleDateChange}
									style={styles.datePicker}
								/>
							</View>
						</View>
					</Modal>
				) : (
					<DateTimePicker
						value={date}
						mode="date"
						display="default"
						onChange={handleDateChange}
					/>
				))}
		</View>
	);
}

export default DatePicker;

const styles = StyleSheet.create({
	container: {
		marginVertical: 8,
	},
	label: {
		fontSize: 14,
		color: "#666",
		marginBottom: 6,
		fontWeight: "500",
	},
	pickerButton: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		backgroundColor: "#f9f9f9",
		padding: 12,
		borderRadius: 8,
		borderWidth: 1,
		borderColor: "#e0e0e0",
	},
	dateText: {
		fontSize: 16,
		color: "#333",
	},
	invalidContainer: {
		borderColor: "#d32f2f",
	},
	invalidLabel: {
		color: "#d32f2f",
	},
	errorText: {
		color: "#d32f2f",
		fontSize: 12,
		marginTop: 4,
	},
	focusedContainer: {
		borderColor: "#4A6FFF",
	},
	focusedLabel: {
		color: "#4A6FFF",
	},
	// Modal styling for iOS
	centeredView: {
		flex: 1,
		justifyContent: "flex-end",
		backgroundColor: "rgba(0,0,0,0.5)",
	},
	modalView: {
		backgroundColor: "white",
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		paddingBottom: 20,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: -4,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	pickerHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		borderBottomWidth: 1,
		borderBottomColor: "#f0f0f0",
		paddingHorizontal: 16,
		paddingVertical: 14,
	},
	headerButton: {
		padding: 4,
	},
	headerTitle: {
		fontSize: 16,
		fontWeight: "600",
		color: "#333",
	},
	cancelText: {
		fontSize: 16,
		color: "#666",
	},
	doneText: {
		fontSize: 16,
		color: "#4A6FFF",
		fontWeight: "600",
	},
	datePicker: {
		height: 200,
	},
});
