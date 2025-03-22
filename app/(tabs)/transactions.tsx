import { Link } from "expo-router";
import { Text, View } from "react-native";
// import TransactionsOutput from "@/components/transactionsOutput/TransactionsOutput";
// import { useContext } from "react";
// import { TransactionsContext } from "@/store/transactions-context";
import CurrentMonthTransactions from "@/components/transactionsOutput/CurrentMonthTransactions";

export default function Transactions() {
	// const transactionsCtx = useContext(TransactionsContext);
	return (
		<View
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			{/* <Text>Transactions</Text> */}
			{/* <TransactionsOutput
				periodName="All transactions"
				transactions={transactionsCtx.transactions}
			/> */}
			<CurrentMonthTransactions />

			<Link href="/">Back home</Link>
		</View>
	);
}
