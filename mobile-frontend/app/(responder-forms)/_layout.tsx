import { Stack } from "expo-router";
import { DepartmentProvider } from "../contexts/DepartmentContext";

function ResponderFormsContent() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
                animation: "slide_from_right",
            }}
        >
            <Stack.Screen name="editProfileScreen" />
        </Stack>
    );
}

export default function ResponderFormsLayout() {
    return (
        <DepartmentProvider>
            <ResponderFormsContent />
        </DepartmentProvider>
    );
}
