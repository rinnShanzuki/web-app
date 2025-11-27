import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDepartment } from "../contexts/DepartmentContext";

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

interface NotificationCardProps {
    notification: Notification;
    onPress: () => void;
}

export default function NotificationCard({ notification, onPress }: NotificationCardProps) {
    const { department } = useDepartment();

    const formatTime = (date: Date) => {
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (minutes < 1) return "Just now";
        if (minutes < 60) return `${minutes}m ago`;
        if (hours < 24) return `${hours}h ago`;
        return `${days}d ago`;
    };

    return (
        <TouchableOpacity
            style={[
                styles.card,
                !notification.isRead && styles.unreadCard,
            ]}
            onPress={onPress}
            activeOpacity={0.7}
        >
            {/* Icon Section */}
            <View
                style={[
                    styles.iconContainer,
                    { backgroundColor: `${department?.colors.primary}20` },
                ]}
            >
                <Ionicons
                    name={notification.type === "voice" ? "mic" : "alert-circle"}
                    size={28}
                    color={department?.colors.primary}
                />
            </View>

            {/* Content Section */}
            <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.title} numberOfLines={1}>
                        {notification.title}
                    </Text>
                    {!notification.isRead && <View style={styles.unreadDot} />}
                </View>

                <View style={styles.infoRow}>
                    <Ionicons name="person-outline" size={14} color="#666" />
                    <Text style={styles.infoText}>{notification.senderName}</Text>
                </View>

                <View style={styles.infoRow}>
                    <Ionicons name="location-outline" size={14} color="#666" />
                    <Text style={styles.infoText} numberOfLines={1}>
                        {notification.location}
                    </Text>
                </View>

                <View style={styles.footer}>
                    <Text style={styles.timestamp}>{formatTime(notification.timestamp)}</Text>
                    {notification.type === "voice" && (
                        <View style={styles.voiceBadge}>
                            <Ionicons name="mic" size={12} color="#fff" />
                            <Text style={styles.voiceBadgeText}>Voice</Text>
                        </View>
                    )}
                </View>
            </View>

            {/* Arrow */}
            <Ionicons name="chevron-forward" size={20} color="#ccc" />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        backgroundColor: "#fff",
        padding: 15,
        marginHorizontal: 15,
        marginVertical: 6,
        borderRadius: 12,
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
    },
    unreadCard: {
        backgroundColor: "#FFF9F0",
        borderLeftWidth: 4,
        borderLeftColor: "#D64219",
    },
    iconContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },
    content: {
        flex: 1,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 6,
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
        flex: 1,
    },
    unreadDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "#DC2626",
        marginLeft: 8,
    },
    infoRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 4,
    },
    infoText: {
        fontSize: 13,
        color: "#666",
        marginLeft: 6,
        flex: 1,
    },
    footer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 6,
    },
    timestamp: {
        fontSize: 12,
        color: "#999",
    },
    voiceBadge: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#920114",
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 10,
    },
    voiceBadgeText: {
        color: "#fff",
        fontSize: 10,
        marginLeft: 4,
        fontWeight: "600",
    },
});
