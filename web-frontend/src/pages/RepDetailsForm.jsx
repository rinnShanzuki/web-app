import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SideBar from "../components/layout/SideBar";
import TopBar from "../components/layout/TopBar";

export default function ReportDetails() {
  const navigate = useNavigate();
  const { reportId } = useParams();
  const [showAssignForm, setShowAssignForm] = useState(false);
  const [assignedResponders, setAssignedResponders] = useState([]);

  // Sample report data - in real app, this would come from API
  const reportData = {
    id: reportId || "RPT-001",
    type: "Fire Emergency",
    description:
      "Residential fire at 123 Main Street. Multiple families affected. Immediate response needed.",
    location: "123 Main Street, Barangay Central, Quezon City",
    citizen: {
      name: "Juan Dela Cruz",
      phone: "+63 912 345 6789",
      email: "juan.delacruz@email.com",
      address: "456 Elm Street, Quezon City",
    },
    status: "Pending", // "Pending" | "Ongoing" | "Completed"
    timeReported: "2024-01-15T14:30:00",
    timeResponded: "2024-01-15T14:45:00",
    timeCompleted: "2024-01-15T15:20:00",
    assignedAgency: "BFP",
  };

  const [report, setReport] = useState(reportData);

  // ✅ Sample responders data (used in modal)
  const availableResponders = [
    { id: 1, name: "Fire Team Alpha", agency: "BFP", status: "Available" },
    { id: 2, name: "Medical Team Bravo", agency: "911", status: "Available" },
    { id: 3, name: "Police Unit Charlie", agency: "PNP", status: "On Duty" },
    { id: 4, name: "Rescue Team Delta", agency: "MDRRMO", status: "Available" },
  ];

  const handleStatusUpdate = () => {
    const statusOrder = ["Pending", "Ongoing", "Completed"];
    const currentIndex = statusOrder.indexOf(report.status);
    const nextStatus = statusOrder[currentIndex + 1];

    if (nextStatus) {
      const updatedReport = { ...report };

      if (nextStatus === "Ongoing" && !report.timeResponded) {
        updatedReport.timeResponded = new Date().toISOString();
      } else if (nextStatus === "Completed" && !report.timeCompleted) {
        updatedReport.timeCompleted = new Date().toISOString();
      }

      updatedReport.status = nextStatus;
      setReport(updatedReport);
    }
  };

  // ✅ Now used in modal below
  const handleAssignResponder = (responder) => {
    if (!assignedResponders.find((r) => r.id === responder.id)) {
      setAssignedResponders([...assignedResponders, responder]);
    }
    setShowAssignForm(false); // close modal after assigning
  };

  const handleRemoveResponder = (responderId) => {
    setAssignedResponders(
      assignedResponders.filter((r) => r.id !== responderId)
    );
  };

  const handleDeleteReport = () => {
    if (
      window.confirm(
        "Are you sure you want to delete this report? This action cannot be undone."
      )
    ) {
      navigate("/reports");
    }
  };

  const formatDateTime = (dateTime) => {
    if (!dateTime) return "Not yet";
    return new Date(dateTime).toLocaleString();
  };

  const renderActionButtons = () => {
    if (report.status === "Pending") {
      return (
        <>
          <button
            onClick={() => navigate("/reports")}
            className="px-6 py-3 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 border-2 border-transparent hover:border-[#920114] font-medium transition-colors"
          >
            Back
          </button>

          <button
            onClick={handleStatusUpdate}
            disabled={report.status === "Completed"}
            className="px-6 py-3 bg-[#D30019] text-white rounded-lg hover:bg-[#920114] border-2 border-transparent hover:border-[#920114] font-medium transition-colors"
          >
            Update Status
          </button>

          <button
            onClick={handleDeleteReport}
            className="px-6 py-3 bg-[#3F0008] text-white rounded-lg hover:bg-[#920114] border-2 border-transparent hover:border-[#920114] font-medium transition-colors"
          >
            Delete Report
          </button>
        </>
      );
    }

    if (report.status === "Ongoing") {
      return (
        <button
          onClick={() => navigate("/reports")}
          className="px-6 py-3 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 border-2 border-transparent hover:border-[#920114] font-medium transition-colors"
        >
          Back
        </button>
      );
    }

    if (report.status === "Completed") {
      return (
        <>
          <button
            onClick={() => navigate("/reports")}
            className="px-6 py-3 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 border-2 border-transparent hover:border-[#920114] font-medium transition-colors"
          >
            Back
          </button>
          <button
            onClick={handleDeleteReport}
            className="px-6 py-3 bg-[#3F0008] text-white rounded-lg hover:bg-[#920114] border-2 border-transparent hover:border-[#920114] font-medium transition-colors"
          >
            Delete Report
          </button>
        </>
      );
    }
  };

  return (
    <div className="flex w-full min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-screen z-50">
        <SideBar />
      </div>

      {/* Main Area */}
      <div className="flex-1 flex flex-col min-w-0 ml-64">
        <TopBar />

        <div className="flex-1 p-8">
          <div className="w-full max-w-full">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => navigate("/reports")}
                  className="flex items-center space-x-2 text-[#D30019] hover:text-[#920114] transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                  <span>Back to Reports</span>
                </button>
              </div>
              <div className="flex items-center space-x-3">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    report.status === "Pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : report.status === "Ongoing"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {report.status}
                </span>
                <span className="text-2xl font-bold text-[#D30019]">
                  {report.id}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* LEFT */}
              <div className="space-y-6">
                {/* Emergency Info */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-4 border-b border-gray-200 pb-2">
                    Emergency Information
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Type of Emergency
                      </label>
                      <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <span className="text-gray-800 font-medium">
                          {report.type}
                        </span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 min-h-[100px]">
                        <p className="text-gray-800 whitespace-pre-wrap">
                          {report.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Response Timeline */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-4 border-b border-gray-200 pb-2">
                    Response Timeline
                  </h2>
                  <div className="space-y-3">
                    <div className="flex justify-between py-2">
                      <span className="text-gray-600">Reported</span>
                      <span className="font-medium text-gray-800">
                        {formatDateTime(report.timeReported)}
                      </span>
                    </div>
                    <div className="flex justify-between py-2 border-t border-gray-100">
                      <span className="text-gray-600">Responded</span>
                      <span className="font-medium text-gray-800">
                        {report.status !== "Pending"
                          ? formatDateTime(report.timeResponded)
                          : "Not yet"}
                      </span>
                    </div>
                    <div className="flex justify-between py-2 border-t border-gray-100">
                      <span className="text-gray-600">Completed</span>
                      <span className="font-medium text-gray-800">
                        {report.status === "Completed"
                          ? formatDateTime(report.timeCompleted)
                          : "Not yet"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT */}
              <div className="space-y-6">
                {/* Assigned Responders */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="flex justify-between items-center mb-4 border-b border-gray-200 pb-2">
                    <h2 className="text-xl font-bold text-gray-800">
                      Assigned Responders
                    </h2>
                    {report.status === "Pending" && (
                      <button
                        onClick={() => setShowAssignForm(true)}
                        className="px-4 py-2 bg-[#D30019] text-white rounded-lg hover:bg-[#920114] transition-colors text-sm font-medium"
                      >
                        Assign Responders
                      </button>
                    )}
                  </div>

                  {report.status !== "Pending" ? (
                    <div className="text-gray-700 space-y-2">
                      <p>
                        <strong>Fire Team Alpha</strong> (BFP)
                      </p>
                      <p>
                        <strong>Medical Team Bravo</strong> (911)
                      </p>
                    </div>
                  ) : assignedResponders.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">
                      No responders assigned yet.
                    </p>
                  ) : (
                    assignedResponders.map((r) => (
                      <div
                        key={r.id}
                        className="flex justify-between p-3 border border-gray-200 rounded-lg"
                      >
                        <div>
                          <p className="font-medium text-gray-800">{r.name}</p>
                          <p className="text-sm text-gray-600">{r.agency}</p>
                        </div>
                        <button
                          onClick={() => handleRemoveResponder(r.id)}
                          className="text-[#D30019] hover:text-[#920114]"
                        >
                          ✕
                        </button>
                      </div>
                    ))
                  )}
                </div>

                {/* Action Buttons */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="flex justify-end space-x-4">
                    {renderActionButtons()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Assign Modal (now uses both variables) */}
      {showAssignForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-800">
                Agency Assign Form
              </h3>
              <button
                onClick={() => setShowAssignForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-gray-700">
                Select a responder to assign to this report:
              </p>
              {availableResponders.map((responder) => (
                <div
                  key={responder.id}
                  className="flex justify-between items-center border border-gray-200 p-3 rounded-lg hover:bg-gray-50"
                >
                  <div>
                    <p className="font-medium text-gray-800">
                      {responder.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      {responder.agency} — {responder.status}
                    </p>
                  </div>
                  {responder.status === "Available" ? (
                    <button
                      onClick={() => handleAssignResponder(responder)}
                      className="px-3 py-1 bg-[#D30019] text-white rounded-lg text-sm hover:bg-[#920114]"
                    >
                      Assign
                    </button>
                  ) : (
                    <span className="text-gray-400 text-sm">Not Available</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
