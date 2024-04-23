import { Stack, Tabs } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function EditCarLayout() {
    return (
        <SafeAreaProvider>
            <Tabs>
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