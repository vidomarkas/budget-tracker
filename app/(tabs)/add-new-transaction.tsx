import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function AddNewTransaction() {
	return (
		<View
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Text style={{ marginBottom: 20 }}>Add new Transaction</Text>

			<Link href="/">Back home</Link>
		</View>
	);
}
