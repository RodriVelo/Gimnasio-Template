import { Check } from "lucide-react";
import { PageHeader, Card, Badge, Button } from "../../components/ui";
import { memberships } from "../../data/gymData";
import { formatCurrency } from "../../utils/format";

export default function Membresias() {
  return (
    <div>
      <PageHeader title="Membresías" subtitle="Planes disponibles para los clientes de FORJA Gym" />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {memberships.map((m) => (
          <div
            key={m.id}
            className={`panel panel-pad flex flex-col relative overflow-hidden transition-all duration-200 hover:border-border-light ${
              m.destacado ? "ring-1 ring-accent-600/40" : ""
            }`}
          >
            {m.destacado && (
              <Badge variant="danger" dot={false} className="absolute top-5 right-5">Más elegido</Badge>
            )}
            <div className="w-11 h-11 rounded-xl bg-accent-600/10 border border-accent-600/20 flex items-center justify-center text-accent-500 mb-4">
              <m.icon size={20} strokeWidth={2} />
            </div>
            <h3 className="text-base font-semibold text-ink">{m.nombre}</h3>
            <div className="flex items-baseline gap-1 mt-2 mb-1">
              <span className="text-2xl font-semibold text-ink stat-num">{formatCurrency(m.precio)}</span>
              <span className="text-xs text-ink-faint">{m.periodo}</span>
            </div>
            <p className="text-xs text-ink-faint mb-5">{m.clientes} clientes activos</p>

            <ul className="space-y-2.5 mb-6 flex-1">
              {m.beneficios.map((b) => (
                <li key={b} className="flex items-start gap-2 text-sm text-ink-muted">
                  <Check size={15} className="text-accent-500 flex-shrink-0 mt-0.5" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <Button variant={m.destacado ? "primary" : "secondary"} className="w-full">
              Editar plan
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
