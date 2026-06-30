import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { memberships } from "../../data/gymData";
import { formatCurrency } from "../../utils/format";
import { SectionIntro } from "./Benefits";

export default function Plans() {
  return (
    <section id="planes" className="py-20 md:py-28">
      <div className="section-wrap section-pad">
        <SectionIntro
          eyebrow="Planes"
          title="Elegí el plan que se ajusta a tu ritmo"
          desc="Sin letra chica. Cambiá o cancelá cuando quieras."
        />

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {memberships.map((m, i) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.35, delay: i * 0.06 }}
              className={`relative flex flex-col rounded-2xl p-6 border transition-shadow duration-200 ${
                m.destacado
                  ? "bg-ink border-ink shadow-lift"
                  : "bg-white border-border hover:shadow-lift hover:border-border-light"
              }`}
            >
              {m.destacado && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent-600 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-glow">
                  Más elegido
                </span>
              )}
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${m.destacado ? "bg-white/10 text-accent-400" : "bg-accent-50 text-accent-600 border border-accent-100"}`}>
                <m.icon size={20} strokeWidth={2.1} />
              </div>
              <h3 className={`text-base font-bold ${m.destacado ? "text-white" : "text-ink"}`}>{m.nombre}</h3>
              <div className="flex items-baseline gap-1 mt-3">
                <span className={`text-2xl font-extrabold stat-num ${m.destacado ? "text-white" : "text-ink"}`}>{formatCurrency(m.precio)}</span>
                <span className={`text-xs ${m.destacado ? "text-white/60" : "text-ink-faint"}`}>{m.periodo}</span>
              </div>
              <p className={`text-xs mt-2 ${m.destacado ? "text-white/50" : "text-ink-faint"}`}>{m.clientes} socios activos</p>

              <ul className="mt-5 space-y-2.5 flex-1">
                {m.beneficios.map((b) => (
                  <li key={b} className={`flex items-start gap-2 text-sm ${m.destacado ? "text-white/80" : "text-ink-muted"}`}>
                    <Check size={15} className={`flex-shrink-0 mt-0.5 ${m.destacado ? "text-accent-400" : "text-accent-600"}`} />
                    {b}
                  </li>
                ))}
              </ul>

              <a href="#demo" className="mt-6">
                <button className={m.destacado ? "btn-primary w-full" : "btn-secondary w-full"}>
                  Elegir {m.nombre}
                </button>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
