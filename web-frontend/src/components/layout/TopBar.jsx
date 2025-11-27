import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import notifIcon from "../../assets/images/notif.png";
import actlogIcon from "../../assets/images/actlog.png";
import settingIcon from "../../assets/images/setting.png";
import userIcon from "../../assets/images/user.png";
// Import the new dropdown icons
import profileIcon from "../../assets/images/profile.png";
import passIcon from "../../assets/images/pass.png";
import darkModeIcon from "../../assets/images/dark-mode.png";
import switchIcon from "../../assets/images/switch.png";
import logoutIcon from "../../assets/images/logout.png";
// Import the modals
import MyProfileModal from "../../pages/MyProfileModal";
import AccountSettingsModal from "../../pages/AccountSettingsModal";

export default function TopBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const [showActlogDropdown, setShowActlogDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    // Check localStorage for saved theme preference
    const savedTheme = localStorage.getItem('darkMode');
    return savedTheme ? JSON.parse(savedTheme) : false;
  });
  const [showMyProfileModal, setShowMyProfileModal] = useState(false);
  const [showAccountSettingsModal, setShowAccountSettingsModal] = useState(false);
  const [showSwitchAccountModal, setShowSwitchAccountModal] = useState(false); // Add this state

  const notifRef = useRef(null);
  const actlogRef = useRef(null);
  const profileRef = useRef(null);

  // Apply dark mode class to document and save preference
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
    }
    // Save to localStorage
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notifRef.current &&
        !notifRef.current.contains(event.target) &&
        actlogRef.current &&
        !actlogRef.current.contains(event.target) &&
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setShowNotifDropdown(false);
        setShowActlogDropdown(false);
        setShowProfileDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getPageTitle = () => {
    const reportDetailsMatch = location.pathname.match(/^\/reports\/([^/]+)$/);
    if (reportDetailsMatch) return "Report Details";

    switch (location.pathname) {
      case "/":
        return "Dashboard";
      case "/reports":
        return "Reports Management";
      case "/agencies":
        return "Agency Management";
      case "/responders":
        return "Responder Management";
      case "/citizens":
        return "Citizen Management";
      case "/monitoring":
        return "Monitoring";
      case "/post-incident":
        return "Post-Incidents";
      case "/settings":
        return "Settings";
      default:
        return "Dashboard";
    }
  };

  const handleMyProfileClick = () => {
    setShowMyProfileModal(true);
    setShowProfileDropdown(false);
  };

  const handleAccountSettingsClick = () => {
    setShowAccountSettingsModal(true);
    setShowProfileDropdown(false);
  };

  const handleSwitchAccountClick = () => {
    setShowSwitchAccountModal(true);
    setShowProfileDropdown(false);
  };

  const handleEditProfile = () => {
    setShowMyProfileModal(false);
    setShowAccountSettingsModal(true);
  };

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
    setShowProfileDropdown(false);
  };

  // Notifications (10)
  const notifications = [
    { id: 1, icon: "🚨", title: "New Emergency Report", desc: "Fire reported in Barangay Malate. Responders dispatched.", time: "2m ago" },
    { id: 2, icon: "✅", title: "Responder Update", desc: "Team Alpha confirmed arrival at the emergency site.", time: "10m ago" },
    { id: 3, icon: "📦", title: "Resource Request", desc: "Barangay 42 requested additional medical kits.", time: "18m ago" },
    { id: 4, icon: "📍", title: "Location Update", desc: "Responder Bravo changed status to 'In Transit'.", time: "25m ago" },
    { id: 5, icon: "⚙️", title: "System Maintenance", desc: "Scheduled maintenance tonight from 12AM–2AM.", time: "1h ago" },
    { id: 6, icon: "🧭", title: "Tracking Active", desc: "Live GPS tracking started for Rescue Vehicle 03.", time: "1h ago" },
    { id: 7, icon: "💬", title: "Citizen Feedback", desc: "A citizen rated response experience 5 stars.", time: "2h ago" },
    { id: 8, icon: "🆘", title: "SOS Alert", desc: "Elderly citizen triggered voice-activated emergency alert.", time: "3h ago" },
    { id: 9, icon: "📊", title: "Report Summary", desc: "Incident analytics updated for today's operations.", time: "4h ago" },
    { id: 10, icon: "🔔", title: "Reminder", desc: "Ensure responders verify incident closure by 6PM.", time: "5h ago" },
  ];

  // Activity Logs (10)
  const activityLogs = [
    { id: 1, icon: "👤", title: "Admin Login", desc: "Administrator logged in successfully.", time: "1m ago" },
    { id: 2, icon: "✏️", title: "Edited Report", desc: "Updated emergency report #1023.", time: "5m ago" },
    { id: 3, icon: "🏢", title: "Agency Added", desc: "New partner agency registered: MMDA Rescue Unit.", time: "12m ago" },
    { id: 4, icon: "🧑‍🚒", title: "Responder Assigned", desc: "Assigned Responder Bravo to incident #1045.", time: "25m ago" },
    { id: 5, icon: "📤", title: "Report Submitted", desc: "Post-incident report uploaded by Responder Alpha.", time: "30m ago" },
    { id: 6, icon: "🗑️", title: "Data Removed", desc: "Old citizen feedback entry deleted.", time: "45m ago" },
    { id: 7, icon: "⚙️", title: "Settings Updated", desc: "System settings modified by Admin.", time: "1h ago" },
    { id: 8, icon: "🕒", title: "Auto Logout", desc: "Session expired and auto-logged out after inactivity.", time: "2h ago" },
    { id: 9, icon: "🔄", title: "Data Sync", desc: "Responder location data synchronized successfully.", time: "3h ago" },
    { id: 10, icon: "📁", title: "File Exported", desc: "Exported PDF report summary for October 2025.", time: "4h ago" },
  ];

  return (
    <>
      <div className={`flex justify-between items-center p-6 border-b shadow-sm w-full h-16 relative transition-colors duration-200 ${
        darkMode 
          ? 'bg-gray-800 border-gray-700 text-white' 
          : 'bg-white border-gray-200 text-gray-900'
      }`}>
        {/* PAGE TITLE */}
        <h1 className={`text-2xl font-bold uppercase ${
          darkMode ? 'text-white' : 'text-[#920114]'
        }`}>
          {getPageTitle()}
        </h1>

        {/* RIGHT SIDE ICONS */}
        <div className="flex items-center space-x-6 relative">

          {/* NOTIFICATIONS DROPDOWN */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => {
                setShowNotifDropdown(!showNotifDropdown);
                setShowActlogDropdown(false);
                setShowProfileDropdown(false);
              }}
              className={`relative group p-1 rounded-full transition duration-200 ${
                darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
              }`}
            >
                <img 
                    src={notifIcon} 
                    alt="Notifications" 
                    className={`w-5 h-5 group-hover:scale-110 transition-transform duration-200 ${
                        darkMode ? '' : ''
                    }`} 
                />
              <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] px-[4px] py-[1px] rounded-full font-semibold">
                {notifications.length}
              </span>
            </button>

            {showNotifDropdown && (
              <div className={`absolute right-0 mt-3 w-80 border rounded-xl shadow-lg z-50 ${
                darkMode 
                  ? 'bg-gray-800 border-gray-700 text-white' 
                  : 'bg-white border-gray-200 text-gray-800'
              }`}>
                <div className={`p-3 border-b font-semibold ${
                  darkMode ? 'border-gray-700' : 'border-gray-200'
                }`}>
                  Notifications ({notifications.length})
                </div>
                <ul className={`max-h-80 overflow-y-auto text-sm divide-y ${
                  darkMode ? 'divide-gray-700' : 'divide-gray-100'
                }`}>
                  {notifications.map((notif) => (
                    <li key={notif.id} className={`px-4 py-3 cursor-pointer transition-colors ${
                      darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                    }`}>
                      <div className="flex items-start gap-2">
                        <span className="text-lg">{notif.icon}</span>
                        <div>
                          <p className={`font-semibold ${
                            darkMode ? 'text-white' : 'text-gray-800'
                          }`}>
                            {notif.title}
                          </p>
                          <p className={`text-xs ${
                            darkMode ? 'text-gray-300' : 'text-gray-600'
                          }`}>
                            {notif.desc}
                          </p>
                          <p className={`text-[11px] mt-1 ${
                            darkMode ? 'text-gray-400' : 'text-gray-400'
                          }`}>
                            {notif.time}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <div 
                  onClick={() => navigate("/notifications")} 
                  className={`p-3 text-center cursor-pointer font-medium text-sm border-t transition-colors ${
                    darkMode 
                      ? 'text-red-400 hover:bg-gray-700 border-gray-700' 
                      : 'text-[#920114] hover:bg-gray-50 border-gray-200'
                  }`}
                >
                  View all notifications
                </div>
              </div>
            )}
          </div>

          {/* ACTIVITY LOG DROPDOWN */}
          <div className="relative" ref={actlogRef}>
            <button
              onClick={() => {
                setShowActlogDropdown(!showActlogDropdown);
                setShowNotifDropdown(false);
                setShowProfileDropdown(false);
              }}
              className={`relative group p-1 rounded-full transition duration-200 ${
                darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
              }`}
            >
                <img 
                    src={actlogIcon} 
                    alt="Activity Log" 
                    className={`w-5 h-5 group-hover:scale-110 transition-transform duration-200 ${
                        darkMode ? '' : ''
                    }`} 
                />

              <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] px-[4px] py-[1px] rounded-full font-semibold">
                {activityLogs.length}
              </span>
            </button>

            {showActlogDropdown && (
              <div className={`absolute right-0 mt-3 w-80 border rounded-xl shadow-lg z-50 ${
                darkMode 
                  ? 'bg-gray-800 border-gray-700 text-white' 
                  : 'bg-white border-gray-200 text-gray-800'
              }`}>
                <div className={`p-3 border-b font-semibold ${
                  darkMode ? 'border-gray-700' : 'border-gray-200'
                }`}>
                  Activity Logs ({activityLogs.length})
                </div>
                <ul className={`max-h-80 overflow-y-auto text-sm divide-y ${
                  darkMode ? 'divide-gray-700' : 'divide-gray-100'
                }`}>
                  {activityLogs.map((log) => (
                    <li key={log.id} className={`px-4 py-3 cursor-pointer transition-colors ${
                      darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                    }`}>
                      <div className="flex items-start gap-2">
                        <span className="text-lg">{log.icon}</span>
                        <div>
                          <p className={`font-semibold ${
                            darkMode ? 'text-white' : 'text-gray-800'
                          }`}>
                            {log.title}
                          </p>
                          <p className={`text-xs ${
                            darkMode ? 'text-gray-300' : 'text-gray-600'
                          }`}>
                            {log.desc}
                          </p>
                          <p className={`text-[11px] mt-1 ${
                            darkMode ? 'text-gray-400' : 'text-gray-400'
                          }`}>
                            {log.time}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <div 
                  onClick={() => navigate("/activity-log")} 
                  className={`p-3 text-center cursor-pointer font-medium text-sm border-t transition-colors ${
                    darkMode 
                      ? 'text-red-400 hover:bg-gray-700 border-gray-700' 
                      : 'text-[#920114] hover:bg-gray-50 border-gray-200'
                  }`}
                >
                  View all activity logs
                </div>
              </div>
            )}
          </div>

          {/* SETTINGS */}
          <button 
            onClick={() => navigate("/system-config")} 
            className={`p-1 rounded-full transition duration-200 ${
              darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
            }`}
          >
            <img 
                src={settingIcon} 
                alt="Settings" 
                className={`w-5 h-5 hover:scale-110 transition-transform duration-200 ${
                    darkMode ? '' : ''
                }`} 
            />
          </button>

          {/* USER ICON WITH ONLINE INDICATOR + DROPDOWN */}
          <div className={`relative flex items-center ml-3 pl-4 border-l ${
            darkMode ? 'border-gray-700' : 'border-gray-200'
          }`} ref={profileRef}>
            <button
              onClick={() => {
                setShowProfileDropdown(!showProfileDropdown);
                setShowNotifDropdown(false);
                setShowActlogDropdown(false);
              }}
              className="relative flex items-center space-x-2 hover:opacity-80 transition"
            >
              <div className="relative">
                <img 
                  src={userIcon} 
                  alt="User" 
                  className={`w-8 h-8 rounded-full border ${
                    darkMode ? 'border-gray-600' : 'border-gray-300'
                  }`} 
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></span>
              </div>
            </button>

            {showProfileDropdown && (
              <div className={`absolute right-0 top-full w-64 border rounded-xl shadow-lg z-50 text-sm ${
                darkMode 
                  ? 'bg-gray-800 border-gray-700 text-white' 
                  : 'bg-white border-gray-200 text-gray-800'
              }`}>
                <ul className={`divide-y ${
                  darkMode ? 'divide-gray-700' : 'divide-gray-100'
                }`}>
                  {/* My Profile */}
                  <li
                    onClick={handleMyProfileClick}
                    className={`px-4 py-3 cursor-pointer flex items-center gap-3 transition-colors ${
                      darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <img 
                        src={profileIcon} 
                        alt="Profile" 
                        className={`w-4 h-4 ${darkMode ? '' : ''}`} 
                    />

                    <span className={darkMode ? 'text-white' : 'text-gray-800'}>
                      My Profile
                    </span>
                  </li>
                  
                  {/* Account Settings */}
                  <li
                    onClick={handleAccountSettingsClick}
                    className={`px-4 py-3 cursor-pointer flex items-center gap-3 transition-colors ${
                      darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <img 
                        src={passIcon} 
                        alt="Account Settings" 
                        className={`w-4 h-4 ${darkMode ? '' : ''}`} 
                    />
                    <span className={darkMode ? 'text-white' : 'text-gray-800'}>
                      Account Settings
                    </span>
                  </li>
                  
                  {/* Dark Mode Toggle */}
                  <li
                    onClick={handleDarkModeToggle}
                    className={`px-4 py-3 cursor-pointer flex items-center gap-3 transition-colors ${
                      darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <img 
                        src={darkModeIcon} 
                        alt="Dark Mode" 
                        className={`w-4 h-4 ${darkMode ? '' : ''}`} 
                    />
                    <span className={darkMode ? 'text-white' : 'text-gray-800'}>
                      {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                    </span>
                  </li>
                  
                  {/* Switch Account - UPDATED */}
                  <li
                    onClick={handleSwitchAccountClick}
                    className={`px-4 py-3 cursor-pointer flex items-center gap-3 transition-colors ${
                      darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <img 
                        src={switchIcon} 
                        alt="Switch Account" 
                        className={`w-4 h-4 ${darkMode ? '' : ''}`} 
                    />
                    <span className={darkMode ? 'text-white' : 'text-gray-800'}>
                      Switch Account
                    </span>
                  </li>
                  
                  {/* Log Out */}
                  <li
                    onClick={() => navigate("/")}
                    className={`px-4 py-3 cursor-pointer flex items-center gap-3 font-semibold transition-colors ${
                      darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                    } text-red-600`}
                  >
                    <img src={logoutIcon} alt="Log Out" className="w-4 h-4" />
                    <span className={darkMode ? 'text-white' : 'text-gray-800'}>Log Out</span>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* My Profile Modal */}
      <MyProfileModal 
        isOpen={showMyProfileModal}
        onClose={() => setShowMyProfileModal(false)}
        onEditProfile={handleEditProfile}
      />

      {/* Account Settings Modal */}
      <AccountSettingsModal 
        isOpen={showAccountSettingsModal}
        onClose={() => setShowAccountSettingsModal(false)}
      />

      {/* Switch Account Modal */}
        {showSwitchAccountModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-800">
                Switch Account
                </h3>
                <button
                onClick={() => setShowSwitchAccountModal(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                ✕
                </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
                {/* Description */}
                <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">🔁</span>
                </div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                    Select Account to Switch To
                </h4>
                <p className="text-sm text-gray-600">
                    Choose from your accessible roles and agencies
                </p>
                </div>

                {/* Account List */}
                <div className="space-y-3 max-h-64 overflow-y-auto">
                {/* Super Admin - Current */}
                <div className="p-4 border-2 border-blue-200 bg-blue-50 rounded-lg cursor-pointer transition-all duration-200">
                    <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                        <h5 className="font-semibold text-blue-600">
                            Super Admin
                        </h5>
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            Current
                        </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">
                        National Emergency Response System
                        </p>
                        <p className="text-xs text-gray-500">
                        Full system access
                        </p>
                    </div>
                    <div className="w-4 h-4 rounded-full border-2 border-gray-300 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
                    </div>
                    </div>
                </div>

                {/* Regional Admin */}
                <div className="p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-gray-300 transition-all duration-200">
                    <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                        <h5 className="font-semibold text-gray-800">
                            Regional Admin
                        </h5>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">
                        NCR Emergency Command
                        </p>
                        <p className="text-xs text-gray-500">
                        Regional management access
                        </p>
                    </div>
                    <div className="w-4 h-4 rounded-full border-2 border-gray-300 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
                    </div>
                    </div>
                </div>

                {/* Agency Manager - BFP */}
                <div className="p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-gray-300 transition-all duration-200">
                    <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                        <h5 className="font-semibold text-gray-800">
                            Agency Manager
                        </h5>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">
                        BFP - Bureau of Fire Protection
                        </p>
                        <p className="text-xs text-gray-500">
                        Fire emergency management
                        </p>
                    </div>
                    <div className="w-4 h-4 rounded-full border-2 border-gray-300 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
                    </div>
                    </div>
                </div>

                {/* Agency Manager - PNP */}
                <div className="p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-gray-300 transition-all duration-200">
                    <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                        <h5 className="font-semibold text-gray-800">
                            Agency Manager
                        </h5>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">
                        PNP - Philippine National Police
                        </p>
                        <p className="text-xs text-gray-500">
                        Police incident management
                        </p>
                    </div>
                    <div className="w-4 h-4 rounded-full border-2 border-gray-300 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
                    </div>
                    </div>
                </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3 pt-4">
                <button
                    onClick={() => setShowSwitchAccountModal(false)}
                    className="flex-1 px-4 py-3 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                >
                    Cancel
                </button>
                <button
                    className="flex-1 px-4 py-3 bg-gray-400 text-white rounded-lg cursor-not-allowed transition-colors font-medium"
                    disabled
                >
                    Switch Account
                </button>
                </div>

                {/* Security Notice */}
                <div className="text-center">
                <p className="text-xs text-gray-500">
                    You'll need to re-authenticate when switching between major role types
                </p>
                </div>
            </div>
            </div>
        </div>
        )}
    </>
  );
}