import { FiMenu, FiBell, FiSearch } from "react-icons/fi";

export default function Navbar({ onMenuClick }) {
  return (
    <header className="sticky top-0 z-30 glass border-b border-white/10 px-4 sm:px-6 py-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="lg:hidden text-gray-300 hover:text-white p-2 rounded-lg hover:bg-white/5 transition-colors"
          >
            <FiMenu size={22} />
          </button>
          <div>
            <h1 className="text-base sm:text-lg font-semibold text-white">
              Welcome back 👋
            </h1>
            <p className="text-xs text-gray-400 hidden sm:block">
              Here's what's happening with your leads today
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 glass rounded-xl px-3 py-2 w-56">
            <FiSearch className="text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Quick search..."
              className="bg-transparent outline-none text-sm text-white placeholder-gray-500 w-full"
            />
          </div>
          <button className="relative p-2.5 rounded-xl glass hover:bg-white/10 transition-colors">
            <FiBell className="text-gray-300" size={18} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-purple-500 rounded-full"></span>
          </button>
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-semibold shadow-lg shadow-purple-500/30">
            A
          </div>
        </div>
      </div>
    </header>
  );
}