export const chartColors = {
  accent: "#E63946",
  accentSoft: "#EB5560",
  grid: "#EEEEF2",
  axis: "#9CA0AB",
  surface: "#FFFFFF",
};

export function ChartTooltip({ active, payload, label, suffix = "", prefix = "" }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-border rounded-xl px-3 py-2 shadow-lift text-xs">
      <p className="text-ink-faint mb-1">{label}</p>
      {payload.map((p, i) => (
        <p key={i} className="text-ink font-mono font-semibold">
          {prefix}{typeof p.value === "number" ? p.value.toLocaleString("es-AR") : p.value}{suffix}
        </p>
      ))}
    </div>
  );
}
