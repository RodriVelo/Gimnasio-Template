import { ChevronLeft, ChevronRight, Dumbbell } from "lucide-react";
import { PageHeader, Card } from "../../components/ui";

const trainingDays = [2, 4, 7, 9, 11, 14, 16, 18, 21, 23, 25, 28, 30];
const daysInMonth = 30;
const firstDayOffset = 1; // Jun 1 2026 is a Monday -> offset for Sunday-start grid

const weekDays = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

export default function Calendario() {
  const cells = [...Array(firstDayOffset).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];

  return (
    <div>
      <PageHeader title="Calendario" subtitle="Entrenamientos programados del mes" />

      <Card>
        <div className="flex items-center justify-between mb-5">
          <button className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-ink-muted hover:text-ink hover:border-border-light transition-colors">
            <ChevronLeft size={15} />
          </button>
          <h3 className="text-sm font-semibold text-ink">Junio 2026</h3>
          <button className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-ink-muted hover:text-ink hover:border-border-light transition-colors">
            <ChevronRight size={15} />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1.5 mb-2">
          {weekDays.map((d) => (
            <div key={d} className="text-center text-[11px] font-medium text-ink-faint uppercase py-1">{d}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1.5">
          {cells.map((day, i) => {
            const hasTraining = day && trainingDays.includes(day);
            const isToday = day === 30;
            return (
              <div
                key={i}
                className={`aspect-square rounded-xl border flex flex-col items-center justify-center gap-1 text-sm transition-colors ${
                  day
                    ? isToday
                      ? "border-accent-600 bg-accent-600/10 text-ink font-semibold"
                      : hasTraining
                      ? "border-border bg-surface-50 text-ink hover:border-border-light"
                      : "border-border/50 text-ink-faint"
                    : "border-transparent"
                }`}
              >
                {day && <span>{day}</span>}
                {hasTraining && <Dumbbell size={11} className="text-accent-500" />}
              </div>
            );
          })}
        </div>

        <div className="flex items-center gap-4 mt-5 pt-4 border-t border-border text-xs text-ink-faint">
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-accent-600/20 border border-accent-600" /> Hoy</span>
          <span className="flex items-center gap-1.5"><Dumbbell size={11} className="text-accent-500" /> Día de entrenamiento</span>
        </div>
      </Card>
    </div>
  );
}
