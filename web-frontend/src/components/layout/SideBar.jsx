import { Link, useLocation } from "react-router-dom";
import { FaHome, FaFileAlt, FaBuilding, FaUserShield, FaUsers, FaEye, FaClipboardList, FaCog, FaSignOutAlt } from "react-icons/fa";
import logo from "../../assets/images/logo.png";

export default function SideBar() {
  const location = useLocation();
  const menuItems = [
    { name: "Dashboard", icon: <FaHome />, path: "/dashboard" },
    { name: "Reports", icon: <FaFileAlt />, path: "/reports" },
    { name: "Agencies", icon: <FaBuilding />, path: "/agencies" },
    { name: "Responders", icon: <FaUserShield />, path: "/responders" },
    { name: "Citizens", icon: <FaUsers />, path: "/citizens" },
    { name: "Monitoring", icon: <FaEye />, path: "/monitoring" },
    { name: "Post-Incidents", icon: <FaClipboardList />, path: "/post-incident" },
  ];

  return (
    <div 
      className="w-64 h-full text-white flex flex-col"
      style={{
        background: "linear-gradient(135deg, #D64219 0%, #920114 50%, #3F0008 100%)"
      }}
    >
      <div className="flex flex-col items-center justify-center h-50 border-b border-white/20 p-4 bg-black/10">
        <img src={logo} alt="RES-Q Logo" className="h-12 w-12"/>
        <span className="text-xl font-bold text-center">RES-Q</span>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item, idx) => (
          <Link
            key={idx}
            to={item.path}
            className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
              location.pathname === item.path 
                ? "bg-white/20 text-white shadow-lg backdrop-blur-sm border border-white/30" 
                : "text-white/80 hover:bg-white/15 hover:text-white hover:backdrop-blur-sm border border-transparent"
            }`}
          >
            {item.icon} 
            <span className="font-medium">{item.name}</span>
          </Link>
        ))}
      </nav>
      {/* FOOTER - LOGOUT */}
      <div className="border-t border-white/20 bg-black/10 p-4">
        <div className="flex items-center justify-between">
          {/* LEFT SIDE INFO */}
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-white text-sm">ADMINISTRATOR</span>
            </div>
            <p className="text-gray-300 text-xs font-semibold">
              admin1@resq.gov.ph
            </p>
            <div className="flex items-center gap-2 mt-1">
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              <span className="text-green-400 text-sm font-semibold">ONLINE</span>
            </div>
          </div>

          {/* LOGOUT ICON */}
          <Link
            to="/"
            className="text-white hover:text-red-400 transition-all duration-200 text-xl"
            title="Logout"
          >
            <FaSignOutAlt />
          </Link>
        </div>
      </div>
    </div>
  );
}