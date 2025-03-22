import { Stack } from "expo-router";
import ExpensesContextProvider from "../store/transactions-context";

export default function RootLayout() {
	return (
		<ExpensesContextProvider>
			<Stack
				screenOptions={{
					headerStyle: {
						backgroundColor: "#f4511e",
					},
					headerTintColor: "#fff",
					headerTitleStyle: {
						fontWeight: "bold",
					},
				}}
			>
				<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
				<Stack.Screen
					name="edit-transaction"
					options={{
						title: "Edit Transaction",
						headerShown: true,
						presentation: "modal",
					}}
				/>
			</Stack>
		</ExpensesContextProvider>
	);
}
