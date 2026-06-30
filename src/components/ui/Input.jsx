export function Input({ label, icon: Icon, className = "", ...props }) {
  return (
    <label className="block">
      {label && <span className="block text-xs font-semibold text-ink-muted mb-1.5">{label}</span>}
      <div className="relative">
        {Icon && <Icon size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint" />}
        <input className={`input-field ${Icon ? "pl-9" : ""} ${className}`} {...props} />
      </div>
    </label>
  );
}

export function SearchBar({ value, onChange, placeholder = "Buscar...", className = "" }) {
  return (
    <div className={`relative ${className}`}>
      <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="input-field pl-9"
      />
    </div>
  );
}
