import { useState } from "react";
import { ChevronDown, GripVertical } from "lucide-react";
import { PageHeader, Card, Button } from "../../components/ui";
import { myStudents, assignedExercises } from "../../data/trainerData";

export default function AsignarRutina() {
  const [selected, setSelected] = useState(myStudents[0]);

  return (
    <div>
      <PageHeader title="Asignar rutina" subtitle="Armá la rutina semanal para un alumno seleccionado" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card>
          <h3 className="text-sm font-semibold text-ink mb-4">Alumno seleccionado</h3>
          <div className="flex items-center gap-3 p-3 rounded-xl bg-surface-50 border border-border mb-4">
            <img src={selected.foto} alt={selected.nombre} className="w-11 h-11 rounded-full object-cover" />
            <div>
              <p className="text-sm font-medium text-ink">{selected.nombre}</p>
              <p className="text-xs text-ink-faint">{selected.objetivo}</p>
            </div>
          </div>

          <p className="text-xs font-medium text-ink-muted uppercase tracking-wide mb-2">Cambiar alumno</p>
          <div className="space-y-1.5">
            {myStudents.map((s) => (
              <button
                key={s.id}
                onClick={() => setSelected(s)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm transition-colors ${
                  selected.id === s.id ? "bg-accent-600/12 text-accent-400" : "text-ink-muted hover:bg-surface-100"
                }`}
              >
                <img src={s.foto} alt={s.nombre} className="w-6 h-6 rounded-full object-cover" />
                {s.nombre}
              </button>
            ))}
          </div>
        </Card>

        <Card className="lg:col-span-2" padded={false}>
          <div className="flex items-center justify-between px-5 md:px-6 pt-5 pb-3">
            <h3 className="text-sm font-semibold text-ink">Ejercicios de la rutina</h3>
            <Button variant="secondary" className="!py-1.5 !px-3 !text-xs">+ Agregar ejercicio</Button>
          </div>
          <div className="divide-y divide-border">
            {assignedExercises.map((ex) => (
              <div key={ex.id} className="flex items-center gap-3 px-5 md:px-6 py-3.5">
                <GripVertical size={15} className="text-ink-faint flex-shrink-0 cursor-grab" />
                <p className="text-sm font-medium text-ink flex-1">{ex.nombre}</p>
                <div className="flex items-center gap-4 text-xs text-ink-muted">
                  <span className="font-mono">{ex.series} series</span>
                  <span className="font-mono">{ex.repeticiones} reps</span>
                </div>
              </div>
            ))}
          </div>
          <div className="px-5 md:px-6 py-4 flex justify-end">
            <Button>Guardar rutina</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
