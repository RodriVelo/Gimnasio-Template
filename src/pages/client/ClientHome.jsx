import { CalendarClock, IdCard, Wallet, GraduationCap } from "lucide-react";
import { PageHeader, Card, Badge } from "../../components/ui";
import { myProfile, upcomingClasses } from "../../data/clientData";
import { formatDate } from "../../utils/format";

export default function ClientHome() {
  const next = upcomingClasses[0];

  return (
    <div>
      <PageHeader title={`Hola, ${myProfile.nombre.split(" ")[0]} 👋`} subtitle="Bienvenida de nuevo a FORJA Gym" />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <Card hover>
          <div className="w-10 h-10 rounded-xl bg-accent-600/10 border border-accent-600/20 flex items-center justify-center text-accent-500 mb-3">
            <CalendarClock size={18} />
          </div>
          <p className="text-xs text-ink-muted uppercase tracking-wide">Próximo entrenamiento</p>
          <p className="text-base font-semibold text-ink mt-1.5">{next.actividad}</p>
          <p className="text-xs text-ink-faint mt-0.5">{next.fecha} · {next.hora}</p>
        </Card>

        <Card hover>
          <div className="w-10 h-10 rounded-xl bg-accent-600/10 border border-accent-600/20 flex items-center justify-center text-accent-500 mb-3">
            <IdCard size={18} />
          </div>
          <p className="text-xs text-ink-muted uppercase tracking-wide">Estado de membresía</p>
          <p className="text-base font-semibold text-ink mt-1.5">{myProfile.membresia}</p>
          <Badge variant="success" className="mt-1.5">Activa</Badge>
        </Card>

        <Card hover>
          <div className="w-10 h-10 rounded-xl bg-accent-600/10 border border-accent-600/20 flex items-center justify-center text-accent-500 mb-3">
            <Wallet size={18} />
          </div>
          <p className="text-xs text-ink-muted uppercase tracking-wide">Próximo pago</p>
          <p className="text-base font-semibold text-ink mt-1.5 font-mono">{formatDate(myProfile.proximoPago)}</p>
        </Card>

        <Card hover>
          <div className="w-10 h-10 rounded-xl bg-accent-600/10 border border-accent-600/20 flex items-center justify-center text-accent-500 mb-3">
            <GraduationCap size={18} />
          </div>
          <p className="text-xs text-ink-muted uppercase tracking-wide">Entrenador asignado</p>
          <p className="text-base font-semibold text-ink mt-1.5">{myProfile.entrenador}</p>
        </Card>
      </div>
    </div>
  );
}
