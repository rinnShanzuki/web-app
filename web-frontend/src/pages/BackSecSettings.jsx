// src/pages/setcomponents/BackSecSettings.jsx
import { useState } from "react";
import SetSideBar from "../components/layout/SetSideBar";

export default function BackSecSettings() {
  const [formData, setFormData] = useState({
    twoFactorAuth: false,
    passwordPolicy: "medium",
    sessionTimeout: 30
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleApply = (e) => {
    e.preventDefault();
    console.log("Applying security settings:", formData);
    alert("Security settings applied successfully!");
  };

  const handleBackup = () => {
    // Simulate backup process
    alert("Database backup initiated! Download will start shortly.");
    // In real implementation, this would trigger a file download
  };

  const handleRestore = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (window.confirm(`Restore backup from ${file.name}? This will replace current data.`)) {
        alert("Backup restoration process started!");
      }
    }
  };

  const getPasswordPolicyDescription = (policy) => {
    switch (policy) {
      case "weak": return "Minimum 6 characters";
      case "medium": return "Minimum 8 characters with numbers";
      case "strong": return "Minimum 12 characters with numbers, uppercase, and symbols";
      default: return "";
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
              Backup & Security Settings
            </h2>

            <form onSubmit={handleApply} className="space-y-8">
              {/* Security Settings */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-800">Security Settings</h3>
                
                {/* 2FA Toggle */}
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div>
                    <span className="block text-sm font-medium text-gray-700">Enable Two-Factor Authentication (2FA)</span>
                    <span className="block text-sm text-gray-500 mt-1">
                      Add an extra layer of security to your account
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    name="twoFactorAuth"
                    checked={formData.twoFactorAuth}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-[#D30019] focus:ring-[#D30019] rounded"
                  />
                </div>

                {/* Password Policy */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Password Policy
                  </label>
                  <div className="space-y-3">
                    {["weak", "medium", "strong"].map((policy) => (
                      <label key={policy} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="radio"
                          name="passwordPolicy"
                          value={policy}
                          checked={formData.passwordPolicy === policy}
                          onChange={handleInputChange}
                          className="text-[#D30019] focus:ring-[#D30019]"
                        />
                        <div>
                          <span className="text-gray-700 capitalize">{policy} Security</span>
                          <span className="block text-sm text-gray-500">
                            {getPasswordPolicyDescription(policy)}
                          </span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Session Timeout */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Session Timeout (minutes)
                  </label>
                  <input
                    type="number"
                    name="sessionTimeout"
                    value={formData.sessionTimeout}
                    onChange={handleInputChange}
                    min="5"
                    max="240"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D30019] focus:border-transparent"
                  />
                  <span className="block text-sm text-gray-500 mt-1">
                    Automatic logout after specified minutes of inactivity
                  </span>
                </div>
              </div>

              {/* Backup Settings */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-800">Backup Settings</h3>
                
                {/* Backup Database */}
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="block text-sm font-medium text-gray-700">Backup Database</span>
                      <span className="block text-sm text-gray-500 mt-1">
                        Download a complete backup of your system data
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={handleBackup}
                      className="px-4 py-2 bg-[#D30019] text-white rounded-lg hover:bg-[#920114] font-medium transition-colors"
                    >
                      💾 Download Backup
                    </button>
                  </div>
                </div>

                {/* Restore Backup */}
                <div className="p-4 border border-gray-200 rounded-lg">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Restore Backup
                  </label>
                  <span className="block text-sm text-gray-500 mb-3">
                    Upload a backup file to restore your system data
                  </span>
                  <input
                    type="file"
                    accept=".json,.sql,.backup"
                    onChange={handleRestore}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D30019] focus:border-transparent"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#D30019] text-white rounded-lg hover:bg-[#920114] font-medium transition-colors"
                >
                  🛡️ Apply Settings
                </button>
              </div>
            </form>

            {/* Security Status */}
            <div className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Security Status</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Two-Factor Authentication:</span>
                  <span className={formData.twoFactorAuth ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                    {formData.twoFactorAuth ? "Enabled" : "Disabled"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Password Policy:</span>
                  <span className="text-gray-800 font-medium capitalize">{formData.passwordPolicy}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Session Timeout:</span>
                  <span className="text-gray-800 font-medium">{formData.sessionTimeout} minutes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Last Backup:</span>
                  <span className="text-gray-800 font-medium">2024-01-15 10:30:00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}