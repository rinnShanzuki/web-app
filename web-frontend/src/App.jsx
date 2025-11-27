import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ReportManagement from "./pages/ReportManagement";
import ReportDetails from "./pages/RepDetailsForm";
import AgencyManagement from "./pages/AgencyManagement";
import ResponderManagement from "./pages/ResponderManagement";
import CitizenManagement from "./pages/CitizenManagement";
import Monitoring from "./pages/Monitoring";
import PostIncident from "./pages/PostIncident";
import SetSystemConfig from "./pages/SetSystemConfig";
import ProfSettings from "./pages/ProfSettings";
import LangSettings from "./pages/LangSettings";
import AccManagement from "./pages/AccManagement";
import BackSecSettings from "./pages/BackSecSettings";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/reports" element={<ReportManagement />} />
        <Route path="/reports/:reportId" element={<ReportDetails />} />
        <Route path="/agencies" element={<AgencyManagement />} />
        <Route path="/responders" element={<ResponderManagement />} />
        <Route path="/citizens" element={<CitizenManagement />} />
        <Route path="/monitoring" element={<Monitoring />} />
        <Route path="/post-incident" element={<PostIncident />} />
        <Route path="/system-config" element={<SetSystemConfig />} />
        <Route path="/profile-settings" element={<ProfSettings/>} />
        <Route path="/language-settings" element={<LangSettings/>} />
        <Route path="/account-management" element={<AccManagement/>}/>
        <Route path="/backup-security" element={<BackSecSettings/>} />
      </Routes>
    </Router>
  );
}
