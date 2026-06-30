import { NavLink } from "react-router-dom";
import { FiGrid, FiUsers, FiX } from "react-icons/fi";
import { HiOutlineLightningBolt } from "react-icons/hi";

const navItems = [
  { name: "Dashboard", path: "/", icon: FiGrid },
  { name: "Leads", path: "/leads", icon: FiUsers },
];

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-screen w-64 z-50 glass border-r border-white/10 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-auto ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-6 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
              <HiOutlineLightningBolt className="text-white text-xl" />
            </div>
            <span className="text-lg font-bold gradient-text">CRM Pro</span>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden text-gray-400 hover:text-white"
          >
            <FiX size={22} />
          </button>
        </div>

        <nav className="px-4 py-6 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === "/"}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
                  isActive
                    ? "bg-gradient-to-r from-blue-500/20 to-purple-600/20 text-white border border-purple-500/30 shadow-lg shadow-purple-500/10"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`
              }
            >
              <item.icon
                size={19}
                className="group-hover:scale-110 transition-transform duration-200"
              />
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="glass rounded-2xl p-4 text-center">
            <p className="text-xs text-gray-400 mb-1">Mini CRM v1.0</p>
            <p className="text-[11px] text-gray-500">
              Future Interns Project
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}