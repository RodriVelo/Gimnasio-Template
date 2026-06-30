const variants = {
  success: "bg-emerald-50 text-emerald-700 border-emerald-200",
  danger: "bg-accent-50 text-accent-700 border-accent-200",
  warning: "bg-amber-50 text-amber-700 border-amber-200",
  neutral: "bg-surface-100 text-ink-muted border-border-light",
  info: "bg-sky-50 text-sky-700 border-sky-200",
};

export default function Badge({ children, variant = "neutral", dot = true, className = "" }) {
  return (
    <span className={`badge ${variants[variant]} ${className}`}>
      {dot && <span className="w-1.5 h-1.5 rounded-full bg-current" />}
      {children}
    </span>
  );
}
