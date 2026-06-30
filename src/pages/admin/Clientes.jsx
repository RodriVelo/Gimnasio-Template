import { useMemo, useState } from "react";
import { Plus, Pencil, Trash2, Filter } from "lucide-react";
import { PageHeader, Card, SearchBar, Badge, Button, Table, Tr, Td, Modal, Input, Pagination } from "../../components/ui";
import { clients as clientsData } from "../../data/clients";
import { formatDate, statusVariant } from "../../utils/format";

const PAGE_SIZE = 6;
const estados = ["Todos", "Activo", "Vencido", "Inactivo"];

export default function Clientes() {
  const [search, setSearch] = useState("");
  const [estado, setEstado] = useState("Todos");
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const filtered = useMemo(() => {
    return clientsData.filter((c) => {
      const matchSearch = c.nombre.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase());
      const matchEstado = estado === "Todos" || c.estado === estado;
      return matchSearch && matchEstado;
    });
  }, [search, estado]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div>
      <PageHeader
        title="Clientes"
        subtitle={`${clientsData.length} clientes registrados en el sistema`}
        actions={<Button icon={Plus} onClick={() => setModalOpen(true)}>Nuevo cliente</Button>}
      />

      <Card padded={false}>
        <div className="flex flex-col sm:flex-row gap-3 p-5 md:p-6 pb-4">
          <SearchBar
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="Buscar por nombre o email..."
            className="sm:w-80"
          />
          <div className="flex items-center gap-2 flex-wrap">
            <Filter size={14} className="text-ink-faint" />
            {estados.map((e) => (
              <button
                key={e}
                onClick={() => { setEstado(e); setPage(1); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                  estado === e
                    ? "bg-accent-600/12 text-accent-400 border-accent-600/25"
                    : "text-ink-muted border-border hover:text-ink hover:border-border-light"
                }`}
              >
                {e}
              </button>
            ))}
          </div>
        </div>

        <Table columns={["Cliente", "Contacto", "Estado", "Membresía", "Vencimiento", ""]}>
          {paged.map((c) => (
            <Tr key={c.id}>
              <Td>
                <div className="flex items-center gap-3">
                  <img src={c.foto} alt={c.nombre} className="w-9 h-9 rounded-full object-cover flex-shrink-0" />
                  <span className="font-medium text-ink whitespace-nowrap">{c.nombre}</span>
                </div>
              </Td>
              <Td>
                <p className="text-ink-muted">{c.email}</p>
                <p className="text-xs text-ink-faint">{c.telefono}</p>
              </Td>
              <Td><Badge variant={statusVariant(c.estado)}>{c.estado}</Badge></Td>
              <Td className="text-ink-muted">{c.membresia}</Td>
              <Td className="text-ink-muted font-mono text-xs">{formatDate(c.vencimiento)}</Td>
              <Td>
                <div className="flex items-center gap-1 justify-end">
                  <button className="w-8 h-8 rounded-lg flex items-center justify-center text-ink-muted hover:text-accent-400 hover:bg-surface-100 transition-colors">
                    <Pencil size={14} />
                  </button>
                  <button
                    onClick={() => setDeleteTarget(c)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-ink-muted hover:text-accent-500 hover:bg-surface-100 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </Td>
            </Tr>
          ))}
        </Table>

        {paged.length === 0 && (
          <p className="text-center text-sm text-ink-faint py-10">No se encontraron clientes con esos filtros.</p>
        )}

        <Pagination page={page} totalPages={totalPages} onChange={setPage} />
        <div className="h-5" />
      </Card>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Nuevo cliente"
        footer={<>
          <Button variant="secondary" onClick={() => setModalOpen(false)}>Cancelar</Button>
          <Button onClick={() => setModalOpen(false)}>Guardar cliente</Button>
        </>}
      >
        <div className="space-y-3">
          <Input label="Nombre completo" placeholder="Ej: Martina Acosta" />
          <Input label="Email" type="email" placeholder="cliente@mail.com" />
          <Input label="Teléfono" placeholder="+54 9 11 0000-0000" />
        </div>
      </Modal>

      <Modal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        title="Eliminar cliente"
        footer={<>
          <Button variant="secondary" onClick={() => setDeleteTarget(null)}>Cancelar</Button>
          <Button onClick={() => setDeleteTarget(null)}>Sí, eliminar</Button>
        </>}
      >
        ¿Confirmás que querés eliminar a <span className="text-ink font-medium">{deleteTarget?.nombre}</span> del sistema? Esta acción no se puede deshacer.
      </Modal>
    </div>
  );
}
