import { FiInbox } from "react-icons/fi";

export default function EmptyState({
  title = "No leads found",
  message = "Get started by adding your first lead.",
  actionLabel,
  onAction,
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-20 h-20 rounded-3xl glass flex items-center justify-center mb-5">
        <FiInbox className="text-gray-500" size={36} />
      </div>
      <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
      <p className="text-sm text-gray-400 mb-6 max-w-xs">{message}</p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-sm font-medium transition-all shadow-lg shadow-purple-500/20"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}