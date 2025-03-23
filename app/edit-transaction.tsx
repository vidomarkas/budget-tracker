import { Text, View } from "react-native";
import { useLocalSearchParams, Link, router } from "expo-router";
import IconButton from "../components/UI/IconButton";
import { Button } from "../components/UI/Button";
import { useContext } from "react";
import { TransactionsContext } from "@/store/transactions-context";
import TransactionForm from "@/components/ManageTransaction/TransactionForm";

export default function EditTransaction() {
	const params = useLocalSearchParams();

	const editedTransactionId = params?.transactionId;

	const transactionsCtx = useContext(TransactionsContext);

	const selectedTransaction = transactionsCtx.transactions.find(
		(transaction) => transaction.id === editedTransactionId
	);

	const deleteTransactionHandler = () => {
		transactionsCtx.deleteTransaction(editedTransactionId);
		router.back();
	};
	const cancelHandler = () => {
		router.back();
	};
	const confirmHandler = (transactionData) => {
		transactionsCtx.updateTransaction(editedTransactionId, transactionData);
		router.back();
	};

	return (
		<View
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Text style={{ marginBottom: 20 }}>edit transaction</Text>
			<Text style={{ marginBottom: 20 }}>
				transaction id: {editedTransactionId}
			</Text>
			<TransactionForm
				onCancel={cancelHandler}
				onSubmit={confirmHandler}
				defaultValues={selectedTransaction}
			/>

			<IconButton
				icon="trash"
				color="red"
				size={36}
				onPress={deleteTransactionHandler}
			/>
		</View>
	);
}
