import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function RoleSelection() {
  const handleClientPress = () => {
    router.push("/(auth)/login");
  };

  const handleResponderPress = () => {
    router.push("/(responder-auth)/ResponderLogin");
  };

  return (
    <LinearGradient
      colors={["#D64219", "#920114", "#3F0008"]}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" />

      {/* Logo and Title */}
      <View style={styles.header}>
        <Image
          source={require("../assets/images/logo.png")}
          style={styles.logo}
        />
        <Text style={styles.title}>RES-Q</Text>
        <Text style={styles.subtitle}>Emergency Response System</Text>
      </View>

      {/* Role Selection Cards */}
      <View style={styles.cardsContainer}>
        <Text style={styles.selectText}>Select Your Role</Text>

        {/* Client Card */}
        <TouchableOpacity
          style={styles.card}
          onPress={handleClientPress}
          activeOpacity={0.9}
        >
          <View style={styles.cardContent}>
            <View style={styles.iconContainer}>
              <Ionicons name="person" size={50} color="#D64219" />
            </View>
            <View style={styles.cardTextContainer}>
              <Text style={styles.cardTitle}>Client</Text>
              <Text style={styles.cardDescription}>
                Report emergencies and request assistance
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={28} color="#D64219" />
          </View>
        </TouchableOpacity>

        {/* Responder Card */}
        <TouchableOpacity
          style={styles.card}
          onPress={handleResponderPress}
          activeOpacity={0.9}
        >
          <View style={styles.cardContent}>
            <View style={styles.iconContainer}>
              <Ionicons name="shield-checkmark" size={50} color="#D64219" />
            </View>
            <View style={styles.cardTextContainer}>
              <Text style={styles.cardTitle}>Responder</Text>
              <Text style={styles.cardDescription}>
                Respond to emergencies and save lives
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={28} color="#D64219" />
          </View>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Choose your role to get started
        </Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    alignItems: "center",
    marginTop: 80,
    marginBottom: 60,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    marginBottom: 20,
  },
  title: {
    fontSize: 42,
    fontWeight: "bold",
    color: "#fff",
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 14,
    color: "#fff",
    opacity: 0.9,
    marginTop: 5,
    letterSpacing: 1,
  },
  cardsContainer: {
    flex: 1,
  },
  selectText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "600",
    marginBottom: 25,
    textAlign: "center",
    opacity: 0.95,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
  },
  iconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#FFF0ED",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  cardTextContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 13,
    color: "#666",
    lineHeight: 18,
  },
  footer: {
    paddingBottom: 40,
    alignItems: "center",
  },
  footerText: {
    color: "#fff",
    fontSize: 13,
    opacity: 0.8,
  },
});
