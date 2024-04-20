import { Stack, Tabs } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function EditCarLayout() {
    return (
        <SafeAreaProvider>
            <Stack>
                <Stack.Screen
                    name="[id]"
                    options={{
                    headerTitle: 'Car Info',
                }}/>
                <Stack.Screen
                    name="editImages"
                    options={{
                        headerTitle: 'Car Imgaes',
                    }}
                />
            </Stack>
        </SafeAreaProvider>
    )
}