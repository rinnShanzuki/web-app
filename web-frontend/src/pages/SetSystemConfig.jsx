// src/pages/setcomponents/SetSystemConfig.jsx
import { useState } from "react";
import SetSideBar from "../components/layout/SetSideBar";

export default function SetSystemConfig() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    systemName: "RES-Q",
    organizationName: "Emergency Response System",
    contactEmail: "support@res-q.com",
    timezone: "UTC+08:00",
    systemTheme: "light",
  });

  const [originalData, setOriginalData] = useState({ ...formData });

  const handleEdit = () => {
    setOriginalData({ ...formData });
    setIsEditing(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    setIsEditing(false);
    // Save logic here
    console.log("Saving system config:", formData);
    alert("System configuration saved successfully!");
  };

  const handleCancel = () => {
    setFormData({ ...originalData });
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
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
          {/* System Configuration */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-[#920114] mb-6 border-b border-gray-200 pb-4">
              System Configuration
            </h2>
            
            {!isEditing ? (
              <div className="space-y-6">
                {/* View Mode - Display Current Configuration */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* System Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      System Name
                    </label>
                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-gray-300">
                      {formData.systemName}
                    </div>
                  </div>

                  {/* Organization Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Organization / Agency Name
                    </label>
                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-gray-300">
                      {formData.organizationName}
                    </div>
                  </div>

                  {/* Contact Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contact / Support Email
                    </label>
                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-gray-300">
                      {formData.contactEmail}
                    </div>
                  </div>

                  {/* Timezone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Timezone
                    </label>
                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-gray-300">
                      {formData.timezone}
                    </div>
                  </div>

                  {/* System Theme */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      System Theme
                    </label>
                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-gray-300">
                      {formData.systemTheme === "light" ? "Light Mode" : "Dark Mode"}
                    </div>
                  </div>
                </div>

                {/* Edit Button */}
                <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                  <button
                    onClick={handleEdit}
                    className="px-6 py-3 bg-[#D30019] text-white rounded-lg hover:bg-[#920114] font-medium transition-colors"
                    title="Edit System Configuration"
                  >
                    Edit
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSave} className="space-y-6">
                {/* Edit Mode - Form Inputs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* System Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      System Name *
                    </label>
                    <input
                      type="text"
                      name="systemName"
                      value={formData.systemName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D30019] focus:border-transparent transition-colors text-gray-700 placeholder:text-gray-300"
                      placeholder="RES-Q"
                      required
                    />
                  </div>

                  {/* Organization Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Organization / Agency Name *
                    </label>
                    <input
                      type="text"
                      name="organizationName"
                      value={formData.organizationName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D30019] focus:border-transparent transition-colors text-gray-700 placeholder:text-gray-300"
                      placeholder="Enter organization name"
                      required
                    />
                  </div>

                  {/* Contact Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contact / Support Email *
                    </label>
                    <input
                      type="email"
                      name="contactEmail"
                      value={formData.contactEmail}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D30019] focus:border-transparent transition-colors text-gray-700 placeholder:text-gray-300"
                      placeholder="Enter contact email"
                      required
                    />
                  </div>

                  {/* Timezone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Timezone *
                    </label>
                    <select
                      name="timezone"
                      value={formData.timezone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D30019] focus:border-transparent transition-colors text-gray-700"
                      required
                    >
                      <option value="UTC+08:00">UTC+08:00 (Philippine Time)</option>
                      <option value="UTC+00:00">UTC+00:00 (GMT)</option>
                      <option value="UTC-05:00">UTC-05:00 (EST)</option>
                      <option value="UTC-08:00">UTC-08:00 (PST)</option>
                    </select>
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