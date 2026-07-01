import { ChevronDown } from "lucide-react";

export function Select({ label, className = "", children, ...props }) {
  return (
    <label className="block">
      {label && <span className="block text-xs font-semibold text-ink-muted mb-1.5">{label}</span>}
      <div className="relative">
        <select
          className={`input-field appearance-none pr-9 ${className}`}
          {...props}
        >
          {children}
        </select>
        <ChevronDown size={15} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ink-faint" />
      </div>
    </label>
  );
}
