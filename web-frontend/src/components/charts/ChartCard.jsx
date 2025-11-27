export default function ChartCard({ title, children }) {
  return (
    <div className="bg-white dark:bg-[#1E1D1D] p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">{title}</h2>
      <div className="h-80">{children}</div>
    </div>
  );
}