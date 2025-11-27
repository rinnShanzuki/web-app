import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useDepartment } from "../contexts/DepartmentContext";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ResponderTopBar() {
    const { department } = useDepartment();

    const handleLogout = async () => {
        try {
            // Clear stored data
            await AsyncStorage.multiRemove(["@responder_department", "@auth_token"]);
            // Navigate to login
            router.replace("/(responder-auth)/ResponderLogin");
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    if (!department) return null;

    return (
        <LinearGradient
            colors={department.colors.gradient}
            style={styles.container}
        >
            <View style={styles.content}>
                {/* Department Badge */}
                <View style={styles.leftSection}>
                    <Image
                        source={department.icon.filled}
                        style={styles.departmentIcon}
                    />
                    <View>
                        <Text style={styles.departmentName}>{department.name}</Text>
                        <Text style={styles.responderLabel}>Responder</Text>
                    </View>
                </View>

                {/* Right Section */}
                <View style={styles.rightSection}>
                    {/* Online Status */}
                    <View style={styles.statusContainer}>
                        <View style={styles.statusDot} />
                        <Text style={styles.statusText}>Online</Text>
                    </View>

                    {/* Logout Button */}
                    <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
                        <Ionicons name="log-out-outline" size={22} color="#fff" />
                    </TouchableOpacity>
                </View>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        paddingBottom: 12,
        paddingHorizontal: 15,
    },
    content: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    leftSection: {
        flexDirection: "row",
        alignItems: "center",
    },
    departmentIcon: {
        width: 35,
        height: 35,
        marginRight: 10,
        tintColor: "#fff",
    },
    departmentName: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    responderLabel: {
        color: "#fff",
        fontSize: 11,
        opacity: 0.9,
    },
    rightSection: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },
    statusContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 12,
    },
    statusDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "#4ADE80",
        marginRight: 5,
    },
    statusText: {
        color: "#fff",
        fontSize: 12,
        fontWeight: "600",
    },
    logoutButton: {
        padding: 5,
    },
});
