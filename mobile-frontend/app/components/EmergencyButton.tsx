import React, { useEffect, useRef } from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  Animated,
  View,
} from "react-native";

export default function EmergencyButton({ label }: { label: string }) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const animate = () => {
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 0.95,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => animate());
    };

    animate();
  }, []);

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity style={styles.button} activeOpacity={0.8}>
        <Image
          source={require("../../assets/images/alert.png")}
          style={styles.icon}
        />
        <Text style={styles.text}>Send Emergency Alert</Text>
        <Text style={styles.subText}>Click for immediate response</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#D64219",
    borderRadius: 60,
    paddingVertical: 30,
    marginBottom: 40,  // ⬆ Buttons raised slightly
    alignItems: "center",

    // ⭐ Soft shadow:
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  icon: {
    width: 40,
    height: 40,
    marginBottom: 10,
    tintColor: "#fff",
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
  },
  subText: {
    color: "#fff",
    opacity: 0.9,
    fontSize: 12,
    marginTop: 3,
  },
});
