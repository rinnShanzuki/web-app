import { useState } from "react";
import SideBar from "../components/layout/SideBar";
import TopBar from "../components/layout/TopBar";

export default function CitizenManagement() {
  const [activeTab, setActiveTab] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("Newest");
  const [showCitizenDetails, setShowCitizenDetails] = useState(false);
  const [selectedCitizen, setSelectedCitizen] = useState(null);

  // Sample data for citizens
  const citizensData = [
    { 
      id: "CTZ-001", 
      name: "Juan Dela Cruz", 
      email: "juan.delacruz@email.com",
      phone: "+63 912 345 6789",
      address: "123 Main Street, Quezon City",
      totalReports: 5,
      status: "Active",
      reportHistory: [
        { id: "RPT-001", type: "Fire Emergency", date: "2024-01-15", status: "Completed" },
        { id: "RPT-005", type: "Medical Emergency", date: "2024-01-20", status: "Completed" }
      ]
    },
    { 
      id: "CTZ-002", 
      name: "Maria Santos", 
      email: "maria.santos@email.com",
      phone: "+63 923 456 7890",
      address: "456 Elm Street, Makati City",
      totalReports: 3,
      status: "Active",
      reportHistory: [
        { id: "RPT-002", type: "Crime Incident", date: "2024-01-16", status: "Completed" }
      ]
    },
    { 
      id: "CTZ-003", 
      name: "Pedro Reyes", 
      email: "pedro.reyes@email.com",
      phone: "+63 934 567 8901",
      address: "789 Oak Street, Manila",
      totalReports: 8,
      status: "Banned",
      reportHistory: [
        { id: "RPT-003", type: "Fire Emergency", date: "2024-01-17", status: "Completed" },
        { id: "RPT-007", type: "False Alarm", date: "2024-01-18", status: "Dismissed" }
      ]
    },
    { 
      id: "CTZ-004", 
      name: "Anna Lopez", 
      email: "anna.lopez@email.com",
      phone: "+63 945 678 9012",
      address: "321 Pine Street, Pasig City",
      totalReports: 2,
      status: "Active",
      reportHistory: [
        { id: "RPT-004", type: "Medical Emergency", date: "2024-01-19", status: "Completed" }
      ]
    },
    { 
      id: "CTZ-005", 
      name: "Carlos Garcia", 
      email: "carlos.garcia@email.com",
      phone: "+63 956 789 0123",
      address: "654 Maple Street, Taguig City",
      totalReports: 6,
      status: "Active",
      reportHistory: [
        { id: "RPT-006", type: "Natural Disaster", date: "2024-01-21", status: "Completed" }
      ]
    },
    { 
      id: "CTZ-006", 
      name: "Sofia Martinez", 
      email: "sofia.martinez@email.com",
      phone: "+63 967 890 1234",
      address: "987 Cedar Street, Mandaluyong City",
      totalReports: 1,
      status: "Active",
      reportHistory: [
        { id: "RPT-008", type: "Crime Incident", date: "2024-01-22", status: "Ongoing" }
      ]
    }
  ];

  const tabs = ["All", "Active", "Banned"];

  // Filter citizens based on active tab
  const filteredCitizens = citizensData
    .filter((citizen) => (activeTab === "All" ? true : citizen.status === activeTab))
    .filter((citizen) =>
      citizen.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      citizen.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      citizen.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

  // Sort citizens
  const sortedCitizens = [...filteredCitizens].sort((a, b) => {
    if (sortBy === "A-Z") return a.name.localeCompare(b.name);
    if (sortBy === "Z-A") return b.name.localeCompare(a.name);
    if (sortBy === "Most Reports") return b.totalReports - a.totalReports;
    if (sortBy === "Least Reports") return a.totalReports - b.totalReports;
    return 0; // Default (Newest)
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Banned":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleViewDetails = (citizen) => {
    setSelectedCitizen(citizen);
    setShowCitizenDetails(true);
  };

  const handleBanToggle = (citizen) => {
    if (window.confirm(`Are you sure you want to ${citizen.status === "Active" ? "ban" : "unban"} ${citizen.name}?`)) {
      // In a real app, you would make an API call here
      console.log(`${citizen.status === "Active" ? "Banned" : "Unbanned"} citizen:`, citizen.id);
      alert(`Citizen ${citizen.name} has been ${citizen.status === "Active" ? "banned" : "unbanned"}`);
    }
  };

  const handleDelete = (citizen) => {
    if (window.confirm(`Are you sure you want to permanently delete ${citizen.name}'s account? This action cannot be undone.`)) {
      // In a real app, you would make an API call here
      console.log("Deleted citizen:", citizen.id);
      alert(`Citizen ${citizen.name} has been deleted`);
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
                  Manage and monitor all registered citizens
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
                    placeholder="Search citizens..."
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
                    <option value="A-Z">Name A-Z</option>
                    <option value="Z-A">Name Z-A</option>
                    <option value="Most Reports">Most Reports</option>
                    <option value="Least Reports">Least Reports</option>
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

              {/* Citizens Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left py-4 px-4 font-semibold text-gray-700">Citizen ID</th>
                      <th className="text-left py-4 px-4 font-semibold text-gray-700">Name</th>
                      <th className="text-left py-4 px-4 font-semibold text-gray-700">Total Reports</th>
                      <th className="text-left py-4 px-4 font-semibold text-gray-700">Status</th>
                      <th className="text-left py-4 px-4 font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedCitizens.map((citizen, index) => (
                      <tr
                        key={citizen.id}
                        className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                          index % 2 === 0 ? "bg-white" : "bg-gray-50"
                        }`}
                      >
                        <td className="py-4 px-4 font-medium text-gray-900">{citizen.id}</td>
                        <td className="py-4 px-4 text-gray-700">{citizen.name}</td>
                        <td className="py-4 px-4 text-gray-700">{citizen.totalReports}</td>
                        <td className="py-4 px-4">
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                              citizen.status
                            )}`}
                          >
                            {citizen.status}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex space-x-3">
                            <button 
                              onClick={() => handleViewDetails(citizen)}
                              className="text-[#D30019] hover:text-[#920114] transition-colors font-medium text-sm"
                            >
                              View Details
                            </button>
                            <button 
                              onClick={() => handleBanToggle(citizen)}
                              className={`${
                                citizen.status === "Active" 
                                  ? "text-[#D64219] hover:text-[#920114]" 
                                  : "text-green-600 hover:text-green-800"
                              } transition-colors font-medium text-sm`}
                            >
                              {citizen.status === "Active" ? "Ban" : "Unban"}
                            </button>
                            <button 
                              onClick={() => handleDelete(citizen)}
                              className="text-[#3F0008] hover:text-[#920114] transition-colors font-medium text-sm"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Empty State */}
              {sortedCitizens.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-gray-400 text-6xl mb-4">👥</div>
                  <h3 className="text-lg font-medium text-gray-600 mb-2">
                    No citizens found
                  </h3>
                  <p className="text-gray-500">
                    {searchTerm ? "No citizens match your search criteria." : `There are no citizens in the ${activeTab.toLowerCase()} status.`}
                  </p>
                </div>
              )}

              {/* Table Footer */}
              <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
                <div className="text-sm text-gray-600">
                  Showing {sortedCitizens.length} of {citizensData.length} citizens
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

      {/* Citizen Details Modal */}
      {showCitizenDetails && selectedCitizen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-800">
                Citizen Details - {selectedCitizen.name}
              </h3>
              <button
                onClick={() => setShowCitizenDetails(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ✕
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Personal Information */}
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">
                  Personal Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <span className="text-gray-800">{selectedCitizen.name}</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Citizen ID</label>
                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <span className="text-gray-800">{selectedCitizen.id}</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <span className="text-gray-800">{selectedCitizen.email}</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <span className="text-gray-800">{selectedCitizen.phone}</span>
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <span className="text-gray-800">{selectedCitizen.address}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Report Statistics */}
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">
                  Report Statistics
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gradient-to-r from-red-50 to-orange-50 p-4 rounded-lg border border-red-100">
                    <div className="text-2xl font-bold text-[#D30019]">{selectedCitizen.totalReports}</div>
                    <div className="text-sm text-gray-600">Total Reports</div>
                  </div>
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-100">
                    <div className="text-2xl font-bold text-green-600">
                      {selectedCitizen.reportHistory.filter(r => r.status === "Completed").length}
                    </div>
                    <div className="text-sm text-gray-600">Completed</div>
                  </div>
                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-lg border border-blue-100">
                    <div className="text-2xl font-bold text-blue-600">
                      {selectedCitizen.reportHistory.filter(r => r.status === "Ongoing").length}
                    </div>
                    <div className="text-sm text-gray-600">Ongoing</div>
                  </div>
                  <div className="bg-gradient-to-r from-yellow-50 to-amber-50 p-4 rounded-lg border border-yellow-100">
                    <div className="text-2xl font-bold text-yellow-600">
                      {selectedCitizen.reportHistory.filter(r => r.status === "Dismissed").length}
                    </div>
                    <div className="text-sm text-gray-600">Dismissed</div>
                  </div>
                </div>
              </div>

              {/* Report History */}
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">
                  Report History
                </h4>
                {selectedCitizen.reportHistory.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">No report history available.</p>
                ) : (
                  <div className="space-y-3">
                    {selectedCitizen.reportHistory.map((report) => (
                      <div key={report.id} className="flex justify-between items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                        <div>
                          <p className="font-medium text-gray-800">{report.type}</p>
                          <p className="text-sm text-gray-600">Report ID: {report.id} • {new Date(report.date).toLocaleDateString()}</p>
                        </div>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          report.status === "Completed" ? "bg-green-100 text-green-800" :
                          report.status === "Ongoing" ? "bg-blue-100 text-blue-800" :
                          "bg-yellow-100 text-yellow-800"
                        }`}>
                          {report.status}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setShowCitizenDetails(false)}
                  className="px-6 py-3 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 border-2 border-transparent hover:border-[#920114] font-medium transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => handleBanToggle(selectedCitizen)}
                  className={`px-6 py-3 rounded-lg border-2 border-transparent hover:border-[#920114] font-medium transition-colors ${
                    selectedCitizen.status === "Active" 
                      ? "bg-[#D64219] text-white hover:bg-[#920114]" 
                      : "bg-green-600 text-white hover:bg-green-700"
                  }`}
                >
                  {selectedCitizen.status === "Active" ? "Ban Account" : "Unban Account"}
                </button>
                <button
                  onClick={() => handleDelete(selectedCitizen)}
                  className="px-6 py-3 bg-[#3F0008] text-white rounded-lg hover:bg-[#920114] border-2 border-transparent hover:border-[#920114] font-medium transition-colors"
                >
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}