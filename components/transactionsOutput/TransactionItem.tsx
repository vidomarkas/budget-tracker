import { Pressable, Text, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

interface TransactionItemProps {
	id: string;
	description: string;
	amount: number;
	date: string | Date;
	user: string;
}

const TransactionItem = ({
	id,
	description,
	amount,
	date,
	user,
}: TransactionItemProps) => {
	// Format date
	const formatDate = (dateInput: string | Date) => {
		const transactionDate = new Date(dateInput);
		const today = new Date();
		const yesterday = new Date(today);
		yesterday.setDate(yesterday.getDate() - 1);

		// Check if date is today
		if (
			transactionDate.getDate() === today.getDate() &&
			transactionDate.getMonth() === today.getMonth() &&
			transactionDate.getFullYear() === today.getFullYear()
		) {
			return "Today";
		}

		// Check if date is yesterday
		if (
			transactionDate.getDate() === yesterday.getDate() &&
			transactionDate.getMonth() === yesterday.getMonth() &&
			transactionDate.getFullYear() === yesterday.getFullYear()
		) {
			return "Yesterday";
		}

		// For dates in the current year, show day and month
		if (transactionDate.getFullYear() === today.getFullYear()) {
			return transactionDate.toLocaleDateString("en-GB", {
				day: "numeric",
				month: "short",
			});
		}

		// For older dates, include the year
		return transactionDate.toLocaleDateString("en-GB", {
			day: "numeric",
			month: "short",
			year: "numeric",
		});
	};

	const formattedDate = formatDate(date);

	const router = useRouter();

	const transactionPressHandler = () => {
		router.push({
			pathname: "/edit-transaction",
			params: {
				transactionId: id,
			},
		});
	};

	return (
		<Pressable
			style={({ pressed }) => [
				styles.container,
				pressed && styles.pressed,
			]}
			onPress={transactionPressHandler}
		>
			{/* Transaction details */}
			<View style={styles.detailsContainer}>
				<View style={styles.topRow}>
					<Text style={styles.description}>{description}</Text>
					<Text
						style={[
							styles.amount,
							amount < 0
								? styles.negativeAmount
								: styles.positiveAmount,
						]}
					>
						{amount < 0 ? "-" : "+"} £{Math.abs(amount).toFixed(2)}
					</Text>
				</View>

				<View style={styles.bottomRow}>
					<View style={styles.userDateContainer}>
						<Text style={styles.userName}>{user}</Text>
						<Text style={styles.dot}>•</Text>
						<Text style={styles.date}>{formattedDate}</Text>
					</View>

					<View style={styles.categoryContainer}>
						{amount < 0 ? (
							<Ionicons
								name="cart-outline"
								size={14}
								color="#666"
							/>
						) : (
							<Ionicons
								name="trending-up"
								size={14}
								color="#666"
							/>
						)}
						<Text style={styles.category}>
							{amount < 0 ? "Expense" : "Income"}
						</Text>
					</View>
				</View>
			</View>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	pressed: {
		opacity: 0.75,
	},
	container: {
		flexDirection: "row",
		borderWidth: 1,
		borderColor: "#E0E0E0",
		padding: 12,
		borderRadius: 10,
		marginBottom: 5,
		marginTop: 5,
		backgroundColor: "white",
	},
	detailsContainer: {
		flex: 1,
		justifyContent: "space-between",
	},
	topRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 6,
	},
	description: {
		fontSize: 16,
		fontWeight: "500",
		flexShrink: 1,
	},
	amount: {
		fontSize: 16,
		fontWeight: "bold",
	},
	positiveAmount: {
		color: "#2ECC71",
	},
	negativeAmount: {
		color: "#E74C3C",
	},
	bottomRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	userDateContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
	userName: {
		fontSize: 12,
		color: "#666",
	},
	dot: {
		fontSize: 12,
		color: "#666",
		marginHorizontal: 4,
	},
	date: {
		fontSize: 12,
		color: "#666",
	},
	categoryContainer: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#F5F5F5",
		paddingHorizontal: 8,
		paddingVertical: 3,
		borderRadius: 12,
	},
	category: {
		fontSize: 12,
		color: "#666",
		marginLeft: 4,
	},
});

export default TransactionItem;
