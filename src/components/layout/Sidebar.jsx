import { NavLink } from "react-router-dom";
import { Dumbbell, ChevronsLeft, ChevronsRight, ArrowLeftRight, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function Sidebar({ nav, collapsed, setCollapsed, mobileOpen, onClose, roleLabel, switcher }) {
  return (
    <>
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-ink/40 backdrop-blur-sm z-40 lg:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      <aside
        className={`fixed left-0 top-0 h-screen bg-white border-r border-border flex flex-col z-50 transition-all duration-300 w-64 ${
          collapsed ? "lg:w-[72px]" : "lg:w-64"
        } ${mobileOpen ? "translate-x-0 shadow-lift" : "-translate-x-full"} lg:translate-x-0 lg:shadow-none`}
      >
        {/* Brand */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-border flex-shrink-0">
          <div className="flex items-center overflow-hidden">
            <div className="w-9 h-9 rounded-xl bg-accent-600 flex items-center justify-center flex-shrink-0 shadow-glow">
              <Dumbbell size={18} className="text-white" strokeWidth={2.5} />
            </div>
            <div className={`ml-3 overflow-hidden animate-fadeIn ${collapsed ? "lg:hidden" : ""}`}>
              <p className="text-sm font-bold text-ink leading-tight whitespace-nowrap">FORJA Gym</p>
              <p className="text-[11px] text-ink-faint whitespace-nowrap">{roleLabel}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden w-8 h-8 rounded-lg flex items-center justify-center text-ink-muted hover:text-ink hover:bg-surface-100 transition-colors flex-shrink-0"
            aria-label="Cerrar menú"
          >
            <X size={18} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {nav.map((item, i) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={onClose}
              style={{ animationDelay: `${i * 30}ms` }}
              className={({ isActive }) =>
                `group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 animate-slideIn relative ${
                  isActive
                    ? "bg-accent-50 text-accent-600"
                    : "text-ink-muted hover:text-ink hover:bg-surface-100"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-accent-600 rounded-r-full" />}
                  <item.icon size={18} strokeWidth={2} className="flex-shrink-0" />
                  <span className={`whitespace-nowrap overflow-hidden ${collapsed ? "lg:hidden" : ""}`}>{item.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Switcher + collapse */}
        <div className="p-3 border-t border-border space-y-1 flex-shrink-0">
          {switcher}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex w-full items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-ink-muted hover:text-ink hover:bg-surface-100 transition-colors duration-150"
          >
            {collapsed ? <ChevronsRight size={18} /> : <ChevronsLeft size={18} />}
            {!collapsed && <span>Colapsar</span>}
          </button>
        </div>
      </aside>
    </>
  );
}

export function RoleSwitcherLink({ to, label, collapsed }) {
  return (
    <NavLink
      to={to}
      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-ink-muted hover:text-ink hover:bg-surface-100 transition-colors duration-150"
    >
      <ArrowLeftRight size={18} strokeWidth={2} className="flex-shrink-0" />
      {!collapsed && <span className="whitespace-nowrap">{label}</span>}
    </NavLink>
  );
}
