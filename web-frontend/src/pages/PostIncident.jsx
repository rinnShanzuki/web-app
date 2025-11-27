import { useState } from "react";
import SideBar from "../components/layout/SideBar";
import TopBar from "../components/layout/TopBar";

export default function PostIncident() {
  const [selectedReport, setSelectedReport] = useState(null);
  const [showReportDetails, setShowReportDetails] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("Newest");
  const [activeFilter, setActiveFilter] = useState("All");

  // Sample post-incident data
  const postIncidentData = [
    {
      id: "PIR-001",
      incidentId: "INC-001",
      type: "Fire Emergency",
      date: "2024-01-15",
      duration: "45 mins",
      responders: ["Fire Team Alpha", "Medical Team Bravo"],
      status: "Completed",
      location: "123 Main Street, Quezon City",
      description: "Residential fire successfully contained. All residents evacuated safely.",
      casualties: "0 fatalities, 2 minor injuries",
      damageAssessment: "Moderate structural damage",
      responseTime: "8 minutes",
      resourcesUsed: ["2 Fire Trucks", "1 Ambulance", "15 Responders"],
      lessonsLearned: "Improved evacuation procedures needed for high-rise buildings"
    },
    {
      id: "PIR-002",
      incidentId: "INC-002",
      type: "Medical Emergency",
      date: "2024-01-16",
      duration: "25 mins",
      responders: ["Medical Team Bravo", "Ambulance Team Echo"],
      status: "Completed",
      location: "456 Elm Street, Makati City",
      description: "Successful cardiac arrest response. Patient stabilized and transported to hospital.",
      casualties: "0 fatalities, 0 injuries",
      damageAssessment: "None",
      responseTime: "6 minutes",
      resourcesUsed: ["1 Ambulance", "4 Medical Staff"],
      lessonsLearned: "Quick AED deployment crucial for cardiac cases"
    },
    {
      id: "PIR-003",
      incidentId: "INC-003",
      type: "Crime Incident",
      date: "2024-01-17",
      duration: "2 hours",
      responders: ["Police Unit Charlie", "SWAT Team"],
      status: "Completed",
      location: "789 Oak Street, Manila",
      description: "Robbery suspect apprehended. All stolen items recovered.",
      casualties: "0 fatalities, 1 suspect injured",
      damageAssessment: "Minor property damage",
      responseTime: "12 minutes",
      resourcesUsed: ["4 Police Vehicles", "8 Officers", "SWAT Team"],
      lessonsLearned: "Better coordination between patrol units and SWAT"
    },
    {
      id: "PIR-004",
      incidentId: "INC-004",
      type: "Natural Disaster",
      date: "2024-01-18",
      duration: "6 hours",
      responders: ["Rescue Team Delta", "Medical Team Bravo", "Volunteers"],
      status: "Completed",
      location: "321 Pine Street, Pasig City",
      description: "Flash flood response. 50 families evacuated to safety.",
      casualties: "0 fatalities, 3 minor injuries",
      damageAssessment: "Significant property damage in low-lying areas",
      responseTime: "15 minutes",
      resourcesUsed: ["2 Rescue Boats", "3 Ambulances", "25 Responders"],
      lessonsLearned: "Need better early warning systems for flood-prone areas"
    },
    {
      id: "PIR-005",
      incidentId: "INC-005",
      type: "Traffic Accident",
      date: "2024-01-19",
      duration: "1.5 hours",
      responders: ["Rescue Team Delta", "Medical Team Bravo", "Traffic Police"],
      status: "Completed",
      location: "654 Maple Street, Taguig City",
      description: "Multi-vehicle collision cleared. All injured transported to hospitals.",
      casualties: "0 fatalities, 5 injuries",
      damageAssessment: "3 vehicles totaled",
      responseTime: "7 minutes",
      resourcesUsed: ["2 Ambulances", "1 Rescue Vehicle", "4 Police Units"],
      lessonsLearned: "Improved traffic management during emergency response"
    },
    {
      id: "PIR-006",
      incidentId: "INC-006",
      type: "Fire Emergency",
      date: "2024-01-20",
      duration: "1 hour",
      responders: ["Fire Team Foxtrot", "Medical Support"],
      status: "Completed",
      location: "987 Cedar Street, Mandaluyong",
      description: "Commercial building fire extinguished. Business operations temporarily suspended.",
      casualties: "0 fatalities, 1 smoke inhalation",
      damageAssessment: "Major damage to 2nd floor, minor to other areas",
      responseTime: "5 minutes",
      resourcesUsed: ["3 Fire Trucks", "1 Ambulance", "18 Firefighters"],
      lessonsLearned: "Regular fire safety inspections needed for commercial buildings"
    }
  ];

  const filters = ["All", "Fire Emergency", "Medical Emergency", "Crime Incident", "Natural Disaster", "Traffic Accident"];

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  const filteredReports = postIncidentData
    .filter((report) => (activeFilter === "All" ? true : report.type === activeFilter))
    .filter((report) =>
      report.incidentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const sortedReports = [...filteredReports].sort((a, b) => {
    if (sortBy === "Newest") return new Date(b.date) - new Date(a.date);
    if (sortBy === "Oldest") return new Date(a.date) - new Date(b.date);
    if (sortBy === "A-Z") return a.type.localeCompare(b.type);
    if (sortBy === "Z-A") return b.type.localeCompare(a.type);
    return 0;
  });

  const handleViewReport = (report) => {
    setSelectedReport(report);
    setShowReportDetails(true);
  };

  const handleDownloadReport = (report) => {
    // Simulate PDF download
    console.log(`Downloading report: ${report.id}`);
    alert(`Report ${report.id} downloaded as PDF`);
  };

  const handleDeleteReport = (report) => {
    if (window.confirm(`Are you sure you want to delete report ${report.id}? This action cannot be undone.`)) {
      // In real app, make API call to delete
      console.log(`Deleted report: ${report.id}`);
      alert(`Report ${report.id} has been deleted`);
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "Fire Emergency":
        return "bg-[#D64219] bg-opacity-20 text-[#D64219]";
      case "Medical Emergency":
        return "bg-[#D30019] bg-opacity-20 text-[#D30019]";
      case "Crime Incident":
        return "bg-[#920114] bg-opacity-20 text-[#920114]";
      case "Natural Disaster":
        return "bg-[#3F0008] bg-opacity-20 text-[#3F0008]";
      case "Traffic Accident":
        return "bg-[#D64219] bg-opacity-20 text-[#D64219]";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
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
            <div className="mb-8">
              <p className="text-gray-600">
                Review and manage completed emergency incident reports
              </p>
            </div>
            
            {/* Summary Stats */}
            <div className="grid xl:grid-cols-4 md:grid-cols-1 gap-6 mb-3">
              <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-[#D30019]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Reports</p>
                    <p className="text-3xl font-bold text-gray-800">{postIncidentData.length}</p>
                  </div>
                  <div className="w-12 h-12 bg-[#D30019] bg-opacity-10 rounded-full flex items-center justify-center">
                    <span className="text-[#D30019] text-xl">📊</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-[#D64219]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Fire Incidents</p>
                    <p className="text-3xl font-bold text-gray-800">
                      {postIncidentData.filter(r => r.type === "Fire Emergency").length}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-[#D64219] bg-opacity-10 rounded-full flex items-center justify-center">
                    <span className="text-[#D64219] text-xl">🔥</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-[#920114]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Medical Cases</p>
                    <p className="text-3xl font-bold text-gray-800">
                      {postIncidentData.filter(r => r.type === "Medical Emergency").length}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-[#920114] bg-opacity-10 rounded-full flex items-center justify-center">
                    <span className="text-[#920114] text-xl">🚑</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-[#3F0008]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Other Incidents</p>
                    <p className="text-3xl font-bold text-gray-800">
                      {postIncidentData.filter(r => !["Fire Emergency", "Medical Emergency"].includes(r.type)).length}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-[#3F0008] bg-opacity-10 rounded-full flex items-center justify-center">
                    <span className="text-[#3F0008] text-xl">⚠️</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Filters */}
            <div className="p-6 mb-3">
              {/* Search and Sort Controls */}
              <div className="flex justify-between items-center">
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
                </div>

                {/* Sort By */}
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border-1 border-[#D30019] rounded-lg py-2 pl-3 pr-8 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#D30019] focus:border-transparent appearance-none transition-colors duration-200"
                  >
                    <option value="Newest">Newest First</option>
                    <option value="Oldest">Oldest First</option>
                    <option value="A-Z">Type A-Z</option>
                    <option value="Z-A">Type Z-A</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <svg className="h-5 w-5 text-[#D30019]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Reports Table */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Completed Incident Reports</h3>
              <div className="flex space-x-1 mb-6">
                {filters.map((filter) => (
                  <button
                    key={filter}
                    onClick={() => handleFilterChange(filter)}
                    className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                      activeFilter === filter
                        ? "bg-[#D30019] text-white shadow-md"
                        : "text-gray-600 hover:bg-[#920114] hover:text-white"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left py-4 px-4 font-semibold text-gray-700">Incident ID</th>
                      <th className="text-left py-4 px-4 font-semibold text-gray-700">Type</th>
                      <th className="text-left py-4 px-4 font-semibold text-gray-700">Date</th>
                      <th className="text-left py-4 px-4 font-semibold text-gray-700">Duration</th>
                      <th className="text-left py-4 px-4 font-semibold text-gray-700">Responders</th>
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
                        <td className="py-4 px-4 font-medium text-gray-900">{report.incidentId}</td>
                        <td className="py-4 px-4">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(report.type)}`}>
                            {report.type}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-gray-700">{formatDate(report.date)}</td>
                        <td className="py-4 px-4 text-gray-700">{report.duration}</td>
                        <td className="py-4 px-4">
                          <div className="flex flex-wrap gap-1">
                            {report.responders.slice(0, 2).map((responder, idx) => (
                              <span
                                key={idx}
                                className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                              >
                                {responder}
                              </span>
                            ))}
                            {report.responders.length > 2 && (
                              <span className="inline-flex items-center px-2 py-1 bg-gray-200 text-gray-600 rounded text-xs">
                                +{report.responders.length - 2} more
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex space-x-3">
                            <button 
                              onClick={() => handleViewReport(report)}
                              className="text-[#D30019] hover:text-[#920114] transition-colors font-medium text-sm"
                            >
                              View Full Report
                            </button>
                            <button 
                              onClick={() => handleDownloadReport(report)}
                              className="text-[#D64219] hover:text-[#920114] transition-colors font-medium text-sm"
                            >
                              Download PDF
                            </button>
                            <button 
                              onClick={() => handleDeleteReport(report)}
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
              {sortedReports.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-gray-400 text-6xl mb-4">📋</div>
                  <h3 className="text-lg font-medium text-gray-600 mb-2">
                    No reports found
                  </h3>
                  <p className="text-gray-500">
                    {searchTerm ? "No reports match your search criteria." : `There are no reports in the ${activeFilter.toLowerCase()} category.`}
                  </p>
                </div>
              )}

              {/* Table Footer */}
              <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
                <div className="text-sm text-gray-600">
                  Showing {sortedReports.length} of {postIncidentData.length} reports
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

      {/* Report Details Modal */}
      {showReportDetails && selectedReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto px-10">
            <div className="p-2 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-800">
                Post-Incident Report - {selectedReport.incidentId}
              </h3>
              <button
                onClick={() => setShowReportDetails(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ✕
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Incident Overview Section */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Incident Overview</h4>
                  <div className="grid xl:grid-cols-[2fr_1.5fr] md:grid-cols-1 gap-6">
                    {/* Left side - details */}
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                        <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                          <span className="text-gray-800">{selectedReport.type}</span>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 min-h-[80px]">
                          <p className="text-gray-800 whitespace-pre-wrap">{selectedReport.description}</p>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                        <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                          <span className="text-gray-800">{selectedReport.location}</span>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                        <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                          <span className="text-gray-800">{formatDate(selectedReport.date)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Right side - Map placeholder */}
                    <div className="flex items-center justify-center border border-gray-200 bg-gray-100 rounded-lg min-h-[250px]">
                      <span className="text-gray-500 text-lg">Map</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">
                    Response Detail
                  </h4>

                  <div className="grid xl:grid-cols-[2fr_1.5fr] gap-6">
                    {/* Duration */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                      <div className="p-3 bg-white rounded-md shadow-sm border border-gray-200">
                        <span className="text-gray-800">{selectedReport.duration}</span>
                      </div>
                    </div>

                    {/* Response Time - full width */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Response Time</label>
                      <div className="p-3 bg-white rounded-md shadow-sm border border-gray-200">
                        <span className="text-gray-800">{selectedReport.responseTime}</span>
                      </div>
                    </div>

                    {/* Casualties */}
                    <div className="md:col-span-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Casualties</label>
                      <div className="p-3 bg-white rounded-md shadow-sm border border-gray-200">
                        <span className="text-gray-800">{selectedReport.casualties}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Responders & Resources */}
              <div className="grid xl:grid-cols-2 md:grid-cols-1 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Assigned Responders</h4>
                  <div className="space-y-2">
                    {selectedReport.responders.map((responder, index) => (
                      <div key={index} className="flex items-center p-3 border border-gray-200 rounded-lg">
                        <div className="w-2 h-2 bg-[#D30019] rounded-full mr-3"></div>
                        <span className="text-gray-800">{responder}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Resources Used</h4>
                  <div className="space-y-2">
                    {selectedReport.resourcesUsed.map((resource, index) => (
                      <div key={index} className="flex items-center p-3 border border-gray-200 rounded-lg">
                        <div className="w-2 h-2 bg-[#D64219] rounded-full mr-3"></div>
                        <span className="text-gray-800">{resource}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Assessment & Lessons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Damage Assessment</h4>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-gray-800">{selectedReport.damageAssessment}</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Lessons Learned</h4>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-gray-800">{selectedReport.lessonsLearned}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
                <button
                  onClick={() => handleDownloadReport(selectedReport)}
                  className="px-6 py-3 bg-[#D30019] text-white rounded-lg hover:bg-[#920114] transition-colors font-medium"
                >
                  Download PDF Report
                </button>
                <button
                  onClick={() => setShowReportDetails(false)}
                  className="px-6 py-3 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}