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
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /*const handleLogin = () => {
    if (email && password) {
      router.replace("/(tabs)/home"); // go to first tab after login
    } else {
      alert("Enter credentials");
    }
  };*/

  const handleLogin = () => {
  router.replace("/(tabs)/home");
};


  const handleSignUp = () => {
    router.push("/(auth)/signup"); // navigate to register screen
  };

  return (
    <LinearGradient
      colors={["#D64219", "#920114", "#3F0008"]}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" />
      
      <SafeAreaView style={styles.innerContainer}>
        {/* Card */}
        <View style={styles.card}>
          {/* Logo */}
          <Image
            source={require("../../assets/images/logo.png")}
            style={styles.logo}
          />

          <Text style={styles.title}>Welcome to RES-Q</Text>
          <Text style={styles.subtitle}>Your safety starts here.</Text>

          {/* Email Input */}
          <View style={styles.inputContainer}>
            <Ionicons
              name="mail-outline"
              size={18}
              color="#fff"
              style={styles.icon}
            />
            <TextInput
              placeholder="Enter your email"
              placeholderTextColor="#fff"
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Password Input */}
          <View style={styles.inputContainer}>
            <Ionicons
              name="lock-closed-outline"
              size={18}
              color="#fff"
              style={styles.icon}
            />
            <TextInput
              placeholder="Enter your password"
              placeholderTextColor="#fff"
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

          {/* Buttons */}
          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLogin}
          >
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.signupButton}
            onPress={handleSignUp}
          >
            <Text style={styles.signupText}>Sign up</Text>
          </TouchableOpacity>

          {/* Forgot Password */}
          <TouchableOpacity>
            <Text style={styles.forgotText}>Forgot password?</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
    padding: 25,
    alignItems: "center",
  },
  logo: {
    width: 60,
    height: 60,
    resizeMode: "contain",
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
  },
  subtitle: {
    color: "#fff",
    opacity: 0.8,
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: "#fff",
    borderBottomWidth: 1,
    marginBottom: 20,
    paddingVertical: 5,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    color: "#fff",
    paddingVertical: 5,
  },
  loginButton: {
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingVertical: 12,
    width: "100%",
    marginTop: 10,
  },
  loginText: {
    textAlign: "center",
    color: "#920114",
    fontWeight: "bold",
  },
  signupButton: {
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 8,
    paddingVertical: 12,
    width: "100%",
    marginTop: 10,
  },
  signupText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
  },
  forgotText: {
    color: "#fff",
    opacity: 0.7,
    marginTop: 15,
    fontSize: 13,
  },
});