export default function StatCard({ title, value, icon: Icon, color, trend }) {
  const colorMap = {
    blue: "from-blue-500 to-cyan-500 shadow-blue-500/20",
    purple: "from-purple-500 to-pink-500 shadow-purple-500/20",
    yellow: "from-yellow-400 to-orange-500 shadow-yellow-500/20",
    green: "from-green-400 to-emerald-500 shadow-green-500/20",
    red: "from-red-400 to-rose-500 shadow-red-500/20",
  };

  return (
    <div className="glass rounded-2xl p-5 hover:bg-white/[0.08] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group cursor-default">
      <div className="flex items-center justify-between mb-4">
        <div
          className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colorMap[color]} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
        >
          <Icon className="text-white" size={22} />
        </div>
        {trend && (
          <span className="text-xs font-medium text-green-400 bg-green-400/10 px-2 py-1 rounded-full">
            {trend}
          </span>
        )}
      </div>
      <p className="text-2xl sm:text-3xl font-bold text-white mb-1">{value}</p>
      <p className="text-sm text-gray-400">{title}</p>
    </div>
  );
}