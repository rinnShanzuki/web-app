import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    RefreshControl,
    Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDepartment } from "../contexts/DepartmentContext";
import NotificationCard from "../components/NotificationCard";

interface Notification {
    id: string;
    type: "alert" | "voice";
    title: string;
    senderName: string;
    location: string;
    timestamp: Date;
    isRead: boolean;
    department: string;
}

export default function NotificationsScreen() {
    const { department } = useDepartment();
    const [refreshing, setRefreshing] = useState(false);
    const [filter, setFilter] = useState<"all" | "alert" | "voice">("all");

    // Mock notifications data
    const allNotifications: Notification[] = [
        {
            id: "1",
            type: "alert",
            title: "Fire Emergency - Residential Area",
            senderName: "Juan Dela Cruz",
            location: "123 Main St, Manila",
            timestamp: new Date(Date.now() - 5 * 60000), // 5 minutes ago
            isRead: false,
            department: "BFP",
        },
        {
            id: "2",
            type: "voice",
            title: "Medical Emergency",
            senderName: "Maria Santos",
            location: "456 Oak Ave, Quezon City",
            timestamp: new Date(Date.now() - 15 * 60000), // 15 minutes ago
            isRead: false,
            department: "RDH",
        },
        {
            id: "3",
            type: "alert",
            title: "Flood Report - Low-lying Area",
            senderName: "Pedro Garcia",
            location: "789 River Rd, Pasig",
            timestamp: new Date(Date.now() - 30 * 60000), // 30 minutes ago
            isRead: true,
            department: "MDRRMO",
        },
        {
            id: "4",
            type: "voice",
            title: "Crime Report - Robbery",
            senderName: "Ana Reyes",
            location: "321 Park St, Makati",
            timestamp: new Date(Date.now() - 60 * 60000), // 1 hour ago
            isRead: false,
            department: "PNP",
        },
        {
            id: "5",
            type: "alert",
            title: "Building Fire - Commercial",
            senderName: "Carlos Mendoza",
            location: "555 Business Blvd, BGC",
            timestamp: new Date(Date.now() - 2 * 60 * 60000), // 2 hours ago
            isRead: true,
            department: "BFP",
        },
        {
            id: "6",
            type: "alert",
            title: "Landslide Warning",
            senderName: "Rosa Cruz",
            location: "Mountain View, Baguio",
            timestamp: new Date(Date.now() - 3 * 60 * 60000), // 3 hours ago
            isRead: true,
            department: "MDRRMO",
        },
    ];

    // Filter by department and type
    const notifications = allNotifications
        .filter((n) => n.department === department?.code)
        .filter((n) => filter === "all" || n.type === filter)
        .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

    const unreadCount = notifications.filter((n) => !n.isRead).length;

    const handleRefresh = async () => {
        setRefreshing(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setRefreshing(false);
    };

    const handleNotificationPress = (notification: Notification) => {
        // TODO: Navigate to incident details screen
        Alert.alert(
            notification.title,
            `From: ${notification.senderName}\nLocation: ${notification.location}\n\nWould navigate to incident details screen.`
        );
    };

    const renderFilterButton = (
        label: string,
        value: "all" | "alert" | "voice",
        icon: string
    ) => {
        const isActive = filter === value;
        return (
            <TouchableOpacity
                style={[
                    styles.filterButton,
                    isActive && {
                        backgroundColor: department?.colors.primary,
                    },
                ]}
                onPress={() => setFilter(value)}
            >
                <Ionicons
                    name={icon as any}
                    size={18}
                    color={isActive ? "#fff" : "#666"}
                />
                <Text
                    style={[
                        styles.filterText,
                        isActive && styles.filterTextActive,
                    ]}
                >
                    {label}
                </Text>
            </TouchableOpacity>
        );
    };

    const renderEmptyState = () => (
        <View style={styles.emptyState}>
            <Ionicons name="notifications-off-outline" size={64} color="#ccc" />
            <Text style={styles.emptyTitle}>No Notifications</Text>
            <Text style={styles.emptySubtitle}>You're all caught up! New alerts will appear here.</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <View>
                    <Text style={styles.headerTitle}>Notifications</Text>
                    {unreadCount > 0 && (
                        <Text style={styles.headerSubtitle}>
                            {unreadCount} unread notification{unreadCount > 1 ? "s" : ""}
                        </Text>
                    )}
                </View>
                <TouchableOpacity
                    style={[styles.markAllButton, { borderColor: department?.colors.primary }]}
                >
                    <Text style={[styles.markAllText, { color: department?.colors.primary }]}>
                        Mark all read
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Filters */}
            <View style={styles.filterContainer}>
                {renderFilterButton("All", "all", "list-outline")}
                {renderFilterButton("Alerts", "alert", "alert-circle-outline")}
                {renderFilterButton("Voice", "voice", "mic-outline")}
            </View>

            {/* Notification List */}
            <FlatList
                data={notifications}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <NotificationCard
                        notification={item}
                        onPress={() => handleNotificationPress(item)}
                    />
                )}
                contentContainerStyle={[
                    styles.listContent,
                    notifications.length === 0 && styles.listContentEmpty,
                ]}
                ListEmptyComponent={renderEmptyState}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={handleRefresh}
                        tintColor={department?.colors.primary}
                    />
                }
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 15,
        paddingVertical: 15,
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#333",
    },
    headerSubtitle: {
        fontSize: 13,
        color: "#666",
        marginTop: 2,
    },
    markAllButton: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 6,
        borderWidth: 1,
    },
    markAllText: {
        fontSize: 12,
        fontWeight: "600",
    },
    filterContainer: {
        flexDirection: "row",
        paddingHorizontal: 15,
        paddingVertical: 12,
        backgroundColor: "#fff",
        gap: 10,
    },
    filterButton: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: "#f0f0f0",
    },
    filterText: {
        marginLeft: 6,
        fontSize: 13,
        fontWeight: "600",
        color: "#666",
    },
    filterTextActive: {
        color: "#fff",
    },
    listContent: {
        paddingVertical: 10,
        paddingBottom: 80,
    },
    listContentEmpty: {
        flexGrow: 1,
    },
    emptyState: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 40,
    },
    emptyTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#999",
        marginTop: 15,
    },
    emptySubtitle: {
        fontSize: 14,
        color: "#bbb",
        textAlign: "center",
        marginTop: 8,
    },
});
