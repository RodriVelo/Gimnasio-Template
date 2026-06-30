import { PageHeader, Card } from "../../components/ui";
import { schedule } from "../../data/gymData";

const dias = [
  { key: "lunes", label: "Lunes" },
  { key: "martes", label: "Martes" },
  { key: "miercoles", label: "Miércoles" },
  { key: "jueves", label: "Jueves" },
  { key: "viernes", label: "Viernes" },
];

export default function Horarios() {
  return (
    <div>
      <PageHeader title="Horarios" subtitle="Calendario semanal de clases y actividades" />

      <Card padded={false} className="overflow-x-auto">
        <table className="w-full text-sm min-w-[800px]">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left text-xs font-medium text-ink-muted uppercase tracking-wide px-5 py-3 w-20">Hora</th>
              {dias.map((d) => (
                <th key={d.key} className="text-left text-xs font-medium text-ink-muted uppercase tracking-wide px-5 py-3">{d.label}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {schedule.map((row) => (
              <tr key={row.hora} className="hover:bg-surface-100/60 transition-colors duration-150">
                <td className="px-5 py-4 font-mono text-xs text-ink-muted whitespace-nowrap">{row.hora}</td>
                {dias.map((d) => (
                  <td key={d.key} className="px-5 py-4">
                    {row[d.key] && (
                      <div className="inline-block bg-accent-600/10 border border-accent-600/20 rounded-lg px-3 py-2">
                        <p className="text-xs font-medium text-ink">{row[d.key]}</p>
                        <p className="text-[11px] text-ink-faint mt-0.5">{row.profesor}</p>
                      </div>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
