// src/components/modals/MyProfileModal.jsx
import { useState } from "react";

export default function MyProfileModal({ isOpen, onClose, onEditProfile }) {
  const [adminData] = useState({
    profilePicture: "",
    fullName: "John Doe",
    email: "john.doe@res-q.com",
    role: "Super Admin",
    lastLogin: "2024-01-15 14:30:25"
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-[#920114]">My Profile</h2>
          <p className="text-gray-600 text-sm mt-1">View your account information</p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Profile Picture */}
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-4">
              {adminData.profilePicture ? (
                <img src={adminData.profilePicture} alt="Profile" className="w-24 h-24 rounded-full" />
              ) : (
                <span className="text-3xl text-gray-500">👤</span>
              )}
            </div>
          </div>

          {/* Profile Information */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-gray-800">
                {adminData.fullName}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-gray-800">
                {adminData.email}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-gray-800">
                {adminData.role}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Last Login</label>
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-gray-800">
                {adminData.lastLogin}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex space-x-3 p-6 border-t border-gray-200">
          <button
            onClick={onEditProfile}
            className="flex-1 px-4 py-3 bg-[#D30019] text-white rounded-lg hover:bg-[#920114] font-medium transition-colors"
          >
            ✏️ Edit Profile
          </button>
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}