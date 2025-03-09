import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Transactions() {
	return (
		<View
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Text>Transactions</Text>

			<Link href="/">Back home</Link>
		</View>
	);
}
