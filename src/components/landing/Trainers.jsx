import { motion } from "framer-motion";
import { Award } from "lucide-react";
import { trainers } from "../../data/gymData";
import { SectionIntro } from "./Benefits";

export default function Trainers() {
  return (
    <section id="entrenadores" className="py-20 md:py-28">
      <div className="section-wrap section-pad">
        <SectionIntro
          eyebrow="Nuestro equipo"
          title="Entrenadores que marcan la diferencia"
          desc="Profesionales certificados, cada uno con su especialidad, listos para guiar tu progreso."
        />

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {trainers.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.35, delay: i * 0.06 }}
              className="panel overflow-hidden text-center hover:shadow-lift hover:border-border-light transition-shadow duration-200"
            >
              <div className="aspect-square overflow-hidden">
                <img src={t.foto} alt={t.nombre} className="w-full h-full object-cover" />
              </div>
              <div className="p-5">
                <h3 className="text-sm font-bold text-ink">{t.nombre}</h3>
                <p className="text-xs text-accent-600 font-semibold mt-1">{t.especialidad}</p>
                <div className="flex items-center justify-center gap-1.5 text-xs text-ink-faint mt-3">
                  <Award size={13} className="text-accent-500" />
                  {t.experiencia} de experiencia
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
