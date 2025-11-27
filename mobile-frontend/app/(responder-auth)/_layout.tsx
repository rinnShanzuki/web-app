import { Stack } from "expo-router";
import { DepartmentProvider } from "../contexts/DepartmentContext";

export default function ResponderAuthLayout() {
    return (
        <DepartmentProvider>
            <Stack
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen name="ResponderLogin" />
                <Stack.Screen name="ResponderSignup" />
            </Stack>
        </DepartmentProvider>
    );
}
