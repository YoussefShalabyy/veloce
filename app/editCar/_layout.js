import { Tabs } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Colors from "../../constants/Colors";

export default function EditCarLayout() {
    return (
        <SafeAreaProvider>
            <Tabs screenOptions={{
                tabBarActiveTintColor: Colors.light.tabIconSelected,
                tabBarActiveBackgroundColor: Colors.light.tint,
                tabBarInactiveTintColor: Colors.light.tabIconDefault,
                tabBarInactiveBackgroundColor: Colors.light.secondBackground,
            }} >
                <Tabs.Screen
                    name="[id]"
                    options={{
                    headerShown: false,
                    tabBarIcon: ({ color }) => <FontAwesome name="pencil" size={30} color={color} />,
                    title: 'Edit basic info'
                }}/>
                <Tabs.Screen
                    name="editImages"
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ color }) => <FontAwesome name="image" size={30} color={color} />,
                    }}
                />
            </Tabs>
        </SafeAreaProvider>
    )
}