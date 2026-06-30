import { useEffect, useState } from "react";
import { Bell, Search, Menu } from "lucide-react";

export default function Navbar({ userName, userRole, collapsed, onMenuClick }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 right-0 left-0 h-16 bg-white/80 backdrop-blur-md border-b z-30 flex items-center justify-between px-4 md:px-6 transition-all duration-300 ${
        scrolled ? "border-border shadow-soft" : "border-transparent"
      } ${collapsed ? "lg:left-[72px]" : "lg:left-64"}`}
    >
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onMenuClick}
          className="lg:hidden w-9 h-9 rounded-xl flex items-center justify-center text-ink-muted hover:text-ink hover:bg-surface-100 transition-colors flex-shrink-0"
          aria-label="Abrir menú"
        >
          <Menu size={20} />
        </button>
        <div className="relative hidden sm:block w-72">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint" />
          <input
            type="text"
            placeholder="Buscar en el sistema..."
            className="input-field pl-9 py-2 bg-surface-50"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 ml-auto">
        <button className="relative w-9 h-9 rounded-xl flex items-center justify-center text-ink-muted hover:text-ink hover:bg-surface-100 transition-colors flex-shrink-0">
          <Bell size={17} />
          <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-accent-600" />
        </button>
        <div className="w-px h-6 bg-border hidden sm:block" />
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-accent-50 border border-accent-200 flex items-center justify-center text-accent-600 text-xs font-bold flex-shrink-0">
            {userName.split(" ").map((n) => n[0]).slice(0, 2).join("")}
          </div>
          <div className="hidden sm:block leading-tight">
            <p className="text-sm font-semibold text-ink">{userName}</p>
            <p className="text-[11px] text-ink-faint">{userRole}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
