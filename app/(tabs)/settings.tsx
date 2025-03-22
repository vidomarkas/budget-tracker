import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Settings() {
	return (
		<View
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Text>Settings</Text>
			<Text>Currency: £</Text>

			<Link href="/">Back home</Link>
		</View>
	);
}
