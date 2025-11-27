// src/pages/setcomponents/ProfSettings.jsx
import { useState } from "react";
import SetSideBar from "../components/layout/SetSideBar";

export default function ProfSettings() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    profilePicture: "",
    fullName: "John Doe",
    email: "john.doe@res-q.com",
    role: "Super Admin",
    lastLogin: "2024-01-15 14:30:25",
    contactNumber: "+63 912 345 6789",
    notificationPreference: "both",
  });

  const handleEdit = () => setIsEditing(true);

  const handleSave = (e) => {
    e.preventDefault();
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  const handleCancel = () => setIsEditing(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getNotificationPreferenceText = (preference) => {
    switch (preference) {
      case "email":
        return "Email Only";
      case "system":
        return "System Only";
      case "both":
        return "Both Email & System";
      default:
        return preference;
    }
  };

  return (
    <div className="flex w-full min-h-screen bg-gray-50">
      {/* Settings Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200">
        <SetSideBar />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-[#920114] mb-6 border-b border-gray-200 pb-4">
              Profile Settings
            </h2>

            {!isEditing ? (
              <div className="space-y-6">
                {/* Profile Picture */}
                <div className="flex items-center space-x-6">
                  <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                    {profileData.profilePicture ? (
                      <img src={profileData.profilePicture} alt="Profile" className="w-24 h-24 rounded-full" />
                    ) : (
                      <span className="text-3xl text-gray-500">👤</span>
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{profileData.fullName}</h3>
                    <p className="text-gray-600">{profileData.role}</p>
                  </div>
                </div>

                {/* Profile Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                      {profileData.fullName}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                      {profileData.email}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                      {profileData.role}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Login</label>
                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                      {profileData.lastLogin}
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Contact Number</label>
                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                      {profileData.contactNumber || "Not provided"}
                    </div>
                  </div>
                  {/* Notification Preference - View Mode */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Notification Preference</label>
                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                      {getNotificationPreferenceText(profileData.notificationPreference)}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                  <button
                    onClick={handleEdit}
                    className="px-6 py-3 bg-[#D30019] text-white rounded-lg hover:bg-[#920114] font-medium transition-colors"
                  >
                  Edit Profile
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSave} className="space-y-6">
                {/* Profile Picture Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Profile Picture
                  </label>
                  <div className="flex items-center space-x-4">
                    <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-2xl text-gray-500">👤</span>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      className="flex-1"
                      onChange={(e) => {
                        // Handle file upload logic here
                      }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={profileData.fullName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D30019] focus:border-transparent placeholder:text-gray-300"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={profileData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D30019] focus:border-transparent placeholder:text-gray-300"
                      required
                    />
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Change Password
                    </label>
                    <input
                      type="password"
                      placeholder="Enter new password"
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D30019] focus:border-transparent placeholder:text-gray-300"
                    />
                  </div>

                  {/* Contact Number */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contact Number
                    </label>
                    <input
                      type="tel"
                      name="contactNumber"
                      value={profileData.contactNumber}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D30019] focus:border-transparent placeholder:text-gray-300"
                      placeholder="+63 912 345 6789"
                    />
                  </div>

                  {/* Notification Preference - Edit Mode */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Notification Preference
                    </label>
                    <div className="bg-white p-4 border border-gray-300 rounded-lg space-y-3">
                      {[
                        { value: "email", label: "Email Only" },
                        { value: "system", label: "System Only" },
                        { value: "both", label: "Both Email & System" }
                      ].map((option) => (
                        <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
                          <input
                            type="radio"
                            name="notificationPreference"
                            value={option.value}
                            checked={profileData.notificationPreference === option.value}
                            onChange={handleInputChange}
                            className="text-[#D30019] focus:ring-[#D30019]"
                          />
                          <span className="text-gray-700">
                            {option.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-6 py-3 text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 font-medium transition-colors"
                  >
                  Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-[#D30019] text-white rounded-lg hover:bg-[#920114] font-medium transition-colors"
                  >
                  Save Changes
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}