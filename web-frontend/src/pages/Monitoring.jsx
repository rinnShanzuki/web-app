import { useState } from "react";
import SideBar from "../components/layout/SideBar";
import TopBar from "../components/layout/TopBar";

export default function Monitoring() {
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [showIncidentDetails, setShowIncidentDetails] = useState(false);
  const [showRespondersModal, setShowRespondersModal] = useState(false);
  const [showDispatchModal, setShowDispatchModal] = useState(false);
  const [filters, setFilters] = useState({
    type: "All",
    date: "",
    agency: "All"
  });

  // Sample incidents data with coordinates for the map
  const incidentsData = [
    {
      id: "INC-001",
      type: "Fire Emergency",
      severity: "High",
      location: "123 Main Street, Quezon City",
      coordinates: { lat: 14.6762, lng: 121.0439 },
      agency: "BFP",
      status: "Ongoing",
      timeReported: "2024-01-15T14:30:00",
      description: "Residential fire at 123 Main Street. Multiple families affected.",
      citizen: "Juan Dela Cruz",
      assignedResponders: [
        { id: 1, name: "Fire Team Alpha", agency: "BFP", status: "En Route" },
        { id: 2, name: "Medical Team Bravo", agency: "911", status: "Standby" }
      ]
    },
    {
      id: "INC-002",
      type: "Medical Emergency",
      severity: "Medium",
      location: "456 Elm Street, Makati City",
      coordinates: { lat: 14.5547, lng: 121.0244 },
      agency: "911",
      status: "Pending",
      timeReported: "2024-01-15T15:15:00",
      description: "Heart attack emergency at commercial building.",
      citizen: "Maria Santos",
      assignedResponders: []
    },
    {
      id: "INC-003",
      type: "Crime Incident",
      severity: "High",
      location: "789 Oak Street, Manila",
      coordinates: { lat: 14.5995, lng: 120.9842 },
      agency: "PNP",
      status: "Ongoing",
      timeReported: "2024-01-15T16:45:00",
      description: "Robbery in progress at convenience store.",
      citizen: "Pedro Reyes",
      assignedResponders: [
        { id: 3, name: "Police Unit Charlie", agency: "PNP", status: "On Scene" }
      ]
    },
    {
      id: "INC-004",
      type: "Natural Disaster",
      severity: "Critical",
      location: "321 Pine Street, Pasig City",
      coordinates: { lat: 14.5764, lng: 121.0851 },
      agency: "MDRRMO",
      status: "Pending",
      timeReported: "2024-01-15T17:20:00",
      description: "Flash flood affecting low-lying areas.",
      citizen: "Anna Lopez",
      assignedResponders: []
    },
    {
      id: "INC-005",
      type: "Traffic Accident",
      severity: "Medium",
      location: "654 Maple Street, Taguig City",
      coordinates: { lat: 14.5176, lng: 121.0509 },
      agency: "PNP",
      status: "Ongoing",
      timeReported: "2024-01-15T18:10:00",
      description: "Multi-vehicle collision on main highway.",
      citizen: "Carlos Garcia",
      assignedResponders: [
        { id: 4, name: "Rescue Team Delta", agency: "MDRRMO", status: "En Route" }
      ]
    }
  ];

  // Available responders for dispatch
  const availableResponders = [
    { id: 1, name: "Fire Team Alpha", agency: "BFP", status: "Available", type: "Fire" },
    { id: 2, name: "Medical Team Bravo", agency: "911", status: "Available", type: "Medical" },
    { id: 3, name: "Police Unit Charlie", agency: "PNP", status: "Available", type: "Police" },
    { id: 4, name: "Rescue Team Delta", agency: "MDRRMO", status: "On Duty", type: "Rescue" },
    { id: 5, name: "Ambulance Team Echo", agency: "911", status: "Available", type: "Medical" },
    { id: 6, name: "Fire Team Foxtrot", agency: "BFP", status: "Available", type: "Fire" }
  ];

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const filteredIncidents = incidentsData.filter(incident => {
    if (filters.type !== "All" && incident.type !== filters.type) return false;
    if (filters.agency !== "All" && incident.agency !== filters.agency) return false;
    if (filters.date && !incident.timeReported.includes(filters.date)) return false;
    return true;
  });

  const handlePinClick = (incident) => {
    setSelectedIncident(incident);
    setShowIncidentDetails(true);
  };

  const handleStatusUpdate = (newStatus) => {
    if (selectedIncident) {
      // In real app, update via API
      console.log(`Updating incident ${selectedIncident.id} to ${newStatus}`);
      setSelectedIncident(prev => ({ ...prev, status: newStatus }));
      alert(`Incident status updated to ${newStatus}`);
    }
  };

  const handleDispatchUnits = () => {
    setShowDispatchModal(true);
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "Critical": return "#D30019";
      case "High": return "#D64219";
      case "Medium": return "#920114";
      case "Low": return "#3F0008";
      default: return "#6B7280";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending": return "bg-yellow-100 text-yellow-800";
      case "Ongoing": return "bg-blue-100 text-blue-800";
      case "Completed": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getResponderStatusColor = (status) => {
    switch (status) {
      case "Available": return "bg-green-100 text-green-800";
      case "En Route": return "bg-blue-100 text-blue-800";
      case "On Scene": return "bg-purple-100 text-purple-800";
      case "On Duty": return "bg-yellow-100 text-yellow-800";
      case "Standby": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  // Simple map component using div with pins
  const MapWithPins = () => (
    <div className="relative w-full h-full bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl overflow-hidden border-2 border-gray-200">
      {/* Map background with grid */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100 opacity-30"></div>
      
      {/* Grid lines */}
      <div className="absolute inset-0 opacity-20">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="absolute w-full h-px bg-gray-400" style={{ top: `${i * 10}%` }}></div>
        ))}
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="absolute h-full w-px bg-gray-400" style={{ left: `${i * 10}%` }}></div>
        ))}
      </div>

      {/* Incident Pins */}
      {filteredIncidents.map((incident, index) => {
        // Calculate positions for demo (in real app, use actual coordinates)
        const left = 20 + (index * 15) % 70;
        const top = 20 + (index * 25) % 60;
        
        return (
          <button
            key={incident.id}
            onClick={() => handlePinClick(incident)}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 hover:scale-110 ${
              selectedIncident?.id === incident.id ? 'z-10 scale-110' : 'z-0'
            }`}
            style={{ left: `${left}%`, top: `${top}%` }}
          >
            <div className="relative">
              <div
                className="w-8 h-8 rounded-full border-4 border-white shadow-lg flex items-center justify-center text-white font-bold text-sm"
                style={{ backgroundColor: getSeverityColor(incident.severity) }}
              >
                {incident.type.charAt(0)}
              </div>
              {selectedIncident?.id === incident.id && (
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                  {incident.type}
                </div>
              )}
            </div>
          </button>
        );
      })}

      {/* Map Legend */}
      <div className="absolute bottom-4 left-4 bg-white bg-opacity-90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
        <h4 className="font-semibold text-gray-800 mb-2">Incident Severity</h4>
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-[#D30019]"></div>
            <span className="text-xs text-gray-600">Critical</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-[#D64219]"></div>
            <span className="text-xs text-gray-600">High</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-[#920114]"></div>
            <span className="text-xs text-gray-600">Medium</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-[#3F0008]"></div>
            <span className="text-xs text-gray-600">Low</span>
          </div>
        </div>
      </div>
    </div>
  );

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

          {/* Filters Section - Matches Screenshot Layout */}
          <div className="p-2 mb-5">
            <h3 className="text-lg font-semibold text-gray-800 mb-6 underline underline-offset-4 decoration-[#D30019]">
              Filters
            </h3>

            {/* Two-column layout: left wider than right */}
            <div className="grid grid-cols-[2fr_1fr] gap-6">
              {/* Left Side - Incident Type & Agency */}
              <div className="space-y-4">
                {/* Incident Types */}
                <select
                  value={filters.type}
                  onChange={(e) => handleFilterChange("type", e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-lg shadow-sm py-3 px-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#D30019] focus:border-transparent"
                >
                  <option value="All">Incident Types</option>
                  <option value="Fire Emergency">Fire Emergency</option>
                  <option value="Medical Emergency">Medical Emergency</option>
                  <option value="Crime Incident">Crime Incident</option>
                  <option value="Natural Disaster">Natural Disaster</option>
                  <option value="Traffic Accident">Traffic Accident</option>
                </select>

                {/* Agency */}
                <select
                  value={filters.agency}
                  onChange={(e) => handleFilterChange("agency", e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-lg shadow-sm py-3 px-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#D30019] focus:border-transparent"
                >
                  <option value="All">Agency</option>
                  <option value="BFP">BFP</option>
                  <option value="PNP">PNP</option>
                  <option value="MDRRMO">MDRRMO</option>
                  <option value="911">911</option>
                </select>
              </div>

              {/* Right Side - Date & Buttons */}
              <div className="flex flex-col justify-between space-y-4">
                {/* Date */}
                <input
                  type="date"
                  value={filters.date}
                  onChange={(e) => handleFilterChange("date", e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-lg shadow-sm py-3 px-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#D30019] focus:border-transparent"
                />

                {/* Apply & Clear Buttons */}
                <div className="flex space-x-3">
                  <button
                    onClick={() => console.log('Filters applied:', filters)}
                    className="flex-1 bg-[#D30019] text-white py-3 rounded-full shadow hover:bg-[#920114] transition-colors font-semibold"
                  >
                    Apply
                  </button>
                  <button
                    onClick={() => setFilters({ type: 'All', date: '', agency: 'All' })}
                    className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-full shadow hover:bg-gray-200 transition-colors font-semibold"
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>
          </div>
          
            {/* Quick Stats Cards */}
            <div className="grid xl:grid-cols-3 md:grid-cols-1 gap-6 mb-8">
              {/* Total Incidents Card */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-[#D30019]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Incidents</p>
                    <p className="text-3xl font-bold text-gray-800">{incidentsData.length}</p>
                  </div>
                  <div className="w-12 h-12 bg-[#D30019] bg-opacity-10 rounded-full flex items-center justify-center">
                    <span className="text-[#D30019] text-xl">📊</span>
                  </div>
                </div>
              </div>

              {/* Active Incidents Card */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-[#D64219]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Incidents</p>
                    <p className="text-3xl font-bold text-gray-800">
                      {incidentsData.filter(i => i.status === "Ongoing").length}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-[#D64219] bg-opacity-10 rounded-full flex items-center justify-center">
                    <span className="text-[#D64219] text-xl">🔥</span>
                  </div>
                </div>
              </div>

              {/* Pending Incidents Card */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-[#920114]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Pending Response</p>
                    <p className="text-3xl font-bold text-gray-800">
                      {incidentsData.filter(i => i.status === "Pending").length}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-[#920114] bg-opacity-10 rounded-full flex items-center justify-center">
                    <span className="text-[#920114] text-xl">⏳</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Map and Incident List */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              {/* Map Section - 2/3 width */}
              <div className="xl:col-span-2">
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Live Incident Map</h3>
                  <div className="h-96 lg:h-[500px]">
                    <MapWithPins />
                  </div>
                </div>
              </div>

              {/* Incident List */}
              <div className="xl:col-span-1">
                <div className="bg-white rounded-2xl shadow-lg p-6 h-full">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Active Incidents</h3>
                  <div className="space-y-4 max-h-[500px] overflow-y-auto">
                    {filteredIncidents.map((incident) => (
                      <div
                        key={incident.id}
                        className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                          selectedIncident?.id === incident.id
                            ? "border-[#D30019] bg-red-50"
                            : "border-gray-200 hover:border-[#920114] hover:bg-gray-50"
                        }`}
                        onClick={() => handlePinClick(incident)}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-semibold text-gray-800">{incident.type}</h4>
                            <p className="text-sm text-gray-600">{incident.id}</p>
                          </div>
                          <span
                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                              incident.status
                            )}`}
                          >
                            {incident.status}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">{incident.agency}</span>
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: getSeverityColor(incident.severity) }}
                          ></div>
                        </div>
                      </div>
                    ))}
                    
                    {filteredIncidents.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        No incidents match the current filters
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Incident Details Modal */}
      {showIncidentDetails && selectedIncident && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-800">
                Incident Details - {selectedIncident.id}
              </h3>
              <button
                onClick={() => setShowIncidentDetails(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ✕
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Incident Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Incident Information</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                      <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <span className="text-gray-800">{selectedIncident.type}</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Severity</label>
                      <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 flex items-center">
                        <div
                          className="w-3 h-3 rounded-full mr-2"
                          style={{ backgroundColor: getSeverityColor(selectedIncident.severity) }}
                        ></div>
                        <span className="text-gray-800">{selectedIncident.severity}</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                      <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <span className="text-gray-800">{selectedIncident.location}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Response Details</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Assigned Agency</label>
                      <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <span className="text-gray-800">{selectedIncident.agency}</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                      <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedIncident.status)}`}>
                          {selectedIncident.status}
                        </span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Reported By</label>
                      <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <span className="text-gray-800">{selectedIncident.citizen}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 min-h-[80px]">
                  <p className="text-gray-800 whitespace-pre-wrap">{selectedIncident.description}</p>
                </div>
              </div>

              {/* Assigned Responders */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-lg font-semibold text-gray-800">Assigned Responders</h4>
                  <button
                    onClick={() => setShowRespondersModal(true)}
                    className="text-[#D30019] hover:text-[#920114] font-medium text-sm"
                  >
                    View All
                  </button>
                </div>
                {selectedIncident.assignedResponders.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">No responders assigned yet.</p>
                ) : (
                  <div className="space-y-2">
                    {selectedIncident.assignedResponders.slice(0, 3).map((responder) => (
                      <div key={responder.id} className="flex justify-between items-center p-3 border border-gray-200 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-800">{responder.name}</p>
                          <p className="text-sm text-gray-600">{responder.agency}</p>
                        </div>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getResponderStatusColor(responder.status)}`}>
                          {responder.status}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setShowRespondersModal(true)}
                  className="px-6 py-3 bg-[#D30019] text-white rounded-lg hover:bg-[#920114] transition-colors font-medium"
                >
                  View Assigned Responders
                </button>
                <button
                  onClick={handleDispatchUnits}
                  className="px-6 py-3 bg-[#D64219] text-white rounded-lg hover:bg-[#920114] transition-colors font-medium"
                >
                  Dispatch Units
                </button>
                <select
                  onChange={(e) => handleStatusUpdate(e.target.value)}
                  value={selectedIncident.status}
                  className="px-6 py-3 bg-white border border-[#920114] text-[#920114] rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  <option value="Pending">Update Status</option>
                  <option value="Ongoing">Mark as Ongoing</option>
                  <option value="Completed">Mark as Completed</option>
                </select>
                <button
                  onClick={() => setShowIncidentDetails(false)}
                  className="px-6 py-3 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Assigned Responders Modal */}
      {showRespondersModal && selectedIncident && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-800">
                Assigned Responders - {selectedIncident.id}
              </h3>
              <button
                onClick={() => setShowRespondersModal(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ✕
              </button>
            </div>
            <div className="p-6 space-y-4">
              {selectedIncident.assignedResponders.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No responders assigned to this incident.</p>
              ) : (
                selectedIncident.assignedResponders.map((responder) => (
                  <div key={responder.id} className="flex justify-between items-center border border-gray-200 p-4 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-800">{responder.name}</p>
                      <p className="text-sm text-gray-600">{responder.agency}</p>
                    </div>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getResponderStatusColor(responder.status)}`}>
                      {responder.status}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Dispatch Units Modal */}
      {showDispatchModal && selectedIncident && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-800">
                Dispatch Units - {selectedIncident.id}
              </h3>
              <button
                onClick={() => setShowDispatchModal(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ✕
              </button>
            </div>
            <div className="p-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Available Responders</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {availableResponders.map((responder) => (
                  <div key={responder.id} className="flex justify-between items-center border border-gray-200 p-4 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-800">{responder.name}</p>
                      <p className="text-sm text-gray-600">{responder.agency} • {responder.type}</p>
                    </div>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getResponderStatusColor(responder.status)}`}>
                      {responder.status}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setShowDispatchModal(false)}
                  className="px-6 py-3 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    alert('Units dispatched successfully!');
                    setShowDispatchModal(false);
                  }}
                  className="px-6 py-3 bg-[#D30019] text-white rounded-lg hover:bg-[#920114] transition-colors font-medium"
                >
                  Confirm Dispatch
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}