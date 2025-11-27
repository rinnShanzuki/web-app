import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { usePathname, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TopBar() {
  const path = usePathname();
  const router = useRouter();

  const getTitle = () => {
    if (path.includes("MdrrmoScreen")) return "MDRRMO";
    if (path.includes("PnpScreen")) return "PNP";
    if (path.includes("BfpScreen")) return "BFP";
    if (path.includes("RDHScreen")) return "RDH";
    if (path.includes("home")) return "HOME";
    return "RES-Q";
  };

  return (
    <View style={styles.topBar}>
      <Text style={styles.title}>{getTitle()}</Text>

      {/* MAKE IT CLICKABLE */}
      <TouchableOpacity onPress={() => router.push("/forms/ProfileForm")}>
        <Ionicons name="person-circle-outline" size={34} color="#D30019" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: {
    width: "100%",
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderColor: "#eee",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    color: "#D30019",
    fontSize: 22,
    fontWeight: "bold",
  },
});
