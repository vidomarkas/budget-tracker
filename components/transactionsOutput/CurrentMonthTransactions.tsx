import { Link } from "expo-router";
import { Text, View } from "react-native";
import TransactionsOutput from "@/components/transactionsOutput/TransactionsOutput";
import { useContext } from "react";
import { TransactionsContext } from "@/store/transactions-context";

export default function CurrentMonthTransactions() {
	const transactionsCtx = useContext(TransactionsContext);

	const currentMonthTransactions = transactionsCtx.transactions.filter(
		(transaction) => {
			const transactionDate = new Date(transaction.date);
			const now = new Date();
			return (
				transactionDate.getFullYear() === now.getFullYear() &&
				transactionDate.getMonth() === now.getMonth()
			);
		}
	);
	return (
		<View
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<TransactionsOutput
				periodName="Total this month"
				transactions={currentMonthTransactions}
			/>

			<Link href="/">Back home</Link>
		</View>
	);
}
