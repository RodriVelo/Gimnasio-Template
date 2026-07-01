import { useMemo, useState } from "react";
import { Plus, Pencil, UserCheck, UserX, Filter } from "lucide-react";
import { PageHeader, Card, SearchBar, Badge, Button, Table, Tr, Td, Modal, Input, Select, Pagination } from "../../components/ui";
import { clients as clientsData } from "../../data/clients";
import { memberships } from "../../data/gymData";
import { formatDate, statusVariant, membershipStatusLabel, membershipStatusVariant } from "../../utils/format";

const PAGE_SIZE = 6;
const estados = ["Todos", "Activo", "Vencido", "Inactivo"];

const emptyForm = { nombre: "", email: "", telefono: "", membresia: memberships[0]?.nombre || "Mensual", vencimiento: "" };

export default function Clientes() {
  const [clients, setClients] = useState(clientsData);
  const [search, setSearch] = useState("");
  const [estado, setEstado] = useState("Todos");
  const [page, setPage] = useState(1);

  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null); // cliente en edición, null = alta nueva
  const [form, setForm] = useState(emptyForm);

  const [statusTarget, setStatusTarget] = useState(null); // cliente a dar de alta/baja

  const filtered = useMemo(() => {
    return clients.filter((c) => {
      const matchSearch =
        c.nombre.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase());
      const matchEstado = estado === "Todos" || c.estado === estado;
      return matchSearch && matchEstado;
    });
  }, [clients, search, estado]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function openNuevo() {
    setEditTarget(null);
    setForm(emptyForm);
    setModalOpen(true);
  }

  function openEditar(c) {
    setEditTarget(c);
    setForm({ nombre: c.nombre, email: c.email, telefono: c.telefono, membresia: c.membresia, vencimiento: c.vencimiento });
    setModalOpen(true);
  }

  function guardarCliente() {
    if (!form.nombre.trim() || !form.email.trim()) return;

    if (editTarget) {
      setClients((prev) => prev.map((c) => (c.id === editTarget.id ? { ...c, ...form } : c)));
    } else {
      const nextId = Math.max(0, ...clients.map((c) => c.id)) + 1;
      setClients((prev) => [
        {
          id: nextId,
          ...form,
          estado: "Activo",
          foto: `https://i.pravatar.cc/150?img=${(nextId % 70) + 1}`,
          entrenador: "Sin asignar",
          objetivo: "-",
        },
        ...prev,
      ]);
    }
    setModalOpen(false);
  }

  function confirmarCambioEstado() {
    setClients((prev) =>
      prev.map((c) =>
        c.id === statusTarget.id ? { ...c, estado: c.estado === "Inactivo" ? "Activo" : "Inactivo" } : c
      )
    );
    setStatusTarget(null);
  }

  return (
    <div>
      <PageHeader
        title="Clientes"
        subtitle={`${clients.length} clientes registrados en el sistema`}
        actions={<Button icon={Plus} onClick={openNuevo}>Nuevo cliente</Button>}
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

        <Table columns={["Cliente", "Contacto", "Estado", "Membresía", "Vencimiento", "Vigencia", ""]}>
          {paged.map((c) => {
            const vigLabel = membershipStatusLabel(c.vencimiento);
            return (
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
                <Td><Badge variant={membershipStatusVariant(vigLabel)}>{vigLabel}</Badge></Td>
                <Td>
                  <div className="flex items-center gap-1 justify-end">
                    <button
                      onClick={() => openEditar(c)}
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-ink-muted hover:text-accent-400 hover:bg-surface-100 transition-colors"
                      title="Editar cliente"
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      onClick={() => setStatusTarget(c)}
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-ink-muted hover:text-accent-500 hover:bg-surface-100 transition-colors"
                      title={c.estado === "Inactivo" ? "Dar de alta" : "Dar de baja"}
                    >
                      {c.estado === "Inactivo" ? <UserCheck size={14} /> : <UserX size={14} />}
                    </button>
                  </div>
                </Td>
              </Tr>
            );
          })}
        </Table>

        {paged.length === 0 && (
          <p className="text-center text-sm text-ink-faint py-10">No se encontraron clientes con esos filtros.</p>
        )}

        <Pagination page={page} totalPages={totalPages} onChange={setPage} />
        <div className="h-5" />
      </Card>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editTarget ? "Editar cliente" : "Nuevo cliente"}
        footer={<>
          <Button variant="secondary" onClick={() => setModalOpen(false)}>Cancelar</Button>
          <Button onClick={guardarCliente}>{editTarget ? "Guardar cambios" : "Guardar cliente"}</Button>
        </>}
      >
        <div className="space-y-3">
          <Input
            label="Nombre completo"
            placeholder="Ej: Martina Acosta"
            value={form.nombre}
            onChange={(e) => setForm((f) => ({ ...f, nombre: e.target.value }))}
          />
          <Input
            label="Email"
            type="email"
            placeholder="cliente@mail.com"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          />
          <Input
            label="Teléfono"
            placeholder="+54 9 11 0000-0000"
            value={form.telefono}
            onChange={(e) => setForm((f) => ({ ...f, telefono: e.target.value }))}
          />
          <Select
            label="Membresía"
            value={form.membresia}
            onChange={(e) => setForm((f) => ({ ...f, membresia: e.target.value }))}
          >
            {memberships.map((m) => (
              <option key={m.id} value={m.nombre}>{m.nombre}</option>
            ))}
          </Select>
          <Input
            label="Vencimiento"
            type="date"
            value={form.vencimiento}
            onChange={(e) => setForm((f) => ({ ...f, vencimiento: e.target.value }))}
          />
        </div>
      </Modal>

      <Modal
        open={!!statusTarget}
        onClose={() => setStatusTarget(null)}
        title={statusTarget?.estado === "Inactivo" ? "Dar de alta cliente" : "Dar de baja cliente"}
        footer={<>
          <Button variant="secondary" onClick={() => setStatusTarget(null)}>Cancelar</Button>
          <Button onClick={confirmarCambioEstado}>
            {statusTarget?.estado === "Inactivo" ? "Sí, dar de alta" : "Sí, dar de baja"}
          </Button>
        </>}
      >
        {statusTarget?.estado === "Inactivo" ? (
          <>¿Confirmás que querés dar de alta a <span className="text-ink font-medium">{statusTarget?.nombre}</span> nuevamente en el sistema?</>
        ) : (
          <>¿Confirmás que querés dar de baja a <span className="text-ink font-medium">{statusTarget?.nombre}</span>? Vas a poder darlo de alta de nuevo cuando quieras.</>
        )}
      </Modal>
    </div>
  );
}
