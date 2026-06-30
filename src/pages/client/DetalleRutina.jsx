import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Clock, Repeat, RotateCcw } from "lucide-react";
import { PageHeader, Card, Button } from "../../components/ui";
import { myRoutines } from "../../data/clientData";

export default function DetalleRutina() {
  const { id } = useParams();
  const routine = myRoutines.find((r) => String(r.id) === id) || myRoutines[0];

  return (
    <div>
      <Link to="/cliente/rutinas" className="inline-flex items-center gap-1.5 text-xs text-ink-muted hover:text-ink mb-4 transition-colors">
        <ArrowLeft size={14} /> Volver a mis rutinas
      </Link>
      <PageHeader title={routine.nombre} subtitle={`${routine.objetivo} · ${routine.duracion}`} />

      <div className="space-y-4">
        {routine.ejercicios.map((ex, i) => (
          <Card key={ex.id} padded={false} className="overflow-hidden">
            <div className="flex flex-col sm:flex-row">
              <img src={ex.img} alt={ex.nombre} className="w-full sm:w-40 h-40 sm:h-auto object-cover flex-shrink-0" />
              <div className="p-5 flex-1">
                <p className="text-xs text-accent-400 font-medium mb-1">Ejercicio {i + 1}</p>
                <h3 className="text-base font-semibold text-ink mb-3">{ex.nombre}</h3>
                <div className="flex flex-wrap gap-4 text-xs text-ink-muted mb-3">
                  <span className="flex items-center gap-1.5"><Repeat size={13} /> {ex.series} series</span>
                  <span className="flex items-center gap-1.5"><RotateCcw size={13} /> {ex.repeticiones} repeticiones</span>
                  <span className="flex items-center gap-1.5"><Clock size={13} /> Descanso: {ex.descanso}</span>
                </div>
                <p className="text-xs text-ink-faint leading-relaxed bg-surface-50 border border-border rounded-lg px-3 py-2">
                  {ex.obs}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
