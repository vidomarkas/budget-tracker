import { Text, View, StyleSheet } from "react-native";

const TransactionsSummary = ({ periodName, transactions }) => {
	const transactionsTotal = transactions.reduce(
		(sum, transaction) => sum + transaction.amount,
		0
	);
	return (
		<View style={styles.transactionsSummary}>
			<Text>{periodName}</Text>
			<Text>£{transactionsTotal.toFixed(2)}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	transactionsSummary: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		padding: 10,
		backgroundColor: "#f8f8f8",
		borderBottomWidth: 1,
		borderBottomColor: "#ccc",
		width: "100%",
	},
});

export default TransactionsSummary;
