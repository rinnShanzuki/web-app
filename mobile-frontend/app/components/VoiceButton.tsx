import React, { useEffect, useRef } from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  Animated,
} from "react-native";

export default function VoiceButton({ label }: { label: string }) {
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
          source={require("../../assets/images/voice.png")}
          style={styles.icon}
        />
        <Text style={styles.text}>Send Voice Message</Text>
        <Text style={styles.subText}>Hold long enough for your message</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#920114",
    borderRadius: 60,
    paddingVertical: 30,
    marginBottom: 60,       // ⬆ Raised for better spacing
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
    tintColor: "#fff",
    marginBottom: 10,
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
