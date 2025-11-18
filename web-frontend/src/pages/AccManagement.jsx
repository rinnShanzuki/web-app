// src/pages/setcomponents/AccManagement.jsx
import { useState } from "react";
import SetSideBar from "../components/layout/SetSideBar";

// Import the image icons
import editIcon from "../assets/images/edit.png";
import passIcon from "../assets/images/pass.png";
import deleteIcon from "../assets/images/delete.png";

export default function AccManagement() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState(null);
  const [admins, setAdmins] = useState([
    { id: 1, name: "John Doe", email: "john.doe@res-q.com", role: "Super Admin", status: "Active" },
    { id: 2, name: "Jane Smith", email: "jane.smith@res-q.com", role: "Admin", status: "Active" },
    { id: 3, name: "Mike Johnson", email: "mike.johnson@res-q.com", role: "Moderator", status: "Suspended" },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "Admin",
    status: "Active"
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddAdmin = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const newAdmin = {
      id: admins.length + 1,
      ...formData
    };
    setAdmins(prev => [...prev, newAdmin]);
    setShowAddForm(false);
    resetForm();
    alert("Admin added successfully!");
  };

  const handleEditAdmin = (admin) => {
    setEditingAdmin(admin);
    setFormData({
      name: admin.name,
      email: admin.email,
      password: "",
      confirmPassword: "",
      role: admin.role,
      status: admin.status
    });
  };

  const handleUpdateAdmin = (e) => {
    e.preventDefault();
    setAdmins(prev => prev.map(admin => 
      admin.id === editingAdmin.id 
        ? { ...admin, ...formData }
        : admin
    ));
    setEditingAdmin(null);
    resetForm();
    alert("Admin updated successfully!");
  };

  const handleDeleteAdmin = (id) => {
    if (window.confirm("Are you sure you want to delete this admin?")) {
      setAdmins(prev => prev.filter(admin => admin.id !== id));
      alert("Admin deleted successfully!");
    }
  };

  const handleResetPassword = (id) => {
    if (window.confirm("Reset password for this admin?")) {
      alert("Password reset instructions sent to admin email!");
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "Admin",
      status: "Active"
    });
  };

  const getStatusColor = (status) => {
    return status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800";
  };

  const getRoleColor = (role) => {
    switch (role) {
      case "Super Admin": return "bg-purple-100 text-purple-800";
      case "Admin": return "bg-blue-100 text-blue-800";
      case "Moderator": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="flex w-full min-h-screen bg-gray-50">
      {/* Settings Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200">
        <SetSideBar />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-[#920114]">Admin Account Management</h2>
              <button
                onClick={() => setShowAddForm(true)}
                className="px-4 py-2 bg-[#D30019] text-white rounded-lg hover:bg-[#920114] font-medium transition-colors"
              >
              Add Admin
              </button>
            </div>

            {(showAddForm || editingAdmin) && (
              <div className="mb-6 p-6 border border-gray-200 rounded-lg bg-gray-50">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  {editingAdmin ? "Edit Admin" : "Add New Admin"}
                </h3>
                <form onSubmit={editingAdmin ? handleUpdateAdmin : handleAddAdmin} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Full Name"
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D30019]"
                      required
                    />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Email"
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D30019]"
                      required
                    />
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Password"
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D30019]"
                      required={!editingAdmin}
                    />
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Confirm Password"
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D30019]"
                      required={!editingAdmin}
                    />
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D30019]"
                    >
                      <option value="Moderator">Moderator</option>
                      <option value="Admin">Admin</option>
                      <option value="Super Admin">Super Admin</option>
                    </select>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D30019]"
                    >
                      <option value="Active">Active</option>
                      <option value="Suspended">Suspended</option>
                    </select>
                  </div>
                  <div className="flex space-x-3">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#D30019] text-white rounded-lg hover:bg-[#920114] font-medium"
                    >
                      💾 {editingAdmin ? "Update" : "Save"}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowAddForm(false);
                        setEditingAdmin(null);
                        resetForm();
                      }}
                      className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 font-medium"
                    >
                      ❌ Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Admins Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-700">
                <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                  <tr>
                    <th className="px-4 py-3">Admin ID</th>
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3">Role</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {admins.map((admin) => (
                    <tr key={admin.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3 font-mono">#{admin.id.toString().padStart(3, '0')}</td>
                      <td className="px-4 py-3 font-medium">{admin.name}</td>
                      <td className="px-4 py-3">{admin.email}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(admin.role)}`}>
                          {admin.role}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(admin.status)}`}>
                          {admin.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex space-x-3">
                          {/* Edit Button with Image Icon */}
                          <button
                            onClick={() => handleEditAdmin(admin)}
                            className="p-1 hover:bg-gray-100 rounded transition-colors duration-200"
                            title="Edit"
                          >
                            <img 
                              src={editIcon} 
                              alt="Edit" 
                              className="w-5 h-5 object-contain"
                            />
                          </button>
                          
                          {/* Reset Password Button with Image Icon */}
                          <button
                            onClick={() => handleResetPassword(admin.id)}
                            className="p-1 hover:bg-gray-100 rounded transition-colors duration-200"
                            title="Reset Password"
                          >
                            <img 
                              src={passIcon} 
                              alt="Reset Password" 
                              className="w-5 h-5 object-contain"
                            />
                          </button>
                          
                          {/* Delete Button with Image Icon */}
                          <button
                            onClick={() => handleDeleteAdmin(admin.id)}
                            className="p-1 hover:bg-gray-100 rounded transition-colors duration-200"
                            title="Delete"
                          >
                            <img 
                              src={deleteIcon} 
                              alt="Delete" 
                              className="w-5 h-5 object-contain"
                            />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {admins.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No admin accounts found. Click "Add Admin" to create one.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}