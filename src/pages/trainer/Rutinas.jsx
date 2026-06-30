import { Plus, ListChecks, Clock, User } from "lucide-react";
import { PageHeader, Button, Badge } from "../../components/ui";
import { routines } from "../../data/trainerData";

export default function Rutinas() {
  return (
    <div>
      <PageHeader title="Rutinas" subtitle={`${routines.length} rutinas creadas`} actions={<Button icon={Plus}>Crear rutina</Button>} />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {routines.map((r) => (
          <div key={r.id} className="panel panel-pad transition-all duration-200 hover:border-border-light hover:shadow-glow">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-accent-600/10 border border-accent-600/20 flex items-center justify-center text-accent-500">
                <ListChecks size={18} />
              </div>
              <Badge variant="neutral">{r.objetivo}</Badge>
            </div>
            <h3 className="text-sm font-semibold text-ink mb-1">{r.nombre}</h3>
            <p className="text-xs text-ink-faint flex items-center gap-1.5 mb-4">
              <User size={12} /> {r.alumno}
            </p>
            <div className="flex items-center justify-between text-xs text-ink-muted border-t border-border pt-3">
              <span>{r.ejercicios} ejercicios</span>
              <span className="flex items-center gap-1"><Clock size={12} /> {r.duracion}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
