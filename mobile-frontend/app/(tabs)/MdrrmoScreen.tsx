import { StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import EmergencyButton from "../components/EmergencyButton";
import VoiceButton from "../components/VoiceButton";

export default function MdrrmoScreen() {
  return (
    <LinearGradient colors={["#ffffff", "#ffffff"]} style={styles.container}>
      <View style={styles.content}>
        <EmergencyButton label="Send Emergency Alert" />
        <VoiceButton label="Send Voice Message" />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 25,
  },
});
