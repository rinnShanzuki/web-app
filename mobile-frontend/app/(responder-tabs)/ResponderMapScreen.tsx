import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Modal,
    Alert,
} from "react-native";
import MapView, { Marker, Circle } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { useDepartment } from "../contexts/DepartmentContext";
import { router } from "expo-router";

interface Incident {
    id: string;
    lat: number;
    lng: number;
    title: string;
    type: "alert" | "voice";
    department: string;
    timestamp: Date;
    senderName: string;
    status: "new" | "in-progress" | "resolved";
}

export default function ResponderMapScreen() {
    const { department } = useDepartment();
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [fullScreenMap, setFullScreenMap] = useState(false);
    const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);

    // Mock incidents data - filtered by department
    const allIncidents: Incident[] = [
        {
            id: "1",
            lat: 14.5995,
            lng: 120.9842,
            title: "Fire Emergency",
            type: "alert",
            department: "BFP",
            timestamp: new Date(),
            senderName: "Juan Dela Cruz",
            status: "new",
        },
        {
            id: "2",
            lat: 14.6002,
            lng: 120.982,
            title: "Medical Emergency",
            type: "voice",
            department: "RDH",
            timestamp: new Date(),
            senderName: "Maria Santos",
            status: "new",
        },
        {
            id: "3",
            lat: 14.598,
            lng: 120.9855,
            title: "Flood Report",
            type: "alert",
            department: "MDRRMO",
            timestamp: new Date(),
            senderName: "Pedro Garcia",
            status: "in-progress",
        },
        {
            id: "4",
            lat: 14.5988,
            lng: 120.9830,
            title: "Crime Report",
            type: "alert",
            department: "PNP",
            timestamp: new Date(),
            senderName: "Ana Reyes",
            status: "new",
        },
    ];

    // Filter incidents by department
    const incidents = allIncidents.filter(
        (incident) => incident.department === department?.code
    );

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                Alert.alert("Permission Denied", "Location permission is required to show your position on the map.");
                return;
            }

            let currentLocation = await Location.getCurrentPositionAsync({});
            setLocation(currentLocation);
        })();
    }, []);

    const mapRegion = {
        latitude: location?.coords.latitude || 14.5995,
        longitude: location?.coords.longitude || 120.9842,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
    };

    const handleMarkerPress = (incident: Incident) => {
        setSelectedIncident(incident);
    };

    const handleViewDetails = () => {
        if (selectedIncident) {
            // Navigate to incident details screen
            // For now, just close the modal
            setSelectedIncident(null);
            Alert.alert("Navigation", "Would navigate to incident details screen");
        }
    };

    const getMarkerColor = (status: string) => {
        switch (status) {
            case "new":
                return "#DC2626"; // Red
            case "in-progress":
                return "#F59E0B"; // Orange
            case "resolved":
                return "#10B981"; // Green
            default:
                return "#DC2626";
        }
    };

    const renderMap = () => (
        <MapView style={{ flex: 1 }} initialRegion={mapRegion} showsUserLocation>
            {/* Responder's current location circle */}
            {location && (
                <Circle
                    center={{
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                    }}
                    radius={500}
                    fillColor={`${department?.colors.primary}30`}
                    strokeColor={department?.colors.primary}
                    strokeWidth={2}
                />
            )}

            {/* Incident markers */}
            {incidents.map((incident) => (
                <Marker
                    key={incident.id}
                    coordinate={{ latitude: incident.lat, longitude: incident.lng }}
                    title={incident.title}
                    description={incident.senderName}
                    pinColor={getMarkerColor(incident.status)}
                    onPress={() => handleMarkerPress(incident)}
                />
            ))}
        </MapView>
    );

    return (
        <View style={styles.container}>
            {/* Stats Bar */}
            <View style={[styles.statsBar, { backgroundColor: department?.colors.primary }]}>
                <View style={styles.statItem}>
                    <Text style={styles.statNumber}>{incidents.filter(i => i.status === "new").length}</Text>
                    <Text style={styles.statLabel}>New</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                    <Text style={styles.statNumber}>{incidents.filter(i => i.status === "in-progress").length}</Text>
                    <Text style={styles.statLabel}>In Progress</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                    <Text style={styles.statNumber}>{incidents.length}</Text>
                    <Text style={styles.statLabel}>Total Today</Text>
                </View>
            </View>

            {/* Map */}
            <View style={styles.mapContainer}>{renderMap()}</View>

            {/* Fullscreen Toggle */}
            <TouchableOpacity
                style={[styles.fullscreenButton, { backgroundColor: department?.colors.primary }]}
                onPress={() => setFullScreenMap(true)}
            >
                <Ionicons name="expand-outline" size={24} color="#fff" />
            </TouchableOpacity>

            {/* Legend */}
            <View style={styles.legend}>
                <Text style={styles.legendTitle}>Status Legend:</Text>
                <View style={styles.legendRow}>
                    <View style={[styles.legendDot, { backgroundColor: "#DC2626" }]} />
                    <Text style={styles.legendText}>New</Text>
                    <View style={[styles.legendDot, { backgroundColor: "#F59E0B" }]} />
                    <Text style={styles.legendText}>In Progress</Text>
                    <View style={[styles.legendDot, { backgroundColor: "#10B981" }]} />
                    <Text style={styles.legendText}>Resolved</Text>
                </View>
            </View>

            {/* Full Screen Map Modal */}
            <Modal visible={fullScreenMap} animationType="slide">
                <View style={{ flex: 1 }}>
                    {renderMap()}
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => setFullScreenMap(false)}
                    >
                        <Ionicons name="close-circle" size={50} color={department?.colors.primary} />
                    </TouchableOpacity>
                </View>
            </Modal>

            {/* Incident Preview Modal */}
            <Modal
                visible={selectedIncident !== null}
                transparent
                animationType="fade"
                onRequestClose={() => setSelectedIncident(null)}
            >
                <TouchableOpacity
                    style={styles.modalOverlay}
                    activeOpacity={1}
                    onPress={() => setSelectedIncident(null)}
                >
                    <View style={styles.incidentPreview}>
                        <View style={styles.previewHeader}>
                            <Ionicons
                                name={selectedIncident?.type === "voice" ? "mic" : "alert-circle"}
                                size={24}
                                color={department?.colors.primary}
                            />
                            <Text style={styles.previewTitle}>{selectedIncident?.title}</Text>
                        </View>
                        <Text style={styles.previewSender}>From: {selectedIncident?.senderName}</Text>
                        <Text style={styles.previewTime}>
                            {selectedIncident?.timestamp.toLocaleTimeString()}
                        </Text>
                        <View style={styles.previewActions}>
                            <TouchableOpacity
                                style={[styles.previewButton, { backgroundColor: department?.colors.primary }]}
                                onPress={handleViewDetails}
                            >
                                <Text style={styles.previewButtonText}>View Details</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.previewButtonOutline}
                                onPress={() => setSelectedIncident(null)}
                            >
                                <Text style={[styles.previewButtonTextOutline, { color: department?.colors.primary }]}>
                                    Close
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    statsBar: {
        flexDirection: "row",
        justifyContent: "space-around",
        paddingVertical: 15,
        paddingHorizontal: 10,
    },
    statItem: {
        alignItems: "center",
        flex: 1,
    },
    statNumber: {
        color: "#fff",
        fontSize: 24,
        fontWeight: "bold",
    },
    statLabel: {
        color: "#fff",
        fontSize: 12,
        marginTop: 2,
    },
    statDivider: {
        width: 1,
        backgroundColor: "rgba(255, 255, 255, 0.3)",
    },
    mapContainer: {
        flex: 1,
    },
    fullscreenButton: {
        position: "absolute",
        top: 100,
        right: 15,
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        elevation: 5,
    },
    legend: {
        position: "absolute",
        bottom: 80,
        left: 10,
        right: 10,
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        padding: 12,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
    },
    legendTitle: {
        fontWeight: "bold",
        marginBottom: 8,
        fontSize: 13,
    },
    legendRow: {
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap",
    },
    legendDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        marginRight: 5,
        marginLeft: 10,
    },
    legendText: {
        fontSize: 12,
        marginRight: 5,
    },
    closeButton: {
        position: "absolute",
        top: 40,
        right: 20,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    incidentPreview: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 20,
        width: "85%",
        maxWidth: 400,
    },
    previewHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
    },
    previewTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginLeft: 10,
        flex: 1,
    },
    previewSender: {
        fontSize: 14,
        color: "#666",
        marginBottom: 5,
    },
    previewTime: {
        fontSize: 12,
        color: "#999",
        marginBottom: 15,
    },
    previewActions: {
        flexDirection: "row",
        gap: 10,
    },
    previewButton: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: "center",
    },
    previewButtonText: {
        color: "#fff",
        fontWeight: "bold",
    },
    previewButtonOutline: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#ccc",
    },
    previewButtonTextOutline: {
        fontWeight: "bold",
    },
});
