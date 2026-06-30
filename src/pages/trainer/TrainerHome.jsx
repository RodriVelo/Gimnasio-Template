import { Users, ListChecks, CalendarClock, Plus } from "lucide-react";
import { PageHeader, StatsCard, Card, Button } from "../../components/ui";
import { myStudents, routines } from "../../data/trainerData";
import { schedule } from "../../data/gymData";

export default function TrainerHome() {
  const todayClasses = schedule.filter((s) => s.profesor === "Lucas Ferreyra" || s.lunes);

  return (
    <div>
      <PageHeader
        title="Hola, Lucas 👋"
        subtitle="Esto es lo que tenés para hoy, martes 30 de junio"
        actions={<Button icon={Plus}>Crear rutina</Button>}
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <StatsCard label="Cantidad de alumnos" value={myStudents.length} icon={Users} />
        <StatsCard label="Rutinas creadas" value={routines.length} icon={ListChecks} />
        <StatsCard label="Clases del día" value="3" icon={CalendarClock} />
      </div>

      <Card padded={false}>
        <div className="px-5 md:px-6 pt-5 pb-1">
          <h3 className="text-sm font-semibold text-ink">Próximas clases de hoy</h3>
        </div>
        <div className="divide-y divide-border mt-3">
          {[
            { hora: "07:00", actividad: "Funcional", lugar: "Sala 1" },
            { hora: "09:00", actividad: "Musculación libre", lugar: "Sala principal" },
            { hora: "20:00", actividad: "Powerlifting", lugar: "Sala 2" },
          ].map((c) => (
            <div key={c.hora} className="flex items-center justify-between px-5 md:px-6 py-3.5">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-accent-400 bg-accent-600/10 border border-accent-600/20 rounded-lg px-2.5 py-1.5">{c.hora}</span>
                <div>
                  <p className="text-sm font-medium text-ink">{c.actividad}</p>
                  <p className="text-xs text-ink-faint">{c.lugar}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="h-3" />
      </Card>
    </div>
  );
}
