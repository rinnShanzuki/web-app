import { Tabs } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import ResponderTopBar from "../components/ResponderTopBar";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useDepartment, DepartmentProvider } from "../contexts/DepartmentContext";

function ResponderTabsContent() {
    const { department } = useDepartment();

    const tabBarColors = department?.colors.gradient || ["#D30019", "#3F0008"];
    const activeTintColor = "#fff";
    const inactiveTintColor = "#eee";

    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
                {/* Top Bar visible on all tabs */}
                <ResponderTopBar />

                <Tabs
                    screenOptions={{
                        headerShown: false,
                        tabBarShowLabel: true,
                        tabBarActiveTintColor: activeTintColor,
                        tabBarInactiveTintColor: inactiveTintColor,
                        tabBarStyle: {
                            height: 65,
                            paddingBottom: 8,
                            borderTopWidth: 0,
                            backgroundColor: "transparent",
                            position: "absolute",
                        },
                        tabBarBackground: () => (
                            <LinearGradient
                                colors={tabBarColors}
                                start={{ x: 0.5, y: 0 }}
                                end={{ x: 0.5, y: 1 }}
                                style={{ flex: 1 }}
                            />
                        ),
                    }}
                >
                    {/* Map Screen */}
                    <Tabs.Screen
                        name="ResponderMapScreen"
                        options={{
                            title: "Map",
                            tabBarIcon: ({ focused, color }) => (
                                <Ionicons
                                    name={focused ? "map" : "map-outline"}
                                    size={24}
                                    color={color}
                                />
                            ),
                        }}
                    />

                    {/* Alerts Screen */}
                    <Tabs.Screen
                        name="NotificationsScreen"
                        options={{
                            title: "Alerts",
                            tabBarIcon: ({ focused, color }) => (
                                <Ionicons
                                    name={focused ? "notifications" : "notifications-outline"}
                                    size={24}
                                    color={color}
                                />
                            ),
                        }}
                    />

                    {/* Profile Screen */}
                    <Tabs.Screen
                        name="ResponderProfileScreen"
                        options={{
                            title: "Profile",
                            tabBarIcon: ({ focused, color }) => (
                                <Ionicons
                                    name={focused ? "person" : "person-outline"}
                                    size={24}
                                    color={color}
                                />
                            ),
                        }}
                    />
                </Tabs>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

export default function ResponderTabsLayout() {
    return (
        <DepartmentProvider>
            <ResponderTabsContent />
        </DepartmentProvider>
    );
}
