import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiUsers, FiUserPlus, FiPhoneCall, FiRefreshCw, FiCheckCircle } from "react-icons/fi";
import { getStats } from "../services/api";
import StatCard from "../components/StatCard";
import StatusBadge from "../components/StatusBadge";
import Spinner from "../components/Spinner";
import EmptyState from "../components/EmptyState";
import toast from "react-hot-toast";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const res = await getStats();
      setStats(res.data.data);
    } catch (error) {
      toast.error("Failed to load dashboard stats");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Spinner fullScreen />;

  const cards = [
    { title: "Total Leads", value: stats?.total || 0, icon: FiUsers, color: "blue" },
    { title: "New Leads", value: stats?.newLeads || 0, icon: FiUserPlus, color: "purple" },
    { title: "Contacted", value: stats?.contacted || 0, icon: FiPhoneCall, color: "yellow" },
    { title: "Follow-up", value: stats?.followUp || 0, icon: FiRefreshCw, color: "red" },
    { title: "Converted", value: stats?.converted || 0, icon: FiCheckCircle, color: "green" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">Dashboard</h2>
        <p className="text-sm text-gray-400">
          Overview of your client leads and performance
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {cards.map((card) => (
          <StatCard key={card.title} {...card} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass rounded-2xl p-5 sm:p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-base font-semibold text-white">Recent Activity</h3>
            <Link
              to="/leads"
              className="text-xs text-purple-400 hover:text-purple-300 font-medium"
            >
              View all
            </Link>
          </div>

          {stats?.recentActivity?.length > 0 ? (
            <div className="space-y-3">
              {stats.recentActivity.map((lead) => (
                <div
                  key={lead._id}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-600/20 border border-white/10 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                      {lead.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-white truncate">
                        {lead.name}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {lead.email}
                      </p>
                    </div>
                  </div>
                  <StatusBadge status={lead.status} />
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              title="No recent activity"
              message="New leads and updates will appear here."
            />
          )}
        </div>

        <div className="glass rounded-2xl p-5 sm:p-6">
          <h3 className="text-base font-semibold text-white mb-5">
            Quick Summary
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Conversion Rate</span>
              <span className="text-sm font-semibold text-green-400">
                {stats?.total
                  ? Math.round((stats.converted / stats.total) * 100)
                  : 0}
                %
              </span>
            </div>
            <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-500"
                style={{
                  width: `${
                    stats?.total
                      ? Math.round((stats.converted / stats.total) * 100)
                      : 0
                  }%`,
                }}
              ></div>
            </div>

            <div className="pt-2 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Lost Leads</span>
                <span className="text-white font-medium">{stats?.lost || 0}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Active Pipeline</span>
                <span className="text-white font-medium">
                  {(stats?.newLeads || 0) + (stats?.contacted || 0) + (stats?.followUp || 0)}
                </span>
              </div>
            </div>

            <Link
              to="/leads"
              className="block text-center mt-4 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-sm font-medium transition-all shadow-lg shadow-purple-500/20"
            >
              Manage Leads
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}