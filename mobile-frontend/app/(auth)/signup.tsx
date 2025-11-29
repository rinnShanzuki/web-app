import React, { useState } from "react";
import { router } from "expo-router";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  StatusBar,
  Alert,
  ActivityIndicator,
  Modal,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import clientAuthService from "../../services/clientAuthService";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [birthday, setBirthday] = useState<Date>(new Date());
  const [sex, setSex] = useState("");
  const [showSexModal, setShowSexModal] = useState(false);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loading, setLoading] = useState(false);

  const formatDate = (date: Date) => {
    const d = String(date.getDate()).padStart(2, "0");
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const y = date.getFullYear();
    return `${y}-${m}-${d}`;
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setBirthday(selectedDate);
    }
  };

  const handleRegister = async () => {
    if (!fullName || !email || !password || !confirmPassword || !sex) {
      Alert.alert("Validation Error", "Please fill in all required fields");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Validation Error", "Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Validation Error", "Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const registrationData = {
        name: fullName,
        email: email.toLowerCase().trim(),
        password: password,
        password_confirmation: confirmPassword,  // ✔ REQUIRED
        gender: sex,
        birthdate: formatDate(birthday),
      };
      
      await clientAuthService.register(registrationData);

      Alert.alert("Success!", "Your account has been created successfully!", [
        {
          text: "OK",
          onPress: () => router.replace("/(tabs)/home"),
        },
      ]);
    } catch (error: any) {
      console.error("Registration error:", error);

      if (error.errors) {
        const errorMessages = Object.values(error.errors).flat().join("\n");
        Alert.alert("Validation Error", errorMessages);
      } else {
        Alert.alert(
          "Registration Failed",
          error.message || "An error occurred during registration"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={["#D64219", "#920114", "#3F0008"]}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" />

      <SafeAreaView style={styles.innerContainer}>
        <View style={styles.card}>
          <Image
            source={require("../../assets/images/logo.png")}
            style={styles.logo}
          />

          <Text style={styles.title}>Create Your Account</Text>
          <Text style={styles.subtitle}>Join RES-Q and stay protected.</Text>

          {/* Full Name */}
          <View style={styles.inputContainer}>
            <Ionicons name="person-outline" size={18} color="#fff" />
            <TextInput
              placeholder="Full Name *"
              placeholderTextColor="#ccc"
              style={styles.input}
              value={fullName}
              onChangeText={setFullName}
              editable={!loading}
            />
          </View>

          {/* Email */}
          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={18} color="#fff" />
            <TextInput
              placeholder="Email *"
              placeholderTextColor="#ccc"
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              editable={!loading}
            />
          </View>

          {/* Password */}
          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={18} color="#fff" />
            <TextInput
              placeholder="Password *"
              placeholderTextColor="#ccc"
              secureTextEntry={!showPassword}
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              editable={!loading}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons
                name={showPassword ? "eye-outline" : "eye-off-outline"}
                size={18}
                color="#fff"
              />
            </TouchableOpacity>
          </View>

          {/* Confirm Password */}
          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={18} color="#fff" />
            <TextInput
              placeholder="Confirm Password *"
              placeholderTextColor="#ccc"
              secureTextEntry={!showConfirmPassword}
              style={styles.input}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              editable={!loading}
            />
            <TouchableOpacity
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <Ionicons
                name={showConfirmPassword ? "eye-outline" : "eye-off-outline"}
                size={18}
                color="#fff"
              />
            </TouchableOpacity>
          </View>

          {/* Birthday */}
          <TouchableOpacity
            style={styles.inputContainer}
            onPress={() => !loading && setShowDatePicker(true)}
            disabled={loading}
          >
            <Ionicons name="calendar-outline" size={18} color="#fff" />
            <Text style={[styles.input, { color: "#fff" }]}>
              {formatDate(birthday)}
            </Text>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={birthday}
              mode="date"
              display="default"
              onChange={handleDateChange}
              maximumDate={new Date()}
            />
          )}

          {/* SEX FIELD (Dropdown opens modal) */}
          <TouchableOpacity
            style={styles.inputContainer}
            onPress={() => setShowSexModal(true)}
          >
            <Ionicons name="male-female-outline" size={18} color="#fff" />
            <Text style={[styles.input, { color: sex ? "#fff" : "#ccc" }]}>
              {sex ? sex : "Sex *"}
            </Text>
          </TouchableOpacity>

          {/* Modal for selecting sex */}
          <Modal transparent={true} visible={showSexModal} animationType="fade">
            <View style={styles.modalOverlay}>
              <View style={styles.modalBox}>
                <Text style={styles.modalTitle}>Select Sex</Text>

                <TouchableOpacity
                  style={styles.modalOption}
                  onPress={() => {
                    setSex("Male");
                    setShowSexModal(false);
                  }}
                >
                  <Text style={styles.modalOptionText}>Male</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.modalOption}
                  onPress={() => {
                    setSex("Female");
                    setShowSexModal(false);
                  }}
                >
                  <Text style={styles.modalOptionText}>Female</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.modalCancel}
                  onPress={() => setShowSexModal(false)}
                >
                  <Text style={styles.modalCancelText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          {/* Create Account */}
          <TouchableOpacity
            style={[styles.loginButton, loading && styles.disabledButton]}
            onPress={handleRegister}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#920114" />
            ) : (
              <Text style={styles.loginText}>Create Account</Text>
            )}
          </TouchableOpacity>

          {/* Back to Login */}
          <TouchableOpacity
            onPress={() => !loading && router.push("/(auth)/login")}
            disabled={loading}
          >
            <Text style={styles.signupText}>
              Already have an account? Login
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  innerContainer: { flex: 1, justifyContent: "center", paddingHorizontal: 20 },
  card: {
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 16,
    padding: 25,
    alignItems: "center",
  },
  logo: { width: 60, height: 60, marginBottom: 10 },
  title: { fontSize: 20, color: "#fff", fontWeight: "bold" },
  subtitle: { color: "#fff", opacity: 0.8, marginBottom: 30 },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: "#fff",
    borderBottomWidth: 1,
    marginBottom: 20,
    paddingVertical: 5,
    width: "100%",
  },
  input: { flex: 1, paddingVertical: 5, color: "#fff" },
  loginButton: {
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingVertical: 12,
    width: "100%",
    marginTop: 10,
  },
  disabledButton: { opacity: 0.6 },
  loginText: {
    textAlign: "center",
    color: "#920114",
    fontWeight: "bold",
  },
  signupText: { marginTop: 15, color: "#fff", opacity: 0.8 },

  /* MODAL STYLES */
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 20,
  },
  modalBox: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
  },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 15 },
  modalOption: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  modalOptionText: { fontSize: 16 },
  modalCancel: { paddingVertical: 12, marginTop: 10 },
  modalCancelText: {
    color: "red",
    textAlign: "center",
    fontWeight: "bold",
  },
});
