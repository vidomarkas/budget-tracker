import { View, Alert } from "react-native";
import { useState, useEffect } from "react";
import Input from "./Input";
import DatePicker from "./DatePicker";
import { Button } from "../UI/Button";

export default function TransactionForm({ onCancel, onSubmit, defaultValues }) {
	console.log("defaultValues", defaultValues);

	// Initialize with a check to see if defaultValues exists completely
	const [inputValues, setInputValues] = useState({
		amount:
			defaultValues?.amount !== undefined
				? defaultValues.amount.toString()
				: "",
		date: defaultValues?.date || new Date(),
		note: defaultValues?.description || "",
	});

	function amountChangedHandler(enteredAmount) {
		// Validate to ensure no more than 2 decimal places and allow negative sign
		// Allow digits, decimal points, commas, and minus sign
		let cleanedInput = enteredAmount.replace(/[^\d.,\-]/g, "");

		// Handle the case where minus sign might appear multiple times or in wrong positions
		const minusCount = (cleanedInput.match(/\-/g) || []).length;

		if (minusCount > 0) {
			// Remove all minus signs first
			cleanedInput = cleanedInput.replace(/\-/g, "");

			// If there was at least one minus sign, add it back at the beginning
			cleanedInput = "-" + cleanedInput;
		}

		// Check if there's a decimal point in the input
		if (cleanedInput.includes(".") || cleanedInput.includes(",")) {
			const parts = cleanedInput.includes(".")
				? cleanedInput.split(".")
				: cleanedInput.split(",");

			// If we have more than 2 digits after the decimal, truncate it
			if (parts[1] && parts[1].length > 2) {
				parts[1] = parts[1].substring(0, 2);
				cleanedInput = parts.join(
					cleanedInput.includes(".") ? "." : ","
				);
			}
		}

		setInputValues((curInputValues) => {
			return {
				...curInputValues,
				amount: cleanedInput,
			};
		});
	}

	function dateChangedHandler(date) {
		setInputValues((curInputValues) => {
			return {
				...curInputValues,
				date: date,
			};
		});
	}

	function noteChangedHandler(enteredNote) {
		setInputValues((curInputValues) => {
			return {
				...curInputValues,
				note: enteredNote,
			};
		});
	}

	function submitHandler() {
		const dateString =
			inputValues.date instanceof Date
				? inputValues.date.toISOString().split("T")[0]
				: inputValues.date;

		if (!(inputValues.date instanceof Date) && !validateDate(dateString)) {
			Alert.alert(
				"Invalid Date",
				"Please enter a valid date in YYYY-MM-DD format."
			);
			return;
		}

		// Validate amount (non-empty and is a valid number)
		if (!inputValues.amount || isNaN(parseFloat(inputValues.amount))) {
			Alert.alert("Invalid Amount", "Please enter a valid amount.");
			return;
		}

		// Sanitize note input before submission
		const sanitizedNote = inputValues.note.replace(
			/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
			""
		);

		// Continue with form submission
		const transactionData = {
			amount: parseFloat(parseFloat(inputValues.amount).toFixed(2)),
			date:
				inputValues.date instanceof Date
					? inputValues.date
					: new Date(dateString),
			description: sanitizedNote,
		};

		// Handle submission
		onSubmit(transactionData);
	}

	// Function to validate date before form submission
	function validateDate(dateString) {
		// Check format
		const datePattern = /^\d{4}-\d{2}-\d{2}$/;
		if (!datePattern.test(dateString)) {
			return false;
		}

		// Check if it's a valid date
		const date = new Date(dateString);
		if (isNaN(date.getTime())) {
			return false;
		}

		// Extract parts to validate months and days
		const parts = dateString.split("-");
		const year = parseInt(parts[0], 10);
		const month = parseInt(parts[1], 10);
		const day = parseInt(parts[2], 10);

		if (month < 1 || month > 12) {
			return false;
		}

		const daysInMonth = new Date(year, month, 0).getDate();
		if (day < 1 || day > daysInMonth) {
			return false;
		}

		return true;
	}

	return (
		<View>
			<DatePicker
				label="Date"
				onDateChange={dateChangedHandler}
				initialDate={
					inputValues.date instanceof Date
						? inputValues.date
						: new Date()
				}
			/>
			<Input
				label="Amount"
				textInputConfig={{
					// autoFocus: true,
					keyboardType: "decimal-pad",
					onChangeText: amountChangedHandler,
					value: inputValues.amount?.toString() || "",
					placeholder: "0.00",
				}}
			/>

			<Input
				label="Note"
				textInputConfig={{
					onChangeText: noteChangedHandler,
					multiline: true,
					autoCorrect: true,
					value: inputValues.note,
				}}
			/>
			<View
				style={{
					flexDirection: "row",
				}}
			>
				<Button onPress={submitHandler}>Update</Button>
				<Button mode="flat" onPress={onCancel}>
					Cancel
				</Button>
			</View>
		</View>
	);
}
