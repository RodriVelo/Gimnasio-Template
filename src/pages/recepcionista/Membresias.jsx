import { useMemo, useState } from "react";
import { CheckCircle2, AlertCircle, ShieldCheck, ShieldAlert, ShieldX } from "lucide-react";
import { PageHeader, Card, StatsCard, SearchBar, Badge, Button, Table, Tr, Td, Modal, Select } from "../../components/ui";
import { membershipStatus as initialStatus } from "../../data/membershipStatus";
import { formatDate, membershipStatusLabel, membershipStatusVariant } from "../../utils/format";

const filtrosPago = ["Todos", "Pagado", "Pendiente"];
const filtrosVigencia = ["Todas", "Vigente", "Próxima a vencer", "Vencida"];
const metodosPresenciales = ["Efectivo", "Transferencia"];

export default function Membresias() {
  const [rows, setRows] = useState(initialStatus);
  const [search, setSearch] = useState("");
  const [filtroPago, setFiltroPago] = useState("Todos");
  const [filtroVigencia, setFiltroVigencia] = useState("Todas");
  const [target, setTarget] = useState(null);
  const [metodo, setMetodo] = useState(metodosPresenciales[0]);

  const withVigencia = useMemo(
    () => rows.map((r) => ({ ...r, vigencia: membershipStatusLabel(r.vencimiento) })),
    [rows]
  );

  const filtered = useMemo(() => {
    return withVigencia.filter((r) => {
      const matchSearch = r.nombre.toLowerCase().includes(search.toLowerCase());
      const matchPago = filtroPago === "Todos" || r.estadoPago === filtroPago;
      const matchVigencia = filtroVigencia === "Todas" || r.vigencia === filtroVigencia;
      return matchSearch && matchPago && matchVigencia;
    });
  }, [withVigencia, search, filtroPago, filtroVigencia]);

  const vigentesCount = withVigencia.filter((r) => r.vigencia === "Vigente").length;
  const proximasCount = withVigencia.filter((r) => r.vigencia === "Próxima a vencer").length;
  const vencidasCount = withVigencia.filter((r) => r.vigencia === "Vencida").length;
  const pendientesCount = withVigencia.filter((r) => r.estadoPago === "Pendiente").length;

  function abrirRegistrarPago(r) {
    setMetodo(metodosPresenciales[0]);
    setTarget(r);
  }

  function confirmarPago() {
    setRows((prev) =>
      prev.map((r) => (r.clienteId === target.clienteId ? { ...r, estadoPago: "Pagado", metodoPago: metodo } : r))
    );
    setTarget(null);
  }

  return (
    <div>
      <PageHeader
        title="Membresías"
        subtitle="Estado de vigencia y de pago de la cuota de cada socio"
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatsCard label="Vigentes" value={vigentesCount} icon={ShieldCheck} />
        <StatsCard label="Próximas a vencer" value={proximasCount} icon={ShieldAlert} trendUp={false} />
        <StatsCard label="Vencidas" value={vencidasCount} icon={ShieldX} trendUp={false} />
        <StatsCard label="Pagos pendientes" value={pendientesCount} icon={AlertCircle} trendUp={false} />
      </div>

      <Card padded={false}>
        <div className="flex flex-col sm:flex-row gap-3 p-5 md:p-6 pb-4 flex-wrap">
          <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar socio..." className="sm:w-64" />
          <div className="flex items-center gap-2 flex-wrap">
            {filtrosVigencia.map((f) => (
              <button
                key={f}
                onClick={() => setFiltroVigencia(f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                  filtroVigencia === f
                    ? "bg-accent-600/12 text-accent-400 border-accent-600/25"
                    : "text-ink-muted border-border hover:text-ink hover:border-border-light"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {filtrosPago.map((f) => (
              <button
                key={f}
                onClick={() => setFiltroPago(f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                  filtroPago === f
                    ? "bg-accent-600/12 text-accent-400 border-accent-600/25"
                    : "text-ink-muted border-border hover:text-ink hover:border-border-light"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <Table columns={["Socio", "Membresía", "Vencimiento", "Vigencia", "Estado de pago", ""]}>
          {filtered.map((r) => (
            <Tr key={r.clienteId}>
              <Td>
                <div className="flex items-center gap-3">
                  <img src={r.foto} alt={r.nombre} className="w-9 h-9 rounded-full object-cover flex-shrink-0" />
                  <span className="font-medium text-ink whitespace-nowrap">{r.nombre}</span>
                </div>
              </Td>
              <Td className="text-ink-muted whitespace-nowrap">{r.membresia}</Td>
              <Td className="text-ink-muted font-mono text-xs">{formatDate(r.vencimiento)}</Td>
              <Td><Badge variant={membershipStatusVariant(r.vigencia)}>{r.vigencia}</Badge></Td>
              <Td>
                <Badge variant={r.estadoPago === "Pagado" ? "success" : "warning"}>
                  {r.estadoPago === "Pagado" ? <CheckCircle2 size={11} /> : <AlertCircle size={11} />}
                  {r.estadoPago}
                </Badge>
              </Td>
              <Td>
                {r.estadoPago === "Pendiente" && (
                  <Button variant="secondary" className="!py-1.5 !px-3 !text-xs" onClick={() => abrirRegistrarPago(r)}>
                    Registrar pago
                  </Button>
                )}
              </Td>
            </Tr>
          ))}
        </Table>

        {filtered.length === 0 && (
          <p className="text-center text-sm text-ink-faint py-10">No se encontraron socios con esos filtros.</p>
        )}
        <div className="h-5" />
      </Card>

      <Modal
        open={!!target}
        onClose={() => setTarget(null)}
        title="Registrar pago presencial"
        footer={<>
          <Button variant="secondary" onClick={() => setTarget(null)}>Cancelar</Button>
          <Button onClick={confirmarPago}>Confirmar pago</Button>
        </>}
      >
        {target && (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={target.foto} alt={target.nombre} className="w-12 h-12 rounded-full object-cover" />
              <div>
                <p className="text-sm font-medium text-ink">{target.nombre}</p>
                <p className="text-xs text-ink-faint">{target.membresia}</p>
              </div>
            </div>
            <Select label="Método de pago" value={metodo} onChange={(e) => setMetodo(e.target.value)}>
              {metodosPresenciales.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </Select>
            <p className="text-sm text-ink-muted mt-4">
              Esto va a marcar la cuota como <span className="text-ink font-medium">Pagada</span>, registrada
              manualmente desde recepción. Este registro no incluye montos ni reportes económicos.
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
}
