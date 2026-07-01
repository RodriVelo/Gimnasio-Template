import { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { LayoutGrid } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { roleConfig } from "./navConfig";

function PanelSwitcher({ collapsed, onNavigate }) {
  const items = [
    { to: "/admin", label: "Administrador" },
    { to: "/entrenador", label: "Entrenador" },
    { to: "/cliente", label: "Cliente" },
    { to: "/recepcionista", label: "Recepcionista" },
  ];
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-ink-muted hover:text-ink hover:bg-surface-100 transition-colors duration-150"
      >
        <LayoutGrid size={18} strokeWidth={2} className="flex-shrink-0" />
        <span className={`whitespace-nowrap ${collapsed ? "lg:hidden" : ""}`}>Cambiar panel</span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.15 }}
            className={`absolute bottom-full mb-1 left-0 ${collapsed ? "lg:left-full lg:ml-2" : ""} w-48 panel !p-1.5 z-50`}
          >
            {items.map((it) => (
              <NavLink
                key={it.to}
                to={it.to}
                onClick={() => {
                  setOpen(false);
                  onNavigate?.();
                }}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-lg text-sm transition-colors ${
                    isActive ? "bg-accent-50 text-accent-600" : "text-ink-muted hover:text-ink hover:bg-surface-100"
                  }`
                }
              >
                {it.label}
              </NavLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function DashboardLayout({ role }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const cfg = roleConfig[role];

  return (
    <div className="min-h-screen bg-base">
      <Sidebar
        nav={cfg.nav}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        roleLabel={`Panel ${cfg.label}`}
        switcher={<PanelSwitcher collapsed={collapsed} onNavigate={() => setMobileOpen(false)} />}
      />
      <Navbar
        userName={cfg.userName}
        userRole={cfg.userRole}
        collapsed={collapsed}
        onMenuClick={() => setMobileOpen(true)}
      />
      <main
        className={`pt-16 transition-all duration-300 ${collapsed ? "lg:pl-[72px]" : "lg:pl-64"}`}
      >
        <div className="p-4 md:p-6 lg:p-8 max-w-[1600px] mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
