import { View, Text } from "react-native";
import TransactionsSummary from "@/components/transactionsOutput/TransactionsSummary";
import TransactionsList from "@/components/transactionsOutput/TransactionsList";

const TransactionsOutput = ({ periodName, transactions }) => {
	return (
		<View>
			<TransactionsSummary
				transactions={transactions}
				periodName={periodName}
			/>
			<TransactionsList transactions={transactions} />
		</View>
	);
};

export default TransactionsOutput;
