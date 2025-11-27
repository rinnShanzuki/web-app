// src/pages/setcomponents/LangSettings.jsx
import { useState } from "react";
import SetSideBar from "../components/layout/SetSideBar";

export default function LangSettings() {
  const [formData, setFormData] = useState({
    defaultLanguage: "english",
    autoTranslate: false,
    dateTimeFormat: "12-hour"
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    console.log("Saving language settings:", formData);
    alert("Language settings saved successfully!");
  };

  const handleCancel = () => {
    setFormData({
      defaultLanguage: "english",
      autoTranslate: false,
      dateTimeFormat: "12-hour"
    });
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
              Language & Localization Settings
            </h2>

            <form onSubmit={handleSave} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Default Language */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Default Language *
                  </label>
                  <select
                    name="defaultLanguage"
                    value={formData.defaultLanguage}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D30019] focus:border-transparent"
                  >
                    <option value="english">English</option>
                    <option value="filipino">Filipino</option>
                  </select>
                </div>

                {/* Date/Time Format */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date/Time Format *
                  </label>
                  <select
                    name="dateTimeFormat"
                    value={formData.dateTimeFormat}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D30019] focus:border-transparent"
                  >
                    <option value="12-hour">12-hour format</option>
                    <option value="24-hour">24-hour format</option>
                  </select>
                </div>

                {/* Auto-Translate Toggle */}
                <div className="md:col-span-2">
                  <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <div>
                      <span className="block text-sm font-medium text-gray-700">Enable Auto-Translate</span>
                      <span className="block text-sm text-gray-500 mt-1">
                        Automatically translate system content to default language
                      </span>
                    </div>
                    <input
                      type="checkbox"
                      name="autoTranslate"
                      checked={formData.autoTranslate}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-[#D30019] focus:ring-[#D30019] rounded"
                    />
                  </label>
                </div>
              </div>

              {/* Preview Section */}
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Preview</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p><strong>Current Language:</strong> {formData.defaultLanguage === 'english' ? 'English' : 'Filipino'}</p>
                  <p><strong>Time Format:</strong> {formData.dateTimeFormat}</p>
                  <p><strong>Auto-Translate:</strong> {formData.autoTranslate ? 'Enabled' : 'Disabled'}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-6 py-3 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 font-medium transition-colors"
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
          </div>
        </div>
      </div>
    </div>
  );
}