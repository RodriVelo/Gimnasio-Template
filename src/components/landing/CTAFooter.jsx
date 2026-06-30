import { motion } from "framer-motion";
import { ArrowRight, Dumbbell, MapPin, Phone, Mail } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="py-20 md:py-28">
      <div className="section-wrap section-pad">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.4 }}
          className="relative overflow-hidden rounded-3xl bg-ink px-6 py-16 md:py-20 text-center"
        >
          <div className="absolute top-[-100px] right-[-60px] w-[320px] h-[320px] bg-accent-500/25 blur-[100px] rounded-full pointer-events-none" />
          <div className="absolute bottom-[-100px] left-[-60px] w-[280px] h-[280px] bg-accent-500/15 blur-[100px] rounded-full pointer-events-none" />
          <div className="relative">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight max-w-xl mx-auto">
              Sumate a FORJA Gym y empezá hoy
            </h2>
            <p className="mt-4 text-white/60 max-w-md mx-auto">
              Equipamiento premium, entrenadores certificados y una comunidad que te acompaña en cada etapa.
            </p>
            <a href="#planes" className="inline-block mt-8">
              <button className="btn-primary px-7 py-3 text-[15px]">
                Quiero sumarme <ArrowRight size={17} />
              </button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="section-wrap section-pad flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
        <div className="flex flex-col items-center md:items-start gap-3">
          <a href="#top" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-accent-600 flex items-center justify-center shadow-glow">
              <Dumbbell size={15} className="text-white" strokeWidth={2.5} />
            </div>
            <span className="text-sm font-extrabold text-ink">FORJA Gym</span>
          </a>
          <p className="text-xs text-ink-faint text-center md:text-left max-w-xs">
            Plataforma de gestión integral para gimnasios premium.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm">
          <a href="#beneficios" className="text-ink-muted hover:text-ink transition-colors">Beneficios</a>
          <a href="#entrenadores" className="text-ink-muted hover:text-ink transition-colors">Entrenadores</a>
          <a href="#planes" className="text-ink-muted hover:text-ink transition-colors">Planes</a>
          <a href="#testimonios" className="text-ink-muted hover:text-ink transition-colors">Testimonios</a>
          <a href="#demo" className="text-ink-muted hover:text-ink transition-colors">Demo</a>
        </div>

        <div className="flex items-center gap-2">
          {[MapPin, Phone, Mail].map((Icon, i) => (
            <span
              key={i}
              className="w-9 h-9 rounded-xl border border-border flex items-center justify-center text-ink-muted hover:text-accent-600 hover:border-accent-200 transition-colors"
            >
              <Icon size={15} />
            </span>
          ))}
        </div>
      </div>
      <p className="text-center text-[11px] text-ink-faint mt-10">
        © 2026 FORJA Gym — Template de demostración, todos los datos son ficticios.
      </p>
    </footer>
  );
}
