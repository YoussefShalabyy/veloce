import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function EditCarLayout() {
    return (
        <SafeAreaProvider>
            <Stack>
                <Stack.Screen
                    name="[id]"
                    options={{
                    headerTitle: _ => <FontAwesome name="pencil" size={30} />,
                }}/>
                <Stack.Screen
                    name="editImages"
                    options={{
                        headerTitle: _ => <FontAwesome name="image" size={30} />,
                    }}
                />
            </Stack>
        </SafeAreaProvider>
    )
}