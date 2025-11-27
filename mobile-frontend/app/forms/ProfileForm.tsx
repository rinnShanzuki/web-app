import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Platform,
  Modal,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";

export default function ProfileForm() {
  const [editMode, setEditMode] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);

  const [profileImage, setProfileImage] = useState<string | null>(null);

  const [form, setForm] = useState({
    email: "juandelacruz@gmail.com",
    fullName: "Juan Dela Cruz",
    sex: "Female",
    birthday: "MM/DD/YYYY",
    age: "21",
    contactNumber: "09776527359",
    street: "Sitio Mangahan",
    barangay: "Odiong",
    municipality: "Roxas",
    province: "Oriental Mindoro",
  });

  const [backup, setBackup] = useState({ ...form });
  const [backupImage, setBackupImage] = useState<string | null>(null);

  const [showDatePicker, setShowDatePicker] = useState(false);

  const handlePickImage = async () => {
    if (!editMode) return;

    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      alert("Permission to access photos is needed.");
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

  const handleEdit = () => {
    setBackup(form);
    setBackupImage(profileImage);
    setEditMode(true);
  };

  const handleCancel = () => {
    setForm(backup);
    setProfileImage(backupImage);
    setEditMode(false);
  };

  const handleSave = () => {
    setEditMode(false);
  };

  const onChangeDate = (event: any, selectedDate: any) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const formatted =
        selectedDate.getMonth() + 1 +
        "/" +
        selectedDate.getDate() +
        "/" +
        selectedDate.getFullYear();
      setForm({ ...form, birthday: formatted });
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* HEADER */}
      <View style={styles.headerRow}>
        <TouchableOpacity
          style={styles.backRow}
          onPress={() => router.push("/(tabs)/home")}
        >
          <Ionicons name="arrow-back" size={20} color="#D30019" />
          <Text style={styles.backText}>Back to home</Text>
        </TouchableOpacity>

        {!editMode ? (
          <TouchableOpacity style={styles.editRow} onPress={handleEdit}>
            <Text style={styles.editText}>Edit Profile</Text>
            <Ionicons name="create-outline" size={18} color="#D30019" />
          </TouchableOpacity>
        ) : (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity onPress={handleSave} style={{ marginRight: 15 }}>
              <Text style={[styles.editText, { fontWeight: "700" }]}>Save</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleCancel}>
              <Ionicons name="close" size={26} color="#D30019" />
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* USER PHOTO */}
      <View style={styles.center}>
        <TouchableOpacity
          onPress={handlePickImage}
          disabled={!editMode}
          activeOpacity={0.8}
        >
          <View style={styles.imageWrapper}>
            {profileImage ? (
              <Image source={{ uri: profileImage }} style={styles.profileImage} />
            ) : (
              <Ionicons
                name="person"
                size={80}
                color="#D30019"
                style={{ opacity: 0.7 }}
              />
            )}
          </View>

          {editMode && (
            <Text style={styles.changePhotoText}>Tap to change photo</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* ACCOUNT DETAILS */}
      <Text style={styles.sectionTitle}>ACCOUNT DETAILS</Text>

      {/* EMAIL FIELD */}
      <View style={styles.inputGroup}>
        <Text style={styles.boldLabel}>Email:</Text>
        {!editMode ? (
          <Text style={styles.detailValue}>{form.email}</Text>
        ) : (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TextInput
              style={[styles.input, styles.inputWithShadow, { flex: 1 }]}
              value={form.email}
              editable={false}
            />
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => setShowEmailModal(true)}
            >
              <Ionicons name="add-circle-outline" size={28} color="#D30019" />
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* EMAIL MODAL */}
      <Modal
        visible={showEmailModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowEmailModal(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Add New Email Account</Text>

            <TouchableOpacity
              style={styles.googleButton}
              onPress={() => setShowEmailModal(false)}
            >
              <Ionicons name="logo-google" size={20} color="#fff" />
              <Text style={styles.googleButtonText}>Sign in with Google</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setShowEmailModal(false)}
            >
              <Text style={{ color: "#D30019", fontWeight: "700" }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.line} />

      {/* PERSONAL DETAILS */}
      <Text style={styles.sectionTitle}>PERSONAL DETAILS</Text>

      {/* FULL NAME + SEX */}
      <View style={styles.tableRow}>
        <View style={styles.tableCell}>
          <Text style={styles.boldLabel}>Full Name:</Text>
          {!editMode ? (
            <Text style={styles.detailValue}>{form.fullName}</Text>
          ) : (
            <TextInput
              style={[styles.input, styles.inputWithShadow]}
              value={form.fullName}
              onChangeText={(v) => setForm({ ...form, fullName: v })}
            />
          )}
        </View>

        <View style={styles.tableCell}>
          <Text style={styles.boldLabel}>Sex:</Text>
          {!editMode ? (
            <Text style={styles.detailValue}>{form.sex}</Text>
          ) : (
            <View style={[styles.input, styles.inputWithShadow, { padding: 0 }]}>
              <Picker
                selectedValue={form.sex}
                onValueChange={(v) => setForm({ ...form, sex: v })}
                style={{ height: Platform.OS === "ios" ? 36 : 42 }}
              >
                <Picker.Item label="Male" value="Male" />
                <Picker.Item label="Female" value="Female" />
              </Picker>
            </View>
          )}
        </View>
      </View>

      {/* BIRTHDAY + AGE */}
      <View style={styles.tableRow}>
        <View style={styles.tableCell}>
          <Text style={styles.boldLabel}>Birthday:</Text>
          {!editMode ? (
            <Text style={styles.detailValue}>{form.birthday}</Text>
          ) : (
            <>
              <TouchableOpacity
                onPress={() => setShowDatePicker(true)}
                style={[styles.input, styles.inputWithShadow]}
              >
                <Text>{form.birthday}</Text>
              </TouchableOpacity>

              {showDatePicker && (
                <DateTimePicker
                  value={new Date()}
                  mode="date"
                  onChange={onChangeDate}
                />
              )}
            </>
          )}
        </View>

        <View style={styles.tableCell}>
          <Text style={styles.boldLabel}>Age:</Text>
          {!editMode ? (
            <Text style={styles.detailValue}>{form.age}</Text>
          ) : (
            <View style={[styles.input, styles.inputWithShadow, styles.ageInputBox]}>
              <TouchableOpacity
                onPress={() =>
                  setForm({
                    ...form,
                    age: String(Math.max(0, Number(form.age) - 1)),
                  })
                }
              >
                <Ionicons name="remove-circle" size={26} color="#D30019" />
              </TouchableOpacity>

              <Text style={{ fontSize: 16 }}>{form.age}</Text>

              <TouchableOpacity
                onPress={() =>
                  setForm({ ...form, age: String(Number(form.age) + 1) })
                }
              >
                <Ionicons name="add-circle" size={26} color="#D30019" />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>

      {/* CONTACT */}
      <View style={styles.inputGroup}>
        <Text style={styles.boldLabel}>Contact Number</Text>
        {!editMode ? (
          <Text style={styles.detailValue}>{form.contactNumber}</Text>
        ) : (
          <TextInput
            style={[styles.input, styles.inputWithShadow]}
            value={form.contactNumber}
            onChangeText={(v) => setForm({ ...form, contactNumber: v })}
          />
        )}
      </View>

      <View style={styles.line} />

      {/* ADDRESS */}
      <Text style={styles.sectionTitle}>ADDRESS</Text>

      <View style={styles.tableRow}>
        <View style={styles.tableCell}>
          <Text style={styles.boldLabel}>Street:</Text>
          {!editMode ? (
            <Text style={styles.detailValue}>{form.street}</Text>
          ) : (
            <TextInput
              style={[styles.input, styles.inputWithShadow]}
              value={form.street}
              onChangeText={(v) => setForm({ ...form, street: v })}
            />
          )}
        </View>

        <View style={styles.tableCell}>
          <Text style={styles.boldLabel}>Barangay:</Text>
          {!editMode ? (
            <Text style={styles.detailValue}>{form.barangay}</Text>
          ) : (
            <TextInput
              style={[styles.input, styles.inputWithShadow]}
              value={form.barangay}
              onChangeText={(v) => setForm({ ...form, barangay: v })}
            />
          )}
        </View>
      </View>

      <View style={styles.tableRow}>
        <View style={styles.tableCell}>
          <Text style={styles.boldLabel}>Municipality:</Text>
          {!editMode ? (
            <Text style={styles.detailValue}>{form.municipality}</Text>
          ) : (
            <TextInput
              style={[styles.input, styles.inputWithShadow]}
              value={form.municipality}
              onChangeText={(v) => setForm({ ...form, municipality: v })}
            />
          )}
        </View>

        <View style={styles.tableCell}>
          <Text style={styles.boldLabel}>Province:</Text>
          {!editMode ? (
            <Text style={styles.detailValue}>{form.province}</Text>
          ) : (
            <TextInput
              style={[styles.input, styles.inputWithShadow]}
              value={form.province}
              onChangeText={(v) => setForm({ ...form, province: v })}
            />
          )}
        </View>
      </View>

      <View style={{ height: 50 }} />
    </ScrollView>
  );
}

// ---------------------------------------------------
// STYLES
// ---------------------------------------------------
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  backRow: { flexDirection: "row", alignItems: "center" },
  backText: { color: "#D30019", fontSize: 16, marginLeft: 4, fontWeight: "500" },

  editRow: { flexDirection: "row", alignItems: "center" },
  editText: { color: "#D30019", fontSize: 16, marginRight: 6 },

  center: { alignItems: "center", marginTop: 10, marginBottom: 15 },

  imageWrapper: {
    width: 150,
    height: 150,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: "#D30019",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    backgroundColor: "#ffe6e9",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },

  profileImage: {
    width: "100%",
    height: "100%",
    borderRadius: 100,
  },

  changePhotoText: {
    marginTop: 8,
    fontSize: 13,
    color: "#D30019",
    fontWeight: "600",
  },

  sectionTitle: {
    marginTop: 2,
    marginBottom: 15,
    fontWeight: "700",
    fontSize: 15,
    color: "#333",
  },

  boldLabel: { fontSize: 13, color: "#333", fontWeight: "600", marginBottom: 3 },

  detailValue: { fontSize: 14, color: "#666", paddingVertical: 4 },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 10,
    fontSize: 14,
    backgroundColor: "#fff",
  },

  inputWithShadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },

  inputGroup: { marginBottom: 15 },

  addButton: { marginLeft: 10 },

  line: { height: 1, backgroundColor: "#ddd", marginVertical: 25 },

  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  tableCell: { width: "48%" },

  ageInputBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },

  modalContainer: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },

  modalTitle: { fontSize: 16, fontWeight: "700", marginBottom: 20 },

  googleButton: {
    flexDirection: "row",
    backgroundColor: "#D30019",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
  },

  googleButtonText: { color: "#fff", fontWeight: "700", marginLeft: 8 },

  modalCloseButton: { padding: 8 },
});
