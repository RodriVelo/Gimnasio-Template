import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShieldCheck, GraduationCap, UserRound, ArrowRight } from "lucide-react";
import { SectionIntro } from "./Benefits";

const panels = [
  { to: "/admin", label: "Administrador", desc: "Gestión completa del gimnasio: clientes, pagos, entrenadores y reportes.", icon: ShieldCheck },
  { to: "/entrenador", label: "Entrenador", desc: "Alumnos, rutinas y mensajería para el día a día del coach.", icon: GraduationCap },
  { to: "/cliente", label: "Cliente", desc: "Rutinas, progreso, calendario y pagos desde la mirada del socio.", icon: UserRound },
];

export default function DemoAccess() {
  return (
    <section id="demo" className="py-20 md:py-28 bg-surface-50 border-y border-border">
      <div className="section-wrap section-pad">
        <SectionIntro
          eyebrow="Demo interactiva"
          title="Probá la plataforma de gestión"
          desc="Sin necesidad de iniciar sesión: elegí un panel y explorá la demo completa de FORJA Gym."
        />

        <div className="mt-14 grid sm:grid-cols-3 gap-5 max-w-4xl mx-auto">
          {panels.map((p, i) => (
            <motion.div
              key={p.to}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.35, delay: i * 0.08 }}
            >
              <Link
                to={p.to}
                className="group panel panel-pad flex flex-col h-full hover:shadow-lift hover:border-accent-200 transition-shadow duration-200"
              >
                <div className="w-11 h-11 rounded-xl bg-accent-50 border border-accent-100 flex items-center justify-center text-accent-600 mb-4">
                  <p.icon size={20} strokeWidth={2.1} />
                </div>
                <h3 className="text-sm font-bold text-ink mb-1.5">{p.label}</h3>
                <p className="text-xs text-ink-faint leading-relaxed flex-1">{p.desc}</p>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-accent-600 mt-4 group-hover:gap-2.5 transition-all duration-200">
                  Ingresar <ArrowRight size={13} />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-xs text-ink-faint mt-10">
          Template de demostración — todos los datos son ficticios y no hay backend conectado.
        </p>
      </div>
    </section>
  );
}
