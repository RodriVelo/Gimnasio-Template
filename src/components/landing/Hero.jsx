import { ArrowRight, PlayCircle } from "lucide-react";
import { motion } from "framer-motion";
import { heroStats } from "../../data/landingData";

export default function Hero() {
  return (
    <section id="top" className="relative pt-28 md:pt-36 pb-16 md:pb-24 overflow-hidden">
      <div className="absolute top-[-120px] right-[-120px] w-[420px] h-[420px] bg-accent-500/10 blur-[110px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-80px] left-[-100px] w-[320px] h-[320px] bg-accent-500/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="section-wrap section-pad relative grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <span className="eyebrow">Gimnasio premium en tu ciudad</span>
          <h1 className="mt-5 text-4xl sm:text-5xl lg:text-[3.4rem] font-extrabold text-ink tracking-tight leading-[1.05]">
            Entrená fuerte.
            <br />
            Progresá <span className="text-accent-600">de verdad</span>.
          </h1>
          <p className="mt-5 text-base md:text-lg text-ink-muted max-w-lg leading-relaxed">
            FORJA Gym combina equipamiento de primer nivel, entrenadores certificados y seguimiento
            personalizado para que cada sesión te acerque a tu objetivo.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#planes">
              <button className="btn-primary px-6 py-3 text-[15px]">
                Ver planes <ArrowRight size={17} />
              </button>
            </a>
            <a href="#demo">
              <button className="btn-secondary px-6 py-3 text-[15px]">
                <PlayCircle size={17} /> Probar la demo
              </button>
            </a>
          </div>

          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-lg">
            {heroStats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.15 + i * 0.08 }}
              >
                <p className="text-2xl md:text-3xl font-extrabold text-ink stat-num">{s.value}</p>
                <p className="text-xs text-ink-faint mt-1 leading-snug">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative"
        >
          <div className="relative rounded-3xl overflow-hidden shadow-lift aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5]">
            <img
              src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=900&q=75"
              alt="Socio entrenando en FORJA Gym"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="hidden sm:block absolute -bottom-6 -left-6 panel panel-pad !p-4 max-w-[220px]"
          >
            <p className="text-xs font-semibold text-ink-muted uppercase tracking-wide">Asistencias hoy</p>
            <p className="stat-num text-2xl font-extrabold text-ink mt-1">97</p>
            <p className="text-xs text-emerald-600 font-semibold mt-1">↑ +12 vs ayer</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
