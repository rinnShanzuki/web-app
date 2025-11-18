import SummaryCard from "../components/ui/SummaryCard";
import SideBar from "../components/layout/SideBar";
import TopBar from "../components/layout/TopBar";
import { Doughnut, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

export default function Dashboard() {
  const summaryData = [
    { title: "Total Emergency", count: "120" },
    { title: "Active Responders", count: "35" },
    { title: "Ongoing Emergencies", count: "10" },
  ];

  const responseRateData = {
    labels: ["BFP", "PNP", "MDRRMO", "911"],
    datasets: [
      {
        label: "Response Rate",
        data: [100, 70, 50, 30],
        backgroundColor: ["#D64219", "#D30019", "#920114", "#3F0008"],
        borderWidth: 0,
        borderRadius: 8,
        barPercentage: 0.6,
      },
    ],
  };

  const emergencyTypeData = {
    labels: ["Fire", "Crime", "Medical", "Others"],
    datasets: [
      {
        data: [40, 25, 20, 15],
        backgroundColor: ["#D64219", "#D30019", "#920114", "#3F0008"],
        borderWidth: 0,
      },
    ],
  };

  const responseRateOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false }, title: { display: false } },
    scales: {
      x: { grid: { display: false }, ticks: { font: { size: 14, weight: "bold" } } },
      y: {
        beginAtZero: true,
        max: 100,
        ticks: { stepSize: 20, callback: (value) => value + "%" },
        grid: { color: "#f0f0f0" },
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          padding: 20,
          usePointStyle: true,
          pointStyle: "circle",
          font: { size: 12 },
        },
      },
    },
    cutout: "70%",
  };

  return (
    <div className="flex w-full min-h-screen bg-gray-50">
      {/* Fixed Sidebar */}
      <div className="fixed left-0 top-0 h-screen z-50">
        <SideBar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 ml-64">
        {/* Scrollable TopBar */}
        <TopBar />

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="w-full max-w-full">
            {/* Summary Cards */}
            <div className="grid grid-cols-3 gap-8 mb-8">
              {summaryData.map((item, idx) => (
                <SummaryCard key={idx} title={item.title} count={item.count} />
              ))}
            </div>

            {/* Charts Row (Side by Side) */}
            <div className="grid grid-cols-2 gap-8 mb-8">
              {/* Left: Response Rate */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6">Response Rate</h2>
                <div className="h-80">
                  <Bar data={responseRateData} options={responseRateOptions} />
                </div>
              </div>

              {/* Right: Emergency Type Breakdown */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6">
                  Emergency Type Breakdown
                </h2>
                <div className="h-80">
                  <Doughnut data={emergencyTypeData} options={doughnutOptions} />
                </div>
              </div>
            </div>

            {/* Agency Workload Section (Below Charts) */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">
                Agency Workload Summary
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { name: "BFP", stats: "25 ongoing / 120 total" },
                  { name: "PNP", stats: "18 ongoing / 90 total" },
                  { name: "MDRRMO", stats: "31 ongoing / 150 total" },
                  { name: "911", stats: "12 ongoing / 110 total" },
                ].map((agency, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl border border-red-100"
                  >
                    <span className="font-semibold text-gray-700">{agency.name}</span>
                    <span className="text-[#D30019] font-bold">{agency.stats}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
