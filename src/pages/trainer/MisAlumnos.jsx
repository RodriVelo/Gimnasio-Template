import { useState } from "react";
import { PageHeader, Card, SearchBar, Table, Tr, Td, Button } from "../../components/ui";
import { myStudents } from "../../data/trainerData";
import { formatDate } from "../../utils/format";

export default function MisAlumnos() {
  const [search, setSearch] = useState("");
  const filtered = myStudents.filter((s) => s.nombre.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <PageHeader
        title="Mis alumnos"
        subtitle={`${myStudents.length} alumnos asignados`}
        actions={<SearchBar value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar alumno..." className="w-64" />}
      />

      <Card padded={false}>
        <Table columns={["Alumno", "Edad", "Objetivo", "Último entrenamiento", ""]}>
          {filtered.map((s) => (
            <Tr key={s.id}>
              <Td>
                <div className="flex items-center gap-3">
                  <img src={s.foto} alt={s.nombre} className="w-9 h-9 rounded-full object-cover" />
                  <span className="font-medium text-ink whitespace-nowrap">{s.nombre}</span>
                </div>
              </Td>
              <Td className="text-ink-muted">{s.edad} años</Td>
              <Td className="text-ink-muted">{s.objetivo}</Td>
              <Td className="text-ink-muted font-mono text-xs">{formatDate(s.ultimo)}</Td>
              <Td>
                <Button variant="secondary" className="!py-1.5 !px-3 !text-xs">Ver ficha</Button>
              </Td>
            </Tr>
          ))}
        </Table>
        <div className="h-5" />
      </Card>
    </div>
  );
}
