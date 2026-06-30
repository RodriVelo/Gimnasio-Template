import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Dumbbell, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const links = [
  { href: "#beneficios", label: "Beneficios" },
  { href: "#entrenadores", label: "Entrenadores" },
  { href: "#planes", label: "Planes" },
  { href: "#testimonios", label: "Testimonios" },
  { href: "#demo", label: "Demo" },
];

export default function LandingNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLinkClick = () => setOpen(false);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/80 backdrop-blur-md border-b border-border shadow-soft" : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="section-wrap section-pad h-16 md:h-20 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2.5 flex-shrink-0">
          <div className="w-9 h-9 rounded-xl bg-accent-600 flex items-center justify-center shadow-glow">
            <Dumbbell size={18} className="text-white" strokeWidth={2.5} />
          </div>
          <span className="text-base font-extrabold text-ink tracking-tight">FORJA Gym</span>
        </a>

        <nav className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-semibold text-ink-muted hover:text-ink transition-colors duration-150">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Link to="/admin" className="btn-ghost text-sm">Ingresar</Link>
          <a href="#demo">
            <button className="btn-primary">Probar la demo</button>
          </a>
        </div>

        <button
          onClick={() => setOpen((o) => !o)}
          className="lg:hidden w-10 h-10 rounded-xl flex items-center justify-center text-ink hover:bg-surface-100 transition-colors"
          aria-label="Abrir menú"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-white border-b border-border overflow-hidden"
          >
            <div className="section-pad py-4 flex flex-col gap-1">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={handleLinkClick}
                  className="px-3 py-2.5 rounded-xl text-sm font-semibold text-ink-muted hover:text-ink hover:bg-surface-100 transition-colors"
                >
                  {l.label}
                </a>
              ))}
              <div className="flex items-center gap-3 mt-2 px-3">
                <Link to="/admin" className="btn-secondary flex-1">Ingresar</Link>
                <a href="#demo" onClick={handleLinkClick} className="flex-1">
                  <button className="btn-primary w-full">Probar demo</button>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
