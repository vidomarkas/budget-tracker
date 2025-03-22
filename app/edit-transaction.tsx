import { Text, View } from "react-native";
import { useLocalSearchParams, Link, router } from "expo-router";
import IconButton from "../components/UI/IconButton";
import { Button } from "../components/UI/Button";
import { useContext } from "react";
import { TransactionsContext } from "@/store/transactions-context";

export default function EditTransaction() {
	const params = useLocalSearchParams();

	const id = params?.transactionId;

	const transactionsCtx = useContext(TransactionsContext);

	console.log("id", id);

	const deleteTransactionHandler = () => {
		transactionsCtx.deleteTransaction(id);
		console.log("deleted transaction id: ", id);
		router.back(); //close the modal
	};
	const cancelHandler = () => {
		router.back();
	};
	const confirmHandler = () => {
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
			<Text style={{ marginBottom: 20 }}>transaction id: {id}</Text>
			<View
				style={{
					flexDirection: "row",
				}}
			>
				<Button onPress={confirmHandler}>Update</Button>
				<Button mode="flat" onPress={cancelHandler}>
					Cancel
				</Button>
			</View>
			<IconButton
				icon="trash"
				color="red"
				size={36}
				onPress={deleteTransactionHandler}
			/>
		</View>
	);
}
