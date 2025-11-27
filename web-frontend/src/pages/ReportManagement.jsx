import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../components/layout/SideBar";
import TopBar from "../components/layout/TopBar";

export default function ReportManagement() {
  const [activeTab, setActiveTab] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("Newest");
  const navigate = useNavigate();

  // Sample data for reports
  const reportsData = [
    { id: "RPT-001", type: "Fire Emergency", citizen: "Juan Dela Cruz", agency: "BFP", status: "Pending" },
    { id: "RPT-002", type: "Medical Emergency", citizen: "Maria Santos", agency: "911", status: "Ongoing" },
    { id: "RPT-003", type: "Crime Incident", citizen: "Pedro Reyes", agency: "PNP", status: "Completed" },
    { id: "RPT-004", type: "Natural Disaster", citizen: "Anna Lopez", agency: "MDRRMO", status: "Pending" },
    { id: "RPT-005", type: "Fire Emergency", citizen: "Carlos Garcia", agency: "BFP", status: "Ongoing" },
    { id: "RPT-006", type: "Medical Emergency", citizen: "Sofia Martinez", agency: "911", status: "Completed" },
    { id: "RPT-007", type: "Crime Incident", citizen: "Miguel Torres", agency: "PNP", status: "Pending" },
    { id: "RPT-008", type: "Natural Disaster", citizen: "Elena Ramirez", agency: "MDRRMO", status: "Ongoing" }
  ];

  const tabs = ["All", "Pending", "Ongoing", "Completed"];

  // Filter reports based on active tab
  const filteredReports = reportsData
    .filter((report) => (activeTab === "All" ? true : report.status === activeTab))
    .filter((report) =>
      report.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.citizen.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.agency.toLowerCase().includes(searchTerm.toLowerCase())
    );

  // Sort reports
  const sortedReports = [...filteredReports].sort((a, b) => {
    if (sortBy === "A-Z") return a.type.localeCompare(b.type);
    if (sortBy === "Z-A") return b.type.localeCompare(a.type);
    return 0; // Default (Newest)
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Ongoing":
        return "bg-blue-100 text-blue-800";
      case "Completed":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="flex w-full min-h-screen bg-gray-50">
      {/* Fixed Sidebar */}
      <div className="fixed left-0 top-0 h-screen z-50">
        <SideBar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 ml-64">
        {/* TopBar */}
        <TopBar />

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="w-full max-w-full">
            {/* Page Header */}
            <div className="flex justify-between items-center mb-8">
              <div>
                <p className="text-gray-600">
                  Manage and track all emergency reports
                </p>
              </div>

              {/* Search + Sort Controls */}
              <div className="flex items-center space-x-4">
                {/* Search */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-[#D30019]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Search reports..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border-1 border-[#D30019] rounded-lg bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#D30019] focus:border-transparent w-64 transition-colors duration-200"
                  />
                </div>

                {/* Sort By */}
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border-1 border-[#D30019] rounded-lg py-2 pl-3 pr-8 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#D30019] focus:border-transparent appearance-none transition-colors duration-200"
                  >
                    <option value="Newest">Newest First</option>
                    <option value="A-Z">A-Z</option>
                    <option value="Z-A">Z-A</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <svg className="h-5 w-5 text-[#D30019]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
              <div className="flex space-x-1 mb-6">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                      activeTab === tab
                        ? "bg-[#D30019] text-white shadow-md"
                        : "text-gray-600 hover:bg-[#920114] hover:text-white"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Reports Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left py-4 px-4 font-semibold text-gray-700">Report ID</th>
                      <th className="text-left py-4 px-4 font-semibold text-gray-700">Type of Emergency</th>
                      <th className="text-left py-4 px-4 font-semibold text-gray-700">Citizen</th>
                      <th className="text-left py-4 px-4 font-semibold text-gray-700">Assigned Agency</th>
                      <th className="text-left py-4 px-4 font-semibold text-gray-700">Status</th>
                      <th className="text-left py-4 px-4 font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedReports.map((report, index) => (
                      <tr
                        key={report.id}
                        className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                          index % 2 === 0 ? "bg-white" : "bg-gray-50"
                        }`}
                      >
                        <td className="py-4 px-4 font-medium text-gray-900">{report.id}</td>
                        <td className="py-4 px-4 text-gray-700">{report.type}</td>
                        <td className="py-4 px-4 text-gray-700">{report.citizen}</td>
                        <td className="py-4 px-4">
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                              report.agency === "BFP"
                                ? "bg-[#D64219] bg-opacity-20 text-[#D64219]"
                                : report.agency === "PNP"
                                ? "bg-[#D30019] bg-opacity-20 text-[#D30019]"
                                : report.agency === "MDRRMO"
                                ? "bg-[#920114] bg-opacity-20 text-[#920114]"
                                : "bg-[#3F0008] bg-opacity-20 text-[#3F0008]"
                            }`}
                          >
                            {report.agency}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                              report.status
                            )}`}
                          >
                            {report.status}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex space-x-2">
                            <button 
                                onClick={() => navigate(`/reports/${report.id}`)}
                                className="text-[#D30019] hover:text-[#920114] transition-colors font-medium text-sm"
                                >
                                View
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Empty State */}
              {sortedReports.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-gray-400 text-6xl mb-4">📋</div>
                  <h3 className="text-lg font-medium text-gray-600 mb-2">
                    No reports found
                  </h3>
                  <p className="text-gray-500">
                    There are no reports in the {activeTab.toLowerCase()} status.
                  </p>
                </div>
              )}

              {/* Table Footer */}
              <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
                <div className="text-sm text-gray-600">
                  Showing {sortedReports.length} of {reportsData.length} reports
                </div>
                <div className="flex space-x-2">
                  <button className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                    Previous
                  </button>
                  <button className="px-4 py-2 text-sm font-medium text-white bg-[#D30019] rounded-lg hover:bg-[#920114] transition-colors">
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}