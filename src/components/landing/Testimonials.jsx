import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { testimonials } from "../../data/landingData";
import { SectionIntro } from "./Benefits";

export default function Testimonials() {
  return (
    <section id="testimonios" className="py-20 md:py-28 bg-surface-50 border-y border-border">
      <div className="section-wrap section-pad">
        <SectionIntro
          eyebrow="Testimonios"
          title="Resultados que hablan por sí solos"
          desc="Historias reales de socios que cambiaron su rutina y su energía diaria."
        />

        <div className="mt-14 grid md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.nombre}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.35, delay: i * 0.08 }}
              className="panel panel-pad flex flex-col"
            >
              <Quote size={22} className="text-accent-200" strokeWidth={2.5} />
              <p className="text-sm text-ink-muted leading-relaxed mt-4 flex-1">{t.texto}</p>
              <div className="flex items-center gap-3 mt-6 pt-5 border-t border-border">
                <img src={t.foto} alt={t.nombre} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <p className="text-sm font-bold text-ink">{t.nombre}</p>
                  <p className="text-xs text-ink-faint">{t.rol}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
