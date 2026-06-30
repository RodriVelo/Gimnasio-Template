import { useState } from "react";
import { Check, X } from "lucide-react";
import { PageHeader, Card, Badge } from "../../components/ui";
import { upcomingClasses } from "../../data/clientData";

export default function ConfirmarAsistencia() {
  const [statuses, setStatuses] = useState(
    Object.fromEntries(upcomingClasses.map((c) => [c.id, c.estado]))
  );

  return (
    <div>
      <PageHeader title="Confirmar asistencia" subtitle="Confirmá o cancelá tu lugar en las próximas clases" />

      <Card padded={false}>
        <div className="divide-y divide-border">
          {upcomingClasses.map((c) => (
            <div key={c.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 md:px-6 py-4">
              <div>
                <p className="text-sm font-medium text-ink">{c.actividad}</p>
                <p className="text-xs text-ink-faint mt-0.5">{c.fecha} · {c.hora} · {c.profesor}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={statuses[c.id] === "Confirmada" ? "success" : statuses[c.id] === "Cancelada" ? "danger" : "warning"}>
                  {statuses[c.id]}
                </Badge>
                <button
                  onClick={() => setStatuses((s) => ({ ...s, [c.id]: "Confirmada" }))}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-emerald-400 border border-emerald-500/20 bg-emerald-500/10 hover:bg-emerald-500/20 transition-colors"
                >
                  <Check size={14} />
                </button>
                <button
                  onClick={() => setStatuses((s) => ({ ...s, [c.id]: "Cancelada" }))}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-accent-400 border border-accent-600/20 bg-accent-600/10 hover:bg-accent-600/20 transition-colors"
                >
                  <X size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="h-3" />
      </Card>
    </div>
  );
}
