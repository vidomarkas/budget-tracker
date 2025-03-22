import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Tabs } from "expo-router";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
	const colorScheme = useColorScheme();
	return (
		<Tabs
			screenOptions={{
				tabBarShowLabel: false,
				tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: "Home",
					headerShown: false,
					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon
							name={focused ? "home" : "home-outline"}
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="transactions"
				options={{
					title: "Transactions",
					// headerShown: false,
					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon
							name={
								focused
									? "swap-horizontal"
									: "swap-horizontal-outline"
							}
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="add-new-transaction"
				options={{
					title: "Add new transaction",
					headerShown: true,
					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon
							name={focused ? "add-circle" : "add-circle-outline"}
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="settings"
				options={{
					title: "Settings",
					headerShown: true,
					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon
							name={
								focused
									? "ellipsis-horizontal"
									: "ellipsis-horizontal-outline"
							}
							color={color}
						/>
					),
				}}
			/>
		</Tabs>
	);
}
