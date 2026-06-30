import { motion } from "framer-motion";
import { benefits } from "../../data/landingData";

export default function Benefits() {
  return (
    <section id="beneficios" className="py-20 md:py-28 bg-surface-50 border-y border-border">
      <div className="section-wrap section-pad">
        <SectionIntro
          eyebrow="Por qué FORJA"
          title="Todo lo que necesitás para entrenar mejor"
          desc="Un sistema pensado de punta a punta: del primer día hasta el resultado que buscás."
        />

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.35, delay: i * 0.06 }}
              className="panel panel-pad hover:shadow-lift hover:border-border-light transition-shadow duration-200"
            >
              <div className="w-12 h-12 rounded-2xl bg-accent-50 border border-accent-100 flex items-center justify-center text-accent-600 mb-5">
                <b.icon size={22} strokeWidth={2.1} />
              </div>
              <h3 className="text-base font-bold text-ink mb-2">{b.title}</h3>
              <p className="text-sm text-ink-muted leading-relaxed">{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SectionIntro({ eyebrow, title, desc, center = true }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4 }}
      className={center ? "max-w-2xl mx-auto text-center" : "max-w-2xl"}
    >
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-extrabold text-ink tracking-tight">{title}</h2>
      {desc && <p className="mt-4 text-base text-ink-muted leading-relaxed">{desc}</p>}
    </motion.div>
  );
}
