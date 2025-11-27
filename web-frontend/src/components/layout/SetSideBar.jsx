// src/components/layout/SetSideBar.jsx
import { useNavigate, useLocation } from "react-router-dom";

export default function SetSideBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { id: "system", name: "System Configuration", path: "/system-config" },
    { id: "profile", name: "Profile Settings", path: "/profile-settings" },
    { id: "language", name: "Language Settings", path: "/language-settings" },
    { id: "admin", name: "Account Management", path: "/account-management" },
    { id: "backup", name: "Backup & Security", path: "/backup-security" },
  ];

  const isActive = (path) => location.pathname === path;

  const handleBackToDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <div className="w-64 h-screen bg-white flex flex-col fixed left-0 top-0 border-r border-gray-200 sidebar-red">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-[#D64219] to-[#920114]">
        <h2 className="text-xl font-bold text-white text-center">Settings</h2>
        <p className="text-white/80 text-center text-sm mt-1">Manage system preferences</p>
      </div>
      
      {/* Navigation - Scrollable if needed */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => navigate(tab.path)}
            className={`w-full text-left flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
              isActive(tab.path)
                ? "bg-[#D30019] text-white shadow-md" 
                : "text-gray-700 hover:bg-gray-100 hover:text-[#920114]"
            }`}
          >
            <span className="font-medium text-sm">{tab.name}</span>
          </button>
        ))}
      </nav>

      {/* Footer with Back to Dashboard button */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleBackToDashboard}
          className="w-full flex items-center justify-center gap-2 p-3 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-[#920114] transition-all duration-200 font-medium text-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}