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
    ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useDepartment } from "../contexts/DepartmentContext";
import { DepartmentCode, DEPARTMENT_OPTIONS } from "../utils/departmentConfig";

export default function ResponderSignup() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [selectedDepartment, setSelectedDepartment] = useState<DepartmentCode>("MDRRMO");
    const [errors, setErrors] = useState<Record<string, string>>({});

    const { setDepartment } = useDepartment();

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!name.trim()) {
            newErrors.name = "Name is required";
        }

        if (!email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "Email is invalid";
        }

        if (!password) {
            newErrors.password = "Password is required";
        } else if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        if (password !== confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSignup = async () => {
        if (validateForm()) {
            try {
                // TODO: Replace with actual API call
                // const response = await api.responderSignup({ name, email, password, department: selectedDepartment });

                // Save department to context and AsyncStorage
                await setDepartment(selectedDepartment);

                // Navigate to responder home
                router.replace("/(responder-tabs)/ResponderMapScreen");
            } catch (error) {
                console.error("Signup error:", error);
                setErrors({ general: "Signup failed. Please try again." });
            }
        }
    };

    const handleLogin = () => {
        router.push("/(responder-auth)/ResponderLogin");
    };

    return (
        <LinearGradient
            colors={["#D64219", "#920114", "#3F0008"]}
            style={styles.container}
        >
            <StatusBar barStyle="light-content" />

            <SafeAreaView style={styles.innerContainer}>
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Card */}
                    <View style={styles.card}>
                        {/* Logo */}
                        <Image
                            source={require("../../assets/images/logo.png")}
                            style={styles.logo}
                        />

                        <Text style={styles.title}>Responder Registration</Text>
                        <Text style={styles.subtitle}>Join the emergency response team</Text>

                        {/* Name Input */}
                        <View style={styles.inputContainer}>
                            <Ionicons
                                name="person-outline"
                                size={18}
                                color="#fff"
                                style={styles.icon}
                            />
                            <TextInput
                                placeholder="Full Name"
                                placeholderTextColor="#fff"
                                style={styles.input}
                                value={name}
                                onChangeText={setName}
                                autoCapitalize="words"
                            />
                        </View>
                        {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

                        {/* Email Input */}
                        <View style={styles.inputContainer}>
                            <Ionicons
                                name="mail-outline"
                                size={18}
                                color="#fff"
                                style={styles.icon}
                            />
                            <TextInput
                                placeholder="Email Address"
                                placeholderTextColor="#fff"
                                style={styles.input}
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        </View>
                        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

                        {/* Department Picker */}
                        <View style={styles.pickerContainer}>
                            <Ionicons
                                name="business-outline"
                                size={18}
                                color="#fff"
                                style={styles.icon}
                            />
                            <View style={styles.pickerWrapper}>
                                <Picker
                                    selectedValue={selectedDepartment}
                                    onValueChange={(value) => setSelectedDepartment(value as DepartmentCode)}
                                    style={styles.picker}
                                    dropdownIconColor="#fff"
                                >
                                    {DEPARTMENT_OPTIONS.map((dept) => (
                                        <Picker.Item
                                            key={dept.value}
                                            label={dept.label}
                                            value={dept.value}
                                        />
                                    ))}
                                </Picker>
                            </View>
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
                                placeholder="Password"
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
                        {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

                        {/* Confirm Password Input */}
                        <View style={styles.inputContainer}>
                            <Ionicons
                                name="lock-closed-outline"
                                size={18}
                                color="#fff"
                                style={styles.icon}
                            />
                            <TextInput
                                placeholder="Confirm Password"
                                placeholderTextColor="#fff"
                                secureTextEntry={!showConfirmPassword}
                                style={styles.input}
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                            />
                            <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                                <Ionicons
                                    name={showConfirmPassword ? "eye-outline" : "eye-off-outline"}
                                    size={18}
                                    color="#fff"
                                />
                            </TouchableOpacity>
                        </View>
                        {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}

                        {errors.general && <Text style={styles.errorText}>{errors.general}</Text>}

                        {/* Buttons */}
                        <TouchableOpacity
                            style={styles.signupButton}
                            onPress={handleSignup}
                        >
                            <Text style={styles.signupText}>Create Account</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.loginButton}
                            onPress={handleLogin}
                        >
                            <Text style={styles.loginText}>Already have an account? Login</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
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
        paddingHorizontal: 20,
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: "center",
        paddingVertical: 20,
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
        marginBottom: 25,
        fontSize: 13,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderBottomColor: "#fff",
        borderBottomWidth: 1,
        marginBottom: 5,
        paddingVertical: 5,
        width: "100%",
    },
    pickerContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderBottomColor: "#fff",
        borderBottomWidth: 1,
        marginBottom: 5,
        paddingVertical: 5,
        width: "100%",
    },
    pickerWrapper: {
        flex: 1,
    },
    picker: {
        color: "#fff",
        height: 40,
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
        alignSelf: "flex-start",
        marginBottom: 10,
        marginLeft: 5,
    },
    signupButton: {
        backgroundColor: "#fff",
        borderRadius: 8,
        paddingVertical: 12,
        width: "100%",
        marginTop: 15,
    },
    signupText: {
        textAlign: "center",
        color: "#920114",
        fontWeight: "bold",
    },
    loginButton: {
        borderWidth: 1,
        borderColor: "#fff",
        borderRadius: 8,
        paddingVertical: 12,
        width: "100%",
        marginTop: 10,
    },
    loginText: {
        textAlign: "center",
        color: "#fff",
        fontWeight: "bold",
        fontSize: 13,
    },
});
