const statusStyles = {
  New: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  Contacted: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
  "Follow-up": "bg-purple-500/15 text-purple-400 border-purple-500/30",
  Converted: "bg-green-500/15 text-green-400 border-green-500/30",
  Lost: "bg-red-500/15 text-red-400 border-red-500/30",
};

export default function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${
        statusStyles[status] || statusStyles.New
      }`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5"></span>
      {status}
    </span>
  );
}