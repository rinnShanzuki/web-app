import { useState } from "react";
import SideBar from "../components/layout/SideBar";
import TopBar from "../components/layout/TopBar";

export default function ResponderManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [showResponderForm, setShowResponderForm] = useState(false);
  const [editingResponder, setEditingResponder] = useState(null);
  const [showResponderDetails, setShowResponderDetails] = useState(false);
  const [selectedResponder, setSelectedResponder] = useState(null);

  // Sample responders data
  const respondersData = [
    {
      id: "RES-001",
      name: "Fire Team Alpha",
      agency: "BFP",
      contact: "+63 912 345 6789",
      email: "alpha@bfp.gov.ph",
      profilePicture: "👨‍🚒",
      status: "Available",
      ongoingAssignments: 2,
      assignedReports: 15,
      specialization: "Fire Suppression",
      experience: "5 years"
    },
    {
      id: "RES-002",
      name: "Medical Team Bravo",
      agency: "911",
      contact: "+63 917 654 3210",
      email: "bravo@911.gov.ph",
      profilePicture: "👨‍⚕️",
      status: "On Duty",
      ongoingAssignments: 1,
      assignedReports: 12,
      specialization: "Emergency Medicine",
      experience: "7 years"
    },
    {
      id: "RES-003",
      name: "Police Unit Charlie",
      agency: "PNP",
      contact: "+63 918 765 4321",
      email: "charlie@pnp.gov.ph",
      profilePicture: "👮‍♂️",
      status: "Available",
      ongoingAssignments: 0,
      assignedReports: 8,
      specialization: "Public Safety",
      experience: "4 years"
    },
    {
      id: "RES-004",
      name: "Rescue Team Delta",
      agency: "MDRRMO",
      contact: "+63 919 876 5432",
      email: "delta@mdrmmo.gov.ph",
      profilePicture: "🚑",
      status: "On Break",
      ongoingAssignments: 0,
      assignedReports: 6,
      specialization: "Search & Rescue",
      experience: "6 years"
    },
    {
      id: "RES-005",
      name: "Emergency Response Echo",
      agency: "911",
      contact: "+63 920 123 4567",
      email: "echo@911.gov.ph",
      profilePicture: "🚨",
      status: "Unavailable",
      ongoingAssignments: 0,
      assignedReports: 3,
      specialization: "Multi-Agency Response",
      experience: "3 years"
    }
  ];

  const [responders, setResponders] = useState(respondersData);
  const [formData, setFormData] = useState({
    name: "",
    agency: "BFP",
    contact: "",
    email: "",
    status: "Available",
    specialization: "",
    experience: ""
  });

  // Filter and sort responders
  const filteredResponders = responders
    .filter(responder =>
      responder.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      responder.agency.toLowerCase().includes(searchTerm.toLowerCase()) ||
      responder.contact.includes(searchTerm)
    )
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "agency") return a.agency.localeCompare(b.agency);
      if (sortBy === "assignments") return b.ongoingAssignments - a.ongoingAssignments;
      if (sortBy === "status") return a.status.localeCompare(b.status);
      return 0;
    });

  const handleAddResponder = () => {
    setEditingResponder(null);
    setFormData({
      name: "",
      agency: "BFP",
      contact: "",
      email: "",
      status: "Available",
      specialization: "",
      experience: ""
    });
    setShowResponderForm(true);
  };

  const handleEditResponder = (responder) => {
    setEditingResponder(responder);
    setFormData({
      name: responder.name,
      agency: responder.agency,
      contact: responder.contact,
      email: responder.email,
      status: responder.status,
      specialization: responder.specialization,
      experience: responder.experience
    });
    setShowResponderForm(true);
  };

  const handleViewDetails = (responder) => {
    setSelectedResponder(responder);
    setShowResponderDetails(true);
  };

  const handleRemoveResponder = (responderId) => {
    if (window.confirm("Are you sure you want to remove this responder? This action cannot be undone.")) {
      setResponders(responders.filter(responder => responder.id !== responderId));
    }
  };

  const handleSaveResponder = () => {
    if (editingResponder) {
      // Update existing responder
      setResponders(responders.map(responder =>
        responder.id === editingResponder.id
          ? { ...editingResponder, ...formData }
          : responder
      ));
    } else {
      // Add new responder
      const newResponder = {
        id: `RES-${String(responders.length + 1).padStart(3, '0')}`,
        profilePicture: "👤",
        ongoingAssignments: 0,
        assignedReports: 0,
        ...formData
      };
      setResponders([...responders, newResponder]);
    }
    setShowResponderForm(false);
    setEditingResponder(null);
  };

  const handleFormChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleStatusUpdate = (newStatus) => {
    if (selectedResponder) {
      setResponders(responders.map(responder =>
        responder.id === selectedResponder.id
          ? { ...responder, status: newStatus }
          : responder
      ));
      setSelectedResponder({ ...selectedResponder, status: newStatus });
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Available":
        return "bg-green-100 text-green-800";
      case "On Duty":
        return "bg-blue-100 text-blue-800";
      case "On Break":
        return "bg-yellow-100 text-yellow-800";
      case "Unavailable":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getAgencyColor = (agency) => {
    switch (agency) {
      case "BFP":
        return "bg-[#D64219] bg-opacity-20 text-[#D64219]";
      case "PNP":
        return "bg-[#D30019] bg-opacity-20 text-[#D30019]";
      case "MDRRMO":
        return "bg-[#920114] bg-opacity-20 text-[#920114]";
      case "911":
        return "bg-[#3F0008] bg-opacity-20 text-[#3F0008]";
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
                <p className="text-gray-600">Manage emergency responders and their assignments</p>
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
                    placeholder="Search responders..."
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
                    <option value="name">Sort by: Name</option>
                    <option value="agency">Agency</option>
                    <option value="assignments">Ongoing Assignments</option>
                    <option value="status">Status</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <svg className="h-5 w-5 text-[#D30019]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {/* Add Responder Button */}
                <button
                  onClick={handleAddResponder}
                  className="px-6 py-2 bg-[#D30019] text-white rounded-lg hover:bg-[#920114] transition-colors font-medium"
                >
                  Add Responder
                </button>
              </div>
            </div>

            {/* Responders Table */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left py-4 px-4 font-semibold text-gray-700">Responder ID</th>
                      <th className="text-left py-4 px-4 font-semibold text-gray-700">Name</th>
                      <th className="text-left py-4 px-4 font-semibold text-gray-700">Agency</th>
                      <th className="text-left py-4 px-4 font-semibold text-gray-700">Status</th>
                      <th className="text-left py-4 px-4 font-semibold text-gray-700">Ongoing Assignments</th>
                      <th className="text-left py-4 px-4 font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredResponders.map((responder, index) => (
                      <tr
                        key={responder.id}
                        className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                          index % 2 === 0 ? "bg-white" : "bg-gray-50"
                        }`}
                      >
                        <td className="py-4 px-4 font-medium text-gray-900">{responder.id}</td>
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-3">
                            <span className="text-2xl">{responder.profilePicture}</span>
                            <span className="text-gray-800 font-medium">{responder.name}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getAgencyColor(responder.agency)}`}>
                            {responder.agency}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(responder.status)}`}>
                            {responder.status}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                            {responder.ongoingAssignments} assignments
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleViewDetails(responder)}
                              className="text-[#D30019] hover:text-[#920114] transition-colors font-medium text-sm"
                            >
                              View
                            </button>
                            <button
                              onClick={() => handleEditResponder(responder)}
                              className="text-gray-600 hover:text-gray-800 transition-colors font-medium text-sm"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleRemoveResponder(responder.id)}
                              className="text-red-600 hover:text-red-800 transition-colors font-medium text-sm"
                            >
                              Remove
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Empty State */}
              {filteredResponders.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-gray-400 text-6xl mb-4">👨‍🚒</div>
                  <h3 className="text-lg font-medium text-gray-600 mb-2">
                    No responders found
                  </h3>
                  <p className="text-gray-500">
                    {searchTerm 
                      ? `No responders match your search for "${searchTerm}"`
                      : "No responders available. Add your first responder to get started."
                    }
                  </p>
                </div>
              )}

              {/* Table Footer */}
              <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
                <div className="text-sm text-gray-600">
                  Showing {filteredResponders.length} of {responders.length} responders
                  {searchTerm && ` for "${searchTerm}"`}
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

      {/* Add/Edit Responder Form Modal */}
        {showResponderForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-800">
                    {editingResponder ? "Edit Responder" : "Add New Responder"}
                </h3>
                <button
                    onClick={() => setShowResponderForm(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                </div>
            </div>

            <div className="p-6">
                <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                    </label>
                    <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleFormChange("name", e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D30019] focus:border-transparent transition-colors bg-white text-gray-800"
                    placeholder="Enter responder's full name"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Agency
                    </label>
                    <select
                        value={formData.agency}
                        onChange={(e) => handleFormChange("agency", e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D30019] focus:border-transparent transition-colors bg-white text-gray-800"
                    >
                        <option value="BFP">BFP</option>
                        <option value="PNP">PNP</option>
                        <option value="MDRRMO">MDRRMO</option>
                        <option value="911">911</option>
                    </select>
                    </div>

                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Status
                    </label>
                    <select
                        value={formData.status}
                        onChange={(e) => handleFormChange("status", e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D30019] focus:border-transparent transition-colors bg-white text-gray-800"
                    >
                        <option value="Available">Available</option>
                        <option value="On Duty">On Duty</option>
                        <option value="On Break">On Break</option>
                        <option value="Unavailable">Unavailable</option>
                    </select>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Contact Number
                    </label>
                    <input
                        type="text"
                        value={formData.contact}
                        onChange={(e) => handleFormChange("contact", e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D30019] focus:border-transparent transition-colors bg-white text-gray-800"
                        placeholder="Enter contact number"
                    />
                    </div>

                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                    </label>
                    <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleFormChange("email", e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D30019] focus:border-transparent transition-colors bg-white text-gray-800"
                        placeholder="Enter email address"
                    />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Specialization
                    </label>
                    <input
                        type="text"
                        value={formData.specialization}
                        onChange={(e) => handleFormChange("specialization", e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D30019] focus:border-transparent transition-colors bg-white text-gray-800"
                        placeholder="e.g., Fire Suppression"
                    />
                    </div>

                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Experience
                    </label>
                    <input
                        type="text"
                        value={formData.experience}
                        onChange={(e) => handleFormChange("experience", e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D30019] focus:border-transparent transition-colors bg-white text-gray-800"
                        placeholder="e.g., 5 years"
                    />
                    </div>
                </div>
                </div>

                <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-200">
                <button
                    onClick={() => setShowResponderForm(false)}
                    className="px-6 py-3 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                >
                    Cancel
                </button>
                <button
                    onClick={handleSaveResponder}
                    className="px-6 py-3 bg-[#D30019] text-white rounded-lg hover:bg-[#920114] transition-colors font-medium"
                >
                    {editingResponder ? "Update Responder" : "Save Responder"}
                </button>
                </div>
            </div>
            </div>
        </div>
        )}

      {/* Responder Details Modal */}
      {showResponderDetails && selectedResponder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-800">Responder Details</h3>
                <button
                  onClick={() => setShowResponderDetails(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="space-y-6">
                {/* Profile Section */}
                <div className="flex items-center space-x-4">
                  <div className="text-6xl">{selectedResponder.profilePicture}</div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-800">{selectedResponder.name}</h4>
                    <p className="text-gray-600">{selectedResponder.id}</p>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mt-2 ${getStatusColor(selectedResponder.status)}`}>
                      {selectedResponder.status}
                    </span>
                  </div>
                </div>

                {/* Contact Information */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-3">Contact Information</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <span className="text-gray-800">{selectedResponder.contact}</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <span className="text-gray-800">{selectedResponder.email}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Agency & Specialization */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-3">Professional Details</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Agency</label>
                      <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getAgencyColor(selectedResponder.agency)}`}>
                          {selectedResponder.agency}
                        </span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Specialization</label>
                      <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <span className="text-gray-800">{selectedResponder.specialization}</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
                      <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <span className="text-gray-800">{selectedResponder.experience}</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Assigned Reports</label>
                      <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <span className="text-gray-800 font-medium">{selectedResponder.assignedReports} reports</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Current Assignments */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-3">Current Assignments</h4>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <span className="text-gray-800 font-medium">{selectedResponder.ongoingAssignments} ongoing assignments</span>
                  </div>
                </div>

                {/* Status Update Section */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-3">Update Status</h4>
                  <div className="flex space-x-2">
                    {["Available", "On Duty", "On Break", "Unavailable"].map((status) => (
                      <button
                        key={status}
                        onClick={() => handleStatusUpdate(status)}
                        disabled={selectedResponder.status === status}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                          selectedResponder.status === status
                            ? "bg-[#D30019] text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setShowResponderDetails(false)}
                  className="px-6 py-3 bg-[#D30019] text-white rounded-lg hover:bg-[#920114] transition-colors font-medium"
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}