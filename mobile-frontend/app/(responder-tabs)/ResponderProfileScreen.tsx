import React from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
    Switch,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDepartment } from "../contexts/DepartmentContext";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ResponderProfileScreen() {
    const { department } = useDepartment();
    const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
    const [locationSharing, setLocationSharing] = React.useState(true);

    const handleLogout = async () => {
        try {
            await AsyncStorage.multiRemove(["@responder_department", "@auth_token"]);
            router.replace("/(responder-auth)/ResponderLogin");
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    const renderStat = (label: string, value: string | number) => (
        <View style={styles.statBox}>
            <Text style={[styles.statValue, { color: department?.colors.primary }]}>
                {value}
            </Text>
            <Text style={styles.statLabel}>{label}</Text>
        </View>
    );

    const renderSettingItem = (
        icon: string,
        label: string,
        value?: boolean,
        onToggle?: (value: boolean) => void,
        onPress?: () => void
    ) => (
        <TouchableOpacity
            style={styles.settingItem}
            onPress={onPress}
            disabled={!!onToggle}
            activeOpacity={onPress ? 0.7 : 1}
        >
            <View style={styles.settingLeft}>
                <Ionicons name={icon as any} size={22} color={department?.colors.primary} />
                <Text style={styles.settingLabel}>{label}</Text>
            </View>
            {onToggle ? (
                <Switch
                    value={value}
                    onValueChange={onToggle}
                    trackColor={{ false: "#ccc", true: `${department?.colors.primary}80` }}
                    thumbColor={value ? department?.colors.primary : "#f4f3f4"}
                />
            ) : (
                <Ionicons name="chevron-forward" size={20} color="#ccc" />
            )}
        </TouchableOpacity>
    );

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            {/* Profile Header */}
            <View style={[styles.header, { backgroundColor: department?.colors.primary }]}>
                <View style={styles.avatarContainer}>
                    <View style={styles.avatar}>
                        <Ionicons name="person" size={50} color="#fff" />
                    </View>
                    <TouchableOpacity style={styles.editAvatarButton}>
                        <Ionicons name="camera" size={18} color="#fff" />
                    </TouchableOpacity>
                </View>
                <Text style={styles.name}>Responder Name</Text>
                <Text style={styles.email}>responder@example.com</Text>
                <View style={styles.departmentBadge}>
                    <Image
                        source={department?.icon.filled}
                        style={styles.departmentIcon}
                    />
                    <Text style={styles.departmentText}>{department?.fullName}</Text>
                </View>
            </View>

            {/* Statistics */}
            <View style={styles.statsContainer}>
                {renderStat("Incidents", 24)}
                {renderStat("Avg Response", "8 min")}
                {renderStat("Rating", "4.8")}
            </View>

            {/* Settings Section */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Notifications</Text>
                {renderSettingItem(
                    "notifications-outline",
                    "Push Notifications",
                    notificationsEnabled,
                    setNotificationsEnabled
                )}
                {renderSettingItem(
                    "volume-high-outline",
                    "Sound Alerts",
                    true,
                    () => { }
                )}
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Location</Text>
                {renderSettingItem(
                    "location-outline",
                    "Share Location",
                    locationSharing,
                    setLocationSharing
                )}
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Account</Text>
                {renderSettingItem(
                    "person-outline",
                    "Edit Profile",
                    undefined,
                    undefined,
                    () => router.push("/(responder-forms)/editProfileScreen")
                )}
                {renderSettingItem(
                    "lock-closed-outline",
                    "Change Password",
                    undefined,
                    undefined,
                    () => { }
                )}
                {renderSettingItem(
                    "help-circle-outline",
                    "Help & Support",
                    undefined,
                    undefined,
                    () => { }
                )}
            </View>

            {/* Logout Button */}
            <TouchableOpacity
                style={[styles.logoutButton, { borderColor: department?.colors.primary }]}
                onPress={handleLogout}
            >
                <Ionicons name="log-out-outline" size={22} color={department?.colors.primary} />
                <Text style={[styles.logoutText, { color: department?.colors.primary }]}>
                    Logout
                </Text>
            </TouchableOpacity>

            <Text style={styles.version}>Version 1.0.0</Text>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    content: {
        paddingBottom: 100,
    },
    header: {
        alignItems: "center",
        paddingVertical: 30,
        paddingHorizontal: 20,
    },
    avatarContainer: {
        position: "relative",
        marginBottom: 15,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: "rgba(255, 255, 255, 0.3)",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 3,
        borderColor: "#fff",
    },
    editAvatarButton: {
        position: "absolute",
        bottom: 0,
        right: 0,
        width: 35,
        height: 35,
        borderRadius: 18,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    name: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#fff",
        marginBottom: 5,
    },
    email: {
        fontSize: 14,
        color: "#fff",
        opacity: 0.9,
        marginBottom: 15,
    },
    departmentBadge: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 20,
    },
    departmentIcon: {
        width: 20,
        height: 20,
        tintColor: "#fff",
        marginRight: 8,
    },
    departmentText: {
        color: "#fff",
        fontSize: 12,
        fontWeight: "600",
    },
    statsContainer: {
        flexDirection: "row",
        backgroundColor: "#fff",
        marginHorizontal: 15,
        marginTop: -20,
        borderRadius: 12,
        padding: 15,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
    },
    statBox: {
        flex: 1,
        alignItems: "center",
    },
    statValue: {
        fontSize: 24,
        fontWeight: "bold",
    },
    statLabel: {
        fontSize: 12,
        color: "#666",
        marginTop: 4,
    },
    section: {
        backgroundColor: "#fff",
        marginHorizontal: 15,
        marginTop: 20,
        borderRadius: 12,
        padding: 15,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 15,
    },
    settingItem: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#f0f0f0",
    },
    settingLeft: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },
    settingLabel: {
        fontSize: 15,
        color: "#333",
        marginLeft: 12,
    },
    logoutButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 15,
        marginTop: 30,
        paddingVertical: 15,
        borderRadius: 12,
        borderWidth: 2,
        backgroundColor: "#fff",
    },
    logoutText: {
        fontSize: 16,
        fontWeight: "bold",
        marginLeft: 8,
    },
    version: {
        textAlign: "center",
        color: "#999",
        fontSize: 12,
        marginTop: 20,
    },
});
