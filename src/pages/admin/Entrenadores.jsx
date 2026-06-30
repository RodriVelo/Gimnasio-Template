import { Users } from "lucide-react";
import { PageHeader, Button } from "../../components/ui";
import { trainers } from "../../data/gymData";

export default function Entrenadores() {
  return (
    <div>
      <PageHeader title="Entrenadores" subtitle="Equipo de entrenadores de FORJA Gym" />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {trainers.map((t) => (
          <div key={t.id} className="panel panel-pad flex flex-col items-center text-center transition-all duration-200 hover:border-border-light hover:shadow-glow">
            <img src={t.foto} alt={t.nombre} className="w-20 h-20 rounded-2xl object-cover mb-4" />
            <h3 className="text-sm font-semibold text-ink">{t.nombre}</h3>
            <p className="text-xs text-accent-400 mt-1">{t.especialidad}</p>
            <div className="flex items-center gap-1.5 text-xs text-ink-faint mt-3">
              <Users size={13} />
              <span>{t.alumnos} alumnos</span>
            </div>
            <p className="text-[11px] text-ink-faint mt-1">{t.experiencia} de experiencia</p>
            <Button variant="secondary" className="w-full mt-5">Ver perfil</Button>
          </div>
        ))}
      </div>
    </div>
  );
}
