import { motion } from "framer-motion";

export function Card({ children, className = "", hover = false, padded = true }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      whileHover={hover ? { y: -3 } : undefined}
      className={`panel ${padded ? "panel-pad" : ""} ${hover ? "transition-shadow duration-200 hover:shadow-lift hover:border-border-light" : ""} ${className}`}
    >
      {children}
    </motion.div>
  );
}

export function StatsCard({ label, value, icon: Icon, trend, trendUp = true, accent = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`panel panel-pad relative overflow-hidden group transition-shadow duration-200 hover:shadow-lift ${accent ? "ring-1 ring-accent-500/25" : ""}`}
    >
      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-accent-500/0 via-accent-500/70 to-accent-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold text-ink-muted uppercase tracking-wide">{label}</p>
          <p className="stat-num text-2xl md:text-3xl font-bold text-ink mt-2">{value}</p>
          {trend && (
            <p className={`text-xs mt-2 font-semibold ${trendUp ? "text-emerald-600" : "text-accent-600"}`}>
              {trendUp ? "↑" : "↓"} {trend}
            </p>
          )}
        </div>
        {Icon && (
          <div className="w-10 h-10 rounded-xl bg-accent-50 border border-accent-100 flex items-center justify-center text-accent-600 flex-shrink-0">
            <Icon size={18} strokeWidth={2.25} />
          </div>
        )}
      </div>
    </motion.div>
  );
}
