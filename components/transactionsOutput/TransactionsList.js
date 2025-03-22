import { FlatList, Text } from "react-native";
import TransactionItem from "@/components/transactionsOutput/TransactionItem";

const TransactionsList = ({ transactions }) => {
	const renderTransaction = ({ item }) => {
		return (
			<TransactionItem
				description={item.description}
				amount={item.amount}
				date={item.date}
				user={item.user}
				id={item.id}
			/>
		);
	};
	return (
		<FlatList
			data={transactions}
			renderItem={renderTransaction}
			keyExtractor={(item) => item.id}
		/>
	);
};

export default TransactionsList;
