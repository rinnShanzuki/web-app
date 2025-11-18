// src/components/modals/AccountSettingsModal.jsx
import { useState } from "react";

export default function AccountSettingsModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    fullName: "John Doe",
    email: "john.doe@res-q.com",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    contactNumber: "+63 912 345 6789",
    notificationPreference: "both",
    language: "english",
    themeMode: "light"
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    // Add save logic here
    console.log("Saving account settings:", formData);
    alert("Account settings saved successfully!");
    onClose();
  };

  const handleCancel = () => {
    // Reset form or keep changes based on requirements
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 sticky top-0 bg-white">
          <h2 className="text-2xl font-bold text-[#920114]">Account Settings</h2>
          <p className="text-gray-600 text-sm mt-1">Manage your personal account preferences</p>
        </div>

        {/* Content */}
        <form onSubmit={handleSave} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D30019] focus:border-transparent"
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
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D30019] focus:border-transparent"
                required
              />
            </div>

            {/* Current Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Password
              </label>
              <input
                type="password"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleInputChange}
                placeholder="Enter current password"
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D30019] focus:border-transparent"
              />
            </div>

            {/* New Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                New Password
              </label>
              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleInputChange}
                placeholder="Enter new password"
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D30019] focus:border-transparent"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm new password"
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D30019] focus:border-transparent"
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
                value={formData.contactNumber}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D30019] focus:border-transparent"
                placeholder="+63 912 345 6789"
              />
            </div>

            {/* Language */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Language *
              </label>
              <select
                name="language"
                value={formData.language}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D30019] focus:border-transparent"
              >
                <option value="english">English</option>
                <option value="filipino">Filipino</option>
              </select>
            </div>

            {/* Theme Mode */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Theme Mode *
              </label>
              <select
                name="themeMode"
                value={formData.themeMode}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D30019] focus:border-transparent"
              >
                <option value="light">Light Mode</option>
                <option value="dark">Dark Mode</option>
              </select>
            </div>
          </div>

          {/* Notification Preference */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Notification Preference *
            </label>
            <div className="space-y-2">
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
                    checked={formData.notificationPreference === option.value}
                    onChange={handleInputChange}
                    className="text-[#D30019] focus:ring-[#D30019]"
                  />
                  <span className="text-gray-700">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex space-x-3 pt-6 border-t border-gray-200">
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-[#D30019] text-white rounded-lg hover:bg-[#920114] font-medium transition-colors"
            >
              💾 Save Changes
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 px-6 py-3 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 font-medium transition-colors"
            >
              ❌ Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}