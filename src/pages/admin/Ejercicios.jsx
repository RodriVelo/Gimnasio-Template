import { useState } from "react";
import { PageHeader, SearchBar, Badge } from "../../components/ui";
import { exercises } from "../../data/gymData";

const dificultadVariant = { Principiante: "success", Intermedio: "warning", Avanzado: "danger" };

export default function Ejercicios() {
  const [search, setSearch] = useState("");
  const filtered = exercises.filter((e) => e.nombre.toLowerCase().includes(search.toLowerCase()) || e.grupo.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <PageHeader
        title="Ejercicios"
        subtitle="Biblioteca de ejercicios disponibles para armar rutinas"
        actions={<SearchBar value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar ejercicio..." className="w-64" />}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((ex) => (
          <div key={ex.id} className="panel overflow-hidden transition-all duration-200 hover:border-border-light hover:shadow-glow">
            <div className="h-36 overflow-hidden">
              <img src={ex.img} alt={ex.nombre} className="w-full h-full object-cover" />
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <h3 className="text-sm font-semibold text-ink leading-snug">{ex.nombre}</h3>
                <Badge variant={dificultadVariant[ex.dificultad]} className="flex-shrink-0">{ex.dificultad}</Badge>
              </div>
              <p className="text-xs text-accent-400 mb-2">{ex.grupo}</p>
              <p className="text-xs text-ink-faint leading-relaxed">{ex.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
