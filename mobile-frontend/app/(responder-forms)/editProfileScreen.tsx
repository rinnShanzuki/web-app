import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Platform,
    Image,
    Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import { useDepartment } from "../contexts/DepartmentContext";

export default function EditProfileScreen() {
    const { department } = useDepartment();
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [showDatePicker, setShowDatePicker] = useState(false);

    const [form, setForm] = useState({
        fullName: "Responder Name",
        email: "responder@example.com",
        sex: "Male",
        birthday: "05/20/1995",
        age: "29",
        contactNumber: "09123456789",
        employeeId: "RESP-2024-001",
        rank: "Officer",
        yearsOfService: "5",
        street: "Main Street",
        barangay: "Poblacion",
        municipality: "Roxas",
        province: "Oriental Mindoro",
    });

    const [backup, setBackup] = useState({ ...form });
    const [backupImage, setBackupImage] = useState<string | null>(null);

    const handlePickImage = async () => {
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permission.granted) {
            Alert.alert("Permission Required", "Permission to access photos is needed.");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 0.7,
            aspect: [1, 1],
        });

        if (!result.canceled) {
            setProfileImage(result.assets[0].uri);
        }
    };

    const handleCancel = () => {
        Alert.alert(
            "Discard Changes",
            "Are you sure you want to discard all changes?",
            [
                { text: "Keep Editing", style: "cancel" },
                {
                    text: "Discard",
                    style: "destructive",
                    onPress: () => {
                        setForm(backup);
                        setProfileImage(backupImage);
                        router.back();
                    },
                },
            ]
        );
    };

    const handleSave = () => {
        // Validate form
        if (!form.fullName.trim()) {
            Alert.alert("Validation Error", "Full name is required.");
            return;
        }
        if (!form.contactNumber.trim()) {
            Alert.alert("Validation Error", "Contact number is required.");
            return;
        }
        if (!form.employeeId.trim()) {
            Alert.alert("Validation Error", "Employee ID is required.");
            return;
        }

        // TODO: Save to backend
        Alert.alert("Success", "Profile updated successfully!", [
            { text: "OK", onPress: () => router.back() },
        ]);
    };

    const onChangeDate = (event: any, selectedDate: any) => {
        setShowDatePicker(false);
        if (selectedDate) {
            const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
            const day = String(selectedDate.getDate()).padStart(2, "0");
            const year = selectedDate.getFullYear();
            const formatted = `${month}/${day}/${year}`;
            setForm({ ...form, birthday: formatted });

            // Auto-calculate age
            const today = new Date();
            let age = today.getFullYear() - year;
            const monthDiff = today.getMonth() - selectedDate.getMonth();
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < selectedDate.getDate())) {
                age--;
            }
            setForm((prev) => ({ ...prev, age: String(age) }));
        }
    };

    const renderInput = (
        label: string,
        value: string,
        onChangeText: (text: string) => void,
        icon: string,
        placeholder?: string,
        keyboardType?: any,
        editable: boolean = true
    ) => (
        <View style={styles.inputGroup}>
            <View style={styles.labelRow}>
                <Ionicons name={icon as any} size={18} color={department?.colors.primary} />
                <Text style={styles.label}>{label}</Text>
            </View>
            <TextInput
                style={[styles.input, !editable && styles.disabledInput]}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor="#999"
                keyboardType={keyboardType || "default"}
                editable={editable}
            />
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={[styles.header, { backgroundColor: department?.colors.primary }]}>
                <TouchableOpacity onPress={handleCancel} style={styles.headerButton}>
                    <Ionicons name="close" size={28} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Edit Profile</Text>
                <TouchableOpacity onPress={handleSave} style={styles.headerButton}>
                    <Text style={styles.saveText}>Save</Text>
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {/* Profile Photo Section */}
                <View style={[styles.photoSection, { backgroundColor: department?.colors.primary }]}>
                    <TouchableOpacity onPress={handlePickImage} activeOpacity={0.8}>
                        <View style={styles.imageWrapper}>
                            {profileImage ? (
                                <Image source={{ uri: profileImage }} style={styles.profileImage} />
                            ) : (
                                <Ionicons name="person" size={60} color="#fff" />
                            )}
                        </View>
                        <View style={[styles.cameraButton, { backgroundColor: department?.colors.primary }]}>
                            <Ionicons name="camera" size={20} color="#fff" />
                        </View>
                    </TouchableOpacity>
                    <Text style={styles.changePhotoText}>Tap to change photo</Text>

                    {/* Department Badge */}
                    <View style={styles.departmentBadge}>
                        <Image
                            source={department?.icon.filled}
                            style={styles.departmentIcon}
                        />
                        <Text style={styles.departmentText}>{department?.fullName}</Text>
                    </View>
                </View>

                {/* Account Information */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Account Information</Text>
                    {renderInput(
                        "Email Address",
                        form.email,
                        (v) => setForm({ ...form, email: v }),
                        "mail-outline",
                        "Enter your email",
                        "email-address"
                    )}
                    {renderInput(
                        "Employee ID",
                        form.employeeId,
                        (v) => setForm({ ...form, employeeId: v }),
                        "card-outline",
                        "Enter employee ID",
                        "default",
                        false // Not editable
                    )}
                </View>

                {/* Professional Details */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Professional Details</Text>

                    {/* Rank Picker */}
                    <View style={styles.inputGroup}>
                        <View style={styles.labelRow}>
                            <Ionicons name="ribbon-outline" size={18} color={department?.colors.primary} />
                            <Text style={styles.label}>Rank/Position</Text>
                        </View>
                        <View style={styles.pickerContainer}>
                            <Picker
                                selectedValue={form.rank}
                                onValueChange={(v) => setForm({ ...form, rank: v })}
                                style={styles.picker}
                            >
                                <Picker.Item label="Officer" value="Officer" />
                                <Picker.Item label="Senior Officer" value="Senior Officer" />
                                <Picker.Item label="Chief" value="Chief" />
                                <Picker.Item label="Captain" value="Captain" />
                                <Picker.Item label="Lieutenant" value="Lieutenant" />
                            </Picker>
                        </View>
                    </View>

                    {/* Years of Service */}
                    <View style={styles.inputGroup}>
                        <View style={styles.labelRow}>
                            <Ionicons name="time-outline" size={18} color={department?.colors.primary} />
                            <Text style={styles.label}>Years of Service</Text>
                        </View>
                        <View style={styles.yearsContainer}>
                            <TouchableOpacity
                                onPress={() =>
                                    setForm({
                                        ...form,
                                        yearsOfService: String(Math.max(0, Number(form.yearsOfService) - 1)),
                                    })
                                }
                                style={styles.yearButton}
                            >
                                <Ionicons name="remove-circle" size={32} color={department?.colors.primary} />
                            </TouchableOpacity>

                            <Text style={styles.yearsText}>{form.yearsOfService} years</Text>

                            <TouchableOpacity
                                onPress={() =>
                                    setForm({ ...form, yearsOfService: String(Number(form.yearsOfService) + 1) })
                                }
                                style={styles.yearButton}
                            >
                                <Ionicons name="add-circle" size={32} color={department?.colors.primary} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                {/* Personal Details */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Personal Details</Text>

                    {renderInput(
                        "Full Name",
                        form.fullName,
                        (v) => setForm({ ...form, fullName: v }),
                        "person-outline",
                        "Enter your full name"
                    )}

                    {/* Sex Picker */}
                    <View style={styles.inputGroup}>
                        <View style={styles.labelRow}>
                            <Ionicons name="male-female-outline" size={18} color={department?.colors.primary} />
                            <Text style={styles.label}>Sex</Text>
                        </View>
                        <View style={styles.pickerContainer}>
                            <Picker
                                selectedValue={form.sex}
                                onValueChange={(v) => setForm({ ...form, sex: v })}
                                style={styles.picker}
                            >
                                <Picker.Item label="Male" value="Male" />
                                <Picker.Item label="Female" value="Female" />
                            </Picker>
                        </View>
                    </View>

                    {/* Birthday Picker */}
                    <View style={styles.inputGroup}>
                        <View style={styles.labelRow}>
                            <Ionicons name="calendar-outline" size={18} color={department?.colors.primary} />
                            <Text style={styles.label}>Birthday</Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => setShowDatePicker(true)}
                            style={styles.dateButton}
                        >
                            <Text style={styles.dateText}>{form.birthday}</Text>
                            <Ionicons name="chevron-down" size={20} color="#666" />
                        </TouchableOpacity>

                        {showDatePicker && (
                            <DateTimePicker
                                value={new Date()}
                                mode="date"
                                onChange={onChangeDate}
                                maximumDate={new Date()}
                            />
                        )}
                    </View>

                    {/* Age Display */}
                    <View style={styles.inputGroup}>
                        <View style={styles.labelRow}>
                            <Ionicons name="hourglass-outline" size={18} color={department?.colors.primary} />
                            <Text style={styles.label}>Age</Text>
                        </View>
                        <View style={styles.ageContainer}>
                            <TouchableOpacity
                                onPress={() =>
                                    setForm({
                                        ...form,
                                        age: String(Math.max(0, Number(form.age) - 1)),
                                    })
                                }
                                style={styles.ageButton}
                            >
                                <Ionicons name="remove-circle" size={32} color={department?.colors.primary} />
                            </TouchableOpacity>

                            <Text style={styles.ageText}>{form.age} years</Text>

                            <TouchableOpacity
                                onPress={() =>
                                    setForm({ ...form, age: String(Number(form.age) + 1) })
                                }
                                style={styles.ageButton}
                            >
                                <Ionicons name="add-circle" size={32} color={department?.colors.primary} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {renderInput(
                        "Contact Number",
                        form.contactNumber,
                        (v) => setForm({ ...form, contactNumber: v }),
                        "call-outline",
                        "Enter your contact number",
                        "phone-pad"
                    )}
                </View>

                {/* Address */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Address</Text>

                    {renderInput(
                        "Street",
                        form.street,
                        (v) => setForm({ ...form, street: v }),
                        "home-outline",
                        "Enter street address"
                    )}

                    {renderInput(
                        "Barangay",
                        form.barangay,
                        (v) => setForm({ ...form, barangay: v }),
                        "location-outline",
                        "Enter barangay"
                    )}

                    {renderInput(
                        "Municipality",
                        form.municipality,
                        (v) => setForm({ ...form, municipality: v }),
                        "business-outline",
                        "Enter municipality"
                    )}

                    {renderInput(
                        "Province",
                        form.province,
                        (v) => setForm({ ...form, province: v }),
                        "map-outline",
                        "Enter province"
                    )}
                </View>

                {/* Save and Cancel Buttons */}
                <View style={styles.buttonSection}>
                    <TouchableOpacity
                        style={[styles.button, styles.cancelButton]}
                        onPress={handleCancel}
                    >
                        <Text style={styles.cancelButtonText}>Cancel</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.button, styles.saveButton, { backgroundColor: department?.colors.primary }]}
                        onPress={handleSave}
                    >
                        <Text style={styles.saveButtonText}>Save Changes</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ height: 40 }} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 15,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 3,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
    },
    headerButton: {
        padding: 5,
        minWidth: 60,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#fff",
    },
    saveText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#fff",
        textAlign: "right",
    },
    scrollView: {
        flex: 1,
    },
    photoSection: {
        alignItems: "center",
        paddingVertical: 30,
        marginBottom: 15,
    },
    imageWrapper: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 3,
        borderColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        backgroundColor: "rgba(255, 255, 255, 0.3)",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 6,
    },
    profileImage: {
        width: "100%",
        height: "100%",
        borderRadius: 60,
    },
    cameraButton: {
        position: "absolute",
        bottom: 0,
        right: 0,
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 3,
        borderColor: "#fff",
    },
    changePhotoText: {
        marginTop: 12,
        fontSize: 14,
        color: "#fff",
        fontWeight: "600",
    },
    departmentBadge: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 20,
        marginTop: 15,
    },
    departmentIcon: {
        width: 20,
        height: 20,
        tintColor: "#fff",
        marginRight: 8,
    },
    departmentText: {
        color: "#fff",
        fontSize: 12,
        fontWeight: "600",
    },
    section: {
        backgroundColor: "#fff",
        paddingHorizontal: 20,
        paddingVertical: 20,
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 20,
    },
    inputGroup: {
        marginBottom: 20,
    },
    labelRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
    },
    label: {
        fontSize: 14,
        fontWeight: "600",
        color: "#333",
        marginLeft: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 15,
        fontSize: 15,
        backgroundColor: "#fff",
        color: "#333",
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 2,
        shadowOffset: { width: 0, height: 1 },
        elevation: 1,
    },
    disabledInput: {
        backgroundColor: "#f5f5f5",
        color: "#666",
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 10,
        backgroundColor: "#fff",
        overflow: "hidden",
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 2,
        shadowOffset: { width: 0, height: 1 },
        elevation: 1,
    },
    picker: {
        height: Platform.OS === "ios" ? 150 : 50,
    },
    dateButton: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 15,
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 2,
        shadowOffset: { width: 0, height: 1 },
        elevation: 1,
    },
    dateText: {
        fontSize: 15,
        color: "#333",
    },
    ageContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 10,
        paddingVertical: 8,
        paddingHorizontal: 15,
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 2,
        shadowOffset: { width: 0, height: 1 },
        elevation: 1,
    },
    ageButton: {
        padding: 5,
    },
    ageText: {
        fontSize: 18,
        fontWeight: "600",
        color: "#333",
    },
    yearsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 10,
        paddingVertical: 8,
        paddingHorizontal: 15,
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 2,
        shadowOffset: { width: 0, height: 1 },
        elevation: 1,
    },
    yearButton: {
        padding: 5,
    },
    yearsText: {
        fontSize: 18,
        fontWeight: "600",
        color: "#333",
    },
    buttonSection: {
        backgroundColor: "#fff",
        paddingHorizontal: 20,
        paddingVertical: 25,
        marginBottom: 15,
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 15,
    },
    button: {
        flex: 1,
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
    },
    cancelButton: {
        backgroundColor: "#fff",
        borderWidth: 2,
        borderColor: "#666",
    },
    saveButton: {
        // backgroundColor will be set dynamically based on department color
    },
    cancelButtonText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#666",
    },
    saveButtonText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#fff",
    },
});
