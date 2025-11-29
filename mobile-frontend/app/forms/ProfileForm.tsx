import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Switch,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ProfileForm() {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [locationSharing, setLocationSharing] = useState(true);
  const [emergencyAlerts, setEmergencyAlerts] = useState(true);

  // Mock user data - replace with actual data from your backend
  const userData = {
    fullName: "Juan Dela Cruz",
    email: "juandelacruz@gmail.com",
    contactNumber: "09776527359",
    address: "Sitio Mangahan, Odiong, Roxas, Oriental Mindoro",
    sex: "Male",
    age: 21,
    birthday: "01/15/2003",
  };

  const handlePickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      alert("Permission to access photos is needed.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
      aspect: [1, 1],
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("@auth_token");
      router.replace("/(auth)/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const renderInfoCard = (icon: string, label: string, value: string) => (
    <View style={styles.infoCard}>
      <View style={styles.infoHeader}>
        <Ionicons name={icon as any} size={20} color="#D30019" />
        <Text style={styles.infoLabel}>{label}</Text>
      </View>
      <Text style={styles.infoValue}>{value}</Text>
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
        <Ionicons name={icon as any} size={22} color="#D30019" />
        <Text style={styles.settingLabel}>{label}</Text>
      </View>
      {onToggle ? (
        <Switch
          value={value}
          onValueChange={onToggle}
          trackColor={{ false: "#ccc", true: "#FFB3BA" }}
          thumbColor={value ? "#D30019" : "#f4f3f4"}
        />
      ) : (
        <Ionicons name="chevron-forward" size={20} color="#ccc" />
      )}
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Profile Header */}
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <TouchableOpacity onPress={handlePickImage} activeOpacity={0.8}>
            <View style={styles.avatar}>
              {profileImage ? (
                <Image source={{ uri: profileImage }} style={styles.avatarImage} />
              ) : (
                <Ionicons name="person" size={50} color="#fff" />
              )}
            </View>
            <View style={styles.editAvatarButton}>
              <Ionicons name="camera" size={18} color="#fff" />
            </View>
          </TouchableOpacity>
        </View>
        <Text style={styles.name}>{userData.fullName}</Text>
        <Text style={styles.email}>{userData.email}</Text>
        <View style={styles.citizenBadge}>
          <Ionicons name="shield-checkmark" size={18} color="#fff" />
          <Text style={styles.badgeText}>Verified Citizen</Text>
        </View>
      </View>

      {/* Quick Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>5</Text>
          <Text style={styles.statLabel}>Reports</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>2</Text>
          <Text style={styles.statLabel}>Active</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>3</Text>
          <Text style={styles.statLabel}>Resolved</Text>
        </View>
      </View>

      {/* Personal Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Personal Information</Text>
        {renderInfoCard("call-outline", "Contact Number", userData.contactNumber)}
        {renderInfoCard("location-outline", "Address", userData.address)}
        <View style={styles.infoRow}>
          <View style={[styles.infoCard, { flex: 1, marginRight: 8 }]}>
            <View style={styles.infoHeader}>
              <Ionicons name="male-female-outline" size={20} color="#D30019" />
              <Text style={styles.infoLabel}>Sex</Text>
            </View>
            <Text style={styles.infoValue}>{userData.sex}</Text>
          </View>
          <View style={[styles.infoCard, { flex: 1, marginLeft: 8 }]}>
            <View style={styles.infoHeader}>
              <Ionicons name="calendar-outline" size={20} color="#D30019" />
              <Text style={styles.infoLabel}>Age</Text>
            </View>
            <Text style={styles.infoValue}>{userData.age} years</Text>
          </View>
        </View>
        {renderInfoCard("gift-outline", "Birthday", userData.birthday)}
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
          "alert-circle-outline",
          "Emergency Alerts",
          emergencyAlerts,
          setEmergencyAlerts
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Privacy</Text>
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
          () => router.push("/forms/editProfileForm")
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
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={22} color="#D30019" />
        <Text style={styles.logoutText}>Logout</Text>
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
    backgroundColor: "#D30019",
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
    overflow: "hidden",
  },
  avatarImage: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
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
  citizenBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
    marginLeft: 6,
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
    color: "#D30019",
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
  infoCard: {
    backgroundColor: "#f9f9f9",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    borderLeftWidth: 3,
    borderLeftColor: "#D30019",
  },
  infoRow: {
    flexDirection: "row",
  },
  infoHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  infoLabel: {
    fontSize: 12,
    color: "#666",
    marginLeft: 6,
    fontWeight: "600",
  },
  infoValue: {
    fontSize: 15,
    color: "#333",
    fontWeight: "500",
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
    borderColor: "#D30019",
    backgroundColor: "#fff",
  },
  logoutText: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
    color: "#D30019",
  },
  version: {
    textAlign: "center",
    color: "#999",
    fontSize: 12,
    marginTop: 20,
  },
});
