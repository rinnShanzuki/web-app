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
import { useDepartment } from "../contexts/DepartmentContext";

export default function ResponderLogin() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const { setDepartment } = useDepartment();

    const handleLogin = async () => {
        if (!email || !password) {
            setError("Please enter email and password");
            return;
        }

        try {
            // TODO: Replace with actual API call
            // const response = await api.responderLogin({ email, password });
            // const { department } = response.data;

            // For now, using mock department (replace with API response)
            const mockDepartment = "BFP"; // This should come from API

            await setDepartment(mockDepartment as any);

            // Navigate to responder home
            router.replace("/(responder-tabs)/ResponderMapScreen");
        } catch (error) {
            console.error("Login error:", error);
            setError("Invalid credentials. Please try again.");
        }
    };

    const handleSignUp = () => {
        router.push("/(responder-auth)/ResponderSignup");
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

                    <Text style={styles.title}>Responder Login</Text>
                    <Text style={styles.subtitle}>Emergency Response Portal</Text>

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
                            onChangeText={(text) => {
                                setEmail(text);
                                setError("");
                            }}
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
                            onChangeText={(text) => {
                                setPassword(text);
                                setError("");
                            }}
                        />
                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                            <Ionicons
                                name={showPassword ? "eye-outline" : "eye-off-outline"}
                                size={18}
                                color="#fff"
                            />
                        </TouchableOpacity>
                    </View>

                    {error ? <Text style={styles.errorText}>{error}</Text> : null}

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
                        <Text style={styles.signupText}>New Responder? Sign up</Text>
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
        width: "100%",
    },
    icon: {
        marginRight: 8,
    },
    input: {
        flex: 1,
        color: "#fff",
        paddingVertical: 5,
    },
    errorText: {
        color: "#FFB4AB",
        fontSize: 12,
        marginBottom: 10,
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
