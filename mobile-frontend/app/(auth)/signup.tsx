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
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthday, setBirthday] = useState<Date>(new Date());
  const [gender, setGender] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: "<YOUR_EXPO_CLIENT_ID>",
    iosClientId: "<YOUR_IOS_CLIENT_ID>",
    androidClientId: "<YOUR_ANDROID_CLIENT_ID>",
    webClientId: "<YOUR_WEB_CLIENT_ID>",
  });

  const handleRegister = () => {
    if (fullName && email && password && birthday && gender) {
      alert("Account created successfully!");
      router.replace("/(auth)/login");
    } else {
      alert("Please fill all fields");
    }
  };

  const handleGoogleSignup = async () => {
    await promptAsync();
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setBirthday(selectedDate);
    }
  };

  const formatDate = (date: Date) => {
    const d = String(date.getDate()).padStart(2, "0");
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const y = date.getFullYear();
    return `${y}-${m}-${d}`;
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
              placeholder="Full Name"
              placeholderTextColor="#ccc"
              style={styles.input}
              value={fullName}
              onChangeText={setFullName}
            />
          </View>

          {/* Email */}
          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={18} color="#fff" />
            <TextInput
              placeholder="Email"
              placeholderTextColor="#ccc"
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Password */}
          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={18} color="#fff" />
            <TextInput
              placeholder="Password"
              placeholderTextColor="#ccc"
              secureTextEntry={!showPassword}
              style={styles.input}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons
                name={showPassword ? "eye-outline" : "eye-off-outline"}
                size={18}
                color="#fff"
              />
            </TouchableOpacity>
          </View>

          {/* Birthday */}
          <TouchableOpacity
            style={styles.inputContainer}
            onPress={() => setShowDatePicker(true)}
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
            />
          )}

          {/* Gender */}
          <View style={styles.inputContainer}>
            <Ionicons name="male-female-outline" size={18} color="#fff" />
            <TextInput
              placeholder="Gender"
              placeholderTextColor="#ccc"
              style={styles.input}
              value={gender}
              onChangeText={setGender}
            />
          </View>

          {/* Create Account */}
          <TouchableOpacity style={styles.loginButton} onPress={handleRegister}>
            <Text style={styles.loginText}>Create Account</Text>
          </TouchableOpacity>

          {/* Google Signup */}
          <TouchableOpacity style={styles.googleButton} onPress={handleGoogleSignup}>
            <Ionicons name="logo-google" size={20} color="#920114" />
            <Text style={styles.googleText}>Sign up with Google</Text>
          </TouchableOpacity>

          {/* Back to Login */}
          <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
            <Text style={styles.signupText}>Already have an account? Login</Text>
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
  loginText: { textAlign: "center", color: "#920114", fontWeight: "bold" },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 12,
    width: "100%",
    marginTop: 10,
  },
  googleText: { color: "#fff", marginLeft: 8, fontWeight: "bold" },
  signupText: { marginTop: 15, color: "#fff", opacity: 0.8 },
});
