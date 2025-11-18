import { useState } from "react";
import SideBar from "../components/layout/SideBar";
import TopBar from "../components/layout/TopBar";

export default function AgencyManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [showAgencyForm, setShowAgencyForm] = useState(false);
  const [editingAgency, setEditingAgency] = useState(null);
  const [showAgencyDetails, setShowAgencyDetails] = useState(false);
  const [selectedAgency, setSelectedAgency] = useState(null);

  // Sample agencies data
  const agenciesData = [
    {
      id: "AGY-001",
      name: "Bureau of Fire Protection (BFP)",
      contact: "+63 2 8426 0219",
      email: "bfp.ncr@bfp.gov.ph",
      address: "Quezon City, Metro Manila",
      assignedReports: 25,
      status: "Active"
    },
    {
      id: "AGY-002",
      name: "Philippine National Police (PNP)",
      contact: "+63 2 8723 0401",
      email: "pnp.hotline@pnp.gov.ph",
      address: "Camp Crame, Quezon City",
      assignedReports: 18,
      status: "Active"
    },
    {
      id: "AGY-003",
      name: "MDRRMO",
      contact: "+63 2 8876 5432",
      email: "mdrmmo@local.gov.ph",
      address: "Various Locations, Metro Manila",
      assignedReports: 31,
      status: "Active"
    },
    {
      id: "AGY-004",
      name: "911 Emergency",
      contact: "911",
      email: "911emergency@national.gov.ph",
      address: "National Emergency Hotline",
      assignedReports: 12,
      status: "Active"
    },
    {
      id: "AGY-005",
      name: "Coast Guard",
      contact: "+63 2 8527 8481",
      email: "coastguard@pcg.gov.ph",
      address: "Port Area, Manila",
      assignedReports: 8,
      status: "Inactive"
    }
  ];

  const [agencies, setAgencies] = useState(agenciesData);
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    address: "",
    type: "Emergency",
    status: "Active"
  });

  // Filter and sort agencies
  const filteredAgencies = agencies
    .filter(agency =>
      agency.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agency.contact.includes(searchTerm) ||
      agency.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "reports") return b.assignedReports - a.assignedReports;
      if (sortBy === "status") return a.status.localeCompare(b.status);
      return 0;
    });

  const handleAddAgency = () => {
    setEditingAgency(null);
    setFormData({
      name: "",
      contact: "",
      email: "",
      address: "",
      status: "Active"
    });
    setShowAgencyForm(true);
  };

  const handleEditAgency = (agency) => {
    setEditingAgency(agency);
    setFormData({
      name: agency.name,
      contact: agency.contact,
      email: agency.email,
      address: agency.address,
      status: agency.status
    });
    setShowAgencyForm(true);
  };

  const handleViewDetails = (agency) => {
    setSelectedAgency(agency);
    setShowAgencyDetails(true);
  };

  const handleDeleteAgency = (agencyId) => {
    if (window.confirm("Are you sure you want to delete this agency? This action cannot be undone.")) {
      setAgencies(agencies.filter(agency => agency.id !== agencyId));
    }
  };

  const handleSaveAgency = () => {
    if (editingAgency) {
      // Update existing agency
      setAgencies(agencies.map(agency =>
        agency.id === editingAgency.id
          ? { ...editingAgency, ...formData }
          : agency
      ));
    } else {
      // Add new agency
      const newAgency = {
        id: `AGY-${String(agencies.length + 1).padStart(3, '0')}`,
        ...formData,
        assignedReports: 0
      };
      setAgencies([...agencies, newAgency]);
    }
    setShowAgencyForm(false);
    setEditingAgency(null);
  };

  const handleFormChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const getStatusColor = (status) => {
    return status === "Active" 
      ? "bg-green-100 text-green-800" 
      : "bg-red-100 text-red-800";
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
                <p className="text-gray-600">Manage emergency response agencies and their information</p>
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
                    placeholder="Search agencies..."
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
                    <option value="reports">Assigned Reports</option>
                    <option value="status">Status</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <svg className="h-5 w-5 text-[#D30019]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {/* Add Agency Button */}
                <button
                  onClick={handleAddAgency}
                  className="px-6 py-2 bg-[#D30019] text-white rounded-lg hover:bg-[#920114] transition-colors font-medium"
                >
                  Add Agency
                </button>
              </div>
            </div>

            {/* Agencies Table */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left py-4 px-4 font-semibold text-gray-700">Agency ID</th>
                      <th className="text-left py-4 px-4 font-semibold text-gray-700">Agency Name</th>
                      <th className="text-left py-4 px-4 font-semibold text-gray-700">Contact Info</th>
                      <th className="text-left py-4 px-4 font-semibold text-gray-700">Assigned Reports</th>
                      <th className="text-left py-4 px-4 font-semibold text-gray-700">Status</th>
                      <th className="text-left py-4 px-4 font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAgencies.map((agency, index) => (
                      <tr
                        key={agency.id}
                        className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                          index % 2 === 0 ? "bg-white" : "bg-gray-50"
                        }`}
                      >
                        <td className="py-4 px-4 font-medium text-gray-900">{agency.id}</td>
                        <td className="py-4 px-4 text-gray-700">{agency.name}</td>
                        <td className="py-4 px-4 text-gray-700">
                          <div>
                            <div className="font-medium">{agency.contact}</div>
                            <div className="text-sm text-gray-600">{agency.email}</div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                            {agency.assignedReports} reports
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(agency.status)}`}>
                            {agency.status}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleViewDetails(agency)}
                              className="text-[#D30019] hover:text-[#920114] transition-colors font-medium text-sm"
                            >
                              View
                            </button>
                            <button
                              onClick={() => handleEditAgency(agency)}
                              className="text-gray-600 hover:text-gray-800 transition-colors font-medium text-sm"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteAgency(agency.id)}
                              className="text-red-600 hover:text-red-800 transition-colors font-medium text-sm"
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
              {filteredAgencies.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-gray-400 text-6xl mb-4">🏢</div>
                  <h3 className="text-lg font-medium text-gray-600 mb-2">
                    No agencies found
                  </h3>
                  <p className="text-gray-500">
                    {searchTerm 
                      ? `No agencies match your search for "${searchTerm}"`
                      : "No agencies available. Add your first agency to get started."
                    }
                  </p>
                </div>
              )}

              {/* Table Footer */}
              <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
                <div className="text-sm text-gray-600">
                  Showing {filteredAgencies.length} of {agencies.length} agencies
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

      {/* Add/Edit Agency Form Modal */}
{/* Add/Edit Agency Form Modal */}
{showAgencyForm && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
      <div className="px-6 py-2 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold text-gray-800">
            {editingAgency ? "Edit Agency" : "Add Agency"}
          </h3>
          <button
            onClick={() => setShowAgencyForm(false)}
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
          {/* Agency Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Agency Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleFormChange("name", e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D30019] focus:border-transparent transition-colors bg-white"
              placeholder="Enter agency name"
            />
          </div>

          {/* Type and Status - Side by Side */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type
              </label>
              <select
                value={formData.type || "Emergency"}
                onChange={(e) => handleFormChange("type", e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D30019] focus:border-transparent transition-colors bg-white text-gray-800"
              >
                <option value="Emergency">Emergency</option>
                <option value="Medical">Medical</option>
                <option value="Fire">Fire</option>
                <option value="Police">Police</option>
                <option value="Rescue">Rescue</option>
                <option value="Other">Other</option>
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
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          {/* Contact Information Section */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Contact Information</h4>
            
            {/* Email */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleFormChange("email", e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D30019] focus:border-transparent transition-colors bg-white"
                placeholder="Enter email address"
              />
            </div>

            {/* Contact Number */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contact Number
              </label>
              <input
                type="text"
                value={formData.contact}
                onChange={(e) => handleFormChange("contact", e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D30019] focus:border-transparent transition-colors bg-white"
                placeholder="Enter contact number"
              />
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address
              </label>
              <textarea
                value={formData.address}
                onChange={(e) => handleFormChange("address", e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D30019] focus:border-transparent transition-colors bg-white"
                placeholder="Enter agency address"
                rows="3"
              />
            </div>
          </div>
        </div>

        {/* Buttons - Centered with proper spacing */}
        <div className="flex justify-center space-x-4 mt-8 pt-6 border-t border-gray-200">
          <button
            onClick={handleSaveAgency}
            className="px-8 py-3 bg-[#D30019] text-white rounded-lg hover:bg-[#920114] transition-colors font-medium"
          >
            {editingAgency ? "Save" : "Add"}
          </button>
          <button
            onClick={() => setShowAgencyForm(false)}
            className="px-8 py-3 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-50 transition-colors font-medium border border-gray-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
)}

      {/* Agency Details Modal */}
      {showAgencyDetails && selectedAgency && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-800">Agency Details</h3>
                <button
                  onClick={() => setShowAgencyDetails(false)}
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
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Agency ID</label>
                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <span className="text-gray-800 font-medium">{selectedAgency.id}</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedAgency.status)}`}>
                        {selectedAgency.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Agency Name</label>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <span className="text-gray-800">{selectedAgency.name}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contact Information</label>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 space-y-2">
                    <div className="text-gray-800"><strong>Phone:</strong> {selectedAgency.contact}</div>
                    <div className="text-gray-800"><strong>Email:</strong> {selectedAgency.email}</div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <span className="text-gray-800">{selectedAgency.address}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Assigned Reports</label>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <span className="text-gray-800 font-medium">{selectedAgency.assignedReports} active reports</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setShowAgencyDetails(false)}
                  className="px-6 py-3 bg-[#D30019] text-white rounded-lg hover:bg-[#920114] transition-colors font-medium"
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