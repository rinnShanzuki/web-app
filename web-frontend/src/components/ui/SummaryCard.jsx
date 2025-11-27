export default function SummaryCard({ title, count }) {
  return (
    <div className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl shadow-lg border border-gray-200 flex flex-col items-center justify-center transition-transform hover:scale-105 hover:shadow-xl">
      <h2 className="text-gray-600 text-lg font-semibold mb-4 text-center">{title}</h2>
      <p className="text-5xl font-bold text-[#D30019]">{count}</p>
    </div>
  );
}