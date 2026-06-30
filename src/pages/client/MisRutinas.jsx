import { Link } from "react-router-dom";
import { Clock, Dumbbell } from "lucide-react";
import { PageHeader, Button, Badge } from "../../components/ui";
import { myRoutines } from "../../data/clientData";

export default function MisRutinas() {
  return (
    <div>
      <PageHeader title="Mis rutinas" subtitle="Rutinas asignadas por tu entrenador" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {myRoutines.map((r) => (
          <div key={r.id} className="panel panel-pad transition-all duration-200 hover:border-border-light hover:shadow-glow">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-accent-600/10 border border-accent-600/20 flex items-center justify-center text-accent-500">
                <Dumbbell size={18} />
              </div>
              <Badge variant="neutral">{r.objetivo}</Badge>
            </div>
            <h3 className="text-base font-semibold text-ink mb-1">{r.nombre}</h3>
            <p className="text-xs text-ink-faint flex items-center gap-1.5 mb-5">
              <Clock size={12} /> {r.duracion} · {r.ejercicios.length} ejercicios
            </p>
            <Link to={`/cliente/rutinas/${r.id}`}>
              <Button variant="secondary" className="w-full">Ver rutina</Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
